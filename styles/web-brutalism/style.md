# Web Brutalism — style specification

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

This is an original Atlas **composition** recipe for a content-first reading surface. Its exact geometry, hierarchy, theme mapping and enhancement behavior are Atlas choices. They are not historical rules for every site described as brutalist. Read the [README](README.md) for fit and [sources](sources.md) for provenance; consult [preview notes](preview/README.md) for the specimen's exact controls.

## Interpretations and boundaries

The label covers overlapping approaches. One foregrounds a readable document, familiar browser behavior and an exposed content structure. Another uses expressive typography, abrupt arrangements or experimental presentation. These are working distinctions for Atlas selection, not a complete taxonomy or a claim that one approach is authentic and the others are not.

**This recipe and its fit guidance cover only the content-first interpretation.** An expressive variant needs its own brief, navigation model, responsive rules, motion decision and accessibility assessment. Do not extrapolate the Open Index results to a deliberately unusual art publication, fragmented layout or moving composition.

[Neobrutalism](../neobrutalism/style.md) has a separate Atlas form recipe built around strong outlines, opaque blocks and hard offset shadows. Adding those features to a square page does not implement this composition. Flat design describes reduced depth; minimalism can describe restraint. Either may overlap visually with a direct document, but neither establishes the content order, native navigation or enhancement contract described here. No compulsory monochrome palette, monospace font or universal decoration ban defines the broader family.

## Scope and theme projection

Name the actual reading surface being adapted. Preserve useful content, semantic roles, meaningful status colors and the project's language. Record deliberate changes to composition and geometry, especially when the existing identity depends on rounded forms, layered surfaces, imagery or depth. A style choice does not silently authorize rewriting the rest of an application.

The reference projects **Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery and Layered** into one shared page. It uses their selected palette roles and declared font stacks. A direct reading page may be a plausible starting point for several profiles; every pairing still needs review against its authored theme. Profile switching cannot reproduce the original themes' layouts, assets, effects, components or interaction models.

The shared snapshot retains **15 source-mapped tokens**, including source corner values, for provenance. This recipe explicitly overrides card and control geometry to **0px** and removes all shadows. Retained source radii do not describe the rendered result. Palette roles and local font stacks remain available; not every stored role has to paint a visible element. Read the source mapping before claiming a value is preserved.

For a consuming project, load its chosen theme and this bounded style guidance. The nine-profile switcher is an Atlas comparison device, not a requirement to ship nine palettes or a theme selector. The framework-independent recipe requires no component library, font download, animation package or runtime beyond any enhancements the actual task needs.

## Bounded reference recipe

| Role | Atlas reference choice | Purpose and boundary |
| --- | --- | --- |
| Composition | One document column; index before the complete notes | Source order carries the reading sequence. Settings and supporting notes remain secondary. |
| Geometry | **0px** corners for styled surfaces and controls | An explicit specimen override, including profiles whose source corners are rounded. |
| Depth and artwork | No shadow, gradient, blur, texture or decorative pseudo-element art | The page is visually flat; this is a recipe limit rather than a historical claim. |
| Structure | **1px** rules and ordinary spacing | Separate meaningful regions without wrapping every paragraph in a card. |
| Link | Real destination with a persistent underline | Make navigation identifiable before hover. Retain native activation and URL behavior. |
| Input | Native form element with an associated label | Maintain recognizable roles, checked state and keyboard operation. |
| Primary action | Theme Primary with On-primary text | Preserve the semantic pair in both appearances. |
| Text and surfaces | Readable theme Ink, supporting Muted, opaque theme surfaces | Resolve actual appearance pairs; accent color alone does not communicate a state. |
| Optional feedback | **100ms ease**, `border-color` only, initially off | Immediate state changes remain independent of the transition. |

The 0px corner rule describes authored CSS surfaces and controls; native checkbox glyphs and select popups remain user-agent controlled. Keep native checkbox appearance rather than substituting a custom drawing to force identical pixels. Flatten the actual styled regions rather than placing hard-shadow cards in a plain outer frame. Clear inherited box shadows, text shadows and decorative filters where they would recreate depth. Avoid rotated panels, faux browser chrome, noisy backgrounds and oversized outlines used solely to signal the label. Retain useful content imagery when a consuming publication needs it, then assess that adaptation separately; the text-only specimen establishes no image treatment.

## Typography and reading layout

Use the host theme's body, display and code roles selectively. A document need not become monospace, all caps or black and white. Body text stays selectable, resizable and comfortably wrapped. Use actual heading elements in a useful hierarchy. Reserve a display face for headings when its proportions remain readable at narrow widths; short metadata does not justify shrinking essential text.

