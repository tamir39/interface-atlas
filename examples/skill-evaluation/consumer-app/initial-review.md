# Pocket Practice — explicit design-document review

Reviewed 2026-10-17 using the frozen supplied brief and first draft. This is a review of proposed decisions, not observed product behavior.

## Findings

No actionable document finding was established within the supplied scope. The draft preserves Layered and gives a consistent proposed path for every required task. Its unresolved product and engineering inputs are explicitly identified rather than represented as working capabilities.

The material checks supporting this result were:

- **Browse, filter and bookmark:** `Tasks, information and content` distinguishes empty results, unavailable catalog and empty personal lists; gives independent lesson links/bookmark controls; and marks Vietnamese lesson passages without inventing a language toggle. `End-to-end editing, practice and recovery` retains the last acknowledged bookmark until commit and offers recovery without a false saved marker.
- **Plan, goal, practice and actual history:** `Local state and acknowledgement contract` and `End-to-end editing, practice and recovery` distinguish draft autosave from explicit application. A stable practice-session identity, atomic completion insertion/draft removal and duplicate recognition connect Finish to actual History. Planned/opened/bookmarked work cannot become a fabricated completion. Historical snapshots remain meaningful when catalog content changes.
- **Storage and interruption:** the same sections distinguish acknowledged snapshots from newer edits; require revision/generation checks inside the write transaction; preserve drafts on failed writes; and recheck after conflict review. Startup differentiates absent, blocked, malformed and unsupported data. Temporary mode, diagnostic copies and confirmed replacement have bounded promises; stale writers cannot silently restore a discarded generation. The full/capacity path retains the draft and offers a text copy.
- **Interaction and presentation:** `Type, geometry and adaptation` and `Appearance, accessibility and evidence gates` specify native semantics, named dialog/dirty-exit behavior, logical focus, wrapping/reflow, 44px targets, Light/Dark/System and immediate reduced-motion behavior. The draft calls these proposed contracts and future verification work. These statements do not establish actual keyboard, screen-reader or visual performance.

Counterevidence was considered before treating missing implementation details as defects: `Requirements, assumptions and direction` explicitly labels navigation, markup, ownership, storage, save boundaries, conflicts, removal and recovery as project proposals. The brief permits that treatment. The final validation section gates the remaining storage, content and model decisions. No theme replacement or implementation change is recommended by this review.

## Open inputs and required evidence

- **Product/content owner:** finalize week/date policy, proposed goal/note bounds, historical correction behavior, catalog IDs/content structure and content rights. The current wording already identifies these as proposals or gates.
- **Engineering/storage owner:** finalize schema/serialization and Unicode units, browser baseline, capacity budget and migrations; demonstrate transaction abort, two-tab review conflicts, stale-generation rejection, reset failure and reload recovery. No named owners or implementation evidence were supplied.
- **Design/content and font delivery:** verify actual English/Vietnamese font rendering, long content and the proposed adaptive thresholds. Any later font package needs its own notices and package record.

## Coverage and limits

Product evidence read: `examples/skill-evaluation/consumer-app/brief.md` and `first-draft.md`, in full. The review traced Lessons/filter/detail/bookmark, weekly plan/goal, unfinished practice/Finish/History, clean and dirty exit, save failure/retry, startup classification and reset, plus the three appearance contracts. It checked these at the document level for phone/desktop, zoom, keyboard, Vietnamese content and reduced motion requirements.

Governing material read through the supplied logging helper: `AGENTS.md`, the actual `review-frontend-design` skill, the knowledge index, and selected accessibility/responsive, state/recovery and forms/navigation sections. Related shared guidance legitimately retained during the grouped review was reused. No theme chapter was reopened because no concrete inheritance contradiction needed resolving; inherited token calculations and source/license assertions were not independently verified.

No UI/source, rendered page, browser, keyboard execution, assistive technology, storage implementation, real service or user-study evidence was supplied or exercised. Inherited contrast numbers are neither newly measured pairs nor conformance evidence. This result establishes no numerical design score, runtime quality verdict, accessibility certification or usability validation. Read events are recorded by `trial-read.mjs` in the adjacent `read-events.jsonl`; this review did not alter the design or source.
