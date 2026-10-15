# Pulse — design specification

Revision: **0.1.0-draft**. Reviewed: **2026-10-15**. Reference repository record: `open-props@f39ab7c377a0e047f930982e3611bbc95254a260`.

**All values and interaction rules in this specification are Atlas proposals.** Open Props informs modular token composition and adaptive preferences; it does not supply Pulse's palette, scales, geometry, type roles, timings, or planner. [Sources and credits](sources.md) separates those reference roles. Rendered evidence belongs in [validation.md](validation.md).

## Color tokens

| Role | Light | Dark |
| --- | --- | --- |
| Page | `#f4f5ef` | `#10140d` |
| Panel | `#ffffff` | `#191f15` |
| Surface | `#e7eadf` | `#242d1c` |
| Tint A | `#edf3d8` | `#2b361e` |
| Tint B | `#e6eef2` | `#1f3035` |
| Tint C | `#f3e9dc` | `#352b20` |
| Text / ink | `#172013` | `#f5f8ee` |
| Muted text | `#53614a` | `#bec9ae` |
| Accent / action | `#456b0c` | `#c4f047` |
| Action hover | `#355308` | `#d4fb72` |
| On action | `#ffffff` | `#162006` |
| Decorative divider | `#bdc7b0` | `#455239` |
| Necessary control border | `#6a7a5a` | `#849871` |
| Selected surface | `#d8e9a6` | `#3b501d` |
| Success | `#285b3c` | `#a9d7af` |
| On success | `#ffffff` | `#12231b` |
| Note | `#f4e2a6` | `#e6d28e` |
| On note | `#473a0d` | `#2b260d` |
| Warning foreground | `#76520a` | `#ecd189` |
| Danger foreground | `#982e3e` | `#f3a9b3` |
| Information foreground | `#245d79` | `#a6d0e9` |

Use page as the base, panel for a useful grouping, and tints selectively. Alignment, spacing, and headings can establish structure without putting every region in a panel. Keep the strong dark lime limited to deliberate emphasis and actions. The light adaptation uses a darker action green for readable ordinary text and explicit filled actions.

Use action/on-action and hover/on-action as defined pairs. An accent mark is not automatically interactive. Decorative dividers and poster shapes do not identify a usable control; apply the necessary border where a boundary communicates interaction. Do not use a faint divider to outline the only sign of a text field.

Warning, danger, and information are **foreground roles** on the six page/panel/surface/tint backgrounds. They do not define filled status colors. Pair every status with readable text. Filled success and note treatments use their own on-success/on-note foregrounds. A selected session is not a success or confirmed booking.

On selected surfaces, use **ink labels, ink markers, underlined ink links, and ink boundaries where required**. The proposed dark necessary border is below 3:1 against selected surface. Using ink consistently in both appearances avoids propagating that weak pairing. Keep a visible selected label or marker in addition to the background. The proposed browser text selection uses selected surface with ink.

The reference hero retains the **dark poster palette in both page appearances**. Its local foregrounds, links, boundaries, and focus indicators must use the corresponding dark pairings; the surrounding page still follows the user's appearance. This is a preview composition choice rather than a universal requirement for every project header.

## Typography and hierarchy

**Proposed display family:** Barlow Condensed, 600/700. **Proposed body/control family:** Barlow, 400/500/600. Both are credited to **Jeremy Tribby**; font-package notices and additional contributor roles are in [sources.md](sources.md).

| Role | Family / weight | Size | Line height |
| --- | --- | --- | --- |
| Display | Barlow Condensed 700 | `clamp(3.5rem, 10vw, 8rem)` | `0.95` |
| Page heading | Barlow Condensed 600–700 | `clamp(2.5rem, 6vw, 4.5rem)` | `1.05` |
| Section heading | Barlow Condensed 600 | `clamp(2rem, 4vw, 3rem)` | `1.1` |
| Card heading | Barlow 600 | `1.25rem` | `1.3` |
| Introduction | Barlow 400 | `1.125rem` | `1.6` |
| Body / reading | Barlow 400 | `1rem` | `1.6` |
| Labels / supporting text | Barlow 400–600 | `0.875rem` | `1.5` |
| Text-entry controls | Barlow 400 | `1rem` | `1.5` |
| Short technical sample | Local Consolas / monospace | `0.875rem` | Inherited readable line height |

Keep display tracking mild at **`-0.015em`** and ordinary body/control tracking normal. Reserve uppercase and condensed display for short headings, not paragraphs, error explanations, or schedule details. Do not horizontally scale text to simulate a condensed font. Recheck unusually long headings and use explicit line breaks only when they preserve meaning across widths and languages.

