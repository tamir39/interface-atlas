# Gallery reference validation

Reviewed **2026-10-15** against Gallery `0.1.0-draft`. **Theme status remains draft.** This record covers the original [reference preview](preview/README.md): a fictional image-led collection, search/category filters, inline work inspection, and actual image load/error/retry behavior. It provides no real products, stock, cart, checkout, commissioned work, or agent execution.

## Environment and reproduction

Windows; Node.js 24.14.1; Playwright 1.62.1; headless Chromium 153.0.8010.12. Existing local dependencies were used; no package was installed into Atlas. The preview loads only local scripts, styles, and three original generated PNG files; it distributes no fonts.

Run [tools/validate-gallery.mjs](../../tools/validate-gallery.mjs) with installed Playwright and Chromium, following [the tool instructions](../../tools/README.md). The retained [JSON record](preview/validation/results.json) includes measurements, exclusions, actual rendered fonts, intentional resource failures, and SHA-256 hashes of the final repository HTML, CSS, JavaScript, three PNGs, and validator. Hashes are checked again at the end of the run. Use a temporary output directory for subsequent verification.

## Performed checks

| Check | Observed result | Limit |
| --- | --- | --- |
| Responsive layout | Passed 20 combinations: light/dark × comfortable/compact × 320, 390, 768, 1280, 1440 CSS px; no page-wide horizontal overflow | Fixed illustrative content and representative states |
| Opaque HTML text contrast | 158 samples per layout; minimum 5.17:1 light / 7.79:1 dark; applicable normal/large-text thresholds passed | SVG, disabled samples, placeholders, native popup menus, text selection, and unsupported backgrounds are excluded or recorded separately |
| Control boundaries | All six expected enabled input/select boundaries per layout passed; minimum 3.40:1 light / 4.46:1 dark against fill and adjacent solid surface | Native checkbox glyph internals excluded; labels and hit areas checked separately |
| Density and targets | Specimen inset changed 24px comfortable → 16px compact; height changed 921.78px → 905.78px at 1440px; sampled enabled targets retained at least 44px width/height; mobile text fields retained 16px text | Collection, images and viewer keep their responsive profiles; contextual prose links excluded from target sampling |
| Native controls and focus | Keyboard skip focused main; Inspect focused each matching work heading; three view buttons retained focus and stable contextual names as pressed states changed; Return restored the visible opener | Chromium role/name lookup and accessibility snapshots; not listening with assistive technology |
| Filters and recovery | Case-insensitive search and category combinations produced correct results; empty state offered Clear filters, which restored all studies and focused search; hidden-opener Return preserved filters/open detail and explained search focus | Three fixed records; not a production catalog search service |
| Media metadata | Three assets matched declared natural dimensions; informative alternatives and visible caption/creator context remained available; original image colors were retained in both appearances | Generated illustrative fixtures, not documentary or color-calibrated photography |
| Direct work links | Valid initial work fragments revealed the target; live valid fragment navigation focused its heading; invalid fragments fell back; fragment-free reload reset selection | An explicit valid URL fragment is a selection input; not general application routing/history testing |
| Long content | Injected English/Vietnamese card titles and captions remained complete at 320, 768 and 1440px; Inspect actions remained reachable and separate | Representative injected text; not exhaustive localization or glyph coverage |
| Text/image separation | Actual hero text ranges stayed outside the image bounds at 768 and 1280px | Representative composition check; arbitrary future images/layouts still need inspection |
| Delayed image | Intercepted real image request retained loading text, alternative/caption and a nonzero reserved box; width/height stayed within 1px after load; switching work first preserved selected metadata, feedback and focus | Local request interception, not a real mobile-network or layout-shift benchmark |
| Failed image and retry | One deliberately aborted asset request produced readable recovery text and retained alt/caption/credit; keyboard Retry made a successful request for the same image and focused its work heading | Failure text/targets sampled in both appearances; hero/card images retain native fallback rather than custom retry controls |
| Preferences and storage | System followed live appearance; explicit appearance/density/motion persisted; transient filters/selection reset without a work fragment; blocked, invalid and malformed storage remained usable | Representative storage failures; first-frame paint timing not instrumented |
| Motion | Sampled feedback was 180ms color/background/border only; reduced motion and motion off were immediate; no autoplay or automatic animation ran | No animation or rendering-performance benchmark |
| Forced colors | Sample focus retained a 3px outline and 5px offset with a system color | Representative focus geometry, not a complete forced-colors audit |
| Text resize | At 640px, 200% CSS root sizing doubled a body sample from 16px to 32px and reflowed without horizontal overflow | Not native browser zoom testing |
| No JavaScript | All three collection records, full detail articles, real anchors, captions/credits and editable native specimens remained available at 320px; eight visible runtime controls stayed disabled; 183 opaque text samples passed, minimum 7.79:1 | Search, selection and scripted retry require JavaScript; transient image-state text is hidden |
| Resource health and hashes | No ordinary runtime errors, external resource requests, failed responses or failed requests; six native/media file hashes and validator hash remained unchanged | Intentional failure is retained separately as a test fixture, not reported as ordinary resource health |

