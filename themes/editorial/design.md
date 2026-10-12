# Editorial — design specification

Revision: `0.1.0-draft`. Source snapshot: `166f44091a58a68d74096bc44defceb99243ba4e`.

Values marked **source** are extracted from the inspected Editorial implementation. Typography scales, spacing, general component rules, compact adaptations, and the additional border/status colors are **Atlas proposals**. Sources and creator credits are recorded in [sources.md](sources.md).

## Color tokens

| Role | Light | Dark | Basis |
| --- | --- | --- | --- |
| Page | `#fbf8f5` | `#19151e` | Source |
| Surface | `#eee8f2` | `#2d2536` | Source |
| Panel | `#ffffff` | `#231e2b` | Source |
| Text | `#332b49` | `#f4ede5` | Source |
| Muted text | `#655c7e` | `#c2b2ce` | Source |
| Decorative accent | `#75618d` | `#c7abe8` | Source |
| Action | `#493b61` | `#c7abe8` | Source |
| Action hover | `#65527e` | `#dbc4f3` | Source |
| On action | `#ffffff` | `#24182f` | Source |
| Decorative divider | `#d8cfe0` | `#50445e` | Source |
| Selection | `#d8c9ed` | `#59416e` | Source |
| Success | `#346348` | `#9ecead` | Source |
| On success | `#ffffff` | `#14251a` | Source |
| Note | `#fff0ad` | `#d8c58c` | Source |
| On note | `#43371b` | `#302715` | Source |
| Control border | `#8c7d9b` | `#9c87af` | Atlas proposal |
| Warning foreground | `#7a4b12` | `#f0c27b` | Atlas proposal |
| Danger foreground | `#9e3349` | `#ffb4c1` | Atlas proposal |
| Information foreground | `#3d587f` | `#a8c9ff` | Atlas proposal |

Use page as the base and panels for meaningful groups, rather than placing every element inside a card. Surface supports secondary regions. Accent decorates selected expressive text or details; action and on-action form an explicit foreground/background pair.

Muted text remains readable supporting text. Decorative dividers cannot be the sole boundary identifying an input or control; use the proposed stronger control border where that boundary is necessary.

Warning, danger, and information colors are foregrounds for text and icons on page, surface, or panel. Their values do not define filled badges or buttons. Pair every status with a textual label and, where useful, an icon. Recheck any alternative background, opacity, image, or blend.

Selection indicates user text selection or an explicitly selected item, not an unexplained status. When using the source note treatment, pair note with on-note. When using success as a filled background, pair it with on-success.

## Typography and hierarchy

**Source font families:** Manrope for body text, controls, and most headings; DM Serif Display 400 normal or italic for selected expressive text; JetBrains Mono 400/500 for short code and identifiers.

The source font configuration loads Latin and Vietnamese for Manrope and Latin for the other two families. Verify actual glyph coverage and fallback behavior for each project's languages. Preserve the correct font package notices if font files are redistributed.

**Proposed portable scale:**

| Role | Family and weight | Size | Line height |
| --- | --- | --- | --- |
| Display | Manrope 500; optional DM Serif Display 400 accent | `clamp(2.5rem, 6vw, 5rem)` | `1.08` |
| Page heading | Manrope 600 or DM Serif Display 400 | `clamp(2rem, 4vw, 3rem)` | `1.15` |
| Section heading | Manrope 600 | `1.5rem` | `1.3` |
| Card heading | Manrope 600 | `1.125rem` | `1.4` |
| Body | Manrope 400 | `1rem` | `1.65` |
| Introduction | Manrope 400 | `1.125rem` | `1.6` |
| Labels and supporting text | Manrope 400–600 | `0.875rem` | `1.5` |

This scale is an Atlas adaptation, not a transcription of every portfolio heading. Moderate display tracking to at most `-0.02em`; keep body tracking normal. Do not apply tightly tracked hero styling to controls or dense data.

