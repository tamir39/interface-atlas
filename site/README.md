# Live preview site

The published preview hub is [Interface Atlas on GitHub Pages](https://tamir39.github.io/interface-atlas/). It links to the live [Editorial reference](https://tamir39.github.io/interface-atlas/themes/editorial/preview/), [Swiss reference](https://tamir39.github.io/interface-atlas/themes/swiss/preview/), [Precision reference](https://tamir39.github.io/interface-atlas/themes/precision/preview/), [Play reference](https://tamir39.github.io/interface-atlas/themes/play/preview/), [Botanical reference](https://tamir39.github.io/interface-atlas/themes/botanical/preview/), [Blueprint reference](https://tamir39.github.io/interface-atlas/themes/blueprint/preview/), [Pulse reference](https://tamir39.github.io/interface-atlas/themes/pulse/preview/), [Gallery reference](https://tamir39.github.io/interface-atlas/themes/gallery/preview/), [Layered reference](https://tamir39.github.io/interface-atlas/themes/layered/preview/), and [Atlas logo gallery](https://tamir39.github.io/interface-atlas/assets/brand/preview.html).

This is a small static browsing surface for the library. It preserves the draft status and source credits of the references it presents. The landing page's HTML, CSS, and layout are original work created for Tamir's Interface Atlas with Codex AI assistance. Brand artwork and palette coordination are documented in the [brand credits](../assets/brand/README.md). The theme studies use the separately credited [Editorial](../themes/editorial/sources.md), [Swiss](../themes/swiss/sources.md), and [Play](../themes/play/sources.md) seed directions and [Precision's original Atlas synthesis](../themes/precision/sources.md). Precision references IBM Carbon and GitHub Primer; it is not an official theme from either project.

Botanical's separately credited [portfolio seed](../themes/botanical/sources.md) adds a narrative studio and original design field notes. Its reading list and downloadable Markdown are original Atlas behavior; the preview starts no agent and imports no source renderer.

Blueprint's separately credited [portfolio seed](../themes/blueprint/sources.md) adds an original engineering studio and conceptual diagram inspector. Diagram/Outline views, node focus, and readable relationship text are original Atlas behavior. C4 notation is a separately credited conceptual reference; no diagram or source renderer is imported.

Pulse is an [original Atlas synthesis](../themes/pulse/sources.md) informed by Open Props, Barlow typography, and web.dev animation concepts. Its fictional event program and temporary plan demonstrate overlap review and recovery; no booking or submission occurs. Its finite decorative motion study runs only on explicit request and follows reduced-motion and motion-off choices.

Gallery is an [original Atlas synthesis](../themes/gallery/sources.md) informed by Shopify image/content guidance, Mat Marquis's Learn Images course, W3C/WHATWG image semantics, and Inter typography. It imports no Shopify theme code or imagery. Its fictional collection and inline inspection demonstrate image-led hierarchy, preserved filter/detail context, and real image load/error/retry behavior. Three AI-generated photography-style illustrations are separately recorded with [prompts, method and hashes](../themes/gallery/preview/assets/README.md); they are not real products or documentary photographs.

Layered is an [original Atlas synthesis](../themes/layered/sources.md) informed by Material 3 tonal roles, Fluent 2 solid surfaces and depth, Plus Jakarta Sans, and W3C/WHATWG interaction guidance. Its fictional planning workspace demonstrates task counts, preserved filter/detail context, native modal editing, correction, cancellation, and per-project revert. It imports no Material/Fluent implementation or assets and stores only preview preferences.

## Collection search

The hub enhances its nine theme entries with a labeled text search. Results update as visitors type, matching a literal substring in the visible theme name or description, without case sensitivity or surrounding query whitespace. Matching entries retain their original order and preview links. The visible count reports matching themes out of nine; the logo gallery stays visible and is excluded from that count.

An unmatched query shows a recovery message. **Clear search** restores all themes and returns keyboard focus to the search field; Enter keeps the visitor on the collection. The controls stack at narrow widths, use the hub's existing light/dark tokens, and expose the count as a polite status. Search adds no motion, dependencies, network requests, or persistence, and reload starts with all themes. The search controls appear only after the script initializes; without JavaScript or if it fails to load, all nine themes and the logo gallery remain browsable.

## Build locally

Use Node.js 20 or newer:

```sh
node tools/build-preview-site.mjs
```

The builder creates a fresh `_site` directory and requires no dependency installation. Open `_site/index.html` in a browser or serve `_site` with a local static server. `_site` is ignored by Git. To build again, choose a fresh destination with `--output <directory>` or remove the previous build yourself; the tool never clears an existing directory.

Only an explicit file list is published: the landing page, its stylesheet and search script, eleven brand SVGs, the brand gallery HTML, three preview files for each of Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery, and Layered, and Gallery's three original PNG studies (46 files including .nojekyll). Markdown documents, source code tools, validation artifacts, and Git metadata are excluded. In the copied HTML, local Markdown document links become GitHub links to `main`; the original repo files keep their portable local links. The build checks that linked documents and published local assets exist, rejects symbolic links, and rejects references outside the relevant root. New theme previews must opt in to the file list in [the builder](../tools/build-preview-site.mjs).

## Deploy

[The Pages workflow](../.github/workflows/preview-pages.yml) publishes after preview changes reach `main`. `dev` remains the preparation branch. Manual runs are also allowed on `main`. The build runs on GitHub's Ubuntu runner with Node.js 20 or newer; it fails explicitly if that runtime is unavailable. The deployment uses GitHub's `github-pages` environment and only the Pages and OIDC permissions required for publishing.

Repository administrators enable Pages once with **Settings → Pages → Build and deployment → Source: GitHub Actions**. The `github-pages` environment must permit deployments from `main`. This does not change the repository's default branch or require a custom domain.

The workflow uses GitHub's official Actions, credited to the **GitHub Actions team**: [checkout](https://github.com/actions/checkout), [configure-pages](https://github.com/actions/configure-pages), [upload-pages-artifact](https://github.com/actions/upload-pages-artifact), and [deploy-pages](https://github.com/actions/deploy-pages). Their full commit SHAs were resolved from official major release tags on 2026-10-13; version comments identify those release lines. These actions execute at build/deploy time and are not copied into the site. The workflow and builder are original Atlas work informed by [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Publishing a preview does not establish full accessibility, browser, or project validation. Keep each theme's validation record alongside its preview evidence: [Editorial](../themes/editorial/validation.md), [Swiss](../themes/swiss/validation.md), [Precision](../themes/precision/validation.md), [Play](../themes/play/validation.md), [Botanical](../themes/botanical/validation.md), [Blueprint](../themes/blueprint/validation.md), [Pulse](../themes/pulse/validation.md), [Gallery](../themes/gallery/validation.md), [Layered](../themes/layered/validation.md).

## Visual styles beside themes

The hub links to [Glassmorphism](../styles/glassmorphism/README.md), [Neobrutalism](../styles/neobrutalism/README.md), [Claymorphism](../styles/claymorphism/README.md), [Neumorphism](../styles/neumorphism/README.md), [Skeuomorphism](../styles/skeuomorphism/README.md), [Web Brutalism](../styles/web-brutalism/README.md), and [Flat Design](../styles/flat-design/README.md), with separate interactive comparisons of nine bounded theme profiles. The builder allowlists its original HTML/CSS/JavaScript and generated token manifest; documentation links resolve to GitHub. No new frontend framework or browser dependency is published. The style specimen preserves explicit fallback states and separates rendering evidence from theme suitability. Future families are not published until their entry and preview exist.
