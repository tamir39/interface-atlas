# Live preview site

The published preview hub is [Interface Atlas on GitHub Pages](https://tamir39.github.io/interface-atlas/). It links to the live [Editorial reference](https://tamir39.github.io/interface-atlas/themes/editorial/preview/), [Swiss reference](https://tamir39.github.io/interface-atlas/themes/swiss/preview/), [Precision reference](https://tamir39.github.io/interface-atlas/themes/precision/preview/), [Play reference](https://tamir39.github.io/interface-atlas/themes/play/preview/), and [Atlas logo gallery](https://tamir39.github.io/interface-atlas/assets/brand/preview.html).

This is a small static browsing surface for the library. It preserves the draft status and source credits of the references it presents. The landing page's HTML, CSS, and layout are original work created for Tamir's Interface Atlas with Codex AI assistance. Brand artwork and palette coordination are documented in the [brand credits](../assets/brand/README.md). The theme studies use the separately credited [Editorial](../themes/editorial/sources.md), [Swiss](../themes/swiss/sources.md), and [Play](../themes/play/sources.md) seed directions and [Precision's original Atlas synthesis](../themes/precision/sources.md). Precision references IBM Carbon and GitHub Primer; it is not an official theme from either project.

## Build locally

Use Node.js 20 or newer:

```sh
node tools/build-preview-site.mjs
```

The builder creates a fresh `_site` directory and requires no dependency installation. Open `_site/index.html` in a browser or serve `_site` with a local static server. `_site` is ignored by Git. To build again, choose a fresh destination with `--output <directory>` or remove the previous build yourself; the tool never clears an existing directory.

Only an explicit file list is published: the landing page, its stylesheet, eleven brand SVGs, the brand gallery HTML, and three preview files for each of Editorial, Swiss, Precision, and Play. Markdown documents, source code tools, validation artifacts, and Git metadata are excluded. In the copied HTML, local Markdown document links become GitHub links to `main`; the original repo files keep their portable local links. The build checks that linked documents and published local assets exist, rejects symbolic links, and rejects references outside the relevant root. New theme previews must opt in to the file list in [the builder](../tools/build-preview-site.mjs).

## Deploy

[The Pages workflow](../.github/workflows/preview-pages.yml) publishes after preview changes reach `main`. `dev` remains the preparation branch. Manual runs are also allowed on `main`. The build runs on GitHub's Ubuntu runner with Node.js 20 or newer; it fails explicitly if that runtime is unavailable. The deployment uses GitHub's `github-pages` environment and only the Pages and OIDC permissions required for publishing.

Repository administrators enable Pages once with **Settings → Pages → Build and deployment → Source: GitHub Actions**. The `github-pages` environment must permit deployments from `main`. This does not change the repository's default branch or require a custom domain.

The workflow uses GitHub's official Actions, credited to the **GitHub Actions team**: [checkout](https://github.com/actions/checkout), [configure-pages](https://github.com/actions/configure-pages), [upload-pages-artifact](https://github.com/actions/upload-pages-artifact), and [deploy-pages](https://github.com/actions/deploy-pages). Their full commit SHAs were resolved from official major release tags on 2026-10-13; version comments identify those release lines. These actions execute at build/deploy time and are not copied into the site. The workflow and builder are original Atlas work informed by [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Publishing a preview does not establish full accessibility, browser, or project validation. Keep each theme's validation record alongside its preview evidence: [Editorial](../themes/editorial/validation.md), [Swiss](../themes/swiss/validation.md), [Precision](../themes/precision/validation.md), [Play](../themes/play/validation.md).
