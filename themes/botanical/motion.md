# Botanical — motion specification

Motion clarifies a state change while content and controls remain available. The records below distinguish inspected source settings from selected Atlas feedback. Pinned sources and creator roles are in [sources.md](sources.md).

## Source settings and their scope

| Role | Source setting | Interpretation |
| --- | --- | --- |
| CSS component feedback | 360ms, inherited `cubic-bezier(0.2, 0, 0, 1)` | The source shorthand explicitly applies the theme easing to transform; background, color, and shadow entries use CSS's default easing. Applying one curve uniformly is an Atlas normalization. |
| Motion theme transition | 500ms tween, `[0.16, 1, 0.3, 1]` | A separate transition object labeled “Gentle unfolds”; it is not the 360ms CSS feedback contract. |
| Defined entrance helper | Opacity 0, y 20px, scale 0.98; neutral x/rotation | A helper definition, not evidence that the mounted hero uses this entrance. |
| Shared press response | Scale 0.96 | Optional source behavior; it is not selected for the Atlas reference preview. |
| Optional project hover | Translate y -4px with changed shadow | Source eligibility requires hover capability, no reduced motion, and motion enabled; not selected in the preview. |

`themeEntrance` is referenced by `InteractionDemo`, which is not imported by the mounted application in the inspected snapshot. Mounted `InteractionLab` is separate. The pinned artwork notes describe no hero entrance or stagger after the introduction. Do not claim the defined 500ms transition and entrance helper together constitute an implemented Botanical hero reveal.

## Selected portable feedback

The Atlas preview selects **360ms color/background/border feedback with `cubic-bezier(0.2, 0, 0, 1)` uniformly**. Retaining the duration and curve while normalizing property easing is an Atlas adaptation. There are no entrances, card movement, press scaling, animated contours, cursor followers, or continuous loops in this selection.

Keep essential page and article content visible immediately. Avoid animating focused controls or shifting an open article when filters change. Do not replay entrances on appearance changes, return navigation, or content updates. Feedback supplements persistent state text and control semantics.

The compact specimen retains the selected 360ms feedback in this preview; density changes its insets only. A project may document a shorter compact feedback duration, but such a timing is a new proposal rather than a retained source default.

## Reduced motion and user control

An OS reduced-motion preference or a project's motion-off choice makes state changes immediate. Remove entrance offsets, scales, decorative loops, and animated scrolling while preserving state updates, labels, focus transfers, and data. Atlas selects immediate changes rather than an optional opacity fallback.

Apply this policy before motion can start and respond to live OS preference changes. OS reduced motion takes precedence over an enabled preview motion control. No action, availability, loading completion, or focus transfer depends on an animation completion event.

A project choosing continuous decoration provides an explicit enable/pause control, a persistent off state for its declared preference scope, static fallback, and hidden/offscreen pausing. The reference preview has no continuous decoration to pause.

## Verification

Check first-paint and live reduced motion, motion-off, immediate focus transfer, stable component dimensions, absence of unintended loops, and content visibility without JavaScript. Separately verify lifecycle cleanup and static fallbacks if optional contour or follower implementations are added.

Source inspection and numerical values do not establish actual rendered timing or accessibility. [Validation.md](validation.md) records the implemented reference checks and their limits.
