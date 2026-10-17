---
name: review-frontend-design
description: Review a frontend design document or supplied interface evidence when explicitly requested. Report actionable UI/UX, flow and relevant accessibility gaps without implementing fixes.
---

# Review frontend design

Review the requested artifact or interface against its brief and governing project decisions. This is an opt-in workflow, not a required step for ordinary frontend edits or preparation. Resolve this Atlas repository from the skill's location. A review alone does not authorize changing project files, replacing its theme, or implementing corrections.

## Choose the evidence and scope

Start with the brief, project design.md and supplied evidence. For document review, assess whether decisions are complete and consistent; do not describe a proposed behavior as observed. When source or rendered review is requested, inspect the relevant implementation or page and record what was actually exercised. Missing browser/tool/service access is a coverage limit, not a passing result.

Do not reload the theme catalog or all source libraries for a project that already has a design contract. Use [the knowledge index](../../knowledge/README.md) to load only the chapter/section needed for an actual review question. Open selected theme rules when checking inheritance or a concrete contradiction. Read relevant source credits when propagating methods; do not load the research ledger or every license text by default.

## Trace tasks and test findings

Trace the essential user paths, including relevant empty, invalid, pending, interrupted and recovery states. Consider general UI/UX as part of those tasks: information order, hierarchy, terminology, action labels, type readability, semantic color and responsive/input behavior. Use the accessibility/responsive guide for implicated components or contexts. For stateful or asynchronous actions, check the relevant state, forms and uncertain-outcome contracts. Use Agent Experience only when the product exposes agent work or decisions.

For persistent edits, remote effects or changing human-agent proposals, use the [state-transition review profile](references/state-transitions.md) to trace applicable acknowledgement, retirement, re-entry and late-evidence boundaries. Select its relevant traces rather than treating a future-test list as a completed behavior contract.

For each candidate issue, identify the governing requirement or supported usability concern, the exact document/source location or observed state, a reproducible trigger, and the consequence for a user task. Check nearby rules and alternative paths for counterevidence before reporting it. Distinguish a standard requirement, project contract, source heuristic and aesthetic preference. A legitimate theme choice is not a defect merely because another skill prefers a different style.

Prioritize by task impact and recoverability. Consolidate duplicate symptoms under their cause. A documented external dependency may be an open contract rather than a contradiction; flag an unsupported promise or an ungated dependent action. Keep unknown service behavior unknown. Do not use invented participants, synthetic personas, a numerical design score or source inspection as proof of usability, accessibility conformance or successful execution.

## Deliver the review

Report actionable findings first. Each needs severity/reason, precise location, trigger and consequence, evidence, and a bounded suggested correction. Record unresolved inputs with an owner or required evidence when known. If there are no actionable findings, say so and describe the meaningful checks and remaining limits.

Include a short coverage record: material read, task/state paths inspected, appearances and viewport/input contexts checked when applicable, and checks not performed. Separate document, source, browser, keyboard, assistive-technology and real-service evidence. Suggest fixes without applying them unless the user separately authorizes implementation. Do not automatically run preparation or a second full audit.

Preserve the project's existing credits and distinguish Atlas recommendations from upstream material. Method credits and license notices are in [skill adaptations](../../references/skill-adaptations.md); propagate relevant attribution with any distributed substantial adaptation.
