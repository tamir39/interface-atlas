# Glassmorphism — style specification

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

This is an original Atlas material recipe, intended to accompany a selected theme or an established project identity. **All tint values, filter settings, mappings and scope rules here are Atlas choices.** Historical and technical source facts are identified in [sources.md](sources.md); they are not numerical design defaults. Read the [README](README.md) for suitability before adopting the material.

## Material contract

The visual identity is a tinted foreground surface, a softly visible backdrop and a restrained edge that clarifies separation. Blur supplies no content, state or authority. Information remains readable when the material becomes fully opaque.

1. Name the small set of surfaces that benefit from showing context behind them. The reference permits navigation chrome, short surface-selection tiles and a supporting context card. These are sibling regions at one shallow depth, not stacked translucent panes.
2. Keep detailed work opaque: settings, form fields, validation messages, review feedback, reading and the surface inventory table. A translucent outer frame does not justify translucent text inputs or a table over artwork.
3. Retain the host theme's typography, palette roles, spacing rhythm, corner geometry and focus identity. Glass changes material only. It does not turn Swiss's geometry into Layered's geometry, or give every theme the same pastel colors and rounded cards.
4. Use static, original decoration. The reference's Calm, Bright and Busy backdrops are CSS geometry for contrasting conditions. Backdrop imagery is optional; motion, photographs, optical distortion, custom cursors and shaders are unnecessary.
5. Make the opaque alternative first-class, with the same dimensions, content, order, controls and selection state.

The reference compares a documented token subset from all nine themes: **Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery and Layered**. It does not import their full page layouts, optional effects or motion systems. A successful specimen pairing establishes no general recommendation to glass every surface in that theme.

## Bounded reference recipe

| Role | Reference choice | Boundary |
| --- | --- | --- |
| Opaque baseline | Selected theme's opaque raised surface | Establish this before enabling a filter. Also use it for working content and fallbacks. |
| Light glass tint | The same raised color at **88%** alpha | Retains substantial tint; remaining backdrop contribution is deliberate, not a contrast guarantee. |
| Dark glass tint | The selected dark raised color at **90%** alpha | Use resolved dark tokens, not a light surface with reduced opacity. |
| Backdrop filter | `blur(16px) saturate(110%)` | Optional progressive enhancement. This is a specimen setting, not a universal blur cap or performance budget. |
| Foreground | Theme Ink and readable Muted roles, at full opacity | Do not reduce text/icon opacity to intensify the glass effect. |
| Geometry | Theme-derived panel/control corners and spacing | Preserve sharp, modest or rounded geometry as appropriate to that identity. |
| Edge/depth | **1px** theme Border; optional static shadow | Decorative rim/highlight is separate from a necessary control boundary or focus indicator. |
| Dense content | Opaque raised/content surface with ordinary controls | Never make form usability or data interpretation depend on the backdrop. |

The reference maps the selected theme's `--raised` color to the tint, with `--ink` and `--muted` foregrounds. Resolve a real color with alpha, rather than applying `opacity` to a container: container opacity also fades descendants. Keep content unfiltered; `filter: blur(...)` on the component would blur its own text instead of the backdrop.

Start with an opaque `background`. Enable the translucent tint and the standard `backdrop-filter` only inside appropriate `@supports` detection; include the prefixed property only where the chosen browser matrix needs it. A browser parsing the declaration is not evidence of good rendering speed or acceptable contrast. Avoid making an ancestor's opacity/filter or an unrelated compositing layer an undocumented prerequisite: backdrop roots, clipping and stacking can change what is actually sampled.

An 88% tint in one theme is not visually identical to 88% in another. Do not normalize away a host theme's color identity to make the specimens look alike. If its foreground/backdrop combination fails, make that surface opaque or adjust and document the project-specific treatment.

## Typography, layout and states

Keep the existing type hierarchy and real DOM text. Use readable weights and wrapping; a luminous backdrop does not justify thin microtype or compressed labels. The preview names local font stacks from each theme and uses installed/system fallbacks; no remote font service or font binaries are included. A named family is not proof that it rendered.

Keep text, controls and meaningful icons in the foreground. Decoration is noninteractive, hidden from assistive technology, and never placed above hit targets. Retain a logical source order; a decorative transparent pane must not change keyboard order or create a new focus trap. Let ordinary content reflow; do not create full-screen fixed glass purely to make the backdrop visible. Check narrow widths, zoom, long labels and horizontal table access.

