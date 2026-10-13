# Botanical reference preview

**[Open the live Botanical preview](https://tamir39.github.io/interface-atlas/themes/botanical/preview/).** GitHub Pages publishes the preview when changes reach `main`.

For offline use, open [index.html](index.html) in a browser. No build, package installation, server, or external resource request is required. The HTML, CSS, JavaScript, static vector drawings, fictional studio briefs, design field notes, and local reading-list interaction were prepared for Interface Atlas with Codex AI assistance.

## Scope

- Atlas branding frames this reference; projects choosing Botanical select their own identity. [Logo usage notes](../../../assets/brand/README.md) record the library branding.
- **Stillground** is a fictional garden/landscape studio. Its courtyard, terrace, and route studies claim no real client, built project, or measured outcome. Native brief disclosures stay readable without JavaScript.
- The landscape, plan, and article illustrations are original static SVG compositions. They contain no photographs, imported source artwork, animated contour renderer, or cursor follower.
- Light, Dark, and System use the observed Botanical neutral/tinted palette. Valid saved preferences apply before the stylesheet; System follows live device appearance. Invalid or unavailable storage preserves usable defaults.
- Comfortable density is the default. Compact changes only the component specimen's insets from 24px to 16px. It preserves text sizes, control targets, source organic radii, the studio layout, and the reading room. Narrow-screen gutter/padding changes follow viewport needs independently of the density preference.
- Named font roles are Manrope for body/interface text, DM Serif Display for expressive headings, and JetBrains Mono for short technical values. Display tracking is an Atlas adaptation of the source's tighter hero setting. Base body/input text is 16px, form labels/supporting text 14px, and brief descriptions/note summaries 15px. Small indexes, topic metadata, and selected captions use 12–13px; they supplement larger titles and controls. Comfortable controls target at least 44px.
- The original composition has a 1240px maximum with 40px outer gutters, reduced to 24px at 68rem and 16px at 35rem. These are preview choices rather than universal theme defaults. Library display type uses `clamp(3rem, 6vw, 6rem)`; the larger fictional studio heading uses its own `clamp(3.4rem, 7.6vw, 6.4rem)` and responsive override. Both have `-0.025em` tracking.
- Panel corners retain `32px 8px 32px 8px`; buttons, inputs, and selects retain `22px 6px 22px 6px`. Selected panels receive the light source or inherited dark shadow. Focus retains a 3px ink outline with a 5px offset.
- Brief color/background/border feedback uses 360ms and `cubic-bezier(0.2, 0, 0, 1)` uniformly, an Atlas normalization of source property easing. OS reduced motion takes priority over motion enabled; reduced motion and motion-off make changes immediate.
- Initial content, filters, article opening, list state, announcements, and focus transfers occur immediately. There are no entrance sequences, moving cards, press transforms, animated scrolling, continuous loops, or animation-completion dependencies.
- Selected-item surfaces and Botanical text selection use ink; selected text/markers and underlined links avoid the documented muted/dark-accent failures. Green text selection is an Atlas adaptation of the source component token, rather than a claim about the portfolio's separate global lime rule.

## Reading-room behavior

Four **original fictional design field notes** discuss composition, materials, and process. They are illustrative design writing, not plant-care guidance or reported research. The reading room is a local interaction example without a backend, agent action, or AI-generation claim.

1. **Browse:** search and topic choices filter a fixed note collection while preserving order. Topic values are All topics, Composition, Materials, and Process. Filtering preserves the open article even if its originating row becomes hidden. Reset filters restores the collection without clearing the reading list.
2. **Read:** selecting a note opens its inline article and focuses its heading. With JavaScript, one article is shown at a time; the first note opens initially. List content precedes detail content in the DOM so the narrow layout keeps a sensible reading sequence.
3. **Return:** Return to collection focuses the note's Inspect link when its row is visible. When filters hide that row, it keeps the filter and article context, focuses search, and announces the reason.
4. **Keep:** each Keep note button retains its visible label and exposes `aria-pressed`. The matching card/detail controls stay synchronized without replacing the initiating control or moving reader focus. A local list shows the kept titles/summaries in fixed collection order; its empty state explains how to add a note. List updates do not claim remote saving.
5. **Remove or clear:** Remove drops one note; focus moves to the next Remove button, the previous one, or the reading-list heading if the list becomes empty. Clear list empties the current list, updates pressed states/count, and focuses the list heading. Filters and the open article remain intact.
6. **Export:** Export Markdown prepares `botanical-reading-list.md`, an actual local file containing the kept note titles, topics, summaries, and credits, then asks the browser to download it. The status reports preparation/download request; the page cannot certify that a browser completed or saved the file. Export is unavailable for an empty list.

The reading list starts empty and resets on reload. Only appearance, density, and motion preferences are persisted, under the guarded localStorage key `interface-atlas-botanical-preview`. A project adding durable saving or synchronization defines that behavior separately.

Without JavaScript, all four note articles remain readable, anchor navigation and native studio disclosures work, and preference/filter/list actions remain disabled with an explanation. A static list example is labeled as an example and creates no saved list. Editable native text, select, and checkbox specimens have no submission or remote effect; action buttons that are purely visual samples stay unavailable.

## Font rendering

CSS names **Manrope**, **DM Serif Display**, and **JetBrains Mono**, followed respectively by **Segoe UI / sans-serif**, **Georgia / serif**, and **Consolas / monospace**. **No font binaries or remote font services are included; this preview does not establish intended named-font rendering.** A machine with those fonts installed may use them; other machines use an available local fallback.

Font designer credits are **Mikhail Sharanda** for Manrope, **Colophon Foundry** for DM Serif Display, and **JetBrains, Philipp Nurullin, and Konstantin Bulenkov** for JetBrains Mono. The Vietnamese specimen demonstrates content and fallback handling; it does not certify a family's full glyph coverage. Check actual package versions, required weights/styles, language coverage, fallback, wrapping, and visual rhythm in a project. License evidence is in [sources.md](../sources.md).

## Provenance and limitations

The source visual direction is credited to **Tamir (Phi Vuong Tuong Tam)** at `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`. **Kedhareswer Naidu / @kedhareswer's Isoline Bloom** is the portfolio's optional contour-artwork inspiration. Neither the portfolio's Canvas renderer nor the external WebGL component is imported here.

Source palette, geometry, focus dimensions, typeface names/roles, and resting shadows are retained observations. Necessary control borders, warning/danger/information foregrounds, portable typography/spacing, milder display tracking, selected-state restrictions, green text selection, uniform feedback easing, static artwork, and the reading-list/export behavior are Atlas proposals.

See [source credits](../sources.md), [reuse and notices](../../../THIRD_PARTY_NOTICES.md), and [validation evidence](../validation.md). The external contour listing displays MIT, with exact future package verification required. Atlas's publishing terms and the portfolio's implementation terms remain unresolved. No source artwork, library component, portfolio implementation, icon asset, or font software is copied.

The deployed copy retains local behavior. Documentation links resolve to GitHub source pages during the [preview site build](../../../site/README.md); the build adds no remote fonts or third-party scripts.

This is a **draft reference**. Representative browser checks do not validate every adaptation, intended font, browser, assistive technology, accessibility criterion, optional effect, or real backend. The theme's [validation record](../validation.md) identifies the checks actually performed.

## Stable test hooks

| Purpose | Selector or action |
| --- | --- |
| Appearance | `#appearance`: `system`, `light`, `dark` |
| Specimen density | `#density`: `comfortable`, `compact`; `#density-note` |
| Motion | `#motion` checkbox; `#motion-note` explains OS precedence |
| Root preferences | `document.documentElement.dataset.appearance/density/motion`; `system` remains an explicit appearance choice resolved by CSS |
| Preference storage | `interface-atlas-botanical-preview` localStorage key |
| Main regions | `#studio`, `#studio-briefs`, `#reading-room`, `#specimen`, `#credits` |
| Native studio disclosures | `#courtyard-brief`, `#terrace-brief`, `#path-brief` |
| Note filters | `#note-search`, `#note-topic`, `#reset-filters`; `#note-count`, `#no-notes` |
| Stable note identities | `room`, `edge`, `patina`, `sequence` |
| Note rows | `#note-room`, `#note-edge`, `#note-patina`, `#note-sequence`; `data-note-id`, `data-topic`, `data-selected` |
| Inspect links | `#inspect-note-room`, `#inspect-note-edge`, `#inspect-note-patina`, `#inspect-note-sequence`; open note receives `aria-current` |
| Detail articles | `#detail-room`, `#detail-edge`, `#detail-patina`, `#detail-sequence` |
| Detail focus | `#detail-heading-room`, `#detail-heading-edge`, `#detail-heading-patina`, `#detail-heading-sequence` |
| Return buttons | `#back-to-note-room`, `#back-to-note-edge`, `#back-to-note-patina`, `#back-to-note-sequence` |
| Keep-note toggles | `[data-keep-id]`, matched to note identity; stable label and `aria-pressed` |
| List and count | `#kept-list`, `#kept-count`, `#list-empty`, `#list-explanation` |
| Clear / actual Markdown export | `#clear-list`, `#export-list` |
| Individual list removal | `[data-remove-id]`, matched to note identity |
| Polite announcements | `#reading-status`, `#list-status` |
| Editable text / select specimens | `#specimen-label`, `#specimen-study` |
| Typography specimens | `#type-display`, `.technical`, `[lang="vi"]` |
