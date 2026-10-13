---
id: swiss
name: Swiss
creator: Tamir (Phi Vuong Tuong Tam)
revision: 0.1.0-draft
status: draft
basis: adapted-from-tamir39-portfolio
fit_types: [portfolio, publication, studio-site, documentation, agent-workspace]
appearances: [light, dark, system]
default_density: comfortable
supported_density_adaptations: [compact]
motion_character: crisp-and-restrained
decorative_effects: optional
implementation_dependency: none-required
source_revision: 6f9bfc6119f0e71dee04b675fbf59b8482aa9c74
reviewed_on: "2026-10-13"
---

# Swiss

Confident sans-serif typography, shared alignment, paper and charcoal surfaces, precise rules, and a restrained red accent make content easy to scan. Flat panels and nearly square controls keep geometry direct. Short feedback supports deliberate interaction without introducing continuous motion.

This entry adapts the Swiss direction in **Tamir (Phi Vuong Tuong Tam)'s portfolio**, retaining observed values and distinguishing them from portable Atlas proposals. Its primary typeface is Manrope; JetBrains Mono has a small technical role. Swiss design history informs further study, but historical designers are not credited as authors of Tamir's implementation.

## Suitability

These are Atlas assessments, not measured usability results.

| Project type | Fit | Reason and adaptation |
| --- | --- | --- |
| Portfolio or case studies | Strong | Large headings and an aligned project index make work and evidence prominent. Keep body text comfortably sized and readable. |
| Publication or journal | Strong | Consistent columns and clear type roles support stories and navigation. Use a bounded reading measure and responsive reading order. |
| Studio or architecture site | Strong | Precise geometry and restrained color work with project imagery, names, and concise descriptions. Each image requires its own provenance. |
| Documentation | Strong | Flat sections, visible rules, and explicit links support scanning. Add robust navigation and code conventions for the project's scale. |
| Agent workspace or review queue | Conditional | Align metadata and actions, preserve context, and use textual states. Compact spacing is a documented project adaptation. |
| Dense analytics | Conditional | Requires additional chart, data, density, and update rules. A bold hero does not define a usable monitoring interface. |

Choose the adaptation according to the project's content and tasks. The visual theme does not define agent authority, execution, approval, or recovery behavior; use relevant [Agent Experience guidance](../../knowledge/agent-experience.md) when preparing those decisions.

## Package

- [Design specification](design.md): color, typography, hierarchy, grid, geometry, components, appearance, and accessibility rules.
- [Motion specification](motion.md): observed feedback and entrance settings, portable proposals, and reduced-motion behavior.
- [Optional effects](effects.md): structural rules, optional kinetic grid, and precision-square cursor.
- [Sources and credits](sources.md): pinned source files, creator roles, conceptual references, font terms, and adaptation records.

No theme-specific framework or animation runtime is required.

## Preview and validation

The [live Swiss reference preview](https://tamir39.github.io/interface-atlas/themes/swiss/preview/) demonstrates portfolio, publication, review, and component layouts. The [preview notes](preview/README.md) describe its scope; [index.html](preview/index.html) also opens locally without a build. It uses original HTML, CSS, and JavaScript, local font fallbacks, and static original composition. Named font files and the source's optional canvas and cursor are not included.

Read the [validation report](validation.md) for actual browser evidence and limits. The [design specification](design.md) separately records opaque numerical color calculations. Status remains **draft**: representative checks do not validate all projects, intended fonts, assistive technology, optional effects, or backend integration.

## Credits and reuse

The retained Swiss source implementation is credited to **Tamir (Phi Vuong Tuong Tam)** at revision `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`. Font designer credits are **Mikhail Sharanda** for Manrope and **JetBrains, Philipp Nurullin, and Konstantin Bulenkov** for JetBrains Mono.

**Massimo Vignelli's The Vignelli Canon** is an additional Atlas reference for information organization and grid reasoning. **Max Miedinger and Edouard Hoffmann's Helvetica** is historical typography context; Helvetica is not included or selected as this package's typeface. The optional source artwork credits **SatoriUI / @satoriui's Kinetic Grid**. These separate credits do not assign authorship of the complete theme to those references.

No implementation license was found in the inspected portfolio. Atlas's publishing terms remain undecided. This entry contains original Atlas documentation and retained design facts; no portfolio implementation, external artwork, or font files are copied. [Sources and credits](sources.md) records the scope and unresolved reuse terms.