| State/component | Required outcome |
| --- | --- |
| Navigation/link | Readable label, real destination and ordinary keyboard behavior. A reflection or low-opacity rim cannot be the only sign of interactivity. |
| Hover/pressed | Foreground remains legible; strengthen a checked boundary or opaque fill rather than reducing tint for drama. |
| Focus | Immediate **3px** theme Focus outline with **4px** offset in the reference; clear of clipping and checked against actual adjacent surfaces. A selected item can also be focused. |
| Selected surface | Programmatic pressed state, readable selected text and a **2px** inset theme Ink outline in the reference. Do not communicate selection through translucency alone. |
| Input/validation | Opaque field with associated label; error text and relevant programmatic invalid state. Keep error and review feedback readable over a stable surface. |
| Disabled/unavailable | Native disabled state where appropriate and a visible explanation of what is unavailable. Do not disguise unimplemented functionality as a glass control. |
| Forced colors | System-colored opaque surfaces, visible system boundaries and focus; no dependence on shadows or background artwork. |

Reference controls have at least **44px** height; primary actions use the opaque theme Primary/On primary pair. These are Atlas specimen choices, not a statement of WCAG minimum target dimensions. The reference includes a fictional Horizon project draft, a surface-role inspector and native disclosures. Review validates a trimmed **3–48 character** title and an optional note of up to **120 characters**, then reports a local result. It sends nothing and saves no project data. These are specimen interactions, not glass-specific product requirements; [preview notes](preview/README.md) define their exact implementation and recovery behavior.

A consuming product retains its own state ownership, validation, save/retry behavior and authority contract. Material must not imply that an action is confirmed, saved, permitted or safe.

## Light, Dark, System and opaque recovery

Support **Light, Dark and System** through the host project's appearance model. In System mode, follow live system changes. Resolve the actual light or dark palette before choosing tint alpha. Keep appearance changes immediate and usable when storage is unavailable or values are malformed. The reference's controls are local specimen settings rather than persistent user-profile settings.

Apply these outcomes in descending priority:

1. **Forced colors:** replace tinted material with opaque system-color surfaces; remove filtering/decorative shadows and retain necessary boundaries and focus.
2. **Reduced transparency:** use opaque host-theme surfaces, whether the setting is present at load or changes live. Do not offer an effect toggle that overrides an active preference to reduce translucency.
3. **Explicit Opaque choice:** use the same fully opaque baseline with no backdrop filter.
4. **Unsupported filter:** preserve the opaque baseline. Do not substitute a translucent unblurred surface as if it were an equivalent legibility fallback.
5. **Automatic with supported filters:** enable the bounded tint/filter treatment on approved surfaces; keep dense content opaque.

Honor `prefers-reduced-transparency: reduce` where implemented. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-transparency) currently marks this query experimental with limited availability, so an explicit **Opaque** choice remains necessary. Unsupported queries reveal no preference and cannot be treated as a user's consent to translucency. Reduced motion is independent; [motion.md](motion.md) is optional when movement is actually being added.

With JavaScript absent or failing, native links, static content and disclosures remain readable; unavailable custom settings and draft actions are disabled with an explanation. Material enhancement must not hide the page while waiting for script or support detection.

## Contrast and backdrop variation

Check the **rendered composite** behind each foreground, not only Ink against an opaque theme token or the alpha tint by itself. Include all permitted backdrops, both appearances, narrow reflow, scrolled positions, hover/pressed/current states, focus adjacency and fallback modes. The reference exposes Calm, Bright and Busy static conditions so variation is deliberate and testable; they do not represent every real photograph or user background.

Apply [WCAG 2.2 text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): at least **4.5:1** for ordinary text and **3:1** for qualifying large text, subject to the criterion's definitions/exceptions. Check necessary controls, states and meaningful graphical parts against adjacent colors using [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), generally **3:1** with its stated exceptions. A subtle decorative pane rim is not itself a claimed passing control outline.

Use an opaque content island or stronger tint when a backdrop is uncontrolled. If contrast cannot be maintained through permitted content changes, reject glass on that surface. Blur smooths detail; it does not guarantee a stable luminance, readable text, distinguishable focus or complete accessibility. No numerical pass is asserted for every possible alpha composite by this document. Actual sampled combinations and observed limitations belong in [validation.md](validation.md).

## Performance and evidence boundary

Backdrop processing cost depends on filtered area, radius, overlapping surfaces, changing content, device pixel ratio, engine and GPU. There is **no universal safe surface count, pixel radius or frame-time claim** in this recipe. The reference uses static artwork and a shallow set of sibling surfaces to bound the study; that choice is not a benchmark.

Avoid nested/overlapping blur, filtering the entire viewport, continuously changing content behind glass and animating filter radius or material alpha. Do not add `will-change`, extra compositing layers, WebGL or a canvas renderer without measured need. If a consumer's low-power target, scrolling or moving background incurs an unacceptable cost, reduce the affected area or ship its opaque alternative. A web page cannot assume it receives the native platforms' Battery Saver or device fallback behavior.

Record representative device/browser measurements for the consumer's actual flow. Desktop browser screenshots and automated checks do not establish battery use, low-end GPU behavior or real-device scrolling performance. Keep the style **draft** until the relevant project's gates are met, and describe limited evidence precisely. This CSS material is an original interpretation, not a reproduction or validation of Apple Liquid Glass, Microsoft Acrylic or Mica.
