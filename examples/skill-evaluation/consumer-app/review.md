# Pocket Practice — first-draft document review

Reviewed 2026-10-17 using the explicitly requested `review-frontend-design` skill. This is a review of proposed behavior, not an observation of a running app. Layered remains the selected theme.

## Actionable finding

### Medium — retire a discarded draft before an older autosave can recreate it

**Location:** `examples/skill-evaluation/consumer-app/first-draft.md`, **Local state and acknowledgement contract** (separate editor/session draft records, 500ms draft autosave, general generation/base-revision checks), **End-to-end editing, practice and recovery** (the paragraph beginning “Editors use a named native dialog”), and **Startup** (generation replacement).

**Trigger and consequence:** Edit an existing goal, leave a draft write queued, then confirm **Discard changes**. The specified discard deletes the durable draft and can claim it is gone. If the queued writer subsequently runs, its store generation and the saved goal's revision can still match: discard has changed neither. The document does not say that discard retires the editor/draft identity, excludes subsequent writers, or drains all pending draft work before deletion. That permits an implementation consistent with the stated target-record checks to recreate the discarded text and offer it as a resumable draft after reload. A person who deliberately discarded work would be asked to resume it again.

**Requirement and evidence:** This is a completeness gap in the project's own discard/recovery proposal, rather than a theme preference or a claimed standards failure. The draft promises that confirmed discard removes the durable draft before claiming it is gone. Atlas `knowledge/state-and-recovery.md`, **Replacement and stale writers**, asks every obsolete writer to participate in an enforceable retirement boundary; deletion acknowledgement alone does not provide it.

**Counterevidence considered:** Draft writes are serialized/coalesced, each acknowledgement is sequence-specific, all mutations check relevant base revision, and reset transactionally changes a non-reused generation. Those rules address ordering and reset. They do not explicitly define one queue/exclusion boundary shared by discard and all draft writers, nor a draft-identity revision/tombstone that changes on discard. If “relevant base revision” is intended to include that retired draft authority, state it explicitly. Do not assume the reset rule automatically applies to an ordinary discard.

**Bounded correction:** Define an enforceable retirement rule for each discarded editor/session draft, checked inside every draft write transaction, or specify verified writer exclusion/draining around discard. Acknowledgement should occur only after that boundary succeeds; on failure preserve the draft and the retry path. Apply the same defined boundary when a practice draft is finalized so a queued autosave cannot create a false unfinished session. The existing unique practice-session completion rule should remain the duplicate-completion protection. No schema or source change is applied by this review.

## Relevant open inputs

- Engineering must settle draft/record identity and revision semantics, atomic storage scope, browser baseline, shared capacity budget and migration policy. The finding above needs an explicit local design decision; implementation tests alone would not supply that contract.
- Product/content owners still owe stable lesson IDs/content structure and rights, goal/note/date limits, and any future history-correction policy. These are already identified dependencies; they are not new defects.
- Actual storage, browser, keyboard, assistive-technology, Vietnamese rendering and user evidence are required before release claims. Storage eviction/device loss remains a stated retention limit.

## Coverage and limits

**Product evidence read:** only this project's `brief.md` and `first-draft.md`. Governing reads were `AGENTS.md`, the actual review skill and its **Review state-transition boundaries** profile; the knowledge index; **Save snapshots and completion** and **Replacement and stale writers**; **Modal editing and dirty exit**; focused accessibility sections **Controls, meaning, and focus**, **Adaptation with real content**, and **Method credits**; and the adaptation record's **Selected sources and changes**. Shared references retained in the grouped review were reused. Every repository content read used the supplied sequential `trial-read-v2.mjs` wrapper with trial ID `review-known-v2`; it owns `read-events.jsonl`.

**Document paths inspected:** catalog/filter and bookmark states; weekly-plan/goal validation and conflict review; practice start, finish, duplicate prevention and history truth; draft acknowledgement, reload, dirty exit and discard; blocked/full/malformed/newer storage, temporary mode and reset/stale-generation recovery; navigation/focus and appearance persistence. The design distinguishes actual completions from plans and retains failed edits rather than claiming a failed write succeeded. No additional actionable contradiction was established in those checked paths.

**Appearance/input coverage:** checked the written Light/Dark/System, reduced-motion, phone/desktop/reflow, keyboard/dialog, forced-color and English/Vietnamese text contracts. No theme replacement is warranted by the supplied brief. Theme details/catalog were not reopened because no concrete inheritance contradiction arose. Inherited contrast numbers were not recalculated.

**Not performed:** source inspection, UI/browser execution, storage transactions, viewport rendering, keyboard or assistive-technology exercise, real services, font/media inspection, user research or usability/accessibility certification. Hypothetical traces above expose document ambiguity; they do not prove that a runtime defect exists. There is no numerical or runtime quality verdict.

**Method provenance:** this original report applies Atlas's bounded review/state questions. Atlas credits Ghaida Zahran's Journey/Evaluate (CC0), Jakub Krehel's selected better-* methods (MIT), and Julien Thibeaut's selected ui-skills methods (MIT), at the revisions retained in `references/skill-adaptations.md`. Existing project/theme credits remain intact; no upstream workflow, code, assets or substantial source prose is redistributed here.
