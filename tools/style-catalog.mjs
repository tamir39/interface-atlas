import assert from 'node:assert/strict';
import { readFile, readdir, stat, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
assert.ok(process.argv.slice(2).every(arg => arg === '--check'), 'Usage: node tools/style-catalog.mjs [--check]');
const required = ['id', 'name', 'revision', 'status', 'kind', 'entry_creator', 'attribution_summary', 'basis', 'motion_character', 'implementation_dependency', 'reviewed_on'];
const lists = ['aliases', 'appearances', 'fit_types'];
function metadata(text) {
  const block = text.replace(/^\uFEFF/, '').split(/^---\s*$/m);
  assert.ok(block.length >= 3 && !block[0].trim(), 'Expected README frontmatter');
  const result = {};
  for (const line of block[1].trim().split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const match = /^([a-z][a-z0-9_]*):\s*(.+)$/.exec(line);
    assert.ok(match, 'Unsupported metadata line: ' + line);
    const [, key, raw] = match;
    assert.ok(!Object.hasOwn(result, key), 'Duplicate metadata ' + key);
    const scalar = value => value.trim().replace(/^(['"])(.*)\1$/, '$2');
    result[key] = raw.startsWith('[') && raw.endsWith(']') ? raw.slice(1, -1).split(',').filter(value => value.trim()).map(scalar) : scalar(raw);
  }
  for (const field of required) assert.ok(typeof result[field] === 'string' && result[field], 'Missing scalar ' + field);
  for (const field of lists) assert.ok(Array.isArray(result[field]), 'Missing inline list ' + field);
  assert.ok(['draft', 'researching', 'ready-for-extraction', 'validated'].includes(result.status), 'Invalid status');
  assert.ok(['material', 'form', 'composition', 'metaphor'].includes(result.kind), 'Invalid kind');
  assert.ok(result.appearances.length && result.appearances.every(value => ['light', 'dark', 'system'].includes(value)), 'Invalid appearance');
  assert.ok(result.fit_types.length, 'Provide suitability metadata');
  assert.match(result.reviewed_on, /^\d{4}-\d{2}-\d{2}$/);
  return result;
}
const styles = [];
for (const entry of (await readdir(path.join(root, 'styles'), { withFileTypes: true })).filter(entry => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
  const base = path.join(root, 'styles', entry.name);
  const readme = await readFile(path.join(base, 'README.md'), 'utf8');
  const meta = metadata(readme);
  assert.ok(meta.id === entry.name && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.id), 'Folder must match style id');
  const documents = {}, reading_words = {};
  for (const name of ['README.md', 'style.md', 'sources.md', 'motion.md', 'validation.md']) {
    const filename = path.join(base, name);
    try {
      assert.ok((await stat(filename)).isFile(), 'Expected a file: ' + filename);
      const key = name === 'README.md' ? 'readme' : name.slice(0, -3);
      documents[key] = 'styles/' + entry.name + '/' + name;
      const content = await readFile(filename, 'utf8');
      reading_words[key] = content.replace(/^---[\s\S]*?---\s*/, '').trim().split(/\s+/).filter(Boolean).length;
    } catch (error) {
      if (['README.md', 'style.md', 'sources.md'].includes(name) || error.code !== 'ENOENT') throw error;
    }
  }
  if (meta.status === 'validated') assert.ok(documents.validation, 'Validated requires an actual evidence record; a report alone does not establish conformance');
  styles.push({ ...meta, documents, reading_words });
}
assert.ok(styles.length, 'Expected at least one implemented style');
const output = JSON.stringify({ schema_version: 1, styles }, null, 2) + '\n';
const filename = path.join(root, 'catalog/styles.json');
if (check) assert.equal(await readFile(filename, 'utf8'), output, 'Style catalog is stale; run node tools/style-catalog.mjs');
else { await mkdir(path.dirname(filename), { recursive: true }); await writeFile(filename, output); }
console.log((check ? 'Verified' : 'Generated') + ' catalog for ' + styles.length + ' implemented style(s).');
