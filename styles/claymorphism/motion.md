# Claymorphism — optional motion

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

Claymorphism is complete as a static form. **These are Atlas proposals**, not historical requirements or imported animation tokens. Read this document only when the requested work includes motion; no animation runtime is required.

## Gentle feedback

| Event | Bounded treatment |
| --- | --- |
| Temporary press on a suitable action or selectable card | Optional **1px downward translation**. Keep an immediate static press cue, such as an underline, alongside the movement. |
| Transition | **120ms ease** on **transform only**, **off by default**. This is an Atlas specimen choice. |
| Focus, selection, validation, availability and result | Immediate. Update labels, semantics and useful messages with the actual state. |
| Theme, appearance or form-mode change | Immediate. Do not morph corner geometry, shift layout or animate palette replacement. |
| Reading content, perimeter shading and background | Static. No floating loop, bounce, tilt, parallax, pointer-following effect or entrance sequence is required. |

Start with the static control and opt in only when the motion preference permits movement. Use explicit transition properties; avoid transition: all, spring overshoot, scaling, shadow animation and shaking errors. The reference does not animate the shell's two inset shades or its outer shadows.

Keep reliable hit targets and reserve enough space for both positions. A transform must not move a control away from a held pointer, overlap another target or clip keyboard focus. Keep all text and controls inside their opaque content wrapper throughout the press.

A held press is temporary; selection persists. Reset press feedback on release, cancellation or lost pointer contact. Selected text, the static selection cue and appropriate programmatic state survive release and disabled motion. A focused selected card shows its focus outline and retains Selected text.

## Preferences and interruption

Under **prefers-reduced-motion: reduce**, remove transitions **and** translation, including an instantaneous translated press. Keep static press feedback, selection and visible focus. Honor an explicit motion-off setting as well; the reference starts with motion off.

Handle preference changes during use. A control remains usable if motion is disabled while a pointer is held. Never wait for transitionend, a timer or an animation promise to update data, accessible names, focus, validation or outcomes.

Forced colors uses the static system-color fallback in [style.md](style.md): remove decorative shadows, transforms and transitions while preserving boundaries, focus, selected text/marks and errors. Browsers without optional animation support receive the same useful static form.

[W3C's Animation from Interactions guidance](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) explains disabling nonessential interaction motion; it is a **Level AAA** criterion. [Technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) describes prefers-reduced-motion as one sufficient technique. These references support the preference contract, not Atlas's numerical offset or timing, and do not certify overall accessibility.
