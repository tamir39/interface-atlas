# Visual styles

Visual styles sit beside [themes](../catalog/themes.json). A theme supplies an identity; a style supplies material, form, metaphor or compositional rules. The categories overlap, so combining them requires explicit project decisions. A style is optional, including when an Atlas theme is selected.

## Choose cheaply

Start with the project's existing rules. When the user requests a visual style or an unresolved choice needs one, read [catalog/styles.json](../catalog/styles.json), then only shortlisted READMEs. Read the selected style's rules and relevant credits; open its motion chapter only if motion is chosen. Use [theme/style composition](../knowledge/theme-style-composition.md) to resolve an actual overlap. Resolve the result into the project's own design.md or bounded implementation; ordinary edits do not reload this catalog.

## Implemented entries

- [Glassmorphism](glassmorphism/README.md): a draft, original Atlas interpretation of tinted translucent surfaces, with opaque content and preference/support fallbacks.
- [Glassmorphism reference preview](glassmorphism/preview/index.html): compare selected color/font/geometry profiles from all nine themes. This is a shared specimen, not nine complete theme implementations.
- [Glassmorphism composition trials and evidence](../examples/style-composition-evaluation/README.md): theme fit, deliberate conflicts, actual browser coverage and remaining limits.

- [Neobrutalism](neobrutalism/README.md): a draft, original Atlas interpretation of opaque color blocks, explicit outlines and hard offset depth. Its [live specimen](neobrutalism/preview/index.html) and [composition evaluation](../examples/neobrutalism-composition-evaluation/README.md) compare all nine bounded theme profiles and explain default-treatment conflicts.

- [Claymorphism](claymorphism/README.md): a draft, original Atlas interpretation of inflated shells and soft perimeter depth, with opaque text faces. Its [live specimen](claymorphism/preview/index.html) and [composition evaluation](../examples/claymorphism-composition-evaluation/README.md) record selective geometry overrides and nine bounded theme profiles.

Only implemented entries appear in the generated catalog. Future research candidates are Neumorphism / Soft UI, Skeuomorphism, Web Brutalism, Flat and Minimalism. They do not yet have Atlas rules or previews. Suitability stays in each entry, not project-type folders. Material Design, Acrylic and Liquid Glass retain their specific system authorship; grain, glow and gradients remain techniques until a broader grammar justifies a separate family.

## Package and provenance

README.md carries discovery and fit. style.md defines the grammar and original reference recipe. Optional motion.md describes selected behavior. sources.md records creator roles, dates, source use and artifact-specific terms. validation.md and preview notes identify actual evidence and limits; draft does not mean tested on every product or browser.

Atlas recipes and previews are original interpretations by Tamir / Phi Vuong Tuong Tam with Codex AI assistance. Naming a source creator does not establish permission to redistribute their code, illustrations or fonts. Keep naming/popularization, earlier precedents, implementation authorship and Atlas adaptation distinct.
