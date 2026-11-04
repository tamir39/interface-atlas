# Button feedback recipe

Revision: **0.1.0-draft**. Original Atlas synthesis. Use for an unresolved action/control decision; read the [source record](sources.md) for provenance and the [preview notes](preview/README.md) for the bounded fixture.

## Start from the operation

State what activation does, who owns the result and what the user can observe. A local display change can be confirmed immediately after that state changes. A remote request may need pending, failure or uncertain-outcome behavior based on the real service. Do not add an asynchronous phase to a synchronous action merely to make its button animate.

Use a native button for an action and a link for navigation. Keep the visible label predictive: it should explain the useful operation in its context. An icon can reinforce the label. An icon-only control needs an appropriate accessible name and a recognizable purpose; decorative icons should not produce a second name.

A toggle has a persistent two-state meaning. If aria-pressed expresses that meaning, retain a stable label and update the state together with the actual selected result. A transient active/press style returns when activation ends; it must not imply that a preference was applied or that a record was saved. Choose a checkbox, radio or another existing project control when that semantic model fits better.

## Separate the relevant states

| State | Observable contract |
| --- | --- |
| Resting | The action and its availability can be recognized before pointing at it. |
| Hover | Optional pointer feedback supports discovery without revealing the only label or action. |
| Keyboard focus | A visible focus indicator identifies the control independently of hover and selection. |
| Active | Brief feedback may acknowledge physical activation; it carries no persistence claim. |
| Selected | The actual persistent value, visible treatment and programmatic state agree. |
| Unavailable | Explain a useful prerequisite or capability limit nearby. Hiding the control is a separate product decision. |
| Result or failure | Name the observed outcome and next useful action. Keep an unknown outcome unknown. |

Only use the states that apply. A purely local control does not acquire a network, account or save flow from this table.

## Preserve the project's identity

Map the role through the project's existing button/component owner and semantic tokens. Retain established font, density, border, corner and emphasis choices. Record any accepted exception. The behavior recipe can accompany multiple themes; it is not evidence that every surface treatment works on every theme.

A flat treatment can use a filled face and clear boundary. An outlined or shaded treatment can retain its chosen material where permitted, while label, focus, availability and selection remain readable when the effect is absent. In glass-like surfaces, inspect the actual composited face or choose an opaque control face. Keep selected and focus indications distinguishable.

Resolve foreground/background pairs, boundary and focus values, target size, wrapping and long-label behavior against the affected context. Do not adopt a source snippet's hard-coded palette, global selector or font dependency solely because its isolated preview looks polished.

## Motion and input

Motion is optional. If chosen, give it a purpose and specify the affected properties, timing and interruption behavior in the project contract. Avoid transitioning unrelated properties. High-frequency controls need restrained feedback. Essential labels, state and outcomes must remain available with immediate changes under the chosen reduced-motion behavior.

Verify activation with the appropriate keyboard behavior as well as a pointer. Native buttons supply familiar activation semantics; custom wrappers should not intercept or duplicate them. Keep focus where continued work makes sense. If an operation removes or disables the focused control, give focus an explicit useful destination and communicate the result. Do not move focus for every successful local change by default.

## Handoff and verification

A bounded handoff names the operation, control owner, actual state owner, selected/unavailable rules, result message, focus destination where needed, visual values and any chosen motion. Consult [state/recovery](../../knowledge/state-and-recovery.md) or [uncertain outcomes](../../knowledge/uncertain-outcomes.md) only when those decisions remain unresolved and apply to the task.

Exercise the real action, relevant alternate states, keyboard focus and activation, a long label, narrow layout, appearance and selected preference fallbacks. An isolated hover recording cannot verify the operation. The [original preview](preview/index.html) adds three fixed local items and exposes a stable-name emphasis toggle. Reaching the item limit disables Add and moves focus to Reset; reset clears both local choices and returns focus to Add. Feedback is immediate, without press movement or transitions. Its 20px panels, 10px controls and 3px focus outline/offset are specimen choices, not universal values. [validation.md](validation.md) records actual coverage rather than complete theme or accessibility conformance.
