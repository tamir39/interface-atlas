# Studio Request design

> Reviewed example: prepared with the final updated preparation entry, then explicitly reviewed and corrected at document level on 2026-10-17. The original first draft is retained; no runtime, service, accessibility or usability result is implied.

Status: proposed design, 2026-10-17; no interface or service implemented or validated. Theme: Botanical `0.1.0-draft`. This document is the implementation handoff; Atlas need not be reopened for routine implementation.

## Requirements, evidence, and capability boundary

The supplied fictional brief describes visitors requesting a consultation or workshop from a small community studio, in English or Vietnamese. The essential task is choose service, enter contact details and preferences, review, correct, and send one request. Workshop adds group size. Keyboard, phone and desktop use, Light/Dark/System, reduced motion, step navigation, browser history, language changes, and leaving unfinished work are required.

Only the brief and frozen Atlas text were inspected. There is no observed user behavior, existing interface, final schema, translation pack, brand asset, font binary, implementation stack, service, account/session model, or retention policy. Every field constraint, layout threshold, label translation, and interaction below is a **project proposal** unless marked retained theme rule. Do not interpret these proposals as studio eligibility rules.

Use a full-page flow. Introduce no accounts, payments, booking calendar, enrollment, marketing subscription, or agent features. A request is an expression of interest: retaining answers is not remote receipt; remote receipt is not a completed consultation, confirmed appointment, or workshop place. Real sending remains unavailable until the service and privacy gates below pass. A document exercise must not simulate successful submission.

The studio product owner must approve requested data, bounds, service descriptions, privacy/retention notice, and the meaning of acceptance. A bilingual content owner must approve complete language packs. Engineering must identify the actual service owner and verified contract before enabling any effect. These are delivery inputs, not extra confirmation steps for visitors.

## Task structure and theme rationale

Use four named destinations: **Service → Contact → Preferences → Review**. Workshop group size belongs within Preferences, so both branches retain four destinations. The progress text is “Step 2 of 4: Contact,” with the current destination programmatically identified. Future steps are plain text; completed reachable steps are links. An optional preference does not make its destination disappear.

On Service, describe the two offerings in short owner-supplied sentences, explain that the form requests contact rather than booking, and disclose the open-form retention limit before entry. The first heading and service decision lead; decoration never competes with them. Review groups Service, Contact, Preferences, and workshop Group size in that order; optional empty preferences read “Not provided.”

Three candidate READMEs were compared. Botanical provides warm paper, green actions, comfortable spacing and a creative-studio fit; it is selected. Layered supports editing clearly but its multiple application planes are unnecessary for one linear request. Play suits community onboarding but its hard offset shadows and colorful panels are more expressive than this restrained brief. These are design judgments, not usability results.

Retain Botanical's palette, alternating panel corners, comfortable rhythm and source focus dimensions. Adapt its typography to a consistent sans-serif task interface until Vietnamese font coverage is verified; omit display hero, artwork, cursor effects, animation and decorative elevation. The hypothesis is that a calm single column makes correction and review easier to follow. Test whether visitors understand request versus booking and whether service changes preserve their orientation.

## Color contract

Retained source tokens below come from Botanical; necessary border and semantic foregrounds are Atlas proposals retained here. Use opaque colors only.

| Semantic role | Light | Dark | Use |
| --- | --- | --- | --- |
| Page | `#f6f5ed` | `#101d17` | Page base |
| Surface | `#e5eadc` | `#23392c` | Progress/support grouping |
| Panel | `#ffffff` | `#192b21` | Form and review surface |
| Ink | `#293d2f` | `#f3edda` | Headings, values, labels |
| Muted | `#596550` | `#b7c9b6` | Hints on page/surface/panel |
| Accent/action | `#386046` | `#abd0a1` | Primary action fill |
| Action hover | `#294a34` | `#c6e0be` | Hover fill |
| On action | `#ffffff` | `#14291a` | Primary label |
| Necessary border | `#69795f` | `#8aab89` | Inputs and outlined controls |
| Decorative divider | `#bbc7af` | `#425d48` | Nonessential separators only |
| Selected surface | `#c7d6b9` | `#425d43` | Selected service summary |
| Success / on success | `#346348` / `#ffffff` | `#afd4bc` / `#14251a` | Authoritatively accepted receipt only |
| Note / on note | `#e8e0ba` / `#3f452d` | `#d7cd9c` / `#30321d` | Retention/capability notice |
| Warning foreground | `#72530a` | `#e4ca85` | Delayed or unconfirmed status |
| Danger foreground | `#943743` | `#f0b0b5` | Errors/rejection |
| Information foreground | `#2d5871` | `#abcbd8` | Informational status |

