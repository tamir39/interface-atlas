# Blueprint reference preview

**[Open the live Blueprint preview](https://tamir39.github.io/interface-atlas/themes/blueprint/preview/).** GitHub Pages publishes the preview when changes reach `main`.

For offline use, open [index.html](index.html) in a browser. No build, package installation, server, or external resource request is required. The HTML, CSS, JavaScript, fictional studio briefs, original vector art, and local architecture inspector were prepared for Interface Atlas with Codex AI assistance.

## Scope

- Atlas branding frames the reference; projects choosing Blueprint select their own identity. [Logo usage notes](../../../assets/brand/README.md) record library branding.
- **Linework** is a fictional interface-systems studio. Three illustrative project briefs claim no real client, delivered project, or measured outcome. Native brief disclosures remain readable without JavaScript.
- Exploded geometry and drafting studies are original static SVG compositions. No source image, external wireframe component, animated canvas renderer, or cursor follower is included.
- Light, Dark, and System use the observed Blueprint neutral/tinted palette. Valid saved preferences apply before the stylesheet; System follows live device appearance. Invalid or unavailable storage preserves usable defaults.
- Comfortable is the default density. Compact changes only component specimen insets from 24px to 16px, preserving type sizes, targets, 8px panel/4px control corners, studio layout, and inspector. Viewport-driven changes remain independent of density.
- Manrope names the sans-serif body/interface role; JetBrains Mono names technical values and all preview headings at weight 400, an Atlas adaptation beyond the source's mixed hero. Display tracking is `-0.025em`; ordinary section/card tracking is milder still. Body/input text is 16px with body line-height 1.6; labels, supporting text, indexes, and readable captions use 14px. The design specification's 1.65 body rhythm and sans card-heading option are portable proposals; this preview records its distinct choices.
- The composition has a 74rem (1184px at the tested root size) content maximum and 24px outer gutters, reduced to 16px at 34rem. Library heading uses `clamp(2.5rem, 7vw, 4rem)` with 1.2 line-height; the studio heading uses `clamp(2.8rem, 5.5vw, 5.3rem)` with 1.15 line-height. At 48rem the studio scale becomes `clamp(2.8rem, 8vw, 4.5rem)`, then 2.8rem at 34rem. These maxima, breakpoints, and preview-specific type scales are not universal theme defaults.
- Panels and controls retain 8px/4px corners. Selective resting shadows use source light `5px 5px 0 #1644b817` or explicit dark `5px 5px 0 #8ab7ff22`. Decorative drafting grids use source 24px spacing. Selected-node ink labels, links, markers, and boundaries avoid documented selected-surface failures.
- Focus retains a 3px ink outline with a 5px offset. Comfortable control targets are at least 44px; this is a proposed usability target rather than a claim about WCAG's minimum.
- Color/border feedback uses inherited source 240ms and `cubic-bezier(0.2, 0, 0, 1)` uniformly as an Atlas easing normalization. OS reduced motion takes priority over motion enabled; reduced motion and motion-off make changes immediate.
- Content, inspection, presentation changes, announcements, and focus transfer occur immediately. There are no entrance sequences, moving cards, press transforms, animated scrolling, continuous loops, or animation-completion dependencies.
- Blueprint browser text selection uses its selected-item surface and ink as an Atlas adaptation, rather than a claim about the portfolio's separate light global lime selection rule.

## Architecture-inspector behavior

Five fixed conceptual nodes illustrate project-design preparation. **Project brief** and **Theme catalog** both feed **Design preparation**, which defines **Project design.md** for **Human review**. The original diagram is a local explanation and inspection example. It creates no project design document, starts no agent, invokes no model/tool, exports nothing, and represents no running service or infrastructure telemetry.

1. **Inspect:** each node has a native Inspect link. Activating it opens the corresponding inline article and focuses its heading. The selected link exposes `aria-current="true"`; the node adds an ink boundary and visible Reading marker. Exactly one detail is shown with JavaScript; brief is the initial selection unless a valid `#detail-ID` article link selects another node. Live article-hash navigation also opens and focuses that detail.
2. **Presentation:** Diagram and Outline use the same HTML collection, node identities, and detail state. Changing the native presentation select preserves the open article and focus on the select. Outline provides a linear reading order without inventing a custom tree keyboard contract. Narrow screens stack the node collection; the written relationship table preserves the actual branched relationships independently of spatial layout.
3. **Grid:** Show grid has a stable label and `aria-pressed`. It changes the decorative grid preference only, preserving presentation, selection, article, and control focus. Outline never displays a grid; an explicit announcement explains that the preference is visible in Diagram. It does not alter meaningful relationships.
4. **Relationships:** an always-present semantic table states the four connections and their purposes in both presentations. The diagram has a title/scope and key. The table's labeled, focusable overflow region contains necessary narrow-screen scrolling.
5. **Return or traverse:** Back to node restores that node's Inspect link. Previous and Next follow fixed node order, focus the new detail heading, and become disabled at the collection ends; they do not wrap.
6. **Reset:** Reset workspace restores Diagram, grid on, and brief, then focuses its Inspect link. It does not clear global appearance/density/motion preferences.

Workspace state is not saved and initializes fresh on reload, with a valid article fragment selecting its linked node. Only appearance, density, and motion preferences persist under the guarded localStorage key `interface-atlas-blueprint-preview`. A project adding durable selection, editing, generation, or execution defines those behaviors separately.

Without JavaScript, all five detail articles and three native studio briefs remain readable, anchor navigation works, and runtime preference/workspace controls are disabled or hidden with an explanation. Native editable text, select, and checkbox specimens still work locally. Read-only action samples remain unavailable and make no submission or remote effect.

## Font rendering

CSS names **Manrope** followed by **Segoe UI / sans-serif**, and **JetBrains Mono** followed by **Consolas / monospace**. **No font binaries or remote font services are included; this preview does not establish intended named-font rendering.** Machines with the named faces installed may use them; others use an available local fallback.

Credits are **Mikhail Sharanda** for Manrope and **JetBrains, Philipp Nurullin, and Konstantin Bulenkov** for JetBrains Mono. A Vietnamese sample demonstrates content/fallback handling rather than certification of a family's full glyph coverage. A project verifies its actual package/version, weights, language coverage, fallback, wrapping, and visual rhythm. Font license evidence is in [sources.md](../sources.md).

## Provenance and limitations

The source visual direction is credited to **Tamir (Phi Vuong Tuong Tam)** at `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`. **Meng To / ThreeUI's Wireframe Forms** is the source portfolio's optional artwork inspiration. Neither the portfolio Canvas renderer nor the external component is imported.

**Simon Brown's C4 guidance** is a separate Atlas study reference for diagram title/scope, a key, and labeled relationships. The portfolio does not establish that influence, the preview claims no C4 compliance, and no C4 example image or prose is reproduced. [Sources](../sources.md) records the site's scoped CC BY 4.0 notice.

Source palette, geometry, focus dimensions, named font roles, resting shadows, and grid spacing are retained observations. Stronger necessary borders, warning/danger/information roles, selected-state restrictions, broader mono heading use, portable spacing/type scales, milder tracking, blue text selection, uniform easing, static art, and inspector behavior are Atlas proposals.

See [source credits](../sources.md), [reuse and notices](../../../THIRD_PARTY_NOTICES.md), and [validation evidence](../validation.md). The external wireframe listing displays MIT, with exact future package verification required. Atlas's publishing terms and the portfolio's implementation terms remain unresolved. No portfolio implementation, branded asset, external component, C4 diagram, or font software is copied.

The deployed copy retains local behavior. Documentation links resolve to GitHub source pages during the [preview site build](../../../site/README.md); the build adds no remote fonts or third-party scripts.

This is a **draft reference**. Representative browser checks do not validate every adaptation, intended font, browser, assistive technology, accessibility criterion, optional effect, or real backend. [Validation](../validation.md) identifies actual checks and limits.

## Stable test hooks

| Purpose | Selector or action |
| --- | --- |
| Appearance / specimen density / motion | `#appearance`, `#density`, `#motion`; `#density-note`, `#motion-note` |
| Root preference state | `document.documentElement.dataset.appearance/density/motion` |
| Preference storage | `interface-atlas-blueprint-preview` localStorage key |
| Native studio disclosures | `#briefs-library`, `#briefs-map`, `#briefs-review` |
| Workspace state | `#workspace`; `data-presentation` is `diagram` or `outline`, `data-grid` is `on` or `off` |
| Presentation / decorative grid / reset | `#presentation`, `#show-grid`, `#reset-workspace` |
| Fixed node collection | `.system-node[data-node-id]`: `brief`, `catalog`, `assembler`, `design`, `review` |
| Inspect / selected link | `#inspect-node-ID`; selected link has `aria-current="true"` |
| Details / focus headings | `#detail-ID`, `.node-detail[data-detail-id]`, `#detail-heading-ID` |
| Return / previous / next | `#back-to-node-ID`, `#previous-node`, `#next-node` |
| Explicit relationship alternatives | `#relationships-table`; labeled focusable `.table-wrap` |
| Polite feedback | `#workspace-status` |
| Native specimen fields | `#specimen-label`, `#specimen-kind`, `#specimen-annotations` |
| Typography samples | `#type-display`, `#type-body`, `#type-vietnamese`, `#type-technical` |

`ID` above means one of the five stable node identities. These are test hooks, not a public API or production routing contract.
