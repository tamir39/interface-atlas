# Web Brutalism reference preview

Open [index.html](index.html) directly in a browser. **Open Index** is an original, content-first raw document variant: six short frontend notes, an ordered native fragment index, and an optional browser-local reading plan. It works offline without a build, packages, external requests, font downloads, images, or a server.

## Document and local tools

- All six original articles are complete HTML and always remain visible. Their stable IDs are `document-order`, `form-labels`, `link-names`, `reading-type`, `empty-states`, and `motion-choice`. Index links and each article’s Back to the index link use native fragment addresses. No link handler, history replacement, smooth scrolling, or scripted navigation intercepts them; normal browser Back/Forward remains available.
- The optional filter searches index **titles, topics, and summaries** only. Matching rows retain their original order and original ordered-list numbers. Article bodies are not searched or hidden. The result count and empty recovery explanation state that the full text remains below. Clear filter restores the index and focuses its search field.
- Native checkboxes add notes to the plan. Their stable labels do not change when checked. Filtering retains every selection, including selected rows that become hidden. The live count reports the number selected and the number of selected notes hidden by the filter.
- The editable plan title requires **3–48 characters after trimming spaces**. Invalid submission associates an error with the title, keeps the title and all selections, and focuses the title. The field deliberately has no `maxlength`, so overlong pasted or programmatically entered text receives the same visible validation. Editing clears its stale error. User text is handled only as input values and plain text; messages use `textContent`.
- **Download selected notes** is disabled until at least one note is selected, with a visible hint. A valid submission creates a real UTF-8 `text/plain` Blob named **`open-index-reading-plan.txt`**. It contains the trimmed actual title and every selected original note’s title, topic, paragraphs, and canonical public note address, in original document order. Hidden selected notes are included; unselected notes are excluded. Addresses use the fixed public `https://tamir39.github.io/interface-atlas/styles/web-brutalism/preview/#<note-id>` base, including when opened locally; no local paths or `file:` URLs enter the download.
- The download is a manual copy. No backend, account, storage, autosave, synchronization, remote submission, or durable in-page save is involved. Reload clears selections and filter, restores the original plan title, and returns settings to **Editorial / Light / Off**.
- Without JavaScript, runtime settings, filtering, checkboxes, and the download form remain disabled with a visible explanation. All six articles, every index anchor, ordinary reference links, and native disclosures remain usable. Runtime controls enable only after complete initialization; articles are never replaced by an enhanced rendering.

## Theme identity and explicit overrides

The theme switcher exposes Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery, and Layered. Each supplies a source-mapped subset of actual palette roles and declared body, display, and mono font stacks. Switching updates the fit caution, body-stack disclosure, and theme/source/font-credit links. This shared document loads no complete theme applications and does not establish full theme/style compatibility.

The body uses `--theme-font`; the title and article headings use `--display-font`; metadata and code use `--mono-font`. Normal document text uses Ink on Page, supporting text uses Muted, visible underlined links use Primary, native fields use Ink on Raised, and the download action uses Primary / On-primary. Necessary structural and control edges use **1px Border rules**. Palette and type remain theme-specific rather than a universal monochrome or monospace treatment.

This variant explicitly overrides **every actual section and control corner to 0px**, with **no shadows, gradients, blur, decorative pseudo-elements, or hero artwork**. All 15 projected source variables remain unmodified, including `--card-radius` and `--control-radius`; actual rendered geometry does not consume those two roles. Thick card borders, stacked color cards, and hard offset shadows belong outside this raw document recipe. More expressive Web Brutalism variants remain outside this preview’s rendered evidence.

A single document column is at most **880px**, with a **96px total viewport inset** on wider screens. At 620px and below, it uses a **40px total inset**, settings stack, and each checkbox moves below its index copy. Article paragraphs have a **65ch maximum measure**. Long headings, summaries, code stacks, and messages wrap. Native form fields and actions have a **44px minimum height**; checkbox labels supply the 44px target around native **18×18px** inputs. Links and disclosure summaries also have 44px minimum targets. Keyboard focus is **3px Ink with a 3px gap**.

## Motion and preference fallbacks

