# Shared knowledge

Start with the project's resolved rules. Use this index only to locate guidance for a remaining design, implementation or review question; follow a known section directly. Read that section and necessary dependencies, then stop. Reuse this task's conclusions/read records rather than repeating the index, whole chapters, upstream skill families or source surveys.

| Decision | Start with the applicable section |
| --- | --- |
| Goals, tasks, hierarchy, writing or components | [General UI/UX](ui-ux-design.md): [task structure](ui-ux-design.md#tasks-content-and-information-structure), [hierarchy and words](ui-ux-design.md#hierarchy-type-color-density-and-words), [component translation](ui-ux-design.md#translate-the-design-through-components) |
| A selected outside reference or unresolved theme fit | [Reference evaluation](design-reference-evaluation.md); no default source survey |
| Semantics/focus, reflow, status or motion | [Controls](accessibility-and-responsive.md#controls-meaning-and-focus), [real-content adaptation](accessibility-and-responsive.md#adaptation-with-real-content), [perception/status](accessibility-and-responsive.md#perception-status-and-optional-media), [chosen motion](accessibility-and-responsive.md#record-the-chosen-motion-contract) |
| Drafts, retention, overlapping saves or replacement | [Ownership/lifetime](state-and-recovery.md#ownership-and-lifetime), [save snapshots](state-and-recovery.md#save-snapshots-and-completion), [stale writers](state-and-recovery.md#replacement-and-stale-writers) |
| Editable forms, errors, pending or navigation | [Validation/recovery](forms-and-navigation.md#validation-and-error-recovery), [pending controls](forms-and-navigation.md#pending-actions-and-available-controls), [dirty exit](forms-and-navigation.md#modal-editing-and-dirty-exit), [navigation](forms-and-navigation.md#navigation-focus-and-scroll) |
| Remote effects, lost replies or repeat submission | [Outcome copy](uncertain-outcomes.md#outcome-states-and-copy), [changed intent](uncertain-outcomes.md#dispatch-and-changed-intent), [retry/recovery](uncertain-outcomes.md#safe-retry-and-recovery); service facts constrain promises |
| Agent capabilities, proposal decisions, steering, attention, evidence or return | [Agent Experience](agent-experience.md); select relevant sections and linked P0; no agent runtime implied |

For a requested or unresolved visual treatment, discover [styles](../catalog/styles.json) and load selected rules/credits. Use [composition](theme-style-composition.md) for actual overlap. Theme identity, values, effects and motion stay in the chosen theme package; existing resolved choices need no survey.

Read an identified component/effect pattern directly, or use [pattern discovery](../patterns/README.md) and the [small catalog](../catalog/patterns.json) for an unresolved choice. Read selected rules/credits; a pattern requires no new theme, style, stack, package or skill. A static surface needs no persistence/remote/agent contract merely because one exists in Atlas.

Resolve accepted rules into the requested design artifact, affected code or existing project handoff so the project need not repeatedly load Atlas. A bounded task needs no new design.md. Separate observations, inherited rules, proposals and unsupported capabilities. Source, heuristic, browser, assistive-technology and user evidence establish different things.

Use concise credits in the selected chapter/entry. [Skill adaptations](../references/skill-adaptations.md) and the [P0 source ledger](../references/p0-research.md) retain creators, terms and notice mappings; open them for unresolved attribution/permission or actual copying/distribution of covered artifacts or substantial adaptations. Full license texts are not routine invocation reads. [Research comparisons](../references/skill-research.md), [earlier P0 review](../references/p0-review.md) and [trial history](../examples/p0-evaluation/README.md) are optional background. Draft knowledge is not proof of production behavior.
