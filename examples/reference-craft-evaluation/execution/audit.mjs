import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const stage = path.resolve(import.meta.dirname, '..');
const sha = data => createHash('sha256').update(data).digest('hex');
const file = async name => { const data = await readFile(name); return { bytes: data.length, sha256: sha(data) }; };
const [command = 'summary', caseName] = process.argv.slice(2);
if (command === 'capture') {
  if (!['consumer-app', 'storefront', 'bilingual-service', 'reference-probe'].includes(caseName)) throw Error('Unknown case');
  const first = await file(path.join(stage, 'runs', caseName, 'first-draft.md'));
  const design = await file(path.join(stage, 'runs', caseName, 'design.md'));
  if (first.sha256 !== design.sha256) throw Error('First draft must initially equal design');
  const identity = { capturedAt: new Date().toISOString(), case: caseName, firstDraft: first, designAtHandoff: design, identicalAtHandoff: true };
  await writeFile(path.join(stage, 'runs', caseName, 'identity.json'), JSON.stringify(identity, null, 2) + '\n');
  console.log(JSON.stringify(identity));
} else if (command === 'summary') {
  const snapshot = JSON.parse(await readFile(path.join(stage, 'snapshot.json'), 'utf8'));
  const sourceFailures = [];
  for (const source of snapshot.files) {
    const current = await file(path.join(stage, 'frozen-source', source.path));
    if (current.bytes !== source.bytes || current.sha256 !== source.sha256) sourceFailures.push(source.path);
  }
  const runs = [];
  for (const name of await readdir(path.join(stage, 'logs'))) {
    const events = (await readFile(path.join(stage, 'logs', name, 'read-events.jsonl'), 'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
    const failures = [];
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (event.sequence !== i + 1) failures.push(`sequence:${i + 1}`);
      if (event.status === 'failed') continue;
      let source;
      if (event.path.startsWith('@case/')) source = path.join(stage, 'runs', event.path.slice('@case/'.length));
      else if (event.path.startsWith('@fixture/')) source = path.join(stage, 'fixtures', 'reference-probe', event.path.slice('@fixture/'.length));
      else source = path.join(stage, 'frozen-source', event.path);
      const data = await readFile(source), text = data.toString('utf8'), lines = text.split('\n');
      if (data.length !== event.sourceBytes || sha(data) !== event.sourceSHA256) failures.push(`${event.sequence}:source`);
      let returned;
      if (event.selection.kind === 'whole') returned = text;
      else if (event.selection.kind === 'metadata') returned = '';
      else if (event.selection.kind === 'headings') returned = lines.filter(line => /^#{1,6}\s/.test(line)).join('\n') + '\n';
      else {
        returned = lines.slice(event.selection.startLine - 1, event.selection.endLine).join('\n');
        if (event.selection.kind === 'range' || !returned.endsWith('\n')) returned += '\n';
      }
      const content = Buffer.from(returned, 'utf8');
      if (content.length !== event.returnedBytes || sha(content) !== event.returnedSHA256) failures.push(`${event.sequence}:returned`);
    }
    const content = events.filter(event => event.status === 'returned');
    const project = content.filter(event => event.path.startsWith('examples/') || event.path.startsWith('@'));
    const totalBytes = content.reduce((n, event) => n + event.returnedBytes, 0);
    const projectBytes = project.reduce((n, event) => n + event.returnedBytes, 0);
    runs.push({ run: name, events: events.length, contentReads: content.length, uniqueContentFiles: new Set(content.map(event => event.path)).size,
      returnedBytes: totalBytes, atlasBytes: totalBytes - projectBytes, projectBytes,
      metadataOperations: events.filter(event => event.status === 'metadata').length,
      failedReads: events.filter(event => event.status === 'failed').map(event => ({ path: event.path, error: event.error })),
      contentPaths: [...new Set(content.map(event => event.path))], replayFailures: failures });
  }
  const caseRows = [];
  for (const name of ['consumer-app', 'storefront', 'bilingual-service', 'reference-probe']) {
    try {
      const identity = JSON.parse(await readFile(path.join(stage, 'runs', name, 'identity.json'), 'utf8'));
      const first = await file(path.join(stage, 'runs', name, 'first-draft.md'));
      const design = await file(path.join(stage, 'runs', name, 'design.md'));
      const firstText = await readFile(path.join(stage, 'runs', name, 'first-draft.md'), 'utf8');
      const designText = await readFile(path.join(stage, 'runs', name, 'design.md'), 'utf8');
      caseRows.push({ case: name, originalFirstDraftPreserved: first.sha256 === identity.firstDraft.sha256, identicalAtHandoff: identity.identicalAtHandoff,
        firstDraft: { ...first, words: (firstText.match(/\S+/g) || []).length }, design: { ...design, words: (designText.match(/\S+/g) || []).length } });
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  const result = { recordedAt: new Date().toISOString(), baseCommit: snapshot.baseCommit,
    evidenceLevel: 'Qualitative document generation/review, verified emitted-source reading records; no runtime/user/billing result.',
    sourceFailures, cases: caseRows, runs };
  await writeFile(path.join(stage, 'audit.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ sourceFailures, cases: caseRows, runs: runs.map(({ contentPaths, ...rest }) => rest) }, null, 2));
} else throw Error('Unknown command');
