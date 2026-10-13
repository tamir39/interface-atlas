import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Optional browser evidence for Blueprint. These checks are original Atlas tooling,
// adapted from the Editorial and Swiss preview validators; no upstream UI code is used.
const options = {};
for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index];
  if (!['--module', '--browser', '--output', '--preview'].includes(key) || !process.argv[index + 1]) {
    throw new Error('Usage: node tools/validate-blueprint.mjs [--module path/to/playwright/index.mjs] [--browser path/to/chromium] [--output directory] [--preview directory]');
  }
  options[key.slice(2)] = process.argv[index + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'themes/blueprint/preview'));
const output = options.output ? path.resolve(options.output) : null;
let playwright;
try {
  playwright = await import(options.module ? pathToFileURL(path.resolve(options.module)).href : 'playwright');
} catch {
  throw new Error('Optional verification needs an installed Playwright package. Pass --module with its index.mjs path, or install Playwright locally. Opening the preview needs no packages.');
}
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const filename = path.resolve(preview, '.' + decodeURIComponent(pathname === '/' ? '/index.html' : pathname));
    const relative = path.relative(preview, filename);
    if (relative.startsWith('..') || path.isAbsolute(relative)) { response.writeHead(403).end(); return; }
    const body = await readFile(filename);
    response.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream' }).end(body);
  } catch { response.writeHead(404).end(); }
});
let browser;
const report = {
  checks: [], layouts: [], browser: null, node: process.version, testedFiles: {},
  limits: [
    'No screen-reader, touch-device, native browser zoom, or real backend testing. Native specimen inputs/selects/checkboxes remain usable without JavaScript; only runtime preferences, presentation/grid/reset, and detail-navigation buttons require it.',
    'Contrast samples are rendered HTML text composited over solid backgrounds and enabled select/text-input/textarea boundaries against their fill and adjacent background. Each layout must include nonzero opaque HTML text and every preference/presentation/specimen field boundary. SVG artwork, disabled controls, placeholders, text selection, native popup menus, checkbox glyph internals, and backgrounds with images are outside this check; exclusions and unsupported samples are recorded.',
    'Fallback font families are recorded from Chromium. Named webfont files are not distributed or loaded.',
    '44px target samples include enabled native controls, associated checkbox labels, summary controls, button-styled links, node Inspect links, section/document navigation, and the Atlas brand. Contextual inline source links are excluded.',
    'The temporary verification server exposes only the preview directory. Links to neighboring Atlas documents are checked separately, not followed here.'
  ]
};
for (const filename of ['index.html', 'styles.css', 'preview.js']) {
  report.testedFiles[filename] = createHash('sha256').update(await readFile(path.join(preview, filename))).digest('hex');
}
report.validatorSha256 = createHash('sha256').update(await readFile(fileURLToPath(import.meta.url))).digest('hex');
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const url = 'http://127.0.0.1:' + server.address().port + '/';
const errors = [], external = [], failedResources = [];
async function newContext(contextOptions) {
  const context = await browser.newContext(contextOptions);
  context.on('request', request => { if (!request.url().startsWith(url)) external.push(request.url()); });
  context.on('response', response => {
    if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) failedResources.push({ url: response.url(), status: response.status() });
  });
  context.on('page', page => page.on('pageerror', error => errors.push(error.message)));
  return context;
}
function check(name, details = true) { report.checks.push({ name, passed: true, details }); }
async function reflow(page, label) {
  const sizes = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  assert.ok(sizes.scroll <= sizes.width + 1, label + ': page overflows ' + JSON.stringify(sizes));
  return sizes;
}
async function contrast(page) {
  return page.evaluate(() => {
    const rgba = value => {
      const match = /^rgba?\(([^)]+)\)$/.exec(value);
      if (!match) return null;
      const channels = match[1].split(',').map(Number);
      return [channels[0], channels[1], channels[2], channels[3] ?? 1];
    };
    const composite = (front, back) => {
      const alpha = front[3] + back[3] * (1 - front[3]);
      return [0, 1, 2].map(index => (front[index] * front[3] + back[index] * back[3] * (1 - front[3])) / alpha).concat(alpha);
    };
    const luminance = color => color.slice(0, 3).map(channel => {
      const value = channel / 255;
      return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
    }).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
    const ratio = (a, b) => {
      const first = luminance(a), second = luminance(b);
      return (Math.max(first, second) + .05) / (Math.min(first, second) + .05);
    };
    const identify = element => element.id ? '#' + element.id : element.tagName.toLowerCase() + (typeof element.className === 'string' && element.className ? '.' + element.className.trim().split(/\s+/).join('.') : '');
    const ancestorsOf = element => {
      const ancestors = []; let parent = element;
      while (parent) { ancestors.unshift(parent); parent = parent.parentElement; }
      return ancestors;
    };
    const textOf = element => element.tagName === 'SELECT' ? element.selectedOptions[0]?.textContent :
      element.tagName === 'TEXTAREA' || (element.tagName === 'INPUT' && ['text', 'search', 'email', 'url', 'tel', 'number'].includes(element.type)) ? element.value :
      [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent.trim()).join(' ');
    const failures = [], skipped = [], pairs = [], controlBorders = [];
    const excluded = { svgElements: 0, disabledTextSamples: 0, unrenderedTextSamples: 0, visuallyHiddenTextSamples: 0, nativeCheckboxGlyphBoundaries: document.querySelectorAll('input[type="checkbox"]:not(:disabled)').length };
    for (const element of document.querySelectorAll('body *')) {
      if (element.namespaceURI !== 'http://www.w3.org/1999/xhtml') { excluded.svgElements++; continue; }
      if (['SCRIPT', 'STYLE', 'OPTION', 'NOSCRIPT'].includes(element.tagName)) continue;
      const text = textOf(element);
      if (!text) continue;
      if (element.closest('[disabled]')) { excluded.disabledTextSamples++; continue; }
      if (!element.getClientRects().length) { excluded.unrenderedTextSamples++; continue; }
      const styles = ancestorsOf(element).map(ancestor => getComputedStyle(ancestor));
      if (styles.some(style => style.clipPath === 'inset(50%)' || style.clip === 'rect(0px, 0px, 0px, 0px)')) { excluded.visuallyHiddenTextSamples++; continue; }
      if (styles.some(style => style.visibility !== 'visible' || Number(style.opacity) < 1 || style.backgroundImage !== 'none')) {
        skipped.push({ selector: identify(element), text: text.slice(0, 60), reason: 'Hidden, translucent, or image background' }); continue;
      }
      const unsupportedBackground = styles.find(style => !rgba(style.backgroundColor));
      if (unsupportedBackground) {
        skipped.push({ selector: identify(element), text: text.slice(0, 60), reason: 'Unsupported computed background color: ' + unsupportedBackground.backgroundColor }); continue;
      }
      let background = [255, 255, 255, 1];
      for (const style of styles) background = composite(rgba(style.backgroundColor), background);
      const style = getComputedStyle(element);
      if (!rgba(style.color)) {
        skipped.push({ selector: identify(element), text: text.slice(0, 60), reason: 'Unsupported computed text color: ' + style.color }); continue;
      }
      const foreground = composite(rgba(style.color), background);
      const required = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.6667 && parseInt(style.fontWeight) >= 700) ? 3 : 4.5;
      const measured = ratio(foreground, background);
      const pair = { selector: identify(element), text: text.slice(0, 60), foreground: style.color, opaque: rgba(style.color)[3] === 1, background: background.slice(0, 3).map(Math.round), ratio: Number(measured.toFixed(2)), required };
      pairs.push(pair);
      if (measured + .001 < required) failures.push(pair);
    }
    for (const element of document.querySelectorAll('select:not(:disabled), input[type="search"]:not(:disabled), input[type="text"]:not(:disabled), textarea:not(:disabled)')) {
      if (!element.getClientRects().length) continue;
      const style = getComputedStyle(element);
      const fill = rgba(style.backgroundColor);
      if (!fill || fill[3] !== 1 || parseFloat(style.borderTopWidth) < 1 || style.borderTopStyle === 'none') {
        skipped.push({ selector: identify(element), reason: 'Control boundary needs an opaque fill and visible solid border' }); continue;
      }
      let adjacent = [255, 255, 255, 1];
      const adjacentStyles = ancestorsOf(element.parentElement).map(ancestor => getComputedStyle(ancestor));
      if (adjacentStyles.some(ancestorStyle => ancestorStyle.backgroundImage !== 'none' || Number(ancestorStyle.opacity) < 1)) {
        skipped.push({ selector: identify(element), reason: 'Control boundary has an image or translucent ancestor' }); continue;
      }
      if (!rgba(style.borderTopColor) || adjacentStyles.some(ancestorStyle => !rgba(ancestorStyle.backgroundColor))) {
        skipped.push({ selector: identify(element), reason: 'Unsupported computed control boundary color' }); continue;
      }
      for (const ancestorStyle of adjacentStyles) adjacent = composite(rgba(ancestorStyle.backgroundColor), adjacent);
      const border = composite(rgba(style.borderTopColor), fill);
      const inside = ratio(border, fill), outside = ratio(border, adjacent);
      const measured = Math.min(inside, outside);
      const result = { id: element.id || element.querySelector('input')?.id, sample: element.tagName.toLowerCase(), ratio: Number(measured.toFixed(2)), fillRatio: Number(inside.toFixed(2)), adjacentRatio: Number(outside.toFixed(2)), required: 3 };
      controlBorders.push(result);
      if (measured + .001 < 3) failures.push(result);
    }
    return { checked: pairs.length, opaqueChecked: pairs.filter(pair => pair.opaque).length, minimum: Math.min(...pairs.map(pair => pair.ratio)), failures, skipped, excluded, pairs, controlBorders };
  });
}
const pageColor = page => page.locator('html').evaluate(element => getComputedStyle(element).getPropertyValue('--page').trim());
async function assertPageColor(page, expected) {
  // MediaQueryList change events are queued after emulation; wait for the applied appearance.
  await page.waitForFunction(expected => getComputedStyle(document.documentElement).getPropertyValue('--page').trim() === expected, expected, { timeout: 1000 });
  assert.equal(await pageColor(page), expected);
}

