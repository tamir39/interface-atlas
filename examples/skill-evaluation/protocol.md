# Preparation and opt-in review trial protocol

Status: frozen protocol, 2026-10-17, before generation. Inputs, wrappers and helper are hashed in the evaluation manifest. This protocol describes a qualitative document evaluation, not its results.

Interface Atlas is independent of Twohearts. The relevant repository guidance is `AGENTS.md`. This protocol extends the existing C01–C12 and T01–T10 evaluation instead of replacing their identities or historical judgments. General UI/UX is evaluated as substantive preparation and review reasoning; accessibility/responsive and human-facing Agent Experience are selectively loaded profiles. No numerical quality score, complete accessibility verdict, usability result, actual service guarantee or model cost claim follows from these exercises.

## Cases and evidence separation

Run four isolated preparation cases: the existing consumer-app, storefront and bilingual-service briefs from `examples/p0-evaluation/`, plus `agent-operations/brief.md`. The three known briefs are regression rehearsals. Preserve their bytes and hashes; their product requirements remain inputs. Their old snapshot references and procedural phrases such as “unchanged workflow” are historical provenance, superseded only by the frozen current trial wrapper, which points to the revised preparation entry and permitted selective references. Do not silently rewrite requirements to make a trial easier. Record this procedural override in each case manifest.

The new fictional operations brief is a transfer probe, not proof of held-out generalization. It is written after inspection of the research proposal and may share concepts with Atlas guidance. It provides no preferred theme, model, stack or working backend. Theme choice remains open in all four cases.

Separate material into three input sets:

1. **Generation:** case brief, minimal reading/output wrapper, frozen preparation entry and its legitimately selected dependencies. Do not provide this rubric, expected probe dispositions, old generated designs/evaluations, historical findings, the research report, other case outputs, or another generator's decisions.
2. **Opt-in review:** one frozen first draft, its brief, supplied evidence inventory, frozen review entry and legitimately selected references. No generator self-evaluation, historical findings, expected answers or independent evaluation is supplied before the review report is frozen.
3. **Independent evaluation:** this protocol, frozen inputs, first drafts, read logs and review reports. Root reads each complete first draft and checks claims against cited sources as needed. A sibling check supplements this; neither author self-maps nor skill-produced reviews serve as ground truth.

Preserve exact messages actually supplied. A minimal wrapper must not name the chapter expected for a case, enumerate the rubric's edge cases, identify a preferred theme, or tell the agent the target answer. Loading the right selective profile should follow the revised skill and brief. Explicitly naming the Agent Experience chapter to a generator would test guided use, not discovery, and must be disclosed as a changed condition.

## Freeze, reading and artifact procedure

Before dispatch, root records the repository revision/status and SHA-256/full UTF-8 byte identities for the evaluated skills, knowledge index and selected-profile files, project template, catalog, themes eligible as inputs, and evaluator machinery. A source snapshot or immutable copy prevents later edits changing what a hash represents. Freeze brief/prompt/fixture bytes separately. Distinguish source changes, fixture changes and evaluation-tool changes in the manifest; record any unavailable original evidence rather than reconstructing it as contemporaneous proof.

Assign a separate temporary output directory and log per case and per scope probe. Generators may write only their case's `brief.md`, `first-draft.md`, `design.md`, `evaluation.md` and `read-log.json`. A helper-owned manifest/log file may also be present. No product implementation, installation, publication or source mutation belongs to generation. Aim for a self-contained document around 2,000–3,200 words where useful; word count is not a completeness target.

Use a contemporaneous read helper for every repository content read. Before presenting content, append a record with sequence, UTC timestamp, purpose, path, read mode, exact excerpt selector if any, full source bytes/hash and returned UTF-8 bytes/hash. Maintain one sequential log writer per run, with atomic writes; do not race parallel updates to one log. Repeated reads count. A full-file hash does not establish that the full file was read when an excerpt was returned. Record failed/empty reads and display truncation honestly; distinguish emitted bytes from demonstrably presented content. Directory names and metadata-only hashes are separate operations, not content reads. Read the brief separately and retain its identity.

Allow only the revised skill's required/conditional repository dependencies: catalog, 2–3 candidate theme READMEs where applicable, one selected detailed theme package with provenance, relevant optional motion/effects, selectively relevant knowledge and the template. Existing-project inputs, if supplied to a scope probe, are recorded separately. Do not load all theme details, every profile, installed global UI skills, unrelated runtime/backend skills, outside web sources or asset binaries. External URLs in Atlas source records are inherited provenance, not fresh verification.

At handoff, `first-draft.md` and `design.md` must be identical. Root hashes both before any review. Keep first draft immutable; later repairs go into `design.md` with separately frozen findings and a correction record. Generator `evaluation.md` maps requirements to exact headings and distinguishes supplied facts, inherited guidance, proposals, unknown contracts and evidence performed. It must not claim independent validation. For review runs, preserve the unedited input and a separate report/read log; compare before/after source and design hashes to detect unintended mutation.

