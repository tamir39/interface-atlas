# Studio Request design

Status: proposed project handoff, 2026-10-20; document exercise only. Theme: Botanical `0.1.0-draft`, adapted from Tamir (Phi Vuong Tuong Tam)'s portfolio snapshot `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`. No implemented or validated service is asserted.

## Requirements, evidence and selection

The supplied fictional brief establishes English/Vietnamese visitors choosing consultation or workshop, contact details, relevant preferences, a workshop-only group size, review/change and one final request. Keyboard use, phone-first desktop-compatible layout, language changes, Light/Dark/System, reduced motion, Back/Forward and unsaved departure are required. There is no supplied research, stack, backend, account, translation pack, retention/session contract, font package or brand artwork. All fields, limits, route names and behaviors below are project proposals requiring owner acceptance. No booking, reservation or completed appointment is implied by submitting a request.

Three candidate READMEs were compared. Botanical suits a creative studio through warm paper, green ink, comfortable spacing and restrained organic corners. Layered offers useful consumer-workspace grouping but its tonal planes and temporary-editor emphasis add little to a short full-page service flow. Editorial suits boutique services and long reading; its publication rhythm is less directly aligned with the studio's proposed organic identity. Select Botanical and retain its actual tokens, control geometry and focus treatment. Reduce expressive typography to the page heading; omit artwork, shadows, cursor effects and animated transitions. These fit judgments are hypotheses, not usability findings.

The primary task is to send one accurate request and understand whether it was received. Supporting tasks are correcting an answer, changing service or language, returning through history, and leaving knowingly. Group the journey into four stable destinations: Service → Contact → Preferences → Review. Workshop group size belongs inside Preferences, so “Step 3 of 4” remains truthful. Only the final review action sends anything.

## Pages and responsive composition

Use proposed paths `/request/service`, `/request/contact`, `/request/preferences`, `/request/review` and `/request/outcome`. URLs and history contain navigation identifiers only, never contact details or answers. A shared request controller must survive transitions within the mounted flow; no framework is prescribed.

DOM/reading order: skip link; plain studio name; “English / Tiếng Việt” language control; appearance control; main heading; ordered step list with current step text; required-field explanation; fields or review groups; local notices; action row. Keep help at its relevant field. Each page has one h1 and a localized document title such as “Contact — Studio Request”. Review contains Service, Contact and Preferences groups in that order, each with a specifically named Change link. Outcome puts the authoritative or unconfirmed status first.

Use one column at all widths. Main content is at most 42rem wide; prose is at most 65ch. Gutters are 24px, reduced to a proposed 16px below 360px; at 768px and above use 40px outer gutters. Form-panel padding is 24px, reduced to 16px below 480px. Groups have 32px separation; label/control gap 8px, related controls 12px, hint/error gap 8px. At 480px and above, actions share a wrapping row with Back first and primary action last; below it they stack at full width in the same DOM order. These thresholds are proposals to test with Vietnamese content, not device assumptions.

Do not fix headers, progress or action bars. Preserve vertical reachability with the software keyboard open. Labels, errors, buttons, email and long answers wrap; review preserves meaningful line breaks and uses overflow wrapping for long tokens. Never clip a full answer behind a tooltip. Reflow without page-level horizontal scrolling at 320 CSS pixels and at 400% zoom; verify 200% text resize and landscape layouts.

## Color, typography and geometry contract

The following source values are inherited from Botanical unless marked “Atlas proposal”. Values are light / dark.

