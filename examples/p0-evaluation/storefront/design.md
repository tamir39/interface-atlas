# Form & Field design

Status: reviewed specification after one correction pass; no implementation or rendered validation. English, USD, guest shopping, approximately 50 products. Theme: Gallery 0.1.0-draft, research record `atlas-gallery-research-2026-10-15`. Workflow baseline: Interface Atlas `782159e8e2510933c76989ff9fd9546d282c62cd`, with supplied P0 research chapters revision 0.2-draft, 2026-10-15.

## Project requirements and decision status

Visitors browse, search, filter, inspect accurate product images, select available variants and quantity, maintain a cart, review authoritative commercial information, and enter hosted checkout. A cart draft survives same-browser reload when storage works. Light, Dark, System, keyboard operation, and reduced motion are required.

Gallery was selected after comparing Gallery, Botanical, and Editorial READMEs. Its image-first composition and explicit complete-object policy fit this collection. Botanical's organic geometry and Editorial's expressive serif emphasis were less direct fits for product comparison. These are design judgments, not conversion findings.

All numerical theme values below are retained **Atlas proposals**, not Shopify tokens. Storefront layouts, routes, storage mechanisms, input rules, and transaction boundaries are **Form & Field proposals**. Backend capabilities remain unverified gates. There is no supplied catalog, image permission, font package, API, provider, tax rule, stock reservation, or implementation stack. Account, wishlist, loyalty, and agent features are outside this brief.

## Color contract

Use opaque colors; imagery provides visual variety. Retain these Gallery values:

| Semantic role | Light | Dark |
| --- | --- | --- |
| Page | `#f6f4f0` | `#171a17` |
| Panel | `#ffffff` | `#20241f` |
| Surface / empty media frame | `#e9e5dd` | `#2b3029` |
| Ink | `#252823` | `#f2f1e9` |
| Muted text | `#596057` | `#c3c8ba` |
| Primary action | `#634a38` | `#dec6aa` |
| Primary hover | `#473527` | `#efdbc2` |
| On primary | `#ffffff` | `#292117` |
| Decorative divider | `#c8c5bd` | `#4a5045` |
| Necessary control border | `#787c70` | `#8d9883` |
| Selected surface | `#e2dccf` | `#4d473b` |
| Success foreground | `#325d46` | `#a7d0b3` |
| Warning foreground | `#745014` | `#ebcf98` |
| Danger foreground | `#9a3443` | `#f2adb5` |
| Information foreground | `#305d79` | `#aacee4` |

Ink and muted text belong on page, panel, or surface. Primary and hover use on-primary text. Semantic status colors are foregrounds on those neutral backgrounds, accompanied by text. Selected options use ink text, a 2px ink border, and a checked marker; color alone is insufficient. Links in prose remain underlined. Decorative dividers cannot identify inputs. Do not lower opacity for unavailable text: keep muted text and explain its status.

System is the initial appearance; its chrome follows live OS changes. Explicit Light/Dark overrides it. Save a valid appearance preference separately from cart intent; failed preference storage leaves the current session usable. Never recolor, dim, or invert product media for Dark mode.

## Typography, spacing, and geometry

Use Inter normal 400/500/600, followed by `Segoe UI, Arial, sans-serif`. No font file is supplied; the fallback is an intentional first implementation path. Body and entered text are 16px/1.65 and 16px/1.5 respectively; captions and labels 14px/1.5, weight 400/500. Product-card titles are 20px/1.35, weight 500. Page headings use `clamp(2.5rem, 5vw, 4.5rem)`/1.1, weight 400, tracking -0.035em. Section headings use `clamp(1.75rem, 3vw, 3rem)`/1.2. The wordmark is text, 20px/1.3, weight 600; no invented logo asset. Prices use tabular numerals and retain the same text size as neighboring information. Format USD consistently with two decimal places; do not perform authoritative monetary arithmetic in the UI.

Retain spacing 4, 8, 12, 16, 24, 32, 48, 64, 96px. Labels sit 8px above controls, related controls 12px apart, product captions 8px below media. Media corners are 0px; controls and grouped panels 4px. Use flat surfaces without shadows. Controls have a minimum 44px height and touch area; quantity buttons are 44×44px. Focus is immediate: 3px ink outline, 5px offset; forced colors uses Highlight. Reserve outer clearance so frames cannot clip it.

## Pages, responsive behavior, and navigation

Proposed routes are `/collection`, `/products/{slug}`, and `/cart`; these identify frontend destinations, not service endpoints. Header order: wordmark/home, Collection, Search link to the collection search field, Cart with item count. At narrow widths the header wraps into two rows without an icon-only menu. Footer contains appearance selection and real policy/contact links only after content is supplied.

