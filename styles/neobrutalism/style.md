# Neobrutalism — style specification

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

This is an original Atlas form recipe, intended to accompany a selected theme or an established project identity. **The exact border widths, offsets, scope, state rules and mappings below are Atlas choices.** [Sources and credits](sources.md) identify the implementation references and standards; they do not turn those choices into universal neobrutalism requirements. Read the [README](README.md) for suitability before adoption.

## Form contract

The recognizable form is an opaque filled surface, a strong visible outline and a hard directional shadow. Text remains real, readable content. Selection, focus and action outcomes remain useful with the shadow and motion removed.

1. Name the limited surfaces receiving this treatment. A primary action, selectable idea cards and a supporting panel are reasonable reference subjects; avoid outlining every sentence, table cell and nested container.
2. Preserve the theme's palette roles, type hierarchy, spacing rhythm, content order and corner geometry. A sharp theme stays sharp; a rounded theme can retain its corners. Do not make every profile black, yellow and square simply to establish the style.
3. Override border weight and depth deliberately on the selected surfaces. The reference replaces their ordinary edge/shadow treatment with the recipe below; this does not rewrite the theme's default component library.
4. Keep surfaces fully opaque. No blur, glass, glow, gradients, noise, skew, novelty cursor, moving background or illustration is required. Add decoration only when the project's content and brand justify it.
5. Keep the hierarchy economical. Avoid stacked hard shadows on nested cards, dramatic rotations over controls and overlaps that obscure reading or focus. A quieter unshadowed field can sit within a more expressive panel.

The reference compares a documented token subset from **Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery and Layered**. This is a profile projection, not nine full theme implementations. [Play](../../themes/play/README.md) has strong affinity because its existing direction includes firm outlines, hard offset shadows and expressive supporting panels. Even there, this recipe's 4px/4px Ink shadow and 3px focus gap are explicit adaptations rather than retained Play defaults. Other pairings require scoped adaptation and review against their authored theme rules; their profile rendering alone is not evidence of stylistic fit. The specimen's shared layout does not replace their authored page compositions, optional effects or motion systems.

## Bounded reference recipe

| Role | Reference choice | Boundary |
| --- | --- | --- |
| Surface | Opaque theme Raised or appropriate theme surface | Keep content and its background stable in both appearances. |
| Foreground | Full-opacity theme Ink and readable Muted roles | Do not fade essential labels to strengthen the graphic effect. |
| Outline | **2px solid theme Ink** | Check actual adjacent colors. Ink may be light in dark appearance; universal black is not required. |
| Hard shadow | **4px 4px 0 theme Ink**, zero blur and spread | Leave enough layout space for the painted shadow. It supplies no state or meaning by itself. |
| Geometry | Theme-derived control and card corners | Any deliberate corner override belongs in the consuming project's rules. |
| Primary action | Theme Primary with its paired On primary text | Keep the semantic pairing. Test the outline and focus separately around the action. |
| Focus | Immediate **3px theme Ink outline with 3px offset** | This is an explicit reference override of the theme's usual focus treatment, checked against adjacent surfaces. |
| Optional press displacement | **2px 2px** translation with **2px 2px 0** shadow | Only on suitable controls, with the independent static pressed cue described below and no translation under reduced motion. |

Resolve Ink, Raised, Primary and their paired text from the actual appearance. Reversing only the page background leaves inconsistent controls. Preserve meaningful error, success and warning roles; decorative accent color cannot replace a status label.

The outline and offset shadow are ordinary CSS. Use border-box sizing so the stronger border does not unexpectedly change control dimensions. Reserve space where offsets approach a neighboring control or viewport edge. The shadow's painted area is not extra clickable area. A transform must not create overlapping targets or move the active control away from the pointer. Native controls, logical source order and a static baseline require no new runtime or component dependency.

## Typography and layout

Keep the host theme's typography. A bold display heading can support this treatment when already appropriate to that theme; do not apply uppercase, condensed lettering, heavy weight or extreme tracking to every label. Keep body text comfortable to read and wrap. Real text must remain selectable and enlarge with the page.

The preview names local font stacks from each theme and uses installed/system fallbacks. A named family is not proof it rendered; no remote font service or font binary is supplied. Consumers must separately resolve font availability and licensing if they ship a font.

Use spacing and alignment to group information before adding heavy boxes. Keep dense forms, table bodies, review messages and long reading regions visually calm. A strong outline should clarify the region's role. Do not add a hard shadow to each row or make unrelated cards look equally important.