Ink, muted and semantic foregrounds may sit on page, surface or panel; semantic foregrounds are not button fills. Primary action uses only action/on-action pairs. Secondary actions use panel, ink and necessary border. Prose links remain underlined. Selected surfaces use **ink for every label, hint, marker and underlined link**, plus persistent “Selected” text and the checked native radio. Do not put muted text, dark accent text or the normal dark control border on selected surfaces; use a panel control area where a boundary is necessary.

Atlas's existing opaque calculations report minimum ink 9.23:1 light/10.20:1 dark, muted 4.89:1/6.85:1 and necessary border 3.70:1/4.70:1 over its six named neutrals/tints. Action labels are 7.17:1/9.01:1; ink on selected is 7.63:1/6.23:1. Muted on selected fails 4.5:1 in both modes; the dark necessary border there is 2.87:1. These are inherited calculations, not measurements performed on this project. Target 4.5:1 ordinary text and 3:1 meaningful controls/focus boundaries; verify actual adjacent colors and all rendered states.

## Typography, layout, and appearance

Propose `Manrope, system-ui, sans-serif` for all task text: body/control 16px/1.65 and 16px/1.5 respectively; labels and hints 14px/1.5; section headings 24px/1.3 at weight 600; page heading 32px/1.2 at 600. Use normal tracking and weight 400 for body, 600 for labels/actions. Text entry never falls below 16px. Do not uppercase labels or truncate questions, names, errors or review values. Manrope is a named theme role, not an installed asset. Until a licensed, verified package exists, the system fallback is the delivery font. Test Vietnamese diacritics, combining marks, weights, wrapping and line clipping. DM Serif Display and JetBrains Mono are unused.

Retain spacing steps 4, 8, 12, 16, 24, 32 and 48px: label/control gap 8px, related controls 12px, field groups 24px, section separation 32px. Form width is at most 640px; prose measure at most 65ch. Center the single column on desktop. Page gutters are 24px, reduced to 16px below 360px; panel inset is 24px, reduced to 16px below 480px. These thresholds are provisional content-fit decisions. Keep the same content order at all widths.

Retain panel corners `32px 8px 32px 8px` and action corners `22px 6px 22px 6px`; choose the theme's proposed 12px radius for text entries. Do not nest cards or use shadows. Controls have a 44px minimum target in both axes where applicable, with wrapping labels and separated targets. This is a project usability target.

**Retained focus indicator:** Visible keyboard focus uses a 3px Ink outline with 5px offset: #293d2f in Light and #f3edda in Dark. In forced colors use system Highlight. Apply it to links, native form controls, language/appearance selectors and guarded unavailable actions; prevent clipping by panels, scrolling ancestors or adjacent content. Programmatic focus destinations must remain visibly identifiable. Verify the actual outline against every adjacent surface, including selected-service tints; this is a concrete retained proposal, not rendered evidence.

Header order: plain studio text identity, language control, appearance control; allow controls to wrap into separate rows. Main order: page heading, purpose/retention notice, progress, step heading, hints/fields, persistent errors/status, Back and primary action. On narrow screens stack actions at full width in the same DOM order. Use normal document flow, no sticky footer, horizontal page scrolling or fixed-height field panels. Review labels and values stack; long emails and free text wrap without ellipsis. At 320 CSS px, 200% text resize and 400% zoom, retain every control and relationship; the onscreen keyboard must not obscure focused fields or recovery actions.

