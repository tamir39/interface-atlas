# Studio Request design

> Reviewed example: originally prepared with the initial updated preparation skill, then explicitly reviewed and corrected at document level on 2026-10-17. The immutable first draft and correction evidence accompany this example. No runtime, service, accessibility or usability result is implied.

Status: proposed design handoff, 2026-10-17; no product or service implemented. Theme: **Layered 0.1.0-draft**, Atlas synthesis record `atlas-layered-research-2026-10-15`. This fictional service is independent of Twohearts.

## Requirements, evidence and release boundaries

The supplied brief establishes a community studio request flow in English and Vietnamese: choose consultation or workshop, enter contact details and preferences, review, change answers, and submit one request. Workshop additionally asks group size. Support phone and desktop, keyboard, step Back and browser Back/Forward, language switching while editing, unsaved exit, Light/Dark/System and reduced motion.

Everything below described as a proposal is a project decision awaiting owner acceptance, rather than an observed user need or supplied field constraint. No user research, rendered interface, implementation stack, API, provider, account system, translation pack, retention policy, session model, assets or font files were supplied. There is no established durable draft or working submission. Retained answers, remotely received requests and completed consultations/workshops are separate facts. No calendar, payment, enrollment, subscription, account or agent feature is introduced.

Release owners must be assigned. The **studio product owner** approves fields, bounds, content, contact-use notice and request meaning; the **language owner** commissions and approves both translations; the **service owner** supplies the remote contract; the **privacy/storage owner** approves retention and recovery identity handling. These are required roles, not claims that named staff exist. Missing contracts block public submission; an unavailable action must explain why and preserve editable answers. A trial must never simulate acceptance as a real service result.

## Tasks, content and theme choice

The primary outcome is an accurately reviewed request with an authoritative receipt when that capability exists. Visitors first need to understand which service they want, then provide only relevant information, verify it and understand the consequence of sending it. Proposed hierarchy: task heading, short instruction, current step, grouped fields, primary action, then secondary navigation. Progress is four named stages: **Service → Contact → Preferences → Review**. The branch changes fields inside Preferences, so the total remains four. A completed stage means locally valid answers, not a saved or sent request.

Three candidate READMEs were compared. **Botanical** offers studio warmth and comfortable reading, but expressive serif display and organic geometry add identity decisions without improving this compact form. **Play** suits community onboarding and clear progress, but tactile shadows and colorful panels exceed the brief's restraint. **Layered** is selected for comfortable controls, coherent rounded shapes and purposeful opaque surfaces; it supports approachable task grouping without decoration. This is a heuristic fit assessment, not measured usability evidence. Adapt its workspace into a single full-page flow; do not carry over project cards, checklist fixtures, modal editing or sidebar navigation.

## Color contract

Retain these exact Layered Atlas-proposed tokens. Values below are light/dark respectively; they are not Google or Microsoft tokens.

| Role | Light | Dark | Project use |
| --- | --- | --- | --- |
| Page | `#EAF2F1` | `#101C1C` | Outer page |
| Low | `#DFEBE9` | `#172626` | Progress/context region |
| Surface | `#F7FBFA` | `#1E3030` | Main form/review |
| Raised | `#FFFFFF` | `#273C3B` | Inputs |
| Tint | `#D5EAE5` | `#294C46` | Current step/selected option |
| Secondary | `#F2E6DA` | `#43372E` | Unsaved/retention explanation |
| Ink | `#172F2C` | `#E7F3EF` | Main text and selected labels |
| Muted | `#405E58` | `#B4CEC5` | Hints and supporting text |
| Primary | `#185C50` | `#A2D6C5` | Primary action or underlined text link |
| On primary | `#FFFFFF` | `#12382E` | Only on Primary fill |
| Border | `#58766E` | `#8AABA1` | Necessary control boundaries |
| Focus | `#6D3B83` | `#E7B6F4` | External focus ring |
| Error | `#972F3A` | `#FFB3BE` | Error text/boundary |

