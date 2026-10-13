# Blueprint — design specification

Revision: `0.1.0-draft`. Source snapshot: `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`.

**Source** identifies inspected Blueprint values, including explicitly noted shared values. **Atlas proposal** identifies portable typography/layout, stronger boundaries, semantic foregrounds, selected-state restrictions, and the local architecture inspector. Credits and pinned files are in [sources.md](sources.md); rendered checks belong in [validation.md](validation.md).

## Color tokens

| Role | Light | Dark | Basis |
| --- | --- | --- | --- |
| Page | `#f3f7ff` | `#0c1528` | Source |
| Surface | `#e4edff` | `#182b48` | Source |
| Panel | `#ffffff` | `#12213a` | Source; light inherits shared panel |
| Text / ink | `#142e61` | `#e7f0ff` | Source |
| Muted text | `#46618d` | `#aabbda` | Source |
| Accent | `#1644b8` | `#8ab7ff` | Source |
| Action | `#1644b8` | `#8ab7ff` | Source |
| Action hover | `#10358f` | `#a9cbff` | Source |
| On action | `#ffffff` | `#091d3c` | Source; light inherits shared foreground |
| Decorative divider | `#adc1e7` | `#3b5478` | Source |
| Tint A | `#e4edff` | `#182b48` | Source |
| Tint B | `#e5f0f6` | `#17303c` | Source |
| Tint C | `#edf0ff` | `#252b4c` | Source |
| Selected-item surface | `#c3d5ff` | `#294879` | Source component `--theme-selection` |
| Success | `#215c47` | `#9dd6bb` | Source |
| On success | `#ffffff` | `#14251a` | Source shared appearance foregrounds |
| Note | `#fff0ad` | `#c8d5fa` | Source; light inherits shared note |
| On note | `#43371b` | `#182745` | Source; light inherits shared foreground |
| Necessary control border | `#6680ac` | `#7292c3` | Atlas proposal |
| Warning foreground | `#79510a` | `#efd28a` | Atlas proposal |
| Danger foreground | `#a23148` | `#f2afbd` | Atlas proposal |
| Information foreground | `#1644b8` | `#8ab7ff` | Atlas proposal: semantic alias of source accent |

Use page as the base, panel for a useful grouping, and surface/tints selectively. A heading, alignment, and spacing can establish structure without boxing every region. Action/on-action is the explicit filled-action pair; accent does not imply that every blue mark is interactive.

Faint dividers, dashed construction lines, and grid overlays are decorative. Use the proposed control border where a boundary identifies an actionable region. Verify every adjacent background crossed by a necessary boundary or focus treatment.

Warning, danger, and information are **foreground roles** for text/icons on the six page, surface, panel, and tint backgrounds. They do not define filled statuses or buttons. Pair a status with a persistent readable label. Filled success and note treatments use their own on-success/on-note foregrounds.

The source selected-item token appears in a component selection layer; its light global text-selection rule separately uses shared lime. Applying the Blueprint selected-item surface to browser text selection is an **Atlas adaptation**, paired with ink. Keep useful text selectable.

On selected surfaces, use **ink labels, ink markers, ink boundaries where needed, and underlined ink links**. Light muted text falls below 4.5:1, dark accent narrowly falls below 4.5:1, and both proposed control borders fall below 3:1 there. Ink supporting text in both appearances keeps the rule portable. A persistent selected label or marker conveys selection independently of background color.

## Typography and hierarchy

**Source roles:** Manrope carries body/interface text and the shared hero base at weight 500 with line height 1.06. Blueprint overrides its hero size to `clamp(2.8rem, 5.5vw, 5.3rem)` and tracking to `-0.07em`; the accent span uses JetBrains Mono 400, normal style. Its small-screen override uses `clamp(2.5rem, 11vw, 3.2rem)`. A separate editorial utility maps to JetBrains Mono for Blueprint. Do not describe the source hero as uniformly mono.

The source loads Manrope Latin/Vietnamese and JetBrains Mono Latin at 400/500, with display swap. This configuration does not establish every selected project's glyph coverage or weight availability. Verify actual language samples and preserve the exact font-package notices if vendoring fonts.

