# Research and skills roadmap after nine themes

Status: proposal for review, 2026-10-15. Evidence: [coverage matrix](matrix.md), [consumer trial](consumer-app/evaluation.md), [storefront trial](storefront/evaluation.md), and [evaluation method](protocol.md). No skill or shared knowledge chapter is implemented by this roadmap.

## Decision

Keep the current nine visual directions. All five assessed project families and the additional consumer-app case have a natural visual starting point. Defer Prism until a real brief demonstrates an unmet whole visual language. This assessment does not establish coverage of every possible frontend product or brand.

Invest first in reusable product decisions and evidence. Both trials obtained a coherent visual specification from one selected package, while persistence, conflicts, commerce authority, recovery and several focus decisions came from new agent proposals. Review found concrete defects in those proposals. Another palette or material direction would not resolve them.

Keep explanations and researched patterns in `knowledge/`. Keep skills short: identify the task, select relevant chapters, produce or review a project contract, preserve sources, and stop. Theme selection remains catalog → candidate READMEs → one chosen package. Normal implementation continues from the project's own documents.

## Prioritized research modules

These are proposed future chapter names and scopes, not files created in this pass. Priorities combine repeated need across the five families, the two trial findings, and the user's emphasis on Agent Experience. The matrix's observational ordering is input rather than a separate implementation schedule.

| Priority | Proposed knowledge | Why it comes here | Required evidence before publication |
| --- | --- | --- | --- |
| P0 | **State ownership and durable recovery** | Both trials invented persistence/conflict policy. Consumer backup limits were asymmetric; malformed storefront storage could be overwritten. Also applies to journal saves and service drafts. | Distinguish draft, pending write, confirmed local state, authoritative server state and unknown outcome. Research unavailable/quota/corrupt storage, revision conflicts, schema/migration, safe reset, retry scope and symmetric backup limits. Demonstrate that a failed save never reports success and unreadable data is not treated as empty. |
| P0 | **Forms, navigation and outcome recovery** | Dirty-editor focus and pending-control behavior needed correction. Service forms additionally lack multi-step save/resume and review/edit rules; checkout and enrollment reuse submission concepts. | Define error association, focus entry/return, dirty-discard scope, step/branch navigation, review invalidation, duplicate activation, session expiry, and accepted-request versus confirmed-result semantics. Use bounded browser fixtures and a new service brief. |
| P1 | **Commerce contracts and reconciliation** | Gallery solves the visual/media direction; no reusable Atlas cart/quote/checkout contract existed. The storefront remains gated on real backend capabilities. | Research stable variant identity, quantity constraints, availability versus reservation, money/total scope, cart versus quote revisions, price/stock change review, stale responses, checkout attempt recovery and authoritative return status. Use actual provider documentation only after a provider/contract is selected; record creator, version, terms and exact scope. Never prescribe fictional endpoints or payment guarantees. |
| P1 | **Agent control contracts**, extending existing Agent Experience | An explicit user priority, supported by the agent-workspace family. Existing principles and Precision's local examples are a useful base, while production authority and event semantics remain project-specific. The consumer/storefront trials correctly did not load this branch. | Extend the existing page rather than duplicate it. Research proposal identity/version, permission and action scope, attention versus execution versus connection, pending/acknowledged/unknown control outcomes, intervention, safe retry and audit evidence. Exercise changed approval proposals and lost cancellation acknowledgements in a fresh operations brief. |
| P1 | **Production media, font and localization intake** | All selected fonts still need package-specific checks; both new trials lack real content/assets. Architecture/service require bilingual behavior. Gallery has image guidance but its retained illustrative PNGs are not an optimized production pipeline. | Reuse existing crop/alt/credit concepts and add intake fields for creator/rights, dimensions, variant mapping, focal points, derivatives, actual delivery measurement, font package/notices/scripts, translation availability and long labels. Validate real supplied assets and fonts before making performance or language-coverage claims. |
| P1 | **Accessible component and responsive decision reference** | Good rules exist across themes but are scattered. Consumer pending-focus correction shows that native controls alone do not settle all behavior. | Extract shared label, focus, notification, overflow, zoom, control-state and content-order decisions with source credits. Keep visual tokens in themes. Test new patterns in both appearances, with keyboard and assistive technology; do not infer complete conformance from contrast arithmetic. |
| P2 | **Enrollment, scheduling and learning/community records** | The matrix identifies capacity, waitlists, durable progress, participant access and moderation gaps. Neither new trial evaluates a complete community product. | Start from a new community brief, not a generic social-platform checklist. Separate lesson completion, enrollment, availability, local schedule intent, time zones, permissions and report/moderation outcomes. Add only feature-specific modules justified by that brief. |