Use Ink on Tint for current/selected text; selected options also retain a native checked indicator. Use Ink/Muted on the six named backgrounds, Primary text underlined on neutral backgrounds, and the paired Primary/On-primary button fill. Hover preserves that pair and adds an explicit boundary; pressed adds an inset boundary without movement. Secondary buttons use Ink on Surface with Border. No opacity-faded instructions or new warning/success palette. Outcomes use text and headings; errors use messages plus outlines. Unavailable actions remain readable with their reason, rather than an unverified low-opacity pair.

Inherited opaque sRGB calculations report light/dark minima across the six backgrounds: Ink **11.31/8.33**, Muted **5.65/5.67**, Primary text **6.23/5.85**, Border **3.95/3.80**, Focus **6.43/5.59**, Error **6.01/5.61**; On-primary on Primary is **7.82/7.95:1**. Tint limits the six-surface minima. These are source calculations, not newly performed or rendered checks. Surface fills alone do not establish a necessary boundary; use Border. Any compositing or altered colors need new checks.

## Typography, geometry and responsive pages

Retain the theme's proposed **Plus Jakarta Sans**, normal 400/500/600/700, followed by `"Segoe UI", Arial, sans-serif`. No download or rendered-font claim is made. The delivery owner must select an exact licensed package and verify Vietnamese diacritics and all used weights; fallback rendering remains usable if loading fails. Do not delay form availability for fonts.

Project adaptation: page heading **2rem/1.25, 600**, stage heading **1.75rem/1.25, 600**, group heading **1.25rem/1.35, 600**, body **1rem/1.6, 400**, labels/hints **0.875rem/1.5, 500**, input/button text **1rem/1.5**, normal tracking. The smaller heading replaces Layered's large display role for task focus. Use sentence case, one h1 and ordered heading levels; text and Vietnamese errors wrap without clipping.

Retain spacing **4, 8, 12, 16, 24, 32, 48, 64, 96px**: label-to-field 8px, related controls 16px, groups 24px, stage separation 32px. Panels have 24px corners and 24px inset; fields/buttons 12px corners. No resting shadows, nested card grid, modal, artwork or optional effect. All targets are at least **44×44px** including associated radio labels. Focus is **3px solid Focus, 3px offset**, immediate and unclipped; use system Highlight in forced colors.

Proposed main maximum **760px**, reading text at most **65ch**. Use 16px narrow outer gutters and 24px from 640px upward; panel inset becomes 16px below 480px as an explicit project adaptation. Keep fields one column on desktop as well as phone. Header order: studio text name, language, appearance. Then skip-link destination/main, h1, instruction, progress list, stage content, actions, retention note. At 640px and above actions may share a row if full labels fit; below, primary and secondary actions stack in the same DOM order. Wrap header settings and progress labels rather than horizontally scrolling or abbreviating Vietnamese. No sticky/fixed bars may obscure keyboard focus, errors or the onscreen keyboard. Test at 320 CSS px, 200% text and 400% zoom; these are future checks, not observed breakpoints.

## Proposed inputs, validation and component states

The following is a minimal proposed field set. All bounds require studio and service approval before release. “Characters” means Unicode code points, not bytes or UTF-16 units; implementation must use one consistent counter and avoid conflicting native maxlength behavior.

| Stage | Proposed field and semantics | Proposed rule |
| --- | --- | --- |
| Service | Required native radio group: Consultation / Workshop | Exactly one known service ID; no preselection |
| Contact | Name, native text, autocomplete name | Required; 1–100 characters after outer trim; allow Vietnamese and other names without a name regex |
| Contact | Email, native email, autocomplete email | Required; up to 254 characters after outer trim; native email syntax model, including plus/subdomain forms; syntax proves no ownership |
| Preferences | “What would you like us to know?” textarea | Optional; at most 1000 characters; hint asks for relevant preferences and discourages sensitive details |
| Preferences, workshop only | Group size, visibly labeled number with integer step | Required integer 1–30; no decimal; state the bound beside the field |

Internationalized email handling is an explicit product/service compatibility input before launch, rather than an invented support guarantee. Preserve entered case and internal text. Normalize only documented outer whitespace at review/send; do not silently truncate, translate or interpret answers as markup. No required consent checkbox or unsupported scheduling preference is invented. The product owner must supply truthful contact-use and retention copy before collecting real personal information.

