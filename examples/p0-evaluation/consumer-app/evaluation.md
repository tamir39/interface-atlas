# Pocket Practice trial evaluation

Status: author traceability note, 2026-10-15. This is a fresh documentation trial and requirement mapping, not an application evaluation. No parent review has been incorporated. `first-draft.md` and `design.md` are delivered with identical bytes. The supplied `brief.md` remains unchanged.

## Requirement-to-heading mapping

| Brief requirement | Design heading and concrete decision |
| --- | --- |
| Calm consumer app, text-first catalog | Requirements and project decisions; Color and material contract; Typography, geometry, and adaptive layout. Layered is selected from two candidates for comfortable working regions; no unnecessary imagery. |
| Browse and filter lessons | Destinations and useful empty states. Learn route has text search, content-supplied category and Bookmarked only; result counts and Clear filters retain useful context. |
| Bookmark | Destinations and useful empty states; State ownership and save boundaries. Separate bookmark action with persistence acknowledgement and failure behavior. |
| Plan weekly practice | Destinations and useful empty states; Forms, editing, and navigation. Monday–Sunday agenda, explicit local dates, prior/next week, duplicate lesson/date prevention. |
| Finish with a short note | Forms, editing, and navigation; State ownership and save boundaries. Required proposed note bounds, explicit Finish action, committed completion record; unfinished drafts do not count. |
| Edit a goal | Forms, editing, and navigation. Proposed goal text and weekly target fields, validation and save boundary. |
| Revisit actual completed work | Destinations and useful empty states. History uses acknowledged completion records, stored title snapshots, notes, dates and missing-content behavior. |
| Same-browser data/preferences survive reload | State ownership and save boundaries. Proposed IndexedDB authority, draft persistence, transaction-complete acknowledgement, appearance validation and System behavior. |
| Blocked, full and malformed storage | Storage failures, deletion, and recovery. Separate startup states, read quarantine, explicit temporary mode, retained drafts, Retry and manual text copying. |
| Distinguish fresh start from unreadable data | Destinations and useful empty states; Storage failures, deletion, and recovery. Absence message avoids first-ever-use inference; invalid or newer data cannot be overwritten by defaults. |
| Edits do not disappear silently or falsely claim saving | Forms, editing, and navigation; State ownership and save boundaries. Candidate-bound save A/edit B handling, preserved failure drafts, dirty exits and conditional acknowledgement. |
| Light, Dark, System | Color and material contract; State ownership and save boundaries. Full paired tokens, live System, stored-choice validation and visible failure after preference write failure. |
| Phone first, usable desktop | Typography, geometry, and adaptive layout. Single column, content-fit thresholds, chronological week agenda, wrapping navigation, bounded reading width. |
| Keyboard and reduced motion | Forms, editing, and navigation; Motion, evidence, and remaining gates. Proposed landmarks, labels, native controls/dialog, deliberate focus, Enter validation and immediate reduced-motion behavior. |
| English UI, Vietnamese lessons, no language toggle | Requirements and project decisions; Typography, geometry, and adaptive layout. English document, Vietnamese passage language metadata and font/glyph gate. |
| No account/backend/AI/agent | Requirements and project decisions. Capabilities are explicitly bounded; remote-outcome and agent chapters were not loaded. |
| Missing content/assets/fonts/stack/model | Requirements and project decisions; Motion, evidence, and remaining gates. Unknowns remain gates; no invented production inputs. |
| Mark markup, state, storage, conflicts, navigation, Save/autosave, deletion/undo, media as proposals | Requirements and project decisions plus their dedicated headings. Native markup/router, explicit commit with draft autosave, transactional revision/generation checks, bounded deletion/Undo, and text-only media scope are project proposals. |
| Bound optional recovery/export/import | Storage failures, deletion, and recovery. No general export/import facility; manual plain-text copying serves unsaved goal/note recovery, and reset requires a supported recovery boundary. |
| Self-contained implementation specification | Color and material contract through Provenance and reuse. Exact tokens, typography, geometry, fields, routes, ownership, states, transitions and source identities are embedded. |

## Inherited rules and project choices

Inherited from Layered `0.1.0-draft`: all 13 Light/Dark semantic pairs; six opaque surface roles; Plus Jakarta Sans family proposal and native fallbacks; body/metadata/detail/section type rules; spacing scale; 24px/12px/999px/28px geometry; optional modal shadow; 44px comfort targets; 3px focus with 3px offset; optional 160ms feedback; immediate state and focus changes. Layered's own numbers remain Atlas proposals rather than imported Material or Fluent tokens.

