# Layered reference validation

Reviewed **2026-10-15** against Layered **0.1.0-draft**. **Theme status remains draft.** This record covers the original [reference preview](preview/README.md): the fictional Small plans workspace, three sample projects, nine tasks, filtering, a native modal editor and project-specific recovery. There is no account, cloud save, collaboration, backend command or agent execution.

## Environment and reproduction

Windows; Node.js **24.14.1**; Playwright **1.62.1**; headless Chromium **153.0.8010.12**. Existing local dependencies were used; no package was installed into Atlas. Only local HTML, CSS and JavaScript load. No font binary, image, icon library, Material/Fluent runtime or external resource is requested.

Run [tools/validate-layered.mjs](../../tools/validate-layered.mjs) with installed Playwright and Chromium following [the tool instructions](../../tools/README.md). The retained [JSON evidence](preview/validation/results.json) records measurements, exclusions, font identities, scoped captures, and SHA-256 hashes of the final normalized repository HTML, CSS, JavaScript and validator. Hashes are checked again at the end. Use a temporary output directory for subsequent verification.

## Performed checks

| Check | Observed result | Limit |
| --- | --- | --- |
| Responsive composition | Passed **20 combinations**: light/dark × comfortable/compact × 320, 390, 768, 1280, 1440 CSS px; no page-wide horizontal overflow | Fixed fictional data and representative states |
| Opaque HTML text | **144 or 148 samples per layout**, minimum **5.65:1 light / 5.67:1 dark**; applicable normal/large-text thresholds passed | Disabled, SVG, placeholders, unrendered/visually hidden text and unsupported backgrounds are excluded or recorded |
| Necessary field boundaries | All **six** expected enabled fields per layout sampled against fill and adjacent solid surface; minimum **4.36:1 light / 4.69:1 dark** | Appearance, density, search, category and two specimen fields; native checkbox glyph internals excluded |
| Density and targets | Specimen inset **24px → 16px**, height **1015.53px → 999.53px** at 1440px; sampled card/detail geometry unchanged; enabled controls, associated checkbox labels, workspace navigation, brand, project links and document navigation retained **44px width/height** | Contextual inline source links excluded; actual mobile field text stayed at least 16px |
| Native navigation | Keyboard skip focused main; all three project Open links focused matching detail headings and exposed current context with contextual names | Role/name lookup and Chromium accessibility snapshots, not assistive-technology listening |
| Filtering and empty recovery | Combined case-insensitive title/description search and category retained fixed order, current detail, tasks and saved edits; Clear reset filters and focused Search | Three local records, no production search service |
| Task state and Search Enter | Per-project and aggregate counts followed real checkbox changes reversibly; Enter in Search preserved the same document, selected project and task edits | Local memory only, no durable save |
| Native modal lifecycle | Title received entry focus; forward/reverse keyboard traversal reached all dialog controls; background programmatic focus was blocked; Escape/Cancel discarded draft and restored Edit | Chromium's native cycle includes one document-viewport step; no background page control became reachable. This is not a custom focus trap or cross-browser guarantee |
| Invalid draft | Whitespace, overlength and unknown priority stayed open without changing saved state; associated inline errors and linked summary identified corrections; summary heading received focus | The summary-focus policy is an Atlas choice, not a universal WAI requirement |
| Modal/error states | **Eight samples**: light/dark × 320, 390, 768, 1280px; modal text minimum **7.09:1 / 6.93:1** and field-boundary minimum **4.96:1 / 4.69:1**; actions retained targets and fit | Only the active opaque modal is measured; dimmed inert background, backdrop and shadow are outside the contrast scope |
| Save and scoped Revert | Save trimmed and atomically reflected title/priority/contextual names without altering tasks, reapplied preserved filters, closed and restored Edit; Revert restored only the current project's initial fields/tasks and focused its heading | No server transaction, concurrent edits, undo history or synchronization |
| Preferences and storage | System followed live device changes; explicit appearance overrode it; exactly appearance/density/motion persisted; fragment-free reload reset temporary workspace state; blocked, invalid and malformed storage remained usable with truthful failure copy | Representative storage failures; first-frame paint timing not instrumented |
| Direct fragments | Initial and live valid project fragments revealed and focused their matching articles; unrelated fragments retained a safe default | Native section links remain ordinary anchors; not general router/history coverage |
| Motion | Only **160ms** color/background/border feedback; reduced motion and motion-off were immediate; no automatic or modal animation ran | No rendering-performance benchmark |
| Forced colors and text resize | Sampled focus retained **3px outline / 3px offset** with a system color; at 640px, 200% CSS root sizing doubled body text **16px → 32px** while page and modal actions remained available without horizontal overflow | CSS text resizing is not native browser zoom; forced-colors check is representative |
| Long content | A real edited Vietnamese title remained complete with contextual actions at 320, 768 and 1440px | One representative long title, not exhaustive translation or glyph coverage |
| Missing/failed modal API | Absent and deliberately throwing showModal disabled all Edit actions with a readable explanation; filters, task changes, counts and native project navigation remained usable | Injected browser API fixtures, not evidence for other engines |
| No JavaScript | All three static articles, anchors and truthful task states remained readable at 320px; **20 runtime controls** stayed disabled; native specimen fields remained editable; **165 opaque samples**, minimum **5.67:1** in dark appearance | Filtering, task mutation, editing and preferences require JavaScript |
| Resources and file integrity | No ordinary runtime errors, external requests, failed responses or failed requests; all three preview-file hashes and validator hash remained unchanged | No real network, backend, touch device or service behavior |

