# Gallery — motion specification

Revision: **0.1.0-draft**. Reviewed: **2026-10-15**.

Gallery's identity comes from still imagery and composition. **All timings and behavior in this document are Atlas proposals**, not extracted Dawn/Horizon animation values. No animation library or upstream effect implementation is included.

## Optional control feedback

| Property | Proposed behavior |
| --- | --- |
| Color, background color, border color | **180ms**, `cubic-bezier(.2, 0, 0, 1)`, only when motion is enabled and the OS permits it. |
| Focus outline | Immediate. |
| Filtering, selected work, image state, and recovery | Immediate; no waiting for transitions. |
| Layout, dimensions, scrolling, image transforms, opacity, and entrance | No animation in the reference. |

Use an explicit property list rather than `transition: all`. Feedback can help show a native control's state, but the final state must already be represented by semantics and readable content. Do not communicate selected work, loading, availability, error, or completion by motion alone.

## Preference and static behavior

- **Motion off** removes optional transitions.
- **OS reduced motion** overrides the preview's enabled choice and makes feedback immediate.
- Changing the OS preference live updates the behavior; the user's stored enabled choice does not override the OS restriction.
- No images move, autoplay, cycle, fade in, zoom on hover, or wait for animation completion.
- No timer, visibility listener, or animation-API lifecycle is needed for continuous motion because the reference has none.

The finite change of an opaque control color does not start an ongoing process. There is no automatic motion to restart when a document becomes visible again. Do not add an entrance effect that hides the initial hero or delays discovery of its image.

## Image state and focus

Detail-image loading and retry follow real image events, not decorative timers. A failed image retains its description, caption, and credit, with an explicit local Retry control when JavaScript is available. Its failed visual becomes transparent immediately rather than fading. Completion for another image cannot change the active work's metadata or misleadingly announce that the active work completed. Retry hides its own pending control and focuses the corresponding work heading without animated scrolling.

Inspect focuses the selected article heading. View buttons retain their focus. Back follows the collection's visibility-aware recovery rule, and Clear filters returns focus to Search. These actions do not depend on a transition ending; there is no animated scrolling.

## Project adaptation

If a project introduces a carousel, zoom, video, or other movement, document its user purpose, control, reduced-motion/static alternative, media accessibility, and measured performance separately. Gallery's static preview does not validate such an adaptation.

Read [preview notes](preview/README.md) for the implemented local scope and [validation.md](validation.md) for the actual browser evidence. No real-device performance or complete accessibility claim follows from the 180ms timing proposal.