Border feedback starts **Off**. On permits only a **100ms ease `border-color` transition** on fields, settings, buttons, and index rows, from Border toward Ink on hover. No transform, translation, scale, shadow animation, entrance sequence, smooth scrolling, or delayed task is used. An active action underlines its words immediately. The native checkbox supplies its own checked state.

Reduced motion removes the transition through CSS independently of JavaScript. Forced colors also removes it. Document surfaces and text use Canvas / CanvasText; ordinary document links use LinkText; native form controls and actions, including the button-like skip link, use ButtonFace / ButtonText. The heading’s colored period and Atlas mark use CanvasText. Native checkbox rendering remains under the system’s control. Boundaries, checks, labels, underlines, error text, and focus remain available without a broad `forced-color-adjust: none` escape. System appearance follows live device changes; the status reports the effective preference.

## Selective loading

[theme-tokens.css](theme-tokens.css) and [theme-tokens.json](theme-tokens.json) are generated by [the token tool](../../../tools/style-tokens.mjs) from each existing theme’s actual preview stylesheet. The manifest preserves source mappings and hashes. The snapshot projects `--page`, `--surface`, `--raised`, `--ink`, `--muted`, `--primary`, `--on-primary`, `--border`, `--focus`, `--error`, `--theme-font`, `--display-font`, `--mono-font`, `--card-radius`, and `--control-radius`. This variant uses Ink for focus rather than the projected Focus role.

The page loads only that local snapshot, [styles.css](styles.css), and [preview.js](preview.js). A consuming project should select its identity and only the Web Brutalism rules and optional motion required by its task. The nine-profile switcher is a finite comparison specimen, not a production loading recommendation. Named fonts retain installed system fallbacks; no font software is downloaded or redistributed. Exact rendering and language coverage depend on the reader’s machine.

## Stable test hooks

| Purpose | Selector or values |
| --- | --- |
| Preferences | `#theme-select`: nine theme IDs; `#appearance`: `light`, `dark`, `system`; `#motion`: `off`, `on` |
| Root state | `html[data-theme][data-appearance][data-motion]`; `data-ready="true"` after complete initialization; `data-effective-motion` explanatory metadata |
| Effective preference | `#material-status` |
| Native index | `#index`, `ol#note-list > li.index-entry.index-row[data-note-id]`, `.note-link[href="#<note-id>"]` |
| Index content | `.note-title`, `.note-topic`, `.note-summary` |
| Plan choices | `input.plan-checkbox[name="note"][data-note-id]`; `#plan-<note-id>`; native stable labels |
| Filter / recovery | `#index-filter`, `#note-search`, `#clear-search`, `#search-status`, `#empty-search` |
| Full HTML articles | `#notes`, `article.note[data-note-id][id]`, `.note-copy > p` |
| Plan / validation | `#plan-form`, initially disabled `#plan-fields`, `#plan-title`, `#title-error`, `aria-invalid` |
| Count / download | `#selection-status`, `#download-button`, `#download-hint`, `#download-status`; `open-index-reading-plan.txt` |
| Source disclosure | `#theme-label`, `#theme-fit`, `#font-stack`, `#theme-source-link`, `#theme-credits-link` |
| No-JS explanation | `#js-status`; the same six articles and native links remain visible |

## Credits and evidence limits

Created by **Tamir (Phi Vuong Tuong Tam), with Codex**, for Interface Atlas. The Open Index layout, six frontend notes, CSS, and interaction code are original Atlas work. The inline mark reuses the repository’s original [Atlas brand artwork](../../../assets/brand/README.md).

**David Bryant Copeland** receives credit for the [Brutalist Web Design guidelines](https://brutalist-web.design/) referenced by this content-first branch. **Brutalist Websites** receives distinct credit as a [directory of varied examples](https://brutalistwebsites.com/). These references establish neither a sole inventor nor a universal family recipe. No source prose, code, layout, screenshot, or artwork is copied. [Source notes](../sources.md), [style rules](../style.md), [optional motion](../motion.md), and [reuse notices](../../../THIRD_PARTY_NOTICES.md) record scope and provenance.

The [validation record](../validation.md) reports checks actually run. The finite document does not certify every theme combination, broader family variant, assistive technology, font rendering, accessibility conformance, performance, or production readiness.
