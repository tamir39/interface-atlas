# P0 knowledge draft review

Status: draft review record, 2026-10-15. Original Atlas analysis by **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. This pass researches and drafts knowledge; it does not implement a skill, product interface, storage mechanism or service integration.

Follow-up: the [0.2-draft review and fresh generation trials](../examples/p0-evaluation/README.md) now record the authorized next pass. This document and [initial evidence](p0-evidence.json) retain the earlier desk-review snapshot; their historical checks/hashes are not current trial results.

## Scope and evidence

The three chapters cover the five requested topics: [state ownership and durable recovery](../knowledge/state-and-recovery.md), [forms and navigation](../knowledge/forms-and-navigation.md), and [uncertain outcomes](../knowledge/uncertain-outcomes.md). Primary references, credited creators, inspected versions, terms and claim boundaries are in the [research ledger](p0-research.md). Sources support platform facts and comparative guidance. Atlas owns the proposed decision tables, worksheets and hypothetical cases.

The existing [nine-theme assessment](../examples/coverage-evaluation/README.md) supplies observed document gaps. Its two reviewed design documents are inputs, preserved unchanged:

| Input | SHA-256 of assessed document |
| --- | --- |
| [Pocket Practice consumer design](../examples/coverage-evaluation/consumer-app/design.md) | `e03c8960266b6d2778142871f35862a51e1652a9e5722fb3dbd61c8768eabafa` |
| [Form & Field storefront design](../examples/coverage-evaluation/storefront/design.md) | `be39c96ff9fbad6349e2671f873d1aa9125592d033b1a05fd5ff5a49c2d0df7f` |

This review traces concrete scenarios through proposed rules and records what they would require a consuming project to specify. It is a desk review, not a rerun of document generation, a controlled improvement experiment, or a browser/backend test. Earlier theme preview evidence is unchanged and does not validate these new chapters. No usability, token-cost, accessibility-conformance or loss-free recovery improvement is claimed.

## Existing trials: decisions the drafts expose

| Scenario and earlier gap | Decision now available to a design author | Still required from the project |
| --- | --- | --- |
| Consumer save request succeeds, then its transaction aborts | Acknowledgement must follow the chosen whole-write completion boundary; preserve draft and expose failed save | Exact schema, transaction scope, failure feedback and implementation evidence |
| Consumer history grows beyond an import-only cap | One creation/update/migration/export/import envelope; compatible importer accepts every valid created state | Concrete growth limits, format, historical-version support and large-state tests |
| Consumer draft conflicts again while its conflict review is open | Recheck the authoritative revision when applying the decision; stale whole snapshots cannot erase unrelated work | Named operation/field merge or reviewed replacement rules |
| Consumer pending bookmark control loses focus | Decide native disabled versus guarded focusable unavailable control; preserve feedback and a useful recovery target | Actual guard for pointer, keyboard and programmatic entry points; assistive-technology checks |
| Consumer dirty editor receives Cancel or Escape | Name what is discarded and define draft/confirmation states, Escape behavior and return focus | Validate the project's chosen same-dialog confirmation; it is an Atlas option, not an APG requirement |
| Storefront saved cart cannot be parsed | Guard the affected authority against ordinary autosave; retain readable original material and label temporary intent | Schema classification, safe export feasibility, informed reset and reset-failure behavior |
| Two storefront tabs read the same cart revision | Revision plus storage notification does not make localStorage compare-and-write indivisible | Choose a concrete conflict mechanism or explicitly accept/document last-writer-wins; the existing trial remains gated |
| Storefront checkout creation succeeds but reply is lost | Cart intent and remote attempt recovery have separate authority; unknown remains unknown until reconciled | Independent recoverable attempt identity, authorized lookup, retention and duplicate semantics before creation |
| Remote progress is older than a confirmed result | Reconcile by documented identity/version; retain confirmed history when refresh fails | Authoritative ordering and contradictory-event policy from the chosen service |

The chapters make these questions reusable. They do not retroactively close the trials' unresolved contracts or change their evidence status. Provider-specific cart, inventory, quote, money and payment rules remain P1 work.

## Fresh brief: bilingual community service request

**Fictional Atlas brief:** a small community studio offers a service-request form in English and Vietnamese. Visitors choose a service, enter contact details, give service-specific preferences, review answers, and submit one request. A workshop branch asks an additional group-size question; a consultation branch does not. Visitors may edit an answer from review, navigate Back/Forward, change interface language, or leave with a dirty draft. No provider, API, account system, retention policy, translation pack or save/resume capability has been supplied. This is a new desk scenario, not an implemented product or an external service description.

