# Relay Desk design

> Reviewed example: originally prepared with the initial updated preparation skill, then explicitly reviewed and corrected at document level on 2026-10-17. The immutable first draft and correction evidence accompany this example. No runtime, service, accessibility or usability result is implied.

Status: proposed design, 2026-10-17; document exercise only. Theme: Precision `0.1.0-draft`. Source: frozen Interface Atlas text snapshot dated 2026-10-17; the updated skill and guidance are not represented as committed HEAD. All product rules below are local proposals unless identified as supplied facts or inherited Atlas values.

## Requirements, evidence and direction

The supplied fictional brief describes an English, responsive internal workspace for a small facilities support team. Operators scan maintenance requests, inspect assistant suggestions to change queue/assignee, adjust or reject proposals, confirm reviewed changes, follow work, request cancellation where supported, and return to unresolved items. No real research, records, service contract, identity, authority, persistence, assets, fonts or stack is supplied. No implementation or service success is claimed.

The primary outcome is a defensible decision on a particular request, followed by a truthful account of its result. Precision fits repeated list/detail work through neutral layers, aligned metadata, explicit states and restrained blue actions. Retain its palette, flat geometry and comfortable action targets; use more generous reading space for evidence than its compact metadata. This is a fit hypothesis, not measured usability. No chart, conversational interface, separate approval inbox, decorative effect, animation runtime, agent framework or model is selected.

## Tasks, content and information order

The Requests page contains a heading, connection/freshness summary, attention filter, status filter, result count and request list. Attention choices are **All requests** and **Needs attention**; request-status choices are **All statuses** plus statuses supplied by the service mapping. Do not invent a production status taxonomy. Attention includes a decision awaiting review, conflicting revisions, rejected commands requiring correction, partial outcomes, and unknown outcomes needing reconciliation. Running work with no operator decision stays outside Needs attention. Filters combine with AND; **Clear filters** restores both defaults.

Each list item shows request reference, subject, location when known, current queue and assignee, request status, a separate attention label, latest confirmed operation state, and last observed time. Provide **Inspect request [reference]** as an explicit link; do not make an entire row an ambiguous action. Selected items have a marker and “Selected” text. Initially order attention items first, then latest request update, then reference for ties. Freeze the visible order during interaction; offer **Refresh list order** when incoming changes affect it. Preserve the open request even when it no longer matches filters, with “This request is outside the current filters.”

Details read in this order: reference/subject/location; current authoritative queue, assignee and request status with freshness; attention and last confirmed work; proposed changes; reasons and evidence; review controls; persistent activity history. Current and proposed values are labeled separately. Evidence entries identify the source record, relevant excerpt or fact, author/system, observation time and availability. Reasons are labeled **Assistant explanation**, distinct from confirmed service results. Missing evidence says **Evidence unavailable**; unsupported claims remain visible as limitations and cannot become fabricated confidence scores. Optional long excerpts use native disclosures; material consequences and missing evidence remain visible before confirmation.

## Proposal review and changing intent

Proposal content includes proposal ID/version, upstream request revision, generated time, target request, acting integration identity when known, and field-level current → proposed values. The only proposed effects are queue and assignee changes; show any integration-defined notifications or secondary effects before enablement.

Use an inline editor with labeled native **Queue** and **Assignee** selects, populated only from authorized service options. Each change has an **Include queue change** or **Include assignee change** checkbox; unchecked means leave that field unchanged. Retain excluded choices as local draft values without dispatching them. If no change remains, show “Choose at least one change to review.” Eligibility and queue/assignee compatibility require service rules; a failed eligibility lookup is “Unable to check eligibility,” not an invalid assignee.

