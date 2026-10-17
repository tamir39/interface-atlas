# Pocket Practice design

Status: proposed project contract, 2026-10-15; documentation only. Theme: Layered `0.1.0-draft`, research record `atlas-layered-research-2026-10-15`. Atlas supplied revision: `782159e8e2510933c76989ff9fd9546d282c62cd`, with logged P0 draft inputs. No application or rendered validation accompanies this document.

## Requirements and project decisions

Independent learners need to find a lesson, bookmark it, place practice in a week, complete it with a short note, change a goal, and revisit their actual work. The interface is English; supplied Vietnamese lesson passages retain their language. There is no language switch, account, synchronization, backend, AI, or agent control.

The required appearances are Light, Dark, and System. Same-browser data and preferences must survive reload when storage works. Storage failure must preserve visible work and explain what remains unsaved.

Everything below concerning markup, routes, schema, persistence mechanisms, field limits, deletion, and media is a **Pocket Practice proposal**, pending implementation and product confirmation. Lesson content, stable lesson IDs, final model, framework, browser baseline, assets, and font binaries remain inputs. Layered is selected over Botanical: its comfortable working regions fit catalog, planner, and editors directly; Botanical's serif-led reading identity would require more adaptation around repeated controls. This is a suitability judgment.

## Color and material contract

Retain these exact Layered proposals; each row is Light / Dark:

| Semantic role | Light | Dark | Assignment |
| --- | --- | --- | --- |
| Page | `#EAF2F1` | `#101C1C` | Application base |
| Low | `#DFEBE9` | `#172626` | Primary navigation |
| Surface | `#F7FBFA` | `#1E3030` | Catalog, lesson, week, history |
| Raised | `#FFFFFF` | `#273C3B` | Fields and temporary editor |
| Tint | `#D5EAE5` | `#294C46` | Current destination and selection |
| Secondary | `#F2E6DA` | `#43372E` | Goal summary |
| Ink | `#172F2C` | `#E7F3EF` | Main text and selected markers |
| Muted | `#405E58` | `#B4CEC5` | Supporting text |
| Primary | `#185C50` | `#A2D6C5` | Main action fill or action text |
| On primary | `#FFFFFF` | `#12382E` | Foreground on Primary fill |
| Border | `#58766E` | `#8AABA1` | Necessary control boundaries |
| Focus | `#6D3B83` | `#E7B6F4` | Focus outline |
| Error | `#972F3A` | `#FFB3BE` | Error message and invalid boundary |

Ink, Muted, Primary text, Border, Focus, and Error may appear on the six named opaque backgrounds. Selected labels use Ink on Tint. On primary is restricted to Primary action fills. Hover preserves the foreground/fill pair and adds a boundary; no new lighter fill is assumed safe. Completion always includes “Completed” and a date; no extra success color is needed. Supporting text remains opaque. Decorative dividers cannot substitute for necessary input outlines.

Surfaces express region purpose: Low navigation, Surface work, Secondary goal, Raised editing. Keep this mapping when regions move. Use no card shadows, texture, blur, imported artwork, or glass. A modal may use the inherited optional `0 24px 64px rgba(0,0,0,.24)` shadow and a dimming backdrop; their compositing requires future inspection.

## Typography, geometry, and adaptive layout

Proposed family: `"Plus Jakarta Sans", "Segoe UI", Arial, sans-serif`, normal 400/500/600/700. No font download is assumed. Selected font files and fallbacks must cover English and Vietnamese, including stacked diacritics, without clipping. Mark Vietnamese passages `lang="vi"` within an English document. Wrap titles and notes; render user text as text.

Retain body `1rem/1.6` at 400, metadata `0.875rem/1.5` at 500, detail headings `1.25rem/1.35` at 600, section headings `1.75rem/1.25` at 600. Project adaptation: the application title is `2rem/1.2` at 600 instead of the theme's large display ramp. Inputs and actions are at least `1rem/1.5`. Use sentence case, one h1, sequential headings, and a 65ch maximum lesson measure. Use tabular figures only for comparable weekly counts.

Spacing follows 4, 8, 12, 16, 24, 32, 48, 64, 96px: 8px label-to-field, 12–16px related controls, 24–32px groups. Retain 24px panel corners, 12px control corners, 999px short navigation pills, and 28px editor corners. Comfortable density is the sole initial mode. Hit areas are at least 44×44px; native checkbox labels extend their target.

