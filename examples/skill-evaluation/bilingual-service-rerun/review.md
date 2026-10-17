# Studio Request — document review

Reviewed 2026-10-17 using the requested `review-frontend-design` skill. The supplied brief governs this review. This is a review of proposed decisions, not an implemented interface or a successful service run. No input files were changed.

## Prioritized findings

### P2 — Qualify language-load completion by the latest requested language

**Location:** [first-draft.md — Language delivery and switching](first-draft.md#language-delivery-and-switching), especially “If a selected pack is loading, keep the current interface” and “A complete already-loaded pack switches atomically.”

**Trigger and task consequence:** With English displayed, select Vietnamese while its pack is still loading, then select English before that load finishes. The document does not say whether the late Vietnamese completion is still allowed to change the interface, selection, document language or completion announcement. Likewise, an older failure can display a retry/error after the visitor has selected another language. An implementer can follow the current text and still let an obsolete request override the visitor's latest decision during editing.

**Basis and counterevidence:** The brief requires language changes while editing. The draft already preserves answers, errors by stable identifiers, focus and return context; it requires complete packs and atomic switching. Those rules protect the content of one switch, but do not identify which overlapping switch remains current. This is an omitted local transition rule, not a claim that a loader has failed in practice.

**Bounded correction:** Distinguish the committed interface language from the latest requested language. Give each requested switch a current request identity or generation. Only the latest still-current request may commit a pack, change `lang`/title/selection, replace pending/error status or announce completion. Returning to the committed language retires pending switches. Older completions may populate a cache but must not update the interface or produce stale feedback. Keep the draft and editing context untouched. Add the sequence above, plus a stale failure, to future implementation checks.

**Priority reason:** A recoverable interaction error can replace a visitor's explicit language choice and make validation or submission-status copy harder to understand. It can be closed entirely within the proposed frontend contract; it needs no invented service behavior.

### P2 — Embed the retained focus specification in the self-contained handoff

**Location:** [first-draft.md — Task structure and theme rationale](first-draft.md#task-structure-and-theme-rationale), “Retain … source focus dimensions”; [Typography, layout, and appearance](first-draft.md#typography-layout-and-appearance), which embeds other geometry but no focus dimensions or forced-colors rule.

**Trigger and task consequence:** An implementer builds the keyboard flow from this handoff, whose introduction says Atlas need not be reopened. The document names retained focus dimensions without giving their width, offset, color or forced-colors behavior. The retained rule cannot be reproduced from the project document, leaving keyboard-location visibility and clipping behavior unresolved across controls and selected service surfaces.

**Basis and counterevidence:** The brief requires keyboard support and embedding the selected theme's actual rules/tokens. The draft specifies logical focus destinations, a contrast target and future forced-colors testing; those do not supply the missing indicator contract. The selectively inspected [Botanical rule — Appearance and accessibility](../../../themes/botanical/design.md#appearance-and-accessibility) is concrete: a **3px ink outline with a 5px offset**, using **`Highlight` in forced colors**, with clipping prevention and adjacent-surface verification. This is a handoff completeness finding, not an assertion of a rendered accessibility failure or a requirement that every project use these dimensions.

**Bounded correction:** Embed those retained dimensions, the existing light/dark Ink tokens as the normal outline colors, and the forced-colors rule in the handoff. Apply the focus rule to the form controls, links, language/appearance selectors and guarded unavailable actions; ensure the indicator is not clipped. Keep rendered contrast, keyboard and forced-colors checks explicitly future work.

**Priority reason:** The gap affects a required input mode and breaks the document's self-contained implementation promise, but no implementation evidence establishes an actual blocked task.

## Open inputs and contract gates

The following are already identified as unavailable capabilities or delivery inputs. Their absence is not evidence that the draft has implemented them incorrectly.

| Owner | Required input or evidence | Consequence until supplied |
| --- | --- | --- |
| Studio product owner | Approved service descriptions, field set/bounds, privacy/retention notice and exact meaning of accepted receipt | Keep field constraints labeled proposals; do not treat the request as a booking or place allocation. |
| Bilingual content owner | Complete, versioned and fluently reviewed English/Vietnamese packs, including errors, statuses and accessible names | No automatic free-text translation or mixed-language-key fallback; bilingual release gate remains open. |
| Engineering and actual service owner | Tested payload, actor scope, action/attempt identity, duplicate protection under concurrency, authoritative acceptance/rejection and partial-effect meaning, lookup/access/consistency, observation cadence, retry limits and real reconciliation route | Keep Send unavailable. A local draft, elapsed timeout or local attempt record proves no remote outcome. |
| Engineering and actual service owner | Explicit observation ordering or revision semantics, and a policy for matching authoritative observations that contradict and cannot be ordered | Before enabling sending, make this concrete within the existing gate. Preserve confirmed evidence; surface an unresolved contradiction and seek authoritative reconciliation without enabling a repeat effect. The draft's “obey service ordering” is an external dependency, not evidence that ordering exists; its failed-lookup rule alone does not settle conflicting successful observations. |
| Engineering, service owner and privacy owner | Acknowledged minimal recovery identity before dispatch or verified independent discovery, lifetime/deletion rules and later operation-mapping failure behavior | Retain the existing dispatch/recovery gates. Durable draft save/resume remains absent; no reload recovery claim is validated. |
| Design/engineering and content owners | Actual licensed font package or confirmed fallback, Vietnamese glyph/wrapping checks, supported browser/device/AT matrix | Treat the proposed breakpoints, typography and accessibility targets as unvalidated implementation decisions. |

No supplied evidence verifies the draft's preparation history, candidate comparison, hashes, original reading log or separate requirement-to-heading evaluation. Those claims were not accepted as proof of completed validation, and the unavailable artifacts were not read.

## Meaningful checks and counterevidence

The documentary walkthrough covered consultation and workshop paths, empty/invalid fields, inactive group-size retention and payload exclusion, review-to-edit return, changed service introducing a required answer, Back/Forward/deep entry, leaving and loss of memory, language switching with errors and failed pack loading, and the unavailable/conditional submission lifecycle.

The draft already separates Continue from final dispatch; prevents hidden branch fields from blocking or being serialized; keeps the latest draft authoritative across history; specifies error-summary focus and correction; freezes an immutable candidate while its action is unresolved; distinguishes pre-dispatch failure, unknown outcome and authoritative receipt; and prevents a fresh key or elapsed time from authorizing an overlapping effect. These rules materially limit the findings above. No P0/P1 document contradiction was established within the baseline where sending is unavailable.

For state-transition review, the selected traces were remote effects outliving their screen, changed intent/re-entry, pre-dispatch recovery acknowledgement and late observations. Durable draft saves, queued persistent writers and agent proposals are absent, so no such capability was added merely to exercise a checklist. The frozen draft's gated service dependencies remain unknown rather than being reported as successful recovery.

## Coverage and limits

- **Supplied documents read in full:** repository `AGENTS.md`, actual review skill, the trial `brief.md`, and immutable `first-draft.md`.
- **Selective Atlas references read:** the review state-transition profile; knowledge index; Forms and navigation headings plus “Multi-step and branching forms” and “Pending actions and available controls”; Accessibility/responsive headings plus “Controls, meaning, and focus” and “Adaptation with real content”; Uncertain outcomes headings plus “Cancellation and stale evidence” and “Dispatch and changed intent”; Botanical design headings plus “Appearance and accessibility”; adaptation-record headings plus “Selected sources and changes” and “Scope of terms and retained notices.” These were read sequentially through the prescribed frozen reader under trial ID `review-service-rerun` with recorded purposes. The helper owns `read-events.jsonl`.
- **Document evidence only:** proposed information order, hierarchy, action terminology, typography, semantic colors, input semantics, branch/navigation rules, language transitions and conditional remote states were inspected. No source code, rendered page, endpoint, provider, storage implementation or actual language/font asset was supplied or inspected.
- **Appearance/input contexts considered as proposals:** phone-first single column, desktop, 320 CSS px, zoom/text resize, Light/Dark/System, reduced motion, forced colors, keyboard focus and long Vietnamese content. None was rendered or exercised.
- **Not performed:** browser interaction, keyboard execution, assistive-technology checks, real-device work, contrast recalculation, font/translation validation, real-service or storage fault injection, participant research, conformance assessment or production-readiness validation. No fabricated users, completion rates, numerical score or successful submissions support this review.

## Provenance

Findings and corrections here are original, task-specific Atlas recommendations. The draft's Botanical credit to **Tamir (Phi Vuong Tuong Tam)**, pinned portfolio commit `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`, and its unresolved source/Atlas publishing terms are preserved; a reference link supplies no copying permission. No implementation, artwork or font software was imported.

The selective review method retains the Atlas adaptation record's credits to **Ghaida Zahran** ([Intent, `3fc38dff381ce0e4dec8f52c97c3e37abd95e10e`](https://github.com/ghaida/intent/tree/3fc38dff381ce0e4dec8f52c97c3e37abd95e10e), CC0), **Jakub Krehel** ([skills, `4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63`](https://github.com/jakubkrehel/skills/tree/4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63), copyright 2026, MIT), and **Julien Thibeaut / ibelick** ([ui-skills, `f18d13077d6e3841821ea0a36526c0fd44a570b5`](https://github.com/ibelick/ui-skills/tree/f18d13077d6e3841821ea0a36526c0fd44a570b5), copyright 2026, MIT). This report does not reproduce upstream skill implementations, templates or substantial covered prose. Their exact notices remain in Atlas's referenced license files. No upstream source or linked standard was opened externally or treated as an endorsement.
