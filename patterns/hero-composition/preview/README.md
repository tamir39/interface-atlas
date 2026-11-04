# Hero composition reference preview

Open [index.html](index.html) directly or use the [published preview](https://tamir39.github.io/interface-atlas/patterns/hero-composition/preview/). The three labs share original [CSS](../../preview-assets/styles.css) and [JavaScript](../../preview-assets/preview.js); no build, installed package, external font or service is required for local viewing.

Original fictional brief: Weeklight, a planning concept. Both calls to action lead to content on this page.

## Contract

The fictional Weeklight hero has an h2 inside a lab page with one h1. Explore the example and See layout decisions are ordinary fragment links to real, readable sections; no script intercepts their URL or browser history. The controls switch short/long original content and split/stacked layout while retaining the same brief and destinations. Supporting claims describe the fictional layout rather than inventing customers or measured results.

Appearance offers System, Light and Dark. System follows live device changes. Choices and widget state belong to the open page; reload resets them. Without JavaScript, or when the script fails to load, the original reference content remains readable and enhancement controls remain disabled. Hero links work natively in either case.

## Reference values and limits

The original neutral palette, 20px outer panels, 16px inner panels, 10px controls and 3px focus outline with 3px offset are specimen choices. Button feedback is immediate, without press movement. The loading placeholder uses a 1.8s opacity pulse only when explicitly enabled; reduced motion and forced colors remove the animation. No fixed timing or geometry is a universal project rule.

Forced colors use Canvas/CanvasText for document content, LinkText for ordinary links and ButtonFace/ButtonText for enabled controls and the button-like skip link. Unavailable authored buttons and selects use GrayText on ButtonFace. Native checkbox glyphs and select popup internals remain under browser/system control. CSS preserves usable boundaries, labels and focus.

Read the [source record](../sources.md) for creator and license boundaries and the [validation record](../validation.md) for checks actually performed. A shared neutral specimen does not establish all-theme compatibility, accessibility conformance, real-service behavior or measured usability improvements.
