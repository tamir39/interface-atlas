# Pocket Practice — independent consumer trial evaluation

The initial assessment below describes the first-pass artifact and its historical line numbers. The current design.md contains a reviewed revision; the appended review-history section records its corrections and remaining gates.

Evaluated artifact: design.md, first draft frozen 2026-10-15.
SHA256: 6dabdbd02517606d4b798b07830b934d914c18395c21765aff4d08015f4c3e0f.
Size: 18,678 UTF-8 bytes; 2,607 words using whitespace splitting.
Repository revision supplied by the parent: 782159e8e2510933c76989ff9fd9546d282c62cd.

This is a document-coverage evaluation, not an implementation acceptance result. Every behavioral result below means a proposed contract is present in the document. No working application, rendered preview, browser execution, assistive-technology run, storage experiment or production result exists in this trial.

## Frozen rubric: C01–C12

| Criterion | Local design evidence | Document coverage and gaps |
| --- | --- | --- |
| C01 Brief | “Requirements and project proposals”, line 5; whole brief.md | Covers independent learning, calm English UI with Vietnamese content, six task families, three appearances, reload durability and failures. Clearly identifies fictional input and absent stack/assets. Goal interpretation as sessions/week is explicitly proposed. No actual content or product approval exists. |
| C02 Selection | “Requirements and project proposals”, line 5 | Layered is selected using purposeful opaque planes and comfortable interaction hierarchy. Botanical and Play were compared through their READMEs. This is suitability reasoning, not user evidence or a measured ranking of nine themes. |
| C03 Self-contained visual rules | “Color contract”, line 13; “Typography, spacing and geometry”, line 39; “Pages and responsive behavior”, line 47 | All 13 semantic color roles, exact light/dark pairs, permitted foregrounds, action/selected/focus/error/disabled/pressed behavior, type sizes/weights/line heights, fallback family, spacing, radii, targets, shadow/backdrop, widths and breakpoints are stated locally. Independent arithmetic reproduces 14 reported contrast values. Alpha shadow/backdrop and actual control adjacency remain unverified. |
| C04 State ownership | “Practice flows and editing”, line 67; “Persistence, conflicts and recovery”, line 77 | Proposes authoritative IndexedDB snapshot, ephemeral drafts/search, revision-checked atomic writes, reload semantics, date-only planning and completion snapshots. Separates pending from committed success. Partial: snapshot field names are given, but the full machine schema, exact ID/title bounds and duplicate/merge rules for conflict reapplication still need a concrete implementation contract. |
| C05 Recovery | “Components, states and feedback”, line 57; “Persistence, conflicts and recovery”, line 77 | Defines dirty-edit confirmation, visible failed saves, retained draft, quota/blocked/malformed handling, visit-only mode, non-destructive unreadable state, retry and bounded import/export. Partial: 1MiB and record-count import limits are proposed without a matching long-term creation policy; growing data could eventually exceed its own recovery limits. That inconsistency must be resolved before implementation. |
| C06 Task paths | “Practice flows and editing”, line 67; “Components, states and feedback”, line 57 | Specifies browse/filter, bookmark toggles, dated weekly planning, required completion note, goal editing and actual completed-history review. Plan completion and standalone completion are distinguished. No completed fixtures/streaks are fabricated. Open: allowable completion dates, exact catalog topic taxonomy and final lesson content are not settled. |
| C07 Responsive/keyboard | “Pages and responsive behavior”, line 47; “Components, states and feedback”, line 57; “Accessibility, motion and validation”, line 95 | Gives phone-first order, 320px minimum, 600/960px adaptation, 224px navigation, 1280px maximum, text wrapping, no drag-only schedule, landmarks, native controls, modal/route fallback, focus return, error summary and forced-color focus. Rendering, text resizing, zoom, dialog fallback and screen-reader behavior remain tests to perform. |
| C08 Appearances/motion | “Color contract”, line 13; “Persistence, conflicts and recovery”, line 77; “Accessibility, motion and validation”, line 95 | Explicit Light/Dark/System choice, live OS tracking only in System, persisted validated choice and unsaved preview on failure. Retains 160ms optional color feedback; OS reduced motion removes it while state/focus remain immediate. Initial system-to-saved-theme flash and asynchronous appearance restore need rendered checks. |
| C09 Content/assets | “Requirements and project proposals”, line 5; “Typography, spacing and geometry”, line 39; “Pages and responsive behavior”, line 47; “Accessibility, motion and validation”, line 95 | English interface and lang=vi passages are specified without an invented language toggle. Named font is not assumed installed; actual glyph/fallback validation is required. Text-only media choice and one sample lesson title are explicit proposals. No image/font binary/content set was imported. Final curriculum, authored language metadata and font package remain missing inputs. |
| C10 Provenance | “Source credits and adaptation boundaries”, line 103 | Credits Atlas/Tamir/Codex, Google Material, Microsoft Fluent, Plus Jakarta Sans designer/commissioner/copyright holder, software/font pins and separate terms; Atlas publishing terms remain unresolved. Distinguishes retained Atlas values, inherited concepts and new trial contracts. Partial: WHATWG/W3C credits name recorded references but do not reproduce their direct URLs or complete document-specific term details. Material and Fluent software pin URLs are likewise not directly linked in the draft, though hashes/versions are present. Consulted sources.md has the full records. |
| C11 Validation honesty | Header; “Color contract”, line 13; “Accessibility, motion and validation”, line 95 | Explicitly unimplemented; arithmetic is separated from rendering and accessibility. Future checks enumerate storage, conflicts, appearances, content, keyboard and import behavior. No token/billing, web verification, measured usability or production guarantee is claimed. |
| C12 Selective loading | read-log.json; theme reasoning at line 5 | Exactly ten repository files loaded for content, with order, purpose, raw UTF-8 byte counts and SHA256. Three candidate READMEs, one selected detailed design/source/motion set, required skill/template; no other trial/example/global skill/web content. Knowledge directory names were listed, but neither knowledge file content was read. Logging caveat: first two files were read together before log initialization, then their exact bytes/hashes and original first-read order were recorded immediately; every subsequent content load appended its metadata before output. This is transparent but falls short of the strictest “log before every initial load” procedure. |

