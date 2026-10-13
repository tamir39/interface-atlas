# Botanical — sources and credits

Reviewed: **2026-10-13**. Theme revision: **0.1.0-draft**.

## Primary local source

**Source project:** [Tamir — UI/UX & Frontend](https://github.com/tamir39/tamir39-portfolio).

**Credited source creator:** **Tamir (Phi Vuong Tuong Tam)**.

**Inspected snapshot:** `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`.

Atlas adapts this project's Botanical direction. Documentation, portable proposals, preview composition, fictional studio briefs and design field notes, and original HTML/CSS/JavaScript were prepared for Interface Atlas with Codex AI assistance. Source credit does not claim endorsement or transfer reuse rights.

| Pinned source file | Material retained or referenced |
| --- | --- |
| [app/themes.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/themes.css) | Botanical light tokens; shared panel/on-action/success values; 32px/8px alternating panel and 22px/6px control corners; light shadow; 360ms CSS feedback with inherited easing; serif hero/type selectors; decorative emblem/orbit/tilt and optional hover |
| [app/appearance.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/appearance.css) | Botanical dark tokens, shared on-success foregrounds, and inherited shared dark shadow with no Botanical resting-shadow override |
| [app/globals.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/globals.css) | Global 3px ink focus outline / 5px offset, forced-colors Highlight, shared lime text-selection rule, and source reduced-motion treatment |
| [app/layout.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/layout.tsx) | Manrope Latin/Vietnamese configuration, DM Serif Display Latin 400 normal/italic, JetBrains Mono Latin 400/500 |
| [lib/themes.ts](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/lib/themes.ts) | Botanical identity, “Gentle unfolds” label, 500ms tween/easing, entrance helper, and immediate reduced values |
| [components/InteractionDemo.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/components/InteractionDemo.tsx), [components/InteractionLab.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/components/InteractionLab.tsx), and [components/Portfolio.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/components/Portfolio.tsx) | Defined helper referenced in unmounted InteractionDemo; mounted InteractionLab is separate. Definition is not evidence of a hero entrance. |
| [docs/hero-artwork.md](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/docs/hero-artwork.md), [components/HeroArtwork.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/components/HeroArtwork.tsx), and [lib/hero-artwork.ts](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/lib/hero-artwork.ts) | Isoline inspiration credit, original local Canvas 2D adaptation, desktop eligibility, deliberate keyboard activation, static reduced treatment, hidden/offscreen pausing, density cap, and cleanup; notes distinguish the separate introduction from hero entrance |
| [components/ThemeCursor.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/components/ThemeCursor.tsx) and [app/cursors.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/cursors.css) | Supplementary 28px leaf follower, rotation/smoothing, native-pointer preservation, eligibility, settled-frame stopping, and cleanup |
| [README.md](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/README.md) | Project identity and general references; not proof of a source for every theme decision |

**Reuse status:** no implementation license was found in the inspected portfolio. Atlas's publishing terms remain undecided. This entry retains design facts and provides original documentation and preview code; it copies no portfolio implementation, branding, artwork assets, icon files, or font software.

## Optional artwork inspiration

**Reference:** [Isoline Bloom](https://21st.dev/@kedhareswer/components/isoline-bloom), currently titled **Interactive Contour Lines Shader Background** on the primary listing.

**Credited component creator/publisher:** **Kedhareswer Naidu**, published as **@kedhareswer**. The inspected listing credits that name and handle. Tamir's pinned notes describe an original Canvas 2D adaptation of the interaction concept, rather than a catalog-code import. The external listing describes WebGL2; that is distinct from Tamir's local Canvas renderer.

**Reuse evidence:** the listing displays **MIT License** on the review date. No component source or license text is redistributed here. Before a future import, verify the actual selected package/version, copyright notice, dependencies, and license file and preserve its required notices. The listing does not settle the portfolio's separate implementation terms. Atlas's preview selects original static vector artwork and imports neither renderer.

## Fonts

Designer credits and package copyright notices have separate roles. Preserve the notices attached to the exact font software redistributed.

| Family | Credited designers | Primary metadata | License evidence |
| --- | --- | --- | --- |
| Manrope | **Mikhail Sharanda** | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/METADATA.pb) | [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt) |
| DM Serif Display | **Colophon Foundry** | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/METADATA.pb) | [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/OFL.txt) |
| JetBrains Mono | **JetBrains, Philipp Nurullin, Konstantin Bulenkov** | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/METADATA.pb) | [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/OFL.txt) |