| Semantic role | Light | Dark | Permitted use |
| --- | --- | --- | --- |
| Page | `#f6f5ed` | `#101d17` | Base background |
| Surface | `#e5eadc` | `#23392c` | Progress/supporting grouping |
| Panel | `#ffffff` | `#192b21` | Form and input backgrounds |
| Ink | `#293d2f` | `#f3edda` | Primary text, focus, selected labels |
| Muted | `#596550` | `#b7c9b6` | Hints on page/surface/panel only |
| Action/accent | `#386046` | `#abd0a1` | Filled primary action |
| Action hover | `#294a34` | `#c6e0be` | Hovered primary action |
| On action | `#ffffff` | `#14291a` | Text on action and action hover |
| Decorative divider | `#bbc7af` | `#425d48` | Nonessential separators only |
| Necessary border, Atlas proposal | `#69795f` | `#8aab89` | 1px input/secondary-action boundary |
| Selected surface | `#c7d6b9` | `#425d43` | Service selection with ink text/marker |
| Success | `#346348` | `#afd4bc` | Text/icon on page/surface/panel |
| Warning, Atlas proposal | `#72530a` | `#e4ca85` | Unconfirmed/delayed text on neutral backgrounds |
| Danger, Atlas proposal | `#943743` | `#f0b0b5` | Error text/icon on neutral backgrounds |
| Information, Atlas proposal | `#2d5871` | `#abcbd8` | Informational text on neutral backgrounds |

Secondary actions use ink, panel background and necessary border. Links are underlined. Selected service options use ink for every label, hint, marker and underlined link, plus native radio state and visible “Selected” text. The selected background must not use muted text or the dark necessary-border token as its sole state cue: Atlas records failing pairs there. Do not turn semantic foregrounds into filled banners. Status always includes persistent words; color is supplementary.

Retain the source 3px ink focus outline with 5px offset; reserve surrounding space and prevent clipping. Use system `Highlight` in forced colors. Botanical's inherited opaque calculations report action/on-action 7.17:1 light and 9.01:1 dark, and ink/selected 7.63:1 and 6.23:1. They are source numerical evidence only; this project has not measured rendered controls.

Botanical names Manrope for interface/body, DM Serif Display for expressive headings, and JetBrains Mono for technical values. No files are supplied. The initial project proposal uses `system-ui, sans-serif` throughout both languages, including h1, to avoid implying unverified Vietnamese coverage. H1: 600, `clamp(2rem, 4vw, 3.5rem)`, line-height 1.15, normal tracking; section heading: 600, 1.75rem/1.3; group heading: 600, 1.125rem/1.4; body: 400, 1rem/1.65; labels/hints: 400–600, 0.875rem/1.5; input text: 1rem/1.5. All sizes use relative units. Do not uppercase Vietnamese labels or suppress diacritics. A future font package needs actual Vietnamese glyph/weight/fallback testing and notices before replacing the system stack.

Retain panel corners `32px 8px 32px 8px` and action/control corners `22px 6px 22px 6px`; use a proposed uniform 12px radius for text-entry fields. Minimum comfortable target: 44×44px, with labels enlarging radio hit areas. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px. Do not introduce compact mode. No elevation is selected.

## Proposed input and validation contract

These bounds are project decisions, not supplied business rules. The studio/content owner must approve them and the eventual service must enforce matching constraints before live submission.

| Input | Proposed label and semantics | Proposed bounds/handling |
| --- | --- | --- |
| Service | “Choose a service” / “Chọn dịch vụ”; required native radio group | Consultation / Tư vấn; Workshop / Hội thảo thực hành; no preselection |
| Name | “Your name” / “Tên của bạn”; required text, autocomplete name | 1–100 Unicode code points after outer whitespace trim; accept single names, spaces and diacritics |
| Email | “Email address” / “Địa chỉ email”; required email control, autocomplete email | Proposed maximum 254 characters; trim outer whitespace; no forced lowercase of the full address; international-address support is a service gate |
| Preferences | “What would you like us to know? (optional)” / “Bạn muốn chúng tôi biết điều gì? (không bắt buộc)”; textarea | 0–1000 Unicode code points; relevant interests/preferences only; hint asks visitors to avoid sensitive information |
| Group size | “Number of participants” / “Số người tham gia”; workshop-only required quantity | Integer 1–30, native number control, min/max/step 1; hint explains this proposed range needs studio confirmation |

