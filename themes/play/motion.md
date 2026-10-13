# Play — motion specification

Play's tactile character can come from static geometry and shadows. Motion is an optional project choice; readable content and correct state must be immediate. The reference preview selects brief control feedback and no entrance sequence, sphere animation, cursor follower, animated scrolling, or continuous loop.

## Observed source settings

| Inspected source | Observed setting | Scope and limitation |
| --- | --- | --- |
| `app/themes.css` shared root | 240ms duration; `cubic-bezier(0.2, 0, 0, 1)` easing | Play inherits these values. The source control transition shorthand applies the theme curve explicitly to transform; other listed properties use their CSS default easing. |
| `app/themes.css` shared controls | Press scale `0.96`; 2px/-2px arrow translation on hover | Interaction feedback, not essential meaning. The source removes transforms under reduced motion or motion-off. |
| `app/themes.css` Play project hover | Rotate -1 degree and translate Y -3px; shadow grows to 7px/8px | Conditional on hover support, no reduced motion, and motion enabled. |
| `lib/themes.ts` Play transition | `type: spring`, duration 0.4 seconds, `bounce: 0` | Source animation-library configuration, not a universal CSS timing curve. Its label “Tactile springs” does not imply an overshooting bounce. |
| `lib/themes.ts` entrance helper | Opacity 0, Y 12px, scale 0.96, rotation -2 degrees; reduced returns the visible final state | Defined helper referenced by the unused InteractionDemo component. This is not evidence of an active hero entrance. |
| Pinned hero-artwork notes | Hero heading/profile stay static; heading changes immediately | The source explicitly describes no hero entrance or stagger. Its separate brand introduction and route states have their own behavior. |

[Sources and credits](sources.md) identifies the pinned files and responsible creators. Optional artwork/cursor source behavior belongs in [effects.md](effects.md), separate from portable control feedback.

## Portable project rules

Every rule in this section is an **Atlas proposal** unless identified as retained.

| Role | Selected Atlas treatment | Behavior |
| --- | --- | --- |
| Control color and border feedback | Retain 240ms duration and the source theme curve; apply it uniformly | Atlas normalization of the source shorthand. Keep layout and target dimensions stable. |
| Optional tactile press | Up to 2px diagonal translation | Original Atlas CSS choice, selected by the preview for enabled button presses with the static shadow retained. It is not a reproduction of the source spring runtime or 0.96 scale. |
| Initial content and preference, error, review, or request state changes | Immediate state/content updates | Do not hide useful content behind an entrance or use a timing as an artificial processing delay. |
| Native disclosure | Immediate content and state | The preview uses native details/summary without animated height or opacity. |
| Optional card tilt | Deliberate project selection only | Keep essential text level and the hit area usable. The source hover values are observations, not preview defaults. |
| Background updates | Preserve focus and reading position | Announce meaningful state changes without moving the active target. |

Keep a request's pending label visible until real acknowledgement in a real project. Decorative feedback cannot confirm a backend action. An optional completion flourish must follow confirmed completion and leave a persistent textual record.

An additional spring, overlay, entrance, or reward needs its own project selection, implementation terms, and focused checks. The package requires no animation library, and the preview does not import Framer Motion/Motion.

## Reduced motion and user control

These are **Atlas proposals**: honor `prefers-reduced-motion` from first paint, including live changes. OS reduced motion overrides a saved “Motion enabled” preference. A visible motion control may independently disable feedback.

Under reduced motion or motion-off, make transitions immediate, remove press/hover transforms and entrance offsets, keep navigation scrolling immediate, and render all useful content in its final visible state. Preserve validation, pending-request text, review context, acknowledgements, and status announcements.

A future sphere effect may use a static composition or omit decoration, while leaving the page readable. A future cursor follower must be absent when motion is reduced or disabled. Do not replace a stopped effect with hidden information.

Check initial visibility, live system preference changes, saved preferences, keyboard focus, press/hover behavior, and no-JavaScript content. The reference preview's browser evidence covers its implemented feedback only; it does not validate the source's spring runtime, sphere renderer, cursor follower, or any unselected entrance.
