# Skeuomorphism — style specification

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

This is an original Atlas metaphor and material recipe for a bounded part of an established identity. **Every numerical geometry, shadow, spacing and motion value is an Atlas choice.** Preserve the host theme's palette, typography and ordinary component geometry. Read the [README](README.md) for suitability and [sources](sources.md) for historical authorship and reuse boundaries.

## Family grammar and variants

Choose a recognizable physical artifact whose organization helps explain the actual task. State what its parts mean, which actions they support and where the mapping stops. Physical resemblance can include material, construction, shape and depth; photorealism, wood, leather, brown colors and copied product artwork are not requirements.

An **interaction metaphor** and **physical-material rendering** are related but distinct. A flat folder symbol can explain organization without the full material style. A textured panel can resemble an object without explaining interaction. Use familiarity as a hypothesis to test, not evidence of intuitive operation.

| Variant | Conditional application |
| --- | --- |
| Notebook or reading artifact | Indexed sections, page layers and binding can organize notes or reading. **Fieldbook** is this entry's bounded reference. |
| Instrument panel | A dial or meter can explain a relevant quantity; retain explicit values, units, keyboard operation and direct input where needed. Do not force rotary dragging or decorative hardware onto unrelated tasks. |
| Object collection | Shelves, containers or recognizable objects can support browsing. Retain search, item labels, logical reading order and alternatives to spatial-only discovery. |

These are possible variants, not implemented Atlas products. Fieldbook's fit assessments concern its notebook treatment. Another metaphor, audience or workflow requires its own suitability and interaction assessment; choosing this style never requires notes, Apply, Revert or download features.

1. Name the artifact and limited receiving surfaces. Preserve the theme's typography, semantic palette, hierarchy, spacing rhythm and ordinary controls. Document scoped shape/depth departures.
2. Put every readable label, state mark and control on an **opaque content face**. Keep grain, rules, seams, hardware and page edges outside it. Decoration may not shade text, enter a field, cross focus or become the sole control boundary.
3. Use native controls, real labels, clear boundaries and appropriate semantics. A ring, ribbon, bevel or raised shape never explains function alone. Decorative hardware has no pointer interception, keyboard stop or accessible name.
4. Preserve digital capabilities: search where useful, selectable text, direct actions, keyboard access, reflow and recovery. Artificial page limits, drag-only actions and animation delays do not follow from the physical analogy.
5. Explain actual outcomes and persistence. An artifact can imply durability or capability beyond the implementation. Show what an action changes, where data lives and how users recover; material appearance is never evidence of saving.

