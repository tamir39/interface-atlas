# Precision — optional effects

Precision's identity comes from structured layers, aligned information, modest typography, stable controls, and explicit states. Decorative effects are optional project selections. [Design rules](design.md) define the readable content layer; [motion rules](motion.md) define immediate fallbacks.

## Structured surface layers

**Reference concept:** Carbon uses role-based neutral layers to organize depth. **Atlas proposal:** use the Precision page/panel/surface values to distinguish a main work region from related evidence. Keep the layers opaque and flat. Separate regions with spacing, headings, and useful rules before adding another container.

This is ordinary static styling. It requires no animation or component runtime. The colors and geometry are independent Atlas choices, not a reproduction of IBM's theme values.

## Optional overlay elevation

An anchored menu, popover, or dialog may use one restrained shadow and a visible boundary when it must appear above the working surface. Select exact values in the project design document and inspect both appearances. This theme does not prescribe an untested universal shadow token.

Keep the overlay within the viewport, maintain a clear dismissal path, and ensure focus is not clipped. Use the correct native or accessible interaction behavior; a shadow does not define modality. Under forced colors, retain a visible system-color boundary. No floating overlay is selected in the reference preview.

## Selection and state emphasis

Use a bounded selected background, an explicit marker, and applicable semantics to keep the chosen item identifiable. A status may use a small icon or rule with its text label. Keep the necessary meaning present when color, JavaScript, or visual decoration is unavailable.

AI origin or provenance may have a plain textual label when users need it to interpret evidence. A project should decide the label's wording, scope, and source record. Precision requires no AI glow, gradient, animated emblem, or decorative attribution badge.

Do not pulse “Running,” move rows during filtering, or decorate an unacknowledged command as complete. A confirmed outcome may receive brief static emphasis; keep a persistent readable record. Fake charts, quantified progress, and decorative telemetry are not substitutes for measured data.

## Acceptance checks

Verify actual text and boundary contrast, selected-state meaning, focus visibility, forced-color fallback, narrow reflow, keyboard use, and uninterrupted text selection. Decoration must not intercept pointer events, change reading order, hide evidence, or require motion to communicate status. No canvas, custom cursor, or continuous effect is included.

[Sources.md](sources.md) records upstream concept credits and the original Atlas implementation boundary. An added effect or imported package needs its own creator, version, license, and focused validation record.
