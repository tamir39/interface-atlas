# Nine-theme coverage and project-design trials

Evaluation: **2026-10-15**, against Interface Atlas **782159e8e2510933c76989ff9fd9546d282c62cd**. Prepared for **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. This is a document evaluation of the existing library, followed by reviewed fictional project specifications. No new product interface was built, no usability study was performed, and no skill was implemented.

## Main finding

**The nine themes give every assessed project family a natural visual starting point. Prioritize shared state/flow knowledge before a tenth theme.** Gallery adds image-led composition; Layered adds a calm consumer-application direction. Neither supplies production commerce or durable product state merely by supplying a visual language.

These five families are the earlier agreed comparison: architecture portfolio/publication, compact SaaS/agent operations, image-led homeware storefront, creative community/learning, and restrained bilingual service forms. The consumer practice app is an additional subcase within the SaaS family, assessed separately because a consumer workspace differs from an operations console. This gives **45 original-family pairings plus 9 consumer judgments: 54 total**.

This selection does not cover every frontend product or brand. Pulse's campaign/event identity and Blueprint's technical presentation can be valuable beyond these particular briefs; low fit here is not a reason to remove a theme. Prism remains conditional on an actual unmet whole visual direction.

## Visual coverage

Strong means natural visual fit with identity retained. Adapt needs deliberate tuning. Strained suppresses much of the defining visual language. These are qualitative judgments, not usability, conversion, implementation or accessibility scores. Ratings can change with brand, content and task constraints.

| Theme | Architecture | Agent ops | Storefront | Learning | Service | Consumer |
| --- | --- | --- | --- | --- | --- | --- |
| Blueprint | Adapt | Adapt | Strained | Adapt | Adapt | Strained |
| Botanical | Strong | Strained | Strong | Adapt | Adapt | Strong |
| Editorial | Strong | Adapt | Strong | Adapt | Strong | Strong |
| Gallery | Strong | Strained | Strong | Adapt | Strained | Strained |
| Layered | Adapt | Adapt | Strained | Strong | Strong | Strong |
| Play | Adapt | Strained | Adapt | Strong | Strained | Adapt |
| Precision | Adapt | Strong | Strained | Adapt | Strong | Adapt |
| Pulse | Strained | Strained | Strained | Adapt | Strained | Strained |
| Swiss | Strong | Adapt | Strong | Adapt | Strong | Adapt |

See [the full matrix](matrix.md) for all 54 reasons, exact brief scopes, separate functional evidence and missing guidance. [Machine-readable judgments and source manifest](matrix.json) preserve the assessed inputs. The matrix author's read-only phase is separate from saving these evaluation documents into the repository.

## Two fresh preparation trials

The trial briefs are authored fictional evaluation fixtures, not requirements supplied for a real business. Each generation ran with a separate task context, used the existing preparation workflow and template, compared three candidate READMEs, then loaded one theme's detailed design/sources/motion. Neither read old project examples, the other trial, installed global UI skills, external web pages, effects, assets or Agent Experience. The latter is irrelevant to these no-agent briefs.

| Trial | Theme and alternatives | Output | Result and open gates |
| --- | --- | --- | --- |
| Pocket Practice, personal learning/planning | **Layered**; Botanical and Play compared | [Brief](consumer-app/brief.md), [design.md](consumer-app/design.md), [review record](consumer-app/evaluation.md) | A coherent visual/navigation/task draft. Durable saves, local conflicts, malformed data, backup and dirty-editor rules required new project proposals. Exact schema, capacity and conflict-reapplication policy remain implementation gates; lessons, brand, font package and supported browsers remain inputs. |
| Form & Field, image-led homeware store | **Gallery**; Botanical and Editorial compared | [Brief](storefront/brief.md), [design.md](storefront/design.md), [review record](storefront/evaluation.md) | A coherent collection/PDP/media draft. Variant/cart authority, stale quote handling and checkout uncertainty required new project proposals. Real catalog/media/rights, price/stock/quantity/quote contracts, provider and independent checkout-recovery capability remain gates. No purchase flow is implemented. |

Both outputs embed their selected colors/pairings, type, geometry, responsive order, states, flows, motion and source credits. They preserve Atlas's authorship, external creators, pins, license boundaries and the distinction between inherited proposals and new project choices. Actual selected-font rendering, real assets, browser/assistive-technology behavior and service outcomes remain untested.

