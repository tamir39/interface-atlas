---
id: play
name: Play
creator: Tamir (Phi Vuong Tuong Tam)
revision: 0.1.0-draft
status: draft
basis: adapted-from-tamir39-portfolio
fit_types: [portfolio, creative-tool, community-site, learning-product, consumer-onboarding, agent-brief-builder]
appearances: [light, dark, system]
default_density: comfortable
supported_density_adaptations: [compact]
motion_character: tactile-and-restrained
decorative_effects: optional
implementation_dependency: none-required
source_revision: 6f9bfc6119f0e71dee04b675fbf59b8482aa9c74
reviewed_on: "2026-10-13"
---

# Play

Warm cream and deep violet surfaces, colorful supporting panels, bold sans-serif headings, rounded geometry, and hard offset shadows give work a tactile character. Play supports expressive presentation while keeping controls, reading, and task states clear. Brief feedback is sufficient; animated decoration is optional.

This entry adapts the Play direction in **Tamir (Phi Vuong Tuong Tam)'s portfolio**, retaining observed design values and identifying portable Atlas proposals. Manrope is the principal typeface, with JetBrains Mono for short technical labels. Atlas's original preview applies the direction to a fictional creative portfolio and a local brief builder.

## Suitability

These are Atlas assessments, not measured usability results.

| Project type | Fit | Reason and adaptation |
| --- | --- | --- |
| Portfolio | Strong | Bold headings, distinct project surfaces, and a small amount of graphic personality support work and case studies. |
| Creative tool | Strong | Tactile controls and clear grouped options suit idea collection and simple creative tasks. Keep the working area calm. |
| Community site | Strong | Colorful sections can distinguish shared activities and contributions. Provide meaningful labels, moderation, and readable long content. |
| Learning product | Strong | Clear progress and encouraging feedback can accompany exercises. Outcomes need persistent text; decorative rewards are optional. |
| Consumer onboarding | Strong | Comfortable controls and a short, clear sequence suit approachable forms. Preserve input, explain errors, and disclose consequential effects before confirmation. |
| Agent brief builder | Conditional | The visual direction suits preparing and reviewing a brief. Define authority, pending requests, acknowledgement, recovery, and actual execution separately. |
| Dense operations or analytics | Conditional | Requires additional density, chart, data, and update rules. Reduce large display type and decorative shadow frequency around repeated work. |

Project fit belongs to the content and tasks. Play's visual direction does not establish permissions, successful execution, approval policy, or backend reliability. Use relevant [Agent Experience guidance](../../knowledge/agent-experience.md) when preparing those decisions.

## Package

- [Design specification](design.md): retained tokens, proposed type/layout rules, components, appearance, and contrast limits.
- [Motion specification](motion.md): observed CSS feedback and spring settings, selected portable feedback, and immediate fallbacks.
- [Optional effects](effects.md): tactile shadows and stickers, optional sphere artwork, and the decorative cursor.
- [Sources and credits](sources.md): pinned source files, creator roles, comparison references, font evidence, and reuse boundaries.

No theme-specific framework, component package, or animation runtime is required.

## Preview and validation

The [live Play reference preview](https://tamir39.github.io/interface-atlas/themes/play/preview/) demonstrates a fictional creative portfolio, component specimens, and a brief review flow. The [preview notes](preview/README.md) describe its scope; [index.html](preview/index.html) also opens offline without a build. The original HTML, CSS, and JavaScript use local font fallbacks. Sphere artwork, cursor followers, source assets, and font files are not included.

Read the [validation report](validation.md) for actual browser evidence and limits. The [design specification](design.md) separately records opaque numerical color calculations, including selected-background combinations that fail ordinary-text contrast. Status remains **draft**: representative checks do not establish production readiness, intended font rendering, complete accessibility, assistive technology behavior, or real agent operation.

## Credits and reuse

The retained Play implementation is credited to **Tamir (Phi Vuong Tuong Tam)** at revision `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`. Font creator credits are **Mikhail Sharanda** for Manrope and **JetBrains, Philipp Nurullin, and Konstantin Bulenkov** for JetBrains Mono.

**Samuel Breznjak's Neobrutalism components** is an additional Atlas comparison for bold boundaries and offset shadows; it is not evidence that Tamir used that library. **Ravi Katiyar / @ravikatiyar162's Interactive Hero Backgrounds** is credited by the portfolio as optional sphere-artwork inspiration. Neither reference is credited as the author of this complete Play theme.

No implementation license was found in the inspected portfolio. Neobrutalism's inspected repository software is MIT; the optional sphere component's reuse terms remain unresolved. Atlas's own publishing terms remain undecided. This package contains original Atlas documentation and preview code plus retained design facts, with no imported portfolio/library implementation, branded artwork, or font software. Preserve the relevant credits and selected-rule provenance in project documents.
