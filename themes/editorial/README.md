---
id: editorial
name: Editorial
creator: Tamir (Phi Vuong Tuong Tam)
revision: 0.1.0-draft
status: draft
basis: adapted-from-tamir39-portfolio
fit_types: [portfolio, publication, boutique-site, agent-workspace, operations-dashboard]
appearances: [light, dark, system]
default_density: comfortable
supported_density_adaptations: [compact]
motion_character: restrained
decorative_effects: optional
implementation_dependency: none-required
source_revision: 166f44091a58a68d74096bc44defceb99243ba4e
reviewed_on: "2026-10-13"
---

# Editorial

Warm paper surfaces, muted lavender, expressive serif accents, rounded geometry, and soft transitions support a content-first interface. The source implementation combines Manrope for readable interface text, DM Serif Display for selected expressive text, and JetBrains Mono for short technical values.

This Atlas entry adapts the Editorial direction in Tamir's portfolio. It distinguishes retained source values from proposed portable rules; it does not include the portfolio's branding, copy, artwork implementation, or font files.

## Suitability

These assessments are Atlas judgments, not measured performance or usability results.

| Project type | Fit | Reason and adaptation |
| --- | --- | --- |
| Portfolio or case studies | Strong | Expressive headings and comfortable spacing support storytelling and project evidence. Keep effects optional. |
| Publication or journal | Strong | Warm surfaces and a restrained serif role support long reading. Apply a readable measure and continuous heading hierarchy. |
| Boutique service or product site | Strong | Calm presentation suits a small set of clear offers, product stories, and actions. Preserve explicit action contrast. |
| Agent workspace | Conditional | Retain the palette and readable sans-serif text; adapt density, geometry, typography, and motion for frequent operations. |
| Operations dashboard | Conditional | Use compact controls, stable data layouts, explicit status labels, and restrained update feedback. Decorative scenes are unnecessary. |
| Dense analytics | Conditional | Requires documented data typography, compact geometry, table conventions, and chart/status semantics beyond the source portfolio. |

A project must choose and document its adaptation. A visual theme does not define agent execution, permission, or recovery behavior.

## Package

- [Design specification](design.md): tokens, typography, hierarchy, spacing, components, appearance, and accessibility rules.
- [Motion specification](motion.md): source timings, proposed compact adaptations, and reduced-motion behavior.
- [Optional effects](effects.md): selective shadows, flowing paths, and a cursor halo.
- [Sources and credits](sources.md): source snapshot, creator roles, font notices, inspiration, and adaptation records.

Projects can implement this specification without a theme-specific runtime or animation library.

## Preview and validation

A standalone [reference preview](preview/README.md) demonstrates neutral components and representative portfolio and agent operations layouts. Open [index.html](preview/index.html) directly. It has no build or network dependency and uses local font fallbacks; named webfont files and optional artwork are not included.

The [validation report](validation.md) records browser checks and their limits. Numerical token calculations remain in [design.md](design.md). This entry stays a draft: representative preview evidence does not validate every adaptation, font package, assistive technology, browser, or backend integration.

## Credits and reuse

The local Editorial implementation is credited to **Tamir (Phi Vuong Tuong Tam)**. Font designers are **Mikhail Sharanda** for Manrope, **Colophon Foundry** for DM Serif Display, and **JetBrains, Philipp Nurullin, and Konstantin Bulenkov** for JetBrains Mono.

The portfolio lists general inspiration from the DESIGN.md directory and Design Prompts. Its optional flowing-path artwork separately credits Bundui.io's Floating Paths. These references are not asserted to be the creators of the complete Editorial theme.

No implementation license was found in the inspected portfolio. Atlas's own publishing terms remain undecided. This package includes original documentation and retained design facts; it contains no copied third-party implementation code, artwork assets, or font files. See [sources.md](sources.md) before copying or redistributing source material.
