# Form & Field — project design

Status: proposed design, 17 October 2026; document preparation only. Theme: Gallery 0.1.0-draft, research identity `atlas-gallery-research-2026-10-15`. This document governs the proposed storefront without requiring implementers to reopen Atlas.

## Scope, evidence and decisions

The supplied brief describes an independent homeware studio, approximately 50 products, an English guest interface, USD, phone-first layouts, desktop use, Light/Dark/System, keyboard operation and reduced motion. Guests must browse, search/filter, inspect accurate imagery, select available variants and quantity, maintain a cart, review authoritative commercial facts and continue to hosted checkout. Same-browser cart recovery is required when storage works.

No users, interface, catalog, media, brand files, service contracts or implementation have been observed. All rules below beyond those supplied requirements are **project proposals**. Gallery contributes proposed visual rules; shared Atlas chapters contribute planning methods, not tested shopping behavior. No stack, payment provider or working endpoint is selected. Catalog, media rights, font acquisition, stock, taxes and remote recovery remain release gates with owners below.

## Theme choice and task structure

Three catalog candidates were read. Botanical suits lifestyle storytelling, but its organic shapes and expressive serif would give brand narrative more weight. Editorial supports calm boutique content, but prioritizes reading. Select **Gallery** because neutral chrome, unboxed imagery, complete-object views and off-image captions directly support product inspection. Its commerce suitability is conditional: this project's cart and checkout contracts are new adaptations, not Gallery capabilities.

Use a compact navigation structure: brand link to Collection, Search, Cart with item quantity, and an Appearance control. Collection is the main entry; product detail and a dedicated Cart page provide stable destinations. A short studio introduction may follow the collection rather than delay browsing. Proposed product categories derive from merchant catalog data; do not invent taxonomy. Hierarchy is image, product name, material/category, price/availability, then View product. Product detail moves from inspection to explicit variant/quantity selection and Add to cart. Cart foregrounds correction, changed facts, totals and Continue to checkout.

The hypothesis is that quiet comparison plus explicit purchase controls suits this brief. Research should test whether guests can distinguish contextual imagery from exact variant views, find unavailable variants, and understand when cart prices become authoritative.

## Color contract

Retain these Gallery values. Use opaque surfaces; product images retain their original colors in every appearance.

| Semantic role | Light | Dark |
| --- | --- | --- |
| Page | `#f6f4f0` | `#171a17` |
| Panel | `#ffffff` | `#20241f` |
| Secondary surface | `#e9e5dd` | `#2b3029` |
| Ink | `#252823` | `#f2f1e9` |
| Muted text | `#596057` | `#c3c8ba` |
| Action | `#634a38` | `#dec6aa` |
| Action hover | `#473527` | `#efdbc2` |
| On action | `#ffffff` | `#292117` |
| Necessary control border | `#787c70` | `#8d9883` |
| Decorative divider | `#c8c5bd` | `#4a5045` |
| Selected surface | `#e2dccf` | `#4d473b` |
| Success foreground | `#325d46` | `#a7d0b3` |
| Warning foreground | `#745014` | `#ebcf98` |
| Error foreground | `#9a3443` | `#f2adb5` |
| Information foreground | `#305d79` | `#aacee4` |

Ink/muted text sit on page, panel or secondary surface. Filled primary buttons pair action with on-action; hover changes only the background to action-hover. Status foregrounds use these neutral backgrounds with text labels and icons; they are not fill tokens. Selection uses ink text, boundary and check marker on selected surface. Decorative dividers never identify inputs. Prose links remain underlined. Text and actions stay outside imagery.

Gallery's existing opaque calculations report minimum ink/muted ratios of 11.89/5.17 in Light and 11.73/7.78 in Dark across its six neutral/tinted backgrounds, and action/on-action of 8.18/9.64. These are inherited calculations, not measurements of this project. Final rendered pairs, controls and focus require checks against the proposed WCAG 2.2 AA target.

## Typography, spacing and geometry

Select Inter, normal 400/500/600, by Rasmus Andersson; use `Inter, Segoe UI, Arial, sans-serif`. No font binaries are supplied. Start with installed fallbacks until a specific Inter package and its notices are approved; verify both metrics. Body and text inputs: 16px/1.65 and 16px/1.5. Supporting text: 14px/1.5. Product headings: 20px/1.35, weight 500. H1: `clamp(2.5rem, 5vw, 4.5rem)`/1.1, weight 400, tracking -0.035em. H2: `clamp(1.75rem, 3vw, 3rem)`/1.2. Keep semantic heading order, wrap full names and errors, and use 65ch maximum for description prose. Price/quantity columns use tabular numerals with right-aligned amounts.

