# Neumorphism — style specification

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

This is an original Atlas form recipe for selected surfaces within a theme or established project identity. **Every numerical padding, shadow, outline and motion value below is an Atlas choice.** The host theme supplies its own palette, typography and geometry. [Sources and credits](sources.md) distinguish historical contributions, critique and standards from this implementation. Read the [README](README.md) for suitability.

## Form contract

The material impression comes from a shallow form sharing its surrounding plane's color, with opposed light and dark shading. The reference intentionally adds visible control boundaries and explicit states, even where that reduces the seamless illusion. Function survives removal of all shading.

1. Name the limited surfaces receiving the treatment. The reference styles three reading-width choices and supporting sample surfaces. Ordinary fields and primary actions retain the host theme's Raised or brand fills and remain outside the same-material treatment.
2. Preserve the host theme's typography, semantic palette, spacing rhythm, hierarchy, layout and outer component geometry. The reference keeps the source `--card-radius`; it does not import Claymorphism's 28px shell override.
3. Use the **same opaque resolved `--surface` RGB** on `.soft-plane`, each selected `.soft-surface` host and its `.soft-face` child. Do not silently substitute Raised, a gradient, translucency or a colored selected fill within this treatment. The surrounding page may retain the host Page role.
4. Expose a **12px perimeter rim** and keep all readable text, marks and controls inside an opaque `.soft-face`. Decorative shading belongs behind that face. No shadow, pseudo-element or overlay may darken or lighten the actual text background.
5. Derive each inner corner as **max(0px, host corner minus 12px)**. Expand multi-value radii per corner: Botanical's 32px/8px/32px/8px outer corners become 20px/0px/20px/0px inside. A single `calc()` around a four-value shorthand is invalid CSS.
6. Use real text, native controls and meaningful state semantics. No artwork, font binary, blur, transparency, library or animation runtime is required.

The preview compares selected color, font and geometry profiles from **Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery and Layered**. These are profile projections, not nine complete theme implementations. Their compositions and component rules remain authoritative until the consuming project declares a scoped departure.

