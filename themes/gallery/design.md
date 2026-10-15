# Gallery — design specification

Revision: **0.1.0-draft**. Reviewed: **2026-10-15**. Research record: `atlas-gallery-research-2026-10-15`.

**Every value and interaction rule below is an Atlas proposal.** The research record is a dated Atlas synthesis identifier, not a commit or release of an upstream theme. [Sources and credits](sources.md) separates live documentation, pinned license evidence, font packages, generated media, and original design decisions. Rendered evidence belongs in [validation.md](validation.md).

## Color tokens

| Role | Light | Dark |
| --- | --- | --- |
| Page | `#f6f4f0` | `#171a17` |
| Panel | `#ffffff` | `#20241f` |
| Surface | `#e9e5dd` | `#2b3029` |
| Tint A | `#f1e8df` | `#332b24` |
| Tint B | `#e8edef` | `#242f33` |
| Tint C | `#ece9e3` | `#303029` |
| Text / ink | `#252823` | `#f2f1e9` |
| Muted text | `#596057` | `#c3c8ba` |
| Accent / action | `#634a38` | `#dec6aa` |
| Action hover | `#473527` | `#efdbc2` |
| On action | `#ffffff` | `#292117` |
| Decorative divider | `#c8c5bd` | `#4a5045` |
| Necessary control border | `#787c70` | `#8d9883` |
| Selected surface | `#e2dccf` | `#4d473b` |
| Success foreground | `#325d46` | `#a7d0b3` |
| Warning foreground | `#745014` | `#ebcf98` |
| Danger foreground | `#9a3443` | `#f2adb5` |
| Information foreground | `#305d79` | `#aacee4` |
| Note background | `#f4e6b8` | `#e3d29e` |
| On note | `#493e1e` | `#2f2818` |

Use page for the main canvas and panel/surface only where grouping is useful. Media and its caption can stand directly on the page. The warm accent supports deliberate actions; imagery supplies most of the composition's color. Avoid turning every work into an elevated card.

Action/on-action and hover/on-action are defined pairs. Success, warning, danger, and information are **foreground roles**, not filled backgrounds with inferred text colors. A selected image is a current view, not a successful transaction. Pair every relevant state with readable text or a non-color marker.

Use the necessary border when a boundary identifies a control. The decorative divider is intentionally weaker and must not be the only sign of a text field or selected state. On selected surfaces, prefer **ink text, ink markers, underlined ink links, and ink boundaries** for a simple portable rule. Calculated selected border pairs pass narrowly; dimming or compositing can invalidate them.

Keep actual text and controls on opaque surfaces outside imagery. Light and dark appearances change interface chrome; they do not invert, tint, dim, recolor, or replace an image's original colors. Meaningful image boundaries and mixed luminance within a photograph require rendered checks beyond this token table.

## Typography and hierarchy

**Sole selected family:** Inter by **Rasmus Andersson**. Display uses normal 400; body, headings, and interface text use normal 400/500/600 according to role. The font package's copyright and license are separate from the designer credit; see [sources.md](sources.md).

| Role | Family / weight | Size | Line height |
| --- | --- | --- | --- |
| Display | Inter 400 | `clamp(3rem, 6vw, 6rem)` | `1.05` |
| Page heading | Inter 400 | `clamp(2.5rem, 5vw, 4.5rem)` | `1.1` |
| Section heading | Inter 400–500 | `clamp(1.75rem, 3vw, 3rem)` | `1.2` |
| Work or card heading | Inter 500 | `1.25rem` | `1.35` |
| Introduction | Inter 400 | `1.125rem` | `1.65` |
| Body / reading | Inter 400 | `1rem` | `1.65` |
| Label / caption / supporting text | Inter 400–600 | `0.875rem` | `1.5` |
| Text-entry control | Inter 400 | `1rem` | `1.5` |
| Short technical specimen | Generic local monospace | `0.875rem` | `1.5` |

