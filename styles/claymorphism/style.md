# Claymorphism — style specification

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

This is an original Atlas form recipe for selected surfaces within a theme or established project identity. **Every numerical radius, padding, shadow, outline and motion value below is an Atlas choice.** [Sources and credits](sources.md) identify the term, explanations and standards without presenting this recipe as a historical definition or a port of another author's code. Read the [README](README.md) for suitability.

## Form contract

The recognizable form combines visibly inflated, rounded shells with soft inner and outer perimeter shading. Keep an opaque, stable reading surface within each shell. The appearance may suggest a soft object; operation, selection and focus must remain clear when shading disappears.

1. Name the limited surfaces receiving the treatment. The reference uses supporting panels and selectable creative-practice cards. Do not round, shade or inflate every input, row, label and nested region.
2. Preserve the host theme's typography, palette roles, spacing rhythm, hierarchy, layout and ordinary component geometry. Keep its actual base geometry in the profile manifest.
3. **Explicitly override corner geometry on selected clay shells.** The reference uses a **28px outer radius**, **12px shell padding** and **16px inner radius**. This is a deliberate adaptation even for sharp themes; claiming universal preservation of geometry would misdescribe the result.
4. Keep all readable shell content and controls within an opaque **.clay-content** child. Its solid fill covers the shaded interior beneath them. The **.clay-surface** parent supplies the perimeter shading; no gradient, pseudo-element or translucent overlay may sit over text or change its effective background.
5. Keep ordinary fields, dense controls and working areas on the host theme's control/card geometry. A shell's radius is not a new default for the component library.
6. Preserve real text, native controls and clear static state indicators. No artwork, font binary, blur, transparency, imported library or animation runtime is required.

The reference compares selected color, font and base-geometry profiles from **Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery and Layered**. These are profile projections, not nine complete theme implementations. Each theme's authored compositions, optional effects and interaction guidance still require their own review. Rounded shells can substantially change a restrained or angular identity; record that tradeoff in the consuming project's rules.

