# Play — design specification

Revision: `0.1.0-draft`. Reviewed: **2026-10-13**.

**Source observation** means a value or behavior inspected in the pinned Tamir portfolio. **Atlas proposal** means a portable rule or reference-preview choice added here. Every new type scale, spacing value, layout, component contract, and state behavior below is an Atlas proposal unless marked otherwise. [Sources and credits](sources.md) records source files, reference roles, and reuse limits.

## Color tokens

Retain the observed source palette. Shared root values inherited by the Play light selector are identified explicitly; dark values come from Play's dark selector unless noted.

| Role | Light | Dark | Basis |
| --- | --- | --- | --- |
| Page | `#fff9e9` | `#1c122c` | Source |
| Panel | `#ffffff` | `#281b3b` | Source; light inherited |
| Surface | `#f0e4ff` | `#342248` | Source |
| Tint A | `#f0e4ff` | `#382449` | Source; light matches surface, dark is distinct |
| Tint B | `#e3f0d4` | `#253529` | Source |
| Tint C | `#ffe4cd` | `#463027` | Source |
| Text / focus | `#2b203d` | `#fff4dc` | Source ink; focus uses ink |
| Muted text | `#665572` | `#d2bde3` | Source |
| Accent | `#6331a7` | `#c6a0ff` | Source |
| Primary action | `#6331a7` | `#e7ef98` | Source |
| Action hover | `#4d2485` | `#f1f6b7` | Source |
| On action | `#ffffff` | `#242515` | Source; light inherited |
| Decorative divider | `#c4abc9` | `#614775` | Source theme-line |
| Control border | `#80658d` | `#b29ac7` | Atlas proposal |
| Selection | `#dfc4fa` | `#664686` | Source |
| Success foreground / fill | `#346348` | `#a8d9ad` | Source; light inherited |
| On success | `#ffffff` | `#14251a` | Source shared appearance values |
| Warning foreground | `#765400` | `#f1d57c` | Atlas proposal; dark matches source note fill |
| Danger foreground | `#9d2438` | `#ffb7c5` | Atlas proposal |
| Information foreground | `#254b86` | `#b1cfff` | Atlas proposal |
| Note fill | `#ffe69c` | `#f1d57c` | Source |
| On note | `#43371b` | `#352509` | Source; light inherited |
| Emblem fill | `#f5da78` | `#e7ef98` | Source emblem selectors |
| Decorative display underline | `#edbe39` | `#edbe39` | Source Play hero accent selector |

The **accent and action are separate roles**, especially in dark appearance: the purple accent does not replace the pale primary-action fill. Use the action/on-action pair for primary controls and ordinary ink for reading. Use tinted surfaces to distinguish a few useful regions; their color alone must not identify a project, category, or state.

The source divider is decorative and falls below the necessary-boundary target on some listed surfaces. Use the proposed control border where an input boundary identifies the control. Semantic foreground proposals are calculated on the retained page, panel, surface, and tints; a project must check any new badge fill or alpha layer separately. Accompany status with meaningful text and an optional recognizable marker.

**Selected-background limits:** source muted text on selection is **4.32:1 light / 4.35:1 dark**, below the ordinary-text target. Source dark accent on selection is **3.54:1**. Atlas therefore proposes ordinary text ink and underlined ink links on selected surfaces, plus explicit selected semantics. Do not carry a general muted/colored-link rule into selection. The proposed dark control border is **2.99:1** on selection; use an ink marker or check a dedicated selected boundary instead. Text-on-selection and control-border-on-neutral checks are separate.

The yellow display underline and small emblem are expressive decoration, not status or the sole sign of a link. A display underline on static heading text does not change its semantic role.

## Typography and hierarchy

**Source observation:** Play uses the configured Manrope sans family for both ordinary and formerly editorial text; the Play selector removes the italic serif treatment. Its hero is 800 weight with `-0.065em` tracking, an underlined accent line, and a large shared responsive scale. Project headings use 700 weight and `-0.06em` tracking. JetBrains Mono is configured at 400/500 weights for short technical roles.

**Atlas proposal:** use Manrope for readable interface text, with a small JetBrains Mono role for indexes or identifiers. Moderate display tracking and a portable scale keep the source hero's treatment from spreading to controls and body text.

