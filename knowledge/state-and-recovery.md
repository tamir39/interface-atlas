# State ownership and durable recovery

Status: researched draft for review, revision 0.2-draft, 2026-10-15. Atlas synthesis by **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. The decision rules below are Atlas proposals; attributed platform facts describe the inspected sources. No interface, storage experiment, migration, or recovery flow has been implemented or behaviorally validated.

## Read triggers and boundaries

Read when a brief includes reload recovery, offline work, saved preferences, personal records, imports, undo, multiple tabs, or local drafts of remotely owned objects. Skip detailed storage decisions for disposable presentation state whose loss has no material consequence. Load [forms and navigation](forms-and-navigation.md) or [uncertain outcomes](uncertain-outcomes.md) when leaving an editor or submitting a remote action also matters.

This chapter helps choose a contract. It does not require IndexedDB, a backend, accounts, or export controls in every project. A small preference and an irreplaceable practice history justify different investment. A theme's visual rules cannot determine either contract.

## Ownership and lifetime

**Atlas proposal:** identify the authority for each fact before choosing storage. Authority means the value a particular decision must consult; it need not be the location currently rendering that value. Name who can change it and the boundary across which it must survive.

| State | Possible owner and lifetime | Project decision required |
| --- | --- | --- |
| Search, open panel, selection | Page memory or shareable URL | Should Back, reload, or a copied link restore it? |
| Unsubmitted editor draft | User intent in memory or a draft store | Save boundary, dirty comparison, retention, discard and recovery |
| Local personal records | Validated browser store, if product chooses local authority | Acknowledgement, capacity, conflict, backup and deletion policy |
| Remote record and editable draft | Service owns committed value; editor owns proposed changes | Base revision, acceptance, stale edits and reconciliation |
| Cached catalog or derived total | Rebuildable observation with freshness limits | When to invalidate; which decisions require current authority |
| Cart and purchase attempt | Browser may own intended items; service owns commercial outcome | Keep cart revision and recoverable attempt identity distinct |

An updated screen is not evidence that a write succeeded. Describe draft, pending write, acknowledged value, failed write, conflicting value and unknown remote outcome separately. Optimistic display is permissible when its rollback, pending indication and retry semantics are explicit. Avoid making every local preference show a save dialog; scale interaction to loss and consequence.

If Undo is offered, specify the inverse operation, affected records, expiry boundaries, interaction with later edits and save-failure behavior. A transient undo slot needs explicit navigation/reload semantics. Restoring browser cart intent cannot restore a remote price, stock reservation or purchase status. The storefront trial's latest-removal slot is one project proposal, not a universal pattern.

## Acknowledgement is not retention

