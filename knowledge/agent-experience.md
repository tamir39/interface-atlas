# Agent Experience

Status: **0.3-draft for review**, researched 2026-10-27; control-boundary review 2026-11-05. Original Atlas synthesis for **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. Use when a product exposes agent work to a person. Select the sections needed for a concrete interaction; this chapter is not an agent runtime, permission policy or service guarantee.

## Set expectations before delegation

Explain the supported objective, relevant inputs, intended outputs, affected targets and available control before work starts. Identify which actions require a human decision and which may proceed under the project's actual authority. Show important limitations where they affect a choice, rather than promising general competence from a model name or an agent label.

When capability, target or scope changes, identify the change and its consequence for existing work or decisions. Keep a supported manual or correction route discoverable. Whether a control exists and what it can change are service facts; unresolved capabilities need an owner and an enablement gate in the project handoff.

## Make activity understandable

Show the objective, observed activity, relevant evidence, outputs and available controls. Separate an agent's explanation from a retrieved record, tool result or confirmed effect. Present progress measurements only when supported by a meaningful source and denominator.

Keep these dimensions distinguishable without requiring a particular set of badges or layout:

| Dimension | Question the interface answers |
| --- | --- |
| Execution observation | What work or effect is actually established, and by which source? |
| Human attention | What needs a person's input or decision, and for which request? |
| Control command | What was requested, accepted, rejected or remains uncertain? |
| Connection freshness | When was this state observed, and can it currently be refreshed? |

