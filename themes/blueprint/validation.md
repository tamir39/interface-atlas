# Blueprint reference validation

Reviewed **2026-10-13** against Blueprint `0.1.0-draft`. **Theme status remains draft.** This record covers the original [reference preview](preview/README.md): a fictional engineering studio and a conceptual project-preparation diagram with local inspection controls. It establishes no generated project document, running agent, live infrastructure, or complete accessibility conformance.

## Environment and reproduction

Windows; Node.js 24.14.1; Playwright 1.62.1; headless Chromium 153.0.8010.12. Existing local dependencies were used; no package was installed into Atlas. The preview makes no external resource requests and includes no font files.

Run [tools/validate-blueprint.mjs](../../tools/validate-blueprint.mjs) with an installed Playwright package and Chromium, following [the tool instructions](../../tools/README.md). The retained [JSON record](preview/validation/results.json) includes measurements, exclusions, rendered-font evidence, and SHA-256 hashes of the final repository HTML, CSS, JavaScript, and validator. Hashes are checked again at the end of the run. Use a temporary output directory for subsequent checks.

## Performed checks

| Check | Observed result | Limit |
| --- | --- | --- |
| Responsive layout | Passed 20 combinations: light/dark × comfortable/compact × 320, 390, 768, 1280, 1440 CSS px; no page-wide horizontal overflow | Fixed illustrative content and representative states |
| Opaque HTML text contrast | 220–221 samples per combination; minimum 5.32:1 light / 6.97:1 dark; applicable normal/large-text thresholds passed | SVG, disabled samples, placeholders, native popup menus, text selection, and unsupported backgrounds excluded or recorded separately |
| Control boundaries | All five expected enabled input/select boundaries per combination passed; minimum 4.00:1 light / 5.07:1 dark against fill and adjacent solid surface | Native checkbox glyph boundaries excluded; their labels and hit areas checked separately |
| Density and targets | Specimen inset changed 24px comfortable → 16px compact; height changed 1098.05px → 1082.05px at 1440px; sampled enabled targets retained at least 44px width/height | Studio and workspace keep their comfortable profiles; inline prose links excluded from target sampling |
| Diagram semantics | Five fixed nodes and four labeled relationships remained available; both Project brief and Theme catalog feed Design preparation, then Project design.md and Human review | Conceptual graph and explicit relationship text, not C4 conformance or a real system architecture |
| Skip link and disclosures | Keyboard skip focused main; all three native studio disclosures opened/closed by keyboard | Representative paths, not a full keyboard or screen-reader walkthrough |
| Node inspection | Every Inspect link focused the matching article heading; every Back returned to its corresponding link while retaining the open detail | Original inline inspection contract, not a custom tree widget |
| Presentation and grid | Diagram/Outline and grid-off/on preserved nondefault selected detail, control focus, and relationships; grid decoration changed; actual Show grid name stayed stable as aria-pressed changed | Chromium accessibility snapshots and exact role/name lookup, not listening with assistive technology |
| Previous, next, reset | Traversal followed the fixed reading order, focused new headings, and disabled at ends; Reset restored Diagram/grid-on/brief and focused the first Inspect link | Reading order is not a claim that all nodes form a linear dependency chain |
| Direct links | Valid article fragments opened their named detail initially and after reload; live valid fragments focused headings; invalid initial fragments fell back to brief; Reset cleared the fragment | Native fragment routes only, not general application routing/history testing |
| Preferences and reload | System followed live OS appearance; explicit appearance/density/motion persisted; workspace presentation/grid/selection reset on ordinary reload | A valid article URL deliberately selects that article; first-frame paint timing was not instrumented |
| Storage failures | Blocked, invalid, and malformed storage retained defaults and usable preferences, views, grid, and inspection | Representative local-storage failure conditions |
| Motion | Live reduced motion and motion off made sampled feedback immediate; pressing produced no transform | Source wireframe renderer, cursor follower, Motion helper, and entrances are unselected |
| Forced colors | Sample focus retained a 3px outline and 5px offset with system color | Representative focus geometry, not a complete forced-colors audit |
| Text resize | At 640px, 200% CSS root sizing doubled a body sample from 16px to 32px and reflowed without horizontal overflow | Not native browser zoom testing |
| No JavaScript | All five full articles, relationship text, Inspect anchors, and native briefs remained usable at 320px; eight runtime controls stayed disabled; native specimen fields remained usable; 256 text samples passed, minimum 6.97:1 | Presentation/grid/detail-navigation controls require JavaScript; initial System still has a CSS dark fallback |
| Runtime and resources | No browser errors, external requests, or failed preview resources | No production performance or device measurement |

The JSON contains **15 grouped checks**; the table separates some related observations. Sampling requires nonzero opaque HTML text coverage and all five expected enabled field boundaries. The final layout matrix reported no unsupported background/color samples. SVG, disabled, unrendered, visually hidden, and native-checkbox exclusions are recorded separately. Numerical source-pair calculations and selected-background failures remain separately documented in [design.md](design.md).

## Fonts and visual evidence

Chromium reported **Segoe UI** for body and Vietnamese text and **Consolas** for display and technical text. These are installed local fallbacks. Manrope and JetBrains Mono were not bundled, downloaded, or validated. One sentence does not establish complete language or intended-font coverage.

Light/dark desktop and narrow-screen captures were inspected for hierarchy, original exploded-layer artwork, small corners, offset shadows, visible arrowheads, selected cues, and readable node/relationship/detail content. The preview's broader mono heading role, content width, gutters, and specimen-only density are recorded in [the preview notes](preview/README.md).

- [Light desktop studio and fictional briefs](preview/validation/light-desktop.png).
- [Dark desktop diagram and inspector](preview/validation/dark-desktop.png).
- [Light mobile preparation workspace](preview/validation/light-mobile.png).

The studio composition, static vector drawings, fictional briefs, conceptual graph, and implementation are original Atlas work with Codex AI assistance. Tamir's source direction, font creators, Meng To/ThreeUI's optional wireframe inspiration, and Simon Brown's separately referenced diagram guidance remain credited in [sources.md](sources.md). No portfolio implementation, external renderer, example diagram, or font software was imported.

The validator checks repository preview files. The [Pages builder](../../site/README.md) rewrites documentation links in the published HTML copy while preserving local behavior. Published routing and delivery are checked separately before reporting the preview live.

## Corrections and remaining coverage

Review moved arrowheads outside opaque cards and separated the two input arrows. Narrow layouts use a reading-order outline and explicit relationship table rather than a spine that would imply a nonexistent brief-to-catalog connection. The Credits navigation link received a 44px minimum width. Final recorded checks ran after these changes and repository text normalization.

Each consuming project still needs exact licensed font packages, representative real content, supported browsers, full keyboard paths, screen-reader names/announcements, native zoom, focus clipping, touch devices, and hover/selection/unavailable states. Verify diagram accuracy and alternatives with actual users and real system data; source-style resemblance does not establish a correct architecture.

Optional composited artwork, wireframes, and cursor effects need separate contrast, performance, eligibility, and lifecycle checks. A production architecture explorer also needs authoritative model data, persistence, revisions, navigation, permissions, and recovery. This reference verifies only its labeled local conceptual flow. Selection among Atlas themes has not yet received a fresh project-generation evaluation.
