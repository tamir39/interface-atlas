import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const stage = path.resolve(import.meta.dirname, '..').replaceAll('\\', '/');
const helper = `${stage}/execution/read.mjs`;
const cases = ['consumer-app', 'storefront', 'bilingual-service'];
await mkdir(`${stage}/execution/prompts`, { recursive: true });
const prompts = [];
for (const name of cases) {
  for (const phase of ['gen', 'review']) {
    const run = `${name}-${phase}`;
    const intro = phase === 'gen'
      ? `Prepare a self-contained project design.md for examples/p0-evaluation/${name}/brief.md using skills/prepare-frontend-design/SKILL.md from the frozen Interface Atlas snapshot. Follow its selective reading workflow. The brief's historical workflow/revision wording is superseded by this wrapper; product requirements are unchanged.\n`
      : `Use skills/review-frontend-design/SKILL.md from the frozen Interface Atlas snapshot to review this case's @first-draft against examples/p0-evaluation/${name}/brief.md. Report actionable findings and coverage, without changing the draft.\n`;
    const access = `\nInterface Atlas is independent of Twohearts. Every Atlas or project input CONTENT read must use this logged helper, sequentially:\n& 'D:/Applications/NodeJs/node.exe' '${helper}' '${run}' 'repository/relative/path' --whole _ 'purpose'\nRead AGENTS.md, the named skill and your brief through it. For focused content use --headings _, --section 'Exact heading without #', or --range 'start:end'. Use --identity _ for metadata-only source hashes rather than rereading prose. The helper reads immutable sources, records selectors/hashes/returned bytes, and isolates case logs. Use max_output_tokens of at least 10000 for a whole guide and do not batch large reads into truncated output; disclose any truncation.\n`;
    const constraints = `\nDo not read this study's protocol, snapshot manifest, other case outputs, old designs/evaluation findings, maintainer lesson history, research reports, review drafts or globally installed skills. Do not use live web, binary assets, upstream skills/installers or another agent's output. Do not edit Atlas, implement a product, install dependencies, commit, publish or send messages to other chats. Use only legitimate named-skill dependencies and the supplied brief; source URLs are inherited provenance, not fresh verification.\n`;
    const output = phase === 'gen'
      ? `\nWrite only ${stage}/runs/${name}/{first-draft.md,design.md,evaluation.md}. Root has preserved brief.md. first-draft.md and design.md must be byte-identical at delivery. Aim for roughly 2000–3200 words when useful; completeness and self-contained decisions matter more than length. evaluation.md is a concise requirement-to-heading map, with selected readings, unresolved inputs, proposed versus inherited rules, performed versus future checks and any read/log limitation. Do not run the separate review workflow. Deliver the output paths and important unresolved inputs.\n`
      : `\nUse the helper path @first-draft to read the frozen generated draft. Do not read its author evaluation.md. Write only ${stage}/runs/${name}/review.md. Identify finding severity/reason, exact location, trigger, consequence, counterevidence, bounded correction and evidence. Separate open owner contracts from defects and future runtime checks. If none are actionable, state checked scope and limits. No supplied runtime/browser/service evidence exists. Do not run preparation. Deliver report path and material findings or limits.\n`;
    const text = intro + access + constraints + output;
    const relative = `execution/prompts/${run}.txt`;
    await writeFile(path.join(stage, relative), text);
    prompts.push({ run, path: relative, text });
  }
}
await writeFile(`${stage}/execution/prompts.json`, JSON.stringify({ note: 'Exact wrapper contents supplied by path; dispatch messages separately preserved.', prompts }, null, 2) + '\n');
console.log(JSON.stringify({ wrappers: prompts.length }));
