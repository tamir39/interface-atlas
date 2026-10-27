# Skeuomorphism composition evaluation

**Fieldbook** is an original Atlas notebook specimen with four fictional notes, an applied searchable index, an opened reading view, per-note draft caches, Apply locally, current-note Revert and a real UTF-8 text download. Its cover, binding and separate page stack give the physical metaphor a useful task. All changes live only in the page; reload resets them.

[Open the preview](../../styles/skeuomorphism/preview/index.html) · [Design and fit decisions](design.md) · [Trial record](trials.md) · [Machine evidence](results.json)

The **2026-10-27** frozen run passed in headless Chromium **153.0.8010.12**, Node **v24.14.1**: **72 base states**, **198 measured interaction contexts**, including **90 keyboard-focus contexts**, and **13 check groups**. The base matrix covers nine actual source-token profiles × light/dark × 320/1280px × motion off/on. All 18 computed identities and nine source CSS fingerprints matched.

| Measured minimum across base/interaction contexts | Result |
| --- | --- |
| Visible text | 5.627:1 |
| Field boundary against fill and parent | 3.615:1 |
| Button boundary or fill against parent | 3.615:1 |
| Selected outline | 10.282:1 |
| Keyboard outline | 10.282:1 |
| Enabled target | 97.23px wide; 44px high |

Normal text requires 4.5:1; large text 3:1. Necessary field boundaries, button boundary/fill, selection and focus require 3:1. The [method](design.md#browser-method) defines computed color paths, structural material checks and exclusions; 44px is Atlas's comfort goal.

The adapter preserves 15 extracted variables per profile, source outer cover/index corners and ordinary action/field corners. Editorial's ordinary-control projection is the source preview's 12px text-entry adaptation, distinct from the theme's original capsule buttons. The paper artifact explicitly overrides corners to **2px**. All readable content sits on opaque Raised faces above decorative paper, rules, binding and seam layers. Binding geometry, containment, paint order and bounded screenshots supplement arithmetic; texture/shadow pixels are not flat RGB backgrounds.

Task checks cover native/custom trimmed bounds, first-invalid focus, Apply updating actual reading/index text, literal markup remaining text, raw per-note draft retention across switches, current-note Revert, preference retention, applied title/body/tag search, hidden-open context/recovery and maximum 48-character title/240-character body reflow. The actual download was **171 bytes**, named **fieldbook-small-route.txt**, containing the applied literal title and accented café text, applied tags, and no dirty draft. Its decoded content and SHA-256 are retained. Reload resets changes/caches.

Live System appearance, reduced-motion override, forced colors, JavaScript disabled and aborted initialization passed. Forced colors uses neutral Canvas/CanvasText content and ButtonFace/ButtonText actions with actual CanvasText focus. Visible heading punctuation, selected words and action words remain measured; material and press motion are removed. No ordinary runtime/resource failures or external requests occurred.

The committed **166,090-byte** compact report preserves every matrix/interaction row and column schema, 18 identities, nine source fingerprints, five runtime hashes, validator hash, task/download/accessibility-name evidence and the raw-report fingerprint. The **13,630,240-byte** raw report and PNGs stay in the temporary run directory. Runtime and validator sources were UTF-8 without BOM, LF, one final newline before the passing run; end-of-run checks confirmed unchanged bytes.

Reproduce with installed dependencies and a fresh output directory:

~~~sh
node tools/validate-skeuomorphism.mjs --module /path/to/playwright/index.mjs --browser /path/to/chromium --output /path/to/fresh-results
~~~

Optional --preview selects an equivalent preview directory, including a prepared static build. The preview itself needs no dependency install.

This is bounded Chromium evidence, not complete theme compatibility or accessibility conformance. Source-fit judgments remain separate: Botanical/Editorial permit reasoned reading adaptations; Play needs an explicit depth replacement; Blueprint, Gallery, Layered, Precision, Pulse and Swiss each require material departures described in [the nine decisions](design.md#fit-decisions). No screen reader, physical device, other engine, native zoom/text enlargement, intended font binaries, meaningful imagery, complete themed application, backend, performance study or user study was tested.
