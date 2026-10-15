# Layered — sources and credits

Reviewed: **2026-10-15**. Theme revision: **0.1.0-draft**. Atlas research record: `atlas-layered-research-2026-10-15`.

## Authorship and material boundaries

**Layered is an original Interface Atlas synthesis for Tamir (Phi Vuong Tuong Tam), prepared with Codex AI assistance.** Its exact colors, surface mappings, typography choices, type scale, spacing, geometry, focus dimensions, feedback timing, static artwork, fictional project fixtures, editing/recovery contract and native HTML/CSS/JavaScript are Atlas proposals. It is not a port, official Material or Fluent theme, portfolio extraction, or endorsed design-system implementation.

The dated Atlas record identifies this synthesis. It does not freeze live websites or claim an upstream design-system release. Repository pins below are limited software/metadata/license evidence, not seeds for copied implementation. No upstream code, component markup, configuration, tokens, prose, screenshots, logos, icons, shape-library assets, images or font files are included.

| Material | Provenance and role |
| --- | --- |
| Specification, fictional Small plans workspace and native preview | Original work prepared for Tamir with Codex AI assistance. |
| Code-native static geometric decoration | Original Atlas artwork, where used; no Google or Microsoft shape/icon library imported. |
| Material Design 3 | Primary conceptual reference for purposeful surface roles, limited elevation, coherent shapes, adaptive composition and states. |
| Fluent 2 | Separate comparison for solid opaque material, depth and readable application hierarchy. |
| Plus Jakarta Sans selection | Named family only, with local fallbacks; no font software or remote service distributed. |
| WHATWG and W3C guidance | Standards and interaction references for the native modal, focus, controls, validation and recovery. |

## Google Material Design 3 references — R39

**Creator/publisher credit:** **Google's Material Design team and contributors**. Individual authors were not established for these guideline pages. All URLs below were inspected on **2026-10-15**; JavaScript-dependent pages were rendered from the official site rather than relying on third-party mirrors.

