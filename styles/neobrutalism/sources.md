# Neobrutalism — sources and credits

Reviewed/read: **2026-10-27**. Style revision: **0.1.0-draft**. This date records inspection of live references; only the explicitly identified repository commit below is immutable.

## Authorship and evidence boundaries

**Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**, is credited for this original Interface Atlas interpretation and reference specimen. Its exact 2px outline, 4px hard-shadow offset, theme projection, geometry preservation, state rules, optional 2px displacement, fictional content and local HTML/CSS/JavaScript are Atlas work. No external component code, article prose, illustration, screenshot, logo, icon or font binary is imported.

Keep three kinds of statements distinct:

- **Source facts:** identified authorship, repository license, the references' stated scope and standards thresholds.
- **Atlas inferences:** conditional fit, selective application and the distinction between a style family and a complete theme.
- **Atlas recipe choices:** the numerical treatment, theme mapping, state contract and fallbacks. These are not quoted source defaults or independently measured usability findings.

The inspected references do **not** establish one inventor or a precise origin date for the broad neobrutalism style. Credit an authored implementation or explanation for that work; do not promote its author to sole inventor of the wider visual family.

## Contemporary implementation reference

| Primary source | Credit and observed fact | Scope and reuse status |
| --- | --- | --- |
| [Neobrutalism components — introduction](https://www.neobrutalism.dev/docs) | The project describes a collection of neobrutalism-styled React/Tailwind components, mostly based on shadcn/ui and built on Base UI. Its footer credits **Samuel**; the [ekmas GitHub profile](https://github.com/ekmas) identifies **Samuel Breznjak**. | Contemporary implementation and explanatory reference. The live documentation is not pinned to the repository snapshot below. Its description does not prove authorship of the broader style. |
| [ekmas/neobrutalism-components at inspected commit](https://github.com/ekmas/neobrutalism-components/tree/3306a802724874a85f93079702b2795370a279d4) | **Samuel Breznjak (ekmas)**, project creator; repository contributors retain their respective work. Public `main` resolved through `git ls-remote` on 2026-10-27 to **`3306a802724874a85f93079702b2795370a279d4`**. | Version anchor for the source and license inspection, not an Atlas dependency. No component source or assets are copied. |
| [LICENSE at that commit](https://github.com/ekmas/neobrutalism-components/blob/3306a802724874a85f93079702b2795370a279d4/LICENSE) · [raw text](https://raw.githubusercontent.com/ekmas/neobrutalism-components/3306a802724874a85f93079702b2795370a279d4/LICENSE) | Exact file read at the pinned commit: **MIT License**, **Copyright (c) 2023 Samuel Breznjak**. | If later copying code or substantial covered portions, retain the copyright and permission notice required by that license and inspect the selected material's other dependencies. The repository license is not blanket permission for every linked image, font, logo or third-party project. |

Atlas's existing [Play source record](../../themes/play/sources.md) separately credits Tamir's portfolio and Samuel Breznjak's components as an Atlas comparison. That comparison does not establish that Tamir used the library. The [Play design specification](../../themes/play/design.md) records its own shadow and focus values; this style's numerical recipe is an explicit adaptation.

The current documentation's implementation stack and dependencies describe that project's work. Atlas's original framework-independent recipe requires neither that library nor React, Tailwind, shadcn/ui or Base UI. Its use of ordinary outlines and hard shadows does not constitute a component port.

## Adjacent web brutalism

| Primary source | Credit and observed fact | Limited role and reuse status |
| --- | --- | --- |
| [Guidelines for Brutalist Web Design](https://brutalist-web.design/), visible update **2025-06-01** | **David Bryant Copeland**, author. Explains a content-centered approach emphasizing readable content, recognizable links/buttons and ordinary browser behavior. | An adjacent authored viewpoint. This guidance is not a definition of the colorful outlined component style and does not establish its invention. The page states **CC BY-NC-SA 4.0 International** for its material; see its [license](https://creativecommons.org/licenses/by-nc-sa/4.0/). Atlas links and independently summarizes it without importing prose, images or source code. No commercial reuse or relicensing permission is inferred. |
| [Brutalist Websites](https://brutalistwebsites.com/) | A collection presenting sites under the brutalism label, with a visible introductory statement and interviews. | Context for the broader label and visual diversity only. The inspected homepage did not establish a curator credit, founding date or blanket reuse license; these remain unclaimed. No listed site, screenshot, artwork or code is copied. A gallery's inclusion is not an endorsement of accessibility or a license to reuse the submitted work. |

**Atlas distinction:** the strong outlines, opaque fills and offset shadows selected here are one contemporary form recipe. Web brutalism also includes different content and construction philosophies. These references are not a complete style history, and Atlas does not equate disorientation or broken interaction with a required aesthetic.

## Accessibility and platform references

**W3C Accessibility Guidelines Working Group and contributors** are credited for [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and its informative Understanding documents, inspected **2026-10-27**.

| Source | Verified fact and limited role |
| --- | --- |
| [Contrast (Minimum), SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | **4.5:1** for ordinary text and **3:1** for qualifying large text, with defined exceptions. This concerns actual foreground/background pairs; a bold typeface or thick outline alone proves nothing. |
| [Non-text Contrast, SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | Generally **3:1** for visual information needed to identify controls, states and meaningful graphical parts against adjacent colors, with defined exceptions. Decorative shadows need not be the identifying boundary. |
| [Target Size (Minimum), SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | **24 by 24 CSS pixels**, with stated exceptions and spacing conditions. The specimen's 44px control height is a separate Atlas choice and does not alone establish compliance. |
| [Animation from Interactions, SC 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) · [Technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) | The **Level AAA** criterion addresses disabling nonessential motion triggered by interaction. C39 describes using `prefers-reduced-motion` to prevent motion. These sources support the preference contract, not Atlas's chosen displacement or timing. |

**W3C CSS Working Group**, including the editors and contributors named in [CSS Color Adjustment Module Level 1](https://www.w3.org/TR/css-color-adjust-1/), is credited for the forced-color and color-scheme model. The inspected latest published page identifies a **2025-12-16 Candidate Recommendation Snapshot**, not a final Recommendation. Its [forced-color section](https://www.w3.org/TR/css-color-adjust-1/#forced) explains user-agent palette adjustment; shadows can be removed by the mode, so Atlas retains actual boundaries and static state labels.

W3C's documents have their own linked copyright and reuse notices. No W3C prose, diagrams or sample implementation is imported. Understanding documents and techniques explain requirements and examples; they are not conformance certificates for this style.

## Reuse and remaining limits

All external references remain source links rather than bundled dependencies or assets. Preserve this authorship distinction. A public URL, an MIT implementation or a gallery entry does not grant blanket rights to another creator's artwork, trademarks or linked materials.

Future imports require the exact chosen material's license, version, copyright and retained notices. Atlas's own publishing terms remain undecided. [Validation](validation.md) separately states which theme profiles, browser states, preferences and interactions were actually checked. Research and numerical contrast requirements do not establish complete product accessibility, measured user benefit or real-device performance.
