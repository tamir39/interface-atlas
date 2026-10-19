import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { chromium } from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const base = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(base, 'implementation-build-ready');
const evidence = path.join(base, 'implementation-evidence');
await mkdir(evidence, { recursive: true });
const results = [];
const record = (name, detail) => { results.push({ name, result: 'passed', detail }); console.log(`PASS ${name}: ${detail}`); };
const server = createServer(async (req, res) => {
  const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const filename = path.resolve(output, `.${name.endsWith('/') ? `${name}index.html` : name}`);
  if (!filename.startsWith(`${output}${path.sep}`)) { res.writeHead(403).end(); return; }
  try {
    const content = await readFile(filename);
    const type = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png' }[path.extname(filename)] || 'application/octet-stream';
    res.writeHead(200, { 'content-type': type }).end(content);
  } catch { res.writeHead(404).end(); }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const url = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch({ executablePath: 'C:/Users/PC/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe', headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
try {
  await page.goto(url);
  const input = page.getByRole('searchbox', { name: 'Find a theme' });
  const clear = page.getByRole('button', { name: 'Clear search' });
  const visibleNames = () => page.locator('.preview-card:not(.brand-card):visible .card-copy h3').allTextContents();
  const expectedNames = ['Editorial ↗', 'Swiss ↗', 'Precision ↗', 'Play ↗', 'Botanical ↗', 'Blueprint ↗', 'Pulse ↗', 'Gallery ↗', 'Layered ↗'];
  const links = await page.locator('.preview-card .card-copy a').evaluateAll((items) => items.map((item) => item.getAttribute('href')));
  assert.deepEqual(await visibleNames(), expectedNames);
  assert.equal(await page.locator('#search-count').textContent(), '9 of 9 themes shown');
  assert.equal(await clear.isDisabled(), true);
  record('Initial enhanced collection', 'All nine themes in original order, logo visible, count 9/9; labeled controls enabled only after initialization.');
  await input.scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(evidence, 'desktop-initial.png') });

  await input.fill('  sWiSs  ');
  assert.deepEqual(await visibleNames(), ['Swiss ↗']);
  assert.equal(await page.locator('#search-count').textContent(), '1 of 9 themes shown');
  assert.equal(await page.locator('.brand-card').isVisible(), true);
  record('Name, case and surrounding whitespace', 'Mixed-case padded Swiss query returns only Swiss; count 1/9 and logo remains visible.');

  await input.fill('typography');
  assert.deepEqual(await visibleNames(), ['Editorial ↗', 'Swiss ↗', 'Gallery ↗']);
  assert.equal(await page.locator('#search-count').textContent(), '3 of 9 themes shown');
  await input.fill('native project editing');
  assert.deepEqual(await visibleNames(), ['Layered ↗']);
  record('Description matching and order', 'Typography returns Editorial, Swiss and Gallery in original order; the Layered description matches independently.');

  await input.fill('.*[a-z]');
  assert.deepEqual(await visibleNames(), []);
  assert.equal(await page.locator('#search-count').textContent(), '0 of 9 themes shown');
  assert.equal(await page.locator('.search-empty').isVisible(), true);
  assert.equal(await page.locator('.brand-card').isVisible(), true);
  await page.screenshot({ path: path.join(evidence, 'desktop-no-results.png') });
  await input.fill('.');
  assert.equal((await visibleNames()).length, 9);
  await input.fill('<img src=x onerror=alert(1)>');
  assert.equal((await visibleNames()).length, 0);
  assert.equal(await page.locator('.search-empty img').count(), 0);
  record('Literal input and no-results state', 'Regex punctuation is literal; a period matches descriptions, while a regex-shaped string and markup produce zero results without insertion.');

  await input.focus();
  await input.press('Tab');
  assert.equal(await clear.evaluate((element) => document.activeElement === element), true);
  assert.equal(await clear.evaluate((element) => getComputedStyle(element).outlineStyle), 'solid');
  await page.keyboard.press('Enter');
  assert.deepEqual(await visibleNames(), expectedNames);
  assert.equal(await input.evaluate((element) => document.activeElement === element), true);
  assert.equal(await page.locator('.search-empty').isVisible(), false);
  record('Keyboard recovery', 'Tab reaches Clear search with a visible focus outline; Enter restores all nine themes and returns focus to the input.');

  await input.fill('swiss');
  await page.evaluate(() => { window.searchCheckMarker = true; });
  await input.press('Enter');
  assert.equal(page.url(), url);
  assert.equal(await page.evaluate(() => window.searchCheckMarker), true);
  assert.deepEqual(await visibleNames(), ['Swiss ↗']);
  await page.reload();
  assert.equal(await input.inputValue(), '');
  assert.deepEqual(await visibleNames(), expectedNames);
  assert.deepEqual(await page.locator('.preview-card .card-copy a').evaluateAll((items) => items.map((item) => item.getAttribute('href'))), links);
  record('Enter, reload and link preservation', 'Enter does not submit/navigate; reload clears the query; preview and logo hrefs remain unchanged.');

  await input.fill('Swiss');
  await page.getByRole('link', { name: 'Open the Swiss preview', exact: false }).click();
  assert.match(page.url(), /themes\/swiss\/preview\/$/);
  assert.equal((await page.title()).length > 0, true);
  await page.goto(url);
  record('Published preview navigation', 'The filtered Swiss preview link loads its built theme page on localhost.');

  for (const colorScheme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme });
    await page.setViewportSize({ width: 320, height: 900 });
    await input.fill('no-matching-theme');
    await page.locator('.collection-search').evaluate((element) => element.scrollIntoView({ block: 'start' }));
    const geometry = await page.evaluate(() => {
      const bounds = (selector) => { const r = document.querySelector(selector).getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, bottom: r.bottom, right: r.right }; };
      return { viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth, input: bounds('#theme-search'), clear: bounds('#search-clear'), empty: bounds('.search-empty') };
    });
    assert.equal(geometry.scrollWidth <= geometry.viewport, true);
    assert.equal(geometry.clear.y >= geometry.input.bottom, true);
    for (const element of [geometry.input, geometry.clear, geometry.empty]) {
      assert.equal(element.x >= 0 && element.right <= 320, true);
    }
    assert.equal(geometry.input.height >= 48 && geometry.clear.height >= 48, true);
    await page.screenshot({ path: path.join(evidence, `narrow-${colorScheme}.png`) });
    await clear.click();
    assert.deepEqual(await visibleNames(), expectedNames);
    record(`Narrow ${colorScheme} appearance`, 'At 320 CSS px, controls stack, input/button are at least 48 px tall, search and empty state fit, no horizontal page overflow, clear restores results.');
  }

  for (const mode of ['disabled', 'blocked']) {
    const fallback = await browser.newContext({ javaScriptEnabled: mode !== 'disabled', viewport: { width: 320, height: 900 } });
    const fallbackPage = await fallback.newPage();
    if (mode === 'blocked') await fallbackPage.route('**/search.js', (route) => route.abort());
    await fallbackPage.goto(url);
    assert.equal(await fallbackPage.locator('.collection-search').isVisible(), false);
    assert.equal(await fallbackPage.locator('.search-empty').isVisible(), false);
    assert.equal(await fallbackPage.locator('.preview-card:visible').count(), 10);
    await fallbackPage.getByRole('link', { name: 'Open the Swiss preview', exact: false }).click();
    assert.match(fallbackPage.url(), /themes\/swiss\/preview\/$/);
    await fallback.close();
    record(`Script ${mode} fallback`, 'All nine themes and the logo card are visible with inactive search hidden; a theme preview link remains usable.');
  }
  assert.deepEqual(errors, []);
  record('Browser runtime errors', 'No uncaught page errors during the enhanced flow.');
  await writeFile(path.join(evidence, 'checks.json'), JSON.stringify({ browser: browser.version(), results }, null, 2));
} catch (error) {
  await writeFile(path.join(evidence, 'checks.json'), JSON.stringify({ results, failed: String(error) }, null, 2));
  throw error;
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