**Review changes** validates included fields and opens an inline review summary with the exact diff, reasons, evidence limits and effects. It captures an immutable candidate: request ID/revision, proposal ID/version, local draft version and included values. **Edit proposal** returns focus to the first included field. Any edit invalidates the candidate and requires Review changes again. **Reject proposal** opens an inline confirmation naming the proposal version; **Keep proposal** returns to review and **Reject this proposal** records that decision only through a supported decision store. Retain the proposal and use the rejection outcome distinctions below; a transport failure alone cannot establish non-application. Rejection does not cancel previously dispatched work.

**Persisted rejection:** Treat Reject as a version-bound decision action with actor/authority, immutable proposal ID/version, stable decision identity and its own attempt/outcome record. Before dispatch, meet the same acknowledged recovery-identity or independently authorized discovery gate as other durable effects. Show **Rejection requested** while pending. A lost reply, timeout or unknown application yields **Rejection outcome unknown**, retaining its identity and supported lookup; reserve **Rejection not recorded** for authoritative evidence of non-application or a proven pre-dispatch failure. While rejection is pending/unknown, block conflicting Confirm and repeated Reject for that proposal across entry points and tabs through the service contract. A confirmed rejection retires the reviewed candidate, updates attention/history and prevents confirmation of that version. A proven non-application can return to review only after current authority/revisions are rechecked. Reopening a rejected proposal requires an explicit newly eligible review path supported by the owner; local navigation cannot revive it. Rejection never cancels previously dispatched execution. Decision/execution owners must define conflict ordering, atomic eligibility, duplicate scope/retention and recovery before enabling persisted rejection or conflicting confirmation.

An incoming proposal or request revision never silently replaces editor values. Show **Request changed since review** or **A newer proposal is available**, preserve the draft, and disable confirmation. **Compare changes** displays old/current/requested values together. The operator can retain chosen draft fields or use new values, then revalidate and review against the latest revision. A change arriving during this comparison triggers another check. No blind replay, timestamp lock or local revision counter substitutes for an atomic service precondition.

**Confirm queue and assignee changes** adapts its label to included fields. At activation, check that draft, proposal, request revision and authority still match the reviewed candidate. A rejected precondition returns to comparison without applying the stale candidate. Do not equate the operator's confirmation with service acceptance or completion. After dispatch, the submitted snapshot is immutable. Further edits may form a separate draft, but overlapping queue/assignee effects cannot be confirmed until the unresolved action is reconciled. A new action ID cannot make overlapping effects safe.

## State ownership and acknowledgement

| State | Proposed owner and boundary | Display rule |
| --- | --- | --- |
| Request and eligible options | Authorized service-desk integration | Last confirmed values, revision and observation time; cached values become stale |
| Assistant proposal | Proposal provider; versioned | Explanation and evidence are suggestions, never execution proof |
| Edited scope | Operator draft | Dirty against its acknowledged draft baseline; no assumed reload durability |
| Reviewed candidate | Immutable local snapshot | Invalidated by relevant changes; separate from later draft edits |
| Decision/action record | Authorized decision/execution service | Exact actor, scope, proposal version, request revision and stable action identity |
| Execution outcome | Authoritative service evidence | Separate from command acknowledgement and connection state |
| Filters/selection/scroll | URL for non-sensitive filters/reference; page memory for scroll/focus | Back restores context; URL is not a draft or outcome store |
| Appearance | Optional browser preference | Failed preference storage leaves a usable current-session choice |

Show four independent dimensions beside the operation: **Execution** (not started, queued, running, completed, stopped, failed or partial only when established); **Attention** (review, resolve conflict, check outcome or none); **Command** (confirmation requested, accepted, cancellation requested or unknown); **Connection** (current, reconnecting, disconnected/stale). Every state uses text, with optional supplementary icon. “Completed” means contract-defined effect evidence, not an HTTP reply or a closed review panel.

If a durable draft save is later supported, acknowledge only its immutable saved candidate. Save A succeeding after edit B must leave B dirty and visible. Serialize draft saves and reject stale completions. Keep values on save failure. No autosave or “Saved” claim is enabled until the owner specifies storage, successful completion boundary, retention, scope across browsers/devices, conflict handling and loss limits. A temporary in-memory prototype must display “Draft changes are kept only while this page remains open.”

