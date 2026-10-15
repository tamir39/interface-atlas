# Pulse — optional effects

Pulse's core identity comes from condensed short headings, lime/ink contrast, and deliberate spacing. Projects choose optional decoration separately from functional design. **All treatments here are original Atlas proposals.** No third-party effect implementation, Open Props stylesheet, or portfolio renderer is imported. [Sources](sources.md) records conceptual references and creator roles.

## Bounded poster geometry

Use a static, original composition of bars, wedges, split circles, or cropped geometric forms in a bounded hero or campaign region. Keep ordinary navigation and body text in HTML with a stable reading order. A poster may use the dark palette inside a light page when its own foreground, action, focus, and boundary pairs are defined deliberately.

- Mark pure decoration `aria-hidden` and prevent it receiving pointer input or keyboard focus.
- Crop artwork inside its own region; avoid whole-page horizontal overflow and never clip headings or focus rings.
- Keep text, actionable targets, and session information unrotated. Use angle and overlap in the artwork rather than forcing users to read tilted paragraphs.
- Preserve the composition as a static illustration on reduced-motion, motion-off, unsupported-animation, and no-JavaScript paths.
- A bright shape or bar conveys no progress, availability, booking state, attendance, agent activity, or urgency.

The preview's original dark poster and static vector geometry are Atlas compositions. It uses no external illustration, icon package, canvas renderer, shader, cursor effect, or brand asset.

## Optional motion study

The preview includes one separate **Play motion study** action. It requests a finite **600ms** movement of three decorative bars using transform/opacity. Static geometry is present before activation; no content waits for the study. The bars return to their normal final composition and never loop.

Open Props informs user-preference gating, and the article by **Kayce Basques and Rachel Andrew** informs animation-property selection. The geometry, timing, activation, and lifecycle are Atlas choices; no example code is reused. Keep actual rendering performance and interaction accessibility as project checks rather than treating a property name as proof.

Follow [motion.md](motion.md): cancel existing movement on repeat activation, motion-off, reduced motion, and a hidden document. Do not replay after visibility or appearance changes. An unavailable animation API keeps the static equivalent. The study does not alter or approve a plan and has no backend effect.

## Task-surface restraint

The planner uses flat surfaces with 12px corners, controls with 6px corners, and readable necessary boundaries. Selection uses persistent labels/markers and ink where needed. Avoid glowing selection rings, reactive backgrounds under schedule text, moving button targets, or repeated hover lifts in a review task.

Keep the native pointer and normal text selection. Faint decorative dividers cannot substitute for input boundaries, error text, or focus indicators. No optional effect expands the scope of the preview's [validation evidence](validation.md).
