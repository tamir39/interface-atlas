# Layered — motion specification

Revision: **0.1.0-draft**. Reviewed: **2026-10-15**.

Layered uses quiet optional feedback while application state stays immediate. **Every timing, easing and behavioral rule here is an Atlas proposal**, not a Material motion token, Fluent animation sample or native-platform implementation. No animation library or external effect code is included.

## Optional feedback

| Property or event | Proposed treatment |
| --- | --- |
| Control color, background color and border color | **160ms**, `cubic-bezier(.2, 0, 0, 1)`, only with motion enabled and no OS reduced-motion request. |
| Focus outline | Immediate. |
| Current project, filters, task checks and computed counts | Immediate; selection semantics and text do not wait for a visual transition. |
| Modal opening, closing, validation and focus return | Immediate; no opacity, translation, scale or delayed interaction. |
| Layout, dimensions, scrolling, artwork and initial content | Static, with no animation. |

Use an explicit CSS property list, not `transition: all`. Do not animate errors into view, delay focus until a transition ends, or interpolate a task count as if it were an analytics achievement. State changes are represented by native controls, names, messages and current context regardless of feedback.

## Preferences and static behavior

- Motion-off removes the optional transition.
- OS reduced motion overrides the stored enabled choice.
- Live changes to the OS preference update eligibility without changing saved application data.
- All content starts visible. No reveal, entrance, opacity gate, ripple, hover scale, auto-scrolling or continuous loop is required.
- No animation API, frame renderer, animation-completion promise or document-visibility lifecycle is needed for this reference's finite CSS color feedback.

The user can still search, open a project, check tasks, edit, recover from an invalid field, cancel or revert with motion off. A dialog is never held open for a closing animation; native inertness and focus return follow actual dialog state.

## Focus and recovery

Opening a project focuses its heading. Editing focuses the title field. Failed Save focuses the linked error summary heading; the user's draft remains available. Save, Cancel and native Escape close the editor and restore the opener. Revert focuses the current detail heading because its initiating control becomes disabled. Empty-result Clear focuses Search because the empty-result action disappears.

These behaviors use immediate focus rather than animated scrolling. They are local workflow decisions, not proof that every assistive technology behaves identically. Read [preview notes](preview/README.md) for the implemented scope and [validation.md](validation.md) for observed browser evidence.

If a consuming project adds pane transitions, an animated overlay, notifications, video or another moving element, document its purpose, control, interruption behavior, reduced/static alternative, and measured cost separately. Layered's static reference does not validate that new motion or establish real-device performance.
