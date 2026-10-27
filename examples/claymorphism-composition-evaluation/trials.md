# Claymorphism composition: trial record

## Actual corrected browser run

On **2026-10-27**, `tools/validate-claymorphism.mjs` ran with **Node v24.19.0**, optional installed Playwright and **headless Chromium 153.0.8010.12**. The corrected run passed **11 check groups**, **72 base states** and **180 measured interaction contexts**, including **72 dedicated keyboard-focus contexts**. Its five runtime-file fingerprints match the frozen LF, UTF-8-without-BOM preview bytes; the validator fingerprint identifies the maintained source used for this run.

[results.json](results.json) is the validator-generated compact projection of that actual report, not hand-authored passing data. It preserves all 72 matrix and 180 interaction rows under explicit column schemas, all 18 computed identity sets, nine source CSS fingerprints, group observations, exclusions and the raw report's SHA256. Per-element text, boundary, target, material, selected-outline and focus samples remain in the **11,178,641-byte** temporary raw report. Its SHA256 is `b801b4d554960b8c0a5f24f36166b71777777e039cb7a4bc77d532d71d98e9df`. Ten PNGs remain beside it; screenshot binaries are not distributed with Atlas.

| Observed check | Corrected result |
| --- | --- |
| Nine profiles × light/dark × 320/1280px × motion off/on | **72/72** states passed computed contrast, whole-page reflow, 44px controls, explicit material shape and opaque content protection. Every base state measured at least **122 visible HTML text samples** and **10 enabled controls**. |
| Actual source identity | All **18** computed light/dark value sets matched the generated manifest; all **nine source CSS hashes** matched. The nine light profiles differ by actual values. No theme label substitutes for a real profile. |
| Text and necessary boundaries | Minimum text **5.036:1**, field border **3.615:1**, button boundary **3.162:1**. The limiting text was Botanical light's practice-introduction support copy on its Surface. Field borders were measured against both their fill and parent; shadows do not establish affordance. |
| Protected material and host geometry | Every clay shell had opaque outer and direct inner fills, 28px/16px corners, a 12px reserved frame, readable content contained in its shadow-free child and no generated text overlays. Ordinary fields and work/settings/studio panels retained their source geometry. |
| Selection, errors, hover and active states | **108 contexts** across every light/dark profile passed. `aria-pressed`, Selected text and an independent outline identify selection; title/minutes errors expose associated feedback. Actual hover underlines the practice name. Actual active-off stays level; active-on travels 1px over 120ms using only transform. |
| Dedicated keyboard focus | **72 contexts** across theme select, title input, practice choice and review button passed. Each had a 3px external outline at least **5.321:1** against its adjacent parent, with no overflow-hidden/clip ancestor clipping. Selected outlines independently reached **5.321:1**. |
| Local flow and recovery | Skip navigation focuses main; Space selects one native practice button. Trimmed title length 3–48 and integer minutes 5–120 in steps of 5 are enforced, including associated errors and first-invalid focus. A valid local review displays title, practice and minutes. |
| Continuity and stale review | Theme, appearance and motion changes retain inputs, practice and valid review. Editing an input or choosing a practice hides the stale snapshot. Reset restores the sample title, Sketch practice and 20 minutes, clears errors/review and focuses the title. No remote action occurs. |
| System and reduced motion | System follows live OS light/dark changes. OS reduced motion overrides explicit On during an actual pointer press, removing travel, transition and active animations. |
| Forced colors | System roles override the selected theme. Shadows and decorative artwork disappear; all visible HTML text including decorative marks, necessary boundaries, selection and focus remain readable. Actual pointer press has no travel or transition. |
| Resilience and resources | No-JavaScript and aborted-script trials retain readable static content, disabled enhancement controls and native documentation links. Ordinary exceptions, failed resources and external requests were absent; the intentional `preview.js` abort is separate. |

Normal text needs 4.5:1; large text 3:1. Native fields require a real 3:1 border against fill and parent. Buttons require a 3:1 border or fill against their parent. Keyboard outlines need 3:1 and at least 2px width. The [evaluation design](design.md#browser-method) explains compositing and exclusions. The 44px target is an Atlas comfort goal, not a complete accessibility finding.

## Rendering defect, repair and visual inspection

The first actual automated run passed the 72 base and 180 interaction contexts, but manual inspection found a forced-color rendering defect. Selected content and the primary button used system Highlight/HighlightText fills; Chromium's forced-color text backplates rendered their words as solid black blocks on cyan. Computed foreground/background ratios did not reveal that visual failure. The preview changed forced-color selected content to Canvas/CanvasText and the primary action to ButtonFace/ButtonText. Selection remains explicit through Selected text and an independent system outline. No source palette was altered and no visible text was excluded to obtain a pass.

The corrected actual run was repeated against frozen normalized source. Its forced-color narrow screenshot visibly restores readable selected and primary-button text. The validator also explicitly sets 1280px before its desktop review capture; the first trial's initially mislabeled desktop capture was narrow. That capture correction does not change preview behavior.

The validation author inspected Play light and Swiss dark full-page 320px captures for readable text, reserved shading around the opaque reading center, visible selection and unclipped controls. After the repair, the author inspected the corrected forced-color 320px capture and Botanical dark **1280px** local-review capture. The preview author separately inspected corrected forced-color selected/primary details and a valid 48-character unbroken title at 320px, observing no page overflow. Narrow layouts deliberately become a long single column. These are bounded visual observations, not inspection of every possible state or a user study.

All runtime files and the validator were LF, UTF-8 without BOM, with one final newline before the corrected run. No semantic runtime changes followed the recorded run. The first temporary report and screenshots remain separate from the corrected evidence.

## Reproduction and limits

Use installed Playwright and Chromium with a new output directory:

```sh
node tools/validate-claymorphism.mjs --module /path/to/playwright/index.mjs --browser /path/to/chromium --output /path/to/fresh-results
```

The optional `--preview` argument targets an equivalent preview directory, including the prepared static site. The validator serves it under a loopback subpath, closes its browser/server, and writes raw JSON, a generated compact JSON projection and PNGs. Repository/build checks cover neighboring documentation links. The runtime preview needs no dependency download or remote service.

Chromium is the only tested engine. No screen reader, physical device, other engine, native zoom/text-enlargement, real backend or performance benchmark was tested. Named font binaries, complete themed apps and meaningful imagery are outside this specimen. Contrast excludes hidden/placeholder text, native popups/validation UI, glyph internals, SVG paths and antialiasing; visible decorative HTML text is included. Box-shadow pixels are not arithmetic backgrounds: opaque containment assertions and bounded screenshot inspection supplement the computed checks. The finite matrix establishes neither universal compatibility nor accessibility conformance. Source-based fit decisions remain separate.
