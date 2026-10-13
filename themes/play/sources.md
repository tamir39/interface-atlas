# Play — sources and credits

Reviewed: **2026-10-13**. Theme revision: **0.1.0-draft**.

## Primary local source

**Source project:** [Tamir — UI/UX & Frontend](https://github.com/tamir39/tamir39-portfolio).

**Credited source creator:** **Tamir (Phi Vuong Tuong Tam)**.

**Inspected snapshot:** `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`.

Atlas adapts this project's Play direction. Documentation, portable proposals, preview composition, fictional projects/briefs, and original HTML/CSS/JavaScript were prepared for Interface Atlas with Codex AI assistance. Source credit does not claim endorsement or transfer reuse rights.

| Pinned source file | Material retained or referenced |
| --- | --- |
| [app/themes.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/themes.css) | Play light palette; inherited panel, on-action, success, note ink, 240ms duration and easing; 30px/14px radii; hard shadow; hero/project typography; emblem, underline, borders and conditional card hover |
| [app/appearance.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/appearance.css) | Play dark palette, separate purple accent/pale action, distinct tint A, note/success roles, dark shadow, emblem and shared on-success values |
| [app/globals.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/globals.css) | Global 3px ink focus outline with 5px offset; forced-colors Highlight; global reduced-motion treatment |
| [app/layout.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/layout.tsx) | Manrope with Latin/Vietnamese subsets and JetBrains Mono with Latin subset at 400/500 weights |
| [lib/themes.ts](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/lib/themes.ts) | Play identity, “Tactile springs” label, 400ms spring with bounce 0, entrance helper and immediate reduced values |
| [components/InteractionDemo.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/components/InteractionDemo.tsx) and [components/InteractionLab.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/components/InteractionLab.tsx) | The helper is referenced in InteractionDemo, which is not imported by the mounted app; the mounted InteractionLab is separate. A defined helper does not establish actual hero entrance behavior. |
| [docs/hero-artwork.md](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/docs/hero-artwork.md), [components/HeroArtwork.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/components/HeroArtwork.tsx), and [lib/hero-artwork.ts](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/lib/hero-artwork.ts) | Sphere inspiration credit, original local Canvas adaptation, desktop eligibility, keyboard activation, static reduced mode, offscreen/hidden pausing, density cap and cleanup; pinned notes explicitly describe no hero entrance or stagger |
| [components/ThemeCursor.tsx](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/components/ThemeCursor.tsx) and [app/cursors.css](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/app/cursors.css) | Supplementary Play asterisk/color trail; native pointer retained; device, motion, editing, keyboard and visibility eligibility; settled-frame stopping and cleanup |
| [README.md](https://github.com/tamir39/tamir39-portfolio/blob/6f9bfc6119f0e71dee04b675fbf59b8482aa9c74/README.md) | Project identity and general references; not proof of a source for every theme decision |

**Reuse status:** no implementation license was found in the inspected portfolio. Atlas's own publishing terms remain undecided. This entry retains design facts and provides original Atlas documentation and preview code. It copies no portfolio implementation, branding, artwork, icon files, or font software.

## Additional Atlas comparison

**Reference:** [Neobrutalism components documentation](https://www.neobrutalism.dev/docs), created by **Samuel Breznjak**. [His portfolio](https://samuelbreznjak.com/) identifies the project, and the documentation credits Samuel.

The [September 2026 changelog](https://www.neobrutalism.dev/docs/changelog) records a migration to Base UI and removal of dark appearance; current palettes/components are light only. Atlas uses the reference to compare bold boundaries and offset shadows. This is not evidence that Tamir used the library, and Play's dark palette is retained from Tamir's own source.

**Inspected repository snapshot:** [ekmas/neobrutalism-components](https://github.com/ekmas/neobrutalism-components/tree/3306a802724874a85f93079702b2795370a279d4), `3306a802724874a85f93079702b2795370a279d4`. Its [LICENSE](https://github.com/ekmas/neobrutalism-components/blob/3306a802724874a85f93079702b2795370a279d4/LICENSE) is MIT and identifies copyright **2023 Samuel Breznjak**. Live documentation observations and pinned repository/license evidence have separate scopes.

No library code, component markup, palette, asset, or documentation passage is imported. If a future project imports software, preserve the exact selected version's license and copyright notice; this repository record does not grant blanket permission for all website material.

## Optional artwork inspiration

**Reference:** [Interactive Hero Backgrounds](https://21st.dev/@ravikatiyar162/components/interactive-hero-backgrounds).

**Credited component creator/publisher:** **Ravi Katiyar**, published as **@ravikatiyar162**. The primary listing credits that name and handle. Tamir's pinned artwork notes identify it as Play's sphere-interaction inspiration and describe original Canvas 2D adaptations rather than catalog imports.

**Reuse status:** the component's actual implementation terms remain **unresolved**. No component code, dependency, license text, or artwork is redistributed. Verify the selected package/version, license and required notices before any future import. A reference URL or creator credit is not reuse permission.

## Fonts

Designer credits and package copyright notices have separate roles. Preserve the notices attached to the exact font software redistributed.

| Family | Credited designers | Primary metadata | License evidence |
| --- | --- | --- | --- |
| Manrope | **Mikhail Sharanda** | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/METADATA.pb) | [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt) |
| JetBrains Mono | **JetBrains, Philipp Nurullin, Konstantin Bulenkov** | [Google Fonts METADATA.pb](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/METADATA.pb) | [OFL.txt](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/OFL.txt) |

Both linked packages provide SIL Open Font License 1.1 text, reviewed on the date above. Atlas includes no font binaries or remote font loading. A family name does not establish exact weights, script coverage, or intended rendering on a user's machine. Record the actual package version and preserve its copyright/license when vendoring fonts.

## Guidance and general inspiration

| Reference | Credited responsible contributors | Atlas use |
| --- | --- | --- |
| [W3C WAI form validation](https://www.w3.org/WAI/tutorials/forms/validation/) and [user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | **W3C WAI Education and Outreach Working Group and contributors**; tutorial editors include Eric Eggert and Shadi Abou-Zahra | Reference for understandable corrective feedback and field association. The brief snapshot, focus, pending-request and manual acknowledgement contract is an original Atlas proposal. |
| [WCAG 2.2 contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), and [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | **W3C Accessibility Guidelines Working Group and contributors** | Reference for opaque calculations and responsive checks; no complete implemented conformance claim. |
| [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) | **W3C ARIA Authoring Practices Task Force and contributors** | Relevant keyboard, focus and widget behavior; prefer appropriate native controls. |

The pinned portfolio README lists the [DESIGN.md directory](https://designdotmd.directory/), [Design Prompts](https://www.designprompts.dev/), and [Motion documentation](https://motion.dev/docs/react-animation) as general inspiration. These references do not identify a particular entry as the author of Play. Prior Atlas records credit Rofi and @bidah for the directory; an individual Design Prompts creator remains unverified. Motion is maintained by Matt Perry, the Motion team and contributors. No catalog entry, documentation prose, or animation implementation is imported.

## Atlas adaptation record

| Choice | Reason | Evidence and status |
| --- | --- | --- |
| Source neutral/tinted palette, accent/action distinction, radii and hard shadow | Preserve the observed Play direction | Pinned source inspection; browser limits separate |
| Source global focus dimensions and named type roles | Carry explicit decisions into project preparation | Pinned source; actual font rendering remains a project check |
| Stronger necessary control border | Decorative source line cannot identify every control | Atlas proposal; opaque contrast on six backgrounds |
| Warning/danger/information foregrounds | Supply explicit state vocabulary beyond the extracted palette | Atlas proposals; neutral/tint contrasts calculated |
| Ink and underlined ink links on selected backgrounds | Source muted/dark accent pairs fail ordinary text there | Atlas proposal; recorded failures and checked ink pair |
| Gentler heading tracking and readable type scale | Prevent source portfolio display settings from spreading to controls/reading | Atlas proposal; representative preview only |
| Comfortable spacing with compact specimens | Keep expressive panels and forms readable while demonstrating an adaptation | Atlas proposal; compact scope is explicit |
| Uniform 240ms CSS feedback and optional 2px press | Portable tactile feedback without importing the spring runtime | Retained duration/curve with Atlas normalization and press choice |
| Static decoration and local review/request workflow | Keep the core readable and state explicit | Original Atlas proposal/code; no real agent or network request |

Keep **source inspection**, **numerical calculation**, **rendered validation**, and **reuse permission** distinct. Generated project design documents should preserve relevant creator credits, identify selected Atlas proposals, and record any added implementation/version and checks.
