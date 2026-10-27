---
id: glassmorphism
name: Glassmorphism
revision: 0.1.0-draft
status: draft
kind: material
aliases: [frosted-glass]
entry_creator: Tamir (Phi Vuong Tuong Tam)
attribution_summary: Name popularized by Michal Malewicz in 2020; translucent interface precedents are older
basis: original-atlas-interpretation
appearances: [light, dark, system]
fit_types: [product-navigation, portfolio, consumer-app, selected-overlays]
motion_character: optional-and-restrained
implementation_dependency: none-required
reviewed_on: 2026-10-27
---

# Glassmorphism

Tinted translucent surfaces reveal a softened backdrop. This material can accompany a theme; it does not supply the project's typography, layout or interaction model.

**Atlas entry:** original interpretation by Tamir (Phi Vuong Tuong Tam), with Codex AI assistance. **Michal Malewicz** named/popularized glassmorphism in November 2020; earlier Microsoft and Apple/WebKit work establishes older translucent-interface precedents. [Source credits](sources.md) distinguish these roles and reuse terms.

## Fit and limits

| Candidate use | Atlas recommendation |
| --- | --- |
| Navigation, selected overlays, short supporting cards | Conditional fit when shallow translucency preserves useful context and remains readable. |
| Portfolio or consumer application | Preserve theme identity and imagery; confine the material to chosen regions. |
| Dense forms, tables, editors or sustained reading | Keep working content opaque. Reject glass when detail behind text hurts the task. |
| Uncontrolled photographs/video or constrained devices | Use stronger containment or the opaque alternative; no task can depend on blur. |
| Faithful Liquid Glass, Acrylic or Mica | Outside this original web recipe; these are separately authored platform materials. |

These are Atlas suitability judgments, not measured user or performance results. A safe-rendering profile can still conflict with a theme's default identity.

## Load only what is needed

- To shortlist, use this README and the [small catalog](../../catalog/styles.json).
- To apply, read [style.md](style.md), relevant [credits](sources.md), and only the theme rules implicated by the change. Record scope, preserved identity, deliberate overrides and fallbacks in the project's own document.
- Load [motion.md](motion.md) only when adding motion; static glass needs no animation.
- For evidence, use the [live lab](https://tamir39.github.io/interface-atlas/styles/glassmorphism/preview/), [offline preview](preview/index.html), [preview notes](preview/README.md) or [validation record](validation.md).

The lab compares selected color/font/geometry profiles from nine themes, not nine complete apps. It requires no framework, remote font or third-party asset. Unsupported filters, explicit opaque mode, reduced transparency and forced colors retain usable content. Status remains **draft**; actual evidence and remaining limits are separate from source research. Normal implementation uses resolved project rules without reopening Atlas.