No availability date or eligibility check is implied. Preserve free text exactly except the stated outer trims; show any transformed contact value on Review. Never translate a visitor's answer automatically. Serialize an explicit active-field allowlist; consultation never contains group size. Input IDs and service codes are language-independent. Errors are localized content keys and field IDs, not stored rendered English strings.

Choose custom interactive feedback as the single validation/focus owner. Retain useful native input types/required/min/max semantics, but suppress competing native interactive validation on the managed form so button, Enter and scripted submissions reach one complete validation routine. Enter in a textarea inserts a newline; implicit submission elsewhere performs the page's intended action. No early step can invoke the remote send routine. The eventual server separately validates the same active payload.

Validate the active step on Continue and all active fields before final dispatch. Do not show errors while a person starts typing. After an attempted validation, update an affected field's error on blur and clear it once valid; do not move focus. A visible character count may update without per-keystroke live speech. On failure, retain all values, focus a summary at the page top, and link each message to its exact field/group. Inline wording matches the summary; associate it with the control and expose invalid state. Example proposed copy: “Enter the number of participants, from 1 to 30.” / “Nhập số người tham gia, từ 1 đến 30.” Network and storage problems are page-level statuses, never invalid-field errors.

## Draft ownership, language and appearance

One route-independent request controller owns the editable draft, monotonically increasing content revision, active service, inactive branch values, completion flags and review-return destination. It holds them in memory for this live flow only. Route/history state owns step, review-origin anchor, focus target and scroll position. Rendered pages are projections, not separate drafts. Initial empty content is the discard baseline; a nonempty unsubmitted draft remains unsaved even after Continue. Language/appearance changes do not dirty answers or invalidate content completion.

No durable personal-data save/resume is selected. Show before entry and near departure: “Your answers are kept while this form stays open. They may be lost if you reload or close it.” This is a proposed policy, not a browser guarantee. Reload creates a fresh draft unless a separately approved future capability exists. Never label Continue “Save” or claim “Saved”. Any future draft store needs a named owner, retention/deletion/privacy policy, acknowledgement boundary and read/write failure handling before that promise changes.

Language applies immediately through the explicit selector. Initially use an available valid saved `en`/`vi` choice, otherwise a supported browser-language match, otherwise English. Store the preference separately from answers, best effort only; storage failure leaves the choice valid for this tab. Do not move routes, clear answers, create duplicate history entries or reset dirty/review context. Keep focus on the selector; update document language/title, headings, labels, hints, error summaries, status and accessible names together. Preserve entered text, caret where the node remains, and scroll. Both languages are left-to-right; mark untranslated answer excerpts with a known answer language only when supplied, never infer it from the interface language.

Translation delivery policy: ship complete, version-matched static English and Vietnamese packs before enabling either complete service flow. The content owner and a Vietnamese reviewer must approve the proposed wording above, terminology, validation, departure and outcome copy. Do not silently mix languages or machine-translate missing strings. If a pack fails mid-flow, preserve the draft and current usable language, keep the selector in that language, and explain the other language is unavailable. On initial failure, show a complete available-language shell and explicit availability notice; do not present the unavailable language as selectable. Final sending is gated if the selected-language review/consequence/outcome copy is incomplete.

Appearance choices are explicitly Light, Dark and System, with proposed Vietnamese labels Sáng, Tối and Theo hệ thống. Default System; follow live system changes only while selected. Apply a valid saved preference before paint where feasible. Invalid storage or write failure falls back to a usable current-session choice. Status meaning and focus remain legible in both modes and forced colors.

## Branching, review and navigation

Continue commits no remote effect; it validates the step, then navigates. Step Back preserves all draft values without validation. Service selection alone changes no page. When service changes, clear dependent completion and recompute active fields. Retain prior workshop group size as inactive memory to support reversal, but exclude it from validation/review/payload during consultation. Returning to workshop restores it visibly for confirmation and revalidates it. Hidden answers can never block progress.

