# Swiss — sources and credits

Reviewed: **2026-10-13**. Theme revision: **0.1.0-draft**.

## Primary local source

**Source project:** [Tamir — UI/UX & Frontend](https://github.com/tamir39/tamir39-portfolio).

**Credited source creator:** **Tamir (Phi Vuong Tuong Tam)**.

**Inspected source snapshot:** `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`.

Atlas's Swiss entry adapts this project's Swiss direction. Documentation, portable proposals, preview composition, fictional briefs, and framework-independent preview code were prepared for Interface Atlas with Codex AI assistance. A source credit does not claim endorsement or transfer reuse rights.

| Pinned source file | Material retained or referenced |
| --- | --- |
| [app/themes.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/themes.css) | Swiss light tokens, inherited panel/action/success/note values, 2px radii, no resting shadow, 160ms CSS feedback, hero/type selectors, flat rules, optional project hover |
| [app/appearance.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/appearance.css) | Swiss dark tokens; shared light/dark on-success values; appearance-specific treatment |
| [app/globals.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/globals.css) | Global focus outline 3px, offset 5px, forced-colors `Highlight` |
| [app/layout.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/layout.tsx) | Manrope and JetBrains Mono configuration, loaded subsets, mono 400/500 weights |
| [lib/themes.ts](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/lib/themes.ts) | Theme name and motion character, 180ms tween/easing, -18px entrance helper, immediate reduced-motion values |
| [components/ThemeCursor.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/components/ThemeCursor.tsx) and [app/cursors.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/cursors.css) | Supplementary precision-square cursor, 9px mark, eligibility and follower behavior |
| [docs/hero-artwork.md](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/docs/hero-artwork.md), [components/HeroArtwork.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/components/HeroArtwork.tsx), and [lib/hero-artwork.ts](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/lib/hero-artwork.ts) | Local Canvas adaptation attribution, grid interaction, pointer eligibility, static reduced-motion behavior, offscreen/hidden pausing, density cap and cleanup; immediately visible hero in the pinned notes |
| [README.md](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/README.md) | Project identity and general inspiration; these references do not establish authorship of this complete Swiss theme |

**Reuse status:** no implementation license was found in the inspected portfolio. Atlas's own publishing terms remain undecided. This entry includes original Atlas documentation and retained design facts; it copies no portfolio implementation code, branding, artwork assets, or font software.

## Additional design references

These are selected Atlas study references. The inspected portfolio does not establish that Tamir used them. Neither source is credited as the creator of this complete theme or the originator of all Swiss design.

| Reference | Creator and role | Use and reuse boundary |
| --- | --- | --- |
| [The Vignelli Canon](https://www.rit.edu/vignellicenter/sites/rit.edu.vignellicenter/files/documents/The%20Vignelli%20Canon.pdf), hosted by RIT's Vignelli Center | **Massimo Vignelli**, author and book designer; **Beatriz Cifuentes**, book design collaborator | Information organization, content-dependent grids, type hierarchy, and spacing inform Atlas's proposed reasoning. The web grid counts and breakpoints are Atlas proposals. No pages, diagrams, images, or prose are reproduced. Public access is not a reuse license. |
| [Helvetica Bold, 36 point](https://www.moma.org/collection/works/106768), MoMA collection | **Max Miedinger and Edouard Hoffmann**; Haas Type Foundry, Switzerland | Historical typography context only. Helvetica is not the source's Manrope and is not included, configured, or licensed by this theme entry. No museum image or typeface file is reproduced. |

## General upstream inspiration

The pinned portfolio README lists the [DESIGN.md directory](https://designdotmd.directory/), [Design Prompts](https://www.designprompts.dev/), and [Motion documentation](https://motion.dev/docs/react-animation) as general references. These links do not identify a particular entry as the author of the Swiss theme. Prior Atlas research records Rofi and @bidah for the directory, while an individual creator for Design Prompts remains unverified; preserve the site identity without inventing a person. Motion is maintained by Matt Perry, the Motion team, and contributors. This package copies no catalog entry, documentation prose, or Motion implementation; no animation-library dependency is required.

## Optional artwork inspiration

**Reference:** [Kinetic Grid](https://21st.dev/@satoriui/components/kinetic-grid).

**Credited component creator/publisher:** **SatoriUI**, under **@satoriui**. The inspected primary component page credits that name and handle; an individual legal creator identity was not established.

**Local adaptation:** Tamir's pinned hero-artwork notes describe original Canvas 2D scenes inspired by selected references rather than imports of catalog code. Swiss retains the grid-warp/ripple inspiration credit. Atlas's preview uses its own static composition and does not implement this effect.

**Reuse status:** the 21st.dev component listing displayed **MIT License** on the review date. No component source or license text is redistributed here. Before importing code in another project, verify the actual selected package, version, copyright notice, dependencies, and license file and preserve its required notices. This recorded listing does not resolve the portfolio's separate implementation terms.

## Fonts

Font designers, distributors, and package copyright notices are separate attribution roles. Preserve the notices belonging to the exact font version redistributed; naming a designer does not replace its license file.

| Family | Credited designers | Metadata | Font license |
| --- | --- | --- | --- |
| Manrope | **Mikhail Sharanda** | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/METADATA.pb) | [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt) |
| JetBrains Mono | **JetBrains, Philipp Nurullin, Konstantin Bulenkov** | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/METADATA.pb) | [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/OFL.txt) |

Both linked packages provide SIL Open Font License 1.1 text. Atlas ships no font files and loads no remote font services in this preview. If a project vendors fonts, record the actual version and retain that package's copyright notice and license. Manrope is the retained Swiss default; historical Helvetica is a reference, not a bundled substitute.

## Guidance references

| Reference | Responsible contributors | Use in Atlas |
| --- | --- | --- |
| [WCAG 2.2 contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | **W3C Accessibility Guidelines Working Group and contributors** | Opaque text and necessary boundary calculations; no claim of complete implemented conformance. |
| [WCAG 2.2 reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) and [animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | **W3C Accessibility Guidelines Working Group and contributors** | Reference for responsive content and immediate reduced-motion behavior; no documentation text copied. |
| [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) | **W3C ARIA Authoring Practices Task Force and contributors** | Relevant widget, keyboard, and focus behavior; native elements preferred where appropriate. |

## Atlas adaptation record

| Addition or retained choice | Reason | Evidence and status |
| --- | --- | --- |
| Source palette, 2px radii, and no resting shadow | Preserve the observed Swiss visual direction | Pinned source inspection; browser limits recorded separately |
| Source focus dimensions and named font roles | Carry explicit existing decisions into project preparation | Extracted from pinned files; intended font rendering remains a project check |
| Portable type scale and milder tracking | Avoid applying an 800-weight, tightly tracked portfolio hero to body text and controls | Atlas proposal; project-specific wrapping and language checks required |
| Content-driven grid and spacing options | Make alignment actionable across projects without prescribing one historic or source grid | Atlas proposal, informed by the Canon; exact column counts are Atlas choices |
| Stronger control-border foregrounds | Keep necessary input boundaries visible beyond decorative rules | Atlas proposal; opaque numerical contrast calculated |
| Warning/danger/information foregrounds | Supply explicit semantics beyond the extracted palette | Atlas proposal; opaque contrast calculated on three neutral surfaces |
| Compact density and review behavior | Support short operational metadata while preserving context and control areas | Atlas proposal; representative preview evidence only |
| Uniform feedback easing | Normalize a source shorthand whose theme easing is explicit only on transform | Atlas normalization; 160ms duration retained |
| Static effect defaults and visible motion choice | Keep core content immediate and readable | Atlas proposal; optional source artwork and cursor remain unimplemented |

Keep **source inspection**, **numerical calculation**, **rendered validation**, and **reuse permission** distinct. Future changes should record the rule, reason, source revision, and checks. Generated project documents must carry relevant creator credits and identify selected adaptations.
