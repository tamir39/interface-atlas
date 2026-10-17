# P0 review and design-document trial results

Status: reviewed draft report, 2026-10-15. Original Atlas analysis and fictional project specifications by **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. No skills, templates or product interfaces were implemented.

## Result

The P0 chapters now make ownership, save acknowledgement, stale writers, validation ownership, navigation and remote ambiguity more explicit. Independent review identified **six unique knowledge gaps**, corrected before generation in revision **0.2-draft**. Fresh consumer, storefront and bilingual-service documents were then generated from selective inputs. Review found **seven P2 project-document gaps** across their first drafts; one recorded correction pass addressed them, and independent reviewers confirmed those findings closed. This is not an exhaustive quality or production-readiness verdict.

| Trial | Theme / P0 chapters | First-pass findings | Reviewed specification |
| --- | --- | --- | --- |
| [Pocket Practice consumer](consumer-app/brief.md) | Layered; state/recovery and forms/navigation | 3: create/update continuation after save A; durable draft Discard; removal/Undo focus | [design.md](consumer-app/design.md), 3,056 words |
| [Form & Field storefront](storefront/brief.md) | Gallery; all three chapters | 3: repeated Add merge/result limits; earlier-attempt reply ordering; hosted return/re-entry | [design.md](storefront/design.md), 3,570 words |
| [Studio Request bilingual service](bilingual-service/brief.md) | Layered; all three chapters | 1: recovery-capability decision omitted from dispatch enablement | [design.md](bilingual-service/design.md), 3,148 words |

