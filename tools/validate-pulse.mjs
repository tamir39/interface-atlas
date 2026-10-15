import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Optional browser evidence for Pulse. These checks are original Atlas tooling,
// adapted from the Editorial and Swiss preview validators; no upstream UI code is used.
const options = {};
for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index];
  if (!['--module', '--browser', '--output', '--preview'].includes(key) || !process.argv[index + 1]) {
    throw new Error('Usage: node tools/validate-pulse.mjs [--module path/to/playwright/index.mjs] [--browser path/to/chromium] [--output directory] [--preview directory]');
  }
  options[key.slice(2)] = process.argv[index + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'themes/pulse/preview'));
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
    'No screen-reader, touch-device, native browser zoom, or real backend testing. Native specimen fields and session disclosures remain usable without JavaScript; preferences, local planner, and finite motion study require it. No bookings, network submissions, agent actions, or real rendering-performance benchmark are tested or provided.',
    'Contrast samples are rendered HTML text composited over solid backgrounds and enabled select/text-input/textarea boundaries against their fill and adjacent background. Each layout must include nonzero opaque HTML text and every preference/format/specimen field boundary. SVG artwork, disabled controls, placeholders, text selection, native popup menus, checkbox glyph internals, and backgrounds with images are outside this check; exclusions and unsupported samples are recorded.',
    'Fallback font families are recorded from Chromium. Named webfont files are not distributed or loaded.',
    '44px target samples include enabled native controls, associated checkbox labels, summary controls, button-styled links, planner links, section/document navigation, and the Atlas brand. Contextual inline source links are excluded.',
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

