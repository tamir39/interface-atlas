---
id: button-feedback
name: Button feedback
revision: 0.1.0-draft
status: draft
entry_creator: Tamir (Phi Vuong Tuong Tam)
summary: Make activation, keyboard focus, selection and action outcomes distinguishable.
source_mode: original-with-credited-references
reviewed_on: 2026-11-04
decisions: [action-role, feedback-states, focus-recovery, motion-purpose]
fit_types: [local-actions, form-controls, preference-toggles]
dependencies: []
---

# Button feedback

Use this pattern when a bounded action needs a clearer control, activation response or outcome. It also helps distinguish an ordinary action from a persistent toggle. An established project button with resolved states needs no new pattern survey.

**Atlas entry:** original rules and reference implementation by Tamir (Phi Vuong Tuong Tam), with Codex AI assistance. [Sources](sources.md) credit selected Uiverse creators and W3C guidance; no external component code, artwork, font or prose is imported.

## Fit and limits

| Decision | Apply here |
| --- | --- |
| Recognizing and activating an action | Match the control's semantics, label, visible boundary and keyboard behavior to its actual operation. |
| A persistent on/off preference | Use an explicit toggle contract; a pressed appearance alone cannot establish state. |
| A service request or saved record | Use the real acknowledgement and recovery contract. A press effect supplies no evidence of remote completion. |
| A chosen theme or style | Retain the project's shape, type, color roles and density; explain a deliberate override. |

The [live preview](https://tamir39.github.io/interface-atlas/patterns/button-feedback/preview/) ([local files](preview/index.html)) is a small local fixture for transient feedback, an actual local result and a persistent selection. It is not a reusable application service or a complete component library. Its [notes](preview/README.md) and [validation record](validation.md) identify exact behavior and performed checks.

## Load selectively

Read [pattern.md](pattern.md) for the unresolved behavior and relevant [credits](sources.md) when using the referenced contribution. The [small catalog](../../catalog/patterns.json) is a discovery aid. Theme, style and motion rules are needed only when that choice is implicated.

Resolve the accepted values and states into existing project code or its design handoff. A small implementation does not require a new design.md. This entry does not require loading the other patterns, installing a UI kit or changing the stack.
