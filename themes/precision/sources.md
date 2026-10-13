# Precision — sources and credits

Reviewed: **2026-10-13**. Theme revision: **0.1.0-draft**.

## Theme authorship and reference roles

**Precision is an original Interface Atlas synthesis**, prepared for **Tamir (Phi Vuong Tuong Tam) with Codex AI assistance**. The documentation, proposed palette and scales, reference-preview HTML/CSS/JavaScript, static composition, fictional records, and simulation behavior are original Atlas work. The theme is not extracted from Tamir's portfolio and is not an official renamed Carbon or Primer theme.

**IBM and the Carbon Design System team/contributors** are credited for the referenced color-role, grid, type, and productive-motion concepts. **GitHub and the Primer team/contributors** are credited for referenced product-layout and accessible agent-interaction guidance. IBM and GitHub do not author or endorse this complete Atlas entry. References do not imply permission to copy their branding, website artwork, or documentation.

## Primary design and interaction references

The following website pages were inspected on **2026-10-13**. Website guidance is a dated observation, not a claim that these pages are pinned to the separate repository commits below. No documentation passage, website image, diagram, or component example is reproduced.

| Reference | Credited creator or maintainer | Referenced concept and Atlas boundary |
| --- | --- | --- |
| [Carbon color overview](https://www.carbondesignsystem.com/building-blocks/foundations/color/overview) | **IBM; Carbon team and contributors** | Semantic color roles and neutral layering. Precision's cool palette, values, and selected pairings are independent Atlas proposals. |
| [Carbon typography type sets](https://www.carbondesignsystem.com/building-blocks/foundations/typography/type-sets) | **IBM; Carbon team and contributors** | IBM Plex and productive/expressive type distinctions. Precision's type scale, role choices, and reading measure are Atlas proposals. |
| [Carbon 2x Grid overview](https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview) | **IBM; Carbon team and contributors** | 8px mini unit and shared alignment. Precision's 4/12px refinements and content-fit layout options are Atlas proposals; Carbon grid code is not copied. |
| [Carbon motion overview](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview) | **IBM; Carbon team and contributors** | Productive motion; standard curve and 110/150ms reference tokens. Precision selects 110ms feedback and proposes optional bounded disclosure; no motion runtime is imported. |
| [Primer layout](https://primer.style/product/getting-started/foundations/layout/) | **GitHub; Primer team and contributors** | Header, content, and supporting pane regions; list-detail context. Precision's workspace composition, DOM order, and breakpoint choices are Atlas proposals. |
| [Primer focus management](https://primer.style/accessibility/design-guidance/focus-management/) | **GitHub; Primer accessibility contributors** | Reference for deliberate focus entry and return. Precision's Inspect/Back behavior and 3px outline/offset are explicit Atlas choices. |
| [Primer Copilot accessibility practices](https://primer.style/accessibility/patterns/copilot-accessibility-practices/) | **GitHub; Primer and accessibility teams/contributors** | Focus continuity, state semantics, and asynchronous announcements. Precision's separate execution/attention/connection/command contract is an Atlas proposal. |

The preview does not import Carbon components, Primer components, icons, style sheets, sample markup, or software. Similar functional requirements do not assign ownership of its original composition to a reference system.

## Pinned repository and reuse records

These snapshots identify the inspected project identity and software-license scope. They do **not** pin the live website pages above or assert that any code from these snapshots is redistributed.

| Project | Inspected repository snapshot | Reuse record and scope |
| --- | --- | --- |
| [Carbon Design System](https://github.com/carbon-design-system/carbon/tree/c9b1f79128df93d79e7a65ced3ad1bed5709c7cc) | `c9b1f79128df93d79e7a65ced3ad1bed5709c7cc` | [Apache License 2.0](https://github.com/carbon-design-system/carbon/blob/c9b1f79128df93d79e7a65ced3ad1bed5709c7cc/LICENSE). Software-package terms, not blanket website-artwork or trademark permission. No software copied. |
| [Primer React](https://github.com/primer/react/tree/7f5303d803986887187d86dcebaeda22a4dc6823) | `7f5303d803986887187d86dcebaeda22a4dc6823` | [MIT License](https://github.com/primer/react/blob/7f5303d803986887187d86dcebaeda22a4dc6823/LICENSE), copyright **2018 GitHub, Inc.** No React implementation or documentation prose copied. This package license is distinct from the website references. |
| [IBM Plex](https://github.com/IBM/plex/tree/763c36ef9117782905ae010056dfbe8fd2653a25) | `763c36ef9117782905ae010056dfbe8fd2653a25` | [SIL Open Font License 1.1](https://github.com/IBM/plex/blob/763c36ef9117782905ae010056dfbe8fd2653a25/LICENSE.txt). Font-software terms. No font binary, source font, or font service included. |

Precision's discovery metadata records the composite Carbon and Primer repository revision. The IBM Plex snapshot is separately recorded because font selection and distribution have their own provenance.

Before incorporating any actual upstream code or font package into a future project, inspect the exact selected version, copyright notice, license, dependencies, and any required notices. Preserve the requirements of the material actually incorporated. An attribution link is not a substitute for those notices. Atlas's own publishing terms remain undecided.

## Font creators and package selection

**Chosen theme families:** IBM Plex Sans for interface and reading text; IBM Plex Mono for short technical values. This selection is an Atlas proposal informed by Carbon's use of Plex.

**Credited creators:** **IBM, Mike Abbink, and Bold Monday**. Bold Monday's [primary IBM project page](https://boldmonday.com/custom/ibm/) identifies **Paul van der Laan, Pieter van Rosmalen, Barbara Bigosińska, Diana Ovezea, Aleksandra Samuļenkova, Jasper Terra, Edgar Walthert, Marko Hrastovec, and Pablo Gamez** in its team credits. These credits describe the listed collaboration, not sole authorship of every later script or glyph. Preserve the actual selected package's additional contributor and copyright records for language-specific families.

The pinned [IBM Plex README](https://github.com/IBM/plex/blob/763c36ef9117782905ae010056dfbe8fd2653a25/README.md) lists separate Sans, Mono, and script packages. Choose the required weight and language coverage deliberately rather than treating one family name as a complete international font bundle. Package versions and notices belong in the consuming project's source record.

The preview names Plex in CSS but includes no font files or remote font requests. Devices without these families use local sans/monospace fallbacks. Intended Plex rendering and complete language coverage are not established by this package's browser evidence.

## Guidance references

| Reference | Responsible contributors | Use in Atlas |
| --- | --- | --- |
| [WCAG 2.2 contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | **W3C Accessibility Guidelines Working Group and contributors** | Opaque numerical pair calculations and necessary boundary/focus checks; no complete-conformance claim. |
| [WCAG 2.2 reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) and [animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | **W3C Accessibility Guidelines Working Group and contributors** | Reference for responsive content and reduced-motion alternatives. |
| [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) and [button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | **W3C ARIA Authoring Practices Task Force and contributors** | Relevant semantics and keyboard/focus behavior, including a stable label for the pressed connection toggle; native controls remain preferred where appropriate. |
| [Atlas Agent Experience guide](../../knowledge/agent-experience.md) | **Interface Atlas; Tamir with Codex AI assistance** | Local preparation guidance for authority, commands, freshness, and recovery; no backend contract supplied by the visual theme. |

## Atlas adaptation record

| Atlas choice | Reason | Evidence and status |
| --- | --- | --- |
| Original cool light/dark palette with semantic roles | Make hierarchy portable while keeping upstream systems' values and identities separate | Atlas proposal; listed opaque pairs calculated in [design.md](design.md) |
| Compact default and comfortable adaptation | Support repeated operational work without shrinking action areas | Atlas proposal; representative preview evidence recorded separately |
| IBM Plex roles and modest heading scale | Provide technical character and readable prose without marketing display dominating the task | Font creators credited; actual intended-font rendering remains a project check |
| 4px geometry and flat resting layers | Reduce incidental decoration and keep grouped information clear | Atlas proposal, not copied upstream component geometry |
| Explicit Inspect/Back focus contract and preserved filters | Keep evidence navigation understandable on narrow and wide layouts | Atlas interaction choice; preview demonstrates representative local behavior |
| Separate confirmed execution, attention, connection, and pending command | Avoid presenting an unacknowledged request or disconnection as an execution outcome | Atlas state model; fictional local demonstration, no production API |
| 110ms productive feedback; immediate content and no loops | Give brief response while preserving targets and essential information | Reference curve/timing credited to Carbon; Atlas application choice |
| Original preview composition and records | Show project suitability without reproducing a branded product or claiming measured outcomes | AI-assisted Atlas implementation; no upstream code/assets copied |

Keep **referenced concepts**, **Atlas proposals**, **numerical calculations**, **rendered validation**, and **reuse permission** distinct. Future changes should record the reason, exact source/version when incorporated, and relevant checks. Generated project documents should retain the creator credits for selected guidance and fonts.
