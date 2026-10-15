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

## Optional Swiss browser checks

The Swiss preview has its own repeatable checks for responsive layout, preferences, native disclosures, and the local proposal/decision/acknowledgement simulation:

```sh
node tools/validate-swiss.mjs --module /path/to/playwright/index.mjs --browser /path/to/chromium --output /path/to/results
```

It has the same optional dependency and output conventions as the Editorial check. See [Swiss's validation record](../themes/swiss/validation.md) for exact evidence and limitations. The check does not send a real approval or execute an agent task.

## Optional Precision browser checks

Precision has repeatable checks for responsive layout, preferences, filtering, detail focus, cancellation request/acknowledgement, and the difference between connection freshness and execution state:

```sh
node tools/validate-precision.mjs --module /path/to/playwright/index.mjs --browser /path/to/chromium --output /path/to/results
```

It uses the same optional dependencies and output conventions as the other preview checks. Read [Precision's validation record](../themes/precision/validation.md) for the actual evidence and limits. The preview's control commands and disconnection toggle are local simulations.

## Optional Play browser checks

Play has repeatable checks for responsive layout, preferences, native case-study disclosures, form errors, preserved draft values, review, and the local request/acknowledgement lifecycle:

```sh
node tools/validate-play.mjs --module /path/to/playwright/index.mjs --browser /path/to/chromium --output /path/to/results
```

It uses the same optional dependencies and output conventions as the other preview checks. Read [Play's validation record](../themes/play/validation.md) for evidence and limits. No brief is uploaded and no agent is started by the local demonstration.

## Optional Botanical browser checks

Botanical has repeatable checks for responsive layout, preferences, native studio disclosures, field-note filtering, reading focus, local reading-list selection, and actual Markdown download contents:

```sh
node tools/validate-botanical.mjs --module /path/to/playwright/index.mjs --browser /path/to/chromium --output /path/to/results
```

It uses the same optional dependencies and output conventions as the other preview checks. Read [Botanical's validation record](../themes/botanical/validation.md) for evidence and limits. The exported file contains original illustrative notes selected in the local preview; it is not a generated project design or agent execution.

## Optional Blueprint browser checks

Blueprint has repeatable checks for responsive layout, preferences, native studio disclosures, diagram/outline presentation, labeled relationships, stable grid toggles, and node inspection with deliberate focus entry and return:

```sh
node tools/validate-blueprint.mjs --module /path/to/playwright/index.mjs --browser /path/to/chromium --output /path/to/results
```

It uses the same optional dependencies and output conventions as the other preview checks. Read [Blueprint's validation record](../themes/blueprint/validation.md) for evidence and limits. The fixed conceptual diagram generates no project design and starts no agent.

## Optional Pulse browser checks

Pulse has repeatable checks for responsive layout, preferences, native program disclosures, stable selection controls, local plan ordering, overlap errors, focus recovery, review invalidation, and an explicitly played finite motion study:

```sh
node tools/validate-pulse.mjs --module /path/to/playwright/index.mjs --browser /path/to/chromium --output /path/to/results
```

It uses the same optional dependencies and output conventions as the other preview checks. Read [Pulse's validation record](../themes/pulse/validation.md) for evidence and limits. The example books no sessions, submits no plan, and runs no agent.

## Live preview site

The [preview builder](build-preview-site.mjs) uses Node.js 20 or newer with no installed packages to assemble the allowlisted static assets for GitHub Pages:

```sh
node tools/build-preview-site.mjs
```

See [site/README.md](../site/README.md) for output handling, deployment, and documentation links. The checked-in preview files still open locally without a build; GitHub Pages serves a prepared copy.
