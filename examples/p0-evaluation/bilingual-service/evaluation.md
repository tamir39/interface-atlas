# Bilingual service trial evaluation

Status: documentation coverage review, 2026-10-15. The first delivered design is frozen; this evaluation claims no implemented behavior. The immutable brief remains byte-identical.

## Requirement-to-heading map

Exact design headings are quoted below. “Covered” means an explicit proposed design decision exists; it does not mean an implementation passed.

| Brief requirement | Exact heading(s) in design.md | Coverage and limit |
| --- | --- | --- |
| Community studio, restrained approachable English/Vietnamese service request | “1. Scope, theme choice and decision labels”; “7. Language availability and text preservation” | Layered chosen after three candidate READMEs; bilingual release gated on reviewed packs |
| Consultation/workshop choice, contact, preferences, workshop-only group size | “4. Proposed input and validation contract”; “5. Flow, branch changes and review return” | Exact proposed fields, requiredness, bounds, normalization and branch relevance; studio approval remains G1 |
| Review, change answers and one final submission | “5. Flow, branch changes and review return”; “8. Submission, uncertain outcomes and external gates” | Contextual change links, prefilled edits, direct return and newly required questions; Continue cannot submit |
| Step Back and browser Back/Forward | “6. State ownership, history and leaving” | Central draft, per-entry focus/scroll, URL fragments, deep-link prerequisites and history repair |
| Change service/question relevance | “4. Proposed input and validation contract”; “5. Flow, branch changes and review return” | Retain inactive group size in memory, exclude from review/payload/validation, restore then revalidate |
| Switch language while editing; no assumed free-text translation | “7. Language availability and text preservation” | Atomic complete-pack switch, IME deferral, state retention, document language and raw-answer preservation |
| Leave with unsaved work | “6. State ownership, history and leaving” | Defined dirty baseline; full-page in-app loss decision; best-effort browser unload with mobile limits |
| Keyboard, validation and focus | “3. Type, geometry, layout and motion”; “4. Proposed input and validation contract”; “6. State ownership, history and leaving” | Native semantics, custom feedback ownership across activation paths, linked summary and destination-specific focus |
| Phone-first and desktop | “3. Type, geometry, layout and motion” | Exact shell, columns, 960/480px adaptations, wrapping, 320px/zoom requirements |
| Light/Dark/System and reduced motion | “2. Color and appearance contract”; “3. Type, geometry, layout and motion” | All retained hex roles, pair restrictions, default/live System, immediate reduced-motion behavior |
| State ownership and retention | “6. State ownership, history and leaving” | Memory-only baseline, separate draft/view/candidate/remote authority, no durable badge or save/resume promise |
| Storage/connections may fail | “6. State ownership, history and leaving”; “8. Submission, uncertain outcomes and external gates” | Storage is an unresolved capability; retention failure gates any recovery promise/dispatch that depends on it |
| Lost response and uncertain outcome | “8. Submission, uncertain outcomes and external gates” | Matching immutable action, no automatic repeat, identity-before-dispatch gate, unknown and stale evidence handling |
| Retained draft versus accepted request versus completed service | “1. Scope, theme choice and decision labels”; “8. Submission, uncertain outcomes and external gates” | Separate facts; no booking or fulfillment inferred from receipt |
| No supplied provider, accounts, session or support | “1. Scope, theme choice and decision labels”; “6. State ownership, history and leaving”; “8. Submission, uncertain outcomes and external gates” | Named external contract gates; no invented endpoint, support channel, authentication or cancellation |
| Actual theme rules and source creators/versions/terms | “2. Color and appearance contract”; “3. Type, geometry, layout and motion”; “9. Credits, adaptation and evidence” | Self-contained tokens, geometry and motion; creator roles, pins, licenses, unresolved Atlas terms |
| Performed versus future evidence | “9. Credits, adaptation and evidence” | Repository reading/document mapping only; all UI, runtime, browser, font, AT and service checks remain future |

## Inherited rules, project proposals and open contracts

Inherited Atlas decisions: Layered's six opaque planes and exact semantic palette; named Plus Jakarta Sans/fallback stack; comfortable spacing; 24px panels/12px controls; 44px comfort targets; 3px focus with 3px offset; optional 160ms color feedback. These remain Atlas proposals, not measured usability facts or Material/Fluent tokens.

Project proposals: smaller form h1, 944px shell, single full-page form flow, field meanings/bounds, four-step model, history fragments, inactive answer retention, explicit review return, custom validation/focus ownership, page-memory baseline, bilingual bundle delivery, and candidate-bound submission controls. No unrequested product feature or runtime is introduced.

Open contracts: G1 studio input/acceptance policy; G2 privacy, durable retention and recovery; G3 complete translation packs/native review; G4 exact font package/notices/rendering; G5 real service revision, identity, duplicate enforcement, status/retry/cancellation and reconciliation. Design coverage is complete enough to review these choices; production release and submission remain gated.

## Reading scope and evidence limits

The unchanged repository preparation skill and template were read. The supplied knowledge/README.md routed selection of state-and-recovery.md, forms-and-navigation.md and uncertain-outcomes.md, all 0.2-draft. No agent chapter was relevant.

Catalog discovery preceded Botanical, Layered and Editorial README comparison. Only Layered's detailed design, sources, motion and effects were read. The P0 ledger was read by table of contents and selected cards F01/F02/F04/F06/F07/F08/F09/F10/F14/F16/F17/F19/F20/F22/F23/UO-HTTP/UO-FETCH. No old examples, prior trial outputs, external web research, global UI skills, theme preview implementation or validation reports were inputs.

The contemporaneous read log records 23 actual helper operations across 17 distinct inputs and 189,332 returned UTF-8 bytes, including all rereads and the failed 15-byte selector output. This is a reading measure, not token use, cost, runtime, or implementation evidence.

A concurrent three-README helper group exposed a log-update race: the original Layered read was reconstructed only from metadata returned before display, and its later actual reread remains separately recorded. Exact disk-read order inside that group is unavailable; reconstructed array order is display order. Further reads were sequential. A broken first source-card selector supplied only hash characters; its output remains logged, and corrected card reads supply the metadata. A combined package tool response was truncated in presentation; design/sources were subsequently reread completely. No missing material was silently inferred as read.

The brief, design, frozen first draft, evaluation and read log are the only trial outputs. design.md and first-draft.md are identical UTF-8 without BOM, LF, one final newline. No repository, skill, template, runtime, application or UI file was edited. No claim of browser, accessibility, service, storage or font validation is made.

## Independent review and one correction pass

The author mapping above describes the immutable first draft; it is not retroactively upgraded. Root read all first drafts and an independent reviewer checked this brief/document against the frozen protocol. The first-draft.md bytes remain unchanged. Current design.md includes the following narrow corrections, plus direct Atlas/theme/ledger source-record links and an explicit uncommitted-P0 input boundary. No new generation inputs were loaded by the author after freezing; these are root review edits.

| Finding | First-pass gap | Corrected rule |
| --- | --- | --- |
| BS01 (P2) | Dispatch names G1/G5 while recovery decision remains separately optional G2. | Dispatch also requires explicit G2 capability decision, with acknowledged identity/independent discovery or approved, accurately limited reduced capability. |

First-pass scores and targeted-trace outcomes are recorded in the [combined results](../README.md). Source/schema/browser/service/font/translation gates remain open where applicable. No behavioral test result follows from these corrections. Reading records retain reconstructed concurrent groups and failed excerpts; exact first-read ordering is unavailable for those groups.
