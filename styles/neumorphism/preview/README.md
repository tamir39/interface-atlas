# Neumorphism reference preview

Open [index.html](index.html) directly in a browser. The original **Quiet page** reading preset workbench works offline without a build, installed packages, images, font files, external requests, or a server. It demonstrates a bounded Neumorphism / Soft UI style layer across nine existing Atlas theme identities.

## Scope and behavior

- Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery, and Layered supply a source-mapped subset of their actual preview palettes, declared font stacks, and ordinary card/control geometry. This shared specimen does not load their complete applications or establish full compatibility. Each identity updates its fit caution, declared body stack, and links to its theme rules and source/font credits.
- Light, Dark, and System appearances are available; System follows live device changes. Reload restores **Editorial / Light / Off**, the preset name **A little room to read**, **60ch**, **18px**, and **1.75** line spacing. Nothing is persisted.
- The three width choices edit the **draft**: 45ch Narrow, 60ch Balanced, or 72ch Wide. Each uses a native button, a persistent Selected/check label, `aria-pressed`, and an Ink outline. The draft selection and width status explicitly distinguish it from the sample's applied width. The visual choice-state text is hidden from the accessible name, keeping button names stable; pressed semantics and the width status convey the changing state. Shadows never carry the only state cue.
- The form accepts a required preset name of **3–48 characters after trimming spaces**, a required text size of **16–24px in steps of 2**, and line spacing of **1.5**, **1.75**, or **2**.
- **Apply reading settings** validates the whole draft and then changes the actual sample title, CSS font size, line height, and maximum line width. A 72ch maximum still fits the available width. Errors are associated with their fields and focus moves to the first invalid field. Invalid apply leaves the previous sample intact.
- Editing any draft value leaves the last applied sample visible and marks the draft changed. Reset example restores both draft and applied defaults, clears errors, and focuses the preset name. Applying and resetting do not change the selected theme, appearance, or motion preference.
- The workbench is a local example. There is no autosave, storage, submission, browser or operating-system preference change, account, synchronization, backend, or remote reading service.
- Without JavaScript, all runtime settings, draft choices, form fields, and local actions remain disabled with a visible explanation. The reading sample, references, links, native anchors, and disclosures remain readable and usable. Runtime controls are enabled only after initialization.

## Material and geometry

The `.soft-plane`, every `.soft-surface`, and each immediate `.soft-face` use the **same opaque theme Surface fill**. The four soft hosts are the three width buttons and the reading shell. They retain the theme's actual `--card-radius`; a **12px rim** surrounds an opaque inner face whose corners are each **max(0px, corresponding host corner − 12px)**. Botanical's source `32px 8px 32px 8px` host therefore derives `20px 0px 20px 0px` inner corners. The scalar themes derive directly from their source radius. There is no global clay radius or inflated geometry.

An empty `::before` pseudo-element at z-index 0 draws shallow paired opposing shadows. The immediate opaque `.soft-face` at z-index 1 covers every readable descendant of the host. No shadow, gradient, texture, transparency, blur, or overlay tints its text, icons, or controls.

Original specimen shadow values:

| State | Light | Dark |
| --- | --- | --- |
| Raised | `4px 4px 10px rgb(25 28 36 / .16), -4px -4px 10px rgb(255 255 255 / .78)` | `4px 4px 10px rgb(0 0 0 / .34), -4px -4px 10px rgb(255 255 255 / .065)` |
| Selected, recessed | `inset 3px 3px 7px rgb(25 28 36 / .18), inset -3px -3px 7px rgb(255 255 255 / .72)` | `inset 3px 3px 7px rgb(0 0 0 / .34), inset -3px -3px 7px rgb(255 255 255 / .07)` |

Selection changes the pseudo-layer from raised to recessed instantly; it never combines an inflated outer-and-inner pillow recipe. The selected fill stays the same Surface. Necessary soft control boundaries use **1px Border**, selection adds a **2px Ink outline with 3px gap**, and keyboard focus uses **3px Ink with 3px gap**. Focus replaces the selection outline while focused. All states remain understandable with shadows removed.

The ordinary settings and form panels use Raised, fields use Raised, and the primary action uses the unchanged Primary / On-primary pair. These ordinary components are outside the same-material soft recipe; they keep source card/control geometry. This is an explicit role boundary, not a palette retokenization.

## Motion and preference fallbacks

Press feedback starts **Off**. On adds only `translateY(1px)` with a `120ms ease` transform transition for width and action buttons. Shadows do not animate. There is no scale, bounce, continuous motion, or entrance sequence. A static underline also identifies a pressed action.