Start with 16px page gutters, 32px at 768px, a centered 1280px maximum, and 48px section gaps, rising to 64px at 1024px. Collection order: heading and short introduction, search, filters/sort, result count, products. Use one product column below 480px, two from 480px, three from 900px, and four from 1200px; gaps are 24px horizontally and 32px vertically. Long names wrap. Keep logical DOM order; no masonry, visual reordering, or hover-only details.

Search is a labeled search input plus Search button; Enter submits. Proposed filters are Category, Color, and Availability, pending real catalog taxonomy. Native selects and checkboxes update on Apply filters; Reset filters clears them explicitly. Sort options are Featured, Price low to high, Price high to low, and Name, conditional on reliable source fields. Do not invent popularity rankings. URL query parameters represent committed search/filter/sort values; editing controls does not add history entries. Each submitted combination creates one entry. An ordinary result shows image, linked title, variant-independent price information, and availability observation. Variant price ranges must be supplied, not inferred from one variant.

Product pages place media before title, price, variant controls, quantity, Add to cart, material/dimensions/care, and delivery information. At 900px use a 7:5 media/detail split with 32px gap; below it stack. Cart is a full page, not a drawer: line image/name/variant, price observation, quantity editor, Remove, then quote review and checkout action. At 900px lines occupy two-thirds and summary one-third; below, summary follows lines. Avoid sticky actions that obscure content at zoom.

Use real anchors, preserving modified-click navigation and deep links. A new client-rendered page updates its document title and focuses H1 at the top; full loads retain native navigation. Back/Forward restores committed filters, selected product options, scroll, and the originating product link when available, without adding history entries. If the link disappeared, focus the collection heading and explain the changed results. Preserve an edited quantity draft in page memory when returning within the session; it is not a saved cart line. Route failure retains the last usable content and provides Retry and Collection links.

## Product media and content

Collection frames use a consistent 4:5 reserved ratio with `contain`, neutral surface, and intrinsic dimensions. The principal product image preserves the entire object. Detail media uses its natural ratio within available width; thumbnails are native buttons with specific accessible names and pressed/current indication. Selecting one keeps focus on its button and updates a labeled main-image region. No autoplay or carousel gesture is required. Offer an ordinary Open full image link when a rights-cleared larger source exists.

Contextual images may use intentional crops only with a recorded focal point and a separate complete-object image. Every variant-to-image mapping must be catalog evidence; changing color cannot merely tint an unrelated picture. A media record needs product/variant identity, creator, permission, source, intrinsic size, useful alternative, crop policy, and derivatives. Credits appear near the image or in a reachable product credits disclosure. Gallery's Vessel, Seat, and Room generated illustrations are excluded from real product presentation.

During loading retain the frame and text. Failure shows “Image unavailable” and an image-specific Retry button without removing product information. Retry follows actual image events; another image's completion cannot replace current metadata. Unavailable media never becomes a falsely successful load. Before approved assets arrive, use an explicitly labeled empty media frame, never a purported product photograph.

## Inputs, component states, and feedback

Color and Size are labeled fieldsets of native radio choices when applicable; show text names beside swatches. Do not silently preselect a consequential choice. Options known unavailable remain readable with that reason and native disabled semantics; do not infer availability from color. A changed option invalidates dependent selections and price observations, announces what needs reselection, and retains unaffected input.

Quantity initially shows 1 in a labeled integer input with minus/plus buttons and visible accepted range. Proposed local range is 1–99, further restricted by current backend limits; this is a UI limit, not a stock claim. Do not silently clamp, round, or convert empty input to one. Add requires a complete chosen variant, valid quantity, and an available catalog observation under G1. Saving intent never reserves stock. Proposed local line policy: one line per stable variant ID. Add to an existing variant sums the requested amount with its current acknowledged quantity; Update sets that line's absolute quantity. Validate the resulting amount against 1–99 and the current supplied backend limit before writing, with transactional revision checks. A conflicting change requires result review. Existing 98 plus requested 2 is refused: preserve 98 and the typed 2, show the permitted remaining amount beside the quantity control and retain focus on the initiating Add unless correction is requested. Never clamp, replace the existing amount silently or create a duplicate variant line. An existing line does not consume another distinct-line capacity slot. Validate on Add/Update, preserve typed content, and clear an error once corrected. Use custom submission feedback with competing native interactive validation suppressed while retaining native input semantics; the same validator handles button, Enter, and alternate activation. Backend validation remains required.

