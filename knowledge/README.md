# Shared knowledge

Use this index to select guidance for preparing or explicitly reviewing a project's design, or for an unresolved decision during bounded frontend implementation. Start from the brief or a concrete task question. Read applicable sections and their dependencies/credits; do not load every chapter, source registry or upstream skill bundle. Routine implementation uses the project's self-contained documents first; the implementation skill does not require opening this index when the task is already resolved.

| Chapter | Select when there is a decision about | Scope |
| --- | --- | --- |
| [General UI/UX design](ui-ux-design.md) | User goals, task/content structure, journeys, hierarchy, layout, typography, semantic color, UX writing, component mapping or validation questions | Cross-theme decisions; use relevant sections for unresolved questions |
| [Design reference evaluation](design-reference-evaluation.md) | A chosen external reference or a consequential theme-fit choice that remains unresolved | Use only the relevant reference check or equivalent-task comparison; no default source survey |
| [Accessibility and responsive behavior](accessibility-and-responsive.md) | Names/semantics, keyboard/focus, errors/status, zoom/reflow, content order, touch/input differences, language/RTL, chosen motion or appearance checks | Task-scoped decisions and evidence; not a conformance certificate |
| [State ownership and durable recovery](state-and-recovery.md) | Drafts/records, persistence, reload recovery, concurrent edits, migration, reset or import/export | P0 knowledge draft; select actual state capabilities |
| [Forms and navigation](forms-and-navigation.md) | Editable inputs, validation, modal editing, branching/review, dirty exit, Back/Forward or save/resume | P0 knowledge draft; choose relevant flow sections |
| [Uncertain outcomes](uncertain-outcomes.md) | Remote effects, lost replies, repeat submission, retry, cancellation or reconciliation | P0 knowledge draft; requires project/service facts and gates |
| [Agent Experience](agent-experience.md) | Human-facing agent work, proposals, progress, intervention or control | Lifecycle principles and contract questions; no agent runtime implementation |

[Theme/style composition](theme-style-composition.md) is conditional on a requested style or an unresolved overlap. Discover through [styles](../catalog/styles.json), then read only the chosen rules and relevant credits. Ordinary work uses the project's resolved contract.

Theme identity, values, effects and motion remain in the chosen theme package. Shared guides resolve cross-theme decisions. Select by feature: a static portfolio need not load persistence or remote outcomes; a local practice app should not acquire agent/backend flows; a remote branching form may need all three P0 chapters. An existing resolved design can need only one relevant section for a narrow revision.

Reference evaluation is conditional on a selected outside source or unresolved theme fit. Use component translation only when the mapping needs resolution, and the motion contract only when motion is chosen and not already resolved. Do not automatically create a specimen, introduce a runtime, fetch external sources or reread a source collection. Resolve accepted decisions into the project handoff.

When preparing a design, turn selected guidance into explicit project values, behaviors and open contracts in design.md. During implementation, resolve the bounded question in the affected code or existing project documentation; do not create a design document merely to use a chapter. Do not make the consuming project repeatedly load Atlas. Separate observations, inherited design rules, new proposals and unsupported capabilities. Source inspection, heuristic review, browser checks, assistive-technology checks and user research are different evidence.

The P0 drafts retain their [source ledger](../references/p0-research.md), [earlier review](../references/p0-review.md), and [trial history](../examples/p0-evaluation/README.md). They are routed selectively by preparation, bounded implementation and opt-in review workflows; their draft status does not imply production behavior was validated. [Skill adaptation credits](../references/skill-adaptations.md), including the [reference and craft additions](../references/skill-adaptations.md#2026-10-20-reference-and-craft-additions), record creator/license mappings and retained notices. The [research comparison](../references/skill-research.md) is optional background, not a required skill read.