Start with a single column, 16px gutters, and 16px panel inset. Header, navigation, page heading, useful summary, primary work, and supporting actions follow that DOM order. Navigation wraps in normal flow, avoiding a fixed bar over content. At 48rem, use 24px gutters/insets and optional two-column lesson rows only if titles and actions fit. At 64rem, a 224px Low navigation plane may sit beside a `minmax(0,1fr)` main region; main width is capped at 1200px. History stays a readable list. Week remains a chronological agenda rather than seven narrow columns. These project thresholds yield to content fit and zoom; horizontal scrolling is not a navigation requirement.

## Destinations and useful empty states

Proposed single-document routes are `#/learn`, `#/lesson/ID`, `#/week?start=YYYY-MM-DD`, `#/history`, and `#/settings`, using ordinary anchors. Learn filters belong in that route's query: search text, a content-supplied category, and “Bookmarked only.” Do not invent difficulty levels absent from content. Replace the current entry while filtering; push an entry for explicit destination changes. A result count follows the controls. “Clear filters” restores the full catalog and focuses Search. Opening a lesson preserves the return list and filter context.

Lesson rows show title, concise description, supplied category, and separate “Open lesson” and “Bookmark” controls. Avoid a whole-row link containing buttons. Lesson detail offers “Plan practice” and “Finish practice”; completion is never inferred from opening or time spent.

Week displays Monday–Sunday local calendar dates, previous/next week links, and date-grouped planned lessons. A goal summary states the learner's words and target practices per week. Progress is the number of committed completions within that local week; repeating a lesson is allowed. A planned entry and its linked completion must not count twice.

History lists only acknowledged completions: lesson title snapshot, completion date, and note. Its detail preserves the recorded title/note even when catalog content changes; a missing lesson link explains unavailability. No sample achievement or fabricated streak appears.

Empty Learn with a catalog problem says content is unavailable and offers Retry when supported. No matching results offer Clear filters. Empty bookmarks offer Browse lessons. Empty Week offers Plan practice. Empty History says “No completed practices here yet” and links to lessons. A missing goal offers Set a goal. An absent saved record says “This browser has no saved practice data”; it does not assert first-ever use. Loading, unavailable storage, and unreadable data have distinct messages.

## Forms, editing, and navigation

Proposed fields are: goal text, required 1–120 Unicode code points after trimming outer whitespace; target, integer 1–7 practices/week; plan lesson, required stable catalog ID; plan date, required local date within the displayed week; completion note, required 1–500 code points. Preserve internal spacing and line breaks; never truncate silently. Reject duplicate lesson/date plan entries with a link to the existing entry. Completion records capture an instant plus local date/offset; changing device time is not independently verified.

Use associated visible labels, hints and required markers, native inputs/selects, buttons, landmarks, and a skip link. Proposed custom validation owns messages and focus: forms use `novalidate` while retaining useful input types/constraints. Button, Enter, and scripted submission call the same validator. Validate on Save/Finish; counters may update quietly while typing. Failed submission keeps values, adds associated inline errors and a linked summary, and focuses the summary heading. Clear corrected messages and invalid associations after correction. Storage errors are operation failures, not invalid fields.

Use a named native dialog for bounded goal, plan, and completion editors. Initial focus goes to the first field; Tab remains within native modality. Include Save/Finish and Cancel, no backdrop dismissal. Clean Cancel/Escape closes. Dirty close changes the same dialog to “Keep editing” / “Discard changes,” initially focusing Keep editing; Escape there restores editing and the previous field. Handle native cancel separately from close. Forced closure cannot guarantee interception: retained drafts remain discoverable under “Resume unfinished practice.” If native modality is unavailable, use the same form as a full-page destination with equivalent return behavior; browser baseline and fallback integration are gates.

Save captures immutable candidate A. Fields stay editable while A writes; Save remains focusable with guarded `aria-disabled` and adjacent “Saving…” text, covering all activation paths. Completion of A acknowledges only A. If edit B exists, keep B dirty and the editor open; close only when current values equal acknowledged A. A failure preserves the latest draft, offers Retry, and never says “Saved.” Background status uses one polite status region; focused error summaries need no competing alert.

New destinations update the document title and focus their heading without animated scrolling. Proposed client routing records scroll and focus per history entry and owns manual restoration for Back/Forward; missing targets fall back to the page heading. Traversal preserves durable drafts and restores route filters. In-app dirty exits offer Keep editing, Save changes, or Discard changes; pending saves must settle before discard. Browser reload/close prompts are advisory and present only for unacknowledged work. They cannot guarantee mobile termination protection.

## State ownership and save boundaries