The local preview declares existing theme stacks with system fallbacks and supplies no font software. A named family in CSS is not proof it rendered. Check the installed fallback, language coverage and licensing before shipping a selected font. An observed fallback can alter line breaks and reading length without invalidating the underlying composition.

Group by heading, spacing and rules before adding containers. Keep the page in one reading column rather than a dashboard grid. Let settings and labels wrap naturally. Avoid fixed text heights, clipped headings and controls that extend beyond the viewport. Long URLs or words need a safe wrapping strategy. Native scrolling must reach all content, including at increased text size and narrow widths.

A visible skip link and an identifiable main region support direct access. The index links to stable article IDs; each article has its own heading and a return route to the index. Do not replace ordinary fragment navigation with scripted scrolling, intercept browser history or hide an article because the index query does not match it. A copied article URL should still reach readable content after reload.

## Local interaction contract

**Open Index** contains six original frontend notes in the initial HTML. Its optional filter changes index entries only; every article stays readable. Explain the remaining match count and provide a clear route to restore the index. An empty index result is a filter outcome, not a reason to remove the document or announce that no content exists.

Reading-plan selection uses labeled native checkboxes. Retain choices while the index filter changes and show a readable selected count, including selections outside the current matches. The checkbox's native checked state carries its programmatic meaning. Do not turn the row into a separate toggle button, nest a link inside its activation target or communicate selection solely with accent color. Links navigate; checkboxes select; buttons run actions.

The local plan title accepts **3–48 characters after trimming surrounding spaces**, enforced by custom validation rather than a native `maxlength` constraint. Validate on the relevant action, identify the offending field and explain how to repair it. Editing must clear any stale success claim. Treat this as specimen behavior: a consuming project's own validation, persistence and authorization requirements remain authoritative.

Export downloads a UTF-8 plain-text reading plan containing the actual selected notes and the accepted title. The fixed filename is **`open-index-reading-plan.txt`**. Include selected notes in their original document order with canonical public article URLs; title text is content rather than an unchecked filesystem path. Prevent an empty or invalid export with useful feedback. Report that the download was requested, without claiming that a browser wrote a file to a particular location. No server, account, remote save or publishing operation is demonstrated. Input and selection are local and reset on reload.

The reference uses a **3px Ink focus outline with a 3px gap** and at least **44px** control/label target height as Atlas choices. [SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) instead defines a **24 by 24 CSS pixel** minimum with exceptions and spacing conditions; target height alone is not a complete assessment. Keep action outcomes and validation immediate. Preserve focus during filtering and selection; move it deliberately when validation requires attention. Native disclosures, where used for secondary technical notes, retain their summary control and keyboard behavior. Essential articles are never gated behind a disclosure, modal, animation or JavaScript initialization.

## Appearance and resilience

Support **Light, Dark and System** through the consuming project's appearance model. System follows live operating-system changes; explicit Light or Dark remains explicit. Apply full palette pairs to inputs, actions, links, errors and secondary text. A single background swap does not produce a complete dark appearance. Check actual contrast rather than assuming a raw presentation is automatically readable.

With JavaScript absent or failed, the HTML articles, fragment links and native disclosures still work. Enhancement controls begin disabled with a readable explanation and become available only after initialization. Do not briefly expose functioning-looking export or filter controls before handlers exist. A static baseline is useful without pretending that a client-side download can occur without its enhancement code.

Under **forced colors**, use `Canvas`/`CanvasText` for the page, `LinkText` for ordinary document links and `ButtonFace`/`ButtonText` for actions, including the button-like skip link; the Atlas title mark uses `CanvasText`. Keep native checkbox rendering and visible focus. Let user-agent colors operate, avoiding a broad `forced-color-adjust: none` override. Remove optional transitions and decorative effects; preserve readable counts, errors and control boundaries.

Motion is off by default. The optional border-color transition never moves a target, animates scrolling or delays state. Reduced motion and forced colors remove it, including after a live preference change. Read [motion.md](motion.md) only when implementing that optional feedback.

## Evaluation boundary

Check [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), generally **4.5:1** for ordinary text and **3:1** for qualifying large text, with the criterion's exceptions. Check required authored control/state information against adjacent colors under [Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), generally **3:1** with its exceptions. A native control exemption is not a reason to erase useful boundaries elsewhere.

Evaluate keyboard order, fragment/history behavior, selection under filtering, valid and invalid export, narrow reflow, text enlargement, appearance changes, forced colors and disabled JavaScript. Record the actual browser and states in [validation.md](validation.md). These are checks for this finite probe, not mandatory product features or evidence of every theme's suitability. Source inspection, a sparse visual style and a profile screenshot establish neither complete accessibility nor measured performance. Keep the entry **draft** while its evidence remains bounded.
