---
id: claymorphism
name: Claymorphism
revision: 0.1.0-draft
status: draft
kind: form
entry_creator: Tamir (Phi Vuong Tuong Tam)
attribution_summary: Original Atlas recipe; Michał Malewicz credited for the term, with earlier soft 3D precedents acknowledged
basis: original-atlas-interpretation
aliases: [soft-3d]
appearances: [light, dark, system]
fit_types: [consumer-app, creative-onboarding, learning-product, selected-product-surfaces]
motion_character: optional-and-gentle
implementation_dependency: none-required
reviewed_on: 2026-10-27
---

# Claymorphism

Inflated rounded forms, soft perimeter shading and opaque content surfaces give selected interfaces a tactile, clay-like presence. This recipe accompanies a theme; keep the project's typography, palette, hierarchy and ordinary controls.

**Atlas entry:** original interpretation by Tamir (Phi Vuong Tuong Tam), with Codex AI assistance. **Michał Malewicz** is credited for the term and early explanation; the original article dates to **20 December 2021** and credits **Diana Malewicz** for its lead image. Earlier soft 3D artwork preceded this naming. **Albert Walicki** and **Adrian Bece** are credited for subsequent CSS explanations and Bece's clay.css project. [Sources and credits](sources.md) distinguish those roles and unresolved reuse terms; no external artwork or code is imported.

## Fit and limits

| Candidate use | Atlas recommendation |
| --- | --- |
| Consumer app, creative onboarding or learning product | Try a small number of supporting panels, choice cards or actions when a softer form supports the content. |
| Selected product surfaces | Keep the shaded perimeter separate from readable content. Preserve clear boundaries and independent state cues. |
| Dense forms, tables, editors or sustained reading | Keep working regions quiet and retain the host theme's component geometry. |
| Restrained or sharp theme | Use an explicit rounded-shell override only where justified. A profile rendering does not prove stylistic fit. |
| Dark appearance | Resolve the actual dark palette and shading; pastel color is optional. |

These are Atlas suitability judgments, not measured usability findings. Soft shadows do not establish accessibility.

## Load only what is needed

- To shortlist, use this README and the [small catalog](../../catalog/styles.json).
- To apply, read [style.md](style.md), relevant [credits](sources.md) and implicated theme rules. Record scope, preserved identity, explicit overrides and fallbacks.
- Load [motion.md](motion.md) only when adding motion; the static form is complete.
- For evidence, open the [live lab](https://tamir39.github.io/interface-atlas/styles/claymorphism/preview/), [offline preview](preview/index.html), [preview notes](preview/README.md) or [validation record](validation.md).

The lab compares nine theme profiles without remote fonts or artwork, retaining base geometry while rounding selected shells. Status remains **draft**; profile checks and product validation are separate.