Propose IndexedDB, database version 1, with `meta`, `data`, and `drafts` stores. This is a candidate contract, not an implemented persistence guarantee. The bundled catalog is read-only; derived counts are recomputed. Route/filter state lives in URL/history. Committed bookmarks, plans, goal, completions, appearance, and one plan-removal undo slot live in `data`. Each editor owns an in-memory draft and a separately identified durable draft record.

`meta` contains payload schema version 1, a non-reused generation ID, and committed revision. `data` contains stable lesson references, plan IDs/date keys, goal values, completion IDs/title snapshots/note/date metadata, appearance enum, and undo payload. `drafts` contains draft ID, kind/target, generation, base committed revision, draft revision, candidate values, and update time. Final identifiers, serialization, Unicode accounting, record/count/byte limits and growth rules must be approved before implementation. Apply one shared capacity validator to every creation/update/draft path; never silently delete history at capacity. No import/export facility is proposed for this initial scope.

Draft writes are serialized per editor after 400ms idle and on blur, with immediate visible “Unsaved” until transaction completion. Each write snapshots values and compares its generation and prior draft revision inside the transaction. Acknowledged A cannot mark later B saved. Reload offers the last acknowledged draft separately from committed history and clearly labels it unfinished. Unacknowledged keystrokes may be lost on forced termination; show that limit when saving fails.

Commit runs one read/write transaction across the affected stores: read and compare generation, committed revision, and draft revision; validate the candidate; apply only the named operation; increment revision; retire the acknowledged draft candidate. Preserve any newer local draft and save it against the new base. A request-success event is insufficient; show “Saved in this browser” only after successful transaction completion. Durability hint/browser support are implementation gates; neither commit nor strict durability promises indefinite retention.

Every mutation, including bookmark, plan removal, Undo, preference, draft, and reset, checks generation. A stale revision rejects the write. Show “Practice data changed in another tab,” the retained draft, and latest readable values. No automatic merge or whole-snapshot replacement is allowed. The proposed conflict resolution is copy retained text, explicitly load latest, then re-enter the desired change; confirm before discarding the old draft. Recheck on every retry. Cross-tab notification is advisory, never the lock.

Bookmark and appearance changes save immediately with pending/error text and the same acknowledgement boundary. On appearance failure, keep the visible choice for this session, say it was not saved, and offer Retry/Revert. System is the default and follows live OS changes; stored choices must validate. Light/dark CSS defaults remain usable before storage reads complete.

## Storage failures, deletion, and recovery

Startup distinguishes loading, validated records, absence, access failure, invalid payload, unsupported schema, and blocked upgrade. Do not write defaults over unreadable or newer data. Retain readable originals untouched; disable writes to that authority. Offer Retry and an explicit temporary mode with “Changes here will be lost after reload.” Temporary drafts are isolated from saved data; recovering storage requires deliberate review before saving them.

Quota/abort failures retain the latest draft and last acknowledged data, with “Not saved in this browser,” Retry, and selectable plain-text note/goal content for manual copying. Do not depend on clipboard permission. Full storage must not clear existing history to make space. Blocked upgrades ask users to close other Pocket Practice tabs and retry; future schema migrations need their own version map, interruption and capacity plan. No migration from an invented legacy format is promised.

Proposed deletion scope: unbookmarking and removing a plan entry; completed records are retained in this initial release. A successful plan removal stores one inverse payload atomically. “Undo last plan removal” remains reachable in Week across navigation/reload until another removal replaces it or Undo succeeds. Undo checks generation/revision and duplicate lesson/date; conflicts preserve the slot and explain why restoration did not occur. No disappearing toast is its sole access point.

Settings may offer “Reset practice data in this browser,” naming bookmarks, plans, goal, history, unfinished drafts, preferences and undo as affected. Require explicit confirmation; offer reviewing/copying readable work first. Reset atomically writes empty validated data with a new generation and retires old drafts/undo. Queued saves and stale tabs then fail generation checks. If reset fails, retain the former authority and explain failure. Unsupported or unreadable schemas permit reset only through a confirmed, separately implemented recovery boundary; absence of that capability leaves reset unavailable with explanation.

Disclose in Settings that browser/profile clearing, eviction, and device loss can remove local data; there is no independent backup. Storage persistence permission is optional future work requiring supported-browser evidence and meaningful timing, not a page-load prerequisite.

## Motion, evidence, and remaining gates

Retain optional 160ms color/background/border feedback with `cubic-bezier(.2,0,0,1)` only when the OS allows motion. Reduced motion makes it immediate; all layout, focus, errors, filtering, dialog transitions and state updates are immediate regardless. Focus is 3px solid Focus with 3px offset; use system Highlight in forced colors and inspect clipping. There is no reveal, ripple, automatic scrolling, timer, or animation dependency.

