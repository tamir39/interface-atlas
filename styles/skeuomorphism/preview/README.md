# Skeuomorphism reference preview

Open [index.html](index.html) directly in a browser. The original **Fieldbook** notebook works offline without a build, installed packages, images, font files, external requests, or a server. Its cover, binding gutter, CSS rings, and separate paper stack express a bounded physical metaphor across nine existing Atlas theme identities.

## Scope and behavior

- Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery, and Layered supply a source-mapped subset of their actual preview palettes, declared font stacks, and ordinary card/control corners. Switching updates the fit caution, body-stack disclosure, and theme/source/font-credit links. This finite specimen does not load nine applications or establish full compatibility.
- Light, Dark, and System appearances are available; System follows live device changes. Reload restores **Editorial / Light / Off** and the four original notes. No state is persisted.
- Four native note buttons open the applied note and its draft. Stable IDs are `window-light`, `corner-shop`, `small-route`, and `rain-check`. Each button has `aria-pressed`, an explicit Ink selection outline, and Selected/check text hidden from its accessible name. Selection does not change the button name; applying a renamed title legitimately updates it.
- Each note holds a separate draft in page memory. Switching notes preserves raw draft text. The title requires **3–48 characters after trimming spaces**; note text requires **1–240 after trimming spaces**. Tags belong to the original note and are read-only.
- **Apply locally** validates both fields, then updates only the current note’s applied title and text, index name, and searchable content. Invalid apply leaves the applied note intact, associates the errors with the fields, and focuses the first invalid field. It does not save to persistent storage.
- **Revert draft** restores only the current note’s last applied title and text, clears errors, and focuses its title. Other notes’ drafts remain intact. There is no global reset action.
- Search uses **applied** titles, bodies, and tags. It does not search draft changes. Results keep their original order. A filter can hide the open note’s index button while its applied note and draft remain open; a context status explains that condition. Clear search restores all four index entries and the same open note/draft, then focuses search.
- **Download applied text** creates a real UTF-8 `text/plain` Blob with the open note’s applied title, body, and tags. A fixed `fieldbook-<stable-id>.txt` filename avoids filenames derived from user input. A dirty or invalid draft is excluded; the visible hint explains applying first to include changes. This is a manual copy, not an in-app durable save or cloud service.
- No storage, backend, autosave, account, synchronization, submission, or remote note service is involved. Reload resets the entire demo and loses every draft and applied change.
- Without JavaScript, all runtime controls remain disabled with a visible explanation. All four original notes remain readable as native disclosures; the index link reaches them. References, ordinary anchors, and disclosures remain usable. Runtime controls enable only after initialization.

## Material and geometry

The `.fieldbook-cover` uses the theme’s actual `--card-radius` and Surface fill. An **18px cover rim** surrounds the opaque Raised `.fieldbook-face`. Its empty `::before` layer sits at z-index 0, **7px inset**, with a **1px dashed Border seam** and `0 12px 25px rgb(0 0 0 / .14)` cast shadow. The readable face sits at z-index 1.

The separate `.paper-page` is an explicit artifact-only **2px corner override**, with **12px top/right/bottom and 36px left padding** around an opaque Raised `.paper-face`. The inner face also uses 2px corners. Its two empty paper layers use Raised, 1px Border edges, 2px corners, and `1px 2px 0 rgb(0 0 0 / .12)` shading:

| Layer | Top / right / bottom / left inset | Stack position |
| --- | --- | --- |
| First paper edge | `4px -4px -4px 7px` | z-index −1 |
| Second paper edge | `8px -8px -8px 11px` | z-index −2 |

A **24px-wide binding gutter** begins **8px** from the paper’s left edge and **10px** from its top/bottom. Its rules repeat every **28px**, using a 1px Border line. Four **34×12px** CSS rings, with 5px corners, sit at left −13px relative to that gutter, at top 30px, 29%, 60%, and bottom 30px. Their tiny Raised/Border/Surface gradient stays outside the content face. The gutter, rail, and rings are decorative, `aria-hidden`, and ignore pointer events.

Within the notebook, all readable content and controls sit on opaque Raised faces. Decorative seams, rules, rings, offset edges, gradients, and shadows live beneath or outside those faces, never above words or controls. Ordinary index choices and hosts retain the theme’s actual card corners; fields and actions retain its control corners. There is no universal brown paper palette, photographic leather, downloaded font, or imported bitmap.

Selection uses a **2px Ink outline with 3px gap**, `aria-pressed`, and Selected/check text. Keyboard focus uses **3px Ink with 3px gap** and replaces the selection outline while focused. The primary action retains the source Primary / On-primary pair. Necessary boundaries use Border. Native controls and actions have at least a **44px target height**.

