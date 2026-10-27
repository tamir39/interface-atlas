# Fieldbook trial record

Evaluation date: **2026-10-27**. The final frozen source passed in Chromium **153.0.8010.12** and Node **v24.14.1**. [Compact results](results.json) retain every matrix/interaction row and schema, actual source/runtime identities, task outcomes, accessible names and download bytes/content/hash. The raw-report SHA-256 is **525a75e8421b653160035bceef713a60e1da88b52412cab81cb08738585c3409**.

## Trials and repairs

The first actual validator trial passed all **72 base states** and **198 measured interaction contexts**, then stopped on a validator-only locator problem. A temporary opened-note data attribute made the broad [data-note-id] selector match both a native note button and its folio span. The selector was narrowed to .note-option[data-note-id]. The temporary attribute and technical ID payload were removed during contract review; stable note identity remains in the downloaded filename. The final test reads the selected note button's actual ID.

Before the final matrix, preview-author visual QA found a real forced-colors defect: inherited forced-color-adjust:none allowed theme field fills and explicitly muted descendant text to survive under system colors. The preview now assigns system role variables on body, explicitly assigns Canvas/CanvasText fields, and removes decorative pseudo-pages/binding. This repair was motivated by rendered inspection rather than an arithmetic-only claim.

The second actual trial passed 72/198 and every local note flow, including real UTF-8 export, applied search, maximum reflow/reload, live System and reduced motion. It stopped on a validator-only forced-focus assumption: an unused inherited --focus token remained a source value while the actual CSS outline explicitly used CanvasText. The assertion now compares the actual resolved outline color with a CanvasText probe. It does not alter source variables or require Highlight.

The third actual trial passed **13 check groups**, all 72 base states and 198 interactions. No runtime or validator changes followed it. The run asserted all five runtime hashes and its own validator hash remained unchanged through completion. All tested files were LF, UTF-8 without BOM, with a single final newline before the recorded run.

## Recorded coverage

| Scope | Evidence |
| --- | --- |
| Identity | Nine actual source CSS fingerprints and all 18 computed light/dark sets, each preserving 15 variables. Distinct profile values, source outer cover/index corners and ordinary-control projection checked. |
| Matrix | Nine themes × light/dark × 320/1280px × motion off/on = 72 base states. Opaque Raised faces, 2px paper override, binder containment/z-order, real boundaries and whole-page reflow checked. |
| Interaction | Each light/dark profile receives selection, empty-title error, empty-body error, hover, actual pointer-active off/on and five keyboard-focus contexts: 198 total, 90 with dedicated focus checks. |
| Keyboard/semantics | Native skip navigation and Space note selection, labeled inputs, one h1/main, no positive tabindex, actual ariaSnapshot/getByRole names before/after selection. Visual Selected text stays aria-hidden while remaining visibly measured. |
| Draft/apply | Required, whitespace, short title, programmatic 49-title/241-body failures; described errors and first-invalid focus; invalid/dirty drafts preserve applied text. Trimmed Apply changes actual reading/index text. Literal A &lt;b&gt;local&lt;/b&gt; walk stays text. |
| Continuity | Raw per-note drafts survive switches; Revert affects only the current draft and uses its last applied snapshot. Theme/appearance/motion changes retain draft/applied context. |
| Search | Actual applied title/body/tag-only matches; dirty title ignored; empty results preserve/announce hidden opened context and draft; Clear restores original index order and current context. |
| Download | Actual file event, saved bytes and fatal UTF-8 decoding; exact fieldbook-small-route.txt filename identifies opened applied record. 171 bytes contain applied title/body/tags, including café, and exclude dirty draft. SHA-256 **3b6a3d8818d47995c72d9346d7fe649144a1f56385e3a5c4e819e7c8732cdee6**. |
| Bounds/reset | Valid unbroken 48-character title and 240-character body wrap at 320px. Reload restores seed applied records and clears caches. |
| Preferences/fallback | Live System light/dark change; OS reduced motion overrides On; forced-color text/selection/actions and actual CanvasText focus; no-JavaScript and deliberately aborted script retain all four static notes and disabled enhancement controls. |
| Runtime | No ordinary exceptions, failed resources or external requests. Intentional aborted initialization is recorded separately. |

Minimum ratios across the normal base/interaction contexts were **5.627:1 text**, **3.615:1 fields**, **3.615:1 button boundaries**, **10.282:1 selection** and **10.282:1 focus**. All enabled targets met 44px high and wide. Forced-color measured text/boundaries/focus were 21:1. The [method](design.md#browser-method) defines finite scope and exclusions.

## Bounded pixel inspection

The validation author inspected final-run 320px Botanical dark, Play light and Swiss dark crops showing index selection, binding, reading text, fields and Apply/Revert; the Botanical dark 1280px maximum-value reading/editor view; and the final forced-color 320px selected note and primary action. The cover perimeter and offset pages remain outside opaque reading centers. Binder rings/rules remain in the left gutter, clear of all words. Source-specific alternating/rounded/square ordinary geometry remains visible. Forced-color selected and action words remain readable with neutral content and no inherited colored field backplates.

The preview author separately inspected desktop light/dark, narrow light/dark, forced-color title/selection/primary action and narrow overflow. These are finite screenshot observations, not all-state pixel auditing, screen-reader testing or a user study. Narrow layouts deliberately form a long single column.

The raw report is **13,630,240 bytes**; the compact projection **166,090 bytes**. The raw JSON, actual .txt download and screenshots remain temporary rather than repository assets. The committed projection preserves their fingerprints/context and all matrix/interaction rows.