Allow narrow layouts, long labels and text zoom to reflow. Avoid fixed heights for text containers and decorative clipping. Retain scroll access where a real data table needs horizontal space. Borders, shadows and focus indicators must not be clipped by overflow or placed outside the accessible viewport.

## States and interaction

| State or component | Required outcome |
| --- | --- |
| Link | Clear destination and ordinary keyboard behavior; readable text and an underline where needed to identify the link. |
| Action | Native button semantics and a label describing the action. Strong visual weight alone does not explain what activation does. |
| Hover or transient press | An immediate static cue remains visible; the reference adds a **3px text underline** during press. Optional displacement supplements that cue. Hover is never required to discover or operate a control. |
| Selected card or toggle | Visible Selected text or another clear static mark, plus the correct programmatic state. The reference uses **Selected** text, a **2px inset Ink outline** and `aria-pressed` on selectable buttons; a different widget needs its own appropriate semantics. |
| Focus | Visible, immediate and independent of hover or selection. Keep the outline clear of shadows, adjacent controls and clipping. |
| Input and validation | Associated label, readable opaque field, useful error text and relevant programmatic invalid state. Do not convey an error solely through border color or a shake. |
| Disabled or unavailable | Native disabled semantics where appropriate, readable explanation and no misleading hover/press feedback. |
| Pending and result | Report the actual operation and outcome promptly. No bounce, shadow movement or color flash stands in for confirmation, saving or failure. |

A toggle's persistent selected state and a button's temporary pressed state are different. Do not apply `aria-pressed` to an ordinary submit action merely to obtain the style. Reset transient press feedback on release, cancellation or lost pointer contact. Selection, labels and focus update immediately even when optional animation is disabled or interrupted.

The reference targets at least **44px** control height as an Atlas usability choice. [WCAG 2.2 Target Size (Minimum), SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) specifies **24 by 24 CSS pixels** with defined exceptions and spacing conditions; 44px height alone is not a complete target-size assessment. Check actual width, spacing, zoom and pointer access.

The Fieldnotes Studio idea-board specimen illustrates local interactions. Its settings and fictional content are demonstrations rather than a production product contract. [Preview notes](preview/README.md) define its exact actions and recovery behavior. A consuming product retains its own validation, state ownership, save/retry and authorization behavior.

## Appearance and fallbacks

Support **Light, Dark and System** through the consuming project's appearance model. System follows live system changes. The light and dark palettes retain their authored theme roles; a hard shadow can use light Ink on a dark surface. A style change must not silently replace an explicit appearance choice.

Keep a readable static baseline when scripts fail or are absent. Native content, links and disclosures should remain available. Explain any unavailable custom specimen controls. Do not hide content until theme initialization or animation completes; use safe defaults when stored settings are blocked or malformed.

Under **forced colors**, use opaque system surfaces and system foreground/boundary/focus colors. Remove decorative shadows, backgrounds, transforms and transitions; keep visible control boundaries, focus and selected text/marks. Permit the user agent to apply its palette instead of opting out broadly with `forced-color-adjust: none`. The hard-shadow aesthetic is optional when user colors require a simpler form.

The reference's optional motion is **off by default**; when enabled it uses **100ms ease-out** on transform and box-shadow only. Under **reduced motion**, remove optional transitions and translation while retaining static pressed/selected cues. Handle preference changes during use. [Motion guidance](motion.md) is needed only when introducing motion. A surface without movement is still a complete implementation.

## Contrast and evidence boundary

Apply [WCAG 2.2 text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): at least **4.5:1** for ordinary text and **3:1** for qualifying large text, subject to the criterion's definitions and exceptions. Check labels, placeholder text, muted copy, validation and every allowed action fill. A thick stroke cannot compensate for an insufficient text/background contrast ratio.

Check visual information needed to identify controls, states and meaningful graphics against adjacent colors using [Non-text Contrast, SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), generally **3:1** with its defined exceptions. Decorative shadows do not automatically serve as identifying control boundaries. Check focus against the actual neighboring surfaces and verify selected marks on their fills. A 2px Ink border is a recipe choice rather than proof of conformance.

Test both appearances, System changes, keyboard operation, pointer cancellation, pressed and selected states, narrow reflow, text zoom, reduced motion, forced colors and script failure. Profile color calculations and desktop screenshots establish only their recorded conditions. They do not validate every component, remote outcome, screen-reader flow, real device or entire consuming theme. Record actual checks and remaining limitations in [validation.md](validation.md); retain **draft** status until the relevant project gates are met.
