# UI/UX design decisions

Status: adaptation draft, updated 2026-10-20. Original Atlas synthesis by **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. No product validation is claimed.

## Load for a specific design question

Read when preparing or deliberately revising task, content, journey, or visual decisions. Select sections that resolve the brief. Keep identity, tokens, type choices, effects, and motion recipes in the theme package. Resolve selected decisions into the project's self-contained `design.md`; choose tools from that project's constraints.

## Frame the problem and evidence

Write who is trying to do what, in which situation, what prevents progress today, and what a useful outcome would be. Describe users by relevant behavior, knowledge, access, and context. Start with available research, observations, support reports, or an owner brief. Synthetic personas and invented quotations are not prerequisites.

Distinguish **observed evidence**, with source/date and limits; **binding constraints**, such as permissions or service contracts; and **hypotheses** awaiting a check. A stakeholder preference does not prove user need. With thin evidence, choose a reversible proposal, name the assumption, and identify what better evidence could change. Do not invent conversion targets or task times.

“Find an unfinished application and identify the next action” has an observable outcome; “an intuitive dashboard” leaves success unresolved.

## Tasks, content, and information structure

Name the primary task and necessary supporting tasks. Identify their entry points, required information, permitted actions, and observable completion. Include content people use to decide or compare: labels, dates, limitations, ownership, and next steps as relevant. Use realistic short, long, empty, and unavailable content.

Group information around user decisions. Establish consistent names for objects, actions, navigation, and destinations. Decide what belongs in the main path, supporting detail, search/filtering, or a later step. Reveal complexity when useful, while keeping material costs and consequences available before commitment. Record tradeoffs where compactness makes comparison harder or fewer steps remove useful explanation.

## Journeys across screens and time

Describe consequential transitions through current state, actor/trigger, prerequisites, next state, feedback, and available next action. Cover meaningful branches, backtracking, cancellation, and correction alongside success. Explain transitions and the effect on earlier choices.

Trace interruption and return: leaving a route, closing a tab, losing connectivity, following a deep link, or resuming after a delay. What can actually be restored? What changed or expired? What summary helps reorientation? What needs review? Promise continuity only where the project has an identified mechanism.

Load [state and recovery](state-and-recovery.md) for authority, retention, save acknowledgement, and durable drafts; [forms and navigation](forms-and-navigation.md) for validation, dirty exit, branching steps, focus, and resume; and [uncertain outcomes](uncertain-outcomes.md) when remote effects can outlive the screen or a missing reply makes retry unsafe. Those chapters own detailed contracts; the journey records where they affect the user task.

## Hierarchy, type, color, density, and words

Reuse the theme's visual language and the project's current component owners. Resolve these decisions for the selected surface:

| Concern | Question to answer with real content |
| --- | --- |
| Hierarchy | What should be noticed first, compared next, and acted on? Do grouping and reading order support the task? |
| Typography | Which existing roles carry titles, body, controls, and metadata? Do wrapping, fallback, and long values preserve meaning? |
| Color | Which semantic roles indicate action, status, and emphasis? Which rendered foreground/background pairs need measurement? |
| Density | Which information must stay visible together? Where can detail expand without hiding needed context or obscuring controls? |
| UX writing | Do labels predict results, instructions explain decisions at the point of need, and feedback state what is known and possible next? |

A different spacing value or typeface is not itself a usability failure. Tie departures to constraints, contradictions, or demonstrated task difficulty. Measure color pairs when needed; a palette image cannot establish rendered contrast. Load [focused accessibility and responsive decisions](accessibility-and-responsive.md) when input methods, assistive technology, content growth, or adaptation affect this task.

Motion is optional. Name its purpose, such as showing a relationship or confirming a transition, and consider repeated use and interruption. Preserve information and controls when motion is reduced or absent. Keep timings and recipes with the theme. When the project's motion mapping remains unresolved, use the [chosen motion contract](accessibility-and-responsive.md#record-the-chosen-motion-contract) to resolve the handoff.

## Translate the design through components

When component mapping is unresolved, trace the approved design role to its semantic token, existing component owner, relevant variant and visible state. Record an intentional exception. A matching hex value or component name alone does not establish that the implementation follows the contract.

Use a bounded specimen when it helps resolve the question: only used controls and compositions, realistic content, and consequential states beside the normal case. Label simulated states outside the control's real text. Keep fixture overrides local to the specimen. A pinned focus or hover appearance supports visual inspection; it does not demonstrate keyboard operation, focus transfer or assistive-technology behavior.

Resolve the accepted mapping into project-owned values or stable token references. Verify the relevant real interactions when implementation evidence is available; record missing checks. The sample is optional and need not become an exhaustive component showcase.

Method credit: **shadcn and contributors**, selected [design-system](https://github.com/shadcn-ui/ui/blob/ba1503c64472b82256d9de95e2e62c5901a38e8b/skills/shadcn/design-system.md) and [specimen guidance](https://github.com/shadcn-ui/ui/blob/ba1503c64472b82256d9de95e2e62c5901a38e8b/skills/shadcn/design-system-page.md) at `ba1503c64472b82256d9de95e2e62c5901a38e8b`, MIT, copyright 2023 shadcn. Preserve the [full notice](../references/licenses/shadcn-MIT.txt) with a distributed substantial adaptation. Atlas narrows the method to the existing project; it does not adopt upstream initialization, install-all or automatic stack-selection instructions. Third-party registry assets retain separate terms. See the [adaptation boundary](../references/skill-adaptations.md#2026-10-20-reference-and-craft-additions).

## Handoff and realistic validation

Record task/surface scope; evidence and assumptions; content/navigation model; important transitions; theme decisions and justified exceptions; dependencies and unresolved inputs; and performed versus pending checks. In existing interfaces, trace governing documents, components, variants, and tokens to the selected rendered surface before reporting drift. Similar names elsewhere do not prove ownership.

Choose representative tasks and likely failure conditions. A desk walkthrough asks whether a person can notice an action, predict its effect, recognize progress, recover, and resume; label its conclusions as hypotheses. When feasible, observe intended users attempting realistic tasks without coaching. Record context/sample limits, hesitations, errors, completion, and recovery. Small samples expose problems but do not establish population rates. Repeat affected tasks after changes. Identify which conclusions rely on source, screenshots, automated checks, or user observation.

## Method credits

Adapted in original prose from **Ghaida Zahran's** [Journey](https://github.com/ghaida/intent/blob/3fc38dff381ce0e4dec8f52c97c3e37abd95e10e/skills/journey/SKILL.md) and [Evaluate](https://github.com/ghaida/intent/blob/3fc38dff381ce0e4dec8f52c97c3e37abd95e10e/skills/evaluate/SKILL.md) (CC0: context, transitions, reentry, and bounded walkthroughs); **Jakub Krehel's** [better-* collection](https://github.com/jakubkrehel/skills/tree/4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63/skills) (MIT: layout, type, color roles, writing, and optional polish); and **Julien Thibeaut's** [improve-ui](https://github.com/ibelick/ui-skills/blob/f18d13077d6e3841821ea0a36526c0fd44a570b5/skills/improve-ui/SKILL.md) (MIT: coherent surface, governing owner, and evidence before findings). Atlas narrows these to selective project decisions; upstream stacks, fixed values, verdicts, and full audit workflows are not adopted. See [adaptation details and notices](../references/skill-adaptations.md).