The JSON contains **17 grouped checks**; the table separates related observations. Sampling requires nonzero opaque HTML text coverage and all six expected enabled field boundaries. Final layout samples reported no unsupported background/color cases. Exclusions for SVG, disabled, unrendered, visually hidden and native-checkbox samples remain in the JSON. [Design.md](design.md) records separate opaque token calculations; those are not complete rendered validation.

## Fonts, images and visual evidence

Chromium reported **Segoe UI** for body, display and Vietnamese samples, and **Consolas** for technical text. All reported glyph samples used installed platform fonts. **Inter was not rendered in this environment**; the proposed named family, exact packages, weights and full language coverage require project checks.

The retained assets are unchanged generated PNGs: Vessel 1024×1536, Seat 1254×1254, Room 1536×1024, totaling **7,002,794 bytes**. The [asset record](preview/assets/README.md) and [manifest](preview/assets/manifest.json) preserve the built-in generation method, exact prompts, intrinsic dimensions, sizes and hashes. These are photography-style illustrations of fictional studies with no documentary photographer, real product or property claim.

The hero reuses Room; cards and detail articles reuse the same three originals. Explicit dimensions, eager visible hero media, lazy lower media, natural ratios and contained detail viewing are implemented. **No responsive derivatives, alternate compressed formats, art-directed source files or image service are supplied.** Production source candidates, compression, focal points, asset rights, color treatment and network budgets need real project media and measurements.

Light/dark desktop, narrow-screen, tablet and 200% CSS text captures were visually inspected for hierarchy, image prominence, captions, readable controls, preserved image colors and separation between text and media. The preview's container/gutter/section spacing, sans scale, natural ratios, small geometry and specimen-only density adaptations are recorded in [the preview notes](preview/README.md).

- [Light desktop collection with all three images](preview/validation/light-desktop.png).
- [Dark desktop inline Room inspection](preview/validation/dark-desktop.png).
- [Light mobile collection viewport](preview/validation/light-mobile.png).

The composition, native code, fictional collection, generated assets and interaction decisions are original Atlas work for Tamir with Codex AI assistance. Shopify design guidance, Mat Marquis's Learn Images course and reviewers, W3C/WHATWG contributors and Inter designer Rasmus Andersson have distinct reference roles in [sources.md](sources.md). Shopify theme code, listing imagery, font software and tutorial samples were not imported.

The validator checks repository preview files. The [Pages builder](../../site/README.md) rewrites documentation links in its published HTML copy and allowlists the three PNGs. Published navigation, delivery bytes and representative live inspection/filter paths are checked separately before reporting the preview live.

## Corrections and remaining coverage

Review corrected a tablet hero grid collision so text and imagery occupy separate columns, added a 44px minimum for Credits navigation, and made the Room caption's creator context explicit. Valid work fragments preserve real-link destinations; Retry returns focus when its control disappears. Final recorded checks ran after these changes and repository text normalization. Captures wait for visible images rather than assuming lazy resources have completed.

Each consuming project still needs exact licensed font packages, representative real assets and their rights/credits, supported browsers, full keyboard paths, screen-reader names/announcements, native zoom, touch devices, focus clipping, arbitrary content growth and media failures. This evidence establishes neither complete WCAG conformance nor production image performance, intended Inter rendering, photographic accuracy, or commercial outcomes.

An ecommerce adaptation additionally needs variants, truthful price/stock data, cart ownership and persistence, asynchronous recovery and checkout contracts. Those are shared project-flow needs rather than capabilities supplied by this collection viewer. Gallery has not yet received a fresh complete project-design generation evaluation. Atlas publishing terms remain undecided.