| Role | Proposed family / weight | Size | Line height | Tracking |
| --- | --- | --- | --- | --- |
| Portfolio display | Manrope 800 | `clamp(3.5rem, 8.1vw, 8.75rem)` | `0.95` | `-0.035em` |
| Major section heading | Manrope 700/800 | `clamp(2rem, 4.2vw, 3.75rem)` | `1.04` | `-0.025em` |
| Card / detail heading | Manrope 700/800 | `1.75rem` | `1.15` | `-0.02em` |
| Body / extended reading | Manrope 400 | `1rem` | `1.6` | Normal |
| Label / short supporting text | Manrope 400/600 | `0.875rem` | `1.5` | Normal |
| Text input | Manrope 400 | `1rem` | `1.5` | Normal |
| Short index / technical value | JetBrains Mono 400/500 | `0.875rem` | `1.5` | Normal |

The portfolio display is a deliberate expressive choice. Use a smaller project-specific heading scale in working forms and learning tasks; controls do not need the portfolio display size. Keep a single main heading and continuous semantic levels. Sentence case suits actions and reading. A short uppercase index may be decorative supporting text.

Prose measure: about **65 characters**. Avoid tight tracking in paragraphs, errors, labels, or identifiers. Allow long names and translated labels to wrap. Use tabular numerals for comparable data. A preview-specific 12px monospace eyebrow or sticker label is limited to short decorative supporting text; meaningful form labels remain 14px, and body/input text remains 16px.

The preview names the families but contains no font files or remote font loading. Intended Manrope/JetBrains Mono rendering requires a separate check of installed or vendored versions, weights, scripts, wrapping, and fallback. Manrope's source setup requests Latin and Vietnamese; the source mono setup requests Latin. Those choices are observations, not a promise of every project's language coverage.

## Spacing, density, and layout

All rules in this section are **Atlas proposals**.

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, and 64px.
- Comfortable is the default: 24px panel padding. Compact adaptation uses 16px in selected component specimens.
- Keep labels 8px from their controls, related controls 12–16px apart, and independent regions 24–32px apart.
- Body text remains 16px, form labels 14px, text inputs 16px, and action areas at least 44px in both densities.
- Begin with 16px outer gutters; increase to 24px when content permits. A typical proposed content maximum is 1280px.
- Share starting edges for headings, project text, form labels, and actions. Add columns when both content regions retain readable widths.

A portfolio can use a large introduction followed by a small project grid and readable case-study disclosures. A creative task can put input beside a persistent review region when space permits. Their ordering follows the task; the theme does not prescribe one universal page grid.

The reference preview keeps portfolio cards and the brief builder at 24px base padding, with a responsive 20px adaptation at widths up to 384px. Its density selector changes component-card and table-cell padding only, from 24px to 16px. Its composition selects a 1296px content maximum and 40px desktop outer gutters, falling to 20px at widths up to 672px and 16px at widths up to 384px. These are original preview choices, independent of specimen density. Compact mode does not shrink control areas or establish an operations-dashboard density.

On narrow screens, use one column in meaningful DOM order. Keep errors, review details, and the primary action close to their context. Wrap long input-derived values and preserve text at 200% resizing and zoom. A necessary wide table may use a labeled keyboard-focusable scrolling region; ordinary content must not force page-wide horizontal scrolling.

## Geometry and elevation

**Source observation:** panel radius is **30px** and control radius **14px**. The theme shadow token is `4px 5px 0 #2b203d` in light appearance and `4px 5px 0 #0c0612` in dark. Source Play primary buttons use an additional 3px/3px ink shadow. Project cards and lab cards use ink boundaries; a source profile backing tilts 2 degrees.

**Atlas proposal:** retain 30px/14px radii and hard offset panel shadows for selected expressive surfaces. Use a firm ink boundary to connect the fill and shadow. Keep form labels, inputs, body text, and action rows level. Avoid placing a shadow on every nested region; one primary surface can carry the tactile treatment.

Static stickers, simple original shapes, and a small decorative tilt may support a portfolio. Contain them outside essential copy and input areas, mark purely decorative content appropriately, and preserve visible focus. [Effects.md](effects.md) defines optional scope and acceptance checks.

## Components and task states

The following contracts are **Atlas proposals**.

