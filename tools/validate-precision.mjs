import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Optional browser evidence for Precision. These checks are original Atlas tooling,
// adapted from the Editorial and Swiss preview validators; no upstream UI code is used.
const options = {};
for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index];
  if (!['--module', '--browser', '--output', '--preview'].includes(key) || !process.argv[index + 1]) {
    throw new Error('Usage: node tools/validate-precision.mjs [--module path/to/playwright/index.mjs] [--browser path/to/chromium] [--output directory] [--preview directory]');
  }
  options[key.slice(2)] = process.argv[index + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'themes/precision/preview'));
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
    'No screen-reader, touch-device, native browser zoom, or real backend testing.',
    'Contrast samples are rendered HTML text composited over solid backgrounds and enabled select/text-input boundaries against their fill and adjacent background. SVG artwork, disabled controls, placeholders, text selection, native popup menus, and backgrounds with images are outside this check.',
    'Fallback font families are recorded from Chromium. Named webfont files are not distributed or loaded.',
    'The temporary verification server exposes only the preview directory. Links to neighboring Atlas documents are checked separately, not followed here.'
  ]
};
for (const filename of ['index.html', 'styles.css', 'preview.js']) {
  report.testedFiles[filename] = createHash('sha256').update(await readFile(path.join(preview, filename))).digest('hex');
}
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
      element.tagName === 'INPUT' ? element.value :
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
      const pair = { selector: identify(element), text: text.slice(0, 60), foreground: style.color, background: background.slice(0, 3).map(Math.round), ratio: Number(measured.toFixed(2)), required };
      pairs.push(pair);
      if (measured + .001 < required) failures.push(pair);
    }
    for (const element of document.querySelectorAll('select:not(:disabled), input[type="search"]:not(:disabled), input[type="text"]:not(:disabled)')) {
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
      const result = { id: element.id, ratio: Number(measured.toFixed(2)), fillRatio: Number(inside.toFixed(2)), adjacentRatio: Number(outside.toFixed(2)), required: 3 };
      controlBorders.push(result);
      if (measured + .001 < 3) failures.push(result);
    }
    return { checked: pairs.length, minimum: Math.min(...pairs.map(pair => pair.ratio)), failures, skipped, excluded, pairs, controlBorders };
  });
}
const pageColor = page => page.locator('html').evaluate(element => getComputedStyle(element).getPropertyValue('--page').trim());
const transitions = page => page.locator('#simulate-disconnection').evaluate(element => ({ duration: getComputedStyle(element).transitionDuration, animation: getComputedStyle(element).animationName }));
function immediate(value) {
  assert.ok(value.duration.split(',').every(duration => parseFloat(duration) === 0), 'Motion override must make feedback immediate');
  assert.equal(value.animation, 'none');
}
const inspect = (page, run) => page.locator('[data-inspect-run="' + run + '"]');
const detail = (page, run) => page.locator('[data-run-detail="' + run + '"]');
const execution = page => page.locator('#confirmed-execution-RUN-041');
async function hitTargets(page) {
  return page.evaluate(() => {
    const selectors = 'button:not(:disabled), select:not(:disabled), input[type="search"]:not(:disabled), summary';
    return [...document.querySelectorAll(selectors)]
      .filter(element => element.getClientRects().length)
      .map(element => ({ id: element.id || element.getAttribute('data-inspect-run') || element.tagName.toLowerCase(), height: Number(element.getBoundingClientRect().height.toFixed(2)) }));
  });
}
async function densityMetrics(page) {
  return page.locator('[data-run-row="RUN-041"]').evaluate(element => ({
    height: element.getBoundingClientRect().height,
    padding: [element, ...element.querySelectorAll('td')].map(cell => ({ blockStart: parseFloat(getComputedStyle(cell).paddingBlockStart), blockEnd: parseFloat(getComputedStyle(cell).paddingBlockEnd) }))
  }));
}
try {
  browser = await playwright.chromium.launch({ headless: true, ...(options.browser ? { executablePath: options.browser } : {}) });
  report.browser = browser.version();
  const context = await newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light', reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await page.goto(url);
  assert.equal(await page.locator('#appearance').inputValue(), 'system');
  assert.equal(await page.locator('#density').inputValue(), 'compact');
  assert.equal(await page.locator('#motion').isChecked(), true);
  await page.locator('#motion').uncheck();
  const appearanceColors = {};
  const measuredDensities = {};
  for (const appearance of ['light', 'dark']) {
    await page.locator('#appearance').selectOption(appearance);
    appearanceColors[appearance] = await pageColor(page);
    for (const density of ['comfortable', 'compact']) {
      await page.locator('#density').selectOption(density);
      for (const width of [320, 390, 768, 1280, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        const sizes = await reflow(page, appearance + '/' + density + '/' + width);
        const colors = await contrast(page);
        assert.ok(colors.checked > 0 && colors.controlBorders.length >= 3, 'Expected nonzero text and preference/filter-control boundary contrast coverage');
        assert.deepEqual(colors.failures, [], 'Contrast failures: ' + JSON.stringify(colors.failures));
        const targets = await hitTargets(page);
        assert.ok(targets.length > 0, 'Expected rendered interactive targets');
        assert.deepEqual(targets.filter(target => target.height < 43.99), [], 'Primary controls retain 44px hit height: ' + JSON.stringify(targets));
        if (width === 1440 && appearance === 'light') measuredDensities[density] = await densityMetrics(page);
        if (width <= 390) {
          for (const selector of ['#appearance', '#density', '#run-search', '#run-status-filter']) assert.ok(parseFloat(await page.locator(selector).evaluate(element => getComputedStyle(element).fontSize)) >= 16, 'Mobile input/select text must stay at least 16px');
        }
        report.layouts.push({ appearance, density, ...sizes, contrast: { checked: colors.checked, minimum: colors.minimum, skipped: colors.skipped, excluded: colors.excluded, controlBorders: colors.controlBorders }, targets });
      }
    }
  }
  assert.notEqual(appearanceColors.light, appearanceColors.dark, 'Appearance modes must use different page colors');
  assert.ok(measuredDensities.comfortable.height > measuredDensities.compact.height + 1, 'Comfortable density must visibly increase the rendered row height');
  assert.ok(measuredDensities.comfortable.padding.some((cell, index) => cell.blockStart + cell.blockEnd > measuredDensities.compact.padding[index].blockStart + measuredDensities.compact.padding[index].blockEnd), 'Comfortable density must visibly increase cell padding');
  check('Light/dark and comfortable/compact reflow, text/control contrast, density change, and 44px primary targets', { combinations: report.layouts.length, measuredDensities });
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto(url);
  await page.keyboard.press('Tab');
  assert.equal((await page.locator(':focus').textContent()).trim(), 'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').evaluate(element => element.tagName), 'MAIN');
  const disclosure = page.locator('main details').first();
  assert.equal(await disclosure.count(), 1, 'Expected native supporting disclosure');
  const initialDisclosure = await disclosure.evaluate(element => element.open);
  await disclosure.locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await disclosure.evaluate(element => element.open), !initialDisclosure);
  await page.keyboard.press('Enter');
  assert.equal(await disclosure.evaluate(element => element.open), initialDisclosure);
  check('Keyboard skip link focuses main; native disclosure opens and closes by keyboard');
  assert.equal(await page.locator('#workspace-status').getAttribute('role'), 'status');
  await page.locator('#run-search').fill('not-a-sample-run');
  assert.match(await page.locator('#run-count').textContent(), /^\s*0\b/);
  assert.equal(await page.locator('#run-empty').isVisible(), true);
  await page.locator('#reset-filters').click();
  assert.equal(await page.locator('#run-search').inputValue(), '');
  assert.match(await page.locator('#run-count').textContent(), /^\s*4\b/);
  assert.equal(await page.locator('#run-empty').isVisible(), false);
  await page.locator('#run-status-filter').selectOption('failed');
  assert.match(await page.locator('#run-count').textContent(), /^\s*1\b/);
  assert.equal(await page.locator('[data-run-row="RUN-044"]').isVisible(), true);
  assert.equal(await page.locator('[data-run-row="RUN-041"]').isVisible(), false);
  await page.locator('#reset-filters').click();
  assert.match(await page.locator('#run-count').textContent(), /^\s*4\b/);
  check('Search and status filters expose empty results and recover through reset');
  await inspect(page, 'RUN-041').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'run-heading-RUN-041');
  assert.equal(await detail(page, 'RUN-041').isVisible(), true);
  assert.match(await execution(page).textContent(), /Running/i);
  await page.locator('#cancel-run').focus();
  await page.keyboard.press('Enter');
  assert.match(await execution(page).textContent(), /Running/i);
  assert.match(await page.locator('#pending-command').textContent(), /cancel.*request|request.*cancel/i);
  assert.ok((await page.locator('#workspace-status').textContent()).trim().length > 0, 'Cancellation request needs status feedback');
  const pendingBeforeDisconnect = await page.locator('#pending-command').textContent();
  const disconnectionToggle = page.getByRole('button', { name: 'Simulate disconnection', exact: true });
  assert.equal(await disconnectionToggle.count(), 1, 'Connection toggle has a stable accessible name');
  await page.locator('#simulate-disconnection').click();
  assert.equal(await page.locator('#simulate-disconnection').getAttribute('aria-pressed'), 'true');
  assert.equal(await disconnectionToggle.count(), 1, 'Pressed toggle keeps the same accessible name');
  assert.match(await page.locator('#connection-state').textContent(), /disconnect/i);
  assert.match(await execution(page).textContent(), /Running/i);
  assert.match(await detail(page, 'RUN-041').textContent(), /last confirmed/i);
  assert.equal(await page.locator('#confirmation-label-RUN-041').isVisible(), true);
  assert.match(await page.locator('#confirmation-label-RUN-041').textContent(), /last confirmed/i);
  assert.equal(await page.locator('#pending-command').textContent(), pendingBeforeDisconnect);
  assert.equal(await page.locator('#acknowledge-cancellation').isDisabled(), true);
  assert.equal(await page.locator('#cancel-run').isDisabled(), true);
  const disconnectedColors = await contrast(page);
  assert.deepEqual(disconnectedColors.failures, [], 'Disconnected state text contrast');
  await page.locator('#simulate-disconnection').click();
  assert.equal(await page.locator('#simulate-disconnection').getAttribute('aria-pressed'), 'false');
  assert.equal(await disconnectionToggle.count(), 1, 'Unpressed toggle keeps the same accessible name');
  assert.match(await page.locator('#connection-state').textContent(), /connected/i);
  assert.doesNotMatch(await page.locator('#connection-state').textContent(), /disconnect/i);
  assert.match(await execution(page).textContent(), /Running/i);
  assert.equal(await page.locator('#pending-command').textContent(), pendingBeforeDisconnect);
  assert.equal(await page.locator('#acknowledge-cancellation').isDisabled(), false);
  check('Connection toggle retains a stable accessible name; disconnection/reconnection preserve confirmed execution and pending command', { disconnectedTextSamples: disconnectedColors.checked });
  await page.locator('#acknowledge-cancellation').focus();
  await page.keyboard.press('Enter');
  assert.match(await execution(page).textContent(), /Cancelled/i);
  assert.equal(await page.locator('[data-run-row="RUN-041"]').getAttribute('data-state'), 'cancelled');
  assert.doesNotMatch(await page.locator('#pending-command').textContent(), /cancel.*request|request.*cancel/i);
  assert.equal(await page.locator('#cancel-run').isDisabled(), true);
  assert.equal(await page.locator('#acknowledge-cancellation').isDisabled(), true);
  await page.locator('#back-to-runs').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('data-inspect-run'), 'RUN-041');
  check('Keyboard run navigation restores the invoking control; requested cancellation stays Running until acknowledgement');
  await page.locator('#run-search').fill('RUN-042');
  assert.equal(await page.locator('[data-run-row="RUN-041"]').isVisible(), false);
  await page.locator('#back-to-runs').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'run-search');
  assert.equal(await page.locator('#run-search').inputValue(), 'RUN-042');
  assert.equal(await detail(page, 'RUN-041').isVisible(), true);
  assert.match(await page.locator('#run-count').textContent(), /^\s*1\b/);
  assert.ok((await page.locator('#workspace-status').textContent()).trim().length > 0, 'Filtered-out return needs a status explanation');
  await page.locator('#reset-filters').click();
  assert.equal(await detail(page, 'RUN-041').isVisible(), true);
  check('Returning from a filtered-out selected run preserves filters and detail context, then reset preserves selection');
  await page.locator('#appearance').selectOption('system');
  await page.emulateMedia({ colorScheme: 'dark' });
  assert.equal(await pageColor(page), appearanceColors.dark);
  await page.emulateMedia({ colorScheme: 'light' });
  assert.equal(await pageColor(page), appearanceColors.light);
  await page.locator('#appearance').selectOption('light');
  await page.locator('#density').selectOption('comfortable');
  await page.locator('#motion').uncheck();
  await page.emulateMedia({ colorScheme: 'dark' });
  assert.equal(await pageColor(page), appearanceColors.light);
  await page.reload();
  assert.equal(await page.locator('#appearance').inputValue(), 'light');
  assert.equal(await page.locator('#density').inputValue(), 'comfortable');
  assert.equal(await page.locator('#motion').isChecked(), false);
  assert.match(await execution(page).textContent(), /Running/i);
  assert.equal(await page.locator('#simulate-disconnection').getAttribute('aria-pressed'), 'false');
  await page.locator('#motion').check();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  immediate(await transitions(page));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('#motion').uncheck();
  immediate(await transitions(page));
  check('Live reduced-motion and explicit motion-off make feedback immediate');
  await page.emulateMedia({ forcedColors: 'active' });
  await page.locator('#appearance').focus();
  const focus = await page.locator('#appearance').evaluate(element => ({ width: getComputedStyle(element).outlineWidth, offset: getComputedStyle(element).outlineOffset, color: getComputedStyle(element).outlineColor }));
  assert.equal(focus.width, '3px'); assert.equal(focus.offset, '3px');
  check('Forced-colors focus outline retains geometry', focus);
  await page.emulateMedia({ forcedColors: 'none' });
  await page.setViewportSize({ width: 640, height: 1000 });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await reflow(page, '200% CSS text resize at 640px');
  check('200% CSS text resize reflows at 640px');
  await page.evaluate(() => { document.documentElement.style.removeProperty('font-size'); });
  const cdp = await context.newCDPSession(page);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  const { root: documentNode } = await cdp.send('DOM.getDocument');
  report.renderedFonts = {};
  for (const selector of ['.intro-description', '.technical', 'p[lang="vi"]']) {
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: documentNode.nodeId, selector });
    assert.ok(nodeId, 'Expected font sample ' + selector);
    const fonts = (await cdp.send('CSS.getPlatformFontsForNode', { nodeId })).fonts;
    assert.ok(fonts.length > 0, 'Expected rendered glyphs for ' + selector);
    assert.equal(fonts.some(font => font.isCustomFont), false, 'Preview should use local font fallbacks');
    report.renderedFonts[selector] = fonts.map(font => ({ family: font.familyName, custom: font.isCustomFont, glyphCount: font.glyphCount }));
  }
  check('Actual local fallback font families and Vietnamese sample recorded', report.renderedFonts);
  await context.close();
  for (const mode of ['blocked', 'invalid', 'malformed']) {
    const failureContext = await newContext({ colorScheme: 'dark' });
    await failureContext.addInitScript(mode => {
      if (mode === 'blocked') Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } });
      else {
        const getItem = Storage.prototype.getItem;
        Storage.prototype.getItem = function (key) {
          if (key !== 'interface-atlas-precision-preview') return getItem.call(this, key);
          return mode === 'malformed' ? '{broken-json' : JSON.stringify({ appearance: 'invalid-choice', density: 'invalid-choice', motion: 'invalid-choice' });
        };
      }
    }, mode);
    const failurePage = await failureContext.newPage();
    await failurePage.goto(url);
    assert.equal(await pageColor(failurePage), appearanceColors.dark);
    assert.equal(await failurePage.locator('#appearance').inputValue(), 'system');
    assert.equal(await failurePage.locator('#density').inputValue(), 'compact');
    assert.equal(await failurePage.locator('#motion').isChecked(), true);
    await failurePage.locator('#appearance').selectOption('light');
    assert.equal(await failurePage.locator('html').getAttribute('data-appearance'), 'light');
    assert.equal(await pageColor(failurePage), appearanceColors.light);
    await failureContext.close();
  }
  check('System follows live appearance changes; explicit appearance/density/motion persist; blocked, invalid, and malformed storage retain usable defaults');
  const noJsContext = await newContext({ javaScriptEnabled: false, colorScheme: 'dark', viewport: { width: 320, height: 1000 } });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(url);
  await reflow(noJsPage, 'No JavaScript 320px');
  assert.equal(await noJsPage.locator('h1').count(), 1);
  for (const run of ['RUN-041', 'RUN-042', 'RUN-043', 'RUN-044']) assert.equal(await detail(noJsPage, run).isVisible(), true, run + ' remains readable without JavaScript');
  for (const selector of ['#back-to-runs', '#cancel-run', '#acknowledge-cancellation', '#simulate-disconnection', '#reset-filters', '#run-search', '#run-status-filter', '#appearance', '#density', '#motion']) {
    assert.equal(await noJsPage.locator(selector).isDisabled(), true, selector + ' needs JavaScript');
  }
  for (const run of ['RUN-041', 'RUN-042', 'RUN-043', 'RUN-044']) assert.equal(await inspect(noJsPage, run).isDisabled(), true);
  assert.equal(await noJsPage.locator('main details summary').count() > 0, true);
  const noJsBrief = noJsPage.locator('main details').first();
  const noJsInitialDisclosure = await noJsBrief.evaluate(element => element.open);
  await noJsBrief.locator('summary').click();
  assert.equal(await noJsBrief.evaluate(element => element.open), !noJsInitialDisclosure);
  const noJsColors = await contrast(noJsPage);
  assert.ok(noJsColors.checked > 0); assert.deepEqual(noJsColors.failures, []);
  check('No-JavaScript run details and native disclosures remain readable; runtime controls stay disabled; text contrast passes', { checked: noJsColors.checked, minimum: noJsColors.minimum, skipped: noJsColors.skipped, excluded: noJsColors.excluded });
  await noJsContext.close();
  if (output) {
    await mkdir(output, { recursive: true });
    const captureContext = await newContext({ reducedMotion: 'reduce' });
    const capturePage = await captureContext.newPage();
    await capturePage.goto(url);
    for (const [appearance, width, filename, section] of [['light', 1440, 'light-desktop.png', '#workspace'], ['dark', 1440, 'dark-desktop.png', '#workspace'], ['light', 390, 'light-mobile.png', '#workspace']]) {
      await capturePage.setViewportSize({ width, height: 1000 });
      await capturePage.locator('#appearance').selectOption(appearance);
      await capturePage.locator('#density').selectOption('compact');
      await inspect(capturePage, appearance === 'dark' ? 'RUN-042' : 'RUN-041').click();
      if (width > 390) {
        // Fit the section before capture so offscreen fixed chrome stays offscreen.
        const bounds = await capturePage.locator(section).boundingBox();
        await capturePage.setViewportSize({ width, height: Math.max(1000, Math.ceil(bounds.height) + 2) });
        await capturePage.locator(section).evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY));
        await capturePage.locator(section).screenshot({ path: path.join(output, filename) });
      } else {
        await capturePage.locator(section).evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY));
        await capturePage.screenshot({ path: path.join(output, filename) });
      }
    }
    await captureContext.close();
  }
  assert.deepEqual(errors, [], 'Browser runtime errors');
  assert.deepEqual(external, [], 'Preview must not request external resources');
  assert.deepEqual(failedResources, [], 'Preview resources must load');
  check('No browser runtime errors, external resource requests, or failed preview resources');
  if (output) await writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
