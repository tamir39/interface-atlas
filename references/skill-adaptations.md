# Frontend workflow method adaptations

Recorded **2026-10-17** for the updated `prepare-frontend-design`, the opt-in `review-frontend-design`, and their selectively loaded Atlas knowledge. The workflows, questions, output contracts and examples are original Atlas synthesis for **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**, informed by the methods below. This implementation record supplements the historical [research proposal](skill-research.md) and [evidence ledger](skill-research.json); it does not change what those records claimed at their inspection date.

The selected inputs are prose design methods, not installed packages or runtime dependencies. No upstream code, assets, hooks, tool schemas, validators or generators are imported or executed. The full license texts are retained unchanged under [licenses/](licenses/). Source-file and license hashes were checked against the existing research ledger before adaptation.

## Selected sources and changes

Paths below are relative to the named repository at its full pinned commit. They identify the selected source material; they are not a requirement to load every file on an Atlas invocation.

| Creator and source | Exact revision and selected source paths | Method retained; Atlas adaptation boundary |
| --- | --- | --- |
| **Jakub Krehel**, [jakubkrehel/skills](https://github.com/jakubkrehel/skills/tree/4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63). Copyright (c) 2026 Jakub Krehel. [MIT text](licenses/jakub-krehel-MIT.txt). | `4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63`<br>`skills/better-interface/SKILL.md`<br>`skills/better-accessibility/SKILL.md`<br>`skills/better-layout/SKILL.md`<br>`skills/better-writing/SKILL.md`<br>`skills/better-typography/SKILL.md`<br>`skills/better-colors/SKILL.md`<br>`skills/better-ui/SKILL.md` | Distinct domain ownership, task impact and evidence; selective lenses for content order, responsive composition, semantics/focus, writing, typography, color and visual detail. Atlas selects only relevant knowledge and identifies unchecked domains. It does not import the all-six orchestration, report format, fixed finding caps, automatic severity triggers or upstream numerical prescriptions as universal project rules. |
| **Julien Thibeaut / ibelick**, [ibelick/ui-skills](https://github.com/ibelick/ui-skills/tree/f18d13077d6e3841821ea0a36526c0fd44a570b5). Copyright (c) 2026 Julien Thibeaut. [MIT text](licenses/julien-thibeaut-MIT.txt). | `f18d13077d6e3841821ea0a36526c0fd44a570b5`<br>`skills/create-design-md/SKILL.md`<br>`skills/improve-ui/SKILL.md`<br>`skills/fixing-accessibility/SKILL.md` | Establish which design evidence governs the actual surface; preserve observed values and uncertainty; connect a finding to evidence and a bounded correction; make a handoff self-contained. Focused accessibility questions cover names, native semantics and controls. Atlas keeps its own design document and review contracts and includes behavior, accessibility and rendered evidence when the task needs them. No required CLI/specification output, external schema, prescribed folder contract, stack bans, complete accessibility rule set or upstream restriction of review to presentation is adopted. |
| **Ghaida Zahran / Design with Intent**, [ghaida/intent](https://github.com/ghaida/intent/tree/3fc38dff381ce0e4dec8f52c97c3e37abd95e10e); creator identified in [plugin metadata](https://github.com/ghaida/intent/blob/3fc38dff381ce0e4dec8f52c97c3e37abd95e10e/.claude-plugin/plugin.json). [CC0-1.0 Universal text](licenses/ghaida-intent-CC0.txt). | `3fc38dff381ce0e4dec8f52c97c3e37abd95e10e`<br>`skills/journey/SKILL.md`<br>`skills/evaluate/SKILL.md` | Reason from a user's goal through steps, decisions, alternatives, interruption and return; use bounded walkthroughs of relevant contexts and transitions. Atlas adapts these methods into its own task/state questions and distinguishes evidence, hypotheses and decisions. No full Intent/Evaluate catalog, fixed scoring, visualization-tool requirement or generated research evidence is incorporated. Credit is retained as Atlas provenance; CC0 has no attribution condition. |
| **Mohit Aggarwal**, [mohitagw15856/pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills/tree/921e015321cdcf7c48ad85f40eeaf5ba68c89433). Copyright (c) 2026 Mohit Aggarwal. [MIT text](licenses/mohit-aggarwal-MIT.txt). | `921e015321cdcf7c48ad85f40eeaf5ba68c89433`<br>`skills/human-in-the-loop-design/SKILL.md` | Ask where a human decision improves control, what action/consequence is in scope, and how intervention or escalation works. Atlas applies these questions only to actual project capabilities and authority. It does not adopt approval-volume budgets, universal risk tiers, mandatory gates for every action or unsupported confidence thresholds. |
| **Burhan Sebin**, [seb1n/awesome-ai-agent-skills](https://github.com/seb1n/awesome-ai-agent-skills/tree/75865a5d037a4cdaa7f409a4ec14ab9b0292920b). Copyright (c) 2026 Burhan Sebin. [MIT text](licenses/burhan-sebin-MIT.txt). | `75865a5d037a4cdaa7f409a4ec14ab9b0292920b`<br>`agent-engineering/human-in-the-loop/SKILL.md`<br>`agent-engineering/human-in-the-loop/references/gate-design-guide.md` | Ask whether the decision shows the exact proposal/target, consequences, authority, supporting evidence, uncertainty and recovery; identify when a changed or expired proposal needs renewed authorization. Atlas uses original interface questions, not the upstream policy template, validator, predicate schema, quorum model or runtime enforcement. A design document does not prove those guarantees exist. |

## Scope of terms and retained notices

The four MIT notices cover the inspected repository skill/documentation material described in the research ledger; no conflicting local notice was found in those selected paths. Keep each copyright and permission notice with copies or substantial portions of its covered material, including substantial adaptations. The CC0 dedication concerns rights the affirmer can waive; it does not clear trademark, patent or other persons' rights. These records are not a complete audit of upstream repositories or their dependencies.

Repository terms do not grant blanket permission for linked webpages, standards, fonts, icons, screenshots, trademarks, tools or packages. Any future import needs the terms and notices of that actual artifact. Unknown permission remains unresolved. These upstream notices do not choose or license Atlas's original material: **Atlas's own publishing license remains undecided**. Source creators do not endorse Atlas.

License texts are retained once as distribution/provenance material. Normal preparation, review and implementation should read the selected task guidance and relevant project citations; they do not need to reread every license or upstream skill. Inspect the relevant terms when copying or redistributing covered material, changing the reuse scope, or adding a new dependency.

## Linked guidance and comparisons

**Microsoft Research / Aether HAX** [human-AI interaction guidelines](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/) and **Google PAIR** [People + AI Guidebook](https://pair.withgoogle.com/guidebook/) inform independently written human-facing lifecycle questions. They are linked primary guidance, inspected 2026-10-17, not bundled skills. No webpage prose, illustrations, screenshots or assets are reproduced, and website/asset redistribution terms are not inferred from software licenses.

Anthropic Frontend Design, Google Stitch, Paul Bakaus's Impeccable and Next Level Builder's UI/UX Pro Max remain comparison inputs from the historical research, rather than dependencies of this implementation. The unselected Alireza Rezvani and Vercel entries remain research references too. The marketingskills package remains comparison-only with unresolved reuse permission; no source adaptation is made from it. The retained five notices do not imply that these other sources or their dependencies were imported or cleared.

## Project handoff

Keep a project's design document self-contained: accepted decisions, theme/source values, proposed adaptations, unknown contracts and evidence limits should be distinguishable. Carry the relevant creator/source/pin citations and this attribution record when these methods are substantially carried forward; include the applicable retained notices with redistributed covered material. A short provenance section can link the accompanying notice files without making Atlas or every upstream skill a routine implementation read.

Preserve separate theme/asset credits and any project-specific permissions. Fictional trials and desk reviews are illustrative evidence, not user interviews, accessibility conformance, runtime enforcement or proof of improved outcomes.

## License byte verification

The following are unmodified copies of the pinned upstream `LICENSE` files. Their sizes and SHA-256 values match [skill-research.json](skill-research.json).

| Retained file | Bytes | SHA-256 |
| --- | ---: | --- |
| [jakub-krehel-MIT.txt](licenses/jakub-krehel-MIT.txt) | 1,069 | `ed1dfe988fc40511b4845ccd9050a143a2002fee3bedc8064c47fa342b5d8d4f` |
| [julien-thibeaut-MIT.txt](licenses/julien-thibeaut-MIT.txt) | 1,072 | `c615621c4cc1676ccde194e7a01b6469ba477780251bd71e007fc473a49c2c2b` |
| [ghaida-intent-CC0.txt](licenses/ghaida-intent-CC0.txt) | 7,048 | `a2010f343487d3f7618affe54f789f5487602331c0a8d03f49e9a7c547cf0499` |
| [mohit-aggarwal-MIT.txt](licenses/mohit-aggarwal-MIT.txt) | 1,071 | `18a87eaf5c6017a3ffc7a3c4927627d530cc1541406cb3e705576a1b8c47c6bd` |
| [burhan-sebin-MIT.txt](licenses/burhan-sebin-MIT.txt) | 1,069 | `f1835fac859d7d648b6debd317d1a13634966a7614ca78b22d2b4063694b68b2` |