| Component | Proposed behavior |
| --- | --- |
| Primary action | Verified action/on-action pair, meaningful verb, 14px radius, at least 44px area, stable layout, and visible focus. |
| Secondary action | Readable ink on a neutral or verified tinted surface, with a visible necessary boundary. |
| Project card | Useful heading and description; an explicit case-study destination or native disclosure. Keep independent links independently operable. |
| Input | Visible associated label, 16px input text, proposed control border, help connected to the field, and nearby corrective error text. |
| Option group | Visible group label, native controls, and text identifying the selected value. Color is supplementary. |
| Disclosure | Prefer native details/summary for optional case evidence. Its open state and contents must remain usable without animation. |
| Review | Show a stable snapshot of the submitted input, the scope, and what confirmation would request. Provide an explicit edit action. |
| Pending request | Persistent textual state and relevant context. Avoid repeated confirmation and do not represent a request as successful execution. |
| Status | Meaningful text and optional marker on checked surfaces; explain whether it describes a local preview, request, acknowledgement, or real outcome. |

Define default, hover, focus, pressed/selected, unavailable, pending, failure, and completed states as appropriate. Do not make supporting text unreadable when its associated control is disabled. Errors explain what to correct and preserve entered data.

**Proposed brief workflow:** editing → validation → review → request pending → acknowledgement. Client-side checks are feedback, not server-side trust. Put understandable errors near the relevant inputs and provide deliberate focus to the error or review context, informed by [W3C WAI form guidance](https://www.w3.org/WAI/tutorials/forms/notifications/). Keep the reviewed snapshot stable; returning to edit should preserve draft input.

The reference preview manually advances a fictional request after review. It sends no network request, starts no agent, and does not persist brief contents across reloads. A request and its manual demonstration acknowledgement have distinct text. Editing after the local receipt preserves draft input and clears the current receipt/snapshot before a new review; this demonstrates no remote versioning or undo. Real projects must define authority, server validation, duplicate protection, recovery, audit records, and backend acknowledgement in their own contract, using relevant [Agent Experience guidance](../../knowledge/agent-experience.md).

## Appearance and accessibility

**Source observation:** the global focus outline is **3px ink with 5px offset**, changing to system `Highlight` under forced colors. The portfolio has additional local focus styles; this package retains the global dimensions as its reference-preview focus treatment.

**Atlas proposals:** support light, dark, and system appearance; apply saved preferences before paint where possible and follow live system changes when system is selected. Invalid or unavailable storage retains usable defaults. Honor OS reduced motion from first paint and keep content/state changes immediate under reduced motion or motion-off.

Use native landmarks, a useful skip link, associated labels, logical focus order, readable state text, and underlined prose links. Preserve keyboard access and text selection. A 44px area is a comfort target selected by Atlas, not a claim about the WCAG minimum. Check actual focus adjacency and clipping, forced colors, narrow reflow, 200% text resizing, zoom, and screen-reader information in the project.

## Numerical contrast record

Calculated on **2026-10-13** from opaque sRGB relative luminance, without alpha compositing. The six checked backgrounds are page, panel, surface, tint A, tint B, and tint C.

| Pair | Light | Dark |
| --- | --- | --- |
| Text on page | 14.51:1 | 16.40:1 |
| Text, minimum on six backgrounds | 12.52:1 | 11.23:1 |
| Muted text, minimum on six backgrounds | 5.55:1 | 7.08:1 |
| Accent, minimum on six backgrounds | 6.82:1 | 5.77:1 |
| On-action on action | 8.31:1 | 12.73:1 |
| On-action on action-hover | 11.01:1 | 13.78:1 |
| Proposed control border, minimum on six backgrounds | 4.14:1 | 4.87:1 |
| Focus ink, minimum on six backgrounds | 12.52:1 | 11.23:1 |
| Success/warning/danger/information, minimum on six backgrounds | 5.67:1 | 7.49:1 |
| On-success on success fill | 6.94:1 | 10.08:1 |
| On-note on note fill | 9.47:1 | 10.25:1 |
| Text on selection | 9.74:1 | 6.90:1 |
| Muted text on selection — ordinary-text failure | 4.32:1 | 4.35:1 |
| Accent on selection — dark ordinary-text failure | 5.31:1 | 3.54:1 |
| Proposed control border on selection — dark boundary failure | 3.22:1 | 2.99:1 |
| Decorative divider, minimum on six backgrounds | 1.72:1 | 1.56:1 |

These calculations substantiate only these opaque pairs. They do not certify rendered components, alpha layers, artwork, every selected-state composition, disabled appearance, font rendering, or complete accessibility. Different fills, shadows used as boundaries, and new semantic badge surfaces need their own checks. Actual browser evidence and its limits belong in [validation.md](validation.md).
