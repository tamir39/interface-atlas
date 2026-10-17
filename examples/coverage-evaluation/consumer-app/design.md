# Pocket Practice design

Status: reviewed unimplemented trial draft, 2026-10-15. First-draft hash and findings are preserved in evaluation.md. Theme: Layered 0.1.0-draft. Atlas snapshot: 782159e8e2510933c76989ff9fd9546d282c62cd; theme research record: atlas-layered-research-2026-10-15. Numerical theme evidence is distinct from future product validation.

## Requirements and project proposals

The fictional brief requires personal lesson discovery, bookmarks, weekly planning, a completion note, goal editing and actual completed-work review. English UI can contain Vietnamese lessons. Light, Dark and System, keyboard operation, reduced motion and reload persistence in the same browser are required. Storage may fail. Fresh start must remain useful; unreadable storage must not masquerade as empty history.

Every product contract below is a **project proposal** unless explicitly identified as a brief requirement or retained Atlas visual rule. No stack, content, font binary or brand asset is supplied. Proposed scope uses local browser data, native semantic markup and text lessons. Goal means sessions per week; content owners must confirm that interpretation. Navigation, storage format, limits, conflict handling and recovery need implementation review. Account, sync, backend and agent workflows are outside this trial brief.

Choose Layered because its opaque navigation, work and editor planes, comfortable controls and distinct selection/focus states fit repeated browsing and planning. Botanical is a viable reading-first alternative with quiet articles, but its README makes reading-workspace persistence and compact application controls adaptations. Play supports learning but its strong offset shadows and colorful supporting panels introduce emphasis unnecessary for this calm catalog. These are design assessments, not usability findings.

## Color contract

Retain the following Layered values unchanged. All are opaque; no extra semantic colors, gradients or image backgrounds are proposed.

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| Page | #EAF2F1 | #101C1C | App base |
| Low | #DFEBE9 | #172626 | Navigation |
| Surface | #F7FBFA | #1E3030 | Working and reading regions |
| Raised | #FFFFFF | #273C3B | Fields and temporary editor |
| Tint | #D5EAE5 | #294C46 | Selected filter/current context |
| Secondary | #F2E6DA | #43372E | Weekly goal summary |
| Ink | #172F2C | #E7F3EF | Main text and selected markers |
| Muted | #405E58 | #B4CEC5 | Supporting text |
| Primary | #185C50 | #A2D6C5 | Main action fill and underlined links |
| On primary | #FFFFFF | #12382E | Foreground on Primary fill only |
| Border | #58766E | #8AABA1 | Necessary control outlines |
| Focus | #6D3B83 | #E7B6F4 | Focus outline |
| Error | #972F3A | #FFB3BE | Invalid text and boundaries |

Ink, Muted, Primary link text, Border, Focus and Error may appear on any of the six background roles. Selected labels use Ink on Tint. Primary buttons use only On primary on Primary. Other buttons use Ink on Raised with Border. Pending, completed and unsaved states use explicit text plus Ink; no green success color is invented.

Hover retains the pair and adds a 2px Border inset outline; pressed retains colors and a 3px inset outline. Selected filter checkmarks and current-location text remain visible during focus. Disabled controls retain readable Ink, Border and an adjacent explanation, with no opacity reduction. Error adds associated text, never color alone. Focus uses 3px Focus, offset 3px; outline space must stay unclipped.

Atlas reports minimum contrast across six backgrounds: Ink 11.31/8.33, Muted 5.65/5.67, Primary 6.23/5.85, Border 3.95/3.80, Focus 6.43/5.59 and Error 6.01/5.61, light/dark respectively. Action pairs are 7.82/7.95. These are inherited opaque calculations; surface-to-surface contrast is not a control-boundary guarantee.

## Typography, spacing and geometry

Retain the named Plus Jakarta Sans direction: normal 400, 500, 600 and 700; fallback "Segoe UI", Arial, sans-serif. No font is fetched by this proposal. Until a licensed file is selected, fallback rendering is an open contract. Google Fonts metadata recorded by Atlas lists Vietnamese; verify the actual chosen binary and fallback with “Hôm nay tôi đã học được điều gì?” and mixed English/Vietnamese paragraphs.

Use rem sizes with unitless line heights; the following pixel equivalents assume a 16px reference only. Keep the root at 100% and respect browser/user text preferences. One h1 per page: 1.75rem, line-height 1.25, weight 600, normal tracking (28px reference). Section h2: 1.5rem/1.25, 600 (24px). Lesson titles: 1.25rem/1.35, 600 (20px). Body/reading: 1rem/1.6, 400; controls: 1rem/1.5, 500; metadata: .875rem/1.5, 500. These sizes adapt Atlas's larger display scale. Reading measure is 65ch. Preserve full lesson titles, errors and notes; wrap long words with overflow-wrap:anywhere, allow textarea growth and avoid fixed text heights. Apply tabular numerals only to comparable counts.

