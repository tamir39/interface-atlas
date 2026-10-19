# Pocket Practice independent design review

Reviewed 2026-10-20. Target: frozen `@first-draft` (`@case/consumer-app/first-draft.md`), SHA-256 `59caa756283b720fef853947db79a85d05dc016679b8905668a99e54330a6654`, 22,524 bytes. This is a document review against `examples/p0-evaluation/consumer-app/brief.md`; proposed behaviors are not observed implementation results. The draft was not changed.

## Actionable findings

### 1. P2 — Newer note B has no defined commit path after Finish A succeeds

**Severity and reason:** Moderate task-flow defect in a required completion task. The document deliberately permits continued editing during Finish, but its idempotency rule can leave the preserved newer note unable to become acknowledged work.

**Exact location:** `@first-draft`, **State ownership and persistence**, paragraph beginning “Bind every Save to immutable candidate A”; and **Essential task transitions**, **Practice**, especially “Repeated Finish for the same practice ID returns the existing completion” and “If a newer note edit exists, remain in the editor”.

**Trigger:** Start practice P, submit note A, edit it into B while A is pending, then let A commit. Follow the documented rule to keep B dirty in the editor, then choose Finish practice again or reload and resume B.

**Consequence:** The second Finish still has practice ID P and therefore returns existing completion A. The draft does not specify an update operation, a new identity, or another action that can acknowledge B. Implementers must invent whether B updates A, becomes another practice, or stays indefinitely unsaved; a learner can preserve text yet still fail to finish the intended note. This is a missing behavior contract, not evidence that a running app loses data.

**Counterevidence checked:** The immutable A/draft-version rule correctly protects B from being cleared; exact-version draft removal and the saved-candidate link also protect and expose A. The same-ID idempotency rule correctly prevents duplicate retries. These protections settle retention and duplicate prevention, but do not settle B's next successful action. The final engineering transaction gate does not name this continuation decision.

**Bounded correction:** Choose and document one continuation. For example, after A succeeds, bind B to an explicit edit of the existing completion P, with an acknowledged base revision and an appropriate Save label; retain same-ID Finish as a retry of immutable A. Alternatively, explicitly offer to start a separate practice under a fresh ID and explain the additional completion. Define reload/resume and failure behavior for the chosen continuation, without silently treating B as saved or creating another practice.

**Evidence:** The two quoted target passages conflict at the second Finish transition. The Atlas review profile's save-overlap trace and `knowledge/state-and-recovery.md`, **Save snapshots and completion**, require acknowledgement of A to leave B dirty; the review profile also asks whether a create can become a duplicate rather than a defined update. The brief requires finishing with a short note and prohibits silent edit loss or false persistence claims.

### 2. P2 — Discard lacks a retirement boundary for recovery drafts and delayed writers

**Severity and reason:** Moderate interruption/recovery defect. Discard is an offered action, but the document does not define when the discarded draft ceases to be eligible for saving or recovery within the current store generation.

**Exact location:** `@first-draft`, **State ownership and persistence**, paragraphs beginning “Main record changes use explicit Save” and “Bind every Save”; **Errors, interruption and recovery**, paragraph beginning “Dialogs have a name”. These introduce autosave after 600ms, **Discard draft**, **Discard changes**, and route-departure **Discard**, while the explicit retirement guarantee is attached to a fresh generation during **Reset browser data**.

**Trigger:** Change a goal or practice note so its recovery autosave is scheduled or queued. Choose Discard changes, Discard draft, or the route-departure Discard action before that writer has settled. Later the callback dispatches, or the learner reloads after a previous recovery draft remains.

**Consequence:** The document supplies no transaction or identity rule that distinguishes this deliberately discarded draft from recoverable unfinished work. A conforming implementation could close the editor but retain its saved recovery version, or allow a delayed writer to recreate it. The learner can then be offered discarded text on return, undermining the meaning of Discard. Failure of a discard/removal also has no specified visible outcome.

**Counterevidence checked:** Mutation serialization, generation/revision comparisons, exact submitted-version removal, stale-revision rejection and fresh-generation reset are strong safeguards. Serialization orders dispatched work, but does not define treatment of a delayed callback dispatched after Discard. A store-generation check alone cannot identify a retired draft in the same generation. Revision rejection can protect authority, but the conflict path preserves a draft for review; it does not define whether deliberately discarded work is retired. The guarantee that forced closure preserves acknowledged drafts concerns interruption, not an explicit discard decision.

