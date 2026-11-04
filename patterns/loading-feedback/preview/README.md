# Loading feedback reference preview

Open [index.html](index.html) directly or use the [published preview](https://tamir39.github.io/interface-atlas/patterns/loading-feedback/preview/). The three labs share original [CSS](../../preview-assets/styles.css) and [JavaScript](../../preview-assets/preview.js); no build, installed package, external font or service is required for local viewing.

Manual state simulator: no network request is sent. You choose each outcome; motion never decides success.

## Contract

This is a manual state fixture, not a request implementation. Start makes the result region busy and enables three outcome controls, then focuses Resolve with items. Resolving supplies three original records, an explicit empty set, or an error. Each outcome retires the pending state and focuses the available start/retry action. Previous results remain during pending and error; an explicit empty response clears them. Reset returns to idle and makes inactive outcome events ineffective. The live status is outside the busy result region. Optional placeholder motion starts off and never changes outcome; reduced motion and forced colors disable it through CSS.

Appearance offers System, Light and Dark. System follows live device changes. Choices and widget state belong to the open page; reload resets them. Without JavaScript, or when the script fails to load, the original reference content remains readable and enhancement controls remain disabled. Hero links work natively in either case.

## Reference values and limits

The original neutral palette, 20px outer panels, 16px inner panels, 10px controls and 3px focus outline with 3px offset are specimen choices. Button feedback is immediate, without press movement. The loading placeholder uses a 1.8s opacity pulse only when explicitly enabled; reduced motion and forced colors remove the animation. No fixed timing or geometry is a universal project rule.

Forced colors use Canvas/CanvasText for document content, LinkText for ordinary links and ButtonFace/ButtonText for enabled controls and the button-like skip link. Unavailable authored buttons and selects use GrayText on ButtonFace. Native checkbox glyphs and select popup internals remain under browser/system control. CSS preserves usable boundaries, labels and focus.

Read the [source record](../sources.md) for creator and license boundaries and the [validation record](../validation.md) for checks actually performed. A shared neutral specimen does not establish all-theme compatibility, accessibility conformance, real-service behavior or measured usability improvements.