Each Change link opens the relevant full page prepopulated, recording its review section. The primary label becomes “Review changes” / “Xem lại thay đổi”. After valid edits, return directly to Review at that section and focus its heading; do not force unrelated completed steps again. Changing consultation to workshop first routes to Preferences if group size is absent/invalid, with “Workshop needs a group size”; after correction return to the Service section of Review and explain the changed questions. A Back to review link preserves incomplete edits; Review marks affected groups “Needs an answer”, links to correction, and keeps final send unavailable until valid. There is no hidden rollback of edits.

Normal forward/Change transitions add one history entry; Back/Forward traverses existing entries without adding synthetic duplicates. Save route focus/scroll before leaving. On a new logical page, focus h1 and scroll to top; on review return, focus the changed section; on history traversal, restore the actual prior focus/scroll after content is ready without fighting native restoration. Missing focus targets fall back to that section heading or h1. Preserve field values and selection where feasible. A browser-restored Review with now-invalid draft stays a readable incomplete review rather than trapping traversal. A fresh direct link without required state explains the missing answers and leads to the first incomplete step. Failed navigation keeps the existing page/controller and offers a local Retry navigation action.

In-app departure with a nonempty unsent draft shows a full-page leave decision, keeping destination and draft in memory. Focus “Keep editing” / “Tiếp tục chỉnh sửa”; it restores the prior page, field and scroll. “Discard answers and leave” / “Xóa câu trả lời và rời đi” clears the draft only when activated. No fabricated save option appears. Register browser unload protection only while loss is possible; browser wording/interception is best effort and mobile termination may bypass it. Internal Back/Forward within the retained flow does not discard and needs no leave warning. Leaving during an unresolved remote attempt uses outcome wording: discarding local answers cannot cancel a request.

## Final action, outcome and capability gates

Review shows complete active answers, optional blanks as “Not provided”, and the explanation “This sends a request. It does not confirm an appointment or workshop.” Final label: “Send request” / “Gửi yêu cầu”; earlier actions remain Continue. With the currently supplied capabilities, live sending is unavailable and adjacent copy says the answers have not been sent. A design specimen may describe states but must not simulate successful service behavior.

Before live enablement, the studio/service owner must supply a versioned contract and integration evidence for every gate below. No endpoint, provider, support route or authentication requirement is invented.

| Gate and owner | Required decision/evidence |
| --- | --- |
| Studio/content owner | Approved field bounds, bilingual pack, recipient/purpose, privacy and retention/deletion disclosure; no unsubstantiated response time |
| Service owner: effect/evidence | Exact one-request effect; matching action/operation IDs; rejection scope; receipt versus processing versus terminal outcome; request reference; status ordering/partial outcomes |
| Service owner: duplicates | Service-enforced key scope, payload equality, concurrent-tab handling, downstream coverage, retention start/expiry and documented retry permissions |
| Service owner: recovery | Authorized lookup/discovery by retained identity; consistency/missing/expired meanings; lookup/history lifetime; pacing, cancellation support or explicit absence; no automatic assumption that a missing result means unsent |
| Client/recovery owner | Approved minimal attempt-record store, lifetime/deletion and acknowledgement; no unnecessary contact payload; recovery after reload; failures before dispatch and after operation-ID mapping |

Proposed live invariant: capture immutable active payload revision A and stable action ID after final validation/review. Acknowledge the permitted minimal recovery identity before dispatch, or require contract-proven independent discovery. If that write fails with no independent recovery route, preserve the draft and block dispatch. The record proves local preparation only. Freeze answer editing while an action is pending/unknown; keep answers readable, language/appearance and safe navigation usable. Guard every sending entry point; keep Send focusable with guarded `aria-disabled` and nearby pending reason. UI guards supplement service duplicate protection.

