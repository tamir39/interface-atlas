# Loading feedback recipe

Revision: **0.1.0-draft**. Original Atlas synthesis. Read for an unresolved waiting/outcome decision; the [source record](sources.md) identifies references and the [preview notes](preview/README.md) describe a manual fixture.

## Name the state owner

Identify the operation that may take time and the evidence that changes its state. Local work, a network request, a queued remote command and a continuing background job have different owners and completion boundaries. A decorative progress sequence is not that evidence. Do not delay an already completed result solely to play a sequence.

Choose the smallest applicable set of states: idle, pending, content, empty and failure are useful starting points, not a required application state machine. If a request can lose its reply, be superseded or continue after the view closes, resolve those actual service capabilities before promising retry or cancellation. Use [uncertain outcomes](../../knowledge/uncertain-outcomes.md) for that unresolved case rather than copying an entire remote-flow contract into every loading control.

## Preserve useful context

For first loading, a placeholder may reserve a known content shape. Keep it decorative and distinct from real records; a placeholder does not prove how many results will arrive. Expose a concise readable status through an appropriate semantic mechanism, with an announcement policy that avoids repeated noise.

For refresh, decide whether previous results remain useful and safe to show. If retained, label the waiting/freshness context and keep meaningful content available. Do not replace a user's working context with an empty skeleton merely because a component library offers one. If old content could cause a consequential wrong action, the project needs a deliberate stale-data and availability rule.

For a busy results region, coordinate its busy state and update sequence with the announcement channel. A status placed inside a busy region may be deferred until that region is no longer busy. Keep the user informed while the operation is pending and avoid duplicate announcements of the same transition.

## Resolve each outcome honestly

| Outcome | Contract to establish |
| --- | --- |
| Content | Replace or reconcile records only after the identified owner provides the result. Name a relevant count or update when useful. |
| Empty | Explain that the operation completed with no matching content; distinguish it from a failure or hidden/filter-only result. |
| Failure | State the known problem and the next useful route. Keep relevant input, selected context or prior content according to the project contract. |
| Retry | Define what is repeated and when it is safe. A UI retry label cannot establish remote idempotency. |
| Cancel or leave | State whether work stopped locally, a request to cancel was sent or the remote operation is confirmed cancelled. |

Keep errors and useful recovery available until the user can act on them. Do not hide a consequential message solely because a toast's timer ended. A fictional service endpoint or optimistic success label is not an implementation gate.

## Map the visual treatment

Use the established theme's surface, type, spacing and semantic state roles. Status meaning belongs in words and programmatic state as well as visual treatment. Use an opaque readable face or inspect actual compositing where a selected style is translucent. A decorative shimmer does not replace a loading message, and red alone does not explain a failure.

Choose animation only when it serves this task. Resolve its property, timing, repetition, stop behavior and preference fallback. A static placeholder and readable status must preserve essential information when motion is off, reduced or unavailable. Consider applicable pause/stop requirements for ongoing movement. A loop's elapsed duration is not an estimate of real progress; show a percentage only when there is a meaningful measured basis.

## Reference and handoff

The [manual fixture](preview/index.html) exposes idle, pending and chosen content/empty/error outcomes through explicit inspection controls. It sends no request and has no completion timer. Pending disables Start and focuses the resolve-items control; settlement and reset return focus to Start. Previous results remain during pending or error; a deliberate empty response clears them. The busy results region and the external status channel have separate roles. Placeholder animation is optional and off by default; reduced motion and forced colors remove it through CSS. These are finite specimen choices, not proposed product resolution controls.

Carry the actual state owner, transition evidence, retained-content rule, announcement/focus choices, retry/cancel limits, surface values and chosen motion into the project's handoff. Do not move focus into every refreshed result by default. If a transition removes the focused control, define a useful destination.

Exercise the relevant pending and outcome paths with real content, narrow layout, keyboard input, appearance and preference changes. Include interruption or late outcomes when the real operation permits them. Record browser, assistive-technology and service checks separately. [validation.md](validation.md) covers the Atlas fixture rather than a complete application or third-party library.
