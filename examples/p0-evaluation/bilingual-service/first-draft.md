# Community studio service request design

Status: first proposal, 2026-10-15; document exercise only. Theme: Layered 0.1.0-draft, research record atlas-layered-research-2026-10-15. Repository base: 782159e8e2510933c76989ff9fd9546d282c62cd. No interface or service exists as evidence here.

## 1. Scope, theme choice and decision labels

The visitor chooses consultation or workshop, supplies contact details and preferences, reviews and changes answers, then explicitly submits one request. Request receipt, a retained draft and a completed appointment/workshop are separate facts. The brief establishes English/Vietnamese, keyboard access, phone-first reflow, Light/Dark/System, reduced motion, branch-aware review, history and unsaved-exit handling.

Compared candidate READMEs: Botanical's warm serif narrative fits a community studio but requires more adaptation around repeated form work; Editorial offers calm boutique-service presentation but foregrounds publication rhythm; Layered provides comfortable controls, readable opaque planes and stable working context. Select Layered. Retain its palette, control geometry and restrained feedback; replace its sample project workspace/modal with a full-page service flow. No sample fixtures or preview behavior become service features.

“Inherited” below means a selected Atlas proposal, not a standard requirement. All service fields, limits, routes, state policies and component adaptations are **project proposals**, requiring the named gates before release. There are no accounts, payments, calendar, enrollment, subscriptions or agent controls.

## 2. Color and appearance contract

Inherit these exact opaque Layered roles:

| Role | Light | Dark | Project placement |
| --- | --- | --- | --- |
| Page | #EAF2F1 | #101C1C | Page canvas |
| Low | #DFEBE9 | #172626 | Step navigation |
| Surface | #F7FBFA | #1E3030 | Main working panel |
| Raised | #FFFFFF | #273C3B | Editable fields |
| Tint | #D5EAE5 | #294C46 | Current step and selected choice |
| Secondary | #F2E6DA | #43372E | Retention/outcome explanation |
| Ink | #172F2C | #E7F3EF | Primary text and selection marker |
| Muted | #405E58 | #B4CEC5 | Hints and supporting text |
| Primary | #185C50 | #A2D6C5 | Main action and underlined links |
| On primary | #FFFFFF | #12382E | Primary action text only |
| Border | #58766E | #8AABA1 | Necessary control boundaries |
| Focus | #6D3B83 | #E7B6F4 | Focus outline |
| Error | #972F3A | #FFB3BE | Invalid boundary and text |

Ink, Muted, Primary, Border, Focus and Error may appear on the six named background roles; use Ink on Tint and On primary only on Primary. Use full opacity for meaningful text/boundaries. Pending, received and unconfirmed outcomes use explicit text with Ink, never invented status colors. Planes group content; Border identifies controls.

System is default and follows live OS changes. Light/Dark override it through a labeled native selector; changing appearance preserves answers, errors, language and location. Baseline preferences live in page memory; no cross-visit persistence is promised. Any future preference-storage failure leaves a usable current choice. Use system Highlight for focus and visible system boundaries in forced colors.

## 3. Type, geometry, layout and motion

Inherit Plus Jakarta Sans normal 400/500/600/700 with “Segoe UI”, Arial, sans-serif fallback. Actual font packaging is unresolved. Project heading adaptation: h1 2rem/1.25, weight 600, normal tracking, replacing the theme's large display scale; h2 1.75rem/1.25/600; review group headings 1.25rem/1.35/600; body 1rem/1.6/400; labels/hints 0.875rem/1.5/500; controls at least 1rem/1.5, action weight 600. Keep prose within 65ch. No essential clipping, uppercase transformation or hover-only text.

Retain spacing 4/8/12/16/24/32/48/64/96px; label-to-field 8px, related controls 16px, groups 32px. Inherit 24px panel radius, 12px field/button radius, and 999px current-step capsule only for short labels. Panel padding is 24px, reduced to 16px below 480px. Controls have 44px minimum height and target width; textarea minimum 144px, vertically resizable. Radio labels offer the full target. Focus is immediate 3px solid Focus with 3px offset; reserve clearance to avoid clipping.

Project shell maximum is 944px including 24px side gutters. At widths of at least 960px, use a 224px step plane, 32px gap and up-to-640px form column. Below 960px, put steps before the single form column; below 480px gutters are 16px. Wrap navigation, names, bilingual labels and actions; final action is full width on narrow phones. At 320 CSS px and high zoom, no horizontal page scrolling, fixed-height cards or sticky action bar may hide content/focus.

DOM order: skip link, studio text identity, language/appearance controls, progress navigation, main heading/instructions, form or review, Back/Continue actions, retention note. One h1 identifies the current view; titles include that step and language. Use text identity; no brand artwork is supplied.