Validate only the active stage on Continue, and all active fields at final submission. Back/history can preserve incomplete answers. Do not show errors on pristine fields or while someone is composing text. After a failed attempt, clear a field's stale error when it passes the same check during subsequent input/blur; never move focus while typing. Client checks assist entry; the future service repeats authoritative validation.

Choose custom interactive feedback: retain native semantics and constraints but suppress browser interactive validation for this flow so the complete error collection runs without competing native popups. One form controller owns button, Enter/implicit submission and any scripted submission path. Before Review, Enter means Continue; only Review exposes the final submit boundary. Textarea Enter inserts a newline. Inactive workshop controls are unmounted or disabled and excluded from validation and payload construction.

A failed attempt keeps every answer, focuses a visible “Check your answers” summary heading, and provides links to exact controls/first radio. Inline text matches the summary, uses Error, and is associated with the control along with its hint; expose invalid state and remove stale error associations. A service/storage problem uses persistent page-level recovery text without marking correct fields invalid. Avoid duplicate assertive speech when the summary already receives focus.

## State ownership, navigation and review changes

One in-document draft owner holds stable language-neutral field IDs, raw answers, selected service and inactive workshop answer. Derived validity and review values are recomputed from that draft. Baseline is the empty draft: any entered answer is unsent work until an authoritative receipt; navigating steps does not save remotely. Appearance/language are independent preferences and do not make the draft dirty. A separate navigation owner records current stage, review-return entry/section, scroll and useful focus target. URLs/history never contain contact or preference answers.

Default capability is memory for the current document. Step transitions, language changes and same-document history share the latest canonical draft; Back is navigation, not undo to an older answer snapshot. Reload, tab termination and a new document cannot promise restoration. No autosave badge or Save/resume action appears. A privacy-approved durable draft, if later selected, needs a separate owner, schema, expiry, acknowledgement, migration/corruption behavior and storage-failure recovery before the promise changes. Browser-local acknowledgement would still establish neither sync nor remote receipt. Appearance preference persistence may be attempted; failure uses the current selection and System on a fresh visit without interrupting answers.

Continue validates and pushes the next logical stage, updates document title and focuses its heading at the top. Step Back returns to the preceding stage without validation or loss. Browser Back/Forward traverses actual visited destinations, restores scroll/focus where a surviving target permits, and preserves current answers; typing and preference changes do not create entries. Do not rewrite traversal to force Continue. If a historical forward target needs missing prerequisites, show the earliest incomplete stage with an explanation, replacing that unavailable target rather than looping history. Missing/removed focus targets fall back to their stage heading. Opening a stage link without a live draft starts at Service and explains that answers are unavailable; it never fabricates recovery.

Review lists Service, Contact and Preferences in input order; workshop alone shows Group size. Empty optional text reads “Not provided.” Each section has a contextual Change link, such as “Change contact details.” Change opens prefilled fields and records the review entry and section. Its primary action becomes “Return to review.” After valid correction, traverse to that owned review entry, or replace the view if that entry is unavailable; focus the changed section heading and restore its useful position. History can revisit an editor using current answers. A Back-to-review escape preserves unfinished edits; Review then identifies incomplete sections and blocks sending until repaired.

Changing service does not navigate on radio selection. Preserve group size as inactive in-memory draft when switching to consultation, explain that irrelevant answers will not be sent, and remove it from review, validation and payload. Switching back restores and revalidates it. Common answers remain. From a review-origin service edit, a newly required missing/invalid group size routes to Preferences before returning to review; otherwise return directly. Announce the branch update once and show the resulting review contents. Never allow a hidden field to block completion.

## Languages, appearance and unsaved exit

Use visible language choices **English** and **Tiếng Việt**, with document language `en` or `vi` and language metadata on the language names. Proposed initial choice: a validated stored preference, otherwise supported browser language, otherwise English; both are left-to-right. The language owner must deliver version-matched complete packs covering headings, labels, hints, errors, status, exit decisions and service/privacy notices, reviewed by a Vietnamese speaker. Bundle both packs with the flow so editing does not depend on a translation fetch. Missing keys block release. If a target pack is unavailable at runtime, retain the current language and draft, keep focus on the selector and explain the unavailable change in the current language; never show mixed untranslated keys.

