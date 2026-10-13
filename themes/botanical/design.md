# Botanical — design specification

Revision: `0.1.0-draft`. Source snapshot: `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`.

**Source** identifies values extracted from the inspected Botanical implementation, including explicitly noted shared values. **Atlas proposal** identifies portable typography, layout, stronger control borders, semantic foregrounds, compact specimens, and reading-room behavior. Credits and pinned files are recorded in [sources.md](sources.md); rendered checks belong in [validation.md](validation.md).

## Color tokens

| Role | Light | Dark | Basis |
| --- | --- | --- | --- |
| Page | `#f6f5ed` | `#101d17` | Source |
| Surface | `#e5eadc` | `#23392c` | Source |
| Panel | `#ffffff` | `#192b21` | Source; light inherits shared panel |
| Text / ink | `#293d2f` | `#f3edda` | Source |
| Muted text | `#596550` | `#b7c9b6` | Source |
| Accent | `#386046` | `#abd0a1` | Source |
| Action | `#386046` | `#abd0a1` | Source |
| Action hover | `#294a34` | `#c6e0be` | Source |
| On action | `#ffffff` | `#14291a` | Source; light inherits shared foreground |
| Decorative divider | `#bbc7af` | `#425d48` | Source |
| Tint A | `#e5eadc` | `#243c2d` | Source |
| Tint B | `#e9e5d6` | `#343729` | Source |
| Tint C | `#f0e5d8` | `#3e3026` | Source |
| Selected-item surface | `#c7d6b9` | `#425d43` | Source `--theme-selection` |
| Success | `#346348` | `#afd4bc` | Source; light inherits shared success |
| On success | `#ffffff` | `#14251a` | Source shared appearance foregrounds |
| Note | `#e8e0ba` | `#d7cd9c` | Source |
| On note | `#3f452d` | `#30321d` | Source |
| Necessary control border | `#69795f` | `#8aab89` | Atlas proposal |
| Warning foreground | `#72530a` | `#e4ca85` | Atlas proposal |
| Danger foreground | `#943743` | `#f0b0b5` | Atlas proposal |
| Information foreground | `#2d5871` | `#abcbd8` | Atlas proposal |

Page is the base. Use panel and surface for meaningful grouping, and tints sparingly to connect related stories. A heading or section rule can provide structure without a card. Accent supports expressive details; action/on-action is the explicit filled-action pair.

Decorative dividers are gentle rules, not a sufficient sole boundary for every input or control. Use the proposed necessary control border wherever a boundary identifies an actionable region. Verify every adjacent color the boundary or focus indicator crosses.

The warning, danger, and information proposals are **foregrounds** for text/icons on the six page, surface, panel, and tint backgrounds. They do not define filled statuses or buttons. Pair statuses with persistent text and an optional icon. For filled success and note treatments, use their own on-success/on-note foregrounds.

The source selected-item token is used by a component selection layer. Its global text-selection rule separately uses a shared lime token. Applying the Botanical selected-item surface to user text selection is an **Atlas adaptation**, paired with ink. Keep useful text selectable.

On selected-item surfaces, use **ink labels, ink markers, and underlined ink links**. Muted text fails ordinary-text contrast in both appearances, dark accent fails ordinary-text contrast, and the proposed dark control border falls below 3:1 there. A border is not necessary when a persistent textual selected label and ink marker clearly convey the state. If a project needs a boundary on that surface, choose and verify a separate pair.

## Typography and hierarchy

**Source roles:** Manrope for body/interface text and most headings; Botanical's main hero selector uses DM Serif Display 400, `clamp(3.2rem, 6.1vw, 6rem)`, and `-0.045em` tracking. The source's smaller-screen hero override uses `clamp(2.8rem, 11.5vw, 3.5rem)`. Expressive accent text can use DM Serif Display italic. JetBrains Mono supports short code and identifiers.