## Requirement-level trace

| Brief requirement | Precise local heading | Proposed evidence | Remaining gap |
| --- | --- | --- | --- |
| Calm, approachable personal practice | Requirements and project proposals; Typography, spacing and geometry | Layered reasoning, restrained color/geometry, ordinary short labels | No user feedback or brand/content voice approval |
| Browse/filter small text-first catalog | Pages and responsive behavior; Components, states and feedback | Labeled title/topic search, topic select, bookmark filter, count, stable order, clear filters | No final lesson set/taxonomy; accent-insensitive matching explicitly open |
| Bookmark lessons | Components, states and feedback; Practice flows and editing | Named aria-pressed button, attempted local commit, pending/failed states | No tested transaction/UI integration |
| Plan weekly practice | Practice flows and editing | Monday–Sunday local date range, lesson/date selection, uniqueness, navigation, confirmed plan removal | Scheduling rules are agent proposals; no reminders/calendar service implied |
| Finish practice with short note | Practice flows and editing | Required 1–500-code-point note, stable completion ID, atomic plan completion, duplicate-submit guard | Completion date eligibility and exact ID generation need final rules |
| Edit goal | Practice flows and editing | Explicit Save, proposed 1–7 sessions/week, actual completion count | Goal semantics are unconfirmed input |
| Revisit actual completed work | Practice flows and editing | Stored history and note detail, title snapshot, no seeded achievements, missing lesson fallback | Empty/loading/error distinction is documented, not executed |
| Reload survives when storage works | Persistence, conflicts and recovery | Validated authoritative snapshot; success only after completed transaction; preferences in same store | Actual storage support, durability, eviction and exception behavior untested |
| Blocked/full/malformed storage | Persistence, conflicts and recovery | Separate unavailable/read-error/failed-save states, retained drafts, explicit visit-only choice, no automatic reset | Exact schema and supported-browser behavior need validation |
| Useful fresh/empty lists | Components, states and feedback; Persistence, conflicts and recovery | Missing-record defaults; actionable empty completed, week and bookmark lists; no-match recovery | No rendered copy/layout review |
| No silently lost edits or false saved success | Components, states and feedback; Persistence, conflicts and recovery | Explicit Save, dirty discard, persistent visit warning, old authority on failure, conflict review | Browser exit protection is acknowledged as best effort; conflict reapply details incomplete |
| Light/Dark/System | Color contract; Persistence, conflicts and recovery | Full pairs, validated preference, live System, failed preference-save draft | No render or system-change test |
| Phone first and desktop usable | Pages and responsive behavior | 320px single column; content-driven wide nav; zoom and wrapping rules | No device/zoom run |
| Keyboard and reduced motion | Components, states and feedback; Accessibility, motion and validation | Native controls, skip link, focus/return/error rules; no motion-dependent behavior | No keyboard/AT/reduced-motion execution |
| English UI with Vietnamese lessons | Typography, spacing and geometry; Accessibility, motion and validation | English page language, passage metadata, exact glyph specimen, no translation control | No actual font or authored Vietnamese lesson |
| No account/sync/backend/AI controls | Requirements and project proposals; Persistence, conflicts and recovery | Local-only state contract and explicit scope | None at document level; no implementation exists |

