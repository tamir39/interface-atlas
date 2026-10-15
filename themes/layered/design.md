# Layered — design specification

Revision: **0.1.0-draft**. Reviewed: **2026-10-15**.

Layered is an original Atlas synthesis informed by Material Design 3 and a separate Fluent 2 comparison. **All numerical values, role mappings, typography selections, geometry, timings, layouts, and workflow rules below are Atlas proposals.** Reference observations identify concepts rather than imported tokens or implementation. Read [sources and credits](sources.md) for the exact scope.

## Color tokens and surface roles

| Role | Light | Dark | Proposed purpose |
| --- | --- | --- | --- |
| Page | `#EAF2F1` | `#101C1C` | Application base. |
| Low | `#DFEBE9` | `#172626` | Navigation plane and quiet structural context. |
| Surface | `#F7FBFA` | `#1E3030` | Main content and project regions. |
| Raised | `#FFFFFF` | `#273C3B` | Inputs and temporary modal editor. |
| Tint | `#D5EAE5` | `#294C46` | Selected context and deliberate emphasis. |
| Secondary | `#F2E6DA` | `#43372E` | Quiet supporting panel. |
| Ink | `#172F2C` | `#E7F3EF` | Primary text, selected text, and explicit markers. |
| Muted | `#405E58` | `#B4CEC5` | Readable supporting text. |
| Primary | `#185C50` | `#A2D6C5` | Action fill or underlined action text on a named neutral surface. |
| On primary | `#FFFFFF` | `#12382E` | Text/icons on the primary action fill only. |
| Border | `#58766E` | `#8AABA1` | Necessary input/control boundaries. |
| Focus | `#6D3B83` | `#E7B6F4` | Immediate external focus indicator. |
| Error | `#972F3A` | `#FFB3BE` | Error text and meaningful invalid boundary. |

**Reference observation:** Material's surface/container distinction supports regional hierarchy; Fluent's solid material shows that depth does not require translucency. Layered uses its own six opaque background roles rather than importing a Material palette, dynamic-color algorithm, Fluent ramp, or platform material.

Map roles by purpose. Navigation stays Low when repositioned; working content stays Surface; editing fields stay Raised. Dark planes become lighter as they rise. Light planes need not follow a mechanical luminance staircase: regional purpose, coherent contrast, and readable content matter more than a literal inversion.

Use Ink on Tint for selected labels and markers. Primary can be used as text on the six named backgrounds, but On primary is a separate action pair. Do not use On primary as ordinary text. Hover keeps the action's foreground/fill pairing and adds explicit boundary feedback; no unverified lighter action color is introduced.

Supporting labels are not faded with opacity. Priority is readable **Normal**, **Focus**, or **Later**, not an invented success/warning/danger signal. Error includes a message and an associated field or summary; a red outline alone is insufficient. A decorative divider may use a low-opacity Border, but that composed line cannot identify an input or carry a numerical necessary-boundary claim.

## Typography and hierarchy

Proposed named family: **Plus Jakarta Sans**, normal **400/500/600/700**, with `"Segoe UI", Arial, sans-serif` fallbacks. Use a single coherent family for application headings and body. A technical specimen may use local `Consolas, "Courier New", monospace`; it is not another selected brand family. No fonts are bundled or fetched.

| Role | Proposed size | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- |
| Intro/display | `clamp(2.5rem, 5vw, 4rem)` | 600 | 1.1 | `-0.035em` |
| Section heading | `1.75rem` | 600 | 1.25 | Normal |
| Card/detail heading | `1.25rem` | 600 | 1.35 | Normal |
| Body and extended reading | `1rem` | 400 | 1.6 | Normal |
| Labels and supporting metadata | `0.875rem` | 500 | 1.5 | Normal |
| Input and control text | At least `1rem` | 400/500/600 | At least 1.5 | Normal |
| Technical specimen | `0.875rem` | 400 | 1.5 | Normal |

Use sentence case, a single primary heading, and continuous semantic heading levels. Align headings, task labels, form labels and actions to predictable starting edges. Keep extended passages around **65ch**; do not stretch reading text merely because a pane has room. Use tabular numerals only for useful comparisons such as task counts.

Preserve full project names, validation messages, and task text. Wrap long titles, identifiers, and Vietnamese text. Do not hide essential names behind hover-only tooltips or fixed-height clipping. An actual project selects the exact font package, retained OFL notice, supported weights/scripts, and fallback behavior. A CSS family name does not establish that Plus Jakarta Sans rendered.