Use a continuous semantic heading hierarchy. A visually large word still needs the appropriate document role. Proposed reading measure is **65ch**, checked with the actual selected font. Use tabular numerals where times align or values change; do not obscure time ranges behind abbreviations.

The preview ships no font files and makes no remote font requests. It names Barlow Condensed with local Impact/Arial Narrow/sans-serif fallbacks. Body text uses the local-only CSS alias **`Pulse Barlow Local`**, then Segoe UI/sans-serif. Three normal-style `@font-face` declarations match explicit local face names: **Barlow Regular / Barlow-Regular** for 400, **Barlow Medium / Barlow-Medium** for 500, and **Barlow SemiBold / Barlow-SemiBold** for 600. Their sources use only `local()`, with no `url()`. This avoids the inspected Windows family-name collision in which plain `Barlow` resolved to Barlow Condensed. The body remains ordinary width, falling back when those exact installed faces are unavailable. Different local faces have different metrics and weights; intended named-font rendering, language coverage, and final rhythm remain project checks. Text-entry controls retain at least **16px** text in the mobile adaptation.

**Reference implementation adaptations:** the preview uses a tighter `0.9` poster-display line height, retains the display's `-0.015em` tracking, and changes its display clamp to `clamp(3.5rem, 10vw, 6rem)` at 52rem and `clamp(3.5rem, 17vw, 6rem)` at 38rem after the artwork stacks. Its theme-page title uses `clamp(3rem, 6vw, 5rem)`, section headings use `clamp(2.5rem, 5vw, 4.5rem)`, and ordinary card headings are `1.375rem`. Labels are 14px; short tags/captions are generally 12px, with the artwork caption 10px in the intermediate layout and 12px again when stacked. These are bounded preview choices rather than new universal theme defaults; resizing, wrapping, fallback metrics, and actual readability remain project checks.

## Spacing and layout

**Proposed scale:** 4, 8, 12, 16, 24, 32, 48, 64, and 96px.

- Label to control: 8px; related controls: 12px.
- Related content: 16–24px; major sections: 48–96px.
- Comfortable panel inset: 24px; compact specimen inset: 16px.
- Typical content maximum: 1120px; reading maximum: 65ch.
- Proposed gutters: 24px on small screens and 40px when room permits; adapt at the narrowest content widths.

Start with one column and add columns only when actual content fits. Keep logical DOM order, then use alignment and bounded artwork to establish a poster composition. Avoid relying on rotated text, unusual spatial order, or a moving marquee to convey the program.

The preview's gathering and planner stay comfortable. Compact changes **only the neutral component specimen's inset from 24px to 16px**. Typography, action targets, geometry, schedule, review content, and poster retain their values. A project choosing broader density changes records them explicitly.

Session summaries need their full title, time range, and track. Keep useful metadata beside the corresponding action. A plan remains inspectable even if filters hide some of its sessions. Preserve selected sessions across filters and appearance changes; filtering does not silently discard a choice.

Where a semantic table genuinely requires horizontal room, contain overflow in a labeled keyboard-accessible scrolling region. The whole page must still reflow. Preserve long values, Vietnamese content, normal text selection, and enlarged text without clipping essential information.

The preview uses a **1240px** content maximum, 24px outer gutters normally, and 16px gutters at its narrow layout. Session/plan panels use 24px inset normally and 20px in the narrow layout; the preview preference panel also uses its own 20px inset. These content-fit adaptations remain separate from the specimen-only density switch. Program and planner collapse by content fit; their visual columns do not change the session collection's reading order.

## Geometry and elevation

**Proposed panels:** 12px corners. **Proposed controls:** 6px corners. Task surfaces rest flat; contrast, grouping, and spacing provide structure. Use an ink boundary where a selected state needs one rather than adding a glow or a moving outline.

Angled wedges, split circles, radial bars, and oversized cropped shapes may form bounded original poster artwork. They are decoration, not form controls or evidence of progress. Crop artwork inside its region without clipping focus rings, headings, or page overflow. Keep actionable content stable and unrotated. [Effects.md](effects.md) describes the optional study separately.

## Components and local planning behavior

