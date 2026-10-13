import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Optional browser evidence for Botanical. These checks are original Atlas tooling,
// adapted from the Editorial and Swiss preview validators; no upstream UI code is used.
const options = {};
for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index];
  if (!['--module', '--browser', '--output', '--preview'].includes(key) || !process.argv[index + 1]) {
    throw new Error('Usage: node tools/validate-botanical.mjs [--module path/to/playwright/index.mjs] [--browser path/to/chromium] [--output directory] [--preview directory]');
  }
  options[key.slice(2)] = process.argv[index + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'themes/botanical/preview'));
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
    'No screen-reader, touch-device, native browser zoom, or real backend testing. Native specimen inputs/selects/checkboxes remain usable without JavaScript; only runtime preferences, filters, and reading-list actions require it.',
    'Contrast samples are rendered HTML text composited over solid backgrounds and enabled select/text-input/textarea boundaries against their fill and adjacent background. Each layout must include nonzero opaque HTML text and every preference/filter/specimen field boundary. SVG artwork, disabled controls, placeholders, text selection, native popup menus, checkbox glyph internals, and backgrounds with images are outside this check; exclusions and unsupported samples are recorded.',
    'Fallback font families are recorded from Chromium. Named webfont files are not distributed or loaded.',
    '44px target samples include enabled native controls, associated checkbox labels, summary controls, button-styled links, article title/Read links, section/document navigation, and the Atlas brand. Contextual inline source links are excluded.',
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
    const excluded = { svgElements: 0, disabledTextSamples: 0, unrenderedTextSamples: 0, visuallyHiddenTextSamples: 0 };
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
    for (const element of document.querySelectorAll('select:not(:disabled), input[type="search"]:not(:disabled), input[type="text"]:not(:disabled), textarea:not(:disabled), .choice-label:has(input:not(:disabled))')) {
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

const noteIds = ['room', 'edge', 'patina', 'sequence'];
const stableKeepNames = {};
const card = (page, id) => page.locator('[data-note-id="' + id + '"]');
const inspect = (page, id) => page.locator('#inspect-note-' + id);
const detail = (page, id) => page.locator('[data-detail-id="' + id + '"]');
const focusedId = page => page.locator(':focus').getAttribute('id');
const keepInCard = (page, id) => card(page, id).locator('[data-keep-id="' + id + '"]');
const keepInDetail = (page, id) => detail(page, id).locator('[data-keep-id="' + id + '"]');
const removal = (page, id) => page.locator('[data-remove-id="' + id + '"]');
async function hitTargets(page) {
  return page.evaluate(() => {
    const selectors = 'button:not(:disabled), select:not(:disabled), input:not(:disabled), textarea:not(:disabled), summary, a.button, .section-nav a, .note-card h4 a, .read-link, .text-link, .atlas-brand, .preview-footer nav a';
    return [...document.querySelectorAll(selectors)].filter(element => element.getClientRects().length).map(element => {
      const target = ['checkbox', 'radio'].includes(element.type) ? element.labels?.[0] || element : element;
      const rect = target.getBoundingClientRect();
      return { id: element.id || element.getAttribute('data-keep-id') || element.getAttribute('data-remove-id') || element.tagName.toLowerCase(), via: target === element ? 'control' : 'associated label', width: Number(rect.width.toFixed(2)), height: Number(rect.height.toFixed(2)) };
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
  const target = keepInCard(page, 'room');
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
async function assertKept(page, expected) {
  assert.match(await page.locator('#kept-count').textContent(), new RegExp('^\\s*' + expected.length + '\\b'));
  const actual = await page.locator('#kept-list [data-remove-id]').evaluateAll(elements => elements.map(element => element.dataset.removeId));
  assert.deepEqual(actual, expected, 'Reading list uses unique notes in the fixed original article order');
  assert.equal(new Set(actual).size, actual.length, 'A note cannot appear twice');
  for (const id of noteIds) {
    const toggles = await page.locator('[data-keep-id="' + id + '"]').evaluateAll(elements => elements.map(element => ({ label: [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent).join('').trim(), context: element.textContent.trim(), pressed: element.getAttribute('aria-pressed') })));
    assert.equal(toggles.length, 2, 'Expected card and detail Keep note controls for ' + id);
    assert.ok(toggles.every(toggle => toggle.label === 'Keep note' && toggle.context.startsWith('Keep note: ') && toggle.pressed === String(expected.includes(id))), 'Both Keep note controls have stable labels with fixed note context and synchronized pressed state for ' + id);
    assert.equal(toggles[0].context, toggles[1].context, 'Card and detail provide the same fixed accessible note context');
    const visibleToggles = page.locator('[data-keep-id="' + id + '"]:visible');
    for (let index = 0; index < await visibleToggles.count(); index++) {
      const snapshot = await visibleToggles.nth(index).ariaSnapshot();
      const actualName = /button "([^"]+)"/.exec(snapshot)?.[1];
      assert.equal(actualName, stableKeepNames[id], 'The actual accessible Keep note name remains stable when pressed, including generated content for ' + id);
    }
    assert.equal(await page.getByRole('button', { name: stableKeepNames[id], exact: true }).count(), await visibleToggles.count(), 'Every visible Keep button remains discoverable under its exact original accessible name');
  }
  assert.equal(await page.locator('#export-list').isDisabled(), expected.length === 0);
  assert.equal(await page.locator('#clear-list').isDisabled(), expected.length === 0);
}
async function assertEmptyExportExplanation(page) {
  const described = (await page.locator('#export-list').getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
  assert.ok(described.length > 0, 'The disabled export needs an associated explanation');
  const explanations = await page.evaluate(ids => ids.map(id => { const element = document.getElementById(id); return { id, visible: !!element?.getClientRects().length, text: element?.textContent.trim() }; }), described);
  assert.ok(explanations.some(item => item.visible && /keep|select|add/i.test(item.text) && /note/i.test(item.text)), 'A visible explanation tells readers how to enable export');
  return explanations;
}

try {
  browser = await playwright.chromium.launch({ headless: true, ...(options.browser ? { executablePath: options.browser } : {}) });
  report.browser = browser.version();
  if (options.module) report.playwright = JSON.parse(await readFile(path.join(path.dirname(path.resolve(options.module)), 'package.json'), 'utf8')).version;
  const context = await newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light', reducedMotion: 'no-preference', acceptDownloads: true });
  const page = await context.newPage();
  await page.goto(url);
  assert.equal(await page.locator('#appearance').inputValue(), 'system');
  assert.equal(await page.locator('#density').inputValue(), 'comfortable');
  assert.equal(await page.locator('#motion').isChecked(), true);
  assert.deepEqual(await page.locator('[data-note-id]').evaluateAll(elements => elements.map(element => element.dataset.noteId)), noteIds);
  assert.deepEqual(await page.locator('[data-detail-id]').evaluateAll(elements => elements.map(element => element.dataset.detailId)), noteIds);
  assert.equal(await detail(page, 'room').isVisible(), true);
  for (const id of noteIds) {
    stableKeepNames[id] = /button "([^"]+)"/.exec(await keepInCard(page, id).ariaSnapshot())?.[1];
    assert.match(stableKeepNames[id], /^Keep note:/, 'Expected an accessible Keep note name with fixed context for ' + id);
  }
  await assertKept(page, []);
  const emptyExplanation = await assertEmptyExportExplanation(page);
  assert.equal(await page.locator('#reading-status').getAttribute('role'), 'status');
  assert.equal(await page.locator('#list-status').getAttribute('role'), 'status');
  const originalNotes = {};
  for (const id of noteIds) originalNotes[id] = { title: (await card(page, id).locator('h4').textContent()).trim(), summary: (await card(page, id).locator('.note-summary').textContent()).trim(), topic: await card(page, id).getAttribute('data-topic') };
  const specimenFields = await page.locator('#specimen input[type="text"], #specimen select, #specimen textarea').evaluateAll(elements => elements.map(element => ({ id: element.id, type: element.tagName.toLowerCase(), value: element.value })));
  assert.ok(specimenFields.some(field => field.type === 'input') && specimenFields.some(field => field.type === 'select'), 'Specimen includes native text-input and select fields');
  for (const field of specimenFields.filter(field => field.type === 'input' && !field.value)) await page.locator('#' + field.id).fill('A local design specimen');
  const boundaryIds = ['appearance', 'density', 'note-search', 'note-topic', ...specimenFields.map(field => field.id)];
  check('Four original design notes, default preferences, synchronized empty reading list, live status regions, and explained disabled export', { notes: originalNotes, specimenFields, emptyExplanation });
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
        if (width <= 390) for (const id of boundaryIds) assert.ok(parseFloat(await page.locator('#' + id).evaluate(element => getComputedStyle(element).fontSize)) >= 16, 'Mobile input/select text stays at least 16px for #' + id);
        report.layouts.push({ appearance, density, ...sizes, contrast: colors, targets });
      }
    }
  }
  assert.notEqual(appearanceColors.light, appearanceColors.dark, 'Appearance modes use different page colors');
  for (const [density, padding] of [['comfortable', 24], ['compact', 16]]) {
    assert.ok(Object.values(measuredDensities[density].padding).every(value => value === padding), 'Rendered specimen padding is ' + padding + 'px in ' + density);
  }
  assert.ok(measuredDensities.comfortable.height > measuredDensities.compact.height + 1, 'Density visibly changes actual specimen height');
  check('Light/dark × comfortable/compact × 320/390/768/1280/1440 reflow, opaque HTML text/control boundaries, 24/16px actual specimen density, and 44px targets', { combinations: report.layouts.length, boundaryIds, measuredDensities });
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto(url);
  await page.keyboard.press('Tab');
  assert.equal((await page.locator(':focus').textContent()).trim(), 'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').evaluate(element => element.tagName), 'MAIN');
  const nativeCases = await page.locator('main details').evaluateAll(elements => elements.map(element => element.id));
  assert.ok(nativeCases.length >= 2 && nativeCases.every(Boolean), 'Fictional studio cases have identified native disclosures');
  for (const id of nativeCases) await openNativeDisclosure(page, '#' + id);
  check('Keyboard skip link focuses main; every native fictional studio disclosure opens and closes by keyboard', { cases: nativeCases });
  await page.locator('#note-search').fill('not-a-design-note');
  assert.match(await page.locator('#note-count').textContent(), /^\s*0\b/);
  assert.equal(await page.locator('#no-notes').isVisible(), true);
  const emptyContrast = await stateContrast(page, 'Empty note search');
  await page.locator('#reset-filters').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#note-search').inputValue(), '');
  assert.equal(await page.locator('#note-topic').inputValue(), 'all');
  assert.match(await page.locator('#note-count').textContent(), /^\s*4\b/);
  assert.equal(await page.locator('#no-notes').isVisible(), false);
  for (const topic of ['composition', 'materials', 'process']) {
    await page.locator('#note-topic').selectOption(topic);
    const visible = await page.locator('[data-note-id]:visible').evaluateAll(elements => elements.map(element => ({ id: element.dataset.noteId, topic: element.dataset.topic })));
    assert.ok(visible.length > 0 && visible.length < noteIds.length, 'Topic ' + topic + ' selects a proper nonempty subset');
    assert.ok(visible.every(item => item.topic === topic), 'Only matching ' + topic + ' design notes are visible');
    assert.match(await page.locator('#note-count').textContent(), new RegExp('^\\s*' + visible.length + '\\b'));
  }
  await page.locator('#reset-filters').click();
  const roomTitle = originalNotes.room.title;
  await page.locator('#note-search').fill(roomTitle);
  assert.equal(await card(page, 'room').isVisible(), true);
  assert.equal(await page.locator('[data-note-id]:visible').count(), 1);
  await page.locator('#reset-filters').click();
  check('Search and every topic filter show matching notes; empty search has status and recovers through keyboard reset', { emptyContrast });
  await inspect(page, 'edge').focus();
  await page.keyboard.press('Enter');
  assert.equal(await focusedId(page), 'detail-heading-edge');
  assert.equal(await detail(page, 'edge').isVisible(), true);
  assert.equal(await detail(page, 'room').isVisible(), false);
  const detailContrast = await stateContrast(page, 'Inspected note');
  await page.locator('#back-to-note-edge').focus();
  await page.keyboard.press('Enter');
  assert.equal(await focusedId(page), 'inspect-note-edge');
  assert.equal(await detail(page, 'edge').isVisible(), true, 'Back preserves the selected detail');
  await page.locator('#note-topic').selectOption('all');
  await page.locator('#note-search').fill(originalNotes.edge.title);
  await inspect(page, 'edge').click();
  assert.equal(await page.locator('#note-search').inputValue(), originalNotes.edge.title, 'Inspect preserves entered filters');
  await page.locator('#note-search').fill('not-a-design-note');
  await page.locator('#back-to-note-edge').click();
  assert.equal(await focusedId(page), 'note-search', 'Back uses search when the originating card is filtered out');
  assert.equal(await page.locator('#note-search').inputValue(), 'not-a-design-note', 'Back preserves the current filter');
  assert.equal(await detail(page, 'edge').isVisible(), true);
  await page.locator('#reset-filters').click();
  check('Inspect focuses the article heading; Back restores the visible trigger or search when filtered out, preserving filters and selected detail', { detailContrast });
  await keepInCard(page, 'room').focus();
  await page.keyboard.press('Enter');
  assert.equal(await keepInCard(page, 'room').evaluate(element => document.activeElement === element), true, 'Keeping a note preserves the initiating focus');
  await assertKept(page, ['room']);
  assert.match(await page.locator('#list-status').textContent(), /kept|added|reading list/i);
  await inspect(page, 'room').click();
  await keepInDetail(page, 'room').focus();
  await page.keyboard.press('Enter');
  assert.equal(await keepInDetail(page, 'room').evaluate(element => document.activeElement === element), true, 'Toggling from the detail preserves focus');
  await assertKept(page, []);
  assert.match(await page.locator('#list-status').textContent(), /removed|reading list/i);
  await keepInCard(page, 'sequence').click();
  await keepInCard(page, 'room').click();
  await assertKept(page, ['room', 'sequence']);
  await keepInDetail(page, 'room').click();
  await keepInDetail(page, 'room').click();
  await assertKept(page, ['room', 'sequence']);
  const listContrast = await stateContrast(page, 'Populated local reading list');
  await stateTargets(page, 'Populated local reading list');
  check('Card/detail Keep note visible labels and actual ARIA names remain stable, aria-pressed stays synchronized, keyboard toggles preserve focus, and repeated actions cannot duplicate notes', { listContrast, accessibleNames: stableKeepNames });
  // Actual browser download is verified below; the list is populated in reverse
  // addition order so deterministic fixed note ordering is independently tested.
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#export-list').click();
  const download = await downloadPromise;
  assert.equal(await download.failure(), null);
  const markdown = await readFile(await download.path(), 'utf8');
  assert.equal(download.suggestedFilename(), 'botanical-reading-list.md');
  assert.match(markdown, /^# .*reading list/im);
  for (const id of ['room', 'sequence']) {
    assert.ok(markdown.includes(originalNotes[id].title), 'Markdown includes selected title ' + id);
    assert.ok(markdown.includes(originalNotes[id].summary), 'Markdown includes the complete selected summary ' + id);
    assert.ok(markdown.includes('Topic: ' + originalNotes[id].topic), 'Markdown includes the selected topic ' + id);
  }
  for (const id of ['edge', 'patina']) {
    assert.equal(markdown.includes(originalNotes[id].title), false, 'Markdown omits unselected note title ' + id);
    assert.equal(markdown.includes(originalNotes[id].summary), false, 'Markdown omits unselected note summary ' + id);
  }
  assert.ok(markdown.indexOf(originalNotes.room.title) < markdown.indexOf(originalNotes.sequence.title), 'Markdown follows fixed note order, independently of addition order');
  assert.match(markdown, /sources?/i);
  assert.match(markdown, /fictional|fiction/i);
  assert.match(markdown, /local/i);
  assert.match(markdown, /no agent|agent.*not|does not.*start|never.*start/i);
  for (const credit of ['Tamir (Phi Vuong Tuong Tam)', 'https://github.com/tamir39/tamir39-portfolio', '6f9bfc6119f0e71dee04b675fbf59b8482aa9c74', 'Codex AI assistance', 'Mikhail Sharanda', 'Colophon Foundry', 'Philipp Nurullin', 'Konstantin Bulenkov', 'Kedhareswer Naidu']) assert.ok(markdown.includes(credit), 'Downloaded Markdown includes source/creator credit: ' + credit);
  const repeatDownloadPromise = page.waitForEvent('download');
  await page.locator('#export-list').click();
  const repeatDownload = await repeatDownloadPromise;
  assert.equal(await repeatDownload.failure(), null);
  assert.equal(repeatDownload.suggestedFilename(), download.suggestedFilename());
  assert.equal(await readFile(await repeatDownload.path(), 'utf8'), markdown, 'Exporting an unchanged list produces the same complete file content');
  await assertKept(page, ['room', 'sequence']);
  assert.equal(await page.locator('#export-list').evaluate(element => document.activeElement === element), true, 'Export preserves focus and the selected list');
  check('Actual local Markdown download has the expected filename, selected titles/topics/full summaries in fixed order, source/creator credits and fictional/local/no-agent disclaimers, omitting unselected note content', { filename: download.suggestedFilename(), bytes: Buffer.byteLength(markdown), sha256: createHash('sha256').update(markdown).digest('hex'), selected: ['room', 'sequence'], omitted: ['edge', 'patina'], contentScope: 'Titles, topics, summaries, and credits; full articles remain in the preview.' });
  await removal(page, 'room').focus();
  await page.keyboard.press('Enter');
  await assertKept(page, ['sequence']);
  assert.equal(await page.locator(':focus').getAttribute('data-remove-id'), 'sequence', 'Removing a note focuses the next remaining removal control');
  assert.match(await page.locator('#list-status').textContent(), /removed/i);
  await removal(page, 'sequence').focus();
  await page.keyboard.press('Enter');
  await assertKept(page, []);
  assert.equal(await focusedId(page), 'reading-list-title', 'Removing the last note focuses the list heading');
  await assertEmptyExportExplanation(page);
  await keepInCard(page, 'edge').click();
  await keepInCard(page, 'patina').click();
  await page.locator('#clear-list').focus();
  await page.keyboard.press('Enter');
  await assertKept(page, []);
  assert.equal(await focusedId(page), 'reading-list-title', 'Clearing the list focuses its heading when the action becomes disabled');
  assert.match(await page.locator('#list-status').textContent(), /clear|empty/i);
  check('Remove and Clear announce changes, keep focus meaningful after controls disappear or disable, and restore explained disabled export');
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
  await keepInCard(page, 'room').click();
  await page.locator('#note-search').fill('room');
  await page.reload();
  assert.equal(await page.locator('#appearance').inputValue(), 'light');
  assert.equal(await page.locator('#density').inputValue(), 'compact');
  assert.equal(await page.locator('#motion').isChecked(), false);
  await assertKept(page, []);
  assert.equal(await page.locator('#note-search').inputValue(), '');
  assert.equal(await page.locator('#note-topic').inputValue(), 'all');
  assert.equal(await detail(page, 'room').isVisible(), true);
  check('System follows live OS appearance; explicit appearance, density, and motion persist; local reading list and filters reset on reload');
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
    assert.ok(nodeId, 'Expected local sans/serif/mono/Vietnamese font sample ' + selector);
    const fonts = (await cdp.send('CSS.getPlatformFontsForNode', { nodeId })).fonts;
    assert.ok(fonts.length > 0, 'Expected actual rendered glyphs for ' + selector);
    assert.equal(fonts.some(font => font.isCustomFont), false, 'Preview uses local fallback fonts');
    report.renderedFonts[selector] = fonts.map(font => ({ family: font.familyName, custom: font.isCustomFont, glyphCount: font.glyphCount }));
  }
  check('Actual local sans, serif, mono, and Vietnamese glyph families recorded through Chromium CDP', report.renderedFonts);
  await context.close();
  // Test entity-escaped HTML-like fixture content through the real initial note
  // parsing, list renderer, search, and downloader. The original preview files
  // remain unchanged, and the fixture cannot itself execute HTML or JavaScript.
  const fixture = { title: 'A <em>clear</em> title', summary: '<img src=x onerror="window.botanicalInjected=true"> Read this as text.' };
  const encodeHtml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const fixtureHtml = (await readFile(path.join(preview, 'index.html'), 'utf8')).replace(originalNotes.room.title, encodeHtml(fixture.title)).replace(originalNotes.room.summary, encodeHtml(fixture.summary));
  assert.ok(fixtureHtml.includes(encodeHtml(fixture.title)) && fixtureHtml.includes(encodeHtml(fixture.summary)), 'The HTML safety fixture replaces the original card title and summary');
  const safetyContext = await newContext({ acceptDownloads: true });
  await safetyContext.route(url, route => route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: fixtureHtml }));
  const safetyPage = await safetyContext.newPage();
  await safetyPage.goto(url);
  assert.equal((await card(safetyPage, 'room').locator('h4').textContent()).trim(), fixture.title);
  const fixtureKeepName = 'Keep note: ' + fixture.title;
  assert.equal(await safetyPage.getByRole('button', { name: fixtureKeepName, exact: true }).count(), 2, 'Card/detail accessible Keep names use the literal initial note title');
  await keepInCard(safetyPage, 'room').click();
  assert.equal(await safetyPage.getByRole('button', { name: fixtureKeepName, exact: true }).count(), 2, 'Keeping the literal fixture note preserves its exact accessible name');
  assert.equal((await safetyPage.locator('#kept-list h4').textContent()).trim(), fixture.title);
  assert.equal((await safetyPage.locator('#kept-list p').textContent()).trim(), fixture.summary);
  assert.equal(await safetyPage.locator('#kept-list em, #kept-list img').count(), 0, 'HTML-like note content renders as literal text');
  assert.equal(await safetyPage.evaluate(() => window.botanicalInjected), undefined, 'The fixture has no script effect');
  await safetyPage.locator('#note-search').fill(fixture.title);
  assert.equal(await safetyPage.locator('[data-note-id]:visible').count(), 1, 'Search reads literal note text');
  assert.equal(await card(safetyPage, 'room').isVisible(), true);
  const safetyDownloadPromise = safetyPage.waitForEvent('download');
  await safetyPage.locator('#export-list').click();
  const safetyDownload = await safetyDownloadPromise;
  assert.equal(await safetyDownload.failure(), null);
  assert.equal(safetyDownload.suggestedFilename(), 'botanical-reading-list.md');
  const safetyMarkdown = await readFile(await safetyDownload.path(), 'utf8');
  assert.ok(safetyMarkdown.includes('A \\<em\\>clear\\</em\\> title'), 'Downloaded Markdown escapes HTML-like title delimiters');
  assert.ok(safetyMarkdown.includes('\\<img src=x onerror="window.botanicalInjected=true"\\> Read this as text.'), 'Downloaded Markdown escapes HTML-like summary delimiters');
  assert.doesNotMatch(safetyMarkdown, /(?:^|[^\\])<img\b/, 'Downloaded Markdown contains no unescaped HTML image tag');
  check('Entity-escaped HTML-like note fixture stays literal in the actual reading-list renderer/search and is escaped in the real Markdown download', { title: fixture.title, summary: fixture.summary, bytes: Buffer.byteLength(safetyMarkdown) });
  await safetyContext.close();
  for (const mode of ['blocked', 'invalid', 'malformed']) {
    const failureContext = await newContext({ colorScheme: 'dark' });
    await failureContext.addInitScript(mode => {
      if (mode === 'blocked') Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } });
      else {
        const getItem = Storage.prototype.getItem;
        Storage.prototype.getItem = function (key) {
          if (key !== 'interface-atlas-botanical-preview') return getItem.call(this, key);
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
    await keepInCard(failurePage, 'room').click();
    await assertKept(failurePage, ['room']);
    await inspect(failurePage, 'edge').click();
    assert.equal(await focusedId(failurePage), 'detail-heading-edge');
    await failureContext.close();
  }
  check('Blocked, invalid, and malformed storage retain defaults, usable preferences, note inspection, and local reading-list actions');
  const noJsContext = await newContext({ javaScriptEnabled: false, colorScheme: 'dark', viewport: { width: 320, height: 1000 } });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(url);
  await reflow(noJsPage, 'No JavaScript at 320px');
  assert.equal(await noJsPage.locator('h1').count(), 1);
  for (const id of noteIds) {
    assert.equal(await card(noJsPage, id).isVisible(), true, 'Original note ' + id + ' remains visible without JavaScript');
    assert.equal(await detail(noJsPage, id).isVisible(), true, 'Full original note ' + id + ' remains readable without JavaScript');
  }
  const noJsControls = await noJsPage.locator('#appearance, #density, #motion, #note-search, #note-topic, #reset-filters, [data-keep-id], #export-list, #clear-list').evaluateAll(elements => elements.map(element => ({ id: element.id || element.dataset.keepId, disabled: element.matches(':disabled') })));
  assert.ok(noJsControls.length > 0);
  assert.deepEqual(noJsControls.filter(control => !control.disabled), [], 'Runtime preferences, filters, and reading-list controls stay disabled without JavaScript');
  for (const id of noteIds) assert.equal(await noJsPage.locator('#back-to-note-' + id).isVisible(), false, 'Runtime Back action remains hidden without JavaScript');
  for (const field of specimenFields) assert.equal(await noJsPage.locator('#' + field.id).isDisabled(), false, 'Native specimen fields remain usable without JavaScript');
  for (const id of nativeCases) await openNativeDisclosure(noJsPage, '#' + id);
  const noJsColors = await stateContrast(noJsPage, 'No-JavaScript static content');
  check('No-JavaScript exposes all four full design notes and native studio disclosures; runtime controls stay disabled and Back stays hidden; native specimen fields remain usable; HTML text/control contrast passes', { contrast: noJsColors, disabledRuntimeControls: noJsControls.length, usableNativeSpecimenFields: specimenFields.map(field => field.id) });
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
      await inspect(capturePage, appearance === 'dark' ? 'patina' : 'room').click();
      if (appearance === 'dark') await keepInCard(capturePage, 'patina').click();
      const section = appearance === 'light' && width > 390 ? '#studio' : '#reading-room';
      if (width > 390) {
        const bounds = await capturePage.locator(section).boundingBox();
        await capturePage.setViewportSize({ width, height: Math.max(1000, Math.ceil(bounds.height) + 2) });
        await capturePage.locator(section).evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY));
        await capturePage.locator(section).screenshot({ path: path.join(output, filename) });
      } else {
        await capturePage.locator(section).evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY));
        await capturePage.screenshot({ path: path.join(output, filename) });
      }
      report.screenshots.push({ filename, appearance, width, section, scope: width > 390 ? 'Complete section' : '1000px viewport from the reading-room start' });
      if (appearance === 'dark') await capturePage.reload();
    }
    await captureContext.close();
  }
  assert.deepEqual(errors, [], 'Browser runtime errors');
  assert.deepEqual(external, [], 'Preview must not request external resources');
  assert.deepEqual(failedResources, [], 'Preview resources load successfully');
  for (const filename of Object.keys(report.testedFiles)) assert.equal(createHash('sha256').update(await readFile(path.join(preview, filename))).digest('hex'), report.testedFiles[filename], filename + ' stayed unchanged during verification');
  check('No browser runtime errors, external requests, or failed preview resources');
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
