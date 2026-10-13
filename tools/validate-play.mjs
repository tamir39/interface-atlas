import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Optional browser evidence for Play. These checks are original Atlas tooling,
// adapted from the Editorial and Swiss preview validators; no upstream UI code is used.
const options = {};
for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index];
  if (!['--module', '--browser', '--output', '--preview'].includes(key) || !process.argv[index + 1]) {
    throw new Error('Usage: node tools/validate-play.mjs [--module path/to/playwright/index.mjs] [--browser path/to/chromium] [--output directory] [--preview directory]');
  }
  options[key.slice(2)] = process.argv[index + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'themes/play/preview'));
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
    'Contrast samples are rendered HTML text composited over solid backgrounds and enabled select/text-input/textarea and associated radio/checkbox-label boundaries against their fill and adjacent background. SVG artwork, disabled controls, placeholders, text selection, native popup menus, radio/checkbox glyph internals, and backgrounds with images are outside this check.',
    'Fallback font families are recorded from Chromium. Named webfont files are not distributed or loaded.',
    '44px target samples include enabled native controls, associated checkbox/radio labels, summary controls, button-styled links, and section navigation. Contextual inline links are excluded.',
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
      const pair = { selector: identify(element), text: text.slice(0, 60), foreground: style.color, background: background.slice(0, 3).map(Math.round), ratio: Number(measured.toFixed(2)), required };
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
    return { checked: pairs.length, minimum: Math.min(...pairs.map(pair => pair.ratio)), failures, skipped, excluded, pairs, controlBorders };
  });
}
const pageColor = page => page.locator('html').evaluate(element => getComputedStyle(element).getPropertyValue('--page').trim());
async function assertPageColor(page, expected) {
  // MediaQueryList change events are queued after emulation; wait for the applied appearance.
  await page.waitForFunction(expected => getComputedStyle(document.documentElement).getPropertyValue('--page').trim() === expected, expected, { timeout: 1000 });
  assert.equal(await pageColor(page), expected);
}
const state = page => page.evaluate(() => window.__playPreview.getState());
const focusedId = page => page.locator(':focus').getAttribute('id');
async function hitTargets(page) {
  return page.evaluate(() => {
    const selectors = 'button:not(:disabled), select:not(:disabled), input:not(:disabled), textarea:not(:disabled), summary, a.button, .section-nav a';
    return [...document.querySelectorAll(selectors)].filter(element => element.getClientRects().length).map(element => {
      const target = ['checkbox', 'radio'].includes(element.type) ? element.labels?.[0] || element : element;
      const rect = target.getBoundingClientRect();
      return { id: element.id || element.tagName.toLowerCase(), via: target === element ? 'control' : 'associated label', width: Number(rect.width.toFixed(2)), height: Number(rect.height.toFixed(2)) };
    });
  });
}
async function densityMetrics(page) {
  return page.locator('.specimen-card').first().evaluate(element => ({
    height: element.getBoundingClientRect().height,
    padding: { blockStart: parseFloat(getComputedStyle(element).paddingBlockStart), blockEnd: parseFloat(getComputedStyle(element).paddingBlockEnd), inlineStart: parseFloat(getComputedStyle(element).paddingInlineStart) }
  }));
}
async function immediateFeedback(page, label) {
  const selector = '#review-brief';
  const motion = await page.locator(selector).evaluate(element => {
    const style = getComputedStyle(element);
    return { duration: style.transitionDuration, animation: style.animationName };
  });
  assert.ok(motion.duration.split(',').every(duration => parseFloat(duration) === 0), label + ': feedback must be immediate');
  assert.equal(motion.animation, 'none', label + ': no decorative animation');
  await page.locator(selector).hover();
  await page.mouse.down();
  const transform = await page.locator(selector).evaluate(element => getComputedStyle(element).transform);
  await page.mouse.move(1, 1);
  await page.mouse.up();
  assert.equal(transform, 'none', label + ': press must not transform');
  return { ...motion, pressTransform: transform };
}
async function stateContrast(page, label) {
  const colors = await contrast(page);
  assert.ok(colors.checked > 0, label + ': expected rendered HTML text samples');
  assert.deepEqual(colors.failures, [], label + ': contrast failures ' + JSON.stringify(colors.failures));
  return { checked: colors.checked, minimum: colors.minimum, skipped: colors.skipped, excluded: colors.excluded, controlBorders: colors.controlBorders };
}
async function fillBrief(page, values) {
  await page.locator('#project-name').fill(values.name);
  await page.locator('#project-goal').fill(values.goal);
  await page.locator('#type-' + values.type).check();
  for (const value of ['identity', 'website', 'launch']) {
    const field = page.locator('#deliverable-' + value);
    if (values.deliverables.includes(value)) await field.check(); else await field.uncheck();
  }
}
async function assertFields(page, values) {
  assert.equal(await page.locator('#project-name').inputValue(), values.name);
  assert.equal(await page.locator('#project-goal').inputValue(), values.goal);
  for (const value of ['brand', 'product', 'campaign']) assert.equal(await page.locator('#type-' + value).isChecked(), value === values.type);
  for (const value of ['identity', 'website', 'launch']) assert.equal(await page.locator('#deliverable-' + value).isChecked(), values.deliverables.includes(value));
}
async function assertReview(page, values) {
  assert.equal((await page.locator('#review-name').textContent()).trim(), values.name.trim());
  assert.equal((await page.locator('#review-goal').textContent()).trim(), values.goal.trim());
  assert.equal((await page.locator('#review-type').textContent()).trim(), { brand: 'Brand identity', product: 'Digital product', campaign: 'Creative campaign' }[values.type]);
  assert.deepEqual(await page.locator('#review-deliverables li').allTextContents(), values.deliverables.map(value => ({ identity: 'Identity direction', website: 'Website concept', launch: 'Launch materials' }[value])));
  const snapshot = await page.evaluate(() => {
    const snapshot = window.__playPreview.getState().snapshot;
    return { snapshot, frozen: Object.isFrozen(snapshot), deliverablesFrozen: Object.isFrozen(snapshot.deliverables) };
  });
  assert.ok(snapshot.frozen && snapshot.deliverablesFrozen, 'Review snapshot and deliverables must be immutable');
  assert.equal(snapshot.snapshot.projectName, values.name.trim());
  assert.equal(snapshot.snapshot.goal, values.goal.trim());
  assert.equal(snapshot.snapshot.projectType, values.type);
  assert.deepEqual(snapshot.snapshot.deliverables, values.deliverables);
  return snapshot.snapshot;
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
try {
  browser = await playwright.chromium.launch({ headless: true, ...(options.browser ? { executablePath: options.browser } : {}) });
  report.browser = browser.version();
  const context = await newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light', reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await page.goto(url);
  assert.equal(await page.locator('#appearance').inputValue(), 'system');
  assert.equal(await page.locator('#density').inputValue(), 'comfortable');
  assert.equal(await page.locator('#motion').isChecked(), true);
  assert.equal(await page.locator('#brief-builder').getAttribute('data-state'), 'editing');
  assert.equal(await page.locator('#project-name').getAttribute('maxlength'), '80');
  assert.equal(await page.locator('#project-goal').getAttribute('maxlength'), '600');
  assert.equal(await page.locator('#project-goal').getAttribute('minlength'), '15');
  assert.equal(await page.locator('input[type="radio"][name="projectType"]').count(), 3);
  assert.equal(await page.locator('input[type="checkbox"][name="deliverables"]').count(), 3);
  check('Native builder defaults and field limits', { projectNameMax: 80, goalMin: 15, goalMax: 600, projectTypes: 3, deliverablesMinimum: 1 });
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
        for (const id of ['appearance', 'density', 'project-name', 'project-goal', 'specimen-name', 'type-brand', 'type-product', 'type-campaign', 'deliverable-identity', 'deliverable-website', 'deliverable-launch']) assert.ok(colors.controlBorders.some(sample => sample.id === id), 'Expected sampled boundary for #' + id);
        const targets = await hitTargets(page);
        assert.ok(targets.length > 0, 'Expected rendered interactive targets');
        assert.deepEqual(targets.filter(target => target.height < 43.99 || target.width < 43.99), [], 'Controls and associated checkbox/radio labels retain 44px targets: ' + JSON.stringify(targets));
        if (width === 1440 && appearance === 'light') measuredDensities[density] = await densityMetrics(page);
        if (width <= 390) for (const selector of ['#appearance', '#density', '#project-name', '#project-goal']) {
          assert.ok(parseFloat(await page.locator(selector).evaluate(element => getComputedStyle(element).fontSize)) >= 16, 'Mobile input/select text stays at least 16px');
        }
        report.layouts.push({ appearance, density, ...sizes, contrast: colors, targets });
      }
    }
  }
  assert.notEqual(appearanceColors.light, appearanceColors.dark, 'Appearance modes must use different page colors');
  assert.ok(measuredDensities.comfortable.padding.blockStart > measuredDensities.compact.padding.blockStart, 'Density must change rendered specimen padding');
  assert.ok(measuredDensities.comfortable.height > measuredDensities.compact.height + 1, 'Density must visibly change specimen height');
  check('Light/dark × comfortable/compact × 320/390/768/1280/1440 reflow, HTML text/control contrast, measured density, and 44px targets', { combinations: report.layouts.length, measuredDensities });
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto(url);
  await page.keyboard.press('Tab');
  assert.equal((await page.locator(':focus').textContent()).trim(), 'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').evaluate(element => element.tagName), 'MAIN');
  for (const selector of ['#case-sprout', '#case-daydream', '#case-loop']) await openNativeDisclosure(page, selector);
  check('Keyboard skip link focuses main; all three native portfolio disclosures open and close by keyboard');
  await page.locator('input[name="projectType"]:checked').evaluateAll(elements => elements.forEach(element => { element.checked = false; }));
  await page.locator('#review-brief').focus();
  await page.keyboard.press('Enter');
  assert.equal(await focusedId(page), 'error-summary');
  assert.equal(await page.locator('#error-summary').isVisible(), true);
  const errorLinks = await page.locator('#error-list a').evaluateAll(elements => elements.map(element => ({ href: element.getAttribute('href'), text: element.textContent.trim() })));
  assert.equal(errorLinks.length, 4, 'Empty form needs name, goal, project-type, and deliverable errors');
  for (const { href, text } of errorLinks) {
    assert.ok(text.length > 0 && /^#[\w-]+$/.test(href), 'Error summary needs meaningful field links');
    const field = page.locator(href);
    assert.equal(await field.count(), 1);
    await page.locator('#error-list a[href="' + href + '"]').click();
    assert.equal(await focusedId(page), href.slice(1), 'Error link must focus its field');
    assert.equal(await field.getAttribute('aria-invalid'), 'true', 'Invalid field must expose aria-invalid');
    const descriptions = (await field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    assert.ok(descriptions.length > 0, 'Invalid field must describe its inline error');
    const visibleDescriptions = await field.evaluate((element, ids) => ids.filter(id => {
      const description = document.getElementById(id);
      return description && description.getClientRects().length && description.textContent.trim().length;
    }), descriptions);
    assert.ok(descriptions.some(id => /error$/.test(id) && visibleDescriptions.includes(id)), 'The visible inline error must be included in aria-describedby');
  }
  const inlineErrors = await page.locator('#name-error, #type-error, #goal-error, #deliverables-error').evaluateAll(elements => elements.map(element => ({ id: element.id, visible: !!element.getClientRects().length, text: element.textContent.trim() })));
  assert.equal(inlineErrors.length, 4);
  assert.ok(inlineErrors.every(error => error.visible && error.text.length > 0), 'Every invalid field needs a visible named inline error');
  const invalidContrast = await stateContrast(page, 'Invalid builder');
  check('Empty submission focuses linked error summary and exposes aria-invalid plus described inline errors', { links: errorLinks, inlineErrors, contrast: invalidContrast });
  const limits = { name: 'A'.repeat(81), goal: 'Short goal', type: 'brand', deliverables: ['identity'] };
  await fillBrief(page, { ...limits, name: 'Valid name' });
  await page.locator('#project-name').evaluate((element, value) => { element.value = value; element.dispatchEvent(new Event('input', { bubbles: true })); }, limits.name);
  await page.locator('#review-brief').click();
  assert.equal(await focusedId(page), 'error-summary');
  assert.equal(await page.locator('#project-name').getAttribute('aria-invalid'), 'true');
  assert.equal(await page.locator('#project-goal').getAttribute('aria-invalid'), 'true');
  await page.locator('#project-name').fill('Valid name');
  await page.locator('#project-goal').evaluate(element => { element.value = 'G'.repeat(601); element.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.locator('#review-brief').click();
  assert.equal(await page.locator('#project-goal').getAttribute('aria-invalid'), 'true');
  assert.equal(await page.locator('#brief-builder').getAttribute('data-state'), 'editing');
  check('Custom validation rejects names above 80 and goals outside 15–600 even when native maxlength is bypassed');
  for (const goal of ['G'.repeat(15), 'G'.repeat(600)]) {
    const boundaryValues = { name: 'N'.repeat(80), goal, type: 'campaign', deliverables: ['launch'] };
    await fillBrief(page, boundaryValues);
    await page.locator('#review-brief').click();
    assert.equal(await page.locator('#brief-builder').getAttribute('data-state'), 'review', 'Exact field length limits and one deliverable must be accepted');
    await assertReview(page, boundaryValues);
    await page.setViewportSize({ width: 320, height: 1000 });
    await reflow(page, 'Exact-limit review snapshot at 320px');
    await page.setViewportSize({ width: 1280, height: 1000 });
    await page.locator('#edit-brief').click();
    await assertFields(page, boundaryValues);
  }
  check('Exact 80-character name, 15/600-character goals, and one deliverable are accepted and preserved on edit');
  const values = {
    name: '  <em>Studio & team</em>  ',
    goal: '  Build a Vietnamese portfolio. <img src=x onerror="window.__injected=true"> Make the work easy to review.  ',
    type: 'product', deliverables: ['identity', 'website']
  };
  await fillBrief(page, values);
  await page.locator('#review-brief').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#brief-builder').getAttribute('data-state'), 'review');
  assert.equal(await focusedId(page), 'review-heading');
  assert.equal(await page.locator('#brief-review').isVisible(), true);
  assert.equal(await page.locator('#error-summary').isVisible(), false);
  assert.equal(await page.locator('[aria-invalid="true"]:visible').count(), 0, 'Valid review clears invalid state');
  for (const selector of ['#project-name', '#project-goal']) assert.notEqual(await page.locator(selector).getAttribute('aria-invalid'), 'true');
  await assertFields(page, values);
  const snapshot = await assertReview(page, values);
  assert.equal(await page.locator('#review-name em, #review-goal img').count(), 0, 'User content must render as literal text');
  assert.equal(await page.evaluate(() => window.__injected), undefined);
  const reviewContrast = await stateContrast(page, 'Review snapshot');
  await page.locator('#project-name').evaluate(element => { element.value = 'Changed underneath'; });
  assert.deepEqual((await state(page)).snapshot, snapshot, 'Changing underlying fields cannot mutate the review snapshot');
  await page.locator('#project-name').evaluate((element, value) => { element.value = value; }, values.name);
  check('Valid review focuses its heading, preserves entered values, trims an immutable snapshot, clears errors, and treats user content as text', { contrast: reviewContrast });
  await page.locator('#edit-brief').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#brief-builder').getAttribute('data-state'), 'editing');
  assert.equal(await focusedId(page), 'project-name');
  await assertFields(page, values);
  await page.locator('#review-brief').click();
  assert.deepEqual(await assertReview(page, values), snapshot);
  check('Edit returns focus to the name and preserves every entered field; repeat review retains trimmed values');
  await page.locator('#request-confirmation').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#brief-builder').getAttribute('data-state'), 'pending');
  assert.equal(await page.locator('#request-status').getAttribute('role'), 'status');
  const pendingText = (await page.locator('#request-status').textContent()).trim();
  assert.match(pendingText, /pending|request|await/i);
  assert.equal(await page.locator('#brief-receipt').isVisible(), false, 'Pending request is distinct from confirmed receipt');
  assert.equal(await page.locator('#edit-brief').isDisabled(), true);
  assert.equal(await page.locator('#request-confirmation').isDisabled(), true);
  await page.locator('#request-confirmation').evaluate(element => element.click());
  assert.equal(await page.locator('#brief-builder').getAttribute('data-state'), 'pending', 'Disabled submit cannot duplicate request');
  assert.deepEqual((await state(page)).snapshot, snapshot);
  const pendingContrast = await stateContrast(page, 'Pending request');
  // Let transient feedback settle: only the explicit acknowledgement may confirm a receipt.
  await page.waitForTimeout(300);
  assert.equal(await page.locator('#brief-receipt').isVisible(), false);
  await page.locator('#acknowledge-request').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#brief-builder').getAttribute('data-state'), 'acknowledged');
  assert.equal(await page.locator('#brief-receipt').isVisible(), true);
  assert.equal(await focusedId(page), 'receipt-heading');
  assert.match(await page.locator('#brief-receipt').textContent(), /local|demo|sample|simulat/i);
  assert.match(await page.locator('#brief-receipt').textContent(), /no agent|agent.*not|does not.*start|has.*not.*started/i);
  assert.deepEqual((await state(page)).snapshot, snapshot);
  const receiptContrast = await stateContrast(page, 'Acknowledged receipt');
  check('Request remains pending with edit and duplicate submission disabled; only manual acknowledgement reveals a local receipt and never starts an agent', { pendingText, pendingContrast, receiptContrast });
  assert.equal(await page.locator('#edit-brief').isDisabled(), false);
  await page.locator('#edit-brief').click();
  assert.equal(await focusedId(page), 'project-name');
  assert.equal(await page.locator('#brief-builder').getAttribute('data-state'), 'editing');
  await assertFields(page, values);
  assert.equal((await state(page)).snapshot, null);
  assert.equal(await page.locator('#brief-receipt').isVisible(), false, 'Editing a confirmed brief discards its stale receipt');
  await page.locator('#review-brief').click();
  await page.locator('#request-confirmation').click();
  assert.equal(await page.locator('#brief-receipt').isVisible(), false);
  await page.locator('#acknowledge-request').click();
  assert.equal(await focusedId(page), 'receipt-heading');
  check('Revising an acknowledged brief returns focus, preserves entered data, and requires a fresh receipt');
  await page.locator('#reset-demo').focus();
  await page.keyboard.press('Enter');
  assert.equal(await focusedId(page), 'project-name');
  assert.equal(await page.locator('#brief-builder').getAttribute('data-state'), 'editing');
  assert.equal((await state(page)).snapshot, null);
  assert.equal(await page.locator('#project-name').inputValue(), '');
  assert.equal(await page.locator('#project-goal').inputValue(), '');
  assert.equal(await page.locator('input[name="projectType"]:checked').count(), 1);
  assert.equal(await page.locator('#type-brand').isChecked(), true);
  assert.equal(await page.locator('input[name="deliverables"]:checked').count(), 0);
  assert.equal(await page.locator('#brief-review').isVisible(), false);
  assert.equal(await page.locator('#brief-receipt').isVisible(), false);
  check('Reset clears the local demo and restores focus to the first field');
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
  await page.reload();
  assert.equal(await page.locator('#appearance').inputValue(), 'light');
  assert.equal(await page.locator('#density').inputValue(), 'compact');
  assert.equal(await page.locator('#motion').isChecked(), false);
  assert.equal(await page.locator('#brief-builder').getAttribute('data-state'), 'editing');
  assert.equal((await state(page)).snapshot, null, 'Preferences persist; a demo receipt is not persisted as a real outcome');
  check('System follows live OS appearance; explicit appearance, density, and motion persist across reload');
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
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  const resize = await reflow(page, '200% CSS text resize at 640px');
  const resizeTargets = await hitTargets(page);
  assert.deepEqual(resizeTargets.filter(target => target.height < 43.99 || target.width < 43.99), []);
  check('200% CSS text resize reflows at 640px; separate from native browser zoom', resize);
  await page.evaluate(() => { document.documentElement.style.removeProperty('font-size'); });
  const cdp = await context.newCDPSession(page);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  const { root: documentNode } = await cdp.send('DOM.getDocument');
  report.renderedFonts = {};
  for (const selector of ['#type-display', '.technical', '[lang="vi"]']) {
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: documentNode.nodeId, selector });
    assert.ok(nodeId, 'Expected local font sample ' + selector);
    const fonts = (await cdp.send('CSS.getPlatformFontsForNode', { nodeId })).fonts;
    assert.ok(fonts.length > 0, 'Expected actual rendered glyphs for ' + selector);
    assert.equal(fonts.some(font => font.isCustomFont), false, 'Preview uses local fallback fonts');
    report.renderedFonts[selector] = fonts.map(font => ({ family: font.familyName, custom: font.isCustomFont, glyphCount: font.glyphCount }));
  }
  check('Actual local fallback families and Vietnamese glyphs recorded through Chromium CDP', report.renderedFonts);
  await context.close();
  for (const mode of ['blocked', 'invalid', 'malformed']) {
    const failureContext = await newContext({ colorScheme: 'dark' });
    await failureContext.addInitScript(mode => {
      if (mode === 'blocked') Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } });
      else {
        const getItem = Storage.prototype.getItem;
        Storage.prototype.getItem = function (key) {
          if (key !== 'interface-atlas-play-preview') return getItem.call(this, key);
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
    assert.equal(await failurePage.locator('html').getAttribute('data-appearance'), 'light');
    await assertPageColor(failurePage, appearanceColors.light);
    await failurePage.locator('#density').selectOption('compact');
    await failurePage.locator('#motion').uncheck();
    await fillBrief(failurePage, { name: 'Storage failure sample', goal: 'Keep the local builder usable when preferences cannot be stored.', type: 'brand', deliverables: ['identity'] });
    await failurePage.locator('#review-brief').click();
    assert.equal(await failurePage.locator('#brief-builder').getAttribute('data-state'), 'review');
    await failureContext.close();
  }
  check('Blocked, invalid, and malformed storage retain defaults, usable preferences, and builder review');
  const noJsContext = await newContext({ javaScriptEnabled: false, colorScheme: 'dark', viewport: { width: 320, height: 1000 } });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(url);
  await reflow(noJsPage, 'No JavaScript at 320px');
  assert.equal(await noJsPage.locator('h1').count(), 1);
  assert.equal(await noJsPage.locator('#no-js-review').isVisible(), true, 'Static brief example remains readable');
  const noJsControls = await noJsPage.locator('button, select, input, textarea').evaluateAll(elements => elements.map(element => ({ id: element.id, disabled: element.matches(':disabled') })));
  assert.ok(noJsControls.length > 0);
  assert.deepEqual(noJsControls.filter(control => !control.disabled), [], 'All runtime controls need JavaScript');
  const noJsDisclosure = noJsPage.locator('#case-sprout');
  const noJsInitial = await noJsDisclosure.evaluate(element => element.open);
  await noJsDisclosure.locator('summary').click();
  assert.equal(await noJsDisclosure.evaluate(element => element.open), !noJsInitial);
  const noJsColors = await stateContrast(noJsPage, 'No-JavaScript static content');
  check('No-JavaScript static brief and native portfolio disclosures remain readable; all runtime controls stay disabled; text contrast passes', { contrast: noJsColors, disabledControls: noJsControls.length });
  await noJsContext.close();
  if (output) {
    await mkdir(output, { recursive: true });
    const captureContext = await newContext({ reducedMotion: 'reduce' });
    const capturePage = await captureContext.newPage();
    await capturePage.goto(url);
    for (const [appearance, width, filename] of [['light', 1440, 'light-desktop.png'], ['dark', 1440, 'dark-desktop.png'], ['light', 390, 'light-mobile.png']]) {
      await capturePage.setViewportSize({ width, height: 1000 });
      await capturePage.locator('#appearance').selectOption(appearance);
      await capturePage.locator('#density').selectOption('comfortable');
      if (appearance === 'dark') {
        await fillBrief(capturePage, { name: 'Daydream Studio', goal: 'Create a friendly portfolio that makes the studio work easy to explore.', type: 'brand', deliverables: ['identity', 'website'] });
        await capturePage.locator('#review-brief').click();
      }
      const section = appearance === 'light' && width > 390 ? '#portfolio' : '#brief';
      if (width > 390) {
        const bounds = await capturePage.locator(section).boundingBox();
        await capturePage.setViewportSize({ width, height: Math.max(1000, Math.ceil(bounds.height) + 2) });
        await capturePage.locator(section).evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY));
        await capturePage.locator(section).screenshot({ path: path.join(output, filename) });
      } else {
        await capturePage.locator(section).evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY));
        await capturePage.screenshot({ path: path.join(output, filename) });
      }
      if (appearance === 'dark') await capturePage.reload();
    }
    await captureContext.close();
  }
  assert.deepEqual(errors, [], 'Browser runtime errors');
  assert.deepEqual(external, [], 'Preview must not request external resources');
  assert.deepEqual(failedResources, [], 'Preview resources must load');
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