The consumer author independently reproduced 14 inherited opaque contrast values. The storefront inherited Gallery's attributed calculations without recalculating them. Neither calculation establishes rendered contrast or complete accessibility.

## What independent review exposed

The first drafts looked comprehensive but still contained omissions or contradictory policies. Root review read both complete outputs, checked them against the frozen C01–C12 rubric, and requested corrections. The original hashes and first-pass findings remain in [evidence.json](evidence.json) and each review record; the current design files contain the reviewed revision. First-pass line numbers in the historical tables refer to the earlier draft; heading names identify the current sections.

| Trial | First-pass issue | Reviewed disposition |
| --- | --- | --- |
| Consumer | Bookmark pending/failure could lose control focus or move it to background Retry | Pending activation stays focusable and guarded; failed save retains focus with inline Retry. |
| Consumer | Dirty Cancel/Escape did not define confirmation modality/focus | One named dialog switches to a confirmation view, retains draft, defines Keep editing/Escape/Discard and focus return. |
| Consumer | Completion dates could include future planned work | Require valid civil dates no later than local today; plans and recorded completion remain separate. |
| Consumer | Fixed-pixel type prescription could ignore user text preferences | Specify rem sizes and unitless line heights at a 16px reference. |
| Consumer | Recovery import/export limits did not match permitted long-term creation | Remove the inconsistent ad hoc caps. Gate mutations/recovery on one agreed schema/capacity envelope in which every valid created state can be exported and reimported; no silent history eviction. Exact policy is still open. |
| Storefront | Starting an empty cart after malformed storage could overwrite unreadable intent on the next edit | Quarantine the original bytes, use an explicitly temporary draft, and require informed reset before replacement. |
| Storefront | Remove/Undo lifetime, repeated removal and same-variant re-add were ambiguous | Define one latest-removal slot, explicit mutation/navigation/reload/handoff boundaries, re-add semantics and focus. No stock/price restoration claim. |
| Storefront | Checkout recovery assumed a durable reference without resolving unavailable cart storage or lost creation response | Require an independently recoverable attempt/status contract before session creation; otherwise block creation. A session-only cart is not proof of safe checkout recovery. |
| Both | Some source names/pins lacked direct original links | Add direct pinned Atlas/source links and relevant standards references; no new external research or additional repository content reads during correction. |

These are **document defects and unresolved decisions**, not observed runtime failures. Corrections make the draft safer to review; they do not implement or validate the proposed behavior. Reusable knowledge can help authors expose and resolve such decisions, while project owners and actual services must still supply their own facts.

## Review outcome against the frozen rubric

Covered below means a rule is specified in the reviewed document, not working behavior. Open contracts remain visible instead of being scored as successful implementations.

| Criterion | Consumer | Storefront |
| --- | --- | --- |
| C01 Brief fidelity | Covered; fictional requirements distinguished from proposals | Covered; absent backend/provider facts preserved |
| C02 Theme selection | Covered; Layered retains its application identity | Covered; Gallery's visual fit separated from conditional commerce capability |
| C03 Self-contained visual rules | Covered; exact values and pairings | Covered; exact values, media policy and pairings |
| C04 State ownership | Partial/open: model proposed; exact schema/conflict policy gated | Open contract: local intent versus authoritative commercial facts specified; actual service contracts absent |
| C05 Recovery | Partial/open: focus/discard corrected; consistent capacity policy still gated | Open contract: quarantine/Undo specified; transaction recovery depends on real capabilities |
| C06 Key task paths | Covered as proposals; no end-to-end execution | Proposed through handoff; authoritative checkout completion remains gated |
| C07 Responsive/keyboard | Covered as rules; rendering/input testing pending | Covered as rules; rendering/hosted testing pending |
| C08 Appearance/motion | Covered; arithmetic only, not rendered proof | Covered; inherited numerical record only |
| C09 Content/assets | Open: real lessons, language metadata and exact fonts | Open: real catalog, imagery/rights, derivative pipeline and fonts |
| C10 Provenance | Covered after direct-link correction; actual future package notices still required | Covered after direct-link correction; actual future package/asset notices still required |
| C11 Validation honesty | Covered; no UI/storage/AT result claimed | Covered; no UI/commerce/AT result claimed |
| C12 Selective loading | Ten files verified; first two metadata entries logged after their initial load, disclosed | Ten reads recorded with timestamps before content output |

There is one generation and one correction pass per brief. The trial authors' evidence maps are supplemented by root review; this is not a blind user study or statistically repeated benchmark. Concrete service/schema/asset choices remain open by design where the brief did not supply them.

