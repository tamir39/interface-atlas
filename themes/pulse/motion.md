# Pulse — motion specification

Motion is optional expression around immediate content and stable tasks. **Every duration, curve, property choice, and lifecycle rule here is an Atlas proposal.** [Source credits](sources.md) identify the conceptual Open Props and web.dev references without assigning them authorship of Pulse's motion.

## Feedback and finite study

| Role | Proposed setting | Scope |
| --- | --- | --- |
| Component feedback | **150ms**, `cubic-bezier(0.2, 0, 0, 1)` | Brief color/border feedback; not a simulated booking or processing delay. |
| Decorative study | **600ms**, finite transform/opacity movement | Explicit activation of one bounded three-bar composition. No autoplay or loop. |
| Selection, filtering, review, errors, and focus | Immediate | No dependency on an animation finishing. |
| Reduced motion or motion off | Immediate static final state | OS reduced motion takes priority over the enabled project preference. |

Short hover feedback may paint a small region; it is not claimed to run only on the compositor. The separate decorative study uses transform/opacity and leaves layout dimensions and controls stable. The web.dev reference informs property selection and deliberate performance inspection; it does not guarantee smoothness on every device. Do not add permanent `will-change` without an observed need.

The original poster is visible from first paint. There is no entrance sequence, stagger, marquee, cursor follower, animated scrolling, flashing emphasis, or continuous background. Adding a session does not bounce its card or move the focused control. A successful local review uses persistent text, not a celebratory animation standing in for an outcome.

## Deliberate decorative activation

The preview's **Play motion study** button requests one 600ms run on three decorative bars. It does not start an event, submit a plan, invoke an agent, or advance the planner.

- Do not autoplay on load, scrolling, hover, appearance changes, filtering, selection, or review.
- A repeat activation cancels the prior run before requesting its replacement; animation instances do not accumulate.
- Keep the static final composition present when idle and restore it after completion or cancellation.
- Motion off, a live reduced-motion preference, or a hidden document cancels active movement immediately. Becoming visible again does not automatically replay it.
- If the animation API is unavailable, keep the static composition and explain the unavailable study without blocking other controls.
- Keep decoration outside the accessibility tree and pointer/keyboard hit testing. The native study button keeps a stable position and focus.

This is a selected optional demonstration. Projects may omit it entirely and retain Pulse's identity through color, type, and static geometry. A future project choosing additional motion documents its purpose, activation, cancellation, and static equivalent.

## Reduced motion and user control

Honor `prefers-reduced-motion` from the first render. A visible motion checkbox lets users make feedback immediate even when the OS permits movement. Turning motion on does not override OS reduced motion or automatically start the study.

Keep essential headings, session information, plan entries, review/error content, and recovery links visible without motion. Focus transfers and status announcements remain immediate. No state should depend on motion alone; use stable labels and readable results.

Test the initial static view, one finite run, repeat activation, live reduced/off changes, document visibility cancellation, unsupported API behavior, and no-JavaScript content. Representative browser checks do not establish actual low-end-device frame performance or validate unimplemented future effects. [Validation.md](validation.md) records the evidence actually collected.
