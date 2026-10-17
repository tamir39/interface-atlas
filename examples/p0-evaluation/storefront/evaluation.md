# Storefront trial evaluation

## Decision and evidence boundary

Gallery 0.1.0-draft was selected for Form & Field after three candidate README comparisons: Gallery, Botanical, and Editorial. The design retains Gallery's image-led composition, neutral Light/Dark palette, Inter roles, flat geometry, complete-object media policy, and restrained feedback. It specifies guest commerce as project proposals with blocked service contracts. Theme fit is an author judgment; no usability, conversion, performance, accessibility-conformance, or transaction result was measured.

This is a document-generation trial using the unchanged `prepare-frontend-design` workflow and template at the supplied Interface Atlas baseline `782159e8e2510933c76989ff9fd9546d282c62cd`, plus supplied revised P0 knowledge. The explicit `knowledge/README.md` route led to all three relevant revision 0.2-draft chapters: state/recovery, forms/navigation, and uncertain outcomes. Those chapters were treated as researched draft synthesis, not implementation or external service contracts.

## Requirements to exact design headings

| Brief requirement | Exact heading in design.md | Resolved decision and remaining evidence |
| --- | --- | --- |
| Calm, design-led, image-led store of about 50 products | `Project requirements and decision status`; `Pages, responsive behavior, and navigation` | Gallery selected; stable image/title/action scan order, sparse flat chrome, responsive collection. Fit is proposed; no shopper study. |
| English interface and USD | `Project requirements and decision status`; `Typography, spacing, and geometry` | English, USD with two decimal places and tabular price numerals. Backend money representation remains G1. |
| Browse, search, filter, and sort | `Pages, responsive behavior, and navigation`; `Inputs, component states, and feedback` | Native search/filters with explicit Apply, URL-backed committed state, truthful empty/failure views. Taxonomy and sort fields depend on real catalog under G1/G4. |
| Accurate product images | `Product media and content` | Complete-object `contain`, image-specific retry, variant mappings and rights records, contextual crops only with uncropped inspection. No catalog/asset evidence supplied; G4 blocks real product presentation. |
| Choose available color/size and quantity | `Inputs, component states, and feedback` | Native labeled radio groups, unavailable reason, no silent consequential preselection, quantity initially 1, proposed range 1–99, common custom submission feedback owner. Availability semantics and backend bounds remain G1. |
| Add, update quantities, remove lines | `Cart authority, persistence, and recovery`; `Inputs, component states, and feedback` | Immutable operation candidates, explicit Update/Remove, candidate-bound acknowledgement, retained later edits, defined removal focus; no unrequested expiring Undo. Transactional behavior is proposed and untested, G3. |
| Cart draft survives same-browser reload when storage works | `Cart authority, persistence, and recovery` | IndexedDB proposal; transaction completion acknowledges a cart; same-browser loss limits stated. Browser/schema/capacity approval and interruption tests remain G3. |
| Storage may fail and concurrent edits may occur | `Cart authority, persistence, and recovery` | Read-state distinctions, guarded temporary mode, original-record preservation, transactional generation/revision checks, explicit conflict review and recheck; unknown schemas untouched. Every write path must enforce these rules; no storage experiment was run. |
| Review authoritative prices, stock, and totals | `Quote review and hosted checkout` | Backend-owned immutable-revision quote; stale responses discarded; stock/price changes reviewed; unknown shipping/tax not turned into a grand total. Exact quote/freshness/final-cost semantics remain G1. |
| Hosted checkout and unknown-outcome recovery | `Quote review and hosted checkout`; `Validation and implementation gates` | Stable action separate from transport attempts and cart draft; pre-dispatch recovery boundary or independent service discovery; no repeat overlapping handoff while unresolved. G2 is wholly unverified; no provider/endpoints/status contract invented. |
| Connection failures and changed intent | `Quote review and hosted checkout`; `Inputs, component states, and feedback` | Persistent unknown copy/reference, 10-second local waiting proposal without declaring failure, no automatic effect retry, later cart edits do not settle earlier attempt. Safe lookup/pacing/retry/retention remain G2. |
| Light, Dark, and System | `Color contract` | Exact paired tokens, System default/live OS response, explicit override and nonfatal preference save failure, unchanged image colors. Actual first paint and preference behavior need implementation checks. |
| Phone-first and desktop usability | `Typography, spacing, and geometry`; `Pages, responsive behavior, and navigation`; `Accessibility, motion, and delivery` | Exact gutters, maximum, column thresholds, product/cart stacking, 44px targets, wrapping and 320px reflow intent. No rendered layout/zoom evidence. |
| Keyboard, errors, navigation, reduced motion | `Inputs, component states, and feedback`; `Pages, responsive behavior, and navigation`; `Accessibility, motion, and delivery` | Native controls, summary/inline focus ownership, pending action guard, Back/Forward restoration, immediate focus, reduced-motion override, bounded 180ms color feedback. Browser/AT tests remain G4. |
| Do not invent products, reservations, completed orders, or legal guarantees | `Project requirements and decision status`; `Product media and content`; `Quote review and hosted checkout`; `Source credits and adaptations` | Explicit fictional-project and contract limits, generated fixture exclusion, no stock countdown, no checkout-success inference from redirect or local cart. Actual content/rights/service evidence remains absent. |

## Atlas guidance, project proposals, and gates

Retained Atlas proposals include Gallery colors, type roles, geometry, flat media presentation, 44px comfortable targets, focus outline, complete-object/crop distinction, and optional 180ms control feedback. The Gallery research record is an Atlas synthesis identifier, not an upstream release. The document does not describe its palette as extracted Shopify values.

