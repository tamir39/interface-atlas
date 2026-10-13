# Play — optional effects

Play's rounded surfaces, bold typography, colorful regions, firm boundaries, and offset shadows establish its character. Optional effects should support the content. [Design rules](design.md) define the readable layer and [motion rules](motion.md) define immediate fallbacks.

## Tactile surfaces and static stickers

**Source observation:** the Play shadow token offsets a hard shadow 4px right and 5px down, using dark ink in light appearance and `#0c0612` in dark. Source project/lab cards have ink boundaries, primary buttons have 3px/3px ink shadows, the emblem is a small yellow marked shape, and the profile backing has a 2-degree tilt.

**Atlas proposal:** use the retained hard panel shadow selectively around expressive project surfaces and component specimens. Keep inputs, reading, labels, and action rows level. Static original CSS shapes or a small sticker may sit beside an introduction when they leave meaningful copy, hit targets, and focus clear. The reference preview's composition and shapes are original Atlas work.

[Samuel Breznjak's Neobrutalism components](https://www.neobrutalism.dev/docs) is an **additional Atlas comparison** for prominent boundaries and offset shadows. It does not establish that Tamir used those components. Its September 2026 documentation describes Base UI components and light-only palettes; Play's dark values come from Tamir's source. No Neobrutalism component, palette, icon, or implementation is imported.

No animation runtime is required for these static treatments. Use a system-color boundary in forced colors when shadows and fills are unavailable. A shadow cannot be the only indicator of selection, focus, or state.

## Optional sphere artwork

**Portfolio inspiration credit:** [Interactive Hero Backgrounds](https://21st.dev/@ravikatiyar162/components/interactive-hero-backgrounds), published by **Ravi Katiyar / @ravikatiyar162**.

**Observed local adaptation:** Tamir's pinned hero-artwork notes describe original Canvas 2D scenes inspired by selected 21st.dev interaction concepts. Play has seven shaded spheres that float, repel the pointer, collide, and scatter on activation before returning toward their home positions. This is an original local adaptation, not imported catalog implementation.

The source renderer mounts for a fine pointer and hover-capable desktop at least 1024px wide within its visible theme scope. Its native effect button has an accessible label and keyboard activation. Reduced motion or motion-off produces static artwork and disables effect activation. Offscreen and hidden-tab observation stops animation frames; pixel density is capped at 2, and listeners/observers are cleaned up when replaced or removed.

**Atlas proposal:** a project may select original sphere decoration only after checking text/background composition, performance, keyboard behavior, focus visibility, reduced/static fallback, and lifecycle cleanup. Omit it on small or coarse-pointer screens and keep content useful when canvas or script is unavailable. Do not place required status or instructions inside the canvas.

The reference preview selects no canvas, sphere loop, or sphere activation. The external component's reuse terms remain **unresolved**; its reference URL is not permission to copy code, assets, or dependencies. An actual import needs its own verified version, license, notices, and focused validation.

## Optional star and color-trail cursor

**Source observation:** the Play cursor is a supplementary asterisk mark with three small colored trails. It preserves the native pointer and hit targets. The follower operates for mouse input on fine-pointer, hover-capable devices, hides over text inputs, textarea, select, editable content and frames, and hides on keyboard use, blur, pointer leave, hidden tabs, reduced motion, motion-off, or forced colors. Animation frames stop once the follower settles.

**Atlas proposal:** a cursor effect is an optional expressive portfolio selection. It must not replace the native pointer, intercept events, obscure text editing, imitate a loading state, or become necessary for locating a control. It requires its own eligibility, lifecycle, visibility, and performance checks. The preview includes no cursor follower or trail, and copies no source Lucide mark.

## Acceptance checks

Check actual composited text contrast, readable selection, visible focus, contained decoration, narrow reflow, 200% text resizing, keyboard use, native text selection, forced colors, and motion preferences. Decoration must not change reading order, obscure errors, or provide the only state meaning.

Keep static styling, continuously animated decoration, and request-state feedback separate. [Sources.md](sources.md) preserves the creator, inspiration, and reuse boundaries; any imported package or artwork requires a new source record.