Losing a stream does not establish execution failure. A protocol task marked cancelled may still be executing under a best-effort cancellation contract; identify what that status actually proves before describing work as stopped. Use [uncertain outcomes](uncertain-outcomes.md#cancellation-and-stale-evidence) for effect history and recovery, rather than deriving guarantees from a status label.

## Compose an inspectable decision

**Atlas proposal:** place the information needed for a consequential choice with its actions. Let people expand supporting detail without hiding the target, material changes or consequences of the available choice.

| Decision content | Resolve for the project |
| --- | --- |
| Proposed effect | Target/account scope, meaningful before/after change, dependencies and known consequences. |
| Decision identity | Exact proposal/version and resource revision being reviewed. A changed proposal needs review before execution; resource changes also follow the project's documented revalidation/review path. |
| Evidence | Relevant authorized records/artifacts, their source and observation time; distinguish a proposed rationale from verified facts and disclose important gaps. |
| Available choices | Which parts can be edited or selected independently, what declining means, and whether a supported manual route exists. |
| Boundary of the decision | What this decision authorizes or supplies, how long it remains applicable and which later effects require another decision. |

Do not imply partial approval when the service can only accept the whole proposal. Editing can produce a new proposed version; it does not amend an already dispatched effect. Reuse [the immutable-intent and authority questions](uncertain-outcomes.md#service-contract-worksheet) for those boundaries.

An input request, permission decision and external sign-in are different interactions. For example, the inspected MCP elicitation specification distinguishes accepting supplied information, declining it and dismissing the request; those response names do not establish a general application authorization model. Opening an external flow is not proof that its task finished. Describe the purpose, destination and actual return evidence for a chosen handoff.

## Preserve operator control

Offer input, correction, dismissal and execution controls only where supported. Show their scope and pending outcome. A submitted decision, an accepted command and a confirmed operation remain distinct.

If a control-command reply is lost, keep its identity/scope and outcome unresolved. Refreshing run observations can establish activity or effects without establishing command receipt. Apply the command-specific reconciliation or documented repeat-policy decision from [uncertain outcomes](uncertain-outcomes.md#safe-retry-and-recovery); a publish lookup does not imply cancellation lookup or safe cancellation repetition. Keep supported observation and unrelated work available.

Keep editing or declining one proposal separate from changing a broader delegation scope. Record whether feedback is used only for this interaction, saved as a preference or used for later improvement, according to the product's actual data behavior. Do not promise that a correction trains or permanently changes an agent merely because the interface accepts text.

## Make steering applicability explicit

**Atlas proposal:** explain where a correction can take effect: the current draft, remaining work, a future attempt or a supported reversible effect. State what has already happened and cannot be changed by that correction.

Keep the operator's editable correction, its submitted snapshot, acknowledgement and evidence of application distinguishable. Retain the correction if sending fails. If the reply is lost, show its unresolved status and use P0's documented recovery decision before another overlapping change: original-action reconciliation or a specifically supported product/service policy. Do not invent safe repetition. A later event mentioning the same subject is insufficient evidence that the submitted correction governed it.

When steering is accepted but its applicability changes, expose whether it was applied, superseded, rejected or remains unconfirmed, using the service's actual evidence. Preserve the original submitted scope. A newly submitted correction does not retrospectively withdraw an earlier approved action. Use [dispatch and changed intent](uncertain-outcomes.md#dispatch-and-changed-intent) for overlap and [forms/navigation](forms-and-navigation.md#pending-actions-and-available-controls) for editable and pending controls.

## Resolve project control questions

Use the existing P0 chapters for action identity, dispatch, lost replies, retries, ordering and retention. Add only the agent-facing decisions that apply:

- What may be suggested, changed or executed; who may decide; and what important limitations must be understood before delegation?
- Which proposal/target/version and current resource state bind the decision? What must be shown again when they change?
- Which corrections can affect which remaining work, and what proves their application?
- What does rejecting, dismissing, leaving, cancelling or reversing actually do in this product?
- What evidence and unresolved choices must remain understandable after interruption or return?

Do not invent confidence percentages, completion estimates, automatic approval tiers or an approval-volume budget. These are project design questions, not a policy engine.

## Manage decision attention

**Atlas proposal:** define how each request becomes discoverable and stays understandable while its run and other requests continue. Keep the request's attention state separate from the run state and from a pending decision command.

| Situation | Behavior to specify |
| --- | --- |
| A new request arrives while someone reads or edits | Surface its identity and relevance without taking focus or replacing the current content. |
| Someone dismisses a notification | Define the local presentation effect and a route back to the underlying request. Dismissal alone does not decline, approve or cancel it. |
| Material scope changes or a request expires | Retain the inspected version and explanation; gate obsolete actions and offer the supported refreshed review or recovery path. |
| Another person resolves the request | Preserve local edits, show authorized current evidence and stop offering an obsolete decision. Do not silently submit the local draft against a replacement request. |
| A decision was sent but its outcome is unknown | Keep the original request/action reference discoverable. Apply P0's reconciliation or documented acceptable-repeat/overlap policy before enabling another effect with overlapping consequences. Keep unrelated supported work available. |
| A request is resolved | Show the decision's scope and effect evidence separately. A closed attention item is not proof that downstream work succeeded. |

Use the service's lifetime, revisions, permissions and conflict behavior to govern actions. A countdown or local clock does not grant authority after expiry. If requests can be grouped, define the included identities, partial results and stale members before offering a bulk action; no bulk approval is required by this chapter.

## Keep attention stable

Preserve focus, selection and reading position during background updates. Make new events discoverable without automatically moving the operator's context. Important decisions and failures remain available after temporary messages disappear.

Choose useful status announcements and a deliberate route to new content. Avoid turning every generated token or routine event into an announcement; test the actual cadence and content with the supported assistive technologies. If an activated item disappears, choose a meaningful remaining focus target. User-initiated navigation or deliberate review entry can need a different focus path from a background update.

WCAG's status-message criterion concerns programmatically exposing qualifying messages without taking focus; its Understanding guidance also cautions about excessive announcements. Primer's Copilot guidance supplies implementation examples, not a universal announcement interval or focus rule. Use the [accessibility/responsive guide](accessibility-and-responsive.md) for the applicable component and input behavior.

## Help someone assess evidence and return

**Atlas proposal:** connect material claims to the record or output an authorized operator can inspect. Identify important missing, stale or contradictory evidence. Explain what remains uncertain and what useful verification is actually available. A polished explanation or a numeric score alone does not establish correctness.

On return, provide a compact account of confirmed changes, outstanding decisions, submitted controls and unresolved results, with links to the corresponding records. Preserve the distinction between a historical effect and a failed current refresh. If access to a source changes, show that limit without exposing content the operator may no longer read. The appropriate recovery mechanism remains a project contract, not a capability created by this summary.

## Review and verification

Walk the project's actual delegation, inspect/edit/decline, steering, interrupted-return and attention paths. Include the applicable stale proposal, expiry, other-operator decision and uncertain-command cases. Record the chosen contents, ownership, action gates, focus targets and evidence in the project's handoff; do not require normal implementation to reread the research archive.

The [fresh operations desk trial](../examples/agent-control-evaluation/README.md) is a document exercise using fictional service facts. It does not validate a real service, user comprehension, keyboard interaction or assistive-technology behavior. Source inspection and desk review are separate from those future checks.

## Credits and scope

Microsoft's **HAX team and credited research authors** inform capability expectations and user control. **Google PAIR and the credited Guidebook contributors** inform explanation, mental models and feedback/control distinctions. **MCP creators and specification contributors** supply a version-scoped protocol comparison. **W3C Accessibility Guidelines Working Group**, its credited editors and **GitHub's Primer/accessibility contributors** inform status and focus considerations. Exact sources, versions, terms and excluded material are in the [Agent Experience research ledger](../references/agent-experience-research.md).

Existing control questions retain the selected **Mohit Aggarwal** and **Burhan Sebin** method credits and unchanged MIT notices in [skill adaptations](../references/skill-adaptations.md). This extension contains independently written Atlas questions, tables and fictional cases. No external code, tutorial prose, screenshots or assets are imported; source authors do not endorse Atlas. Atlas's publishing license remains undecided. The [dashboard example](../examples/agent-operations-dashboard/design.md) remains a proposed project specification, not an execution-service implementation.
