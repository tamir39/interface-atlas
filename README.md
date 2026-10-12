# Interface Atlas

A frontend UI/UX knowledge library for preparing project-specific design documents.

Editorial is the first reusable theme. The portfolio and agent operations dashboard are examples of adapting that theme for different projects. All three specifications remain drafts. A standalone reference preview and a limited browser validation report now accompany Editorial; this is evidence about representative components, not complete project or accessibility validation.

## Start here

1. Read [the theme catalog](catalog/themes.json) to find candidates.
2. Read a candidate's README for its identity, project suitability, and limitations.
3. Load its design rules and only the effects, motion, and shared knowledge needed for the project.
4. Create a self-contained project design.md with explicit adaptations and source credits.
5. Use that project's documents for normal implementation work. Return to Atlas for deliberate design changes.

See [the preparation skill](skills/prepare-frontend-design/SKILL.md) for this workflow.

## First theme and examples

- [Editorial](themes/editorial/README.md): reusable identity, visual rules, optional effects, motion, and provenance.
- [Portfolio example](examples/portfolio/design.md): expressive presentation and case-study reading.
- [Agent operations dashboard example](examples/agent-operations-dashboard/design.md): compact layouts and human-agent interaction.
- [Example notes](examples/README.md): assumptions and how to adapt the examples.
- [Editorial reference preview](themes/editorial/preview/README.md): light/dark appearances, density, component specimens, and two sample layouts. Open its index.html directly; no build or network is needed.
- [Validation evidence](themes/editorial/validation.md): checks performed and remaining coverage.
- [Preparation workflow evaluation](examples/workflow-evaluation/README.md): one fresh journal brief and the self-contained design document it produced.

## Structure

```text
AGENTS.md
README.md
THIRD_PARTY_NOTICES.md
catalog/themes.json
themes/editorial/
  README.md
  design.md
  effects.md
  motion.md
  sources.md
  validation.md
  preview/
    README.md
    index.html
    styles.css
    preview.js
knowledge/
  README.md
  agent-experience.md
references/SOURCES.md
adapters/README.md
skills/prepare-frontend-design/SKILL.md
templates/project-design.md
examples/
  README.md
  portfolio/design.md
  agent-operations-dashboard/design.md
  workflow-evaluation/
    README.md
    design.md
tools/
  README.md
  catalog.mjs
  validate-editorial.mjs
```

Themes are grouped by name. Suitable project types belong in each theme README and the small discovery catalog.

The shared knowledge layer holds cross-theme decisions. Adapters hold framework-specific mappings when needed. References record where knowledge comes from; they are not an archive of unlicensed copies.

## Provenance and reuse

Every entry distinguishes retained source values, referenced concepts, and Atlas proposals. Preserve creators, original URLs, source revisions, applicable licenses, and adaptation notes in generated project documents.

See [the source registry](references/SOURCES.md), [Editorial's provenance](themes/editorial/sources.md), and [third-party notices](THIRD_PARTY_NOTICES.md).

No third-party implementation code, font binaries, or artwork is included in this pilot. Atlas's own publishing license is not yet selected; individual source terms remain separate.

## Catalog maintenance

Requires Node.js 18 or later and no installed packages:

```sh
node tools/catalog.mjs
node tools/catalog.mjs --check
```

The catalog is generated from each named theme's README metadata. Its flat metadata format is described in [tools/README.md](tools/README.md).

Optional browser checks use an installed Playwright package. They are separate from the dependency-free library and preview; see [tools/README.md](tools/README.md).

Interface Atlas is independent of the Twohearts workspace and its product policies.
