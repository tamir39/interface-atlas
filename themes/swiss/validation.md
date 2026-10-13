# Swiss reference validation

Reviewed **2026-10-13** against Swiss `0.1.0-draft`. **Theme status remains draft.** This record covers the original [reference preview](preview/README.md), including fictional studio briefs and a local change-review simulation. It is not evidence of a production studio site, execution service, or complete accessibility conformance.

## Environment and reproduction

Windows; Node.js 24.14.1; Playwright 1.62.1; headless Chromium 153.0.8010.12. Existing local dependencies were used; no package was installed into Atlas. The preview makes no external resource requests and loads no font files.

Run [tools/validate-swiss.mjs](../../tools/validate-swiss.mjs) with an installed Playwright package and browser, following [the tool instructions](../../tools/README.md). The retained [JSON record](preview/validation/results.json) records checks, layout measurements, excluded samples, actual fonts, and SHA-256 hashes of the tested HTML, CSS, and JavaScript. Use a temporary directory for repeated output.

## Performed checks

| Check | Observed result | Limit |
| --- | --- | --- |
| Responsive layout | Passed 20 combinations: light/dark × comfortable/compact specimen × 320, 390, 768, 1280, 1440 CSS px; no page-wide horizontal overflow | Studio and review regions keep their own density profiles; table overflow is contained |
| Opaque HTML text contrast | 171 samples per combination; minimum 5.34:1 light and 6.22:1 dark; all met applicable normal/large-text thresholds | Solid-background computed pairs; SVG, images, disabled controls, and unsupported backgrounds are outside coverage |
| Input/select borders | Three sampled controls per combination; border/fill contrast 4.59:1 light and 5.38:1 dark | Does not establish every checkbox, hover, disabled, or native popup treatment |
| Skip link and native disclosures | Keyboard skip reached main; studio briefs expanded with native disclosure behavior | Representative paths, not a complete assistive-technology walkthrough |
| Review decision lifecycle | Request kept the confirmed decision Unreviewed; explicit simulated acknowledgement confirmed Accepted or Rejected; reset restored the sample | Local decision only; execution remains Not started and no backend command is sent |
| Review focus and return | Opening focused the proposal heading; acknowledgement focused the result; Back to proposal preserved decision context and focused its trigger | No router, event stream, or production proposal-version protocol |
| Appearance and density | Explicit choices persisted; System followed live OS changes; blocked, invalid, and malformed storage retained usable defaults | Pre-stylesheet initialization exists; first-frame paint timing was not instrumented |
| Motion | Live OS reduced motion and explicit motion off made sampled feedback immediate | Optional entrance, kinetic grid, and cursor effects are not selected |
| Forced-colors focus | Sample retained a 3px outline and 5px offset with a system color | Representative focus geometry, not full forced-colors verification |
| Text resize | 200% CSS root text sizing reflowed at 640px | Not native browser zoom testing |
| No JavaScript | Proposal scope and native briefs stayed readable at 320px; 177 HTML samples passed, minimum 6.22:1; preferences and simulation stayed disabled | Interactive preferences and decision announcements require JavaScript |
| Runtime and resources | No runtime errors, failed local resources, or external resource requests | No production performance or delivery measurement |

There are **13 grouped checks** in the JSON record. Contrast checks require nonzero text and enabled-control boundary coverage. Excluded SVG, disabled, and unrendered samples are recorded separately; they cannot establish coverage. The current layout matrix reported no unsupported background samples. Source token calculations remain separately documented in [design.md](design.md).

## Fonts and visual evidence

The browser reported **Segoe UI** for sans text and the Vietnamese specimen, and **Consolas** for technical text. These are local fallbacks. Manrope and JetBrains Mono were not downloaded, bundled, or validated. A single Vietnamese sentence does not establish complete language or intended-font coverage.

Desktop light/dark and mobile captures were inspected for hierarchy, alignment, wrapping, flat surfaces, and sample state readability. The short Swiss introduction retains the source's tight display tracking as an explicit preview choice; portable typography rules remain moderated for project content.

Retained captures:

- [Light desktop studio composition](preview/validation/light-desktop.png).
- [Dark desktop change-review workspace](preview/validation/dark-desktop.png).
- [Light mobile studio viewport](preview/validation/light-mobile.png).

The preview composition and fictional briefs are original Atlas work prepared with AI assistance. Seed values, font designers, and conceptual references remain separately credited in [sources.md](sources.md). No source portfolio artwork, external effect code, book pages, or font software was imported.

The validator checks repository preview files. The [Pages build](../../site/README.md) rewrites documentation links in the published HTML copy; it preserves the stylesheet and local simulation behavior. Site routing and deployment are checked separately before reporting a live preview.

## Corrections and remaining coverage

Initial browser checks found a 4px focus offset rather than the retained 5px source value. The preview now uses 5px; the repeatable check verifies this geometry. Review also aligned ordinary heading tracking with the portable rules while documenting the short source-style introduction separately.

Verify the actual licensed font packages, representative real content, supported browsers, full keyboard paths, screen-reader announcements, native zoom, focus clipping, touch devices, selection/disabled/hover states, and any image or effect backgrounds selected by a project. Measure target-device performance if optional effects are implemented.

Production review needs actual proposal identity/versioning, authority, persistence, connection freshness, acknowledgement errors, retry uncertainty, and execution semantics. The local demonstration confirms only its explicitly labeled decision simulation. Selection between Atlas themes has not yet received a fresh project-generation evaluation.