Pocket Practice choices: smaller 2rem application title, 16px phone inset, project-specific 48rem/64rem fit thresholds and 1200px cap; a week agenda instead of a dense calendar; concrete catalog/bookmark/history empties; local date semantics; proposed field limits; hash route/history contract; custom validation and dirty-close handling; explicit Save/Finish alongside durable draft autosave; atomic generation/revision checks; no automatic merge; manual conflict review; separate draft/history records; persistent one-operation plan Undo; retained completion history; confirmed browser reset and text-only media scope.

P0 state/recovery and forms/navigation are used as decision guidance. They do not implement these mechanisms. The knowledge index is the optional routing source; the repository skill and template were read unchanged. Neither uncertain outcomes nor Agent Experience applies to this local personal app. Links from the selected chapters into older examples were not followed; earlier example-specific contracts were not adopted as proof.

## Open implementation and product gates

- Supply real English/Vietnamese lesson content, immutable IDs, categories and catalog-change behavior.
- Confirm final schema, identifier generation, serialization, field limits, Unicode accounting, capacity thresholds and history growth rules across all write/draft paths.
- Confirm supported browsers, IndexedDB/native dialog/fallback behavior, durability hint and blocked-upgrade handling; implement candidate ordering and all transactional checks before using save-success copy.
- Confirm the routing stack, entry focus/scroll restoration, native close handling and full-page editor alternative.
- Choose actual font package and retained notice, then inspect Vietnamese glyphs/line boxes and fallback behavior.
- Confirm deletion scope, persistent Undo replacement semantics, and the separate recovery-reset boundary for unreadable or newer schemas. General import/export, account recovery, independent backup and storage-permission requests are outside the proposed initial scope.

## Evidence limits and reading summary

Performed work consists of selective source reading, document synthesis and artifact integrity checks. No UI, application, browser, keyboard, screen-reader, service, performance or conformance evidence was produced. Source palette arithmetic is referenced with its original opaque-pair boundary, without new calculations or rendered conclusions. Future validation scenarios are requirements, not results.

The reading path used the immutable brief; repository AGENTS; unchanged preparation skill; theme catalog; Layered and Botanical candidate READMEs; optional knowledge index; project template; one detailed package (Layered design, sources, motion and effects); only state/recovery and forms/navigation P0 chapters; and selected source ledger excerpts. Ledger cards selected: P0-STATE-01, P0-STATE-03, F01, F06, F13, F20 and F23. No web source, asset, installed global skill, other trial, prior example or application implementation was read.

The helper produced 17 displayed read records, including one failed 13-byte source-card excerpt that supplied no source metadata. The corrected source-card retry supplied the actual metadata. All reads after the initial candidate group ran sequentially.

Logging exception: four independent helper calls were initially dispatched concurrently. Layered and Botanical READMEs both reported order 5; shared-log writes collided. The index and template calls failed with a JSON parse error before content display. The log was repaired from the exact displayed candidate records, preserving helper-reported duplicate orders in recovery metadata and using reconstructed presentation order for continuation. This does not establish exact first-read sequencing or an unbroken contemporaneous log. The index/template were then read sequentially. The helper source-card selector's first retry returned only seven `#` lines; that actual excerpt remains logged, and the repaired-selector read is separate. `read-log.json` records both exceptions explicitly.

Artifact checks verify UTF-8 without BOM, LF line endings, one terminal newline, matching first-draft/design bytes, and the immutable brief hash. They do not test the proposed product behavior. No token, cost, runtime or usability measurement is inferred from byte counts.

## Independent review and one correction pass

The author mapping above describes the immutable first draft; it is not retroactively upgraded. Root read all first drafts and an independent reviewer checked this brief/document against the frozen protocol. The first-draft.md bytes remain unchanged. Current design.md includes the following narrow corrections, plus direct Atlas/theme/ledger source-record links and an explicit uncommitted-P0 input boundary. No new generation inputs were loaded by the author after freezing; these are root review edits.

| Finding | First-pass gap | Corrected rule |
| --- | --- | --- |
| CP01 (P2) | Create editor lacks stable target and update semantics after A succeeds while B remains dirty. | Reserve target identity per editor; bind post-create edits to that record and use Save changes, preserving original completion identity/date. |
| CP02 (P2) | Durable draft Discard does not retire queued autosaves or define failure. | Transactionally retire non-reused draft identity at completion; reject old autosaves, retain failure context and distinguish temporary-only discard. |
| CP03 (P2) | Plan removal and Undo lack focus targets. | If still in the affected context, focus next/previous/Week after remove and restored entry after Undo; failures retain trigger/context. |

First-pass scores and targeted-trace outcomes are recorded in the [combined results](../README.md). Source/schema/browser/service/font/translation gates remain open where applicable. No behavioral test result follows from these corrections. Reading records retain reconstructed concurrent groups and failed excerpts; exact first-read ordering is unavailable for those groups.