const nodeIds = ['brief', 'catalog', 'assembler', 'design', 'review'];
const expectedRelationships = [
  ['Project brief', 'Provides context and constraints', 'Design preparation'],
  ['Theme catalog', 'Provides selected, credited design knowledge', 'Design preparation'],
  ['Design preparation', "Defines the project's design decisions", 'Project design.md'],
  ['Project design.md', 'Presents decisions and open questions for review', 'Human review']
];
const node = (page, id) => page.locator('.system-node[data-node-id="' + id + '"]');
const inspect = (page, id) => page.locator('#inspect-node-' + id);
const detail = (page, id) => page.locator('#detail-' + id);
const focusedId = page => page.locator(':focus').getAttribute('id');
async function hitTargets(page) {
  return page.evaluate(() => {
    const selectors = 'button:not(:disabled), select:not(:disabled), input:not(:disabled), textarea:not(:disabled), summary, a.button, .section-nav a, [id^="inspect-node-"], .text-link, .atlas-brand, .preview-footer nav a';
    return [...document.querySelectorAll(selectors)].filter(element => element.getClientRects().length).map(element => {
      const target = ['checkbox', 'radio'].includes(element.type) ? element.labels?.[0] || element : element;
      const rect = target.getBoundingClientRect();
      return { id: element.id || element.tagName.toLowerCase(), via: target === element ? 'control' : 'associated label', width: Number(rect.width.toFixed(2)), height: Number(rect.height.toFixed(2)) };
    });
  });
}
async function densityMetrics(page) {
  return page.locator('.specimen-panel').evaluate(element => ({
    height: element.getBoundingClientRect().height,
    padding: { blockStart: parseFloat(getComputedStyle(element).paddingBlockStart), blockEnd: parseFloat(getComputedStyle(element).paddingBlockEnd), inlineStart: parseFloat(getComputedStyle(element).paddingInlineStart), inlineEnd: parseFloat(getComputedStyle(element).paddingInlineEnd) }
  }));
}
async function stateContrast(page, label) {
  const colors = await contrast(page);
  assert.ok(colors.checked > 0 && colors.opaqueChecked > 0, label + ': expected nonzero opaque rendered HTML text samples');
  assert.deepEqual(colors.failures, [], label + ': contrast failures ' + JSON.stringify(colors.failures));
  return { checked: colors.checked, opaqueChecked: colors.opaqueChecked, minimum: colors.minimum, skipped: colors.skipped, excluded: colors.excluded, controlBorders: colors.controlBorders };
}
async function stateTargets(page, label) {
  const targets = await hitTargets(page);
  assert.ok(targets.length > 0, label + ': expected rendered interactive targets');
  assert.deepEqual(targets.filter(target => target.height < 43.99 || target.width < 43.99), [], label + ': controls and associated labels retain 44px targets ' + JSON.stringify(targets));
  return targets;
}
async function immediateFeedback(page, label) {
  const target = page.locator('#show-grid');
  const motion = await target.evaluate(element => ({ duration: getComputedStyle(element).transitionDuration, animation: getComputedStyle(element).animationName }));
  assert.ok(motion.duration.split(',').every(duration => parseFloat(duration) === 0), label + ': feedback must be immediate');
  assert.equal(motion.animation, 'none', label + ': no decorative animation');
  await target.hover();
  await page.mouse.down();
  const transform = await target.evaluate(element => getComputedStyle(element).transform);
  await page.mouse.move(1, 1);
  await page.mouse.up();
  assert.equal(transform, 'none', label + ': pressing does not transform');
  return { ...motion, pressTransform: transform };
}
async function openNativeDisclosure(page, selector) {
  const disclosure = page.locator(selector);
  assert.equal(await disclosure.count(), 1, 'Expected native disclosure ' + selector);
  const initial = await disclosure.evaluate(element => element.open);
  await disclosure.locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await disclosure.evaluate(element => element.open), !initial);
  await page.keyboard.press('Enter');
  assert.equal(await disclosure.evaluate(element => element.open), initial);
}
async function assertSelected(page, id) {
  const visibleDetails = await page.locator('.node-detail:visible').evaluateAll(elements => elements.map(element => element.dataset.detailId));
  assert.deepEqual(visibleDetails, [id], 'Only the selected architecture detail is visible');
  assert.equal(await detail(page, id).isVisible(), true);
  assert.deepEqual(await page.locator('[id^="inspect-node-"][aria-current="true"]').evaluateAll(elements => elements.map(element => element.id)), ['inspect-node-' + id], 'The matching Inspect link identifies the current selection');
  const readingMarkers = await page.locator('.system-node .reading-marker:visible').evaluateAll(elements => elements.map(element => ({ node: element.closest('[data-node-id]').dataset.nodeId, text: element.textContent.trim() })));
  assert.deepEqual(readingMarkers, [{ node: id, text: 'Reading' }], 'Current detail has exactly one visible text marker, independent of color');
  const index = nodeIds.indexOf(id);
  assert.equal(await page.locator('#previous-node').isDisabled(), index === 0, 'Previous disables only at the first node');
  assert.equal(await page.locator('#next-node').isDisabled(), index === nodeIds.length - 1, 'Next disables only at the final node');
}
async function assertGridName(page, expectedPressed) {
  const toggle = page.locator('#show-grid');
  assert.equal(await toggle.getAttribute('aria-pressed'), String(expectedPressed));
  const snapshot = await toggle.ariaSnapshot();
  assert.equal(/button "([^"]+)"/.exec(snapshot)?.[1], 'Show grid', 'The actual accessible toggle name remains exactly Show grid');
  assert.equal(await page.getByRole('button', { name: 'Show grid', exact: true }).count(), 1, 'The toggle is discoverable by its exact stable accessible name');
}
async function gridDecoration(page) {
  return page.locator('#workspace, .map-frame, .system-map-wrap').evaluateAll(elements => elements.map(element => ({
    element: element.id || element.className,
    layers: ['', '::before', '::after'].map(pseudo => {
      const style = getComputedStyle(element, pseudo || null);
      return { pseudo, image: style.backgroundImage, opacity: style.opacity, display: style.display, visibility: style.visibility };
    })
  })));
}
async function workspaceSemantics(page) {
  const ids = await page.locator('.system-node').evaluateAll(elements => elements.map(element => element.dataset.nodeId));
  assert.deepEqual(ids, nodeIds, 'The diagram and outline retain the same five nodes in reading order');
  const rows = await page.locator('#relationships-table tbody tr').evaluateAll(elements => elements.map(element => [...element.querySelectorAll('th, td')].map(cell => cell.textContent.trim())));
  assert.equal(rows.length, 4, 'Four conceptual relationships have readable table rows');
  assert.ok(rows.every(row => row.length >= 3 && row.every(Boolean)), 'Each relationship names source, relation, and destination');
  assert.deepEqual(rows, expectedRelationships, 'Both inputs feed preparation, then the document goes to human review with every relation explicitly labeled');
  assert.equal(await page.locator('#relationships-table').isVisible(), true, 'The text account remains readable in both presentations');
  const relationshipLabels = await page.locator('#relationships-table thead th').allTextContents();
  assert.ok(relationshipLabels.length >= 3, 'Relationships use native table headings');
  return { nodeOrder: ids, relationships: rows, columnHeadings: relationshipLabels.map(text => text.trim()) };
}