Reduced motion removes translation and transition even when On is selected. Forced colors removes shadows, uses Canvas / CanvasText on soft hosts and faces including selection, and uses ButtonFace / ButtonText on actions. Explicit boundaries, the Selected/check label, pressed semantics, errors, and focus remain visible. CSS owns these fallbacks independently of JavaScript; the running status explains the effective preference.

Native controls have a minimum 44px target height. The layout reflows to one column, wraps long unbroken preset names, and keeps the sample within a 320px viewport. Native keyboard activation and selection retain focus; invalid apply and reset focus the relevant field.

## Selective loading and provenance

[theme-tokens.css](theme-tokens.css) is generated from the nine existing `themes/<id>/preview/styles.css` files. [theme-tokens.json](theme-tokens.json) records values, source mappings, and source hashes. The [token generator](../../../tools/style-tokens.mjs) maintains the snapshot and checks drift. These are bounded reference-preview projections, not new theme defaults or complete theme stylesheets.

The consumed roles are `--page`, `--surface`, `--raised`, `--ink`, `--muted`, `--primary`, `--on-primary`, `--border`, `--focus`, `--error`, `--theme-font`, `--display-font`, `--mono-font`, `--card-radius`, and `--control-radius`. The preview explicitly uses Ink for selection and focus rather than the projected Focus color. [styles.css](styles.css) owns the bounded material, derived inner geometry, shared specimen, responsive rules, and fallbacks; source theme files remain unchanged.

The page loads only its local token snapshot, its style layer, and [preview.js](preview.js). A consuming project should read its selected identity and only the Neumorphism recipe and optional motion it needs. The nine-theme switcher is a finite comparison tool, not a recommendation to load every theme into production.

Declared body, display, and mono stacks retain source roles with installed system fallbacks. No font software is downloaded or redistributed. A machine without a named family uses its installed fallback; this does not establish exact font rendering, language coverage, or font licensing for another project. Theme source links retain each identity's font credits.

## Stable test hooks

| Purpose | Selector or values |
| --- | --- |
| Theme | `#theme-select`: `editorial`, `swiss`, `precision`, `play`, `botanical`, `blueprint`, `pulse`, `gallery`, `layered` |
| Appearance | `#appearance`: `light`, `dark`, `system` |
| Optional press travel | `#motion`: `off`, `on` |
| Root preferences | `html[data-theme][data-appearance][data-motion]` |
| Effective preference explanation | `#material-status`; `html[data-effective-motion]` is explanatory metadata |
| Same-material geometry | `.soft-plane`, `.soft-surface > .soft-face`; shadow layer `.soft-surface::before` |
| Draft width | `[data-width]`: `45`, `60`, `72`; `aria-pressed`, `.choice-state`, `#width-status` |
| Draft form | `#reading-form`, initially disabled `#reading-fields`, `#preset-name`, `#text-size`, `#line-spacing` |
| Actions | `#apply-button`, `#reset-button` |
| Errors | `#name-error`, `#size-error`, `#spacing-error`; `aria-invalid` |
| Draft status | `#draft-status[data-state]`: `draft`, `error`, `applied` |
| Applied sample | `#reading-sample`, `#sample-title`, `#applied-width`, `#applied-size`, `#applied-spacing` |
| Theme fit and credits | `#theme-fit`, `#font-stack`, `#theme-source-link`, `#theme-credits-link` |
| No-JS explanation | `#js-status` |

## Credits and verification limits

Created by **Tamir (Phi Vuong Tuong Tam), with Codex**, for Interface Atlas. The Quiet page layout, reading passage, CSS, and interaction code are original Atlas work. The inline Atlas mark is the repository's original [brand artwork](../../../assets/brand/README.md).

**Jason Kelley** receives credit for suggesting the name; **Michał Malewicz** for explaining and popularizing the direction; **Oleksandr Plyuto** for the influential banking concept. These are distinct historical contributions, not a sole-inventor claim. No third-party prose, screenshots, component code, assets, or font files are copied. Read [style sources](../sources.md), [style rules](../style.md), [optional motion](../motion.md), and [notices](../../../THIRD_PARTY_NOTICES.md) for sources and reuse boundaries.

The [validation record](../validation.md) reports checks actually performed. Results concern this finite workbench and tested profile states. They do not establish blanket style/theme compatibility, accessibility conformance, assistive-technology coverage, intended font rendering, performance, or production readiness.