Display tracking is **`-0.035em`**; ordinary text keeps normal tracking. Use a continuous semantic heading hierarchy and let actual long labels wrap. Do not simulate a thin font with opacity or make captions tiny to create an impression of refinement. Proposed reading measure is **65ch**, checked against the selected face and language.

The preview names Inter with **Segoe UI / Arial / sans-serif** local fallbacks and requests no font binaries or remote service. A CSS family name does not establish that Inter rendered. An installed fallback's metrics, glyphs, and available weights can differ; named-font rendering, language coverage, optical sizing, and wrapping remain project checks. Text-entry controls remain at least **16px** in the mobile adaptation. The technical specimen uses local **Consolas / Courier New / monospace** fallbacks, not a second selected brand family.

**Reference implementation adaptations:** H1 and the hero heading follow the display clamp and tracking above. Most rendered headings use weight 400; the brand uses 600, and labels/short actions use 500. Section/detail/footer headings use `clamp(2rem, 3.6vw, 3.5rem)`, line height `1.12`, and tracking `-0.025em`. Collection headings use `clamp(1.5rem, 2.4vw, 2rem)`, line height `1.25`, and tracking `-0.02em`; at 760px and below they use 1.5rem. The technical specimen is 14px. The smaller display specimen uses `clamp(2rem, 3.4vw, 3rem)`, line height `1.12`, and tracking `-0.025em`. These bounded choices do not replace the portable role proposals with a universal project scale.

## Spacing, layout, and geometry

**Proposed spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, and 96px. Label-to-control spacing starts at 8px, related controls at 12px, caption groups at 8–12px, and major sections at 48–96px. A portable content maximum is **1280px**, with 16px narrow gutters and 32px when room permits; consuming projects document content-fit changes.

**Media corners: 0px. Panels: 4px. Controls: 4px.** Surfaces rest flat without shadows. Comfortable is the default. Compact changes only the **neutral component specimen's inset from 24px to 16px**; it does not shrink collection imagery, captions, the inline viewer, body type, or target size.

Start with one column and add columns when real media and captions fit. Image scale and alternating visual weight may create asymmetry, but the DOM reading order stays useful. Do not apply masonry or CSS ordering that disconnects visual order from keyboard or reading order. Repeated cards use a stable scan pattern for image, name, category/context, and Inspect action.

Use whitespace, scale, and image relationships as the primary structure. A rule, colored panel, rounded badge, or serif heading should not become the whole identity. Keep a coherent caption baseline where repeated cards need comparison; long names may take more lines without clipping or hiding the action.

Contain a semantic table's genuine overflow in a labeled, keyboard-focusable scrolling region. The page itself must reflow. Long identifiers, Vietnamese content, enlarged text, and changed font metrics remain useful without losing essential information.

The preview deliberately selects a wider **1440px** container maximum. Its normal side gutters are 48px, increase to 64px at 1600px and above, become 32px at 1000px and below, then 20px at 760px and below. Its collection uses an asymmetric 12-column composition, then two columns at 760px and one at 440px; the logical work order stays Vessel, Seat, Room. Viewer/specimen layouts stack at 760px. Major section separation is 144px normally and 88px in the narrower layout. Field-label gaps are 6px, and specimen component spacing has its own bounded values. Only `.specimen-panel` responds to the density choice; preference panels and image layouts do not.

## Image and art-direction policy

| Situation | Proposed treatment |
| --- | --- |
| Full object, artwork, document, or accurate comparison | Preserve the complete source with `contain` or its natural ratio; use a deliberate neutral surrounding field if needed. |
| Contextual or atmospheric composition | `cover` is permitted only with an intentional crop and focal-point record. Essential object detail still needs an uncropped view. |
| A tighter mobile crop is required | Prepare an appropriate source and express art direction with native responsive markup; do not download multiple CSS-hidden hero images. |
| Repeated collection cards | A consistent reserved frame can connect mixed ratios. Never stretch content to fill it. |
| Loading or unavailable image | Keep reserved space, associated title, caption, description, and credit; provide a truthful local recovery action when runtime recovery exists. |
| Different interface appearance | Preserve the image's own colors and semantic content. Adapt surrounding chrome rather than applying a dark-mode filter to the image. |

