# Neumorphism composition: trial record

## Actual corrected browser run

On **2026-10-27**, the optional installed-Playwright [validator](../../tools/validate-neumorphism.mjs) ran with **Node v24.14.1** and **headless Chromium 153.0.8010.12**. The final corrected run passed **11 check groups**, **72 base states** and **198 measured interaction contexts**, including **72 dedicated keyboard-focus contexts**. The five runtime-file fingerprints and validator fingerprint match the frozen LF, UTF-8-without-BOM source bytes used for this run.

[results.json](results.json) is the validator-generated compact projection of the actual report. It preserves all 72 matrix and 198 interaction rows under explicit column schemas, all 18 computed identity sets, nine source CSS fingerprints, runtime/validator fingerprints, group observations, limits and raw-report SHA256. Every per-element text, boundary, target, surface, selection and focus sample remains in the **13,218,328-byte** temporary raw report. Its SHA256 is **089f545ed020062d1f81a224d3a1591da429c4256115ab1489262f85b3a825a4**. **13 PNGs** remain beside the raw report; screenshot binaries are not distributed with Atlas.

| Observed check | Final result |
| --- | --- |
| Nine profiles × light/dark × 320/1280px × motion off/on | **72/72** base states passed computed contrast, whole-page reflow, 44px controls, actual same-material fills, host geometry and content protection. Each measured at least **126 visible HTML text samples** and **11 enabled controls**. |
| Actual source identity | All **18** computed 15-variable identity sets matched the generated manifest. All **nine source CSS hashes** matched and nine light profiles differed by values. No labels substitute for actual source profiles. |
| Text, boundaries and independent state | Minimum text **5.036:1**, field border **3.615:1**, button boundary **3.162:1**, selected outline **9.504:1**, keyboard focus **9.504:1**. Selection has a check, Selected text, aria-pressed and a real Ink outline. |
| Same-surface material and paint protection | Plane/host/face share opaque Surface RGB. Hosts retain source panel corners; inner corners derive separately as max(0px, host minus 12px). A 12px rim and opaque face at z=1 reserve paired shading below readable content at z=0. Ordinary controls retain source corners. No shadow animation occurs. |
| Selected, invalid, hover and held states | **126 contexts** across all 18 light/dark profiles passed: selected width; name, size and spacing errors; hover; actual active-off and active-on. Hover underlines the width label. Active-off stays level; active-on translates 1px over 120ms using transform only. |
| Dedicated keyboard focus | **72 contexts** across theme select, preset name, width button and Apply passed. The 3px external outline and 3px gap remain visible without ancestor clipping. Selection text persists independently when focus replaces its thinner outline. |
| Local form and recovery | Skip navigation focuses main; Space selects one native width button. Actual accessibility snapshots and role/name queries retain stable width names through selection, independently of aria-pressed. Name trim/length, explicit programmatic 49-character rejection, native size required/range/step flags, tampered spacing and first-invalid focus passed. Valid Apply changes actual sample properties and matching summaries. |
| Draft/applied continuity | Dirty and invalid drafts retain the last applied sample. Theme, appearance and motion changes preserve both draft and applied context. Alternate 72ch/24px/2 and 45ch/20px/1.5 settings changed actual width, size and line height. Reset restores name, 60ch, 18px and 1.75 in both draft/sample, clears errors and focuses name. A valid 48-character unbroken name reflowed at 320px. |
| System, reduced motion and forced colors | System follows live OS light/dark changes. OS reduced motion overrides explicit On during actual press. Forced colors supplies Canvas/CanvasText and ButtonFace/ButtonText, removes shadows/travel/transitions and preserves visible text, real boundaries, selection and focus. |
| Resilience and resources | No JavaScript and intentionally aborted preview.js preserve readable static content, disabled enhancements and native documentation links. Ordinary exceptions, failed resources and external requests were absent. The intentional script abort remains separate. |

Normal text needs 4.5:1; large text 3:1. Field borders need 3:1 against fill and parent; button border/fill and selection/focus outlines need 3:1 against the adjacent parent. The [evaluation design](design.md#browser-method) explains computed compositing, structural shadow checks and exclusions. The 44px size is Atlas's comfort goal, not a complete accessibility finding.

## Actual repairs and bounded visual inspection

The first trial passed all 72 base states and 198 interaction contexts, local task checks, System and reduced motion, then stopped on a validator-only assertion inherited from the separate Claymorphism recipe: it expected Highlight focus. Neumorphism correctly uses CanvasText focus with Canvas/CanvasText neutral content and ButtonFace/ButtonText actions. The assertion was corrected to those actual required system roles.

The next actual forced-color trial found a real preview defect. The visible decorative heading period inherited Primary, which becomes ButtonFace under forced colors, producing black on black at **1:1**. The preview explicitly assigns CanvasText to that mark in forced colors. The mark remains present and measured. A cropped narrow screenshot also exposed “width.Apply” when a hidden line break joined two support sentences; adding a real space corrected that copy. Source review identified changing visual choice-state text inside the toggle name; aria-hidden now keeps that visual cue out of the stable accessible name while aria-pressed carries the state. The final run verifies the actual role/name mapping before/after selection and was repeated against the corrected frozen source.

The validation author inspected Botanical dark 320px selected-width and field crops, Play light 320px reading-content crops, Swiss dark 320px context, the corrected forced-color 320px selection/action context, and the Botanical dark 1280px applied reading view. The material rim stays around opaque reading centers; ordinary words, selected check/text, buttons and focus remain readable, and Botanical's alternating outer corners remain visible. The preview author separately inspected desktop light/dark, narrow layout and forced-color selected/action words. These observations are bounded screenshot checks, not every-state pixel auditing or a user study. Narrow layouts deliberately form a long single column.

All runtime files and the validator were LF, UTF-8 without BOM, with one final newline before the recorded final run. No runtime/validator changes followed it. Earlier temporary reports and screenshots remain separate from final evidence.

## Reproduction and limits

Use installed Playwright and Chromium with a fresh output directory:

~~~sh
node tools/validate-neumorphism.mjs --module /path/to/playwright/index.mjs --browser /path/to/chromium --output /path/to/fresh-results
~~~

Optional **--preview** selects an equivalent preview directory, including the prepared static site. The validator serves a loopback subpath, closes its browser/server and writes raw JSON, a generated compact JSON projection and PNGs. Repository/build checks cover neighboring documentation links. The preview requires no dependency download or remote service.

Chromium is the only tested engine. No screen reader, physical device, other browser engine, native zoom/text enlargement, meaningful imagery, font binaries, complete themed app, backend or performance study was tested. Computed contrast excludes hidden/placeholder text, native popup/validation UI, glyph internals, SVG paths and antialiasing; visible decorative HTML text is included. Box-shadow pixels are not arithmetic backgrounds: opaque containment/paint-order checks and bounded screenshots supplement the computed pairs. Source-based fit remains independent of the browser pass.
