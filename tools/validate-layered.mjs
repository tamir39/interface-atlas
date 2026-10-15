import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Optional browser evidence for Layered. These checks are original Atlas tooling,
// adapted from Atlas's Gallery and Pulse validators; no upstream UI code is used.
const options = {};
for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index];
  if (!['--module', '--browser', '--output', '--preview'].includes(key) || !process.argv[index + 1]) {
    throw new Error('Usage: node tools/validate-layered.mjs [--module path/to/playwright/index.mjs] [--browser path/to/chromium] [--output directory] [--preview directory]');
  }
  options[key.slice(2)] = process.argv[index + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'themes/layered/preview'));
const output = options.output ? path.resolve(options.output) : null;
let playwright;
try {
  playwright = await import(options.module ? pathToFileURL(path.resolve(options.module)).href : 'playwright');
} catch {
  throw new Error('Optional verification needs an installed Playwright package. Pass --module with its index.mjs path, or install Playwright locally. Opening the preview needs no packages.');
}
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png' };
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
    'No screen-reader, touch-device, native browser zoom, or real backend testing. All three static project details, links and specimen fields remain usable without JavaScript; filters, preferences, task mutation and editing require it. No real account, cloud sync, agent action, backend or simulated network.',
    'Contrast samples are rendered HTML text composited over solid backgrounds and enabled select/text-input/textarea boundaries against their fill and adjacent background. Each layout must include nonzero opaque HTML text and every visible preference/search/category/specimen field boundary; dialog states scope measurements to the opaque native modal. SVG artwork, disabled controls, placeholders, text selection, native popup menus, checkbox glyph internals, and backgrounds with images are outside this check; exclusions and unsupported samples are recorded.',
    'Fallback font families are recorded from Chromium. Named webfont files are not distributed or loaded.',
    '44px target samples include enabled native controls, associated checkbox labels, summary controls, button-styled links, project-opening links, section/document navigation and Atlas brand. Contextual inline source links are excluded.',
    'The temporary verification server exposes only the preview directory. Links to neighboring Atlas documents are checked separately, not followed here.'
  ]
};
for (const filename of ['index.html', 'styles.css', 'preview.js']) {
  report.testedFiles[filename] = createHash('sha256').update(await readFile(path.join(preview, filename))).digest('hex');
}
report.validatorSha256 = createHash('sha256').update(await readFile(fileURLToPath(import.meta.url))).digest('hex');
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const url = 'http://127.0.0.1:' + server.address().port + '/';
const errors = [], external = [], failedResources = [], requestFailures = [], intentionalFailures = [];
async function newContext(contextOptions, purpose = 'ordinary') {
  const context = await browser.newContext(contextOptions);
  context.on('request', request => { if (!request.url().startsWith(url)) external.push(request.url()); });
  context.on('requestfailed', request => { (purpose === 'ordinary' ? requestFailures : intentionalFailures).push({ purpose, url: request.url(), failure: request.failure()?.errorText }); });
  context.on('response', response => {
    if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) (purpose === 'ordinary' ? failedResources : intentionalFailures).push({ url: response.url(), status: response.status() });
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
    const scope = document.querySelector('dialog[open]') || document.body;
    for (const element of scope.querySelectorAll('*')) {
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
    for (const element of scope.querySelectorAll('select:not(:disabled), input[type="search"]:not(:disabled), input[type="text"]:not(:disabled), input:not([type]):not(:disabled), textarea:not(:disabled)')) {
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

const ids = ['reading', 'studio', 'weekend'];
const titles = { reading: 'Reading corner', studio: 'Studio refresh', weekend: 'Weekend walk' };
const initialTasks = { reading: [true, false, false], studio: [true, true, false], weekend: [false, false, false] };
const priorities = { reading: 'normal', studio: 'focus', weekend: 'later' };
const key = 'interface-atlas-layered-preview';
const card = (page, id) => page.locator('[data-project-card="' + id + '"]');
const article = (page, id) => page.locator('[data-project-detail="' + id + '"]');
const edit = (page, id) => page.locator('[data-edit-project="' + id + '"]');
const revert = (page, id) => page.locator('[data-revert-project="' + id + '"]');
const task = (page, id, index) => page.locator('input[data-project-task="' + id + '"][data-task-index="' + index + '"]');
const focusedId = page => page.evaluate(() => document.activeElement?.id || null);
async function selection(page, expected, title = titles[expected]) {
  for (const id of ids) {
    assert.equal(await article(page, id).isVisible(), id === expected, 'Exactly selected project visible: ' + id);
    const marker = await page.locator('[data-open-project="' + id + '"]').getAttribute('aria-current');
    assert.equal(marker === 'true', id === expected, 'Current project marker: ' + id);
  }
  assert.equal((await page.locator('#project-' + expected + '-title').textContent()).trim(), title);
}
async function openProject(page, id) {
  await page.locator('[data-open-project="' + id + '"]').click();
  await selection(page, id);
  assert.equal(await focusedId(page), 'project-' + id + '-title');
}
async function visibleIds(page) {
  const result = [];
  for (const id of ids) if (await card(page, id).isVisible()) result.push(id);
  return result;
}
async function tasksFor(page, id) {
  return page.locator('input[data-project-task="' + id + '"]').evaluateAll(elements => elements.map(element => element.checked));
}
async function progress(page, id, count) {
  const samples = await page.locator('[data-project-progress="' + id + '"]').allTextContents();
  assert.ok(samples.length >= 1);
  for (const text of samples) assert.match(text, new RegExp('\\b' + count + '\\s*(?:of|/)\\s*3\\b'), 'Per-project progress: ' + id + ' ' + text);
}
async function aggregate(page, count) {
  assert.match(await page.locator('#overall-progress').textContent(), new RegExp('\\b' + count + '\\s*(?:of|/)\\s*9\\b'));
}
async function stateContrast(page, label) {
  const colors = await contrast(page);
  assert.ok(colors.checked > 0 && colors.opaqueChecked > 0, label + ': nonzero opaque HTML text');
  assert.deepEqual(colors.failures, [], label + ': contrast failures ' + JSON.stringify(colors.failures));
  return { checked: colors.checked, opaqueChecked: colors.opaqueChecked, minimum: colors.minimum, skipped: colors.skipped, excluded: colors.excluded, controlBorders: colors.controlBorders };
}
async function hitTargets(page) {
  return page.evaluate(() => {
    const scope = document.querySelector('dialog[open]') || document.body;
    return [...scope.querySelectorAll('button:not(:disabled),select:not(:disabled),input:not(:disabled),textarea:not(:disabled),summary,a.button,.workspace-nav a,.workspace-brand,.text-link,.atlas-brand,.preview-footer nav a,[data-open-project],#editor-errors a')].filter(element => element.getClientRects().length).map(element => {
      const target = ['checkbox', 'radio'].includes(element.type) ? element.labels?.[0] || element : element;
      const rect = target.getBoundingClientRect();
      return { id: element.id || element.getAttribute('href') || element.tagName.toLowerCase(), via: target === element ? 'control' : 'associated label', width: Number(rect.width.toFixed(2)), height: Number(rect.height.toFixed(2)) };
    });
  });
}
async function stateTargets(page, label) {
  const targets = await hitTargets(page);
  assert.ok(targets.length > 0);
  assert.deepEqual(targets.filter(target => target.height < 43.99 || target.width < 43.99), [], label + ': 44px target failures ' + JSON.stringify(targets));
  return targets;
}
async function densityMetrics(page) {
  return page.locator('.specimen-panel').evaluate(element => ({ height: element.getBoundingClientRect().height, padding: { blockStart: parseFloat(getComputedStyle(element).paddingBlockStart), blockEnd: parseFloat(getComputedStyle(element).paddingBlockEnd), inlineStart: parseFloat(getComputedStyle(element).paddingInlineStart), inlineEnd: parseFloat(getComputedStyle(element).paddingInlineEnd) } }));
}
async function spatialMetrics(page) {
  return page.evaluate(() => Object.fromEntries([...document.querySelectorAll('[data-project-card], [data-project-detail]')].filter(element => element.getClientRects().length).map(element => {
    const rect = element.getBoundingClientRect(); const style = getComputedStyle(element);
    return [element.id || element.dataset.projectCard, { width: rect.width, height: rect.height, padding: style.padding, radius: style.borderRadius, fontSize: style.fontSize }];
  })));
}
async function openEditor(page, id, title = titles[id], priority = priorities[id]) {
  await edit(page, id).click();
  assert.equal(await page.locator('#project-editor').evaluate(element => element.open && element.matches(':modal')), true, 'Native modal top layer');
  assert.equal(await page.getByRole('dialog', { name: 'Edit project', exact: true }).count(), 1);
  assert.equal(await focusedId(page), 'project-title');
  assert.equal(await page.locator('#project-title').inputValue(), title);
  assert.equal(await page.locator('#project-priority').inputValue(), priority);
  assert.equal(await page.locator('#editor-errors').isVisible(), false);
}
async function closedToOpener(page, id) {
  await page.waitForFunction(id => !document.getElementById('project-editor').open && document.activeElement?.dataset.editProject === id, id, { timeout: 2000 });
}
async function assertNoAnimation(page, label) {
  const animations = await page.evaluate(() => document.getAnimations().filter(animation => ['running', 'paused', 'pending'].includes(animation.playState)).map(animation => ({ state: animation.playState, duration: animation.effect?.getTiming().duration })));
  assert.deepEqual(animations, [], label);
}
async function immediateFeedback(page, label) {
  const sample = await edit(page, 'reading').evaluate(element => ({ duration: getComputedStyle(element).transitionDuration, animation: getComputedStyle(element).animationName, transform: getComputedStyle(element).transform }));
  assert.ok(sample.duration.split(',').every(value => parseFloat(value) === 0), label + ': immediate transitions');
  assert.equal(sample.animation, 'none'); assert.equal(sample.transform, 'none');
  return sample;
}
async function notClipped(page, selector, label) {
  const locator = typeof selector === 'string' ? page.locator(selector) : selector;
  const sample = await locator.evaluate(element => {
    const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
    return { width: rect.width, height: rect.height, clientWidth: element.clientWidth, scrollWidth: element.scrollWidth, clientHeight: element.clientHeight, scrollHeight: element.scrollHeight, overflow: style.textOverflow, clamp: style.webkitLineClamp };
  });
  assert.ok(sample.width > 0 && sample.height > 0, label + ': visible size');
  assert.ok(sample.scrollWidth <= sample.clientWidth + 1, label + ': text fits width ' + JSON.stringify(sample));
  assert.ok(sample.scrollHeight <= sample.clientHeight + 1, label + ': text fits height');
  assert.notEqual(sample.overflow, 'ellipsis');
  assert.ok(['none', '0'].includes(sample.clamp));
  return sample;
}

try {
  browser = await playwright.chromium.launch({ headless: true, ...(options.browser ? { executablePath: options.browser } : {}) });
  report.browser = browser.version();
  if (options.module) report.playwright = JSON.parse(await readFile(path.join(path.dirname(path.resolve(options.module)), 'package.json'), 'utf8')).version;
  const context = await newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light', reducedMotion: 'no-preference' });
  const page = await context.newPage(); await page.goto(url);
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('#appearance').inputValue(), 'system'); assert.equal(await page.locator('#density').inputValue(), 'comfortable'); assert.equal(await page.locator('#motion').isChecked(), true);
  assert.equal(await page.locator('#project-search').inputValue(), ''); assert.equal(await page.locator('#project-category').inputValue(), 'all');
  assert.equal(await page.locator('#workspace-status').getAttribute('role'), 'status');
  await selection(page, 'reading'); await aggregate(page, 3);
  assert.equal(await page.locator('#project-editor').evaluate(element => element.open), false);
  const nativeContract = await page.locator('#project-editor').evaluate(element => ({ tag: element.tagName, tabindex: element.getAttribute('tabindex'), labelledBy: element.getAttribute('aria-labelledby'), describedBy: element.getAttribute('aria-describedby'), formNoValidate: element.querySelector('form').noValidate, required: element.querySelector('#project-title').required, maxLength: element.querySelector('#project-title').maxLength, autofocus: element.querySelector('#project-title').autofocus }));
  assert.equal(nativeContract.tag, 'DIALOG'); assert.equal(nativeContract.tabindex, null); assert.equal(nativeContract.labelledBy, 'editor-title'); assert.ok(nativeContract.describedBy); assert.equal(nativeContract.formNoValidate, true); assert.equal(nativeContract.required, true); assert.equal(nativeContract.maxLength, 60); assert.equal(nativeContract.autofocus, true);
  for (const id of ids) {
    assert.equal(await card(page, id).count(), 1);
    assert.equal(await page.locator('[data-open-project="' + id + '"]').getAttribute('href'), '#project-' + id);
    assert.equal(await page.getByRole('link', { name: 'Open ' + titles[id], exact: true }).count(), 1);
    assert.equal(await page.locator('#project-' + id + '-title').getAttribute('tabindex'), '-1');
    assert.deepEqual(await tasksFor(page, id), initialTasks[id]);
    await progress(page, id, initialTasks[id].filter(Boolean).length);
    assert.equal(await revert(page, id).isDisabled(), true);
  }
  const specimenFields = await page.locator('.specimen-panel input,.specimen-panel select,.specimen-panel textarea').evaluateAll(elements => elements.map(element => ({ id: element.id, tag: element.tagName.toLowerCase(), type: element.type, value: element.value })));
  assert.ok(specimenFields.some(field => field.tag === 'input') && specimenFields.some(field => field.tag === 'select'));
  assert.ok(specimenFields.every(field => field.id));
  for (const field of specimenFields.filter(field => ['text', 'search'].includes(field.type) && !field.value)) await page.locator('#' + field.id).fill('A local workspace specimen');
  const boundaryIds = await page.locator('select:not(:disabled),input[type="search"]:not(:disabled),input[type="text"]:not(:disabled),input:not([type]):not(:disabled),textarea:not(:disabled)').evaluateAll(elements => elements.filter(element => element.getClientRects().length).map(element => element.id));
  for (const id of ['appearance', 'density', 'project-search', 'project-category']) assert.ok(boundaryIds.includes(id));
  check('Three fixed fictional projects, true sample task counts, native anchor/current semantics, defaults, static edit contract and usable specimen fields', { titles, initialTasks, nativeContract, specimenFields });

  await page.locator('#motion').uncheck();
  const appearanceColors = {}, measuredDensities = {}, densityScope = {};
  for (const appearance of ['light', 'dark']) {
    await page.locator('#appearance').selectOption(appearance); appearanceColors[appearance] = await pageColor(page);
    for (const density of ['comfortable', 'compact']) {
      await page.locator('#density').selectOption(density);
      for (const width of [320, 390, 768, 1280, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        const label = appearance + '/' + density + '/' + width;
        const sizes = await reflow(page, label), colors = await stateContrast(page, label), targets = await stateTargets(page, label);
        for (const id of boundaryIds) assert.ok(colors.controlBorders.some(sample => sample.id === id), label + ': measured field boundary ' + id);
        if (width === 1440 && appearance === 'light') { measuredDensities[density] = await densityMetrics(page); densityScope[density] = await spatialMetrics(page); }
        if (width <= 390) for (const id of boundaryIds) assert.ok(await page.locator('#' + id).evaluate(element => parseFloat(getComputedStyle(element).fontSize)) >= 16, label + ': field text at least 16px ' + id);
        report.layouts.push({ appearance, density, ...sizes, contrast: colors, targets });
      }
    }
  }
  for (const [density, padding] of [['comfortable', 24], ['compact', 16]]) assert.ok(Object.values(measuredDensities[density].padding).every(value => value === padding));
  assert.ok(measuredDensities.comfortable.height > measuredDensities.compact.height + 1);
  assert.deepEqual(densityScope.comfortable, densityScope.compact, 'Density changes only specimen inset, not project card/detail geometry');
  assert.notEqual(appearanceColors.light, appearanceColors.dark);
  check('20 responsive appearance/density layouts, opaque text and enabled field boundaries, 44px targets, mobile field text and actual specimen-only 24→16px inset', { combinations: report.layouts.length, boundaryIds, measuredDensities, densityScope });

  await page.setViewportSize({ width: 1280, height: 1000 }); await page.goto(url);
  await page.keyboard.press('Tab'); assert.match((await page.locator(':focus').textContent()).trim(), /skip to content/i);
  await page.keyboard.press('Enter'); assert.equal(await focusedId(page), 'main-content');
  const openingNames = {};
  for (const id of ids) {
    const anchor = page.locator('[data-open-project="' + id + '"]'); openingNames[id] = await anchor.ariaSnapshot();
    await anchor.focus(); await page.keyboard.press('Enter'); await selection(page, id); assert.equal(await focusedId(page), 'project-' + id + '-title');
    assert.equal(await page.getByRole('button', { name: 'Edit project: ' + titles[id], exact: true }).count(), 1);
  }
  await page.locator('#project-search').fill(' CONSIDERED '); assert.deepEqual(await visibleIds(page), ['studio']); await selection(page, 'weekend');
  await page.locator('#project-search').fill('STUDIO'); assert.deepEqual(await visibleIds(page), ['studio']);
  await page.locator('#project-category').selectOption('personal'); assert.deepEqual(await visibleIds(page), []); assert.equal(await page.locator('#empty-projects').isVisible(), true); assert.match(await page.locator('#project-count').textContent(), /\b0\b/);
  await page.locator('#clear-filters').click(); assert.equal(await focusedId(page), 'project-search'); assert.equal(await page.locator('#project-search').inputValue(), ''); assert.equal(await page.locator('#project-category').inputValue(), 'all'); assert.deepEqual(await visibleIds(page), ids); await selection(page, 'weekend');
  await openProject(page, 'reading'); await page.locator('#project-category').selectOption('creative'); assert.deepEqual(await visibleIds(page), ['studio']); await selection(page, 'reading'); assert.equal(await edit(page, 'reading').isVisible(), true);
  check('Keyboard skip and native project anchors, contextual accessible names, combined case-insensitive filters, empty-state recovery and independently visible current workspace', { openingNames });

  await task(page, 'reading', 1).check(); await progress(page, 'reading', 2); await aggregate(page, 4); assert.equal(await revert(page, 'reading').isEnabled(), true);
  await page.locator('#project-category').selectOption('all'); await openProject(page, 'studio'); await task(page, 'studio', 2).check(); await progress(page, 'studio', 3); await aggregate(page, 5);
  await openProject(page, 'weekend'); assert.deepEqual(await tasksFor(page, 'weekend'), initialTasks.weekend);
  await openProject(page, 'reading'); assert.deepEqual(await tasksFor(page, 'reading'), [true, true, false]); await task(page, 'reading', 1).uncheck(); await aggregate(page, 4); await task(page, 'reading', 1).check(); await aggregate(page, 5);
  await page.locator('#project-search').fill('considered'); await page.evaluate(() => { window.__atlasEnterVisit = 'same-document'; }); await page.locator('#project-search').press('Enter');
  assert.equal(await page.evaluate(() => window.__atlasEnterVisit), 'same-document', 'Search Enter does not reload the local workspace'); await aggregate(page, 5); assert.deepEqual(await tasksFor(page, 'reading'), [true, true, false]); assert.deepEqual(await tasksFor(page, 'studio'), [true, true, true]); await selection(page, 'reading'); assert.deepEqual(await visibleIds(page), ['studio']); await page.locator('#project-search').fill('');
  check('Native task toggles are reversible and independent per project with truthful repeated/aggregate counts; Enter in Search preserves the same document, current project and local task edits');

  await openEditor(page, 'reading');
  const tabOrder = [], reverseOrder = [];
  for (const [key, order] of [['Tab', tabOrder], ['Shift+Tab', reverseOrder]]) {
    let previousViewport = false;
    for (let index = 0; index < 10; index++) {
      await page.keyboard.press(key);
      const focus = await page.locator('#project-editor').evaluate(element => ({ inside: element.contains(document.activeElement), viewport: document.activeElement === document.body, id: document.activeElement.id || 'document-viewport' }));
      assert.ok(focus.inside || focus.viewport, key + ': no background page control is reachable');
      if (previousViewport) assert.ok(focus.inside, key + ': native viewport step returns to modal');
      previousViewport = focus.viewport; order.push(focus.id);
    }
  }
  for (const id of ['project-title', 'project-priority', 'save-project', 'cancel-project']) assert.ok(tabOrder.includes(id) && reverseOrder.includes(id), 'Native dialog reachable field/action: ' + id);
  await page.locator('#project-title').focus(); await page.locator('#appearance').evaluate(element => element.focus()); assert.equal(await focusedId(page), 'project-title', 'Native inert background blocks programmatic focus');
  const modalState = await page.locator('#project-editor').evaluate(element => ({ modal: element.matches(':modal'), backgroundInertByBehavior: !document.getElementById('appearance').matches(':focus'), title: document.activeElement.id }));
  await page.mouse.click(1, 1); assert.equal(await page.locator('#project-editor').evaluate(element => element.open), true, 'Backdrop does not discard draft');
  await page.locator('#project-title').fill('Discard this draft'); await page.locator('#project-priority').selectOption('later'); await page.keyboard.press('Escape'); await closedToOpener(page, 'reading'); await selection(page, 'reading');
  await openEditor(page, 'reading'); await page.locator('#project-title').fill('Discard another draft'); await page.locator('#cancel-project').click(); await closedToOpener(page, 'reading'); await selection(page, 'reading');
  assert.deepEqual(await tasksFor(page, 'reading'), [true, true, false]);
  check('One native modal enters title focus, cycles dialog controls bidirectionally without background controls (Chromium includes one document-viewport step), blocks background focus and discards on Escape/Cancel with opener restoration', { tabOrder, reverseOrder, modalState });

  await openEditor(page, 'reading'); await page.locator('#project-title').fill('   '); await page.locator('#save-project').click();
  assert.equal(await focusedId(page), 'editor-error-heading'); assert.equal(await page.locator('#editor-errors').isVisible(), true); assert.equal(await page.locator('#project-title').getAttribute('aria-invalid'), 'true'); assert.match(await page.locator('#project-title').getAttribute('aria-describedby'), /title-error/); assert.equal(await page.locator('#title-error').isVisible(), true);
  assert.equal(await page.locator('#project-editor').evaluate(element => element.open), true); assert.equal((await page.locator('#project-reading-title').textContent()).trim(), titles.reading);
  await page.locator('#editor-errors a[href="#project-title"]').click(); assert.equal(await focusedId(page), 'project-title');
  await page.locator('#project-title').evaluate(element => { element.value = 'A'.repeat(61); element.dispatchEvent(new Event('input', { bubbles: true })); }); await page.locator('#save-project').click(); assert.equal(await focusedId(page), 'editor-error-heading'); assert.equal(await page.locator('#project-title').getAttribute('aria-invalid'), 'true');
  await page.locator('#project-title').fill('Reading, with room to think');
  await page.locator('#project-priority').evaluate(element => { element.add(new Option('Invalid test value', 'unknown')); element.value = 'unknown'; element.dispatchEvent(new Event('change', { bubbles: true })); }); await page.locator('#save-project').click(); assert.equal(await focusedId(page), 'editor-error-heading'); assert.equal(await page.locator('#project-priority').getAttribute('aria-invalid'), 'true'); assert.match(await page.locator('#project-priority').getAttribute('aria-describedby'), /priority-error/); assert.equal(await page.locator('#priority-error').isVisible(), true); assert.equal((await page.locator('#project-reading-title').textContent()).trim(), titles.reading);
  await page.locator('#editor-errors a[href="#project-priority"]').click(); assert.equal(await focusedId(page), 'project-priority');
  await page.locator('#project-priority').selectOption('focus'); await page.locator('#project-priority option[value="unknown"]').evaluate(element => element.remove()); await page.locator('#cancel-project').click(); await closedToOpener(page, 'reading');
  check('Whitespace, overlength and invalid-priority failures preserve committed project atomically, remain in the modal, identify associated inline errors and focus a linked correction summary');

  const modalSamples = [];
  for (const appearance of ['light', 'dark']) {
    await page.locator('#appearance').selectOption(appearance); await page.locator('#motion').uncheck();
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 1000 }); await openEditor(page, 'reading');
      await page.locator('#project-title').fill(' '); await page.locator('#save-project').click();
      const colors = await stateContrast(page, 'Modal error ' + appearance + '/' + width), targets = await stateTargets(page, 'Modal error ' + appearance + '/' + width);
      for (const id of ['project-title', 'project-priority']) assert.ok(colors.controlBorders.some(sample => sample.id === id), 'Modal field boundary: ' + id);
      const sizing = await page.locator('#project-editor').evaluate(element => ({ width: element.getBoundingClientRect().width, viewportWidth: innerWidth, clientWidth: element.clientWidth, scrollWidth: element.scrollWidth })); assert.ok(sizing.width <= sizing.viewportWidth && sizing.scrollWidth <= sizing.clientWidth + 1);
      await notClipped(page, '#editor-error-heading', 'Modal error heading'); modalSamples.push({ appearance, width, contrast: colors, targets, sizing });
      await page.locator('#cancel-project').click(); await closedToOpener(page, 'reading');
    }
  }
  check('Opaque native modal and linked-error states retain text/boundary contrast, 44px actions and unclipped layouts at four widths in both appearances', { modalSamples });

  await page.setViewportSize({ width: 1280, height: 1000 }); await page.locator('#project-search').fill('Reading corner'); await page.locator('#project-category').selectOption('personal');
  const savedTitle = 'A considered little corner';
  await openEditor(page, 'reading'); await page.locator('#project-title').fill('  ' + savedTitle + '  '); await page.locator('#project-priority').selectOption('later'); await page.locator('#save-project').click(); await closedToOpener(page, 'reading');
  await selection(page, 'reading', savedTitle); assert.equal(await page.locator('#project-search').inputValue(), 'Reading corner'); assert.equal(await page.locator('#project-category').inputValue(), 'personal'); assert.deepEqual(await visibleIds(page), []);
  for (const text of await page.locator('[data-project-title="reading"]').allTextContents()) assert.equal(text.trim(), savedTitle);
  assert.equal(await page.getByRole('button', { name: 'Edit project: ' + savedTitle, exact: true }).count(), 1);
  const reflectedOpenName = await page.locator('[data-open-project="reading"]').evaluate(element => element.getAttribute('aria-label') || (element.getAttribute('aria-labelledby') || '').split(/\s+/).map(id => document.getElementById(id)?.textContent || '').join(' ').trim() || element.textContent.trim());
  assert.equal(reflectedOpenName.replace(/\s+/g, ' '), 'Open ' + savedTitle);
  assert.match(await page.locator('#workspace-status').textContent(), /filter|hidden|visible/i);
  assert.deepEqual(await tasksFor(page, 'reading'), [true, true, false]); await aggregate(page, 5);
  await openEditor(page, 'reading', savedTitle, 'later'); await page.locator('#cancel-project').click(); await closedToOpener(page, 'reading');
  await revert(page, 'reading').click(); assert.equal(await focusedId(page), 'project-reading-title'); await selection(page, 'reading'); assert.equal(await revert(page, 'reading').isDisabled(), true); assert.deepEqual(await tasksFor(page, 'reading'), initialTasks.reading); assert.deepEqual(await tasksFor(page, 'studio'), [true, true, true]); assert.deepEqual(await tasksFor(page, 'weekend'), initialTasks.weekend); await aggregate(page, 4); await progress(page, 'reading', 1); await progress(page, 'studio', 3);
  assert.equal(await page.locator('#project-search').inputValue(), 'Reading corner'); assert.equal(await page.locator('#project-category').inputValue(), 'personal'); assert.deepEqual(await visibleIds(page), ['reading']);
  check('Save trims and atomically reflects title/priority/names without changing tasks, reapplies preserved filters and restores visible detail opener; Revert restores only current project and focuses its heading');

  await page.locator('#appearance').selectOption('system'); await page.emulateMedia({ colorScheme: 'dark' }); await assertPageColor(page, appearanceColors.dark); await page.emulateMedia({ colorScheme: 'light' }); await assertPageColor(page, appearanceColors.light);
  await page.locator('#appearance').selectOption('light'); await page.locator('#density').selectOption('compact'); await page.locator('#motion').uncheck(); await page.emulateMedia({ colorScheme: 'dark' }); await assertPageColor(page, appearanceColors.light);
  await openEditor(page, 'reading'); await page.locator('#project-title').fill('Temporary local title'); await page.locator('#save-project').click(); await closedToOpener(page, 'reading');
  const stored = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key); assert.deepEqual(stored, { appearance: 'light', density: 'compact', motion: 'off' });
  await page.reload(); await selection(page, 'reading'); await aggregate(page, 3); assert.equal(await page.locator('#project-search').inputValue(), ''); assert.equal(await page.locator('#project-category').inputValue(), 'all'); for (const id of ids) assert.deepEqual(await tasksFor(page, id), initialTasks[id]); assert.equal(await page.locator('#appearance').inputValue(), 'light'); assert.equal(await page.locator('#density').inputValue(), 'compact'); assert.equal(await page.locator('#motion').isChecked(), false);
  check('System appearance follows live device changes, explicit appearance overrides, and reload resets temporary projects/tasks/filters while exactly three global preferences persist', { stored });

  await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.locator('#motion').check();
  const feedback = await edit(page, 'reading').evaluate(element => ({ duration: getComputedStyle(element).transitionDuration, properties: getComputedStyle(element).transitionProperty }));
  assert.ok(feedback.duration.split(',').every(value => Math.abs(parseFloat(value) - .16) < .001)); assert.ok(feedback.properties.split(',').every(value => ['color', 'background-color', 'border-color'].includes(value.trim())));
  await assertNoAnimation(page, 'No automatic animation'); await page.emulateMedia({ reducedMotion: 'reduce' }); const reduced = await immediateFeedback(page, 'OS reduced motion'); await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.locator('#motion').uncheck(); const off = await immediateFeedback(page, 'Motion off');
  await openEditor(page, 'reading'); await assertNoAnimation(page, 'Native modal has no entrance animation'); await page.locator('#cancel-project').click(); await closedToOpener(page, 'reading');
  check('Only 160ms color/background/border feedback is configured; no automatic or modal animation; reduced/off states are immediate and workspace remains usable', { feedback, reduced, off });

  await page.emulateMedia({ forcedColors: 'active' }); await page.keyboard.press('Tab'); await page.locator('#appearance').focus(); const focus = await page.locator('#appearance').evaluate(element => ({ visible: element.matches(':focus-visible'), width: getComputedStyle(element).outlineWidth, offset: getComputedStyle(element).outlineOffset, color: getComputedStyle(element).outlineColor })); assert.equal(focus.visible, true); assert.ok(parseFloat(focus.width) >= 3); assert.ok(parseFloat(focus.offset) >= 2);
  await page.emulateMedia({ forcedColors: 'none' }); await page.setViewportSize({ width: 640, height: 1000 });
  const beforeResize = await page.locator('#type-body').evaluate(element => parseFloat(getComputedStyle(element).fontSize)); await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; }); const resize = await reflow(page, '200% CSS root sizing at640px'), afterResize = await page.locator('#type-body').evaluate(element => parseFloat(getComputedStyle(element).fontSize)); assert.ok(afterResize >= beforeResize * 1.99); await stateTargets(page, '200% CSS root sizing');
  await openEditor(page, 'reading'); const modalResize = await page.locator('#project-editor').evaluate(element => ({ width: element.getBoundingClientRect().width, viewport: innerWidth, client: element.clientWidth, scroll: element.scrollWidth })); assert.ok(modalResize.width <= modalResize.viewport && modalResize.scroll <= modalResize.client + 1); await stateTargets(page, '200% CSS modal targets'); await page.locator('#cancel-project').click(); await closedToOpener(page, 'reading'); await page.evaluate(() => document.documentElement.style.removeProperty('font-size'));
  check('Forced-colors focus remains explicit; actual 200% CSS text doubles body specimen and keeps page/modal actions available without horizontal page overflow; native browser zoom untested', { focus, resize, beforeResize, afterResize, modalResize });

  const cdp = await context.newCDPSession(page); await cdp.send('DOM.enable'); await cdp.send('CSS.enable'); const { root: documentNode } = await cdp.send('DOM.getDocument'); report.renderedFonts = {};
  for (const selector of ['#type-body', '#type-display', '#type-technical', '#type-vietnamese']) { const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: documentNode.nodeId, selector }); assert.ok(nodeId); const fonts = (await cdp.send('CSS.getPlatformFontsForNode', { nodeId })).fonts; assert.ok(fonts.length > 0); assert.equal(fonts.some(font => font.isCustomFont), false); report.renderedFonts[selector] = fonts.map(font => ({ family: font.familyName, custom: font.isCustomFont, glyphCount: font.glyphCount })); }
  check('Actual local body/display/technical/Vietnamese font glyph families recorded; CSS family declaration is not intended-webfont rendering evidence', report.renderedFonts); await context.close();

  const storageSamples = [];
  for (const mode of ['blocked', 'invalid', 'malformed']) {
    const failureContext = await newContext({ colorScheme: 'dark' });
    await failureContext.addInitScript(({ mode, key }) => { if (mode === 'blocked') Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } }); else { const getItem = Storage.prototype.getItem; Storage.prototype.getItem = function(candidate) { if (candidate !== key) return getItem.call(this, candidate); return mode === 'malformed' ? '{broken-json' : JSON.stringify({ appearance: 'invalid-choice', density: 'invalid-choice', motion: 'invalid-choice' }); }; } }, { mode, key });
    const failurePage = await failureContext.newPage(); await failurePage.goto(url); await assertPageColor(failurePage, appearanceColors.dark); assert.equal(await failurePage.locator('#appearance').inputValue(), 'system'); assert.equal(await failurePage.locator('#density').inputValue(), 'comfortable'); assert.equal(await failurePage.locator('#motion').isChecked(), true);
    await failurePage.locator('#appearance').selectOption('light'); await assertPageColor(failurePage, appearanceColors.light); await failurePage.locator('#density').selectOption('compact'); await failurePage.locator('#motion').uncheck(); await openProject(failurePage, 'studio'); await task(failurePage, 'studio', 2).check(); await aggregate(failurePage, 4); await openEditor(failurePage, 'studio'); await failurePage.locator('#cancel-project').click(); await closedToOpener(failurePage, 'studio');
    const note = await failurePage.locator('#preference-note').textContent(); if (mode === 'blocked') assert.match(note, /unavailable|not saved|this visit|this session/i, 'Blocked storage has truthful persistence feedback'); storageSamples.push({ mode, note }); await failureContext.close();
  }
  check('Blocked, invalid-choice and malformed preference storage preserve usable defaults, appearance controls, project/task flow and editing; failed storage has truthful persistence feedback', { storageSamples });

  const fragmentContext = await newContext({ viewport: { width: 1280, height: 1000 }, colorScheme: 'light' }); const fragmentPage = await fragmentContext.newPage();
  for (const id of ['studio', 'weekend']) { await fragmentPage.goto(url + '?fragment=' + id + '#project-' + id); await selection(fragmentPage, id); await fragmentPage.waitForFunction(id => document.activeElement?.id === 'project-' + id + '-title', id, { timeout: 2000 }); }
  await fragmentPage.evaluate(() => { location.hash = 'project-reading'; }); await fragmentPage.waitForFunction(() => document.activeElement?.id === 'project-reading-title'); await selection(fragmentPage, 'reading');
  await fragmentPage.goto(url + '?fragment=invalid#not-a-project'); await selection(fragmentPage, 'reading'); await fragmentPage.goto(url); await openProject(fragmentPage, 'studio'); await fragmentPage.goto(url); await selection(fragmentPage, 'reading');
  check('Initial and live project fragments reveal and focus the matching article; unrelated fragments fall back safely; fresh fragment-free visits reset selection'); await fragmentContext.close();

  const stressContext = await newContext({ viewport: { width: 320, height: 1000 }, colorScheme: 'light', reducedMotion: 'reduce' }); const stressPage = await stressContext.newPage(); await stressPage.goto(url);
  const longTitle = 'Góc đọc sách và những ý tưởng nhỏ trong ngày nhiều ánh sáng'; assert.ok(longTitle.length <= 60);
  await openEditor(stressPage, 'reading'); await stressPage.locator('#project-title').fill(longTitle); await stressPage.locator('#save-project').click(); await closedToOpener(stressPage, 'reading');
  const longSamples = [];
  for (const width of [320, 768, 1440]) { await stressPage.setViewportSize({ width, height: 1000 }); await reflow(stressPage, 'Long Vietnamese project title at' + width); const samples = []; for (const node of await stressPage.locator('[data-project-title="reading"]').all()) if (await node.isVisible()) samples.push(await notClipped(stressPage, node, 'Full bilingual title')); await stateTargets(stressPage, 'Long title actions'); await selection(stressPage, 'reading', longTitle); longSamples.push({ width, samples }); }
  check('A real edited Vietnamese title retains complete wrapping and accessible actions at 320/768/1440 without text clipping or page overflow', { longTitle, longSamples }); await stressContext.close();

  const unavailableSamples = [];
  for (const mode of ['absent', 'throw']) {
    const unavailableContext = await newContext({ viewport: { width: 390, height: 1000 }, colorScheme: 'dark' });
    await unavailableContext.addInitScript(mode => { if (mode === 'absent') HTMLDialogElement.prototype.showModal = undefined; else HTMLDialogElement.prototype.showModal = function() { throw new Error('Deliberate modal API failure'); }; }, mode);
    const unavailablePage = await unavailableContext.newPage(); await unavailablePage.goto(url);
    if (mode === 'throw') { await edit(unavailablePage, 'reading').click(); assert.equal(await focusedId(unavailablePage), 'project-reading-title', 'Failed modal opener recovers to project heading before being disabled'); }
    assert.equal(await unavailablePage.locator('#project-editor').evaluate(element => element.open), false); assert.equal(await unavailablePage.locator('#editor-unavailable').isVisible(), true);
    const disabled = await unavailablePage.locator('[data-edit-project]').evaluateAll(elements => elements.map(element => element.disabled)); assert.equal(disabled.length, 3); assert.ok(disabled.every(Boolean));
    await task(unavailablePage, 'reading', 1).check(); await aggregate(unavailablePage, 4); await unavailablePage.locator('#project-category').selectOption('creative'); assert.deepEqual(await visibleIds(unavailablePage), ['studio']); await openProject(unavailablePage, 'studio'); await task(unavailablePage, 'studio', 2).check(); await aggregate(unavailablePage, 5); await stateContrast(unavailablePage, 'Unavailable dialog ' + mode);
    unavailableSamples.push({ mode, disabled, note: await unavailablePage.locator('#editor-unavailable').textContent() }); await unavailableContext.close();
  }
  check('Missing and throwing native modal API disable all Edit actions with an explanation while filtering, task mutation, counts and native project navigation remain usable', { unavailableSamples });

  const noJsContext = await newContext({ javaScriptEnabled: false, colorScheme: 'dark', viewport: { width: 320, height: 1000 } }); const noJsPage = await noJsContext.newPage(); await noJsPage.goto(url); await assertPageColor(noJsPage, appearanceColors.dark); await reflow(noJsPage, 'No JavaScript at320px');
  for (const id of ids) { assert.equal(await card(noJsPage, id).isVisible(), true); assert.equal(await article(noJsPage, id).isVisible(), true); await noJsPage.locator('[data-open-project="' + id + '"]').focus(); await noJsPage.keyboard.press('Enter'); assert.match(noJsPage.url(), new RegExp('#project-' + id + '$')); assert.deepEqual(await tasksFor(noJsPage, id), initialTasks[id]); }
  const noJsControls = await noJsPage.locator('#appearance,#density,#motion,#project-search,#project-category,[data-project-task],[data-edit-project],[data-revert-project]').evaluateAll(elements => elements.map(element => ({ id: element.id || element.dataset.projectTask || element.dataset.editProject || element.dataset.revertProject, disabled: element.matches(':disabled') }))); assert.equal(noJsControls.length, 20); assert.deepEqual(noJsControls.filter(control => !control.disabled), []); assert.equal(await noJsPage.locator('#project-editor').isVisible(), false);
  for (const field of specimenFields) { const control = noJsPage.locator('#' + field.id); assert.equal(await control.isDisabled(), false); if (field.type === 'text') { await control.fill('A native field without JavaScript'); assert.equal(await control.inputValue(), 'A native field without JavaScript'); } else if (field.tag === 'select') { const option = control.locator('option').last(), value = await option.getAttribute('value') || await option.textContent(); await control.selectOption(value); assert.equal(await control.inputValue(), value); } else if (field.type === 'checkbox') { const before = await control.isChecked(); await control.setChecked(!before); assert.equal(await control.isChecked(), !before); } }
  const noJsContrast = await stateContrast(noJsPage, 'No JavaScript static workspace'); check('No JavaScript preserves all three static project articles, native anchors, truthful task states and editable specimen fields; all 20 runtime controls remain disabled', { noJsControls, contrast: noJsContrast }); await noJsContext.close();

  if (output) {
    await mkdir(output, { recursive: true }); report.screenshots = [];
    const captureContext = await newContext({ reducedMotion: 'reduce' }); const capturePage = await captureContext.newPage(); await capturePage.goto(url);
    for (const [appearance, width, filename, modal] of [['light', 1440, 'light-desktop.png', false], ['dark', 1440, 'dark-desktop.png', true], ['light', 390, 'light-mobile.png', false]]) {
      await capturePage.setViewportSize({ width, height: 1000 }); await capturePage.locator('#appearance').selectOption(appearance); await capturePage.locator('#density').selectOption('comfortable');
      if (modal) { await openEditor(capturePage, 'reading'); await capturePage.locator('#project-title').fill(' '); await capturePage.locator('#save-project').click(); }
      if (width === 390) await capturePage.locator('[data-project-card="reading"]').evaluate(element => window.scrollTo(0, Math.max(0, element.getBoundingClientRect().top + scrollY - 16)));
      await capturePage.screenshot({ path: path.join(output, filename) }); report.screenshots.push({ filename, appearance, width, scope: modal ? '1000px viewport with native modal validation errors' : width === 390 ? '1000px viewport from first project card' : '1000px initial workspace viewport' });
      if (modal) await capturePage.locator('#cancel-project').click();
    }
    await captureContext.close();
  }
  assert.deepEqual(errors, [], 'No uncaught runtime errors'); assert.deepEqual(external, [], 'No external resources'); assert.deepEqual(failedResources, [], 'No failed local responses'); assert.deepEqual(requestFailures, [], 'No failed local requests');
  for (const filename of Object.keys(report.testedFiles)) assert.equal(createHash('sha256').update(await readFile(path.join(preview, filename))).digest('hex'), report.testedFiles[filename], filename + ' unchanged during checks');
  assert.equal(createHash('sha256').update(await readFile(fileURLToPath(import.meta.url))).digest('hex'), report.validatorSha256, 'Validator unchanged during checks');
  check('Native resources and runtime remain clean, no external requests, and all three preview files plus validator retain their tested hashes');
  report.passed = true; if (output) await writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n'); process.stdout.write(JSON.stringify(report, null, 2) + '\n');
} catch (error) {
  report.passed = false; report.failure = { message: error.message, stack: error.stack };
  if (output) { await mkdir(output, { recursive: true }); await writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n'); }
  process.stderr.write(error.stack + '\n'); process.exitCode = 1;
} finally { await browser?.close(); await new Promise(resolve => server.close(resolve)); }