Follow semantic heading order and choose sizes by content role. Keep reading passages around 60–70 characters per line. Use tabular numerals for aligned data, durations, and counts. Monospace is a role-specific accent, not the default body typeface.

## Spacing and layout

**Proposed scale:** 4, 8, 12, 16, 24, 32, 48, 64, and 96px.

- Label to control: 8px.
- Related controls: 12px.
- Card groups: 16–24px.
- Major sections: 48–96px, selected according to content density.
- Panel padding: 24px by default; 16px in constrained regions.
- Content width: 1120px maximum for a typical comfortable site.
- Page gutters: 24px on small screens, 40px when room permits.

Start with one column and introduce columns when the content comfortably fits. The DOM reading order must match the intended visual order. Wrap long identifiers or provide explicit full-value access. Place necessary data overflow inside a labeled, discoverable scrolling region rather than allowing the entire page to overflow.

Projects may define a compact adaptation with smaller geometry and spacing for dense workflows. Record those overrides in the project's design document; they are not source defaults.

## Geometry and elevation

**Source:** card radius 24px; control radius 999px.

**Source light shadow:** `0 16px 40px -28px #493b6155`.

**Source dark shadow:** `0 20px 45px -24px #00000099`.

Use the source shadow selectively on meaningful raised panels. Avoid adding shadows to every nested group. A 12px radius for inputs and nested controls is an Atlas proposal for predictable text-entry geometry. Compact card and control radii must be stated as project adaptations.

## Component behavior

| Component | Proposed rule |
| --- | --- |
| Primary action | Use action/on-action; hover uses action-hover with the same foreground. Preserve a visible focus treatment and stable dimensions. |
| Secondary action | Panel or transparent background, primary text, and a sufficiently visible boundary where needed. |
| Prose link | Underline or another persistent non-color cue; keep hover and focus discoverable. |
| Input | Visible associated label, panel background, text token, and proposed control border. |
| Card | Group related content; a card is not automatically an interactive element. |
| Status | Text plus optional icon on a verified neutral background; color supplements meaning. |
| Dialog | Width follows its content and viewport; actions remain visible and focus is managed. |
| Table | Semantic headers, appropriately aligned values, and discoverable contained overflow. |

Define default, hover, focus, pressed or selected, unavailable, and pending states wherever relevant. Use explicit pending labels such as “Saving…” rather than relying on a spinner. Keep geometry stable during pending updates.

Associate field errors with their inputs and place recovery information near the field. Explain unavailable actions visibly when their reason matters. Do not put essential explanations only inside hover tooltips.

## Appearance and accessibility

Support light, dark, and system choices. Apply the saved choice before paint where possible, follow live system changes when system is selected, and preserve essential content if storage or initialization is unavailable.

**Source focus treatment:** 3px outline using the text token, with a 5px offset. Prevent clipping, verify contrast against adjacent surfaces, and use an appropriate system color in forced-colors mode.

Use native controls, landmarks, a skip link where needed, visible labels, and a logical keyboard sequence. Aim for 44px touch areas as an Atlas comfort target; this is not presented as the WCAG minimum. Verify zoom, reflow, keyboard interaction, screen-reader information, and actual AA contrast in the implemented project.

Essential content is visible without motion. Follow [motion.md](motion.md) for animation and [effects.md](effects.md) for optional decoration.

## Numerical contrast record

Calculated on 2026-10-13 using opaque sRGB relative luminance, without alpha compositing:

| Pair | Light | Dark |
| --- | --- | --- |
| Text on page | 12.54:1 | 15.50:1 |
| Muted text on surface | 5.16:1 | 7.38:1 |
| On-action on action | 10.09:1 | 8.36:1 |
| Proposed control border, minimum across page/surface/panel | 3.16:1 | 4.55:1 |
| Proposed warning/danger/information foregrounds, minimum across page/surface/panel | 5.77:1 | 8.72:1 |

These calculations substantiate the listed opaque token pairs. They do not certify rendered components, translucent effects, hover states, every possible pairing, font rendering, or complete accessibility.
