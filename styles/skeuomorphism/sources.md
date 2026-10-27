# Skeuomorphism — sources and credits

Reviewed/read: **2026-10-27**. Style revision: **0.1.0-draft**. This date records inspection of live sources; no immutable external source snapshot or implementation dependency is bundled.

## Authorship and evidence boundaries

**Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**, is credited for this original Interface Atlas interpretation and its Fieldbook reference specimen. The indexed-notebook composition, fictional notes, opaque content shields, perimeter-only binding and page treatment, exact geometry, theme projections, independent state cues, local editing/download behavior and optional 1px/120ms press are Atlas work. No external article prose, screenshot, artwork, logo, icon, component code or font binary is imported.

Keep these claims separate:

- **Source facts:** the named authors, organizations, publication records and specific interface behavior identified below.
- **Atlas inferences:** conditional theme suitability, the distinction between a familiar interaction metaphor and physical-material rendering, and the need to disclose persistence when an artifact suggests durability.
- **Atlas recipe choices:** every numerical value, scope, opaque shield, state contract and fallback. These are not canonical historical tokens or measured usability findings.

No universal creator, first use or etymological coinage of **Skeuomorphism** is assigned. A system's creators, an article's authors and the authors of this Atlas interpretation have different roles.

## Specific primary precedents

| Primary material | Credit and observed evidence | Limited role and reuse boundary |
| --- | --- | --- |
| [Designing the Star User Interface](https://guidebookgallery.org/articles/designingthestaruserinterface/) | **David Canfield Smith, Charles Irby, Ralph Kimball and Bill Verplank**, Xerox Corporation. The reprint identifies **BYTE, April 1982, pp. 242–282** and displays these four authors in its byline. | Author-written primary account, accessed through **Marcin Wichary's GUIdebook** archive. It describes electronic office objects and explicitly permits capabilities beyond the physical analogy. It is an office-metaphor precedent, not proof that Star invented this entire style family. The separate Star overview cited in its bibliography includes **Eric Harslem**; that is a different authorship record. No article-specific permission to redistribute its text or figures was established. |
| [Apple Unveils Mac OS X](https://www.apple.com/newsroom/2000/01/05Apple-Unveils-Mac-OS-X/) | **Apple**, official release dated **5 January 2000**, identifies Aqua as an Apple-created interface and describes luminous, semitransparent controls and animation. | A specific later visual-interface example, not authorship of all Skeuomorphism. The release does not establish individual creator credits or a general asset license. Apple product names and trademarks remain Apple's. |
| [Getting Started with Apple iOS Devices](https://images.apple.com/education/docs/Getting_Started_with_Apple_iOS_Devices_20110308.pdf#page=14) | **Apple Inc.**, **March 2011**, printed page **14** (PDF page 14). Its iBooks section describes a bookshelf, opening a book and swiping to turn pages. | Official evidence of a particular book metaphor. The guide also describes digital reading tools, including search and adjustable type. Copyright notice states all rights reserved. No guide text, product screenshot, bookshelf art or page-flip code is reused. |

The Star paper's byline and its separate overview citation must not be collapsed into a five-author byline. These references identify concrete systems and artifacts; they are not a claim that physical resemblance began with Xerox or Apple.

## Conceptual reading

**Don Norman** is credited for the following author-hosted explanations, not as the creator of Skeuomorphism:

| Source | Verified role and interpretation boundary |
| --- | --- |
| [Signifiers, not affordances](https://jnd.org/signifiers-not-affordances/) | The page is dated **17 November 2008** and identifies publication in **ACM Interactions, volume 15, issue 6**. Norman distinguishes possible actions from the perceivable clues people need to understand action and state. Atlas consequently supplies clear labels, boundaries and independent state feedback rather than assuming that a binding or raised shape explains operation. |
| [Affordances and Design](https://jnd.org/affordances-and-design/) | The author distinguishes actual possibilities, perceived possibilities and learned conventions. He also warns that users can take metaphors too literally. Atlas treats physical familiarity as a hypothesis to test and retains direct search, native actions and truthful storage information. |

The inspected JND.org footer displays a general **Creative Commons Attribution–NonCommercial 4.0 International** notice. The first article also identifies its ACM publication; that footer is not treated as an article-specific clearance for commercial redistribution or third-party material. Both articles remain links, with no prose or figures imported.

A flat folder symbol can carry an office metaphor without a fully rendered physical material. Conversely, a textured shape can be decoration without explaining interaction. This distinction is the Atlas organizing judgment for this entry, not a quotation or a universal taxonomy attributed to those authors.

## Accessibility and platform references

**W3C Accessibility Guidelines Working Group and contributors** are credited for [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and its informative Understanding documents and techniques; **W3C ARIA Working Group and contributors** for the Authoring Practices Guide. These pages were inspected **2026-10-27**.

| Source | Verified fact and bounded role |
| --- | --- |
| [Contrast (Minimum), SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | **4.5:1** for ordinary text and **3:1** for qualifying large text, with defined exceptions. Check actual foreground/background pairs. |
| [Non-text Contrast, SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | Generally **3:1** for necessary visual information identifying controls, states and meaningful graphics against adjacent colors, with defined exceptions. Decorative page edges are not sufficient control identification. |
| [Target Size (Minimum), SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | **24 by 24 CSS pixels**, with exceptions and spacing conditions. Atlas's 44px comfort target is a separate choice. |
| [Button pattern — ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Toggle-style buttons expose `aria-pressed` and keep the accessible label stable when the pressed state changes. This is the limited reference for the specimen's native index-button state contract. |
| [Animation from Interactions, SC 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) · [Technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) | The **Level AAA** criterion concerns disabling nonessential interaction motion; C39 describes a sufficient `prefers-reduced-motion` technique. Neither defines Atlas's timing or displacement. |

**W3C CSS Working Group**, including the listed editors and contributors, is credited for [CSS Color Adjustment Module Level 1](https://www.w3.org/TR/css-color-adjust-1/). The inspected document identifies a **16 December 2025 Candidate Recommendation Snapshot**, not a final Recommendation. Its [forced-color section](https://www.w3.org/TR/css-color-adjust-1/#forced) supports user-agent palette adjustment; Atlas supplies its own static system-color fallback.

W3C sources retain their linked copyright and reuse notices. No standards prose, diagrams or sample code are imported. Guidance and calculations do not certify this style or a complete product.

## Reuse and remaining limits

All external materials remain references rather than bundled dependencies. Public availability and organization credit do not establish permission to copy a screenshot, font, logo, article or asset. Unknown or artifact-specific terms remain unresolved; any future import requires the exact material's license, version, copyright and retained notices.

The nine projected theme profiles retain their own [theme source records](../../catalog/themes.json) and mappings in [theme-tokens.json](preview/theme-tokens.json). A named local font stack supplies no font binary or proof of actual glyph rendering. Atlas's publishing terms remain undecided.

[Validation](validation.md) records actual browser, profile, preference and interaction evidence. Source research, a familiar metaphor and passing token checks do not establish a complete theme combination, durable storage, screen-reader conformance, real-device performance or measured usability.