A successful switch updates interface text, option labels, document title/lang and errors by stable IDs; preserves values, service, stage, review-return context, selection/caret where feasible and scroll; keeps selector focus and gives one polite confirmation. Entered free text is never automatically translated. Review explicitly uses the entered answers, with “Answers stay in the language you entered” near the switcher. Submission metadata may record interface locale only if approved in the service schema; locale is not a duplicate action or altered answer payload.

Appearance choices are **Light / Dark / System**, default System; follow live OS changes only in System and apply a validated saved choice early when available. Appearance never resets fields or focus. Transitions and validation are immediate. No motion/effects recipe is selected, no motion dependency is loaded, and OS reduced motion yields the same complete experience.

Warn about the memory boundary before entry: “Your answers stay on this page while you edit. Reloading or closing it may lose them.” For an in-app exit that destroys dirty work, show a full-page confirmation with **Keep editing** and **Leave and discard**; default focus goes to Keep editing, which restores the originating context. Discard explicitly clears this draft. Internal stage navigation does not trigger it. Attach a browser unload prompt only while loss is possible; browser-chosen prompts and mobile termination are not guaranteed protection. Browser traversal within the live flow preserves answers; traversal out may invoke only available platform protection. No authentication expiry, invented session timer or cross-device recovery is claimed.

## Submission, uncertain outcomes and contract gates

Review's final action is **Submit request / Gửi yêu cầu**; intermediate **Continue / Tiếp tục**, **Back / Quay lại** and **Return to review / Quay lại phần xem lại** remain distinct. These Vietnamese strings are proposals pending language approval. Explain before Submit that sending a request does not book or complete a service; exact studio follow-up wording must come from the product owner.

Before dispatch, validate active fields and freeze one reviewed snapshot plus stable action identity; transport attempts have separate identities. The service owner must supply a versioned contract with verified evidence for: exact receipt/side effects; schema and server errors; privacy-preserving access to receipt/status without assuming accounts; service-enforced duplicate protection across tabs/devices; key scope, equality rules and expiry; authoritative acceptance/rejection/partial-result states and references; lookup by stable action identity including missing/expired meanings and consistency lag; observation pacing and retry limits. No endpoint, header, support channel or cancellation capability is specified as working.

The storage/privacy owner must approve a minimal recovery record and retention/expiry policy before any reload-safe promise: action identity, snapshot fingerprint, operation identity when supplied, last observed outcome/time and contract revision, excluding full answers unless separately approved. The dispatch gate requires acknowledged recovery identity retention **or** documented independent authorized service discovery. A failed pre-dispatch write blocks sending and truthfully says nothing was sent. If later operation-ID persistence fails, lookup by the original action ID must remain sufficient; otherwise the service contract is incomplete. These are proposed launch gates, not existing storage features.

During a real request, keep a persistent snapshot summary and “Sending request”; prevent duplicate activation at one dispatch boundary for pointer, keyboard, Enter and other entry points. Keep the action focusable with guarded aria-disabled and an adjacent reason. Answers remain readable. Language/appearance and safe navigation remain available. Proposed local waiting threshold is **15 seconds**, after which replace an indefinite spinner with delayed/unconfirmed text; elapsed time proves no failure. No automatic effect retries or invented background polling.

Matching authoritative receipt allows “Request received” with the actual supplied reference and next action; it does not say appointment confirmed or service completed. Authoritative rejection explains its known scope and permits correction when the contract proves no overlapping effect remains. Lost reply, timeout or disconnect after possible dispatch means **“We could not confirm submission. It may have been received.”** Keep the action identity, submitted snapshot and last observation visible. Failed status lookup does not erase a previously confirmed receipt. Show **Check status** only with a verified lookup capability, honor service pacing, and reconcile on reconnect/re-entry before any repeat effect. Missing history is unknown unless the contract proves non-receipt.

