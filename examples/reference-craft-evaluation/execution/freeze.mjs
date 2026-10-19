import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = 'D:/Projects/InterfaceAtlas';
const stage = path.resolve(import.meta.dirname, '..');
const frozen = path.join(stage, 'frozen-source');
const sha = data => createHash('sha256').update(data).digest('hex');
const cases = ['consumer-app', 'storefront', 'bilingual-service'];
const candidates = ['AGENTS.md', 'catalog/themes.json', 'templates/project-design.md',
  'skills/prepare-frontend-design/SKILL.md', 'skills/review-frontend-design/SKILL.md',
  'skills/review-frontend-design/references/state-transitions.md', 'references/skill-adaptations.md'];
for (const entry of await readdir(path.join(root, 'knowledge'))) if (entry.endsWith('.md')) candidates.push(`knowledge/${entry}`);
for (const theme of await readdir(path.join(root, 'themes'))) {
  for (const name of ['README.md', 'design.md', 'sources.md', 'motion.md', 'effects.md']) {
    try { await readFile(path.join(root, 'themes', theme, name)); candidates.push(`themes/${theme}/${name}`); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
}
for (const name of cases) candidates.push(`examples/p0-evaluation/${name}/brief.md`);
const files = [];
for (const relative of candidates.sort()) {
  const data = await readFile(path.join(root, relative));
  const target = path.join(frozen, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, data);
  files.push({ path: relative, bytes: data.length, sha256: sha(data) });
}
for (const name of cases) {
  const folder = path.join(stage, 'runs', name);
  await mkdir(folder, { recursive: true });
  await copyFile(path.join(frozen, `examples/p0-evaluation/${name}/brief.md`), path.join(folder, 'brief.md'));
}
const record = { frozenAt: new Date().toISOString(), baseCommit: '83e43077ab5bc5478a6a1d22f1cc4d3ab81cc172',
  sourceState: 'Uncommitted A-D implementation; individual frozen bytes/hashes identify evaluated sources, not baseCommit alone.',
  cases, files };
await writeFile(path.join(stage, 'snapshot.json'), JSON.stringify(record, null, 2) + '\n');
console.log(JSON.stringify({ files: files.length, bytes: files.reduce((n, f) => n + f.bytes, 0), frozenAt: record.frozenAt }));