Select opaque tonal grouping only: no resting shadows, modal, glass or decoration. Inherit optional 160ms color/background/border transitions with cubic-bezier(.2,0,0,1). Focus, errors, route changes and outcomes remain immediate. OS reduced motion removes transitions; no animation is required to reveal content. Font failure immediately uses the fallback; no invisible text loading gate.

## 4. Proposed input and validation contract

These bounds are design proposals, not supplied studio rules. G1 must confirm them and matching service validation before enabling dispatch.

| Field | Proposed control and acceptance | Normalization and review |
| --- | --- | --- |
| Service | Required native radio group: consultation or workshop | Stable enum, translated labels |
| Full name | Required text, autocomplete=name; 1–120 Unicode code points after outer-space trimming | Preserve diacritics, internal spaces and case |
| Email | Required email input, autocomplete=email; one address, maximum 254 code points; native email syntax as proposed client baseline | Trim outer spaces only; service owns deliverability rules |
| Preferences | Optional textarea; maximum 1,000 Unicode code points | Preserve internal whitespace/line breaks; empty review says “Not provided” |
| Group size | Workshop only; required text with numeric input mode; whole number 2–30 | Accept outer spaces, then ASCII digits; show format hint; consultation excludes it |

Email is the proposed single contact route; the service must confirm its suitability. Preferences asks for topics/details the visitor wants considered, without implying availability or fulfillment. No dates or appointment inventory are inferred. Inputs render as text, never markup. Do not lowercase names or translate free text.

Custom feedback owns validation and focus: implementation must suppress competing native interactive popups while retaining semantic input types/requiredness and service checks. Apply one validation path to button activation, Enter/implicit submission and any programmatic entry point. Enter in a textarea inserts a newline; Enter elsewhere invokes only the current step's primary action, and only review exposes final Submit.

Validate an attempted Continue or Submit; Back allows incomplete values. Do not flag an untouched empty field on load. After an error, recheck that field on blur; remove its invalid state/message once corrected without moving focus. Enforce length feedback while typing as a quiet counter, not repeated error speech. A failed attempt retains all answers, focuses a linked error-summary heading and supplies matching inline messages via described-by plus invalid state. Summary links focus exact fields or the first radio in the group. Do not combine this focus change with a duplicate assertive alert.

Inactive branch fields are absent from validation, review and the candidate payload. A connection failure never marks an otherwise valid email invalid. Service errors require a versioned code-to-message map; unknown codes show a persistent general explanation while retaining the draft.

## 5. Flow, branch changes and review return

Use four named views: Service → Contact → Preferences → Review. Preferences includes group size only for workshop; consultation retains preferences alone. Show “Step N of 4” because these four views exist in both branches; describe conditional questions explicitly. Continue advances after current-step validation. Back preserves all values and never submits. Progress is an ordered list with current-step semantics and links to reached steps; future steps are readable, unavailable text with an explanation.

Review groups Service, Contact and Preferences in document order, with contextual “Change service/name/email/preferences/group size” links. Each Change opens the owning full-page view, prefilled, retaining a return marker containing the review section and field. Its primary action becomes “Return to review”. After valid correction, return directly, focus the changed group's heading and scroll it into view without animation.

Changing service first changes the draft selection; advise beside the radios that available questions change after Continue. Retain an existing workshop group size as inactive page-memory draft when switching to consultation. Exclude it from review/submission and explain that exclusion. Switching back restores it, then revalidates it. A review change that makes group size newly required opens Preferences before review; focus its heading and explain the new requirement. Canceling that edit is not offered as a misleading rollback: Back preserves the current draft and the review must reflect current relevance.

Only review contains “Submit request”. Show the selected service, contact address and consequence beside it: this sends a request for the studio to consider; it does not establish an appointment. No prechecked consent, legal acceptance, booking or marketing step is invented.

## 6. State ownership, history and leaving

One flow-level page-memory draft owns raw answers, active service, inactive branch values, validation display and a monotonically increasing draft version. View components never own the only copy. UI state separately owns current view, visited steps, focus/scroll snapshots, review-return marker, language and appearance. The immutable submitted candidate and its action identity are separate from editable intent; only external service evidence owns remote outcome.

Baseline retention is this living document only. Same-document navigation retains answers; reload, tab termination, browser restart and device loss can lose them. Display “Your answers are kept while this form stays open” before entry. There is no Save/resume button or saved badge. Durable storage, retention, deletion, schema migration and cross-tab draft sharing are G2 decisions, not established capabilities; no shared last-writer policy is assumed. A separate tab starts an independent draft, so client guards cannot prevent remote duplicates.

Use proposed same-document fragments #service, #contact, #preferences and #review containing no personal data. Push one history entry for an intentional view transition; update per-entry focus/scroll metadata without pushing. Step Back uses the actual prior in-flow entry when available, otherwise the preceding named view. A review-return marker survives in-flow traversal.