**Bounded correction:** Define a shared discard transition: retire the relevant draft identity/version, invalidate its scheduled callbacks, remove its persisted recovery entry at a checked authority boundary, and make all later writers reject that retired identity. An alternative coherent exclusion design is acceptable if it covers every delayed writer. Define what the UI says when retirement/removal fails and whether the draft remains available. Apply the rule to dialog, full-page, recovery-list and route-departure Discard paths; do not reset unrelated personal data.

**Evidence:** The target offers the actions without their durable retirement behavior. `skills/review-frontend-design/references/state-transitions.md` explicitly asks what rejects obsolete work after discard/removal; `knowledge/state-and-recovery.md`, **Replacement and stale writers**, requires participation by every writer; **Modal editing and dirty exit** in `knowledge/forms-and-navigation.md` distinguishes closing from persistence/cancellation success. This is a missing local design decision, not an assertion about actual IndexedDB behavior.

## Open owner contracts, separate from defects

- The product/content owner must supply stable catalog IDs and English/Vietnamese lesson text, and approve week, goal, note and capacity semantics. Catalog-change behavior is explicitly gated; historical snapshots are already specified. Missing supplied content is not an implementation defect in this trial.
- Engineering must select the stack/browser baseline, finalize the proposed IndexedDB schema and conflict-review mechanics, and establish actual transaction, quota, upgrade and recovery behavior. The draft marks these as proposals or verification gates. The two findings above require an explicit user-visible lifecycle decision before that implementation work can be assessed.
- Optional font package selection, Vietnamese glyph coverage and introduced asset rights remain gates. No asset or remote-service capability is needed to close either finding. No account, backend, synchronization, AI, language toggle or general import/export facility should be added to resolve them.

## Coverage and limits

| Path/context | Document checks performed | Result at this evidence level |
| --- | --- | --- |
| Browse/filter/bookmark | Combined filters; accent-preserving matching; empty results/bookmarks; URL restoration; toggle pending/failure | Explicit proposed contract; no additional actionable contradiction found |
| Weekly plan | Dated week navigation; add/duplicate/move/remove; bounded Undo; actual completion linkage | Explicit proposed contract; not exercised |
| Finish and revisit | Note validation; immutable save candidate; repeated Finish; newer editing; true history; record deletion/failure | Finding 1; history is correctly distinguished from plans |
| Goal editing and interruption | Explicit Save/Cancel; dirty dialog and route exit; drafts; recovery; reload | Finding 2; ordinary save failure preserves work |
| Persistence | Absent versus unreadable data; loading; denied/full/malformed/newer storage; temporary mode; conflict review; reset/generation | Detailed proposals and gates; no persistence guarantee verified |
| Visual/input contract | Light/Dark/System; live system response; color roles and non-color state; semantic English/Vietnamese text; native controls; focus/error/status; phone/desktop/320px/zoom; reduced motion | Assessed written intent only; no rendered or accessibility conformance result |

Material read through the sequential logged helper: Atlas `AGENTS.md`; the named review skill and its state-transition profile; the supplied brief; the frozen draft; `knowledge/README.md`; selected **Replacement and stale writers** and **Save snapshots and completion** sections; **Modal editing and dirty exit**; **Controls, meaning, and focus** and **Adaptation with real content**; and **Selected sources and changes** in the adaptation record. Heading-only routing reads and the target identity read are also logged. No returned content was truncated.

No implementation/source, browser, keyboard, assistive-technology, font, binary asset, real device, real storage/service or user evidence was supplied or tested. Palette arithmetic is inherited from the target, not recomputed here. Theme identity/provenance was read in the target; no theme-source contradiction required opening its package. Author evaluation, other case outputs, research/lesson history, live web and preparation were not read or run.

Future runtime work should exercise the two reported sequences, including reload/re-entry and failed discard retirement, then verify the existing required task, appearance, input, reflow and storage-failure contracts. These are checks still to perform, not passing results or substitute behavior specifications.

Method provenance: original Atlas review/state-transition questions, with the selected task/journey method credited to Ghaida Zahran (CC0), evidence-and-bounded-correction method to Julien Thibeaut (MIT), and task-scoped interface/accessibility lenses to Jakub Krehel (MIT), as recorded in `references/skill-adaptations.md`. This report copies no upstream implementation or substantial method prose and preserves the target's credits without modifying it.
