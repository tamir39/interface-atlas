import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const stage = path.resolve(import.meta.dirname, '..');
const [name] = process.argv.slice(2);
if (!['consumer-app', 'storefront'].includes(name)) throw Error('Unknown correction case');
const folder = path.join(stage, 'runs', name);
const original = await readFile(path.join(folder, 'first-draft.md'), 'utf8');
let text = original;
const changes = [];
const replace = (id, before, after, reason, limit) => {
  if (text.split(before).length !== 2) throw Error(`Expected unique correction target ${id}`);
  text = text.replace(before, after);
  changes.push({ id, reason, before, after, limit });
};
if (name === 'consumer-app') {
  replace('C01',
    'Editing may continue during Save; if B follows A, acknowledge A while B stays dirty and the editor stays open.',
    'Editing may continue during ordinary goal/record Save; if B follows A, acknowledge A while B stays dirty and the editor stays open. Practice Finish uses the explicitly bounded pending interval below instead.',
    'Independent review finding 1: resolve editable Finish continuation without inventing another completion or an unrequested note-edit feature.',
    'This changes the proposed Finish editing policy; it does not validate the original editable-during-Finish flow.');
  replace('C01',
    'Commit the completion and removal of its submitted draft together. Repeated Finish for the same practice ID returns the existing completion, never a duplicate. On acknowledged success open the completed record and focus **Practice completed**. If a newer note edit exists, remain in the editor and offer viewing the saved candidate separately.',
    'Finish synchronously captures the current note and enters a bounded pending state before dispatch. Keep its note field temporarily read-only, preserve its value, and explain **Finishing this practice…**; no newer note edit is accepted while that candidate is pending. Repeated activation is guarded. Pending in-app departure offers Wait here or Leave and check on return, never Discard or a cancellation promise; do not navigate a departed view when acknowledgement arrives. Commit the completion and retirement/removal of its submitted practice draft together. Repeated Finish for the same practice ID returns the existing completion, never a duplicate. On acknowledged success while still viewing this practice, open the completed record and focus **Practice completed**. On failure keep the unchanged note/draft, restore editing and offer Retry; after editing, a new candidate may be submitted only when the failed transaction is known not to have committed. Reload/re-entry reads authoritative completion/draft state before offering Finish again.',
    'Independent review finding 1: every reachable Finish state now has a next useful action and no stranded newer note.',
    'Required practice/note tasks remain; editing is paused only during Finish. Actual UI timing, failure and retry behavior remain untested.');
  replace('C02',
    'A stale revision rejects the change and preserves its draft:',
    'Each recovery draft has a non-reused identity and active/retired eligibility in the write authority. Only opening a new editor session registers a fresh active identity; autosave cannot recreate eligibility. Discard draft, Discard changes and route-departure Discard share one checked transition: retire that identity and remove its persisted recovery entry atomically, and invalidate scheduled callbacks. Every writer must check active eligibility at commit, including queued autosave and older tabs. Finish records completion and retires its submitted practice draft in the same transaction. Announce discard/close only after acknowledgement; failed retirement preserves text and context with **Changes were not discarded**, Retry discard and Keep editing. A genuinely memory-only, never-persisted draft can be retired locally without writing an unreadable authority. Global reset still invalidates its whole generation.\r\n\r\nA stale revision rejects the change and preserves its draft:',
    'Independent review finding 2 and ROOT-C1: ordinary discard needs an authority boundary beyond global reset.',
    'This is a written invariant; queued writers, failed retirement and recovery must still be exercised against an implementation.');
  replace('C01/C02-validation',
    'save A/edit B ordering; repeated Finish;',
    'ordinary Save A/edit B ordering; Finish read-only/pending/failure/retry and reload; repeated Finish; ordinary Discard with delayed/older-tab writers and failed retirement;',
    'Update future acceptance to match the chosen bounded Finish and per-draft retirement contracts.',
    'Future verification only.');
  replace('evidence-note',
    'Performed: selective frozen-source reading, requirement-to-section mapping and written consistency reconciliation.',
    'During initial generation, performed: selective frozen-source reading, requirement-to-section mapping and written consistency reconciliation. This corrected handoff also includes a subsequent independent document review and root correction pass; the first draft, review and exact correction records are preserved separately.',
    'Keep generation evidence distinct from later review/correction history.',
    'No new runtime evidence is implied.');
}
if (name === 'storefront') {
  replace('S02',
    'with payload schema v1, cart revision, line IDs, quantities, and acknowledged revision.',
    'with payload schema v1, a non-reused store generation, cart revision, line IDs, quantities, and acknowledged generation/revision.',
    'Independent R2 and ROOT-S2: make saved-cart replacement a distinct writer authority.',
    'Proposed local data contract, not a verified IndexedDB implementation.');
  replace('S02',
    'A transaction reads the expected revision, compares, validates, and writes the next revision atomically. A completion acknowledges only its snapshot; later edits remain unsaved.',
    'A transaction reads the expected generation/revision, compares both, validates, and writes the next revision atomically. A completion acknowledges only its submitted snapshot in the still-active generation; later edits remain unsaved and a retired-generation acknowledgement cannot clean the current draft.',
    'Independent R2: every writer and acknowledgement participates in the replacement boundary.',
    'Actual transaction/acknowledgement races remain future checks.');
  replace('S02',
    'it must successfully complete before persistence is restored.',
    'it must atomically install a fresh, non-reused generation before persistence is restored. Every queued save, old-tab write and purchased-snapshot clearing checks active generation/revision. Reset invalidates undispatched old-generation work; delayed writes/acknowledgements cannot restore or clean the replacement. Keep an old tab\'s intent separate for explicit comparison against current authority, never automatic replay. Failed reset keeps the prior quarantined authority and temporary draft, reports failure and does not activate a fresh generation.',
    'Independent R2: explicit reset success alone does not rule out revision reuse/old writers.',
    'No real reset or multi-tab storage trace was executed.');
  replace('S01',
    'Ignore stale quote responses for changed revisions.',
    'Each quote refresh also has a local request generation; commit only the still-current request for the unchanged cart revision. Ignore obsolete request completions even when the cart revision is the same. Contracted quote version/freshness and explicit acceptance still govern commercial authority; request arrival order is not service truth.',
    'Independent R1: resolve overlapping same-cart quote refreshes alongside checkout evidence.',
    'Local request eligibility does not establish actual service freshness.');
  replace('S01',
    'Session deduplication must not be represented as duplicate-payment prevention.',
    'Session deduplication must not be represented as duplicate-payment prevention. The contract must also supply authoritative observation ordering/finality and hosted-URL validity/replacement semantics before launch. Retain permitted evidence history per action, correlating late creation replies and lookups to the original payload. Apply an observation only under those contracted ordering rules: proven older progress cannot replace newer confirmed evidence or a valid resume target. Arrival order and client clocks are not service authority. If matching observations conflict and cannot be ordered, preserve confirmed history, expose the unresolved inconsistency, and reconcile authoritatively while keeping overlapping effects and any disputed resume URL unavailable. A failed lookup preserves earlier evidence; successful stale or contradictory lookup is not exempt from these rules.',
    'Independent R1 and ROOT-S1: action identity and lookup failure policy do not define late successful evidence merging.',
    'Ordering, finality, URL validity and contradiction recovery remain real service-owner gates; this proposes no fabricated guarantee.');
  replace('S01/S02-validation',
    'storage denial/quota/invalid/newer data, reload and tab conflicts;',
    'storage denial/quota/invalid/newer data, reload and tab conflicts; reset against queued saves/old tabs/late acknowledgements;',
    'Align future validation with the reset invariant.',
    'Future verification only.');
  replace('S01/S02-validation',
    'variant/quote stale completions;',
    'variant/quote stale completions including overlapping same-revision reads; late checkout creation/lookup success, unorderable contradiction and obsolete hosted URLs;',
    'Align future validation with successful late-evidence reconciliation.',
    'Future verification only.');
  replace('E01',
    'Performed: selective frozen-source reading, candidate comparison, document-level requirement/state reconciliation, and byte identity check for the delivered two design copies. No separate review workflow, UI, service request, browser, keyboard, screen reader, font, network/performance or usability test was run.',
    'During initial generation, performed: selective frozen-source reading, candidate comparison, document-level requirement/state reconciliation, and byte identity check for the delivered two design copies. A subsequent independent document review and root correction pass produced this corrected handoff; the first draft, review and exact corrections are preserved separately. No UI, service request, browser, keyboard, screen reader, font, network/performance or usability test was run.',
    'Final static follow-up P3: the initial-generation no-review statement must not deny the later documented review.',
    'Reporting correction only; no added product behavior or runtime evidence.');
}
const hash = value => createHash('sha256').update(value).digest('hex');
await writeFile(path.join(folder, 'design.md'), text);
await writeFile(path.join(folder, 'corrections.json'), JSON.stringify({ date: '2026-10-20', evidenceLevel: 'Root adjudication and written contract correction only',
  firstDraftSHA256: hash(original), correctedDesignSHA256: hash(text), changes }, null, 2) + '\n');
console.log(JSON.stringify({ case: name, changes: changes.length, firstDraftSHA256: hash(original), correctedDesignSHA256: hash(text) }));