For multiple input errors, focus a summary linking to the exact field/group; show matching inline messages and programmatic invalid/error associations. A single cart-quantity error stays beside its input and receives focus there. Network failure does not mark a valid field invalid. Zero results preserves controls and shows “No products match these filters” with Reset filters, which returns focus to Search. Empty cart offers Browse collection. Catalog failure distinguishes unavailable data from zero products.

Primary actions have explicit hover, focus, pending, unavailable, and failure states. Pending actions stay focusable with guarded `aria-disabled`, visible reason, and suppressed keyboard/pointer/implicit reactivation. Merely setting ARIA does not enforce the guard. Announce count, added item, and save/quote outcomes once through a concise polite status region; avoid reading the whole cart repeatedly. Errors and unknown outcomes remain inline until resolved. Successful background work keeps focus; explicit View cart navigation focuses Cart H1.

## Cart authority, persistence, and recovery

The browser owns intended variant IDs and quantities; the backend owns catalog facts, stock, prices, quote totals, and purchase outcomes. Cached names/images/prices are observations, never checkout authority. Product option drafts live in page memory; committed browsing state lives in URL/history. There is no account or cross-device cart promise.

Propose IndexedDB for a small validated cart envelope: schema version 1, store generation, revision, stable line identities, variant identity, integer quantity, and acknowledgement time. Keep observations separate. Proposed capacity is 100 distinct variant lines; refuse an additional line visibly while preserving existing items. This needs approval against actual variants and identifier/schema constraints. No personal/payment data belongs in the cart store. No fixed retention period is promised; browser clearing, eviction, profile/device loss can remove it. Do not request persistent-storage permission for this small replaceable cart by default.

Each Add, Update, or Remove captures an immutable candidate and expected generation/revision. Serialize writes within the tab; compare and write inside one overlapping read/write transaction, never separate read then unconditional write. Every cart write path participates. Only transaction completion permits “Cart saved in this browser.” Request success alone does not. Later draft B stays dirty when candidate A completes; an older acknowledgement cannot erase B, navigate away, or mark B saved. Failed writes retain the latest draft with “Cart changes are only in this tab” and Retry save. Reload can lose that draft.

Across tabs, a revision mismatch aborts the candidate and presents current saved lines beside the retained local changes. Review current cart reloads authority; Reapply change constructs a new operation against that base after explicit review. It does not replay a stale full snapshot. Adding to an already changed line requires reviewing its resulting quantity. Recheck transactionally after review; another conflict can recur. Notifications prompt refresh but are not locks.

Startup distinguishes loading, valid existing cart, absent cart, denied/unavailable access, invalid content, and unsupported version. On failure, suppress automatic replacement writes; offer Retry read or a clearly labeled temporary cart. Preserve accessible original records. Unsupported newer schemas remain untouched; request a compatible app version. No migration from earlier versions is claimed. A proposed explicit reset is available only when supported metadata can be validated: its confirmation names discarded cart intent, focuses Keep cart, and commits a new non-reused generation plus empty revision atomically while retaining an appropriate tombstone. Queued/old-tab writes with the retired generation fail. If metadata cannot support that boundary, reset remains unavailable pending repair design. Reset failure preserves prior authority and temporary work.

Remove is explicit and contextual; after acknowledged removal focus the next line heading, previous line, or empty-cart heading. No expiring Undo slot is proposed. Unsaved in-app departure presents Keep editing or Leave without saving; clean departure is immediate. Do not rely on unload interception. No import, export, backup, or indefinite local durability is promised.

## Quote review and hosted checkout

Cart edits invalidate the reviewed quote. Request a new backend quote for an immutable cart revision; keep editing available, but discard obsolete responses from the current display. Quote review lists matching variant/quantity, authoritative unit and line amounts, currency, subtotal, adjustments, and every supplied total component. Show stock/price changes beside affected lines; Review changes records explicit acceptance of that exact quote revision before proceeding. Never silently substitute a variant or reduce quantity. Unavailable lines remain editable/removable and block checkout.

When shipping/tax is undetermined, label it as undetermined and label the available sum “Item subtotal”; do not invent a grand total or say charges are included. Gate G1 must establish which totals are authoritative before handoff and where final costs receive review. A quote is an observation, not a reservation; no countdown or guaranteed stock. Cached/offline information shows its stale status and cannot enable checkout. Quote failure retains cart and prior observation with Retry quote.

“Continue to hosted checkout” sends the exact reviewed snapshot only after the service gates below are fulfilled. Before dispatch, acknowledge a minimal recoverable action identity, snapshot reference/revision, and unresolved state, or use documented authorized service discovery independent of browser storage and the lost response. If neither route exists, block handoff with an explanation. A stored cart or local action entry proves neither delivery nor purchase.

