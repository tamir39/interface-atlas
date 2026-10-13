# Swiss — motion specification

Short feedback should make interaction clear while keeping content and targets stable. These settings distinguish inspected source values from Atlas proposals. Pinned files and creator credits are recorded in [sources.md](sources.md).

## Retained source settings

| Role | Source setting | Interpretation |
| --- | --- | --- |
| CSS component feedback | 160ms; declared `cubic-bezier(0.2, 0, 0, 1)` | Source shorthand attaches theme easing explicitly to transform. Uniform easing for all feedback properties is an Atlas normalization. |
| Theme entrance | 180ms tween, `cubic-bezier(0.22, 1, 0.36, 1)` | Initial opacity 0 and horizontal offset -18px; final opacity 1 and offset 0. |
| Shared press feedback | Scale `0.96` | Optional source interaction; not mandatory for every control. |
| Eligible project hover | Horizontal translation 4px and offset accent edge | Optional portfolio movement, separate from flat resting geometry. |

The source helper defines the entrance, but the pinned artwork notes describe the homepage hero as immediately visible with no entrance or stagger after its separate brand introduction. Do not infer that every source region uses the entrance helper. Atlas does not adopt the portfolio loading introduction, animated identity sequence, theme reveal, or page-background theme cycling.

CSS feedback and entrance describe different roles. A single universal timing cannot represent both.

## Proposed project rules

Use 160ms color and border feedback with the declared CSS theme easing consistently as an Atlas normalization. The reference preview uses this restrained feedback only. Feedback duration is not a simulated loading delay.

Keep primary hero and page content visible immediately. If a project selects the source entrance, use it only for a secondary region once, keep essential information present, and avoid replaying when appearance changes, data refreshes, or the user returns. Avoid sequential letter reveals, typewriter text, and automatic staggering as default reading behavior.

For compact workflows, retain stable targets and immediate content. A project may choose 120–160ms feedback and an opacity-only panel change up to 180ms; record the chosen alternative. Do not animate sorting, filtering, streaming values, or pending commands by moving the focused item. Preserve selected context and provide meaningful status text.

The optional press scale and project hover may be omitted where they reduce pointer accuracy or repeated-use clarity. The preview omits movement, entrances, cursor effects, animated scrolling, and continuous loops.

## Reduced motion and user control

Honor `prefers-reduced-motion` from the first paint, with OS reduced motion taking precedence over an enabled project motion preference. A visible motion choice may turn off feedback animation without changing the information shown.

- Make transitions immediate under reduced motion or motion-off.
- Remove transforms and entrance offsets; render final content visible immediately.
- Keep navigation scroll behavior immediate.
- Replace optional canvas/cursor motion with static content; do not run hidden loops.
- Preserve state announcements and pending information without motion.

Test live preference changes, keyboard focus, immediate initial content, and fallback behavior without JavaScript. If a project adopts artwork, test its pause and cleanup separately; reference-preview checks do not validate unimplemented effects.
