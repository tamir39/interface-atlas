# Glassmorphism composition: evaluation design

## Bounded question

Can one optional material treatment sit on shallow interface chrome while preserving the selected theme’s palette, typography roles and geometry, and still leave essential content usable across light/dark appearance, difficult backgrounds, narrow layouts and opaque fallback?

The answer must be scoped. The specimen changes its reference tokens; it does not become the theme’s complete app. Existing theme previews and their validation records remain separate. A browser pass supports this particular composition, not the theme’s full compatibility with glass or a general accessibility claim.

## Invariants and deliberate changes

The generated profile preserves each theme’s page, surface, raised/panel, ink, muted, action/on-action, border, focus and error aliases, named body/display/mono stacks, and panel/control corners from its existing preview CSS. The manifest records missing-role aliases explicitly. Geometry must not be silently replaced with a universal glass radius. Named fonts use local fallbacks; font-file rendering is outside the trial.

Glass changes a shallow container’s fill alpha and backdrop blur. The underlying hue and corners remain the theme’s. Form entry, review/status information, table content and other essential task surfaces stay opaque. No nested glass, required motion, external imagery or image filters are introduced. Calm, bright and busy CSS backgrounds are stress fixtures, not new theme defaults.

Explicit opacity choice, reduced-transparency preference where supported, forced colors and the CSS base rule provide opaque alternatives. Reduced motion must preserve all information. Controls begin disabled and become active after successful enhancement so script failure does not leave theme-switching controls that appear operable.

## Fit decisions

“Preserve” describes an unchanged theme treatment. “Adapt” requires a documented, bounded departure. “Conflict” means glass should be rejected as the theme’s normal surface treatment; an exceptional overlay needs a project-specific reason and rendered checks. Every profile preserves extracted tokens, but applying glass itself is a surface change, so this evaluation claims no unchanged glass composition.

| Theme | Decision | Preserved in the specimen | Boundary and reason |
| --- | --- | --- | --- |
| [Blueprint](../../themes/blueprint/design.md#geometry-and-elevation) | Adapt | Blue drafting palette, body/mono roles, 8px/4px corners. | Limit glass to incidental chrome. Keep diagrams, construction rules, connectors and technical evidence sharp and opaque; blur would weaken drafting meaning. The offset shadow is not reproduced by the shared profile. |
| [Botanical](../../themes/botanical/design.md#geometry-and-elevation) | Adapt | Warm natural palette, serif role where specified and alternating corners. | A small supporting panel can be adapted; long reading and form surfaces remain opaque. A milky material must not erase the warm surface hierarchy or make leaf-like corners into a universal pill. |
| [Editorial](../../themes/editorial/design.md#geometry-and-elevation) | Adapt | Editorial color pairs, body/display roles, 24px panels and 12px input-derived control corners. The shared controls use the input radius rather than the theme’s pill-button radius. | A navigation/header treatment can be deliberate. Reading columns and input values remain opaque; the source’s selected raised shadow is not replaced across every section. |
| [Gallery](../../themes/gallery/design.md#spacing-layout-and-geometry) | Conflict | Restrained neutral palette, Inter stack, 4px panel/control corners. | The theme asks for flat framing and text/controls outside imagery on opaque surfaces. Glass over artwork would change perceived image colors and compete with the work. The fixture uses CSS shapes, so it cannot establish image fidelity. |
| [Layered](../../themes/layered/design.md#shape-material-and-depth) | Adapt | Selected tonal roles, body stack, 24px panels and 12px controls. | The theme explicitly defines opaque tonal surfaces and excludes glass from its base identity. An opted-in chrome overlay is a named departure; modal/editor content and tonal task layers stay opaque. |
| [Play](../../themes/play/design.md#geometry-and-elevation) | Conflict | Playful palette, type roles, 30px/14px corners. | Hard ink boundaries and offset shadows supply the tactile character. A soft translucent surface conflicts with that default. The specimen intentionally does not claim to preserve the full shadow/tilt treatment. |
| [Precision](../../themes/precision/design.md#geometry-and-elevation) | Conflict | Productive cool palette, Plex stacks and 4px geometry. | The theme specifies flat, opaque data/action surfaces. Glass is inappropriate for the working canvas; a separately justified popover is a project adaptation that needs its own focus and content tests. |
| [Pulse](../../themes/pulse/design.md#geometry-and-elevation) | Adapt | Accent palette, type roles, 12px panels and 6px controls. | Bound the material to incidental event chrome. Program, schedule and plan data stay opaque; poster geometry can remain a background fixture without blurring labels or simulating progress. |
| [Swiss](../../themes/swiss/design.md#geometry-and-elevation) | Conflict | Red action pair, Manrope/mono stacks and near-square 2px corners. | The theme explicitly avoids glass, bevels, soft shadows and rounded incidental polish. Keep rules/alignment/flat surfaces as the default. A safe profile rendering does not waive this design conflict. |

## Browser method

The matrix contains **216 states**: 9 profiles × 2 explicit appearances × 3 static backgrounds × 2 transparency choices × 2 widths (320px and 1280px). This is a finite specimen matrix, not a device/browser coverage count. The validator inspects visible HTML text, enabled field boundaries, control target sizes, page reflow, opaque essential surfaces and actual computed glass fills. It records all profile variables so nine labels over one palette cannot pass as nine themes.

Contrast uses WCAG 2 luminance ratios, consistent with the existing Atlas validators. Every glass surface starts with an arbitrary sRGB backdrop channel interval from black to white. Its computed alpha fill, then descendant fills, bound the final background. Gradients use the same conservative interval. Text or boundary foregrounds are composited over those bounds; disjoint luminance intervals give a lower-bound ratio. This checks the translucent composition, not only the original opaque palette pairs. Blur cannot worsen the assumption because any blurred sRGB backdrop remains inside the full channel range. Image fidelity, blend modes, opacity on whole ancestors and unsupported color constructs are outside this model; unsupported constructs in measured scope fail rather than being skipped.

Normal text requires 4.5:1; large text requires 3:1. Field borders are checked against fill and adjacent surface at 3:1; the settings select’s keyboard ring is checked against its adjacent opaque surface at 3:1 in all light/dark profiles. Focus on other controls is exercised through native keyboard behavior and visual inspection, without claiming a numerical ring audit of every target or adjacent artwork. The optional 44px control target is an Atlas comfort goal. Hidden/disabled text, placeholders, native select popups and validation bubbles, checkbox glyph internals, SVG/decoration and antialiasing are excluded. These numerical checks are not an accessibility conformance audit.

Separate trials exercise native labels/landmarks, skip link and Tab flow, required/minlength validation, local form feedback, live system appearance, forced colors, reduced motion, reduced transparency when the browser can emulate it, no JavaScript and an aborted enhancement script. The unsupported-backdrop trial removes the shipped CSS `@supports` blocks and exercises its base fallback in Chromium; it is branch substitution, not proof from an old browser engine.