Form & Field proposals include the three frontend routes, 4:5 collection frame, column breakpoints, full-page cart, explicit filter application, custom input-feedback ownership, IndexedDB envelope, 100-line capacity, transactional conflict/replacement policy, absence of Undo, and 10-second local waiting threshold. These decisions are concrete enough to review and implement but lack behavioral evidence. They require the owner approvals identified in G1–G4 where relevant; no new approval flow was imposed on this documentation trial.

The P0 chapters informed ownership/acknowledgement separation, later-draft retention, quarantine after read failure, generation/revision checks for stale writers, and independently recoverable checkout identity. They did not establish a working database, guaranteed retention, race-free implementation, service idempotency, order lookup, cancellation, payment completion, or provider integration.

G1 blocks a truthful production quote and final-cost boundary until commerce inputs exist. G2 blocks production checkout and advertised reload-safe outcome recovery until the full service contract and evidence exist. G3 requires local schema/capacity/browser and transactional implementation evidence. G4 requires approved media, factual copy, font package/notices, and rendered/accessibility checks. The document exposes these limitations alongside the intended next action instead of filling them with fictional capabilities.

## Read scope and accounting

`read-log.json` records 21 helper returns: the immutable brief plus 20 repository content reads across 16 unique repository paths. Returned repository content totals 165,891 UTF-8 bytes; including the brief it totals 168,319 bytes. These are returned-byte accounting, not actual model-token, context-occupancy, billing, or timing measurements. The log records each excerpt's hash/bytes and the source file's separate identity.

Reading followed brief → repository guidance/workflow → explicit knowledge route → catalog → three candidate READMEs → one selected detailed theme package (Gallery design/sources/motion/effects) → unchanged template → three P0 chapters → bounded source ledger. No alternative detailed theme package, preview source, asset binary, global installed skill, outside web page, prior example/trial design, old evaluation, or implementation adapter was read. Chapter links into prior examples were not followed.

The source ledger was read as a table of contents, then only selected cards: P0-STATE-01/02/03/06, UO-HTTP/UO-FETCH, and F01/F02/F04/F06/F08/F10/F12/F13/F20/F25. The full 59,847-byte ledger was not displayed. One selector defect returned only six `#` lines (11 bytes); this failed excerpt is retained in the log and supplied no provenance metadata. The repaired helper subsequently returned the requested bounded cards. Gallery sources were reread once because the initial combined tool display truncated part of that source output; both returns are logged.

There is one audit limitation: the three candidate README calls initially ran concurrently and raced on the helper's JSON write. All returned original order 6; two records were overwritten and the file was malformed. Their exact successful returned metadata was reconstructed, with original order 6 retained. The recovery note explicitly marks first-read order within that concurrent group unavailable; Gallery → Botanical → Editorial is recorded only as display order. Subsequent helper reads were sequential. This reconstruction is disclosed rather than presented as a perfect contemporaneous ordering record.

## Provenance and limitations

`Source credits and adaptations` retains Gallery/P0 authorship, source revisions, Inter designer and OFL boundaries, Shopify's restrictive license scope, image-guidance authors, W3C/WHATWG/IETF source roles and reuse distinctions, and WebKit blog-copying uncertainty. No source authors are represented as endorsing this storefront. Platform facts, informative guidance, Atlas proposals, project proposals, and unknown external contracts stay separate.

The read log's SHA-256 values identify supplied content; they do not prove source claims correct or validate a future storefront. No external URL was fetched. No UI/browser/assistive-technology/backend execution or runtime benchmark occurred. Future scenario coverage appears explicitly under `Validation and implementation gates`, without pass labels.

## Artifact integrity

The brief remains byte-identical with SHA-256 `d6a9d535afdc44beab372a9ee1a079b08e143fe2a2ec8152f36e1a24e628bffb`. `first-draft.md` is the delivery-time immutable copy of `design.md`; both are identical. Generated outputs use UTF-8 without BOM, LF line endings, and one final newline. Only the permitted storefront output files were written; no repository implementation or content was changed by this trial agent.

## Independent review and one correction pass

The author mapping above describes the immutable first draft; it is not retroactively upgraded. Root read all first drafts and an independent reviewer checked this brief/document against the frozen protocol. The first-draft.md bytes remain unchanged. Current design.md includes the following narrow corrections, plus direct Atlas/theme/ledger source-record links and an explicit uncommitted-P0 input boundary. No new generation inputs were loaded by the author after freezing; these are root review edits.

| Finding | First-pass gap | Corrected rule |
| --- | --- | --- |
| SF01 (P2) | Repeated Add to existing variant has no merge/range semantics. | One line per stable variant; add requested amount to current acknowledged quantity with candidate revision checks; reject excessive result without clamp. |
| SF02 (P2) | Earlier-attempt matching reply and observation ordering are implicit. | Accept authoritative same-action/payload/quote evidence under service ordering; prevent regression; add ordering to G2. |
| SF03 (P2) | Hosted return and browser re-entry have no concrete reconciliation/landing flow. | G2 defines return reference/method; recover original action, reconcile on return or restored page, preserve current cart and gate overlaps; define contextual focus. |

First-pass scores and targeted-trace outcomes are recorded in the [combined results](../README.md). Source/schema/browser/service/font/translation gates remain open where applicable. No behavioral test result follows from these corrections. Reading records retain reconstructed concurrent groups and failed excerpts; exact first-read ordering is unavailable for those groups.