Retain spacing 4, 8, 12, 16, 24, 32, 48, 64, 96px. Labels sit 8px above fields; related actions have 12px gaps; groups separate by 24px. Narrow panels use 16px padding, wide panels 24px. Retain 24px panel corners, 12px controls, 28px modal corners; short current-navigation labels may use pills. Hit areas are at least 44 by 44px. Panels remain opaque and flat; no decorative artwork or card shadows are needed. A temporary editor may use 0 24px 64px rgba(0,0,0,.24); its dark rgba(0,0,0,.40) backdrop requires rendered checking.

## Pages and responsive behavior

Proposed destinations are Lessons, This week, Completed and Settings, using ordinary links with current-page indication and browser history. Detail pages have direct lesson-ID URLs and a Back to lessons link. Bookmark is a filter within Lessons. Maintain search, selected filters and scroll position on returning from a detail page, without requiring persisted search history.

At 320–599px, use 16px gutters and one column. A nonsticky top navigation wraps labels without clipping. Main order is h1, short context, controls, results. Lessons places search, topic select and Bookmarked-only checkbox before count and a text list; each row contains full title link, topic, estimated minutes and separate Bookmark button. No whole-row click target nests other actions.

At 600–959px use 24px gutters and the same logical order; filter controls can share a wrapping row. At 960px and above, use a 224px Low navigation region, 24px gap, and flexible main content within a 1280px maximum. Lesson reading stays 65ch rather than filling width. Weekly days remain a vertical dated list at every size; no drag-only calendar is introduced. Supporting goal summary follows the heading and precedes the list. At 200–400% zoom the layout follows available CSS width. No fixed bottom bar obscures focus or errors.

A lesson detail shows title, topic, estimated duration, readable content, Bookmark, Plan practice and Finish practice. Content is not yet authored: proposed fixture “Notice three details”, 5 minutes, observation, is clearly sample lesson material; no fabricated completions are seeded. No image, audio or video delivery is assumed.

## Components, states and feedback

Use semantic header, nav, main and footer, a visible-on-focus skip link, labeled native search/select/checkbox/button/form controls, and headings in order. The search field says “Search lessons”; placeholder “Title or topic” supplements its label. Search compares normalized lowercase titles and topics, retaining Vietnamese diacritics; accent-insensitive matching remains an open content decision. Stable catalog order avoids unexpected movement.

Default, hover, pressed, focus and selected treatments follow the color contract. Bookmark is a toggle button with aria-pressed and accessible name “Bookmark TITLE” or “Remove bookmark for TITLE”. Result count and save feedback use one polite status region; avoid a stream of duplicate announcements while typing. Search does not move focus. A clear-filters action resets search, topic and bookmark filter, then focuses Search.

Catalog loading says “Loading lessons…”. A content failure says “Lessons could not be opened” with Retry; it cannot show a false empty catalog. Fresh completed history says “Your completed practices will appear here” and links to Lessons. No-match results say “No lessons match these filters” with Clear filters. Empty bookmarks link to all lessons. Empty week offers Plan practice and does not invent streaks or progress.

Use native named modal dialogs for goal, planning and completion. Focus the first editable field on open; on failed validation focus a linked error summary, preserving input and associating inline errors. Save/Cancel remain visible. Clean Cancel/Escape closes immediately. Dirty Cancel/Escape shows “Discard these edits?” inside the same named dialog, with no second dialog. Retain the draft, temporarily make its fields inactive, and focus Keep editing. Keep editing, or Escape while confirming, restores the fields and last focused editable field; Discard closes and returns to the opener. Clicking outside never dismisses. A successful save closes, returns focus and announces the actual local result. If modal support fails, use an equivalent dedicated form route; that fallback requires testing. Render user text as text, preserving line breaks in notes.

## Practice flows and editing

**Discover and bookmark:** filters narrow the same catalog; a title opens its detail. Bookmark attempts a write with a stable mutation ID. While pending, keep the button focusable with aria-disabled=true, guard repeated pointer/keyboard activation, and show “Saving…”. Commit the new pressed state only after transaction completion. On failure retain its prior pressed state and control focus; expose an inline Retry in normal tab order without moving focus to it.