On Back/Forward, restore current answers from the central draft, then the saved focus target and scroll; do not replay old answer snapshots or force scroll to top. A newly entered logical view focuses its h1 and starts at top. A missing field target falls back to its group heading. Reconcile a historical review/new-branch destination against current prerequisites; replace that entry with the earliest incomplete relevant step, explain why, and avoid a redirect/history loop. A fresh deep link without answers follows the same rule. If transition preparation fails, preserve the existing view/draft and focus a reachable route-error explanation.

Dirty means unsent draft content differs from the initial empty draft or later explicitly discarded baseline; Continue and review do not acknowledge saving. Only confirmed registration of the matching candidate marks that version submitted; later separate edits remain dirty. Accepted/pending never establishes this boundary. In-app navigation that would destroy it shows a full-page confirmation, retaining the proposed destination without leaving. “Keep editing” is first focus and restores the prior control/scroll; “Discard answers and leave” clears only this draft after explicit choice and follows the pending destination. No stacked dialog is needed.

Internal Back is lossless and needs no warning. Browser Back outside the document, reload, close and external navigation receive only best-effort native unload protection while dirty, with browser-owned wording. They cannot be guaranteed interceptable, especially on mobile. No termination event is treated as a reliable save. Pending/unknown remote attempts add an explicit warning that leaving cannot cancel the request.

## 7. Language availability and text preservation

Language choices display English and Tiếng Việt by name. Project policy requires complete, reviewed, version-matched bundles for both before bilingual release: labels, hints, validation codes, progress, review, exit and outcome messages. A missing bundle blocks switching and leaves the current interface intact with an adjacent explanation; an incomplete target never produces mixed essential instructions. This is a release gate, not permission to call an English-only release bilingual.

Switch atomically on the current view without a history entry; retain raw input, selections, errors, branch, review marker and scroll. Translate UI labels and known error codes, update document lang/title, and announce the selected language once politely. Leave focus on the language control; defer a switch during IME composition until composition ends. Never automatically translate answers, names or contact details. Review renders free text unchanged.

Draft label examples, pending native-speaker approval: Continue / Tiếp tục; Back / Quay lại; Review answers / Kiểm tra câu trả lời; Submit request / Gửi yêu cầu. These are proposals, not an available translation pack. G3 requires native Vietnamese review of all states, formatting and plain-language comprehension. Font metadata lists Vietnamese support, but G4 must inspect actual chosen files, weights, composed/decomposed diacritics, fallback and wrapping in both languages.

## 8. Submission, uncertain outcomes and external gates

Submission remains visibly unavailable with “Submission service has not been configured” until G1/G5 are verified. Never simulate success. Proposed future dispatch freezes an immutable reviewed candidate/version and correlates one logical action with separate transport attempts. Prevent duplicate activation at every entry point; keep Submit focusable with guarded aria-disabled and a nearby reason. While pending, candidate fields are read-only; language, appearance, review and safe navigation remain usable. A local polite status region updates without stealing focus. A terminal result supplies a persistent outcome section; focus its heading only if the visitor is still awaiting this explicit submission on review. Completion after other navigation shows a reachable outcome link without taking focus.

After 15 seconds of local waiting, replace the spinner with “We are still waiting for confirmation”; elapsed time proves no failure. No automatic effect retry or polling is authorized now. If a reply is lost, show persistent “We could not confirm whether your request was received” and preserve the candidate/action reference where available. Editing a separate draft cannot alter or cancel that attempt; block another overlapping Submit until authoritative reconciliation or a specifically approved consequence policy exists.

Distinguish requested locally, pending, accepted for processing, confirmed request registration, authoritative rejection and unknown outcome. Map them only to matching service evidence. Accepted/confirmed request copy cannot claim a completed consultation/workshop. A later lookup failure does not erase a previously confirmed fact. Correlate delayed observations by action and contract-defined ordering; contradictory evidence that cannot be ordered remains an explicit inconsistency, never last-arrival-wins. Authoritative rejection preserves answers and offers correction only for identified problems. Unknown lookup, expired history or unavailable permissions never means “not received”.

| Gate and proposed owner | Required external decision/evidence |
| --- | --- |
| G1 — Studio service owner | Exact fields, bounds, requiredness, language of contact and meaning of request acceptance |
| G2 — Product/privacy owner | Whether durable drafts/recovery are required; location, lifetime, deletion, schema, failure/conflict policy and authorized recovery data |
| G3 — Content owner/native reviewer | Complete versioned English/Vietnamese packs and error/outcome translations |
| G4 — Frontend/font owner | Exact font files/version/OFL notices, supported weights/scripts, fallback and rendered checks |
| G5 — Service/integration owner | Actual API/provider revision; action/attempt identity; service-enforced duplicate scope/concurrency/retention; payload equality/mismatch; terminal/partial results; authorized lookup and missing/expired semantics; pacing and retry limits; cancellation support |

