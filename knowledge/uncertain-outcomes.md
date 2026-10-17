# Uncertain outcomes, retries, and remote effects

Status: research draft for review, revision 0.2-draft, 2026-10-15. Atlas synthesis by Tamir (Phi Vuong Tuong Tam), with Codex AI assistance. Sources establish protocol facts; the design rules below are Atlas proposals requiring a project's service contract.

## When to load this chapter

Use this chapter when an interaction can create a remote or asynchronous effect: submitting a service request, saving a shared object, handing work to another system, or stopping an agent run. A purely local form does not need this machinery. Combine it with [forms and navigation](forms-and-navigation.md) for the interaction and [state and recovery](state-and-recovery.md#ownership-and-lifetime) for local retention. A locally retained draft or attempt record cannot establish a remote outcome.

## Standard facts and their limits

**Normative HTTP facts.** Safe methods have essentially read-only requested semantics; incidental effects remain possible. Idempotency concerns the intended effect of repeated identical requests, rather than one execution or identical responses. RFC 9110 defines PUT, DELETE, and safe methods as idempotent; non-idempotent automatic retries require knowledge of idempotent semantics or non-application. [RFC 9110 §§9.2.1–9.2.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.1)

202 means accepted for processing, with completion unsettled; a status monitor is recommended. 200, 201, and 204 describe request success under their respective semantics. [RFC 9110 §§15.3.1–15.3.5](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.3.3)

If-Match uses strong entity-tag comparison to condition an action; false conditions prevent application, with defined response exceptions for already-succeeded changes. 412 concerns failed request preconditions; 409 concerns conflicting resource state. Retry-After provides a follow-up delay, expressed as a date or seconds. [RFC 9110 §13.1.1](https://www.rfc-editor.org/rfc/rfc9110.html#section-13.1.1), [§15.5.10](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.5.10), [§15.5.13](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.5.13), [§10.2.3](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.2.3)

**Normative browser behavior.** Fetch rejects on network error. Aborting a fetch rejects its unsettled promise and cancels/errors relevant body streams; an already-fulfilled promise stays fulfilled. [WHATWG Fetch §5.6, inspected commit e9460d1](https://fetch.spec.whatwg.org/commit-snapshots/e9460d1b22ead1c6a72eeac37fb2ec0dc01aeb1d/#fetch-method)

**Atlas interpretation.** None of these observations alone supplies a whole application's guarantees. A method name does not verify that a service implements the expected behavior. Request success may concern an operation record while downstream work remains pending. Idempotent effect is not universal exactly-once execution. Treat rollback, duplicate prevention, terminal evidence, and retry permission as separate contract questions. A timeout, disconnected stream, or local abort supplies no proof that the service reversed work.

## Outcome states and copy

**Atlas proposal:** represent what is known about the action separately from connection freshness, local waiting, and available controls. These are evidence labels, not a mandatory single linear sequence. Requested can move directly to confirmed or rejected; accepted work can later be rejected; unknown can resolve through lookup. Partial effects need an explicit summary rather than a misleading all-or-nothing label.

| State | Evidence required | Example copy and next step |
| --- | --- | --- |
| Requested | User intent and action identity recorded locally; delivery unproven | “Submission requested.” Show the intended action. |
| Pending | A matching attempt is awaiting authoritative outcome | “Waiting for submission status.” Keep relevant controls available. |
| Accepted | Service acknowledges receipt or scheduling for the matching action | “Received; processing is pending.” Offer a supported status view. |
| Confirmed | Contract-defined final evidence identifies the actual effect | “Request submitted. Reference R…” Link the resulting record. |
| Rejected | Authoritative refusal/failure identifies this action and its scope | “Submission was declined: …” Explain correction or review. |
| Unknown | Available evidence cannot establish the outcome | “We could not confirm submission. Check status before submitting again.” |

Use “failed” only with a stated scope. A status lookup can fail while an accepted operation continues. Do not replace confirmed historical effects with a generic error because a later refresh fails. An unknown outcome remains visible after a toast disappears, alongside its reference, last checked time, and supported next step. Copy must distinguish “nothing applied” from “some steps applied” whenever the service can establish that difference.

## Service-contract worksheet

Complete this worksheet in the project's design document before promising recovery. Record an owner, documentation or contract revision, and verification evidence for every answer. “Unknown” and “unsupported” are valid answers; they constrain the interface.

Gate promises explicitly: unsupported lookup prevents a promise of reload confirmation; unknown duplicate protection prevents automatic retry after an ambiguous outcome; unsupported cancellation prevents a remote-stop promise. If revision checking is unavailable, record the concurrency limitation and reconciliation route before proposing shared editing. A polished pending indicator cannot fill a missing service capability.

| Contract question | Project decision to record |
| --- | --- |
| What is the effect? | Exact target, actor/account scope, side effects, and whether work spans multiple steps or services. |
| What identifies intent? | Stable action ID; separate proposal ID and proposal version when approval is involved; resource revision used for the decision. |
| What identifies an attempt? | Correlation of each transport attempt with the same action; service operation ID when issued. |
| What prevents duplicates? | Service-enforced mechanism, key scope, concurrency behavior, and whether downstream effects are included. |
| How long is protection retained? | Retention start, expiry, reuse behavior after expiry, and operation-history lifetime. |
| What happens if payload changes? | Which fields define equality, mismatch rejection behavior, and whether a changed intent requires a new action. |
| What proves a terminal result? | Authoritative source, terminal states, effect reference, partial-effect explanation, and freshness/version rules. |
| How is status recovered? | Lookup by action/operation ID, permissions, consistency lag, retention, and meanings of missing or expired records. |
| How is observation paced? | Local wait threshold, poll/push/reconnect policy, server-directed delay, stale/last-observed presentation, stop-waiting and reconciliation escalation. Elapsed time alone proves no remote failure. |
| What may be retried? | Eligible errors, same-action conditions, limits, delay/backoff policy, and the point requiring human reconciliation. |
| What does cancellation mean? | Request scope, acknowledgement versus confirmed stop, race with completion, reversibility, and unsupported cases. |

Stable identity joins a user's reviewed intent to subsequent evidence. Keep the action identity across retries of that same intent, according to the contract; record a new attempt separately. A new key generated on every click defeats a mechanism that recognizes retries by key. Conversely, reusing one key for a changed target or payload can conceal a new intent or produce a conflict. An idempotency key is a contract mechanism, not a guarantee created by naming a header.

A proposal version identifies what the user approved. A resource revision identifies the state that action expected. Neither substitutes for the other or for duplicate prevention. If a proposal changes, require review of the changed proposal before executing it. Avoid storing unnecessary sensitive payloads merely to preserve correlation; specify a minimal, authorized recovery record and its lifetime.

## Dispatch and changed intent

**Atlas proposal:** preserve the immutable submitted snapshot and its action identity separately from the editable draft. Editing creates proposed new intent; it does not alter, cancel or resolve an unresolved action. Before enabling a new action, determine whether its consequence overlaps the unresolved one. Reconcile first or use a specifically documented product/service policy with an accurate explanation of possible multiple effects. A fresh key and another review do not prevent both actions from completing. Keep the original reference and outcome visible independently.

When reload-safe outcome recovery is required, establish an acknowledged minimal recovery identity before dispatch, or use documented authorized service discovery that works independently of the lost reply. Apply the [local acknowledgement boundary](state-and-recovery.md#save-snapshots-and-completion) when a browser record supplies that identity. If retention fails and no independent route exists, gate the effect or explicitly choose a reduced capability whose loss/duplication limits are acceptable to the project; do not retain the recovery promise. Also define failure behavior for later action-to-operation-ID mapping updates. A prepared local entry proves neither delivery nor non-delivery; local retention and the remote effect are not one transaction.

## Safe retry and recovery

**Atlas proposal:** choose the next action using evidence, not a generic “Try again” control.

1. Correlate the observation with the action, payload, and attempt. Reject evidence for an unrelated target, account, action, or proposal version. A delayed authoritative reply from an earlier attempt can settle the same action across retries; apply the contract's freshness/ordering rules and prevent stale state regression.
2. Use an authorized status lookup when available. A confirmed result ends recovery; accepted/pending results keep the operation visible. An authoritative rejection is handled according to its documented scope.
3. Interpret missing status according to the contract. Replication delay, expired history, access changes, and “never received” must not share an assumed meaning. If the service cannot distinguish them, keep the outcome unknown.
4. Retry only when the documented semantics establish acceptable repeated effects or establish that the original action was not applied. Check key retention and payload equality before reusing the action. Apply the contract's attempt limit and pacing; a waiting interval does not itself make repetition safe.
5. Otherwise offer status review, a reference to give support, or another documented reconciliation route. If none exists, state that the outcome cannot be confirmed and leave retry unavailable for that action. Do not invent a recovery route.

After reload or reconnect, recover unresolved action identities from the permitted recovery record, reauthorize lookup, and reconcile before enabling a repeat submission. A local “pending” record is a reminder to investigate, not remote truth. If recovery data was never retained or has expired, say what can still be checked. Reopening the form must not silently create a new action from an unresolved submission.

Specify observation separately from effect retry: the local waiting threshold, supported status-check cadence/backoff, reconnect and hidden-page behavior, last-observed time, stale copy, and when to expose a supported reconciliation route. Respect documented server delays. After a local threshold, replace an indefinite active spinner with truthful delayed/unconfirmed feedback and safe controls; time passing cannot establish failure or authorize another effect. If lookup or escalation is unsupported, say so instead of inventing it.

Use a client button guard to prevent accidental rapid activation and explain the pending state. Service duplicate prevention must also handle another tab, device, reconnect, or direct request. An interface cannot promise protection that exists only in one component's memory. Prefer a specific “Check status” control when that action is supported and useful.

## Cancellation and stale evidence

**Atlas proposal:** distinguish three actions: stop waiting locally, request remote cancellation, and reverse a completed effect. Describe the available one before activation. “Stop waiting” may end observation while work continues. “Request cancellation” remains pending until the service establishes its result. Rollback or compensation needs its own scope, authority, outcome, and recovery design.

When completion races with cancellation, retain both command history and the final effect. “Cancellation requested” cannot replace a completed operation with “Canceled.” A confirmed stop can still leave earlier effects; report them. If stopping is unsupported, the control should explain the available alternative instead of simulating success.

Reconcile updates by identity and documented ordering. Ignore an older progress update for the purpose of replacing a newer known state; retain useful evidence for review. Arrival order and client clocks are insufficient when the service supplies no reliable ordering. If two observations contradict each other and cannot be ordered, show the inconsistency and seek authoritative status rather than inventing a final outcome.

For revision conflicts, preserve the user's draft, obtain current authorized state, and explain the conflict before a new decision. Do not automatically overwrite newer work or replay a previously approved action against a changed resource. Apply the contract's concurrency check; a local version counter alone does not protect remote state. See [concurrent edits](state-and-recovery.md#concurrent-edits).

## Feedback and operator attention

Keep outcome text, evidence links, and controls together. Explain why repeat submission is unavailable without removing access to status or other safe actions. Use the [pending-action and available-control guidance](forms-and-navigation.md#pending-actions-and-available-controls) for accessible announcements and ordinary focus preservation, and [validation and error recovery](forms-and-navigation.md#validation-and-error-recovery) for deliberate recovery targets. Routine progress updates should not take focus. A user-initiated navigation, dialog closure, or correction flow needs a defined target and return path.

## Hypothetical cross-domain cases

These cases illustrate decisions to specify; no service behavior is asserted.

- **Submit a service form:** the user sends one request and loses the connection. Retain its action reference, show unknown outcome, and check the service's supported lookup before offering another submission. Preserve editable draft content without presenting it as proof of non-submission.
- **Save a cart handoff:** a shared cart snapshot is sent to another system. “Handoff accepted” concerns that snapshot and version. A later cart edit requires a fresh review; a saved cart or downstream link alone does not prove the intended handoff finished. Payment and provider implementation are outside this chapter.
- **Cancel an agent:** a stop command is acknowledged while execution events disconnect. Display the command as accepted and execution freshness separately. Confirm stopped only from service evidence; disclose known completed effects. If cancellation is unsupported, say so before presenting a stop control.

## Desk-review validation scenarios

Before implementation, walk each scenario through the worksheet, copy, and recovery decision:

- Double activation followed by a second tab: identify both transport attempts, the service's duplicate boundary, and the visible pending state.
- Service applies the action but its reply is lost: find a route to the original result without creating a new intent.
- Request never arrives, versus lookup temporarily missing or history expired: justify every distinction the interface claims.
- Reload after acceptance; later rejection or partial completion: retain references, preserve drafts, and report the actual scope.
- Same action/key with a changed payload, or a retry after retention expires: demonstrate the explicit gate and next review step.
- Edit the draft while an earlier action remains unknown, then request a new overlapping action: preserve both snapshots and show the reconciliation/consequence gate.
- Lose or deny the recovery-record write before dispatch, or fail its operation-ID mapping update: identify the independent recovery route or blocked promise.
- Exceed a local wait threshold or receive repeated missing/stale status: show truthful delayed feedback, bounded observation and no invented retry permission.
- Old progress arrives after confirmation; cancellation races with completion; conflicting resource revision arrives: identify authoritative evidence and avoid silent regression or overwrite.
- Status updates while a keyboard or assistive-technology user reads or edits: specify announcement, focus, persistent evidence, and available controls using the linked forms guidance.

These are proposed desk-review checks. Source inspection does not establish working service behavior, browser behavior in a project, keyboard operation, or assistive-technology support. Implementation and integration evidence remain required before a project can claim those outcomes.

## Provenance and reuse

Full source metadata and inspected reuse terms belong in [P0 research references](../references/p0-research.md#uncertain-outcomes-sources). RFC 9110 is an IETF standard edited by Roy T. Fielding, Mark Nottingham, and Julian Reschke. Fetch is written by Anne van Kesteren and maintained by WHATWG. They are references, not endorsers of Atlas. This chapter contains original synthesis and hypothetical examples; no source code, assets, or source prose is reproduced. HTTP document terms and Fetch's prose license are recorded separately from any code-component terms.
