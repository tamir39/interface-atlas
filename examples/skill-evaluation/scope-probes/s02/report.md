# Request change design review

This document review found two high-priority conflicts with the brief and one missing required decision path. All findings concern the proposed behavior; none describes an observed implementation or service result.

## Findings

### P1 — Confirm can execute a proposal the operator did not review

**Location and evidence:** `design.md`, “Proposal review,” line 11, freezes the visible proposal but sends the latest shared-store proposal, explicitly permitting a different payload under the existing confirmation. `brief.md`, line 3, requires confirming the change the operator reviewed and explicitly allows changes while review is open.

**Trigger and consequence:** The operator reviews queue A → B. The store changes the proposal to A → C while the panel still shows B. Confirm then submits C. Keeping the display stable does not preserve the scope of the operator's decision; it conceals the difference and can change the wrong queue.

**Correction:** Bind the displayed review and Confirm action to one immutable proposal identity/version and its exact queue-change scope. If the current proposal or governing request revision changes, invalidate that decision, explain what changed, show the new scope, and require a new review before submission. Define how the service validates that identity/revision atomically at execution; gate confirmation if the necessary validation contract is unresolved. A local comparison alone cannot close a race between checking and sending.

**Counterevidence considered:** Freezing the display supports stable reading, but the same paragraph explicitly dispatches another version. The general native-control and focus provisions in “Presentation” do not protect decision scope. This is a brief/contract conflict, not a theme preference or a claimed standards violation.

### P1 — Cancel reports a completed stop before there is evidence of one

**Location and evidence:** `design.md`, “Work and cancellation,” line 15, sets Cancelled and removes the item before sending the cancellation request, with no acknowledgement or reconciliation. `brief.md`, line 3, requires a cancellation request, return later, and a distinction between actual results and unconfirmed requests. `evidence.md`, line 3, says cancellation acknowledgement, execution status, event ordering, and durable recovery lookup are unestablished.

**Trigger and consequence:** Activate Cancel while work is running. The request may fail to send, lose its reply, be rejected, or race with completion. Every case currently produces the same terminal-looking Cancelled state and hides the active item. The operator can leave believing the change stopped, then cannot reliably discover its actual effects on return.

**Correction:** Show “Cancellation requested” as a pending command, retain an accessible operation record and last known work state, and mark Cancelled only when an authoritative service result establishes the stop. Define distinct handling for request failure, unknown outcome, completion racing with cancellation, and confirmed cancellation with any prior effects. Preserve the action/operation identity needed to find the same work on return, and reconcile observations using the service's ordering contract. Status and recovery explanations should remain reachable after transient feedback and be exposed accessibly without moving focus unnecessarily.

**Gate:** Before enabling a remote-stop promise or promising confirmation after return/reload, establish the cancellation, authoritative lookup, retention, and ordering capabilities. If they are unsupported, describe only the supported local action and its limits. The supplied evidence does not establish that cancellation or recovery is impossible; it establishes that these capabilities cannot yet justify the proposed success state.

**Counterevidence considered:** “Validation,” line 19, acknowledges that service documentation is still needed. That is a valid open dependency, but it does not gate the unconditional success behavior in line 15. This finding consolidates the misleading terminal label, premature removal, and lost recovery path under the same unconfirmed-outcome cause.

### P2 — The required reject and edit routes have no defined behavior

**Location and evidence:** `brief.md`, line 3, gives the operator a choice to confirm, reject, or edit the proposal. `design.md`, “Proposal review,” line 11, defines only Confirm. No other supplied section defines rejection or editing.

**Trigger and consequence:** An operator inspects a proposal and disagrees with its destination or scope. The design gives an implementer no required alternative action, destination, retained context, or post-edit review rule. An essential decision path can therefore be omitted or implemented inconsistently.

