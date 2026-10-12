# Editorial reference validation

Reviewed 2026-10-13 against Editorial `0.1.0-draft`. **Theme status remains draft.** This report concerns the original [reference preview](preview/README.md), not a completed portfolio, dashboard, or accessibility conformance assessment.

## Environment and reproduction

Windows; Node.js 24.14.1; Playwright 1.62.1; headless Chromium 153.0.8010.12. Existing local browser dependencies were used; nothing was installed into the library. The preview makes no external resource requests.

Run [tools/validate-editorial.mjs](../../tools/validate-editorial.mjs) with an installed Playwright package and browser, following [the tool instructions](../../tools/README.md). The generated [JSON record](preview/validation/results.json) contains the checks, layout measurements, actual font families, and SHA-256 hashes of the tested HTML/CSS/JavaScript. Repeated test output belongs in a temporary directory.

## Performed checks

| Check | Observed result | Limit |
| --- | --- | --- |
| Responsive layout | Passed 20 combinations: light/dark × comfortable/compact specimen × 320, 390, 768, 1280, 1440 CSS px; no page-wide horizontal overflow | Portfolio and operations sections keep their own density profiles; table overflow is deliberately contained |
| Opaque text contrast | 237 rendered text/control-value samples per combination; minimum 5.15:1 light and 7.38:1 dark; all met the applicable 4.5:1 normal or 3:1 large-text threshold | Computed solid background pairs, not a pixel-level or full accessibility audit |
| Input/select borders | Five sampled controls per combination; border/fill contrast 3.80:1 light and 5.03:1 dark | Does not cover every focus, checkbox, disabled, hover, or native popup treatment |
| Keyboard navigation | Skip link focused main; run selection focused its detail heading; return restored the corresponding Inspect link | Representative paths, not a complete keyboard-only walkthrough of every control |
| Filtering and recovery | Empty results and reset worked; returning from a filtered-out run preserved filters and detail context, focusing search | Fixed sample data; no streamed reordering or router integration |
| Cancellation semantics | Request kept confirmed execution Running and pending command Cancellation requested; explicit simulated acknowledgement changed execution to Cancelled | Local simulation only; no backend guarantee |
| Appearance preferences | Explicit choice persisted; System followed a live OS change; blocked/invalid storage kept the interface usable | Browser checks support the implementation's pre-stylesheet initialization; first-frame paint timing was not instrumented |
| Motion preferences | OS reduced motion and explicit motion off made sampled feedback immediate, including live changes | No entrance sequence or optional continuous effects selected |
| Focus in forced colors | Sample outline retained 3px width and 5px offset, with system Highlight color | Not a full forced-colors or focus-visibility audit |
| Text resize | 200% CSS root text sizing reflowed at a 640px viewport | This is not native browser zoom testing |
| No JavaScript | Content and all four detail articles remained available at 320px; 270 opaque text samples passed, minimum 7.38:1; simulation actions stayed unavailable | Announcements and interactive filtering need JavaScript |
| Runtime/network | No browser runtime errors or external resource requests in the tested contexts | No production delivery or performance measurement |

There are 13 grouped browser checks in the JSON record. The test requires nonzero text and control-border coverage; unsupported image/translucent text backgrounds cannot silently establish coverage. The current layout matrix recorded no such skipped text samples. Disabled controls, placeholders, text selection, native popup menus, and offscreen focus visibility still need separate review.

## Font and visual evidence

The browser reported **Segoe UI** for sans text and the Vietnamese specimen, **Georgia** for the serif specimen, and **Consolas** for technical text. These are local fallbacks. The Manrope, DM Serif Display, and JetBrains Mono files were not loaded or validated.

The primary agent inspected full-page captures and focused desktop/mobile captures for hierarchy, wrapping, surfaces, and layout. The fallback Vietnamese sentence rendered in Segoe UI; this single phrase does not establish complete Vietnamese content or intended-font coverage.

Retained reference captures:

- [Light desktop portfolio](preview/validation/light-desktop.png).
- [Dark desktop operations workspace](preview/validation/dark-desktop.png).
- [Light mobile portfolio viewport](preview/validation/light-mobile.png).

The preview artwork and fixture text are original Interface Atlas work. Their presence does not imply permission to import the seed portfolio's artwork or implementation. Creator and font credits remain in [sources.md](sources.md) and [the preview notes](preview/README.md).

## Corrections from validation

Review found that returning to a selected run hidden by filters cleared the filters. The preview now preserves filters and the detail context, moves focus to search, and announces why the run is hidden. A regression check verifies that behavior.

The fresh [preparation workflow evaluation](../../examples/workflow-evaluation/README.md) also prompted conditional reminders for persistence/recovery, language coverage, and media/asset credits. Its generated journal document was reviewed as a specification; no journal UI was implemented.

## Remaining coverage

Validate the chosen licensed font packages and representative real content, including glyph coverage and fallback changes. Perform actual browser zoom, screen-reader announcement, full keyboard, focus clipping, touch-device, and supported-browser checks. Verify hover/selection/disabled/checkbox treatments and any text on images or blended effects actually selected by a project.

Dashboard routing below 1200px, approval proposals, retry uncertainty, high-volume streams, reconnecting state, command failures, and real backend event semantics remain project-level work. Optional Floating Paths and cursor effects were not implemented. The preview's inline detail specimen is not evidence that the dashboard example's dedicated detail routes exist.
