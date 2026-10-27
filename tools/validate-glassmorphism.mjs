import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Original Atlas checks of a bounded composition specimen. Optional Playwright
// stays outside the preview's zero-dependency runtime.
const options = {};
for (let i = 2; i < process.argv.length; i += 2) {
  if (!['--module', '--browser', '--output', '--preview'].includes(process.argv[i]) || !process.argv[i + 1]) {
    throw new Error('Usage: node tools/validate-glassmorphism.mjs [--module path/to/playwright/index.mjs] [--browser path/to/chromium] [--output fresh-directory] [--preview directory]');
  }
  options[process.argv[i].slice(2)] = process.argv[i + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'styles/glassmorphism/preview'));
const output = path.resolve(options.output || path.join(os.tmpdir(), 'atlas-glass-' + Date.now()));
await mkdir(output, { recursive: false });
let playwright;
try { playwright = await import(options.module ? pathToFileURL(path.resolve(options.module)).href : 'playwright'); }
catch { throw new Error('Optional verification needs installed Playwright. Pass --module to its index.mjs. The preview itself needs no package.'); }
const ids = ['blueprint', 'botanical', 'editorial', 'gallery', 'layered', 'play', 'precision', 'pulse', 'swiss'];
const properties = ['--page', '--surface', '--raised', '--ink', '--muted', '--primary', '--on-primary', '--border', '--focus', '--error', '--theme-font', '--display-font', '--mono-font', '--card-radius', '--control-radius'];
const manifest = JSON.parse(await readFile(path.join(preview, 'theme-tokens.json'), 'utf8'));
assert.deepEqual(manifest.profiles.map(profile => profile.id).sort(), [...ids].sort(), 'All nine manifest identities');
const report = {
  schema_version: 1, scope: 'Glassmorphism applied to nine bounded reference-token profiles; existing theme apps are not re-audited',
  node: process.version, browser: null, startedAt: new Date().toISOString(), testedFiles: {}, profileSources: [], checks: [], matrix: [], identities: [], interactions: [], screenshots: [],
  runtimeErrors: [], externalRequests: [], resourceFailures: [], intentionalFailures: [],
  contrastMethod: 'Conservative sRGB channel bounds: every glass surface starts over an arbitrary [0,255]^3 backdrop; its actual computed alpha fill and descendant solid fills bound the resulting color. Gradients also reset to arbitrary bounds. Opaque foreground/background or disjoint luminance intervals give a lower-bound WCAG 2 ratio. Text requires 4.5:1 (3:1 for large text); enabled field boundaries and focus rings require 3:1. This is deliberately broader than the three rendered backdrops, not an opaque-token-only calculation or per-pixel antialiasing test.',
  limits: [
    'Chromium only. No screen reader, physical mobile/touch device, native zoom, text enlargement, other engine, or performance benchmark.',
    'Reference-token profiles preserve extracted palette, font-stack and radius values, not each theme’s complete composition, content, interactions, assets, density or typography scale. Fonts are named stacks with local fallbacks; no fonts are downloaded.',
    'Unsupported backdrop-filter is tested by removing CSS @supports branches through response substitution, exercising the shipped CSS base fallback. It does not emulate a different browser engine. Reduced-transparency support is probed through CDP; unsupported media is reported, not counted as a passing browser preference check.',
    'Contrast excludes hidden/disabled text, placeholder text, native select popup menus, checkbox glyph internals, SVG/decorative artwork, text antialiasing, and browser-native validation bubbles. Unsupported color/compositing constructs fail the measured scope instead of silently passing.',
    'Screenshot inspection is separate from automated assertions. The specimen is local, with no backend, account, storage, consequential command or external network dependency.'
  ]
};
for (const filename of ['index.html', 'styles.css', 'preview.js', 'theme-tokens.css', 'theme-tokens.json']) {
  report.testedFiles[filename] = createHash('sha256').update(await readFile(path.join(preview, filename))).digest('hex');
}
for (const profile of manifest.profiles) {
  const hash = createHash('sha256').update(await readFile(path.join(root, profile.source.file))).digest('hex');
  assert.equal(hash, profile.source.sha256, profile.id + ': profile source identity');
  report.profileSources.push({ id: profile.id, ...profile.source });
}
report.validatorSha256 = createHash('sha256').update(await readFile(fileURLToPath(import.meta.url))).digest('hex');
const prefix = '/atlas-composition/';
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (!pathname.startsWith(prefix)) { response.writeHead(404).end(); return; }
    const filename = path.resolve(preview, '.' + (pathname.slice(prefix.length - 1) === '/' ? '/index.html' : pathname.slice(prefix.length - 1)));
    const relative = path.relative(preview, filename);
    if (relative.startsWith('..') || path.isAbsolute(relative)) { response.writeHead(403).end(); return; }
    response.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream' }).end(await readFile(filename));
  } catch { response.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port;
const url = origin + prefix;
let browser;
function pass(name, details = true) { report.checks.push({ name, passed: true, details }); }
async function contextFor(options = {}, purpose = 'ordinary') {
  const context = await browser.newContext(options);
  context.on('request', request => { if (!request.url().startsWith(origin + '/')) report.externalRequests.push(request.url()); });
  context.on('requestfailed', request => (purpose === 'ordinary' ? report.resourceFailures : report.intentionalFailures).push({ purpose, url: request.url().replace(origin, ''), error: request.failure()?.errorText }));
  context.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) (purpose === 'ordinary' ? report.resourceFailures : report.intentionalFailures).push({ purpose, url: response.url().replace(origin, ''), status: response.status() }); });
  context.on('page', page => page.on('pageerror', error => report.runtimeErrors.push(error.message)));
  return context;
}
async function select(page, id, value) {
  await page.locator('#' + id).selectOption(value);
  const attribute = { 'theme-select': 'theme', appearance: 'appearance', transparency: 'transparency', background: 'background' }[id];
  await page.waitForFunction(({ attribute, value }) => document.documentElement.getAttribute('data-' + attribute) === value, { attribute, value });
}
async function metrics(page) {
  return page.evaluate(() => {
    const identify = el => el.id ? '#' + el.id : el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).join('.') : '');
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const parse = value => {
      let m = /^rgba?\(([^)]+)\)$/.exec(value);
      if (m) { const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p[3] ?? 1]; }
      m = /^color\(srgb\s+([^)]*)\)$/.exec(value);
      if (m) { const p = m[1].split(/[\s/]+/).filter(Boolean).map(Number); return [p[0] * 255, p[1] * 255, p[2] * 255, p[3] ?? 1]; }
      if (!CSS.supports('color', value)) throw new Error('Unsupported color: ' + value);
      ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = value; ctx.fillRect(0, 0, 1, 1);
      const p = [...ctx.getImageData(0, 0, 1, 1).data]; return [p[0], p[1], p[2], p[3] / 255];
    };
    const lum = rgb => rgb.slice(0, 3).map(c => { const v = c / 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
    const composite = (color, bound) => bound.map((v, i) => color[i] * color[3] + v * (1 - color[3]));
    const arbitrary = () => ({ low: [0, 0, 0], high: [255, 255, 255] });
    const over = (color, bounds) => ({ low: composite(color, bounds.low), high: composite(color, bounds.high) });
    const rangeRatio = (a, b) => {
      const al = lum(a.low), ah = lum(a.high), bl = lum(b.low), bh = lum(b.high);
      return al > bh ? (al + .05) / (bh + .05) : bl > ah ? (bl + .05) / (ah + .05) : 1;
    };
    const ancestors = el => { const result = []; for (let n = el; n; n = n.parentElement) result.unshift(n); return result; };
    const boundsFor = el => {
      let bounds = { low: [255, 255, 255], high: [255, 255, 255] };
      for (const ancestor of ancestors(el)) {
        const s = getComputedStyle(ancestor);
        if (Number(s.opacity) < 1 || s.mixBlendMode !== 'normal' || s.filter !== 'none') throw new Error('Unsupported opacity/blend/filter ancestor: ' + identify(ancestor));
        if (ancestor.matches('[data-glass],.glass-surface')) bounds = arbitrary();
        bounds = over(parse(s.backgroundColor), bounds);
        // An element's image is painted above its own background color.
        if (s.backgroundImage !== 'none') bounds = arbitrary();
      }
      return bounds;
    };
    const visible = el => el.getClientRects().length && getComputedStyle(el).visibility === 'visible' && !el.closest('[hidden]');
    const textFor = el => el.tagName === 'SELECT' ? el.selectedOptions[0]?.textContent :
      ['TEXTAREA', 'INPUT'].includes(el.tagName) ? el.value : [...el.childNodes].filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent.trim()).join(' ');
    const text = [], boundaries = [], failures = [], skipped = [];
    for (const el of document.body.querySelectorAll('*')) {
      if (el.namespaceURI !== 'http://www.w3.org/1999/xhtml' || ['SCRIPT', 'STYLE', 'OPTION', 'NOSCRIPT'].includes(el.tagName) || !visible(el)) continue;
      const label = textFor(el); if (!label || el.closest('[disabled]')) continue;
      const styles = ancestors(el).map(n => getComputedStyle(n));
      if (styles.some(s => s.clipPath === 'inset(50%)' || s.clip === 'rect(0px, 0px, 0px, 0px)')) { skipped.push(identify(el) + ': visually hidden'); continue; }
      const style = getComputedStyle(el), bg = boundsFor(el), fg = over(parse(style.color), bg);
      const required = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.6667 && parseInt(style.fontWeight) >= 700) ? 3 : 4.5;
      const ratio = rangeRatio(fg, bg);
      const sample = { selector: identify(el), text: label.slice(0, 55), ratio: +ratio.toFixed(3), required, backgroundLow: bg.low.map(v => +v.toFixed(2)), backgroundHigh: bg.high.map(v => +v.toFixed(2)), foreground: style.color };
      text.push(sample); if (ratio + 1e-6 < required) failures.push(sample);
    }
    for (const el of document.querySelectorAll('select:not(:disabled),input:not(:disabled),textarea:not(:disabled)')) {
      if (!visible(el) || ['checkbox', 'radio', 'hidden', 'submit', 'button'].includes(el.type)) continue;
      const s = getComputedStyle(el), bg = boundsFor(el), adjacent = boundsFor(el.parentElement), border = over(parse(s.borderTopColor), bg);
      const inside = rangeRatio(border, bg), outside = rangeRatio(border, adjacent), ratio = Math.min(inside, outside);
      const sample = { selector: identify(el), ratio: +ratio.toFixed(3), inside: +inside.toFixed(3), outside: +outside.toFixed(3), required: 3 };
      boundaries.push(sample); if (parseFloat(s.borderTopWidth) < 1 || s.borderTopStyle === 'none' || ratio + 1e-6 < 3) failures.push(sample);
    }
    const glasses = [...document.querySelectorAll('[data-glass],.glass-surface')].map(el => ({ selector: identify(el), fill: getComputedStyle(el).backgroundColor, alpha: parse(getComputedStyle(el).backgroundColor)[3], blur: getComputedStyle(el).backdropFilter }));
    const opaque = [...document.querySelectorAll('[data-opaque]')].filter(visible).map(el => ({ selector: identify(el), alpha: parse(getComputedStyle(el).backgroundColor)[3] }));
    const targets = [...document.querySelectorAll('button:not(:disabled),select:not(:disabled),input:not(:disabled),textarea:not(:disabled),summary')].filter(visible).map(el => { const r = el.getBoundingClientRect(); return { selector: identify(el), width: +r.width.toFixed(2), height: +r.height.toFixed(2) }; });
    const active = document.activeElement;
    let focus = null;
    if (active && active !== document.body && active.matches(':focus-visible')) {
      const s = getComputedStyle(active), adjacent = boundsFor(active.parentElement), ring = over(parse(s.outlineColor), adjacent);
      focus = { selector: identify(active), width: parseFloat(s.outlineWidth), style: s.outlineStyle, offset: parseFloat(s.outlineOffset), ratio: +rangeRatio(ring, adjacent).toFixed(3), required: 3 };
    }
    return { textSamples: text.length, boundarySamples: boundaries.length, minimumTextRatio: Math.min(...text.map(x => x.ratio)), minimumBoundaryRatio: Math.min(...boundaries.map(x => x.ratio)), failures, skipped, glasses, opaque, targets, focus, reflow: { viewport: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth } };
  });
}
async function checkedMetrics(page, name, { opaque = false, fallback = false } = {}) {
  const data = await metrics(page);
  assert.ok(data.textSamples > 0 && (fallback || data.boundarySamples >= 4), name + ': measured nonempty scope');
  assert.deepEqual(data.failures, [], name + ': contrast ' + JSON.stringify(data.failures));
  assert.ok(data.reflow.scroll <= data.reflow.viewport + 1, name + ': horizontal page overflow');
  assert.ok(data.glasses.length >= 1 && data.opaque.length >= 1, name + ': glass and opaque specimens present');
  assert.ok(data.opaque.every(x => x.alpha === 1), name + ': essential data/form surfaces opaque');
  assert.ok(data.targets.every(x => x.width >= 43.99 && x.height >= 43.99), name + ': 44px control targets ' + JSON.stringify(data.targets));
  if (opaque) assert.ok(data.glasses.every(x => x.alpha === 1 && x.blur === 'none'), name + ': opaque fallback disables blur');
  return { textSamples: data.textSamples, boundarySamples: data.boundarySamples, minimumTextRatio: data.minimumTextRatio, minimumBoundaryRatio: data.minimumBoundaryRatio, reflow: data.reflow, glass: data.glasses, opaqueCount: data.opaque.length, skipped: data.skipped };
}
async function screenshot(page, filename) { await page.screenshot({ path: path.join(output, filename), fullPage: true }); report.screenshots.push(filename); }
function removeSupports(source) {
  // Remove whole @supports groups without changing their base rules. Handle nested
  // blocks, comments and quoted strings rather than using an unbalanced regex.
  let result = '', cursor = 0;
  for (;;) {
    const start = source.indexOf('@supports', cursor);
    if (start < 0) return result + source.slice(cursor);
    result += source.slice(cursor, start); let i = source.indexOf('{', start), depth = 1, quote = null, comment = false;
    if (i < 0) throw new Error('Malformed @supports block');
    for (i++; i < source.length && depth; i++) {
      const c = source[i], next = source[i + 1];
      if (comment) { if (c === '*' && next === '/') { comment = false; i++; } continue; }
      if (quote) { if (c === '\\') i++; else if (c === quote) quote = null; continue; }
      if (c === '/' && next === '*') { comment = true; i++; } else if (c === '"' || c === "'") quote = c; else if (c === '{') depth++; else if (c === '}') depth--;
    }
    if (depth) throw new Error('Unbalanced @supports block'); cursor = i;
  }
}
try {
  browser = await playwright.chromium.launch({ headless: true, ...(options.browser ? { executablePath: path.resolve(options.browser) } : {}) });
  report.browser = await browser.version();
  const context = await contextFor({ viewport: { width: 1280, height: 900 }, colorScheme: 'light' });
  const page = await context.newPage(); await page.goto(url);
  assert.deepEqual(await page.locator('#theme-select option').evaluateAll(els => els.map(el => el.value).sort()), [...ids].sort());
  assert.equal(await page.locator('h1').count(), 1); assert.equal(await page.locator('main').count(), 1);
  assert.equal(await page.locator('[tabindex]').evaluateAll(els => els.filter(el => Number(el.getAttribute('tabindex')) > 0).length), 0);
  assert.ok(await page.locator('select,input,textarea').evaluateAll(els => els.every(el => el.labels?.length > 0)));
  pass('Nine selectable profiles; native labels, single h1/main and no positive tabindex');
  for (const theme of ids) for (const appearance of ['light', 'dark']) {
    await select(page, 'theme-select', theme); await select(page, 'appearance', appearance);
    const values = await page.locator('html').evaluate((el, keys) => Object.fromEntries(keys.map(key => [key, getComputedStyle(el).getPropertyValue(key).trim()])), properties);
    assert.ok(Object.values(values).every(Boolean), theme + ': all source-derived profile variables present');
    assert.deepEqual(values, manifest.profiles.find(profile => profile.id === theme).tokens[appearance], theme + '/' + appearance + ': computed profile equals source-mapped tokens');
    report.identities.push({ theme, appearance, values });
    for (const background of ['calm', 'bright', 'busy']) for (const transparency of ['auto', 'opaque']) for (const width of [1280, 320]) {
      await page.setViewportSize({ width, height: 900 }); await select(page, 'background', background); await select(page, 'transparency', transparency);
      const name = [theme, appearance, background, transparency, width].join('/');
      try {
        const data = await checkedMetrics(page, name, { opaque: transparency === 'opaque' });
        report.matrix.push({ theme, appearance, background, transparency, width, passed: true, ...data });
      } catch (error) { report.matrix.push({ theme, appearance, background, transparency, width, passed: false, failure: error.message }); }
    }
    if (['blueprint', 'layered', 'swiss'].includes(theme)) { await select(page, 'transparency', 'auto'); await screenshot(page, theme + '-' + appearance + '-busy-320.png'); }
  }
  assert.equal(report.matrix.length, 216);
  assert.deepEqual(report.matrix.filter(x => !x.passed), [], 'Composition matrix failures');
  assert.equal(new Set(report.identities.filter(x => x.appearance === 'light').map(x => JSON.stringify(x.values))).size, 9, 'Theme profiles differ by actual tokens');
  pass('216 composition states pass bounded text/field contrast, 320/1280px reflow, 44px controls and opaque essential surfaces');
  await page.setViewportSize({ width: 1280, height: 900 }); await select(page, 'theme-select', 'layered'); await select(page, 'appearance', 'light'); await select(page, 'transparency', 'auto');
  await page.reload(); await page.keyboard.press('Tab');
  assert.match(await page.evaluate(() => document.activeElement?.getAttribute('href') || ''), /^#/);
  await page.keyboard.press('Enter'); assert.equal(await page.evaluate(() => document.activeElement?.tagName), 'MAIN');
  await page.locator('#theme-select').focus(); await page.keyboard.press('Tab'); assert.equal(await page.evaluate(() => document.activeElement?.id), 'appearance');
  const focus = await page.locator('#appearance').evaluate(el => { const s = getComputedStyle(el); return { visible: el.matches(':focus-visible'), width: s.outlineWidth, style: s.outlineStyle, color: s.outlineColor }; });
  assert.ok(focus.visible && focus.style !== 'none' && parseFloat(focus.width) >= 2);
  const focusSamples = [];
  for (const theme of ids) for (const appearance of ['light', 'dark']) {
    await select(page, 'theme-select', theme); await select(page, 'appearance', appearance);
    await page.locator('#theme-select').focus(); await page.keyboard.press('Tab');
    const sample = (await metrics(page)).focus;
    assert.ok(sample && sample.width >= 2 && sample.style !== 'none' && sample.offset >= 0 && sample.ratio >= 3, theme + '/' + appearance + ': focus contrast ' + JSON.stringify(sample));
    focusSamples.push({ theme, appearance, ...sample });
    for (const [key, label] of [['context', 'Context card'], ['content', 'Reading surface'], ['navigation', 'Navigation chrome']]) {
      const trigger = page.locator('[data-surface-choice="' + key + '"]').first();
      await trigger.focus(); await page.keyboard.press('Space');
      assert.equal(await trigger.evaluate(el => document.activeElement === el), true, 'Surface choice keeps focus');
      assert.equal(await page.locator('#current-surface').textContent(), label);
      assert.equal(await page.locator('[data-surface-choice="' + key + '"][aria-pressed="true"]').count(), 2);
      assert.equal(await page.locator('[data-surface-row="' + key + '"]').getAttribute('data-selected'), 'true');
      const data = await checkedMetrics(page, theme + '/' + appearance + '/surface-' + key);
      report.interactions.push({ theme, appearance, state: 'surface-' + key, minimumTextRatio: data.minimumTextRatio, minimumBoundaryRatio: data.minimumBoundaryRatio });
    }
    await page.locator('#project-title').fill(''); await page.locator('#review-project').click();
    assert.equal(await page.locator('#project-title').getAttribute('aria-invalid'), 'true');
    assert.ok((await page.locator('#project-title').getAttribute('aria-describedby')).includes('title-error'));
    assert.equal(await page.locator('#title-error').isVisible(), true);
    const errorData = await checkedMetrics(page, theme + '/' + appearance + '/title-error');
    report.interactions.push({ theme, appearance, state: 'title-error', minimumTextRatio: errorData.minimumTextRatio, minimumBoundaryRatio: errorData.minimumBoundaryRatio });
    await page.locator('#reset-project').click();
    assert.equal(await page.locator('#project-title').inputValue(), 'Horizon archive');
    assert.equal(await page.locator('#project-title').getAttribute('aria-invalid'), null);
  }
  pass('Settings-select keyboard ring is visible and conservatively 3:1 against its adjacent opaque surface for all nine light/dark profiles', focusSamples);
  pass('All nine light/dark profiles support keyboard surface selection and associated title errors with preserved focus, reset recovery and checked contrast', { states: report.interactions.length });
  await page.locator('#project-title').fill(''); await page.locator('#review-project').click();
  assert.equal(await page.locator('#project-title').evaluate(el => el.validity.valueMissing && document.activeElement === el), true);
  await page.locator('#project-title').fill('ab'); await page.locator('#project-title').press('End'); await page.keyboard.type('c'); await page.keyboard.press('Backspace'); await page.locator('#review-project').click();
  assert.equal(await page.locator('#project-title').evaluate(el => el.validity.tooShort), true);
  await page.locator('#project-title').fill('Reading room'); await page.locator('#project-note').fill('A quiet local specimen'); await page.locator('#review-project').click();
  assert.match(await page.locator('#review-status').textContent(), /Reading room/);
  await screenshot(page, 'form-keyboard-desktop.png');
  pass('Skip link, native select Tab order, visible keyboard outline, required/minlength validation and local form result', { focus });
  await select(page, 'appearance', 'system'); await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForFunction(() => getComputedStyle(document.documentElement).colorScheme.includes('dark'));
  const darkPage = await page.locator('html').evaluate(el => getComputedStyle(el).getPropertyValue('--page').trim());
  await page.emulateMedia({ colorScheme: 'light' });
  await page.waitForFunction(dark => getComputedStyle(document.documentElement).getPropertyValue('--page').trim() !== dark, darkPage);
  pass('System appearance follows live light/dark changes');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches), true);
  assert.deepEqual(await page.evaluate(() => document.getAnimations().filter(a => ['running', 'paused', 'pending'].includes(a.playState)).map(a => a.playState)), []);
  pass('Reduced-motion emulation has no active animations');
  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-transparency', value: 'reduce' }] });
  const reducedTransparency = await page.evaluate(() => ({ supported: matchMedia('(prefers-reduced-transparency)').media !== 'not all', matches: matchMedia('(prefers-reduced-transparency: reduce)').matches }));
  if (reducedTransparency.matches) {
    await page.waitForTimeout(50); await checkedMetrics(page, 'reduced-transparency', { opaque: true }); pass('Reduced-transparency CDP media emulation uses opaque surfaces', reducedTransparency);
  } else report.checks.push({ name: 'Reduced-transparency browser media', passed: null, supported: false, details: reducedTransparency });
  await context.close();
  const forcedContext = await contextFor({ viewport: { width: 320, height: 900 }, forcedColors: 'active', colorScheme: 'dark' });
  const forced = await forcedContext.newPage(); await forced.goto(url);
  const forcedData = await checkedMetrics(forced, 'forced-colors', { opaque: true });
  await forced.locator('#theme-select').focus(); await forced.keyboard.press('Tab');
  assert.ok(await forced.locator('#appearance').evaluate(el => getComputedStyle(el).outlineStyle !== 'none'));
  await screenshot(forced, 'forced-colors-320.png'); pass('Forced colors preserves opaque surfaces, usable controls, focus and narrow reflow', forcedData);
  await forcedContext.close();
  for (const mode of ['javascript-disabled', 'script-blocked', 'backdrop-support-branch-removed']) {
    const fallbackContext = await contextFor({ viewport: { width: 320, height: 900 }, javaScriptEnabled: mode !== 'javascript-disabled' }, mode === 'script-blocked' ? mode : 'ordinary');
    if (mode === 'script-blocked') await fallbackContext.route('**/preview.js', route => route.abort('failed'));
    if (mode === 'backdrop-support-branch-removed') await fallbackContext.route('**/styles.css', async route => { const response = await route.fetch(); const source = await response.text(); assert.match(source, /@supports/); await route.fulfill({ response, body: removeSupports(source) }); });
    const fallback = await fallbackContext.newPage(); await fallback.goto(url);
    if (mode !== 'backdrop-support-branch-removed') {
      assert.equal(await fallback.locator('#theme-select:disabled,#appearance:disabled,#transparency:disabled,#background:disabled').count(), 4);
      assert.ok(await fallback.locator('main h1,main h2').count() >= 1);
      assert.ok(await fallback.locator('a[href]:visible').count() > 0);
    }
    const data = await checkedMetrics(fallback, mode, { opaque: mode === 'backdrop-support-branch-removed', fallback: mode !== 'backdrop-support-branch-removed' });
    await screenshot(fallback, mode + '-320.png'); pass(mode + ' preserves readable content and native structure', data); await fallbackContext.close();
  }
  assert.deepEqual(report.runtimeErrors, []); assert.deepEqual(report.externalRequests, []); assert.deepEqual(report.resourceFailures, []);
  pass('Subpath preview has no ordinary runtime/resource errors or external requests');
  report.passed = true;
} catch (error) { report.passed = false; report.failure = { message: error.message, stack: error.stack }; process.exitCode = 1; }
finally {
  await browser?.close(); await new Promise(resolve => server.close(resolve)); report.finishedAt = new Date().toISOString();
  await writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify({ passed: report.passed, checks: report.checks.length, states: report.matrix.length, failedStates: report.matrix.filter(x => !x.passed).length, output, failure: report.failure?.message }) + '\n');
}
