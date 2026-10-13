# Precision — motion specification

Motion supports repeated work through brief feedback while preserving targets and context. Precision includes no automatic entrance sequence, scrolling animation, animated cursor, moving artwork, row reordering, or continuous loop.

## Referenced source settings

**IBM Carbon reference:** productive motion is subdued task feedback; expressive motion serves occasional emphasis. Its documented productive standard easing is `cubic-bezier(0.2, 0, 0.38, 0.9)`. The documented duration tokens include 110ms (`duration-fast-02`) and 150ms (`duration-moderate-01`). [Source credits](sources.md) identify the responsible IBM team and accessed reference.

These are selected reference facts, not an imported Carbon runtime or a transcription of its complete motion system. Precision chooses where to apply them.

## Proposed project rules

| Role | Atlas choice | Behavior |
| --- | --- | --- |
| Control color and border feedback | 110ms with the referenced productive standard curve | Keep position and dimensions stable. The reference preview selects this treatment. |
| Optional small secondary disclosure | Up to 150ms with the same curve | Only if a project deliberately selects motion; reveal useful content promptly and keep focus stable. The preview's native disclosures are immediate. |
| Filtering, selection, status, and appearance | Immediate state/content changes | Do not use a duration as an artificial processing delay. |
| User-invoked detail navigation | Immediate content and deliberate focus transfer | Do not fade essential evidence in from an invisible initial state. |
| Background updates | Preserve current position and focus | Announce meaningful changes without stealing focus or shifting the active item. |

Any different distance, overlay, or expressive event needs a project-specific decision and check. A short timing does not justify moving a repeatedly used target. Keep initial page content visible immediately, including when script initialization is unavailable.

## Reduced motion and user control

Honor `prefers-reduced-motion` from first paint. OS reduced motion overrides an enabled motion preference. A visible motion choice may disable brief feedback without changing available information or controls.

- Make transitions immediate under reduced motion or motion-off.
- Remove transforms and entrance offsets; render final content visible.
- Keep navigation scrolling immediate.
- Preserve pending commands, stale data explanations, outcomes, and state announcements without animation.
- Do not replace a stopped effect with hidden content or an indefinite blank state.

Test live OS preference changes, saved motion preference, keyboard focus, immediate initial content, and useful no-JavaScript behavior. The reference preview's checks cover its implemented feedback only; they do not validate unimplemented overlay or disclosure animation.
