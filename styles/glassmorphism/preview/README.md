# Glassmorphism reference preview

Open [index.html](index.html) directly in a browser. This original HTML, CSS, and JavaScript specimen works offline without a build, installed packages, fonts, images, external resource requests, or a server. The fictional Horizon project room demonstrates a style layer over nine existing Atlas theme identities.

## Scope

- The theme selector renders the same specimen with Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery, and Layered. It uses a source-mapped token subset from their actual preview stylesheets, rather than loading their layouts or introducing unrelated replacement palettes.
- Light, Dark, and System appearance are supported. System follows live device appearance changes. Reload restores Editorial / Light / Automatic / Calm; no preference or draft data is stored.
- Automatic transparency uses each theme's opaque raised-surface color at 88% in light appearance and 90% in dark appearance, with `backdrop-filter: blur(16px) saturate(110%)`. The five shallow glass surfaces are navigation chrome, three surface-role cards, and a short context card. No glass surface contains another glass surface.
- Settings, the draft form, validation, and the data table keep the theme's opaque `--raised` background. Transparency never applies to an entire container or its text.
- Opaque is an explicit user choice. Reduced transparency, forced colors, and missing tint/backdrop support also produce solid chrome. CSS owns these fallbacks independently of JavaScript. The status text explains the effective rendering when scripts run.
- Calm, Bright, and Busy backgrounds are original static CSS geometry. They use theme colors and remain decorative, bounded inside the specimen. Nothing continuously moves; there are no custom animations, timed sequences, or transitions.
- Surface-role cards and table Inspect buttons share one selection. Pressed state, selected-row markers, and an inline announcement identify the chosen role. Selecting a role updates the context description without moving focus or implying that opaque reading surfaces become glass.
- The local draft form accepts a required title of 3–48 characters after trimming spaces and an optional note of up to 120 characters. Review validates the title, focuses an invalid field, and announces a valid draft by title. Reset restores the example. This is browser-local behavior; nothing is submitted, saved, or sent to another service.
- Without JavaScript, settings, local-action buttons, and form fields stay disabled with a visible explanation. Reference content, native links, and disclosure controls remain readable and usable. The default material still follows CSS support and device preferences.
- The semantic inventory table uses a named, keyboard-focusable horizontal scroll region. At narrow widths, overflow stays inside that region. Other content reflows to a single column.

## Token provenance and loading boundary

[theme-tokens.css](theme-tokens.css) is generated from the nine existing `themes/<id>/preview/styles.css` sources. [theme-tokens.json](theme-tokens.json) records the selected values and their source mappings; [the token generator](../../../tools/style-tokens.mjs) maintains the snapshot and checks for drift. These are reference-preview tokens, not new global defaults or an import of each entire theme stylesheet.

The consumed roles are `--page`, `--surface`, `--raised`, `--ink`, `--muted`, `--primary`, `--on-primary`, `--border`, `--focus`, `--error`, `--theme-font`, `--display-font`, `--mono-font`, `--card-radius`, and `--control-radius`. The style layer in [styles.css](styles.css) adds only the glass treatment, shared specimen layout, responsive rules, and fallback behavior. It does not edit the original theme files.

The page loads the small shared token snapshot, this style sheet, and [preview.js](preview.js). A consuming project should select only its actual theme's identity/rules and the Glassmorphism style files relevant to that project, rather than import this demonstration's nine-theme switcher.

## Font rendering

The token subset preserves the theme previews' named font stacks with local system fallbacks. No font software is downloaded or redistributed. A machine without the intended families renders its installed fallback. The comparison therefore demonstrates the declared type roles and available local rendering; it does not establish faithful rendering, language coverage, or licensed font acquisition for a consuming project. See each selected theme's source notes for font authorship and upstream provenance.

## Stable test hooks

| Purpose | Selector or values |
| --- | --- |
| Theme | `#theme-select`: `editorial`, `swiss`, `precision`, `play`, `botanical`, `blueprint`, `pulse`, `gallery`, `layered` |
| Appearance | `#appearance`: `light`, `dark`, `system` |
| Material choice | `#transparency`: `auto`, `opaque` |
| Decorative backdrop | `#background`: `calm`, `bright`, `busy` |
| Root preferences | `html[data-theme][data-appearance][data-transparency][data-background]` |
| Effective material explanation | `#material-status`; `html[data-effective-transparency]` is explanatory JS metadata; CSS fallbacks are independent |
| Glass and opaque regions | `[data-glass].glass-surface`, `[data-opaque]` |
| Surface role selection | `[data-surface-choice]`: `navigation`, `context`, `content`; `aria-pressed` |
| Selected inventory row | `[data-surface-row]`; `data-selected` |
| Selection feedback | `#current-surface`, `#surface-description`, `#surface-treatment`, `#selection-status` |
| Local form | `#project-form`, initially disabled `#project-fields`, `#project-title`, `#project-note` |
| Form actions and feedback | `#review-project`, `#reset-project`, `#title-error`, `#review-status` |
| Contained table overflow | `#surface-table-scroll` |
| No-JS explanation | `#js-status` |

## Credits and verification limits

Created by **Tamir (Phi Vuong Tuong Tam), with Codex**, for Interface Atlas. The specimen, fictional brief, CSS geometry, and interaction code are original Atlas work. Michał Malewicz named and popularized Glassmorphism in 2020; frosted and translucent interface materials have older precedents. See [style sources](../sources.md), [style rules](../style.md), and [required notices](../../../THIRD_PARTY_NOTICES.md) for the separation between historical reference, theme provenance, and this original adaptation.

The [style validation record](../validation.md) reports the checks actually performed. Browser results for this finite specimen are evidence about these combinations, not a blanket accessibility, assistive-technology, performance, battery, or production-readiness claim. The preview does not implement accounts, persistent projects, remote review, or service integration.