| Theme rules to preserve or explicitly depart from | Conditional fit judgment |
| --- | --- |
| [Editorial](../../themes/editorial/design.md#geometry-and-elevation) and [Botanical](../../themes/botanical/design.md#geometry-and-elevation) | Selective raised surfaces offer a plausible starting point. Keep their type, palette and actual corners; matching surrounding fills and paired shading are additional Atlas choices. |
| [Play](../../themes/play/design.md#geometry-and-elevation) | Retain its 30px panel geometry, but replacing its hard offset depth with soft shading changes identity. Record that override. |
| [Swiss](../../themes/swiss/design.md#geometry-and-elevation), [Precision](../../themes/precision/design.md#geometry-and-elevation) and [Gallery](../../themes/gallery/design.md#spacing-layout-and-geometry) | Their normal surfaces are flat; Swiss explicitly cautions against soft shadows and bevels. Treat this as a limited study requiring a declared departure. |
| [Blueprint](../../themes/blueprint/design.md#geometry-and-elevation) and [Pulse](../../themes/pulse/design.md#geometry-and-elevation) | Blueprint's offset drafting depth and Pulse's flat task surfaces are different treatments. Keep ordinary work regions on their own rules. |
| [Layered](../../themes/layered/design.md#shape-material-and-depth) | Its rules explicitly reject inset bevels simulating physical controls. Recessed width controls are a substantial departure, unsuitable as a silent replacement of its workspace language. |

## Bounded reference recipe

| Role | Atlas reference choice | Boundary |
| --- | --- | --- |
| Material plane, host and face | Identical opaque theme Surface | Keep all foreground on the face. Other host-theme fields and actions may use their own declared fills. |
| Geometry | Host `--card-radius`, 12px rim, per-corner derived inner radius | Keep source asymmetry and ordinary `--control-radius`; do not round every theme into a capsule. |
| Necessary control boundary | **1px solid theme Border** | If an actual adjacent-color check fails, document an Ink override or choose a simpler control. Shadow is decorative. |
| Raised depth | Two opposing outer shadows | Apply only to the decorative layer behind the opaque face. |
| Recessed selected depth | Two opposing inset shadows | No simultaneous raised and recessed treatment on one host. Recess alone does not convey selection. |
| Persistent selection | **2px Ink outline with 3px offset**, a visible check and **Selected** text, plus `aria-pressed` | Another widget requires its own appropriate semantics. Keep a stable accessible button name. |
| Keyboard focus | Immediate **3px Ink outline with 3px offset** | Explicit reference override of the source Focus role. May replace the thinner selection outline; preserve the selected mark, text and programmatic state. |
| Optional press | **1px downward translation**, **120ms ease**, transform only | Off by default. Retain an immediate static cue; reduced motion removes all displacement. |

The exact original Atlas shading is:

~~~css
/* Light appearance. */
--soft-raised:
  4px 4px 10px rgb(25 28 36 / .16),
  -4px -4px 10px rgb(255 255 255 / .78);
--soft-recessed:
  inset 3px 3px 7px rgb(25 28 36 / .18),
  inset -3px -3px 7px rgb(255 255 255 / .72);

/* Dark appearance: resolved separately. */
--soft-raised:
  4px 4px 10px rgb(0 0 0 / .34),
  -4px -4px 10px rgb(255 255 255 / .065);
--soft-recessed:
  inset 3px 3px 7px rgb(0 0 0 / .34),
  inset -3px -3px 7px rgb(255 255 255 / .07);
~~~

These are decoration values, not source-author tokens or replacements for theme roles. The [preview stylesheet](preview/styles.css) owns their application and stacking. A decorative pseudo-layer must stay behind the opaque `.soft-face`; the face itself has no shadow. Keep all foreground off the exposed rim, including short state marks. A selectable button must not contain nested interactive controls.

Because the opaque face shields every readable area, text contrast uses its stable Surface background. If an adaptation removes that shield, changes its geometry or draws text across the rim, measure the effective background throughout that content; a token-only calculation no longer describes the result. Inspect the rounded corners as well as the center.

Use border-box sizing. Leave space for painted shadows, outlines and offsets without clipping, overlapping targets or expanding the apparent hit area. Let long text wrap and controls grow. Do not hide an external focus indicator with rounded overflow clipping.

## Typography, layout and states

Keep the host typography and content hierarchy. The form does not require rounded type, pastel text, tiny labels or oversized headings. Preserve legible body size, line height, measure and wrapping. The preview names local font stacks; a family declaration is not evidence that the named font rendered. No remote font service or binary is supplied.

Use alignment, spacing and headings to group information before adding depth. Extended reading and dense rows remain calm. At narrow widths and text zoom, reflow the page and allow controls to expand. Inspect text, control boundaries and focus together.

| Situation | Required outcome |
| --- | --- |
| Link or action | Ordinary browser behavior, native semantics and a clear label. Shading does not explain function. |
| Hover or temporary held press | Immediate static feedback independent of motion, such as an underline. Hover is never needed to find or operate the action. |
| Selected choice | Persistent visible check/Selected text, outline and appropriate programmatic state. Reversing light and dark shadows alone is insufficient. |
| Focused selected choice | Clear focus plus persistent selection text, mark and semantics. |
| Field error | Associated label, useful error message and programmatic invalid state. A tint, shadow or shake cannot carry the error alone. |
| Disabled or unavailable | Correct semantics, readable explanation and no misleading press feedback. |
| Apply or reset result | Immediate truthful feedback reflecting the actual local state. No animation delays or simulated remote success. |

A held press is temporary; a selection persists after release. Do not apply `aria-pressed` to an ordinary submit action to obtain an aesthetic. Reset transient feedback after release, cancellation or lost contact. Use stable accessible names for toggle-style buttons, following the [W3C button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

The reference aims for **44px** target height as an Atlas usability choice. [WCAG 2.2 Target Size (Minimum), SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) specifies **24 by 24 CSS pixels**, with exceptions and spacing conditions. Height alone does not assess width, spacing, zoom or pointer access.

**Quiet page** is a browser-local reading-preset workbench. Width choices are **45, 60 and 72ch**. Its form accepts a trimmed preset name of **3–48 characters**, even text sizes of **16–24px**, and line spacing of **1.5, 1.75 or 2**. Apply updates the actual sample title, maximum width, text size and line height. Dirty or invalid drafts retain the previous applied sample. Reset restores both draft and sample to **A little room to read / 60ch / 18px / 1.75**. Theme, appearance and motion settings preserve draft and applied values. [Preview notes](preview/README.md) define the exact behavior; this specimen has no service, remote save or persistence contract.

## Appearance and fallbacks

Support **Light, Dark and System** through the consuming project's appearance model. System follows live preference changes; explicit choices remain explicit. Resolve actual light and dark semantic roles. Dark shading is restrained and separately chosen; do not mechanically reverse a bright shadow or add a luminous rim everywhere.

Keep a readable static baseline when scripts fail or are absent. Native content, links and disclosures remain usable, with an explanation for unavailable specimen controls. Do not hide content awaiting initialization. Recover safely from malformed or blocked storage in any consuming project that introduces persistence.

In **forced colors**, remove decorative shadows, transforms and transitions. Use opaque **Canvas/CanvasText** for material planes and readable faces, and **ButtonFace/ButtonText** for ordinary action surfaces. Keep actual boundaries, selected text/marks and focus. The reference uses a solid 2px CanvasText selection outline and a 3px CanvasText keyboard-focus outline, each with a 3px gap; persistent Selected text and aria-pressed retain selection when focus takes the outline. Do not place a Canvas-colored text backplate on a Highlight-filled selected face. Permit user-agent adjustment instead of broadly using `forced-color-adjust: none`.

Motion is **off by default**. When enabled, the reference uses only **1px downward press translation over 120ms ease**. Do not animate shadows, geometry, layout or palette. Reduced motion removes transitions **and** translation, including instantaneous displacement. Respect live changes and keep static feedback. Read [motion.md](motion.md) only when adding movement.

## Contrast and evidence boundary

Apply [WCAG 2.2 Contrast (Minimum), SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): at least **4.5:1** for ordinary text and **3:1** for qualifying large text, subject to the criterion's definitions and exceptions. Check Ink, Muted, labels, placeholders, errors and permitted action fills against actual opaque backgrounds.

Use [Non-text Contrast, SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) for visual information needed to identify controls, states and meaningful graphics against adjacent colors, generally **3:1** with defined exceptions. A token named Border and a 1px width do not prove sufficient contrast. Check the real boundary, selected outline and focus against each neighbor. Use a documented contrasting override when necessary; soft shadows cannot substitute for these checks.

Test both appearances, live System changes, keyboard and pointer cancellation, selected/pressed/error states, narrow reflow, text zoom, reduced motion, forced colors and script failure. Record actual evidence and limitations in [validation.md](validation.md). Research, profile calculations and screenshots establish only their recorded conditions; they do not certify a complete theme, screen-reader flow, product or device. Retain **draft** status until relevant consuming-project gates are met.
