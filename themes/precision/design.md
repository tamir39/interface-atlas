# Precision — design specification

Revision: `0.1.0-draft`. Reviewed: **2026-10-13**.

Precision is an original Atlas synthesis informed by Carbon and Primer. Every palette value, type size, radius, density choice, layout option, and interaction contract below is an **Atlas proposal**, unless explicitly marked **reference observation**. [Sources and credits](sources.md) separates the live website references from pinned repository and license records.

## Color tokens

| Role | Light | Dark | Basis |
| --- | --- | --- | --- |
| Page | `#f6f8fb` | `#0c121c` | Atlas proposal |
| Panel | `#ffffff` | `#141e2c` | Atlas proposal |
| Surface | `#eef2f6` | `#1c2a3d` | Atlas proposal |
| Text | `#17212f` | `#e9eff7` | Atlas proposal |
| Muted text | `#526174` | `#aab9cc` | Atlas proposal |
| Action | `#175cd3` | `#88b7ff` | Atlas proposal |
| Action hover | `#1247a5` | `#a6c9ff` | Atlas proposal |
| On action | `#ffffff` | `#102443` | Atlas proposal |
| Decorative divider | `#d6dee8` | `#33445b` | Atlas proposal |
| Control border | `#7a8899` | `#7789a3` | Atlas proposal |
| Selection | `#dce9ff` | `#26456d` | Atlas proposal |
| Focus | `#175cd3` | `#b9d2ff` | Atlas proposal |
| Success foreground | `#216e43` | `#94d3a2` | Atlas proposal |
| Warning foreground | `#765100` | `#f2cd84` | Atlas proposal |
| Danger foreground | `#b12a3c` | `#ffb2bd` | Atlas proposal |
| Information foreground | `#234f82` | `#aacdff` | Atlas proposal |

**Reference observation:** Carbon assigns colors by role and uses neutral layers to organize regions. Precision applies that concept to a separate cool palette; these values are not Carbon or Primer tokens.

Use page as the base, panel for the main working region, and surface for a supporting region. Dark layers become lighter. Apply grouping only where it clarifies the task: a page of nested cards adds unnecessary boundaries. Reserve action color for controls, selected context, and deliberate emphasis. Keep prose links underlined.

Muted text is readable supporting information. Decorative dividers do not meet the necessary-boundary target; use control border where a boundary identifies an input or control. Selection supports an explicit selected state, along with a non-color marker and applicable semantics.

Semantic foregrounds are calculated on page, panel, and surface, not on invented colored badge fills. Accompany each status with text and, when useful, a recognizable icon. “Running,” “Needs review,” “Connection lost,” and “Cancellation requested” describe different dimensions; do not collapse them into a single colored dot. A blue action is not a statement of safety or permission.

## Typography and hierarchy

**Reference observation:** Carbon uses IBM Plex and distinguishes productive and expressive type sets. Precision selects IBM Plex Sans for interface and reading text, with IBM Plex Mono for short technical values. The sizes below are Atlas choices, not a complete Carbon token transcription.

| Role | Proposed family and weight | Size | Line height |
| --- | --- | --- | --- |
| Intro heading | IBM Plex Sans 600 | `clamp(1.75rem, 3vw, 2.5rem)` | `1.15` |
| Page heading | IBM Plex Sans 600 | `2rem` | `1.2` |
| Section heading | IBM Plex Sans 600 | `1.75rem` | `1.25` |
| Detail heading | IBM Plex Sans 600 | `1.5rem` | `1.3` |
| Body or extended reading | IBM Plex Sans 400 | `1rem` | `1.6` |
| Labels, table values, short metadata | IBM Plex Sans 400/600 | `0.875rem` | `1.5` |
| Code, run ID, short command | IBM Plex Mono 400 | `0.875rem` | `1.5` |