Light/Dark/System is an explicitly labeled native select. Default System follows live operating-system changes; explicit Light/Dark overrides them. Appearance and language choices live in current-page memory in this baseline; do not promise persistence across reload. If preference initialization fails, render usable System defaults. No essential information uses motion. All transitions and feedback are immediate; reduced-motion users receive identical information. No animation dependency or optional effects are selected.

## Proposed input and validation contract

All fields have persistent visible labels, required/optional text and associated hints. Use native fieldsets/legends for service radios and native inputs elsewhere. Placeholders are examples only. Proposed data is intentionally minimal:

| Field | Proposal | Validation |
| --- | --- | --- |
| Service | Required radio: Consultation or Workshop; initially none | One recognized service |
| Name | Required text; `autocomplete=name` | 1–120 user-perceived characters after outer-space trim; accept Vietnamese and other scripts |
| Email | Required email input; `autocomplete=email`, no autocapitalization | Reasonable email syntax, maximum 254 characters; no claim of deliverability |
| Preferences | Optional textarea | Maximum 2,000 user-perceived characters; explain not to include sensitive information |
| Group size | Workshop only, required native integer quantity input | Proposed 1–30, no decimals; studio must approve bounds before launch |

Do not demand a phone number or format a name as Western first/last fields. Preserve raw entered values during editing. Review displays the submitted candidate with outer whitespace removed from name/email only; disclose that trimming, preserve internal name spacing and all free text. Character counting must handle grapheme clusters. Never translate or silently normalize free-text answers. The service owner must approve matching server rules, including international email handling; provisional bounds cannot become invented eligibility.

Choose custom validation feedback as the single focus owner. On the implemented form, suppress native interactive validation (`novalidate`) while retaining input types, required/min/max semantics and server-side checks. The same validation coordinator handles Continue, Enter/implicit submission and any scripted invocation. A textarea Enter inserts a newline. Only the explicit final review action can dispatch remotely. Validate active step fields on Continue, every active field on final Send; Back does not validate. Do not flag untouched incomplete fields while typing. After an error, recheck that field on meaningful input/blur and remove corrected error text, invalid state and obsolete summary links.

A failed attempt keeps all values and focuses a visible error summary with a descriptive heading and links to exact fields or the first service radio. Summary and inline wording match, e.g. “Enter your email address.” Associate hints/errors with controls; use invalid state only for actual field errors. Focus the summary without a competing live announcement. Correct errors without moving focus. Connection, storage, unavailable translation, and unknown outcome failures belong in persistent status regions, never on a valid field.

## Draft ownership, branches, and navigation

The visitor owns the unsubmitted intention. One in-memory draft owns raw values, draft version, active service, inactive branch values and validation state. Navigation owns destination, review-return context, focus and scroll; language/appearance are separate presentation state. The future service alone owns acceptance. Every input updates the draft immediately; Continue is local navigation, not save or remote acknowledgement. No browser storage contains contact details in this baseline. Separate tabs have independent drafts, with no synchronization claim.

A service radio change does not navigate. Its hint explains that Workshop adds group size. On Continue, recompute the active field set and dependent validity. Switching to Consultation retains group size only as inactive in-memory work; exclude it from required checks, review and outgoing payload. Say “Group size is not included for Consultation.” Returning to Workshop restores the value visibly, asks the visitor to check it, and revalidates it. Hidden inactive controls must not become unreachable validation blockers or be serialized. The final candidate is built from an explicit active-field whitelist.

Forward navigation validates its prerequisites, records the destination once in browser history and focuses the new step heading at the top. Back goes to the previous visited logical destination, retaining draft values and restoring its last focus/scroll where still meaningful. Completed-step links do likewise. URLs/history may contain step names and a non-sensitive return marker, never answers or email. History entries restore navigation, not old answer snapshots; latest draft values remain authoritative.

Browser Back/Forward traverses real entries without duplicate pushes or history trapping. Restore recorded focus/scroll within the active draft; if a target disappeared, focus the step heading. An unreachable forward/deep-link destination returns to the earliest incomplete step using replacement navigation and explains why. A link opened without the in-memory draft begins at Service with “Your earlier answers are not available in this page.” Traversal never submits or resurrects an old branch payload.

