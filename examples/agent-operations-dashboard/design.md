# Agent operations dashboard design

## Status, project assumptions, and provenance

**Status: draft.** This sample assumes an operator-facing application for inspecting agent runs, reviewing backend-requested decisions, reading observed events and tool results, and issuing supported run commands. The shell contains **Runs, Decisions, Agents, and Settings**. It does not assume that every backend supports approval, cancellation, pause, resume, or retry. Interface behavior must follow the capabilities and event semantics the actual backend exposes.

Theme: **Editorial** (`editorial`), Atlas revision **0.1.0-draft**, reviewed **2026-10-13**. Adapt it for sustained operational work: readable information, stable lists, explicit state, and restrained motion. Expressive styling must not obscure the run's last confirmed condition or the operator's next available action.

The seed palette and font families were inspected in Tamir's local Tamir39Portfolio source snapshot. Dashboard geometry, type sizing, functional borders, additional status colors, layout, and operational flows are original Interface Atlas proposals. This document specifies intended UI behavior; it does not establish backend guarantees, execution permissions, or completed validation.

## Color tokens and appearance

Use semantic roles and keep status meanings distinct from brand accents. The first eleven rows retain the Editorial seed; the final four are proposed dashboard additions.

| Role | Light | Dark | Origin |
|---|---|---|---|
| Page | `#fbf8f5` | `#19151e` | Seed |
| Surface | `#eee8f2` | `#2d2536` | Seed |
| Panel | `#ffffff` | `#231e2b` | Seed |
| Text | `#332b49` | `#f4ede5` | Seed |
| Secondary text | `#655c7e` | `#c2b2ce` | Seed |
| Decorative accent | `#75618d` | `#c7abe8` | Seed |
| Action | `#493b61` | `#c7abe8` | Seed |
| Action hover | `#65527e` | `#dbc4f3` | Seed |
| Text on action | `#ffffff` | `#24182f` | Seed |
| Subtle divider | `#d8cfe0` | `#50445e` | Seed |
| Success | `#346348` | `#9ecead` | Seed |
| Functional control border | `#8c7d9b` | `#9c87af` | Atlas proposal |
| Warning text and indicator | `#7a4b12` | `#f0c27b` | Atlas proposal |
| Failure text and indicator | `#9e3349` | `#ffb4c1` | Atlas proposal |
| Informational text and indicator | `#3d587f` | `#a8c9ff` | Atlas proposal |

Status tokens are foreground and indicator proposals, not an instruction to fill a button with that color. Any status background or additional on-color text needs its own specified pairing and contrast check. Every status has a text label and, where useful, a distinct icon; color never carries the meaning alone. Subtle dividers are decorative separators, while recognizable control boundaries use the functional-border role.

Provide Light, Dark, and System preferences, resolved before the first painted frame. Preference failure must leave a readable default. Appearance changes preserve filters, selection, scroll position, and open detail context.

## Typography, spacing, and geometry

Use Manrope for navigation, tables, controls, and explanatory text. Use JetBrains Mono 400/500 for run IDs, timestamps, short technical values, and logs. DM Serif Display 400 is optional for a quiet overview title only; do not apply it to operational tables or decision controls. Load only selected styles, retain useful system fallbacks, and verify the actual languages before selecting font subsets.

The proposed dashboard scale is:

| Role | Size / line-height |
|---|---|
| Page heading | `28px / 36px` |
| Section heading | `20px / 28px` |
| Body and controls | `14px / 20px` |
| Supporting text | `13px / 18px` |
| Technical metadata and logs | `13px / 20px` |
| Optional serif overview title | `28px / 36px` |

Use semantic heading levels and a single H1. Important state and available actions must not depend on small supporting text.

Use a proposed 4px spacing base, with common steps `4/8/12/16/24/32/48px`. Cards use 12px radii, controls 8px radii, card padding 16px, and section gaps 24px. Use flat panels and visible borders; omit the portfolio's decorative shadows and pill controls. These changes are dashboard adaptations rather than seed geometry.

## Shell and responsive layout

Keep navigation, run filters, result count, and workspace context visible. The workspace has a proposed maximum width of 1600px. Filters have visible labels, expose their active values, and offer a clear reset action. Returning from a run detail retains the prior filters, selection, and scroll position.