**Correction:** Specify reachable Reject and Edit actions in the review context. Define what rejection changes and how any remote decision is acknowledged. Define the editable scope, preservation of the maintenance-request context, validation and cancellation of edits, and return to review showing the revised scope. Editing must invalidate the earlier confirmation and create a new reviewable candidate. Record unsupported service-dependent behavior as an explicit gate rather than implying it succeeds.

**Counterevidence considered:** “Labelled native controls” and the narrow-view rule are useful general provisions, but neither defines these actions. This is a missing project requirement, not a claim that an observed interface lacks buttons.

## Required contract decisions

No responsible owner is named in the fixture. Assign a product/design owner for the decision flow and a service/API owner for the following evidence before implementation enables the dependent behavior:

| Open input | Required evidence or decision | Dependent behavior |
| --- | --- | --- |
| Reviewed scope and concurrency | Immutable proposal identity/version, expected request revision, and service behavior on stale or changed scope | Confirm executes only the reviewed change |
| Cancellation semantics | Supported request scope, accepted-command versus confirmed-stop states, completion races, and partial effects | Truthful cancellation controls and result labels |
| Return-later recovery | Stable action/operation identity, authorized lookup, retention and expiry, authoritative result source, and reliable ordering or an explicit unresolved-state route | Finding the original work and reconciling its outcome |
| Reject/edit semantics | Local versus recorded decision, editable fields, validation and return-to-review destination | Required alternatives to confirmation |

Unknown capabilities remain unknown. These are design-contract decisions and gates, not a proposed service implementation or proof of an existing API defect.

## Coverage and limits

**Supplied material read:** all of `probes/s02/brief.md`, `design.md`, and `evidence.md`, with each read logged before its contents were printed. Atlas content was read only through the supplied frozen-snapshot reader with trial ID `probe-s02`.

**Skill actually opened and applied:** `skills/review-frontend-design/SKILL.md`. The preparation skill was not opened or invoked. No global installed skills, theme catalog, other fixtures, evaluator material, prior runs, or research ledger were read.

**Selected Atlas material:** `knowledge/README.md`; the operator-control, project-control and credits sections of `agent-experience.md`; cancellation/stale-evidence, service-contract and provenance sections of `uncertain-outcomes.md`; ownership/lifetime and sources sections of `state-and-recovery.md`; multi-step/branching and pending-control sections of `forms-and-navigation.md`; perception/status and method credits in `accessibility-and-responsive.md`; and the selected-source attribution table in `references/skill-adaptations.md`. Headings were inspected only to select these bounded sections.

**Checks actually performed:** desk walkthroughs of unchanged proposal → Confirm; proposal mutation during review → Confirm; reject/edit → revised review; running work → cancellation request; request failure or lost reply; cancellation racing with completion; interruption/return with an unresolved outcome. Nearby presentation and validation provisions were checked as counterevidence. These scenarios were reasoning over document text, not executed tests or user research.

**Appearance and input coverage:** inspected the proposed Light/Dark values, typography, native-control, focus and single-column statements only as document decisions. No rendered appearance, viewport, reflow, zoom, keyboard, pointer, touch, screen-reader, contrast measurement, accessibility conformance, or service behavior was tested. No source code, implementation, screenshots, API documentation, browser or assistive-technology evidence was supplied. The visual proposals therefore receive no measured pass or aesthetic failure.

**Changes made:** this report and the fixture-read audit log only. No corrections were implemented; no fixture document or Atlas repository file was changed. No web access, installation or deployment was performed.

## Method attribution

The findings are original recommendations grounded in the brief and supplied design. Atlas's selected guidance distinguishes its own proposals from standards and service facts. Its retained method credits include Jakub Krehel and Julien Thibeaut (focused accessibility/evidence methods, MIT), and Mohit Aggarwal and Burhan Sebin (human decision/control questions, MIT). Agent Experience also identifies Microsoft HAX as a conceptual reference. Exact source pins and notice links remain in Atlas's `references/skill-adaptations.md`; no upstream code, assets, license texts or substantial source passages are reproduced here. No WCAG conformance verdict is asserted.