Retain spacing 4, 8, 12, 16, 24, 32, 48, 64, 96px: label gap 8, related controls 12, captions 8, sections 48 on phones/64 on wide screens. Content maximum 1280px; gutters 16px, becoming 32px at 768px. Media corners 0; controls/panels 4px; flat surfaces without shadows. Buttons and quantity controls have a 44px minimum target, including swatches. Do not reduce type or targets to force a grid.

## Pages, responsive layout and navigation

Collection DOM order is heading, Search, filters, result count, product list. Proposed grid: one column below 480px, two from 480px, three from 900px, four from 1200px, with 16px gaps expanding to 24px. These are initial content-fit thresholds, to verify with real names/media. At 320 CSS pixels and 400% zoom, content reflows without page-level horizontal scrolling. Filters remain ordinary wrapping controls rather than a modal drawer.

Search is a labeled search field plus Search button, submitted with Enter or pointer. URL query state holds search text, category and available-only filter; each submitted change makes one history entry. Search matches merchant names/descriptions case-insensitively; categories match stable supplied IDs. Results preserve catalog order; no invented relevance or sorting service. Checkbox filters apply immediately and announce a concise count politely. Show active filters and Clear filters whenever any are set. Clear removes search/category/availability constraints, focuses Search and updates the count. Empty results explain the query and offer Clear filters. A catalog load failure offers Retry collection without calling it an empty collection. Newer queries supersede older results.

Each product uses one native image/name link, supporting facts and a View product link; avoid nested interactive card surfaces. Genuine product URLs support deep links and modified clicks; URL shape is an implementation decision. New logical pages receive a distinct document title and H1 focus after client navigation. Browser Back/Forward restores query, scroll and originating product link without fighting native restoration. If an item disappears, focus the Collection heading and explain its unavailability. Cart stacks line details and summary on phones; from 900px it may use a wider line column and 320px summary. No sticky region may obscure focused content or the onscreen keyboard.

## Product content and accurate media

Merchandising owns stable product/variant IDs, names, dimensions with units, materials, care, option relationships and factual descriptions. Show USD with `$` and two fractional digits, labeling the currency near price groups. Backend monetary representation and rounding are gates; never derive authoritative totals with binary floating-point arithmetic. Use a price range or “From” only when supplied variant prices establish it. Unavailable commercial data reads “Price unavailable” or “Availability unavailable”; a blank or zero is not a substitute.

Reserve a 4:5 collection image frame with `contain`; product detail starts with a complete-object view. Additional detail/context views use labeled native thumbnail buttons and a main contained image, without autoplay or gesture-only navigation. Selected thumbnails have a check/border and `aria-pressed`. Color changes switch to verified media for that variant. If no exact image exists, state which variant is pictured. Contextual cover crops require merchant approval and focal-point records; an uncropped inspection view remains available.

Use native `img`/`picture`, intrinsic dimensions and asset-specific responsive sources. Eagerly load the first visible main image; lower images may load lazily. Media errors retain the frame, name, informative alternative and caption, with Retry image scoped to that asset. A delayed response cannot replace another product/variant's media. Content remains useful while imagery is unavailable; missing required inspection views must be disclosed before adding.

Merchandising must supply real product media, creator, origin, rights evidence, permitted uses/crops and useful alt descriptions. Gallery's generated illustration fixtures are not real product photographs and are not selected for this store. Production asset/font delivery cannot ship before rights and package records exist.

## Variant selection and cart editing

Use labeled native radio groups for Color and Size; text accompanies every swatch. Incompatible/unavailable choices remain named with “Unavailable” and a reason, with unavailable controls disabled. Do not preselect among multiple valid variants. A single valid tuple can be selected and displayed explicitly. Preserve selections when stock changes, mark the affected tuple unavailable and ask for another choice rather than switching it silently.

Quantity uses a labeled integer input and named Decrease/Increase buttons. Proposed defensive bounds are 1–99 per variant and 100 distinct cart lines; backend purchase limits may lower them. These UI limits need owner confirmation. Incomplete numeric typing remains editable; Add/Update validates integer and bounds. At 1, Decrease is unavailable with a nearby explanation. Multi-error submissions focus a linked summary; single quantity errors stay associated and focus the field. The custom-feedback path suppresses competing native interactive validation while preserving native input semantics, and covers button, Enter and scripted submissions.

