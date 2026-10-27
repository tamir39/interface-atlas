# Neobrutalism — optional motion

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

Neobrutalism is complete as a static form. **These are Atlas proposals**, not historical requirements, copied library animation tokens or a reason to load an animation runtime. Read this document only when the requested work includes motion.

## Direct feedback

| Event | Bounded treatment |
| --- | --- |
| Hover or temporary press on a suitable action | Optional **2px 2px** displacement with the hard shadow reduced from **4px 4px 0** to **2px 2px 0**. Preserve an immediate static cue, such as the reference's **3px text underline**. |
| Feedback transition | A short, direct transition may follow the selected theme's timing. The reference uses **100ms ease-out** for transform and box-shadow only, **off by default**; this is a specimen choice, not a universal style token. |
| Focus, selection, validation, availability and results | Immediate. Update semantics, labels and useful messages with the actual state. |
| Theme, appearance or form-mode changes | Immediate. Avoid morphing borders, moving page geometry or animating palette replacement. |
| Reading content, decoration and background | Static. No idle bounce, marquee, pointer-following, tilt, parallax or entrance sequence is required. |

Use explicit transition properties. Avoid `transition: all`, spring overshoot, scale-down feedback and shaking errors. A small displacement can relate directly to the hard shadow; it is optional and must never change layout flow, shrink text, obscure focus or make adjacent controls overlap. Reserve enough space for both positions and retain the original target's reliable activation behavior.

Distinguish a held press from a persistent selection. Reset transient effects on release, cancellation or lost pointer contact. A selected card keeps its visible Selected text or static mark and appropriate programmatic state after animation ends. A focused selected card must show both states.

## Preferences and interruption

Start from the static control. Enable optional movement only when the motion preference permits it. Under `prefers-reduced-motion: reduce`, remove transitions **and** translation, including an instantaneous translated press. Keep the static pressed cue, selection and focus intact. Honor a consuming project's explicit motion-off setting as well.

Handle live preference changes. Every action remains usable when motion is disabled before load or while a pointer is held. Never wait for `transitionend` or an animation promise to update data, accessible names, availability, results or focus.

Forced colors also uses the static system-color fallback described in [style.md](style.md): remove decorative shadow and movement while retaining clear boundaries, focus and selected labels. A browser lacking optional animation support gets the same useful static form.

[W3C's interaction-animation guidance](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) explains disabling nonessential interaction motion; it is a Level AAA criterion. [Technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) describes the reduced-motion media query as one sufficient approach. Neither source endorses this recipe's numerical offsets or establishes a complete accessibility claim.