Use normal tracking for body and control text; brief headings may use `-0.015em`. Keep headings in sentence case and reserve uppercase for short, optional indexes. Large marketing display typography is a project adaptation, not the operational default. A page has one primary heading and continuous semantic levels.

Limit reading passages to about 65 characters per line. Use tabular numerals for comparable numeric columns and timestamps. Monospace identifiers must wrap or have a clearly contained code region; they must not widen the whole page. Do not truncate essential state, errors, or action meaning behind a hover-only tooltip.

The preview names IBM Plex but ships no fonts. Validate actual package weights, script coverage, fallback, wrapping, and rhythm in each project. Different Plex script packages have separate contributors and version records; a family name does not establish every glyph's availability.

## Spacing, density, and layout

**Reference observation:** Carbon's 2x Grid begins with an 8px mini unit. Precision uses an Atlas scale of 4, 8, 12, 16, 24, 32, 48, and 64px; 4 and 12px are deliberate refinements, not a claim that the full scale is Carbon's grid.

- Default compact panels use 16px padding and 14px short metadata; extended reading remains 16px.
- Comfortable adaptation uses 24px panel padding and 16px specimen text.
- Label to control: 8px. Related controls: 12–16px. Separate working regions: 24–32px.
- Keep action areas at least 44px in both densities; dense content does not require small targets.
- Proposed content maximum: 1280px; gutters start at 16px and grow to 24px when space permits.

**Reference observation:** Primer identifies header, content, and supporting pane regions and describes list-detail layouts. Precision proposes a compact workspace header, a run list, an inline detail region, and secondary evidence beneath it. The preview's composition and breakpoint choices are original Atlas work.

Use shared starting edges for titles, labels, data, and actions. Add a supporting pane only if the content benefits from remaining visible. Begin with one column and add columns when both list and detail retain readable widths. Do not blend Carbon's grid breakpoints with Primer's column counts as if they were one upstream rule; record the project's actual content-fit decisions.

On narrow screens, place the list before detail in the same logical DOM order, provide an explicit return action, and preserve selection and filters. Avoid a large navigation stack that pushes the task out of view. Wide semantic tables may scroll inside a labeled keyboard-focusable region; general page content must reflow. Wrap long values and test translated labels before selecting a breakpoint.

## Geometry and elevation

Proposed panel and control radius: **4px**. Resting shadows: **none**. Use one-pixel decorative rules, stronger necessary control boundaries, flat layers, and explicit space. The geometry is an Atlas choice; it is not a claim about Carbon's component corners or Primer's radius tokens.

An optional anchored popover or dialog may use limited elevation after composited contrast and focus checks. The reference preview does not require floating overlays. Keep data and action surfaces opaque; gradients, glow, glass, moving grids, and cursor effects do not define this theme. [Effects.md](effects.md) documents selection criteria and limits.

## Component behavior

| Component | Proposed rule |
| --- | --- |
| Primary action | Verified action/on-action pair, stable dimensions, meaningful verb, 4px radius, visible focus, and brief feedback. |
| Secondary action | Neutral background with readable text; necessary border remains visible. |
| Navigation | Explicit current location and clear destination; appearance follows applicable `aria-current` or selected semantics. |
| Filter | Visible label, native control, immediate useful results, preserved selected-item context, and clear empty-result recovery. |
| Run list | Persistent run IDs and textual states; inspection is an explicit action rather than an unlabeled clickable row. |
| Detail | Meaningful heading, evidence, confirmed state, separate pending command, and an explicit return path. |
| Input | Visible associated label, panel background, control border, help linked to the control, and nearby error recovery. |
| Status | Text plus optional icon on verified neutral surfaces; explain freshness and command acknowledgement. |
| Table | Semantic headers and caption/context, comparable numeric alignment, contained wide content, no fake live data. |
| Disclosure | Native details/summary for optional evidence, visible expanded state, and no motion dependency. |
| Dialog | Accessible name, bounded content, deliberate focus entry/return, reachable dismissal and action; project-specific implementation required. |

