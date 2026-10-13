import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Optional browser evidence for the static Swiss preview, using Atlas's original checks.
const options = {};
for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index];
  if (!['--module', '--browser', '--output', '--preview'].includes(key) || !process.argv[index + 1]) {
    throw new Error('Usage: node tools/validate-swiss.mjs [--module path/to/playwright/index.mjs] [--browser path/to/chromium] [--output directory] [--preview directory]');
  }
  options[key.slice(2)] = process.argv[index + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'themes/swiss/preview'));
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
    'Contrast samples are rendered HTML text composited over solid backgrounds and enabled select/text-input boundaries. SVG artwork, disabled controls, placeholders, text selection, native popup menus, and backgrounds with images are outside this check.',
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
      if (!match) throw new Error('Unsupported computed color: ' + value);
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
      let background = [255, 255, 255, 1];
      for (const style of styles) background = composite(rgba(style.backgroundColor), background);
      const style = getComputedStyle(element);
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
      if (fill[3] !== 1 || parseFloat(style.borderTopWidth) < 1 || style.borderTopStyle === 'none') {
        skipped.push({ selector: identify(element), reason: 'Control boundary needs an opaque fill and visible solid border' }); continue;
      }
      const border = composite(rgba(style.borderTopColor), fill);
      const measured = ratio(border, fill);
      const result = { id: element.id, ratio: Number(measured.toFixed(2)), required: 3 };
      controlBorders.push(result);
      if (measured + .001 < 3) failures.push(result);
    }
    return { checked: pairs.length, minimum: Math.min(...pairs.map(pair => pair.ratio)), failures, skipped, excluded, pairs, controlBorders };
  });
}
const pageColor = page => page.locator('html').evaluate(element => getComputedStyle(element).getPropertyValue('--page').trim());
const transitions = page => page.locator('#accept-proposal').evaluate(element => ({ duration: getComputedStyle(element).transitionDuration, animation: getComputedStyle(element).animationName }));
function immediate(value) {
  assert.ok(value.duration.split(',').every(duration => parseFloat(duration) === 0), 'Motion override must make feedback immediate');
  assert.equal(value.animation, 'none');
}
try {
  browser = await playwright.chromium.launch({ headless: true, ...(options.browser ? { executablePath: options.browser } : {}) });
  report.browser = browser.version();
  const context = await newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light', reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await page.goto(url);
  await page.locator('#motion').uncheck();
  const appearanceColors = {};
  for (const appearance of ['light', 'dark']) {
    await page.locator('#appearance').selectOption(appearance);
    appearanceColors[appearance] = await pageColor(page);
    for (const density of ['comfortable', 'compact']) {
      await page.locator('#density').selectOption(density);
      for (const width of [320, 390, 768, 1280, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        const sizes = await reflow(page, appearance + '/' + density + '/' + width);
        const colors = await contrast(page);
        assert.ok(colors.checked > 0 && colors.controlBorders.length >= 2, 'Expected nonzero text and preference-control boundary contrast coverage');
        assert.deepEqual(colors.failures, [], 'Contrast failures: ' + JSON.stringify(colors.failures));
        if (width <= 390) {
          for (const selector of ['#appearance', '#density', '#specimen-name']) assert.ok(parseFloat(await page.locator(selector).evaluate(element => getComputedStyle(element).fontSize)) >= 16, 'Mobile input/select text must stay at least 16px');
        }
        report.layouts.push({ appearance, density, ...sizes, contrast: { checked: colors.checked, minimum: colors.minimum, skipped: colors.skipped, excluded: colors.excluded, controlBorders: colors.controlBorders } });
      }
    }
  }
  assert.notEqual(appearanceColors.light, appearanceColors.dark, 'Appearance modes must use different page colors');
  check('Light/dark and comfortable/compact reflow and solid-background HTML text/control contrast', report.layouts.length + ' combinations');
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto(url);
  await page.keyboard.press('Tab');
  assert.equal((await page.locator(':focus').textContent()).trim(), 'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').evaluate(element => element.tagName), 'MAIN');
  check('Keyboard skip link moves focus to main');
  const disclosure = page.locator('#studio details').first();
  assert.equal(await disclosure.count(), 1, 'Expected native project brief disclosure');
  const initialDisclosure = await disclosure.evaluate(element => element.open);
  await disclosure.locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await disclosure.evaluate(element => element.open), !initialDisclosure);
  await page.keyboard.press('Enter');
  assert.equal(await disclosure.evaluate(element => element.open), initialDisclosure);
  check('Native project brief disclosure opens and closes by keyboard');
  assert.equal(await page.locator('#review-status').getAttribute('role'), 'status');
  for (const [action, confirmed] of [['accept', 'Accepted'], ['reject', 'Rejected']]) {
    await page.locator('#view-proposal').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'proposal-heading');
    assert.equal(await page.locator('#proposal-detail').isVisible(), true);
    await page.locator('#' + action + '-proposal').focus();
    await page.keyboard.press('Enter');
    assert.match(await page.locator('#confirmed-decision').textContent(), /Unreviewed/i);
    assert.match(await page.locator('#pending-decision').textContent(), new RegExp(action, 'i'));
    assert.ok((await page.locator('#review-status').textContent()).trim().length > 0, 'Decision request needs status feedback');
    const pendingBeforeReturn = await page.locator('#pending-decision').textContent();
    await page.locator('#back-to-proposal').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'view-proposal');
    assert.equal(await page.locator('#proposal-detail').isVisible(), false);
    assert.equal(await page.locator('#view-proposal').getAttribute('aria-expanded'), 'false');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'proposal-heading');
    assert.equal(await page.locator('#pending-decision').textContent(), pendingBeforeReturn);
    assert.match(await page.locator('#confirmed-decision').textContent(), /Unreviewed/i);
    await page.locator('#acknowledge-decision').focus();
    await page.keyboard.press('Enter');
    assert.match(await page.locator('#confirmed-decision').textContent(), new RegExp(confirmed, 'i'));
    assert.equal(await page.locator(':focus').getAttribute('id'), 'review-result');
    await page.locator('#reset-proposal').click();
    assert.match(await page.locator('#confirmed-decision').textContent(), /Unreviewed/i);
    assert.doesNotMatch(await page.locator('#pending-decision').textContent(), /requested|pending|accept|reject/i);
  }
  check('Keyboard proposal decisions distinguish pending requests from confirmed acceptance/rejection and reset');
  check('Back to proposal restores the invoking control and preserves pending decision context');
  await page.locator('#appearance').selectOption('system');
  await page.emulateMedia({ colorScheme: 'dark' });
  assert.equal(await pageColor(page), appearanceColors.dark);
  await page.emulateMedia({ colorScheme: 'light' });
  assert.equal(await pageColor(page), appearanceColors.light);
  await page.locator('#appearance').selectOption('light');
  await page.locator('#density').selectOption('compact');
  await page.emulateMedia({ colorScheme: 'dark' });
  assert.equal(await pageColor(page), appearanceColors.light);
  await page.reload();
  assert.equal(await page.locator('#appearance').inputValue(), 'light');
  assert.equal(await page.locator('#density').inputValue(), 'compact');
  assert.match(await page.locator('#confirmed-decision').textContent(), /Unreviewed/i);
  check('System appearance follows live changes; explicit appearance and density persist');
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
  assert.equal(focus.width, '3px'); assert.equal(focus.offset, '5px');
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
          if (key !== 'interface-atlas-swiss-preview') return getItem.call(this, key);
          return mode === 'malformed' ? '{broken-json' : JSON.stringify({ appearance: 'invalid-choice', density: 'invalid-choice', motion: 'invalid-choice' });
        };
      }
    }, mode);
    const failurePage = await failureContext.newPage();
    await failurePage.goto(url);
    assert.equal(await pageColor(failurePage), appearanceColors.dark);
    assert.equal(await failurePage.locator('#appearance').inputValue(), 'system');
    assert.equal(await failurePage.locator('#density').inputValue(), 'comfortable');
    await failurePage.locator('#appearance').selectOption('light');
    assert.equal(await failurePage.locator('html').getAttribute('data-appearance'), 'light');
    assert.equal(await pageColor(failurePage), appearanceColors.light);
    await failureContext.close();
  }
  check('Blocked, invalid, and malformed stored preferences retain usable defaults and controls');
  const noJsContext = await newContext({ javaScriptEnabled: false, colorScheme: 'dark', viewport: { width: 320, height: 1000 } });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(url);
  await reflow(noJsPage, 'No JavaScript 320px');
  assert.equal(await noJsPage.locator('h1').count(), 1);
  assert.equal(await noJsPage.locator('#proposal-detail').isVisible(), true);
  for (const selector of ['#view-proposal', '#accept-proposal', '#reject-proposal', '#acknowledge-decision', '#reset-proposal', '#appearance', '#density', '#motion']) {
    assert.equal(await noJsPage.locator(selector).isDisabled(), true, selector + ' needs JavaScript');
  }
  assert.equal(await noJsPage.locator('#studio details summary').count() > 0, true);
  const noJsBrief = noJsPage.locator('#studio details').first();
  const noJsInitialDisclosure = await noJsBrief.evaluate(element => element.open);
  await noJsBrief.locator('summary').click();
  assert.equal(await noJsBrief.evaluate(element => element.open), !noJsInitialDisclosure);
  const noJsColors = await contrast(noJsPage);
  assert.ok(noJsColors.checked > 0); assert.deepEqual(noJsColors.failures, []);
  check('No-JavaScript proposal and native briefs remain readable; simulation/preferences stay disabled; text contrast passes', { checked: noJsColors.checked, minimum: noJsColors.minimum, skipped: noJsColors.skipped, excluded: noJsColors.excluded });
  await noJsContext.close();
  if (output) {
    await mkdir(output, { recursive: true });
    const captureContext = await newContext({ reducedMotion: 'reduce' });
    const capturePage = await captureContext.newPage();
    await capturePage.goto(url);
    for (const [appearance, width, filename, section] of [['light', 1440, 'light-desktop.png', '#studio'], ['dark', 1440, 'dark-desktop.png', '#review'], ['light', 390, 'light-mobile.png', '#studio']]) {
      await capturePage.setViewportSize({ width, height: 1000 });
      await capturePage.locator('#appearance').selectOption(appearance);
      await capturePage.locator('#density').selectOption('comfortable');
      if (section === '#review') await capturePage.locator('#view-proposal').click();
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