## Dispatch, uncertainty, cancellation and return

Live dispatch requires a minimal recovery record acknowledged before sending, or independently authorized service discovery that survives a lost reply. Record action identity, request/proposal revisions, minimal submitted scope, attempt correlation and any returned operation ID without unnecessary request content. Failure to retain identity blocks dispatch unless a separately approved reduced capability replaces the recovery promise. A prepared local record proves neither delivery nor non-delivery.

On confirm, guard duplicate activation across pointer, keyboard and implicit submission, retain focus and show **Confirmation requested — waiting for service status**. A matching receipt produces **Received; processing is pending**. Final evidence lists actual queue/assignee values and effect reference. Authoritative rejection states whether nothing changed or which effects occurred; a partial result lists applied and unapplied fields with their evidence. There is no universal Undo: reversing a completed change requires a fresh scoped proposal and supported authority.

A proposed local wait threshold of 10 seconds changes an active waiting indicator to **Taking longer than expected. The outcome is not yet confirmed.** It never proves failure. After transport loss, show **We could not confirm this change. Check status before confirming again**, retaining the original scope, reference and last checked time. **Check status** appears only when authorized lookup exists. A lookup failure says **Status check failed; the previous outcome is still unresolved**. Do not erase prior confirmed results. No automatic effect retry is allowed without a documented duplicate-protection contract covering payload equality, key retention, downstream effects and attempt limits; safe lookup retries use separate service-defined pacing.

**Request cancellation** appears only for supported stages. Before activation explain its scope: “Ask the service to stop remaining work. Changes already applied may remain.” The pending command is **Cancellation requested** while the last confirmed execution may remain **Running**. Lost cancellation acknowledgement becomes **Cancellation outcome unknown**; recover the cancellation action and original operation together. If completion wins the race, display the completed effect and **Cancellation arrived after completion** only when established. A confirmed stop lists any earlier applied effects. Stopping local observation is a separate **Stop live updates** control explaining that work continues; **Resume updates** performs reconciliation. Neither is called cancellation.

Background updates preserve focus and reading position. On hidden pages, pause observation where feasible; reconnect/return performs an authorized reconciliation before repeat effects become available. Correlate events to action/attempt/proposal and apply service version/ordering rules. An older observation cannot regress a terminal result. Contradictory unordered evidence shows **Conflicting status information — outcome unresolved** and requires authoritative reconciliation, not an invented final state.

Leaving a clean request preserves filters/selection. Leaving a dirty editor opens one named confirmation dialog: “Leave this request? Your unsaved proposal edits will be lost.” Initial focus is **Keep editing**; Escape also keeps editing. **Discard edits and leave** completes navigation. Return focus to the prior control when staying. Do not stack dialogs. Browser close/reload prompts are supplemental and unreliable; never promise interception. Leaving pending work does not stop it.

On re-entry, show a concise summary of retained draft, submitted scope, latest confirmed outcome, elapsed observation gap and next action. Recover and authorize unresolved action lookup before enabling another overlapping confirmation. Distinguish loading, no available record, unavailable access, invalid/unsupported recovery record and expired history. Read errors never overwrite recovery records with empty defaults. Missing/expired records do not mean nothing happened. If identity or lookup cannot be recovered, say **This outcome cannot be confirmed here** and keep repeat dispatch unavailable. No support link or successful recovery route is invented.

## Capability gates and open owner inputs

All owners below are proposed responsibilities, not identified people. Until the applicable contract and verification exist, provide a labeled non-executing review prototype; confirmation, persisted rejection, status lookup and cancellation show their unmet requirement alongside unavailable controls.