Show “Sending request…” with a polite status announcement; keep focus stable. After a proposed 15-second local wait threshold, replace continuous activity with “We could not confirm whether your request was received.” Time passing, timeout, offline state or abort does not prove rejection or cancellation. Keep action reference, last checked time and uncertainty visible. Do not expose automatic or generic effect retry. A supported Check status action is distinct from resend, respects documented server delay, and does not steal focus on background updates. No polling cadence is promised before the service contract exists; hidden pages stop optional observation, and reconnection performs only authorized lookup.

Matching receipt evidence may say “Request received; processing is pending.” Only contract-defined terminal evidence may say “Request submitted” with its reference; neither claims the service/appointment is completed. Authoritative rejection preserves the draft and gives its exact correction/reconciliation action. Unknown/missing/expired evidence remains unknown, with no fabricated support link. Reload first recovers permitted identities and reconciles before another overlapping request; absent recovery records do not prove non-submission. Discarding answers never deletes an unresolved attempt identity; its deletion follows the approved recovery-retention contract. Changed payload is new intent and cannot be sent to evade an unresolved action. Cancellation and reversal remain unavailable unless separately contracted. Never regress a confirmed effect because later lookup fails or an older progress message arrives.

## Accessibility, checks and unresolved inputs

Use native buttons, links, labels, fieldsets/legends, landmarks and ordered progress. Keep visible and accessible action names aligned. Error focus is deliberate; routine statuses use one polite region and persistent text without duplicate summary speech. All tasks work by keyboard without hover, dragging or gestures. No automatic route changes on typing/radio selection. Motion is unselected: state changes, focus and navigation are immediate for everyone, including reduced-motion users; no effect or motion runtime is required.

Performed: selective frozen-source reading, theme comparison, and document-level reconciliation of branch, language, navigation and outcome proposals. No UI, browser, keyboard, assistive-technology, device, font, storage, service or user test occurred; no new contrast measurement occurred. Future checks must exercise both branches, invalid button/Enter submissions, linked multi-error correction, Review→service change→new group size→Review, Back/Forward with long answers, language switching with errors and unsaved work, pack/storage failure, dirty leave/return, 320px/zoom/software keyboard, Light/Dark/System/forced colors and reduced motion. With the approved service contract, test lost replies, duplicate tabs, failed pre-dispatch recovery writes, reload after receipt, expired lookup and stale evidence. Observe English- and Vietnamese-reading visitors completing correction and uncertain-outcome tasks; these are research questions, not observed findings.

Unresolved implementation gates: approved fields/bounds and Vietnamese wording; font delivery/coverage if changed; browser/AT support matrix; translation ownership; privacy/retention; minimal recovery store; complete live service/duplicate/status contract; and reuse permissions. Editing can be specified without these; live submission and durable recovery cannot be claimed.

## Source identities, credits and reuse

Atlas sources were read through the frozen case helper on 2026-10-20. This frozen working snapshot has no established Atlas repository commit in the allowed inputs; do not attribute its revised guidance to a claimed HEAD. SHA-256 identities below identify the actual relevant files. The contemporaneous helper log records selectors, source hashes and returned bytes. URLs here are inherited provenance, not fresh verification.

