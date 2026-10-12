import { readFile, writeFile, readdir, stat, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const allowed = new Set(['--check']);
if (process.argv.slice(2).some(arg => !allowed.has(arg))) {
  throw new Error('Usage: node tools/catalog.mjs [--check]');
}

const stringFields = [
  'id', 'name', 'revision', 'status', 'basis', 'creator',
  'default_density', 'motion_character', 'decorative_effects',
  'implementation_dependency', 'source_revision', 'reviewed_on',
];
const listFields = ['appearances', 'supported_density_adaptations', 'fit_types'];
const statuses = new Set(['draft', 'researching', 'ready-for-extraction', 'validated']);
const appearances = new Set(['light', 'dark', 'system']);

function scalar(raw) {
  if (!raw || /[\[\]{}]/.test(raw)) throw new Error('Use a nonempty string value.');
  if ((raw.startsWith('"') && raw.endsWith('"')) ||
      (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1);
  }
  return raw;
}

function metadata(markdown, filename) {
  const lines = markdown.replace(/^\uFEFF/, '').split(/\r?\n/);
  if (lines[0] !== '---') throw new Error(filename + ': missing frontmatter.');
  const end = lines.indexOf('---', 1);
  if (end < 0) throw new Error(filename + ': unclosed frontmatter.');
  const result = {};
  for (const line of lines.slice(1, end)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const match = /^([a-z][a-z0-9_]*):\s*(.+)$/.exec(line);
    if (!match) throw new Error(filename + ': unsupported metadata line: ' + line);
    const [, key, raw] = match;
    if (Object.hasOwn(result, key)) throw new Error(filename + ': duplicate key ' + key);
    try {
      if (raw.startsWith('[') && raw.endsWith(']')) {
        const inner = raw.slice(1, -1).trim();
        result[key] = inner ? inner.split(',').map(item => scalar(item.trim())) : [];
      } else {
        result[key] = scalar(raw.trim());
      }
    } catch (error) {
      throw new Error(filename + ': ' + key + ': ' + error.message);
    }
  }
  for (const key of stringFields) {
    if (typeof result[key] !== 'string' || !result[key].trim()) {
      throw new Error(filename + ': missing string metadata ' + key);
    }
  }
  for (const key of listFields) {
    if (!Array.isArray(result[key]) ||
        result[key].some(item => typeof item !== 'string' || !item.trim())) {
      throw new Error(filename + ': expected inline string list ' + key);
    }
  }
  if (!statuses.has(result.status)) throw new Error(filename + ': invalid status.');
  if (!result.appearances.length || result.appearances.some(item => !appearances.has(item))) {
    throw new Error(filename + ': invalid appearances.');
  }
  if (!result.fit_types.length) throw new Error(filename + ': fit_types cannot be empty.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(result.reviewed_on)) {
    throw new Error(filename + ': reviewed_on must use YYYY-MM-DD.');
  }
  return result;
}

const entries = await readdir(path.join(root, 'themes'), { withFileTypes: true });
const themes = [];
for (const directory of entries.filter(entry => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
  const base = path.join(root, 'themes', directory.name);
  const meta = metadata(await readFile(path.join(base, 'README.md'), 'utf8'), 'themes/' + directory.name + '/README.md');
  if (meta.id !== directory.name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.id)) {
    throw new Error('Theme folder must match its lowercase id: ' + directory.name);
  }
  const documents = {};
  for (const filename of ['README.md', 'design.md', 'sources.md']) {
    if (!(await stat(path.join(base, filename))).isFile()) {
      throw new Error('Missing theme document: ' + filename);
    }
    documents[filename === 'README.md' ? 'readme' : filename.replace('.md', '')] =
      'themes/' + directory.name + '/' + filename;
  }
  for (const filename of ['effects.md', 'motion.md']) {
    try {
      if ((await stat(path.join(base, filename))).isFile()) {
        documents[filename.replace('.md', '')] = 'themes/' + directory.name + '/' + filename;
      }
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  if (meta.status === 'validated') {
    if (!meta.validation_report || path.isAbsolute(meta.validation_report)) {
      throw new Error(meta.id + ': validated status requires a relative validation_report.');
    }
    const report = path.resolve(base, meta.validation_report);
    const relative = path.relative(base, report);
    if (relative.startsWith('..') || path.isAbsolute(relative) || !(await stat(report)).isFile()) {
      throw new Error(meta.id + ': validation_report must be a file inside this theme.');
    }
    documents.validation = 'themes/' + directory.name + '/' + relative.split(path.sep).join('/');
  }
  themes.push({
    id: meta.id,
    name: meta.name,
    revision: meta.revision,
    status: meta.status,
    creator: meta.creator,
    basis: meta.basis,
    appearances: meta.appearances,
    density: { default: meta.default_density, adaptations: meta.supported_density_adaptations },
    fit_types: meta.fit_types,
    motion_character: meta.motion_character,
    decorative_effects: meta.decorative_effects,
    implementation_dependency: meta.implementation_dependency,
    source_revision: meta.source_revision,
    reviewed_on: meta.reviewed_on,
    documents,
  });
}
const output = JSON.stringify({ schema_version: 1, themes }, null, 2) + '\n';
const catalog = path.join(root, 'catalog', 'themes.json');
if (check) {
  await access(catalog);
  if (await readFile(catalog, 'utf8') !== output) {
    throw new Error('Catalog is stale. Run node tools/catalog.mjs.');
  }
  process.stdout.write('Catalog matches metadata for ' + themes.length + ' theme(s).\n');
} else {
  await mkdir(path.dirname(catalog), { recursive: true });
  await writeFile(catalog, output);
  process.stdout.write('Generated catalog for ' + themes.length + ' theme(s).\n');
}
