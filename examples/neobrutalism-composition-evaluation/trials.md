# Neobrutalism composition: trial record

## Actual browser run

On **2026-10-27**, `tools/validate-neobrutalism.mjs` ran with **Node v24.14.1**, optional installed Playwright and **headless Chromium 153.0.8010.12**. The corrected run passed **11 check groups**, **72 base states** and **144 measured interaction contexts**. Its five runtime-file fingerprints match the frozen LF, UTF-8-without-BOM preview bytes; the validator fingerprint identifies the maintained source used for that run.

[results.json](results.json) is a compact projection of the actual report, not hand-authored passing data. It preserves all 72 matrix and 144 interaction rows under explicit column schemas, all 18 computed identity sets, the nine source CSS hashes, group observations, exclusions and the raw report's SHA256. Per-element text, boundary, target and surface samples remain in the **10,297,857-byte** temporary raw report. Its SHA256 is `c421e5ff1bfad57979ee8924d4e5e1b47f965a2c9c04ed98c922e0851418dcae`. Ten PNGs remain beside it; no screenshot binaries are distributed in Atlas.

| Observed check | Result |
| --- | --- |
| Nine profiles × light/dark × 320/1280px × motion off/on | **72/72** states passed actual text/control contrast, whole-page reflow, 44px control areas, opaque fills, 2px ink outlines and 4px/4px zero-blur shadows. |
| Text and control contrast | Minimum measured text **5.036:1**; field and button boundaries **9.504:1**. Each base state measured at least 127 visible text samples and 15 enabled controls. The limiting text pair was Botanical light's search hint on the board surface. |
| Actual identity | All **18** computed light/dark sets matched their generated profile values exactly; all nine source CSS hashes matched. All nine light profiles differed by actual token values. |
| Selected, invalid, hover and active states | **72** contexts across every light/dark profile passed. Selection updates `aria-pressed`, visible Selected text and inspection content. Invalid input exposes associated feedback. Hover has an underline; actual pointer-down has a 3px title underline and remains static with motion off. |
| Explicit keyboard focus | **72** contexts across four controls in every light/dark profile passed: theme select, brief title, idea card and submit button. Each had a 3px external outline, at least **9.504:1** against the adjacent parent, with no overflow-hidden/clip ancestor clipping. |
| Local board behavior | Skip link focuses main; Space selects a native card. Search and category filtering preserve selected inspection even when its card is hidden, with explicit status. Empty recovery restores all four ideas and focuses search. |
| Form and preference continuity | Empty and two-character titles expose associated errors; a valid local review includes its title. Title, note, track, search and selected inspection survive theme, appearance and motion changes. Reset restores the sample without a remote action. |
| System and motion preferences | System follows live OS light/dark changes. An actual pointer-down with motion On translates 2px and reduces hard depth to 2px; OS reduced motion overrides On with no translation, no transition and no active animations. |
| Forced colors | System color roles override selected profile values, the punctuation remains visible, decorative shadows disappear, and narrow contrast, focus and reflow pass. |
| Resilience and resources | No-JavaScript and aborted-script trials preserve readable static content with enhancement controls disabled. No ordinary runtime exceptions, failed resources or external requests occurred. The intentional `preview.js` abort is recorded separately. |

Normal text uses 4.5:1 and large text 3:1. Fields need 3:1 border contrast against fill and parent; buttons need a 3:1 border or filled shape against their parent. Dedicated keyboard outlines need 3:1 against their parent and at least 2px width. These computed, rendered-state checks use the assumptions and exclusions in the [evaluation design](design.md#browser-method); they do not establish complete accessibility.

## Failure, repair and visual inspection

The first actual run passed all 72 base and 144 interaction contexts, then failed the forced-color trial: the heading's period used `--primary`, which became system `ButtonFace`, producing black text on a black `Canvas` background at **1:1**. The preview added an explicit `CanvasText` foreground for that punctuation in forced colors. It also removes press transitions in forced colors. No source palette was changed and the visible period was not excluded from measurement. The corrected actual run passed all groups. The first failed raw report remains in its separate temporary trial directory.

Before the corrected run, the validator was strengthened to prove actual hover and pointer-active states, empty-state recovery focus, positive-filter context retention and reduced motion during an active press. Source-fit copy was aligned with Gallery, Precision and Swiss's flat resting surfaces. Filtering now retains the selected idea instead of silently selecting the first surviving card. The final machine record fingerprints these maintained files.

The validation author inspected Play light and Swiss dark full-page narrow captures, then the corrected forced-color view and Botanical dark desktop local review. The preview/root review separately inspected Editorial light desktop, Play dark selected/error and Blueprint light 320px form captures. The inspected states showed readable content, reachable controls, visible selection/errors and no clipped controls or whole-page horizontal overflow. Narrow pages deliberately become a long single column. The filtered desktop board retains its selected workbench and explanatory hidden-selection status. These are bounded visual observations, not user research or inspection of every matrix screenshot.

All new runtime files and the validator were normalized to LF, UTF-8 without BOM, with one final newline before the corrected run. The actual report's HTML, CSS and script fingerprints match the preview author's frozen runtime identities. No semantic runtime changes followed that run.

## Reproduction and limits

Use installed Playwright and Chromium, with a new output directory:

```sh
node tools/validate-neobrutalism.mjs --module /path/to/playwright/index.mjs --browser /path/to/chromium --output /path/to/fresh-results
```

The optional `--preview` argument targets an equivalent preview directory, including the prepared static site. The validator serves only that directory under a loopback subpath, closes its browser/server and writes the raw JSON plus PNGs. Repository/build checks handle neighboring documentation links. No package, browser download or remote service is needed by the runtime specimen.

Chromium is the only tested engine. There is no screen-reader, physical-device, other-engine, native zoom/text-enlargement, real backend or performance test. Named font binaries and full themed apps are outside the test. Contrast excludes hidden/placeholder text, native popup/validation UI, glyph internals, decorative/SVG content and antialiasing; unsupported measured compositing fails rather than silently passing. Disabled static content remains measurable because its inherited text colors and opacity stay intact. The finite widths and states establish neither universal compatibility nor accessibility conformance. Source-based fit judgments remain separate from browser passes.
