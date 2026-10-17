# Agent Experience

Use this guidance when a project exposes agent work to an operator. Adapt it to the execution service's actual capabilities.

## Make activity understandable

Show the objective, current observed activity, relevant evidence, outputs, and available controls. Distinguish agent explanations from confirmed tool results. Present progress measurements only when they are known.

Keep execution state, requests for user attention, pending control commands, and connection freshness distinguishable. Losing an event stream does not establish that execution failed.

## Preserve operator control

Offer input, correction, dismissal, or execution controls where the service supports them. Show their scope and pending outcome. Do not present an accepted command as a completed operation.

A decision request should identify the exact proposal being decided. If it changes, the interface needs a decision on the changed proposal. Show action results separately from the decision.

A retry should explain known prior effects and remaining uncertainty. Avoid implying that repeating work is harmless when completion is unknown.

## Resolve project control questions

For a proposed or existing agent control surface, decide which of these questions actually applies:

- What can the agent suggest, change or execute, and who may authorize each effect? Show the actual target, scope, material consequences and supporting evidence before a decision.
- Which immutable proposal identity/version and request revision bind that decision? Editing scope, changed upstream data or expiry needs a defined revalidation/review path; a decision on an old proposal is not unlimited permission.
- Can the operator reject, edit, pause, cancel or reverse the effect? Name supported controls and their limits. Keep a local editing choice, submitted decision, accepted command and confirmed execution result distinct.
- What survives interruption or reload, and how can the original action be discovered? Route unknown results, overlapping changed intent and stale observations through the project's documented service contract. Gate action enablement on missing recovery/authority capabilities instead of inventing guarantees.
- What helps someone inspect evidence, steer work, understand uncertainty and resume? Do not fabricate confidence percentages, progress estimates or an approval-volume budget.

Use [forms/navigation](forms-and-navigation.md) for editable decisions and focus, [state/recovery](state-and-recovery.md) for retained local intent, and [uncertain outcomes](uncertain-outcomes.md) for remote controls and observation. Read only the applicable sections. These are design questions, not a policy engine or production control contract.

## Keep attention stable

Preserve focus, selection, and reading position during updates. Make new events discoverable without automatically moving the operator's context. Important decisions and failures remain available after temporary notifications disappear.

## Credits and scope

Conceptual reference: Microsoft HAX team and research contributors, [HAX Design Library](https://www.microsoft.com/en-us/haxtoolkit/library/). The source informs capability explanations, correction, dismissal, and user control. This is an original Atlas synthesis; no HAX implementation code or example assets are included.

Concrete layout, state, retry, and control behavior must be specified for the project. See the [dashboard example](../examples/agent-operations-dashboard/design.md); it is a proposed specification, not an execution-service implementation.

The control questions adapt selected methods from **Mohit Aggarwal** (human-in-the-loop-design, MIT) and **Burhan Sebin** (human-in-the-loop and gate-design-guide, MIT), with independently written Atlas questions. Exact source pins, changes and retained notices are in [skill adaptations](../references/skill-adaptations.md). Google PAIR is an additional linked lifecycle reference there; no website prose or example assets are reproduced.