## Atlas-provided material versus agent additions

**Atlas supplied:** selective-reading workflow and template prompts; nine-entry discovery metadata; candidate fit/limitations; selected palette and permitted pairs; named family and fallback concept; spacing/shape/targets/focus; opaque plane hierarchy; optional timing; native-control/dialog/error-summary patterns; source/creator/license evidence and validation boundaries. These are mostly Atlas proposals informed by conceptual references, not upstream Material/Fluent numerical tokens.

**This agent supplied as explicit project proposals:** Pocket Practice information architecture, topic/bookmark filters, weekly dates, completion notes/history, sessions/week goal interpretation, smaller application headings, project breakpoints/max width, IDB snapshot ownership, revision conflict detection, save acknowledgement, draft retention, visit-only mode, import/export limits and copy. The full working persistence behavior was not supplied by a theme and has not been verified merely by writing this document.

**Unknown inputs rather than Atlas defects:** actual lessons, topic set, brand/logo, font binaries, stack, browser support baseline, acceptable history size and product decisions about goals/dates/deletion. The draft intentionally does not pretend these exist.

## Knowledge that was needed or remains missing

The brief needs a storage/recovery decision. The required skill explicitly prompts ownership, persistence and recovery, and Layered warns that its preview's workspace changes reset. That is enough to expose the design problem, not to furnish an established durability recipe. This trial used agent reasoning to propose IndexedDB transactions and revision comparison. No external API/support research was permitted, so those proposals need authoritative platform review during implementation.

A directory listing showed knowledge/README.md and knowledge/agent-experience.md; neither was loaded. Agent-experience guidance does not match this product, and no missing agent authority contract should be invented. Optional effects, framework adapters and old examples were unnecessary.

A useful future Atlas addition would be a short optional framework-independent local-state worksheet: distinguish read failure from empty data, draft versus durable state, transaction acknowledgement, blocked/quota errors, cross-tab conflict policy, schema migration, and symmetric export/import limits. It should present questions and bounded patterns, not silently select a stack or claim that one browser API solves every product. This is a roadmap suggestion from one trial, not proof that the whole library lacks adequate general guidance.

## Performed evidence and unvalidated behavior

Performed independently: re-computed opaque sRGB contrast for six foreground roles across six backgrounds in both appearances, plus both primary-action pairs. Results exactly match the design's rounded values:

| Pair | Light | Dark |
| --- | --- | --- |
| Ink minimum | 11.31 | 8.33 |
| Muted minimum | 5.65 | 5.67 |
| Primary text minimum | 6.23 | 5.85 |
| Border minimum | 3.95 | 3.80 |
| Focus minimum | 6.43 | 5.59 |
| Error minimum | 6.01 | 5.61 |
| Primary action | 7.82 | 7.95 |

Also performed: document word count, frozen SHA256, heading-level trace and exact source-read logging. No source preview or source validation report was loaded, so no borrowed browser result is represented as this trial's evidence.

