# Swiss — optional effects

The theme's core identity comes from typography, alignment, flat geometry, and restrained color. A project explicitly selects any decorative effect. [Design rules](design.md) define the readable content layer; [motion rules](motion.md) define immediate fallbacks.

## Structural rules and static composition

**Source:** strong 3–5px rules introduce selected portfolio regions; resting surfaces have no shadow and 2px corners. This is ordinary styling, not an animation dependency.

**Atlas proposal:** use one deliberate rule to establish an important group, along with a semantic heading and useful spacing. A static grid study may appear in a hero if it remains separate from content, controls, and reading order. The reference preview's static composition is original Atlas artwork, not a Kinetic Grid implementation or exported historical poster.

## Kinetic grid

**Source concept:** Tamir's portfolio has an original Canvas 2D adaptation of a grid that bends near the pointer and responds to clicks with red ripples. Its notes credit **SatoriUI / @satoriui's [Kinetic Grid](https://21st.dev/@satoriui/components/kinetic-grid)**. The source describes custom interaction adaptations rather than imported catalog code.

The inspected component listing identifies SatoriUI and displays an MIT License label. Atlas includes none of that component's implementation. Before a future import, inspect the exact selected code package, copyright notice, and license text; a catalog label does not identify every dependency or replace required notices.

**Atlas proposal:** disabled by default. A project may select one bounded hero region and offer an explicit native control to enable motion. Avoid article reading, tables, logs, and frequently changing review workspaces.

- Keep all essential text, links, and controls in normal HTML and readable independently of artwork.
- Mark pure decoration `aria-hidden`; it must not intercept pointer input or keyboard navigation.
- Expose an intentional effect action through a separate native labeled button. Do not turn an unlabeled page background into an action.
- Use static composition for coarse pointers, touch, reduced motion, and motion-off.
- If adopting source performance behavior, defer desktop eligibility, cap pixel density at 2, and pause offscreen and in hidden tabs.
- Remove animation frames and resize, pointer, and visibility listeners when replacing or removing the effect.
- Recheck text and focus after compositing over every frame and background.

No canvas implementation is included in this theme package or its reference preview. Any implementation or authorized adaptation needs its own provenance and checks.

## Precision-square cursor

**Source character:** an optional 9px solid square supplementary to the native pointer, with the current theme color.

**Atlas proposal:** disabled by default. If selected for fine-pointer devices, keep the native pointer, prevent event interception, and hide the follower around text entry and keyboard interaction. Disable on coarse pointers, reduced motion, and motion-off; stop frames when settled. The square must not communicate selection, permission, progress, or availability.

The preview preserves the normal browser pointer and includes no follower.

## Optional project hover

**Source:** eligible portfolio cards may translate horizontally by 4px and add an offset red edge on hover. Shared press feedback may scale to `0.96`. These are observed interaction details, not resting elevation.

**Atlas proposal:** prefer color and border feedback. If a project selects movement, keep targets stable enough for repeated interaction, do not move focused controls, retain an equivalent focus treatment, and remove all transforms under reduced motion or motion-off. The reference preview does not select these movement effects.

## Acceptance checks

Verify composited contrast, focus visibility, native pointer behavior, keyboard access, text selection, touch fallback, explicit motion control, reduced motion, hidden/offscreen pausing, and cleanup. An effect failure must leave content and controls usable. A static fallback must not change meaning or reading order.

The source revision, creator, conceptual attribution, and reuse boundaries are recorded in [sources.md](sources.md).
