import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Original Atlas checks of one bounded composition, using optional Playwright.
const options = {};
for (let i = 2; i < process.argv.length; i += 2) {
  if (!['--module', '--browser', '--output', '--preview'].includes(process.argv[i]) || !process.argv[i + 1]) {
    throw new Error('Usage: node tools/validate-neobrutalism.mjs [--module path/to/playwright/index.mjs] [--browser path/to/chromium] [--output fresh-directory] [--preview directory]');
  }
  options[process.argv[i].slice(2)] = process.argv[i + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'styles/neobrutalism/preview'));
const output = path.resolve(options.output || path.join(os.tmpdir(), 'atlas-neo-' + Date.now()));
await mkdir(output, { recursive: false });
let playwright;
try { playwright = await import(options.module ? pathToFileURL(path.resolve(options.module)).href : 'playwright'); }
catch { throw new Error('Optional verification needs installed Playwright. Pass --module to its index.mjs. The preview itself needs no package.'); }
const ids = ['blueprint', 'botanical', 'editorial', 'gallery', 'layered', 'play', 'precision', 'pulse', 'swiss'];
const properties = ['--page', '--surface', '--raised', '--ink', '--muted', '--primary', '--on-primary', '--border', '--focus', '--error', '--theme-font', '--display-font', '--mono-font', '--card-radius', '--control-radius'];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const manifest = JSON.parse(await readFile(path.join(preview, 'theme-tokens.json'), 'utf8'));
assert.deepEqual(manifest.profiles.map(profile => profile.id).sort(), [...ids].sort(), 'Nine manifest profiles');
const report = {
  schema_version: 1, scope: 'Neobrutalism on nine bounded palette/font/corner profiles; complete existing theme apps are outside this evaluation',
  node: process.version, browser: null, startedAt: new Date().toISOString(), testedFiles: {}, validatorSha256: hash(await readFile(fileURLToPath(import.meta.url))),
  profileSources: [], identities: [], checks: [], matrix: [], interactions: [], screenshots: [], runtimeErrors: [], externalRequests: [], resourceFailures: [], intentionalFailures: [],
  contrastMethod: 'Actual computed sRGB foreground, background and border colors, composited through opaque/transparent ancestor fills. No gradients, whole-element opacity, filters or blend modes are accepted in the measured path. Visible HTML text requires 4.5:1 (large text 3:1); field border against both fill and parent requires 3:1; buttons require a border or fill distinguishable from their parent at 3:1. External keyboard outline is measured against its adjacent parent at 3:1. Every measured sample is retained in the raw report.',
  limits: [
    'Chromium only; no screen reader, physical device, other browser engine, native zoom/text enlargement, backend or performance benchmark.',
    'Profiles preserve 15 extracted palette aliases, named body/display/mono stacks and panel/control corners, not full theme composition, typography scales, assets, interactions or density. Font binaries are not downloaded.',
    'Contrast excludes hidden/placeholder text, native select popups, browser validation bubbles, glyph internals, SVG/decorative content and antialiasing. Unsupported constructs in measured scope fail rather than silently passing.',
    'A semantic native control, arithmetic pass or bounded screenshot is not full accessibility conformance. Design-fit judgments are reasoned source reviews, separate from browser behavior.',
    'Screenshots remain temporary. No account, backend, agent authority or external network dependency is present.'
  ]
};
for (const name of ['index.html', 'styles.css', 'preview.js', 'theme-tokens.css', 'theme-tokens.json']) report.testedFiles[name] = hash(await readFile(path.join(preview, name)));
for (const profile of manifest.profiles) {
  assert.equal(hash(await readFile(path.join(root, profile.source.file))), profile.source.sha256, profile.id + ': source CSS fingerprint');
  report.profileSources.push({ id: profile.id, ...profile.source });
}
const prefix = '/atlas-composition/';
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (!pathname.startsWith(prefix)) { response.writeHead(404).end(); return; }
    const relativeUrl = pathname.slice(prefix.length) || 'index.html';
    const filename = path.resolve(preview, relativeUrl), relative = path.relative(preview, filename);
    if (relative.startsWith('..') || path.isAbsolute(relative)) { response.writeHead(403).end(); return; }
    response.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream' }).end(await readFile(filename));
  } catch { response.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port, url = origin + prefix;
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
  const attribute = { 'theme-select': 'theme', appearance: 'appearance', motion: 'motion' }[id];
  if (attribute) await page.waitForFunction(({ attribute, value }) => document.documentElement.getAttribute('data-' + attribute) === value, { attribute, value });
}
async function metrics(page) {
  return page.evaluate(() => {
    const identify = el => el.id ? '#' + el.id : el.tagName.toLowerCase() + (el.dataset.ideaId ? '[data-idea-id="' + el.dataset.ideaId + '"]' : typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).join('.') : '');
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
    const ratio = (a, b) => (Math.max(lum(a), lum(b)) + .05) / (Math.min(lum(a), lum(b)) + .05);
    const over = (a, b) => b.map((v, i) => a[i] * a[3] + v * (1 - a[3]));
    const ancestors = el => { const result = []; for (let n = el; n; n = n.parentElement) result.unshift(n); return result; };
    const background = el => {
      let rgb = [255, 255, 255];
      for (const node of ancestors(el)) {
        const s = getComputedStyle(node);
        if (Number(s.opacity) < 1 || s.mixBlendMode !== 'normal' || s.filter !== 'none' || s.backgroundImage !== 'none') throw new Error('Unsupported measured compositing: ' + identify(node));
        rgb = over(parse(s.backgroundColor), rgb);
      }
      return rgb;
    };
    const visible = el => el.getClientRects().length && getComputedStyle(el).visibility === 'visible' && !el.closest('[hidden]');
    const textFor = el => el.tagName === 'SELECT' ? el.selectedOptions[0]?.textContent : ['TEXTAREA', 'INPUT'].includes(el.tagName) ? el.value : [...el.childNodes].filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent.trim()).join(' ');
    const text = [], boundaries = [], failures = [], skipped = [];
    for (const el of document.body.querySelectorAll('*')) {
      if (el.namespaceURI !== 'http://www.w3.org/1999/xhtml' || ['SCRIPT', 'STYLE', 'OPTION', 'NOSCRIPT'].includes(el.tagName) || !visible(el) || el.closest('[aria-hidden=true]')) continue;
      const label = textFor(el); if (!label) continue;
      const styles = ancestors(el).map(n => getComputedStyle(n));
      if (styles.some(s => s.clipPath === 'inset(50%)' || s.clip === 'rect(0px, 0px, 0px, 0px)')) { skipped.push(identify(el) + ': visually hidden'); continue; }
      const s = getComputedStyle(el), bg = background(el), fg = over(parse(s.color), bg);
      const required = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.6667 && parseInt(s.fontWeight) >= 700) ? 3 : 4.5;
      const sample = { selector: identify(el), text: label.slice(0, 80), ratio: +ratio(fg, bg).toFixed(3), required, foreground: s.color, background: bg };
      text.push(sample); if (sample.ratio + 1e-6 < required) failures.push(sample);
    }
    const targets = [];
    for (const el of document.querySelectorAll('button:not(:disabled),select:not(:disabled),input:not(:disabled),textarea:not(:disabled)')) {
      if (!visible(el) || el.closest('fieldset:disabled') || ['checkbox', 'radio', 'hidden'].includes(el.type)) continue;
      const s = getComputedStyle(el), bg = background(el), adjacent = background(el.parentElement), border = over(parse(s.borderTopColor), bg);
      const inside = ratio(border, bg), outside = ratio(border, adjacent), fill = ratio(bg, adjacent);
      const isButton = el.tagName === 'BUTTON' || ['submit', 'button', 'reset'].includes(el.type);
      const result = isButton ? Math.max(outside, fill) : Math.min(inside, outside);
      const sample = { selector: identify(el), kind: isButton ? 'button' : 'field', ratio: +result.toFixed(3), inside: +inside.toFixed(3), outside: +outside.toFixed(3), fill: +fill.toFixed(3), required: 3 };
      boundaries.push(sample); if (parseFloat(s.borderTopWidth) < 1 || s.borderTopStyle === 'none' || result + 1e-6 < 3) failures.push(sample);
      const r = el.getBoundingClientRect(); targets.push({ selector: identify(el), width: +r.width.toFixed(2), height: +r.height.toFixed(2) });
    }
    const surfaces = [...document.querySelectorAll('.hard-surface,.button')].filter(visible).map(el => {
      const s = getComputedStyle(el); return { selector: identify(el), alpha: parse(s.backgroundColor)[3], borderWidth: parseFloat(s.borderTopWidth), borderColor: s.borderTopColor, inkBoundary: ratio(parse(s.borderTopColor), parse(getComputedStyle(document.documentElement).getPropertyValue('--ink'))) < 1.001, shadow: s.boxShadow, shadowLengths: (s.boxShadow.match(/-?\d+(?:\.\d+)?px/g) || []).map(parseFloat), blur: s.backdropFilter, radius: s.borderRadius, transform: s.transform, transition: s.transitionDuration };
    });
    let focus = null;
    const active = document.activeElement;
    if (active && active !== document.body && active.matches(':focus-visible')) {
      const s = getComputedStyle(active), bg = background(active.parentElement), ring = over(parse(s.outlineColor), bg), r = active.getBoundingClientRect(), extent = parseFloat(s.outlineWidth) + parseFloat(s.outlineOffset);
      const clippedBy = ancestors(active.parentElement).filter(el => { const p = getComputedStyle(el), b = el.getBoundingClientRect(); return ['hidden', 'clip'].includes(p.overflowX) && (r.left - extent < b.left || r.right + extent > b.right) || ['hidden', 'clip'].includes(p.overflowY) && (r.top - extent < b.top || r.bottom + extent > b.bottom); }).map(identify);
      focus = { selector: identify(active), width: parseFloat(s.outlineWidth), style: s.outlineStyle, offset: parseFloat(s.outlineOffset), ratio: +ratio(ring, bg).toFixed(3), clippedBy };
    }
    return { text, boundaries, failures, skipped, targets, surfaces, focus, reflow: { viewport: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth } };
  });
}
async function checkedMetrics(page, name, { fallback = false, forced = false, focus = false } = {}) {
  const data = await metrics(page);
  assert.ok(data.text.length > 0 && (fallback || data.boundaries.length >= 7), name + ': measured nonempty scope');
  assert.deepEqual(data.failures, [], name + ': contrast ' + JSON.stringify(data.failures));
  assert.ok(data.reflow.scroll <= data.reflow.viewport + 1, name + ': whole-page horizontal overflow');
  assert.ok(data.surfaces.length >= 1, name + ': style specimens present');
  assert.ok(data.surfaces.every(s => s.alpha === 1 && s.blur === 'none'), name + ': opaque, unblurred treatment');
  if (!forced) assert.ok(data.surfaces.every(s => s.borderWidth === 2 && s.inkBoundary && JSON.stringify(s.shadowLengths) === '[4,4,0,0]'), name + ': 2px ink outline and 4px zero-blur shadow');
  assert.ok(data.targets.every(t => t.width >= 43.99 && t.height >= 43.99), name + ': 44px targets ' + JSON.stringify(data.targets));
  if (focus) {
    assert.ok(data.focus && data.focus.width >= 2 && data.focus.style !== 'none' && data.focus.ratio >= 3, name + ': visible keyboard outline ' + JSON.stringify(data.focus));
    assert.deepEqual(data.focus.clippedBy, [], name + ': focus not clipped by ancestors');
  }
  return data;
}
async function screenshot(page, name) { await page.screenshot({ path: path.join(output, name), fullPage: true }); report.screenshots.push(name); }
async function capture(page, theme, appearance, state, options = {}) {
  const name = [theme, appearance, state].join('/');
  try { const data = await checkedMetrics(page, name, options); report.interactions.push({ theme, appearance, state, passed: true, ...data }); }
  catch (error) { report.interactions.push({ theme, appearance, state, passed: false, failure: error.message }); }
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
  pass('Nine actual profiles; native labels, one h1/main and no positive tabindex');
  for (const theme of ids) for (const appearance of ['light', 'dark']) {
    await select(page, 'theme-select', theme); await select(page, 'appearance', appearance);
    const values = await page.locator('html').evaluate((el, keys) => Object.fromEntries(keys.map(key => [key, getComputedStyle(el).getPropertyValue(key).trim()])), properties);
    assert.deepEqual(values, manifest.profiles.find(profile => profile.id === theme).tokens[appearance], theme + '/' + appearance + ': computed source-mapped values');
    report.identities.push({ theme, appearance, values });
    for (const width of [320, 1280]) for (const motion of ['off', 'on']) {
      await page.setViewportSize({ width, height: 900 }); await select(page, 'motion', motion); await page.mouse.move(0, 0);
      const name = [theme, appearance, width, motion].join('/');
      try { const data = await checkedMetrics(page, name); report.matrix.push({ theme, appearance, width, motion, passed: true, ...data }); }
      catch (error) { report.matrix.push({ theme, appearance, width, motion, passed: false, failure: error.message }); }
    }
    await select(page, 'motion', 'off'); await page.setViewportSize({ width: 320, height: 900 });
    const card = page.locator('[data-idea-id="open-table"]');
    await card.click(); assert.equal(await card.getAttribute('aria-pressed'), 'true');
    assert.match(await card.locator('.card-state').textContent(), /selected/i);
    assert.match(await page.locator('#selection-title').textContent(), /open table/i);
    await capture(page, theme, appearance, 'selected');
    await page.locator('#brief-title').fill(''); await page.locator('#brief-form button[type="submit"]').click();
    assert.equal(await page.locator('#brief-title').getAttribute('aria-invalid'), 'true');
    assert.ok((await page.locator('#brief-title').getAttribute('aria-describedby')).split(/\s+/).includes('brief-error'));
    assert.equal(await page.locator('#brief-error').isVisible(), true);
    await capture(page, theme, appearance, 'invalid');
    await page.locator('#brief-reset').click();
    await card.hover();
    assert.ok(await card.evaluate(el => el.matches(':hover')), 'Actual hovered card');
    assert.ok(await card.locator('.card-state').evaluate(el => getComputedStyle(el).textDecorationLine.includes('underline')), 'Hover has static underline feedback');
    await capture(page, theme, appearance, 'hover');
    await page.mouse.down();
    assert.ok(await card.evaluate(el => el.matches(':active') && getComputedStyle(el).transform === 'none'), 'Actual active card remains static with motion off');
    assert.equal(await card.locator('.card-title').evaluate(el => getComputedStyle(el).textDecorationThickness), '3px');
    await capture(page, theme, appearance, 'active'); await page.mouse.up(); await page.mouse.move(0, 0);
    for (const selector of ['#theme-select', '#brief-title', '[data-idea-id="open-table"]', '#brief-form button[type="submit"]']) {
      await page.keyboard.press('Tab'); await page.locator(selector).focus();
      await capture(page, theme, appearance, 'focus:' + selector, { focus: true });
    }
    if (['play', 'swiss', 'botanical'].includes(theme)) await screenshot(page, theme + '-' + appearance + '-320.png');
  }
  assert.equal(report.matrix.length, 72); assert.deepEqual(report.matrix.filter(row => !row.passed), [], 'Composition matrix failures');
  assert.equal(new Set(report.identities.filter(x => x.appearance === 'light').map(x => JSON.stringify(x.values))).size, 9, 'Nine actual distinct profiles');
  pass('72 matrix states: computed text/control contrast, 320/1280px reflow, 44px targets and opaque outlined surfaces');
  assert.equal(report.interactions.length, 144); assert.deepEqual(report.interactions.filter(row => !row.passed), [], 'Selected, invalid, hover, active and keyboard-focus state failures');
  pass('144 measured interaction states across every light/dark profile');
  await select(page, 'theme-select', 'play'); await select(page, 'appearance', 'light'); await page.setViewportSize({ width: 1280, height: 900 });
  await page.reload(); await page.keyboard.press('Tab');
  assert.match(await page.evaluate(() => document.activeElement?.getAttribute('href') || ''), /^#/);
  await page.keyboard.press('Enter'); assert.equal(await page.evaluate(() => document.activeElement?.id), 'main');
  await page.locator('[data-idea-id="open-table"]').focus(); await page.keyboard.press('Space');
  assert.equal(await page.locator('[data-idea-id="open-table"]').getAttribute('aria-pressed'), 'true');
  await page.locator('#idea-filter').fill('no matches at all'); assert.equal(await page.locator('#empty-state').isVisible(), true);
  assert.equal(await page.locator('.idea-card:visible').count(), 0); assert.match(await page.locator('#selection-title').textContent(), /open table/i);
  await page.locator('#empty-reset').click(); assert.equal(await page.locator('.idea-card:visible').count(), 4); assert.equal(await page.evaluate(() => document.activeElement?.id), 'idea-filter');
  await select(page, 'track-filter', 'print'); assert.ok(await page.locator('.idea-card:visible').count() >= 1); assert.match(await page.locator('#selection-title').textContent(), /open table/i); assert.match(await page.locator('#selection-status').textContent(), /hidden|remains/i);
  await page.locator('#filter-reset').click();
  pass('Keyboard inspection, empty/filter recovery and retained selected detail');
  await page.locator('#brief-title').fill('ab'); await page.locator('#brief-form button[type="submit"]').click();
  assert.equal(await page.locator('#brief-title').getAttribute('aria-invalid'), 'true');
  await page.locator('#brief-title').fill('Local zine room'); await page.locator('#brief-note').fill('Keep this draft across preferences.'); await select(page, 'brief-track', 'print');
  await page.locator('#brief-form button[type="submit"]').click(); assert.match(await page.locator('#brief-status').textContent(), /Local zine room/);
  const retained = await page.locator('#selection-title').textContent();
  await page.locator('#idea-filter').fill('ink'); await select(page, 'theme-select', 'botanical'); await select(page, 'appearance', 'dark'); await select(page, 'motion', 'on');
  assert.equal(await page.locator('#brief-title').inputValue(), 'Local zine room'); assert.equal(await page.locator('#brief-note').inputValue(), 'Keep this draft across preferences.');
  assert.equal(await page.locator('#brief-track').inputValue(), 'print'); assert.equal(await page.locator('#idea-filter').inputValue(), 'ink'); assert.equal(await page.locator('#selection-title').textContent(), retained);
  await screenshot(page, 'desktop-local-review.png');
  pass('Minimum-length validation, valid local review and draft/filter/selection retention across all style preferences');
  await select(page, 'appearance', 'system'); await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForFunction(() => getComputedStyle(document.documentElement).colorScheme.includes('dark'));
  const dark = await page.locator('html').evaluate(el => getComputedStyle(el).getPropertyValue('--page').trim());
  await page.emulateMedia({ colorScheme: 'light' }); await page.waitForFunction(value => getComputedStyle(document.documentElement).getPropertyValue('--page').trim() !== value, dark);
  pass('System appearance follows live OS changes');
  await page.locator('#filter-reset').click(); await select(page, 'motion', 'on');
  const motionCard = page.locator('[data-idea-id="open-table"]');
  await motionCard.hover(); await page.mouse.down(); await page.waitForTimeout(130);
  const optionalPress = await motionCard.evaluate(el => ({ active: el.matches(':active'), transform: getComputedStyle(el).transform, shadow: getComputedStyle(el).boxShadow }));
  assert.equal(optionalPress.active, true); assert.equal(optionalPress.transform, 'matrix(1, 0, 0, 1, 2, 2)'); assert.match(optionalPress.shadow, /2px 2px 0px 0px/);
  await page.mouse.up(); await page.emulateMedia({ reducedMotion: 'reduce' });
  await motionCard.hover(); await page.mouse.down();
  const reduced = await motionCard.evaluate(el => ({ active: el.matches(':active'), transform: getComputedStyle(el).transform, duration: getComputedStyle(el).transitionDuration, animations: document.getAnimations().filter(a => ['running', 'paused', 'pending'].includes(a.playState)).length }));
  assert.equal(reduced.active, true); assert.equal(reduced.transform, 'none'); assert.ok(reduced.duration.split(',').every(v => parseFloat(v) === 0)); assert.equal(reduced.animations, 0);
  await page.mouse.up(); pass('Optional 2px active press and OS reduced-motion override of explicit motion-on', { optionalPress, reduced });
  await context.close();
  const forcedContext = await contextFor({ viewport: { width: 320, height: 900 }, forcedColors: 'active', colorScheme: 'dark' });
  const forced = await forcedContext.newPage(); await forced.goto(url); await select(forced, 'theme-select', 'play'); await select(forced, 'appearance', 'dark');
  const forcedTokens = await forced.locator('html').evaluate(el => Object.fromEntries(['--page', '--surface', '--raised', '--ink', '--primary', '--on-primary', '--focus', '--error'].map(key => [key, getComputedStyle(el).getPropertyValue(key).trim()])));
  assert.ok(/Canvas/i.test(forcedTokens['--page']) && /CanvasText/i.test(forcedTokens['--ink']) && /Highlight/i.test(forcedTokens['--focus']), 'Forced-color system role tokens outrank selected profiles');
  await forced.keyboard.press('Tab'); await forced.locator('#brief-title').focus();
  const forcedData = await checkedMetrics(forced, 'forced-colors', { forced: true, focus: true });
  assert.ok(forcedData.surfaces.every(s => s.shadow === 'none'), 'Forced colors removes decorative shadows');
  await screenshot(forced, 'forced-colors-320.png'); pass('Forced-color system roles, narrow reflow, contrast, focus and shadow removal', { forcedTokens, metrics: forcedData }); await forcedContext.close();
  for (const mode of ['javascript-disabled', 'script-blocked']) {
    const fallbackContext = await contextFor({ viewport: { width: 320, height: 900 }, javaScriptEnabled: mode !== 'javascript-disabled' }, mode === 'script-blocked' ? mode : 'ordinary');
    if (mode === 'script-blocked') await fallbackContext.route('**/preview.js', route => route.abort('failed'));
    const fallback = await fallbackContext.newPage(); await fallback.goto(url);
    assert.equal(await fallback.locator('#theme-select:disabled,#appearance:disabled,#motion:disabled').count(), 3);
    assert.equal(await fallback.locator('.idea-card:disabled').count(), 4); assert.equal(await fallback.locator('#brief-fields:disabled').count(), 1);
    assert.ok(await fallback.locator('main h1,main h2').count() >= 1); assert.ok(await fallback.locator('a[href]:visible').count() > 0);
    const data = await checkedMetrics(fallback, mode, { fallback: true });
    await screenshot(fallback, mode + '-320.png'); pass(mode + ' keeps readable static content with disabled enhancement controls', data); await fallbackContext.close();
  }
  assert.deepEqual(report.runtimeErrors, []); assert.deepEqual(report.externalRequests, []); assert.deepEqual(report.resourceFailures, []);
  pass('Subpath runtime has no ordinary exceptions, failed resources or external requests');
  report.passed = true;
} catch (error) { report.passed = false; report.failure = { message: error.message, stack: error.stack }; process.exitCode = 1; }
finally {
  await browser?.close(); await new Promise(resolve => server.close(resolve)); report.finishedAt = new Date().toISOString();
  await writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify({ passed: report.passed, checks: report.checks.length, states: report.matrix.length, interactionStates: report.interactions.length, failedStates: report.matrix.filter(x => !x.passed).length, output, failure: report.failure?.message }) + '\n');
}
