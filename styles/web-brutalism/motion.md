# Web Brutalism — optional feedback

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

The content-first composition is complete without animation. **This is an Atlas proposal**, not a historical requirement or a copied source token. Load it only when the requested work includes transitions; the reading surface and native navigation do not depend on it.

## Bounded treatment

| Event | Atlas reference behavior |
| --- | --- |
| Hover on an enabled input, select, button or index row | Optional **100ms ease** transition on `border-color`, from theme Border toward theme Ink. |
| Temporary button press | Immediate underline; no translation, scaling or shadow movement. |
| Focus, checked state, count, error or export status | Immediate visual and programmatic update. |
| Theme or appearance change | Immediate replacement; no palette fade or geometry morph. |
| Article navigation and disclosure | Native fragment navigation and native disclosure behavior; no added smooth scrolling or opening animation. |
| Page, text, decoration and background | Static; no entrance, marquee, loop, tilt or pointer-following effect. |

The optional setting starts **Off**. Transition only the named border-color property; do not use `transition: all`. The border must already be present so hover does not change layout or target size. Its final color is supplementary feedback. A link is underlined before hover, a checkbox exposes its native checked state, and readable counts describe the selection regardless of any border interpolation.

Nothing waits for an animation event. Filtering, title validation, download preparation and status announcements use the actual operation's state. The browser may block or redirect a download; a completed transition cannot prove that a file was saved.

## Preferences and interruption

Enable feedback only when the local setting is On and the device permits it. Under `prefers-reduced-motion: reduce`, remove the optional transition. Forced colors also removes transitions and uses the system-color fallback in [style.md](style.md). Handle live preference changes, including during hover or press, without losing focus or selection.

A browser without the optional media-query support or with scripts disabled still gets a useful static document. Do not animate the return to the static state or introduce instant transforms as a substitute.

[SC 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) concerns disabling nonessential interaction motion and is **Level AAA**. [Technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) describes a reduced-motion approach. These references support respecting preferences; they prescribe neither Atlas's 100ms timing nor a transition for this composition.