Review provides separately named links such as “Change email.” Each opens the prefilled appropriate step with `return=review` and the originating section recorded. Valid changes use “Return to review,” returning focus/scroll to that section's heading with a brief changed-status message. If service changes introduce a missing group size, route through Preferences before Review. Back from an editor may return without validation; Review then shows the current values and “Needs correction” where incomplete, with Send unavailable until corrected. Do not silently undo an edit or imply the earlier review still authorizes changed values. Final validation always rebuilds the current candidate.

Dirty means any entered draft content exists without remote acceptance. Internal navigation preserving memory needs no leave warning. An explicit “Leave request” leads to an inline full-page decision: “Keep editing” or “Discard answers and leave”; keep editing restores the trigger, discard clears the draft and inactive values before exit. No Save/resume action is offered. Explain that reload, tab closure and leaving the document can lose answers. A native unload prompt may be attached only while loss is possible, but browser wording and interception are not guaranteed, especially on mobile. After actual loss, offer Start again without claiming recovery.

## Language delivery and switching

English and Vietnamese are both left-to-right. The bilingual content owner must deliver versioned complete packs for headings, instructions, service text, validation, progress, review labels, status, leave decisions, accessible names and any service error-code mapping. Example proposals are “Continue / Tiếp tục,” “Review answers / Kiểm tra câu trả lời,” and “Send request / Gửi yêu cầu”; fluent review remains required. The release gate is complete, reviewed packs in both languages, not automatic translation or mixed-language fallback.

Use a native “Language / Ngôn ngữ” select with English and Tiếng Việt. Keep current values, branch, errors by stable field/error identifiers, return context, outcome identity and focus when switching. A complete already-loaded pack switches atomically and updates document title and `lang=en` or `lang=vi`; derived labels/statuses rerender in that language. Do not add a new history step or validate solely for language change. Keep focus on the language control and announce completion once politely.

**Latest language request:** Track committed interface language, latest requested language and a non-reused local request generation separately. Every new choice retires earlier switch requests. Only the still-current generation may commit a complete pack, change the selected value/title/document language, replace pending/error feedback or announce completion. While loading, retain the committed interface and expose the requested language plus pending status at the selector. Choosing the already committed language retires pending switches, clears their feedback and keeps that interface without waiting for a loader. A failure of the current request restores the committed selection and offers a retry for that choice; a later new choice retires that retry context too. Obsolete success may populate a pack cache but cannot change the interface or announce completion; obsolete failure produces no error or retry. Answers, validation identifiers, branch and editing/return context remain untouched.

If a selected pack is loading, keep the current interface and show a pending language status. If unavailable or incomplete, retain the current language/selection and explain the failure there with a retry for loading that pack only. Never display untranslated keys or erase answers. Do not assume the presence of a pack from this document. Free-text answers retain their original characters and language; switching changes only interface copy. Do not guess their language or apply an incorrect language tag. Any future translation of answers would require a separate product decision.

## Submission evidence and external contract gates

Until the contract is supplied, Review shows “Sending is not available yet” with a focusable unavailable Send action and a nearby explanation. Reading, correction and leaving remain available. No endpoint, operator address, support channel, reservation, authentication requirement or artificial success is invented.

Before enabling Send, the service owner and engineering owner must supply a versioned, tested contract for: accepted payload and privacy/retention policy; actor scope without assuming accounts; action identity and attempt correlation; service-enforced duplicate protection including concurrency, key scope/expiry and changed-payload behavior; authoritative receipt/rejection and partial-effect evidence; status lookup, access and consistency/missing-record meanings; observation cadence/server delays; retry eligibility/limits; and a real reconciliation route. Cancellation is unsupported until independently specified. State each owner and actual evidence in the implementation record.

Reload-safe recovery additionally requires an approved minimal attempt record or authorized independent discovery route, its lifetime, privacy/deletion rules, and acknowledged retention **before dispatch**. Record action ID, candidate fingerprint/version and issued operation mapping without unnecessary contact payload. If identity retention fails or its later mapping cannot be stored and no independent recovery exists, block dispatch or further recovery claims; retain the editable draft and explain the limitation. Local retention never proves delivery. Durable draft save/resume is a separate future gate covering storage acknowledgement, quota/failure, expiry, discovery and data deletion; it is absent here.

