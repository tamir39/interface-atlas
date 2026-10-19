import { readFile, writeFile, mkdir, copyFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const stage = path.resolve(import.meta.dirname, '..');
const publish = path.join(stage, 'publish');
const sha = data => createHash('sha256').update(data).digest('hex');
const copy = async (from, to) => { await mkdir(path.dirname(to), { recursive: true }); await copyFile(from, to); };
const snapshot = JSON.parse(await readFile(path.join(stage, 'snapshot.json'), 'utf8'));
const packed = [];
for (const source of snapshot.files) {
  const data = await readFile(path.join(stage, 'frozen-source', source.path));
  const text = data.toString('utf8');
  if (sha(data) !== source.sha256 || !Buffer.from(text, 'utf8').equals(data)) throw Error(`Frozen source mismatch: ${source.path}`);
  packed.push({ ...source, text });
}
await writeFile(path.join(publish, 'source-snapshot.json'), JSON.stringify({ note: 'Atlas-owned frozen source text. UTF-8 encode each text string to recover exact recorded bytes. Research archive, not default agent context.', files: packed }, null, 2) + '\n');
for (const name of ['protocol.md', 'snapshot.json', 'root-initial-observations.json', 'final-review.md', 'final-review-resolution.md']) await copy(path.join(stage, name), path.join(publish, name));
await copy(path.join(stage, 'audit.json'), path.join(publish, 'read-audit.json'));
for (const name of ['consumer-app', 'storefront', 'bilingual-service', 'reference-probe']) {
  for (const entry of await readdir(path.join(stage, 'runs', name), { withFileTypes: true })) if (entry.isFile()) await copy(path.join(stage, 'runs', name, entry.name), path.join(publish, name, entry.name));
  await copy(path.join(stage, 'logs', `${name}-gen`, 'read-events.jsonl'), path.join(publish, name, 'read-events.jsonl'));
  if (name !== 'reference-probe') await copy(path.join(stage, 'logs', `${name}-review`, 'read-events.jsonl'), path.join(publish, name, 'review-read-events.jsonl'));
}
for (const name of ['brief.md', 'design.md', 'reference.md']) await copy(path.join(stage, 'fixtures/reference-probe', name), path.join(publish, 'reference-probe/inputs', name));
await copy(path.join(stage, 'fixtures/reference-probe/brief.md'), path.join(publish, 'reference-probe/brief.md'));
for (const entry of await readdir(path.join(stage, 'execution'), { withFileTypes: true })) {
  if (entry.isFile()) await copy(path.join(stage, 'execution', entry.name), path.join(publish, 'execution', entry.name));
}
const wrappers = [];
for (const name of await readdir(path.join(stage, 'execution/prompts'))) {
  const text = await readFile(path.join(stage, 'execution/prompts', name), 'utf8');
  await copy(path.join(stage, 'execution/prompts', name), path.join(publish, 'execution/prompts', name));
  wrappers.push({ path: `execution/prompts/${name}`, bytes: Buffer.byteLength(text), sha256: sha(text), text });
}
await writeFile(path.join(publish, 'execution/prompts.json'), JSON.stringify({ note: 'Exact wrapper files delivered by path; seven contexts, all fresh. Wrappers supersede historical procedural wording only.', wrappers }, null, 2) + '\n');
const currentReader = await readFile(path.join(stage, 'execution/read.mjs'), 'utf8');
const dispatchReader = currentReader.replace('|reference-probe|harness-check)', '|reference-probe)');
await writeFile(path.join(publish, 'execution/read-at-dispatch.mjs'), dispatchReader);
await copy(path.join(stage, 'logs/harness-check-gen/read-events.jsonl'), path.join(publish, 'execution/harness-check-read-events.jsonl'));
await writeFile(path.join(publish, 'execution/notes.json'), JSON.stringify({
  baseCommit: snapshot.baseCommit,
  evaluatedSourceState: snapshot.sourceState,
  metadata: 'Execution paths and helpers are archival; they are not installed product/skill tools.',
  readerAmendment: 'After dispatch, the reader allowlist added only harness-check as a named preflight run. Eligible trial-source checks, selectors, output and case log behavior were unchanged. read-at-dispatch.mjs reconstructs the original text from the recorded initial patch, not a contemporaneous separate capture.',
  proceduralInterventions: [
    { target: 'bilingual-service-gen', message: 'Keep the failed helper read in your evidence; do not bypass it. This is a trial allowlist limitation, not evidence of unknown upstream rights: use the creator/pin/terms actually recorded in the supplied ledger, distinguish unavailable full-notice text from unresolved licensing, and preserve the relevant notice locator for future distribution. No source or product requirement changes; continue your original task.' },
    { target: 'bilingual-service-gen', message: 'Your helper-owned read log is C:/Users/PC/.codex/visualizations/2026/10/12/01a13103-a26d-7172-81af-e67e7cee6101/interface-atlas-ad-implementation-2026-10-20/logs/bilingual-service-gen/read-events.jsonl. You can name it without opening it. Record any limitation already encountered and finish your original delivery.' }
  ],
  limitation: 'Full license texts omitted from reader eligible files caused one blocked attempt. This is not evidence of naturally avoided license reading. Failed shell starts before helper execution returned no Atlas content; probe reports that setup issue.'
}, null, 2) + '\n');
console.log(JSON.stringify({ packedSources: packed.length, packedBytes: packed.reduce((n, row) => n + row.bytes, 0), wrappers: wrappers.length }));