- Below 768px, open run details on a dedicated page. Present run-list information in readable cards or a structured layout without forcing the whole page to scroll horizontally.
- From 768px to 1199px, use compact navigation and a full-width detail page or panel.
- At 1200px and above, support a split workspace with a stable run list and a readable detail pane.

Rows contain the run name, confirmed execution state, meaningful current activity, relevant timestamp, and a dedicated detail link. Keep any supported command controls separate from that link. The layout must not require clicking an unlabeled whole row.

Do not automatically reorder rows as live events arrive while the operator is reading. Offer “New updates available” and let the operator apply the updated ordering. A count of updates must reflect observed updates rather than an invented estimate.

## State model and evidence

Model the following dimensions separately. A run can be Running while attention is Awaiting approval, or show a cancellation request while its last confirmed execution state remains Running.

| Dimension | Display values | Meaning |
|---|---|---|
| Execution | Queued, Running, Waiting, Succeeded, Failed, Cancelled, Unknown | Last execution state confirmed by the backend; map only supported backend semantics |
| Attention | None, Needs input, Awaiting approval | An actionable attention condition actually reported by the backend |
| Pending command | None, Cancellation requested; other command labels only when supported | A submitted command awaiting acknowledgement; not a confirmed execution transition |
| Connection | Connected, Reconnecting, Disconnected | The connection's observed condition, independent of execution |

Show the last confirmed execution state and relevant event timestamp. Data freshness is a separate concern: show when information was last received and whether a refresh is pending, without treating connection recovery as proof that the underlying run is progressing.

Use Unknown when the available evidence cannot establish an execution condition; do not infer Failed from a disconnected stream. Do not fabricate completion percentages, costs, or estimated completion times. “3 of 8 steps completed” is permitted only when both the total and completed count are known. Distinguish an agent's statements from observed tool results, execution events, and confirmed artifacts.

## Decisions and commands

Show an approval decision only when the backend requests one. Present the exact proposed action, target, parameters or diff, scope, and relevant consequences. Use concrete controls such as “Approve action” and “Decline action,” attached to that proposal's identifier and version. If the proposal changes, require a new decision; an earlier approval must not silently authorize a changed action.

Approval records an operator decision, not successful execution. Declining an action does not mean the run has been cancelled. Keep a pending decision available in the Decisions view and run detail; do not reduce it to a disappearing toast.

Submitting cancellation displays **Cancellation requested** as a pending command until the backend confirms the result. Preserve the last confirmed execution state meanwhile, and handle late events without rewriting the audit history. Expose pause, resume, and retry only when backend capabilities support them. A retry creates or identifies a linked attempt rather than replacing the failed attempt; disclose uncertain prior side effects when that uncertainty is known. Do not promise safe replay or completion without backend evidence.

If a command fails or receives no acknowledgement, explain the current uncertainty and offer only supported recovery actions. Do not silently treat a timeout as either successful execution or confirmed failure.

## Logs, feedback, and copy

Provide log search, copy, and a Follow latest control. Stop following when the operator moves away to read older content, retain that reading position, show a count of newly received entries, and let the operator resume following. Batch incoming updates and load older history incrementally. If virtualization is needed, provide keyboard navigation and a structured alternative so that offscreen content remains inspectable.

Use concise, factual copy. These are illustrative messages with sample values, not real observations:

- “Connection interrupted. Showing events received through 14:32.”
- “Cancellation requested. Waiting for confirmation.”
- “Run failed: destination unavailable.” Follow with the relevant supported recovery action.
- “No runs match these filters.” Offer “Clear filters.”

Keep decision requests persistent and provide notification preferences. Announce important state or decision changes through appropriate live regions; do not announce every log line, steal focus, or move the reading position with each event. Avoid claiming success while a command remains pending.

## Accessibility, motion, and performance

Provide a skip link, semantic landmarks, labeled controls, logical keyboard order, and approximately 44×44px touch areas for principal actions. Retain the seed's **3px text-colored focus outline with a 5px offset**, using the current appearance's text token; ensure it remains visible and unclipped against actual surfaces. Table or list reading order must remain useful without the split layout.

