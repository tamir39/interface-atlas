# Blueprint — optional effects

The core identity comes from cobalt color, technical hierarchy, small corners, and ordered composition. Projects deliberately select decoration. [Design rules](design.md) define readable content; [motion rules](motion.md) define immediate fallbacks.

## Static drafting motifs

**Source:** selected hero and specimen regions use a 24px grid, drawn with `#1644b80b` lines in light appearance and `#8ab7ff12` in dark. Project boundaries, profile outlines, and orbit lines can be dashed. Resting panels use 8px corners, controls 4px corners, and a small low-alpha offset shadow.

These are decorative treatments. Faint grids, dashed construction lines, and offset shadows do not replace a necessary control boundary, a diagram relationship, or a selected-state label. Do not place a faint background grid beneath every paragraph or dense table.

**Atlas proposal:** use a bounded static study with plain content separate from it. Original preview vector art and architecture diagrams are Atlas compositions; neither is exported portfolio artwork or an external component implementation. Diagram relationships that convey meaning require readable labels and an equivalent text account, independently of decorative geometry.

## Projected wireframe

**Source concept:** Tamir's portfolio has an original Canvas 2D scene inspired by **Meng To / ThreeUI's [Wireframe Forms](https://21st.dev/@mengto/components/wireframe-forms/wireframe-forms-cylinders)**. Projected linework follows the pointer; an explicit action cycles cube, sphere, and cylinders. The [ThreeUI reference](https://threeui.com/ui-elements/wireframe-forms) separately describes rotating Canvas 2D forms.

**Atlas proposal:** disabled by default. A project may select one bounded hero study with an explicit native action. Keep core headings, navigation, descriptions, and controls in HTML, usable if artwork fails.

- Mark pure decoration `aria-hidden`; prevent it intercepting pointer input or keyboard navigation.
- Keep effect activation separate from navigation and meaningful diagram inspection. Label the effect control by its actual action.
- Use static composition for coarse pointers, reduced motion, and motion-off. Avoid reading regions, repeated review work, logs, or changing operational values.
- If adopting source eligibility, defer the renderer to hover-capable, fine-pointer desktops at least 1024px wide; cap pixel density at 2 and pause offscreen and in hidden tabs.
- Remove frames, observers, and resize/pointer/visibility listeners when replacing the effect.
- Recheck composited text and focus contrast across frames. Opaque token calculations do not validate translucent artwork.

The catalog listing displays **MIT License**. No external component code or license text is redistributed here. Future imports require inspecting the exact package, version, dependencies, copyright notice, and license file. That catalog label does not resolve the portfolio's separate implementation terms.

The preview selects static vector compositions and includes no animated wireframe renderer.

## Drafting crosshair

**Source character:** a 32px circular supplementary mark with a faint outline and 42px horizontal/vertical axes, following the pointer in the current accent color. The native pointer remains intact, the follower does not receive events, and source logic hides it during keyboard/text-entry interaction and stops idle frames.

**Atlas proposal:** disabled by default. If selected for fine-pointer devices, keep the native pointer and normal text selection, suppress the follower around text entry and keyboard use, and disable it for coarse pointers, reduced motion, motion-off, and forced colors. It must not communicate permission, precision of data, selection, progress, or readiness.

The reference preview uses the normal browser pointer and has no follower.

## Optional hover and press movement

**Source:** eligible project hover translates by `(-3px, -3px)` and changes the offset shadow to `8px 8px 0 #1644b820`. Shared control press feedback can scale to `0.96`. The source hover shadow literal remains cobalt even in dark appearance; it is distinct from the dark resting shadow.

**Atlas proposal:** prefer color/border feedback. If a project selects movement, preserve stable targets and equivalent focus feedback, remove transforms under reduced motion or motion-off, and verify the actual shadow composite in both appearances. The preview selects no card movement or press scaling.

## Acceptance checks

Verify meaningful diagram alternatives, composited contrast, focus visibility, native pointer behavior, keyboard/touch fallback, explicit motion choice, reduced motion, hidden/offscreen pausing, and cleanup. Effect failure must preserve content, controls, and reading order. Source revision and reuse boundaries are in [sources.md](sources.md).