The [Star authors' account](https://guidebookgallery.org/articles/designingthestaruserinterface/) supplies a specific office-metaphor precedent while retaining capabilities beyond physical analogy. [Norman's signifier explanation](https://jnd.org/signifiers-not-affordances/) informs perceptible action clues. Neither supplies this recipe or proves its usability.

## Theme preservation and notebook fit

The specimen projects selected color, font and geometry variables from **Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery and Layered**. This compares bounded profiles, not nine complete theme implementations. Read actual shortlisted theme rules and record scope, preserved rules, overrides and fallbacks in the consuming project.

| Theme rules | Conditional notebook judgment |
| --- | --- |
| [Editorial](../../themes/editorial/design.md#geometry-and-elevation) | Selective raised panels offer a plausible starting point. Keep type, palette and cover corners; page geometry, binding and stacked depth are additions. |
| [Botanical](../../themes/botanical/design.md#geometry-and-elevation) | Preserve asymmetric cover/control corners and calm reading. Square paper is an artifact exception, not a replacement of its identity. |
| [Play](../../themes/play/design.md#geometry-and-elevation) | Keep its 30px cover and 14px controls. Notebook shading differs from its hard offset panel language; declare that change. |
| [Swiss](../../themes/swiss/design.md#geometry-and-elevation), [Precision](../../themes/precision/design.md#geometry-and-elevation), [Gallery](../../themes/gallery/design.md#spacing-layout-and-geometry) | Ordinary surfaces rest flat; Swiss cautions against soft shadows and bevels. Notebook depth needs a deliberate departure. Near-square paper alone does not resolve the conflict. |
| [Blueprint](../../themes/blueprint/design.md#geometry-and-elevation) | Its drafting grid and offset depth are separate rules. Decorative binding lines must remain distinguishable from meaningful diagram relationships. |
| [Pulse](../../themes/pulse/design.md#geometry-and-elevation) | Task surfaces rest flat. A selected reading artifact must not replace operational panels or meaningful progress graphics. |
| [Layered](../../themes/layered/design.md#shape-material-and-depth) | Its rules reject inset physical-control bevels. The reference retains native ordinary controls without such bevels; notebook hardware/depth still needs explicit scope. |

Preserved tokens do not preserve composition, imagery or a complete interaction model. A profile check establishes only its recorded conditions; other variants require fresh assessment.

## Bounded Fieldbook recipe

The reference uses an indexed notebook, layered pages and binding around an **opaque theme Raised** reading face. Dark appearance keeps dark semantic roles; paper does not require white. Only the paper artifact receives **2px corners**. The outer cover keeps source `--card-radius`; ordinary controls keep source `--control-radius`, including asymmetric values.

| Role | Original Atlas choice and boundary |
| --- | --- |
| Cover | Surface shell, **18px empty rim**, source corners and opaque Raised inner face. Dashed seam stays on the rim. |
| Cover depth | Decorative **0 12px 25px rgb(0 0 0 / .14)** pseudo-layer behind the opaque face. |
| Paper | **2px corners**; padding **12px top/right/bottom, 36px left** around opaque Raised `.paper-face`. |
| Page stack | Two empty **2px-corner** pseudo-pages with **1px Border** edges. First insets: top 4px, bottom -4px, left 7px, right -4px. Second: top 8px, bottom -8px, left 11px, right -8px. |
| Page depth | Decorative **1px 2px 0 rgb(0 0 0 / .12)** shadow behind the face; no selected or saved meaning. |
| Ruled detail | Subtle horizontal marks only in the left **24px gutter**. Any separately chosen grain has the same restriction. |
| Binding | Rail **8px** from the left edge, **24px** wide; four decorative **34 by 12px** CSS rings, outside the face. |
| Necessary control edge | **1px solid Border**, with actual adjacent-color checks and a documented contrasting override if needed. |
| Current note | **2px Ink outline / 3px gap**, visible **Selected** mark and `aria-pressed`. Supplementary mark is `aria-hidden`; selection does not alter the accessible name. |
| Keyboard focus | Immediate **3px Ink outline / 3px gap**, a scoped override of source Focus. Selected text and semantics persist if focus replaces its outline. |
| Optional held press | **1px downward translation / 120ms ease**, transform only, off by default. |

These values describe this specimen, not canonical family tokens. The [stylesheet](preview/styles.css) owns actual stacking and responsive details. No texture asset, icon library, blur, translucent content face or animation runtime is required.

Keep pseudo-layers below opaque faces, pointer-transparent and free of foreground. Shield tiny metadata, errors and state marks as well as paragraphs. Inspect centers and corners: asymmetric cover geometry must not expose decoration beneath glyphs near an edge.

Use border-box sizing and reserve room for page offsets and outlines. Let containers grow; do not clip focus or put text across seams and rings. Removing the shield requires checking effective rendered backgrounds everywhere text appears; nominal Raised-token contrast no longer describes that composition.

Fieldbook searches, inspects and edits fictional notes. **Apply locally** updates only the selected note's applied snapshot in this open page; **Revert draft** restores that snapshot. Per-note drafts survive switching/filtering and appearance changes; index names use applied titles. A deliberate applied rename may change a button's name. **Download applied text** creates a real file of the selected applied snapshot, excluding unapplied edits. There is no backend, localStorage or reload persistence. Exact content, validation limits and results belong in [preview notes](preview/README.md), not the family contract.

## Layout, typography and state

Preserve the host font roles, readable size, line height, measure and semantic heading order. A physical artifact does not require handwriting, tiny marginal labels or uppercase prose. Local font stacks supply no binaries and do not prove the selected face or language coverage rendered.

Keep DOM and visual reading order coherent. At narrow widths, reflow index before detail and preserve context; never shrink the notebook as a fixed illustration. Wrap titles, allow fields/actions to grow and prevent general page overflow.

| Situation | Invariant |
| --- | --- |
| Action | Clear native semantics and truthful immediate outcome, independent of material or animation. |
| Selection | Persistent non-color mark, appropriate programmatic state and visible boundary; depth alone is insufficient. |
| Focused selection | Visible keyboard focus plus persistent selected information. |
| Invalid/unavailable | Associated actionable explanation and correct semantics; preserve last valid content. |
| Search or switching context | Preserve relevant drafts/selection and provide recovery if the current item is filtered out. |

Fieldbook uses native index buttons, not an incomplete tab widget. Its `aria-pressed` and stable names follow the [W3C button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/). Ordinary Apply, Revert and Download actions are not toggles. Other widgets need their own appropriate semantics.

Temporary held press differs from persistent selection. Keep immediate static feedback, clear transient states on release/cancellation and avoid moving focus for decoration. Announce meaningful results without announcing every keystroke or theme change.

The reference's **44px** target height is an Atlas comfort choice. [SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) specifies **24 by 24 CSS pixels**, with exceptions and spacing conditions; height alone does not assess the target.

## Appearance, preferences and evidence

Support **Light, Dark and System**; System follows live changes. Preserve task state across appearance changes. Keep useful static content and explain controls unavailable without scripts. A consuming project adding persistence needs its own storage, failure and recovery contract.

In **forced colors**, remove decorative shadows, seams, rules, page-stack/binding effects, transforms and transitions. Use **Canvas/CanvasText** for planes, faces and index surfaces, and **ButtonFace/ButtonText** for ordinary actions. Retain necessary boundaries, Selected text, semantics and focus: reference selection is **2px CanvasText / 3px gap**, focus **3px CanvasText / 3px gap**. Do not add Canvas text backplates to Highlight-filled faces. Set heading accents to CanvasText and remove leftover decorative dot/ring content. Permit user-agent adjustment instead of broad `forced-color-adjust: none`.

Motion is **off by default**. Reduced motion removes transitions **and** translation, including instantaneous displacement. Keep immediate feedback and follow live preference changes; load [motion.md](motion.md) only when movement is selected.

Check actual opaque foreground/background pairs against [SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): **4.5:1** for ordinary text, **3:1** for qualifying large text, with defined exceptions. Check necessary control/state information against adjacent colors under [SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), generally **3:1** with exceptions. A Border token, shadow or stroke width proves neither.

Test both appearances, live System changes, reflow, text/native zoom, keyboard/pointer cancellation, stable names, actual task outcomes, preference fallbacks and script failure. [Validation](validation.md) records actual conditions and limits. Research, screenshots and profile calculations do not certify complete theme compatibility, product accessibility, storage, screen-reader flow or device behavior. Status remains **draft**.
