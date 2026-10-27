# Neumorphism — optional motion

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

Neumorphism is complete as a static form. **These are Atlas proposals**, not historical requirements or imported animation tokens. Read this document only when requested work includes motion; no animation runtime is required.

## Restrained press feedback

| Event | Bounded treatment |
| --- | --- |
| Temporary held press on a suitable action or width choice | Optional **1px downward translation**, alongside an immediate static cue such as an underline. |
| Transition | **120ms ease** on **transform only**, **off by default**. |
| Selection, focus, validation, availability and result | Immediate labels, semantics, boundaries and messages reflecting actual state. |
| Theme, appearance or material-mode change | Immediate. Do not animate palette, geometry or depth replacement. |
| Reading sample, background and shading | Static. No floating loop, breathing shadow, bounce, tilt, parallax or entrance sequence is required. |

Begin with the static form. Enable movement only when the explicit setting and system preference both allow it. Use explicit transition properties; avoid `transition: all`, scaling, spring overshoot, animated shadow, moving light sources and shaking errors. The raised and recessed shadows never interpolate.

Keep hit targets reliable and reserve space for both positions. A translation must not move a target away from a held pointer, overlap another control or clip focus. The opaque content face continues to shield every text label and state mark throughout the press.

A held press is temporary; selection persists. Reset transient feedback on release, cancellation or lost contact. Selected text, check, outline and programmatic state remain after release and when optional movement is disabled. A focused selected choice retains its visible state while showing keyboard focus. Inverted depth alone is never sufficient feedback.

## Preferences and interruption

Under **prefers-reduced-motion: reduce**, remove transitions **and** translation, including an instantaneous translated press. Keep the immediate static press cue, selection and visible focus. Honor motion-off as well; the reference starts with it off.

Handle preference changes during use, including while a pointer is held. Data, accessible names, errors, focus and applied reading settings never wait for `transitionend`, a timer or an animation promise. Disabled motion has the same complete operation and feedback.

Forced colors uses the static system-color fallback in [style.md](style.md). Remove decorative shadows and movement, retaining real boundaries, selected marks/text, focus and errors. Browsers without optional animation support receive the useful static form.

[W3C's Animation from Interactions guidance](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) addresses disabling nonessential interaction motion and is a **Level AAA** criterion. [Technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) describes using `prefers-reduced-motion` as one sufficient technique. These references support the preference contract, not Atlas's 1px offset or 120ms timing, and do not certify complete accessibility.