**Proposed portable scale:**

| Role | Family / weight | Size | Line height |
| --- | --- | --- | --- |
| Display | JetBrains Mono 400 | `clamp(2.8rem, 5.5vw, 5.3rem)` | `1.15` |
| Page heading | JetBrains Mono 400–500 | `clamp(2rem, 4vw, 3.5rem)` | `1.2` |
| Section heading | JetBrains Mono 400–500 or Manrope 600 | `1.75rem` | `1.3` |
| Card heading | Manrope 600 | `1.125rem` | `1.4` |
| Body / reading | Manrope 400 | `1rem` | `1.65` |
| Introduction | Manrope 400 | `1.125rem` | `1.6` |
| Labels / supporting text | Manrope 400–600 | `0.875rem` | `1.5` |
| Text-entry controls | Manrope 400 | `1rem` | `1.5` |
| Short technical value | JetBrains Mono 400–500 | `0.875rem` | `1.5` |

The broader mono heading role and **no tighter than `-0.025em` display tracking** are Atlas proposals. Body tracking stays normal. Keep mono display styling out of paragraphs and ordinary controls; identifiers may use mono without turning the whole interface into code text. Long machine values wrap or receive a labeled scrolling region without truncating essential information.

Use a continuous semantic heading hierarchy and reserve visual prominence for actual content roles. The proposed reading measure is **65ch**, verified against the actual font. Use tabular numerals for aligned/changing values. Preserve text resizing and language fallback; inputs retain at least 16px text in the mobile adaptation.

## Spacing and layout

**Proposed scale:** 4, 8, 12, 16, 24, 32, 48, 64, and 96px.

- Label to control: 8px; related controls: 12px.
- Related content groups: 16–24px; major sections: 48–96px.
- Comfortable panel inset: 24px; compact specimen inset: 16px.
- Typical content maximum: 1120px; reading maximum: 65ch.
- Proposed gutters: 24px on small screens and 40px when room permits; adapt narrower screens to actual content fit.

Start with one column. Add columns when the actual labels and content fit, preserving DOM reading order. The source shared hero becomes two columns from 1024px; this observation is not a universal project breakpoint.

An architecture diagram is one representation of relationships, not the sole route to understanding them. Provide a readable outline and explicit relationship text. Use the same node collection and selection state across presentations. Keep nodes as native links or buttons; a fixed collection with no tree keyboard contract should not use tree roles.

The preview's comfortable studio and architecture workspace remain independent of density. Compact changes **only the neutral component specimen's inset from 24px to 16px**; typography, control targets, 8px/4px corners, and inspector layout retain their values. A project needing a broader compact profile records its separate adaptations.

Preserve long titles, names, and identifiers. A semantic relationship table that requires horizontal room belongs in a labeled keyboard-accessible scrolling region, while the whole page reflows. Recheck content order and focus at narrow widths and with enlarged text.

## Geometry and elevation

**Source panel radius:** `8px`. **Source control radius:** `4px`.

**Source light resting shadow:** `5px 5px 0 #1644b817`.

**Source dark resting shadow:** `5px 5px 0 #8ab7ff22`, explicitly overridden by Blueprint's dark appearance rule.

Offset shadows are low-alpha decoration, not evidence of control availability or separation. Use selectively and avoid stacking offsets around nested panels. The source's 24px grid and dashed geometry reinforce drafting character but need no animation.

Keep diagram nodes and controls predictable. A diagram connector conveying a meaningful relationship needs adequate contrast, an explicit label or text equivalent, and a diagram key where its styling has meaning. Decorative construction lines must remain distinguishable from meaningful connectors. See [effects.md](effects.md) for optional treatments.

## Components and inspection behavior