Later corrections are a separate draft; they cannot mutate, cancel or resolve the frozen action. Block overlapping new submission until reconciliation or an explicitly approved service policy addresses multiple effects. A new key is not duplicate protection. Retry the same intent only within verified equality/retention/retry rules or proof the original was not applied. With no supported lookup or reconciliation route, state that confirmation is unavailable, keep retry unavailable and expose no invented support link. Leaving or stopping local waiting never claims remote cancellation. If required identity retention/discovery is unavailable, public dispatch remains gated.

**Receipt observation reconciliation:** The service owner must define authoritative observation ordering/version semantics, or explicitly declare ordering unavailable, before dispatch is enabled. Correlate each observation to the original action and immutable payload; arrival order and client clocks confer no authority. Preserve confirmed receipt/reference and action history. Demonstrably older successful observations cannot replace a newer accepted result, hide its reference or enable correction/retry based on an obsolete rejection. When authorized observations contradict without reliable order, preserve their provenance alongside the known receipt, show **Conflicting request information — reconciliation required**, and offer only a supported status/reconciliation action. Keep the existing no-overlap and retry gates while unresolved. This does not assert a monotonic service model or equate receipt with completion of the requested service.

## Validation and open inputs

Performed: frozen brief/instruction/catalog/three-candidate reading; selected theme and task-relevant knowledge reading; document-only reconciliation of stage, branch, language, retention and outcome rules; provenance fingerprints below. No rendered, keyboard, assistive-technology, real-device, storage, service, translation-quality or user checks were performed. Inherited contrast arithmetic is identified separately above. This document does not certify accessibility, reliability or improved completion.

Before implementation release, test both service branches through correction and browser history; active/inactive payloads; invalid Enter submissions and linked summaries; Vietnamese composition, long labels and language-switch failure; review return focus; 320px/zoom/keyboard/forced-color modes; every appearance and fallback font; dirty external exit and mobile termination. With actual contracts, test pre-dispatch storage failure, lost response, delayed/out-of-order receipt, duplicate cross-tab attempts, expiry, lookup failure and reload recovery. Compare reviewed snapshot with server-accepted payload and confirm that receipt never implies booking. Conduct task sessions with English/Vietnamese visitors to test service comprehension and whether the four-stage structure adds useful orientation.

Open inputs are the assigned owners, approved fields/bounds and internationalized-email policy, service definitions/follow-up copy, bilingual packs and review, privacy/retention notice, font package, backend receipt/deduplication/status contract and verified recovery mechanism. These are implementation gates or research questions, not fabricated findings.

Additional required implementation trace after document review: Exercise a late successful pending/rejected observation after receipt, an unordered contradiction and re-entry while reconciliation remains unresolved.

## Source credits, adaptations and snapshot

Used Atlas files were supplied as a frozen updated text snapshot on 2026-10-17. Live repository metadata reported HEAD `782159e8e2510933c76989ff9fd9546d282c62cd`; that does **not** establish that HEAD contains the frozen uncommitted updates. The fingerprints below govern this document's selected text, using SHA-256 of helper output normalized to UTF-8/LF plus a final LF; they are normalized text fingerprints, not raw-byte repository hashes.

| Frozen path | SHA-256 |
| --- | --- |
| `skills/prepare-frontend-design/SKILL.md` | `71804c65b66564565c65e8485f4239c6d7c24709070c08ce9c92f0b74f9477f3` |
| `themes/layered/design.md` | `50b367846e908348f66705e76c78b474888d7ba7ab1e69c365c6858c404f76c0` |
| `themes/layered/sources.md` | `b7609231849d8be5e6343ff97d0ee199c15b87039bf7ebc1d82500f387baa37e` |
| `knowledge/ui-ux-design.md` | `ef7048339a733068b3f2241ddcacce7cc682cb65c748f723000465fc883f5152` |
| `knowledge/accessibility-and-responsive.md` | `fcde6775c47577cc3626e38cf1512755fd56b92ca6cb1312990ca92562da266d` |
| `knowledge/state-and-recovery.md` | `ddd338c88cb26e5001c6209e91d4d3b53089912ac2bee68a9c3a95ba5eda7c51` |
| `knowledge/forms-and-navigation.md` | `870844c51547c2083a5b33d97048c7fdae1bdd7850a214ae375bdc3940e93b5b` |
| `knowledge/uncertain-outcomes.md` | `7977ea92734b0457dee69f041b22f88061970c83070fb85976a56e119736cb10` |
| `references/skill-adaptations.md` | `02a8801225a921eab3cb081b933df803de06118ec6c38b78fdd01968b364e1fd` |

