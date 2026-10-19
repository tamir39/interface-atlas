# Pocket Practice preparation evaluation

Status: requirement-to-heading map, 2026-10-20. This is the preparation workflow's delivery record, not the separate design-review workflow and not implementation validation.

## Requirement coverage

| Supplied requirement | Design heading and resolved proposal |
| --- | --- |
| Independent learner, calm approachable consumer app | Purpose, evidence and direction: Layered choice and bounded rationale; no fabricated user evidence |
| Browse/filter small text-first catalog | Information structure and content: authored list, combined Unicode search/topic/bookmark filters, count, Clear filters, useful empty/missing states |
| Bookmark lessons | Essential task transitions: transactional toggle, pending acknowledgement and retry; real empty bookmark list |
| Weekly planning | Essential task transitions; State ownership and persistence: dated Monday–Sunday plan, add/move/remove, bounded Undo, dates across timezone changes |
| Finish practice with short note | Essential task transitions: required proposed 1–500-code-point note, practice identity, atomic completion/draft handling and duplicate prevention |
| Edit goal | Essential task transitions: explicit Save goal for proposed text/weekly target, preserved draft and empty initial prompt |
| Revisit actual completed work | Information structure and content; Essential task transitions: history from committed records only, full note detail, unavailable-lesson title snapshot |
| Same-browser reload survival | State ownership and persistence: proposed IndexedDB authority, transaction-completion acknowledgement, recovery drafts and truthful limits |
| Blocked/full/malformed storage, fresh versus unreadable | Errors, interruption and recovery: distinct startup states, guarded temporary mode, full-store retention, preserved unreadable authority, newer schema/blocked upgrade handling |
| Failed writes must not lose edits or claim persistence | State ownership and persistence; Errors, interruption and recovery: immutable candidate/version, latest-draft preservation, failed Save/Undo/reset feedback, Copy note |
| Light/Dark/System | Color contract; Appearance, validation and open gates: exact token pairs, default System, live OS following, validated restore and failed preference-write copy |
| Phone/desktop, keyboard/reduced motion | Typography, geometry and adaptation; Appearance, validation and open gates: exact sizes/reflow/targets, semantic controls, focus rules, immediate state changes |
| English UI/Vietnamese lesson content, no language toggle | Information structure and content; Typography, geometry and adaptation: language markup proposal, Unicode text, actual font-glyph check gate |
| No accounts/sync/backend/AI/agent | Purpose, evidence and direction; Appearance, validation and open gates: explicit capability boundary with no external endpoints |
| Mark markup/state/storage/conflicts/navigation/Save/deletion/media as proposals | Opening status; Information structure and content; State ownership and persistence; Essential task transitions; Errors, interruption and recovery: all are explicitly project proposals |
| Bound recovery/import/export to actual need | Errors, interruption and recovery: Copy note, readable-only diagnostic download, explicit destructive reset; no routine import/export or backup claim |
| Actionable self-contained handoff/provenance/evidence limits | Color contract onward; Provenance and reuse: implementation values, inherited versus adapted decisions, exact identities, source credits, notices and pending checks |

## Selected readings and decisions

All Atlas/project input content reads used the immutable `read.mjs` helper sequentially under case `consumer-app-gen`. Read repository AGENTS.md, required preparation skill, supplied brief, catalog and exactly three candidate READMEs: Layered, Botanical and Play. Read only selected Layered design/sources. General knowledge selection was driven by unresolved task structure, local editing/persistence and responsive/keyboard/language behavior:

- Knowledge index; complete small general UI/UX guide for task/content/journeys/hierarchy/component handoff and method credits.
- State/recovery guide for local authority, acknowledgement, candidates, concurrency, malformed/newer data, capacity, reset/stale-writer retirement and credits. This legitimate guide itself contains references to historical trials; linked historical documents were not opened and their product decisions were not treated as observed evidence.
- Forms/navigation headings, then only Inputs and validation timing; Validation and error recovery; Pending actions and available controls; Modal editing and dirty exit; Navigation, focus, and scroll; Unsaved work, resume, and expiry. Multi-step/branching content was skipped because the app has no such flow. Relevant source credits are present in those selected sections.
- Accessibility/responsive guide for focused native controls/focus, Vietnamese text/content growth, phone reflow, status and evidence distinctions. No motion was selected, so no theme motion/effects package was loaded.
- Project template and selected skill-adaptation sections: Selected sources and changes; Scope of terms and retained notices; Project handoff; 2026-10-20 reference and craft additions. Did not follow links to research ledgers, practical lessons, upstream skills, websites or historical outputs.

