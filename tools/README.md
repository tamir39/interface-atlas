# Catalog tools

The catalog keeps theme discovery small. Generate it from each theme README:

```sh
node tools/catalog.mjs
node tools/catalog.mjs --check
```

The first command writes catalog/themes.json. Check mode validates theme metadata, required package files, and the existing catalog without writing.

## Metadata contract

Theme README frontmatter supports a deliberately small format: one key per line, string values, and inline lists of strings. Nested maps, multiline values, and strings containing commas in lists are unsupported.

Required fields:
- id, name, revision, status, basis, creator.
- appearances, default_density, supported_density_adaptations, fit_types.
- motion_character, decorative_effects, implementation_dependency.
- source_revision, reviewed_on.

Folder name must match id. Status is draft, researching, ready-for-extraction, or validated. Appearance values are light, dark, or system. A validated status also requires validation_report metadata pointing to an existing file in the theme folder.

Every theme contains README.md, design.md, and sources.md. effects.md and motion.md are optional documents and appear in the catalog only when present.

Identity, suitability reasons, and limitations remain in README.md; the generated catalog contains only discovery metadata and document paths. Record accessibility coverage in the README rather than implying that a theme name or status guarantees compliance.

## Optional Editorial browser checks

The reference preview opens directly without dependencies. Its repeatable smoke checks use an installed Playwright package and Chromium browser:

```sh
node tools/validate-editorial.mjs --module /path/to/playwright/index.mjs --browser /path/to/chromium --output /path/to/results
```

If Playwright and its browser are installed locally with their standard defaults, only `node tools/validate-editorial.mjs` is needed. The optional output directory receives three screenshots and a JSON report; omitting it writes no artifacts. Use a temporary output directory rather than committing repeated captures.

The check serves only the preview on a loopback address, tests reflow and representative behavior, measures opaque solid-background text pairs, and closes the server and browser afterward. See [Editorial's report](../themes/editorial/validation.md) for the precise coverage and exclusions. Passing this smoke check does not establish WCAG conformance or validate a production project.

## Live preview site

The [preview builder](build-preview-site.mjs) uses Node.js 20 or newer with no installed packages to assemble the allowlisted static assets for GitHub Pages:

```sh
node tools/build-preview-site.mjs
```

See [site/README.md](../site/README.md) for output handling, deployment, and documentation links. The checked-in preview files still open locally without a build; GitHub Pages serves a prepared copy.