Add to cart records **intent**, not reserved stock. Missing variants focus the relevant group with “Choose a size.” A valid add combines the same stable variant ID, subject to limits, and announces “[Name] added to cart” after the in-memory mutation. Keep focus on Add; a persistent nearby View cart link provides the next action. Storage acknowledgement is separate. Catalog price/availability is last-observed information until backend review. When tuple availability cannot be loaded, preserve the choice, make Add unavailable and offer Retry availability; do not treat an unknown tuple as available.

Cart shows product link/image, exact options, quantity, last-observed unit price and line amount. Update quantity commits the entered value; malformed input preserves its text and prior committed quantity. Remove names its line, commits removal immediately, announces it and focuses the next line's quantity, then previous line, then the empty-cart heading. Empty cart offers Browse collection. Every committed mutation invalidates any quote and restores Review prices and availability as the next primary action.

## State ownership and same-browser recovery

| State | Owner and lifetime |
| --- | --- |
| Search/filter context | URL/history; restored by traversal/deep link |
| Uncommitted quantity, option choice, image | Page draft; history restoration best effort |
| Cart intent | Browser memory plus proposed IndexedDB draft authority |
| Prices, stock, quote, totals | Backend; cached observations cannot authorize checkout |
| Checkout action/outcome | Service authority; separate minimal recovery identity |
| Appearance | Local preference; System default, live OS changes respected |

Proposed cart schema v1 stores product/variant IDs (maximum 256 characters), integer quantities, revision and store generation; optional name snapshots aid recovery but never authorize commerce. Maximum serialized draft is 100 KiB. No personal/payment data belongs here. Validate loaded data before use. The storage adapter must read revision, compare base and write the immutable candidate atomically in one appropriately scoped IndexedDB transaction; only transaction completion acknowledges “Cart saved in this browser.” Serialize/coalesce candidates before dispatch. Save A cannot clean later draft B. Failure retains B and says “Cart updated in this tab; browser saving failed,” with Retry saving. Same-browser reload recovery lasts while storage remains available; clearing, eviction, profile/device loss and pending writes can lose intent. No cross-device promise or application expiry timer is proposed.

Two-tab conflicts preserve the attempted change, load the saved revision and show Review saved cart. Reapply only the named operation after comparison: an add adds the reviewed delta, quantity-setting shows current-to-proposed values, removal names the current line. Recheck atomically after review; never replay a stale full snapshot.

Startup distinguishes absent, valid, inaccessible, malformed and unsupported-version records. On unreadable data, freeze writes to that record and keep it untouched. Offer Retry reading or Start a temporary cart, explicitly warning that reload can lose it. Storage recovery offers review of saved versus temporary intent before transactional replacement; no automatic overwrite. Reset requires explicit scope confirmation and retires old queued writers/generations. Unknown schema is never silently downgraded. Initial implementation supports v1 only; migration/blocked-upgrade behavior and browser baseline require verification.

## Authoritative review and checkout handoff

Review prices and availability requests a quote for an immutable cart revision. While pending, editing remains available; an edit invalidates the request for current-cart display. Show “Checking prices and availability”; late quote A cannot replace cart B. Network failure retains lines and labels cached figures “Not checked”; Retry review is safe only under the supplied read-only quote contract.

A matching backend quote supplies authoritative unit prices, unavailable lines, item subtotal, discounts, shipping/tax treatment, total, currency, quote identity and validity conditions. Display itemized changes with previous/current values and correction actions. Never silently substitute a variant, reduce quantity or hide a changed total. Guests resolve stock problems and acknowledge changed commercial facts before Continue to checkout becomes available. Unknown tax/shipping reads “Not yet calculated” only if the contract establishes when/how it is determined; do not present a provisional amount as final.

Continue to checkout names an external hosted handoff and binds to the reviewed quote/cart snapshot. Guard duplicate activation across pointer, Enter and alternate entry points; retain focus with guarded `aria-disabled` and “Preparing checkout.” An acknowledged minimal recovery record must exist **before dispatch**, or an independently recoverable authorized service-discovery route must exist. If neither is available, block dispatch and explain that checkout cannot safely begin. Keep action ID, payload fingerprint, quote/cart revision, operation/session identity when issued and last-observed status separately from editable cart intent. Local prepared state proves neither delivery nor purchase. After a proposed 10-second local wait, replace the spinner with persistent delayed/unconfirmed feedback and safe controls; elapsed time alone proves no failure or permission to repeat.

