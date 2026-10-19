import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const root = 'D:/Projects/InterfaceAtlas';
const stage = path.resolve(import.meta.dirname, '..');
const sha = data => createHash('sha256').update(data).digest('hex');
const names = ['README.md', 'THIRD_PARTY_NOTICES.md', 'examples/README.md', 'knowledge/README.md',
  'knowledge/design-reference-evaluation.md', 'knowledge/ui-ux-design.md', 'knowledge/accessibility-and-responsive.md',
  'references/SOURCES.md', 'references/skill-adaptations.md', 'references/practical-lessons.md'];
const walk = async folder => {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const absolute = path.join(folder, entry.name);
    if (entry.isDirectory()) await walk(absolute);
    else if (entry.name.endsWith('.md')) names.push(path.relative(root, absolute).replaceAll('\\', '/'));
  }
};
try { await walk(path.join(root, 'examples/reference-craft-evaluation')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const failures = [];
let checked = 0;
const slugs = text => {
  const ids = new Set(), counts = new Map();
  for (const match of text.matchAll(/^#{1,6}\s+(.+?)\s*$/gm)) {
    const base = match[1].toLowerCase().replace(/<[^>]*>/g, '').replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/ /g, '-');
    const count = counts.get(base) || 0; counts.set(base, count + 1); ids.add(base + (count ? `-${count}` : ''));
  }
  for (const match of text.matchAll(/\bid=["']([^"']+)["']/g)) ids.add(match[1]);
  return ids;
};
for (const relative of names) {
  const absolute = path.join(root, relative), text = await readFile(absolute, 'utf8');
  for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const raw = match[1].replace(/^<|>$/g, '');
    if (/^[a-z][a-z+.-]*:/i.test(raw)) continue;
    const [targetPath, anchor] = raw.split('#');
    const target = path.resolve(path.dirname(absolute), decodeURIComponent(targetPath || ''));
    try {
      const info = await stat(target);
      if (anchor && info.isFile()) {
        const targetText = await readFile(target, 'utf8');
        if (!slugs(targetText).has(decodeURIComponent(anchor))) throw Error(`missing anchor #${anchor}`);
      }
      checked++;
    } catch (error) { failures.push({ file: relative, link: raw, error: String(error.message) }); }
  }
}
const prep = sha(await readFile(`${root}/skills/prepare-frontend-design/SKILL.md`));
const review = sha(await readFile(`${root}/skills/review-frontend-design/SKILL.md`));
const license = await readFile(`${root}/references/licenses/shadcn-MIT.txt`);
const result = { checkedAt: new Date().toISOString(), localLinksChecked: checked, brokenLinks: failures,
  preparationEntryUnchanged: prep === 'd5528477be4f87ee4d66591e95176423d95bf2e0427d229e82dffb1b726b7d40',
  reviewEntryUnchanged: review === 'a8aa6e00cb9055b067c9ae91ca972ebe5d422ab697768f54a7084c99e862ba08',
  adapterEntries: (await readdir(`${root}/adapters`)).sort(),
  retainedShadcnNotice: { bytes: license.length, sha256: sha(license), exactVerifiedBytes: license.length === 1063 && sha(license) === '1564074e13439397221ffd522e2e504d56561994a23d371aa5e3ad43e4f5423f' } };
await writeFile(path.join(stage, 'implementation-checks.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
if (failures.length || !result.preparationEntryUnchanged || !result.reviewEntryUnchanged || !result.retainedShadcnNotice.exactVerifiedBytes || result.adapterEntries.join(',') !== 'README.md') process.exitCode = 1;