Guard duplicate activation, freeze the submitted snapshot, and record transport attempts separately from stable action identity. A ready checkout URL proves only the contracted handoff scope, never payment. Navigate only to a destination validated by the chosen service contract. After 10 seconds of local waiting, replace the active spinner with delayed/unconfirmed text; elapsed time never proves failure. Do not invent polling or automatic effect retry. Check status, retry eligibility, pacing, and reconciliation become available only under G2.

Unknown outcome copy is persistent: “We could not confirm checkout status. Check the original attempt before starting again.” Show its reference and last observation time when available. Reload/reconnect reconciles that identity before any new overlapping handoff. Cart editing may create a new draft but cannot resolve or cancel the earlier attempt; a fresh key does not make overlapping checkout safe. If status lookup also fails, retain unknown state. Missing status means only what the documented contract establishes. Stop waiting ends local observation only. No remote cancellation, rollback, successful order, or support recovery route is fabricated. Order completion requires a matching authoritative terminal reference; redirects and cleared carts are insufficient. A delayed reply from an earlier transport attempt remains eligible to settle the same action when its submitted payload/quote revision match and the service ordering/freshness rules support it. Do not reject it only because a later attempt exists; do not regress a newer confirmed result. Unorderable contradictions remain visible pending authoritative reconciliation.

Hosted return is a proposed status view on /cart, subject to G2's documented return method and correlation reference. Treat return parameters only as lookup hints, never proof of payment. On an explicit return page load, recover the original acknowledged action, show submitted snapshot and current editable cart separately, update title and focus the outcome/status heading, then reconcile. On browser Back or a restored existing page, recheck on page re-entry/reconnection without starting a new action; keep existing focus/scroll when usable and announce status without a background focus jump. Missing recovery identity leaves an unconfirmed explanation and blocks an overlapping handoff until the documented discovery/reconciliation path settles it. No cart line is cleared solely because of a redirect, URL parameter or return; any later removal of purchased quantities needs an explicit version-aware reconciliation policy that preserves subsequent edits.

## Accessibility, motion, and delivery

Use landmarks, a skip link, continuous headings, persistent visible labels, and ordinary keyboard controls. Filter dialogs are unnecessary in this layout. Any reset/dirty-exit confirmation uses one named modal, visible closing control, contained focus, Escape/Cancel returning to the invoker, and a full-page fallback. Keep destructive confirmation distinct from purchase confirmation. Verify actual dialog cancellation and focus rather than assuming platform semantics provide the entire flow.

At 320px and enlarged text, controls wrap and content reflows without page-level horizontal scrolling; labels and prices remain visible. Use 180ms `cubic-bezier(.2,0,0,1)` transitions only for control color/background/border. OS reduced motion makes them immediate. Focus, layout, media, loading, errors, and navigation are immediate; no entrance fade, hover zoom, parallax, or animated scrolling.

Use native responsive image markup with approved derivatives; prioritize the first visible product image, lazy-load lower media, reserve dimensions, and avoid downloading hidden alternate heroes. Actual formats, source widths, font delivery, and performance budgets depend on supplied assets and stack. No measured performance claim follows.

## Validation and implementation gates

Performed: selective document inspection, theme comparison, and specification desk review. No UI, browser, keyboard, assistive-technology, backend, usability, actual model-token, or billing test was run. Gallery's recorded opaque contrast calculations are source evidence only, not validation of this adaptation.

| Gate | Required owner input before enabling affected behavior |
| --- | --- |
| G1: commerce | Backend/product owners: real catalog and variants, USD money representation, stock semantics, quote identity/revision/freshness, changed-price consent, total/tax/shipping meaning, and final cost-review boundary. |
| G2: checkout | Service/payment owners: selected host and authorized destinations, action/attempt correlation, duplicate scope and retention, payload equality, status lookup and missing/expired meanings, observation ordering/freshness, hosted return method/reference and restored-page re-entry, observation pacing, retry rules, terminal/partial outcomes, independent discovery, recovery retention, and reconciliation path. No contract revision or verification evidence supplied. |
| G3: local data | Engineering/product owners: schema/identifier limits and capacity approval, supported browsers, transactional conflicts/reset generation behavior, storage failure and interruption evidence. |
| G4: content and access | Brand/content owners: approved product media/rights, taxonomy, factual copy, policies, font package/notices; engineering/design: wrapping, Light/Dark/System, real image failures, keyboard/AT, zoom/reflow and reduced-motion checks. |

