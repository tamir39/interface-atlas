import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Optional browser verification; the library itself has no package dependency.
const options = {};
for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index];
  if (!['--module', '--browser', '--output', '--preview'].includes(key) || !process.argv[index + 1]) {
    throw new Error('Usage: node tools/validate-editorial.mjs [--module path/to/playwright/index.mjs] [--browser path/to/chromium] [--output directory] [--preview directory]');
  }
  options[key.slice(2)] = process.argv[index + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'themes/editorial/preview'));
const output = options.output ? path.resolve(options.output) : null;
let playwright;
try {
  playwright = await import(options.module ? pathToFileURL(path.resolve(options.module)).href : 'playwright');
} catch {
  throw new Error('Optional check requires an installed Playwright package. Pass --module with its index.mjs path, or install Playwright locally. No packages are needed to open the preview.');
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
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const url = 'http://127.0.0.1:' + server.address().port + '/';
let browser;
const report = { checks: [], layouts: [], browser: null, limits: ['No screen-reader, touch-device, native browser zoom, or real backend testing.', 'Contrast checks cover visible HTML text with opaque solid backgrounds; SVG artwork, disabled controls, placeholders, text selection, and native popup menus are outside this check.', 'Font fallbacks are tested; the named webfont files are not distributed or loaded.'] };
report.node = process.version;
report.testedFiles = {};
for (const filename of ['index.html', 'styles.css', 'preview.js']) {
  report.testedFiles[filename] = createHash('sha256').update(await readFile(path.join(preview, filename))).digest('hex');
}
const errors = [], external = [];
async function newContext(options) {
  const context = await browser.newContext(options);
  context.on('request', request => { if (!request.url().startsWith(url)) external.push(request.url()); });
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
    const failures = [], skipped = [], pairs = [], controlBorders = [];
    for (const element of document.querySelectorAll('body *')) {
      if (element.namespaceURI !== 'http://www.w3.org/1999/xhtml') continue;
      if (['SCRIPT', 'STYLE', 'OPTION', 'NOSCRIPT'].includes(element.tagName) || element.closest('[disabled]')) continue;
      const text = element.tagName === 'SELECT' ? element.selectedOptions[0]?.textContent :
        element.tagName === 'INPUT' ? element.value :
        [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent.trim()).join(' ');
      if (!text || !element.getClientRects().length) continue;
      const ancestors = []; let parent = element;
      while (parent) { ancestors.unshift(parent); parent = parent.parentElement; }
      const styles = ancestors.map(ancestor => getComputedStyle(ancestor));
      if (styles.some(style => style.visibility !== 'visible' || Number(style.opacity) < 1 || style.backgroundImage !== 'none')) {
        skipped.push({ text: text.slice(0, 60), reason: 'Hidden, translucent, or image background' }); continue;
      }
      let background = [255, 255, 255, 1];
      for (const style of styles) background = composite(rgba(style.backgroundColor), background);
      const style = getComputedStyle(element);
      const foreground = composite(rgba(style.color), background);
      const required = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.6667 && parseInt(style.fontWeight) >= 700) ? 3 : 4.5;
      const measured = ratio(foreground, background);
      const pair = { text: text.slice(0, 60), foreground: style.color, background: background.slice(0, 3).map(Math.round), ratio: Number(measured.toFixed(2)), required };
      pairs.push(pair);
      if (measured + .001 < required) failures.push(pair);
    }
    for (const element of document.querySelectorAll('select:not(:disabled), input[type="search"]:not(:disabled), input[type="text"]:not(:disabled)')) {
      if (!element.getClientRects().length) continue;
      const style = getComputedStyle(element);
      const fill = rgba(style.backgroundColor);
      if (fill[3] !== 1 || parseFloat(style.borderTopWidth) < 1 || style.borderTopStyle === 'none') continue;
      const border = composite(rgba(style.borderTopColor), fill);
      const measured = ratio(border, fill);
      const result = { id: element.id, ratio: Number(measured.toFixed(2)), required: 3 };
      controlBorders.push(result);
      if (measured + .001 < 3) failures.push(result);
    }
    return { checked: pairs.length, minimum: Math.min(...pairs.map(pair => pair.ratio)), failures, skipped, pairs, controlBorders };
  });
}
try {
  browser = await playwright.chromium.launch({ headless: true, ...(options.browser ? { executablePath: options.browser } : {}) });
  report.browser = browser.version();
  const context = await newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light', reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await page.goto(url);
  await page.locator('#motion').uncheck();
  for (const appearance of ['light', 'dark']) {
    await page.locator('#appearance').selectOption(appearance);
    for (const density of ['comfortable', 'compact']) {
      await page.locator('#density').selectOption(density);
      for (const width of [320, 390, 768, 1280, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        const sizes = await reflow(page, appearance + '/' + density + '/' + width);
        const colors = await contrast(page);
        assert.ok(colors.checked > 0 && colors.controlBorders.length >= 3, 'Expected text and control-border contrast coverage');
        assert.deepEqual(colors.failures, [], 'Text contrast failures: ' + JSON.stringify(colors.failures));
        if (width <= 390) assert.ok(parseFloat(await page.locator('#run-search').evaluate(element => getComputedStyle(element).fontSize)) >= 16, 'Mobile input text must stay at least 16px');
        report.layouts.push({ appearance, density, ...sizes, contrast: { checked: colors.checked, minimum: colors.minimum, skipped: colors.skipped, controlBorders: colors.controlBorders } });
      }
    }
  }
  check('Light/dark and comfortable/compact reflow and opaque text contrast', report.layouts.length + ' combinations');
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto(url);
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').evaluate(element => element.tagName), 'MAIN');
  check('Keyboard skip link moves focus to main');
  await page.locator('#run-search').fill('not-a-sample-run');
  assert.match(await page.locator('#run-count').textContent(), /0/);
  await page.locator('#reset-filters').click();
  assert.match(await page.locator('#run-count').textContent(), /4/);
  check('Run filters expose empty results and recover');
  await page.locator('#inspect-run-101').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'detail-heading-101');
  await page.locator('#request-cancel').focus();
  await page.keyboard.press('Enter');
  assert.match(await page.locator('#execution-run-101').textContent(), /Running/);
  assert.match(await page.locator('#pending-run-101').textContent(), /Cancellation requested/);
  await page.locator('#acknowledge-cancel').focus();
  await page.keyboard.press('Enter');
  assert.match(await page.locator('#execution-run-101').textContent(), /Cancelled/);
  await page.locator('#back-to-run-101').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'inspect-run-101');
  check('Keyboard detail navigation and cancellation request/acknowledgement remain distinct');
  await page.locator('#run-search').fill('navigation');
  await page.locator('#back-to-run-101').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#run-search').inputValue(), 'navigation');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'run-search');
  assert.equal(await page.locator('#detail-run-101').isVisible(), true);
  check('Returning from a filtered-out run preserves filters and detail context');
  await page.locator('#appearance').selectOption('system');
  await page.emulateMedia({ colorScheme: 'dark' });
  assert.equal(await page.locator('html').evaluate(element => getComputedStyle(element).getPropertyValue('--page').trim()), '#19151e');
  await page.locator('#appearance').selectOption('light');
  await page.emulateMedia({ colorScheme: 'dark' });
  assert.equal(await page.locator('html').getAttribute('data-appearance'), 'light');
  await page.reload();
  assert.equal(await page.locator('#appearance').inputValue(), 'light');
  check('System follows live changes; explicit appearance persists');
  await page.locator('#motion').check();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const motion = await page.locator('#request-cancel').evaluate(element => ({ duration: getComputedStyle(element).transitionDuration, animation: getComputedStyle(element).animationName }));
  assert.ok(motion.duration.split(',').every(value => parseFloat(value) === 0), 'Reduced motion must be immediate');
  assert.equal(motion.animation, 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('#motion').uncheck();
  assert.ok((await page.locator('#request-cancel').evaluate(element => getComputedStyle(element).transitionDuration)).split(',').every(value => parseFloat(value) === 0));
  check('Live reduced-motion and explicit motion-off give immediate feedback');
  await page.emulateMedia({ forcedColors: 'active' });
  await page.locator('#appearance').focus();
  const focus = await page.locator('#appearance').evaluate(element => ({ width: getComputedStyle(element).outlineWidth, offset: getComputedStyle(element).outlineOffset, color: getComputedStyle(element).outlineColor }));
  assert.equal(focus.width, '3px'); assert.equal(focus.offset, '5px');
  check('Forced-colors focus outline retains geometry', focus);
  await page.emulateMedia({ forcedColors: 'none' });
  await page.setViewportSize({ width: 640, height: 1000 });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await reflow(page, '200% text resize at 640px');
  check('200% CSS text resize reflows at 640px');
  const cdp = await context.newCDPSession(page);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  const { root: documentNode } = await cdp.send('DOM.getDocument');
  report.renderedFonts = {};
  for (const selector of ['.intro-description', '.serif-sample', '.technical', 'p[lang="vi"]']) {
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: documentNode.nodeId, selector });
    report.renderedFonts[selector] = (await cdp.send('CSS.getPlatformFontsForNode', { nodeId })).fonts.map(font => ({ family: font.familyName, custom: font.isCustomFont, glyphCount: font.glyphCount }));
  }
  check('Actual fallback font families recorded', report.renderedFonts);
  await context.close();
  for (const mode of ['blocked', 'invalid']) {
    const failureContext = await newContext({ colorScheme: 'dark' });
    await failureContext.addInitScript(mode => {
      if (mode === 'blocked') Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } });
      else {
        const getItem = Storage.prototype.getItem;
        Storage.prototype.getItem = function (key) { return key === 'interface-atlas-editorial-preview' ? JSON.stringify({ appearance: 'invalid-choice' }) : getItem.call(this, key); };
      }
    }, mode);
    const failurePage = await failureContext.newPage();
    await failurePage.goto(url);
    assert.equal(await failurePage.locator('html').evaluate(element => getComputedStyle(element).getPropertyValue('--page').trim()), '#19151e');
    await failurePage.locator('#appearance').selectOption('light');
    assert.equal(await failurePage.locator('html').getAttribute('data-appearance'), 'light');
    await failureContext.close();
  }
  check('Blocked and invalid stored preferences retain a usable interface');
  const noJsContext = await newContext({ javaScriptEnabled: false, colorScheme: 'dark', viewport: { width: 320, height: 1000 } });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(url);
  await reflow(noJsPage, 'No JavaScript 320px');
  assert.equal(await noJsPage.locator('h1').count(), 1);
  assert.equal(await noJsPage.locator('#detail-run-101').isVisible(), true);
  assert.equal(await noJsPage.locator('#request-cancel').isDisabled(), true);
  const noJsColors = await contrast(noJsPage);
  assert.ok(noJsColors.checked > 0); assert.deepEqual(noJsColors.failures, []);
  check('No-JavaScript content remains available and passes opaque text contrast; simulation actions unavailable', { checked: noJsColors.checked, minimum: noJsColors.minimum });
  await noJsContext.close();
  if (output) {
    await mkdir(output, { recursive: true });
    const captureContext = await newContext({ reducedMotion: 'reduce' });
    const capturePage = await captureContext.newPage();
    await capturePage.goto(url);
    for (const [appearance, width, filename, section] of [['light', 1440, 'light-desktop.png', '#portfolio'], ['dark', 1440, 'dark-desktop.png', '#operations'], ['light', 390, 'light-mobile.png', '#portfolio']]) {
      await capturePage.setViewportSize({ width, height: 1000 });
      await capturePage.locator('#appearance').selectOption(appearance);
      if (width > 390) {
        // Fit the entire section before capture so offscreen fixed chrome stays offscreen.
        const bounds = await capturePage.locator(section).boundingBox();
        await capturePage.setViewportSize({ width, height: Math.max(1000, Math.ceil(bounds.height) + 2) });
        await capturePage.locator(section).evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY));
        await capturePage.locator(section).screenshot({ path: path.join(output, filename) });
      }
      else {
        await capturePage.locator(section).evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY));
        await capturePage.screenshot({ path: path.join(output, filename) });
      }
    }
    await captureContext.close();
  }
  assert.deepEqual(errors, [], 'Browser runtime errors');
  assert.deepEqual(external, [], 'Preview must not request external resources');
  check('No browser runtime errors or external resource requests');
  if (output) await writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