Retained from Layered: exact six-background palette/pairings, focus/boundary colors, comfortable spacing scale, coherent rounded geometry, native-control direction and limited numerical contrast record. Adapted: smaller app heading scale, narrower 1200px shell, phone navigation and list/week composition, initial system-font stack, no effects/motion. Newly proposed: all app routes, content model, explicit main Save plus recovery-draft autosave, IndexedDB authority, capacities/schema, conflict review, completion semantics, deletion/Undo/reset, copy-only manual recovery and feedback wording. None is presented as a source-system requirement or a tested product result.

## Input identities

SHA-256 hashes obtained through metadata-only helper reads; no prose was reread for hashing. Base revision supplied by brief: `782159e8e2510933c76989ff9fd9546d282c62cd`. The frozen input may contain uncommitted changes; no manifest/HEAD claim was inferred.

| Input | SHA-256 |
| --- | --- |
| AGENTS.md | c796bf765c2752241ad47ef0a1e7ee4e1c0bec57ad68f87b85a123716aeed8dd |
| skills/prepare-frontend-design/SKILL.md | d5528477be4f87ee4d66591e95176423d95bf2e0427d229e82dffb1b726b7d40 |
| examples/p0-evaluation/consumer-app/brief.md | 8f236706ff34a9008d4c4e77c64fd53bcc545687e0c25452b70a64f1766ffc10 |
| catalog/themes.json | 05a01cdb0d31f8a716df714bde6c7c323112110d1f6f2eac4aca7976a760fdd6 |
| themes/layered/README.md | 85906f68b11d38dfc26e8d2327d47eb0513890dc5bf2636c1d65fa643bf4edf7 |
| themes/layered/design.md | 50b367846e908348f66705e76c78b474888d7ba7ab1e69c365c6858c404f76c0 |
| themes/layered/sources.md | b7609231849d8be5e6343ff97d0ee199c15b87039bf7ebc1d82500f387baa37e |
| themes/botanical/README.md | e4e77ba00888c4d1f93597fcd9f03a35b5dcb66ebe5d5912214715dff6181f9a |
| themes/play/README.md | ec85b3378ec2d5b2c0b23f03bab61af12a5ebba31b95c20816eb92de6a022859 |
| knowledge/README.md | 1f36c03535baf55c8667b4b37f6b2705424a510c7199983963bfd5c28574a2b2 |
| knowledge/ui-ux-design.md | 7bfa8b14b2529d599a9a932f1e61832e6d638556bc7684635621ef3ea81112c5 |
| knowledge/state-and-recovery.md | ddd338c88cb26e5001c6209e91d4d3b53089912ac2bee68a9c3a95ba5eda7c51 |
| knowledge/forms-and-navigation.md | 870844c51547c2083a5b33d97048c7fdae1bdd7850a214ae375bdc3940e93b5b |
| knowledge/accessibility-and-responsive.md | 57e53cd66e79c67e8fb689a28846845c3f5aaca486d4310e203353c1085d8db3 |
| templates/project-design.md | 2abbf0a6b8acbc98064b883c26e5de4ee1bfecd7ab043e793981a09c7622d0e2 |
| references/skill-adaptations.md | 6ef8c8770361bc95f57ac91803d470153ee95ea901df8ea4bfd309391db7fc50 |

## Unresolved inputs and evidence boundary

Important owner inputs: actual lesson catalog and ID/version lifecycle; approval of weekly goal, note bounds, finite capacity and deletion semantics; final schema and supported browser baseline; transaction and conflict-review implementation; font/package rights if Plus Jakarta Sans is adopted. These are named gates, not fictional service guarantees. No assets or technology stack were selected by implication.

Performed: source preparation and requirement mapping; written reconciliation of plans versus completions, explicit Save versus draft autosave, success versus failed persistence, malformed data versus fresh absence and reset versus stale writers. Metadata delivery checks establish file presence and equal draft/design SHA-256 only. No separate review workflow, implementation, browser test, accessibility test, storage experiment or user research was run.

Future checks: all six end-to-end tasks; exact save A/edit B ordering; reload and draft resume; quota/denial/corruption/new-schema/blocked-upgrade cases; two-tab conflict review including a second conflict; repeated Finish; Undo failure; failed reset and stale writer after successful reset; real Vietnamese fonts/content/reflow, Light/Dark/System, forced colors, keyboard/dialog focus, screen-reader status and rendered contrast. Outcomes remain unknown until exercised.

Read/log limitations: no tool output was truncated. Every whole guide read used a token budget of at least 10,000. The wrapper was read directly as instructed; input content thereafter used the logged helper. The helper-maintained case log was not independently inspected or modified, since the wrapper restricts output writes to these three deliverables and forbids study/research-output inspection. No live web, binary assets, installed global skills, other agents' designs, old trial outputs, snapshot manifest or study protocol were read. Source URLs are inherited provenance rather than current verification.