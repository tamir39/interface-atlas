# Swiss — design specification

Revision: `0.1.0-draft`. Source snapshot: `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`.

Values marked **source** are retained from Tamir's inspected Swiss implementation. Portable scales, grid recommendations, component conventions, stronger control borders, semantic foregrounds, and compact options are **Atlas proposals**. [Sources and credits](sources.md) identifies the exact files and reference roles.

## Color tokens

| Role | Light | Dark | Basis |
| --- | --- | --- | --- |
| Page | `#fafaf7` | `#171716` | Source |
| Surface | `#eeeee8` | `#2b2a27` | Source |
| Panel | `#ffffff` | `#20201e` | Source |
| Text | `#181816` | `#faf6ed` | Source |
| Muted text | `#5b5b53` | `#c3beb4` | Source |
| Decorative accent | `#b52e21` | `#ff8978` | Source |
| Action | `#b52e21` | `#ff8978` | Source |
| Action hover | `#942319` | `#ffa999` | Source |
| On action | `#ffffff` | `#35160f` | Source |
| Decorative divider | `#c9c9bf` | `#55534d` | Source |
| Selection | `#f2c9bf` | `#6a3830` | Source |
| Success | `#346348` | `#a7d2b4` | Source |
| On success | `#ffffff` | `#14251a` | Source; shared appearance value |
| Note | `#fff0ad` | `#e6d7a9` | Source |
| On note | `#43371b` | `#302715` | Source |
| Control border | `#76766c` | `#97948a` | Atlas proposal |
| Warning foreground | `#735000` | `#efd18a` | Atlas proposal |
| Danger foreground | `#962b32` | `#ffb4c1` | Atlas proposal |
| Information foreground | `#234c78` | `#a8c9ff` | Atlas proposal |

Page is the base; surface supports secondary regions; panel groups content where a separate surface is useful. Prefer alignment and rules over a card around every element. Action and on-action form an explicit button pair. Reserve red emphasis for important actions and selected expressive details so it does not overwhelm hierarchy.

Muted text remains readable supporting text. Decorative dividers have insufficient contrast to serve as the sole necessary input boundary; use the proposed control border when a boundary identifies a control. An ornamental rule does not need to become a control boundary.

Warning, danger, and information are foreground colors on the verified page, surface, and panel backgrounds. They do not specify filled buttons or badges. Use a textual status and optional icon; color supplements meaning. A red action does not imply danger, and a destructive action needs explicit wording and its own verified state treatment.

Pair success with on-success for a filled success region, and note with on-note for a note. Selection indicates text selection or a selected item with explicit semantics. Recheck any different background, opacity, compositing, image, or blend.

## Typography and hierarchy

**Source families:** Manrope for body text, controls, and expressive Swiss headings; JetBrains Mono 400/500 for short code, indexes, and technical identifiers. The source globally also loads DM Serif Display for other themes; that does not make it a Swiss default.

The pinned source loads Latin and Vietnamese for Manrope and Latin for JetBrains Mono. Verify the actual selected package, language coverage, fallback, and weight availability for each project. The preview names these families but ships no font files.

**Source observation:** the portfolio's Swiss hero uses Manrope 800 with `-0.075em` tracking, and selected project titles use `-0.055em`. These are specific source selectors, not portable body or control typography. Atlas proposes milder display tracking and normal tracking in reading and interface text.

| Role | Proposed family and weight | Size | Line height |
| --- | --- | --- | --- |
| Display | Manrope 800 | `clamp(2.5rem, 7vw, 6rem)` | `1.02` |
| Page heading | Manrope 700 | `clamp(2rem, 4vw, 3.5rem)` | `1.1` |
| Section heading | Manrope 700 | `1.5rem` | `1.25` |
| Card heading | Manrope 700 | `1.125rem` | `1.35` |
| Body | Manrope 400 | `1rem` | `1.6` |
| Introduction | Manrope 400 | `1.125rem` | `1.6` |
| Labels and supporting text | Manrope 400–600 | `0.875rem` | `1.5` |
| Code or short identifier | JetBrains Mono 400/500 | `0.875rem` | `1.5` |

Use display tracking around `-0.03em`; section and card headings may use up to `-0.02em`. Leave body and controls at normal tracking. Selected short indexes may be uppercase with modest positive tracking; do not set paragraphs or long labels in uppercase.

Make size and weight differences purposeful. A page has one primary heading and continuous semantic heading levels. Keep prose around 60–70 characters per line. Use tabular numerals for aligned counts, durations, and numeric columns. Monospace is a role, not a replacement for readable body text.

## Spacing and layout

**Proposed scale:** 4, 8, 12, 16, 24, 32, 48, 64, and 96px.

- Label to control: 8px; related controls: 12–16px.
- Panel padding: 24px comfortable or 16px compact.
- Major sections: 48–96px according to reading and task density.
- Typical content maximum: 1200px; reading columns remain narrower.
- Gutters: 24px on small screens, 40px when space permits.