Unknown catalog, assets, service behavior, font files and business policies remain project inputs. A knowledge chapter should expose and route those questions; it cannot supply facts about an unchosen service.

## Skills sequence

### 1. Improve the existing preparation workflow after the first modules exist

Keep `prepare-frontend-design` as the entry point. Do not introduce another theme-picker or a skill per theme. Proposed refinement: a small feature-to-chapter route for local durable data, multi-step forms, commerce, agent controls, bilingual content and media. Load only matching material, then embed the selected decisions into the generated project `design.md`.

Acceptance: rerun these two fictional briefs and a fresh service or operations brief. The output must distinguish inherited rules, new proposals, unresolved contracts and performed evidence; preserve source credits; avoid unrelated backend/agent features; and resolve the review defects recorded in this assessment. Log source paths/bytes and unresolved decisions. Bytes are a read-scope proxy, not measured tokens or billing.

### 2. Add one opt-in frontend design review skill

Proposed name: `review-frontend-design`. Input: a project brief, project `design.md`, and relevant service/asset evidence. Output: requirement trace, missing or contradictory state/flow rules, unproven capability claims, provenance issues, and prioritized corrections. This is a review of an artifact before implementation, not a mandatory step for every frontend edit.

Load the project document first. Open the relevant Atlas chapter/source only for a concrete gap or verification need. Reuse the frozen C01–C12 criteria as an initial rubric, then test it on unseen briefs. It must catch the consumer backup-limit inconsistency and the storefront malformed-data/unknown-checkout recovery risks without accepting a fluent document as working software.

### 3. Consider a specialist flow skill only after repeated use justifies it

A separate `specify-product-flows` or agent-interface preparation skill may help complex branching or operational projects. First check whether the existing preparation skill plus conditional chapters already handles them at reasonable reading scope. Split only when the specialist has a distinct input/output contract, recurring failure modes, and evidence that separation reduces omissions or repeated reading.

Commerce, media, colors, typography, motion, accessibility and localization do not each need a new skill solely because they have a knowledge chapter. Their guidance can be loaded as relevant context during preparation or review. Framework adapters remain conditional on a concrete stack.

## Publication and evaluation gates

1. Research the P0 chapters using primary standards/platform/design-system sources. Record named creators or credited organizations, original URLs, inspected revisions/dates, reuse terms, and concept versus copied-material boundaries.
2. Draft the smallest reusable chapter that resolves the observed decisions. Preserve project-specific choices as choices, not universal defaults. Review it against both existing trials and a fresh brief before changing skill instructions.
3. Make any authorized skill change concrete and test the resulting generated documents. Compare missing decisions, unsupported assumptions, source scope and document clarity with this baseline. Do not manufacture token-cost or usability improvements.
4. Build browser fixtures only for patterns that require behavioral evidence. Use meaningful failure cases: quota/abort, conflicting edits, dirty-modal cancellation, repeated submission, stale quote and unknown checkout/agent outcome. Keep document evidence, browser evidence and real service guarantees separate.
5. Test implemented products with actual assets/fonts, supported browsers, assistive technology and their real services as separately authorized. A static specimen cannot close those gates.

This roadmap remains a review artifact. Existing skills, templates, themes, catalog metadata and previews stay unchanged during this assessment.
