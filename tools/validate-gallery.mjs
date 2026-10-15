import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Optional browser evidence for Gallery. These checks are original Atlas tooling,
// adapted from the Editorial and Swiss preview validators; no upstream UI code is used.
const options = {};
for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index];
  if (!['--module', '--browser', '--output', '--preview'].includes(key) || !process.argv[index + 1]) {
    throw new Error('Usage: node tools/validate-gallery.mjs [--module path/to/playwright/index.mjs] [--browser path/to/chromium] [--output directory] [--preview directory]');
  }
  options[key.slice(2)] = process.argv[index + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'themes/gallery/preview'));
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
    'No screen-reader, touch-device, native browser zoom, image-delivery performance, or real backend testing. Static collection/detail links and specimen fields remain usable without JavaScript; search, category filtering, preferences and inline selection require it. No cart, real products, checkout, shortlist or agent actions.',
    'Contrast samples are rendered HTML text composited over solid backgrounds and enabled select/text-input/textarea boundaries against their fill and adjacent background. Each layout must include nonzero opaque HTML text and every preference/search/category/specimen field boundary. SVG artwork, disabled controls, placeholders, text selection, native popup menus, checkbox glyph internals, and backgrounds with images are outside this check; exclusions and unsupported samples are recorded.',
    'Fallback font families are recorded from Chromium. Named webfont files are not distributed or loaded.',
    '44px target samples include enabled native controls, associated checkbox labels, summary controls, button-styled links, inspection/return links, section/document navigation and Atlas brand. Contextual inline source links are excluded.',
    'The temporary verification server exposes only the preview directory. Links to neighboring Atlas documents are checked separately, not followed here.'
  ]
};
for (const filename of ['index.html', 'styles.css', 'preview.js', 'assets/vessel-study.png', 'assets/seat-study.png', 'assets/room-study.png']) {
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
    for (const element of document.querySelectorAll('select:not(:disabled), input[type="search"]:not(:disabled), input[type="text"]:not(:disabled), input:not([type]):not(:disabled), textarea:not(:disabled)')) {
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

const ids = ['vessel', 'seat', 'room'];
const expectedTitles = { vessel: 'Vessel study', seat: 'Seat study', room: 'Room study' };
const card = (page, id) => page.locator('#collection [data-work-id="' + id + '"]');
const article = (page, id) => page.locator('#work-' + id);
const image = (page, id) => page.locator('#image-' + id);
const focusedId = page => page.locator(':focus').getAttribute('id');
async function stateContrast(page, label) {
  const colors = await contrast(page);
  assert.ok(colors.checked > 0 && colors.opaqueChecked > 0, label + ': nonzero opaque HTML text');
  assert.deepEqual(colors.failures, [], label + ': contrast failures ' + JSON.stringify(colors.failures));
  return { checked: colors.checked, opaqueChecked: colors.opaqueChecked, minimum: colors.minimum, skipped: colors.skipped, excluded: colors.excluded, controlBorders: colors.controlBorders };
}
async function hitTargets(page) {
  return page.evaluate(() => [...document.querySelectorAll('button:not(:disabled), select:not(:disabled), input:not(:disabled), textarea:not(:disabled), summary, a.button, .section-nav a, .text-link, .atlas-brand, .preview-footer nav a, #collection a[href^="#work-"], #viewer a[href^="#inspect-"]')].filter(element => element.getClientRects().length).map(element => {
    const target = ['checkbox', 'radio'].includes(element.type) ? element.labels?.[0] || element : element;
    const rect = target.getBoundingClientRect();
    return { id: element.id || element.getAttribute('href') || element.tagName.toLowerCase(), via: target === element ? 'control' : 'associated label', width: Number(rect.width.toFixed(2)), height: Number(rect.height.toFixed(2)) };
  }));
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
async function selection(page, expected) {
  for (const id of ids) {
    assert.equal(await article(page, id).isVisible(), id === expected, 'Exactly selected article visible: ' + id);
    const button = page.locator('#view-' + id);
    assert.equal(await button.getAttribute('aria-pressed'), String(id === expected));
    assert.equal(await page.getByRole('button', { name: 'Show ' + expectedTitles[id], exact: true }).count(), 1);
  }
  assert.match(await article(page, expected).locator('h3, h2').first().textContent(), new RegExp(expectedTitles[expected]));
}
async function readyImage(page, id) {
  await image(page, id).scrollIntoViewIfNeeded();
  await page.waitForFunction(id => {
    const element = document.getElementById('image-' + id);
    return element.complete && element.naturalWidth > 0 && document.getElementById('image-state-' + id).dataset.state === 'loaded';
  }, id, { timeout: 10000 });
}
async function inspect(page, id) {
  await page.locator('#inspect-' + id).click();
  assert.equal(await focusedId(page), 'work-title-' + id);
  await selection(page, id);
}
async function immediateFeedback(page, label) {
  const style = await page.locator('#view-vessel').evaluate(element => ({ duration: getComputedStyle(element).transitionDuration, animation: getComputedStyle(element).animationName, transform: getComputedStyle(element).transform }));
  assert.ok(style.duration.split(',').every(value => parseFloat(value) === 0), label + ': immediate transitions');
  assert.equal(style.animation, 'none'); assert.equal(style.transform, 'none');
  return style;
}
async function assertNoAnimation(page, label) {
  const animations = await page.evaluate(() => document.getAnimations().filter(animation => ['running', 'paused', 'pending'].includes(animation.playState)).map(animation => ({ state: animation.playState, duration: animation.effect?.getTiming().duration })));
  assert.deepEqual(animations, [], label);
}
async function visibleCardIds(page) {
  const found = [];
  for (const id of ids) if (await card(page, id).isVisible()) found.push(id);
  return found;
}
async function mediaMetadata(page) {
  return page.locator('img').evaluateAll(elements => elements.map(element => ({ id: element.id, src: element.getAttribute('src'), alt: element.getAttribute('alt'), width: Number(element.getAttribute('width')), height: Number(element.getAttribute('height')), loading: element.loading, naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight, filter: getComputedStyle(element).filter, objectFit: getComputedStyle(element).objectFit })));
}
try {
  browser = await playwright.chromium.launch({ headless: true, ...(options.browser ? { executablePath: options.browser } : {}) });
  report.browser = browser.version();
  if (options.module) report.playwright = JSON.parse(await readFile(path.join(path.dirname(path.resolve(options.module)), 'package.json'), 'utf8')).version;
  const context = await newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light', reducedMotion: 'no-preference' });
  const page = await context.newPage(); await page.goto(url);
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('#appearance').inputValue(), 'system'); assert.equal(await page.locator('#density').inputValue(), 'comfortable'); assert.equal(await page.locator('#motion').isChecked(), true);
  assert.equal(await page.locator('#search').inputValue(), ''); assert.equal(await page.locator('#category').inputValue(), 'all');
  assert.equal(await page.locator('#gallery-status').getAttribute('role'), 'status');
  await selection(page, 'vessel'); await readyImage(page, 'vessel');
  assert.match(await page.locator('#result-count').textContent(), /\b3\b/);
  for (const id of ids) {
    assert.equal(await card(page, id).count(), 1);
    assert.equal(await page.locator('#inspect-' + id).getAttribute('href'), '#work-' + id);
    assert.equal(await page.locator('#work-title-' + id).getAttribute('tabindex'), '-1');
    assert.match(await page.locator('#work-title-' + id).evaluate(element => element.tagName), /^H[1-6]$/);
    assert.equal(await page.locator('#back-' + id).getAttribute('href'), '#inspect-' + id);
  }
  const specimenFields = await page.locator('#specimen input, #specimen select, #specimen textarea').evaluateAll(elements => elements.map(element => ({ id: element.id, type: element.tagName.toLowerCase(), inputType: element.type, value: element.value })));
  assert.ok(specimenFields.some(field => field.type === 'input') && specimenFields.some(field => field.type === 'select'));
  assert.ok(specimenFields.every(field => field.id));
  for (const field of specimenFields.filter(field => field.inputType === 'text' && !field.value)) await page.locator('#' + field.id).fill('A local collection specimen');
  const boundaryIds = await page.locator('select:not(:disabled), input[type="search"]:not(:disabled), input[type="text"]:not(:disabled), input:not([type]):not(:disabled), textarea:not(:disabled)').evaluateAll(elements => elements.map(element => element.id));
  for (const id of ['appearance', 'density', 'search', 'category', 'specimen-name', 'specimen-kind']) assert.ok(boundaryIds.includes(id), 'Required field boundary included: ' + id);
  check('Three original study identities, static anchors, stable native view names/pressed states, default preferences and native specimen fields', { titles: expectedTitles, specimenFields });
  await page.locator('#motion').uncheck();
  const appearanceColors = {}, measuredDensities = {};
  for (const appearance of ['light', 'dark']) {
    await page.locator('#appearance').selectOption(appearance); appearanceColors[appearance] = await pageColor(page);
    for (const density of ['comfortable', 'compact']) {
      await page.locator('#density').selectOption(density);
      for (const width of [320, 390, 768, 1280, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        const label = appearance + '/' + density + '/' + width;
        const sizes = await reflow(page, label), colors = await stateContrast(page, label), targets = await stateTargets(page, label);
        for (const id of boundaryIds) assert.ok(colors.controlBorders.some(sample => sample.id === id), 'Measured control boundary: ' + id);
        if (width === 1440 && appearance === 'light') measuredDensities[density] = await densityMetrics(page);
        if (width <= 390) for (const id of boundaryIds) assert.ok(await page.locator('#' + id).evaluate(element => parseFloat(getComputedStyle(element).fontSize)) >= 16, 'Mobile field text at least16px: ' + id);
        report.layouts.push({ appearance, density, ...sizes, contrast: colors, targets });
      }
    }
  }
  for (const [density, padding] of [['comfortable', 24], ['compact', 16]]) assert.ok(Object.values(measuredDensities[density].padding).every(value => value === padding));
  assert.ok(measuredDensities.comfortable.height > measuredDensities.compact.height + 1);
  assert.notEqual(appearanceColors.light, appearanceColors.dark);
  check('20 appearance/density/width layouts, all expected boundaries, opaque text contrast, 44px targets, 16px mobile fields and actual 24→16px specimen inset', { combinations: report.layouts.length, boundaryIds, measuredDensities });
  await page.setViewportSize({ width: 1280, height: 1000 }); await page.goto(url);
  await page.keyboard.press('Tab'); assert.equal((await page.locator(':focus').textContent()).trim(), 'Skip to content');
  await page.keyboard.press('Enter'); assert.equal(await focusedId(page), 'main-content');
  await page.locator('#inspect-seat').focus(); await page.keyboard.press('Enter');
  assert.equal(await focusedId(page), 'work-title-seat'); await selection(page, 'seat'); await readyImage(page, 'seat');
  await page.locator('#back-seat').focus(); await page.keyboard.press('Enter'); assert.equal(await focusedId(page), 'inspect-seat');
  const viewNames = {};
  for (const id of ids) {
    const control = page.locator('#view-' + id);
    viewNames[id] = await control.ariaSnapshot();
    await control.focus(); await page.keyboard.press('Space');
    await selection(page, id); assert.equal(await focusedId(page), 'view-' + id); await readyImage(page, id);
    assert.equal(await page.getByRole('button', { name: 'Show ' + expectedTitles[id], exact: true }).count(), 1);
  }
  check('Keyboard skip/Inspect/Return focus and three ordinary native view controls preserve focus with stable contextual accessible names and pressed states', { viewNames });
  await page.locator('#search').fill(' grain '); assert.deepEqual(await visibleCardIds(page), ['seat']); assert.match(await page.locator('#result-count').textContent(), /\b1\b/);
  await page.locator('#search').fill('SEAT'); assert.deepEqual(await visibleCardIds(page), ['seat']); await selection(page, 'room');
  await page.locator('#category').selectOption('spaces'); assert.deepEqual(await visibleCardIds(page), []);
  assert.equal(await page.locator('#no-results').isVisible(), true); assert.match(await page.locator('#result-count').textContent(), /\b0\b/);
  await page.locator('#clear-filters').click(); assert.equal(await focusedId(page), 'search');
  assert.equal(await page.locator('#search').inputValue(), ''); assert.equal(await page.locator('#category').inputValue(), 'all'); assert.deepEqual(await visibleCardIds(page), ids); await selection(page, 'room');
  await inspect(page, 'vessel'); await page.locator('#category').selectOption('spaces');
  assert.deepEqual(await visibleCardIds(page), ['room']); await selection(page, 'vessel');
  await page.locator('#back-vessel').click(); assert.equal(await focusedId(page), 'search');
  assert.equal(await page.locator('#category').inputValue(), 'spaces'); await selection(page, 'vessel');
  assert.match(await page.locator('#gallery-status').textContent(), /filter|hidden|search|visible/i);
  await page.locator('#category').selectOption('all'); await page.locator('#back-vessel').click(); assert.equal(await focusedId(page), 'inspect-vessel');
  check('Search is case-insensitive, combined filter has a reachable empty state, Clear restores all with search focus, selection survives filters and hidden-opener Return explains recovery');
  const media = await mediaMetadata(page);
  assert.ok(media.length >= 6, 'Collection and detail contain actual image elements');
  for (const item of media) { assert.ok(item.width > 0 && item.height > 0, 'Intrinsic dimensions reserve each image box: ' + item.src); assert.ok(item.alt?.trim(), 'Informative study image has nonempty alt: ' + item.src); assert.equal(item.filter, 'none', 'Original image colors are not filtered'); assert.match(item.src, /^assets\/(vessel|seat|room)-study\.png$/); }
  const articleMetadata = {};
  for (const id of ids) {
    await page.locator('#view-' + id).click(); await readyImage(page, id);
    const sample = await image(page, id).evaluate(element => ({ alt: element.alt, width: element.width, height: element.height, intrinsicWidth: element.getAttribute('width'), intrinsicHeight: element.getAttribute('height'), naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight, objectFit: getComputedStyle(element).objectFit }));
    assert.equal(sample.naturalWidth, Number(sample.intrinsicWidth)); assert.equal(sample.naturalHeight, Number(sample.intrinsicHeight));
    const caption = article(page, id).locator('figcaption'); assert.ok(await caption.count() > 0); assert.equal(await caption.first().isVisible(), true);
    const text = await article(page, id).textContent(); assert.match(text, /AI.generated/i); assert.match(text, /Atlas|Tamir|Codex/i);
    assert.ok(sample.alt.length > expectedTitles[id].length, 'Alt describes visible work rather than only repeating its title');
    articleMetadata[id] = { ...sample, caption: (await caption.first().textContent()).trim() };
  }
  check('Actual local media retain declared natural dimensions, informative alternatives, visible captions/creator context and unchanged color treatment', { media, articleMetadata });
  await page.locator('#appearance').selectOption('system'); await page.emulateMedia({ colorScheme: 'dark' }); await assertPageColor(page, appearanceColors.dark); await page.emulateMedia({ colorScheme: 'light' }); await assertPageColor(page, appearanceColors.light);
  await page.locator('#appearance').selectOption('light'); await page.locator('#density').selectOption('compact'); await page.locator('#motion').uncheck();
  await page.emulateMedia({ colorScheme: 'dark' }); await assertPageColor(page, appearanceColors.light);
  await page.locator('#category').selectOption('spaces'); await page.locator('#search').fill('room'); await page.locator('#view-room').click(); await page.reload();
  assert.equal(await page.locator('#appearance').inputValue(), 'light'); assert.equal(await page.locator('#density').inputValue(), 'compact'); assert.equal(await page.locator('#motion').isChecked(), false);
  assert.equal(await page.locator('#search').inputValue(), ''); assert.equal(await page.locator('#category').inputValue(), 'all'); await selection(page, 'vessel');
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('interface-atlas-gallery-preview'))); assert.deepEqual(Object.keys(saved).sort(), ['appearance','density','motion']);
  check('System follows live device appearance, explicit preference overrides it, only appearance/density/motion persist and search/category/selection reset on reload', { saved });
  await page.locator('#motion').check();
  const feedback = await page.locator('#view-seat').evaluate(element => getComputedStyle(element).transitionDuration);
  const feedbackProperties = await page.locator('#view-seat').evaluate(element => getComputedStyle(element).transitionProperty.split(',').map(value => value.trim()));
  assert.ok(feedbackProperties.every(property => ['color', 'background-color', 'border-color'].includes(property)), 'Only color/background/border properties receive feedback transitions');
  assert.ok(feedback.split(',').some(value => Math.abs(parseFloat(value) - .18) < .001));
  await page.waitForTimeout(220); await assertNoAnimation(page, 'No autoplay or continuous animation');
  await page.emulateMedia({ reducedMotion: 'reduce' }); const reduced = await immediateFeedback(page, 'Reduced motion');
  await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.locator('#motion').uncheck(); const off = await immediateFeedback(page, 'Motion off');
  await page.locator('#view-seat').click(); await readyImage(page, 'seat'); await assertNoAnimation(page, 'Image selection needs no animation');
  check('Only 180ms color/background/border feedback is proposed, no automatic animation runs, reduced/off are immediate and image selection remains usable', { feedback, feedbackProperties, reduced, off });
  await page.emulateMedia({ forcedColors: 'active' }); await page.locator('#appearance').focus();
  const focus = await page.locator('#appearance').evaluate(element => ({ width: getComputedStyle(element).outlineWidth, offset: getComputedStyle(element).outlineOffset, color: getComputedStyle(element).outlineColor })); assert.equal(focus.width, '3px'); assert.equal(focus.offset, '5px');
  check('Forced-colors focus retains 3px outline and 5px offset', focus);
  await page.emulateMedia({ forcedColors: 'none' }); await page.setViewportSize({ width: 640, height: 1000 });
  const beforeResize = await page.locator('#type-body').evaluate(element => parseFloat(getComputedStyle(element).fontSize));
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; }); const resize = await reflow(page, '200% CSS text at 640px'); const afterResize = await page.locator('#type-body').evaluate(element => parseFloat(getComputedStyle(element).fontSize)); assert.ok(afterResize >= beforeResize * 1.99); await stateTargets(page, '200% CSS text');
  check('200% CSS root sizing actually doubles body sample and reflows at 640px; native browser zoom untested', { ...resize, beforeResize, afterResize });
  await page.evaluate(() => document.documentElement.style.removeProperty('font-size'));
  const cdp = await context.newCDPSession(page); await cdp.send('DOM.enable'); await cdp.send('CSS.enable'); const { root: documentNode } = await cdp.send('DOM.getDocument'); report.renderedFonts = {};
  for (const selector of ['#type-body', '#type-display', '#type-technical', '#type-vietnamese']) { const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: documentNode.nodeId, selector }); assert.ok(nodeId); const fonts = (await cdp.send('CSS.getPlatformFontsForNode', { nodeId })).fonts; assert.ok(fonts.length > 0); assert.equal(fonts.some(font => font.isCustomFont), false); report.renderedFonts[selector] = fonts.map(font => ({ family: font.familyName, custom: font.isCustomFont, glyphCount: font.glyphCount })); }
  check('Actual local body/display/technical/Vietnamese platform-font glyph families recorded', report.renderedFonts); await context.close();
  for (const mode of ['blocked', 'invalid', 'malformed']) {
    const failureContext = await newContext({ colorScheme: 'dark' });
    await failureContext.addInitScript(mode => { if (mode === 'blocked') Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } }); else { const getItem = Storage.prototype.getItem; Storage.prototype.getItem = function(key) { if (key !== 'interface-atlas-gallery-preview') return getItem.call(this, key); return mode === 'malformed' ? '{broken-json' : JSON.stringify({ appearance: 'invalid-choice', density: 'invalid-choice', motion: 'invalid-choice' }); }; } }, mode);
    const failurePage = await failureContext.newPage(); await failurePage.goto(url); await assertPageColor(failurePage, appearanceColors.dark);
    assert.equal(await failurePage.locator('#appearance').inputValue(), 'system'); assert.equal(await failurePage.locator('#density').inputValue(), 'comfortable'); assert.equal(await failurePage.locator('#motion').isChecked(), true);
    await failurePage.locator('#appearance').selectOption('light'); await assertPageColor(failurePage, appearanceColors.light); await failurePage.locator('#density').selectOption('compact'); await failurePage.locator('#motion').uncheck(); await inspect(failurePage, 'seat');
    await failureContext.close();
  }
  check('Blocked/invalid/malformed storage preserves usable defaults, preferences and inspection');
  const fragmentContext = await newContext({ viewport: {width:1280,height:1000}, colorScheme:'light' });
  const fragmentPage = await fragmentContext.newPage();
  for (const id of ['room','seat']) { await fragmentPage.goto(url+'?fragment='+id+'#work-'+id); await selection(fragmentPage,id); await readyImage(fragmentPage,id); }
  await fragmentPage.evaluate(() => { location.hash = 'work-room'; });
  await fragmentPage.waitForFunction(() => document.activeElement?.id === 'work-title-room'); await selection(fragmentPage,'room'); await readyImage(fragmentPage,'room');
  await fragmentPage.goto(url+'?fragment=invalid#not-a-work'); await selection(fragmentPage,'vessel'); await readyImage(fragmentPage,'vessel');
  await fragmentPage.goto(url); await fragmentPage.locator('#view-seat').click(); await fragmentPage.reload(); await selection(fragmentPage,'vessel'); await readyImage(fragmentPage,'vessel');
  check('Real work-fragment arrival reveals the matching article, live valid hash navigation focuses its heading, invalid fragments fall back and fragment-free reload resets selection');
  await fragmentContext.close();
  const stressContext = await newContext({ viewport: {width:1440,height:1000}, colorScheme:'light', reducedMotion:'reduce' });
  const stressPage = await stressContext.newPage(); await stressPage.goto(url);
  const heroSamples = [];
  for (const width of [768,1280]) {
    await stressPage.setViewportSize({width,height:1000});
    const sample = await stressPage.evaluate(() => {
      const picture = document.querySelector('.hero-figure img').getBoundingClientRect();
      const walker = document.createTreeWalker(document.querySelector('.hero-copy'),NodeFilter.SHOW_TEXT);
      const overlaps=[]; let node;
      while((node=walker.nextNode())) { if(!node.textContent.trim())continue; const range=document.createRange();range.selectNodeContents(node);for(const rect of range.getClientRects()){const horizontal=Math.min(rect.right,picture.right)-Math.max(rect.left,picture.left);const vertical=Math.min(rect.bottom,picture.bottom)-Math.max(rect.top,picture.top);if(horizontal>.5&&vertical>.5)overlaps.push({text:node.textContent.trim(),width:horizontal,height:vertical});}}
      return {width:innerWidth,image:{left:picture.left,right:picture.right,top:picture.top,bottom:picture.bottom},overlaps};
    });
    assert.deepEqual(sample.overlaps,[],'Actual hero text ranges stay off the image at'+width);heroSamples.push(sample);
  }
  const injectedTitle = 'A longer study of everyday objects and quiet relationships · Hình dáng, chất liệu và ánh sáng trong không gian sống';
  const injectedCaption = 'AI-generated illustrative composition with complete material context and source credit · Nghiên cứu hình dáng và ánh sáng, giữ đầy đủ chú thích và nguồn gốc';
  await stressPage.locator('#collection .work-card h3').evaluateAll((elements,text)=>elements.forEach(element=>element.textContent=text),injectedTitle);
  await stressPage.locator('#collection .work-card figcaption span').evaluateAll((elements,text)=>elements.forEach(element=>element.textContent=text),injectedCaption);
  const stressSamples=[];
  for(const width of [320,768,1440]) {
    await stressPage.setViewportSize({width,height:1000}); await reflow(stressPage,'Injected long bilingual titles/captions at'+width);
    const samples=await stressPage.locator('#collection .work-card').evaluateAll(elements=>elements.map(element=>{
      const title=element.querySelector('h3'),inspect=element.querySelector('.inspect-link'),captions=[...element.querySelectorAll('figcaption span')];
      const titleRange=document.createRange();titleRange.selectNodeContents(title);const control=inspect.getBoundingClientRect();
      const textSamples=[title,...captions].map(node=>({text:node.textContent,clamp:getComputedStyle(node).webkitLineClamp,overflow:getComputedStyle(node).textOverflow,clientWidth:node.clientWidth,scrollWidth:node.scrollWidth,clientHeight:node.clientHeight,scrollHeight:node.scrollHeight}));
      const overlaps=[...titleRange.getClientRects()].filter(rect=>Math.min(rect.right,control.right)-Math.max(rect.left,control.left)>.5&&Math.min(rect.bottom,control.bottom)-Math.max(rect.top,control.top)>.5).length;
      return {id:element.dataset.workId,textSamples,inspect:{width:control.width,height:control.height},overlaps};
    }));
    for(const sample of samples){assert.equal(sample.overlaps,0,'Long title does not overlap Inspect '+sample.id+' at'+width);assert.ok(sample.inspect.width>=43.99&&sample.inspect.height>=43.99);for(const text of sample.textSamples){assert.ok(['none','0'].includes(text.clamp),'No line clamp on injected text');assert.notEqual(text.overflow,'ellipsis');assert.ok(text.scrollWidth<=text.clientWidth+1,'Full injected text fits its width');assert.ok(text.scrollHeight<=text.clientHeight+1,'Full injected text fits its height');assert.ok(text.text===injectedTitle||text.text===injectedCaption);}}
    for(const id of ids){await stressPage.locator('#inspect-'+id).focus();await stressPage.keyboard.press('Enter');assert.equal(await focusedId(stressPage),'work-title-'+id);}
    stressSamples.push({width,samples});
  }
  check('Injected long English/Vietnamese card titles and captions remain complete at 320/768/1440 with reachable nonoverlapping Inspect actions; actual hero text stays off imagery at 768/1280',{heroSamples,stressSamples});
  await stressContext.close();
  // These contexts deliberately intercept local requests; their failures are retained separately.
  const delayedContext = await newContext({ viewport: { width:1280, height:1000 }, colorScheme: 'light' }, 'injected-delay');
  const pendingRoutes = [];
  await delayedContext.route('**/assets/vessel-study.png', route => { pendingRoutes.push(route); });
  const delayedPage = await delayedContext.newPage(); await delayedPage.goto(url, { waitUntil: 'domcontentloaded' }); await delayedPage.locator('#work-vessel').scrollIntoViewIfNeeded();
  await delayedPage.waitForFunction(() => document.querySelector('#image-state-vessel').dataset.state === 'loading');
  assert.ok(pendingRoutes.length > 0, 'Actual vessel asset request was intercepted');
  const loadingBox = await image(delayedPage, 'vessel').boundingBox(); assert.ok(loadingBox.width > 0 && loadingBox.height > 0);
  assert.equal(await delayedPage.locator('#image-state-vessel').isVisible(), true); assert.match(await delayedPage.locator('#image-state-vessel').textContent(), /load/i);
  const loadingAlt = await image(delayedPage,'vessel').getAttribute('alt'); assert.ok(loadingAlt); assert.match(await article(delayedPage,'vessel').textContent(), /AI.generated/i);
  await delayedPage.locator('#view-seat').click(); await selection(delayedPage, 'seat'); await readyImage(delayedPage, 'seat');
  const selectedStatus = await delayedPage.locator('#gallery-status').textContent();
  for (const route of pendingRoutes) await route.continue(); await delayedContext.unroute('**/assets/vessel-study.png');
  await delayedPage.waitForFunction(() => document.querySelector('#image-state-vessel').dataset.state === 'loaded');
  await selection(delayedPage, 'seat'); assert.equal(await focusedId(delayedPage), 'view-seat'); assert.equal(await delayedPage.locator('#gallery-status').textContent(), selectedStatus, 'Stale image completion cannot overwrite chosen-work feedback');
  await delayedPage.locator('#view-vessel').click(); await readyImage(delayedPage,'vessel'); const loadedBox=await image(delayedPage,'vessel').boundingBox();assert.ok(Math.abs(loadedBox.width-loadingBox.width)<1&&Math.abs(loadedBox.height-loadingBox.height)<1,'Declared dimensions preserve the image box across loading'); assert.match(await delayedPage.locator('#image-state-vessel').textContent(), /loaded/i);
  check('A real delayed image keeps a reserved box/alternative/caption, then completes; switching work first prevents stale completion from replacing current metadata/status/focus', { loadingBox, loadedBox, loadingAlt, delayedRequests: pendingRoutes.length });
  await delayedContext.close();
  const retryContext = await newContext({ viewport:{width:1280,height:1000}, colorScheme:'light' }, 'injected-image-failure'); let failImage = true, abortedCount = 0, retriedCount = 0;
  await retryContext.route('**/assets/vessel-study.png', async route => { if (failImage) { abortedCount++; await route.abort('failed'); } else { retriedCount++; await route.continue(); } });
  const retryPage = await retryContext.newPage(); await retryPage.goto(url); await retryPage.locator('#work-vessel').scrollIntoViewIfNeeded();
  await retryPage.waitForFunction(() => document.querySelector('#image-state-vessel').dataset.state === 'error');
  assert.equal(await retryPage.locator('#retry-vessel').isVisible(), true); assert.equal(await retryPage.locator('#retry-vessel').isEnabled(), true);
  const failureText = await retryPage.locator('#image-state-vessel').textContent(); assert.match(failureText, /unavailable|fail|load|error/i); assert.ok(await image(retryPage,'vessel').getAttribute('alt')); assert.match(await article(retryPage,'vessel').textContent(), /AI.generated/i);
  await retryPage.locator('#motion').uncheck(); const failureContrasts = {}; for (const appearance of ['light','dark']) { await retryPage.locator('#appearance').selectOption(appearance); failureContrasts[appearance] = await stateContrast(retryPage, 'Image error '+appearance); await stateTargets(retryPage,'Image retry '+appearance); }
  failImage = false; await retryPage.locator('#retry-vessel').focus(); await retryPage.keyboard.press('Enter'); await readyImage(retryPage,'vessel');
  assert.equal(await retryPage.locator('#retry-vessel').isVisible(), false); assert.ok(abortedCount>0 && retriedCount>0, 'Retry makes an actual new successful request'); await selection(retryPage,'vessel');
  assert.equal(await focusedId(retryPage),'work-title-vessel', 'Retry completion restores coherent focus before its button disappears');
  check('Injected real image request failure preserves alt/caption/credit and readable error; explicit keyboard Retry makes the same asset request succeed and recovers focus', { abortedCount,retriedCount,failureText,contrast:failureContrasts }); await retryContext.close();
  const noJsContext = await newContext({ javaScriptEnabled:false,colorScheme:'dark',viewport:{width:320,height:1000} }); const noJsPage = await noJsContext.newPage(); await noJsPage.goto(url); await assertPageColor(noJsPage,appearanceColors.dark); await reflow(noJsPage,'No JavaScript320px');
  for (const id of ids) { assert.equal(await card(noJsPage,id).isVisible(),true); assert.equal(await article(noJsPage,id).isVisible(),true); await noJsPage.locator('#inspect-'+id).focus(); await noJsPage.keyboard.press('Enter'); assert.match(noJsPage.url(), new RegExp('#work-'+id+'$')); assert.match(await article(noJsPage,id).textContent(),/AI.generated/i); }
  const noJsControls = await noJsPage.locator('#appearance,#density,#motion,#search,#category,#view-vessel,#view-seat,#view-room').evaluateAll(elements=>elements.map(element=>({id:element.id,disabled:element.matches(':disabled')}))); assert.equal(noJsControls.length,8); assert.deepEqual(noJsControls.filter(control=>!control.disabled),[]);
  for (const field of specimenFields) { const control=noJsPage.locator('#'+field.id); assert.equal(await control.isDisabled(),false); if(field.inputType==='text'){await control.fill('A native field without JavaScript');assert.equal(await control.inputValue(),'A native field without JavaScript');} else if(field.type==='select'){const last=control.locator('option').last();const value=await last.getAttribute('value')||await last.textContent();await control.selectOption(value);assert.equal(await control.inputValue(),value);}else if(field.inputType==='checkbox'){const initial=await control.isChecked();await control.setChecked(!initial);assert.equal(await control.isChecked(),!initial);} }
  const noJsColors=await stateContrast(noJsPage,'No JavaScript static Gallery'); check('No JavaScript retains all three collection/detail figures and real anchors, metadata and editable native specimens; runtime controls remain unavailable', {disabledControls:noJsControls,contrast:noJsColors}); await noJsContext.close();
  if(output){await mkdir(output,{recursive:true});report.screenshots=[];const captureContext=await newContext({reducedMotion:'reduce'});const capturePage=await captureContext.newPage();await capturePage.goto(url);
    for(const [appearance,width,filename]of[['light',1440,'light-desktop.png'],['dark',1440,'dark-desktop.png'],['light',390,'light-mobile.png']]){await capturePage.setViewportSize({width,height:1000});await capturePage.locator('#appearance').selectOption(appearance);await capturePage.locator('#density').selectOption('comfortable');const section=appearance==='dark'?'#viewer':'#collection';await capturePage.locator(appearance==='dark'?'#view-room':'#view-vessel').click();await readyImage(capturePage,appearance==='dark'?'room':'vessel');if(width>390){const bounds=await capturePage.locator(section).boundingBox();await capturePage.setViewportSize({width,height:Math.max(1000,Math.ceil(bounds.height)+2)});await capturePage.locator(section).scrollIntoViewIfNeeded();for(const sectionImage of await capturePage.locator(section+' img:visible').all()){await sectionImage.scrollIntoViewIfNeeded();await sectionImage.evaluate(element=>element.complete&&element.naturalWidth>0?Promise.resolve():new Promise((resolve,reject)=>{element.addEventListener('load',resolve,{once:true});element.addEventListener('error',()=>reject(new Error('Capture image failed')),{once:true});}));}await capturePage.locator(section).screenshot({path:path.join(output,filename)});}else{await capturePage.locator(section).evaluate(element=>window.scrollTo(0,element.getBoundingClientRect().top+window.scrollY));await capturePage.screenshot({path:path.join(output,filename)});}report.screenshots.push({filename,appearance,width,section,scope:width>390?'Complete section':'1000px viewport from collection start'});}
    await captureContext.close();}
  report.injectedResourceFailures=intentionalFailures;
  assert.ok(intentionalFailures.some(failure=>failure.purpose==='injected-image-failure'),'Expected deliberate image failure retained');
  assert.deepEqual(errors,[],'No runtime errors');assert.deepEqual(external,[],'No external resource requests');assert.deepEqual(failedResources,[],'No ordinary failed responses');assert.deepEqual(requestFailures,[],'No ordinary failed requests');
  for(const filename of Object.keys(report.testedFiles))assert.equal(createHash('sha256').update(await readFile(path.join(preview,filename))).digest('hex'),report.testedFiles[filename],filename+' unchanged during checks');assert.equal(createHash('sha256').update(await readFile(fileURLToPath(import.meta.url))).digest('hex'),report.validatorSha256,'Validator unchanged during checks');
  check('Ordinary resources/runtime clean; deliberate image failures retained separately; six native/media source hashes and validator hash unchanged', {intentionalFailures});report.passed=true;if(output)await writeFile(path.join(output,'results.json'),JSON.stringify(report,null,2)+'\n');process.stdout.write(JSON.stringify(report,null,2)+'\n');
}catch(error){report.passed=false;report.failure={message:error.message,stack:error.stack};if(output){await mkdir(output,{recursive:true});await writeFile(path.join(output,'results.json'),JSON.stringify(report,null,2)+'\n');}process.stderr.write(error.stack+'\n');process.exitCode=1;}finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
