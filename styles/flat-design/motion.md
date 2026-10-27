# Flat Design — optional feedback

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

The flat treatment is complete without animation. This chapter is an original Atlas proposal; source research does not supply its exact duration. Read it only when the requested work includes feedback transitions.

## Bounded treatment

| Event | Atlas reference behavior |
| --- | --- |
| Enabled control or task-row hover | Optional **120ms ease** border-color feedback, from theme Border toward theme Ink. |
| Checkbox completion or filter selection | Native semantic state and readable status update immediately. |
| Task/filter count, added task, error or empty result | Immediate update; no entrance or exit sequence. |
| Keyboard focus | Immediate outline, independent of transition state. |
| Reduced motion or forced colors | Remove optional transitions, including after a live preference change. |

Border-color feedback supplements persistent labels, visible edges and native check marks. It never reveals the only clue that an element is actionable. Do not transition every property, change geometry on press, move a target, animate document scrolling, pulse a status or replay a staged entrance for a routine operation. State changes must not wait for a timer or animation completion.

The reference exposes feedback Off/On and starts Off. Turning it on cannot override the device's reduced-motion request or forced-color treatment. CSS must enforce those overrides independently of a JavaScript status message, with sufficient selector specificity for text fields, selects, buttons and checkboxes. Native glyph/popup rendering remains controlled by the browser.

For a consuming project, follow its established motion language first. Do not automatically add a settings selector to reproduce the lab. Resolve any chosen duration and property list into the project's own rules, so later implementation does not need to reload this chapter.

Check the actual hover/focus/checked states, including a live preference change while feedback is on. See [preview notes](preview/README.md) for the exact property list and [validation](validation.md) for browser evidence. The style does not establish a universal timing token or a claim about motion preferences across every engine.
