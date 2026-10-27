# Claymorphism — sources and credits

Reviewed/read: **2026-10-27**. Style revision: **0.1.0-draft**. This date records inspection of live references; only the identified repository commit below is immutable.

## Authorship and evidence boundaries

**Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**, is credited for this original Interface Atlas interpretation and reference specimen. The exact shell/content construction, 28px/12px/16px geometry, shading values, theme projections, state rules, optional 1px/120ms press, fictional Little studio content and local HTML/CSS/JavaScript are Atlas work. No external article prose, component code, illustration, screenshot, logo, icon or font binary is imported.

Keep three kinds of statements distinct:

- **Source facts:** identified authors, publication dates, an inspected package declaration and standards thresholds.
- **Atlas inferences:** conditional suitability, selective application and the distinction between a form family and a complete theme.
- **Atlas recipe choices:** the opaque content shield, numerical treatment, explicit shell geometry override, state contract and fallbacks.

An authored term or explanation does not establish invention of every earlier soft 3D shape, image or interface. Naming credit and antecedent artwork credit remain distinct.

## Naming, explanation and antecedents

| Primary source | Credit and observed fact | Limited role and reuse status |
| --- | --- | --- |
| [Claymorphism in user interfaces — original UX Collective publication](https://uxdesign.cc/claymorphism-in-user-interfaces-1757fabaa377) | Published **20 December 2021**, by **Michal Malewicz**; the lead-image caption credits **Diana Malewicz**. | Primary record of the dated article and image credit. The accessible original page supplies metadata and an opening excerpt; the full author-hosted text is linked below. No article artwork or prose is copied. |
| [Claymorphism in User Interfaces — author-hosted full article](https://hype4.academy/articles/design/claymorphism-in-user-interfaces) | By **Michał Malewicz**. Explains inflated rounded forms and inner/outer shading, and acknowledges preceding soft 3D work including Pitch, Amrit Pal Singh, Sam Briskar and Icons8. | Primary explanatory context. Atlas credits Malewicz for the term and explanation, not sole invention of soft 3D. The older artwork belongs to its respective creators; no linked art or asset is imported. |
| [How To Create Claymorphism Using CSS](https://hype4.academy/articles/coding/how-to-create-claymorphism-using-css) | By **Albert Walicki**. Demonstrates rounded surfaces and inner/outer CSS shadows. | Independent coding explanation, not Atlas's geometry, colors or implementation. No permissive article/code license was verified on the inspected page; copying rights remain unresolved. |
| [Claymorphism: Will It Stick Around?](https://www.smashingmagazine.com/2022/03/claymorphism-css-ui-design-trend/) | By **Adrian Bece**, **16 March 2022**. Explicitly credits Malewicz for coining the term and discusses CSS construction, use cases and clay.css. | Explanatory and implementation reference. Article prose, embedded examples, illustrations and third-party images are not imported; no blanket reuse license is inferred. |

The original article spells its author's given name **Michal**; the full author-hosted page uses **Michał**. These identify the same credited author.

The author's full article is evidence of his account of earlier artwork, not a complete independently verified history of every cited project. Atlas does not repeat the sources' market predictions, unreplicated preference-test claims or any claim that claymorphism eliminates accessibility problems. Contrast, interaction, state and motion requirements require independent evaluation.

No permissive reuse terms were verified for the Malewicz article or its imagery. Public access and source attribution do not authorize copying. This entry links and independently describes the material without importing article text, screenshots, example graphics or binaries.

## clay.css version and reuse boundary

| Primary source | Verified detail | Scope and reuse status |
| --- | --- | --- |
| [codeAdrian/clay.css at inspected commit](https://github.com/codeAdrian/clay.css/tree/30dfeb9d75a6f5d081d5199fa47a74015f78e8e0) | Public master resolved through git ls-remote and GitHub API on **2026-10-27** to **30dfeb9d75a6f5d081d5199fa47a74015f78e8e0**. | Version anchor for research, not an Atlas dependency. Bece authored the referenced project; contributors retain their respective work. |
| [package.json at that commit](https://github.com/codeAdrian/clay.css/blob/30dfeb9d75a6f5d081d5199fa47a74015f78e8e0/package.json) · [raw file](https://raw.githubusercontent.com/codeAdrian/clay.css/30dfeb9d75a6f5d081d5199fa47a74015f78e8e0/package.json) | Package **claymorphism-css**, version **1.0.5**, author **Adrian Bece**, declares **MIT** in its license field. | A package declaration is the observed fact. The recursive tree contained no LICENSE file; inspected README, source SCSS and distributed CSS/SCSS contained no full copyright or permission notice. Complete notice and copied-code reuse clearance remain **unresolved**. |
| [README at that commit](https://github.com/codeAdrian/clay.css/blob/30dfeb9d75a6f5d081d5199fa47a74015f78e8e0/README.md) | Describes a configurable CSS utility class and Sass mixin and credits Malewicz for the name. | Atlas uses an original local implementation. It does not install, import, vendor or adapt this library's source, examples, images or generated files. |

Do not invent a missing copyright notice or treat MIT metadata as permission for every linked asset. Before any future import, resolve the exact selected material's terms and required notices. Atlas's original use of ordinary CSS shadows is not a library port.

## Accessibility and platform references

**W3C Accessibility Guidelines Working Group and contributors** are credited for [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and its informative Understanding documents, inspected **2026-10-27**.

| Source | Verified fact and limited role |
| --- | --- |
| [Contrast (Minimum), SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | **4.5:1** for ordinary text and **3:1** for qualifying large text, with defined exceptions. Test actual opaque foreground/background pairs; a soft perimeter does not prove compliance. |
| [Non-text Contrast, SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | Generally **3:1** for visual information needed to identify controls, states and meaningful graphics against adjacent colors, with defined exceptions. Decorative shadows cannot automatically carry necessary boundaries or state. |
| [Target Size (Minimum), SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | **24 by 24 CSS pixels**, with stated exceptions and spacing conditions. The reference's 44px control-height aim is a separate Atlas choice. |
| [Animation from Interactions, SC 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) · [Technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) | The **Level AAA** criterion addresses disabling nonessential interaction motion. C39 describes using prefers-reduced-motion as one sufficient technique. Neither mandates Atlas's offset or timing. |

**W3C CSS Working Group**, including the named editors and contributors, is credited for [CSS Color Adjustment Module Level 1](https://www.w3.org/TR/css-color-adjust-1/). The inspected latest published page identifies a **16 December 2025 Candidate Recommendation Snapshot**, not a final Recommendation. Its [forced-color model](https://www.w3.org/TR/css-color-adjust-1/#forced) explains user-agent palette adjustment and removal of shadows, which makes independent boundaries and static state cues necessary.

W3C documents retain their own linked copyright and reuse notices. No W3C prose, diagram or sample code is imported. Understanding documents and techniques explain requirements; they do not certify this recipe.

## Remaining limits

External references remain links, not bundled assets or dependencies. Fonts named in theme profiles are local stack declarations; no font files or licensing permission are supplied. Atlas's own publishing terms remain undecided.

[Validation](validation.md) records the actual profile, browser, preference and interaction checks. Research and contrast requirements do not establish complete product accessibility, measured user benefit, every font's rendered identity or real-device performance. Preserve **draft** status and distinguish source inspection from rendered evidence.