## Spacing, density, and responsive layout

Proposed scale: **4, 8, 12, 16, 24, 32, 48, 64, 96px**. Use 8px between a label and field, 12–16px between related controls, and 24–32px between working groups. Generous spacing expresses task relationships; it does not justify rows of empty decorative containers.

- Comfortable is the default. Proposed panel inset: **24px**.
- Compact adapts **only the neutral specimen inset to 16px** in the reference. It does not shrink workspace cards, text, navigation, dialog fields, or targets.
- Control and navigation hit areas remain at least **44px × 44px**. Checkbox labels provide the usable area around the native input.
- Proposed main maximum: **1440px**, with **24px** side gutters and **16px** narrow gutters.
- A **224px** navigation plane is suitable where content retains room; stack it into a useful compact navigation region at **960px** and below in the reference.
- Project cards can use three, two, or one columns according to content fit. Record the actual preview breakpoints in [preview notes](preview/README.md); a column count is not a universal project rule.

**Reference observation:** Material's adaptive guidance preserves functional meaning while resizing, reflowing, revealing panes, or exchanging equivalent navigation. Layered's native anchors and content order remain useful at every width; it does not ship an official Material navigation component.

Keep the same logical DOM order as the visual reading order. Present project discovery before detail; selected detail can remain available even when a filter hides its card. Avoid sticky regions or fixed bottom bars that cover focus, form errors, text, or browser zoom. A supporting pane should earn its space through a useful task; do not create a third column simply to fill the viewport.

## Shape, material, and depth

| Element | Proposed geometry or treatment |
| --- | --- |
| Panels and project cards | **24px** radius; opaque role fill; no resting shadow needed. |
| Inputs and ordinary controls | **12px** radius with a necessary boundary. |
| Navigation/current-location indicator | **999px** pill where it fits the content; explicit current text or semantic state. |
| Modal editor | **28px** radius; opaque Raised surface in the native top layer. |
| Modal shadow | Optional `0 24px 64px rgba(0,0,0,.24)`; original Atlas proposal. |

Repeated shape roles create coherence. Nested containers should fit within their parent's inset without awkward corner collisions. A pill is appropriate for a short navigation label, not automatically for a paragraph or input. Do not apply drop shadows to every card or inset bevels to simulate physical controls.

The modal's optional translucent backdrop separates a blocking task from the surrounding workspace; its content and controls remain opaque. Backdrop compositing and shadow are not covered by opaque token calculations. [Effects.md](effects.md) explains the boundary; no backdrop blur, acrylic, Mica, glass, image texture, or required shader is part of the theme.

## Components and state

| Component | Proposed behavior |
| --- | --- |
| Primary action | Primary/On primary pair, useful verb, stable dimensions, necessary boundary feedback and visible focus. |
| Secondary action | Ink on an opaque named surface; meaningful boundary; clear relation to the main action. |
| Navigation | Real destinations, readable labels and current location. Use native anchors; do not invent tab or menu semantics. |
| Project card | A real contextual **Open TITLE** anchor, title, category, priority text and computed sample-task count. Current context also has a readable marker. |
| Search/category | Visible labels, native controls, useful result count, clear empty recovery and no loss of selected detail. |
| Checklist | Native associated checkbox labels; text and checked state remain meaningful independently of color. |
| Input/select | Visible associated label, helpful constraints, Raised background, Border, native semantics and local error association. |
| Modal editor | Accessible name, intentional first focus, native modality, reachable Save/Cancel, Escape discard, useful focus return. |
| Error summary | Linked list naming invalid fields, focused summary heading after failed Save, inline field feedback. No duplicate assertive alert is required. |
| Revert | Explicitly restores only the named project's initial title, priority and tasks; disabled when unchanged with readable explanatory context. |
| Task counts | Derived from actual fixture checkboxes; identify sample tasks rather than presenting invented analytics or achievement claims. |

Represent default, hover, focus, pressed, current/selected, disabled and invalid states separately where appropriate. A selected item can still have focus. Focus is immediate and visible; a tonal wash alone is not the entire indicator. Disabled runtime controls retain a visible explanation rather than looking like a loading product.

## Bounded editing and recovery contract

The original reference uses three fictional projects and nine sample tasks. It is an illustrative consumer workspace, not an account, backend, agent system, or synchronization demo.

