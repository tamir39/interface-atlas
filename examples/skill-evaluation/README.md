# Updated preparation and opt-in review trials

Date: 2026-10-17. Implemented two repository workflows: [prepare frontend design](../../skills/prepare-frontend-design/SKILL.md) and explicitly invoked [review frontend design](../../skills/review-frontend-design/SKILL.md). General UI/UX and accessibility/responsive guidance is selected through the [knowledge index](../../knowledge/README.md); state, forms, remote outcomes and Agent Experience load only when the project needs them. Routine implementation uses the resulting project's documents.

## What the trials showed

Four briefs produced design documents; an additional bilingual run exercised a reading-efficiency refinement. The original drafts, author maps, actual reads and separate review reports are retained. Three original cases needed state/recovery clarification; operations needed a persisted-rejection contract; the bilingual rerun needed a language-load race rule and embedded focus values. Six supported document findings were corrected and independently checked. An already gated ordering dependency was clarified separately. These changes do not demonstrate running storage or service behavior. See [findings and rubric judgments](review-findings.md), the [original-case correction check](reviews/correction-check.md) and [rerun correction check](reviews/bilingual-rerun-correction-check.md).

The initial review missed three subtle omissions. A conditional transition-review profile was added, then a fresh review independently identified them without old findings or expected answers. The [initial reports](consumer-app/initial-review.md) remain alongside the refined reports. General review is still opt-in; no new automatic review step was added to preparation.

## Reading scope

Returned UTF-8 source-content bytes include repeats and the brief. Atlas-only excludes supplied project input. Metadata-only operations return identity metadata and count as zero source-content bytes; they still do work and produce output. These are not model tokens, billing, physical I/O, latency or usability measurements.

| Preparation run / reviewed output | Theme | Content reads | Unique content files | Bytes including brief | Atlas-only bytes | Metadata reads |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| [consumer-app](consumer-app/design.md) | Layered | 43 | 16 | 122,162 | 119,988 | 0 |
| [storefront](storefront/design.md) | Gallery | 54 | 19 | 140,065 | 137,637 | 0 |
| [bilingual-service](bilingual-service/design.md) | Layered | 54 | 17 | 230,262 | 227,722 | 0 |
| [agent-operations](agent-operations/design.md) | Precision | 45 | 16 | 120,256 | 117,522 | 0 |
| [bilingual-service-rerun](bilingual-service-rerun/design.md) | Botanical | 52 | 17 | 119,804 | 117,264 | 16 |

The initial bilingual run reread nine complete files only to calculate fingerprints, adding 110,921 content bytes. The preparation entry now says to reuse existing records or obtain identity metadata without rereading content. The separate rerun used 16 metadata operations and 119,804 total content bytes, choosing Botanical rather than Layered. Selection/context differ, so this is a bounded operational observation, not a causal savings estimate. No original reading cost was subtracted.

For context, historical P0 Atlas-only logs recorded consumer 115,164, storefront 165,891 and bilingual 186,792 bytes. The current initial runs recorded 119,988, 137,637 and 227,722 respectively. The broader general-UX coverage can cost more; selective routing does not guarantee every task is cheaper. Prior logging recovery/corrections limit direct comparisons. Per-path categories and exact hashes are in [evidence.json](evidence.json).

Consumer preparation did not load remote-outcome or Agent Experience chapters. Storefront and bilingual preparation loaded remote-outcome guidance but no Agent Experience chapter. Operations loaded that chapter for human review/control of assistant proposals. Optional theme effects/motion were omitted unless chosen for the project. Review did not reload the theme catalog or detailed themes without an inheritance question.

Known-case review was grouped: initial review returned 108,646 bytes including 81,415 bytes of project input; refined review returned 112,559 including the same project input. Operations review returned 54,704 including 32,169 project bytes. All review reading is additional opt-in work, not included in preparation totals. The separate bilingual rerun review has its own log in [reviews](reviews/review-service-rerun-read-events.jsonl); it also includes one later 26,837-byte first-draft comparison read during the bounded correction check. That append and its timing are disclosed rather than removed from the record.

## Scope probes and checks

| Probe | Actual result | Limit |
| --- | --- | --- |
| [Routine toolbar implementation](scope-probes/s01/report.md) | Neither Atlas skill opened; added only native Clear filters control/handler. Minimal-DOM Node checks passed. | Headless Edge did not expose DevTools; no native browser keyboard/focus assertions ran. Temporary profile/process cleanup was confirmed. |
| [Explicit controlled review](scope-probes/s02/report.md) | Review skill opened, no input mutation. Both seeded P1 conflicts and a supported missing Reject/Edit path were reported with evidence/corrections. | Initial review version; document fixture, no real product/service. |
| [Narrow typo correction](scope-probes/s03/report.md) | Neither skill opened; exact one-word correction verified. | Text-only scope check. |

Both final skill entries pass the system skill validator. Review metadata parses as Boolean <code>allow_implicit_invocation: false</code>. Exact retained license bytes and source revisions were checked; an independent [workflow and credits audit](reviews/workflow-and-credits-audit.md) found no material inconsistency in its snapshot. Final links, input identities, read selectors and protected-history checks are recorded in [integrity.json](integrity.json). Actual Codex host installation/discovery was not tested.

## Evidence and remaining limits

- [Protocol](protocol.md), frozen before generation; [exact execution wrappers and archived skill/reader versions](execution/prompts.json).
- Each case preserves brief, immutable first draft, reviewed design, generator evaluation, review and contemporaneous read log. The bilingual rerun is a separate attempt of the same brief, not another project type.
- [Creators, adaptations and exact retained licenses](../../references/skill-adaptations.md); five source families, four MIT and one CC0. Linked website/standard/font/media rights remain separate; Atlas publishing terms remain undecided.
- Three briefs are known regression rehearsals; operations was authored after research. Small document/routing trials do not establish causal effectiveness, review recall, real usability, accessibility conformance or runtime correctness.
- Real content/translation/font/media, storage/service contracts and browser/keyboard/AT/user checks remain before production claims. No products, previews or services were implemented/deployed by this pass.

Archived reader files contain the original private staging paths and are evidence, not a new runtime dependency or portable executable command. Initial skill entries are archived as exact-byte .txt files because their links resolve from the original skill folders. The bilingual rerun's review-original.md and correction-check-original.md preserve exact reports; their reading copies derive only portable link targets. First-draft raw hashes identify delivered bytes; consumer also records an LF-normalized comparison identity. Release attributes preserve exact bytes throughout this trial package and the retained license files, preventing Git checkout normalization from changing recorded hashes. Historical research, P0 trials and theme packages remain unchanged.