Represent content imagery with native `img`/`picture` rather than CSS backgrounds. Include meaningful intrinsic dimensions, useful context-dependent alternatives, and visible provenance near the media. The alternative describes the image's relevant information; a functional image's name describes its action. Do not put credit, surrounding prose, and every visible detail into an indiscriminate alt-text string.

Prioritize visible hero/LCP-candidate media and do not delay it behind lazy loading, entrance opacity, or JavaScript construction. Lower media may be lazy-loaded. A real project selects efficient formats and source sizes from actual assets and measures the resulting page. Native attributes and local successful loads alone do not prove bandwidth, LCP, CLS, or real-device performance.

The reference uses **three local AI-generated photography-style illustrations**: Vessel study at **1024 × 1536**, Seat study at **1254 × 1254**, and Room study at **1536 × 1024**. [Asset provenance](preview/assets/README.md) records the generation prompts, actual dimensions, and hashes. The retained unchanged PNGs total **7,002,794 bytes** and have no compressed/responsive derivative files. Reusing a source in hero, card, and viewer is one source in several contexts; a crop is not another photograph. The reference does not claim real products, real places, artists, prices, stock, or commercial photography. Its original raster fixtures are not a production responsive-image pipeline or network-performance claim.

The actual preview shows these sources without a contextual crop: collection images use their natural ratios, the hero's Room study uses its original 3:2 ratio, and detail images use `contain` with a **760px** height cap above the stacked layout. At 760px viewport width and below, the detail cap is removed. An inset 1px image outline at 10% black in light appearance or 10% white in dark appearance is decorative, not a necessary control boundary, and is outside the opaque-token calculations. Hero media loads eagerly with high fetch priority; collection/detail images are marked lazy. Only detail-article images expose explicit load/error/retry state; card and hero images retain native image/alt behavior.

## Components and bounded viewer behavior

| Component | Proposed rule |
| --- | --- |
| Primary action | Use action/on-action and the hover pair, a stable label, and a clear focus indicator. |
| Secondary action / prose link | Use ink, a necessary boundary where needed, and persistent underline for links in prose. |
| Input / select | Visible associated label, 16px entered text, sufficient boundary, and useful current value. |
| Collection card | Real media with title, context, and a native Inspect anchor; no hover-only detail or nested interactive card surface. |
| Current work selector | Three ordinary buttons with stable contextual names and `aria-pressed`; use an ink marker/boundary beyond surface color. |
| Detail article | Heading, image, text alternative, caption, provenance, image state, and a native return link. This is an inline region, not a modal. |
| Image recovery | A visible error description and explicit Retry for that image; completion cannot overwrite unrelated work metadata. |
| Collection feedback | Explicit count, understandable empty result, Clear filters, and concise polite feedback. |

The preview has three fixed work identities in the order **vessel, seat, room**. Search matches title/description case-insensitively; category is All, Objects, or Spaces. Filtering preserves the open detail and preference state. **Clear filters appears only in the empty-result region**. It resets both filters, preserves the selected work, and returns focus to Search rather than leaving it on a disappearing action.

Inspect is a real anchor, preserving normal modified and middle-click navigation. An unmodified scripted activation selects its inline article and focuses that article's heading. Ordinary view buttons remain available independently of collection filters, retain their own focus on activation, and announce the selected work. They are not a custom tab widget and need no invented arrow-key convention.

On initialization, a valid `#work-vessel`, `#work-seat`, or `#work-room` fragment selects and focuses that article; a valid live hash change does the same. A normal visit without a valid work fragment defaults to Vessel. This preserves meaningful native fragment destinations without storing the viewer state or inventing a history-based product router.