Not validated here: any complete task, actual persisted state, IDB exception handling, cross-tab race behavior, import/export symmetry, accessible modal/route fallback, focus clipping, rendered color/composited backdrop, intended font/Vietnamese glyphs, screen-reader announcements, narrow/zoomed layout, loading performance or usability. These must remain future implementation checks. The first draft is intentionally frozen so the parent can independently score the same artifact before corrections.

## Reviewed revision — 2026-10-15

The parent independently reviewed the full frozen first draft and retained originals plus hashes in first-drafts/. The assessment above remains the historical first-pass record, including its findings and logging exception; it has not been rewritten to claim that the first draft already met the revisions below.

Current reviewed design.md:
- SHA256: e03c8960266b6d2778142871f35862a51e1652a9e5722fb3dbd61c8768eabafa.
- UTF-8 bytes: 21,165.
- Words: 2,883 by the same whitespace-splitting method.
- First-draft SHA256 remains 6dabdbd02517606d4b798b07830b934d914c18395c21765aff4d08015f4c3e0f.
- Initial evaluation SHA256 before this appended review record: 5cb81de9c7e0cbc9232a116a2bbd17cffd419adf69745f7d65452a4e7e7fbf3a.

| Reviewed finding | Current local heading | Revision and residual boundary |
| --- | --- | --- |
| Bookmark pending/failure focus | Practice flows and editing, line 67 | Pending button stays focusable using guarded aria-disabled; repeated pointer/keyboard actions are ignored. Failure retains previous pressed state/control focus. Retry is inline and in normal tab order; failure does not focus a background action. This is a design contract, not a demonstrated browser result. |
| Dirty discard clarity | Components, states and feedback, line 57 | One named dialog contains an inline discard-confirmation state; no second dialog. Draft fields become temporarily inactive. Keep editing receives focus; it or Escape restores fields and last editable focus; Discard closes and returns to opener. Clean Cancel/Escape closes directly. Actual modality, focus and route fallback still need testing. |
| Complete date eligibility | Practice flows and editing, line 67; Persistence, conflicts and recovery, line 77 | Completion date must be a valid Gregorian civil date, with month/leap-day validation, no later than local today. Earlier dates log practice already done. Future dates remain plans and never become completions automatically. No calendar implementation is claimed. |
| Text preferences | Typography, spacing and geometry, line 39 | Text sizes now use rem with unitless line heights, reference equivalents at 16px, and root 100% to preserve user/browser preferences. Reflow, zoom and actual font rendering are still future checks. |
| Recovery capacity asymmetry | Persistence, conflicts and recovery, line 77 | Removed the arbitrary recovery-only 1MiB/200/500/1,000 limits. No byte/record/ID/title capacity budgets are adopted. Creation, updates, visit-mode mutations and import/export are explicitly gated until one bounded schema/serialization/capacity policy is agreed and tested. It must make every created valid state exportable/importable under the same envelope, including replacement metadata. Capacity failure retains saved state and draft; no silent eviction. Goal/note UX constraints do not pretend to constitute a complete storage policy. Exact schema, capacity and conflict reapplication remain open implementation gates. |
| Original source URLs/terms | Source credits and adaptation boundaries, line 103 | Added the pinned Atlas source record, direct original WHATWG dialog/APG modal/WAI forms-notification URLs, linked Material/Fluent software pins, and WHATWG CC BY 4.0/BSD 3-Clause versus document-specific W3C terms boundaries. These are recorded evidence from already-read sources, not newly verified web results or blanket permission. |

Read-log scope is unchanged: it records the original generation footprint only. Its source-read entries are unchanged; repository text normalization adds a terminal newline, and the normalized read-log SHA256 is 96e90da0c51279557d13631803459b7f212675755917add741d829b9bf963263. No new repository content was read during review; only this trial's own staged artifacts were inspected. No original URL was opened, and no outside source was consulted. The revision does not add token/billing claims.

Review checks performed: exact-passage replacement checks, requested-contract text inspection, word/byte counts and artifact hashes. The unchanged color table continues to use the previously performed opaque arithmetic; no repeat calculation was needed. No rendering, implementation, keyboard/assistive-technology, IndexedDB behavior, capacity-envelope or cross-tab conflict test was performed. The original warning that prose alone cannot establish working storage remains in force.