| Owner | Required input before enablement |
| --- | --- |
| Product and security owners | Actual operator identity/permissions, decision authority, approval policy, authorized evidence visibility and secondary effects |
| Proposal provider | Stable IDs/versions, evidence provenance, freshness/expiry and revision invalidation rules |
| Integration owner | Atomic request revision preconditions; exact queue/assignee semantics, eligible options, partial application and resulting references |
| Execution owner | Stable action and attempt correlation, service duplicate protection/key scope/retention/payload mismatch behavior, authoritative terminal states and event ordering |
| Recovery owner | Authorized lookup/discovery independent of lost replies, consistency lag, missing/expired meanings, operation history retention and a real reconciliation route |
| Cancellation owner | Supported stages, acknowledgement versus terminal stop, races, applied effects, irreversibility and cancellation lookup |
| Application owner | Durable recovery/draft mechanism, acknowledgement boundary, concurrency, schema, retention/loss policy, secure storage and failure behavior |
| Product/service owners | Observation cadence/backoff, server delays, reconnect limits and escalation route; supported browsers and assistive-technology coverage |

Unknown duplicate protection prevents retry; unknown recovery prevents a reload-recovery promise; unknown cancellation prevents a stop promise. These are capability gates for the desired integration, not assumptions supplied by visual design.

## Visual contract

Retain these Precision values. Use only the listed opaque pairings; do not invent translucent or colored badge backgrounds.

| Role | Light | Dark |
| --- | --- | --- |
| Page / panel / supporting surface | `#f6f8fb` / `#ffffff` / `#eef2f6` | `#0c121c` / `#141e2c` / `#1c2a3d` |
| Text / muted text | `#17212f` / `#526174` | `#e9eff7` / `#aab9cc` |
| Action / hover / on-action | `#175cd3` / `#1247a5` / `#ffffff` | `#88b7ff` / `#a6c9ff` / `#102443` |
| Control border / decorative divider | `#7a8899` / `#d6dee8` | `#7789a3` / `#33445b` |
| Selection / focus | `#dce9ff` / `#175cd3` | `#26456d` / `#b9d2ff` |
| Success / warning / danger / information text | `#216e43` / `#765100` / `#b12a3c` / `#234f82` | `#94d3a2` / `#f2cd84` / `#ffb2bd` / `#aacdff` |

Text and muted text render on page/panel/surface or selection; semantic text only on page/panel/surface. On-action is exclusive to action/hover fills. Blue indicates actions and selection, not permission or safety. Neutral secondary buttons use text and control border. Errors use danger text plus an explicit message; unknown/stale uses warning; confirmed completed effects use success. Decorative dividers cannot be the only control boundary. Prose links are underlined. Retain a 3px focus outline with 3px offset on neutral surroundings; use system Highlight in forced colors and prevent clipping.

Theme families are IBM Plex Sans 400/600 and IBM Plex Mono 400, with local system sans-serif/monospace fallbacks until a licensed package is chosen. No font download is presumed. Use 32/38.4px page headings, 24/31.2px detail headings, 20/26px section headings (project adaptation), 16/25.6px reading text and controls, and 14/21px metadata. Sentence case, normal body tracking, 65-character reading measure, tabular timestamps, wrapping references and untruncated essential status/errors preserve scanability.

Use the inherited 4/8/12/16/24/32/48/64px spacing scale, 4px corners, 1px rules and no resting shadows. Metadata rows use 16px padding; evidence/review sections use 24px. Labels sit 8px above controls; related controls have 12px gaps, sections 24px. Targets remain at least 44×44px. Selected rows combine selection fill with marker/text. Hover adds action-hover or surface emphasis; pressed states retain boundaries. Pending actions remain focusable with guarded `aria-disabled` and an adjacent explanation; styling alone must not suppress activation. Empty list: **No requests available**; filtered empty: **No matching requests** with Clear filters; loading and read failure retain context with distinct text and a supported retry.

## Responsive layout, focus and appearance

