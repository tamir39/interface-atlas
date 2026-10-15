# Layered reference preview

Open [the live Layered preview](https://tamir39.github.io/interface-atlas/themes/layered/preview/) or [index.html](index.html) locally with its adjacent CSS and JavaScript. No build, installation, server, font download, remote image, external script or design-system runtime is required. The native preview and fictional **Small plans** workspace were prepared for Interface Atlas by **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**.

## Scope and appearance

This is a bounded local workspace. It has three fixed fictional projects, nine sample tasks, filtering, one current detail article, and a native modal editor. Counts derive from the actual sample checkboxes rather than fabricated analytics. There are no accounts, real clients, synchronization, cloud persistence, agent commands, fake network delays or production achievement claims.

- **Light, Dark and System** use the original Atlas palette. System is the default and follows live device appearance. Guarded preference restoration before the stylesheet keeps useful defaults when storage is malformed or blocked.
- **Comfortable** is the default. Compact changes **only the neutral specimen's inset from 24px to 16px**. Workspace cards, detail, modal, typography, geometry and targets remain comfortable.
- Ordinary panels use **24px** corners, controls **12px**, navigation pills **999px**, and the native editor **28px**. Working surfaces stay opaque. A modal backdrop and optional original shadow are separate composed effects.
- Optional **160ms**, `cubic-bezier(.2, 0, 0, 1)` color/background/border feedback requires motion enabled and no OS reduced-motion request. Otherwise it is immediate. There are no entrance fades, ripples, scaling, moving artwork, animated scrolling or loops.
- No JavaScript leaves all three static detail articles, tasks and native anchors readable. Runtime preferences, filters, editing, reversion and task changes remain disabled with an explanation; ordinary specimen fields remain native and usable. A closed dialog is hidden.

Only appearance, specimen density and motion persist under the localStorage key **`interface-atlas-layered-preview`**. Project titles, priorities, tasks, search and category reset on reload. A valid initial project fragment still selects its named article after initialization. None of this is durable application saving.

## Fictional projects and derived counts

Stable order is **reading, studio, weekend**. Descriptions and task labels are original fixtures, not a record of real users or measured work.

| ID | Initial title | Category | Priority | Initial tasks complete |
| --- | --- | --- | --- | --- |
| reading | Reading corner | Personal | Normal | 1 of 3 |
| studio | Studio refresh | Creative | Focus | 2 of 3 |
| weekend | Weekend walk | Personal | Later | 0 of 3 |

Initial aggregate: **3 of 9 sample tasks complete**. Reading's first task and Studio's first two tasks are checked; the other six are not. A change recomputes the corresponding project count and aggregate without changing unrelated saved fields or another project's task state.

Priority is readable text, not a safety status or a permission. Revert can restore the initial sample data for one project; it does not imply an undo history or reset of a real service.

## Navigation, filtering and current context

1. Search matches saved title and description case-insensitively. Category offers **All, Personal and Creative**. Results preserve fixed order and expose a readable count.
2. Filtering preserves the current detail, task checks, saved edits and preferences. The chosen article remains usable even when its card is hidden. Empty results expose a clear explanation and **Clear filters**.
3. Clear resets both filters and focuses Search because the empty-result action disappears.
4. Each **Open TITLE** is a real anchor to `#project-ID`. Unmodified primary activation selects its article and focuses the detail heading. Modified/middle activation preserves ordinary link behavior.
5. The current card includes **Current project**, and its Open anchor has `aria-current="true"`. These links are not custom tabs or menus. Current context is not communicated only by color.
6. A valid initial or live `#project-reading`, `#project-studio` or `#project-weekend` fragment selects and focuses the matching article. Without a valid project fragment, Reading is the scripted default. Native section navigation remains useful.

Only one detail article is selected with JavaScript; without it, all three remain readable. Filtering a card out does not disable the corresponding current article's task list or Edit action.

## Native modal editor

**Edit project** opens the editor from the selected detail, even when filters hide that project's card. Its accessible name includes the current project title. The editor copies the saved title and priority into separate draft fields; its title field has deliberate initial focus. Native `showModal()` supplies top-layer modality and surrounding-content inertness.

| Action | Local behavior |
| --- | --- |
| Save invalid draft | Trim title and require **1–60 characters**; accept only Normal/Focus/Later priority values. Keep the dialog open and preserve the draft. No saved title, priority or task changes. |
| Error feedback | Associate each invalid field with its inline message; present a linked summary and focus its heading. A focused summary does not also need an assertive alert. |
| Save valid draft | Commit title and priority together, refresh reflected titles, contextual button names, filters and changed-state controls, then close and focus the original Edit button. Tasks remain unchanged. |
| Cancel | Discard unsaved draft, close and focus Edit. Reopening uses saved values. |
| Escape | Native cancel/close discards the draft with the same saved-state and focus behavior. |
| Outside click | Does not dismiss the editor or silently discard changes. |
| Revert project | Outside the editor, restore only that project's initial title, priority and task values. Preserve other projects, current detail, filters and preferences. Focus the detail heading because Revert becomes disabled. |

The form handles submission locally and makes no request. User-entered title content is rendered as text, not interpreted as HTML. There is no pending spinner, server acknowledgement or claim that a local commit has synchronized anywhere.

If the modal API is absent or cannot open the dialog, a readable explanation replaces the editing affordance and Edit actions become unavailable. Filtering, task changes and native navigation continue. This fallback does not pretend to be a custom accessible modal or validate other browser engines.

## Typography and composition

**Plus Jakarta Sans**, normal **400/500/600/700**, is the selected named family. **Gumpita Rahayu of Tokotype** is its designer. The local stack falls back to Segoe UI/Arial/sans-serif; the technical specimen uses local Consolas/Courier New/monospace. No font binary or remote service ships. Actual rendered faces, language coverage and wrapping belong in [validation.md](../validation.md).

The proposed display uses `clamp(2.5rem, 5vw, 4rem)`, 600 weight, 1.1 line height and `-0.035em` tracking. Body is 16px/1.6; labels 14px/1.5; supporting paragraphs 14px/1.6; controls at least 16px. The preview's section and active-detail titles use 1.75rem/1.25; cards use 1.25rem/1.35; smaller supporting headings use 1.25rem/1.4. Section/card tracking is `-0.02em`/`-0.01em`, a preview adaptation of the portable normal-tracking proposal. Preserve useful heading levels, long titles, Vietnamese and technical text rather than clipping them.

The reference caps main composition at **1440px** with **24px** side gutters, reducing to **16px at 700px and below**. It adapts according to the space remaining beside navigation:

| Viewport width | Preview composition |
| --- | --- |
| Above 1180px | 224px navigation plane, three project cards, two-column overview and detail. |
| 961–1180px | Navigation stays alongside; cards become two columns and overview/detail stack into one. |
| 701–960px | Navigation moves above, releasing width; cards stay in two columns and overview/detail return to two. |
| 700px and below | Cards, overview, detail, specimen and footer use one column. Decorative surface artwork is hidden; task/context content remains. |
| 380px and below | Preference fields also use one column; dialog actions stack with reachable full-width buttons. |

Ordinary project-card inset is 24px; details and the dialog use 32px, reducing to 24px at 700px and below. These are explicit preview composition choices rather than a claim that every container has identical padding. The portable proposed radius and control targets remain unchanged. A consuming project chooses breakpoints from its actual labels, content and available pane widths.

Focus uses **3px** solid Focus with **3px** offset and a forced-colors Highlight fallback. Controls/navigation/associated task labels target at least **44px × 44px**. The six opaque color roles retain purpose in both appearances: Page base, Low navigation, Surface content, Raised form/dialog, Tint selected context, Secondary support. Opaque token checks do not validate alpha backdrop/shadow or necessary boundaries between similar grouping fills.

## Credits, reuse and evidence

**Google's Material Design team and contributors** receive conceptual-reference credit for surface roles, limited elevation, shape coherence, adaptive composition and states. **Microsoft's Fluent team and contributors** receive a separate opaque-material/depth/type comparison credit. Native web navigation and editing are original Atlas work; the preview is neither an official Material component nor a Fluent port.

Plus Jakarta Sans copyright belongs to **The Plus Jakarta Sans Project Authors**, **2020**, under **SIL OFL 1.1**. **6616 Studio**, Jakarta Provincial Government and the +Jakarta identity are credited for the original commissioning context, separately from font design. **WHATWG contributors, W3C APG and WAI/EOWG contributors** have standards and guidance roles. None is represented as this theme's author or endorser.

Read [sources and credits](../sources.md) and [third-party notices](../../../THIRD_PARTY_NOTICES.md) for source URLs, pins, release/version distinctions and reuse boundaries. No repository software, website prose, screenshots, icons, external artwork or font software is incorporated. Atlas's own publishing terms remain undecided.

The [site build](../../../site/README.md) publishes the same local behavior and rewrites documentation links to GitHub source pages. The [validation record](../validation.md) reports the browser checks actually performed; it does not certify complete accessibility, screen-reader behavior, intended-font rendering, every device/browser, real-device performance or durable application editing. This remains a **draft reference**.

## Stable test hooks

| Purpose | Selector or state |
| --- | --- |
| Appearance / specimen density / motion | `#appearance`, `#density`, `#motion` |
| Root preference state | `document.documentElement.dataset.appearance/density/motion` |
| Preference storage | `interface-atlas-layered-preview` |
| Search / category / count | `#project-search`, `#project-category`, `#project-count` |
| Empty state / clear / status | `#empty-projects`, `#clear-filters`, `#workspace-status` |
| Fixed-order cards | `[data-project-card="ID"]` |
| Open anchors | `[data-open-project="ID"]` → `#project-ID` |
| Current location | Open anchor `aria-current="true"`, readable Current project marker |
| Static detail articles / focus headings | `#project-ID`, `[data-project-detail="ID"]`, `#project-ID-title` |
| Reflected titles / project counts | `[data-project-title="ID"]`, `[data-project-progress="ID"]` |
| Task state | `[data-project-task="ID"]` with `data-task-index` 0, 1 or 2 |
| Aggregate sample count | `#overall-progress` |
| Edit / project Revert | `[data-edit-project="ID"]`, `[data-revert-project="ID"]` |
| Native modal / form / heading | `#project-editor`, `#project-form`, `#editor-title` |
| Draft title / priority | `#project-title`, `#project-priority` |
| Inline errors / linked summary / focus heading | `#title-error`, `#priority-error`, `#editor-errors`, `#editor-error-heading` |
| Save / Cancel / unavailable fallback | `#save-project`, `#cancel-project`, `#editor-unavailable` |
| Specimen-only density adaptation | `.specimen-panel` |

`ID` means **reading**, **studio** or **weekend**. These hooks support representative checks, not a public API, external service contract or asset license.
