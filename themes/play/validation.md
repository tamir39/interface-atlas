# Play reference validation

Reviewed **2026-10-13** against Play `0.1.0-draft`. **Theme status remains draft.** This record covers the original [reference preview](preview/README.md), including three fictional creative projects and a manually advanced local brief request. It does not establish production intake, agent execution, backend acknowledgement, or complete accessibility conformance.

## Environment and reproduction

Windows; Node.js 24.14.1; Playwright 1.62.1; headless Chromium 153.0.8010.12. Existing local dependencies were used; no package was installed into Atlas. The preview makes no external resource requests and includes no font files.

Run [tools/validate-play.mjs](../../tools/validate-play.mjs) with an installed Playwright package and Chromium, following [the tool instructions](../../tools/README.md). The retained [JSON record](preview/validation/results.json) includes actual measurements, exclusions, font evidence, and SHA-256 hashes of the final repository HTML, CSS, and JavaScript. Use a temporary output directory for subsequent checks.

## Performed checks

| Check | Observed result | Limit |
| --- | --- | --- |
| Responsive layout | Passed 20 combinations: light/dark × comfortable/compact × 320, 390, 768, 1280, 1440 CSS px; no page-wide horizontal overflow | Fixed fictional content and selected representative states |
| Opaque HTML text contrast | 220–221 samples per combination; minimum 5.55:1 light / 6.10:1 dark; applicable normal/large-text thresholds passed | SVG, disabled samples, placeholders, native popup menus, selection, and unsupported backgrounds excluded |
| Control boundaries | All 11 identified input/select/textarea or choice-label boundaries per combination passed; minimum 5.04:1 light / 6.37:1 dark against fill and adjacent solid surface | Representative enabled controls, not every native checkbox/radio pixel or hover/unavailable treatment |
| Density and targets | Specimen padding changed 24px comfortable → 16px compact; sampled card height changed 537.84px → 521.84px; sampled targets retained at least 44px height | Portfolio and builder keep their separate comfortable profile; representative label targets only |
| Skip link and native disclosure | Keyboard skip focused main; all three portfolio disclosures opened/closed by keyboard | Representative keyboard paths, not a screen-reader walkthrough |
| Error recovery | Empty/invalid review focused a linked summary, exposed associated inline errors and aria-invalid, and preserved entered values | Original local validation; no server validation or production error service |
| Input limits | Names above 80 and goals outside 15–600 were rejected when native limits were bypassed; exact boundaries and one deliverable were accepted | Trimmed character counts and the fixed option vocabulary of this specimen |
| Review and edit | Review focused its heading and rendered a fixed trimmed snapshot; edit restored name focus and preserved every entered field | No production versioning, persistence, or collaborative editing |
| Literal content | Markup-like names/goals appeared as text, without creating injected elements or script effects; snapshot and nested deliverables stayed frozen | Focused local rendering check, not a complete security assessment |
| Pending and acknowledgement | Request stayed pending; editing and repeated request were disabled; manual acknowledgement alone showed a receipt and focused its heading | Local simulation sends no request and starts no agent |
| Revision and reset | Editing after acknowledgement cleared the current local receipt/snapshot and required fresh review; reset discarded the brief and restored first-field focus | Implements no remote undo or acknowledgement history |
| Preferences | System followed live OS appearance; explicit appearance/density/motion persisted; blocked, invalid, and malformed storage retained usable controls and review | Saved-choice initialization exists; first-frame paint timing was not instrumented |
| Motion | Live reduced motion and motion off made sampled feedback immediate and removed press transforms | Source spring runtime, spheres, followers, and entrances are unselected |
| Forced colors | Sample focus retained a 3px outline and 5px offset with system color | Representative geometry, not full forced-colors verification |
| Text resize | 200% CSS root text sizing reflowed at 640px | Not native browser zoom testing |
| No JavaScript | Sample brief and native case studies remained readable at 320px; 18 runtime controls stayed disabled; 207 text samples passed, minimum 6.10:1 | Brief workflow and preferences require JavaScript; system appearance still has a CSS fallback |
| Runtime and resources | No runtime errors, external requests, or failed preview resources | No production performance or device measurement |

The JSON contains **19 grouped checks**; the table combines some checks for readability. Contrast sampling requires nonzero text coverage and all 11 expected enabled boundaries. Excluded SVG, disabled, unrendered, and visually hidden samples are recorded separately. The final layout matrix reported no unsupported background/color samples. Numerical source-pair calculations and selected-background failures remain separately documented in [design.md](design.md).

## Fonts and visual evidence

Chromium reported **Segoe UI Black** for the display specimen, **Consolas** for technical text, and **Segoe UI** for the Vietnamese sentence. These are installed fallback fonts. Manrope and JetBrains Mono were not bundled, downloaded, or validated. One sentence does not establish complete language or intended-font coverage.

Light/dark desktop and narrow-screen captures were inspected for hierarchy, original static artwork, rounded geometry, hard shadows, wrapping, focus, and local review/pending/receipt readability. Preview-specific content width, small-screen padding, and density scope are recorded in [the preview notes](preview/README.md).

- [Light desktop creative portfolio](preview/validation/light-desktop.png).
- [Dark desktop brief review](preview/validation/dark-desktop.png).
- [Light mobile brief builder](preview/validation/light-mobile.png).

The preview composition, static artwork, fictional projects, and implementation are original Atlas work with Codex AI assistance. Tamir's source direction, font creators, Samuel Breznjak's additional comparison, and Ravi Katiyar's optional sphere inspiration remain separately credited in [sources.md](sources.md). No portfolio code, external effect implementation, brand assets, or font software was imported.

The validator checks repository preview files. The [Pages builder](../../site/README.md) rewrites documentation links in the published HTML copy while preserving the stylesheet and local behavior. Published routing and delivery are checked separately before reporting the preview live.

## Corrections and remaining coverage

Review corrected the visible Ravi credit to sphere-artwork inspiration, moderated heading tracking, aligned builder padding with the documented 24px base, and raised meaningful review/state labels to 14px. Initial System markup now supplies a no-JavaScript dark-appearance CSS fallback. Final recorded checks ran after these changes and repository text normalization.

Each consuming project still needs exact licensed font packages, representative real content, supported browsers, full keyboard paths, screen-reader announcements, native zoom, focus clipping, touch devices, hover/selection/unavailable states, and any selected composited artwork or effects. Check performance and lifecycle behavior on real devices if animated decoration is added.

Production intake also needs actual authority, server validation, request identity, duplicate protection, persistence, acknowledgements, retry uncertainty, recovery, and audit history. This demonstration verifies only its labeled local flow. Selection among Atlas themes has not yet received a fresh project-generation evaluation.