Maximum content width is 1280px with 16px narrow and 24px wide gutters. At a proposed 960px content-fit breakpoint, show list (minimum 320px) and detail (minimum 520px) separated by 24px; list precedes detail in reading order. Below it, show a single logical list or detail route with **Back to requests** before the detail title. Stack filters and field diffs before either becomes cramped. Validate the breakpoint against long real content; no essential field disappears on phone. General content reflows at 320 CSS px; only an evidence table, if unavoidable, may scroll inside its own named focusable region. No fixed footer or sticky block may cover focused controls or an onscreen keyboard.

Use header/main landmarks and a skip link. Inspect navigates to the detail heading and updates the document title; Back restores list filters, scroll and originating Inspect link. If hidden by filters, focus the attention filter and explain why; if removed, focus the result heading. Browser Back/Forward restores the existing history entry without duplicate routes or competing scroll restoration. Deep links load the identified request, or show an accessible unavailable state and Back to requests. Native links/buttons/selects/checkboxes/disclosures follow normal keyboard behavior; no custom grid navigation is needed. Dialog focus is contained with a visible exit and logical return. Validation runs on Review/Confirm through one custom feedback owner, with native interactive blocking suppressed where necessary to avoid competing focus; focus a linked error summary, associate field messages, preserve values, and clear corrected errors. Permission/service failures are separate from field errors.

Announce meaningful decision, error and outcome changes once through a polite status region; routine polls do not speak or move focus. Persistent inline history preserves important feedback. Offer a labeled **Appearance** select: **Light**, **Dark**, **System** (default). Apply saved choice before paint where supported; System follows live OS changes. Storage/init failure falls back to System without blocking tasks. Reduced-motion and ordinary modes both use immediate state changes, textual waiting feedback and no loops, animated reordering or essential transitions. Check zoom, text resizing, forced colors and actual font fallback before release.

Additional required implementation trace after document review: Exercise reject lost reply, Reject/Confirm overlap, confirmed-rejection candidate retirement and re-entry with unresolved rejection.

## Validation and source record

Performed: sequential inspection of the supplied brief, Atlas catalog, Precision README/design/sources, template and task-relevant knowledge through the frozen reader; document reconciliation of proposal/edit/dispatch/recovery distinctions. No rendered, keyboard, assistive-technology, user, service or integration check was performed. Inherited Precision opaque contrast calculations are source evidence only, not Relay Desk measurements or accessibility validation.

Future evidence: observe intended operators scanning, identifying a decision versus running work, comparing evidence, excluding one change, rejecting, confirming and returning after interruption. Ask whether current/proposed values and uncertainty are understood without coaching; record sample/context limits. In implementation, trace edit B during save A, upstream change during review/dispatch, double activation, lost confirm/cancel replies, partial effects, completion/cancel races, unordered events, expired lookup, unavailable storage and reload/reconnect. Verify preserved data, blocked repeats, accessible next actions and actual service evidence in every case. Test phone/desktop, 320px reflow, 200% text, 400% zoom, keyboard and selected screen-reader/browser combinations in all appearances. No performance budget or service latency guarantee is invented; measure representative content when a stack exists.

