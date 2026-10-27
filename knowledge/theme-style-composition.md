# Theme and visual-style composition

Status: original Atlas composition guidance, 0.1.0-draft. Load for a requested style or an unresolved theme/style overlap; skip when the project already resolves that choice. [Style discovery](../styles/README.md) and [catalog](../catalog/styles.json) are optional routes, not mandatory preparation.

## Establish the contract

A theme contributes typography, palette, density, geometry and component identity. A style contributes material, shape, metaphor or composition. These are overlapping responsibilities, not independent switches. Start from existing project rules and the user's requested direction. Theme-first is useful for identity-led work; style-first is valid when the request starts with a material or visual language. Neither requires an Atlas theme.

For a selected combination, record:

- Theme or project design origin and revision; style entry and revision, if selected.
- Scope: specific regions/components and permitted variants. An expressive hero does not authorize transparent inputs or tables.
- Preserved rules and deliberate overrides, with reasons. Keep actual semantic colors, type, geometry and density clear.
- Default, hover, focus, selected, error, unavailable and relevant pending/recovery states; essential state cues cannot depend only on shadows or blur.
- Light/dark decisions, opaque/no-effect support fallbacks, user preferences and rendering constraints.
- Relevant creators, source URLs, artifact terms and what was actually adapted.

Resolve conflicts in the project contract before implementation. Do not silently replace a flat theme's default with glass, round a sharp theme's controls, or inherit a platform material's unsupported guarantees. Keeping a theme's colors alone is insufficient evidence of preserving its identity.

## Select and hand off

Read discovery summaries first, then only the selected style rules and source credits needed for the decision. Theme and style motion/effects are conditional. A speculative future style, full research ledger or upstream component library is not required reading. Catalog word counts expose current reading size rather than estimated token promises.

Write the accepted recipe as exact project values and semantic roles. Avoid a runtime dependency on Atlas or an instruction such as “read the glass chapter every time.” For a bounded code change, resolve the relevant rules in code or existing project documents; no new design.md is compulsory.

## Evidence and interpretation

Judge suitability separately from rendering. A shared profile can render without overflow and still conflict with a theme's intended default. [Glassmorphism trials](../examples/style-composition-evaluation/README.md), [Neobrutalism trials](../examples/neobrutalism-composition-evaluation/README.md), [Claymorphism trials](../examples/claymorphism-composition-evaluation/README.md) and [Neumorphism trials](../examples/neumorphism-composition-evaluation/README.md) separate preserved profile values, scoped adaptations, default-treatment conflicts and actual browser evidence.

For transparent materials, evaluate the composited background, not a foreground/tint pair alone. A solid fallback must retain names, controls, hierarchy and state. Prefer an opaque base and progressive enhancement; media preferences have differing support. Read [Glassmorphism's credited rules](../styles/glassmorphism/style.md) for that material's specific constraints.

For opaque styles such as [Neobrutalism](../styles/neobrutalism/style.md), [Claymorphism](../styles/claymorphism/style.md) and [Neumorphism](../styles/neumorphism/style.md), contrast and state remain necessary even without compositing. Separate a transient press, persistent selection and keyboard focus; reserve room for hard shadows, and keep state cues when depth or motion is removed.

If a style deliberately changes geometry, record the selected shape override rather than claiming the source corners were preserved. For shaded materials, keep the evaluated text face opaque and distinguish decorative perimeter shading from the background used by readable content.

When shading or an OS palette changes painting around text, pair computed-color checks with rendered inspection of representative states. The [Claymorphism trial](../examples/claymorphism-composition-evaluation/README.md) exposed unreadable forced-color text backplates despite passing computed pairs; its repaired states were checked visually. This is evidence about that specimen and a reason to inspect similar effects, not an automatic audit requirement for unrelated tasks.

These composition procedures and compatibility classifications are Atlas proposals, not a historical taxonomy or proof of usability. Technical inputs remain attributed in each selected style's sources. Browser checks, manual visual inspection, assistive technology, real services and observed user research are separate evidence.