const sessionIds = ['opening', 'systems', 'motion', 'type', 'prototype', 'critique'];
const card = (page, id) => page.locator('#program [data-session-id="' + id + '"]');
const add = (page, id) => page.locator('#add-' + id);
const focusedId = page => page.locator(':focus').getAttribute('id');
async function selectedIds(page) {
  const selected = [];
  for (const id of sessionIds) if (await add(page, id).getAttribute('aria-pressed') === 'true') selected.push(id);
  return selected;
}
async function assertPlan(page, expected) {
  assert.deepEqual(await selectedIds(page), sessionIds.filter(id => expected.includes(id)), 'Plan toggles retain unique selected membership');
  const rows = page.locator('#plan-list > li');
  assert.equal(await rows.count(), expected.length, 'One chosen row per selected session');
  const texts = await rows.allTextContents();
  for (let index = 0; index < expected.length; index++) assert.ok(texts[index].includes(report.sessionTitles[expected[index]]), 'Chosen rows use fixed chronological program order');
  assert.match(await page.locator('#plan-count').textContent(), new RegExp('\\b' + expected.length + '\\b'));
}
async function stableAddName(page, id, expectedPressed) {
  const control = add(page, id);
  assert.equal(await control.getAttribute('aria-pressed'), String(expectedPressed));
  const snapshot = await control.ariaSnapshot();
  const name = /button "([^"]+)"/.exec(snapshot)?.[1];
  assert.equal(name, report.addNames[id], 'Session toggle keeps its actual accessible name after state changes');
  assert.equal(await page.getByRole('button', { name, exact: true }).count(), 1, 'Each session toggle has a unique exact accessible name');
}
async function hitTargets(page) {
  return page.evaluate(() => [...document.querySelectorAll('button:not(:disabled), select:not(:disabled), input:not(:disabled), textarea:not(:disabled), summary, a.button, .section-nav a, .text-link, .atlas-brand, .preview-footer nav a, #error-list a')].filter(element => element.getClientRects().length).map(element => {
    const target = ['checkbox', 'radio'].includes(element.type) ? element.labels?.[0] || element : element;
    const rect = target.getBoundingClientRect();
    return { id: element.id || element.getAttribute('href') || element.tagName.toLowerCase(), via: target === element ? 'control' : 'associated label', width: Number(rect.width.toFixed(2)), height: Number(rect.height.toFixed(2)) };
  }));
}
async function densityMetrics(page) {
  return page.locator('.specimen-panel').evaluate(element => ({ height: element.getBoundingClientRect().height, padding: { blockStart: parseFloat(getComputedStyle(element).paddingBlockStart), blockEnd: parseFloat(getComputedStyle(element).paddingBlockEnd), inlineStart: parseFloat(getComputedStyle(element).paddingInlineStart), inlineEnd: parseFloat(getComputedStyle(element).paddingInlineEnd) } }));
}
async function stateContrast(page, label) {
  const colors = await contrast(page);
  assert.ok(colors.checked > 0 && colors.opaqueChecked > 0, label + ': expected nonzero opaque rendered HTML samples');
  assert.deepEqual(colors.failures, [], label + ': contrast failures ' + JSON.stringify(colors.failures));
  return { checked: colors.checked, opaqueChecked: colors.opaqueChecked, minimum: colors.minimum, skipped: colors.skipped, excluded: colors.excluded, controlBorders: colors.controlBorders };
}
async function stateTargets(page, label) {
  const targets = await hitTargets(page);
  assert.ok(targets.length > 0);
  assert.deepEqual(targets.filter(target => target.height < 43.99 || target.width < 43.99), [], label + ': 44px targets ' + JSON.stringify(targets));
  return targets;
}
async function openNativeDisclosure(page, selector) {
  const disclosure = page.locator(selector);
  const initial = await disclosure.evaluate(element => element.open);
  await disclosure.locator('summary').focus(); await page.keyboard.press('Enter');
  assert.equal(await disclosure.evaluate(element => element.open), !initial);
  await page.keyboard.press('Enter');
  assert.equal(await disclosure.evaluate(element => element.open), initial);
}
async function immediateFeedback(page, label) {
  const style = await add(page, 'opening').evaluate(element => ({ duration: getComputedStyle(element).transitionDuration, animation: getComputedStyle(element).animationName, transform: getComputedStyle(element).transform }));
  assert.ok(style.duration.split(',').every(value => parseFloat(value) === 0), label + ': immediate feedback');
  assert.equal(style.animation, 'none'); assert.equal(style.transform, 'none');
  return style;
}
async function barsAnimations(page) {
  return page.locator('.motion-bar').evaluateAll(elements => elements.flatMap(element => element.getAnimations()).map(animation => ({ state: animation.playState, timing: { duration: animation.effect.getTiming().duration, iterations: animation.effect.getTiming().iterations }, properties: [...new Set(animation.effect.getKeyframes().flatMap(frame => Object.keys(frame).filter(key => !['offset', 'computedOffset', 'easing', 'composite'].includes(key))))] })));
}
async function studyComposition(page) {
  return page.locator('.motion-bar').evaluateAll(elements => elements.map(element => ({ opacity: getComputedStyle(element).opacity, transform: getComputedStyle(element).transform })));
}
async function assertNoStudyAnimation(page, label) {
  const animations = await barsAnimations(page);
  assert.deepEqual(animations.filter(animation => ['running', 'pending', 'paused'].includes(animation.state)), [], label);
  return animations;
}
async function clearPlan(page) {
  if (await page.locator('#clear-plan').isEnabled()) await page.locator('#clear-plan').click();
  await assertPlan(page, []);
}
async function assertReviewHidden(page) { assert.equal(await page.locator('#plan-review').isVisible(), false, 'Membership changes invalidate previous review'); }
async function reviewErrors(page, expectedIds) {
  await page.locator('#review-plan').click();
  assert.equal(await page.locator('#plan-errors').isVisible(), true);
  assert.equal(await focusedId(page), 'error-title', 'Invalid review focuses error summary heading');
  assert.equal(await page.locator('#plan-review').isVisible(), false);
  const links = page.locator('#error-list a');
  const hrefs = await links.evaluateAll(elements => elements.map(element => element.getAttribute('href')));
  if (expectedIds.length) for (const id of expectedIds) assert.ok(hrefs.includes('#add-' + id), 'Conflict summary links to both involved sessions: ' + id);
  assert.ok(await links.count() > 0, 'The error summary provides linked recovery');
  const originalAppearance = await page.locator('#appearance').inputValue();
  const samples = {};
  for (const appearance of ['light', 'dark']) {
    await page.locator('#appearance').selectOption(appearance);
    samples[appearance] = await stateContrast(page, 'Error summary ' + appearance);
    await stateTargets(page, 'Error recovery ' + appearance);
  }
  await page.locator('#appearance').selectOption(originalAppearance);
  return { text: (await page.locator('#plan-errors').textContent()).trim(), hrefs, contrast: samples };
}