## Motion and preference fallbacks

Press feedback starts **Off**. On adds only `translateY(1px)` with a `120ms ease` transform transition for note and action buttons. No shadow animates; no paper flip, physics delay, bounce, scale, drag-only action, or entrance sequence is used. An active action also underlines its words.

Reduced motion removes translation and transition independently of JavaScript. Forced colors also removes the optional travel and all textures, shadows, rules, decorative offset page layers, and binding chrome. Neutral and selected faces use Canvas / CanvasText; actions use ButtonFace / ButtonText; the heading mark uses CanvasText. Explicit boundaries, selected words and pressed semantics, errors, and focus survive. The runtime status reports the effective preference.

The layout becomes a single column, wraps unbroken note titles and body text, and keeps the notebook within a 320px viewport. Native keyboard activation retains focus; invalid apply and revert focus the relevant field. This preview is a finite demonstration, not an assistive-technology or conformance certification.

## Selective loading and provenance

[theme-tokens.css](theme-tokens.css) is generated from the nine existing `themes/<id>/preview/styles.css` files. [theme-tokens.json](theme-tokens.json) records values, source mappings, and hashes. The [token generator](../../../tools/style-tokens.mjs) maintains the snapshot and checks drift. These are bounded reference-preview projections, not new theme defaults or complete theme stylesheets.

The consumed roles are `--page`, `--surface`, `--raised`, `--ink`, `--muted`, `--primary`, `--on-primary`, `--border`, `--focus`, `--error`, `--theme-font`, `--display-font`, `--mono-font`, `--card-radius`, and `--control-radius`. This preview explicitly uses Ink for selection and focus instead of the projected Focus role.

The page loads only its local token snapshot, [styles.css](styles.css), and [preview.js](preview.js). A consuming project should read the selected identity and only the Skeuomorphism recipe and optional motion it needs. The nine-theme switcher is a finite comparison tool, not a recommendation to load every theme in production.

Source body, display, and mono font stacks retain installed system fallbacks. No font software is downloaded or redistributed. Exact font rendering and language coverage depend on the machine; theme source links retain font credits and reuse limits.

## Stable test hooks

| Purpose | Selector or values |
| --- | --- |
| Theme | `#theme-select`: `editorial`, `swiss`, `precision`, `play`, `botanical`, `blueprint`, `pulse`, `gallery`, `layered` |
| Appearance / motion | `#appearance`: `light`, `dark`, `system`; `#motion`: `off`, `on` |
| Root preferences / ready | `html[data-theme][data-appearance][data-motion]`; `data-ready="true"` after initialization |
| Effective preference | `#material-status`; `html[data-effective-motion]` is explanatory metadata |
| Material | `.fieldbook-cover > .fieldbook-face`; `.paper-page > .paper-face`; `.binder-rail` |
| Index | `.note-option[data-note-id]`; `aria-pressed`, `.choice-state` |
| Search / context | `#note-search`, `#clear-search`, `#search-status`, `#empty-search`, `#context-status[data-hidden]` |
| Applied note | `#applied-title`, `#applied-body`, `#applied-tags`, `#opened-note-id` |
| Draft form | `#note-form`, initially disabled `#note-fields`, `#draft-title`, `#draft-body` |
| Actions | `#apply-button`, `#revert-button`, `#download-button` |
| Errors / status | `#title-error`, `#body-error`, `aria-invalid`, `#draft-status[data-state]`: `applied`, `draft`, `error` |
| Download result | `#download-status`; browser download `fieldbook-<stable-id>.txt` |
| Theme fit / sources | `#theme-fit`, `#font-stack`, `#theme-source-link`, `#theme-credits-link` |
| No-JS fallback | `#js-status`, `#static-notes`, `.fallback-index` |

## Credits and verification limits

Created by **Tamir (Phi Vuong Tuong Tam), with Codex**, for Interface Atlas. The Fieldbook layout, four short notes, CSS construction, and interaction code are original Atlas work. The inline Atlas mark is repository-original [brand artwork](../../../assets/brand/README.md).

The **Xerox Star team** receives credit for its historical office-metaphor precedent; **Apple iBooks** is a later book-and-bookshelf example. These are distinct references, not a sole-inventor claim. No third-party prose, screenshot, interface, component code, texture, image, or font file is copied. Read [style sources](../sources.md), [style rules](../style.md), [optional motion](../motion.md), and [notices](../../../THIRD_PARTY_NOTICES.md) for sources and reuse boundaries.

The [validation record](../validation.md) reports checks actually performed. Results apply to this finite notebook and tested profile states; they do not establish blanket theme/style compatibility, accessibility conformance, assistive-technology coverage, exact font rendering, performance, or production readiness.