The JSON contains **18 grouped checks**; this table separates related observations. Every base layout includes nonzero opaque text and all six expected enabled field boundaries. No unsupported background/color samples were reported in the final layout matrix. Exclusions remain explicit in the JSON. [Design.md](design.md) supplies separate opaque token calculations rather than a complete rendered-accessibility claim.

## Fonts and visual evidence

Chromium reported **Segoe UI** for body and Vietnamese, **Segoe UI Semibold** for display, and **Consolas** for technical text. All sampled glyphs used installed platform fonts; no custom font rendered. **Plus Jakarta Sans was not rendered in this environment.** The selected family, exact packages, weights, full script coverage and fallback metrics remain project checks.

Desktop, mobile and modal captures were visually inspected for surface hierarchy, readable controls, wrapping, clear project context, form correction and coherent geometry. The reference's actual breakpoint, spacing, type and density adaptations are recorded in [preview notes](preview/README.md).

- [Light desktop](preview/validation/light-desktop.png): **1440 × 1000** initial workspace viewport.
- [Dark desktop](preview/validation/dark-desktop.png): **1440 × 1000** viewport with the native modal and a validation error.
- [Light mobile](preview/validation/light-mobile.png): **390 × 1000** viewport beginning at the first project card.

These are scoped viewport captures, not full-page coverage. Additional working desktop/mobile/full-page captures were inspected during review but are not claimed as retained artifacts.

The specification, palette, geometry, static artwork, native code, fictional data and workflow are original Atlas work for **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. **Google / Material Design**, **Microsoft / Fluent Design**, **Gumpita Rahayu / Tokotype**, the separately credited commissioning context, **WHATWG**, **W3C APG** and **WAI/EOWG** have distinct reference roles in [sources.md](sources.md). No upstream component, code, website text, token package, screenshot, logo, icon library or font software was imported.

The validator checks repository preview files. The [Pages builder](../../site/README.md) allowlists native preview files and rewrites Markdown links in the published copy. The built hub, project-relative routes, document links, deployed bytes and representative live editing/filter paths are checked separately before reporting publication complete.

## Corrections and remaining coverage

Review prevented Search Enter from reloading and losing temporary changes, made initial valid-fragment focus settle after native browser navigation, corrected storage-failure feedback, removed a misleading permanently highlighted section link, and aligned easing/focus dimensions with the specification. Selected detail spacing no longer inherits the no-JavaScript separation between static articles. The final evidence ran after repository text normalization and includes the actual workspace navigation in target sampling.

Each consuming project still needs supported browsers, touch devices, screen readers and announcements, native zoom, complete keyboard/focus-clipping coverage, translated content, actual licensed font packages, arbitrary content growth and real persistence/recovery contracts. Native dialog behavior, numerical contrast and a bounded preview do not establish full WCAG conformance, intended-font rendering, real-device performance or production editing behavior.

A collaborative or agent-enabled adaptation additionally needs ownership, permissions, pending versus confirmed effects, concurrency, durable saves, recovery and audit history. Layered has not yet received a fresh complete project-design generation evaluation. Atlas publishing terms remain undecided.
