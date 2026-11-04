---
id: loading-feedback
name: Loading feedback
revision: 0.1.0-draft
status: draft
entry_creator: Tamir (Phi Vuong Tuong Tam)
summary: Tie pending, success, empty and failure feedback to the actual state owner.
source_mode: original-with-credited-references
reviewed_on: 2026-11-04
decisions: [pending-state, retained-results, outcome-evidence, optional-motion]
fit_types: [asynchronous-results, refreshing-views, data-fetching]
dependencies: []
---

# Loading feedback

Use this pattern when a task can wait for an outcome and the interface needs to explain what is happening, what remains available and how to continue. An immediate local change may need no loading state. Existing resolved service and UI contracts remain the starting point.

**Atlas entry:** original recipe and state fixture by Tamir (Phi Vuong Tuong Tam), with Codex AI assistance. [Sources](sources.md) credit Uilora, Forge UI and W3C guidance. No upstream component source, illustration, font or prose is imported.

## Fit and limits

| Decision | Apply here |
| --- | --- |
| First results are pending | Choose readable status and an appropriate placeholder, if useful. |
| Existing results are refreshing | Decide whether to retain them and state their freshness clearly. |
| A result is empty or failed | Give the correct explanation and a useful next action. |
| A remote outcome is uncertain | Use the real service evidence; an animation cannot establish completion or cancellation. |

The [live preview](https://tamir39.github.io/interface-atlas/patterns/loading-feedback/preview/) ([local files](preview/index.html)) is an explicitly manual state simulator. It lets a reader inspect pending and chosen outcomes without sending a request. It is not a data-fetching implementation or a cancellation guarantee. [Preview notes](preview/README.md) define the fixture controls; [validation](validation.md) records performed checks.

## Load selectively

Read [pattern.md](pattern.md) for the selected loading decision and relevant [credits](sources.md) when using a referenced contribution. Use the [catalog](../../catalog/patterns.json) only for discovery. State/recovery and uncertain-outcome chapters are conditional on actual unresolved capability questions.

Resolve accepted states, semantic roles, values and any chosen animation into the project's own design handoff or implementation. No new design.md, library dependency, backend, shimmer or other pattern is compulsory.
