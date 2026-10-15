# Gallery — optional effects

Revision: **0.1.0-draft**. Reviewed: **2026-10-15**.

Gallery is complete with static imagery, opaque surfaces, and immediate interaction. Image scale, whitespace, and restrained typography carry its identity. Every treatment below is an Atlas proposal; no Shopify effect, shader, carousel, or third-party implementation is imported.

## Framing and composition

- Keep media corners at the proposed **0px**, with a flat presentation rather than a decorative card shell.
- Use different visual weights for a deliberate hero/detail pairing while retaining useful DOM order.
- Reserve a source-aware frame before an image loads; background fill can make a contained object readable without pretending the fill belongs to the image.
- Place captions, names, provenance, states, and actions outside the media on opaque interface surfaces.
- Use the necessary control border or ink marker for interaction. A decorative line or photographic edge is not the sole selected-state signal.

These are composition options, not instructions to distort an asset. Full-object inspection remains complete; contextual crops require a focal-point decision and an available uncropped view when accuracy matters. A new crop does not acquire a new photographer or source identity.

## Restraint around images

The reference excludes hover zoom, image rollover, parallax, animated masks, autoplay slides, drifting collage elements, continuous texture, and cursor followers. Those effects add no necessary meaning to the bounded collection/viewer flow.

Do not invert or desaturate imagery to force a light/dark match. Preserve source colors in both appearances. Do not place essential interface text on a photograph and assume a gradient guarantees contrast; actual image luminance and crop vary. A production project choosing an overlay must test its final image/crop/text pairing and keep an independent readable route to the information.

## Generated fixture boundary

The preview's Vessel, Seat, and Room studies are **AI-generated photography-style illustrations**, created for Interface Atlas. They are not documentary photographs, actual products, named artists' work, or evidence of a photographer's commission. Read the [asset provenance record](preview/assets/README.md) for the retained prompts, dimensions, and hashes.

Imagery is core content in this reference rather than decorative filler, so useful alternatives, captions, and text descriptions remain available. Loading and error state preserve those descriptions. A visual asset failure cannot make the collection unnamed or eliminate its recovery route.

## Motion and implementation

Only optional **180ms color/background/border feedback** accompanies controls when motion is allowed. There are no transform/opacity entrance effects or image animations. State and focus change immediately; follow [motion.md](motion.md).

No image library, renderer, remote font service, or effect runtime is required. Responsive sources, efficient encodings, asset permissions, and performance measurements remain decisions for an actual project. Opaque token calculations and the representative [validation report](validation.md) do not clear an untested overlay or prove production image performance.
