# Precision reference validation

Reviewed **2026-10-13** against Precision `0.1.0-draft`. **Theme status remains draft.** This record covers the original [reference preview](preview/README.md), with four fictional runs and manually advanced local cancellation and connection simulations. It does not establish production agent execution, backend synchronization, or complete accessibility conformance.

## Environment and reproduction

Windows; Node.js 24.14.1; Playwright 1.62.1; headless Chromium 153.0.8010.12. Existing local dependencies were used; no package was installed into Atlas. The preview requests no external resources and includes no font files.

Run [tools/validate-precision.mjs](../../tools/validate-precision.mjs) using an installed Playwright package and Chromium, following [the tool instructions](../../tools/README.md). The retained [JSON record](preview/validation/results.json) records checks, measurements, exclusions, actual fonts, and SHA-256 hashes of the final repository HTML, CSS, and JavaScript. Use temporary output for subsequent runs.

## Performed checks

| Check | Observed result | Limit |
| --- | --- | --- |
| Responsive layout | Passed 20 combinations: light/dark × comfortable/compact × 320, 390, 768, 1280, 1440 CSS px; no page-wide horizontal overflow | A wide table scrolls in its own region; fixed fictional content only |
| Opaque HTML text contrast | 199–203 samples per combination; minimum 4.89:1 light / 4.76:1 dark; all met applicable normal/large-text thresholds | SVG, disabled controls, placeholders, selection, native popup menus, and unsupported backgrounds are outside coverage |
| Enabled input/select boundaries | Five pairs per combination; minimum 3.61:1 light / 4.71:1 dark against both control fill and adjacent solid surface | Representative text inputs and selects; not every checkbox, hover, or unavailable treatment |
| Density and targets | Queue row padding 12px compact / 16px comfortable; sampled row height increased from 147.19px to 155.19px; sampled primary controls retained at least 44px height | Content-dependent row height and representative targets, not an exhaustive touch-device review |
| Keyboard skip and disclosure | Skip link reached main; native disclosure opened and closed by keyboard | Representative keyboard path; no screen-reader walkthrough |
| Filters and context | Search/status filters produced a recoverable empty result; reset restored the queue; hidden selected runs retained their detail and filters | No server search, pagination, or production list virtualization |
| Detail focus and return | Inspect focused the named run heading; Back restored the invoking control when visible, otherwise search with an explanation | Explicit navigation contract for this preview |
| Cancellation lifecycle | Request set Cancellation requested while execution stayed Running; manual acknowledgement changed execution to Cancelled and focused its detail heading | No backend command, retry, or real acknowledgement was sent |
| Connection freshness | Disconnection retained execution and pending command, labeled the last confirmed state, and disabled request/acknowledgement controls; reconnection preserved the states | Local demonstration; recovery does not re-fetch evidence or reconnect a stream |
| Preferences | System followed live OS appearance; explicit appearance/density/motion persisted; blocked, invalid, and malformed storage retained usable defaults | Pre-stylesheet initialization exists; first-frame paint timing was not instrumented |
| Motion and forced colors | Reduced motion and motion off made sampled feedback immediate; forced-colors focus retained 3px outline and 3px offset with system color | Representative feedback and focus geometry, not every forced-colors rendering |
| Text resize | 200% CSS root text sizing reflowed at 640px | Not native browser zoom testing |
| No JavaScript | All four details and native disclosures remained readable at 320px; runtime controls stayed disabled with explanation; 248 text samples passed, minimum 7.27:1 | Filtering, selection, preferences, and simulation require JavaScript |
| Runtime and resources | No runtime errors, external resource requests, or failed preview resources | No production performance measurement |

The JSON contains **13 grouped checks**; this table separates some grouped results for clarity. Contrast checks require nonzero text coverage and enabled-control boundary samples. Excluded SVG, disabled, unrendered, and visually hidden samples are recorded separately. No unsupported background/color samples occurred in the final layout matrix. Token calculations in [design.md](design.md) remain separate from rendered evidence.

## Fonts and visual evidence

Chromium reported **Segoe UI** for sans text and the Vietnamese sample, and **Consolas** for technical text. IBM Plex Sans and Mono are named choices but were not installed, downloaded, bundled, or validated. One Vietnamese sentence does not establish complete script or intended-font coverage.

Desktop light/dark and mobile captures were inspected for hierarchy, aligned queue/detail regions, wrapping, restrained geometry, and readable state labels. The preview's compact typography and wider workspace are explicitly recorded adaptations in [its scope notes](preview/README.md).

- [Light desktop operations workspace](preview/validation/light-desktop.png).
- [Dark desktop operations workspace](preview/validation/dark-desktop.png).
- [Light mobile workspace](preview/validation/light-mobile.png).

Precision's composition, palette, code, and fictional data are original Atlas work for Tamir with Codex AI assistance. Referenced concepts and font creators are credited in [sources.md](sources.md). No Carbon/Primer implementation, external artwork, or font software was imported.

The validator tests the repository preview files. The [Pages builder](../../site/README.md) rewrites documentation links in the published HTML copy and retains the CSS and local simulation behavior. Published routing and delivery are checked separately before reporting the preview live.

## Corrections and remaining coverage

Review aligned the introduction's maximum heading size to 40px, comfortable component padding to 24px, and detail-heading focus offset to 3px. Independent review also corrected the connection toggle to retain its accessible label across pressed states, with explicit recovery instructions. Final deployed visual inspection identified a clipped Comfortable option in the desktop preferences panel; the panel was widened to preserve its label. Final recorded checks ran after these changes and repository text normalization.

Each consuming project still needs actual licensed font packages, representative content, supported browsers, native zoom, complete keyboard paths, screen-reader announcements, focus clipping, touch-device behavior, selection/hover/unavailable states, and any implemented overlay or effect checks.

Production agent work also needs authority, stable run identity, persistence, freshness, real acknowledgements, retry uncertainty, recovery, and backend idempotency. This local demonstration verifies only its labeled simulations. Selection among Atlas themes has not yet received a fresh project-generation evaluation.
