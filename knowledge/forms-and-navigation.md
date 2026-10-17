# Forms and navigation

Status: P0 research draft for review, revision 0.2-draft, 2026-10-15. Original Atlas synthesis by Tamir (Phi Vuong Tuong Tam), with Codex AI assistance. External authors are credited references, not endorsers. No source code, assets, or wholesale pattern text is incorporated.

## When to load this chapter

Load when a design involves editable input, validation, modal editing, multiple steps, review/change loops, unsaved work, navigation restoration, or interrupted sessions. A local calculator or browser-only journal can need these decisions without a backend. Consult [state and recovery](state-and-recovery.md) only when state ownership or persistence matters; consult [uncertain outcomes](uncertain-outcomes.md#safe-retry-and-recovery) when a remote action may have taken effect without a confirmed response. A spinner alone does not establish that condition.

**Evidence boundary.** WCAG success criteria are normative requirements at their stated conformance levels. Understanding documents explain them; WAI tutorials and APG offer informative implementation guidance. GOV.UK describes tested government-service conventions whose applicability to another product needs judgment. The decisions marked **Atlas proposal** below are original synthesis, not standards requirements. [WCAG 2.2](https://www.w3.org/TR/2024/REC-WCAG22-20241212/), [Understanding documentation](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), and [APG introduction](https://www.w3.org/WAI/ARIA/apg/about/introduction/).

## Inputs and validation timing

WAI recommends labels associated with controls, using native HTML labels where possible. The visible label, accessible name, hint, requiredness, and error serve different purposes. An accessible name alone does not supply instructions visible to everyone; WCAG 3.3.2 also applies to optional fields. [WAI labels](https://www.w3.org/WAI/tutorials/forms/labels/), [Understanding 3.3.2](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html).

**Atlas proposal:** Record each input's accepted meaning, required/optional status, format examples, bounds, normalization, grouping, and available control semantics. Keep a persistent visible label as the usual choice; placeholder content can add an example. State why a constrained format is necessary. Preserve entered text through correction, and explain any consequential transformation. Do not use numeric semantics merely because an identifier contains digits.

WAI advises accommodating reasonable input formats and distinguishes convenient client validation from security at a server boundary. For a form that sends data to a server, client checks alone cannot protect that boundary. This does not require adding a server to a client-only tool. [WAI validation](https://www.w3.org/WAI/tutorials/forms/validation/).

**Atlas proposal:** Choose validation timing by error cost. Validate a submitted step before advancing; allow incomplete drafts to remain editable. Validate during typing only when feedback is useful immediately, such as a visible length limit, without treating every intermediate value as an error. If checking on blur, avoid stealing focus or producing an error before a meaningful attempt. After an error, define when correction clears it. Distinguish syntax checks, cross-field rules, and remote eligibility checks; a remote check's pending or unavailable result is not proof that the input is wrong. If input changes while a check runs, the result must correspond to the current value before it is shown as authoritative.

## Validation and error recovery

WCAG 3.3.1 requires an automatically detected input error to identify the affected item and describe the error in text. WAI describes both overall and field-level feedback, including a linked error list and programmatic relationships between a field and its message. [Understanding 3.3.1](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html), [WAI notification](https://www.w3.org/WAI/tutorials/forms/notifications/).

**Atlas proposal:** A failed submission retains the user's values, selection where feasible, and a path to correction. Describe the problem and the accepted next action near the field; do not rely on a red border. Associate the message with the control, expose invalid state appropriately, and remove stale associations when corrected. For several errors, a summary can explain the failed attempt and link to exact controls or a meaningful first control in a group. Match summary and inline wording.

GOV.UK requires a focused summary for every validation failure in its system. Atlas treats that as a strong comparative pattern, not a universal WCAG requirement: a small inline edit may use one associated message and a documented focus target. If using a summary, move focus after the failed attempt, keep it visible, and make its links work with keyboard and zoom. Choose between focused feedback and live announcements deliberately; test for repeated or missing speech. [GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/).

An unavailable service, lost permission, storage failure, and unknown remote outcome need their own recovery text. They should not mark a correct field invalid. Where relevant, retain the draft and resolve the action under the appropriate state or outcome contract.

HTML interactive validation can stop submission before the submit event; the browser may report and focus an invalid control. [HTML constraint validation](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constraint-validation), [submission algorithm](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission-algorithm).

**Atlas proposal:** choose the owner of interactive validation feedback and focus. A native-feedback path must account for invalid events and browser behavior. A custom-feedback path must arrange for its full error collection, associations and summary to run without competing native feedback; defining it only in a submit handler is insufficient when native validation blocks that event. Record whether/how native interactive validation is suppressed while retaining useful input semantics and server checks. Do not prescribe novalidate universally. Cover the submit button, Enter/implicit submission, scripted entry points and inactive branch controls under the same decision.

## Pending actions and available controls

WCAG 4.1.3 addresses status messages that can be presented by assistive technology without moving focus. Its scope does not turn every new content region into a live announcement. [Understanding 4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).

**Atlas proposal:** For an ordinary pending save, keep the editing context stable, show a truthful status, prevent duplicate activation at the action boundary, and define what remains editable. Preserve a useful focus destination through success and failure. A failure should leave a persistent explanation and reachable recovery action; background completion should not pull focus away from unrelated work. If the action explicitly navigates or opens a dialog, specify that new context separately. If editing remains available, bind completion to the submitted candidate: success for A cannot clear later edit B, replace B, or automatically close its editor. Define the dirty baseline and completion ordering using [save snapshots](state-and-recovery.md#save-snapshots-and-completion). For remote ambiguity, use the [outcome distinctions](uncertain-outcomes.md#outcome-states-and-copy).

Native `disabled` controls leave the tab sequence; disabled form controls are excluded from constraint validation and the form submission entry list. `aria-disabled` conveys unavailability but requires application behavior to suppress activation. It can retain discoverability and focus. APG discusses this tradeoff rather than prescribing one choice everywhere. [HTML disabled controls and submission](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#enabling-and-disabling-form-controls:-the-disabled-attribute), [ARIA disabled state](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled), [APG keyboard guidance](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls).

**Atlas proposal:** Choose per control. A temporarily unavailable pending action may stay focusable with guarded `aria-disabled`; cover keyboard, pointer, implicit form submission, and alternate action entry points. Native disabling may suit an unavailable field, but record its effect on focus and submitted values. Put the reason nearby. Never promise that styling or an ARIA attribute alone blocks the operation, and avoid disabling an entire form when users still need to read or correct it.

## Modal editing and dirty exit

APG's modal pattern places focus inside, contains Tab navigation, provides an accessible name and visible closing control, closes with Escape, and ordinarily returns focus to the invoker or a logical workflow destination. Native HTML `dialog` provides modal showing and focus behavior, but initial focus still needs deliberate selection. Native close requests and unconditional closing are different paths. [APG modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [HTML dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element).

**Atlas proposal — same-dialog dirty confirmation:** For a bounded editor whose work would be lost, clean Cancel/Escape closes directly. A dirty close request changes the contents of the existing named dialog to a confirmation state. Keep the draft in memory, make editor controls temporarily inactive, and focus **Keep editing**. That action, or Escape in this confirmation state, restores the editor and its last usable editing focus; **Discard changes** closes and returns focus logically. Do not show a second stacked dialog for this proposal. Define backdrop and close-button behavior consistently with the same close request.

This Escape sequence is an explicit Atlas adaptation: it differs from immediate close in APG and needs evaluation for comprehension. It is not a claim that native dialog cancellation can always be prevented. Specify handling for native cancel/close events, forced closure, missing opener, pending saves, and a full-page alternative when modality cannot be supported. A dialog close is not evidence of save success or remote cancellation. Re-authentication and unknown pending work require separate decisions.

## Multi-step and branching forms

WAI recommends logical step groups, recognizable optional stages, recurring instructions, and understandable progress. WCAG 3.3.7 covers repeated information in the same process, subject to its exceptions; its Understanding document explicitly does not require storing answers between sessions. Changing a control value must not unexpectedly change context without advance advice under 3.2.2. [WAI multi-page forms](https://www.w3.org/WAI/tutorials/forms/multi-page/), [Understanding 3.3.7](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html), [Understanding 3.2.2](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html).

**Atlas proposal:** Model steps as a flow with named destinations and branch conditions, not merely a counter. Define what constitutes a draft versus a valid step, what Back preserves, and whether jumping ahead is allowed. Report exact totals only when the route is known; conditional questions may change them. If an earlier answer makes later answers irrelevant, decide whether to retain them as inactive draft or clear them with explanation. Exclude irrelevant answers from final review/submission, and revalidate dependent answers when the branch changes. A hidden field must not become an unreachable blocker.

GOV.UK's check-answers pattern pre-populates edited answers, returns users directly to review, and asks newly required questions before returning when an edit changes the journey. This is useful comparative service guidance. [GOV.UK check answers](https://design-system.service.gov.uk/patterns/check-answers/).

**Atlas proposal:** Preserve a review-return destination when entering an editor. After a valid edit, restore review near the changed section with a logical focus target; disclose new omissions or changed consequences. Keep a clear final action separate from intermediate Continue. Select review, correction, reversibility, or confirmation in proportion to consequences. WCAG 3.3.4 offers alternative safeguards for its stated legal, financial, data, and test-response scope; it does not require a confirmation dialog on every save. [Understanding 3.3.4](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html).

## Navigation, focus, and scroll

GOV.UK's Back component returns to the actual previous page in its prior state. Browser history is a separate navigation surface: HTML defines Back/Forward traversal and automatic/manual scroll restoration. Focus order must preserve meaning and operation, but WCAG does not select a universal SPA router or one focus target for every route. [GOV.UK Back](https://design-system.service.gov.uk/components/back-link/), [HTML history](https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-history-interface), [Understanding 2.4.3](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html).

**Atlas proposal:** Specify full document loads, client transitions, fragments, review-return links, and history traversal separately. For a new logical page, choose a meaningful title, destination heading/main region or other justified focus target, scroll position, and loading/failure behavior. For Back/Forward, choose how form answers, filters, selected records, scroll, and focus are restored without fighting the browser's restoration. Preserve fragments and deep-link destinations. If an old target disappeared, choose the nearest logical context. A failed route must provide a reachable recovery path rather than leaving focus on removed content. Avoid creating duplicate history entries or rewriting traversal merely to imitate a prescribed workflow. These are project contracts to implement and test, not browser behavior demonstrated by this document.

## Unsaved work, resume, and expiry

An in-app dirty-navigation decision can show product-specific consequences. Browser-level unload prompts have platform restrictions, including activation conditions and browser-chosen wording. Chrome's lifecycle guidance warns that termination events cannot reliably protect data, particularly on mobile, and recommends attaching `beforeunload` only while unsaved work exists. [HTML unload checks](https://html.spec.whatwg.org/multipage/browsing-the-web.html#check-if-unloading-is-canceled), [Chrome lifecycle guidance](https://developer.chrome.com/docs/web-platform/page-lifecycle-api#the-beforeunload-event).

**Atlas proposal:** Define dirty state and the transitions that risk actual loss. Explain what leaving loses; offer continue editing, discard, or a supported save. Account for reload, tab close, external links, and browser traversal without promising interception. Treat an unload prompt as additional protection. Durable draft mechanics belong in [state and recovery](state-and-recovery.md), with the product's real limits.

Save/resume is a capability decision: identify what is retained, for how long, where resumption works, how it is found, and which sensitive answers are excluded. An explicit save needs evidence before claiming completion. Session authentication expiry and draft lifetime are separate; after re-authentication, disclose what can actually be restored. For content-imposed time limits, evaluate WCAG 2.2.1's turn-off, adjustment, extension, and exception provisions rather than assuming security removes all obligations. [Understanding 2.2.1](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html).

## Handoff into design.md

Resolve relevant fields locally so implementers need not infer them from this chapter:

| Field | Required project decision when applicable |
| --- | --- |
| Input contract | Labels/names, grouping, hints, requiredness, formats, bounds, normalization, validation timing, native/custom feedback and focus ownership, implicit submission and authority |
| Recovery contract | Value retention, inline messages, summary/error focus, announcement mechanism, retry and corrected-state behavior |
| Action contract | Pending scope, editability, duplicate guard, disabled semantics, candidate-bound success, newer-draft retention and focus destination |
| Flow contract | Step/branch rules, obsolete answers, review/edit return, final action and consequence safeguards |
| Navigation contract | URLs/history entries, Back/Forward, focus/scroll/title, deep links, missing destinations and failed transitions |
| Exit/session contract | Acknowledged-candidate dirty baseline, all close paths/Escape, save/resume capability, expiry warning, retained answers and known loss limits |
| Evidence contract | Source/adaptation attribution, performed checks, unsupported capabilities, planned browser/AT/user checks |

## Bounded review scenarios and remaining evidence

Desk-review these proposed paths: (1) submit two errors, correct one, follow the remaining summary link; (2) edit while a check is pending and receive an obsolete result; (3) request dirty close, Keep editing/Escape, then discard; (4) change a branch from review and answer the new required question; (5) go Back/Forward to a long step with restored answers and scroll; (6) encounter session expiry with both a saved draft and later unsaved edits; (7) submit an invalid native-constrained form through a button and Enter under the chosen feedback/focus policy; (8) save A, edit B while pending, then receive A success or failure without losing B. Trace the intended state, visible text, available actions, focus, and loss boundary. These are coverage questions, not executed acceptance results.

Performed here: primary-source inspection and comparison with the consumer/storefront coverage findings. No application, fixture, router, persistence layer, browser interaction, keyboard run, screen-reader run, zoom test, mobile lifecycle experiment, or usability study was executed. Modal announcements, cancel behavior, error links, restored focus/scroll, input-method behavior, and interrupted-session recovery remain unvalidated in actual target combinations.

Source identities, observed revisions, document-specific reuse terms, and inspection limits are in the [P0 source ledger](../references/p0-research.md#forms-and-navigation-sources). This chapter references concepts and proposes adaptations; its citations do not grant blanket permission to copy external implementations.
