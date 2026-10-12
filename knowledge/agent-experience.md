# Agent Experience

Use this guidance when a project exposes agent work to an operator. Adapt it to the execution service's actual capabilities.

## Make activity understandable

Show the objective, current observed activity, relevant evidence, outputs, and available controls. Distinguish agent explanations from confirmed tool results. Present progress measurements only when they are known.

Keep execution state, requests for user attention, pending control commands, and connection freshness distinguishable. Losing an event stream does not establish that execution failed.

## Preserve operator control

Offer input, correction, dismissal, or execution controls where the service supports them. Show their scope and pending outcome. Do not present an accepted command as a completed operation.

A decision request should identify the exact proposal being decided. If it changes, the interface needs a decision on the changed proposal. Show action results separately from the decision.

A retry should explain known prior effects and remaining uncertainty. Avoid implying that repeating work is harmless when completion is unknown.

## Keep attention stable

Preserve focus, selection, and reading position during updates. Make new events discoverable without automatically moving the operator's context. Important decisions and failures remain available after temporary notifications disappear.

## Credits and scope

Conceptual reference: Microsoft HAX team and research contributors, [HAX Design Library](https://www.microsoft.com/en-us/haxtoolkit/library/). The source informs capability explanations, correction, dismissal, and user control. This is an original Atlas synthesis; no HAX implementation code or example assets are included.

Concrete layout, state, retry, and control behavior must be specified for the project. See the [dashboard example](../examples/agent-operations-dashboard/design.md); it is a proposed specification, not an execution-service implementation.
