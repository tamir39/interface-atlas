# Agent-control draft: Harbor Desk desk trial

Status: **draft for review**, 2026-10-27. The [Agent Experience extension](../../knowledge/agent-experience.md) was exercised against a [fresh fictional venue-operations brief](brief.md). It tests document decisions about proposal inspection, correction applicability, attention, evidence and return. It implements no service or UI and changes no skill/global installation. Source creators and terms are in the [research ledger](../../references/agent-experience-research.md).

## Result and correction history

A fresh agent produced an interaction contract using the brief and selected Atlas guidance. The final corrected contract has 1050 words. The [final contract](interaction-contract.md) identifies fictional facts, original presentation/interaction proposals and unresolved external contracts. Theme selection and framework implementation were outside scope.

- The [initial complete contract](first-draft.md) is preserved byte-for-byte. The author made one [documented correction](generation-report.md): missing evidence of correction application stays unconfirmed, instead of becoming proof of non-application. The [submitted candidate](submitted-candidate.md) preserves that author-final version.
- Independent [review](review.md) found one P2 gap: a receipt-acknowledged correction with unresolved application lacked a clear overlapping-submission gate while ordering was unspecified. The final contract keeps the next correction editable but gates the overlapping effect unless supported ordering/supersession/overlap policy exists. The [targeted resolution check](finding-resolution.md) closed that finding at the document level. It was not a second full audit or runtime test.
- A separate chapter review made three [supported corrections](chapter-corrections.json): preserve P0 recovery alternatives, identify proposal-revision consent as inherited rather than new, and replace a temporary source path with a portable license path. Changed proposals still require review before execution.

The [initial chapter bytes](initial-chapter.json), generation [source snapshot](source-snapshot.json) and review [source snapshot](review-source-snapshot.json) preserve what each pass actually received. Generation used the initial chapter; review used its peer-corrected version. No generation pack, original output or read log was rewritten to imply a later source was used. The [correction record](corrections.json) identifies all three contract versions. Prose reports receive terminal-newline normalization only when archived; [formatting records](archive-formatting.json) retain original bytes when that changed a report.

## Reading and actual checks

Generation logged 9 manual source reads returning 111,438 helper bytes; independent review logged 5 reads returning 51,557 helper bytes. [Generation reads](read-events.jsonl) and [review reads](review-read-events.jsonl) distinguish source windows and hashes. The author reported some truncated aggregate output and targeted rereads. These figures are not tokens, complete context measurements or savings. No catalog/theme package, upstream skill bundle or historical trial was used as a case input.

The passes inspected proposed journeys, action/evidence boundaries, operator attention, focus rules, source identities and open gates. Word counts, file identity checks and source comparison support the archive's integrity, not the correctness of an implemented product. [Evidence](evidence.json) separates chapter and contract identities and performed versus unperformed work.

## Remaining gates

The fixture is not actual service documentation. Service/product owners still need to settle retention and expiry, permitted lookup, decline/draft-save outcomes, correction application/ordering, pacing and recovery authority before enabling dependent production promises. Cancellation evidence cannot be upgraded into a stopped-execution or rollback promise.

No browser, keyboard, screen-reader, persistence, multi-operator execution or real-service integration was exercised. Real participants have not tested whether the decision contents, corrections and return summary are understandable. The document finding being closed establishes none of those outcomes. These remain future checks for an accepted implementation brief.
