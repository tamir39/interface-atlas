# Botanical — optional effects

A project explicitly chooses any effect in this document. The readable palette, typography, and geometry in [design.md](design.md) carry the direction without moving decoration. See [motion.md](motion.md) for user controls and immediate fallbacks, and [sources.md](sources.md) for credits and reuse limits.

## Selective elevation and organic shapes

**Source light shadow:** `0 18px 35px -25px #293d2f55`.

**Source dark shadow:** `0 20px 45px -24px #00000099`, inherited from the shared dark rule.

Use this elevation on a meaningful raised group; avoid repeated shadows inside an already raised panel. A shadow is not a substitute for a necessary control boundary.

The source Botanical emblem uses alternating `50% 3px 50% 3px` corners. Its decorative orbit uses `45% 55% 65% 35%`; its profile surface has a -1 degree tilt while content stays upright. These are source composition choices, not universal component defaults. The Atlas preview uses its own static vector composition and fictional studio studies.

The source's optional desktop project hover translates upward 4px with `0 20px 35px -22px #293d2f55`. It is restricted to hover-capable devices without reduced motion and with motion enabled. Atlas's reference preview selects color/border feedback only; it does not adopt moving cards.

## Living contour concept

**Source behavior:** Tamir's original Canvas 2D adaptation draws organic green contours, responds to the pointer, and sends a bloom outward when activated. Its notes credit **Kedhareswer Naidu / @kedhareswer's [Isoline Bloom](https://21st.dev/@kedhareswer/components/isoline-bloom)** as conceptual inspiration. The local renderer adds no new dependency or WebGL context.

The source defers the artwork to fine-pointer, hover-capable desktops at least 1024px wide. A native labeled button exposes the deliberate response to keyboard users. Reduced motion and motion-off keep artwork static and disable the effect action. Observers stop frames when hidden or offscreen; pixel density is capped at 2; listeners, observers, and frames are cleaned up when the scene is removed.

**Atlas proposal:** static composition by default. A project may let users explicitly enable contours in one presentation region. Keep article reading areas and working surfaces calm, and recheck text after compositing artwork beneath it.

- Keep essential content and controls in normal HTML, readable independently of the drawing.
- Mark pure decoration `aria-hidden` and prevent pointer interception. An intentional response belongs to a separate native labeled control.
- Provide a static treatment on touch/coarse pointers, reduced motion, or motion-off.
- Pause continuous work when hidden/offscreen and clean up frames, observers, and listeners on removal.
- Never use decorative blooming to indicate success, saving, permission, selection, or progress.

No contour implementation is included in this package. The external listing's MIT indication must be checked against the exact future package/version, dependencies, and required notices before importing its code. The portfolio's own implementation terms remain a separate unresolved matter.

## Leaf follower

**Source character:** a supplementary 28px leaf mark, 1.4 stroke weight, rotated -18 degrees, following a mouse with a time-adjusted smoothing coefficient of 0.14. The native pointer remains available. The source hides the follower for text entry, keyboard interaction, lost window focus, hidden documents, coarse pointers, reduced motion, motion-off, and forced colors. Frames stop when movement settles.

**Atlas proposal:** disabled by default. If chosen for a fine-pointer presentation region, retain native pointers and hit targets, prevent event interception, preserve those eligibility rules, and verify that it never obscures reading or focus. A particular leaf icon requires its own selected asset/source record; this package includes no source icon or follower implementation.

## Acceptance checks

Verify composited text and control contrast, focus visibility, keyboard activation for any real effect action, native-pointer behavior, touch/static fallback, motion-off and live reduced-motion changes, hidden/offscreen pausing, and cleanup.

An unavailable effect leaves content and controls usable. Static fallbacks preserve reading order and essential information. Optional effect checks are distinct from the preview's static-artwork evidence.
