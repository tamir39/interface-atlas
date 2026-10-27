# Next Up composition design

This bounded reference applies the [Flat Design grammar](../../styles/flat-design/style.md) to **Next Up**, an original browser-local task board. Opaque filled planes, type, spacing, rules, named controls and explicit Open/Done text provide hierarchy and affordances without decorative depth. The family is distinct from Minimalism's content reduction, Swiss identity and the raw-document Web Brutalism interpretation. [Sources and credits](../../styles/flat-design/sources.md) separates authored research and historical examples from Atlas's recipe.

## Task and state contract

Four original task IDs are focus-states, responsive-navigation, form-errors and source-credits. The last starts Done; the others start Open. A stable native checkbox label supplies each task's name; checked state is separate native semantics and visible Open/Done text. No task is reordered by completion. All/Open/Done changes visibility, not data.

When a focused checkbox leaves the current filtered list, focus moves to the next remaining checkbox or the filter if none remains; the task outcome is announced. Under All, completion keeps focus on its checkbox. An empty filtered view offers Show all, which restores original order without resetting completion. Reopening under Done has the same disappearing-row focus contract.

The title field is required and accepts **3–64 characters after trimming**; programmatic values beyond 64 are rejected rather than relying on maxlength. Priority is High, Normal or Low. Invalid input receives visible described text, native/custom invalid state and first focus. Valid submission appends one Open task using plain text, clears the title, retains the chosen priority and focuses the title for further entry. If Done hides the added task, the status explains that result; Show all reveals it. Literal markup is text, not a new HTML element.

Completion, additions, raw title, priority and filter survive theme/appearance/motion changes. Reload discards them and restores four original tasks, the normal priority, All filter and initial settings. No storage, server operation, remote pending state, durable-save guarantee or export is implied. Without JavaScript or when initialization is aborted, original task content remains readable and unavailable enhancements stay disabled with an explanation. Native links, skip access and disclosures remain usable.

## Profile preservation and intentional departures

The generated manifest retains all 15 selected source variables, nine original stylesheet hashes and 18 light/dark identities. The shared task board keeps named font stacks and palette roles. Two authored panel roles use the projected card radius; selects, text entry and buttons use the projected control radius. Native checkbox glyphs and popup internals are outside that geometry claim. Editorial's projected 12px control radius is already a text-entry adaptation; it is not the source's universal 999px button shape.

No font binaries, complete source layouts, artwork, density systems or specialized product workflows are reproduced. Flat treatment removes decorative shadows, gradient/blur/texture and physical depth. Corners can remain rounded. Opaque groups and visible words distinguish state; no translucent status, color-only state, faded completed text, press movement or decorative texture is needed. Optional 120ms border-color feedback defaults off; reduced motion and forced colors make it immediate.

## Nine independent fit judgments

| Profile and actual source | Retained shared geometry | Judgment for this task |
| --- | --- | --- |
| [Blueprint](../../themes/blueprint/design.md) | 8px panels, 4px controls; Manrope and JetBrains Mono | Technical task labels and clear structure offer a useful affinity. Removing selective offset decoration and using ordinary task rows rather than drafting geometry is a deliberate simplification; this does not exercise diagram or technical-workspace workflows. |
| [Botanical](../../themes/botanical/design.md) | Alternating 32/8px panels and 22/6px controls; Manrope and DM Serif Display | Organic corners, palette and serif role survive. Removing gentle elevation changes the surface recipe; the brief task board does not test narrative reading or service identity. A possible scoped adaptation needs a project decision, not a blanket compatibility label. |
| [Editorial](../../themes/editorial/design.md) | 24px panels, projected 12px controls; Manrope and expressive serif | Readable hierarchy can support concise task content. Flat opaque groups replace selective raised surfaces; the 12px projection is not a claim that original capsule actions were preserved. Portfolio/case-study reading remains outside this task. |
| [Gallery](../../themes/gallery/design.md) | 4px panels and controls; Inter | Flat surface restraint is a real affinity. A textual task board does not exercise Gallery's image-led composition, meaningful media or viewer workflow; appearance/profile evidence is broader than demonstrated product fit. |
| [Layered](../../themes/layered/design.md) | 24px panels and 12px controls; Plus Jakarta Sans | Opaque role groups, repeated geometry and flat resting surfaces already fit the source. Functional hierarchy still matters; this small list does not test workspace navigation, blocking editor or optional modal-backdrop behavior. |
| [Play](../../themes/play/design.md) | 30px panels and 14px controls; Manrope | Palette and expressive rounded shape survive, but removing hard offset panel/action depth discards a characteristic source cue. This is a substantial explicit material departure rather than an inherently natural fit. |
| [Precision](../../themes/precision/design.md) | 4px panels and controls; IBM Plex Sans | Flat layers, necessary boundaries and concise information offer strong affinity for a short checklist. The board provides no evidence for remote outcomes, dense operational tables or a complete agent-control interface. |
| [Pulse](../../themes/pulse/design.md) | 12px panels and 6px controls; short condensed display and ordinary-width body | Flat task surfaces already agree with the source. The short title preserves a bounded display role, but this specimen lacks poster/artwork, schedule and event-workflow evidence. |
| [Swiss](../../themes/swiss/design.md) | 2px panels and controls; Manrope | Alignment, typographic hierarchy and shadow-free structure offer strong affinity. Flat Design and Swiss remain different categories; the shared board is not a full Swiss composition or universal grid prescription. |

These judgments are Atlas interpretations grounded in the linked theme rules, independent of whether the shared profile renders successfully.

## Browser method

The optional validator serves the actual source under a loopback subpath with existing Playwright/Chromium. It records five runtime hashes, its own hash, nine source fingerprints and 18 computed identities. A bounded fixture simulates only the builder's initial README/credits href rewrite to GitHub, then verifies actual initialization and all nine choices preserve absolute targets. Local identities separately retain relative hrefs. Actual site-build/public smoke checks remain release evidence.

The base matrix is nine profiles × light/dark × 320/1280px × motion off/on: **72 states**. Each identity also receives checked, invalid-title, hover, pointer-active off/on and six keyboard-focus contexts. Dedicated task trials cover native Space, stable names, title bounds, unbroken maximum title, accented/literal text, filtering and disappearing-row focus, empty recovery, retained drafts and reload. System appearance, reduced motion, forced colors, disabled JavaScript and intentionally aborted initialization receive separate checks.

Actual visible HTML text is composited through ancestor fills and checked at 4.5:1 for normal text or 3:1 for large text. Thresholds use raw unrounded ratios; recorded presentation values round to three decimals. Necessary fields need 3:1 boundaries against both fill and parent; actions need a 3:1 boundary or fill against their parent. Keyboard outlines require at least 3px width, 3px gap, 3:1 adjacent contrast and no clipping. Authored corner arrays are compared with native CSS probes using the selected source radius variables. Paint, targets, explicit states and whole-page reflow are checked separately.

Native checkbox glyphs, select popups, native validation bubbles, placeholder text, antialiasing and browser decorations are outside arithmetic. Bounded screenshots supplement measured paths, especially forced-color checked-checkbox/focus, invalid title and active action. Actual role probes compare document content to Canvas/CanvasText, ordinary links to LinkText, fields/actions to ButtonFace/ButtonText and focus to CanvasText. The button-like skip action uses ButtonFace/ButtonText. No broad forced-color-adjust:none override is needed.

This is finite Chromium evidence, not full accessibility conformance, a screen-reader session, other browser engines, physical devices, native zoom/text enlargement, intended font-binary metrics, a user study, backend behavior, performance or complete themed application validation.
