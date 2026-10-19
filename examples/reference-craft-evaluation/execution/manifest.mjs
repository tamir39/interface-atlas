import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const stage = path.resolve(import.meta.dirname, '..');
const publish = path.join(stage, 'publish');
const root = 'D:/Projects/InterfaceAtlas';
const sha = data => createHash('sha256').update(data).digest('hex');
const audit = JSON.parse(await readFile(path.join(publish, 'read-audit.json'), 'utf8'));
const snapshot = JSON.parse(await readFile(path.join(publish, 'snapshot.json'), 'utf8'));
if (audit.sourceFailures.length || audit.runs.some(run => run.replayFailures.length) || audit.cases.some(item => !item.originalFirstDraftPreserved)) throw Error('Evidence integrity check failed');
const implementation = [];
for (const relative of ['.gitattributes', 'README.md', 'examples/README.md', 'THIRD_PARTY_NOTICES.md', 'knowledge/README.md',
  'knowledge/design-reference-evaluation.md', 'knowledge/ui-ux-design.md', 'knowledge/accessibility-and-responsive.md',
  'references/SOURCES.md', 'references/skill-adaptations.md', 'references/practical-lessons.md', 'references/licenses/shadcn-MIT.txt',
  'skills/prepare-frontend-design/SKILL.md', 'skills/review-frontend-design/SKILL.md', 'adapters/README.md']) {
  const data = await readFile(path.join(root, relative));
  implementation.push({ path: relative, bytes: data.length, sha256: sha(data) });
}
const briefChecks = [];
for (const name of snapshot.cases) {
  const source = snapshot.files.find(file => file.path === `examples/p0-evaluation/${name}/brief.md`);
  const data = await readFile(path.join(publish, name, 'brief.md'));
  const preserved = sha(data) === source.sha256;
  if (!preserved) throw Error(`Brief changed: ${name}`);
  briefChecks.push({ case: name, bytes: data.length, sha256: sha(data), preserved });
}
const currentSourceMismatches = [];
for (const source of snapshot.files) if (sha(await readFile(path.join(root, source.path))) !== source.sha256) currentSourceMismatches.push(source.path);
const artifacts = [];
const walk = async folder => {
  for (const entry of (await readdir(folder, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const absolute = path.join(folder, entry.name), relative = path.relative(publish, absolute).replaceAll('\\', '/');
    if (entry.isDirectory()) await walk(absolute);
    else if (relative !== 'evidence.json') { const data = await readFile(absolute); artifacts.push({ path: relative, bytes: data.length, sha256: sha(data) }); }
  }
};
await walk(publish);
const result = { date: '2026-10-20', baseCommit: snapshot.baseCommit, evaluatedSourceState: snapshot.sourceState,
  scope: 'A-D shared knowledge implementation and qualitative design-document reruns. Fresh generation/review contexts; no new public skill, adapter, product, install or deployment.',
  protocol: 'protocol.md', snapshot: 'snapshot.json', packedFrozenText: 'source-snapshot.json', reading: 'read-audit.json',
  correctedCases: ['consumer-app', 'storefront'], supportedContractFindings: ['C01', 'C02', 'S01', 'S02'],
  followUpReportingClarification: { id: 'E01', disposition: 'Closed; see final-review-resolution.md' },
  sourcesUnchangedAfterFreeze: currentSourceMismatches.length === 0, currentSourceMismatches,
  sourceHashesVerified: audit.sourceFailures.length === 0, returnedReadHashesVerified: audit.runs.every(run => run.replayFailures.length === 0),
  cases: audit.cases, briefChecks, implementation,
  skillDirectories: (await readdir(`${root}/skills`)).sort(), adapterEntries: (await readdir(`${root}/adapters`)).sort(),
  actorNames: { generation: ['ad_consumer_generation', 'ad_storefront_generation', 'ad_bilingual_generation'],
    independentReview: ['ad_consumer_review', 'ad_storefront_review', 'ad_bilingual_review'], referenceProbe: 'ad_reference_probe',
    followUp: 'audit_baseline_lessons', parent: 'root', note: 'Generation/review/probe used fresh fork_turns=none contexts. Follow-up had prior findings and is not a blind trial. No model override.' },
  limitations: [
    'Document-covered behavior only; no runtime, browser, storage, service, translation, assistive-technology or user checks.',
    'One license text read blocked by the frozen allowlist; root procedural clarification did not change recorded rights. Do not infer license-reading avoidance from the restriction.',
    'Reader allowlist gained a named harness-preflight run after dispatch; trial read/selection logic and eligible source bytes unchanged. See execution/notes.json.',
    'Synthetic probe is directed and familiar briefs are regressions; no causal effectiveness, recall, billing or performance claim.',
    'All agents reported complete displayed source output; replay verifies emitted bytes/hashes, not comprehension or the host full skill discovery.'
  ], artifacts };
if (currentSourceMismatches.length) throw Error('Evaluated source changed after freeze');
await writeFile(path.join(publish, 'evidence.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ artifacts: artifacts.length, artifactBytes: artifacts.reduce((n, row) => n + row.bytes, 0), cases: result.cases.length, supportedContractFindings: result.supportedContractFindings.length, sourceMismatches: currentSourceMismatches }));