The [source-fit assessment](../../examples/claymorphism-composition-evaluation/design.md#fit-decisions) treats these pairings conditionally. Play offers the strongest expressive affinity, but its [30px/14px geometry and hard depth](../../themes/play/design.md#geometry-and-elevation) are still explicitly replaced on clay shells. Botanical and Editorial need scoped adaptations; Pulse keeps its normal schedule/task surfaces flat. Swiss, Precision, Blueprint and Gallery conflict with this treatment on ordinary surfaces. [Layered's authored geometry guidance](../../themes/layered/design.md#shape-material-and-depth) rules out inset bevels simulating physical controls: any opted-in creative illustration study is a substantial declared departure, not permission to restyle its normal workspace.

## Bounded reference recipe

| Role | Atlas reference choice | Boundary |
| --- | --- | --- |
| Shell | Fully opaque theme surface or Raised role, with **1px solid theme Border** | Use an actual border where it supplies necessary identification; decorative shadow is insufficient. Check the chosen boundary against adjacent colors. |
| Geometry | Outer **28px**, shell padding **12px**, inner **16px** | Explicit shell override. Keep ordinary controls and dense working regions on host geometry. |
| Content | Opaque theme Raised fill and paired Ink/Muted text | Cover the full readable region with .clay-content; no shading over text, labels or controls. |
| Selected choice | Opaque theme Primary with paired On primary text | Apply the pair together; keep Selected text and correct programmatic state. |
| Perimeter depth | Static soft outer shadows and two inset shades, as below | Decorative only. The opaque child masks their interior influence on content. |
| Selection | **2px theme Focus outline with 4px offset**, plus visible **Selected** text and aria-pressed on selectable buttons | Another widget needs semantics appropriate to that widget. |
| Keyboard focus | Immediate **3px theme Focus outline with 3px offset** | Replaces the selected card's thinner outline while Selected text and programmatic state remain. Check every adjacent fill. |
| Optional press | **1px downward translation**, **120ms ease** on transform only | Off by default. Keep an immediate static press cue, and remove all movement under reduced motion. |

The reference's decorative shadow values are:

~~~css
/* Light appearance: original Atlas perimeter treatment. */
--clay-shadow:
  7px 9px 20px rgb(25 28 36 / .12),
  -5px -5px 15px rgb(255 255 255 / .56),
  inset 4px 4px 9px rgb(255 255 255 / .72),
  inset -5px -5px 11px rgb(25 28 36 / .16);

/* Dark appearance: separately resolved, not a background inversion. */
--clay-shadow:
  7px 9px 20px rgb(0 0 0 / .3),
  -5px -5px 15px rgb(255 255 255 / .055),
  inset 4px 4px 9px rgb(255 255 255 / .09),
  inset -5px -5px 11px rgb(0 0 0 / .26);
~~~

Apply these shadows to the opaque .clay-surface parent only. The .clay-content child has **no shadow**, an opaque resolved fill and enough interior spacing for all labels, text and controls. Do not render readable content directly in the shaded shell padding. A selectable button can contain an opaque text wrapper; it must not contain nested interactive controls. A panel can contain ordinary controls inside its opaque child.

These fixed decoration colors do not replace semantic theme tokens. Shadows are not included in text contrast calculations because the content surface physically shields text from them. If an adaptation removes that shielding or changes its geometry, measure the effective background throughout every readable area and document the altered recipe. Do not assume a token-only contrast calculation describes a shaded text background.

Use border-box sizing. Leave enough layout space around shells, painted shadows and focus outlines; painted shadow is not additional clickable area. Avoid overflow clipping, overlapping targets and fixed text heights. Reduce unnecessary surrounding decoration before compressing labels or targets.

## Typography and layout

Keep the host typography and content hierarchy. Rounded surfaces do not require a rounded font, childish language, all-lowercase labels, oversized headings or pastel text. Preserve readable body size, line height and wrapping. Text remains selectable, zoomable content.

The preview names local font stacks from the theme profiles and accepts installed/system fallbacks. A declared family is not evidence that it rendered. No remote font service or font binary is supplied; a consuming project must resolve its own font availability and license.

Use spacing and alignment to establish grouping before applying the form. Avoid repeated inflated rows in tables or long documents. Supporting shells should not compete equally with the primary task. Keep error descriptions, review content and ordinary fields calm and fully opaque.

At narrow widths and text zoom, let content reflow without clipping. Cards and controls must expand for long labels. A real data table may retain deliberate horizontal scrolling. Inspect both the component's content and its outer focus indicator; a rounded clipping mask must not hide focus or validation.

## States and interaction

| State or component | Required outcome |
| --- | --- |
| Link | Clear destination, ordinary browser behavior and an underline where needed to identify it. |
| Action | Native button semantics and a label describing the action. Inflated shape alone does not explain activation. |
| Hover and transient press | Immediate static feedback, independent of motion. Keep an underline or other clear nonmoving cue during press; hover is never required to find or operate a control. |
| Selected choice | Visible Selected text or an equally clear static mark and the appropriate programmatic state. The reference uses aria-pressed on selectable buttons. |
| Focused selected choice | Visible keyboard focus plus persistent Selected text and semantics. Focus may replace the thinner selection outline. |
| Field and validation | Associated label, opaque readable field, useful error text and the relevant programmatic invalid state. A shadow, red tint or shake cannot carry the error alone. |
| Disabled or unavailable | Appropriate native semantics, readable explanation and no misleading hover/press response. |
| Review, reset and results | Report actual local changes immediately. A soft shadow or animated press does not confirm saving or a remote operation. |

A persistent selection differs from a temporary held press. Do not put aria-pressed on an ordinary submit action to obtain an aesthetic. Reset transient feedback on release, cancellation or lost pointer contact. Keep selection, labels and focus correct even when optional animation is disabled, interrupted or unsupported.

The reference aims for **44px** control height as an Atlas usability choice. [WCAG 2.2 Target Size (Minimum), SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) specifies **24 by 24 CSS pixels**, with exceptions and spacing conditions. Height alone does not assess target width, spacing, zoom or pointer access.

The **Little studio** specimen is a browser-local creative-practice planner: choose sketching, writing or making, enter a trimmed title of 3–48 characters and minutes in five-minute steps from 5 through 120, review and reset. Its fictional content and local interactions do not establish persistence, a backend, authorization or production workflow. [Preview notes](preview/README.md) define the exact reference behavior. A consuming product keeps its own operation and recovery contract.

## Appearance and fallbacks

Support **Light, Dark and System** through the consuming project's appearance model. Resolve actual light/dark surface, foreground, primary, boundary, focus and validation roles. System follows live system changes; an explicit user choice remains explicit. Dark appearance uses separately chosen decoration and a fully opaque content surface. Neither universal white nor pastel color is required.

Keep a useful static baseline when scripts fail or are absent. Content, links and native disclosures remain available. Explain unavailable custom specimen controls. Use safe defaults when stored settings are malformed or blocked, and do not hide content pending initialization.

In **forced colors**, use opaque system surfaces and system foreground, boundary and focus colors. Remove decorative shadows, transforms and transitions. Preserve real borders where required, focus, selected labels/marks and errors. Allow user-agent palette adjustment instead of broadly applying forced-color-adjust: none. The fallback remains useful after the clay shading disappears.

Optional motion is **off by default**. When enabled, the reference uses only **1px downward press translation over 120ms ease**; it does not animate shadows, radii, layout or palette. Reduced motion removes transitions **and** translation, including instantaneous displacement. Honor live preference changes and keep static press/selected cues. Load [motion.md](motion.md) only when introducing movement.

## Contrast and evidence boundary

Apply [WCAG 2.2 Contrast (Minimum), SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): at least **4.5:1** for ordinary text and **3:1** for qualifying large text, subject to the criterion's definitions and exceptions. Test Ink, Muted, labels, placeholders, errors and every permitted action fill against their actual opaque content backgrounds.

Check visual information needed to identify controls, states and meaningful graphics against adjacent colors using [Non-text Contrast, SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), generally **3:1**, with defined exceptions. This recipe supplies a 1px theme Border; its name and width do not prove sufficient contrast. If that border is necessary identification and fails, use a documented contrasting boundary override or choose a simpler surface. Selection and focus require their own adjacent-color checks. Decorative shadows cannot substitute for those cues.

Test both appearances, live System changes, keyboard operation, pointer cancellation, selected/pressed/error states, narrow reflow, text zoom, reduced motion, forced colors and script failure. Profile calculations and desktop screenshots establish only their recorded conditions. Record actual evidence and limitations in [validation.md](validation.md). Neither historical research nor a passing profile certifies a complete theme, product, screen-reader flow or real device; retain **draft** status until relevant project gates are met.