Align headings, prose, images, captions, and actions to shared starting edges. A proposed grid may use 12 columns on wide screens, 8 on medium screens, and 4 on small screens, with content spanning several columns. These counts are Atlas options, not a universal historical Swiss rule or a transcription of the source portfolio. The number of rendered columns and breakpoint values must follow actual content fit. Begin with a readable single column and add columns only when they help.

Asymmetric composition can balance a large heading with a narrow description or an index with wider detail. Preserve the same logical DOM order on every screen. Do not reorder a control visually away from the content it operates. Wrap long names and identifiers; contain a genuinely wide table in a labeled, keyboard-accessible scroll region instead of overflowing the whole page.

Compact density is a project adaptation: proposed body text 14px for short review metadata, 16px for extended reading, 16px panel padding, 12–16px related-group spacing, and at least 44px control areas. Keep the source 2px geometry and flat surfaces. Density changes must not remove labels, state explanations, or recovery actions.

## Geometry and elevation

**Source:** card radius 2px; control radius 2px; resting shadow `none` in both appearances. Source Swiss accents include 3–5px structural rules, flat panels, and an unrotated profile surface.

Keep panels and controls nearly square, with meaningful boundaries and visible spacing. Use a stronger rule sparingly to begin an important region. Small decorative rules do not substitute for headings or status labels. Avoid adding soft shadows, glass, bevels, and rounded capsules as incidental polish; document any deliberate departure in the project's design document.

The source's optional project hover translates horizontally and adds an offset accent edge. This is an interaction effect, distinct from its shadow-free resting geometry. It is not selected for the reference preview. See [effects.md](effects.md) and [motion.md](motion.md) for optional behavior and fallback.

## Component behavior

| Component | Proposed rule |
| --- | --- |
| Primary action | Action/on-action pair, action-hover feedback, 2px radius, stable dimensions, clear label, visible focus. |
| Secondary action | Panel or transparent surface, text foreground, stronger boundary where needed. |
| Prose link | Persistent underline or another explicit non-color cue; meaningful destination wording. |
| Navigation | Current location has textual or semantic identification plus a visible marker; selected color alone is insufficient. |
| Input | Visible associated label, panel background, text foreground, proposed control border, and nearby recovery information. |
| Content index | Shared title/metadata alignment; each destination has a distinct label and touch area. |
| Disclosure | Native summary and detail semantics, visible expanded state, reachable by keyboard. |
| Status | Text plus optional icon on a verified neutral surface; preserve separate lifecycle, attention, and connection meaning. |
| Table | Semantic headers, text aligned to the reading direction, numeric values aligned for comparison, contained overflow. |
| Dialog | Content-sized within the viewport; visible actions, accessible name, managed focus, and a clear dismissal path. |

Define default, hover, focus, pressed or selected, unavailable, and pending states where relevant. Pending copy such as “Saving…” explains what is happening without changing the control's position. Preserve existing information while updates arrive; a visual theme does not authorize backend commands.

Associate errors with fields, explain unavailable actions visibly when the reason matters, and keep recovery close to the problem. Do not hide essential text only in hover tooltips. For a review queue, record selected-item context, focus transfer, filtering behavior, and confirmation requirements in the project design document.

## Appearance and accessibility

Support light, dark, and system preferences. Apply a saved preference before paint where possible, follow live system changes when system is selected, and preserve essential content if storage or initialization fails.

**Source global focus:** 3px outline using text, offset 5px; forced colors uses `Highlight`. Leave enough space to prevent clipping and inspect contrast against adjacent surfaces.

Use native controls and landmarks, visible labels, a useful skip link, and logical keyboard order. A 44px touch area is an Atlas comfort target, not a claim about WCAG's minimum. Check reflow, text resizing, native browser zoom, keyboard use, screen-reader information, and actual AA contrast in each implemented project.

Essential content must remain visible without motion or JavaScript. Optional effects cannot block text selection, scrolling, focus, touch, or navigation. [Motion rules](motion.md) and [effect rules](effects.md) define immediate fallbacks.

## Numerical contrast record

Calculated on 2026-10-13 from opaque sRGB relative luminance, without alpha compositing:

| Pair | Light | Dark |
| --- | --- | --- |
| Text on page | 17.00:1 | 16.63:1 |
| Muted text on surface | 5.88:1 | 7.75:1 |
| On-action on action | 6.22:1 | 7.15:1 |
| On-action on action-hover | 8.35:1 | 8.94:1 |
| On-success on success | 6.94:1 | 9.56:1 |
| On-note on note | 10.17:1 | 10.27:1 |
| Proposed control border, minimum across page/surface/panel | 3.94:1 | 4.73:1 |
| Proposed warning/danger/information foregrounds, minimum across page/surface/panel | 6.27:1 | 8.52:1 |
| Decorative divider, minimum across page/surface/panel | 1.43:1 | 1.87:1 |

These calculations substantiate only the listed opaque pairs. They do not certify rendered components, all possible pairings, selected backgrounds, composited artwork, font rendering, or complete accessibility. Actual browser evidence belongs in [validation.md](validation.md).
