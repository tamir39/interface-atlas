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
    throw new Error('Usage: node tools/validate-claymorphism.mjs [--module path/to/playwright/index.mjs] [--browser path/to/chromium] [--output fresh-directory] [--preview directory]');
  }
  options[process.argv[i].slice(2)] = process.argv[i + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'styles/claymorphism/preview'));
const output = path.resolve(options.output || path.join(os.tmpdir(), 'atlas-clay-' + Date.now()));
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
  schema_version: 1, scope: 'Claymorphism on nine bounded source-token profiles with explicit selected-surface geometry overrides; complete existing theme apps are outside this evaluation',
  node: process.version, browser: null, startedAt: new Date().toISOString(), testedFiles: {}, validatorSha256: hash(await readFile(fileURLToPath(import.meta.url))),
  profileSources: [], identities: [], checks: [], matrix: [], interactions: [], screenshots: [], runtimeErrors: [], externalRequests: [], resourceFailures: [], intentionalFailures: [],
  contrastMethod: 'Actual computed sRGB foreground, background and border colors, composited through opaque/transparent ancestor fills. No gradients, whole-element opacity, filters or blend modes are accepted in the measured path. Visible HTML text requires 4.5:1 (large text 3:1); field border against both fill and parent requires 3:1; buttons require a border or fill distinguishable from their parent at 3:1. External keyboard outline is measured against its adjacent parent at 3:1. Box shadows are not RGB backgrounds: structural checks require all readable clay content inside a 12px-inset opaque, shadow-free child above the outer inset shading. Temporary screenshots receive bounded visual inspection. Every measured sample is retained in the raw report.',
  limits: [
    'Chromium only; no screen reader, physical device, other browser engine, native zoom/text enlargement, backend or performance benchmark.',
    'Profiles preserve 15 extracted source variables. Selected clay wrappers explicitly override source corners to 28px outside and 16px inside; ordinary native fields retain source control geometry. This is not full theme composition, typography, assets, density or intended font-binary rendering.',
    'Contrast excludes hidden/placeholder text, native select popups, browser validation bubbles, glyph internals, SVG paths and antialiasing; visible decorative HTML text remains measured. Unsupported constructs in measured scope fail rather than silently passing.',
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
      if (el.namespaceURI !== 'http://www.w3.org/1999/xhtml' || ['SCRIPT', 'STYLE', 'OPTION', 'NOSCRIPT'].includes(el.tagName) || !visible(el)) continue;
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
    const surfaces = [...document.querySelectorAll('.clay-surface')].filter(visible).map(el => {
      const s = getComputedStyle(el), child = [...el.children].find(n => n.classList.contains('clay-content')), c = child && getComputedStyle(child), r = el.getBoundingClientRect(), q = child?.getBoundingClientRect();
      const readable = [...el.querySelectorAll('*')].filter(n => visible(n) && (textFor(n) || n.matches('input,select,textarea,button')) && n.closest('.clay-surface') === el);
      const uncontained = readable.filter(n => !child?.contains(n) && child !== n).map(identify);
      const overlays = [el, ...(child ? [child] : [])].flatMap(n => ['::before','::after'].map(pseudo => ({ selector: identify(n) + pseudo, content: getComputedStyle(n, pseudo).content }))).filter(p => !['none','normal','""'].includes(p.content));
      return { selector: identify(el), alpha: parse(s.backgroundColor)[3], shadow: s.boxShadow, blur: s.backdropFilter, radius: s.borderRadius, padding: [s.paddingTop,s.paddingRight,s.paddingBottom,s.paddingLeft], transform: s.transform, transition: s.transitionDuration, child: child ? { alpha: parse(c.backgroundColor)[3], radius: c.borderRadius, shadow: c.boxShadow, zIndex: c.zIndex, position: c.position, inset: [+((q.left-r.left).toFixed(2)),+((q.top-r.top).toFixed(2)),+((r.right-q.right).toFixed(2)),+((r.bottom-q.bottom).toFixed(2))] } : null, uncontained, overlays };
    });
    const ordinaryGeometry = [...document.querySelectorAll('input,select,textarea,.work-panel,.settings-panel,.studio')].filter(visible).map(el => {
      const probe = document.createElement('div'); probe.style.borderRadius = el.matches('input,select,textarea') ? 'var(--control-radius)' : 'var(--card-radius)'; el.parentElement.append(probe);
      const expected = getComputedStyle(probe).borderRadius; probe.remove();
      return { selector: identify(el), radius: getComputedStyle(el).borderRadius, expected };
    });
    let focus = null;
    const active = document.activeElement;
    if (active && active !== document.body && active.matches(':focus-visible')) {
      const s = getComputedStyle(active), bg = background(active.parentElement), ring = over(parse(s.outlineColor), bg), r = active.getBoundingClientRect(), extent = parseFloat(s.outlineWidth) + parseFloat(s.outlineOffset);
      const clippedBy = ancestors(active.parentElement).filter(el => { const p = getComputedStyle(el), b = el.getBoundingClientRect(); return ['hidden', 'clip'].includes(p.overflowX) && (r.left - extent < b.left || r.right + extent > b.right) || ['hidden', 'clip'].includes(p.overflowY) && (r.top - extent < b.top || r.bottom + extent > b.bottom); }).map(identify);
      focus = { selector: identify(active), width: parseFloat(s.outlineWidth), style: s.outlineStyle, offset: parseFloat(s.outlineOffset), ratio: +ratio(ring, bg).toFixed(3), clippedBy };
    }
    return { text, boundaries, failures, skipped, targets, surfaces, ordinaryGeometry, selectedIndicators: [...document.querySelectorAll('[data-practice][aria-pressed="true"]')].filter(visible).map(el => { const s = getComputedStyle(el), bg = background(el.parentElement); return { selector: identify(el), width: parseFloat(s.outlineWidth), style: s.outlineStyle, offset: parseFloat(s.outlineOffset), ratio: +ratio(over(parse(s.outlineColor), bg), bg).toFixed(3), text: el.querySelector('.choice-state')?.textContent.trim() }; }), focus, reflow: { viewport: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth } };
  });
}
async function checkedMetrics(page, name, { fallback = false, forced = false, focus = false } = {}) {
  const data = await metrics(page);
  assert.ok(data.text.length > 0 && (fallback || data.boundaries.length >= 7), name + ': measured nonempty scope');
  assert.deepEqual(data.failures, [], name + ': contrast ' + JSON.stringify(data.failures));
  assert.ok(data.reflow.scroll <= data.reflow.viewport + 1, name + ': whole-page horizontal overflow');
  assert.ok(data.surfaces.length >= 1, name + ': style specimens present');
  assert.ok(data.surfaces.every(s => s.alpha === 1 && s.blur === 'none' && s.child?.alpha === 1 && s.child.shadow === 'none' && !s.uncontained.length && !s.overlays.length), name + ': opaque inner content contains every readable clay descendant without overlaid pseudo content ' + JSON.stringify(data.surfaces));
  if (!forced) {
    assert.ok(data.surfaces.every(s => s.radius === '28px' && s.padding.every(v => v === '12px') && s.child.radius === '16px' && s.child.inset.every(v => v >= 11.99) && s.shadow.includes('inset') && s.shadow !== 'none'), name + ': explicit inflated 28/16px geometry, 12px material frame and outer/inset shading');
    assert.ok(data.ordinaryGeometry.every(s => s.radius === s.expected), name + ': ordinary fields and working/settings/studio panels retain source geometry ' + JSON.stringify(data.ordinaryGeometry));
  }
  if (!fallback) assert.ok(data.selectedIndicators.length === 1 && data.selectedIndicators.every(s => s.width >= 2 && s.style !== 'none' && s.ratio >= 3 && /selected/i.test(s.text)), name + ': selection has text and contrast-tested outline independent of shadows ' + JSON.stringify(data.selectedIndicators));
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
function summarize(data) {
  const min = list => list.length ? Math.min(...list) : null;
  const limiting = list => list.length ? list.reduce((a,b) => a.ratio < b.ratio ? a : b) : null;
  return {
    textSamples: data.text.length, boundarySamples: data.boundaries.length,
    minimumTextRatio: min(data.text.map(x => x.ratio)), minimumFieldBoundaryRatio: min(data.boundaries.filter(x => x.kind === 'field').map(x => x.ratio)), minimumButtonBoundaryRatio: min(data.boundaries.filter(x => x.kind === 'button').map(x => x.ratio)),
    targetSamples: data.targets.length, minimumTargetWidth: min(data.targets.map(x => x.width)), minimumTargetHeight: min(data.targets.map(x => x.height)),
    surfaceSamples: data.surfaces.length, allOpaqueContentProtected: data.surfaces.every(x => x.alpha === 1 && x.child?.alpha === 1 && x.child.shadow === 'none' && !x.uncontained.length && !x.overlays.length),
    allClayGeometry: data.surfaces.every(x => x.radius === '28px' && x.padding.every(v => v === '12px') && x.child.radius === '16px' && x.child.inset.every(v => v >= 11.99)),
    allOrdinaryHostGeometry: data.ordinaryGeometry.every(x => x.radius === x.expected), minimumSelectedOutlineRatio: min(data.selectedIndicators.map(x => x.ratio)),
    viewportWidth: data.reflow.viewport, pageScrollWidth: data.reflow.scroll, focusedSelector: data.focus?.selector ?? null, focusRatio: data.focus?.ratio ?? null, focusWidth: data.focus?.width ?? null, focusClippedBy: data.focus?.clippedBy ?? [], skippedText: data.skipped,
    limitingText: limiting(data.text), limitingBoundary: limiting(data.boundaries)
  };
}
function project(report, raw) {
  const sample = summarize(report.matrix.find(x => x.passed));
  const measurements = Object.keys(sample).filter(k => !['limitingText','limitingBoundary'].includes(k));
  const table = (rows, keys) => ({ columns: [...keys, 'passed', ...measurements], rows: rows.map(row => [...keys.map(k => row[k]), row.passed, ...measurements.map(k => row.passed ? summarize(row)[k] : null)]) });
  const prune = value => value && typeof value === 'object' ? value.text && value.boundaries && value.surfaces ? summarize(value) : Array.isArray(value) ? value.map(prune) : Object.fromEntries(Object.entries(value).map(([key,v]) => [key,prune(v)])) : value;
  return { schema_version: 1, scope: report.scope, node: report.node, browser: report.browser, startedAt: report.startedAt, finishedAt: report.finishedAt, passed: report.passed, rawReport: { sha256: hash(raw), bytes: Buffer.byteLength(raw), storage: 'Temporary browser run directory; not distributed with this repository.' }, validatorSha256: report.validatorSha256, testedFiles: report.testedFiles, profileSources: report.profileSources, identities: report.identities, contrastMethod: report.contrastMethod, matrix: table(report.matrix,['theme','appearance','width','motion']), interactions: table(report.interactions,['theme','appearance','state']), checks: prune(report.checks), runtimeErrors: report.runtimeErrors, resourceFailures: report.resourceFailures, externalRequests: report.externalRequests, intentionalFailures: report.intentionalFailures, screenshots: report.screenshots, limits: report.limits };
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
  assert.equal(await page.locator('#motion').inputValue(), 'off');
  pass('Nine actual profiles; labeled native controls, one h1/main, no positive tabindex and motion off by default');
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
    const choice = page.locator('[data-practice="writing"]');
    await choice.click(); assert.equal(await choice.getAttribute('aria-pressed'), 'true');
    assert.match(await choice.locator('.choice-state').textContent(), /selected/i);
    await capture(page, theme, appearance, 'selected');
    await page.locator('#session-title').fill(''); await page.locator('#review-button').click();
    assert.equal(await page.locator('#session-title').getAttribute('aria-invalid'), 'true');
    assert.ok((await page.locator('#session-title').getAttribute('aria-describedby')).split(/\s+/).includes('title-error'));
    assert.equal(await page.locator('#title-error').isVisible(), true);
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'session-title');
    await capture(page, theme, appearance, 'invalid-title');
    await page.locator('#session-title').fill('A clear local title'); await page.locator('#session-minutes').fill('7'); await page.locator('#review-button').click();
    assert.equal(await page.locator('#session-minutes').getAttribute('aria-invalid'), 'true');
    assert.ok((await page.locator('#session-minutes').getAttribute('aria-describedby')).split(/\s+/).includes('minutes-error'));
    assert.equal(await page.locator('#minutes-error').isVisible(), true);
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'session-minutes');
    await capture(page, theme, appearance, 'invalid-minutes');
    await page.locator('#reset-button').click();
    await choice.hover(); assert.ok(await choice.evaluate(el => el.matches(':hover')), 'Actual hovered practice');
    assert.ok(await choice.locator('.practice-name').evaluate(el => getComputedStyle(el).textDecorationLine.includes('underline')), 'Hover has static underline feedback');
    await capture(page, theme, appearance, 'hover');
    await page.mouse.down(); assert.ok(await choice.evaluate(el => el.matches(':active') && getComputedStyle(el).transform === 'none'), 'Motion-off actual pointer press stays level');
    assert.ok(await choice.locator('.choice-state').evaluate(el => getComputedStyle(el).textDecorationLine.includes('underline')), 'Active press has static state feedback');
    await capture(page, theme, appearance, 'active-off'); await page.mouse.up();
    await select(page, 'motion', 'on'); await choice.hover(); await page.mouse.down(); await page.waitForTimeout(150);
    const press = await choice.evaluate(el => ({ active: el.matches(':active'), transform: getComputedStyle(el).transform, duration: getComputedStyle(el).transitionDuration, property: getComputedStyle(el).transitionProperty }));
    assert.equal(press.active, true); assert.equal(press.transform, 'matrix(1, 0, 0, 1, 0, 1)');
    assert.equal(press.property, 'transform'); assert.equal(press.duration, '0.12s');
    await capture(page, theme, appearance, 'active-on'); await page.mouse.up(); await select(page, 'motion', 'off'); await page.mouse.move(0, 0);
    for (const selector of ['#theme-select', '#session-title', '[data-practice="writing"]', '#review-button']) {
      await page.keyboard.press('Tab'); await page.locator(selector).focus();
      await capture(page, theme, appearance, 'focus:' + selector, { focus: true });
    }
    if (['play', 'swiss', 'botanical'].includes(theme)) await screenshot(page, theme + '-' + appearance + '-320.png');
  }
  assert.equal(report.matrix.length, 72); assert.deepEqual(report.matrix.filter(row => !row.passed), [], 'Composition matrix failures');
  assert.equal(new Set(report.identities.filter(x => x.appearance === 'light').map(x => JSON.stringify(x.values))).size, 9, 'Nine actual distinct profiles');
  pass('72 matrix states: computed contrast, narrow/wide reflow, 44px controls, protected opaque content and explicit clay geometry');
  assert.equal(report.interactions.length, 180); assert.deepEqual(report.interactions.filter(row => !row.passed), [], 'Selected, title/minutes errors, hover, active off/on and keyboard-focus failures');
  pass('180 measured interaction contexts across all light/dark profiles, including 72 keyboard-focus contexts');
  await page.setViewportSize({ width: 1280, height: 900 }); await page.reload(); await page.keyboard.press('Tab');
  assert.match(await page.evaluate(() => document.activeElement?.getAttribute('href') || ''), /^#/);
  await page.keyboard.press('Enter'); assert.equal(await page.evaluate(() => document.activeElement?.id), 'main');
  await page.locator('[data-practice="making"]').focus(); await page.keyboard.press('Space');
  assert.equal(await page.locator('[data-practice="making"]').getAttribute('aria-pressed'), 'true');
  assert.equal(await page.locator('[data-practice][aria-pressed="true"]').count(), 1);
  pass('Native skip navigation and Space selection retain one explicit selected practice');
  for (const title of ['ab', '   ']) {
    await page.locator('#session-title').fill(title); await page.locator('#review-button').click();
    assert.equal(await page.locator('#session-title').getAttribute('aria-invalid'), 'true');
    assert.equal(await page.locator('#review-panel').isVisible(), false);
  }
  assert.equal(await page.locator('#session-title').getAttribute('maxlength'), '48');
  await page.locator('#session-title').evaluate(el => { el.value = 'a'.repeat(49); el.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.locator('#review-button').click(); assert.equal(await page.locator('#session-title').getAttribute('aria-invalid'), 'true');
  await page.locator('#session-title').fill('Local clay session');
  for (const minutes of ['', '4', '121', '7', '12.5']) {
    await page.locator('#session-minutes').fill(minutes); await page.locator('#review-button').click();
    assert.equal(await page.locator('#session-minutes').getAttribute('aria-invalid'), 'true');
    assert.equal(await page.locator('#review-panel').isVisible(), false);
  }
  await page.locator('#session-minutes').fill('25'); await page.locator('#review-button').click();
  assert.equal(await page.locator('#review-panel').isVisible(), true); assert.match(await page.locator('#review-title').textContent(), /Local clay session/);
  assert.match(await page.locator('#review-practice').textContent(), /mak/i); assert.match(await page.locator('#review-minutes').textContent(), /25/);
  const draft = await page.locator('#session-title').inputValue();
  await select(page, 'theme-select', 'botanical'); await select(page, 'appearance', 'dark'); await select(page, 'motion', 'on');
  assert.equal(await page.locator('#session-title').inputValue(), draft); assert.equal(await page.locator('#session-minutes').inputValue(), '25');
  assert.equal(await page.locator('[data-practice="making"]').getAttribute('aria-pressed'), 'true'); assert.equal(await page.locator('#review-panel').isVisible(), true);
  await screenshot(page, 'desktop-local-review.png');
  await page.locator('#session-title').fill('Changed title'); assert.equal(await page.locator('#review-panel').isVisible(), false);
  await page.locator('#review-button').click(); await page.locator('[data-practice="writing"]').click(); assert.equal(await page.locator('#review-panel').isVisible(), false);
  await page.locator('#reset-button').click(); assert.equal(await page.locator('#session-title').inputValue(), 'A page of small discoveries');
  assert.equal(await page.locator('#session-minutes').inputValue(), '20'); assert.equal(await page.locator('[data-practice="sketch"]').getAttribute('aria-pressed'), 'true');
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'session-title'); assert.equal(await page.locator('#review-panel').isVisible(), false);
  pass('Title/minutes bounds, associated errors, local review, preference continuity, stale-review invalidation and reset recovery');
  await select(page, 'appearance', 'system'); await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForFunction(() => getComputedStyle(document.documentElement).colorScheme.includes('dark'));
  const dark = await page.locator('html').evaluate(el => getComputedStyle(el).getPropertyValue('--page').trim());
  await page.emulateMedia({ colorScheme: 'light' }); await page.waitForFunction(value => getComputedStyle(document.documentElement).getPropertyValue('--page').trim() !== value, dark);
  pass('System appearance follows live OS changes');
  await select(page, 'motion', 'on'); await page.emulateMedia({ reducedMotion: 'reduce' });
  const choice = page.locator('[data-practice="writing"]'); await choice.hover(); await page.mouse.down();
  const reduced = await choice.evaluate(el => ({ active: el.matches(':active'), transform: getComputedStyle(el).transform, duration: getComputedStyle(el).transitionDuration, animations: document.getAnimations().filter(a => ['running', 'paused', 'pending'].includes(a.playState)).length }));
  assert.equal(reduced.active, true); assert.equal(reduced.transform, 'none'); assert.ok(reduced.duration.split(',').every(v => parseFloat(v) === 0)); assert.equal(reduced.animations, 0);
  await page.mouse.up(); pass('OS reduced motion overrides explicit motion-on during actual pointer press', reduced);
  await context.close();
  const forcedContext = await contextFor({ viewport: { width: 320, height: 900 }, forcedColors: 'active', colorScheme: 'dark' });
  const forced = await forcedContext.newPage(); await forced.goto(url); await select(forced, 'theme-select', 'play'); await select(forced, 'appearance', 'dark'); await select(forced, 'motion', 'on');
  const forcedTokens = await forced.locator('html').evaluate(el => Object.fromEntries(['--page', '--surface', '--raised', '--ink', '--primary', '--on-primary', '--focus', '--error'].map(key => [key, getComputedStyle(el).getPropertyValue(key).trim()])));
  assert.ok(/Canvas/i.test(forcedTokens['--page']) && /CanvasText/i.test(forcedTokens['--ink']) && /Highlight/i.test(forcedTokens['--focus']), 'Forced system roles outrank explicit profile');
  await forced.keyboard.press('Tab'); await forced.locator('#session-title').focus();
  const forcedData = await checkedMetrics(forced, 'forced-colors', { forced: true, focus: true });
  assert.ok(forcedData.surfaces.every(s => s.shadow === 'none'), 'Forced colors removes decorative shadows');
  const forcedChoice = forced.locator('[data-practice="writing"]'); await forcedChoice.hover(); await forced.mouse.down();
  assert.ok(await forcedChoice.evaluate(el => el.matches(':active') && getComputedStyle(el).transform === 'none' && getComputedStyle(el).transitionDuration.split(',').every(v => parseFloat(v) === 0)), 'Forced colors removes active press and transition'); await forced.mouse.up();
  await screenshot(forced, 'forced-colors-320.png'); pass('Forced system roles, all visible HTML text including decoration, contrast, focus, reflow and motion removal', { forcedTokens, metrics: forcedData }); await forcedContext.close();
  for (const mode of ['javascript-disabled', 'script-blocked']) {
    const fallbackContext = await contextFor({ viewport: { width: 320, height: 900 }, javaScriptEnabled: mode !== 'javascript-disabled' }, mode === 'script-blocked' ? mode : 'ordinary');
    if (mode === 'script-blocked') await fallbackContext.route('**/preview.js', route => route.abort('failed'));
    const fallback = await fallbackContext.newPage(); await fallback.goto(url);
    assert.equal(await fallback.locator('#theme-select:disabled,#appearance:disabled,#motion:disabled').count(), 3);
    assert.equal(await fallback.locator('[data-practice]:disabled').count(), 3); assert.equal(await fallback.locator('#session-fields:disabled').count(), 1);
    assert.ok(await fallback.locator('main h1,main h2').count() >= 1); assert.ok(await fallback.locator('a[href]:visible').count() > 0);
    const data = await checkedMetrics(fallback, mode, { fallback: true });
    await screenshot(fallback, mode + '-320.png'); pass(mode + ' keeps readable static content with enhancement controls disabled', data); await fallbackContext.close();
  }
  assert.deepEqual(report.runtimeErrors, []); assert.deepEqual(report.externalRequests, []); assert.deepEqual(report.resourceFailures, []);
  pass('Subpath runtime has no ordinary exceptions, failed resources or external requests');
  report.passed = true;
} catch (error) { report.passed = false; report.failure = { message: error.message, stack: error.stack }; process.exitCode = 1; }
finally {
  await browser?.close(); await new Promise(resolve => server.close(resolve)); report.finishedAt = new Date().toISOString();
  const raw = JSON.stringify(report, null, 2) + '\n';
  await writeFile(path.join(output, 'results.json'), raw);
  if (report.passed) await writeFile(path.join(output, 'compact-results.json'), JSON.stringify(project(report, raw), null, 2) + '\n');
  process.stdout.write(JSON.stringify({ passed: report.passed, checks: report.checks.length, states: report.matrix.length, interactionStates: report.interactions.length, failedStates: report.matrix.filter(x => !x.passed).length, output, failure: report.failure?.message }) + '\n');
}
