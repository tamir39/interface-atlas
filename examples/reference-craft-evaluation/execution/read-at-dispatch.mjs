import { readFile, appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const stage = path.resolve(import.meta.dirname, '..');
const [run, requested, mode = '--whole', selector = '_', ...purposeParts] = process.argv.slice(2);
const match = /^(consumer-app|storefront|bilingual-service|reference-probe)-(gen|review)$/.exec(run || '');
if (!match || !requested) throw Error('Usage: read.mjs case-gen|case-review relative-path --whole|--identity|--headings|--section|--range selector purpose');
const [ , caseName, phase ] = match;
const logFolder = path.join(stage, 'logs', run);
const digest = data => createHash('sha256').update(data).digest('hex');
const record = async event => {
  await mkdir(logFolder, { recursive: true });
  let prior = '';
  try { prior = await readFile(path.join(logFolder, 'read-events.jsonl'), 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await appendFile(path.join(logFolder, 'read-events.jsonl'), JSON.stringify({ sequence: prior.trim() ? prior.trim().split('\n').length + 1 : 1,
    timestamp: new Date().toISOString(), ...event }) + '\n');
};
try {
  let absolute, relative;
  if (requested === '@first-draft' && phase === 'review') {
    absolute = path.join(stage, 'runs', caseName, 'first-draft.md');
    relative = `@case/${caseName}/first-draft.md`;
  } else if (requested.startsWith('@fixture/') && caseName === 'reference-probe') {
    relative = requested;
    const suffix = requested.slice('@fixture/'.length);
    if (!['brief.md', 'design.md', 'reference.md'].includes(suffix)) throw Error('Unknown fixture');
    absolute = path.join(stage, 'fixtures', 'reference-probe', suffix);
  } else {
    relative = path.normalize(requested).replaceAll('\\', '/');
    if (relative.startsWith('../') || path.isAbsolute(relative)) throw Error('Invalid source path');
    const snapshot = JSON.parse(await readFile(path.join(stage, 'snapshot.json'), 'utf8'));
    if (!snapshot.files.some(file => file.path === relative)) throw Error('Not an eligible frozen source');
    if (relative.startsWith('examples/') && relative !== `examples/p0-evaluation/${caseName}/brief.md`) throw Error('Other cases are not inputs');
    if (phase === 'gen' && relative.startsWith('skills/review-')) throw Error('Preparation does not run review');
    if (phase === 'review' && relative.startsWith('skills/prepare-')) throw Error('Review does not run preparation');
    absolute = path.join(stage, 'frozen-source', relative);
  }
  const buffer = await readFile(absolute), text = buffer.toString('utf8'), lines = text.split('\n');
  let output, selection;
  if (mode === '--whole') { output = text; selection = { kind: 'whole' }; }
  else if (mode === '--identity') { output = JSON.stringify({ path: relative, bytes: buffer.length, sha256: digest(buffer) }) + '\n'; selection = { kind: 'metadata' }; }
  else if (mode === '--headings') { output = lines.filter(line => /^#{1,6}\s/.test(line)).join('\n') + '\n'; selection = { kind: 'headings' }; }
  else if (mode === '--section') {
    const headings = lines.map((line, i) => ({ line, i, match: line.match(/^(#{1,6})\s+(.+?)\s*$/) })).filter(row => row.match);
    const hits = headings.filter(row => row.match[2] === selector || row.line === selector);
    if (hits.length !== 1) throw Error(`Section must match once: ${selector}`);
    const start = hits[0], end = headings.find(row => row.i > start.i && row.match[1].length <= start.match[1].length)?.i ?? lines.length;
    output = lines.slice(start.i, end).join('\n'); if (!output.endsWith('\n')) output += '\n';
    selection = { kind: 'section', heading: selector, startLine: start.i + 1, endLine: end };
  } else if (mode === '--range') {
    const [start, end, ...extra] = selector.split(':').map(Number);
    if (extra.length || !Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start || end > lines.length) throw Error('Invalid range');
    output = lines.slice(start - 1, end).join('\n') + '\n'; selection = { kind: 'range', startLine: start, endLine: end };
  } else throw Error('Unknown mode');
  const returned = Buffer.from(output, 'utf8');
  await record({ path: relative, purpose: purposeParts.join(' ') || 'task-relevant input', status: selection.kind === 'metadata' ? 'metadata' : 'returned',
    selection, sourceBytes: buffer.length, sourceSHA256: digest(buffer), returnedBytes: selection.kind === 'metadata' ? 0 : returned.length,
    returnedSHA256: digest(selection.kind === 'metadata' ? Buffer.alloc(0) : returned), metadataBytes: selection.kind === 'metadata' ? returned.length : 0 });
  process.stdout.write(output);
} catch (error) {
  await record({ path: requested, purpose: purposeParts.join(' '), status: 'failed', mode, selector, returnedBytes: 0, error: String(error.message) });
  process.stderr.write(String(error.message) + '\n'); process.exitCode = 1;
}