| Primary reference | Observed concept and limited role |
| --- | --- |
| [Color roles](https://m3.material.io/m3/pages/color-roles?s=m3) | Surface/container roles can distinguish regions; retain role meaning when the layout changes. Layered proposes a separate six-surface palette rather than Material tokens or dynamic color. |
| [Elevation overview](https://m3.material.io/styles/elevation/overview) | Tonal fills and selective shadows can express relative depth. Layered chooses its own limited treatment. |
| [Shape overview and principles](https://m3.material.io/styles/shape/overview-principles) | Repeated geometry can cohere with type. The page records a May 2025 M3 Expressive update; no shape library or morphing is imported. |
| [Breakpoints overview](https://m3.material.io/foundations/layout/breakpoints/overview) | Available space can change pane and navigation arrangement while preserving function. Layered's CSS dimensions and fit decisions are its own. |
| [States overview](https://m3.material.io/foundations/interaction/states/overview) | Focus, selection, hover, disabled and pressed states need coherent distinctions. No opacity/token table is transcribed. |
| [Navigation rail overview](https://m3.material.io/components/navigation-rail/overview) | Primary comparison for consistent labeled navigation and current context. The page's current implementation limits matter, as recorded below. |

These are published evolving design guidelines, not a W3C Recommendation or a certification of Layered. The navigation page records collapsed/expanded rails replacing the former baseline direction after the **May 2025** Expressive update. Its availability table marks both **Web** and **Web: Expressive unavailable**. Layered's ordinary HTML anchors and responsive navigation are original Atlas work; they are not an official Material web navigation component.

The Material website footer links Google's [Terms of Service](https://policies.google.com/terms). No blanket license for redistribution of website prose, diagrams, screenshots, logos or other assets was established. Software licenses below apply to their covered repository material, not every item on the website. Atlas uses concepts without copying those materials.

### Material Web software evidence

Pinned repository: [`5a95667bb70ca5be8785b762fb0303737c3b4ac1`](https://github.com/material-components/material-web/tree/5a95667bb70ca5be8785b762fb0303737c3b4ac1).

- [package.json](https://github.com/material-components/material-web/blob/5a95667bb70ca5be8785b762fb0303737c3b4ac1/package.json) identifies **@material/web 2.5.0**, **Apache-2.0**.
- [LICENSE](https://github.com/material-components/material-web/blob/5a95667bb70ca5be8785b762fb0303737c3b4ac1/LICENSE) states **Apache License 2.0** and **Copyright 2018–2023 Google, Inc.**
- [README.md](https://github.com/material-components/material-web/blob/5a95667bb70ca5be8785b762fb0303737c3b4ac1/README.md) explicitly states **maintenance mode pending new maintainers**. A guideline resource marked available is not evidence of current package development or Expressive support.

Layered imports no part of this software and requires no Material dependency. The pin records the inspected license/maintenance context, not a selected production package, package recommendation, or permission to use Google's brand identity.

### Android companion guidance

[Build adaptive navigation](https://developer.android.com/develop/adaptive-apps/guides/build-adaptive-navigation), published by **Android Developers / Google and contributors**, updated **2026-09-22 UTC**, accessed **2026-10-15**, supplies a native-platform comparison for adapting navigation to available space. Its Kotlin scaffold is not a web template and is not copied.

The inspected [Android content license](https://developer.android.com/license) states documentation, including samples, defaults to **Apache 2.0** unless otherwise noted; other site content defaults to **CC BY 2.5**, with exclusions for trademarks and separately linked material. This is distinct from web.dev's license arrangement. No documentation, code or artwork is incorporated.

## Microsoft Fluent 2 comparison — R40

**Creator/publisher credit:** **Microsoft's Fluent Design team and contributors**. The inspected site footer states **© Microsoft 2026**. Individual page authors were not established. Accessed **2026-10-15**.

| Primary reference | Limited role |
| --- | --- |
| [Material](https://fluent2.microsoft.design/material) | Opaque solid material can express regions in both appearances. Layered does not reproduce native Mica, acrylic or desktop sampling. |
| [Elevation](https://fluent2.microsoft.design/elevation) | Secondary comparison for depth and the visual prominence of temporary surfaces. No shadow equations or token ramp copied. |
| [Typography](https://fluent2.microsoft.design/typography) | Readable hierarchy, sentence case and native fallback concepts. The published Segoe type ramp is not Layered's selected scale. |
| [Shapes](https://fluent2.microsoft.design/shapes/) | Shape vocabulary and coherent controls; Layered's geometry remains separate Atlas proposals. |
| [Layout](https://fluent2.microsoft.design/layout) | Grouping, whitespace and content-fit reflow comparison; no grid or breakpoint table imported. |

The site links Microsoft's Terms of use. No blanket open redistribution license was established for the inspected website prose or assets. A public documentation link is not a font, icon, screenshot or trademark license.

Pinned Fluent UI software record: [`93e324f72f0e187ff6a7e5f70ebf929d9b2212a2`](https://github.com/microsoft/fluentui/tree/93e324f72f0e187ff6a7e5f70ebf929d9b2212a2). [LICENSE](https://github.com/microsoft/fluentui/blob/93e324f72f0e187ff6a7e5f70ebf929d9b2212a2/LICENSE) states **MIT**, **Copyright (c) Microsoft Corporation**, and explicitly notes that referenced **fonts and icons have separate terms**. The [React suite package metadata](https://github.com/microsoft/fluentui/blob/93e324f72f0e187ff6a7e5f70ebf929d9b2212a2/packages/react-components/react-components/package.json) identifies **@fluentui/react-components 9.74.9**. This is a covered-software observation, not a dependency selection or claim that every component is stable. Layered imports no Fluent software or assets.

## Plus Jakarta Sans — R41

**Designer:** **Gumpita Rahayu of Tokotype**. The upstream project credits **6616 Studio** for commissioning the original family for **Jakarta Provincial Government's +Jakarta City of Collaboration identity in 2020**. Keep designer, foundry, commissioner, commissioning context and copyright holder distinct.

| Inspected record | Evidence |
| --- | --- |
| [Upstream snapshot `18d1cd2f7ea10481919d2f05c1f7064b7307fc26`](https://github.com/tokotype/PlusJakartaSans/tree/18d1cd2f7ea10481919d2f05c1f7064b7307fc26) | [README.md](https://github.com/tokotype/PlusJakartaSans/blob/18d1cd2f7ea10481919d2f05c1f7064b7307fc26/README.md) establishes designer, commissioning context and family history. [sources/config.yaml](https://github.com/tokotype/PlusJakartaSans/blob/18d1cd2f7ea10481919d2f05c1f7064b7307fc26/sources/config.yaml) separately records numeric version **2.071**. |
| [Release 2.7.1](https://github.com/tokotype/PlusJakartaSans/releases/tag/2.7.1) | Latest release observed during inspection, published **2023-05-26**. The release label and numeric source configuration are distinct observations. |
| [Google Fonts METADATA.pb at `8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5`](https://github.com/google/fonts/blob/8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5/ofl/plusjakartasans/METADATA.pb) | Designer **Tokotype**; upright/italic variable files; `wght` **200–800**; listed Latin, Latin-ext, Cyrillic-ext and Vietnamese subsets; source commit matches the upstream pin above. Metadata listings are not rendered language validation. |
| [Pinned upstream OFL.txt](https://github.com/tokotype/PlusJakartaSans/blob/18d1cd2f7ea10481919d2f05c1f7064b7307fc26/OFL.txt) and [Google Fonts OFL.txt](https://github.com/google/fonts/blob/8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5/ofl/plusjakartasans/OFL.txt) | **Copyright 2020 The Plus Jakarta Sans Project Authors**, **SIL Open Font License 1.1**. |

Layered proposes normal **400/500/600/700** for its display, body and interface roles. No font source, binary, package or remote font service is included. The preview uses a locally available named family, then Segoe UI/Arial/sans-serif; a technical specimen uses local monospace fallbacks. Actual rendered faces belong in [validation.md](validation.md).

A consuming project selects its exact package, retains that package's complete copyright/OFL notice, and checks actual weights, glyphs, language, fallback, wrapping and rendering. Naming the family in CSS establishes neither redistribution nor proof that the intended family rendered.

## Native dialog and accessibility references — R42, R17, R29

| Primary reference | Credit and observed status | Role |
| --- | --- | --- |
| [HTML dialog element](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element) | **WHATWG and HTML Standard contributors**; Living Standard page last updated **2026-10-14**, inspected **2026-10-15**. | Native modal lifecycle, focus and dismissal semantics. Atlas's specific validation, save and recovery rules remain its proposals. |
| [APG modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) and [button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | **W3C ARIA Authoring Practices Task Force and contributors**; published guidance. | Deliberate first/return focus, modality and contextual actions; no example code copied. |
| [WAI Forms notification guidance](https://www.w3.org/WAI/tutorials/forms/notifications/) | **W3C WAI, Education and Outreach Working Group and contributors**. | Linked error summary, local field messages and understandable recovery; no tutorial sample or prose copied. |
| [WCAG 2.2 contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) and [animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | **W3C Accessibility Guidelines Working Group and contributors**. | Limited numerical and interaction checks, not complete conformance. |

WHATWG's [IPR policy](https://whatwg.org/ipr-policy) specifies **CC BY 4.0** for Living Standards/Review Drafts, with incorporated source-code portions covered by **BSD 3-Clause**. W3C materials have document-specific copyright and reuse notices. Layered copies no standards prose, diagrams, sample code or APG implementation. A standard's semantics do not establish implementation in every browser, assistive-technology behavior, or a production service contract.

## Atlas proposals and limitations

The separate six-surface teal/warm palette, Plus Jakarta Sans role choices, comfortable density, rounded geometry, limited modal shadow and **160ms** optional feedback are Atlas design decisions. Fictional projects and all task counts are original local fixtures. The draft editor's validation, atomic local Save, Cancel/Escape discard, filter preservation and project-specific Revert are also Atlas proposals, not requirements extracted from Material or Fluent.

No source establishes that these exact values improve conversion, productivity or real-device performance. The reference contains no real account, cloud save, collaboration, backend acknowledgement, calendar service or agent command. Source inspection, opaque arithmetic, browser checks and production validation remain separate evidence layers. Atlas's own publishing terms remain undecided. Project-specific documents retain relevant credits and explicit adaptations; future incorporation of third-party material requires the exact selected material's terms and notices.
