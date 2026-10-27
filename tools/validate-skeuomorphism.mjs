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
    throw new Error('Usage: node tools/validate-skeuomorphism.mjs [--module path/to/playwright/index.mjs] [--browser path/to/chromium] [--output fresh-directory] [--preview directory]');
  }
  options[process.argv[i].slice(2)] = process.argv[i + 1];
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = path.resolve(options.preview || path.join(root, 'styles/skeuomorphism/preview'));
const output = path.resolve(options.output || path.join(os.tmpdir(), 'atlas-skeuo-' + Date.now()));
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
  schema_version: 1, scope: 'Skeuomorphism on nine bounded source-token profiles: retained cover/control corners with explicit 2px paper-artifact override; complete theme apps outside evaluation',
  node: process.version, browser: null, startedAt: new Date().toISOString(), testedFiles: {}, validatorSha256: hash(await readFile(fileURLToPath(import.meta.url))),
  profileSources: [], identities: [], checks: [], matrix: [], interactions: [], screenshots: [], runtimeErrors: [], externalRequests: [], resourceFailures: [], intentionalFailures: [],
  contrastMethod: 'Computed sRGB foreground/background and real control boundaries composited through opaque ancestors. Visible normal text 4.5:1, large text 3:1; necessary field borders against fill and parent 3:1; button boundary or fill 3:1; selected and keyboard outlines 3:1. Decorative material paint is outside arithmetic pairs: opaque Raised-face containment and z-order checks plus bounded pixel inspection supplement every computed sample retained in the raw report.',
  limits: [
    'Chromium only; no screen reader, physical device, other browser engine, native zoom/text enlargement, backend, user study or performance benchmark.',
    'Profiles preserve 15 extracted source variables and retained outer cover/ordinary-control corners. Paper artifacts deliberately use 2px geometry. The shared task does not reproduce complete theme layouts, assets, density or font binaries.',
    'Contrast excludes hidden/placeholder text, native popup/validation UI, glyph internals, SVG paths and antialiasing. Visible decorative HTML text remains measured. Unsupported compositing in readable paths fails.',
    'Computed pairs omit decorative grain, rules, shadow and binding paint. Structural containment/z-order checks and bounded screenshots supplement arithmetic; they do not certify all pixels or complete accessibility.',
    'Four fictional notes and drafts are page-only in-memory state; reload resets them. No account, backend, external resource or durable save is present.'
  ]};
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
    const identify = el => el.id ? '#' + el.id : el.tagName.toLowerCase() + (el.dataset.noteId ? '.note-option[data-note-id="' + el.dataset.noteId + '"]' : typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).join('.') : '');
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
    const surfaces = [...document.querySelectorAll('.paper-page,.fieldbook-cover')].filter(visible).map(el => {
      const s = getComputedStyle(el), child = [...el.children].find(n => n.classList.contains(el.classList.contains('paper-page')?'paper-face':'fieldbook-face')), c = child && getComputedStyle(child), r = el.getBoundingClientRect(), q = child?.getBoundingClientRect();
      const layers = ['::before','::after'].map(pseudo => { const p = getComputedStyle(el,pseudo); return { pseudo, content:p.content, position:p.position, zIndex:p.zIndex, background:p.backgroundImage, shadow:p.boxShadow, animation:p.animationName, transition:p.transitionDuration }; });
      const readable = [...el.querySelectorAll('*')].filter(n => visible(n) && (textFor(n) || n.matches('input,select,textarea,button')) && n.closest('.paper-page,.fieldbook-cover') === el);
      const uncontained = readable.filter(n => !child?.contains(n) && child !== n).map(identify);
      const probe = document.createElement('div'); probe.style.backgroundColor = 'var(--raised)'; el.append(probe); const raised = getComputedStyle(probe).backgroundColor; probe.remove();
      const faceGenerated=['::before','::after'].map(pseudo=>getComputedStyle(child,pseudo).content);return {selector:identify(el),paper:el.classList.contains('paper-page'),faceGenerated,alpha:parse(s.backgroundColor)[3],radius:s.borderRadius,blur:s.backdropFilter,overflow:[s.overflowX,s.overflowY],isolation:s.isolation,shadow:s.boxShadow,layers,raised,uncontained,child:child?{alpha:parse(c.backgroundColor)[3],background:c.backgroundColor,backgroundImage:c.backgroundImage,radius:c.borderRadius,zIndex:c.zIndex,position:c.position,shadow:c.boxShadow,inset:[q.left-r.left,q.top-r.top,r.right-q.right,r.bottom-q.bottom].map(v=>+v.toFixed(2))}:null};
    });
    const ordinaryGeometry = [...document.querySelectorAll('input,select,textarea,button:not(.note-option)')].filter(visible).map(el => {
      const probe = document.createElement('div'); probe.style.borderRadius = 'var(--control-radius)'; el.parentElement.append(probe);
      const expected = getComputedStyle(probe).borderRadius; probe.remove(); return {selector:identify(el),radius:getComputedStyle(el).borderRadius,expected};
    });
    const covers = [...document.querySelectorAll('.fieldbook-cover,.note-option')].filter(visible).map(el => {
      const probe=document.createElement('div'); probe.style.borderRadius='var(--card-radius)'; el.append(probe); const expected=getComputedStyle(probe).borderRadius; probe.remove(); return {selector:identify(el),radius:getComputedStyle(el).borderRadius,expected};
    });
    const binderRails=[...document.querySelectorAll('.binder-rail')].filter(visible).map(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect(),face=el.parentElement.querySelector('.paper-face'),q=face.getBoundingClientRect(),rings=[...el.children].map(n=>{const b=n.getBoundingClientRect();return {right:b.right,top:b.top,bottom:b.bottom};});return {selector:identify(el),hidden:el.getAttribute('aria-hidden'),empty:!el.textContent.trim(),zIndex:s.zIndex,faceZIndex:getComputedStyle(face).zIndex,pointerEvents:s.pointerEvents,faceLeft:q.left,right:r.right,top:r.top,bottom:r.bottom,faceTop:q.top,faceBottom:q.bottom,rings};});
    let focus = null;
    const active = document.activeElement;
    if (active && active !== document.body && active.matches(':focus-visible')) {
      const s=getComputedStyle(active),bg=background(active.parentElement),ring=over(parse(s.outlineColor),bg),r=active.getBoundingClientRect(),extent=parseFloat(s.outlineWidth)+parseFloat(s.outlineOffset);
      const clippedBy=ancestors(active.parentElement).filter(el=>{const p=getComputedStyle(el),b=el.getBoundingClientRect();return ['hidden','clip'].includes(p.overflowX)&&(r.left-extent<b.left||r.right+extent>b.right)||['hidden','clip'].includes(p.overflowY)&&(r.top-extent<b.top||r.bottom+extent>b.bottom);}).map(identify);
      focus={selector:identify(active),width:parseFloat(s.outlineWidth),style:s.outlineStyle,offset:parseFloat(s.outlineOffset),ratio:+ratio(ring,bg).toFixed(3),color:s.outlineColor,clippedBy};
    }
    return {text,boundaries,failures,skipped,targets,surfaces,ordinaryGeometry,covers,binderRails,selectedIndicators:[...document.querySelectorAll('.note-option[aria-pressed="true"]')].filter(visible).map(el=>{const s=getComputedStyle(el),bg=background(el.parentElement);return {selector:identify(el),width:parseFloat(s.outlineWidth),style:s.outlineStyle,offset:parseFloat(s.outlineOffset),ratio:+ratio(over(parse(s.outlineColor),bg),bg).toFixed(3),text:el.querySelector('.choice-state')?.textContent.trim()};}),focus,reflow:{viewport:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}};
  });
}
async function checkedMetrics(page,name,{fallback=false,forced=false,focus=false,hiddenSelection=false}={}) {
  const data=await metrics(page);
  assert.ok(data.text.length>0&&(fallback||data.boundaries.length>=8),name+': measured nonempty scope');
  assert.deepEqual(data.failures,[],name+': contrast '+JSON.stringify(data.failures));
  assert.ok(data.reflow.scroll<=data.reflow.viewport+1,name+': whole-page horizontal overflow');
  assert.ok(data.surfaces.length>=1,name+': paper artifacts present');
  assert.ok(data.surfaces.every(s=>s.blur==='none'&&s.child?.alpha===1&&s.child.backgroundImage==='none'&&s.child.shadow==='none'&&!s.uncontained.length&&s.faceGenerated.every(v=>['none','normal','""'].includes(v))&&s.layers.every(l=>['none','normal','""'].includes(l.content))&&s.child.position==='relative'&&s.layers.filter(l=>!['none','normal'].includes(l.content)).every(l=>l.position==='absolute'&&Number(l.zIndex)<Number(s.child.zIndex))),name+': opaque reading face above decorative paper layers '+JSON.stringify(data.surfaces));
  if(!forced){
    assert.ok(data.surfaces.every(s=>(!s.paper||s.radius==='2px')&&s.child.background===s.raised&&s.child.inset.every(v=>v>=0)),name+': explicit 2px paper artifact and Raised content face');
    assert.ok(data.binderRails.length&&data.binderRails.every(s=>s.hidden==='true'&&s.empty&&s.pointerEvents==='none'&&Number(s.zIndex)<Number(s.faceZIndex)&&s.right<=s.faceLeft&&s.rings.every(r=>r.right<=s.faceLeft)),name+': decorative binding stays outside opaque reading face '+JSON.stringify(data.binderRails));
    assert.ok(data.ordinaryGeometry.every(s=>s.radius===s.expected),name+': ordinary controls retain source geometry '+JSON.stringify(data.ordinaryGeometry));
    assert.ok(data.covers.length&&data.covers.every(s=>s.radius===s.expected),name+': cover retains source card geometry '+JSON.stringify(data.covers));
  }
  if(!fallback&&!hiddenSelection) assert.ok(data.selectedIndicators.length===1&&data.selectedIndicators.every(s=>s.width>=2&&s.style!=='none'&&s.ratio>=3&&/selected/i.test(s.text)),name+': visible selection has text and 3:1 outline '+JSON.stringify(data.selectedIndicators));
  assert.ok(data.targets.every(t=>t.width>=43.99&&t.height>=43.99),name+': 44px targets '+JSON.stringify(data.targets));
  if(focus){assert.ok(data.focus&&data.focus.width>=3&&data.focus.offset>=3&&data.focus.style!=='none'&&data.focus.ratio>=3,name+': visible keyboard outline '+JSON.stringify(data.focus));assert.deepEqual(data.focus.clippedBy,[],name+': focus not clipped');}
  return data;
}
async function screenshot(page,name){await page.screenshot({path:path.join(output,name),fullPage:true});report.screenshots.push(name);}
async function capture(page,theme,appearance,state,options={}){const name=[theme,appearance,state].join('/');try{report.interactions.push({theme,appearance,state,passed:true,...await checkedMetrics(page,name,options)});}catch(error){report.interactions.push({theme,appearance,state,passed:false,failure:error.message});}}
function summarize(data){
  const min=list=>list.length?Math.min(...list):null;
  return {textSamples:data.text.length,boundarySamples:data.boundaries.length,minimumTextRatio:min(data.text.map(x=>x.ratio)),minimumFieldBoundaryRatio:min(data.boundaries.filter(x=>x.kind==='field').map(x=>x.ratio)),minimumButtonBoundaryRatio:min(data.boundaries.filter(x=>x.kind==='button').map(x=>x.ratio)),targetSamples:data.targets.length,minimumTargetWidth:min(data.targets.map(x=>x.width)),minimumTargetHeight:min(data.targets.map(x=>x.height)),paperSamples:data.surfaces.length,allOpaqueContentProtected:data.surfaces.every(x=>x.child?.alpha===1&&x.child.backgroundImage==='none'&&x.child.shadow==='none'&&!x.uncontained.length),allPaperArtifactGeometry:data.surfaces.every(x=>(!x.paper||x.radius==='2px')&&x.child.background===x.raised),allBindingOutsideReadingFace:data.binderRails.every(s=>s.hidden==='true'&&s.empty&&Number(s.zIndex)<Number(s.faceZIndex)&&s.right<=s.faceLeft&&s.rings.every(r=>r.right<=s.faceLeft)),allFacePaintAboveDecoration:data.surfaces.every(x=>x.layers.filter(l=>!['none','normal'].includes(l.content)).every(l=>Number(l.zIndex)<Number(x.child?.zIndex))),allSourceCoverGeometry:data.covers.every(x=>x.radius===x.expected),allOrdinarySourceGeometry:data.ordinaryGeometry.every(x=>x.radius===x.expected),minimumSelectedOutlineRatio:min(data.selectedIndicators.map(x=>x.ratio)),minimumSelectedOutlineWidth:min(data.selectedIndicators.map(x=>x.width)),viewportWidth:data.reflow.viewport,pageScrollWidth:data.reflow.scroll,focusedSelector:data.focus?.selector??null,focusRatio:data.focus?.ratio??null,focusWidth:data.focus?.width??null,focusOffset:data.focus?.offset??null,focusClippedBy:data.focus?.clippedBy??[],skippedText:data.skipped};
}
function project(report,raw){
  const measurements=Object.keys(summarize(report.matrix.find(x=>x.passed)));
  const table=(rows,keys)=>({columns:[...keys,'passed',...measurements],rows:rows.map(row=>[...keys.map(k=>row[k]),row.passed,...measurements.map(k=>row.passed?summarize(row)[k]:null)])});
  const prune=value=>value&&typeof value==='object'?value.text&&value.boundaries&&value.surfaces?summarize(value):Array.isArray(value)?value.map(prune):Object.fromEntries(Object.entries(value).map(([key,v])=>[key,prune(v)])):value;
  return {schema_version:1,scope:report.scope,node:report.node,browser:report.browser,startedAt:report.startedAt,finishedAt:report.finishedAt,passed:report.passed,rawReport:{sha256:hash(raw),bytes:Buffer.byteLength(raw),storage:'Temporary browser run directory; not distributed with this repository.'},validatorSha256:report.validatorSha256,testedFiles:report.testedFiles,profileSources:report.profileSources,identities:report.identities,contrastMethod:report.contrastMethod,matrix:table(report.matrix,['theme','appearance','width','motion']),interactions:table(report.interactions,['theme','appearance','state']),checks:prune(report.checks),runtimeErrors:report.runtimeErrors,resourceFailures:report.resourceFailures,externalRequests:report.externalRequests,intentionalFailures:report.intentionalFailures,screenshots:report.screenshots,limits:report.limits};
}
async function applied(page){return page.evaluate(()=>({id:document.querySelector('.note-option[aria-pressed=true]').dataset.noteId,title:document.querySelector('#applied-title').textContent.trim(),body:document.querySelector('#applied-body').textContent.trim(),tags:document.querySelector('#applied-tags').textContent.trim()}));}
async function setProgrammatic(page,selector,value){await page.locator(selector).evaluate((el,v)=>{el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));},value);}
async function noteNames(page){const names={};for(const id of ['window-light','corner-shop','small-route','rain-check']){const locator=page.locator('.note-option[data-note-id="'+id+'"]');if(!await locator.isVisible())continue;const snapshot=await locator.ariaSnapshot();const name=/^- button "([^"]+)"/.exec(snapshot)?.[1];assert.ok(name&&!/selected/i.test(name),'Stable note name excludes visual state: '+snapshot);assert.equal(await page.getByRole('button',{name,exact:true}).count(),1,'Actual accessible button mapping');names[id]=name;}return names;}
async function invalid(page,selector,expected,unchanged){await page.locator('#apply-button').click();assert.equal(await page.locator(selector).getAttribute('aria-invalid'),'true',selector+' invalid semantics');assert.equal(await page.evaluate(()=>document.activeElement?.id),selector.slice(1),'First invalid field receives focus');const details=await page.locator(selector).evaluate(el=>({valid:el.validity.valid,valueMissing:el.validity.valueMissing,tooShort:el.validity.tooShort,tooLong:el.validity.tooLong,customError:el.validity.customError,described:(el.getAttribute('aria-describedby')||'').split(/\s+/).filter(Boolean).map(id=>({id,text:document.getElementById(id)?.textContent.trim(),visible:!!document.getElementById(id)?.getClientRects().length}))}));assert.equal(details.valid,false);if(expected)assert.equal(details[expected],true,selector+' validity '+expected);assert.ok(details.described.some(x=>x.visible&&x.text&&/error/.test(x.id)),'Associated visible error');if(unchanged)assert.deepEqual(await applied(page),unchanged,'Invalid draft keeps applied note');return details;}
async function downloadApplied(page,label){const snapshot=await applied(page);const downloadPromise=page.waitForEvent('download');await page.locator('#download-button').click();const download=await downloadPromise;const filename=download.suggestedFilename();const target=path.join(output,label+'-'+filename);await download.saveAs(target);const bytes=await readFile(target);const content=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert.equal(filename,'fieldbook-'+snapshot.id+'.txt','Filename identifies opened applied record');assert.ok(content.includes(snapshot.title)&&content.includes(snapshot.body)&&snapshot.tags.split('·').map(t=>t.trim()).every(t=>content.includes(t)),'Actual UTF-8 file contains applied title, body and tags');return {snapshot,filename,bytes:bytes.length,sha256:hash(bytes),content};}
try{
  browser=await playwright.chromium.launch({headless:true,...(options.browser?{executablePath:path.resolve(options.browser)}:{})});report.browser=await browser.version();
  const context=await contextFor({viewport:{width:1280,height:900},colorScheme:'light',acceptDownloads:true});const page=await context.newPage();await page.goto(url);await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  assert.deepEqual(await page.locator('#theme-select option').evaluateAll(els=>els.map(el=>el.value).sort()),[...ids].sort());assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('main').count(),1);assert.equal(await page.locator('[tabindex]').evaluateAll(els=>els.filter(el=>Number(el.getAttribute('tabindex'))>0).length),0);assert.ok(await page.locator('select,input,textarea').evaluateAll(els=>els.every(el=>el.labels?.length>0)));assert.equal(await page.locator('#motion').inputValue(),'off');
  pass('Nine actual profiles, labeled native controls, one h1/main, no positive tabindex, motion off');
  for(const theme of ids)for(const appearance of ['light','dark']){
    await select(page,'theme-select',theme);await select(page,'appearance',appearance);
    const values=await page.locator('html').evaluate((el,keys)=>Object.fromEntries(keys.map(key=>[key,getComputedStyle(el).getPropertyValue(key).trim()])),properties);assert.deepEqual(values,manifest.profiles.find(profile=>profile.id===theme).tokens[appearance],theme+'/'+appearance+': computed source values');report.identities.push({theme,appearance,values});
    for(const width of [320,1280])for(const motion of ['off','on']){
      await page.setViewportSize({width,height:900});await select(page,'motion',motion);await page.mouse.move(0,0);const name=[theme,appearance,width,motion].join('/');
      try{report.matrix.push({theme,appearance,width,motion,passed:true,...await checkedMetrics(page,name)});}catch(error){report.matrix.push({theme,appearance,width,motion,passed:false,failure:error.message});}
    }
    await select(page,'motion','off');await page.setViewportSize({width:320,height:900});
    const names=await noteNames(page);const choice=page.locator('.note-option[data-note-id="corner-shop"]');await choice.click();assert.equal(await choice.getAttribute('aria-pressed'),'true');assert.deepEqual(await noteNames(page),names,'Selection retains actual accessible names');await capture(page,theme,appearance,'selected');
    const previous=await applied(page);await page.locator('#draft-title').fill('');await invalid(page,'#draft-title','valueMissing',previous);await capture(page,theme,appearance,'invalid-title');
    await page.locator('#draft-title').fill('A clear local draft');await page.locator('#draft-body').fill('');await invalid(page,'#draft-body','valueMissing',previous);await capture(page,theme,appearance,'invalid-body');
    await page.locator('#revert-button').click();await choice.hover();assert.ok(await choice.evaluate(el=>el.matches(':hover')));await capture(page,theme,appearance,'hover');
    await page.mouse.down();assert.ok(await choice.evaluate(el=>el.matches(':active')&&getComputedStyle(el).transform==='none'),'Motion-off pointer press stays level');await capture(page,theme,appearance,'active-off');await page.mouse.up();
    await select(page,'motion','on');await choice.hover();await page.mouse.down();await page.waitForTimeout(150);const press=await choice.evaluate(el=>({active:el.matches(':active'),transform:getComputedStyle(el).transform,duration:getComputedStyle(el).transitionDuration,property:getComputedStyle(el).transitionProperty}));assert.equal(press.active,true);assert.equal(press.transform,'matrix(1, 0, 0, 1, 0, 1)');assert.equal(press.property,'transform');assert.equal(press.duration,'0.12s');await capture(page,theme,appearance,'active-on');await page.mouse.up();await select(page,'motion','off');await page.mouse.move(0,0);
    for(const selector of ['#theme-select','#note-search','.note-option[data-note-id="corner-shop"]','#draft-title','#apply-button']){await page.keyboard.press('Tab');await page.locator(selector).focus();await capture(page,theme,appearance,'focus:'+selector,{focus:true});}
    await page.locator('.note-option[data-note-id="window-light"]').click();
    if(['botanical','play','swiss','layered'].includes(theme))await screenshot(page,theme+'-'+appearance+'-320.png');
  }
  assert.equal(report.matrix.length,72);assert.deepEqual(report.matrix.filter(row=>!row.passed),[],'Composition matrix failures');assert.equal(new Set(report.identities.filter(x=>x.appearance==='light').map(x=>JSON.stringify(x.values))).size,9,'Nine distinct profiles');pass('72 matrix states: contrast, 320/1280 reflow, 44px targets, opaque paper faces and explicit geometry');
  assert.equal(report.interactions.length,198);assert.deepEqual(report.interactions.filter(row=>!row.passed),[],'Interaction context failures');pass('198 measured contexts across light/dark profiles, including 90 keyboard-focus contexts');
  await page.setViewportSize({width:1280,height:900});await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');await page.keyboard.press('Tab');assert.match(await page.evaluate(()=>document.activeElement?.getAttribute('href')||''),/^#/);await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement?.id),'main');
  const initialNames=await noteNames(page);await page.locator('.note-option[data-note-id="small-route"]').focus();await page.keyboard.press('Space');assert.equal(await page.locator('.note-option[data-note-id="small-route"]').getAttribute('aria-pressed'),'true');assert.equal(await page.locator('.note-option[aria-pressed="true"]').count(),1);assert.deepEqual(await noteNames(page),initialNames);
  pass('Native skip navigation and Space note selection with stable actual accessible names',initialNames);
  const original=await applied(page),validityTrials=[];
  for(const title of ['ab','   ']){await page.locator('#draft-title').fill(title);validityTrials.push({field:'title',value:title,...await invalid(page,'#draft-title','customError',original)});}
  assert.equal(await page.locator('#draft-title').getAttribute('maxlength'),'48');assert.equal(await page.locator('#draft-body').getAttribute('maxlength'),'240');
  await setProgrammatic(page,'#draft-title','a'.repeat(49));validityTrials.push({field:'title',value:'49 unbroken characters',...await invalid(page,'#draft-title','customError',original)});
  await page.locator('#draft-title').fill('Valid draft');await page.locator('#draft-body').fill('   ');validityTrials.push({field:'body',value:'whitespace',...await invalid(page,'#draft-body','customError',original)});
  await setProgrammatic(page,'#draft-body','b'.repeat(241));validityTrials.push({field:'body',value:'241 characters',...await invalid(page,'#draft-body','customError',original)});
  await page.locator('#draft-title').fill('  A <b>local</b> walk  ');await page.locator('#draft-body').fill('  Turn toward the café bridge. Bring tea for the quiet stop.  ');await page.locator('#apply-button').click();
  const changed=await applied(page);assert.equal(changed.title,'A <b>local</b> walk');assert.equal(changed.body,'Turn toward the café bridge. Bring tea for the quiet stop.');assert.equal(changed.id,original.id);assert.equal(await page.locator('#applied-title b,.note-option b').count(),0,'Applied literal markup remains text in reading and index views');assert.equal(await page.locator('#draft-status').getAttribute('data-state'),'applied');assert.ok((await noteNames(page))['small-route'].includes(changed.title),'Applied title updates actual index name');
  await page.locator('#draft-title').fill('Unapplied private draft');await page.locator('#draft-body').fill('This draft must not be downloaded.');assert.equal(await page.locator('#draft-status').getAttribute('data-state'),'draft');assert.deepEqual(await applied(page),changed);
  const downloaded=await downloadApplied(page,'dirty-draft');assert.ok(!downloaded.content.includes('Unapplied private draft')&&!downloaded.content.includes('This draft must not be downloaded.'),'Download excludes dirty draft');
  await select(page,'theme-select','botanical');await select(page,'appearance','dark');await select(page,'motion','on');assert.equal(await page.locator('#draft-title').inputValue(),'Unapplied private draft');assert.equal(await page.locator('#draft-body').inputValue(),'This draft must not be downloaded.');assert.deepEqual(await applied(page),changed);
  await page.locator('.note-option[data-note-id="rain-check"]').click();const second=await applied(page);await page.locator('#draft-title').fill('  Second cached draft  ');await page.locator('#draft-body').fill('  Second note draft body.  ');await page.locator('.note-option[data-note-id="small-route"]').click();assert.equal(await page.locator('#draft-title').inputValue(),'Unapplied private draft');assert.equal(await page.locator('#draft-body').inputValue(),'This draft must not be downloaded.');assert.deepEqual(await applied(page),changed);await page.locator('#revert-button').click();assert.equal(await page.locator('#draft-title').inputValue(),changed.title);assert.equal(await page.locator('#draft-body').inputValue(),changed.body);assert.equal(await page.locator('#draft-status').getAttribute('data-state'),'applied');
  await page.locator('.note-option[data-note-id="rain-check"]').click();assert.equal(await page.locator('#draft-title').inputValue(),'  Second cached draft  ');assert.equal(await page.locator('#draft-body').inputValue(),'  Second note draft body.  ');assert.deepEqual(await applied(page),second);await page.locator('#revert-button').click();await page.locator('.note-option[data-note-id="small-route"]').click();
  pass('Native and trimmed bounds, applied snapshot, page-only draft caches, current-only Revert, preference retention and real UTF-8 applied export',{validityTrials,original,changed,second,downloaded});
  const baselineOrder=await page.locator('.note-option').evaluateAll(els=>els.map(el=>el.dataset.noteId));
  await page.locator('#draft-title').fill('A hidden cached draft');await page.locator('#draft-body').fill('Still here while the applied index is filtered.');
  await page.locator('#note-search').fill('Unapplied private draft');assert.equal(await page.locator('.note-option:visible').count(),0,'Search ignores unapplied title');assert.ok((await page.locator('#context-status').textContent()).trim(),'Hidden opened context is explained');assert.ok(await page.locator('#context-status').getAttribute('aria-live')||await page.locator('#context-status').getAttribute('role'),'Hidden context has live semantics');assert.equal(await page.locator('#draft-title').inputValue(),'A hidden cached draft');assert.deepEqual(await applied(page),changed);const hiddenMetrics=await checkedMetrics(page,'filtered-hidden-open-note',{hiddenSelection:true});
  await page.locator('#clear-search').click();assert.equal(await page.locator('#note-search').inputValue(),'');assert.deepEqual(await page.locator('.note-option:visible').evaluateAll(els=>els.map(el=>el.dataset.noteId)),baselineOrder);assert.equal(await page.locator('#draft-title').inputValue(),'A hidden cached draft');assert.deepEqual(await applied(page),changed);
  const searchTrials=[];
  for(const [field,query] of [['title',changed.title],['body','café bridge'],['tag',changed.tags.split('·').at(-1).trim()]]){
    assert.ok(query,'Applied tag/title/body search query');if(field==='tag')assert.ok(!changed.title.includes(query)&&!changed.body.includes(query),'Tag-only query is absent from applied title/body');await page.locator('#note-search').fill(query);assert.ok(await page.locator('.note-option[data-note-id="small-route"]').isVisible(),'Search matches applied '+field);searchTrials.push({field,query,visible:await page.locator('.note-option:visible').evaluateAll(els=>els.map(el=>el.dataset.noteId))});await page.locator('#clear-search').click();
  }
  pass('Search reads applied title/body/tags, retains hidden opened context and draft, Clear recovers original order',{searchTrials,hiddenMetrics});
  await page.locator('#draft-title').fill('a'.repeat(48));await page.locator('#draft-body').fill('b'.repeat(240));await page.locator('#apply-button').click();const long=await applied(page);assert.equal(long.title.length,48);assert.equal(long.body.length,240);await page.setViewportSize({width:320,height:900});const maximumMetrics=await checkedMetrics(page,'maximum-unbroken-title-body');await screenshot(page,'unbroken-note-320.png');await page.setViewportSize({width:1280,height:900});await screenshot(page,'desktop-applied-note.png');await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');await page.locator('.note-option[data-note-id="small-route"]').click();assert.deepEqual(await applied(page),original,'Reload resets applied changes and caches');pass('Valid maximum unbroken title/body reflow at 320px and reload resets all local note changes',{long,metrics:maximumMetrics});
  await select(page,'appearance','system');await page.emulateMedia({colorScheme:'dark'});await page.waitForFunction(()=>getComputedStyle(document.documentElement).colorScheme.includes('dark'));const dark=await page.locator('html').evaluate(el=>getComputedStyle(el).getPropertyValue('--page').trim());await page.emulateMedia({colorScheme:'light'});await page.waitForFunction(value=>getComputedStyle(document.documentElement).getPropertyValue('--page').trim()!==value,dark);pass('System appearance follows live OS changes');
  await select(page,'motion','on');await page.emulateMedia({reducedMotion:'reduce'});const choice=page.locator('.note-option[data-note-id="corner-shop"]');await choice.hover();await page.mouse.down();const reduced=await choice.evaluate(el=>({active:el.matches(':active'),transform:getComputedStyle(el).transform,duration:getComputedStyle(el).transitionDuration,animations:document.getAnimations().filter(a=>['running','paused','pending'].includes(a.playState)).length}));assert.equal(reduced.active,true);assert.equal(reduced.transform,'none');assert.ok(reduced.duration.split(',').every(v=>parseFloat(v)===0));assert.equal(reduced.animations,0);await page.mouse.up();pass('OS reduced motion overrides motion-on during actual pointer press',reduced);await context.close();
  const forcedContext=await contextFor({viewport:{width:320,height:900},forcedColors:'active',colorScheme:'dark'});const forced=await forcedContext.newPage();await forced.goto(url);await select(forced,'theme-select','play');await select(forced,'appearance','dark');await select(forced,'motion','on');
  const forcedTokens=await forced.locator('body').evaluate(el=>Object.fromEntries(['--page','--raised','--ink','--primary','--on-primary','--focus','--error'].map(key=>[key,getComputedStyle(el).getPropertyValue(key).trim()])));assert.ok(/Canvas/i.test(forcedTokens['--page'])&&/CanvasText/i.test(forcedTokens['--ink'])&&/ButtonFace/i.test(forcedTokens['--primary'])&&/ButtonText/i.test(forcedTokens['--on-primary']),'Forced system roles outrank profile');
  await forced.keyboard.press('Tab');await forced.locator('#draft-title').focus();const forcedData=await checkedMetrics(forced,'forced-colors',{forced:true,focus:true});const canvasText=await forced.locator('body').evaluate(el=>{const p=document.createElement('span');p.style.color='CanvasText';el.append(p);const value=getComputedStyle(p).color;p.remove();return value;});assert.equal(forcedData.focus.color,canvasText,'Actual focus resolves to documented CanvasText');const selected=forced.locator('.note-option[aria-pressed="true"]');assert.equal(await selected.evaluate(el=>getComputedStyle(el).outlineWidth),'2px');await selected.focus();const forcedFocused=await checkedMetrics(forced,'forced-colors-selected-focus',{forced:true,focus:true});const names=await noteNames(forced);assert.equal(forcedFocused.focus.width,3);assert.equal(forcedFocused.focus.offset,3);
  const forcedChoice=forced.locator('.note-option[data-note-id="corner-shop"]');await forcedChoice.hover();await forced.mouse.down();assert.ok(await forcedChoice.evaluate(el=>el.matches(':active')&&getComputedStyle(el).transform==='none'&&getComputedStyle(el).transitionDuration.split(',').every(v=>parseFloat(v)===0)));await forced.mouse.up();await screenshot(forced,'forced-colors-320.png');pass('Forced CanvasText/Canvas and ButtonText/ButtonFace preserve title punctuation, selection, action words, focus and reflow',{forcedTokens,metrics:forcedData,focusedSelected:forcedFocused,accessibleNames:names});await forcedContext.close();
  for(const mode of ['javascript-disabled','script-blocked']){
    const fallbackContext=await contextFor({viewport:{width:320,height:900},javaScriptEnabled:mode!=='javascript-disabled'},mode==='script-blocked'?mode:'ordinary');if(mode==='script-blocked')await fallbackContext.route('**/preview.js',route=>route.abort('failed'));const fallback=await fallbackContext.newPage();await fallback.goto(url);assert.equal(await fallback.locator('#theme-select:disabled,#appearance:disabled,#motion:disabled').count(),3);assert.equal(await fallback.locator('.note-option:disabled').count(),4);assert.equal(await fallback.locator('#note-fields:disabled').count(),1);assert.equal(await fallback.locator('#static-notes details[open]').count(),4,'All four original note texts available without initialization');assert.ok(await fallback.locator('#applied-title').isVisible());assert.ok(await fallback.locator('#applied-body').isVisible());assert.ok(await fallback.locator('a[href]:visible').count()>0);const data=await checkedMetrics(fallback,mode,{fallback:true});await screenshot(fallback,mode+'-320.png');pass(mode+' preserves readable static content with unavailable enhancements',data);await fallbackContext.close();
  }
  assert.deepEqual(report.runtimeErrors,[]);assert.deepEqual(report.externalRequests,[]);assert.deepEqual(report.resourceFailures,[]);for(const [name,sha] of Object.entries(report.testedFiles))assert.equal(hash(await readFile(path.join(preview,name))),sha,'Runtime source stayed frozen: '+name);assert.equal(hash(await readFile(fileURLToPath(import.meta.url))),report.validatorSha256,'Validator source stayed frozen');pass('Loopback subpath has no ordinary exceptions, failed resources or external requests');report.passed=true;
}catch(error){report.passed=false;report.failure={message:error.message,stack:error.stack};process.exitCode=1;}
finally{await browser?.close();await new Promise(resolve=>server.close(resolve));report.finishedAt=new Date().toISOString();const raw=JSON.stringify(report,null,2)+'\n';await writeFile(path.join(output,'results.json'),raw);if(report.passed)await writeFile(path.join(output,'compact-results.json'),JSON.stringify(project(report,raw),null,2)+'\n');process.stdout.write(JSON.stringify({passed:report.passed,checks:report.checks.length,states:report.matrix.length,interactionStates:report.interactions.length,failedStates:report.matrix.filter(x=>!x.passed).length,output,failure:report.failure?.message})+'\n');}
