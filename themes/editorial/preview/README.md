# Editorial reference preview

Open [index.html](index.html) directly in a browser. No build, package installation, external requests, or server is required. The preview is original HTML, CSS, and JavaScript prepared for Interface Atlas with AI assistance; its static composition and fictional project briefs are original to this preview.

## Scope

- Light, Dark, and System appearance choices use the draft Editorial tokens. A guarded inline script reads the preference before the stylesheet; CSS follows live system appearance changes. Invalid or unavailable storage falls back to usable defaults.
- The density choice changes the neutral component specimen. Its compact demonstration selects proposed 12px card radii, 8px control radii, 16px padding, 14px body text, and 150ms feedback. The portfolio retains its comfortable profile; the operations workspace retains its separate compact project profile.
- Motion controls affect only short background/border feedback. OS reduced motion overrides the enabled choice; motion off and reduced motion make changes immediate. There are no entrance animations, moving artwork, cursor effects, animated scrolling, or continuous loops.
- The portfolio uses fictional briefs rather than fabricated achievements. Native disclosure elements work without JavaScript.
- The operations workspace contains four fixed fictional runs. Filters preserve order and the open detail context. Selecting a run focuses its inline detail heading. “Back to runs” restores its Inspect link when visible; when filters hide the selected row, it preserves the filters and open detail, focuses the search control, and announces why the row is hidden.
- Cancellation is a local, manually advanced simulation. Requesting cancellation keeps confirmed execution at Running. “Simulate acknowledgement” changes it to Cancelled. Connection, attention, execution, and pending command remain separate. No network or backend command is sent.
- Without JavaScript, all run detail articles remain readable, navigation and disclosures work, and controls requiring runtime behavior stay disabled with an explanation. Core content has no animation or initialization dependency.
- The semantic table has a labeled, keyboard-focusable horizontal scrolling region. Narrow-table overflow is contained rather than applied to the entire page.

## Font rendering

The CSS names Manrope, DM Serif Display, and JetBrains Mono, followed by local system fallbacks. **This preview does not load font files, use remote font services, or verify the intended font rendering.** A machine with those families installed may render them; other machines normally render Segoe UI/Arial, Georgia/Times New Roman, and Consolas/Courier New. Verify licensed font acquisition, weights, language coverage, wrapping, and visual rhythm in a project before treating this as a faithful typeface preview.

Font designer credits are Mikhail Sharanda (Manrope), Colophon Foundry (DM Serif Display), and JetBrains, Philipp Nurullin, and Konstantin Bulenkov (JetBrains Mono). No font software is redistributed here.

## Provenance and limitations

Seed palette, geometry, focus dimensions, named font roles, and feedback timing are derived from Tamir (Phi Vuong Tuong Tam)'s inspected Editorial source revision `166f44091a58a68d74096bc44defceb99243ba4e`. Typography scale, spacing, stronger control borders, semantic foregrounds, compact geometry, and operational behavior are Atlas proposals. Uniform easing across feedback properties is an Atlas normalization of the source timing.

See [source credits](../sources.md), [reuse and notices](../../../THIRD_PARTY_NOTICES.md), the [portfolio design example](../../../examples/portfolio/design.md), and the [operations design example](../../../examples/agent-operations-dashboard/design.md). This implementation copies no third-party code, source artwork, portfolio branding, or font files. It does not implement the optional Floating Paths or cursor halo concepts.

This is a representative **draft reference**, not a production portfolio or operational application. It does not implement routes, contact destinations, real agent APIs, proposals/approvals, retries, reconnecting streams, or production telemetry. Browser checks of this specimen do not validate every project adaptation, optional effect, font, assistive technology, or accessibility criterion. Consult the theme's validation record for the checks actually performed.

## Stable test hooks

| Purpose | Selector or action |
| --- | --- |
| Appearance | `#appearance`: `system`, `light`, `dark` |
| Component density | `#density`: `comfortable`, `compact` |
| Motion | `#motion` checkbox; `#motion-note` explains OS precedence |
| Root preferences | `document.documentElement.dataset.appearance/density/motion` |
| Run filters | `#run-search`, `#run-state-filter`, `#reset-filters`, `#run-count` |
| Stable rows | `#run-101` through `#run-104`; `data-state`, `data-selected` |
| Inline details | `#inspect-run-101` through `#inspect-run-104`; `#detail-run-101` through `#detail-run-104` |
| Focus transfer | `#detail-heading-101` through `#detail-heading-104`; `#back-to-run-101` through `#back-to-run-104` |
| Request cancellation | `#request-cancel`; verify `#execution-run-101` remains Running and `#pending-run-101` becomes Cancellation requested |
| Confirm cancellation | `#acknowledge-cancel`; verify execution becomes Cancelled, pending becomes None |
| Announcements | `#operation-status` (polite); `#run-count` (polite) |
| Contained table | `#specimen-table-scroll` |
| Focus/contrast specimens | `#primary-specimen`, `#secondary-specimen`, `#specimen-name` |
| Preference storage | `interface-atlas-editorial-preview` localStorage key |