All three linked packages provide SIL Open Font License 1.1 text, reviewed on the date above. The DM Serif Display package includes Adobe and Google notices and a reserved name; Manrope and JetBrains Mono carry their project-author notices. Designer names do not replace these files. Atlas includes no font binaries or remote font loading. Record the actual package version, preserve its notices, and verify selected weights, styles, and glyph coverage before vendoring fonts.

## Guidance and general inspiration

| Reference | Credited responsible contributors | Atlas use |
| --- | --- | --- |
| [WCAG 2.2 contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | **W3C Accessibility Guidelines Working Group and contributors** | Reference for listed opaque pairs and necessary boundaries. Calculations do not establish complete implemented conformance. |
| [WCAG 2.2 reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) and [animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | **W3C Accessibility Guidelines Working Group and contributors** | Responsive-content and motion guidance. Immediate Atlas reduced changes are a selected project rule. |
| [ARIA Authoring Practices button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | **W3C ARIA Authoring Practices Task Force and contributors** | Reference for stable toggle-button labels and exposed pressed states. The reading-list workflow and export are original Atlas proposals. |

The pinned portfolio README lists the [DESIGN.md directory](https://designdotmd.directory/), [Design Prompts](https://www.designprompts.dev/), and [Motion documentation](https://motion.dev/docs/react-animation) as general inspiration. These links do not identify a particular entry as the author of Botanical. Prior Atlas records credit Rofi and @bidah for the directory; an individual Design Prompts creator remains unverified. Motion is maintained by Matt Perry, the Motion team, and contributors. No catalog entry, documentation prose, or animation-library implementation is imported.

## Atlas adaptation record

| Choice | Reason | Evidence and status |
| --- | --- | --- |
| Source neutral/tinted palette, alternating corners, and selective soft shadow | Preserve the observed Botanical direction | Pinned source inspection; rendered limits separate |
| Source focus dimensions and named font roles | Carry explicit source decisions into project preparation | Pinned source; intended typeface rendering remains a project check |
| Stronger necessary border and semantic foregrounds | Make control boundaries and statuses explicit beyond gentle decorative rules | Atlas proposals; opaque contrast on six backgrounds |
| Ink labels/markers and underlined ink links on selected surfaces | Source muted/dark-accent pairs fail ordinary-text contrast there; dark proposed border is below 3:1 | Atlas proposals; failures and ink pair recorded |
| Botanical selected surface for user text selection | Apply the direction to selectable reading content | Atlas proposal; source global selection is a separate shared lime treatment |
| Portable serif display scale, milder tracking, readable body/control sizes, and bounded measure | Keep expressive source hero styling from reducing reading/control clarity | Atlas proposals; representative preview evidence only |
| Comfortable spacing with compact component specimens | Demonstrate density adaptation without changing studio or article layout | Atlas proposal; scope stated in preview |
| Uniform 360ms color/border feedback | Portable restrained feedback without importing the separate 500ms Motion contract | Source duration/curve with Atlas normalization of property easing |
| Static vector artwork and temporary local reading list/export | Keep reading immediate and make the effect of each action explicit | Original Atlas content/code; no backend, AI-generation, or agent-action claim |

Keep **source inspection**, **numerical calculation**, **rendered validation**, and **reuse permission** distinct. Generated project design documents preserve relevant creator credits, identify selected adaptations, and record any added implementation/version and checks.
