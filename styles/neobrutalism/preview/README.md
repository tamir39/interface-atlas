# Neobrutalism reference preview

Open [index.html](index.html) directly in a browser. This original HTML, CSS, and JavaScript specimen works offline without a build, installed packages, remote resources, or a server. The fictional **Fieldnotes** creative program demonstrates a Neobrutalism style layer across nine existing Atlas theme profiles.

## Scope and behavior

- Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery, and Layered render the same idea board. Each supplies a source-mapped subset of its actual preview palette, declared font stacks, and corner geometry. The selected profile does not import the complete theme layout or establish full theme compatibility. The page includes a fit caution for every profile and a link to its theme reference.
- Light, Dark, and System appearance are available. System follows live device appearance changes. Reload restores Editorial / Light / Off. Preferences, selections, and form input are not persisted.
- All surfaces are opaque. The style explicitly uses 2px theme Ink borders and 4px by 4px hard theme Ink shadows with zero blur on the settings panel, idea cards, workbench panels, and action buttons. The outer frame and structural separators use outlines without shadows. The theme's card and control radii remain intact.
- The 3px theme Ink focus outline with a 3px gap is an intentional style override of the theme Focus role. Theme Ink gives the indicator contrast against the adjacent opaque theme surfaces. The theme's Focus value remains in the shared snapshot for provenance, although this specimen uses Ink for focus.
- The four idea buttons update the workbench title, description, track, format, pressed semantics, persistent Selected text, and selection announcement. Focus stays with the chosen button. An inset 2px boundary reinforces selection.
- Search matches titles, tracks, and descriptions. Search and track filters combine. Filtering preserves the inspected idea on the workbench. If that idea is hidden by the current filters, the selection status explains that state; an empty result also keeps the last inspected idea. Clear filters restores the board; Show all ideas also focuses the search field.
- The local brief form requires a title of 3–48 characters after trimming spaces. Its optional note has a native 120-character limit. Invalid review identifies the title, exposes a linked error, and focuses the field. Valid review announces the title and track. Editing makes the review stale; Reset example restores only the form. Nothing is submitted, saved, or sent to another service.
- Press feedback is **Off** by default. Turning it On adds a 100ms ease-out transition on transform and box-shadow for cards and action buttons. While pressed, the control translates 2px in each axis and its shadow reduces from 4px to 2px. A 3px underline provides an immediate non-motion pressed cue in either setting. No scaling, blur, entrance sequence, continuous motion, or hover travel is used.
- Reduced motion removes transitions and press translation even when On is selected. Forced colors replaces the generated theme palette with system colors using explicit attribute-selector specificity, removes decorative art and shadows, and preserves selected text, pressed semantics, a double selected-card boundary, field errors, and visible focus. The optional motion never carries the only state information.
- Without JavaScript, settings, filtering, idea buttons, and the form stay disabled with a visible explanation. All four ideas, the default workbench, source links, and native disclosures remain readable; anchors and disclosures remain usable. JavaScript enables controls only after complete interaction initialization.
- The layout reflows at narrow widths. Controls have at least 44px target height. There is no fixed-size data region or remote content to overflow the page. CSS artwork is decorative and contained inside its own surfaces.

## Selective loading and provenance

[theme-tokens.css](theme-tokens.css) is generated from the nine existing `themes/<id>/preview/styles.css` files. [theme-tokens.json](theme-tokens.json) records source mappings, values, and source hashes. [The token generator](../../../tools/style-tokens.mjs) maintains the shared profile snapshot and checks drift. These tokens belong to the reference preview; they do not add global theme defaults or replace the original theme files.

The consumed profile roles are `--page`, `--surface`, `--raised`, `--ink`, `--muted`, `--primary`, `--on-primary`, `--border`, `--focus`, `--error`, `--theme-font`, `--display-font`, `--mono-font`, `--card-radius`, and `--control-radius`. The style uses Ink for structural borders, hard shadows, and focus rather than the softer Border or separate Focus roles. [styles.css](styles.css) owns these explicit style overrides, specimen layout, responsive behavior, and device-preference fallbacks.

The page loads only that small local token snapshot, the style layer, and [preview.js](preview.js). A consuming project should read its actual theme's identity and rules, then load only the Neobrutalism guidance and optional motion recipe it needs. The nine-theme switcher is a comparison tool for this specimen, not a production loading recommendation.

Declared font stacks preserve each theme's intended type roles with local system fallbacks. No font software is downloaded or redistributed. A machine without a named family uses its installed fallback; the result does not establish faithful font rendering, language coverage, or licensed acquisition. Each theme's source notes retain its font provenance.

## Stable test hooks

| Purpose | Selector or values |
| --- | --- |
| Theme | `#theme-select`: `editorial`, `swiss`, `precision`, `play`, `botanical`, `blueprint`, `pulse`, `gallery`, `layered` |
| Appearance | `#appearance`: `light`, `dark`, `system` |
| Optional press travel | `#motion`: `off`, `on` |
| Root preferences | `html[data-theme][data-appearance][data-motion]` |
| Effective preference explanation | `#motion-status` |
| Opaque treatment surfaces | `.hard-surface`, `.button` |
| Search and track | `#idea-filter`, `#track-filter`: `all`, `print`, `talks`, `workshops` |
| Filter actions and feedback | `#filter-reset`, `#empty-reset`, `#filter-count`, `#empty-state` |
| Idea selection | `.idea-card[data-idea-id]`: `ink-club`, `open-table`, `type-walk`, `paper-radio`; `aria-pressed`, `.card-state` |
| Filterable list items | `[data-idea-item]`, native `hidden` attribute |
| Workbench | `#selection-title`, `#selection-description`, `#selection-track`, `#selection-format`, `#selection-status` |
| Local form | `#brief-form`, initially disabled `#brief-fields`, `#brief-title`, `#brief-track`, `#brief-note` |
| Form actions and feedback | `#review-brief`, `#brief-reset`, `#brief-error`, `#brief-status` |
| Profile fit caution | `#theme-fit`, `#theme-source-link` |
| No-JS explanation | `#js-status` |

## Credits and verification limits

Created by **Tamir (Phi Vuong Tuong Tam), with Codex**, for Interface Atlas. This specimen's layout, fictional program, CSS geometry, and interaction code are original Atlas work. The inline Atlas mark is the repository's original [brand artwork](../../../assets/brand/README.md).

Samuel Breznjak's **Neobrutalism components** (ekmas) is an implementation reference, not a sole-inventor attribution. No third-party component code, illustrations, font files, or other assets are copied into this preview. Read [style sources](../sources.md), [style rules](../style.md), [optional press feedback](../motion.md), and [required notices](../../../THIRD_PARTY_NOTICES.md) for source boundaries and terms.

The [style validation record](../validation.md) reports the checks actually performed. Results are evidence for this finite shared specimen and selected profile states, not blanket theme compatibility, accessibility conformance, assistive-technology coverage, performance, battery, or production-readiness claims. The preview has no account, persistent draft, publishing, collaboration, or service integration.