The source loads Manrope's Latin/Vietnamese subsets, DM Serif Display's Latin subset at 400 normal/italic, and JetBrains Mono's Latin subset at 400/500. That configuration does not establish language coverage for every family or project. Verify actual glyphs and fallback behavior for each selected language; preserve exact font-package notices if redistributing font files.

**Proposed portable scale:**

| Role | Family / weight | Size | Line height |
| --- | --- | --- | --- |
| Display | DM Serif Display 400 | `clamp(3rem, 6vw, 6rem)` | `1.08` |
| Page heading | DM Serif Display 400 | `clamp(2rem, 4vw, 3.5rem)` | `1.15` |
| Section heading | DM Serif Display 400 or Manrope 600 | `1.75rem` | `1.3` |
| Card heading | Manrope 600 | `1.125rem` | `1.4` |
| Body / reading | Manrope 400 | `1rem` | `1.65` |
| Introduction | Manrope 400 | `1.125rem` | `1.6` |
| Labels / supporting text | Manrope 400–600 | `0.875rem` | `1.5` |
| Text-entry controls | Manrope 400 | `1rem` | `1.5` |

Use display tracking no tighter than `-0.025em` in this adaptation; body tracking stays normal. These scales and milder tracking are Atlas proposals, not copied source defaults. Keep serif display settings out of controls and dense data. Load the intended faces before relying on their wrapping or rhythm.

Follow a continuous semantic heading hierarchy, with visual hierarchy matching content roles. Reading measure is **65ch** as a proposal, checked against the actual font and viewport. Use tabular numerals for changing/aligned values. Preserve meaningful emphasis and text resizing across fallback fonts. Inputs retain at least 16px text in the mobile adaptation.

## Spacing and layout

**Proposed scale:** 4, 8, 12, 16, 24, 32, 48, 64, and 96px.

- Label to control: 8px; related controls: 12px.
- Related content groups: 16–24px; major sections: 48–96px.
- Comfortable panel padding: 24px; compact specimen padding: 16px.
- Typical site width: up to 1120px; reading width: 65ch.
- Page gutters: 24px on small screens and 40px when room permits; reduce only when a narrow viewport requires it.

Start with one column. Add columns when the actual content fits; preserve DOM reading order as the layout stacks. The source's shared hero uses a one-column title/intro sequence, then a two-column layout from 1024px. That source threshold is an observation, not a universal breakpoint for every project.

The preview's garden studio and reading room remain comfortable. Its density preference changes **only the neutral component specimen's insets** from 24px to 16px. Typography and organic geometry retain their comfortable values. Record any further compact rules in a project's own design document; they are adaptations, not a second source default.

Wrap long titles and identifiers. Keep essential article content in normal flow, with stable list/detail context during filtering. Necessary table overflow belongs in a labeled, keyboard-accessible scrolling region; the whole page should reflow at narrow widths.

## Geometry and elevation

**Source panel radius:** `32px 8px 32px 8px`.

**Source control radius:** `22px 6px 22px 6px`.

**Source light shadow:** `0 18px 35px -25px #293d2f55`.

**Source dark shadow:** `0 20px 45px -24px #00000099`, inherited from the shared dark appearance rule; Botanical has no separate resting dark-shadow override.

Use alternating corners where they strengthen identity, while keeping control hit areas predictable. The preview retains the source control corners for text entry. A project may select a 12px text-entry radius as an additional Atlas proposal. The compact specimen retains the panel/control radii and changes its inset to 16px; it does not change the studio or reading-room geometry. A project choosing smaller compact radii records those additional overrides separately.

Elevation is selective. Avoid nesting multiple shadows; use a verified boundary when separation matters. Source decorative emblem/orbit shapes and profile tilt are source observations, not mandatory component geometry. See [effects.md](effects.md) for optional treatments.

## Components and reading behavior

