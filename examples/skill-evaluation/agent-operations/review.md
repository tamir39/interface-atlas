# Relay Desk document review

Reviewed 2026-10-17 against the supplied fictional brief using the opt-in `review-frontend-design` skill. This is a review of proposed decisions, not an observation of working behavior. The draft and Atlas files were not changed.

## Actionable finding

### P2 — Complete the persisted rejection lifecycle before enabling it

**Location:** `examples/skill-evaluation/agent-operations/first-draft.md`, **Proposal review and changing intent**, the paragraph beginning “Review changes validates included fields,” especially “Reject this proposal records that decision only through a supported decision store” and “Show ‘Rejection not recorded’ on failure and retain the proposal.” Also the subsequent **Confirm queue and assignee changes** activation checks and **Capability gates and open owner inputs**.

**Reason and governing concern:** The brief requires a meaningful choice between rejection and confirmation, including truthful status after interruption. A stored rejection is itself a remote decision. Its unresolved or successful result must govern whether the same reviewed proposal can still be confirmed. This is a missing product transition/remote-outcome contract, supported by the selected Atlas state-transition and Agent Experience guidance; it is not a claimed WCAG violation or an aesthetic preference.

**Trigger:** Review proposal version A, choose **Reject this proposal**, and let the decision store record it while its reply is lost. The rejection-specific rule permits “Rejection not recorded” and retains the proposal, but does not distinguish a proven non-write from an unknown result. No rejection-specific rule says what happens to A's reviewed candidate during this uncertainty or after confirmed rejection. If the operator returns to confirmation, A's draft, proposal and request versions can still match the stated activation checks. A successful rejection also has no defined local transition that retires the reviewed candidate or explains how A appears on return.

**Consequence:** An implementer could tell the operator a rejection was not recorded when it was, or leave a path to apply a proposal the operator has rejected. This is a document ambiguity with a material decision consequence, not evidence that either event occurred.

**Counterevidence considered:** The draft correctly names the proposal version in rejection confirmation, requires a supported decision store, keeps rejection separate from cancellation, checks authority at effect confirmation, and has extensive generic dispatch/recovery rules. All live controls are gated in the current prototype. Those safeguards reduce present exposure. However, the generic overlap guard is expressed in terms of queue/assignee effects; the document does not explicitly extend it to a pending rejection versus confirmation of the same proposal. A supported store alone does not specify the rejection outcome boundary or candidate retirement. The current non-executing gate makes this P2 design work before enablement, rather than an observed production incident.

**Bounded correction:** Extend the existing action contract to persisted rejection rather than creating a second ad hoc mechanism:

- Bind the rejection to an immutable proposal ID/version and current decision authority. Specify when its command is pending, authoritatively recorded, authoritatively not recorded, or unknown; reserve “Rejection not recorded” for evidence that establishes that result.
- While rejection is unresolved, preserve its identity and block conflicting confirmation and repeat rejection for that version until reconciliation, unless product/service owners explicitly define another coherent conflict policy. Route interruption and re-entry through the existing recovery mechanism.
- On confirmed rejection, invalidate the reviewed candidate, show the recorded decision and define the request's attention/next-action state. Prevent Back, recovered drafts or late review responses from silently restoring that candidate as confirmable. If reopening a rejected proposal is desired, make it an explicit supported action requiring fresh review.
- Add a decision-store/product owner input covering acknowledgement, lost-reply discovery, duplicate/conflicting decisions and rejection-versus-confirm ordering. Keep persisted rejection unavailable until those inputs and the corresponding transitions are specified and verified.

## Open inputs

The draft's explicit capability gates are appropriate. No API, success, cancellation, persistence or recovery guarantee should be inferred from this review.

| Proposed owner | Required evidence or decision |
| --- | --- |
| Product/decision-store owner | Close the rejection lifecycle above, including whether a rejected proposal can be reopened and how a new version differs from the rejected one. |
| Product/security and integration owners | Supply real identity, authority, eligible values, atomic revision checks, field/secondary-effect semantics and authoritative partial/final outcomes already listed in the draft. |
| Execution/recovery/cancellation owners | Supply correlation, duplicate protection, lookup/discovery, retention, event ordering and cancellation-race contracts before enabling their dependent controls. |
| Application owner | Choose actual storage, acknowledgement/loss/concurrency behavior and recovery-record handling before any durable-draft or reload-recovery claim. |
| Product/research and accessibility owners | Provide representative request content and intended operator/browser/assistive-technology contexts; perform the proposed usability and implementation checks. Named people and actual evidence are not supplied. |

These are unresolved inputs, not additional findings that the document must invent backend behavior to satisfy. The optional future durable-draft capability remains gated; its unimplemented service/storage details are not treated as established defects.

## Coverage and evidence limits

**Material read:** repository `AGENTS.md`; the review skill and its `references/state-transitions.md`; the supplied brief and full first draft; `knowledge/README.md`; selected sections of `knowledge/uncertain-outcomes.md` (**Outcome states and copy**, **Dispatch and changed intent**), `knowledge/agent-experience.md` (**Resolve project control questions**), `knowledge/state-and-recovery.md` (**Replacement and stale writers**), and `knowledge/accessibility-and-responsive.md` (**Controls, meaning, and focus**, **Adaptation with real content**). Chapter heading lists were used only to select those sections. Repository reads used the supplied sequential helper with trial ID `review-operations`; its `read-events.jsonl` is the read record.

**Document paths inspected:** list scanning and combined filters; stable selection/order and list/detail return; evidence/current-versus-proposed distinction; included-field editing and no-change validation; review invalidation after edits or upstream changes; rejection and confirmation; duplicate activation and overlapping changed intent; lost confirm/cancel replies; partial effects, cancellation races and stale/contradictory observations; dirty exit; reload/re-entry with missing/expired recovery identity; optional saved-candidate versus newer-draft acknowledgement. The concrete gap above concerns rejection. The main confirmation path already explicitly requires immutable reviewed scope, authority/revision checks and atomic service preconditions; those protections were not reported as missing.

**Visual and input decisions inspected on paper:** Light/Dark/System rules, opaque color roles, type/fallback rules, focus and status semantics, native controls, dialog/error/navigation focus, the proposed desktop split and narrow route, wrapping and 320px reflow, reduced motion and the stated zoom/forced-colors checks. These are specified intentions. No theme replacement or subjective style finding is proposed. The documented breakpoint remains a hypothesis to check with real content.

**Not performed:** source/implementation inspection; rendering or viewport/appearance screenshots; color calculation on rendered combinations; browser, pointer, keyboard, screen-reader/other assistive-technology checks; service calls; storage or reload experiments; user research; performance measurements; license/asset verification; implementation of corrections. No implementation, real service, browser/AT or research evidence was supplied. Inherited theme contrast records and the draft's future validation list are not evidence of successful execution or accessibility conformance. No numerical design score or usability validation claim is made.

**Method provenance:** This review applies the supplied Interface Atlas review workflow and the narrowly selected Atlas guidance. The first draft retains its own Precision and upstream method/source credits. No upstream software, assets or complete workflow was copied into this review.