# Editorial — sources and credits

Reviewed on: **2026-10-13**. Atlas revision: `0.1.0-draft`.

This record distinguishes the inspected source implementation, conceptual references, font packages, and Atlas additions. Attribution does not establish permission to redistribute another source's code or assets.

## Local seed

**Credited creator and maintainer:** Tamir (Phi Vuong Tuong Tam).

**Configured repository URL:** [tamir39/tamir39-portfolio](https://github.com/tamir39/tamir39-portfolio).

**Inspected source revision:** `166f44091a58a68d74096bc44defceb99243ba4e`. The files were inspected locally; repository links may require access.

| Source file at the pinned revision | Material retained or referenced |
| --- | --- |
| [app/globals.css](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/globals.css) | Base palette, focus outline and offset |
| [app/themes.css](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/themes.css) | Light semantic tokens, geometry, shadows, CSS timing |
| [app/appearance.css](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/appearance.css) | Dark tokens and appearance-specific treatment |
| [app/layout.tsx](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/layout.tsx) | Font families, weights, styles, and loaded subsets |
| [lib/themes.ts](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/lib/themes.ts) | Theme identity, entrance values, and reduced-motion values |
| [components/ThemeCursor.tsx](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/components/ThemeCursor.tsx) and [app/cursors.css](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/cursors.css) | Cursor character, eligibility, and follower behavior |
| [docs/hero-artwork.md](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/docs/hero-artwork.md) and [lib/hero-artwork.ts](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/lib/hero-artwork.ts) | Artwork attribution, Canvas behavior, and performance safeguards |
| [README.md](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/README.md) | General inspiration references |

**Reuse status:** no implementation license was found in the inspected portfolio. Atlas's own publishing terms remain undecided. This entry includes original Atlas documentation and retained design facts; it contains no copied implementation code, artwork assets, or font package files.

## General upstream inspiration

The portfolio's README lists the following general inspiration. This does not establish that a particular catalog entry created the complete Editorial theme.

| Reference | Credit and attribution boundary | Reuse status |
| --- | --- | --- |
| [DESIGN.md directory](https://designdotmd.directory/) | The catalog lists **Rofi** and the site links **@bidah**. Attribute specific entries separately if selected later. | Terms for copied material unresolved; reference only here. |
| [Design Prompts](https://www.designprompts.dev/) | Site identity: **Design Prompts**. An individual creator was not verified. | Terms for copied material unresolved; reference only here. |

## Optional artwork inspiration

**Reference:** [Floating Paths](https://21st.dev/@bundui/components/floating-paths).

**Credited component creator:** Bundui.io, published under `@bundui`.

**Local adaptation:** Tamir's hero-artwork notes describe original Canvas 2D scenes inspired by selected references, not imports of catalog code. The Editorial scene's flowing-path interaction retains this inspiration credit.

**Reuse status:** external implementation license or copying permission unverified. The Atlas entry describes the concept and optional behavior; it copies no external implementation or artwork assets.

## Fonts

Font designers, distributors, and copyright notices are separate attribution roles. Preserve the actual notices and license text belonging to the package redistributed; a designer name in this document does not replace them.

| Family | Credited designers | Metadata | Font license |
| --- | --- | --- | --- |
| Manrope | Mikhail Sharanda | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/METADATA.pb) | [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt) |
| DM Serif Display | Colophon Foundry | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/METADATA.pb) | [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/OFL.txt) |
| JetBrains Mono | JetBrains, Philipp Nurullin, Konstantin Bulenkov | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/METADATA.pb) | [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/OFL.txt) |

The linked families provide SIL Open Font License text. This package includes no font files. Select and record the actual font version if a project later vendors files, and retain that version's required notices.

## Guidance references

| Reference | Creator or responsible contributors | Use in Atlas |
| --- | --- | --- |
| [Motion React accessibility](https://motion.dev/docs/react-accessibility) | Matt Perry, Motion team, and contributors | Conceptual reduced-motion guidance; Atlas adopts an immediate reduced-motion policy. No documentation text or implementation code copied. |
| [W3C WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/) | W3C Accessibility Guidelines Working Group and contributors | Contrast and accessibility reference; calculations are distinguished from implemented conformance. |
| [W3C ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) | W3C ARIA Authoring Practices Task Force and contributors | Reference for relevant keyboard and widget behavior; no documentation text or implementation code copied. |

## Atlas adaptation record

| Addition | Reason | Evidence and status |
| --- | --- | --- |
| Portable type scale and moderated display tracking | Avoid treating portfolio hero styles as universal interface typography | Proposed; needs rendered verification |
| Spacing scale and general component rules | Make the theme actionable beyond portfolio-specific selectors | Proposed; needs project validation |
| Control-border foregrounds | Identify necessary control boundaries more clearly than decorative dividers | Proposed; opaque numerical contrast calculated |
| Warning, danger, and information foregrounds | Provide explicit semantic roles missing from the extracted minimal palette | Proposed; opaque numerical contrast calculated on three neutral backgrounds |
| Compact density, geometry, and timing options | Support operational interfaces | Proposed adaptations, selected per project |
| Static effect defaults and explicit enable controls | Preserve readable content and user control | Proposed; implementation behavior requires verification |
| Source focus dimensions and retained seed tokens | Preserve observed design decisions accurately | Extracted from the pinned local source; not a complete rendered audit |

For future changes, record the changed rule, reason, source revision, and checks. Keep **source inspection**, **numerical calculation**, **rendered validation**, and **reuse permission** as distinct evidence categories. Carry relevant credits into project documents generated from this entry.