| Frozen path | SHA-256 |
| --- | --- |
| `skills/prepare-frontend-design/SKILL.md` | `d5528477be4f87ee4d66591e95176423d95bf2e0427d229e82dffb1b726b7d40` |
| `examples/p0-evaluation/bilingual-service/brief.md` | `a5bd0416929ba5d2a500283cf57ed67bc6d1c03c2c4aaa8c3bd9fe71f5ce6ebe` |
| `themes/botanical/design.md` | `57bb978940f0c2c98532603e40eb0207045672af715b09fdc59e9c5ef11b7f32` |
| `themes/botanical/sources.md` | `7e83b712a5e8803d673df95d85fab997f602c8906c76c4ac9691f12ccce193a2` |
| `knowledge/ui-ux-design.md` | `7bfa8b14b2529d599a9a932f1e61832e6d638556bc7684635621ef3ea81112c5` |
| `knowledge/forms-and-navigation.md` | `870844c51547c2083a5b33d97048c7fdae1bdd7850a214ae375bdc3940e93b5b` |
| `knowledge/state-and-recovery.md` | `ddd338c88cb26e5001c6209e91d4d3b53089912ac2bee68a9c3a95ba5eda7c51` |
| `knowledge/uncertain-outcomes.md` | `7977ea92734b0457dee69f041b22f88061970c83070fb85976a56e119736cb10` |
| `knowledge/accessibility-and-responsive.md` | `57e53cd66e79c67e8fb689a28846845c3f5aaca486d4310e203353c1085d8db3` |
| `references/skill-adaptations.md` | `6ef8c8770361bc95f57ac91803d470153ee95ea901df8ea4bfd309391db7fc50` |

Theme source: [Tamir — UI/UX & Frontend](https://github.com/tamir39/tamir39-portfolio), creator **Tamir (Phi Vuong Tuong Tam)**, pin `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`, Atlas review 2026-10-13. Palette/corners/focus are source values; stronger borders, semantic foregrounds and portable scale are inherited Atlas proposals. System typography, field rounding choice, route/flow/state rules, zero-motion selection and gates are this project's proposals. Portfolio implementation license was not found and Atlas publishing terms remain undecided; reference links do not authorize code/assets reuse. No implementation, artwork or font software was imported.

Original Atlas guidance is credited to Tamir with Codex AI assistance. Selected general/accessibility methods credit **Ghaida Zahran / Design with Intent**, [Journey/Evaluate](https://github.com/ghaida/intent/tree/3fc38dff381ce0e4dec8f52c97c3e37abd95e10e), CC0-1.0; **Jakub Krehel**, [better-*](https://github.com/jakubkrehel/skills/tree/4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63), copyright 2026, MIT; and **Julien Thibeaut / ibelick**, [ui-skills](https://github.com/ibelick/ui-skills/tree/f18d13077d6e3841821ea0a36526c0fd44a570b5), copyright 2026, MIT. Methods informed independent project decisions; no upstream skill prose/code or full audit workflow is reproduced. The supplied adaptation ledger records retained notices at `references/licenses/jakub-krehel-MIT.txt` and `references/licenses/julien-thibeaut-MIT.txt`; preserve their full copyright/permission notices with substantial covered redistribution. The helper rejected the first locator as ineligible; no bypass occurred. Full notice text was unavailable to this run and is not reproduced here. This allowlist limit does not change the ledger's recorded MIT terms; retrieving the applicable notices is a future distribution requirement, separate from unresolved Atlas/portfolio publishing permissions.

Standards/reference contributors: **W3C Accessibility Guidelines Working Group**, **WAI/APG contributors**, **GOV.UK Design System contributors** for forms/review/navigation; **Steve Becker** for the 2025-08-13 IndexedDB draft; **WHATWG** for HTML/Storage; **Roy T. Fielding, Mark Nottingham and Julian Reschke** for [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); **Anne van Kesteren / WHATWG** for [Fetch snapshot](https://fetch.spec.whatwg.org/commit-snapshots/e9460d1b22ead1c6a72eeac37fb2ec0dc01aeb1d/). They establish cited concepts, not project endorsement or implemented guarantees. Font provenance retained for possible future use: Manrope—Mikhail Sharanda; DM Serif Display—Colophon Foundry; JetBrains Mono—JetBrains, Philipp Nurullin and Konstantin Bulenkov. Atlas records linked Google Fonts packages under SIL OFL 1.1; actual redistributed packages need their own exact versions/notices and Vietnamese coverage checks. No such package is selected now.