1. Search compares saved title and description case-insensitively; category narrows the same fixed-order list. Filtering preserves current detail, task state, saved edits and preferences. Empty-result Clear resets both filters and focuses Search.
2. An unmodified primary Open activation selects its static article and focuses that article's heading. Other anchor behavior remains native. A valid initial or live `#project-ID` fragment selects and focuses its matching article. These are ordinary links, not custom tabs.
3. Task activation changes that project's saved local checkbox state and recomputes its count and the aggregate. It does not change unrelated titles, filters or another project's tasks.
4. Edit copies saved title/priority into a separate draft. The native named dialog opens with the title input focused; surrounding content is inert through native modal behavior. Filtering out a card does not remove the selected article's Edit action.
5. Save trims title, requires **1–60 characters**, and accepts only **normal**, **focus**, or **later**. Invalid input mutates no saved state, stays open, adds associated inline errors and linked summary, and focuses the summary heading.
6. Valid Save updates title and priority together, refreshes reflected names, filter results and changed-state controls, then closes and returns focus to the opener. Tasks remain unchanged. Render user text as text; do not interpret it as markup. There is no asynchronous spinner or fake network acknowledgement.
7. Cancel and native Escape discard the draft, preserve saved state, and return focus to Edit. Outside clicks do not dismiss. Reopening reads the saved values rather than an abandoned draft.
8. Revert restores only the current project's initial title, priority and tasks. Preserve other projects, filters, selected detail and preferences. Focus the detail heading because Revert becomes disabled after restoration.
9. If the native modal API is missing or opening fails, explain that editing is unavailable and disable Edit actions; task, filtering and native navigation remain useful. Do not replace a failed modal with an inaccessible imitation.
10. Save only appearance, specimen density and motion preference. All workspace changes reset on reload, apart from a valid location fragment selecting its corresponding static article. State this boundary plainly.

Real projects must separately specify durable save semantics, connection state, data ownership, authorization, concurrent changes, retry, recovery and undo scope. If agents can act, define scope, approvals, pending versus confirmed effects and audit history using [Agent Experience guidance](../../knowledge/agent-experience.md). This local editor grants no agent authority.

## Appearance and accessibility

Support **Light, Dark and System**, with System the reference default. Restore a validated saved choice before the stylesheet where practical, follow live system appearance when System is selected, and keep usable defaults when storage is malformed, unavailable or blocked.

Proposed focus: **3px solid Focus with 3px offset**, outside the target on a named neutral surface. Check actual adjacency, clipping and modal placement; use system **Highlight** in forced colors. A 44px comfort target is an Atlas choice, not a claim about WCAG's minimum.

Use semantic landmarks, useful section navigation, skip link, native labeled fields and logical keyboard order. No JavaScript leaves every project article readable through native anchors; runtime controls and task mutations remain disabled with a visible explanation, while ordinary specimen fields can work. A closed dialog remains hidden even if browser default styling is absent.

Optional feedback becomes immediate under motion-off or OS reduced motion. Content, task state, validation, focus and modal closure never wait for animation. Each consuming project checks actual fonts, translated text, narrow reflow, text resizing, browser zoom, keyboard access, assistive technology, forced colors and rendered contrast. A native element and arithmetic do not certify the whole interface.

## Numerical contrast record

Calculated **2026-10-15** using opaque sRGB relative luminance; no alpha compositing, shadow or backdrop is included. The six backgrounds are **Page, Low, Surface, Raised, Tint and Secondary**.

| Pair | Light | Dark |
| --- | --- | --- |
| Ink on Page | 12.48:1 | 15.32:1 |
| Ink, minimum across all six | 11.31:1 | 8.33:1 |
| Muted, minimum across all six | 5.65:1 | 5.67:1 |
| Primary as text, minimum across all six | 6.23:1 | 5.85:1 |
| Border, minimum across all six | 3.95:1 | 3.80:1 |
| Focus, minimum across all six | 6.43:1 | 5.59:1 |
| Error, minimum across all six | 6.01:1 | 5.61:1 |
| On primary on Primary action fill | 7.82:1 | 7.95:1 |

For every six-surface minimum above, **Tint is the limiting background in both appearances**. Selected Ink-on-Tint is therefore 11.31:1 light and 8.33:1 dark. Proposed action hover retains the same verified colors.

The six planes are grouping fills rather than necessary control outlines. Do not infer that their mutual contrast reaches 3:1. Use Border or another explicitly checked indicator when a shape boundary is required to identify a control. These calculations substantiate only the listed pairs; altered opacity, new surfaces, gradients, images, disabled styles, selected combinations or composited backdrops need their own checks. Actual browser evidence belongs in [validation.md](validation.md).
