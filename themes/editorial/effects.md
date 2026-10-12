# Editorial — optional effects

A project explicitly selects any effect in this document. Effects do not determine the theme's suitability and are not prerequisites for its identity. Use [design.md](design.md) for the readable content layer and [motion.md](motion.md) for motion controls.

## Selective panel shadow

**Source light:** `0 16px 40px -28px #493b6155`.

**Source dark:** `0 20px 45px -24px #00000099`.

Use this on a meaningful raised panel when elevation helps grouping. Avoid shadows on every card inside an already raised panel. Maintain a visible boundary when the shadow does not provide adequate separation.

## Flowing paths

**Source behavior:** Tamir's portfolio includes an original Canvas 2D adaptation of the flowing-path interaction concept, credited locally to **Bundui.io's [Floating Paths](https://21st.dev/@bundui/components/floating-paths)**. Fine lavender paths flow slowly, bend toward the pointer, and respond to a click with a wave.

The local artwork notes explicitly describe custom adaptations rather than imported catalog source code. The external component's implementation reuse permission has not been established; do not treat the inspiration credit as permission to copy it.

**Atlas proposal:** default to a static treatment. A project may offer an explicit control to enable motion in one hero region. Avoid article reading areas, data tables, logs, and operational workspaces.

- Keep essential text and controls in normal HTML and readable independently of the canvas.
- Mark purely decorative artwork `aria-hidden`; it must not intercept pointer or keyboard interaction.
- If an effect has an intentional interactive action, expose it through a separate native labeled control. Pure decoration does not create a hidden page action.
- Use a static treatment for touch, coarse pointers, reduced motion, and motion-off.
- Retain the source implementation's deferred desktop eligibility, pixel-density cap of 2, and hidden/offscreen pausing where a project adopts this behavior.
- Clean up animation frames and resize, visibility, and pointer listeners when the effect is removed or replaced.

The implementation code is not included in this package. A separate implementation or authorized adaptation would require its own source and reuse record.

## Cursor halo

**Source character:** an optional 32px circle, an accent outline, and a 6% tinted fill. It is supplementary to the native pointer.

**Atlas proposal:** disabled by default. If selected for a fine-pointer interface, retain the native pointer, prevent event interception, hide around text-entry and keyboard interaction, and disable on coarse pointers, reduced motion, or motion-off. Stop animation frames when the follower settles.

Do not use the halo to communicate selection, permission, progress, or control availability.

## Acceptance checks

Verify text contrast after compositing, focus visibility, native-pointer behavior, keyboard access, touch fallback, reduced motion, explicit motion controls, hidden/offscreen animation pausing, and frame cleanup.

A failed effect must leave content and controls usable. A static fallback must not change reading order or replace essential information.

Source creator, source snapshot, conceptual inspiration, and reuse status are recorded in [sources.md](sources.md).