For reload-safe outcome recovery, G2/G5 must establish an acknowledged minimal recovery identity before dispatch or independent authorized service discovery. Failed identity retention blocks dispatch under that capability; a lost operation-ID update uses the original action lookup only if documented. Otherwise retain unknown state. No support channel, authentication, cancellation or recovery route exists by assumption. Expose Check status only after its contract is supplied; without one, state that confirmation is unavailable and keep repeat submission unavailable.

## 9. Credits, adaptation and evidence

Layered and the P0 chapters are original Atlas synthesis by **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. Layered revision 0.1.0-draft and all three P0 chapters revision 0.2-draft were reviewed in repository inputs dated 2026-10-15. Retained numbers are Atlas proposals; this document's fields, routes, full-page flow, gates and state policy are project proposals.

Concept credits: **Google Material Design team/contributors**, [Material 3 color roles](https://m3.material.io/m3/pages/color-roles?s=m3), and **Microsoft Fluent team/contributors**, [Fluent 2 material](https://fluent2.microsoft.design/material). Package records cite Material Web 2.5.0 at 5a95667bb70ca5be8785b762fb0303737c3b4ac1 (Apache-2.0), and Fluent React 9.74.9 at 93e324f72f0e187ff6a7e5f70ebf929d9b2212a2 (MIT). Those covered-software terms do not clear website assets, fonts or trademarks. None is imported.

Plus Jakarta Sans credit: **Gumpita Rahayu, Tokotype**; commissioned by **6616 Studio** for Jakarta Provincial Government's identity. Upstream [18d1cd2f7ea10481919d2f05c1f7064b7307fc26](https://github.com/tokotype/PlusJakartaSans/tree/18d1cd2f7ea10481919d2f05c1f7064b7307fc26) records configuration 2.071, distinct from release label 2.7.1. Copyright 2020 The Plus Jakarta Sans Project Authors, SIL OFL 1.1; retain complete notices if files are selected.

Behavior references: **W3C Accessibility Guidelines Working Group** (editors Alastair Campbell, Chuck Adams, Rachael Bradley Montgomery, Michael Cooper, Andrew Kirkpatrick), [WCAG 2.2 Recommendation, 12 December 2024](https://www.w3.org/TR/2024/REC-WCAG22-20241212/); **W3C WAI/EOWG**, editors Eric Eggert and Shadi Abou-Zahra, [Forms tutorials](https://www.w3.org/WAI/tutorials/forms/) (labels updated 2024-05-13; validation/multipage 2019-07-27; notifications 2022-06-03); **GOV.UK Design System team, Crown copyright**, [Check answers](https://design-system.service.gov.uk/patterns/check-answers/); **WHATWG/HTML contributors**, [History](https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-history-interface); **Roy T. Fielding, Mark Nottingham and Julian Reschke**, [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); **Anne van Kesteren/WHATWG**, [Fetch snapshot e9460d1](https://fetch.spec.whatwg.org/commit-snapshots/e9460d1b22ead1c6a72eeac37fb2ec0dc01aeb1d/). Additional selected references: **W3C ARIA Working Group**, WAI-ARIA 1.2 Recommendation 2023-06-06 (Joanmarie Diggs, James Nurthen, Michael Cooper, Carolyn MacLeod); **Philip Walton/Google**, [Page Lifecycle guidance](https://developer.chrome.com/docs/web-platform/page-lifecycle-api#the-beforeunload-event), updated 2023-12-01. Local records inspected 2026-10-15: HTML last updated 2026-10-14; Fetch 2026-10-06; RFC 9110/STD 97 published June 2022; GOV.UK check-answers has no page revision/pin. Standards facts, informative guidance and Atlas proposals remain distinct. Terms: WCAG uses W3C Document License 2023; WAI tutorials/Understanding use W3C Software and Document License 2023; ARIA 1.2 uses its 2015 edition; GOV.UK guidance uses OGL 3.0 except exceptions; Chrome prose CC BY 4.0/samples Apache-2.0; RFC uses BCP 78/IETF Trust publication-time terms, separately Revised BSD Code Components; WHATWG prose CC BY 4.0, separately BSD-3-Clause source portions. No external code, prose, images or fonts are copied. Atlas publishing terms remain unresolved.

Performed: selective repository reading and document-level requirement mapping only. Source links above are credited from supplied local records, not newly browsed. No UI, browser, keyboard, assistive-technology, storage, font-rendering or service test occurred; theme arithmetic/preview evidence is not inherited as project validation. Future evidence must cover phone/desktop and zoom reflow, both appearances/languages, keyboard/error focus, IME switching, review branch/history restoration, dirty exit, storage/recovery failure if selected, double activation, lost replies and authoritative reconciliation under verified contracts.