Once enabled, final activation snapshots the reviewed active candidate and freezes editing for that action. Record one stable action identity; transport retries of identical intent retain it and get separate attempt identities. Guard button, pointer, keyboard, implicit and programmatic entry points. Keep Send focusable with guarded `aria-disabled` while pending; dimensions remain stable. Review remains readable and presentation controls usable. Back may show read-only submitted answers while unresolved. Changing screens or stopping local observation cannot cancel the request.

Show “Sending request…” only while awaiting a matching response. After a proposed 15-second local wait threshold, replace indefinite activity with “We could not confirm whether your request was received”; elapsed time proves no rejection. Preserve the action reference and last observation time. Pending/unknown does not enable a new overlapping request. Reconciliation must establish the original outcome before a new or changed intent can be submitted; a new key cannot prevent both actions taking effect.

Only authoritative matching evidence may show receipt, using “Request received” and the real reference if issued, followed by “This does not confirm an appointment or workshop place.” A rejection states its actual scope and correction, retaining answers. A lost response remains **unknown**, distinct from a known pre-dispatch connection failure. A failed status lookup leaves prior receipt evidence intact. Check status appears only with a verified lookup; automatic retries remain off until documented safe semantics, protection retention, payload equality, pacing and limits are verified. Without lookup or a real reconciliation route, state the outcome cannot be confirmed and keep repeat Send unavailable. Never invent contact support.

A delayed response must match the original action/candidate and obey service ordering; it cannot clear later draft work or regress confirmed evidence. Leaving while pending/unknown warns that the effect may continue and states exactly which recovery identity can survive; the baseline promises none. Do not label leaving “Cancel request.”

**Ordering contract clarification:** Before enabling Send, the service owner must define authoritative observation ordering/revision semantics or explicitly state their absence. Match immutable action/candidate first; response arrival and client clocks do not establish freshness. Preserve confirmed receipt/reference and action history; provably older evidence cannot replace them. If matching authoritative observations contradict without reliable order, retain both with provenance, display **Conflicting request information — reconciliation required**, and keep repeat effects unavailable until a supported authoritative reconciliation resolves the conflict. This makes the existing gated dependency concrete without asserting service monotonicity or a new endpoint.

## Validation and open inputs

Performed: selective frozen-source reading, candidate comparison, metadata-only source identification, and a document walkthrough reconciling branches, review, history, language and acknowledgement boundaries. The inherited contrast record was read, not recalculated. No rendered, keyboard, screen-reader, real-device, service, storage, translation, font or user test was performed. No conformance or production-readiness verdict is asserted.

Before release, verify both service branches; invalid Continue and implicit Enter; error-summary links and correction; service changes in both directions; review change return; browser Back/Forward and deep entry; leave/reload/tab closure; language switch with errors and failed pack loading; all appearances and forced colors; 320px reflow, zoom, long Vietnamese content and keyboard visibility; and actual font glyphs. Use keyboard and representative screen-reader/browser combinations on the implemented task. The owner must choose supported browsers/devices and assistive-technology coverage.

Service tests must inject pre-dispatch failure, dropped replies, late/mismatched evidence, duplicate activation, expired protection, missing status, unavailable lookup, identity-storage failure and reload during uncertainty. Observe intended English/Vietnamese visitors attempting correction, branch changes and interpretation of unconfirmed status; record sample/context limits, not invented completion rates. Still open: service details, approved schema/bounds, privacy/retention, complete translations, actual fonts/assets, implementation environment and every external contract above.

Additional required implementation traces: request Vietnamese then return to English before load completion; reject stale success and stale failure; verify all keyboard/forced-colors focus indicators and clipping; reconcile unordered receipt evidence without repeating an effect. These checks have not run.

## Source credits, adaptations, and frozen identity

Atlas was used as a frozen working snapshot on 2026-10-17; its current HEAD was not inspected and is not claimed to contain the updated preparation or knowledge content. Relevant raw SHA256 identities are recorded below; the adjacent helper-owned `read-events.jsonl` records exact selected reads. The original brief remains the governing input.