Back returns to the same Inspect anchor when that card remains visible. If filtering hides the source card, retain the filter and current detail, focus Search, and explain where the card went. Do not silently erase the user's filtering choices to simulate a successful return.

Each article keeps its own image/load/error/retry state. A completion for a noncurrent image cannot replace current metadata or create a misleading current-work announcement. Retry requests the same original asset URL, hides/disables its pending Retry action, and focuses the corresponding work heading with scroll position preserved. An error makes the broken visual transparent immediately while its frame, text alternative, caption, credit, and readable error remain. Test injected failures separately from ordinary asset health. The shipped preview must not manufacture broken requests or fake loading timers as a visual effect.

The viewer is not a cart, inventory service, product configurator, checkout, contact form, download service, or agent operation. A production catalog needs its own data, permissions, uncertainty, recovery, persistence, and transaction model.

## Appearance and accessibility

Support **Light, Dark, and System**, with **System as the preview default** and live device changes respected. Valid saved preferences are applied before the stylesheet where possible; malformed or unavailable storage retains usable defaults. Only appearance, specimen density, and motion preference persist under `interface-atlas-gallery-preview`. Search, category, selected work, and recovery state are not stored. Reload initializes fresh while honoring a valid work fragment as described above.

**Proposed focus:** 3px ink outline, 5px offset; forced-colors uses `Highlight`. Prevent clipping against every frame, selected item, and scroller. **Proposed comfortable target: 44px**; this is a usability choice rather than a claim about WCAG's minimum target size.

Use native landmarks, headings, links, controls, a skip link, and logical focus order. Images need useful alternatives and reserved space; meaning and recovery cannot depend on imagery alone. Without JavaScript, all three static detail articles, images, captions, metadata, anchors, and native specimen controls remain usable; runtime preferences, filtering, view selection, and retry remain unavailable with an explanation.

All content and viewer tasks update independently of animation. [Motion.md](motion.md) defines the optional feedback and immediate reduced/off alternative. Representative browser checks remain separate from complete accessibility, screen-reader testing, and user research.

## Numerical contrast record

Calculated **2026-10-15** with opaque sRGB relative luminance and no alpha compositing. Six backgrounds means page, panel, surface, and tint A/B/C. These values are Atlas proposals, not extracted Shopify tokens.

| Pair | Light | Dark |
| --- | --- | --- |
| Ink, minimum on six backgrounds | 11.89:1 | 11.73:1 |
| Muted, minimum on six backgrounds | 5.17:1 | 7.78:1 |
| Accent, minimum on six backgrounds | 6.51:1 | 8.08:1 |
| Necessary control border, minimum on six backgrounds | 3.40:1 | 4.40:1 |
| Success foreground, minimum on six backgrounds | 5.99:1 | 7.79:1 |
| Warning foreground, minimum on six backgrounds | 5.76:1 | 8.80:1 |
| Danger foreground, minimum on six backgrounds | 5.67:1 | 7.23:1 |
| Information foreground, minimum on six backgrounds | 5.63:1 | 8.01:1 |
| Decorative divider, minimum on six backgrounds | 1.37:1 | 1.60:1 |
| On-action on action | 8.18:1 | 9.64:1 |
| On-action on action-hover | 11.62:1 | 11.77:1 |
| On-note on note | 8.47:1 | 9.72:1 |
| Ink on selected surface | 10.93:1 | 8.13:1 |
| Muted on selected surface | 4.75:1 | 5.39:1 |
| Accent on selected surface | 5.99:1 | 5.60:1 |
| Necessary control border on selected surface | 3.13:1 | 3.05:1 |

Use the decorative divider only for nonessential separation. Selected border margins are small, so ink boundaries are preferable where selection needs a boundary. These opaque calculations do not cover photography, translucent treatments, every state, focus geometry, final font rendering, image delivery, or full accessibility. [Validation.md](validation.md) identifies actual rendered checks and limitations.
