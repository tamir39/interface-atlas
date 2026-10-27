# Skeuomorphism — optional motion

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

The notebook metaphor is complete as a static interface. **Every timing and displacement below is an original Atlas choice**, not a requirement of historical interfaces. Read this chapter only when motion is selected; no animation runtime is required.

## Bounded feedback

| Event | Atlas treatment |
| --- | --- |
| Temporary held press on an appropriate action or index button | Optional **1px downward translation**, alongside an immediate static underline or other clear cue. |
| Transition | **120ms ease**, **transform only**, **off by default**. |
| Note selection, focus, validation, Apply locally, Revert draft and download preparation | Immediate state, content and feedback. |
| Theme, appearance or material fallback change | Immediate. Do not animate palette, corner geometry or paper depth. |
| Cover, binding, paper stack and reading face | Static. |

Begin with the static form. Enable displacement only when the explicit motion setting and the system preference both permit it. Use explicit transition properties; avoid `transition: all`, animated shadow, moving light sources, bounce, tilt, parallax, scaling and error shakes. Preserve reliable hit targets, enough separation for both positions and unclipped focus.

Physical resemblance never requires physical inconvenience. A page turn, swipe, drag, unfolding cover or decorative animation must not be a prerequisite for searching, inspecting, editing or downloading notes. Do not delay note replacement or action results to finish a simulated page flip. The reference uses no page-flip sequence or entrance choreography.

A held press is temporary. The current note remains identified after release through its outline, visible **Selected** mark and `aria-pressed`. Clear transient press feedback on release, cancellation or lost contact. Preserve stable accessible button names; a visual selected label is supplementary and hidden from the accessible name. Focus and selected state remain distinguishable with motion disabled.

## Preferences and interruption

Under **prefers-reduced-motion: reduce**, remove transitions **and** translation, including instantaneous displacement. Honor the motion-off setting as well. Keep immediate static feedback and allow preference changes during use, including while a pointer is held.

Data changes, validation, accessible names, focus and download creation never wait for `transitionend`, timers or animation promises. Switching notes or appearance retains the same per-note draft and applied state regardless of animation support.

Forced colors uses the static system-color fallback in [style.md](style.md). Remove decorative shadows, rules, binding effects, transforms and transitions while preserving content, native controls, boundaries, selection and focus.

[W3C's Animation from Interactions guidance, SC 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) is **Level AAA** and addresses disabling nonessential interaction motion. [Technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) describes `prefers-reduced-motion` as one sufficient technique. These references support the preference contract, not Atlas's 1px displacement or 120ms duration, and do not certify complete accessibility.