If a logging failure, prohibited read or rubric leak occurs, retain the incident and outputs, mark the affected evidence limited, and identify any rerun as a separate attempt. Do not repair the first-pass record silently. No execution or instrumentation claims may be backfilled from a final directory listing.

## Retained document criteria

Use Document-covered, Partial, Missing, or Open contract per criterion, with heading/line evidence and a concise reason. Not applicable needs a brief-specific reason. Document-covered means concrete, internally consistent written behavior; it does not mean working software. An open contract needs its owner/input and an implementation gate. A correct gate is useful coverage but does not turn an unavailable capability into a pass. Preserve any mixed judgment, such as covered local behavior with an open remote contract.

| ID | Criterion | Expected written evidence |
| --- | --- | --- |
| C01 | Brief fidelity | Required tasks and constraints preserved; additions, hypotheses and unknowns labeled. |
| C02 | Theme selection | Candidate comparison, fit rationale and retained theme identity; status remains draft. |
| C03 | Self-contained visual rules | Exact roles/pairs, type, spacing, geometry, density and appearances embedded for implementation. |
| C04 | State ownership | Durable/session/draft/authoritative ownership and persistence failure boundaries resolved or gated. |
| C05 | Recovery | Pending, empty, unavailable, failure, repeated action, edit/discard and conflicts where relevant. |
| C06 | End-to-end tasks | Concrete task/decision/state transitions without invented service capabilities. |
| C07 | Adaptive and keyboard behavior | Content order, reflow/overflow, labels, focus, input adaptation and native semantics specified. |
| C08 | Appearance and motion | Light/Dark/System, reduced/off behavior, contrast scope and optional effects explicit. |
| C09 | Content and assets | Language, real media rights/delivery and exact font-package checks appropriate to the brief. |
| C10 | Provenance | Theme/Atlas identities, source/creator roles, URLs/pins, terms, adaptations and unresolved reuse limits. |
| C11 | Validation honesty | Document review, inherited evidence and future project checks distinguished. |
| C12 | Selective loading | Complete read evidence and task-justified selection; project document supports ordinary implementation. |

| ID | Retained targeted trace, when applicable |
| --- | --- |
| T01 | Save/request success followed by transaction failure; candidate A completes after edit B; no early Saved or lost B. |
| T02 | Missing versus denied, malformed or unknown-version data; ordinary editing cannot overwrite uncertain authority. |
| T03 | Two-context same-base edits and conflict during review; reset/import followed by stale queued writer; enforceable boundary or accepted loss. |
| T04 | Largest valid created state fits compatible export/import; failed restoration retains previous authority. |
| T05 | Pending control, validation ownership and dirty exit; usable feedback, focus and discard scope. |
| T06 | Back/Forward, review Change, branching and locale switch; retained answers and defined history/focus. |
| T07 | Applied remote effect, lost reply, reload; recovery identity acknowledged before dispatch or independent discovery. |
| T08 | Duplicate activation, changed payload/intent, expired dedupe and delayed earlier-attempt reply; overlapping unresolved actions gated. |
| T09 | Cancellation/completion race, stale or partial evidence and prolonged observation; truthful scope and bounded checking. |
| T10 | Actionable project proposals versus unresolved external capabilities, without fictional endpoints or guarantees. |

Treat applicability as substantive: deleting a required task is a failure; omitting an optional feature may be sound scope but does not demonstrate that feature's recovery quality.

## Added general UX and Agent Experience criteria

These extend the retained rubric. They are not instructions to add every feature to every product.

| ID | Criterion | Evaluation question |
| --- | --- | --- |
| G01 | Problem and evidence | Are primary users/tasks/outcomes grounded in the brief, with research gaps and hypotheses distinct from observations or actual interviews? |
| G02 | Information and journeys | Can a reader follow entry, discovery, choice, completion, interruption and return, including meaningful alternative states? Does navigation/content order serve these tasks? |
| G03 | Composition and hierarchy | Do grouping, hierarchy, density, key actions and responsive priorities have concrete task/content reasons rather than theme-only decoration? |
| G04 | Type, color and writing | Are readable type/wrapping, semantic color roles and labels/error/recovery copy coherent with the task and supplied language/content? Are proposals distinguishable from measured evidence? |
| G05 | Usability evidence and next checks | Does the document identify unresolved usability questions and a feasible validation plan, without synthetic participant quotes, invented metrics or conformance claims? |
| A01 | Agent expectation and authority | Where an agent is actually present, are its allowed actions, human decisions, visible evidence/uncertainty and unavailable capabilities explicit? |
| A02 | Proposal change | Is approval bound to the proposal actually reviewed, including target/scope and changes during review, without treating a prior decision as unlimited authority? |
| A03 | Progress and intervention | Can a person distinguish queued/running/awaiting-decision/connection/command-pending/result-unknown states as needed, and understand what a cancel request currently means? |
| A04 | Changed intent and lost acknowledgement | Does the concrete change/cancel/re-entry trace preserve the original action and distinguish local intent, accepted control command and observed outcome, with service gaps gated? |

