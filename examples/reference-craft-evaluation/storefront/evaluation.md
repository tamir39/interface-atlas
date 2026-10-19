# Form & Field preparation evaluation

Prepared 2026-10-20. This is a requirement-to-heading map and evidence boundary, not the separate review workflow or a product validation report.

## Requirement map

| Supplied requirement | Exact design.md heading |
| --- | --- |
| Calm, design-led, image-led homeware store; roughly 50 products; English/USD; guest-only scope | Requirements and evidence; Direction and task structure; Type, spacing, and geometry |
| Select from catalog; compare 2–3 candidates; self-contained visual decisions | Direction and task structure; Color contract; Type, spacing, and geometry |
| Browse, search, filter, retain collection context | Pages and responsive behavior |
| Accurate product images, meaningful media states, no generated fixtures presented as photography | Pages and responsive behavior; Media, accessibility, appearance, and motion |
| Choose available color/size and quantity | Product controls and feedback |
| Add, merge, edit quantity, remove lines, empty cart | Product controls and feedback; Pages and responsive behavior; Cart ownership and durable recovery |
| Cart draft survives same-browser reload when storage works | Cart ownership and durable recovery |
| Connection/storage failures and concurrent local changes | Cart ownership and durable recovery; Authoritative quote and cart review; Hosted checkout handoff and unknown outcomes |
| Backend owns prices, stock, quote totals, checkout; changed commercial facts | Authoritative quote and cart review; Hosted checkout handoff and unknown outcomes |
| Hosted checkout; truthful ambiguous-outcome/re-entry behavior | Hosted checkout handoff and unknown outcomes |
| Light/Dark/System, phone-first/desktop, keyboard, reduced motion | Color contract; Pages and responsive behavior; Media, accessibility, appearance, and motion |
| No supplied API/provider/tax/catalog/assets/fonts/stack; avoid invented guarantees | Requirements and evidence; Delivery gates and validation; Source credits and adaptations |
| Provenance, reuse limits, performed versus future checks | Delivery gates and validation; Source credits and adaptations |

## Selected reading

All Atlas/project input content was obtained sequentially through the supplied `read.mjs` helper under case `storefront-gen`. The task wrapper itself was read directly as instructed. Whole guides used output budgets of at least 10,000 tokens; no returned output showed truncation.

Read in order: AGENTS.md; prepare-frontend-design/SKILL.md; supplied storefront brief; catalog; Gallery, Botanical and Editorial READMEs; selected Gallery design/sources/motion; knowledge index; project template. No effects file was needed because no optional decorative effect was chosen.

Focused chapter reading followed heading discovery:

- UI/UX: Frame the problem and evidence; Tasks, content, and information structure; Journeys across screens and time; Hierarchy, type, color, density, and words; Method credits.
- State/recovery: Ownership and lifetime; Acknowledgement is not retention; Save snapshots and completion; Concurrent edits; Read failure, migration and reset; Sources and provenance.
- Forms/navigation: Inputs and validation timing; Validation and error recovery; Pending actions and available controls; Navigation, focus, and scroll; Bounded review scenarios and remaining evidence.
- Uncertain outcomes: Outcome states and copy; Service-contract worksheet; Dispatch and changed intent; Safe retry and recovery; Provenance and reuse.
- Accessibility/responsive: Controls, meaning, and focus; Adaptation with real content; Perception, status, and optional media; Method credits.
- Adaptation notices: heading list; 2026-10-20 reference and craft additions; Selected sources and changes; Scope of terms and retained notices. The additions section was consulted while locating credits; unused source families were not adopted or opened upstream.

Metadata-only identities were obtained for the skill, selected Gallery design/sources, state guide, uncertainty guide and brief. No content was reread solely to hash it. Source URLs are inherited provenance, not new external verification. Selected guides embed historical-trial references in their prose; no linked old design, trial result, lesson history, research ledger, review draft, protocol, manifest, other case output, live website, binary, or installed skill was opened. The reader manages the case log; this wrapper permits only the three named output documents, so no separate read-log.json was authored here.

## Inherited rules and project proposals

Inherited from Gallery: exact neutral Light/Dark palette, on-action pairs, flat 0/4px geometry, Inter role, spacing scale, image accuracy/crop distinction, unaltered image colors, 44px comfortable targets, focus proposal, System default, and optional 180ms control feedback. Gallery's contrast figures are attributed prior calculations, not new measurements. All are Atlas proposals rather than extracted Shopify values.

New project proposals: collection/search/filter semantics and breakpoints; product and cart information order; variant/quantity validation; IndexedDB cart authority and atomic revision checks; quarantined unreadable data; reviewed other-tab replacement; revision-bound quotes and explicit price-change acceptance; acknowledged checkout recovery identity, blocked overlapping actions, 12-second local wait feedback, and contract-dependent reconciliation. The chosen storage mechanism is a bounded browser capability proposal, not an imposed framework or backend. No source proposal establishes production correctness.

## Unresolved inputs and gates

Studio/catalog owner: real items and option taxonomy, search fields, dimensions/care facts, accurate variant media, rights/creator records, approved brand/copy and charge disclosures. Frontend owner: exact font package/notices, supported browsers, storage implementation and future migration. Commerce/integration owners: authoritative catalog freshness and quantity limits, quote line/charge/tax/expiry semantics, hosted provider/URL/return rules, guest authorization, duplicate-protection scope/retention, status lookup/finality, missing records, retry/cancellation and reconciliation route. These are implementation/launch gates; no endpoint, stock reservation, legal assurance, order success, or support channel is invented.

## Performed and future checks

Performed: selective source inspection, three-candidate fit comparison, document requirement/state reconciliation, source metadata hashing, output word count, and SHA-256 identity check. Delivered first-draft.md and design.md are byte-identical: 24,615 bytes each, 3,220 whitespace-delimited words, SHA-256 `2d90ff619702a524db146de4148579f543f9cb74350fc1aa826ab8a53cf26ff2`. Their identical first delivery is intentional; no separate review-and-revision pass was run.

Future: rendered/color/font/media checks, real data and responsive performance, keyboard/screen-reader/zoom/mobile interaction, storage/migration/conflict testing, stale-completion races, authoritative price/stock change tests, and checkout loss/re-entry/duplicate/finality scenarios against actual contracts. No UI, usability, assistive-technology, service, actual model-token or billing measurement is claimed.