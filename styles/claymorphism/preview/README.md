# Claymorphism reference preview

Open [index.html](index.html) directly in a browser. The original **Little studio** creative practice planner works offline without a build, installed packages, fonts, images, external resource requests, or a server. It demonstrates a Claymorphism style layer across nine existing Atlas theme identities.

## Scope and behavior

- Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery, and Layered supply a source-mapped subset of their actual preview palettes, declared font stacks, and ordinary card/control geometry. The shared specimen does not load their complete layouts or establish full theme compatibility. Each selection updates its fit caution, declared body font stack, and links to the theme reference and source/font credits.
- Light, Dark, and System are available. System follows live device appearance changes. Reload restores **Play / Light / Off**, Sketch a little, the example session name, and 20 minutes. Preferences, choices, and input are not persisted.
- Three practice buttons use inflated clay shells. A fourth shell frames short supporting content and the local review result. These selected shells explicitly override theme geometry: **28px outer radius, 12px shell padding, 16px opaque inner radius**. The ordinary settings/work panels and native fields/action buttons retain the theme's actual card/control radii. This preview does not preserve every corner.
- Each `.clay-surface` has an opaque theme Surface background with paired static outer and inset shadows. Its immediate `.clay-content` child is an opaque theme Raised surface covering all readable text, icons, and controls. Inset shading stays on the exposed perimeter, beneath the opaque child. In ordinary appearance, the selected practice uses the unchanged Primary / On-primary semantic pair on that child. There is no translucent fill, backdrop blur, shadow over text, gradient beneath text, or palette retokenization.
- The light shell shadow is `7px 9px 20px rgb(25 28 36 / .12), -5px -5px 15px rgb(255 255 255 / .56), inset 4px 4px 9px rgb(255 255 255 / .72), inset -5px -5px 11px rgb(25 28 36 / .16)`. Dark uses `7px 9px 20px rgb(0 0 0 / .3), -5px -5px 15px rgb(255 255 255 / .055), inset 4px 4px 9px rgb(255 255 255 / .09), inset -5px -5px 11px rgb(0 0 0 / .26)`. These are original specimen values, not universal theme defaults.
- Necessary interactive boundaries use the theme's 1px Border role. Practice selection combines persistent Selected text, `aria-pressed`, and a 2px Focus outline with a 4px gap. Keyboard focus is a 3px Focus outline with a 3px gap and replaces the selected outline while focused. Shadows never carry the only state information.
- The practice choices update the form's current practice and selection announcement without moving focus. Changing practice or editing a reviewed session hides the stale result and identifies the draft as changed.
- The browser-local form accepts a required name of 3–48 characters after trimming spaces and 5–120 minutes in steps of 5. Invalid review exposes associated errors and focuses the first invalid field. Valid review displays the trimmed title, practice, and time in the supporting shell and announces the result. Reset restores the entire fictional session, including Sketch a little, then focuses the name. Nothing is submitted, saved, sent, scheduled, or timed.
- Optional press feedback starts **Off**. On adds only `translateY(1px)` with a `120ms ease` transform transition for practice and action buttons. Shadows do not animate. There is no scale, bounce, floating, entrance sequence, or continuous animation. A static underline reinforces a pressed action independently of motion.
- Reduced motion removes press translation and transitions even when On is selected. Forced colors removes all shadows and decorative sculpture, uses Canvas / CanvasText for the selected inner surface and ButtonFace / ButtonText for the primary button, and preserves boundaries, Selected text, pressed semantics, field errors, and focus. The selected fill becomes the same readable system surface as other cards; a double outline and Selected text retain the state. CSS owns these fallbacks independently of JavaScript; the status explains the effective preference while scripts run.
- Without JavaScript, settings, practice choices, fields, and local-action buttons remain disabled with a visible explanation. Reference text, source links, native anchors, and disclosures remain readable and usable. Runtime controls are enabled only after interaction initialization.
- Controls have a native minimum target height of 44px. The layout reflows to one column at narrow widths and supports a 320px viewport without a page-wide overflow container. The static CSS sculpture is decorative and contained; it does not communicate a selection or task outcome.

