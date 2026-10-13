# Blueprint — motion specification

Feedback should clarify an interaction while keeping content and targets stable. Inspected source settings and portable Atlas choices are distinct. Pinned files and creator credits are in [sources.md](sources.md).

## Retained source settings

| Role | Source setting | Interpretation |
| --- | --- | --- |
| CSS component feedback | 240ms, inherited; declared `cubic-bezier(0.2, 0, 0, 1)` | Source shorthand assigns theme easing explicitly to transform. Applying it uniformly to feedback properties is an Atlas normalization. |
| Theme Motion transition | 300ms tween, `easeInOut` | Separate JavaScript transition setting, not the CSS feedback duration. |
| Entrance helper | Initial opacity 0 and vertical offset 12px; final opacity 1 and offset 0 | Defined helper; not evidence that the mounted hero uses it. |
| Shared press feedback | Scale `0.96` | Optional source interaction. |
| Eligible project hover | Translation `(-3px, -3px)` and larger offset shadow | Optional movement, distinct from resting elevation. |

The pinned artwork notes describe the homepage hero as immediately visible after its separate brand introduction, with no entrance animation or stagger. Do not infer active hero behavior from a helper definition. Atlas does not adopt the portfolio loading introduction, animated identity sequence, theme reveal, theme cycling, or tracing as an automatic reading effect.

## Proposed project rules

Use **240ms color and border feedback** with the declared CSS easing uniformly as an Atlas normalization. The reference preview selects this restrained feedback only. Feedback duration is not a simulated operation delay.

Show essential content immediately. A project selecting the 300ms source transition or entrance records its specific purpose; use it once for a secondary region with content already available. Do not replay on appearance changes, filtering, refreshes, or return navigation. An effect called a traced path does not justify delaying the text it illustrates.

Diagram and outline selection, filtering, opening detail, return focus, and announcements happen immediately. Do not move a focused control, animate sorting into a new location, or depend on animation completion to reveal information. Keep selection and content context stable when switching a diagram view.

Compact projects may choose 120–180ms feedback; record that adaptation rather than treating it as an observed Blueprint default. Optional press and hover transforms can be omitted when they reduce repeated-use clarity. The preview contains no entrances, moving cards, cursor effects, animated scrolling, looping artwork, or delayed interaction state.

## Reduced motion and user control

Honor `prefers-reduced-motion` from first paint, with OS reduced motion taking priority over enabled project motion. A visible motion preference can make feedback immediate without changing information.

- Remove transition delays, transforms, and entrance offsets; content stays visible in its final position.
- Keep navigation and focus transfer immediate.
- Replace optional canvas/cursor movement with a static view and stop hidden loops.
- Preserve explicit state labels and announcements without relying on motion.
- Do not animate connectors as evidence of actual traffic, progress, or agent execution unless the product defines and exposes those real states separately.

Test live preference changes, keyboard focus, immediate initial content, and no-JavaScript behavior. Any later renderer needs its own pause, cleanup, performance, and accessibility checks; static reference-preview checks do not validate unimplemented effects.
