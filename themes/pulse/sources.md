# Pulse — sources and credits

Reviewed: **2026-10-15**. Theme revision: **0.1.0-draft**.

## Theme authorship and reference roles

**Pulse is an original Interface Atlas synthesis**, prepared for **Tamir (Phi Vuong Tuong Tam) with Codex AI assistance**. Its palette, typography roles, scales, geometry, poster composition, fictional gathering, sample sessions, local planning behavior, and preview implementation are Atlas proposals. Pulse is not extracted from Tamir's portfolio and is not an official Open Props theme.

**Adam Argyle and Open Props contributors** are credited for the referenced modular CSS-token and adaptive-preference concepts. **Kayce Basques and Rachel Andrew** are credited for the referenced web.dev animation-performance guidance. **Jeremy Tribby** is the credited Barlow family designer; the Barlow project's additional contributor and copyright records are distinguished below. None of these references authors or endorses this complete Atlas entry.

## Open Props reference and pinned record

**Project:** [Open Props](https://open-props.style/), by **Adam Argyle and contributors**.

**Inspected repository snapshot:** [`f39ab7c377a0e047f930982e3611bbc95254a260`](https://github.com/argyleink/open-props/tree/f39ab7c377a0e047f930982e3611bbc95254a260).

| Pinned evidence | Role in this study |
| --- | --- |
| [package.json](https://github.com/argyleink/open-props/blob/f39ab7c377a0e047f930982e3611bbc95254a260/package.json) | Identifies version **1.7.23**, author **Adam Argyle**, and MIT package terms. |
| [src/props.media.css](https://github.com/argyleink/open-props/blob/f39ab7c377a0e047f930982e3611bbc95254a260/src/props.media.css) | Separates device appearance, motion preference, contrast, and pointer conditions. Pulse uses ordinary native media queries in its independent implementation. |
| [LICENSE](https://github.com/argyleink/open-props/blob/f39ab7c377a0e047f930982e3611bbc95254a260/LICENSE) | **MIT License**, copyright **2021 Adam Argyle**; preserve the actual notice if incorporating covered software in a future project. |

The website was inspected on **2026-10-15** for modular CSS-variable composition and motion gated by user preference. That live-page observation is separate from the pinned repository evidence. Pulse does not import Open Props styles, normalization, components, token files, scripts, custom-media definitions, or example markup. Its lime/ink palette and every numerical design value are independent Atlas proposals rather than extracted Open Props tokens.

## Animation-performance reference

**Reference:** [How to create high-performance CSS animations](https://web.dev/articles/animations-guide), by **Kayce Basques and Rachel Andrew**, published on **web.dev**. The inspected page reports **last updated 2020-10-06 UTC**; accessed **2026-10-15**.

The guidance informs the use of transform/opacity for decorative movement, inspection of rendering cost, and restrained use of `will-change`. Pulse's finite 600ms study, explicit activation, final composition, and cancellation rules are **Atlas choices**, not timings or interaction requirements attributed to that article. Transform/opacity selection alone does not prove real-device performance.

The page states **Creative Commons Attribution 4.0** for content except where otherwise noted, and **Apache License 2.0** for code samples. This package copies no article passage, example code, screenshot, or diagram. These scoped terms do not license unrelated assets or identify web.dev's authors as Pulse's creators.

## Font creators and package evidence

**Selected Atlas roles:** Barlow Condensed 600/700 for short display headings; Barlow 400/500/600 for body text, labels, and controls. These choices are proposals, not a requirement inherited from Open Props.

| Family | Designer credit | Primary package evidence | Inspected terms |
| --- | --- | --- | --- |
| Barlow Condensed | **Jeremy Tribby** | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/barlowcondensed/METADATA.pb), [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/barlowcondensed/OFL.txt) | **SIL Open Font License 1.1**; copyright **2017 The Barlow Project Authors**. |
| Barlow | **Jeremy Tribby** | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/barlow/METADATA.pb), [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/barlow/OFL.txt) | **SIL Open Font License 1.1**; copyright **2017 The Barlow Project Authors**. |

The [upstream Barlow repository](https://github.com/jpt/barlow) credits **Jeremy Tribby** for principal design and **Nguyễn Hồng Nhung** for Vietnamese. Designer, contributor, and package copyright roles are separate. The Google Fonts metadata and upstream repository are dated observations, not immutable font-package versions pinned by Pulse's Open Props discovery revision.

Atlas ships **no font binaries, source fonts, or remote font service**. The display stack names Barlow Condensed; the body implementation uses local-only normal-width Barlow face aliases, followed by Segoe UI/sans-serif. The aliases match installed 400/500/600 faces by their explicit local names instead of relying on the ambiguous family name `Barlow`, which can resolve to a condensed face on the inspected Windows machine. They are independent CSS declarations, not redistributed font software. A consuming project records its actual font package/version, preserves that package's copyright and OFL text, and checks selected weights, language coverage, fallback, and wrapping. A Vietnamese sample is useful evidence of rendered content; it does not certify every glyph or the intended named-font rendering. See [validation.md](validation.md) for the preview's actual evidence.

## Accessibility and feedback guidance

| Reference | Responsible contributors | Use in Atlas |
| --- | --- | --- |
| [WCAG 2.2 contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | **W3C Accessibility Guidelines Working Group and contributors** | Listed opaque color pairs and meaningful boundary/focus checks; no complete-conformance claim. |
| [WCAG 2.2 reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) and [animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | **W3C Accessibility Guidelines Working Group and contributors** | Responsive content, immediate tasks, and static reduced-motion alternatives. |
| [ARIA Authoring Practices Guide button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | **W3C ARIA Authoring Practices Task Force and contributors** | Stable toggle names, pressed states, native activation, and deliberate focus. |
| [WAI Forms Tutorial: user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | **W3C WAI; Education and Outreach Working Group and contributors** | Understandable overlap errors, review results, and explicit recovery links in the local planner. |

Guidance is referenced without copied prose, sample code, or branded assets. The planner's overlap rules and review lifecycle are independent Atlas interaction decisions.

## Atlas proposal record

| Atlas choice | Purpose and evidence boundary |
| --- | --- |
| Original lime/ink palette with light/dark semantic roles | Establish an expressive campaign direction while separating usable colors from decorative accents. Opaque calculations are listed in [design.md](design.md); browser evidence is separate. |
| Condensed display and ordinary-width body/control text | Give short headings a poster character while preserving everyday reading and task clarity. Font creators are credited above; actual named-font rendering is a project check. |
| Comfortable default and specimen-only compact adaptation | Retain generous reading and usable targets; demonstrate a smaller component inset without shrinking the complete planner. |
| Original gathering, six sample sessions, and local plan | Demonstrate a selection/review/recovery flow without representing real events, bookings, attendance, inventory, or a calendar service. |
| Explicit review and overlap recovery | Keep selection separate from a reviewed result and make conflicting time ranges inspectable. A successful local review remains a local check. |
| One deliberate finite decorative motion study | Show a bounded expressive option while preserving static content, motion preferences, and immediate tasks. No third-party effect implementation is imported. |
| Independent HTML/CSS/JavaScript and static geometry | Keep the reference portable and usable without a theme framework or remote dependency. |

Atlas's own publishing terms remain undecided. Future incorporation of covered software, fonts, or assets requires recording the actual selected version and applicable notices; this source record is not a substitute for those notices. Keep **referenced concepts**, **Atlas proposals**, **numerical calculations**, **rendered validation**, and **reuse permission** distinct. Generated project documents should retain relevant creator credits and explain their selected adaptations.
