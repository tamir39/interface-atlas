# Glassmorphism — optional motion

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

Glassmorphism works as a static material. **The following are Atlas proposals**, not animation tokens or a reproduction of Apple's Liquid Glass, Microsoft's Acrylic, or any platform transition. Load this document only when the requested change includes motion.

## Purpose and limits

| Event or property | Bounded treatment |
| --- | --- |
| Control hover or pressed feedback | An optional short color or border-color transition; **120–160ms** is an Atlas starting range, subject to the selected theme. |
| Focus, selected/current state, validation and control availability | Immediate. Semantics and useful messages update with the actual state. |
| Changing appearance, theme, backdrop specimen or transparency mode | Immediate. Do not animate the backdrop filter, tint alpha, page geometry or reading surface. |
| Opening or closing supporting content | Preserve the project's established accessible behavior. A native disclosure works immediately in the reference. |
| Background, blur radius, texture, reflection, refraction or parallax | Static. No continuous animation, pointer tracking, tilt or moving backdrop is required. |

Use an explicit transition property list. Avoid `transition: all`: it can accidentally animate dimensions, filter changes or focus. Do not delay focus, hide content until an entrance finishes, or hold an overlay open for a closing animation. Glass must never make an error, success, pending operation or selected state depend on a shimmer or color pulse.

The reference's material comparison does not require an animation runtime or a motion preference control. If the inherited theme supplies feedback, retain that theme's restrained timing rather than installing a competing motion identity.

## Preferences and interruption

Honor `prefers-reduced-motion: reduce` by removing optional transitions and presenting state changes immediately. A project's explicit motion-off choice also disables them. Reduced motion and reduced transparency are separate preferences: reduced transparency selects the opaque material; reduced motion removes optional movement. One preference must not silently overwrite the other.

Handle live preference changes. Every task remains usable if animation is disabled before load or during an interaction. Never wait for `transitionend` or an animation promise to commit data, expose a control, update an accessible name or return focus.

In forced colors, keep system-colored boundaries and focus visible without animated shadows or highlights. Unsupported preference queries do not justify inferring a user's needs: keep the explicit opaque control described in [style.md](style.md), and preserve an immediate usable baseline.

Any later moving background, pane transition, video, canvas, spring or optical distortion needs its own purpose, stop/control behavior, interruption rules, reduced/static alternative and device measurements. This static recipe does not validate those additions.