| Component | Proposed rule |
| --- | --- |
| Primary action | Action/on-action; action-hover on hover. Preserve stable dimensions and a visible focus treatment. |
| Secondary action | Ink text, neutral background, and necessary border when its boundary conveys interaction. |
| Prose link | Persistent underline or equivalent non-color cue; ink with underline on selected surfaces. |
| Input / select | Associated visible label, readable value, neutral surface, and necessary border. Placeholder supplements the label. |
| Card | Group related content. Put navigation in an actual link; expose separate actions without nested interactive targets. |
| Selected note | Persistent selected text or ink marker; ink supporting text and links on the selection surface. |
| Keep-note toggle | Stable visible label, native button, and `aria-pressed`; state changes supplement the label rather than replacing it. |
| Status | Persistent text, optional icon, and an appropriate checked foreground/background pair. |
| Disclosure | Native `details`/`summary` for supporting material where suitable. |
| Reading export | State what is included and where it goes; report preparation/request without claiming a completed browser download. |

Define default, hover, focus, pressed/selected, unavailable, pending, and error states where relevant. Use explanatory text for unavailable actions when the reason matters. Pending states keep dimensions stable and have a meaningful label. Field errors associate explanatory text with the field and provide a correction.

The original preview reading room contains four fixed design field notes. Search/topic filtering preserves ordering and the open article. Opening an article focuses its heading. Return restores the originating Inspect link if the row is visible; otherwise it preserves the filter and article, focuses search, and explains why the row is hidden. Keep-note toggles build a local, temporary reading list, which can be cleared and exported as Markdown. This is an Atlas example contract; it does not establish server saving, synchronization, an agent action, or AI generation.

## Appearance and accessibility

Support Light, Dark, and System. Apply a valid saved choice before paint where possible, follow live system changes when System is selected, and preserve usable defaults if storage or initialization fails.

**Source global focus:** 3px ink outline, 5px offset; forced-colors uses `Highlight`. Prevent clipping and verify contrast against every adjacent surface, including selected states. These dimensions are retained source decisions, not proof of a complete rendered focus audit.

Use native controls, landmarks, descriptive headings, a skip link where useful, and a logical keyboard sequence. The proposed comfortable touch target is **44px**; this is a usability target, not a statement of WCAG's minimum. Verify keyboard access, focus restoration, zoom/text resize, reflow, screen-reader names/states/announcements, and actual contrast in the implemented project.

Keep all essential content visible without motion. Follow [motion.md](motion.md) for immediate reduced-motion behavior and [effects.md](effects.md) for optional decoration.

## Numerical contrast record

Calculated on **2026-10-13**, using opaque sRGB relative luminance without alpha compositing. “Six backgrounds” means page, surface, panel, tint A, tint B, and tint C; light surface and tint A happen to share a value.

| Pair | Light | Dark |
| --- | --- | --- |
| Ink, minimum on six backgrounds | 9.23:1 | 10.20:1 |
| Muted text, minimum on six backgrounds | 4.89:1 | 6.85:1 |
| Proposed control border, minimum on six backgrounds | 3.70:1 | 4.70:1 |
| Proposed warning/danger/information, minimum on six backgrounds | 5.63:1 | 6.58:1 |
| On-action on action | 7.17:1 | 9.01:1 |
| On-action on action-hover | 9.89:1 | 10.87:1 |
| On-success on success | 6.94:1 | 9.90:1 |
| On-note on note | 7.52:1 | 8.19:1 |
| Ink on selected-item surface | 7.63:1 | 6.23:1 |
| Muted on selected-item surface | **4.04:1 — fails 4.5:1** | **4.18:1 — fails 4.5:1** |
| Accent on selected-item surface | 4.69:1 | **4.26:1 — fails 4.5:1** |
| Proposed control border on selected-item surface | 3.05:1 | **2.87:1 — below 3:1** |

The failures above motivate the ink selected-state rules. These calculations support only listed opaque pairs; they do not guarantee every palette pairing, translucent artwork, hover combination, rendered component, intended font, or complete accessibility.