Matching service evidence may supply a permitted hosted URL. Validate its authorized destination under the provider contract, then navigate. A lost reply, timeout, local abort or closed tab yields “We could not confirm checkout preparation. Check its status before starting again.” Preserve that state and reference after reload. Check status is available only with a documented lookup; missing/expired status remains unknown unless the contract proves non-application. Block overlapping checkout dispatch even if the cart is edited. Reuse an action identity only for the same payload within proven duplicate-protection retention. A new key cannot resolve an old attempt. Closing the page does not cancel remote work. A hosted return parameter is not order evidence; reconcile through the backend before reporting a final outcome or adjusting purchased cart quantities, preserving later additions.

## External contract gates and owners

| Owner/input needed | Gate before enabling the capability |
| --- | --- |
| Merchandising/brand | Catalog taxonomy, variants, facts, purchase limits, rights-cleared media and font package |
| Backend catalog/stock owner | Authorized price/stock reads, error semantics, freshness, limits and stock-conflict correction |
| Backend quote/business owner | USD representation/rounding, taxes/shipping, discounts, authoritative itemization, quote revision/expiry and price-change acceptance |
| Backend/hosted-checkout owner | Effect boundary; immutable payload equality; action/attempt IDs; service-enforced duplicate scope, concurrent behavior and retention; lookup authority/consistency/history; terminal/partial evidence; return/session URL rules and expiry |
| Backend/support owner | Eligible retry conditions, pacing/server delays, cancellation capabilities and a real reconciliation destination |
| Frontend/storage owner | Supported browsers, atomic draft contract, capacity, version/conflict/reset behavior and acknowledged recovery identity before dispatch |

All are unresolved inputs. No endpoint, reservation timer, payment provider, successful order, support route or legal guarantee is invented. Until checkout contracts are supplied and verified, the handoff remains disabled in any implementation.

## Accessibility, motion and validation

Use landmarks, a skip link, real headings/links/buttons, visible labels, error associations and logical DOM order. Focus is a 3px ink outline offset 5px, unclipped; forced-colors uses Highlight. Controls remain usable with keyboard, touch and enlarged text. Search counts and cart updates use concise polite status; quote/checkout errors persist in the page. Background completion never steals unrelated focus.

Select Gallery's optional 180ms `cubic-bezier(.2,0,0,1)` transitions for control color/background/border only. Focus, selection, errors and task transitions are immediate. OS reduced-motion removes optional transitions live; no image zoom, cycling, entrance fade, smooth scroll or decorative effects. Light/Dark/System is a labeled native select; apply valid saved preference early, falling back to System when storage fails. Do not invert images.

Performed: selective frozen document reading, candidate comparison and document-level consistency checks. No interface, browser, keyboard, screen reader, service, storage, user, performance, model-token or billing measurement was performed. Atlas token calculations are not project validation.

Before release, verify real media/font wrapping in both appearances at 320px, proposed thresholds, desktop and 400% zoom; keyboard/screen-reader browse–select–cart–review tasks; empty/unavailable/long content; native image failures; reduced motion and forced colors. Exercise save A/edit B, reload, denied/quota storage, unknown schema, conflicts during review and stale writers. Service tests must cover changed prices/stock, obsolete quotes, lost checkout replies, reload before identity mapping, duplicate/changed payloads, status lag/expiry and hosted return without proof. Measure actual responsive image loading and layout stability. Observe intended guests without coaching; record barriers and uncertainty rather than asserting conversion improvement.

## Credits, adaptations and frozen source identity

Gallery is original Atlas synthesis by **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. Its neutral values, Inter roles, geometry, complete-image policy and bounded motion are retained; storefront layouts, commerce copy, cart transactions and checkout gates are project proposals. Shopify's [design guidance](https://shopify.dev/docs/storefronts/themes/best-practices/design) informed Gallery concepts. Dawn/Horizon code/assets are not incorporated; inspected Shopify licenses restrict their scope and are not plain MIT. Atlas publishing terms remain undecided.