Each folder preserves an unchanged brief, immutable first-draft.md, current design.md, author mapping plus independent review history in evaluation.md, and reading log. The first drafts are [consumer](consumer-app/first-draft.md), [storefront](storefront/first-draft.md), and [service](bilingual-service/first-draft.md); the correction records are [consumer](consumer-app/evaluation.md#independent-review-and-one-correction-pass), [storefront](storefront/evaluation.md#independent-review-and-one-correction-pass), and [service](bilingual-service/evaluation.md#independent-review-and-one-correction-pass). Machine-readable findings are in [trial-findings.json](trial-findings.json); hashes, input identities and checks are in [evidence.json](evidence.json).

## Knowledge corrections before the trials

The [review findings](review-findings.md) record K01–K06 and source boundaries. State/recovery now binds success to the saved candidate and retires stale writers during replacement. Forms/navigation assigns native versus custom validation feedback/focus and preserves later dirty edits. Uncertain outcomes preserves submitted intent separately, gates overlapping new actions, establishes recovery before dispatch when required, and requires an observation policy. All remain Atlas proposals where they prescribe product behavior; a standard does not select the project's schema or service contract.

The original [P0 evidence](../../references/p0-evidence.json) remains an unchanged historical snapshot of the initial drafts. Its chapter/ledger hashes are not current hashes after this review. Current 0.2-draft generation identities are recorded here. [Source credits and additional inspected sections](../../references/p0-research.md#revision-02-review-extension) retain authors, dates, document status, terms and exact-pin inspection limits.

## Independent document review

The frozen [protocol](protocol.md) retains C01–C12 and adds T01–T10 traces. **Document-covered** means concrete internally consistent written behavior. **Partial** means a gap or evidence limitation. **Open contract** is reported separately: a correctly identified external dependency is neither a working capability nor automatically a library defect.

| Criterion | Consumer first pass → reviewed | Storefront first pass → reviewed | Service first pass → reviewed |
| --- | --- | --- | --- |
| C01 Brief fidelity | Document-covered → same | Document-covered → same | Document-covered → same |
| C02 Theme selection | Document-covered → same | Document-covered → same | Document-covered → same |
| C03 Self-contained visual rules | Document-covered → same | Document-covered → same | Document-covered → same |
| C04 State ownership | Partial → Document-covered: durable discard | Document-covered → same | Document-covered → same; memory-only baseline explicit |
| C05 Recovery | Partial → Document-covered | Partial → Document-covered: delayed evidence | Partial → Document-covered: G2 dispatch gate |
| C06 End-to-end tasks | Partial → Document-covered: create/update continuation | Partial → Document-covered: repeat Add and hosted return | Document-covered → same |
| C07 Adaptive/keyboard rules | Partial → Document-covered: removal/Undo focus | Document-covered → same | Document-covered → same |
| C08 Appearance/motion | Document-covered → same | Document-covered → same | Document-covered → same |
| C09 Content/assets | Document-covered → same; real inputs gated | Document-covered → same; real inputs gated | Document-covered → same; translations/fonts gated |
| C10 Provenance | Document-covered; direct Atlas record links added | Document-covered; direct Atlas record links added | Document-covered; direct Atlas record links added |
| C11 Evidence honesty | Document-covered → same | Document-covered → same | Document-covered → same |
| C12 Selective reading/audit | Partial → Partial: reconstructed concurrent group | Partial → Partial: reconstructed concurrent group | Partial → Partial: reconstructed group and rereads |

C04–C06 being document-covered does not close local schema/browser or real service gates. Per-trial owner/input tables remain authoritative about what cannot yet be enabled.

| Targeted trace | Consumer first pass → reviewed | Storefront first pass → reviewed | Service first pass → reviewed |
| --- | --- | --- | --- |
| T01 Candidate save, transaction failure, newer edit | Partial → Document-covered: create target identity | Document-covered → same | Document-covered → same: immutable remote candidate, no local-save claim |
| T02 Unknown/unreadable authority | Document-covered → same | Document-covered → same | Not applicable: no durable draft authority selected |
| T03 Conflicts and stale replacement writers | Document-covered → same; exact schema gated | Partial → Document-covered: resulting quantity for repeated Add | Not applicable: independent memory drafts; remote duplication handled under T08 |
| T04 Export/import envelope symmetry | Not applicable: no general backup facility proposed | Not applicable: import/export excluded | Not applicable: memory-only baseline |
| T05 Validation, pending, dirty exit/focus | Partial → Document-covered: durable discard/focus | Document-covered → same | Document-covered → same |
| T06 History, review, branch/language | Document-covered → same; no language switch added | Document-covered → same; variant dependencies explicit | Document-covered → same: review Change, branch invalidation, atomic language packs |
| T07 Lost reply, reload and recovery boundary | Not applicable: no remote effect | Partial → Document-covered: hosted re-entry | Partial → Document-covered: explicit G2 prerequisite |
| T08 Duplicate/changed intent/old reply | Not applicable: no remote action; local repeats checked under T01/T03 | Partial → Document-covered: delayed attempt and return | Partial → Document-covered: reduced-capability choice cannot silently preserve overlap promise |
| T09 Stale/partial outcomes and observation | Not applicable: no remote operation | Partial → Document-covered: ordering/freshness; remote cancellation unsupported | Document-covered → same: timed delayed feedback, no automatic retry/polling |
| T10 Concrete decisions versus external gates | Document-covered → same | Partial → Document-covered: repeat Add/return decisions | Partial → Document-covered: recovery choice included before enablement |

## Comparison with the earlier trials

Consumer/storefront briefs are byte-identical to the [prior assessment](../coverage-evaluation/README.md), and the selected themes remain Layered/Gallery. The new first drafts already specify candidate-bound A/B saves, native/custom validation ownership, guarded unreadable storage, transactional generation checks and named conflicts. The storefront first draft replaces the earlier localStorage revision/notification proposal with an explicit IndexedDB compare/write boundary and gates handoff on recoverable identity before dispatch. These are useful document-level differences, with implementation evidence still absent.

Some earlier defects are avoided by a smaller proposed feature set: the new consumer does not offer general export/import, and the new storefront does not offer Undo. That does **not** demonstrate that recovery envelope symmetry or Undo is now implemented correctly. Both were optional project proposals; the new consumer still offers bounded plan-removal Undo, reviewed separately. The prior consumer's date correction is not a new gain either: this trial does not expose an arbitrary completion-date editor.

Earlier root-corrected documents already had unreadable-cart quarantine, explicit unknown-checkout recovery gates, corrected consumer focus/dirty-exit rules and recovery-capacity gating. Those cannot be counted as newly discovered improvements. The new first drafts still required seven corrections, including durable Discard and service recovery enablement—evidence that supplying a chapter does not automatically settle every project contract.

This is a qualitative rehearsal. The library contains prior-trial counterexamples, fresh agents and added inputs vary together, and bilingual service has no prior generated baseline. These results do not establish causal accuracy gains, held-out generalization, statistical reproducibility, usability or production correctness.

## Reading scope and cost limits

| Trial | Earlier source scope | New repository read operations / unique files | Logged source bytes | P0 knowledge/index bytes |
| --- | --- | --- | --- | --- |
| Consumer | 10 files / 67,137 bytes | 16 / 14 | 115,164 | 38,902 |
| Storefront | 10 files / 67,072 bytes | 20 / 16 | 165,891 | 57,224 |
| Bilingual service | No generated baseline | 22 / 16 | 186,792 | 57,224 |

Brief reads are separate: 2,174 / 2,428 / 2,540 bytes respectively. Logged bytes cover helper-emitted full files/excerpts, including repeats, table-of-contents material and the failed tiny excerpts. They can include content truncated by tool presentation before a later reread. They are not actual model tokens, content-comprehension measures, latency or billing. Do not interpret the totals as a measured cost saving. All three loaded one detailed theme package; consumer skipped remote/agent chapters, and no trial loaded Agent Experience or every theme's details.

Instrumentation limitations: initial parallel candidate reads raced one per-trial log file. Returned metadata was reconstructed transparently, preserving original duplicate orders and marking exact within-group read order unavailable. A faulty ledger selector returned only hash-character lines before repair; those emitted bytes remain logged, then valid source-card reads are recorded separately. The private helper was corrected to lock per-trial writes and bound source-card extraction. It is evaluation machinery, not a shipped tool or skill. Reconstructed records/hashes can be checked, but an unbroken contemporaneous first-read sequence cannot be claimed; C12 stays Partial.

The initial temporary raw review snapshot also became unavailable. Pre-review identities for the four changed chapter/ledger files were reconstructed from the unchanged historical P0 evidence; other files were captured after chapter review and before generation. This limitation is recorded in evidence. Prior trials and protected skill/template/theme/runtime files remain unchanged.

## Remaining gates and next recommendation

- **Consumer:** actual lesson IDs/content, final schema/capacity/growth and retired-draft retention, supported browsers, routing/dialog fallback, exact font files and recovery-reset capability. Browser loss limits remain explicit; there is no independent backup.
- **Storefront:** actual catalog/variant limits, commercial money/stock/quote authority, hosted return/status/duplicate/reconciliation contracts, local schema/browser evidence, real product media rights and font package. Checkout is gated; no payment or order exists as evidence.
- **Bilingual service:** approved fields, explicit draft/action recovery capability, complete versioned English/Vietnamese packs, selected fonts and a real service acceptance/lookup/duplicate contract. Submission remains unavailable pending these inputs; memory drafts do not promise reload recovery.

Keep the nine themes and the reviewed P0 knowledge drafts. Before implementing skills, review these results and the proposed reading scope. A later skill change should be a small conditional route in the existing preparation workflow, plus an opt-in project-design review if authorized. It should require concrete operation identity, discard scope and capability enablement checks, rather than another mandatory full-library read. This experiment explicitly supplied the knowledge route; automatic discovery by the unchanged skill was not tested.

No skills are implemented here. Browser/storage/interruption/keyboard/assistive-technology checks and real service validation remain future work. The report and specifications are saved locally for review; no commit, push, merge or deployment is part of this pass.