The visual theme is deliberately undecided: none of these contracts depends on a palette. A restrained service interface can select a suitable theme later without changing the authority and recovery questions.

### Draft decisions for that brief

- **State:** input values and branch choice belong to a local editor draft. The service owns accepted request records. URL navigation state, draft data and remote action identity are distinct. Durable save/resume stays unavailable until its storage, expiry, access and recovery scope are selected; a locale switch alone must not discard the active draft.
- **Validation:** name the required fields, valid formats and branch rules. Provide visible labels and associated help/errors. Preserve entered values after validation failure. Choose a coherent error-summary/focus policy and test it; the GOV.UK pattern is a useful service comparison rather than a universal WCAG instruction. Final validity and authoritative acceptance remain service responsibilities.
- **Review/edit:** Change opens the selected answer in context, preserves other answers and returns to review. A changed service invalidates dependent branch answers and the prior review decision; explain which answers need attention. Decide whether inactive answers are temporarily retained or deliberately cleared, and keep them out of a submitted payload unless the contract requires them.
- **Navigation:** distinguish browser history traversal, explicit step Back, Change from review, language change and destructive discard. Preserve native restoration when appropriate. For scripted view changes, define title, heading, focus, scroll and Back behavior together. A departure warning cannot supply durable saving.
- **Pending submission:** freeze the reviewed intent for one action; preserve the editable draft separately. Communicate pending state without routine focus jumps. A local activation guard prevents accidental immediate repetition but cannot supply service duplicate prevention.
- **Outcome:** accepted means received/processing according to the contract, not a final appointment or completed service. If the reply is lost, preserve the action identity and show unconfirmed outcome. Offer status lookup or retry only when supported by actual documented semantics. No invented endpoint, confirmation code or support route fills a missing capability.
- **Language:** keep canonical answer identity independent of the displayed language. Define translated label/error availability and missing-translation behavior before promising a fully bilingual flow. Runtime translation of arbitrary saved answers is not assumed.

### Desk traces and unresolved gates

| Trace | Required result at document level | Current status |
| --- | --- | --- |
| Review → Change service → different branch → review | Dependents and reviewed revision are invalidated deliberately; current answers remain understandable | Rule drafted; exact field dependencies and inactive-answer policy needed |
| Empty required contact field → Continue | Value preservation, associated error, useful announcement/focus target | Rule drafted; labels, copy and validation rules needed |
| Draft → Vietnamese → browser Back/Forward | No incidental discard, no double submission; language and history restoration have named scopes | Rule drafted; navigation implementation and translation inputs needed |
| Dirty editor → Cancel → Keep editing / Discard / Escape | Each action has a defined state transition and focus destination | Rule drafted; project must choose and test its pattern |
| Save/resume promised → storage denied or draft expired | Promise limited to actual capability; explain available recovery without overwriting uncertain data | Blocked on storage/retention/access contract |
| Submit → service applies effect → connection lost → reload | Recover the original action or leave outcome explicitly unknown; do not silently create a new action | Blocked on durable identity, status lookup and duplicate contract |
| User changes answers after an unresolved submission | Changed draft is separate from unresolved action; review before any new intent is sent | Rule drafted; terminal/reconciliation conditions needed |

“Rule drafted” means an author can describe the intended behavior. It does not mean a user or test has demonstrated that behavior. Exact limits, routes, service fields and copy remain the consuming project's decisions.

## Review disposition and next evidence

Keep all three chapters marked **draft for review**. They are selective references for preparing or deliberately revising a project's self-contained `design.md`; there is no requirement to load them for every frontend task. A small static portfolio may need none of them. A local journal may need state/recovery and the relevant forms sections. A remote multi-step submission can need all three.

Before any skill change, review whether the chapter boundaries and handoff fields are clear. Then an explicitly authorized workflow experiment can regenerate both trials plus a fresh service brief and compare unresolved decisions, unsupported claims, contradictory rules and reading scope. The current pass does not claim to have run that experiment.

Behavioral fixtures should follow the chosen project contract: quota/abort and two-tab conflicts, guarded unreadable storage, import symmetry, dirty-modal cancellation, review/edit Back behavior, repeated submission, lost reply after an applied effect, expired duplicate protection and stale observations. Browser, keyboard, assistive-technology and real-service results must be recorded separately. P1 commerce, production Agent Experience, media/fonts/localization and broader component extraction remain deferred. No skill or template was changed in this pass.
