# Open Index composition evaluation

**Open Index** is an original Atlas reference task: read six short frontend notes, follow their native document links, optionally filter the index, select notes and download a named reading plan. It applies the [Web Brutalism grammar](../../styles/web-brutalism/style.md) as a content-first variant with underlined links, native checkboxes, plain sections and 1px rules. Other expressive brutalist families need a fresh assessment.

The [live preview](https://tamir39.github.io/interface-atlas/styles/web-brutalism/preview/), [local preview](../../styles/web-brutalism/preview/index.html), [design contract and nine fit decisions](design.md), [trials](trials.md), [machine-readable evidence](results.json) and [optional browser validator](../../tools/validate-web-brutalism.mjs) serve different purposes. The matrix evaluates a finite implementation; it does not establish complete theme compatibility or user outcomes.

All six articles live in the original HTML and remain visible. Native fragment links and browser Back/Forward work without initialization. JavaScript enables only settings, index filtering and a local reading-plan export. A filter hides index rows while retaining every article and every checked note. The 3–48-character trimmed plan title and selected original notes become a real plain UTF-8 `.txt` download in document order. Reload resets local enhancement state; no backend, account or durable save exists.

The generated adapter retains 15 source variables, nine source fingerprints and all 18 light/dark identity sets. Actual section and control corners explicitly use **0px**; source corner variables remain recorded but unused here. Colors and named font stacks remain from each profile; the preview ships no font binaries. This is a declared geometry adaptation, not complete theme preservation.

Entry authorship and research credits are recorded in [sources.md](../../styles/web-brutalism/sources.md). The six note texts, implementation and validator are original Atlas work; no external article prose, artwork or component implementation is imported. Status remains **draft**.