Botanical creator: **Tamir (Phi Vuong Tuong Tam)**, [portfolio](https://github.com/tamir39/tamir39-portfolio), pinned `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`, theme `0.1.0-draft`, source review 2026-10-13. Retained palette/corners/focus derive from `app/themes.css`, `app/appearance.css` and `app/globals.css`; typography roles from `app/layout.tsx`. Atlas portable sizes, necessary borders and semantic pairs are proposals. This project adds field/flow/retention/language decisions and uses no source implementation, branding, artwork or font software. No portfolio implementation license was found; Atlas publishing terms remain undecided. Links confer no copying permission. Manrope is by **Mikhail Sharanda**, with [SIL OFL 1.1 package notices](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt); any future font import must pin a package and carry its exact notices after glyph verification.

General UX and focused accessibility methods credit **Ghaida Zahran**, [Journey/Evaluate](https://github.com/ghaida/intent/tree/3fc38dff381ce0e4dec8f52c97c3e37abd95e10e), commit `3fc38dff381ce0e4dec8f52c97c3e37abd95e10e`, CC0; **Jakub Krehel**, [better-* methods](https://github.com/jakubkrehel/skills/tree/4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63), commit `4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63`, copyright 2026 Jakub Krehel, MIT; and **Julien Thibeaut / ibelick**, [create-design-md, improve-ui and fixing-accessibility](https://github.com/ibelick/ui-skills/tree/f18d13077d6e3841821ea0a36526c0fd44a570b5), commit `f18d13077d6e3841821ea0a36526c0fd44a570b5`, copyright 2026 Julien Thibeaut, MIT. Used methods are task framing, journeys/re-entry, hierarchy/writing, native semantics and evidence limits, not complete upstream audits. Retain MIT copyright/permission notices with copied or substantial covered adaptations: `references/licenses/jakub-krehel-MIT.txt` and `references/licenses/julien-thibeaut-MIT.txt` in Atlas; Ghaida's dedication is `references/licenses/ghaida-intent-CC0.txt`. No upstream skill implementation or license text was copied into this document.

P0 chapters reference W3C WAI/WCAG 2.2 and APG contributors for forms/focus/status, [GOV.UK Design System](https://design-system.service.gov.uk/patterns/check-answers/) contributors for check answers, [WHATWG HTML](https://html.spec.whatwg.org/) contributors for validation/history, and [Storage](https://storage.spec.whatwg.org/) contributors for retention boundaries. Remote-outcome concepts reference [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110), edited by Roy T. Fielding, Mark Nottingham and Julian Reschke, and [Fetch](https://fetch.spec.whatwg.org/), Anne van Kesteren/WHATWG. These standards and guidance are references with distinct terms, not software import licenses or endorsers. The project policies above are Atlas-informed proposals; no external code/prose/assets were copied.

| Frozen dependency | Raw SHA256 |
| --- | --- |
| Preparation skill | `d5528477be4f87ee4d66591e95176423d95bf2e0427d229e82dffb1b726b7d40` |
| Botanical design | `57bb978940f0c2c98532603e40eb0207045672af715b09fdc59e9c5ef11b7f32` |
| Botanical sources | `7e83b712a5e8803d673df95d85fab997f602c8906c76c4ac9691f12ccce193a2` |
| General UI/UX | `ef7048339a733068b3f2241ddcacce7cc682cb65c748f723000465fc883f5152` |
| Accessibility/responsive | `fcde6775c47577cc3626e38cf1512755fd56b92ca6cb1312990ca92562da266d` |
| State/recovery | `ddd338c88cb26e5001c6209e91d4d3b53089912ac2bee68a9c3a95ba5eda7c51` |
| Forms/navigation | `870844c51547c2083a5b33d97048c7fdae1bdd7850a214ae375bdc3940e93b5b` |
| Uncertain outcomes | `7977ea92734b0457dee69f041b22f88061970c83070fb85976a56e119736cb10` |
| Adaptation notices | `02a8801225a921eab3cb081b933df803de06118ec6c38b78fdd01968b364e1fd` |
