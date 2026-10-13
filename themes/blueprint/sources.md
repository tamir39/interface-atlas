# Blueprint — sources and credits

Reviewed: **2026-10-13**. Theme revision: **0.1.0-draft**.

## Primary local source

**Source project:** [Tamir — UI/UX & Frontend](https://github.com/tamir39/tamir39-portfolio).

**Credited source creator:** **Tamir (Phi Vuong Tuong Tam)**.

**Inspected snapshot:** `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`.

Atlas adapts this project's Blueprint direction. Documentation, portable proposals, fictional studio content, architecture example, static vector art, and independent preview code were prepared for Interface Atlas with Codex AI assistance. Attribution does not claim endorsement or transfer reuse rights.

| Pinned source file | Material retained or referenced |
| --- | --- |
| [app/themes.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/themes.css) | Light palette, inherited panel/on-action/note values, 8px panel and 4px control corners, light offset shadow, inherited 240ms CSS feedback/easing, 24px grid, mixed sans/mono hero, decorative dashed lines, optional hover/press movement |
| [app/appearance.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/appearance.css) | Dark palette, explicit dark offset shadow, dark grid overlay, shared on-success foregrounds, and dark text selection |
| [app/globals.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/globals.css) | Global 3px ink focus outline with 5px offset, forced-colors `Highlight`, and the separate shared light text-selection rule |
| [app/layout.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/layout.tsx) | Manrope Latin/Vietnamese configuration; JetBrains Mono Latin 400/500; display swap |
| [lib/themes.ts](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/lib/themes.ts) | Theme identity, 300ms tween/easeInOut, 12px vertical entrance helper, and immediate reduced-motion settings |
| [components/ThemeCursor.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/components/ThemeCursor.tsx) and [app/cursors.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/cursors.css) | Supplementary drafting crosshair; native pointer retention; keyboard/text-entry suppression, eligibility, idle stopping, and cleanup |
| [docs/hero-artwork.md](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/docs/hero-artwork.md), [components/HeroArtwork.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/components/HeroArtwork.tsx), and [lib/hero-artwork.ts](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/lib/hero-artwork.ts) | Original local Canvas adaptation and external inspiration credit; form cycling; fine-pointer desktop eligibility, reduced-motion static view, offscreen/hidden pausing, density cap, and cleanup; immediately visible hero notes |

**Reuse status:** no implementation license was found in the inspected portfolio. Atlas's publishing terms remain undecided. This entry contains original Atlas documentation and preview implementation plus retained design facts. It imports no portfolio code, branding, artwork assets, or font software.

## Optional artwork inspiration

**Reference:** [Wireframe Forms — Cylinders](https://21st.dev/@mengto/components/wireframe-forms/wireframe-forms-cylinders), listed under **ThreeUI**, by **Meng To / @mengto**. The [primary ThreeUI page](https://threeui.com/ui-elements/wireframe-forms) describes the separate cube, crossed-cylinder, and sphere variants.

The portfolio's pinned notes describe its own Canvas 2D adaptation. Atlas's static preview neither imports that renderer nor reproduces the external component. Meng To and ThreeUI are credited for the referenced component, not as authors of the complete theme or Atlas's original diagram.

**Reuse observation:** the 21st.dev listing displayed **MIT License** on the review date; the inspected ThreeUI page did not expose a license text. A listing label is not verification of every file or dependency. Before a future import, record the exact package/version and preserve its copyright and license notices. This scoped observation does not resolve the portfolio's separate implementation terms.

## Additional architecture reference

**Reference:** [C4 model](https://c4model.com/) and [diagram notation guidance](https://c4model.com/diagrams/notation), created by **Simon Brown**.

Atlas's proposed diagram reasoning uses clear title/scope, a key where notation has meaning, and labeled relationships. This is an additional Atlas study reference; the inspected portfolio does not establish that Tamir used it. The original preview is not claimed to be a C4-compliant model and reproduces no C4 example diagram, image, or prose.

The C4 site's footer states that its website/example diagrams use [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). This observation applies to the material identified by that notice, not a license grant for unrelated software or all material elsewhere. No licensed C4 asset is redistributed in this package.

## Fonts

Designer credits and package copyright holders are separate roles. Preserve the notices for the exact version redistributed rather than treating a designer name as a license file.

| Family | Credited designers | Primary metadata | Font terms |
| --- | --- | --- | --- |
| Manrope | **Mikhail Sharanda** | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/METADATA.pb) | [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt) |
| JetBrains Mono | **JetBrains, Philipp Nurullin, Konstantin Bulenkov** | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/METADATA.pb) | [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/OFL.txt) |

The inspected font-package texts provide **SIL Open Font License 1.1**. JetBrains' [upstream repository](https://github.com/JetBrains/JetBrainsMono) distinguishes the typeface's OFL terms from source-code terms and credits Philipp Nurullin as type designer and Konstantin Bulenkov as team lead. Atlas ships no font binaries and uses no remote font service. A future vendor records the exact package/version and preserves that package's notices and license.

The source loads Manrope Latin/Vietnamese and JetBrains Mono Latin 400/500. Atlas's proposed mono heading role goes beyond the source's mixed hero and does not establish every glyph, weight, or language combination. Actual fallback rendering is recorded separately in [validation.md](validation.md).

## Guidance references

| Reference | Responsible contributors | Use in Atlas |
| --- | --- | --- |
| [WCAG 2.2 contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | **W3C Accessibility Guidelines Working Group and contributors** | Opaque foreground/necessary-boundary calculations; no claim of complete implemented conformance. |
| [WCAG 2.2 reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) and [animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | **W3C Accessibility Guidelines Working Group and contributors** | Responsive content and immediate reduced-motion behavior. |
| [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) | **W3C ARIA Authoring Practices Task Force and contributors** | Native controls, explicit selection, keyboard operation, and context-preserving focus. The preview does not claim a custom tree widget. |

These references inform Atlas proposals; no diagrams, prose, or implementation code are copied from them.

## Atlas adaptation record

| Addition or retained choice | Reason | Evidence and status |
| --- | --- | --- |
| Source neutral/tint/action palette, small corners, and appearance-specific resting shadows | Preserve the inspected direction | Pinned source inspection; rendered evidence separate |
| Mixed source font roles and source focus dimensions | Retain explicit source decisions | Pinned files; intended font rendering remains a project check |
| Broader mono heading role and milder tracking | Express a technical character while retaining readable body/controls | Atlas proposal, beyond source mixed hero; wrapping/language checks required |
| Stronger necessary borders and semantic foregrounds | Separate functional boundaries/statuses from faint drafting rules | Atlas proposal; opaque calculations in design specification |
| Ink selected-state labels and relationship alternatives | Avoid relying on weak pairs or visual geometry alone | Atlas proposal; representative preview checks only |
| Explicit diagram title/scope, key, and relationship labels | Make the original architecture example understandable in multiple representations | Additional Atlas reference to Simon Brown's C4 guidance; no C4 compliance claim or copied example diagram |
| Spacing, compact specimen, responsive outline, and inspector behavior | Support a portable local example without implying live infrastructure | Original Atlas composition and interaction contract |
| Uniform feedback easing | Normalize the source shorthand's property-specific easing | Atlas normalization; 240ms CSS duration retained |
| Static artwork and optional-effect defaults | Keep content immediate and usable independently of rendering | Atlas proposal; optional source renderer and cursor remain unimplemented |

Keep **source inspection**, **numerical calculation**, **rendered validation**, and **reuse permission** distinct. Future changes record the rule, reason, source revision, and checks. Generated project documents retain relevant creator credits and identify the chosen adaptations.