**Verified platform facts:** IndexedDB commits transaction changes together; request success does not establish transaction completion. Durability is a hint: `strict` asks the user agent to verify persistent-medium writing; `relaxed` permits operating-system acknowledgement; `default` delegates. [W3C Indexed Database API 3.0, §§2.7 and 5.4](https://www.w3.org/TR/2025/WD-IndexedDB-3-20250813/).

Google documents Chrome's move to relaxed default durability from Chrome 121, explains the completion/OS-buffer distinction, and cautions that selecting strict durability does not eliminate data loss. [Thomas Steiner, Chrome for Developers](https://developer.chrome.com/blog/indexeddb-durability-mode-now-defaults-to-relaxed).

**Atlas proposal:** if using IndexedDB, only acknowledge the intended local save after the transaction completes successfully. Keep a draft on failure. Choose a durability hint for the actual risk/performance tradeoff and supported browsers; do not turn `strict` into a universal requirement. A local acknowledgement says neither “synced” nor “order completed.” Multiple browser stores and remote requests do not become one transaction because the interface has one Save button.

The Storage Standard starts local buckets in best-effort mode. Persistence requires permission; persistent storage is protected from automatic clearing without origin/user involvement. Usage and quota are estimates. [WHATWG Storage Standard, §§4.5–7](https://storage.spec.whatwg.org/). WebKit documents quota failures, eviction under storage pressure or inactivity, and heuristics for granting persistence. Its quoted quota is an upper bound, not allocated free space. [Sihui Liu, Updates to Storage Policy](https://webkit.org/blog/14403/updates-to-storage-policy/).

**Atlas proposal:** specify expected same-browser reload recovery while storage remains available, and disclose material limits. Persistence requests may improve protection; design denial and unavailability paths. Request at a meaningful saving moment if justified; Google's guidance discourages unexplained page-load requests and immediate repeated prompts. [Pete LePage, Persistent storage](https://web.dev/articles/persistent-storage). User clearing, browser/profile removal and device loss still require a separate recovery strategy when the product promises recoverability. A second copy in the same browser eviction boundary is not an independent backup.

## Save snapshots and completion

**Atlas proposal:** bind each save to an immutable candidate, its draft version and authoritative base revision. If save A is pending while the user edits B, A's success acknowledges A only. B remains dirty; do not replace it, clear its dirty flag, close its editor or navigate away as though B was saved. Define whether saves are serialized, coalesced before dispatch or allowed to overlap, and how older completions are prevented from replacing newer acknowledged state. Failure preserves the latest draft and identifies which candidate failed. An acknowledgement from an invalidated store generation cannot clean a current draft.

This is a proposed product invariant. IndexedDB stores record values by value, so changing an in-memory object later does not update its stored record. [Indexed Database API 3.0, §2.3](https://www.w3.org/TR/2025/WD-IndexedDB-3-20250813/#values). The project's dirty baseline tracks acknowledged content, rather than the last click, current input or a generic success flag. Explicitly disabling editing while saving is another project option when its interaction consequences are acceptable.

## Concurrent edits

**Source guidance and platform facts:** WHATWG's informative Web storage introduction warns authors to assume no `localStorage` locking across relevant browser contexts. Its read/increment/write example can race. Normative API definitions include `SecurityError` for access and `QuotaExceededError` for a failed write. [HTML Standard, Web storage](https://html.spec.whatwg.org/multipage/webstorage.html). IndexedDB prevents concurrent modification of stores within an overlapping read/write transaction's scope. [Indexed Database API 3.0, §2.7.2](https://www.w3.org/TR/2025/WD-IndexedDB-3-20250813/).

**Atlas proposal:** choose explicitly among disposable last-writer-wins, restricted editing, reviewed replacement, or a concrete conflict-safe mechanism appropriate to the product. A local revision field alone is insufficient. Reading a revision and later writing localStorage leaves an intervening-write window; a storage event or broadcast can notify but does not close it. A timestamp is not a lock.

For an IndexedDB revision-check pattern, read the current revision, compare the draft's base, validate and write the next value/revision inside the same appropriately scoped read/write transaction. Include all records whose consistency matters. Do not describe a separate read transaction followed by an unconditional write as equivalent. Keep user review/network waits outside the transaction, then recheck; another conflict can occur during review. Determine whether a rejected draft can be merged by field, reapplied as a named operation, or requires replacement review. Blindly replaying an entire stale snapshot can erase unrelated changes.

Pocket Practice proposes this transactional revision pattern, but still lacks exact reapplication semantics. Form & Field's localStorage revision plus other-tab review proposal leaves the write race unresolved. These are document-level implementation gates from the [consumer](../examples/coverage-evaluation/consumer-app/design.md) and [storefront](../examples/coverage-evaluation/storefront/design.md) trials, not observed failures or proof of correctness.

## Read failure, migration and reset

**Atlas proposal:** startup must distinguish loading, validated existing data, absent record, unavailable access, malformed/invalid data and unsupported schema. Absence does not prove first-ever use: data may previously have been removed. Default values may be usable without asserting that the user never created anything.

On a read error, avoid automatic writes to the affected authority. Preserve readable original bytes/records where possible; do not overwrite them with empty defaults on the next ordinary edit. A temporary in-memory draft must be clearly labeled and guarded against autosave replacement. Retry, inspect/export safely where feasible, migrate a supported version, and informed reset are distinct actions. Do not label every access failure “corruption” or promise that unreadable content can always be exported.

For migration, state recognized source/target versions, validation rules, interruption behavior, concurrent old-client behavior and rollback/recovery route. Preserve the original until the replacement has met the chosen completion/durability checks; staging and copying require their own quota budget. Database version upgrades and application payload schema versions are separate concerns. IndexedDB upgrades may be blocked by open connections; requesting a lower database version fails. [Indexed Database API 3.0, §4.3](https://www.w3.org/TR/2025/WD-IndexedDB-3-20250813/). Treat blocked upgrade, denial, quota exhaustion and unknown schema as different recovery paths. Never silently downgrade or delete a newer unknown version.

Reset must identify what will be discarded, offer available backup/review, and state whether the temporary draft replaces the saved record. If reset writing fails, retain the guarded draft and explain the remaining state. Do not claim recovery succeeded because a confirmation dialog closed. Form & Field's reviewed quarantine rule fixes a useful counterexample: “start empty after parse failure” alone allowed the next cart edit to destroy unreadable prior intent.

## Replacement and stale writers

**Atlas proposal:** deletion, reset, replacement import and migration must define what happens to queued autosaves, in-flight completions, old tabs and recovered drafts. A successful replacement does not prevent a later stale write from resurrecting deleted data or overwriting restored state. Retire obsolete work at an enforceable authority boundary: for example, transactionally check a non-reused store generation plus revision, or use verified writer exclusion with an explicit reconciliation policy. A UI flag, a storage notification, or resetting a counter to an earlier value is insufficient for a claimed conflict-safe replacement.

Record when obsolete work is rejected, what happens if replacement fails, and how an older client or draft learns that its base no longer exists. Do not silently reapply it. Preserve a separately named draft for review where appropriate. The mechanism remains a project choice; every write path must participate in its checks. A separate confirmation screen or a transactional import alone does not provide that guarantee.

## Backups and capacity

**Atlas proposal:** decide whether local loss is acceptable, whether an independent service copy exists, or whether export/import is warranted. Define data sensitivity, retention and who controls recovery copies. Browser storage is not itself an access-control or secrecy guarantee. Imported data requires schema validation and safe rendering; parsing JSON does not establish semantic validity.

When export/import is offered, use one explicit envelope for creation, updates, temporary-mode edits, migration and recovery. Every state the product permits users to create must have an export representation accepted by the compatible importer, including identifiers, history, Unicode content and required metadata. This is a format/capacity design invariant; actual destination writes can still fail because browser resources differ. Resolve growth at capacity before enabling indefinite accumulation. Do not silently evict user history to make a save appear successful.

Specify export version, scope, omitted data, integrity checks, supported historical versions and replacement/merge behavior. Preview import consequences and validate the full candidate before replacement; commit within an identified boundary, preserving prior authority on failure. A successful file selection is not a successful restore. A raw diagnostic export of unreadable content must not claim to be a valid backup. If file completion cannot be observed, describe the export action truthfully rather than claiming an independently verified backup.

Pocket Practice's initial import-only size/count caps could reject history that ordinary use was allowed to accumulate. Its reviewed draft replaces those caps with a shared capacity gate. The missing exact limits remain a project input, not a number Atlas should invent. Export/import symmetry must be checked at the largest valid created state and after metadata/schema changes.

## Decision worksheet

Answer these questions for each material state family; “unknown” is an explicit handoff gate:

1. What is authoritative, who may mutate it, and which values are only observations or drafts?
2. What survives route changes, reload, another tab, browser restart, sign-out or device loss? Which promises need independent recovery?
3. What exact event and candidate version permit success copy? What stays dirty if editing continues during a pending save?
4. What consistency boundary covers the operation? How are stale bases detected and reviewed without erasing newer work?
5. What happens on missing, denied, full, malformed, blocked or unsupported-version storage? Which actions may replace existing data?
6. What schema/growth envelope applies equally to created state and recovery? How do replacement, deletion and migration retire stale writers, queued saves and recovered drafts?

Choose the smallest mechanism that satisfies the answers. Choosing storage first and filling in these answers afterward tends to hide unresolved product decisions.

## Project handoff and validation

Put the resolved answers in the consuming project's self-contained `design.md`: state/owner table; draft and save boundaries; candidate/dirty-baseline and completion ordering; acknowledgement copy; persistence and loss limits; schema/capacity/version contract; conflict policy; recovery/reset/import/export flows and stale-writer retirement; dependencies; exact unresolved owner inputs; performed evidence and pending checks. Include concrete [focus/feedback and dirty-exit rules](forms-and-navigation.md#modal-editing-and-dirty-exit) when actions open dialogs or leave editors. Include authoritative remote-status recovery from [uncertain outcomes](uncertain-outcomes.md) when a request may outlive the page.

For Pocket Practice, schema bounds, history growth, conflict reapplication, backup format and browser baseline remain inputs. For Form & Field, cart concurrency/retention and an independent checkout-attempt recovery contract remain inputs; preserving a cart does not resolve an unknown purchase outcome.

**Desk-review scenarios, not executed tests:** trace save A followed by edit B and A completion; reset/import followed by a queued old save or stale-tab edit; reload during pending save; save abort/quota failure; denied startup access; unreadable and newer-version records; two tabs editing the same base; a new conflict during review; blocked/interrupted migration; full-size valid export/reimport; invalid or unsupported import; failed reset; explicit temporary mode followed by storage recovery; cleared storage followed by return. Each trace must identify visible state, preserved data, permitted next action and required evidence before success. Actual supported-browser, interruption, accessibility and service testing remain future implementation work.

## Sources and provenance

IndexedDB facts cite the **13 August 2025 W3C Working Draft**, edited by Steve Becker (Microsoft). The distinct [Editor's Draft](https://w3c.github.io/IndexedDB/) is also work in progress; neither is a Recommendation. WHATWG HTML and Storage are Living Standards. Publisher guidance is scoped to its stated product/version and date.

Full creator/editor, inspected-date, revision, claim and reuse records belong to [P0 research: state and recovery sources](../references/p0-research.md#state-and-recovery-sources). No external code, prose or assets were copied. The table, worksheet and project policies are Atlas synthesis; source authors retain credit for their own work and do not endorse these proposals.
