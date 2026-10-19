# Field Notes — promotional banner revision

Status: proposed document revision; no rendered or user validation. Prepared 2026-10-20. Editorial `0.1.0-draft` remains the owner-selected theme. This replaces only the promotional banner specification.

## Decision and reference disposition

The primary task remains opening a field note. The optional banner supports that task with one native link to the latest note. The text-first journal direction and existing navigation govern this revision.

Adapt the supplied poster's concise title and clear grouping into a compact text group. This is a design proposal, not evidence of improved reading or conversion. Omit its large geometric side panel: its visual weight would compete with the note and adds no task information. Keep the approved project palette and typography.

The reference's instruction to use solid fills conflicts with its `linear-gradient(135deg, #FF6A00, #FFC266)` example. Its statement that white on orange is fully accessible is unsupported by calculations, rendered states or keyboard evidence. Neither statement is an authoritative project rule or an accessibility result. Do not adopt its gradient or orange link treatment. The reference omits consequential states; the project rules below supply those decisions. No reference artwork, fonts, implementation or prose is imported.

## Banner specification

Content and DOM order are: heading, one-sentence summary, native anchor labeled **Read the latest note**. Proposed heading: **Latest field note**. The publishing owner supplies the current note's factual summary and existing destination URL; do not invent a service endpoint. The heading follows the page's semantic hierarchy. The banner is a grouped section, not a clickable card; only its link is interactive. If the owner cannot provide a valid note destination, omit this optional banner before publication.

Use the approved project-owned heading and body tokens, including their existing families and sizes. No external font is selected. Keep text left aligned with normal wrapping, a maximum reading measure of 65ch, and no truncation or fixed content height. Proposed geometry uses the Editorial spacing adaptation: 24px banner padding, 16px when the available width is below 40rem, 12px between heading and summary, and 16px before the link. Use a single text column throughout, so narrow widths stack naturally without changing content order. Do not add a decorative side panel, shadow or fixed illustration space.

These are retained **project overrides**, not Editorial source defaults:

| Semantic pairing | Light | Dark |
| --- | --- | --- |
| Banner surface / text | `#FFFFFF` / `#111827` | `#111827` / `#F9FAFB` |
| Link background / label | `#19392C` / `#FFFFFF` | `#A8D5BA` / `#111827` |

Follow OS appearance, including live changes; no new appearance control is introduced. All fills are solid. Use the text pairing for both heading and summary; no opacity reduction or extra muted color is proposed.

Keep the link in reading order after the summary, with its existing native navigation behavior and a minimum 44px target height. Retain an underline as a persistent link cue. Default, visited, hover and active states preserve the approved foreground/background pair and stable dimensions; hover and active may thicken the underline to 2px. Focus uses a visible 3px outline in the appearance's banner text color, offset 5px, with enough surrounding space to prevent clipping; forced-colors mode uses the platform focus color. These are proposed state details derived from Editorial guidance and require rendered verification. There is no local submission, saving or pending state. Native navigation and Back remain available.

Motion stays off for everyone: no entrance, hover animation, transition, looping decoration or reduced-motion exception. Content and state changes are immediate. At 320 CSS px and at 400% zoom, preserve reading order and readable wrapping without banner-induced horizontal scrolling or overlap.

## Evidence, credits and checks

Performed: document/source inspection of the supplied synthetic brief, project design and poster, and selective frozen Atlas guidance; consistency reconciliation of the poster's prose and example. No calculation, screenshot, browser, keyboard, assistive-technology, service or user check was performed. Existing palette values are preserved rules, not newly validated contrast results.

Before implementation sign-off: verify rendered text and every link-state contrast in both appearances; ensure focus visibility/contrast and no clipping; check Tab/Enter, native destination and Back behavior, screen-reader heading/link order, forced colors, 320px reflow, zoom, long text and OS appearance changes. The publishing owner must supply the approved summary, URL and actual heading/body token definitions for implementation. No user observation supports the proposed grouping.

Atlas inputs are the frozen local snapshot, not an asserted clean Git HEAD. Theme source: Tamir (Phi Vuong Tuong Tam), [tamir39-portfolio](https://github.com/tamir39/tamir39-portfolio), inspected seed `166f44091a58a68d74096bc44defceb99243ba4e`; Editorial `0.1.0-draft`. This revision retains its content-first hierarchy, spacing method and focus dimensions; project colors, fonts, OS appearance and immediate behavior take precedence. Frozen `themes/editorial/design.md` SHA-256: `21eb98f496099ee5b000509335b113660762c368c0d3402db2951abb5714646f`. Preparation entry SHA-256: `d5528477be4f87ee4d66591e95176423d95bf2e0427d229e82dffb1b726b7d40`. No portfolio implementation license was found; Atlas publishing terms remain undecided. Attribution does not grant copying permission.

Poster credit: **Fictional Reference Studio**, an invented fixture identity. No original URL, verified rights holder, reuse terms, asset files or source revision was supplied. It remains a conceptual reference identified as `@fixture/reference.md`; no real vendor is represented and no assets are cleared for reuse.

Reference-evaluation method: original Atlas synthesis by Tamir with Codex AI assistance, informed by Rofi / @bidah's [DESIGN.md directory](https://designdotmd.directory/) and [Design Prompts](https://www.designprompts.dev/) (creator self-attribution: u/mellowkenneth). Prompt/site redistribution terms remain unverified; no upstream prompt, code or asset is reproduced. Accessibility guidance provenance includes the [W3C WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/) and [ARIA APG](https://www.w3.org/WAI/ARIA/apg/), credited to the respective W3C working groups and contributors; those linked upstream pages were not browsed in this task. No font, motion, component-library or artwork package is added.