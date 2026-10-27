import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Original Atlas checks of the bounded Open Index composition; Playwright is optional.
const options = {};
for (let i = 2; i < process.argv.length; i += 2) {
  assert.ok(['--module', '--browser', '--output', '--preview'].includes(process.argv[i]) && process.argv[i + 1], 'Usage: node tools/validate-web-brutalism.mjs [--module playwright/index.mjs] [--browser chromium] [--output fresh-directory] [--preview directory]');
  options[process.argv[i].slice(2)] = process.argv[i + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'styles/web-brutalism/preview'));
const output = path.resolve(options.output || path.join(os.tmpdir(), 'atlas-web-brutalism-' + Date.now()));
await mkdir(output, { recursive: false });
let playwright;
try { playwright = await import(options.module ? pathToFileURL(path.resolve(options.module)).href : 'playwright'); }
catch { throw new Error('Optional verification needs installed Playwright; pass --module to its index.mjs. The preview needs no package.'); }
const ids = ['blueprint', 'botanical', 'editorial', 'gallery', 'layered', 'play', 'precision', 'pulse', 'swiss'];
const noteIds = ['document-order', 'form-labels', 'link-names', 'reading-type', 'empty-states', 'motion-choice'];
const properties = ['--page', '--surface', '--raised', '--ink', '--muted', '--primary', '--on-primary', '--border', '--focus', '--error', '--theme-font', '--display-font', '--mono-font', '--card-radius', '--control-radius'];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const manifest = JSON.parse(await readFile(path.join(preview, 'theme-tokens.json'), 'utf8'));
assert.deepEqual(manifest.profiles.map(x => x.id).sort(), [...ids].sort(), 'Nine source profiles');
const report = {
  schema_version: 1, scope: 'Open Index: one content-first Web Brutalism composition, nine bounded source-token profiles, explicit 0px controls/sections; other brutalist expressions and complete theme applications are outside this evaluation.',
  node: process.version, browser: null, startedAt: new Date().toISOString(), validatorSha256: hash(await readFile(fileURLToPath(import.meta.url))), testedFiles: {}, profileSources: [], identities: [], checks: [], matrix: [], interactions: [], screenshots: [], runtimeErrors: [], resourceFailures: [], externalRequests: [], intentionalFailures: [],
  contrastMethod: 'Actual visible HTML text and real field/action boundaries use computed sRGB colors composited through ancestor backgrounds. Normal text 4.5:1, large text 3:1; necessary field boundaries against fill and parent 3:1; action boundary or fill against parent 3:1; actual keyboard outline against adjacent parent 3:1. Unsupported readable compositing fails. Native checkbox internals and forced-color native pixels receive bounded visual inspection.',
  limits: ['Chromium only; no screen reader, physical device, other engine, native browser zoom/text enlargement, user study or performance benchmark.', 'Fifteen extracted source variables retain palette/font/geometry provenance; actual controls and sections explicitly override corners to 0px. Source geometry variables remain unused in this composition. Named font binaries, complete source layouts, density, imagery and components are not reproduced.', 'Computed contrast excludes hidden/placeholder text, native popup/validation UI, checkbox glyph internals, antialiasing and browser decorations. All visible HTML text, including heading punctuation and disabled-enhancement explanations, is included.', 'Six original notes are static HTML. Filter, selection, plan title and preferences live only in the current page; reload resets enhancements. A real download exports selected original notes as plain UTF-8. No account, durable save or backend exists.']
};
for (const name of ['index.html', 'styles.css', 'preview.js', 'theme-tokens.css', 'theme-tokens.json']) report.testedFiles[name] = hash(await readFile(path.join(preview, name)));
for (const profile of manifest.profiles) {
  assert.equal(hash(await readFile(path.join(root, profile.source.file))), profile.source.sha256, profile.id + ': source fingerprint');
  report.profileSources.push({ id: profile.id, ...profile.source });
}
const prefix = '/atlas-composition/';
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (!pathname.startsWith(prefix)) { response.writeHead(404).end(); return; }
    const filename = path.resolve(preview, pathname.slice(prefix.length) || 'index.html'), relative = path.relative(preview, filename);
    if (relative.startsWith('..') || path.isAbsolute(relative)) { response.writeHead(403).end(); return; }
    response.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream' }).end(await readFile(filename));
  } catch { response.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port, url = origin + prefix;
let browser;
const pass = (name, details = true) => report.checks.push({ name, passed: true, details });
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
      if (!CSS.supports('color', value)) throw new Error('Unsupported color ' + value);
      ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = value; ctx.fillRect(0, 0, 1, 1);
      const p = [...ctx.getImageData(0, 0, 1, 1).data]; return [p[0], p[1], p[2], p[3] / 255];
    };
    const lum = rgb => rgb.slice(0, 3).map(c => { const v = c / 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
    const ratio = (a, b) => (Math.max(lum(a), lum(b)) + .05) / (Math.min(lum(a), lum(b)) + .05);
    const over = (a, b) => b.map((v, i) => a[i] * a[3] + v * (1 - a[3]));
    const ancestors = el => { const list = []; for (let n = el; n; n = n.parentElement) list.unshift(n); return list; };
    const background = el => {
      let rgb = [255, 255, 255];
      for (const node of ancestors(el)) {
        const s = getComputedStyle(node);
        if (Number(s.opacity) < 1 || s.mixBlendMode !== 'normal' || s.filter !== 'none' || s.backgroundImage !== 'none') throw new Error('Unsupported measured compositing: ' + identify(node));
        rgb = over(parse(s.backgroundColor), rgb);
      }
      return rgb;
    };
    const visible = el => !!el.getClientRects().length && getComputedStyle(el).visibility === 'visible' && !el.closest('[hidden]');
    const hiddenText = el => ancestors(el).some(n => { const s = getComputedStyle(n); return s.clipPath === 'inset(50%)' || s.clip === 'rect(0px, 0px, 0px, 0px)'; });
    const textFor = el => el.tagName === 'SELECT' ? el.selectedOptions[0]?.textContent : ['TEXTAREA', 'INPUT'].includes(el.tagName) ? (el.type === 'checkbox' ? '' : el.value) : [...el.childNodes].filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent.trim()).join(' ');
    const text = [], boundaries = [], targets = [], paint = [], geometry = [], failures = [], skipped = [];
    for (const el of document.body.querySelectorAll('*')) {
      if (el.namespaceURI !== 'http://www.w3.org/1999/xhtml' || ['SCRIPT', 'STYLE', 'OPTION', 'NOSCRIPT'].includes(el.tagName) || !visible(el)) continue;
      const s = getComputedStyle(el);
      const layers = ['::before', '::after'].map(p => { const x = getComputedStyle(el, p); return { content: x.content, image: x.backgroundImage, shadow: x.boxShadow, transform: x.transform, animation: x.animationName }; });
      paint.push({ selector: identify(el), shadow: s.boxShadow, image: s.backgroundImage, filter: s.filter, backdrop: s.backdropFilter, transform: s.transform, animation: s.animationName, transitionProperty: s.transitionProperty, transitionDuration: s.transitionDuration, layers });
      if (el.matches('input,select,button,textarea,fieldset,section,article,nav,header,footer,details,summary,.index-row')) geometry.push({ selector: identify(el), corners: [s.borderTopLeftRadius, s.borderTopRightRadius, s.borderBottomRightRadius, s.borderBottomLeftRadius], borders: [s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth] });
      const label = textFor(el); if (!label) continue;
      if (hiddenText(el)) { skipped.push(identify(el)); continue; }
      const bg = background(el), fg = over(parse(s.color), bg), required = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.6667 && parseInt(s.fontWeight) >= 700) ? 3 : 4.5;
      const sample = { selector: identify(el), text: label.slice(0, 100), ratio: +ratio(fg, bg).toFixed(3), required, foreground: s.color, background: bg };
      text.push(sample); if (sample.ratio + 1e-6 < required) failures.push(sample);
    }
    for (const el of document.querySelectorAll('button,select,input,textarea,summary,.note-link')) {
      if (!visible(el) || hiddenText(el) || el.type === 'hidden') continue;
      const s = getComputedStyle(el), box = (el.type === 'checkbox' ? el.labels?.[0] : el).getBoundingClientRect();
      targets.push({ selector: identify(el), checkboxLabel: el.type === 'checkbox', width: +box.width.toFixed(2), height: +box.height.toFixed(2) });
      if (el.type === 'checkbox' || el.tagName === 'SUMMARY' || el.tagName === 'A' || el.disabled) continue;
      const bg = background(el), adjacent = background(el.parentElement), border = over(parse(s.borderTopColor), bg), inside = ratio(border, bg), outside = ratio(border, adjacent), fill = ratio(bg, adjacent), button = el.tagName === 'BUTTON';
      const value = button ? Math.max(outside, fill) : Math.min(inside, outside);
      const sample = { selector: identify(el), kind: button ? 'button' : 'field', ratio: +value.toFixed(3), inside: +inside.toFixed(3), outside: +outside.toFixed(3), fill: +fill.toFixed(3), borderWidth: parseFloat(s.borderTopWidth), required: 3 };
      boundaries.push(sample); if (sample.borderWidth < 1 || s.borderTopStyle === 'none' || value + 1e-6 < 3) failures.push(sample);
    }
    const links = [...document.querySelectorAll('a[href]')].filter(visible).map(el => { const s = getComputedStyle(el); return { selector: identify(el), href: el.getAttribute('href'), name: el.textContent.trim(), decoration: s.textDecorationLine }; });
    const articles = [...document.querySelectorAll('article.note')].map(el => ({ id: el.id, visible: visible(el), text: el.innerText.trim() }));
    let focus = null;
    const active = document.activeElement;
    if (active && active !== document.body && active.matches(':focus-visible')) {
      const s = getComputedStyle(active), bg = background(active.parentElement), r = active.getBoundingClientRect(), extent = parseFloat(s.outlineWidth) + parseFloat(s.outlineOffset);
      const clippedBy = ancestors(active.parentElement).filter(el => { const p = getComputedStyle(el), b = el.getBoundingClientRect(); return ['hidden', 'clip'].includes(p.overflowX) && (r.left - extent < b.left || r.right + extent > b.right) || ['hidden', 'clip'].includes(p.overflowY) && (r.top - extent < b.top || r.bottom + extent > b.bottom); }).map(identify);
      focus = { selector: identify(active), width: parseFloat(s.outlineWidth), offset: parseFloat(s.outlineOffset), style: s.outlineStyle, color: s.outlineColor, ratio: +ratio(over(parse(s.outlineColor), bg), bg).toFixed(3), clippedBy };
    }
    return { text, boundaries, targets, links, articles, paint, geometry, focus, failures, skipped, reflow: { viewport: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }, scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior };
  });
}
async function checkedMetrics(page, name, { fallback = false, focus = false, motion = 'off', forced = false } = {}) {
  const d = await metrics(page);
  assert.ok(d.text.length > 30 && (fallback || d.boundaries.length >= 5), name + ': nonempty measured scope');
  assert.deepEqual(d.failures, [], name + ': contrast ' + JSON.stringify(d.failures));
  assert.ok(d.reflow.scroll <= d.reflow.viewport + 1, name + ': page reflow');
  assert.equal(d.scrollBehavior, 'auto', name + ': native immediate fragment scrolling');
  assert.deepEqual(d.articles.map(a => a.id), noteIds); assert.ok(d.articles.every(a => a.visible && a.text.length > 50), name + ': all original articles remain visible');
  assert.ok(d.geometry.length > 20 && d.geometry.every(x => x.corners.every(v => v === '0px')), name + ': actual 0px controls and sections ' + JSON.stringify(d.geometry.filter(x => x.corners.some(v => v !== '0px'))));
  assert.ok(d.geometry.some(x => x.borders.includes('1px')) && d.geometry.every(x => x.borders.every(v => ['0px', '1px'].includes(v))), name + ': thin 1px rules and necessary borders');
  assert.ok(d.paint.every(x => x.shadow === 'none' && x.image === 'none' && x.filter === 'none' && x.backdrop === 'none' && x.transform === 'none' && x.animation === 'none' && x.layers.every(l => ['none', 'normal', '""'].includes(l.content) && l.image === 'none' && l.shadow === 'none' && l.transform === 'none' && l.animation === 'none')), name + ': no shadow, gradient, blur, texture, transform or pseudo art');
  assert.ok(d.paint.every(x => x.transitionDuration.split(',').every(v => parseFloat(v) === 0 || (!forced && motion === 'on' && parseFloat(v) <= .1 && x.transitionProperty === 'border-color'))), name + ': only optional 100ms border-color transition');
  assert.ok(d.targets.every(x => x.width >= 43.99 && x.height >= 43.99), name + ': 44px controls/index links/checkbox labels ' + JSON.stringify(d.targets.filter(x => x.width < 43.99 || x.height < 43.99)));
  assert.ok(d.links.length >= 6 && d.links.every(x => x.name && x.decoration.includes('underline')), name + ': semantic named underlined links');
  if (focus) { assert.ok(d.focus && d.focus.width >= 3 && d.focus.offset >= 3 && d.focus.ratio >= 3 && d.focus.style !== 'none', name + ': visible keyboard focus ' + JSON.stringify(d.focus)); assert.deepEqual(d.focus.clippedBy, [], name + ': focus unclipped'); }
  return d;
}
function summarize(d) {
  const min = list => list.length ? Math.min(...list) : null;
  return { textSamples: d.text.length, minimumTextRatio: min(d.text.map(x => x.ratio)), boundarySamples: d.boundaries.length, minimumFieldBoundaryRatio: min(d.boundaries.filter(x => x.kind === 'field').map(x => x.ratio)), minimumButtonBoundaryRatio: min(d.boundaries.filter(x => x.kind === 'button').map(x => x.ratio)), targetSamples: d.targets.length, minimumTargetWidth: min(d.targets.map(x => x.width)), minimumTargetHeight: min(d.targets.map(x => x.height)), articleCount: d.articles.length, allArticlesVisible: d.articles.every(x => x.visible), geometrySamples: d.geometry.length, allCornersZero: d.geometry.every(x => x.corners.every(v => v === '0px')), allRulesOnePixel: d.geometry.every(x => x.borders.every(v => ['0px', '1px'].includes(v))), allPaintFlat: d.paint.every(x => x.shadow === 'none' && x.image === 'none' && x.filter === 'none' && x.backdrop === 'none' && x.transform === 'none' && x.animation === 'none'), viewportWidth: d.reflow.viewport, pageScrollWidth: d.reflow.scroll, focusedSelector: d.focus?.selector ?? null, focusRatio: d.focus?.ratio ?? null, focusWidth: d.focus?.width ?? null, focusOffset: d.focus?.offset ?? null, focusClippedBy: d.focus?.clippedBy ?? [] };
}
async function capture(page, theme, appearance, state, options = {}) {
  try { report.interactions.push({ theme, appearance, state, passed: true, ...await checkedMetrics(page, [theme, appearance, state].join('/'), options) }); }
  catch (error) { report.interactions.push({ theme, appearance, state, passed: false, failure: error.message }); }
}
async function screenshot(page, name) { await page.screenshot({ path: path.join(output, name), fullPage: !name.startsWith('forced-colors-') }); report.screenshots.push(name); }
function project(raw) {
  const measurements = Object.keys(summarize(report.matrix.find(x => x.passed)));
  const table = (rows, keys) => ({ columns: [...keys, 'passed', ...measurements], rows: rows.map(row => [...keys.map(k => row[k]), row.passed, ...measurements.map(k => row.passed ? summarize(row)[k] : null)]) });
  const prune = value => value && typeof value === 'object' ? value.text && value.boundaries && value.paint ? summarize(value) : Array.isArray(value) ? value.map(prune) : Object.fromEntries(Object.entries(value).map(([k, v]) => [k, prune(v)])) : value;
  return { schema_version: 1, scope: report.scope, node: report.node, browser: report.browser, startedAt: report.startedAt, finishedAt: report.finishedAt, passed: report.passed, rawReport: { sha256: hash(raw), bytes: Buffer.byteLength(raw), storage: 'Temporary browser run directory; not distributed with this repository.' }, validatorSha256: report.validatorSha256, testedFiles: report.testedFiles, profileSources: report.profileSources, identities: report.identities, contrastMethod: report.contrastMethod, matrix: table(report.matrix, ['theme', 'appearance', 'width', 'motion']), interactions: table(report.interactions, ['theme', 'appearance', 'state']), checks: prune(report.checks), runtimeErrors: report.runtimeErrors, resourceFailures: report.resourceFailures, externalRequests: report.externalRequests, intentionalFailures: report.intentionalFailures, screenshots: report.screenshots, limits: report.limits };
}
async function checkboxNames(page) {
  const names = {};
  for (const id of noteIds) {
    const checkbox = page.locator('#plan-' + id);
    if (!await checkbox.isVisible()) continue;
    const snapshot = await checkbox.ariaSnapshot();
    const name = /checkbox "([^"]+)"/.exec(snapshot)?.[1];
    assert.ok(name && !/selected|checked/i.test(name), 'Stable checkbox name excludes state: ' + snapshot);
    assert.equal(await page.getByRole('checkbox', { name, exact: true }).count(), 1, 'Actual accessible checkbox mapping'); names[id] = name;
  }
  return names;
}
async function invalidTitle(page, value, expected) {
  await page.locator('#plan-title').evaluate((el, value) => { el.value = value; el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await page.locator('#download-button').click();
  assert.equal(await page.locator('#plan-title').getAttribute('aria-invalid'), 'true');
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'plan-title', 'First invalid field receives focus');
  const result = await page.locator('#plan-title').evaluate(el => ({ valid: el.validity.valid, valueMissing: el.validity.valueMissing, customError: el.validity.customError, validationMessage: el.validationMessage, described: (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean).map(id => ({ id, text: document.getElementById(id)?.textContent.trim(), visible: !!document.getElementById(id)?.getClientRects().length })) }));
  assert.equal(result.valid, false); assert.equal(result[expected], true); assert.ok(result.described.some(x => x.id === 'title-error' && x.visible && x.text), 'Visible error is described by the field'); return result;
}
async function nativeHistory(page, label) {
  const states = [];
  for (const id of ['document-order', 'form-labels']) {
    await page.locator('.note-link[href="#' + id + '"]').click();
    await page.waitForURL('**/#' + id);
    assert.ok(await page.locator('#' + id).isVisible()); states.push({ action: 'link', hash: new URL(page.url()).hash });
  }
  await page.goBack(); assert.equal(new URL(page.url()).hash, '#document-order'); states.push({ action: 'back', hash: new URL(page.url()).hash });
  await page.goForward(); assert.equal(new URL(page.url()).hash, '#form-labels'); states.push({ action: 'forward', hash: new URL(page.url()).hash });
  assert.ok(await page.locator('article.note').evaluateAll(els => els.every(el => el.getClientRects().length && !el.hidden)), 'History keeps every article rendered');
  pass(label + ': native fragment URL and browser Back/Forward', states);
}
try {
  browser = await playwright.chromium.launch({ headless: true, ...(options.browser ? { executablePath: path.resolve(options.browser) } : {}) }); report.browser = await browser.version();
  const context = await contextFor({ viewport: { width: 1280, height: 900 }, colorScheme: 'light', acceptDownloads: true });
  const page = await context.newPage(); await page.goto(url); await page.waitForFunction(() => document.documentElement.dataset.ready === 'true');
  assert.deepEqual(await page.locator('#theme-select option').evaluateAll(els => els.map(el => el.value).sort()), [...ids].sort());
  assert.equal(await page.locator('h1').count(), 1); assert.equal(await page.locator('main').count(), 1);
  assert.equal(await page.locator('[tabindex]').evaluateAll(els => els.filter(el => Number(el.getAttribute('tabindex')) > 0).length), 0);
  assert.ok(await page.locator('select,input').evaluateAll(els => els.every(el => el.labels?.length > 0))); assert.equal(await page.locator('#motion').inputValue(), 'off');
  assert.equal(await page.locator('#download-button').isDisabled(), true); assert.ok((await page.locator('#download-hint').innerText()).trim());
  assert.deepEqual(await page.locator('article.note').evaluateAll(els => els.map(el => el.id)), noteIds);
  assert.deepEqual(await page.locator('.note-link').evaluateAll(els => els.map(el => el.getAttribute('href'))), noteIds.map(id => '#' + id));
  pass('Nine actual profiles, six static articles/native links, labeled controls, one h1/main, no positive tabindex, empty export disabled with hint and motion off');
  const focusSelectors = ['#theme-select', '#note-search', '#plan-document-order', '#plan-title', '#download-button'];
  for (const theme of ids) for (const appearance of ['light', 'dark']) {
    await select(page, 'theme-select', theme); await select(page, 'appearance', appearance);
    const values = await page.locator('html').evaluate((el, keys) => Object.fromEntries(keys.map(key => [key, getComputedStyle(el).getPropertyValue(key).trim()])), properties);
    assert.deepEqual(values, manifest.profiles.find(x => x.id === theme).tokens[appearance], theme + '/' + appearance + ': computed 15 source variables'); report.identities.push({ theme, appearance, values });
    for (const width of [320, 1280]) for (const motion of ['off', 'on']) {
      await page.setViewportSize({ width, height: 900 }); await select(page, 'motion', motion); await page.mouse.move(0, 0);
      try { report.matrix.push({ theme, appearance, width, motion, passed: true, ...await checkedMetrics(page, [theme, appearance, width, motion].join('/'), { motion }) }); }
      catch (error) { report.matrix.push({ theme, appearance, width, motion, passed: false, failure: error.message }); }
    }
    await select(page, 'motion', 'off'); await page.setViewportSize({ width: 320, height: 900 });
    await page.locator('#plan-document-order').uncheck(); const names = await checkboxNames(page); await page.locator('#plan-document-order').check(); assert.deepEqual(await checkboxNames(page), names, 'Same viewport accessible names remain stable after selection');
    await capture(page, theme, appearance, 'checked'); await invalidTitle(page, '', 'valueMissing'); await capture(page, theme, appearance, 'invalid-title');
    await page.locator('#plan-title').fill('A small frontend reading plan');
    await page.locator('.index-row').first().hover(); assert.ok(await page.locator('.index-row').first().evaluate(el => el.matches(':hover'))); await capture(page, theme, appearance, 'hover');
    for (const motion of ['off', 'on']) {
      await select(page, 'motion', motion); await page.locator('#download-button').hover(); await page.mouse.down(); await page.waitForTimeout(110);
      assert.ok(await page.locator('#download-button').evaluate(el => el.matches(':active') && getComputedStyle(el).transform === 'none'));
      await capture(page, theme, appearance, 'active-' + motion, { motion }); await page.mouse.move(0, 0); await page.mouse.up();
    }
    await select(page, 'motion', 'off');
    for (const selector of focusSelectors) { await page.keyboard.press('Tab'); await page.locator(selector).focus(); await capture(page, theme, appearance, 'focus:' + selector, { focus: true }); }
    if (['botanical', 'play', 'swiss', 'layered'].includes(theme)) await screenshot(page, theme + '-' + appearance + '-320.png');
  }
  assert.equal(report.matrix.length, 72); assert.deepEqual(report.matrix.filter(x => !x.passed), [], 'Base matrix failures');
  assert.equal(new Set(report.identities.filter(x => x.appearance === 'light').map(x => JSON.stringify(x.values))).size, 9); pass('72 base states: actual contrast, 320/1280 reflow, 44px targets and explicit flat 0px geometry');
  assert.equal(report.interactions.length, 18 * (5 + focusSelectors.length)); assert.deepEqual(report.interactions.filter(x => !x.passed), [], 'Interaction context failures');
  pass(report.interactions.length + ' measured interaction contexts including ' + (18 * focusSelectors.length) + ' keyboard-focus contexts', { focusSelectors });
  await page.setViewportSize({ width: 1280, height: 900 }); await page.reload(); await page.waitForFunction(() => document.documentElement.dataset.ready === 'true');
  await page.keyboard.press('Tab'); const skip = await page.evaluate(() => document.activeElement?.getAttribute('href')); assert.ok(skip?.startsWith('#')); await page.keyboard.press('Enter'); assert.equal(await page.evaluate(() => document.activeElement?.id), skip.slice(1));
  await nativeHistory(page, 'Enhanced page');
  const initialNames = await checkboxNames(page); await page.locator('#plan-reading-type').focus(); await page.keyboard.press('Space'); assert.equal(await page.locator('#plan-reading-type').isChecked(), true); assert.deepEqual(await checkboxNames(page), initialNames);
  pass('Native skip navigation, Space checkbox selection and stable actual accessible names', initialNames);
  const validityTrials = [];
  for (const [value, expected] of [['', 'valueMissing'], ['ab', 'customError'], ['   ', 'customError'], ['a'.repeat(49), 'customError']]) validityTrials.push({ value, ...await invalidTitle(page, value, expected) });
  assert.equal(await page.locator('#plan-reading-type').isChecked(), true, 'Invalid title retains selection');
  await page.locator('#plan-title').fill('a'.repeat(48)); await page.setViewportSize({ width: 320, height: 900 });
  const maximumMetrics = await checkedMetrics(page, '48-unbroken-title'); await screenshot(page, 'maximum-title-320.png');
  const maxDownloadPromise = page.waitForEvent('download'); await page.locator('#download-button').click(); const maxDownload = await maxDownloadPromise; await maxDownload.saveAs(path.join(output, 'maximum-title.txt')); const maxBytes = await readFile(path.join(output, 'maximum-title.txt')); assert.ok(new TextDecoder('utf-8', { fatal: true }).decode(maxBytes).includes('a'.repeat(48))); assert.notEqual(await page.locator('#plan-title').getAttribute('aria-invalid'), 'true');
  pass('Native required plus trimmed 3-48 bounds reject 49 programmatic characters and accept/reflow an unbroken 48-character title', { validityTrials, maximumMetrics });
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const id of noteIds) await page.locator('#plan-' + id).uncheck();
  for (const id of ['motion-choice', 'document-order', 'reading-type']) await page.locator('#plan-' + id).check();
  const title = 'Café <b>reading</b> plan'; await page.locator('#plan-title').fill('  ' + title + '  ');
  const originalOrder = await page.locator('.index-row').evaluateAll(els => els.map(el => el.dataset.noteId));
  await page.locator('#note-search').fill('motion');
  const visibleIds = await page.locator('.index-row:visible').evaluateAll(els => els.map(el => el.dataset.noteId)); assert.ok(visibleIds.includes('motion-choice')); assert.ok(!visibleIds.includes('document-order'));
  assert.equal(await page.locator('.plan-checkbox:checked').count(), 3); const selectionStatus = (await page.locator('#selection-status').innerText()).trim(); assert.match(selectionStatus, /3/); assert.match(selectionStatus, /2/); assert.match(selectionStatus, /hidden/i);
  assert.equal(await page.locator('#plan-title').inputValue(), '  ' + title + '  '); const filteredMetrics = await checkedMetrics(page, 'filter-keeps-all-articles-and-hidden-selected');
  await page.locator('.note-link[href="#motion-choice"]').click(); assert.equal(new URL(page.url()).hash, '#motion-choice'); assert.ok(await page.locator('#document-order').isVisible());
  await page.locator('#note-search').fill('no matching note zzzz'); assert.equal(await page.locator('.index-row:visible').count(), 0); assert.ok(await page.locator('#empty-search').isVisible()); assert.ok(await page.locator('#motion-choice').isVisible());
  await page.locator('#clear-search').click(); assert.equal(await page.locator('#note-search').inputValue(), ''); assert.deepEqual(await page.locator('.index-row:visible').evaluateAll(els => els.map(el => el.dataset.noteId)), originalOrder); assert.equal(new URL(page.url()).hash, '#motion-choice');
  await page.locator('#note-search').fill('motion');
  for (const [id, value] of [['theme-select', 'botanical'], ['appearance', 'dark'], ['motion', 'on']]) await select(page, id, value);
  assert.equal(await page.locator('.plan-checkbox:checked').count(), 3); assert.equal(await page.locator('#plan-title').inputValue(), '  ' + title + '  '); assert.equal(await page.locator('#note-search').inputValue(), 'motion');
  const notes = await page.locator('article.note').evaluateAll(els => els.map(el => ({ id: el.id, title: el.querySelector('h2,h3').textContent.trim(), topic: document.querySelector('.index-row[data-note-id=' + el.id + '] .note-topic').textContent.trim(), paragraphs: [...el.querySelectorAll('.note-copy p')].map(p => p.textContent.trim()) })));
  const downloadPromise = page.waitForEvent('download'); await page.locator('#download-button').click(); const download = await downloadPromise; const filename = download.suggestedFilename(); assert.equal(filename, 'open-index-reading-plan.txt'); await download.saveAs(path.join(output, filename));
  const bytes = await readFile(path.join(output, filename)), content = new TextDecoder('utf-8', { fatal: true }).decode(bytes), chosen = ['document-order', 'reading-type', 'motion-choice'];
  assert.ok(content.includes(title) && !content.includes('  ' + title + '  '), 'Actual trimmed accented/literal-markup title'); assert.ok(!content.includes('\uFFFD') && !content.includes('file://') && !/[A-Z]:[\\/]/.test(content), 'Plain UTF-8 with no private local path');
  let previous = -1;
  for (const note of notes) {
    if (chosen.includes(note.id)) {
      assert.ok(content.includes(note.topic) && note.paragraphs.length > 0 && note.paragraphs.every(text => content.includes(text)), 'All original selected topic/prose exported'); const position = content.indexOf(note.title); assert.ok(position > previous, 'Original document export order'); previous = position;
      assert.ok(content.includes('https://tamir39.github.io/interface-atlas/styles/web-brutalism/preview/#' + note.id), 'Canonical public source URL');
    } else { assert.ok(!content.includes(note.title) && note.paragraphs.every(text => !content.includes(text)), 'Unselected original note excluded'); }
  }
  assert.equal(await page.locator('#plan-title b').count(), 0); assert.ok(!content.includes('<html') && !content.includes('<!DOCTYPE'), 'Download is plain text rather than document markup');
  pass('Index-only filter retains hidden selections/counts and fragment context; preferences retain raw title, query and selection; Clear restores original order', { visibleIds, selectionStatus, originalOrder, filteredMetrics });
  pass('Actual decoded UTF-8 file includes trimmed Café/literal-markup title and all selected original notes in document order, canonical public sources, excludes unselected content and private paths', { filename, bytes: bytes.length, sha256: hash(bytes), title, selected: chosen, content });
  await page.locator('#clear-search').click(); await select(page, 'motion', 'off'); await screenshot(page, 'desktop-selected-plan.png'); await page.reload(); await page.waitForFunction(() => document.documentElement.dataset.ready === 'true');
  assert.equal(await page.locator('.plan-checkbox:checked').count(), 0); assert.equal(await page.locator('#plan-title').inputValue(), 'A small frontend reading plan'); assert.equal(await page.locator('#note-search').inputValue(), ''); assert.equal(await page.locator('#download-button').isDisabled(), true); assert.equal(await page.locator('#motion').inputValue(), 'off');
  pass('Reload resets selection, title, query and local preferences; native fragment remains browser URL context');
  await select(page, 'appearance', 'system'); await page.emulateMedia({ colorScheme: 'dark' }); const dark = await page.locator('html').evaluate(el => getComputedStyle(el).getPropertyValue('--page').trim()); await page.emulateMedia({ colorScheme: 'light' }); const light = await page.locator('html').evaluate(el => getComputedStyle(el).getPropertyValue('--page').trim()); assert.notEqual(light, dark); pass('System appearance follows live media changes', { light, dark });
  await select(page, 'motion', 'on'); await page.emulateMedia({ reducedMotion: 'reduce' }); const reduced = await checkedMetrics(page, 'reduced-motion-overrides-on', { forced: true }); pass('Reduced motion makes all transitions immediate even with motion on', reduced); await context.close();
  const forcedContext = await contextFor({ viewport: { width: 320, height: 900 }, forcedColors: 'active' }); const forced = await forcedContext.newPage(); await forced.goto(url); await forced.waitForFunction(() => document.documentElement.dataset.ready === 'true'); await forced.locator('#plan-document-order').check(); await select(forced, 'motion', 'on'); await forced.keyboard.press('Tab'); await forced.locator('#plan-title').focus();
  const forcedData = await checkedMetrics(forced, 'forced-colors-title-focus', { forced: true, focus: true });
  const roles = await forced.evaluate(() => {
    const expected = {};
    for (const role of ['Canvas', 'CanvasText', 'LinkText', 'ButtonFace', 'ButtonText']) { const el = document.createElement('span'); el.style.color = role; document.body.append(el); expected[role] = getComputedStyle(el).color; el.remove(); }
    const sample = selector => { const el = document.querySelector(selector), s = getComputedStyle(el); return { color: s.color, background: s.backgroundColor, outline: s.outlineColor, appearance: s.appearance, checked: el.checked ?? null }; };
    return { expected, body: sample('body'), article: sample('article.note'), title: sample('#plan-title'), heading: sample('h1'), headingChildren: [...document.querySelectorAll('h1 span')].map(el => ({ text: el.textContent, color: getComputedStyle(el).color })), link: sample('.note-link'), button: sample('#download-button'), checkbox: sample('#plan-document-order') };
  });
  for (const item of ['body', 'article', 'heading']) assert.equal(roles[item].color, roles.expected.CanvasText, 'Actual ' + item + ' foreground uses CanvasText');
  assert.equal(roles.body.background, roles.expected.Canvas); assert.equal(roles.title.color, roles.expected.ButtonText); assert.equal(roles.title.background, roles.expected.ButtonFace); assert.equal(roles.link.color, roles.expected.LinkText); assert.equal(roles.button.color, roles.expected.ButtonText); assert.equal(roles.button.background, roles.expected.ButtonFace); assert.ok(roles.headingChildren.every(x => x.color === roles.expected.CanvasText)); assert.equal(forcedData.focus.color, roles.expected.CanvasText); assert.equal(roles.checkbox.appearance, 'auto'); assert.equal(roles.checkbox.checked, true);
  await screenshot(forced, 'forced-colors-title-320.png'); await forced.keyboard.press('Tab'); await forced.locator('#plan-document-order').focus(); const forcedCheckboxFocus = await checkedMetrics(forced, 'forced-colors-checkbox-focus', { forced: true, focus: true }); await screenshot(forced, 'forced-colors-checkbox-320.png'); await forced.locator('#download-button').hover(); await forced.mouse.down(); const forcedAction = await checkedMetrics(forced, 'forced-colors-action-active', { forced: true }); await screenshot(forced, 'forced-colors-action-320.png'); await forced.mouse.move(0, 0); await forced.mouse.up();
  pass('Forced colors inspect actual Canvas/CanvasText content, LinkText links, ButtonFace/ButtonText action, heading punctuation, native checked checkbox and actual CanvasText focus', { roles, titleFocus: forcedData, checkboxFocus: forcedCheckboxFocus, activeAction: forcedAction }); await forcedContext.close();
  for (const mode of ['javascript-disabled', 'script-blocked']) {
    const fallbackContext = await contextFor({ viewport: { width: 320, height: 900 }, javaScriptEnabled: mode !== 'javascript-disabled' }, mode === 'script-blocked' ? mode : 'ordinary');
    if (mode === 'script-blocked') await fallbackContext.route('**/preview.js', route => route.abort('failed'));
    const fallback = await fallbackContext.newPage(); await fallback.goto(url);
    assert.equal(await fallback.locator('#theme-select:disabled,#appearance:disabled,#motion:disabled').count(), 3); assert.equal(await fallback.locator('.plan-checkbox:disabled').count(), 6); assert.equal(await fallback.locator('#note-search').isDisabled(), true); assert.equal(await fallback.locator('#plan-title').isDisabled(), true); assert.equal(await fallback.locator('#download-button').isDisabled(), true); assert.ok((await fallback.locator('#js-status').innerText()).trim());
    const fallbackNotes = await fallback.locator('article.note').evaluateAll(els => els.map(el => ({ id: el.id, title: el.querySelector('h2,h3').textContent.trim(), topic: document.querySelector('.index-row[data-note-id=' + el.id + '] .note-topic').textContent.trim(), paragraphs: [...el.querySelectorAll('.note-copy p')].map(p => p.textContent.trim()) }))); assert.deepEqual(fallbackNotes, notes, 'All original prose survives without initialization');
    const data = await checkedMetrics(fallback, mode, { fallback: true }); await nativeHistory(fallback, mode); const details = fallback.locator('details').first(); if (await details.count()) { const before = await details.getAttribute('open'); await details.locator('summary').click(); assert.notEqual(await details.getAttribute('open'), before, 'Native disclosure works without enhancement'); }
    await screenshot(fallback, mode + '-320.png'); pass(mode + ': all six original articles, native links/history/disclosure and readable explanation; unavailable enhancements disabled', data); await fallbackContext.close();
  }
  assert.deepEqual(report.runtimeErrors, []); assert.deepEqual(report.resourceFailures, []); assert.deepEqual(report.externalRequests, []);
  for (const [name, sha] of Object.entries(report.testedFiles)) assert.equal(hash(await readFile(path.join(preview, name))), sha, 'Runtime stayed frozen: ' + name);
  assert.equal(hash(await readFile(fileURLToPath(import.meta.url))), report.validatorSha256, 'Validator stayed frozen'); pass('Loopback subpath has no ordinary exceptions, resource failures or external requests; runtime and validator files remained frozen'); report.passed = true;
} catch (error) { report.passed = false; report.failure = { message: error.message, stack: error.stack }; process.exitCode = 1; }
finally {
  await browser?.close(); await new Promise(resolve => server.close(resolve)); report.finishedAt = new Date().toISOString();
  const raw = JSON.stringify(report, null, 2) + '\n'; await writeFile(path.join(output, 'results.json'), raw); if (report.passed) await writeFile(path.join(output, 'compact-results.json'), JSON.stringify(project(raw), null, 2) + '\n');
  process.stdout.write(JSON.stringify({ passed: report.passed, checks: report.checks.length, states: report.matrix.length, interactionStates: report.interactions.length, failedStates: report.matrix.filter(x => !x.passed).length, output, failure: report.failure?.message }) + '\n');
}
