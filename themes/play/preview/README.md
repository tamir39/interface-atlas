# Play reference preview

**[Open the live Play preview](https://tamir39.github.io/interface-atlas/themes/play/preview/).** GitHub Pages publishes the preview when changes reach `main`.

For offline use, open [index.html](index.html) in a browser. No build, package installation, server, or external resource request is required. The HTML, CSS, JavaScript, static vector composition, fictional projects, and local brief workflow were prepared for Interface Atlas with Codex AI assistance.

## Scope

- Atlas branding frames this reference and is not required branding for projects choosing Play. [Logo usage notes](../../../assets/brand/README.md) describe the library identity.
- The portfolio contains three fictional creative projects: Sprout, Daydream, and Come Around. Native case-study disclosures keep their evidence readable without JavaScript. They claim no actual client, launched product, event, or measured outcome.
- Light, Dark, and System choices retain Tamir's observed Play palette. Purple accent and primary action are distinct in dark appearance. Saved preferences apply before the stylesheet; System follows live appearance changes. Invalid or unavailable storage keeps usable defaults.
- Comfortable density is the default. Compact changes component-specimen card and table-cell padding from 24px to 16px. Portfolio cards and the brief builder use 24px base padding, reduced to 20px at widths up to 384px independently of density. Body/input text remains 16px, meaningful form/review/state labels 14px, and action areas at least 44px.
- The preview composition uses a 1296px content maximum and 40px desktop outer gutters, falling to 20px at widths up to 672px and 16px at widths up to 384px. These are original Atlas preview choices; projects select their own content-fit limits.
- The composition retains 30px panel and 14px control radii, hard offset panel shadows, and 3px ink focus outlines with 5px offset. Colorful project regions and static original shapes express the theme without animated artwork.
- Typography uses bold display headings with proposed `-0.035em` tracking, section headings at `-0.025em`, and card headings at `-0.02em`. These moderated values are Atlas choices, distinct from the source's tighter hero/project tracking. Short decorative indexes/sticker labels may use 12px monospace; they do not replace meaningful form labels.
- Brief control feedback uses the retained 240ms duration and `cubic-bezier(0.2, 0, 0, 1)` curve applied uniformly as an Atlas normalization. A small 2px press translation is an original CSS choice, not a reproduction of the source spring runtime. OS reduced motion overrides motion enabled; reduced motion and motion-off make feedback immediate.
- Initial content, preference/state updates, native disclosures, errors, and review contents are applied immediately; brief control color feedback is the only timed transition. The preview includes no entrance sequence, canvas, sphere activation, cursor follower, animated scrolling, or continuous loop.
- A labeled keyboard-focusable table region contains necessary data overflow at narrow widths.

## Brief workflow

This is an **original Atlas local simulation**, conditional inspiration for an agent brief builder. It sends no network request and starts no agent or project.

1. **Editing:** enter a fictional project name, a project type, a 15–600 character goal, and at least one deliverable. The project name is required and limited to 80 characters. Checks use trimmed text. Corrective errors remain near the fields, with focus moved to an error summary linking to them. Entered data is preserved.
2. **Review:** a successful review creates a fixed, trimmed snapshot of the selected details. The review uses literal text rather than interpreting input as HTML. Review focuses its heading. An explicit edit action returns to the draft while preserving input and focuses Project name.
3. **Pending:** Request confirmation marks the snapshot's request as pending acknowledgement. Form editing and repeated confirmation are unavailable while pending. The snapshot stays fixed; a request is not a receipt or execution. Focus moves to the available acknowledgement control.
4. **Acknowledged:** a separate Simulate acknowledgement action records a confirmed local receipt. The receipt receives focus and explicitly says that no agent, project, message, or remote request was created. Edit brief is available again; it preserves the original draft input, clears the current receipt/snapshot, and requires a new review before another request. This local reset of state implements no remote versioning or undo.
5. **Reset:** Reset local demo discards the brief and receipt in the current page; saved appearance, density, and motion preferences remain. Project type returns to Brand identity and deliverables clear; focus returns to Project name.

Draft and receipt contents are not persisted across reloads. Real integrations require their own authority, server validation, request identity, duplicate protection, recovery, acknowledgement, and audit contract. See [Agent Experience guidance](../../../knowledge/agent-experience.md).

Without JavaScript, all preference, brief, and control-specimen inputs/buttons remain disabled with an explanation. The readable sample review stays open; native portfolio disclosures and anchor navigation work. CSS follows system dark appearance from the initial System setting. The sample is illustrative and submits nothing.

## Font rendering

The CSS names **Manrope** and **JetBrains Mono**, with local sans-serif and monospace fallbacks. **No font binaries or remote font services are included; intended named-font rendering is not established by this preview.** Check actual package versions, weights, script coverage, fallback, wrapping, and rhythm in the project.

Creator credits are **Mikhail Sharanda** for Manrope and **JetBrains, Philipp Nurullin, and Konstantin Bulenkov** for JetBrains Mono. The SIL Open Font License evidence and package/version boundary appear in [sources.md](../sources.md).

## Provenance and limitations

The source visual direction is credited to **Tamir (Phi Vuong Tuong Tam)** at `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`. **Samuel Breznjak's Neobrutalism components** is an additional Atlas comparison for bold boundaries and offset shadows, not evidence that Tamir used the library. **Ravi Katiyar / @ravikatiyar162's Interactive Hero Backgrounds** is the portfolio's optional sphere-artwork inspiration. Neither implementation is imported here.

Control-border and warning/danger/information foregrounds, portable spacing/type scale, moderated tracking, static artwork composition, and the review/request flow are Atlas proposals. Source neutral/tinted palettes, accent/action roles, radii, focus dimensions, and panel shadow values are retained observations. Selected backgrounds use readable ink and underlined ink links because source muted text and dark accent have ordinary-text contrast limits there.

See [source credits](../sources.md), [reuse and notices](../../../THIRD_PARTY_NOTICES.md), and [validation evidence](../validation.md). Atlas's publishing terms and the source portfolio's implementation terms remain unresolved; the optional external sphere component's terms are also unresolved. This preview imports no source artwork, library component, portfolio code, or font software.

The deployed copy retains local demonstration behavior. Documentation links resolve to GitHub source pages during the [preview site build](../../../site/README.md); the build adds no remote fonts or third-party scripts.

This is a **draft reference**. Representative browser checks do not validate every adaptation, intended font, browser, assistive technology, accessibility criterion, optional effect, real backend, or agent workflow.

## Stable test hooks

| Purpose | Selector or action |
| --- | --- |
| Appearance | `#appearance`: `system`, `light`, `dark` |
| Density | `#density`: `comfortable`, `compact`; `#density-note` |
| Motion | `#motion` checkbox; `#motion-note` explains OS precedence |
| Root preferences | `document.documentElement.dataset.appearance/density/motion`; with JavaScript, appearance is resolved light/dark; without it, the initial system value follows CSS. Motion is on/off |
| Preference storage | `interface-atlas-play-preview` localStorage key |
| Main regions | `#portfolio`, `#brief`, `#specimen`, `#credits` |
| Native case-study disclosures | `#case-sprout`, `#case-daydream`, `#case-loop` |
| Builder state | `#brief-builder[data-state]`: `editing`, `review`, `pending`, `acknowledged` |
| Form and fields | `#brief-form`, `#brief-fields`, `#project-name`, `#project-goal` |
| Project type | `#type-brand`, `#type-product`, `#type-campaign` |
| Deliverables | `#deliverable-identity`, `#deliverable-website`, `#deliverable-launch` |
| Validation | `#error-summary`, `#error-list`; `#name-error`, `#goal-error`, `#type-error`, `#deliverables-error` |
| Review action and region | `#review-brief`, `#brief-review`, `#review-heading` |
| Snapshot display | `#review-name`, `#review-type`, `#review-goal`, `#review-deliverables` |
| Edit / request | `#edit-brief`, `#request-confirmation` |
| Pending and acknowledgement | `#pending-panel`, `#acknowledge-request` |
| Receipt | `#brief-receipt`, `#receipt-heading` |
| Status announcement | `#request-status`, polite status region |
| Reset / no-JavaScript sample | `#reset-demo`, `#no-js-review` |
| Contained table / control specimens | `.table-region`, `#primary-specimen`, `#specimen-name`, `#specimen-check` |
| Read-only inspection hook | `window.__playPreview.getState()` exposes current local state/snapshot for validation; it does not perform an action |
