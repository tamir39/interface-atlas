# Component patterns

Patterns solve bounded interface problems inside a project's existing design. A theme contributes identity and a style contributes visual treatment; a pattern connects a component's role to its actual states and useful outcomes. None of those layers is compulsory.

## Choose one when needed

Start with the brief, project rules and affected component. Read an identified pattern directly. For an unresolved choice, read the [small catalog](../catalog/patterns.json) and candidate READMEs. Read only the selected pattern.md and relevant credits, then resolve its semantic values, state transitions, dependencies and fallbacks into the project's design.md or bounded implementation. Routine work with a resolved contract skips this survey.

| Pattern | Useful decision | Preview |
| --- | --- | --- |
| [Button feedback](button-feedback/README.md) | Press, focus, persistent selection and unavailable actions | [Original local-action lab](button-feedback/preview/index.html) |
| [Loading feedback](loading-feedback/README.md) | Pending, retained content, empty/error recovery and optional motion | [Manual state fixture](loading-feedback/preview/index.html) |
| [Hero composition](hero-composition/README.md) | Promise, hierarchy, meaningful links and content pressure | [Original layout lab](hero-composition/preview/index.html) |

## Scope and sources

README.md carries fit, limits and cheap discovery metadata. pattern.md contains reusable task rules and mapping decisions; sources.md records specific creators, inspected artifacts and rights. Preview notes and validation.md identify finite evidence, not universal theme compatibility or user research. The [pilot evaluation](../examples/patterns-evaluation/README.md) collects actual checks.

The pilot previews are original Atlas work by Tamir (Phi Vuong Tuong Tam), with Codex AI assistance, and share a neutral local palette. Uiverse, Uilora and Forge UI are credited reference sources; no upstream component implementation is bundled. A source reference or commercial-app license does not establish permission to republish a component collection. Preserve exact artifact notices when a future licensed adaptation is actually distributed.

Framework-specific adapters remain conditional on a consuming project's concrete stack need. The three existing Atlas skills can use selected recipes; ordinary work does not load the entire catalog, every pattern or external libraries.