Future scenarios must cover A-save/B-edit ordering, two-tab conflicts during review, stale writes after reset, denied/full/invalid/newer storage, reload with unsaved changes, variant/image mismatch, stale quote response, changed stock/price, double activation, lost handoff reply, failed action-record update, storage loss during checkout, expired/missing status, authoritative earlier-attempt replies, hosted return/Back without reload, repeated Add beyond resulting quantity limits, and new cart intent while an old outcome remains unknown. These are planned checks, not passed tests.

## Source credits and adaptations

Gallery and the P0 synthesis credit **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**; Gallery revision/research date appears above. Its own publishing terms remain undecided. Retained palette, typography, geometry, media restraint, and 180ms feedback are Atlas proposals. This document adds the storefront and recovery decisions; no preview implementation or generated fixtures are incorporated.

**Shopify** is Gallery's conceptual image-led design reference: [design guidance](https://shopify.dev/docs/storefronts/themes/best-practices/design). The Atlas record inspected Dawn `258f00f64365e2018ca4c62778a6bf55a5d3cd18` (16.0.0) and Horizon `dfad90d87be2408de52636315069fc998da28c9e` (4.3.0). Their Shopify-specific licenses are not plain MIT or general port permission; no code/assets/tokens are copied. **Rasmus Andersson** designed Inter; **The Inter Project Authors** own its package notices. Inspected upstream `353b61b9f4430d5f420d56605a6e7993e0941470` uses SIL OFL 1.1. A selected font package must retain its actual copyright/OFL notice, including differing package years.

Image-delivery concepts reference **Mat Marquis**, with Learn Images reviewers Rachel Andrew, Jake Archibald, Barry Pollard, Aaron Forinton, Eric Portis, Zach Leatherman, and K.Adam White: [Prescriptive syntaxes](https://web.dev/learn/images/prescriptive), updated 2023-02-01; prose CC BY 4.0, samples Apache 2.0. No samples or imagery copied.

P0 references, inspected by Atlas 2026-10-15: [IndexedDB 3.0 WD, 2025-08-13](https://www.w3.org/TR/2025/WD-IndexedDB-3-20250813/), editor **Steve Becker**, W3C Web Applications WG, W3C Software and Document License 2023; [Storage snapshot `23f38d8`](https://storage.spec.whatwg.org/commit-snapshots/23f38d8feaf530b9787822e067a7eb6f953af322/) and [Fetch snapshot `e9460d1`](https://fetch.spec.whatwg.org/commit-snapshots/e9460d1b22ead1c6a72eeac37fb2ec0dc01aeb1d/), writer **Anne van Kesteren**, WHATWG; [HTML](https://html.spec.whatwg.org/), WHATWG/contributors, Living Standard observed 2026-10-14. WHATWG prose is CC BY 4.0; BSD 3-Clause applies separately to code incorporation. IndexedDB is a Working Draft, not a Recommendation. **Sihui Liu**, [WebKit storage policy](https://webkit.org/blog/14403/updates-to-storage-policy/), 2023-08-10, describes version-scoped policy; blog copying terms remain unresolved.

[WCAG 2.2](https://www.w3.org/TR/2024/REC-WCAG22-20241212/), W3C Accessibility Guidelines WG, is normative; WAI forms tutorials (EOWG; editors **Eric Eggert, Shadi Abou-Zahra**) and [APG](https://www.w3.org/WAI/ARIA/apg/about/introduction/) (ARIA APG Task Force; editors **Matt King, JaEun Jemma Ku, James Nurthen, Zoë Bijl, Daniel Montalvo**) are informative. WCAG uses W3C Document License 2023; inspected tutorials/APG use Software and Document License 2023; ARIA 1.2's inspected edition uses 2015 terms. [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), June 2022, editors **Roy T. Fielding, Mark Nottingham, Julian Reschke**, IETF, supplies HTTP semantics under BCP 78/IETF Trust terms, with separate Code Component terms. None establishes this store's service guarantees. External prose/code/assets are not reproduced; references imply no endorsement or blanket reuse permission.

Source-record navigation: [Interface Atlas base snapshot](https://github.com/tamir39/interface-atlas/tree/782159e8e2510933c76989ff9fd9546d282c62cd), [selected theme provenance](../../../themes/gallery/sources.md), and [P0 source ledger](../../../references/p0-research.md). These links provide attribution; implementation rules are embedded above. P0 0.2-draft files were uncommitted inputs identified by exact hashes in this trial's [reading log](read-log.json); the base commit alone does not identify those additions. Source URLs and terms here are inherited records, not fresh external verification by the generator.