try {
  browser = await playwright.chromium.launch({ headless: true, ...(options.browser ? { executablePath: options.browser } : {}) });
  report.browser = browser.version();
  if (options.module) report.playwright = JSON.parse(await readFile(path.join(path.dirname(path.resolve(options.module)), 'package.json'), 'utf8')).version;
  const context = await newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light', reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await page.goto(url);
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('#appearance').inputValue(), 'system');
  assert.equal(await page.locator('#density').inputValue(), 'comfortable');
  assert.equal(await page.locator('#motion').isChecked(), true);
  assert.equal(await page.locator('#presentation').inputValue(), 'diagram');
  assert.equal(await page.locator('#workspace').getAttribute('data-presentation'), 'diagram');
  assert.equal(await page.locator('#workspace').getAttribute('data-grid'), 'on');
  await assertSelected(page, 'brief');
  await assertGridName(page, true);
  assert.equal(await page.locator('#workspace-status').getAttribute('role'), 'status');
  const originalSemantics = await workspaceSemantics(page);
  const detailNames = {};
  for (const id of nodeIds) {
    detailNames[id] = (await page.locator('#detail-heading-' + id).textContent()).trim();
    assert.ok(detailNames[id], 'Every node has a named detail');
    assert.equal(await inspect(page, id).getAttribute('href'), '#detail-' + id);
    assert.equal(await page.getByRole('link', { name: 'Inspect ' + detailNames[id], exact: true }).count(), 1, 'Each Inspect link exposes its distinct destination context');
  }
  const specimenFields = await page.locator('#specimen input, #specimen select, #specimen textarea').evaluateAll(elements => elements.map(element => ({ id: element.id, type: element.tagName.toLowerCase(), inputType: element.type, value: element.value })));
  assert.ok(specimenFields.some(field => field.type === 'input') && specimenFields.some(field => field.type === 'select'), 'Specimen includes native text-input and select fields');
  assert.ok(specimenFields.every(field => field.id), 'Specimen native fields have stable IDs');
  for (const field of specimenFields.filter(field => field.inputType === 'text' && !field.value)) await page.locator('#' + field.id).fill('A local architecture specimen');
  const boundaryIds = await page.locator('select:not(:disabled), input[type="search"]:not(:disabled), input[type="text"]:not(:disabled), textarea:not(:disabled)').evaluateAll(elements => elements.map(element => element.id || element.querySelector('input')?.id));
  assert.ok(boundaryIds.every(Boolean), 'Every expected native text/select field boundary has a stable identifier');
  for (const id of ['appearance', 'density', 'presentation', ...specimenFields.filter(field => field.inputType !== 'checkbox').map(field => field.id)]) assert.ok(boundaryIds.includes(id), 'The boundary expectation includes #' + id);
  check('Five conceptual preparation nodes, four readable labeled relationships, default preferences, stable grid toggle, current detail, and native specimen fields', { ...originalSemantics, detailNames, specimenFields });
  await page.locator('#motion').uncheck();
  const appearanceColors = {}, measuredDensities = {};
  for (const appearance of ['light', 'dark']) {
    await page.locator('#appearance').selectOption(appearance);
    appearanceColors[appearance] = await pageColor(page);
    for (const density of ['comfortable', 'compact']) {
      await page.locator('#density').selectOption(density);
      for (const width of [320, 390, 768, 1280, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        const sizes = await reflow(page, appearance + '/' + density + '/' + width);
        const colors = await stateContrast(page, appearance + '/' + density + '/' + width);
        for (const id of boundaryIds) assert.ok(colors.controlBorders.some(sample => sample.id === id), 'Expected sampled boundary for #' + id);
        const targets = await stateTargets(page, appearance + '/' + density + '/' + width);
        if (width === 1440 && appearance === 'light') measuredDensities[density] = await densityMetrics(page);
        if (width <= 390) for (const id of boundaryIds) {
          const fieldText = await page.locator('#' + id).evaluate(element => element.matches('select, textarea, input[type="text"], input[type="search"]') ? parseFloat(getComputedStyle(element).fontSize) : null);
          if (fieldText !== null) assert.ok(fieldText >= 16, 'Mobile input/select text stays at least 16px for #' + id);
        }
        report.layouts.push({ appearance, density, ...sizes, contrast: colors, targets });
      }
    }
  }
  assert.notEqual(appearanceColors.light, appearanceColors.dark, 'Appearance modes use different page colors');
  for (const [density, padding] of [['comfortable', 24], ['compact', 16]]) assert.ok(Object.values(measuredDensities[density].padding).every(value => value === padding), 'Rendered specimen padding is ' + padding + 'px in ' + density);
  assert.ok(measuredDensities.comfortable.height > measuredDensities.compact.height + 1, 'Density visibly changes actual specimen height');
  check('Light/dark × comfortable/compact × 320/390/768/1280/1440 reflow, opaque HTML text/control boundaries, actual 24/16px density, and 44px targets', { combinations: report.layouts.length, boundaryIds, measuredDensities });
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto(url);
  await page.keyboard.press('Tab');
  assert.equal((await page.locator(':focus').textContent()).trim(), 'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').evaluate(element => element.tagName), 'MAIN');
  const nativeCases = await page.locator('#studio details').evaluateAll(elements => elements.map(element => element.id));
  assert.equal(nativeCases.length, 3, 'Three fictional studio briefs use native disclosures');
  assert.ok(nativeCases.every(Boolean), 'Every native disclosure has a stable ID');
  for (const id of nativeCases) await openNativeDisclosure(page, '#' + id);
  check('Keyboard skip link focuses main and all three native studio disclosures open and close by keyboard', { cases: nativeCases });
  for (const id of nodeIds) {
    await inspect(page, id).focus();
    await page.keyboard.press('Enter');
    await assertSelected(page, id);
    assert.equal(await focusedId(page), 'detail-heading-' + id, 'Inspect focuses the detail heading');
    await page.locator('#back-to-node-' + id).focus();
    await page.keyboard.press('Enter');
    assert.equal(await focusedId(page), 'inspect-node-' + id, 'Back returns to the corresponding node Inspect link');
    await assertSelected(page, id);
  }
  check('Every node Inspect focuses its article heading; every Back restores its corresponding link while preserving detail');
  await inspect(page, 'assembler').click();
  await page.locator('#presentation').focus();
  await page.locator('#presentation').selectOption('outline');
  assert.equal(await page.locator('#workspace').getAttribute('data-presentation'), 'outline');
  assert.equal(await focusedId(page), 'presentation', 'Changing presentation keeps focus on the native select');
  await assertSelected(page, 'assembler');
  assert.deepEqual(await workspaceSemantics(page), originalSemantics, 'Outline preserves the full conceptual relationship account');
  const outlineContrast = await stateContrast(page, 'Outline with nondefault assembler detail');
  await stateTargets(page, 'Outline with nondefault assembler detail');
  const outlineBounds = await page.locator('.system-node').evaluateAll(elements => elements.map(element => ({ top: element.getBoundingClientRect().top, left: element.getBoundingClientRect().left })));
  assert.ok(outlineBounds.every((bounds, index) => index === 0 || bounds.top > outlineBounds[index - 1].top), 'Outline presents nodes in vertical reading order');
  await page.locator('#show-grid').focus();
  await page.keyboard.press('Space');
  await assertGridName(page, false);
  assert.equal(await page.locator('#workspace').getAttribute('data-grid'), 'off');
  assert.equal(await focusedId(page), 'show-grid', 'Grid toggle preserves its initiating focus');
  await assertSelected(page, 'assembler');
  assert.deepEqual(await workspaceSemantics(page), originalSemantics, 'Turning off the decorative grid preserves nodes and relationships');
  await page.locator('#presentation').focus();
  await page.locator('#presentation').selectOption('diagram');
  assert.equal(await focusedId(page), 'presentation');
  assert.equal(await page.locator('#workspace').getAttribute('data-grid'), 'off', 'Changing back to Diagram preserves grid-off state');
  await assertSelected(page, 'assembler');
  await assertGridName(page, false);
  const diagramOffContrast = await stateContrast(page, 'Diagram/grid-off with assembler detail');
  await stateTargets(page, 'Diagram/grid-off with assembler detail');
  const gridOffStyle = await gridDecoration(page);
  await page.locator('#show-grid').click();
  await assertGridName(page, true);
  await assertSelected(page, 'assembler');
  const gridOnStyle = await gridDecoration(page);
  assert.notDeepEqual(gridOnStyle, gridOffStyle, 'Grid toggle changes rendered decorative background or pseudo-element');
  check('Outline/Diagram and grid-off/on preserve nondefault assembler detail, current node, control focus, and every relationship; stable ARIA toggle name and rendered decoration verified', { outlineContrast, diagramOffContrast, gridOnStyle, gridOffStyle });
  await page.locator('#show-grid').click();
  await page.locator('#presentation').selectOption('outline');
  await inspect(page, 'brief').click();
  for (let index = 1; index < nodeIds.length; index++) {
    await page.locator('#next-node').focus();
    await page.keyboard.press('Enter');
    await assertSelected(page, nodeIds[index]);
    assert.equal(await focusedId(page), 'detail-heading-' + nodeIds[index]);
    assert.equal(await page.locator('#workspace').getAttribute('data-presentation'), 'outline');
    assert.equal(await page.locator('#workspace').getAttribute('data-grid'), 'off');
  }
  for (let index = nodeIds.length - 2; index >= 0; index--) {
    await page.locator('#previous-node').focus();
    await page.keyboard.press('Enter');
    await assertSelected(page, nodeIds[index]);
    assert.equal(await focusedId(page), 'detail-heading-' + nodeIds[index]);
  }
  await inspect(page, 'design').click();
  await page.locator('#reset-workspace').focus();
  await page.keyboard.press('Enter');
  await assertSelected(page, 'brief');
  assert.equal(await page.locator('#presentation').inputValue(), 'diagram');
  assert.equal(await page.locator('#workspace').getAttribute('data-presentation'), 'diagram');
  assert.equal(await page.locator('#workspace').getAttribute('data-grid'), 'on');
  await assertGridName(page, true);
  assert.equal(await focusedId(page), 'inspect-node-brief');
  assert.match(await page.locator('#workspace-status').textContent(), /reset|restor/i);
  check('Previous/Next follow fixed order, focus headings and disable at ends in Outline/grid-off; Reset restores default Diagram/grid-on/brief and focuses the first Inspect link');
  await page.locator('#appearance').selectOption('system');
  await page.emulateMedia({ colorScheme: 'dark' });
  await assertPageColor(page, appearanceColors.dark);
  await page.emulateMedia({ colorScheme: 'light' });
  await assertPageColor(page, appearanceColors.light);
  await page.locator('#appearance').selectOption('light');
  await page.locator('#density').selectOption('compact');
  await page.locator('#motion').uncheck();
  await page.emulateMedia({ colorScheme: 'dark' });
  await assertPageColor(page, appearanceColors.light);
  await page.locator('#presentation').selectOption('outline');
  await page.locator('#show-grid').click();
  await inspect(page, 'review').click();
  await page.reload();
  assert.equal(await page.locator('#appearance').inputValue(), 'light');
  assert.equal(await page.locator('#density').inputValue(), 'compact');
  assert.equal(await page.locator('#motion').isChecked(), false);
  assert.equal(await page.locator('#presentation').inputValue(), 'diagram');
  assert.equal(await page.locator('#workspace').getAttribute('data-grid'), 'on');
  await assertGridName(page, true);
  await assertSelected(page, 'brief');
  check('System follows live OS appearance; explicit appearance/density/motion persist; nondefault workspace presentation, grid, and current detail reset on reload');
  await page.locator('#motion').check();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const reduced = await immediateFeedback(page, 'Live reduced motion');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('#motion').uncheck();
  const motionOff = await immediateFeedback(page, 'Explicit motion off');
  check('Live reduced-motion and explicit motion-off make feedback immediate and remove press transforms', { reduced, motionOff });
  await page.emulateMedia({ forcedColors: 'active' });
  await page.locator('#appearance').focus();
  const focus = await page.locator('#appearance').evaluate(element => ({ width: getComputedStyle(element).outlineWidth, offset: getComputedStyle(element).outlineOffset, color: getComputedStyle(element).outlineColor }));
  assert.equal(focus.width, '3px'); assert.equal(focus.offset, '5px');
  check('Forced-colors focus retains a 3px outline with 5px offset', focus);
  await page.emulateMedia({ forcedColors: 'none' });
  await page.setViewportSize({ width: 640, height: 1000 });
  const beforeResize = await page.locator('.intro-description').evaluate(element => parseFloat(getComputedStyle(element).fontSize));
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  const resize = await reflow(page, '200% CSS text resize at 640px');
  const afterResize = await page.locator('.intro-description').evaluate(element => parseFloat(getComputedStyle(element).fontSize));
  assert.ok(afterResize >= beforeResize * 1.99, 'CSS resize must actually double body sample text');
  await stateTargets(page, '200% CSS text resize');
  check('200% CSS text resize actually doubles the body sample and reflows at 640px; separate from untested native browser zoom', { ...resize, beforeResize, afterResize });
  await page.evaluate(() => { document.documentElement.style.removeProperty('font-size'); });
  const cdp = await context.newCDPSession(page);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  const { root: documentNode } = await cdp.send('DOM.getDocument');
  report.renderedFonts = {};
  for (const selector of ['.intro-description', '#type-display', '.technical', '[lang="vi"]']) {
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: documentNode.nodeId, selector });
    assert.ok(nodeId, 'Expected local sans/mono-heading/mono-label/Vietnamese sample ' + selector);
    const fonts = (await cdp.send('CSS.getPlatformFontsForNode', { nodeId })).fonts;
    assert.ok(fonts.length > 0, 'Expected actual rendered glyphs for ' + selector);
    assert.equal(fonts.some(font => font.isCustomFont), false, 'Preview uses local fallback fonts');
    report.renderedFonts[selector] = fonts.map(font => ({ family: font.familyName, custom: font.isCustomFont, glyphCount: font.glyphCount }));
  }
  check('Actual local body, technical-heading, mono-label, and Vietnamese glyph families recorded through Chromium CDP', report.renderedFonts);
  await context.close();
  const directContext = await newContext({ viewport: { width: 1280, height: 1000 } });
  const directPage = await directContext.newPage();
  await directPage.goto(url + '#detail-catalog');
  await assertSelected(directPage, 'catalog');
  await directPage.reload();
  await assertSelected(directPage, 'catalog');
  await directPage.evaluate(() => { location.hash = '#detail-review'; });
  await directPage.waitForFunction(() => document.activeElement?.id === 'detail-heading-review');
  await assertSelected(directPage, 'review');
  await directPage.locator('#presentation').selectOption('outline');
  await directPage.locator('#show-grid').click();
  await directPage.locator('#reset-workspace').click();
  await assertSelected(directPage, 'brief');
  assert.equal(await directPage.evaluate(() => location.hash), '', 'Reset removes the direct article fragment');
  assert.equal(await directPage.locator('#presentation').inputValue(), 'diagram');
  await assertGridName(directPage, true);
  assert.equal(await focusedId(directPage), 'inspect-node-brief');
  await directPage.goto(url + '#detail-unknown');
  await assertSelected(directPage, 'brief');
  check('Valid direct article URLs preserve their named detail on reload; live valid fragments focus headings; Reset clears the fragment and invalid initial fragments fall back to brief');
  await directContext.close();
  for (const mode of ['blocked', 'invalid', 'malformed']) {
    const failureContext = await newContext({ colorScheme: 'dark' });
    await failureContext.addInitScript(mode => {
      if (mode === 'blocked') Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } });
      else {
        const getItem = Storage.prototype.getItem;
        Storage.prototype.getItem = function (key) {
          if (key !== 'interface-atlas-blueprint-preview') return getItem.call(this, key);
          return mode === 'malformed' ? '{broken-json' : JSON.stringify({ appearance: 'invalid-choice', density: 'invalid-choice', motion: 'invalid-choice' });
        };
      }
    }, mode);
    const failurePage = await failureContext.newPage();
    await failurePage.goto(url);
    await assertPageColor(failurePage, appearanceColors.dark);
    assert.equal(await failurePage.locator('#appearance').inputValue(), 'system');
    assert.equal(await failurePage.locator('#density').inputValue(), 'comfortable');
    assert.equal(await failurePage.locator('#motion').isChecked(), true);
    await failurePage.locator('#appearance').selectOption('light');
    await assertPageColor(failurePage, appearanceColors.light);
    await failurePage.locator('#density').selectOption('compact');
    await failurePage.locator('#motion').uncheck();
    await failurePage.locator('#presentation').selectOption('outline');
    await failurePage.locator('#show-grid').click();
    await assertGridName(failurePage, false);
    await inspect(failurePage, 'design').click();
    await assertSelected(failurePage, 'design');
    assert.equal(await focusedId(failurePage), 'detail-heading-design');
    await failureContext.close();
  }
  check('Blocked, invalid, and malformed storage retain defaults and usable preferences, presentation/grid choices, and node inspection');
  const noJsContext = await newContext({ javaScriptEnabled: false, colorScheme: 'dark', viewport: { width: 320, height: 1000 } });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(url);
  await assertPageColor(noJsPage, appearanceColors.dark);
  await reflow(noJsPage, 'No JavaScript at 320px');
  assert.equal(await noJsPage.locator('h1').count(), 1);
  for (const id of nodeIds) {
    assert.equal(await node(noJsPage, id).isVisible(), true, 'Node ' + id + ' remains visible without JavaScript');
    assert.equal(await detail(noJsPage, id).isVisible(), true, 'Full detail ' + id + ' remains readable without JavaScript');
    assert.equal(await noJsPage.locator('#back-to-node-' + id).getAttribute('type'), 'button', 'Back is a native button');
    assert.equal(await noJsPage.locator('#back-to-node-' + id).isVisible(), false, 'Runtime Back stays hidden without JavaScript');
  }
  assert.deepEqual(await workspaceSemantics(noJsPage), originalSemantics);
  const noJsControls = await noJsPage.locator('#appearance, #density, #motion, #presentation, #show-grid, #reset-workspace, #previous-node, #next-node').evaluateAll(elements => elements.map(element => ({ id: element.id, disabled: element.matches(':disabled') })));
  assert.equal(noJsControls.length, 8, 'All expected runtime controls exist without JavaScript');
  assert.deepEqual(noJsControls.filter(control => !control.disabled), [], 'Runtime preferences, presentation, grid, reset, and Previous/Next remain disabled without JavaScript');
  for (const field of specimenFields) {
    const control = noJsPage.locator('#' + field.id);
    assert.equal(await control.isDisabled(), false, 'Native specimen fields stay usable without JavaScript');
    if (field.inputType === 'text') {
      await control.fill('A native field without JavaScript');
      assert.equal(await control.inputValue(), 'A native field without JavaScript');
    } else if (field.type === 'select') {
      const lastOption = await control.locator('option').last().getAttribute('value') || await control.locator('option').last().textContent();
      await control.selectOption(lastOption);
      assert.equal(await control.inputValue(), lastOption);
    } else if (field.inputType === 'checkbox') {
      const initialChecked = await control.isChecked();
      await control.setChecked(!initialChecked);
      assert.equal(await control.isChecked(), !initialChecked);
    }
  }
  for (const id of nativeCases) await openNativeDisclosure(noJsPage, '#' + id);
  await inspect(noJsPage, 'review').click();
  assert.equal(await noJsPage.evaluate(() => location.hash), '#detail-review', 'Inspect is usable native article navigation without JavaScript');
  const noJsColors = await stateContrast(noJsPage, 'No-JavaScript static content');
  check('No-JavaScript exposes all five full details and relationships, usable native Inspect anchors and studio disclosures; only runtime controls disable and Back hides; native specimen fields remain usable', { contrast: noJsColors, disabledRuntimeControls: noJsControls.length, usableNativeSpecimenFields: specimenFields.map(field => field.id) });
  await noJsContext.close();
  if (output) {
    await mkdir(output, { recursive: true });
    report.screenshots = [];
    const captureContext = await newContext({ reducedMotion: 'reduce' });
    const capturePage = await captureContext.newPage();
    await capturePage.goto(url);
    for (const [appearance, width, filename] of [['light', 1440, 'light-desktop.png'], ['dark', 1440, 'dark-desktop.png'], ['light', 390, 'light-mobile.png']]) {
      await capturePage.setViewportSize({ width, height: 1000 });
      await capturePage.locator('#appearance').selectOption(appearance);
      await capturePage.locator('#density').selectOption('comfortable');
      await inspect(capturePage, appearance === 'dark' ? 'design' : 'brief').click();
      const section = appearance === 'light' && width > 390 ? '#studio' : '#workspace';
      if (width > 390) {
        const bounds = await capturePage.locator(section).boundingBox();
        await capturePage.setViewportSize({ width, height: Math.max(1000, Math.ceil(bounds.height) + 2) });
        await capturePage.locator(section).evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY));
        await capturePage.locator(section).screenshot({ path: path.join(output, filename) });
      } else {
        await capturePage.locator(section).evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY));
        await capturePage.screenshot({ path: path.join(output, filename) });
      }
      report.screenshots.push({ filename, appearance, width, section, scope: width > 390 ? 'Complete section' : '1000px viewport from the workspace start' });
    }
    await captureContext.close();
  }
  assert.deepEqual(errors, [], 'Browser runtime errors');
  assert.deepEqual(external, [], 'Preview must not request external resources');
  assert.deepEqual(failedResources, [], 'Preview resources load successfully');
  for (const filename of Object.keys(report.testedFiles)) assert.equal(createHash('sha256').update(await readFile(path.join(preview, filename))).digest('hex'), report.testedFiles[filename], filename + ' stayed unchanged during verification');
  assert.equal(createHash('sha256').update(await readFile(fileURLToPath(import.meta.url))).digest('hex'), report.validatorSha256, 'Validator stayed unchanged during verification');
  check('No browser runtime errors, external requests or failed preview resources; source and validator hashes remain unchanged during verification');
  report.passed = true;
  if (output) await writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
} catch (error) {
  report.passed = false;
  report.failure = { message: error.message, stack: error.stack };
  if (output) { await mkdir(output, { recursive: true }); await writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n'); }
  process.stderr.write(error.stack + '\n');
  process.exitCode = 1;
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
