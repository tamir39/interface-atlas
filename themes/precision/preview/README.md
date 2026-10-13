# Precision reference preview

**[Open the live Precision preview](https://tamir39.github.io/interface-atlas/themes/precision/preview/).** GitHub Pages publishes the preview when changes reach `main`.

For offline use, open [index.html](index.html) in a browser. No build, package installation, external resource request, or server is required. The preview's HTML, CSS, JavaScript, static composition, and fictional operations records were prepared for Interface Atlas with Codex AI assistance.

## Scope

- Atlas branding frames this reference and is not required branding for projects that choose Precision. [Logo usage notes](../../../assets/brand/README.md) describe the library identity and variants.
- Light, Dark, and System choices use Precision's original Atlas palette. Saved preferences are read before the stylesheet; system choices follow live appearance changes. Unavailable or invalid storage retains usable defaults.
- Compact is the theme default. Density changes queue-row vertical padding (12px compact / 16px comfortable), component-card padding (16px / 24px), and table-cell vertical padding (12px / 16px). Body text remains 16px, short table labels remain 14px, and action areas remain at least 44px.
- The workspace demonstrates modest sans hierarchy, shared starting edges, aligned short technical values, opaque neutral layers, 4px geometry, and flat resting surfaces. Its composition is original Atlas work informed by the credited reference concepts.
- This compact preview is a specific Atlas adaptation: the selected-run heading is 22px; small indexes and supporting metadata use 12–13px; table values use 14px; main prose uses 16px. Its workspace may grow to 1440px to accommodate context, queue, and detail. The shared [design specification](../design.md) proposes more conservative 14px supporting text, a 24px detail heading, and a typical 1280px maximum; projects should select and record their own legibility and content-fit decisions.
- Motion choices affect brief color and border feedback only. OS reduced motion overrides motion enabled; motion-off and reduced motion make changes immediate. Native disclosures and content/state changes are immediate. There are no entrances, animated artwork, cursor followers, animated scrolling, or continuous loops.
- The operations specimen uses four fixed fictional runs. It represents no real agent execution, throughput, or production telemetry. Filters preserve the selected run's context and open evidence.
- An explicit Inspect action opens a run's evidence and focuses its detail heading. Back to runs restores the originating control's focus when visible. If filters hide the run, it preserves the filters and detail, focuses search, and explains the hidden selection.
- Cancellation is a manually advanced local simulation. Requesting cancellation sets Cancellation requested while confirmed execution remains Running. A separate acknowledgement action records Cancelled. No network or backend command is sent.
- A local connection simulation changes labels to Last confirmed execution, shows a connection notice, and disables requesting or acknowledging a command while preserving execution and pending state. The Simulate disconnection toggle keeps its label and exposes a pressed state. Press it again to restore the demonstration connection; this does not reconnect a real stream, re-fetch data, or confirm a new execution outcome.
- Without JavaScript, all run details remain readable and native navigation and disclosures work. Preferences and controls requiring runtime behavior remain disabled with an explanation.
- Wide tables have labeled keyboard-focusable scrolling regions, keeping overflow contained to data rather than the whole page.

## Font rendering

The CSS names **IBM Plex Sans** and **IBM Plex Mono**, with local sans-serif and monospace fallbacks. **No font binaries or remote font services are included; intended Plex rendering is not established by this preview.** Machines without those families use system equivalents. Check actual chosen package versions, weights, script coverage, fallback, wrapping, and rhythm before treating the preview as a faithful typeface rendering.

Font creator credits are **IBM, Mike Abbink, and Bold Monday**, including **Paul van der Laan and Pieter van Rosmalen** and the contributor context in [sources.md](../sources.md). Naming the families does not redistribute font software or supply every language-specific package.

## Provenance and limitations

Precision is an original synthesis for **Tamir (Phi Vuong Tuong Tam) with Codex AI assistance**. **IBM's Carbon team/contributors** are credited for referenced color-role, grid, typography, and productive-motion concepts. **GitHub's Primer team/contributors** are credited for referenced product-layout and accessible agent-interaction guidance. Neither team authors or endorses this complete theme.

The palette, type scale, density, 4px geometry, 3px focus outline/offset, workspace layout, and operations behavior are Atlas choices. The selected productive easing and 110ms feedback timing are documented Carbon references applied to original Atlas code. No Carbon/Primer code, icons, artwork, component markup, or documentation prose is imported.

See [source credits](../sources.md), [reuse and notices](../../../THIRD_PARTY_NOTICES.md), and [validation evidence](../validation.md). Atlas's own publishing terms remain undecided; upstream software and font licenses keep their separate scopes.

The deployed copy retains local demonstration behavior. Documentation links resolve to GitHub source pages during the [preview site build](../../../site/README.md); the build adds no remote fonts or third-party scripts.

This remains a **draft reference**. It does not implement real project routes, agent APIs, permissions, publishing, production logs, real approval, stream recovery, or backend cancellation. Representative browser checks do not validate every project adaptation, browser, intended font, assistive technology, accessibility criterion, or unimplemented effect.

## Stable test hooks

| Purpose | Selector or action |
| --- | --- |
| Appearance | `#appearance`: `system`, `light`, `dark` |
| Density | `#density`: `compact`, `comfortable`; `#density-note` |
| Motion | `#motion` checkbox; `#motion-note` explains OS precedence |
| Root preferences | `document.documentElement.dataset.appearance/density/motion` |
| Preference storage | `interface-atlas-precision-preview` localStorage key |
| Main specimen regions | `#workspace`, `#specimen`, `#credits` |
| Filters | `#run-search`, `#run-status-filter`, `#reset-filters`; `#run-count`, `#run-empty` |
| Run selection | `#inspect-RUN-041` through `#inspect-RUN-044`; `[data-run-row]`, `[data-run-detail]` |
| Evidence navigation | `#run-heading-RUN-041` through `#run-heading-RUN-044` receive Inspect focus; `#back-to-runs` restores Inspect or search focus |
| Cancellation request | `#cancel-run`; `#pending-command` becomes Cancellation requested while `#confirmed-execution-RUN-041` stays Running |
| Acknowledgement | `#acknowledge-cancellation`; confirmed execution becomes Cancelled and focus returns to `#run-heading-RUN-041` |
| Connection simulation | `#simulate-disconnection`, `#connection-state`, `#connection-note`; `[data-detail-connection]`, `[data-confirmed-label]` |
| Evidence and events | `#evidence-RUN-041`, `#events-RUN-041`; manual events are explicitly marked simulation |
| Announcements | `#workspace-status`, polite status region |
| Native disclosures | `.architecture-note`, `.detail-disclosure` |
| Contained table | `.table-region`, labeled and keyboard-focusable |
| Control specimens | `#primary-specimen`, `#specimen-name`, `#specimen-check` |