**Plan:** This week defaults to the current local-calendar week, Monday through Sunday, labeled with full date range. Previous/Next week preserves real dates. Plan practice selects an existing lesson and date; default date is today if in the displayed week, otherwise its Monday. Validate both fields and at most one plan for the same lesson/date. Save stores a date-only YYYY-MM-DD value, not an instant; changing time zone does not move it. Removing a plan requires an explicit confirmation naming lesson/date; it never deletes completed work.

**Complete:** Finish practice opens a required short-note field, 1–500 Unicode code points after trimming, and a date defaulting to local today. Require a valid Gregorian civil date in YYYY-MM-DD form, including month/leap-day checks, no later than local today. An earlier date logs work already done; future planned practice belongs in plans and never counts automatically. Confirm stores one completion with unique ID, lesson ID, title snapshot, local date, created timestamp and note. Guard repeat submission with a focusable aria-disabled pending button; retry reuses its ID to prevent duplicates. If launched from a plan, record its plan ID and mark that plan completed in the same transaction; completing elsewhere does not silently resolve every matching plan.

**Review and goal:** Completed lists only stored completion records, newest local date first, then timestamp/ID; its detail shows the actual note and lesson title snapshot. History remains readable if catalog content later changes or disappears. Edit note uses an explicit Save and the same validation. Goal editor proposes 1–7 sessions/week; no medical or learning outcome is implied. Weekly count derives from actual completions dated within that week; planned items do not count. Counts may exceed the goal. Completion deletion is excluded pending a recovery contract; no misleading Undo affordance is shown.

## Persistence, conflicts and recovery

Proposed authority is one validated IndexedDB snapshot, database pocket-practice-v1, state store, current key. Snapshot fields are schemaVersion=1, revision, bookmarks, plans, completions, goal, appearance and updatedAt. IDs are stable strings; appearance is light/dark/system; goal is an integer 1–7. Civil dates, references, uniqueness and note limits are checked on read and write. Plans may have future dates; completions may not. Lesson content is a separate bundled catalog. Component drafts live in memory until explicit Save; search and open dialogs are ephemeral.

Startup first distinguishes loading, valid stored data, missing record and unreadable data. Only a genuinely missing record starts empty bookmarks/plans/history, goal 3 and System. Display available catalog during storage startup, but disable mutations until authority is resolved. No account or remote acknowledgement exists.

Serialize writes per tab. Each IndexedDB readwrite transaction reads the stored revision, compares the edit's base revision, validates the complete next snapshot, writes revision+1 and waits for successful completion before reporting “Saved in this browser”. Aborted/quota transactions retain prior authority and the visible draft; show “Could not save. Your edits are still here”, Retry and Copy note where applicable. Bookmark failure retains the old bookmark; form failures stay open. Pending state never implies durability.

Other tabs are independent readers: announce/invalidate through a browser message when available and re-read on focus. Revision comparison inside the transaction prevents silently overwriting a newer snapshot. On conflict retain both current stored value and local draft, show what changed, and require Review latest or explicitly Apply my draft to the latest revision; retry can conflict again. Do not promise cross-device or perpetual retention.

If blocked/open fails, display “Browser storage is unavailable” and offer Retry or explicitly Continue for this visit. Visit mode keeps changes in memory with persistent “Not saved; leaving or reloading loses these changes” status; never use saved-success language. Do not automatically switch a failed save into visit mode. Cancel/route changes with dirty drafts require discard confirmation; browser unload warnings are only best effort, so maintain the visible warning while dirty.

Malformed/unknown-version data remains untouched. Say “Saved practice data could not be read”; offer Retry, a bounded raw export if safely serializable, or explicit Replace stored data confirmation describing the loss. A read error must not execute reset.

Capacity is an explicit implementation gate: no byte, record-count, ID-length or title-length budgets are adopted by this draft. Agree and test one bounded schema/serialization/capacity policy before enabling creation, updates, visit-mode mutations or import/export. Its invariant must be that every valid created state fits the same export/import envelope, including changed local metadata; do not impose a smaller recovery-only cutoff. Goal/note field limits above remain UX proposals, not a full storage budget. At capacity preserve saved state/draft, explain “Storage limit reached. Your changes have not been saved”, and never evict history silently. The final policy must allow existing data to be backed up before replacement. Preview import counts and replacement consequences; validate the complete candidate against the same policy and commit atomically only after confirmation. Failure preserves old storage and input. Malformed raw export is separate and never claims importability. Never render imported text as markup. Export includes personal notes and is a local backup, not sync. Saving visit data after storage recovers requires reviewed replacement, without silent merging. Exact schema, capacity and conflict-reapplication details remain implementation gates; prose is not verified storage behavior.