## Selective loading and provenance

[theme-tokens.css](theme-tokens.css) is generated from the nine existing `themes/<id>/preview/styles.css` files. [theme-tokens.json](theme-tokens.json) records source mappings, values, and source hashes. [The token generator](../../../tools/style-tokens.mjs) maintains the snapshot and checks drift. These are reference-preview tokens, not new theme defaults or imports of the complete theme stylesheets.

The consumed roles are `--page`, `--surface`, `--raised`, `--ink`, `--muted`, `--primary`, `--on-primary`, `--border`, `--focus`, `--error`, `--theme-font`, `--display-font`, `--mono-font`, `--card-radius`, and `--control-radius`. [styles.css](styles.css) owns the explicitly overridden clay geometry, perimeter shading, shared specimen layout, responsive rules, and preference fallbacks. It does not alter the source theme files.

The page loads only that local snapshot, its style layer, and [preview.js](preview.js). A consuming project should read its selected theme's identity/rules and only the Claymorphism recipe and optional motion it needs. The nine-theme switcher is a finite comparison tool, not a production loading recommendation.

Declared font stacks preserve each theme's type roles with local system fallbacks. No font software is downloaded or redistributed. A machine without a named family renders its installed fallback; this does not establish faithful font rendering, language coverage, or licensed font acquisition. The selected theme's source link retains font authorship and provenance.

## Stable test hooks

| Purpose | Selector or values |
| --- | --- |
| Theme | `#theme-select`: `editorial`, `swiss`, `precision`, `play`, `botanical`, `blueprint`, `pulse`, `gallery`, `layered` |
| Appearance | `#appearance`: `light`, `dark`, `system` |
| Optional press travel | `#motion`: `off`, `on` |
| Root preferences | `html[data-theme][data-appearance][data-motion]` |
| Effective preference explanation | `#material-status`; `html[data-effective-motion]` is explanatory metadata |
| Opaque clay containment | `.clay-surface > .clay-content` |
| Practice selection | `[data-practice]`: `sketch`, `writing`, `making`; `aria-pressed`, `.choice-state` |
| Current practice and feedback | `#practice-name`, `#selection-status` |
| Local form | `#session-form`, initially disabled `#session-fields`, `#session-title`, `#session-minutes` |
| Form actions | `#review-button`, `#reset-button` |
| Field errors and status | `#title-error`, `#minutes-error`, `#form-status[data-state]`: `draft`, `error`, `success` |
| Reviewed result | `#review-panel`, `#review-title`, `#review-practice`, `#review-minutes`; `#starting-note` is hidden when reviewed |
| Theme fit and credits | `#theme-fit`, `#font-stack`, `#theme-source-link`, `#theme-credits-link` |
| No-JS explanation | `#js-status` |

## Credits and verification limits

Created by **Tamir (Phi Vuong Tuong Tam), with Codex**, for Interface Atlas. The layout, fictional practice space, CSS sculpture, and interaction code are original Atlas work. The inline Atlas mark is the repository's original [brand artwork](../../../assets/brand/README.md).

**Michał Malewicz named and popularized Claymorphism in 2021.** That attribution concerns the name and explanation, not sole invention of inflated forms or every implementation. No third-party component code, illustrations, font files, or other assets are copied into this preview. Read [style sources](../sources.md), [style rules](../style.md), [optional press feedback](../motion.md), and [required notices](../../../THIRD_PARTY_NOTICES.md) for reference boundaries and terms.

The [style validation record](../validation.md) reports the checks actually performed. Results concern this finite specimen and selected profile states; they do not establish blanket theme compatibility, accessibility conformance, assistive-technology coverage, performance, battery, or production readiness. The preview has no account, persistent session, calendar, timer, publishing, collaboration, or service integration.