| Component | Proposed rule |
| --- | --- |
| Primary action | Action/on-action, stable dimensions, hover action pair, and clear focus. |
| Secondary action | Ink text and a necessary border where its shape conveys interaction. |
| Prose link | Persistent underline or equivalent non-color cue; selected-surface links use ink. |
| Input / select | Visible associated label, readable value, neutral surface, and necessary boundary. |
| Session selection | Native button with a stable Add-to-plan label and `aria-pressed`; persistent selected text/marker. |
| Plan list | Explicit selected sessions and readable time ranges; removing a session restores a deliberate surviving focus target. |
| Review result | Explain empty-plan and overlapping-time conditions in text, with explicit recovery. A valid local result is a local check. |
| Status feedback | Polite concise announcement for ordinary changes; persistent readable errors/results rather than color alone. |
| Supporting content | Native `details`/`summary` where disclosure suits the content. |
| Decorative study | Explicit native activation, finite motion only when permitted, and a static equivalent. |

Define default, hover, focus, pressed/selected, unavailable, pending, and error states where relevant to the actual product. Do not add fictional loading, inventory pressure, or asynchronous booking to decorate this reference.

The preview has **six fixed fictional sessions** and an in-memory local plan. Selection and review are separate. Review checks the chosen sample time ranges for overlaps; changing a selection invalidates a previous review rather than continuing to present it as current. Explain both overlapping sessions and provide a route to change the choice. Removing one item, clearing the plan, or hiding a selected session with filters must not strand focus or silently change unrelated preferences.

The planner is not a booking, payment, calendar, attendance, capacity, or agent-execution service. It makes no network request and reserves nothing. Real scheduling needs an explicit timezone/day model, server validation, accessibility requirements, availability, travel time, persistence, permissions, and truthful pending/confirmed/error states. Do not infer those capabilities from a green local review result.

## Appearance and accessibility

Support **Light, Dark, and System**. The preview starts with System and follows live OS appearance; dark-first identity does not override an explicit preference. Apply valid saved settings before paint where possible. Malformed, unavailable, or blocked storage preserves usable defaults. Only appearance, specimen density, and motion preference persist; the local plan resets on reload.

**Proposed focus:** 3px ink outline with 5px offset; forced colors uses `Highlight`. Verify adjacent backgrounds and prevent clipping, including on the fixed dark poster and selected sessions. Listed token pairs do not establish complete focus conformance.

Use native controls, landmarks, descriptive headings, a useful skip link, and logical keyboard order. The comfortable target proposal is **44px**, a usability target rather than a statement of WCAG's minimum. Verify activation, pressed states, review/focus recovery, announcements, text resizing, reflow, and rendered contrast. Without JavaScript, session information remains readable and controls requiring runtime behavior stay unavailable with an explanation.

Essential content, planning, review, and error recovery happen immediately and independently of animation completion. Follow [motion.md](motion.md) for reduced/off/hidden cancellation and static alternatives. [Preview notes](preview/README.md) record the actual local behavior.

## Numerical contrast record

Calculated on **2026-10-15**, using opaque sRGB relative luminance without alpha compositing. “Six backgrounds” means page, panel, surface, tint A, tint B, and tint C. Every value is an independent Atlas proposal.

| Pair | Light | Dark |
| --- | --- | --- |
| Ink, minimum on six backgrounds | 13.76:1 | 11.85:1 |
| Muted, minimum on six backgrounds | 5.42:1 | 7.37:1 |
| Accent, minimum on six backgrounds | 5.13:1 | 9.64:1 |
| Necessary control border, minimum on six backgrounds | 3.79:1 | 4.07:1 |
| Success, minimum on six backgrounds | 6.50:1 | 7.90:1 |
| Warning/danger/information, minimum on six backgrounds | 5.78:1 | 6.75:1 |
| Decorative divider, minimum on six backgrounds | 1.44:1 | 1.53:1 |
| On-action on action | 6.25:1 | 12.79:1 |
| On-action on action-hover | 8.78:1 | 14.35:1 |
| On-success on success | 7.92:1 | 10.16:1 |
| On-note on note | 8.66:1 | 10.08:1 |
| Ink on selected surface | 12.88:1 | 8.31:1 |
| Muted on selected surface | 5.08:1 | 5.17:1 |
| Accent on selected surface | 4.80:1 | 6.76:1 |
| Necessary control border on selected surface | 3.55:1 | **2.85:1 — below 3:1** |

The selected-surface boundary failure motivates an ink boundary where selection requires one. Opaque calculations cover only these pairs; they do not validate translucent geometry, every interaction state, intended font rendering, meaningful image boundaries, assistive technology behavior, or complete accessibility. The separate validation record identifies rendered checks actually collected.