| Component | Proposed rule |
| --- | --- |
| Primary action | Action/on-action; hover uses action-hover. Maintain stable dimensions and clear focus. |
| Secondary action | Ink text, neutral background, and necessary border when the boundary conveys interaction. |
| Prose link | Persistent underline or equivalent non-color cue; selected-surface links use underlined ink. |
| Input / select | Visible associated label, neutral surface, readable value, and necessary boundary. Placeholder supplements the label. |
| Selected node | Persistent selected text or ink marker; ink label, supporting text, and boundary where needed. |
| Presentation choice | Native labeled control; preserves node identity and open detail. |
| Grid toggle | Native button with stable label and `aria-pressed`; only changes decoration. |
| Detail inspection | Explicit Inspect link, heading focus on open, and a route back to the originating node. |
| Relationship list | From/to/purpose stated in text, with a key for meaningful diagram notation. |
| Status | Persistent text plus an optional checked foreground/icon; no status by color alone. |
| Supporting brief | Native `details`/`summary` where suitable. |

Define default, hover, focus, pressed/selected, unavailable, pending, and error states when relevant. Explain unavailable actions when the reason matters. Pending/error states belong to actual product behavior; never invent fake loading or infrastructure telemetry to decorate the reference.

The original preview uses five fixed nodes in an illustrative project-design preparation pipeline. Diagram and outline share selection and content. Inspect focuses the chosen detail heading; return restores the matching Inspect link. Previous/next traverse the fixed collection, and reset restores the initial workspace. The relationship table remains available in both presentations. This is a **local architecture inspection example**: it generates no project document, starts no agent, invokes no model/tool, and represents no real infrastructure.

Atlas's diagram proposals are additionally informed by **Simon Brown's C4 diagram guidance** on clear titles/scopes, a key, and labeled relationships. The portfolio does not establish a C4 influence. The preview is not claimed to be a C4-compliant model, and no C4 example image is reproduced. A project chooses its notation based on actual modeling needs.

## Appearance and accessibility

Support Light, Dark, and System. Apply valid saved preferences before paint where possible; System follows live device appearance. Storage and initialization failure preserve usable defaults.

**Source global focus:** 3px ink outline with 5px offset; forced colors uses `Highlight`. Prevent clipping and verify contrast against every adjacent background, including selected nodes and diagram regions. Source dimensions do not establish complete rendered focus conformance.

Use native controls, landmarks, descriptive headings, a useful skip link, and logical keyboard order. The proposed comfortable touch target is **44px**; this is a usability target, not a statement of WCAG's minimum. Verify keyboard activation, return focus, text resizing, reflow, screen-reader names/states/announcements, and implemented contrast.

Essential content and relationships remain available without motion. Follow [motion.md](motion.md) for immediate reduced-motion behavior. Optional effects remain separate from meaningful inspection actions.

## Numerical contrast record

Calculated on **2026-10-13**, using opaque sRGB relative luminance without alpha compositing. “Six backgrounds” means page, surface, panel, tint A, tint B, and tint C; surface and tint A share a value in each appearance.

| Pair | Light | Dark |
| --- | --- | --- |
| Ink, minimum on six backgrounds | 11.21:1 | 11.98:1 |
| Muted, minimum on six backgrounds | 5.32:1 | 7.08:1 |
| Accent, minimum on six backgrounds | 6.99:1 | 6.74:1 |
| Proposed control border, minimum on six backgrounds | 3.40:1 | 4.33:1 |
| Source success, minimum on six backgrounds | 6.65:1 | 8.35:1 |
| Proposed warning/danger/information, minimum on six backgrounds | 5.82:1 | 6.74:1 |
| Decorative divider, minimum on six backgrounds | 1.54:1 | 1.78:1 |
| On-action on action | 8.23:1 | 8.22:1 |
| On-action on action-hover | 10.89:1 | 10.12:1 |
| On-success on success | 7.82:1 | 9.75:1 |
| On-note on note | 10.17:1 | 10.14:1 |
| Ink on selected-item surface | 8.96:1 | 7.97:1 |
| Muted on selected-item surface | **4.26:1 — fails 4.5:1** | 4.71:1 |
| Accent on selected-item surface | 5.59:1 | **4.48:1 — fails 4.5:1** |
| Proposed control border on selected-item surface | **2.72:1 — below 3:1** | **2.88:1 — below 3:1** |

The selected-surface failures motivate ink labels, markers, links, and any necessary boundary. Opaque calculations support only listed pairs; they do not validate alpha grid/shadow composites, every component state, intended font rendering, or complete accessibility. Read the separate validation record for browser evidence actually collected.
