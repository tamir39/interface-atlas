# Form & Field — explicit design-document review

Reviewed 2026-10-17 using the frozen supplied brief and first draft. This review assesses proposed decisions and contract gates; no shopping interface or service was observed.

## Findings

No actionable document finding was established within the supplied scope. The Gallery choice remains coherent with accurate product inspection and clear purchase controls. The draft distinguishes a locally retained cart from authoritative commerce and gates hosted checkout until the required contracts exist.

The material checks supporting this result were:

- **Browse/search/filter and inspection:** `Pages, responsive layout and navigation` preserves query/history context, separates no results from a load failure and prevents older results replacing newer queries. `Product content and accurate media` uses complete-object inspection, identifies a pictured variant when it differs, scopes image recovery and requires rights-cleared real product media. Gallery's illustration fixtures are explicitly excluded from real product photographs.
- **Variant and cart correction:** `Variant selection and cart editing` keeps option names and unavailable reasons, avoids silently choosing a different tuple, preserves editable invalid quantity text and distinguishes in-memory add acknowledgement from browser saving. It defines removal focus and useful empty-cart recovery. Every cart mutation invalidates its quote.
- **Same-browser persistence:** `State ownership and same-browser recovery` binds immutable candidates to revisions within an IndexedDB transaction, prevents save A from acknowledging later draft B, preserves changes on failure and rechecks reviewed operations. It differentiates absent, inaccessible, malformed and newer-schema records; freezes writes to unreadable authority; and requires reviewed replacement rather than overwriting it with a temporary cart.
- **Authoritative review and remote uncertainty:** `Authoritative review and checkout handoff` binds a quote to immutable cart intent, rejects late mismatched quotes and makes changed stock/prices visible before continuation. Checkout requires acknowledged recovery identity or independent authorized discovery before dispatch, keeps unresolved outcomes separate from editable cart intent, and blocks overlapping dispatch. Timeout and hosted-return parameters are not proof of failure or purchase. Unsupported status and retry routes are not invented.
- **Interaction and presentation:** the responsive, typography and accessibility sections specify native controls, associated errors, focus/navigation rules, wrapping/reflow, Light/Dark/System, unchanged product-image colors and reduced motion. Their proposed keyboard and appearance behavior still requires implementation checks.

The principal counterevidence against treating the missing backend as a defect is `External contract gates and owners`: every material commercial input is unresolved, and checkout stays disabled until those contracts are supplied and verified. The brief expressly requests proposed boundaries in the absence of APIs, payment provider, taxes, catalog and media. Likewise, image/font delivery is gated rather than asserted. No theme replacement or implementation change is recommended by this review.

## Open inputs and required evidence

- **Merchandising/brand:** catalog facts, stable variants, real inspection media and rights records, purchase bounds, taxonomy and the exact font package.
- **Backend/business owners:** authoritative price/stock reads, USD representation and rounding, taxes/shipping/discount treatment, quote freshness and acceptance, checkout effect boundary, destination validation, duplicate-protection equality/retention/concurrency, lookup consistency/expiry, safe retry and genuine reconciliation routes. These need service evidence before enabling the respective capability.
- **Frontend/storage owner:** supported browsers, transaction/capacity/reset/version contracts and recovery-identity retention, plus tests for failed saving, overlapping edits, reload, conflicts and stale writers. A blocked-upgrade/migration policy is already an explicit verification input, not an implemented feature.

## Coverage and limits

Product evidence read: `examples/skill-evaluation/storefront/brief.md` and `first-draft.md`, in full. Paths inspected in the document were collection/search/filter, product/variant/media, add/update/remove, empty/error cart, local persistence/recovery, quote changes and invalidation, hosted handoff, lost reply/reload/status/overlapping intent, and all appearance/motion contracts. Narrow and wide layout, keyboard, zoom, image failure and long-content contexts were checked as proposed requirements only.

Governing material read through the supplied logging helper: `AGENTS.md`, the actual review skill, the knowledge index, and targeted accessibility/responsive, state/recovery, forms/navigation and uncertain-outcome sections. Applicable context was reused within this grouped review. No catalog reload or detailed theme audit was needed to establish a concrete contradiction. Inherited theme arithmetic, source credits and license assertions were not independently revalidated.

No UI/source, browser rendering, keyboard execution, assistive technology, storage implementation, real catalog, service, hosted checkout, payment or user-study evidence was supplied or exercised. Proposed contracts and future tests are not successful execution, measured contrast, conversion evidence or conformance. This review gives no numerical or runtime quality verdict. `trial-read.mjs` owns the adjacent `read-events.jsonl`; no design or source was changed.
