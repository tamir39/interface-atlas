# Swiss reference preview

**[Open the live Swiss preview](https://tamir39.github.io/interface-atlas/themes/swiss/preview/).** GitHub Pages publishes the preview when changes reach `main`.

For offline use, open [index.html](index.html) in a browser. No build, package installation, external resource request, or server is required. The preview's HTML, CSS, JavaScript, static composition, and fictional briefs were prepared for Interface Atlas with Codex AI assistance.

## Scope

- Atlas branding frames this reference and is not required branding for projects that choose Swiss. The [logo usage notes](../../../assets/brand/README.md) describe library authorship and variants.
- Light, Dark, and System choices use the retained Swiss palette. Saved preferences are read before the stylesheet; system choices follow live system appearance changes. Unavailable or invalid storage retains usable defaults.
- Comfortable and compact density affect the neutral component cards and table, using 24px/16px panel padding and 16px/14px specimen body text respectively. Controls keep their own text sizing and at least 44px target areas. Portfolio/publication and review layouts retain their separate reading profiles.
- The hero and project layouts demonstrate strong sans hierarchy, shared alignment, nearly square geometry, structural rules, and flat resting surfaces. The composition and content are original to this preview.
- The short “Swiss.” heading intentionally demonstrates the source-specific 800-weight, `-0.075em` display observation. Essential reading headings use the moderated Atlas tracking proposals. Tightly tracked decorative poster lettering is artwork and is hidden from assistive technology; it is not a rule for interface labels or body text.
- Motion choices affect brief color and border feedback only. OS reduced motion overrides motion enabled; motion-off and reduced motion make changes immediate. There are no entrances, animated artwork, cursor followers, animated scrolling, or continuous loops.
- The fictional studio includes publication and portfolio briefs inside native disclosures. They claim no shipped outcomes or client work.
- The review specimen is one fictional navigation proposal, `CHG-024`. Opening it focuses the scope heading. Requesting acceptance or rejection changes only the pending decision; the confirmed decision stays Unreviewed until “Simulate acknowledgement” records Accepted or Rejected. Execution always remains Not started. “Back to proposal” preserves state and restores the originating control's focus; “Reset sample” returns the demonstration to Unreviewed. Changes are local and reset on reload; no backend command, publishing, or real approval occurs.
- Without JavaScript, the entire proposal scope remains readable and native navigation and disclosures work. Preferences and decision simulation stay disabled with an explanation.
- Wide table content is contained in a labeled, keyboard-accessible scrolling region instead of overflowing the whole page.

## Font rendering

The CSS names Manrope and JetBrains Mono with local system fallbacks. **No font binaries or remote font services are included, and intended font rendering is not established by this preview.** Machines without these families use Segoe UI/Arial and Consolas or platform sans/monospace equivalents. Check the actual chosen font package, weights, language coverage, wrapping, and rhythm in a project before treating the preview as a faithful typeface rendering.

Designer credits are **Mikhail Sharanda** for Manrope and **JetBrains, Philipp Nurullin, and Konstantin Bulenkov** for JetBrains Mono. Historical Helvetica is study context, not a configured or redistributed typeface here.

## Provenance and limitations

Palette, flat resting geometry, 2px radii, global focus dimensions, named font roles, and 160ms feedback derive from **Tamir (Phi Vuong Tuong Tam)'s** inspected source at `6f9bfc6119f0e71dee04b675fbf59b8482aa9c74`. Type scale, moderated tracking, layout, stronger control borders, semantic foregrounds, compact density, and local review behavior are Atlas proposals. Uniform easing across feedback properties is a documented normalization.

See [source credits](../sources.md), [reuse and notices](../../../THIRD_PARTY_NOTICES.md), and [validation evidence](../validation.md). No third-party implementation, portfolio branding, external artwork, historical poster, or font file is copied. The optional **SatoriUI / @satoriui Kinetic Grid** and precision-square cursor are not implemented.

The deployed copy retains local demonstration behavior. Documentation links resolve to GitHub source pages during the [preview site build](../../../site/README.md); the build adds no remote fonts or third-party scripts.

This remains a **draft reference**. It does not implement real project routes, messaging destinations, publishing, agent execution or approval APIs, reconnecting streams, or production telemetry. Representative browser checks do not validate every adaptation, browser, font, assistive technology, accessibility criterion, or unimplemented effect.

## Stable test hooks

| Purpose | Selector or action |
| --- | --- |
| Appearance | `#appearance`: `system`, `light`, `dark` |
| Component density | `#density`: `comfortable`, `compact`; `#density-note` |
| Motion | `#motion` checkbox; `#motion-note` explains OS precedence |
| Root preferences | `document.documentElement.dataset.appearance/density/motion` |
| Preference storage | `interface-atlas-swiss-preview` localStorage key |
| Main specimen regions | `#studio`, `#review`, `#specimen`, `#credits` |
| Native briefs | `#publication-brief`, `#portfolio-brief` |
| Open proposal | `#view-proposal`; `#proposal-detail`; focus `#proposal-heading` |
| Request decision | `#accept-proposal`, `#reject-proposal`; `#pending-decision` changes while `#confirmed-decision` stays Unreviewed |
| Acknowledge decision | `#acknowledge-decision`; `#confirmed-decision` becomes Accepted or Rejected; focus `#review-result` |
| Return and reset | `#back-to-proposal` returns focus to `#view-proposal`; `#reset-proposal` restores Unreviewed and focuses the heading |
| Announcements | `#review-status`, polite status region |
| Contained table | `.table-region`, labeled and keyboard-focusable |
| Control specimens | `#primary-specimen`, `#specimen-name`, `#specimen-check` |