Use text-first content and no media initially. Any future audio/image lesson needs content rights, loading/failure behavior, alternatives, controls, and actual delivery support. Font packaging/notice, Vietnamese rendering, browser baseline, final schema/capacity, routing fallback, and recovery-reset capability remain explicit gates.

Performed: selective source reading and document synthesis. No implementation, browser, keyboard, assistive-technology, service, performance, or conformance result is claimed. Future checks must exercise narrow layout/zoom, English/Vietnamese fallback, keyboard/focus, native modal/fallback, validation via button/Enter, appearance reload/live System, actual history, blocked/full/malformed storage, A-save/B-edit ordering, two-tab conflicts, failed reset, stale writers after reset, Undo conflicts, and forced-close draft recovery. Layered's published opaque-pair arithmetic supports only those named source pairs, not this unrendered product.

## Provenance and reuse

Layered and P0 chapters are original Atlas synthesis by **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. Theme revision is `0.1.0-draft`; state/recovery and forms/navigation are `0.2-draft`, reviewed 2026-10-15. This project retains theme tokens/type/shape/feedback and adapts layout, durable state, forms, and recovery. Atlas publishing terms remain undecided. No external implementation, prose, artwork or font binary is imported.

Google's Material Design team/contributors supply concepts of [surface roles](https://m3.material.io/m3/pages/color-roles?s=m3), [shape](https://m3.material.io/styles/shape/overview-principles), and adaptive composition. Microsoft's Fluent team/contributors supply the separate [solid material/elevation comparison](https://fluent2.microsoft.design/material). Inspected by Atlas 2026-10-15; website reuse terms are not blanket asset licenses. Software context only: Material Web 2.5.0 at `5a95667bb70ca5be8785b762fb0303737c3b4ac1`, Apache-2.0, copyright Google 2018–2023, maintenance mode; Fluent React 9.74.9 at `93e324f72f0e187ff6a7e5f70ebf929d9b2212a2`, MIT, copyright Microsoft, fonts/icons separate. Neither package is selected.

Plus Jakarta Sans: **Gumpita Rahayu, Tokotype**; commissioned by **6616 Studio** for **Jakarta Provincial Government's +Jakarta identity**. [Upstream](https://github.com/tokotype/PlusJakartaSans/tree/18d1cd2f7ea10481919d2f05c1f7064b7307fc26): source version 2.071, observed release 2.7.1; Google Fonts metadata pin `8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5` lists Vietnamese. Copyright 2020 The Plus Jakarta Sans Project Authors, SIL OFL 1.1. Retain the complete selected package's OFL/copyright notice if later bundled; metadata does not prove glyph rendering.

P0 references, inspected by Atlas 2026-10-15: [Storage Standard](https://storage.spec.whatwg.org/commit-snapshots/23f38d8feaf530b9787822e067a7eb6f953af322/), WHATWG, writer Anne van Kesteren, snapshot updated 2026-10-06; [IndexedDB 3.0 Working Draft](https://www.w3.org/TR/2025/WD-IndexedDB-3-20250813/), W3C Web Applications WG, editor Steve Becker, former editors Ali Alabbas/Joshua Bell, copyright W3C 2025; [WCAG 2.2](https://www.w3.org/TR/2024/REC-WCAG22-20241212/), W3C Accessibility Guidelines WG, editors Alastair Campbell, Chuck Adams, Rachael Bradley Montgomery, Michael Cooper, Andrew Kirkpatrick; [WAI User Notification](https://www.w3.org/WAI/tutorials/forms/notifications/), WAI EOWG, editors Eric Eggert/Shadi Abou-Zahra, updated 2022-06-03. WCAG carries W3C Document License 2023; IndexedDB and WAI tutorial carry W3C Software and Document License 2023. Preserve their notices/change declarations if copying covered material.

[HTML dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element) and [history](https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-history-interface) are WHATWG/contributor Living Standard references, observed page update 2026-10-14, unpinned. WHATWG copyright holders: Apple, Google, Mozilla, Microsoft; document text CC BY 4.0, incorporated code portions BSD 3-Clause. [Lifecycle guidance](https://developer.chrome.com/docs/web-platform/page-lifecycle-api#the-beforeunload-event), Philip Walton/Google, updated 2023-12-01, has CC BY 4.0 prose and Apache-2.0 samples. These references inform proposals; no source implies endorsement or tested target-browser behavior. Retain attribution/license/change notices for any future covered copying.
