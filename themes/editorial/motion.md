# Editorial — motion specification

Motion should clarify a change while keeping content and controls available. The timings below distinguish inspected source settings from Atlas proposals. See [sources.md](sources.md) for pinned source links and credits.

## Retained source settings

| Role | Source setting | Interpretation |
| --- | --- | --- |
| CSS component feedback | 240ms; declared `cubic-bezier(0.2, 0, 0, 1)` | The inspected transition shorthand applies the theme easing explicitly to transform. Applying it uniformly to every feedback property is an Atlas normalization. |
| Theme entrance | 380ms tween, `easeOut` | Initial opacity 0 and vertical offset 12px; final opacity 1 and offset 0. |
| Press response | Scale `0.96` | Optional source interaction, not required for all controls. |

The source CSS feedback and entrance timings serve different roles. Do not collapse them into a single universal duration.

## Proposed project rules

Keep essential hero and page content visible immediately. A secondary section may reveal once when it becomes relevant. Avoid replaying entrances when a theme changes, data refreshes, or the operator returns through navigation.

Animate the component that changes. Do not move focused controls, reflow a live list, or stagger important content by default. Do not introduce typewriter text as a default reading behavior.

For compact operational interfaces, proposed alternatives are:

- 150ms feedback for a control state change.
- 180ms opacity transition for a panel.
- No entrance movement during streamed data updates.

These compact timings are Atlas additions, not retained portfolio values. A project selects and records them explicitly.

The optional press scale may be disabled where movement interferes with frequent interaction, pointer accuracy, or data review. It must not be the sole indication that an action was accepted.

## Reduced motion and user control

Honor either an OS reduced-motion preference or a project's motion-off setting. Use immediate state changes, remove entrance offsets and scales, disable loops, and replace animated scrolling with immediate movement. Preserve visible feedback, state text, and data updates.

Atlas intentionally uses an immediate reduced-motion policy rather than retaining optional opacity animation. No workflow, control availability, loading completion, or focus transfer may depend on an animation completion event.

Continuous decoration requires an explicit user control. Pause animation when the page is hidden or the affected region is offscreen. The off state must persist for the selected preference scope.

## Verification

Check reduced motion at first paint and after a live preference change, project motion-off behavior, keyboard focus stability, repeated navigation, and interrupted animations. Confirm that content remains available if the animation runtime fails.

Credits: source timings and entrance behavior are from Tamir's local Editorial implementation. Reduced-motion implementation guidance references Matt Perry, the Motion team, and contributors' [React accessibility documentation](https://motion.dev/docs/react-accessibility); no documentation text or code is copied. Full provenance is in [sources.md](sources.md).