Precision is an original Interface Atlas synthesis by **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. Referenced concepts credit **IBM/Carbon contributors** ([color](https://www.carbondesignsystem.com/building-blocks/foundations/color/overview), [type](https://www.carbondesignsystem.com/building-blocks/foundations/typography/type-sets), [grid](https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview)) and **GitHub/Primer contributors** ([layout](https://primer.style/product/getting-started/foundations/layout/), [focus](https://primer.style/accessibility/design-guidance/focus-management/), [agent accessibility](https://primer.style/accessibility/patterns/copilot-accessibility-practices/)); website observations dated 2026-10-13. Carbon software pin `c9b1f79128df93d79e7a65ced3ad1bed5709c7cc` is Apache-2.0; Primer React pin `7f5303d803986887187d86dcebaeda22a4dc6823` is MIT, copyright 2018 GitHub, Inc. No upstream software/assets were copied. IBM Plex credits **IBM, Mike Abbink and Bold Monday**, including Paul van der Laan and Pieter van Rosmalen; [Plex pin](https://github.com/IBM/plex/tree/763c36ef9117782905ae010056dfbe8fd2653a25) is OFL-1.1. Actual font packaging must preserve its full contributor/license records.

Atlas UX methods credit [Ghaida Zahran](https://github.com/ghaida/intent/tree/3fc38dff381ce0e4dec8f52c97c3e37abd95e10e) (CC0, journeys/re-entry); [Jakub Krehel](https://github.com/jakubkrehel/skills/tree/4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63) (MIT, layout/type/color/writing/accessibility); [Julien Thibeaut](https://github.com/ibelick/ui-skills/tree/f18d13077d6e3841821ea0a36526c0fd44a570b5) (MIT, governing evidence and semantics); [Mohit Aggarwal](https://github.com/mohitagw15856/pm-claude-skills/tree/921e015321cdcf7c48ad85f40eeaf5ba68c89433) and [Burhan Sebin](https://github.com/seb1n/awesome-ai-agent-skills/tree/75865a5d037a4cdaa7f409a4ec14ab9b0292920b) (MIT, scoped human decisions). Human control references [Microsoft HAX](https://www.microsoft.com/en-us/haxtoolkit/library/). Remote-outcome guidance credits RFC 9110 editors Roy Fielding, Mark Nottingham and Julian Reschke and WHATWG Fetch author Anne van Kesteren; state guidance credits W3C IndexedDB editor Steve Becker and WHATWG HTML/Storage contributors; forms/accessibility reference W3C WAI/APG and GOV.UK. These are inherited references, not newly browsed sources or endorsers. This document adapts questions into local rules, not complete upstream workflows.

Atlas publishing terms remain undecided. No reference link licenses branding, documentation, icons or fonts; inspect exact artifact terms before incorporation. Retain these method adaptation notices with redistributed substantial adaptations: Copyright (c) 2026 Jakub Krehel; Copyright (c) 2026 Julien Thibeaut; Copyright (c) 2026 Mohit Aggarwal; Copyright (c) 2026 Burhan Sebin. Each is under MIT:

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Frozen-file SHA-256 records below identify selected dependencies instead of implying that HEAD contains the updated workflow. They are provenance, not testing evidence.

| Frozen Atlas path | SHA-256 |
| --- | --- |
| `skills/prepare-frontend-design/SKILL.md` | `71804c65b66564565c65e8485f4239c6d7c24709070c08ce9c92f0b74f9477f3` |
| `themes/precision/design.md` | `07599482c9917b76e455e4aa576a8d09aed7b609810595a92259b810b4876831` |
| `themes/precision/sources.md` | `d90ceb2013b1f9a9227fee9df00b168289c63786ce6a3d5d06a187f995796b72` |
| `knowledge/ui-ux-design.md` | `ef7048339a733068b3f2241ddcacce7cc682cb65c748f723000465fc883f5152` |
| `knowledge/accessibility-and-responsive.md` | `fcde6775c47577cc3626e38cf1512755fd56b92ca6cb1312990ca92562da266d` |
| `knowledge/agent-experience.md` | `537070f888f79c8b9d31abf3f9b5d3c27925b754f2ee7573bafdc94f24cd4f91` |
| `knowledge/forms-and-navigation.md` | `870844c51547c2083a5b33d97048c7fdae1bdd7850a214ae375bdc3940e93b5b` |
| `knowledge/state-and-recovery.md` | `ddd338c88cb26e5001c6209e91d4d3b53089912ac2bee68a9c3a95ba5eda7c51` |
| `knowledge/uncertain-outcomes.md` | `7977ea92734b0457dee69f041b22f88061970c83070fb85976a56e119736cb10` |
| `references/skill-adaptations.md` | `02a8801225a921eab3cb081b933df803de06118ec6c38b78fdd01968b364e1fd` |