try {
  browser = await playwright.chromium.launch({ headless: true, ...(options.browser ? { executablePath: options.browser } : {}) });
  report.browser = browser.version();
  if (options.module) report.playwright = JSON.parse(await readFile(path.join(path.dirname(path.resolve(options.module)), 'package.json'), 'utf8')).version;
  const context = await newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light', reducedMotion: 'no-preference' });
  const page = await context.newPage(); await page.goto(url);
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('#appearance').inputValue(), 'system');
  assert.equal(await page.locator('#density').inputValue(), 'comfortable');
  assert.equal(await page.locator('#motion').isChecked(), true);
  assert.equal(await page.locator('#format').inputValue(), 'all');
  assert.equal(await page.locator('#planner-status').getAttribute('role'), 'status');
  for (const id of ['program-title', 'plan-title', 'error-title', 'review-title']) assert.match(await page.locator('#' + id).evaluate(element => element.tagName), /^H[1-6]$/, 'Focus destination remains a native heading: ' + id);
  assert.equal(await page.locator('#review-plan').isEnabled(), true, 'Empty review remains reachable to provide explicit validation');
  report.sessionTitles = {}; report.addNames = {};
  for (const id of sessionIds) {
    assert.equal(await card(page, id).count(), 1);
    report.sessionTitles[id] = (await card(page, id).locator('h3').textContent()).trim();
    report.addNames[id] = /button "([^"]+)"/.exec(await add(page, id).ariaSnapshot())?.[1];
    assert.ok(report.addNames[id]?.includes('Add to plan'), 'Stable toggle name starts from Add to plan');
    await stableAddName(page, id, false);
  }
  const specimenFields = await page.locator('#specimen input, #specimen select, #specimen textarea').evaluateAll(elements => elements.map(element => ({ id: element.id, type: element.tagName.toLowerCase(), inputType: element.type, value: element.value })));
  assert.ok(specimenFields.some(field => field.type === 'input') && specimenFields.some(field => field.type === 'select'));
  assert.ok(specimenFields.every(field => field.id));
  for (const field of specimenFields.filter(field => field.inputType === 'text' && !field.value)) await page.locator('#' + field.id).fill('A local gathering specimen');
  const boundaryIds = await page.locator('select:not(:disabled), input[type="search"]:not(:disabled), input[type="text"]:not(:disabled), input:not([type]):not(:disabled), textarea:not(:disabled)').evaluateAll(elements => elements.map(element => element.id));
  for (const id of ['appearance', 'density', 'format', ...specimenFields.filter(field => field.inputType !== 'checkbox').map(field => field.id)]) assert.ok(boundaryIds.includes(id), 'Every expected field boundary is sampled: ' + id);
  await assertPlan(page, []);
  await assertNoStudyAnimation(page, 'No automatic study motion on page load');
  check('Six fictional sessions, stable uniquely named planner toggles, default preferences, empty reachable review, native specimen fields, and no autoplay', { titles: report.sessionTitles, addNames: report.addNames, specimenFields });
  await page.locator('#motion').uncheck();
  const appearanceColors = {}, measuredDensities = {}, posterSelections = {};
  for (const appearance of ['light', 'dark']) {
    await page.locator('#appearance').selectOption(appearance); appearanceColors[appearance] = await pageColor(page);
    posterSelections[appearance] = await page.locator('.event-poster').evaluate(element => {
      const style = getComputedStyle(element, '::selection');
      const lum = value => value.match(/[\d.]+/g).slice(0, 3).map(Number).map(channel => channel / 255).map(channel => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4).reduce((sum, channel, index) => sum + channel * [.2126, .7152, .0722][index], 0);
      const first = lum(style.color), second = lum(style.backgroundColor);
      return { foreground: style.color, background: style.backgroundColor, ratio: (Math.max(first, second) + .05) / (Math.min(first, second) + .05) };
    });
    assert.ok(posterSelections[appearance].ratio >= 4.5, 'Fixed-dark poster text selection retains readable ink in ' + appearance);
    for (const density of ['comfortable', 'compact']) {
      await page.locator('#density').selectOption(density);
      for (const width of [320, 390, 768, 1280, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        const label = appearance + '/' + density + '/' + width;
        const sizes = await reflow(page, label), colors = await stateContrast(page, label), targets = await stateTargets(page, label);
        for (const id of boundaryIds) assert.ok(colors.controlBorders.some(sample => sample.id === id), 'Expected measured boundary: ' + id);
        if (width === 1440 && appearance === 'light') measuredDensities[density] = await densityMetrics(page);
        if (width <= 390) for (const id of boundaryIds) assert.ok(await page.locator('#' + id).evaluate(element => parseFloat(getComputedStyle(element).fontSize)) >= 16, 'Mobile field text remains 16px: ' + id);
        report.layouts.push({ appearance, density, ...sizes, contrast: colors, targets });
      }
    }
  }
  for (const [density, padding] of [['comfortable', 24], ['compact', 16]]) assert.ok(Object.values(measuredDensities[density].padding).every(value => value === padding));
  assert.ok(measuredDensities.comfortable.height > measuredDensities.compact.height + 1);
  assert.notEqual(appearanceColors.light, appearanceColors.dark);
  check('20 appearance/density/width layouts, nonzero opaque HTML text and all expected control boundaries, actual specimen density, 16px mobile fields and 44px targets', { combinations: report.layouts.length, boundaryIds, measuredDensities, posterSelections });
  await page.setViewportSize({ width: 1280, height: 1000 }); await page.goto(url);
  await page.keyboard.press('Tab'); assert.equal((await page.locator(':focus').textContent()).trim(), 'Skip to content');
  await page.keyboard.press('Enter'); assert.equal(await page.locator(':focus').evaluate(element => element.tagName), 'MAIN');
  const disclosures = await page.locator('#program details').evaluateAll(elements => elements.map(element => element.id));
  assert.equal(disclosures.length, 6); assert.ok(disclosures.every(Boolean));
  for (const id of disclosures) await openNativeDisclosure(page, '#' + id);
  check('Keyboard skip link focuses main and all six native session disclosures open and close by keyboard', { disclosures });
  const emptyError = await reviewErrors(page, []);
  await page.locator('#error-list a').first().click();
  assert.ok(['program-title', 'add-opening'].includes(await focusedId(page)), 'Empty-plan error has a focused recovery destination');
  await add(page, 'systems').click(); await add(page, 'motion').click();
  await assertPlan(page, ['systems', 'motion']);
  const morningError = await reviewErrors(page, ['systems', 'motion']);
  await page.locator('#format').selectOption('talk');
  await page.locator('#error-list a[href="#add-motion"]').click();
  assert.equal(await page.locator('#format').inputValue(), 'all', 'Conflict recovery restores hidden session visibility');
  assert.equal(await focusedId(page), 'add-motion');
  assert.match(await page.locator('#planner-status').textContent(), /all|filter|show|visible/i);
  await assertPlan(page, ['systems', 'motion']);
  await stableAddName(page, 'motion', true);
  await page.locator('#format').selectOption('lab');
  assert.equal(await card(page, 'systems').isVisible(), false);
  await assertPlan(page, ['systems', 'motion']);
  await page.locator('#format').selectOption('all');
  await clearPlan(page); assert.equal(await focusedId(page), 'plan-title');
  await add(page, 'critique').click(); await add(page, 'prototype').click();
  await assertPlan(page, ['prototype', 'critique']);
  const afternoonError = await reviewErrors(page, ['prototype', 'critique']);
  await page.locator('#error-list a[href="#add-prototype"]').click(); assert.equal(await focusedId(page), 'add-prototype');
  await assertPlan(page, ['prototype', 'critique']);
  check('Empty and two independent overlapping-pair errors focus linked summaries, preserve choices, link both sessions, and restore filtered recovery destinations', { emptyError, morningError, afternoonError });
  await clearPlan(page);
  for (const id of ['prototype', 'type', 'motion', 'opening']) { await add(page, id).click(); await stableAddName(page, id, true); assert.equal(await focusedId(page), 'add-' + id); }
  await assertPlan(page, ['opening', 'motion', 'type', 'prototype']);
  await add(page, 'opening').click(); await stableAddName(page, 'opening', false);
  await add(page, 'opening').click(); await stableAddName(page, 'opening', true);
  await assertPlan(page, ['opening', 'motion', 'type', 'prototype']);
  await page.locator('#format').selectOption('lab');
  await page.locator('#review-plan').click();
  assert.equal(await focusedId(page), 'review-title');
  assert.equal(await page.locator('#plan-review').isVisible(), true);
  assert.equal(await page.locator('#plan-errors').isVisible(), false);
  assert.equal(await page.locator('#review-list > li').count(), 4);
  const reviewedRows = await page.locator('#review-list > li').allTextContents();
  for (const [index, id] of ['opening', 'motion', 'type', 'prototype'].entries()) assert.ok(reviewedRows[index].includes(report.sessionTitles[id]), 'Review preserves fixed chronological order and every chosen session');
  assert.match(await page.locator('#plan-review').textContent(), /local|browser/i);
  assert.match(await page.locator('#plan-review').textContent(), /book|reserv|submit/i);
  assert.match(await page.locator('#plan-review').textContent(), /agent/i);
  await stateContrast(page, 'Valid review'); await stateTargets(page, 'Valid review');
  await page.locator('#format').selectOption('talk');
  assert.equal(await page.locator('#plan-review').isVisible(), true, 'Filter alone preserves valid membership review');
  await page.locator('#back-to-program').click(); assert.equal(await focusedId(page), 'program-title');
  assert.equal(await page.locator('#format').inputValue(), 'talk');
  await assertPlan(page, ['opening', 'motion', 'type', 'prototype']);
  await add(page, 'opening').click(); await assertReviewHidden(page);
  await page.locator('#format').selectOption('all');
  await page.locator('#review-plan').click(); assert.equal(await page.locator('#plan-review').isVisible(), true);
  const removalButtons = page.locator('#plan-list > li button');
  await removalButtons.nth(1).focus(); await page.keyboard.press('Enter');
  await assertPlan(page, ['motion', 'prototype']); await assertReviewHidden(page);
  assert.equal(await page.locator('#plan-list').evaluate(element => element.contains(document.activeElement)), true, 'Removing a chosen row keeps focus in remaining chosen actions');
  await page.locator('#plan-list > li button').last().click();
  await assertPlan(page, ['motion']);
  assert.equal(await page.locator('#plan-list').evaluate(element => element.contains(document.activeElement)), true);
  await page.locator('#plan-list > li button').first().click();
  await assertPlan(page, []); assert.equal(await focusedId(page), 'plan-title');
  check('Stable Add-to-plan ARIA names/pressed state, chronological unique selection, valid adjacent sessions, preserved filtered Back flow, membership invalidation, and removal focus through an empty plan');
  await add(page, 'type').click(); await page.locator('#clear-plan').click();
  await assertPlan(page, []); assert.equal(await focusedId(page), 'plan-title');
  assert.match(await page.locator('#planner-status').textContent(), /clear|empty|removed/i);
  check('Clear removes choices and focuses the plan heading with status feedback');
  await page.locator('#appearance').selectOption('system');
  await page.emulateMedia({ colorScheme: 'dark' }); await assertPageColor(page, appearanceColors.dark);
  await page.emulateMedia({ colorScheme: 'light' }); await assertPageColor(page, appearanceColors.light);
  await page.locator('#appearance').selectOption('light'); await page.locator('#density').selectOption('compact'); await page.locator('#motion').uncheck();
  await page.emulateMedia({ colorScheme: 'dark' }); await assertPageColor(page, appearanceColors.light);
  await add(page, 'opening').click(); await page.locator('#review-plan').click(); await page.locator('#format').selectOption('lab');
  await page.reload();
  assert.equal(await page.locator('#appearance').inputValue(), 'light'); assert.equal(await page.locator('#density').inputValue(), 'compact'); assert.equal(await page.locator('#motion').isChecked(), false);
  assert.equal(await page.locator('#format').inputValue(), 'all'); await assertPlan(page, []); await assertReviewHidden(page);
  check('System follows live OS appearance; only explicit appearance/density/motion persist while plan/filter/review reset on reload');
  await page.locator('#motion').check();
  const sampledFeedback = await add(page, 'opening').evaluate(element => getComputedStyle(element).transitionDuration);
  assert.ok(sampledFeedback.split(',').some(value => Math.abs(parseFloat(value) - .15) < .001), 'Ordinary feedback uses proposed 150ms duration');
  await assertNoStudyAnimation(page, 'Study stays static until explicitly played');
  const staticStudy = await studyComposition(page);
  assert.equal(staticStudy.length, 3, 'Three decorative bars form the static study');
  await page.locator('#play-study').click();
  const firstAnimations = await barsAnimations(page);
  assert.ok(firstAnimations.length > 0 && firstAnimations.length <= 3, 'Explicit Play starts at most three decorative animations');
  for (const animation of firstAnimations) {
    assert.equal(animation.timing.duration, 600); assert.equal(animation.timing.iterations, 1);
    assert.ok(animation.properties.length > 0 && animation.properties.every(property => ['transform', 'opacity'].includes(property)), 'Study animates only transform/opacity');
  }
  await page.locator('.motion-bar').evaluateAll(elements => { window.__pulsePreviousAnimations = elements.flatMap(element => element.getAnimations()); });
  await page.locator('#play-study').click();
  const previousStates = await page.evaluate(() => window.__pulsePreviousAnimations.map(animation => animation.playState));
  assert.ok(previousStates.every(state => state === 'idle'), 'Repeating Play cancels previous study animations');
  const repeatAnimations = await barsAnimations(page); assert.ok(repeatAnimations.length > 0 && repeatAnimations.length <= 3);
  await page.waitForFunction(() => [...document.querySelectorAll('.motion-bar')].flatMap(element => element.getAnimations()).every(animation => !['running', 'pending'].includes(animation.playState)), null, { timeout: 2000 });
  await assertNoStudyAnimation(page, 'No active study motion remains after finite completion');
  assert.deepEqual(await studyComposition(page), staticStudy, 'Completed study settles to the same CSS final composition');
  await page.locator('#play-study').click(); await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.querySelector('#play-study').disabled, null, { timeout: 1000 });
  await assertNoStudyAnimation(page, 'Live reduced motion cancels study');
  const reduced = await immediateFeedback(page, 'Reduced motion');
  assert.equal(await page.locator('#play-study').isDisabled(), true, 'Reduced motion makes Play intentionally unavailable');
  assert.match(await page.locator('#study-note').textContent(), /reduced.*static|static.*reduced/i);
  await assertNoStudyAnimation(page, 'Reduced motion keeps final composition static');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('#play-study').click();
  await page.evaluate(() => { const control = document.querySelector('#motion'); control.checked = false; control.dispatchEvent(new Event('change', { bubbles: true })); });
  await assertNoStudyAnimation(page, 'Explicit motion-off cancels study');
  const motionOff = await immediateFeedback(page, 'Motion off');
  assert.equal(await page.locator('#play-study').isDisabled(), true, 'Motion-off makes Play intentionally unavailable');
  assert.match(await page.locator('#study-note').textContent(), /off.*static|static.*off/i);
  await assertNoStudyAnimation(page, 'Motion-off keeps final composition static');
  await page.locator('#motion').check(); await page.locator('#play-study').click();
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' }); document.dispatchEvent(new Event('visibilitychange')); });
  await assertNoStudyAnimation(page, 'Simulated hidden-document event cancels study');
  assert.equal(await page.locator('#play-study').isDisabled(), true);
  assert.match(await page.locator('#study-note').textContent(), /hidden.*static|static.*hidden/i);
  await page.evaluate(() => { delete document.hidden; delete document.visibilityState; document.dispatchEvent(new Event('visibilitychange')); });
  await assertNoStudyAnimation(page, 'Visibility restoration does not auto-restart study');
  assert.deepEqual(await studyComposition(page), staticStudy, 'Canceled study retains the final static composition');
  check('Explicit Play starts at most three finite 600ms transform/opacity animations; repeat cancels earlier motion; completion/reduced/off/hidden cancel or settle static without autoplay', { sampledFeedback, firstAnimations, previousStates, repeatAnimations, reduced, motionOff });
  await page.emulateMedia({ forcedColors: 'active' }); await page.locator('#appearance').focus();
  const focus = await page.locator('#appearance').evaluate(element => ({ width: getComputedStyle(element).outlineWidth, offset: getComputedStyle(element).outlineOffset, color: getComputedStyle(element).outlineColor }));
  assert.equal(focus.width, '3px'); assert.equal(focus.offset, '5px');
  check('Forced-colors focus retains 3px outline and 5px offset', focus);
  await page.emulateMedia({ forcedColors: 'none' }); await page.setViewportSize({ width: 640, height: 1000 });
  const beforeResize = await page.locator('.intro-description').evaluate(element => parseFloat(getComputedStyle(element).fontSize));
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  const resize = await reflow(page, '200% CSS text resize at 640px');
  const afterResize = await page.locator('.intro-description').evaluate(element => parseFloat(getComputedStyle(element).fontSize));
  assert.ok(afterResize >= beforeResize * 1.99); await stateTargets(page, '200% CSS text resize');
  check('200% CSS text resize actually doubles body sample and reflows at 640px; native zoom remains untested', { ...resize, beforeResize, afterResize });
  await page.evaluate(() => { document.documentElement.style.removeProperty('font-size'); });
  const cdp = await context.newCDPSession(page); await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  const { root: documentNode } = await cdp.send('DOM.getDocument'); report.renderedFonts = {};
  for (const selector of ['.intro-description', '#type-display', '.technical', '[lang="vi"]']) {
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: documentNode.nodeId, selector }); assert.ok(nodeId, 'Font sample exists: ' + selector);
    const fonts = (await cdp.send('CSS.getPlatformFontsForNode', { nodeId })).fonts; assert.ok(fonts.length > 0); assert.equal(fonts.some(font => font.isCustomFont), false);
    report.renderedFonts[selector] = fonts.map(font => ({ family: font.familyName, custom: font.isCustomFont, glyphCount: font.glyphCount }));
  }
  check('Actual local body/display/technical/Vietnamese glyph families recorded through Chromium CDP', report.renderedFonts);
  await context.close();
  for (const mode of ['blocked', 'invalid', 'malformed']) {
    const failureContext = await newContext({ colorScheme: 'dark' });
    await failureContext.addInitScript(mode => {
      if (mode === 'blocked') Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } });
      else { const getItem = Storage.prototype.getItem; Storage.prototype.getItem = function(key) { if (key !== 'interface-atlas-pulse-preview') return getItem.call(this, key); return mode === 'malformed' ? '{broken-json' : JSON.stringify({ appearance: 'invalid-choice', density: 'invalid-choice', motion: 'invalid-choice' }); }; }
    }, mode);
    const failurePage = await failureContext.newPage(); await failurePage.goto(url); await assertPageColor(failurePage, appearanceColors.dark);
    assert.equal(await failurePage.locator('#appearance').inputValue(), 'system'); assert.equal(await failurePage.locator('#density').inputValue(), 'comfortable'); assert.equal(await failurePage.locator('#motion').isChecked(), true);
    await failurePage.locator('#appearance').selectOption('light'); await assertPageColor(failurePage, appearanceColors.light);
    await failurePage.locator('#density').selectOption('compact'); await failurePage.locator('#motion').uncheck();
    await add(failurePage, 'opening').click(); await failurePage.locator('#review-plan').click(); assert.equal(await focusedId(failurePage), 'review-title');
    await failureContext.close();
  }
  check('Blocked/invalid/malformed storage retains usable defaults, preferences, local planning and review');
  const unavailableContext = await newContext({ colorScheme: 'light' });
  await unavailableContext.addInitScript(() => { Element.prototype.animate = undefined; });
  const unavailablePage = await unavailableContext.newPage(); await unavailablePage.goto(url);
  assert.equal(await unavailablePage.locator('#play-study').isDisabled(), true, 'Missing Web Animations API disables Play with an explanation');
  await assertNoStudyAnimation(unavailablePage, 'Unavailable Web Animations API uses static composition');
  assert.match(await unavailablePage.locator('#study-note').textContent(), /static|unavailable|support|still|composition/i);
  await add(unavailablePage, 'type').click(); await unavailablePage.locator('#review-plan').click(); assert.equal(await focusedId(unavailablePage), 'review-title');
  check('Missing Web Animations API retains static study, explanatory feedback and usable planning');
  await unavailableContext.close();
  const noJsContext = await newContext({ javaScriptEnabled: false, colorScheme: 'dark', viewport: { width: 320, height: 1000 } });
  const noJsPage = await noJsContext.newPage(); await noJsPage.goto(url); await assertPageColor(noJsPage, appearanceColors.dark); await reflow(noJsPage, 'No JavaScript at 320px');
  for (const id of sessionIds) { assert.equal(await card(noJsPage, id).isVisible(), true); assert.equal(await add(noJsPage, id).isDisabled(), true); }
  for (const id of disclosures) { await openNativeDisclosure(noJsPage, '#' + id); const initial = await noJsPage.locator('#' + id).evaluate(element => element.open); assert.equal(initial, false); }
  const noJsControls = await noJsPage.locator('#appearance, #density, #motion, #format, #clear-plan, #review-plan, #play-study').evaluateAll(elements => elements.map(element => ({ id: element.id, disabled: element.matches(':disabled') })));
  assert.equal(noJsControls.length, 7); assert.deepEqual(noJsControls.filter(control => !control.disabled), []);
  for (const field of specimenFields) {
    const control = noJsPage.locator('#' + field.id); assert.equal(await control.isDisabled(), false);
    if (field.inputType === 'text') { await control.fill('A native field without JavaScript'); assert.equal(await control.inputValue(), 'A native field without JavaScript'); }
    else if (field.type === 'select') { const option = await control.locator('option').last().getAttribute('value') || await control.locator('option').last().textContent(); await control.selectOption(option); assert.equal(await control.inputValue(), option); }
    else if (field.inputType === 'checkbox') { const initial = await control.isChecked(); await control.setChecked(!initial); assert.equal(await control.isChecked(), !initial); }
  }
  const noJsColors = await stateContrast(noJsPage, 'No JavaScript static preview');
  check('No JavaScript retains every session/native disclosure and usable specimen fields; preferences/planner/study disable with a static composition', { disabledControls: noJsControls, specimenFields, contrast: noJsColors });
  await noJsContext.close();
  if (output) {
    await mkdir(output, { recursive: true }); report.screenshots = [];
    const captureContext = await newContext({ reducedMotion: 'reduce' }); const capturePage = await captureContext.newPage(); await capturePage.goto(url);
    for (const [appearance, width, filename] of [['light', 1440, 'light-desktop.png'], ['dark', 1440, 'dark-desktop.png'], ['light', 390, 'light-mobile.png']]) {
      await capturePage.setViewportSize({ width, height: 1000 }); await capturePage.locator('#appearance').selectOption(appearance); await capturePage.locator('#density').selectOption('comfortable');
      await clearPlan(capturePage);
      if (appearance === 'dark') { await add(capturePage, 'opening').click(); await add(capturePage, 'type').click(); await capturePage.locator('#review-plan').click(); }
      const section = appearance === 'light' && width > 390 ? '#gathering' : '#program';
      if (width > 390) { const bounds = await capturePage.locator(section).boundingBox(); await capturePage.setViewportSize({ width, height: Math.max(1000, Math.ceil(bounds.height) + 2) }); await capturePage.locator(section).screenshot({ path: path.join(output, filename) }); }
      else { await capturePage.locator(section).evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY)); await capturePage.screenshot({ path: path.join(output, filename) }); }
      report.screenshots.push({ filename, appearance, width, section, scope: width > 390 ? 'Complete section' : '1000px viewport from program start' });
    }
    await captureContext.close();
  }
  assert.deepEqual(errors, [], 'No browser runtime errors'); assert.deepEqual(external, [], 'No external resource requests'); assert.deepEqual(failedResources, [], 'No failed preview resources');
  for (const filename of Object.keys(report.testedFiles)) assert.equal(createHash('sha256').update(await readFile(path.join(preview, filename))).digest('hex'), report.testedFiles[filename], filename + ' unchanged during verification');
  assert.equal(createHash('sha256').update(await readFile(fileURLToPath(import.meta.url))).digest('hex'), report.validatorSha256, 'Validator unchanged during verification');
  check('No runtime errors/external requests/failed resources; three preview source hashes and validator hash unchanged');
  report.passed = true;
  if (output) await writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
} catch (error) {
  report.passed = false; report.failure = { message: error.message, stack: error.stack };
  if (output) { await mkdir(output, { recursive: true }); await writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n'); }
  process.stderr.write(error.stack + '\n'); process.exitCode = 1;
} finally { await browser?.close(); await new Promise(resolve => server.close(resolve)); }