Apply A01–A04 to the operations case. For the known briefs, explain non-applicability and check that an unnecessary agent profile/control surface was not imported. Accessibility/responsive needs are evaluated in C07/G04 and any requested focused profile; a static document can specify checks but cannot establish actual keyboard/AT/reflow behavior.

## Opt-in review and routing probes

Keep `scope-probe-prompts.md` and its frozen fixtures separate from `scope-probe-expectations.md`. Agents receive prompt plus fixture only. Expected dispositions are evaluator-only. Use separate fresh contexts for negative scope probes to avoid a prior review/preparation request carrying authorization into the next probe. Positive review cases may be grouped in one review-only context; disclose that grouping. Record available skill discovery metadata, which skill was actually opened, reads, outputs, and all mutations. A scenario label alone is not an execution result.

Use the opt-in review skill on at least the frozen operations first draft and one known first draft. Review begins with the artifact/brief/evidence available, loading a relevant Atlas source for a concrete need. It must not automatically regenerate a design, prescribe a new theme, or execute corrections. Review criteria:

| ID | Criterion | Expected report evidence |
| --- | --- | --- |
| R01 | Activation and scope | Correct entry for the request; ordinary implementation/narrow edits do not start broad preparation or unsolicited review. |
| R02 | Review-only boundary | Review yields findings/coverage; any suggested correction is separate from mutation and no fix is applied merely because review was requested. |
| R03 | Concrete findings | A finding names affected task, failure condition, precise artifact evidence, impact and bounded correction; preference/heuristic is labeled. |
| R04 | Consolidation and priority | Root causes consolidated; priority tied to user impact; no duplicated checklist inflation or unsupported universal score. |
| R05 | Evidence limits | Supplied/static/runtime/AT/user evidence separated; unavailable evidence and open external contracts reported accurately. |
| R06 | Selective review | Reads and profiles justified by the question; governing project document first, no full-library re-read or automatic all-six/global skill bundle. |
| R07 | Independent agreement | Compare the report with root's independent issue register: supported findings, unsupported findings, missed material issues and justified differences, with reasons. |

If a generated first draft has no independently supported issue, do not fabricate one to exercise review. The frozen explicit-review probe includes a small controlled design fixture to exercise finding quality; it is a scope/diagnostic check, not a hidden production benchmark. Fixture expectations must be frozen before reviewer output and withheld from the reviewer.

## Comparison and reporting

Compare each new known-case first draft separately with its historical first-pass findings in `examples/p0-evaluation/trial-findings.json` and, separately, historical root-corrected documents. CP01–CP03, SF01–SF03 and BS01 are evaluator-only regression checkpoints. Do not count already-corrected historical behavior as a new gain, or an optional feature removed as a verified fix. Keep targeted traces and new G/A/R criteria out of historical score comparisons where they were not assessed then.

Report omissions, contradictions, unsupported claims, correct open gates, review agreement and read scope with exact artifact evidence. Reading figures include operations, unique files and returned bytes by entry/fixed/conditional/project input plus repeats; do not equate them to model tokens, billing, latency, comprehension or usability. Compare only compatible measurements and disclose prior logging limits.

Changes to agents, skills, wording, selected references, theme choices, fixtures and familiarity vary together. Four cases and a few routing probes support bounded qualitative observations, not a causal/statistical effectiveness claim. Report source/browser/service/translation/font gaps separately from document quality. Preserve every first pass and disclose any correction passes. All browser, storage, assistive-technology, real-service and usability tests remain future work unless actual recorded execution is separately supplied.

## Frozen execution wrapper

Repository: `D:/Projects/InterfaceAtlas`; isolated staging: `interface-atlas-skill-implementation-2026-10-17` in this chat's visualization workspace. The reader uses a frozen private text snapshot, logs source-content bytes before display, and assigns sequential JSONL events per run. Failed reads are separate zero-content events. Root verifies excerpt hashes and checks tool output for reported truncation; emitted bytes alone do not prove model comprehension. The helper and exact prompts are identified in evidence.json. Generation writes staging outputs only; review reports use separate logs and cannot alter a draft. Runtime host discovery is not exercised: metadata validation and explicit-path skill use are reported separately from behavioral scope probes. All source changes and evaluation fixtures are local; no commit, push or site deployment is part of this pass.
