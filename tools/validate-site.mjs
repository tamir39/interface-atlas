import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

// Original Interface Atlas verification tooling by Tamir with Codex AI assistance.
// Tests the public task contract through visible UI and native controls.
const options = {};
for (let index = 2; index < process.argv.length; index += 2) {
  assert.ok(['--site', '--output', '--module', '--browser'].includes(process.argv[index]) && process.argv[index + 1], 'Expected --site, --output, --module, --browser pairs');
  options[process.argv[index].slice(2)] = process.argv[index + 1];
}
assert.ok(options.site && options.output, 'Pass --site published-directory --output new-evidence-directory');
const site = path.resolve(options.site), output = path.resolve(options.output);
await mkdir(output, { recursive: false });
let chromium;
try {
  ({ chromium } = await import(options.module ? pathToFileURL(path.resolve(options.module)).href : 'playwright'));
} catch {
  throw new Error('Optional verification needs an installed Playwright package. Pass --module path/to/playwright/index.mjs or install Playwright locally. The published site needs no packages.');
}
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png' };
const prefix = '/interface-atlas/';
const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    if (!pathname.startsWith(prefix)) { response.writeHead(404).end(); return; }
    const relativeURL = decodeURIComponent(pathname.slice(prefix.length));
    const filename = path.resolve(site, relativeURL.endsWith('/') || !relativeURL ? relativeURL + 'index.html' : relativeURL);
    const relative = path.relative(site, filename);
    if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) { response.writeHead(403).end(); return; }
    const bytes = await readFile(filename);
    response.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream' }).end(bytes);
  } catch { response.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port;
const url = origin + prefix;
const report = {
  node: process.version,
  browser: null,
  testedFiles: {},
  validatorSha256: createHash('sha256').update(await readFile(fileURLToPath(import.meta.url))).digest('hex'),
  checks: [], screenshots: [], runtimeErrors: [], externalRequests: [], failedResources: [],
  limits: ['Headless Chromium on Windows only. No assistive-technology session, user study, native browser zoom, or other browser engine.', 'Focus, status semantics, keyboard behavior and rendered styles are inspected; this is bounded evidence, not an accessibility conformance claim.', 'No theme preview behavior is changed or revalidated here. Build links and targeted hub behavior are checked.']
};
for (const name of ['index.html', 'styles.css']) report.testedFiles[name] = createHash('sha256').update(await readFile(path.join(site, name))).digest('hex');
const html = await readFile(path.join(site, 'index.html'), 'utf8');
for (const [, , name] of html.matchAll(/<script[^>]+src\s*=\s*(["'])(.*?)\1/gi)) {
  if (!/^(?:[a-z]+:|\/\/)/i.test(name)) report.testedFiles[name] = createHash('sha256').update(await readFile(path.resolve(site, name))).digest('hex');
}
function pass(name, details = true) { report.checks.push({ name, passed: true, details }); }
let browser;
try {
  browser = await chromium.launch({ ...(options.browser ? { executablePath: options.browser } : {}), headless: true });
  report.browser = browser.version();
  async function contextFor(settings = {}, intentionalFailure = false) {
    const context = await browser.newContext(settings);
    context.on('page', page => page.on('pageerror', error => report.runtimeErrors.push(error.message)));
    context.on('request', request => { if (!request.url().startsWith(origin + '/')) report.externalRequests.push(request.url()); });
    context.on('requestfailed', request => { if (!intentionalFailure) report.failedResources.push({ url: request.url(), error: request.failure()?.errorText }); });
    context.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) report.failedResources.push({ url: response.url(), status: response.status() }); });
    return context;
  }
  const visibleNames = page => page.locator('.preview-card:not(.brand-card):visible .card-copy h3').allTextContents().then(names => names.map(name => name.replace(/↗/g, '').trim()));
  const expectedAll = ['Editorial', 'Swiss', 'Precision', 'Play', 'Botanical', 'Blueprint', 'Pulse', 'Gallery', 'Layered'];
  async function cards(page, expected) {
    await page.waitForFunction(wanted => JSON.stringify([...document.querySelectorAll('.preview-card:not(.brand-card)')].filter(card => card.getClientRects().length).map(card => card.querySelector('.card-copy h3').textContent.replace(/↗/g, '').trim())) === JSON.stringify(wanted), expected);
    assert.deepEqual(await visibleNames(page), expected);
    assert.equal(await page.locator('.brand-card:visible').count(), 1, 'Identity card always remains visible');
    const hiddenCardLinksVisible = await page.locator('.preview-card:not(.brand-card) a:visible').evaluateAll(links => links.every(link => link.closest('article').getClientRects().length > 0));
    assert.ok(hiddenCardLinksVisible, 'Hidden themes expose no visible links');
  }
  const liveStatus = page => page.locator('#previews [role="status"], #previews [aria-live="polite"]').first();
  async function statusCount(page, count) {
    const status = liveStatus(page);
    await status.waitFor({ state: 'visible' });
    assert.equal(Number((await status.innerText()).match(/\d+/)?.[0]), count, 'Live count includes theme total excluding brand');
    const semantics = await status.evaluate(el => ({ role: el.getAttribute('role'), live: el.getAttribute('aria-live'), atomic: el.getAttribute('aria-atomic') }));
    assert.ok(semantics.role === 'status' || semantics.live === 'polite');
  }
  const searchbox = page => page.getByRole('searchbox', { name: /search|find a theme/i });
  const clearButton = page => page.getByRole('button', { name: /(?:clear|reset).*(?:search|filter)|^(?:clear|reset)$/i });
  async function fill(page, query, expected) {
    await searchbox(page).fill(query);
    await cards(page, expected);
    await statusCount(page, expected.length);
    assert.equal(await searchbox(page).inputValue(), query, 'Typing retains the user query');
    assert.ok(await searchbox(page).evaluate(el => el === document.activeElement), 'Filtering retains search focus');
    assert.equal(page.url(), url, 'Filtering never navigates');
  }
  const context = await contextFor({ viewport: { width: 1280, height: 900 }, colorScheme: 'light' });
  const page = await context.newPage(); await page.goto(url); await cards(page, expectedAll); await statusCount(page, 9);
  assert.equal(await searchbox(page).count(), 1);
  assert.ok(await searchbox(page).evaluate(el => [...el.labels || []].some(label => label.getClientRects().length > 0)), 'Search has a visible associated label');
  pass('Published hub initializes all nine themes and a separate identity card; native search has a visible label and polite result count');
  await fill(page, '  sWiSs  ', ['Swiss']);
  await fill(page, 'compact controls', ['Precision']);
  await fill(page, 'typography', ['Editorial', 'Swiss', 'Gallery']);
  await fill(page, 'Layered', ['Layered']);
  await fill(page, '', expectedAll);
  pass('Search matches trimmed case-insensitive name and visible description substrings, preserves order and restores all nine when input clears');
  // Some decorative/badge words also occur legitimately in descriptions:
  // "Draft" matches Blueprint's "drafting", and "Order." matches Editorial.
  for (const [query, expected] of [['Draft', ['Blueprint']], ['Open the', []], ['Order.', ['Editorial']], ['One mark.', []], ['<img src=x onerror=alert(1)>', []], ['interfaceatlas-no-match-8294', []]]) {
    await fill(page, query, expected);
  }
  const emptyExplanation = await page.locator('#previews p:visible, #previews h2:visible, #previews h3:visible').allTextContents();
  assert.ok(emptyExplanation.some(text => /no (?:matching )?(?:themes|results|matches)|nothing (?:matches|matched)/i.test(text)), 'Zero results provides a useful visible explanation');
  assert.equal(await page.locator('#previews img[src="x"]').count(), 0, 'Literal query is never inserted as markup');
  pass('Matching uses visible theme names/descriptions without extra badge, decorative-study, CTA or brand matches; literal markup produces zero results without execution');
  await clearButton(page).click(); await cards(page, expectedAll); await statusCount(page, 9);
  assert.equal(await searchbox(page).inputValue(), '');
  assert.ok(await searchbox(page).evaluate(el => el === document.activeElement), 'Clear restores search focus');
  pass('Clear recovers from zero results, resets count and query, and returns focus to the search field');
  // Native type=search clearing raises an input event. Exercise that event without
  // depending on Chromium's platform-specific cancel glyph pointer geometry.
  await fill(page, 'Layered', ['Layered']);
  await searchbox(page).evaluate(el => { el.value = ''; el.dispatchEvent(new Event('input', { bubbles: true })); });
  await cards(page, expectedAll); await statusCount(page, 9);
  pass('A native-search clear input event restores all themes, including the grid-displayed Layered card');
  await fill(page, 'Swiss', ['Swiss']);
  await page.keyboard.press('Tab');
  const firstTabTarget = await page.evaluate(() => ({ tag: document.activeElement.tagName, name: document.activeElement.textContent.trim() }));
  assert.equal(firstTabTarget.tag, 'BUTTON', 'Clear is the next keyboard control after search');
  await page.keyboard.press('Shift+Tab');
  assert.ok(await searchbox(page).evaluate(el => el === document.activeElement));
  const focus = await searchbox(page).evaluate(el => ({ visible: el.matches(':focus-visible'), style: getComputedStyle(el).outlineStyle, width: getComputedStyle(el).outlineWidth }));
  assert.ok(focus.visible && focus.style !== 'none' && parseFloat(focus.width) >= 2, 'Keyboard search focus is visibly outlined');
  await fill(page, 'Swiss', ['Swiss']);
  await page.keyboard.press('Tab'); await page.keyboard.press('Tab');
  const linkedTheme = await page.evaluate(() => ({ tag: document.activeElement.tagName, href: document.activeElement.getAttribute('href'), text: document.activeElement.textContent.trim() }));
  assert.equal(linkedTheme.tag, 'A'); assert.match(linkedTheme.href, /themes\/swiss\/preview/);
  pass('Keyboard tab order reaches search, Clear and the matching preview link without visiting hidden theme links', { focus, linkedTheme });
  await page.locator('#previews').scrollIntoViewIfNeeded();
  await page.screenshot({path:path.join(output, 'desktop-light.png'), fullPage:false});
  report.screenshots.push('desktop-light.png');
  await context.close();

  for (const settings of [
    { name: 'mobile-light', viewport: { width: 320, height: 900 }, colorScheme: 'light' },
    { name: 'mobile-dark', viewport: { width: 320, height: 900 }, colorScheme: 'dark', reducedMotion: 'reduce' },
    { name: 'mobile-forced-colors', viewport: { width: 320, height: 900 }, colorScheme: 'dark', forcedColors: 'active' }
  ]) {
    const { name, ...media } = settings; const mediaContext = await contextFor(media); const mediaPage = await mediaContext.newPage();
    await mediaPage.goto(url); await fill(mediaPage, 'Layered', ['Layered']);
    const reflow = await mediaPage.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    assert.ok(reflow.scroll <= reflow.width + 1, name + ' horizontal overflow');
    const controls = await searchbox(mediaPage).evaluate(el => ({ width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height, color: getComputedStyle(el).color, background: getComputedStyle(el).backgroundColor }));
    assert.ok(controls.width >= 44 && controls.height >= 44, name + ' search target');
    const clearBounds = await clearButton(mediaPage).boundingBox(); assert.ok(clearBounds.width >= 44 && clearBounds.height >= 44, name + ' Clear target');
    await mediaPage.locator('#previews').evaluate(el => el.scrollIntoView({ block: 'start' }));
    const screenshot = name + '.png'; await mediaPage.screenshot({ path: path.join(output, screenshot), fullPage: false }); report.screenshots.push(screenshot);
    await fill(mediaPage, 'interfaceatlas-no-match-8294', []);
    const zeroReflow = await mediaPage.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth })); assert.ok(zeroReflow.scroll <= zeroReflow.width + 1);
    pass(name + ' matches and zero-results states fit a 320px viewport with usable native controls', { reflow, zeroReflow, controls, clearBounds });
    await mediaContext.close();
  }
  for (const mode of ['javascript-disabled', 'script-blocked']) {
    const fallbackContext = await contextFor({ javaScriptEnabled: mode !== 'javascript-disabled', viewport: { width: 320, height: 900 } }, mode === 'script-blocked');
    if (mode === 'script-blocked') await fallbackContext.route('**/*.js', route => route.abort('failed'));
    const fallback = await fallbackContext.newPage(); await fallback.goto(url); await cards(fallback, expectedAll);
    const deadControls = await fallback.locator('#previews input:visible:enabled, #previews button:visible:enabled').count(); assert.equal(deadControls, 0, mode + ' presents no dead enabled runtime controls');
    const themeLinks = await fallback.locator('.preview-card:not(.brand-card):visible .card-copy h3 a').evaluateAll(links => links.map(link => link.getAttribute('href')));
    assert.equal(await fallback.locator('.preview-card:not(.brand-card):visible .card-copy h3 a').count(), 9);
    pass(mode + ' preserves all nine theme links and identity while runtime-only controls are hidden or disabled', { deadControls, themeLinks });
    await fallbackContext.close();
  }
  assert.deepEqual(report.runtimeErrors, []); assert.deepEqual(report.externalRequests, []); assert.deepEqual(report.failedResources, []);
  pass('Published subpath resources load without runtime errors, external requests or ordinary failed resources');
  report.passed = true;
} catch (error) {
  report.passed = false; report.failure = { message: error.message, stack: error.stack };
  process.exitCode = 1;
} finally {
  await browser?.close(); await new Promise(resolve => server.close(resolve));
  await writeFile(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
}