Dialogs, where necessary, have a visible accessible name, contain keyboard focus while open, support Escape dismissal where appropriate, and return focus to the trigger or a logical surviving control. Closing a dialog must not imply that an already submitted backend command was withdrawn.

Use proposed 150ms visual feedback and 180ms opacity-only panel transitions. Reduced motion makes these transitions immediate. No hero artwork, animated cursor, perpetual status shimmer, or decorative section entrances are selected for this dashboard. Indeterminate work has a readable textual state; animation is not evidence of progress.

Batch streamed updates and bound rendering work so that the operator can continue reading and using controls during high event volume. Load history incrementally and preserve inspectable event ordering. These are implementation requirements, not measured performance results.

## Acceptance checks and evidence status

Verify both appearances, keyboard operation, focus and dialog return behavior, screen-reader status messages, zoom and reflow, actual composited contrast, reduced motion, preserved filters and reading position, stale data, disconnection and recovery, late command acknowledgements, changed approval proposals, uncertain retries, late events after cancellation, and high-volume streams. Check that no transient UI state is presented as confirmed backend state.

This sample has not been implemented, rendered, interaction-tested, or tested against a backend. Numerical token checks during research do not establish accessibility conformance or contrast over actual composite surfaces. The proposed state model must be reconciled with the chosen backend before implementation.

## Source credits and reuse boundaries

**Seed implementation:** Tamir (Phi Vuong Tuong Tam), **Tamir39Portfolio**, source snapshot `166f44091a58a68d74096bc44defceb99243ba4e`, inspected locally. The configured remote links may require repository access: [theme definitions][seed-motion], [theme styling][seed-theme], [appearance styling][seed-appearance], [base styles][seed-base], and [font configuration][seed-fonts]. The dashboard does not select the portfolio's artwork or effects.

**Font designers and package metadata:**

- Manrope — **Mikhail Sharanda**; [Google Fonts metadata][manrope-meta] and [OFL 1.1 notice][manrope-ofl].
- JetBrains Mono — **JetBrains, Philipp Nurullin, Konstantin Bulenkov**; [Google Fonts metadata][mono-meta] and [OFL 1.1 notice][mono-ofl].
- DM Serif Display, if selected for the overview title — **Colophon Foundry**; [Google Fonts metadata][dm-meta] and [OFL 1.1 notice][dm-ofl].

These are font-package terms, separate from the theme and flow specification. No font binaries are included. Preserve the notices applying to the actual package when fonts are acquired or redistributed; these links do not establish permission for unrelated assets or seed code.

**Human–AI interaction reference:** Microsoft HAX team and research contributors, [HAX Design Library](https://www.microsoft.com/en-us/haxtoolkit/library/). This is a conceptual reference for communicating capabilities, recovery, and user control. The particular state dimensions and command protocol above are Atlas proposals, not a claim that HAX specifies or guarantees this backend behavior.

**Accessibility and motion references:** [W3C WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/), [W3C modal-dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [W3C status-message guidance](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), and [Motion accessibility guidance](https://motion.dev/docs/react-accessibility).

**Atlas contribution:** original specification prose and the explicitly proposed dashboard adaptations, prepared with AI assistance for Interface Atlas. Seed code reuse terms have not been cleared by this draft. No external implementation code, artwork, or font assets were imported.

[seed-motion]: https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/lib/themes.ts
[seed-theme]: https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/themes.css
[seed-appearance]: https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/appearance.css
[seed-base]: https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/globals.css
[seed-fonts]: https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/layout.tsx
[manrope-meta]: https://github.com/google/fonts/blob/main/ofl/manrope/METADATA.pb
[manrope-ofl]: https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt
[dm-meta]: https://github.com/google/fonts/blob/main/ofl/dmserifdisplay/METADATA.pb
[dm-ofl]: https://github.com/google/fonts/blob/main/ofl/dmserifdisplay/OFL.txt
[mono-meta]: https://github.com/google/fonts/blob/main/ofl/jetbrainsmono/METADATA.pb
[mono-ofl]: https://github.com/google/fonts/blob/main/ofl/jetbrainsmono/OFL.txt