Inter designer: **Rasmus Andersson**; package copyright: **The Inter Project Authors**, SIL OFL 1.1. [Upstream record](https://github.com/rsms/inter/tree/353b61b9f4430d5f420d56605a6e7993e0941470); v4.1 is a distinct release. Retain the exact acquired package's copyright/OFL text; inspected notices differ in year. No font software is copied here.

Atlas image concepts reference **Mat Marquis**, with Rachel Andrew, Jake Archibald, Barry Pollard, Aaron Forinton, Eric Portis, Zach Leatherman and K.Adam White, [Learn Images](https://web.dev/learn/images/prescriptive) (content CC BY 4.0; code Apache 2.0). Accessibility concepts credit **W3C WAI/EOWG and contributors**, [Images Tutorial](https://www.w3.org/WAI/tutorials/images/), and W3C/WHATWG standards contributors. Storage concepts credit **Steve Becker/W3C**, [IndexedDB Working Draft, 13 August 2025](https://www.w3.org/TR/2025/WD-IndexedDB-3-20250813/), and [WHATWG Storage](https://storage.spec.whatwg.org/). Remote semantics credit **Roy T. Fielding, Mark Nottingham, Julian Reschke/IETF**, [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html) (document terms BCP 78/TLP, distinct code terms), and **Anne van Kesteren/WHATWG**, [Fetch snapshot e9460d1](https://fetch.spec.whatwg.org/commit-snapshots/e9460d1b22ead1c6a72eeac37fb2ec0dc01aeb1d/) (prose CC BY 4.0, distinct BSD code terms). These are referenced concepts, with no imported source prose/code/assets or endorsement.

Planning methods credit **Ghaida Zahran**, [Journey/Evaluate at 3fc38df](https://github.com/ghaida/intent/tree/3fc38dff381ce0e4dec8f52c97c3e37abd95e10e) (CC0); **Jakub Krehel**, [better-* at 4c66b1f](https://github.com/jakubkrehel/skills/tree/4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63), copyright 2026 Jakub Krehel (MIT); and **Julien Thibeaut**, [ui-skills at f18d130](https://github.com/ibelick/ui-skills/tree/f18d13077d6e3841821ea0a36526c0fd44a570b5), copyright 2026 Julien Thibeaut (MIT). Atlas narrows these to relevant decisions and evidence, without importing their complete workflows. Redistributed substantial covered adaptations retain copyright/permission notices recorded in Atlas `references/licenses/jakub-krehel-MIT.txt` and `julien-thibeaut-MIT.txt`; CC0 credit is provenance. Future copying requires terms for the actual artifact.

The brief's `782159e8e2510933c76989ff9fd9546d282c62cd` is historical. This run used the wrapper's frozen updated working snapshot, read 17 October 2026; no claim is made that HEAD or that historical commit contains it. SHA-256 identities below identify relevant updated inputs; the private read-events record retains every read and full-file identity.

| Frozen path | SHA-256 |
| --- | --- |
| `skills/prepare-frontend-design/SKILL.md` | `71804c65b66564565c65e8485f4239c6d7c24709070c08ce9c92f0b74f9477f3` |
| `themes/gallery/design.md` | `e8f78bc44de673dcf4b8210f926ba65aacfba654ac3d24cb6e98a6b1d14e06f4` |
| `themes/gallery/sources.md` | `0177205325a7a1da178a0c950a976a70a0da796b153c87c93bcbf7196206610a` |
| `themes/gallery/motion.md` | `e98e7874a0c7d8ef4236c03298b4c63278f9834cb2fb263e9f8d368631cdd4c8` |
| `knowledge/ui-ux-design.md` | `ef7048339a733068b3f2241ddcacce7cc682cb65c748f723000465fc883f5152` |
| `knowledge/accessibility-and-responsive.md` | `fcde6775c47577cc3626e38cf1512755fd56b92ca6cb1312990ca92562da266d` |
| `knowledge/state-and-recovery.md` | `ddd338c88cb26e5001c6209e91d4d3b53089912ac2bee68a9c3a95ba5eda7c51` |
| `knowledge/forms-and-navigation.md` | `870844c51547c2083a5b33d97048c7fdae1bdd7850a214ae375bdc3940e93b5b` |
| `knowledge/uncertain-outcomes.md` | `7977ea92734b0457dee69f041b22f88061970c83070fb85976a56e119736cb10` |
| `references/skill-adaptations.md` | `02a8801225a921eab3cb081b933df803de06118ec6c38b78fdd01968b364e1fd` |