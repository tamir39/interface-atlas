# Interface Atlas agent guidance

Interface Atlas is an independent frontend UI/UX knowledge library. Do not import Twohearts policies or product assumptions into this repository.

## Reading scope

- Use Atlas when preparing or deliberately revising frontend project design documents, or when the user explicitly requests design review.
- For preparation, start from the brief and catalog/themes.json, then selected theme READMEs. For review, start from the project document and supplied evidence.
- Read detailed theme rules, optional motion/effects, and shared knowledge only when relevant. The knowledge index routes general UI/UX, accessibility/responsive behavior, state, forms, remote outcomes and Agent Experience.
- review-frontend-design is opt-in; review does not automatically run preparation or implement fixes.
- For normal project implementation, prefer that project's self-contained design documents.

## Structure and provenance

- Keep theme folders named for the theme; project suitability belongs in the theme README.
- Keep identity, fit, and limitations in README.md; concrete design rules in design.md.
- Keep source values, referenced concepts, and proposed adaptations distinguishable.
- Preserve creator credits, source URLs, versions or commits, reuse terms, and required notices.
- Unknown reuse terms remain unresolved; a reference link is not permission to copy code or assets.
- Examples illustrate adaptations; they are not universal theme defaults or implemented products.
- Do not mark a theme validated based only on source inspection or color calculations.

## Changes

- Maintain relative links and portable source citations.
- Regenerate the catalog after changing theme discovery metadata; run node tools/catalog.mjs --check.
- Keep shared guidance framework independent. Add adapters only for concrete stack-specific needs.
- Respect the user's authorized scope; routine documentation edits do not require an additional approval process.