Appearance shares the authoritative snapshot and Save/failure semantics. System initially follows prefers-color-scheme; after load restore the saved validated choice, then react to live OS changes only in System. Settings displays a labeled Light/Dark/System control and a Save appearance action. A failed write leaves the persisted choice unchanged and preserves the draft preview with “Not saved”.

## Accessibility, motion and validation

Retain optional color/background/border feedback at 160ms cubic-bezier(.2,0,0,1); enumerate properties. OS reduced motion makes it immediate. Layout, dialogs, scrolling, focus, validation and counts remain immediate. No reveals, looping effects, custom cursor or animation runtime are needed; therefore effects.md was not loaded.

Keep keyboard reading order identical to layout; focus is separate from selection, errors are programmatically associated, and status text does not steal focus. Forced colors uses system Highlight for focus and preserves borders/native controls. No language selector is proposed: html language is English; authored Vietnamese passages receive lang=vi. Authors must supply language metadata and meaningful lesson content.

Performed here: selective source reading, contract review and opaque contrast arithmetic. There is no UI, browser run, rendered proof or production guarantee. Before implementation acceptance verify both appearances and System transitions; 320px reflow, zoom and text resizing; actual Vietnamese font rendering; keyboard and assistive technology; all empty/loading/error states; successful reload of every persisted field; blocked/full/malformed storage; transaction aborts, duplicate submissions, concurrent-tab conflicts and import cancellation/failure. Measure catalog and import handling with the agreed limits. Native elements and color arithmetic do not establish complete accessibility.

## Source credits and adaptation boundaries

Atlas theme authorship: **Tamir (Phi Vuong Tuong Tam) with Codex AI assistance**, Layered 0.1.0-draft, reviewed 2026-10-15; [pinned Atlas theme/source record](https://github.com/tamir39/interface-atlas/blob/782159e8e2510933c76989ff9fd9546d282c62cd/themes/layered/sources.md). Exact theme palette, role pairings, spacing, shape, focus and optional timing are retained Atlas proposals. App type sizes, breakpoints, lesson flows, markup strategy, save/persistence/recovery model and sample title are new trial proposals. No theme preview behavior or sample task data is treated as durable product infrastructure.

Concept credits, as recorded in Atlas sources: **Google Material Design team and contributors**, [color roles](https://m3.material.io/m3/pages/color-roles?s=m3), [elevation](https://m3.material.io/styles/elevation/overview), [shape](https://m3.material.io/styles/shape/overview-principles), adaptive layout and states; **Microsoft Fluent Design team and contributors**, [opaque material](https://fluent2.microsoft.design/material) and [elevation](https://fluent2.microsoft.design/elevation). No source website was opened during this trial. These concepts are not copied Material/Fluent tokens, assets or official components.

Atlas's software evidence pins are [Material Web 2.5.0 at 5a95667bb70ca5be8785b762fb0303737c3b4ac1](https://github.com/material-components/material-web/tree/5a95667bb70ca5be8785b762fb0303737c3b4ac1), Apache-2.0, Copyright 2018–2023 Google, Inc.; and [Fluent UI React 9.74.9 at 93e324f72f0e187ff6a7e5f70ebf929d9b2212a2](https://github.com/microsoft/fluentui/tree/93e324f72f0e187ff6a7e5f70ebf929d9b2212a2), MIT, Copyright Microsoft Corporation. No package is selected or imported. Their software terms do not license website prose, screenshots, trademarks, icons or fonts; those terms remain separate.

**Plus Jakarta Sans:** Gumpita Rahayu / Tokotype; commissioned through 6616 Studio for Jakarta Provincial Government's +Jakarta identity. [Upstream pin](https://github.com/tokotype/PlusJakartaSans/tree/18d1cd2f7ea10481919d2f05c1f7064b7307fc26), numeric source version 2.071; release label 2.7.1; Google Fonts metadata pin 8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5. Copyright 2020 The Plus Jakarta Sans Project Authors, SIL OFL 1.1. Future font distribution must include the selected package's full copyright/OFL notice and verify glyphs.

Standards concepts credit WHATWG/HTML contributors for [the dialog element](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element), W3C ARIA Authoring Practices Task Force/contributors for [modal dialogs](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), and W3C WAI Education and Outreach Working Group/contributors for [form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/). Atlas records WHATWG Living Standards/Review Drafts as CC BY 4.0, with incorporated source-code portions under BSD 3-Clause; W3C materials retain document-specific copyright/reuse notices. No standards prose/code is copied, and these records do not license unrelated assets. Atlas publishing terms remain undecided. Preserve these credits and resolve exact material terms before publishing reused material. No third-party artwork, icons, logos, font files or implementation code is included.
