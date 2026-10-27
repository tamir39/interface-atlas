import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Original Atlas checks of the bounded Next Up composition; Playwright is optional.
const options = {};
for (let i = 2; i < process.argv.length; i += 2) {
  assert.ok(['--module', '--browser', '--output', '--preview'].includes(process.argv[i]) && process.argv[i + 1], 'Usage: node tools/validate-flat-design.mjs [--module playwright/index.mjs] [--browser chromium] [--output fresh-directory] [--preview directory]');
  options[process.argv[i].slice(2)] = process.argv[i + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'styles/flat-design/preview'));
const output = path.resolve(options.output || path.join(os.tmpdir(), 'atlas-flat-design-' + Date.now()));
await mkdir(output, { recursive: false });
let playwright;
try { playwright = await import(options.module ? pathToFileURL(path.resolve(options.module)).href : 'playwright'); }
catch { throw new Error('Optional verification needs installed Playwright; pass --module to its index.mjs. The preview needs no package.'); }
const ids = ['blueprint', 'botanical', 'editorial', 'gallery', 'layered', 'play', 'precision', 'pulse', 'swiss'];
const seedIds = ['focus-states', 'responsive-navigation', 'form-errors', 'source-credits'];
const properties = ['--page', '--surface', '--raised', '--ink', '--muted', '--primary', '--on-primary', '--border', '--focus', '--error', '--theme-font', '--display-font', '--mono-font', '--card-radius', '--control-radius'];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const manifest = JSON.parse(await readFile(path.join(preview, 'theme-tokens.json'), 'utf8'));
assert.deepEqual(manifest.profiles.map(x => x.id).sort(), [...ids].sort(), 'Nine source profiles');
const report = {
  schema_version: 1, scope: 'Next Up: one opaque Flat Design task-board interpretation, nine bounded source-token profiles and retained authored card/control radii. Complete themed applications and user outcomes remain outside this evaluation.',
  node: process.version, browser: null, startedAt: new Date().toISOString(), validatorSha256: hash(await readFile(fileURLToPath(import.meta.url))), testedFiles: {}, profileSources: [], identities: [], checks: [], matrix: [], interactions: [], screenshots: [], runtimeErrors: [], resourceFailures: [], externalRequests: [], intentionalFailures: [],
  contrastMethod: 'Actual visible HTML text and real field/action boundaries use computed sRGB colors composited through ancestor backgrounds. Thresholds use raw unrounded ratios; recorded display values round to three decimals. Normal text 4.5:1, large text 3:1; necessary field boundaries against fill and parent 3:1; action boundary or fill against parent 3:1; actual keyboard outline against adjacent parent 3:1. Unsupported readable compositing fails. Native checkbox internals and forced-color native pixels receive bounded visual inspection.',
  limits: ['Chromium only; no screen reader, physical device, other engine, native browser zoom/text enlargement, user study or performance benchmark.', 'Fifteen extracted variables retain palette/font/geometry provenance. Named font binaries, complete source layouts, density, imagery and components are not reproduced. Removing source depth/material can change identity despite retained radii.', 'Computed contrast excludes hidden/placeholder text, native popup/validation UI, checkbox glyph internals, antialiasing and browser decorations. Every visible HTML text node is included.', 'Four fictional tasks are static HTML. Completion, additions, form drafts, filters and preferences live only in this page; reload resets everything. No account, backend, durable save or export exists.']
};
for (const name of ['index.html', 'styles.css', 'preview.js', 'theme-tokens.css', 'theme-tokens.json']) report.testedFiles[name] = hash(await readFile(path.join(preview, name)));
for (const profile of manifest.profiles) {
  assert.equal(hash(await readFile(path.join(root, profile.source.file))), profile.source.sha256, profile.id + ': source fingerprint');
  report.profileSources.push({ id: profile.id, ...profile.source });
}
const prefix = '/interface-atlas/styles/flat-design/preview/';
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (!pathname.startsWith('/interface-atlas/')) { response.writeHead(404).end(); return; }
    const inPreview=pathname.startsWith(prefix), base=inPreview?preview:root;
    const filename = path.resolve(base, pathname.slice(inPreview?prefix.length:'/interface-atlas/'.length) || 'index.html'), relative = path.relative(base, filename);
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
  if (attribute) await page.waitForFunction(({ attribute, value }) => document.documentElement.getAttribute('data-' + attribute) === value, { attribute, value });
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
      if (el.matches('.board-panel,.composer-panel,select,input[type=text],button,.button')) geometry.push({ selector: identify(el), kind: el.matches('.board-panel,.composer-panel') ? 'card' : 'control', corners: [s.borderTopLeftRadius, s.borderTopRightRadius, s.borderBottomRightRadius, s.borderBottomLeftRadius], borders: [s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth] });
      const label = textFor(el); if (!label) continue;
      if (hiddenText(el)) { skipped.push(identify(el)); continue; }
      const bg = background(el), fg = over(parse(s.color), bg), required = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.6667 && parseInt(s.fontWeight) >= 700) ? 3 : 4.5;
      const actualRatio = ratio(fg, bg);
      const sample = { selector: identify(el), text: label.slice(0, 100), ratio: +actualRatio.toFixed(3), required, foreground: s.color, background: bg };
      text.push(sample); if (actualRatio < required) failures.push(sample);
    }
    for (const el of document.querySelectorAll('button,select,input,textarea,summary')) {
      if (!visible(el) || hiddenText(el) || el.type === 'hidden') continue;
      const s = getComputedStyle(el), box = (el.type === 'checkbox' ? el.labels?.[0] : el).getBoundingClientRect();
      targets.push({ selector: identify(el), checkboxLabel: el.type === 'checkbox', width: +box.width.toFixed(2), height: +box.height.toFixed(2) });
      if (el.type === 'checkbox' || el.tagName === 'SUMMARY' || el.tagName === 'A' || el.disabled) continue;
      const bg = background(el), adjacent = background(el.parentElement), border = over(parse(s.borderTopColor), bg), inside = ratio(border, bg), outside = ratio(border, adjacent), fill = ratio(bg, adjacent), button = el.tagName === 'BUTTON';
      const value = button ? Math.max(outside, fill) : Math.min(inside, outside);
      const sample = { selector: identify(el), kind: button ? 'button' : 'field', ratio: +value.toFixed(3), inside: +inside.toFixed(3), outside: +outside.toFixed(3), fill: +fill.toFixed(3), borderWidth: parseFloat(s.borderTopWidth), required: 3 };
      boundaries.push(sample); if (sample.borderWidth < 1 || s.borderTopStyle === 'none' || value < 3) failures.push(sample);
    }
    const links = [...document.querySelectorAll('a[href]')].filter(visible).map(el => { const s = getComputedStyle(el); return { selector: identify(el), href: el.getAttribute('href'), name: el.textContent.trim(), decoration: s.textDecorationLine }; });
    const tasks = [...document.querySelectorAll('#task-list > .task-item')].map(el => ({ id: el.dataset.taskId, visible: visible(el), title: el.querySelector('.task-title')?.textContent.trim(), checked: el.querySelector('.task-toggle')?.checked, state: el.querySelector('.task-state')?.textContent.trim(), priority: el.querySelector('.task-priority')?.textContent.trim() }));
    const sourceCorners = {}; for (const [kind,token] of [['card','--card-radius'],['control','--control-radius']]) { const probe=document.createElement('div'); probe.style.borderRadius='var('+token+')'; document.body.append(probe); const s=getComputedStyle(probe); sourceCorners[kind]=[s.borderTopLeftRadius,s.borderTopRightRadius,s.borderBottomRightRadius,s.borderBottomLeftRadius]; probe.remove(); }
    let focus = null;
    const active = document.activeElement;
    if (active && active !== document.body && active.matches(':focus-visible')) {
      const s = getComputedStyle(active), bg = background(active.parentElement), r = active.getBoundingClientRect(), extent = parseFloat(s.outlineWidth) + parseFloat(s.outlineOffset);
      const clippedBy = ancestors(active.parentElement).filter(el => { const p = getComputedStyle(el), b = el.getBoundingClientRect(); return ['hidden', 'clip'].includes(p.overflowX) && (r.left - extent < b.left || r.right + extent > b.right) || ['hidden', 'clip'].includes(p.overflowY) && (r.top - extent < b.top || r.bottom + extent > b.bottom); }).map(identify);
      focus = { selector: identify(active), width: parseFloat(s.outlineWidth), offset: parseFloat(s.outlineOffset), style: s.outlineStyle, color: s.outlineColor, ratio: +ratio(over(parse(s.outlineColor), bg), bg).toFixed(3), rawRatio: ratio(over(parse(s.outlineColor), bg), bg), clippedBy };
    }
    return { text, boundaries, targets, links, tasks, paint, geometry, sourceCorners, focus, failures, skipped, reflow: { viewport: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }, scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior };
  });
}
async function checkedMetrics(page, name, { fallback = false, focus = false, motion = 'off', forced = false } = {}) {
  const d = await metrics(page);
  assert.ok(d.text.length > 25 && (fallback || d.boundaries.length >= 5), name + ': nonempty measured scope');
  assert.deepEqual(d.failures, [], name + ': contrast ' + JSON.stringify(d.failures));
  assert.ok(d.reflow.scroll <= d.reflow.viewport + 1, name + ': page reflow');
  assert.equal(d.scrollBehavior, 'auto', name + ': immediate document navigation');
  assert.ok(d.tasks.length >= 4 && d.tasks.filter(t => t.visible).every(t => t.title && ['Open','Done'].includes(t.state)), name + ': named tasks and explicit state');
  assert.ok(d.geometry.length >= 7 && d.geometry.every(x => JSON.stringify(x.corners) === JSON.stringify(d.sourceCorners[x.kind])), name + ': actual source card/control corners ' + JSON.stringify(d.geometry.filter(x => JSON.stringify(x.corners) !== JSON.stringify(d.sourceCorners[x.kind]))));
  assert.ok(d.geometry.some(x => x.kind === 'card') && d.geometry.some(x => x.kind === 'control'), name + ': both authored geometry roles measured');
  assert.ok(d.paint.every(x => x.shadow === 'none' && x.image === 'none' && x.filter === 'none' && x.backdrop === 'none' && x.animation === 'none' && x.layers.every(l => l.image === 'none' && l.shadow === 'none' && l.animation === 'none')), name + ': opaque flat paint without shadow/gradient/blur/texture/animation');
  assert.ok(d.paint.filter(x => /^(?:#(?:theme-select|appearance|motion|task-filter|task-title|task-priority|add-task)|input|select|button|label)/.test(x.selector)).every(x => x.transform === 'none'), name + ': no moving or depressed controls');
  assert.ok(d.paint.every(x => x.transitionDuration.split(',').every(v => parseFloat(v) === 0 || (!forced && motion === 'on' && parseFloat(v) <= .12 && x.transitionProperty === 'border-color'))), name + ': only optional 120ms border-color transition');
  assert.ok(d.targets.every(x => x.width >= 43.99 && x.height >= 43.99), name + ': 44px controls/native checkbox labels ' + JSON.stringify(d.targets.filter(x => x.width < 43.99 || x.height < 43.99)));
  assert.ok(d.links.length >= 2 && d.links.every(x => x.name && x.decoration.includes('underline')), name + ': named underlined links');
  if (focus) { assert.ok(d.focus && d.focus.width >= 3 && d.focus.offset >= 3 && d.focus.rawRatio >= 3 && d.focus.style !== 'none', name + ': visible keyboard focus ' + JSON.stringify(d.focus)); assert.deepEqual(d.focus.clippedBy, [], name + ': focus unclipped'); }
  return d;
}
function summarize(d = {}) {
  const min = list => list.length ? Math.min(...list) : null, text=d.text||[], boundaries=d.boundaries||[], targets=d.targets||[], tasks=d.tasks||[], geometry=d.geometry||[], paint=d.paint||[];
  return { textSamples:text.length, minimumTextRatio:min(text.map(x=>x.ratio)), boundarySamples:boundaries.length, minimumFieldBoundaryRatio:min(boundaries.filter(x=>x.kind==='field').map(x=>x.ratio)), minimumButtonBoundaryRatio:min(boundaries.filter(x=>x.kind==='button').map(x=>x.ratio)), targetSamples:targets.length, minimumTargetWidth:min(targets.map(x=>x.width)), minimumTargetHeight:min(targets.map(x=>x.height)), taskCount:tasks.length, visibleTaskCount:tasks.filter(x=>x.visible).length, checkedTaskCount:tasks.filter(x=>x.checked).length, geometrySamples:geometry.length, sourceCornersRetained:geometry.every(x=>JSON.stringify(x.corners)===JSON.stringify(d.sourceCorners?.[x.kind])), allPaintFlat:paint.every(x=>x.shadow==='none'&&x.image==='none'&&x.filter==='none'&&x.backdrop==='none'&&x.animation==='none'), viewportWidth:d.reflow?.viewport??null,pageScrollWidth:d.reflow?.scroll??null,focusedSelector:d.focus?.selector??null,focusRatio:d.focus?.ratio??null,focusWidth:d.focus?.width??null,focusOffset:d.focus?.offset??null,focusClippedBy:d.focus?.clippedBy??[] };
}
async function capture(page,theme,appearance,state,settings={}) { try { report.interactions.push({theme,appearance,state,passed:true,...await checkedMetrics(page,[theme,appearance,state].join('/'),settings)}); } catch(error){report.interactions.push({theme,appearance,state,passed:false,failure:error.message});} }
async function screenshot(page,name) { await page.screenshot({path:path.join(output,name),fullPage:!name.startsWith('forced-colors-')});report.screenshots.push(name); }
function project(raw) {
  const measurements=Object.keys(summarize());
  const table=(rows,keys)=>({columns:[...keys,'passed',...measurements],rows:rows.map(row=>[...keys.map(k=>row[k]),row.passed,...measurements.map(k=>row.passed?summarize(row)[k]:null)])});
  const prune=value=>value&&typeof value==='object'?value.text&&value.boundaries&&value.paint?summarize(value):Array.isArray(value)?value.map(prune):Object.fromEntries(Object.entries(value).map(([k,v])=>[k,prune(v)])):value;
  return {schema_version:1,scope:report.scope,node:report.node,browser:report.browser,startedAt:report.startedAt,finishedAt:report.finishedAt,passed:report.passed,rawReport:{sha256:hash(raw),bytes:Buffer.byteLength(raw),storage:'Temporary browser run directory; not distributed with this repository.'},validatorSha256:report.validatorSha256,testedFiles:report.testedFiles,profileSources:report.profileSources,identities:report.identities,contrastMethod:report.contrastMethod,matrix:table(report.matrix,['theme','appearance','width','motion']),interactions:table(report.interactions,['theme','appearance','state']),checks:prune(report.checks),runtimeErrors:report.runtimeErrors,resourceFailures:report.resourceFailures,externalRequests:report.externalRequests,intentionalFailures:report.intentionalFailures,screenshots:report.screenshots,limits:report.limits};
}
async function publishedDocumentLinks() {
  // Simulate only the builder's initial Markdown href rewrite, then run real JS.
  const initial='../../../themes/editorial/',published='https://github.com/tamir39/interface-atlas/blob/main/themes/';let html=await readFile(path.join(preview,'index.html'),'utf8');
  for(const file of ['README.md','sources.md']){assert.ok(html.includes('href="'+initial+file+'"'));html=html.replace('href="'+initial+file+'"','href="'+published+'editorial/'+file+'"');}
  const context=await contextFor({viewport:{width:1280,height:900}}),fixture=await context.newPage();await fixture.route(url,route=>route.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));await fixture.goto(url);await ready(fixture);const states=[];
  for(const theme of ['editorial',...ids]){await select(fixture,'theme-select',theme);const links={readme:await fixture.locator('#theme-source-link').getAttribute('href'),credits:await fixture.locator('#theme-credits-link').getAttribute('href')};assert.equal(links.readme,published+theme+'/README.md');assert.equal(links.credits,published+theme+'/sources.md');states.push({theme,...links});}
  await context.close();return {scope:'Bounded simulated initial build href rewrite, actual initialization and theme changes; no remote navigation or full deployment claim.',states};
}
async function taskRecords(page) { return page.locator('#task-list > .task-item').evaluateAll(els=>els.map(el=>({id:el.dataset.taskId,title:el.querySelector('.task-title').textContent.trim(),checked:el.querySelector('.task-toggle').checked,state:el.querySelector('.task-state').textContent.trim(),priority:el.querySelector('.task-priority').textContent.trim(),visible:!!el.getClientRects().length}))); }
async function checkboxNames(page) { const names={};for(const item of await taskRecords(page)){if(!item.visible)continue;const box=page.locator('#task-'+item.id),snapshot=await box.ariaSnapshot();const name=/checkbox "([^"]+)"/.exec(snapshot)?.[1];assert.ok(name,'Actual checkbox name: '+snapshot);assert.equal(await page.getByRole('checkbox',{name,exact:true}).count(),1);names[item.id]=name;}return names; }
async function invalidTitle(page,value,expected) {await page.locator('#task-title').evaluate((el,value)=>{el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));},value);await page.locator('#add-task').click();assert.equal(await page.locator('#task-title').getAttribute('aria-invalid'),'true');assert.equal(await page.evaluate(()=>document.activeElement?.id),'task-title');const result=await page.locator('#task-title').evaluate(el=>({valid:el.validity.valid,valueMissing:el.validity.valueMissing,customError:el.validity.customError,validationMessage:el.validationMessage,described:(el.getAttribute('aria-describedby')||'').split(/\s+/).filter(Boolean).map(id=>({id,text:document.getElementById(id)?.textContent.trim(),visible:!!document.getElementById(id)?.getClientRects().length}))}));assert.equal(result.valid,false);assert.equal(result[expected],true);assert.ok(result.described.some(x=>x.id==='title-error'&&x.visible&&x.text));return result; }
async function ready(page) {await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');if(await page.locator('details.settings').getAttribute('open')===null)await page.locator('details.settings > summary').click();}
async function nativeSkip(page) { let destination=null; for(let n=0;n<16;n++){await page.keyboard.press('Shift+Tab');destination=await page.evaluate(()=>document.activeElement?.matches('.skip-link')?document.activeElement.getAttribute('href'):null);if(destination)break;}assert.ok(destination?.startsWith('#'),'Native keyboard traversal reaches skip link');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement?.id),destination.slice(1));return destination; }
try {
  browser=await playwright.chromium.launch({headless:true,...(options.browser?{executablePath:path.resolve(options.browser)}:{})});report.browser=browser.version();
  const context=await contextFor({viewport:{width:1280,height:900},colorScheme:'light'}),page=await context.newPage();await page.goto(url);await ready(page);
  assert.deepEqual(await page.locator('#theme-select option').evaluateAll(els=>els.map(el=>el.value).sort()),[...ids].sort());assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('main').count(),1);assert.equal(await page.locator('[tabindex]').evaluateAll(els=>els.filter(el=>Number(el.getAttribute('tabindex'))>0).length),0);assert.ok(await page.locator('select,input').evaluateAll(els=>els.every(el=>el.labels?.length>0)));assert.equal(await page.locator('#motion').inputValue(),'off');
  const originalTasks=await taskRecords(page);assert.deepEqual(originalTasks.map(x=>x.id),seedIds);assert.equal(originalTasks.filter(x=>x.checked).length,1);assert.equal(originalTasks.find(x=>x.id==='source-credits').checked,true);
  pass('Nine actual source profiles, four static tasks, native labeled controls, one h1/main, no positive tabindex and motion off',{originalTasks,publishedDocumentLinkRegression:await publishedDocumentLinks()});
  const focusSelectors=['#theme-select','#task-filter','#task-focus-states','#task-title','#task-priority','#add-task'];
  for(const theme of ids)for(const appearance of ['light','dark']){
    await select(page,'task-filter','all');await page.locator('#task-focus-states').uncheck();await page.locator('#task-title').fill('');await select(page,'theme-select',theme);await select(page,'appearance',appearance);
    const values=await page.locator('html').evaluate((el,keys)=>Object.fromEntries(keys.map(key=>[key,getComputedStyle(el).getPropertyValue(key).trim()])),properties);assert.deepEqual(values,manifest.profiles.find(x=>x.id===theme).tokens[appearance],theme+'/'+appearance+': 15 source variables');const documentLinks={readme:await page.locator('#theme-source-link').getAttribute('href'),credits:await page.locator('#theme-credits-link').getAttribute('href')};assert.equal(documentLinks.readme,'../../../themes/'+theme+'/README.md');assert.equal(documentLinks.credits,'../../../themes/'+theme+'/sources.md');report.identities.push({theme,appearance,values,documentLinks});
    for(const width of [320,1280])for(const motion of ['off','on']){await page.setViewportSize({width,height:900});await select(page,'motion',motion);await page.mouse.move(0,0);try{report.matrix.push({theme,appearance,width,motion,passed:true,...await checkedMetrics(page,[theme,appearance,width,motion].join('/'),{motion})});}catch(error){report.matrix.push({theme,appearance,width,motion,passed:false,failure:error.message});}}
    await select(page,'motion','off');await page.setViewportSize({width:320,height:900});const names=await checkboxNames(page);await page.locator('#task-focus-states').check();assert.deepEqual(await checkboxNames(page),names,'Stable names after completion');await capture(page,theme,appearance,'checked');await invalidTitle(page,'','valueMissing');await capture(page,theme,appearance,'invalid-title');await page.locator('#task-title').fill('A useful local task');await page.locator('.task-item').first().hover();assert.ok(await page.locator('.task-item').first().evaluate(el=>el.matches(':hover')));await capture(page,theme,appearance,'hover');
    for(const motion of ['off','on']){await select(page,'motion',motion);await page.locator('#add-task').hover();await page.mouse.down();await page.waitForTimeout(130);assert.ok(await page.locator('#add-task').evaluate(el=>el.matches(':active')&&getComputedStyle(el).transform==='none'));await capture(page,theme,appearance,'active-'+motion,{motion});await page.mouse.move(0,0);await page.mouse.up();}
    await select(page,'motion','off');for(const selector of focusSelectors){await page.keyboard.press('Tab');await page.locator(selector).focus();await capture(page,theme,appearance,'focus:'+selector,{focus:true});}
    if(['botanical','play','swiss','layered'].includes(theme))await screenshot(page,theme+'-'+appearance+'-320.png');
  }
  assert.equal(report.matrix.length,72);assert.deepEqual(report.matrix.filter(x=>!x.passed),[],'Base matrix failures');assert.equal(new Set(report.identities.filter(x=>x.appearance==='light').map(x=>JSON.stringify(x.values))).size,9);pass('72 base states: actual contrast, 320/1280 reflow, 44px controls and retained source corners');
  assert.equal(report.interactions.length,18*(5+focusSelectors.length));assert.deepEqual(report.interactions.filter(x=>!x.passed),[],'Interaction context failures');pass(report.interactions.length+' measured interactions including '+18*focusSelectors.length+' keyboard-focus contexts',{focusSelectors});
  await page.setViewportSize({width:1280,height:900});await page.reload();await ready(page);await nativeSkip(page);const names=await checkboxNames(page);await page.locator('#task-focus-states').focus();await page.keyboard.press('Space');assert.equal(await page.locator('#task-focus-states').isChecked(),true);assert.equal(await page.evaluate(()=>document.activeElement?.id),'task-focus-states');assert.deepEqual(await checkboxNames(page),names);pass('Native skip navigation, Space completion, All-filter focus retention and stable accessible checkbox names',names);
  const validityTrials=[];await select(page,'task-priority','high');for(const[value,expected]of [['','valueMissing'],['ab','customError'],['   ','customError'],['a'.repeat(65),'customError']])validityTrials.push({value,...await invalidTitle(page,value,expected)});assert.equal(await page.locator('.task-item').count(),4);assert.equal(await page.locator('#task-priority').inputValue(),'high');pass('Required and trimmed 3-64 title bounds reject blank/short/whitespace/programmatic65 with described error and first focus; task state retained',validityTrials);
  await page.locator('#task-title').fill('a'.repeat(64));await page.setViewportSize({width:320,height:900});await page.locator('#add-task').click();assert.equal(await page.locator('#task-user-1').isChecked(),false);assert.equal(await page.locator('[data-task-id=user-1] .task-title').innerText(),'a'.repeat(64));assert.equal(await page.locator('#task-title').inputValue(),'');assert.equal(await page.locator('#task-priority').inputValue(),'high');assert.equal(await page.evaluate(()=>document.activeElement?.id),'task-title');const maximumMetrics=await checkedMetrics(page,'64-unbroken-added-task');await screenshot(page,'maximum-title-320.png');
  const literal='Café <b>review</b> flow';await page.locator('#task-title').fill('  '+literal+'  ');await select(page,'task-priority','low');await page.locator('#add-task').click();assert.equal(await page.locator('[data-task-id=user-2] .task-title').innerText(),literal);assert.equal(await page.locator('[data-task-id=user-2] .task-title b').count(),0);assert.equal(await page.locator('[data-task-id=user-2] .task-priority').innerText(),'Low priority');assert.equal(await page.locator('#task-priority').inputValue(),'low');assert.equal(await page.locator('#task-title').inputValue(),'');const literalRecords=await taskRecords(page);pass('64-character title reflows after real addition; accented/literal markup becomes trimmed plain text, priority retained and title focus restored',{maximumMetrics,literal,literalRecords});
  await page.reload();await ready(page);await select(page,'task-filter','open');await page.locator('#task-focus-states').focus();await page.keyboard.press('Space');assert.equal(await page.locator('#task-focus-states').isVisible(),false);assert.equal(await page.evaluate(()=>document.activeElement?.id),'task-responsive-navigation');await page.keyboard.press('Space');assert.equal(await page.evaluate(()=>document.activeElement?.id),'task-form-errors');await page.keyboard.press('Space');assert.equal(await page.evaluate(()=>document.activeElement?.id),'task-filter');assert.equal(await page.locator('.task-item:visible').count(),0);assert.ok(await page.locator('#empty-tasks').isVisible());const emptyStatus=(await page.locator('#task-status').innerText()).trim();assert.ok(emptyStatus);const emptyMetrics=await checkedMetrics(page,'open-filter-completed-empty');await page.locator('#show-all').click();assert.equal(await page.locator('#task-filter').inputValue(),'all');assert.equal(await page.evaluate(()=>document.activeElement?.id),'task-filter');assert.deepEqual(await page.locator('.task-item:visible').evaluateAll(els=>els.map(el=>el.dataset.taskId)),seedIds);assert.equal(await page.locator('.task-toggle:checked').count(),4);pass('Open-filter completion hides rows with next-checkbox then filter focus; empty state and Show all restore original order without resetting completion',{emptyStatus,emptyMetrics,tasks:await taskRecords(page)});
  await page.reload();await ready(page);await select(page,'task-filter','done');await page.locator('#task-source-credits').focus();await page.keyboard.press('Space');assert.equal(await page.locator('.task-item:visible').count(),0);assert.equal(await page.evaluate(()=>document.activeElement?.id),'task-filter');const draft='  Café <b>review</b> flow  ';await page.locator('#task-title').fill(draft);await select(page,'task-priority','high');for(const[id,value]of [['theme-select','botanical'],['appearance','dark'],['motion','on']])await select(page,id,value);assert.equal(await page.locator('#task-title').inputValue(),draft);assert.equal(await page.locator('#task-priority').inputValue(),'high');assert.equal(await page.locator('#task-filter').inputValue(),'done');assert.equal(await page.locator('#task-source-credits').isChecked(),false);await page.locator('#add-task').click();assert.equal(await page.locator('#task-user-1').isVisible(),false);assert.equal(await page.locator('#task-title').inputValue(),'');assert.equal(await page.locator('#task-priority').inputValue(),'high');assert.equal(await page.evaluate(()=>document.activeElement?.id),'task-title');const hiddenStatus=(await page.locator('#task-status').innerText()).trim();assert.match(hiddenStatus,/hidden|filter/i);await page.locator('#show-all').click();const restored=await taskRecords(page);assert.deepEqual(restored.map(x=>x.id),[...seedIds,'user-1']);assert.equal(restored.find(x=>x.id==='user-1').title,literal);assert.equal(restored.find(x=>x.id==='user-1').priority,'High priority');assert.ok(restored.every(x=>x.visible&&!x.checked));pass('Done-filter reopening handles lost row focus; theme/appearance/motion retain raw draft, priority, filter and task state; hidden new task is explained and recoverable',{draft,hiddenStatus,restored});
  await select(page,'motion','off');await page.setViewportSize({width:1280,height:900});await screenshot(page,'desktop-task-board.png');await page.reload();await ready(page);assert.deepEqual(await taskRecords(page),originalTasks);assert.equal(await page.locator('#task-title').inputValue(),'');assert.equal(await page.locator('#task-priority').inputValue(),'normal');assert.equal(await page.locator('#task-filter').inputValue(),'all');assert.equal(await page.locator('#theme-select').inputValue(),'editorial');assert.equal(await page.locator('#appearance').inputValue(),'light');assert.equal(await page.locator('#motion').inputValue(),'off');pass('Reload restores exact four original tasks and resets additions/completion/draft/priority/filter/preferences');
  await select(page,'appearance','system');await page.emulateMedia({colorScheme:'dark'});const dark=await page.locator('html').evaluate(el=>getComputedStyle(el).getPropertyValue('--page').trim());await page.emulateMedia({colorScheme:'light'});const light=await page.locator('html').evaluate(el=>getComputedStyle(el).getPropertyValue('--page').trim());assert.notEqual(light,dark);pass('System appearance follows live device changes',{light,dark});
  await select(page,'motion','on');await page.emulateMedia({reducedMotion:'reduce'});const reduced=await checkedMetrics(page,'reduced-motion-overrides-on',{forced:true});pass('Reduced motion overrides explicit motion-on to immediate feedback',reduced);await context.close();
  const forcedContext=await contextFor({viewport:{width:320,height:900},forcedColors:'active'}),forced=await forcedContext.newPage();await forced.goto(url);await ready(forced);await forced.locator('#task-focus-states').check();await select(forced,'motion','on');await invalidTitle(forced,'','valueMissing');await forced.keyboard.press('Tab');await forced.locator('#task-title').focus();const forcedTitle=await checkedMetrics(forced,'forced-colors-title-error-focus',{forced:true,focus:true});
  const roles=await forced.evaluate(()=>{const expected={};for(const role of ['Canvas','CanvasText','LinkText','ButtonFace','ButtonText']){const el=document.createElement('span');el.style.color=role;document.body.append(el);expected[role]=getComputedStyle(el).color;el.remove();}const sample=selector=>{const el=document.querySelector(selector),s=getComputedStyle(el);return{color:s.color,background:s.backgroundColor,outline:s.outlineColor,appearance:s.appearance,checked:el.checked??null};};return{expected,body:sample('body'),board:sample('.board-panel'),title:sample('#task-title'),heading:sample('h1'),link:sample('#theme-source-link'),button:sample('#add-task'),checkbox:sample('#task-focus-states')};});
  for(const item of ['body','board','heading'])assert.equal(roles[item].color,roles.expected.CanvasText);assert.equal(roles.body.background,roles.expected.Canvas);assert.equal(roles.title.color,roles.expected.ButtonText);assert.equal(roles.title.background,roles.expected.ButtonFace);assert.equal(roles.link.color,roles.expected.LinkText);assert.equal(roles.button.color,roles.expected.ButtonText);assert.equal(roles.button.background,roles.expected.ButtonFace);assert.equal(forcedTitle.focus.color,roles.expected.CanvasText);assert.equal(roles.checkbox.appearance,'auto');assert.equal(roles.checkbox.checked,true);await screenshot(forced,'forced-colors-title-320.png');await forced.keyboard.press('Tab');await forced.locator('#task-focus-states').focus();const forcedCheckbox=await checkedMetrics(forced,'forced-colors-checkbox-focus',{forced:true,focus:true});await screenshot(forced,'forced-colors-checkbox-320.png');await forced.locator('#add-task').hover();await forced.mouse.down();const forcedAction=await checkedMetrics(forced,'forced-colors-action-active',{forced:true});await screenshot(forced,'forced-colors-action-320.png');await forced.mouse.move(0,0);await forced.mouse.up();pass('Forced colors retain actual system content/field/link/action/focus roles, native checked checkbox and immediate motion',{roles,titleFocus:forcedTitle,checkboxFocus:forcedCheckbox,activeAction:forcedAction});await forcedContext.close();
  for(const mode of ['javascript-disabled','script-blocked']){const fallbackContext=await contextFor({viewport:{width:320,height:900},javaScriptEnabled:mode!=='javascript-disabled'},mode==='script-blocked'?mode:'ordinary');if(mode==='script-blocked')await fallbackContext.route('**/preview.js',route=>route.abort('failed'));const fallback=await fallbackContext.newPage();await fallback.goto(url);for(const id of ['theme-select','appearance','motion','task-filter','task-title','task-priority','add-task'])assert.equal(await fallback.locator('#'+id).isDisabled(),true);assert.equal(await fallback.locator('.task-toggle:disabled').count(),4);assert.ok((await fallback.locator('#js-status').innerText()).trim());assert.deepEqual(await taskRecords(fallback),originalTasks);await fallback.locator('details.settings > summary').click();const data=await checkedMetrics(fallback,mode,{fallback:true});await nativeSkip(fallback);const details=fallback.locator('details').first();if(await details.count()){const before=await details.getAttribute('open');await details.locator('summary').click();assert.notEqual(await details.getAttribute('open'),before);}await screenshot(fallback,mode+'-320.png');pass(mode+': exact four original tasks readable, unavailable enhancements disabled/explained and native skip/disclosure work',data);await fallbackContext.close();}
  assert.deepEqual(report.runtimeErrors,[]);assert.deepEqual(report.resourceFailures,[]);assert.deepEqual(report.externalRequests,[]);for(const[name,fingerprint]of Object.entries(report.testedFiles))assert.equal(hash(await readFile(path.join(preview,name))),fingerprint,'Runtime frozen: '+name);assert.equal(hash(await readFile(fileURLToPath(import.meta.url))),report.validatorSha256,'Validator frozen');pass('No ordinary errors/resources/external requests; source runtime and validator stayed frozen');report.passed=true;
} catch(error){report.passed=false;report.error={message:error.message,stack:error.stack};process.exitCode=1;}
finally {report.finishedAt=new Date().toISOString();if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));const raw=JSON.stringify(report,null,2)+'\n';await writeFile(path.join(output,'results.json'),raw);await writeFile(path.join(output,'compact-results.json'),JSON.stringify(project(raw),null,2)+'\n');console.log(JSON.stringify({passed:report.passed,output,baseStates:report.matrix.length,interactionContexts:report.interactions.length,groups:report.checks.length,error:report.error?.message||null},null,2));}