## Reading scope and cost limits

| Source footprint for initial generation | Files | Exact UTF-8 bytes |
| --- | --- | --- |
| [Consumer read log](consumer-app/read-log.json) | 10 | 67,137 |
| [Storefront read log](storefront/read-log.json) | 10 | 67,072 |
| Hypothetical all-theme core loading | 49 | 352,263 |

Each actual footprint is four common files (instructions, workflow, catalog, template), three candidate READMEs and the chosen design/sources/motion. The avoided-loading baseline is explicitly four common files plus README/design/sources/motion/effects for every theme; it excludes shared chapters, previews, validation, examples and assets. It was inventoried as a comparison, not executed as another generation.

These counts describe **source scope, not model token usage, billing, latency or total assessment effort**. The broad coverage auditor necessarily read more material; root review, context, drafting and corrections are outside the per-generation footprint. Consumer's first two entries were recorded immediately after initial reading; subsequent reads were logged before output. Both correction passes reported zero additional repository content reads. Raw-byte hashes preserve exact inspected files; line-ending differences can affect byte counts across environments.

The selective workflow is useful: one chosen package supplied concrete visual rules without loading all themes. Remaining product-specific decisions should become self-contained project rules, with optional researched chapters loaded only when the brief needs them. These two examples do not prove a measured cost reduction or guarantee selection quality for every brief.

## Existing preview evidence and remaining gaps

The existing nine packages remain **draft**. Their retained reports each contain 20 layout combinations. Root rehashed all **30** recorded native/media inputs and the **five** validators for which a validator hash was recorded; all matched. Missing legacy hash/status fields were not treated as failures. This is an integrity check of historical preview evidence, **not a new 180-layout run** and not validation of either trial project.

The gaps fall into three distinct kinds:

1. **Missing reusable decision support:** durable versus temporary state, read failure versus empty data, conflict/retry/undo boundaries, multi-step drafts/review, authority and uncertain outcomes, commerce reconciliation, operational contracts and content/media intake. Useful fragments exist in themes/examples; the shared knowledge layer currently exposes only Agent Experience.
2. **Missing project inputs:** real catalog/lessons, service/provider behavior, business rules, exact schema/capacity, content languages, asset rights and exact licensed fonts. Atlas can prompt these decisions but cannot invent them.
3. **Missing behavioral evidence:** actual durable storage, race/retry/failure handling, assistive technology, supported browsers/devices, intended fonts/media, and production service outcomes. Document review and existing specimen checks do not close these gaps.

The existing preparation skill and template already ask for relevant state, recovery, media and language decisions. The next work should supply researched optional decision material, then improve routing and review, rather than adding universal product features or many theme-specific skills.

## Prioritized next work

The [consolidated roadmap](skills-roadmap.md) is the proposed implementation order:

1. **P0:** state ownership/durable recovery, then forms/navigation and uncertain outcomes.
2. **P1:** commerce contracts; extend existing Agent Experience for the user's operations focus; extract production media/font/localization and accessible responsive decisions.
3. **P2:** enrollment/community/scheduling modules when a new brief establishes the need.

After researched chapters exist and are reviewed, refine the existing preparation workflow's conditional routing and consider one opt-in `review-frontend-design` skill. A separate specialist flow skill needs recurring evidence before it is justified. Re-run both trials plus a fresh service/operations brief before claiming improvements.

**No SKILL.md, shared knowledge chapter, template, theme, catalog entry, preview, tool or deployment workflow was changed by this assessment.** Only evaluation/example documentation and its discovery links were added. New primary-source research and skill implementation remain subsequent work.

## Sources and artifacts

The assessment uses the pinned Atlas repository and its existing [source registry](../../references/SOURCES.md). Theme authors, retained values, external concept authors, software/font licenses and unverified reuse terms remain in the individual source records. The two generated projects embed relevant credits from [Layered](../../themes/layered/sources.md) and [Gallery](../../themes/gallery/sources.md); no outside source was freshly verified during this evaluation.

Use [protocol.md](protocol.md) for the frozen method and C01–C12 expectations, [matrix.json](matrix.json) for detailed judgments and the auditor's full/partial-read manifest, and [evidence.json](evidence.json) for computed counts, input integrity, initial/final artifact hashes and limitations. The [earlier journal evaluation](../workflow-evaluation/README.md) remains a separate historical trial.
