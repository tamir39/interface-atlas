# Agent Experience and control-contract UI trial

**Result:** the existing preparation, implementation and opt-in review workflows cover this bounded task. No additional Agent Experience skill is justified by this trial. The useful additions are a corrected knowledge chapter, a concrete project handoff and an implemented local example with independent evidence.

The trial began 2026-11-05. Per-run completion timestamps and exact source identities remain in the evidence. At the recorded evaluation freeze, work was local and uncommitted and the installed global skills were pinned to Atlas `665782f72c8f30eb5357f75fe643d5a43863fc80`. Pages integration and release follow that evaluation; the [trial entry](../README.md) supplies its live route.

## What changed

Local dev was fast-forwarded to the published release while preserving the existing research drafts. A retained stash backs up the pre-sync work. The example and knowledge indexes were integrated with the newer selective-loading structure; no unrelated research was discarded.

The [Agent Experience chapter](../../../knowledge/agent-experience.md) is now `0.3-draft for review`. Independent draft review found two bounded gaps:

- An unknown decision could appear to freeze every other effect. The chapter now gates effects with overlapping consequences and keeps unrelated supported work available.
- The historical contract did not fully specify a lost cancellation reply. Shared guidance now requires command-specific evidence/repeat rules: refreshing run activity does not establish cancellation receipt, and publish lookup does not imply cancellation lookup. The new [handoff](../handoff.md) resolves this fixture's lost-reply path without rewriting the historical contract.

The [original desk-trial archive](../../agent-control-evaluation/README.md), including its historical contract and reading records, remains unchanged. [Draft review](draft-review.json) and [source verification](source-verification.json) retain the reviewed inputs and limits.

## The implemented example

[Harbor Desk](../preview/index.html) is original HTML/CSS/JavaScript using selected Precision rules and system fonts, with light/dark/system appearance. It implements three fictional room-change requests and separates four operator questions: execution observation, human attention, control-command outcome and connection freshness.

The interface makes immutable proposal/version and expected session revision inspectable beside the consequence of publishing. An unresolved publish keeps its original identity and blocks a new overlapping publish while another request remains usable. Corrections preserve editable text, submitted scope, known receipt and application evidence independently. Best-effort cancellation retains requested/acknowledged/task-closed observations alongside any later published effect. It offers no stopped or rollback guarantee.

Unsent text is explicitly memory-only. Deliberately saved/submitted fixture snapshots are retained on this browser. Dispatch requires acknowledged local retention; corrupt or unavailable storage cannot silently become recovered history. Reset clears simulation data, not a real operation. Fixture controls are separate from operator actions; no real publishing, agent, recipient delivery or backend exists.

## Checks and corrections

The final run completed **26 outcome/layout checks and two presentation captures**, all against one unchanged HTML/CSS/JavaScript freeze. These are scoped cases, not an assertion count or usability score. [Browser evidence](browser-summary.json) records every case, source hash, network rule, diagnostic and limit; [independent review](ui-review.json) approves the bounded final trial with no actionable findings remaining.

| Evidence | Observed result |
| --- | --- |
| Proposal, authority and unknown outcomes | Version/permission gates, original action recovery and independent requests checked |
| Corrections and cancellation | Newer text preserved; receipt/application distinguished; cancellation history coexists with later effect |
| Navigation and retention | Keep/discard/save focus paths, reload, corrupt/unavailable storage and declared recovery boundary checked |
| Seven layout contexts | 33 visible controls each; 231 center-hit/horizontal-bound measurements passed |
| Pressed primary action | After 250ms, pointer and Space: 8.50:1 light, 9.16:1 dark |
| Runtime/network | No final page/console errors; no external/API HTTP request observed or forwarded |
| Source | Final preview hashes unchanged before/after; JavaScript syntax and repository whitespace checks passed |

Three demonstrated UI defects were corrected and retested:

1. Saving a revised draft while an inline dirty-navigation choice was open left stale Keep/Discard state. Success now cancels that queued navigation and focuses the revised comparison; failure preserves the working text.
2. A generic pressed background overrode the primary action's paired colors. Settled contrast had fallen to 1.225:1 light and 1.590:1 dark. A scoped active color pair fixes pointer and keyboard states without changing layout or motion.
3. A later lost-reply event erased an already known correction receipt. The acknowledged receipt now remains established while application can remain unconfirmed. Existing applied-evidence preservation remains intact.

Initial cancellation copy was also clarified. Superseded harness assumptions, pre-transition measurements and failed-state diagnostics are distinguished from final evidence. Earlier complete source versions are not claimed to be independently replayable merely because their hashes were recorded.

Root inspected the two final presentation images; the independent reviewer also inspected representative unknown, correction, cancellation and forced-color states. [Desktop](browser/desktop-light.png) and [mobile dark](browser/mobile-dark.png) show the actual final interface. Center-hit measurements do not inspect every text pixel. Chromium fixture behavior does not establish real-service semantics, assistive-technology announcements, participant comprehension or full accessibility conformance.

## Skill and reading decision

| Existing workflow | Role in this task |
| --- | --- |
| prepare-frontend-design | Bounded brief/control handoff, with explicit fixture facts and unsupported service capabilities |
| implement-frontend-ui + better-ui | Existing direction/tokens, local behavior, selected Agent Experience/P0 guidance and rendered verification |
| review-frontend-design | Independent task/evidence traces, counterexamples, pixel inspection and bounded corrections |

A new skill would duplicate this orchestration without supplying a distinct demonstrated workflow. Keep Agent Experience as selectively loaded domain knowledge and resolve its rules into each project's handoff. Reconsider a dedicated skill only when repeated real projects expose a separate capability the current workflows cannot express cleanly.

The [implementation read report](../implementation-report.md) records selected source windows and actual initial/final draft identities. No theme/style/pattern catalog, companion skill-family sweep or full research/license ledger was required by implementation. The provenance audit was a separate, deliberate verification task. Review/browser reading logs retain duplicated or truncated extraction overhead rather than presenting it as eliminated cost. These records are not billed-token measurements. Ordinary implementation does not require invoking all three stages or reopening this trial.

## Credits, preservation and remaining gates

This UI, fixtures, corrections and evaluation are original Atlas work by Tamir (Phi Vuong Tuong Tam), with Codex AI assistance. [Credits](../credits.md) distinguish Precision/Atlas authorship, IBM/Carbon and GitHub/Primer concepts, the installed better-ui identity and Jakub Krehel's separately pinned upstream/retained MIT notice. MCP, HAX, historical PAIR, W3C and Primer facts/creators/terms are retained in the source records. No upstream runtime, code, artwork, font download or source prose was imported into the UI. The targeted source audit found no factual or notice blocker in its reviewed scope; it is not permission for unrelated artifact reuse.

[Preservation checks](preservation.json) confirm the 21 original untracked research/archive files, all 18 recorded portfolio working files, installed Atlas files and better-ui files remain unchanged. Portfolio HEAD and its uncommitted status are unchanged. Shared chapter/index changes are intentional authored revisions, backed by the retained pre-sync stash. At evaluation completion, dev was synced to `665782f`; the evaluation itself added no commit, push, global installation update or dedicated skill. Subsequent publication does not rewrite those historical preservation results.

Production adoption still needs an actual service contract and integration evidence for authority, operation identity, retention, ordering, lookup and cancellation. Operator comprehension and supported screen-reader/browser testing remain future work. The current result is a reviewable frontend knowledge/example addition, not a production agent control system.