**Theme:** Layered is original Interface Atlas work for **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**, revision 0.1.0-draft, reviewed 2026-10-15. Retained palette, semantic pairs, shape, spacing and focus are Atlas proposals; form composition, typography adaptation and all project contracts here are new proposals. Google's Material Design team/contributors provide concepts of [surface roles](https://m3.material.io/m3/pages/color-roles?s=m3), [elevation](https://m3.material.io/styles/elevation/overview) and [states](https://m3.material.io/foundations/interaction/states/overview); Microsoft's Fluent Design team/contributors provide a separate [opaque material](https://fluent2.microsoft.design/material) comparison. No web prose/assets or implementation are copied. Material Web 2.5.0 at `5a95667bb70ca5be8785b762fb0303737c3b4ac1` has Apache-2.0 software terms; Fluent UI 9.74.9 at `93e324f72f0e187ff6a7e5f70ebf929d9b2212a2` has MIT software terms. Neither is selected or licenses website assets; website reuse permission remains unresolved.

**Font:** Plus Jakarta Sans by **Gumpita Rahayu / Tokotype**, commissioned by 6616 Studio for Jakarta Provincial Government's +Jakarta identity. [Upstream](https://github.com/tokotype/PlusJakartaSans/tree/18d1cd2f7ea10481919d2f05c1f7064b7307fc26), source version 2.071/release label 2.7.1; Copyright 2020 The Plus Jakarta Sans Project Authors, **SIL OFL 1.1**. Vietnamese coverage is listed in source metadata, not rendered validation. No font software is included; retain the exact package's complete OFL/copyright notice if later distributed.

**Methods:** Atlas's general/accessibility guides adapt **Ghaida Zahran's** [Journey/Evaluate](https://github.com/ghaida/intent/tree/3fc38dff381ce0e4dec8f52c97c3e37abd95e10e), CC0-1.0 (journeys/re-entry); **Jakub Krehel's** [better-*](https://github.com/jakubkrehel/skills/tree/4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63), MIT, Copyright 2026 Jakub Krehel (layout/type/color/writing/focus); and **Julien Thibeaut's** [ui-skills](https://github.com/ibelick/ui-skills/tree/f18d13077d6e3841821ea0a36526c0fd44a570b5), MIT, Copyright 2026 Julien Thibeaut (governing evidence, self-contained handoff, native semantics). Retained notice records: `references/licenses/jakub-krehel-MIT.txt`, `julien-thibeaut-MIT.txt`, `ghaida-intent-CC0.txt` in Atlas. Include applicable copyright/permission notices with redistributed covered copies/substantial adaptations; linked sources do not license unrelated assets. These methods are narrowed here; no upstream full audit or stack policy is adopted.

**Interaction references:** W3C WAI/working-group contributors supply [forms](https://www.w3.org/WAI/tutorials/forms/notifications/) and [WCAG 2.2](https://www.w3.org/TR/2024/REC-WCAG22-20241212/); GOV.UK Design System contributors supply comparative [check answers](https://design-system.service.gov.uk/patterns/check-answers/) guidance. WHATWG/HTML and Storage contributors supply living platform references; Storage concepts distinguish retention from acknowledgement. Remote-outcome synthesis credits **Roy T. Fielding, Mark Nottingham and Julian Reschke**, editors of [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110), and **Anne van Kesteren / WHATWG** for [Fetch](https://fetch.spec.whatwg.org/). These are references carried through frozen Atlas guidance, not newly visited sources, copied prose or endorsements. Standards/document notices differ from software licenses. Atlas's own publishing terms remain undecided; future reuse must resolve them. No source assets/code, brand images or font binaries are redistributed by this design handoff.
