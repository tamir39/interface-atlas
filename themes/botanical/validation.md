# Botanical reference validation

Reviewed **2026-10-13** against Botanical `0.1.0-draft`. **Theme status remains draft.** This record covers the original [reference preview](preview/README.md): a fictional garden studio, four original design field notes, a temporary reading list, and local Markdown export. It establishes no production publication, server saving, agent execution, or complete accessibility conformance.

## Environment and reproduction

Windows; Node.js 24.14.1; Playwright 1.62.1; headless Chromium 153.0.8010.12. Existing local dependencies were used; no package was installed into Atlas. The preview makes no external resource requests and includes no font files.

Run [tools/validate-botanical.mjs](../../tools/validate-botanical.mjs) with an installed Playwright package and Chromium, following [the tool instructions](../../tools/README.md). The retained [JSON record](preview/validation/results.json) includes actual measurements, exclusions, rendered-font evidence, and SHA-256 hashes of the final repository HTML, CSS, JavaScript, and validator. Preview hashes are checked again at the end of the run. Use a temporary output directory for subsequent checks.

## Performed checks

| Check | Observed result | Limit |
| --- | --- | --- |
| Responsive layout | Passed 20 combinations: light/dark × comfortable/compact × 320, 390, 768, 1280, 1440 CSS px; no page-wide horizontal overflow | Fixed fictional content and selected representative states |
| Opaque HTML text contrast | 196 samples per combination; minimum 5.04:1 light / 6.23:1 dark; applicable normal/large-text thresholds passed | SVG, disabled samples, placeholders, native popup menus, and selection excluded; unsupported backgrounds are recorded separately |
| Control boundaries | All six identified input/select boundaries per combination passed; minimum 3.81:1 light / 4.88:1 dark against fill and adjacent solid surface | Representative enabled fields, not every checkbox pixel or hover/unavailable treatment |
| Density and targets | Specimen inset changed 24px comfortable → 16px compact; height changed 1187.86px → 1171.86px at 1440px; sampled targets retained at least 44px width/height | Studio and reading room keep their comfortable profiles; inline prose links are excluded from target sampling |
| Skip link and disclosures | Keyboard skip focused main; all three native studio disclosures opened/closed by keyboard | Representative paths, not a complete keyboard or screen-reader walkthrough |
| Search and topics | Every topic selected a proper matching subset; search exposed an empty state and recovered through keyboard reset | Four fixed design notes; no remote search or pagination |
| Reading focus and context | Opening a note focused its article heading; Return restored the visible trigger or focused search when filtered out, preserving filters and the open article | Original inline reading contract, not general router/history validation |
| Keep-note controls | Card/detail controls kept stable visible labels and actual accessible names across pressed/unpressed states; aria-pressed stayed synchronized, keyboard toggles preserved focus, and entries remained unique | Names checked through Chromium accessibility snapshots and exact role/name lookup; no screen-reader walkthrough or server saving |
| Remove and clear | Removed controls transferred focus to another Remove button or the list heading; Clear focused the heading as its action became disabled; statuses described changes | Live regions checked in the DOM, not by listening with assistive technology |
| Markdown export | A real browser download produced botanical-reading-list.md with kept titles, topics, full summaries, source/creator credits, and local/fictional scope; unselected notes were absent and repeated export was deterministic | Full articles remain in the preview; observing a browser download does not certify the user's filesystem save |
| Literal content | An entity-escaped HTML-like note fixture remained text in list/search; the actual downloaded Markdown escaped its HTML delimiters | Focused local rendering check, not a complete security assessment |
| Preferences | System followed live OS appearance; explicit appearance/density/motion persisted; blocked, invalid, and malformed storage retained usable controls | Saved-choice initialization exists; first-frame paint timing was not instrumented |
| Reading-state scope | Reload reset the reading list, filters, and initial article while preserving only preferences | Deliberately temporary; no cross-tab or production persistence |
| Motion | Live reduced motion and motion off made sampled feedback immediate; pressing produced no transform | Source contour renderer, cursor follower, Motion helper, and entrance behavior are unselected |
| Forced colors | Sample focus retained a 3px outline with 5px offset and system color | Representative focus geometry, not a full forced-colors audit |
| Text resize | At 640px, 200% CSS root sizing doubled a body sample from 16px to 32px and reflowed without horizontal overflow | Not native browser zoom testing |
| No JavaScript | All four articles and native briefs stayed readable at 320px; 16 runtime controls stayed disabled; native specimen fields remained usable; 216 text samples passed, minimum 6.85:1 | Preferences/filter/list actions require JavaScript; initial System still has a CSS dark fallback |
| Runtime and resources | No browser runtime errors, external requests, or failed preview resources | No production performance or real-device measurement |

The JSON contains **17 grouped checks**; this table separates some related observations. Sampling requires nonzero opaque HTML text coverage and all six expected enabled field boundaries. The final layout matrix reported no unsupported background/color samples. SVG, disabled, unrendered, and visually hidden exclusions are recorded separately. Numerical source-pair calculations and selected-background failures remain separately documented in [design.md](design.md).

## Fonts and visual evidence

Chromium reported **Segoe UI** for body and Vietnamese text, **Georgia** for the display specimen, and **Consolas** for technical text. These are installed fallback fonts. Manrope, DM Serif Display, and JetBrains Mono were not bundled, downloaded, or validated. One sentence does not establish complete language or intended-font coverage.

Light/dark desktop and narrow-screen captures were inspected for hierarchy, original static artwork, asymmetric corners, earthy surfaces, wrapping, selected-note cues, and reading/list controls. The preview's content width, gutters, larger studio type, and specimen-only density are recorded in [the preview notes](preview/README.md).

- [Light desktop studio and fictional briefs](preview/validation/light-desktop.png).
- [Dark desktop reading room and local list](preview/validation/dark-desktop.png).
- [Light mobile reading room](preview/validation/light-mobile.png).

The studio composition, vector drawings, fictional briefs, design notes, and implementation are original Atlas work with Codex AI assistance. Tamir's source direction, font creators, and Kedhareswer Naidu's optional contour inspiration remain separately credited in [sources.md](sources.md). No portfolio implementation, source artwork, external effect renderer, or font software was imported.

The validator checks repository preview files. The [Pages builder](../../site/README.md) rewrites documentation links in the published HTML copy while preserving local behavior. Published routing and delivery are checked separately before reporting the preview live.

## Corrections and remaining coverage

Review raised functional Keep/Return labels to 14px, added a visible ink Reading cue and persistent selected-card link underline, and retained a 44px minimum width on section navigation. Enlarged text exposed a 12px overflow caused by the collection's intrinsic two-column width; the collection now permits shrinking and uses adaptive card columns that collapse as text grows. An accessibility snapshot also exposed generated checkmark text changing a Keep button's name. Explicit labels retain each note's context while the visual check and pressed state update separately. Final recorded checks ran after these changes and repository text normalization.

Each consuming project still needs exact licensed font packages, representative real content, supported browsers, full keyboard paths, screen-reader names/announcements, native zoom, focus clipping, touch devices, and hover/selection/unavailable states. Selected composited artwork and optional effects need separate contrast, performance, eligibility, and lifecycle checks.

A production reading workspace also needs explicit persistence scope, actual saving acknowledgements, request identity, retry/recovery behavior, authorization, and any required audit history. This reference verifies only its labeled temporary local flow. Selection among Atlas themes has not yet received a fresh project-generation evaluation.