Define default, hover, focus, pressed/selected, unavailable, and pending states as appropriate. Keep explanatory text legible even when its adjacent control is disabled. A control disabled by permissions needs a visible explanation when users need to understand the limitation. Error messages describe the problem and next action.

## Agent and operations interaction contract

**Reference observation:** Primer's Copilot guidance calls for visible focus, focus continuity, accessible state, and announcements of asynchronous work and errors. The contract below is Precision's explicit Atlas proposal, informed by that guidance and the shared [Agent Experience guide](../../knowledge/agent-experience.md).

1. Keep confirmed execution, user attention, connection, and pending command separate. Preserve the last confirmed execution when a connection disappears; mark the information stale and offer recovery.
2. A deliberate “Inspect” action opens evidence and focuses its detail heading. This is a navigation choice. Selection used for rapid in-place browsing may instead retain focus in the list; a project must choose and document one behavior.
3. Returning to the list preserves selected context and restores the originating control when visible. If a filter hides it, preserve the filter and detail and focus the search control with an explanation.
4. Requesting cancellation sets **Cancellation requested**; confirmed execution stays **Running** until an acknowledgement arrives. Do not silently equate a sent command with a confirmed outcome.
5. Announce meaningful changes in a polite status region. Avoid announcing every stream token or repeatedly moving focus on background updates. User-invoked navigation may transfer focus; asynchronous status changes normally do not.
6. State the acting agent, scope, available evidence, and effect before consequential actions. A project must separately define authority, approval, retry, recovery, audit records, and backend idempotency.

The reference preview uses fictional local records and manual simulation controls. It sends no agent command or network request. Its cancellation and connection transitions demonstrate wording and context, not production synchronization.

## Appearance and accessibility

Support light, dark, and system appearance. Apply a saved choice before paint where possible, respond to live system changes when system is selected, and preserve usable defaults if storage or initialization fails.

Proposed focus: **3px** solid focus-color outline with **3px** offset, outside the target on a neutral surface. These dimensions are Atlas choices. Inspect actual adjacent surfaces and clipping; use system `Highlight` under forced colors. Never remove the ring without an equally usable replacement.

Use native landmarks and controls, a useful skip link, visible labels, logical keyboard order, and context-preserving focus. A 44px area is an Atlas comfort target, not a claim that it is WCAG's minimum. Test narrow reflow, 200% text resizing, native zoom, keyboard interaction, screen-reader information, and actual rendered contrast in each project.

Essential information remains present without animation or JavaScript. [Motion rules](motion.md) make feedback immediate under reduced motion and motion-off. Preserve explicit pending, failure, and stale information in all fallbacks; a spinner cannot carry the only status meaning.

## Numerical contrast record

Calculated on **2026-10-13** from opaque sRGB relative luminance, without alpha compositing:

| Pair | Light | Dark |
| --- | --- | --- |
| Text on page | 15.24:1 | 16.22:1 |
| Muted text, minimum across page/panel/surface | 5.62:1 | 7.27:1 |
| On-action on action | 5.99:1 | 7.57:1 |
| On-action on action-hover | 8.50:1 | 9.16:1 |
| Control border, minimum across page/panel/surface | 3.21:1 | 4.07:1 |
| Focus, minimum across page/panel/surface | 5.32:1 | 9.48:1 |
| Success/warning/danger/information, minimum across page/panel/surface | 5.53:1 | 8.36:1 |
| Text on selection | 13.24:1 | 8.43:1 |
| Muted text on selection | 5.16:1 | 4.88:1 |
| Decorative divider, minimum across page/panel/surface | 1.21:1 | 1.46:1 |

These calculations substantiate only the listed opaque pairs. They do not certify rendered components, every selected-state pairing, disabled appearance, font rendering, alpha layers, artwork, or complete accessibility. Any different background or composition needs a new check. Actual browser evidence belongs in [validation.md](validation.md).
