# Pulse reference validation

Reviewed **2026-10-15** against Pulse `0.1.0-draft`. **Theme status remains draft.** This record covers the original [reference preview](preview/README.md): a fictional design gathering, six sample sessions, a local planner, and a deliberate finite motion study. A successful review checks only the chosen sample time ranges; it creates no booking, submission, calendar entry, or agent action.

## Environment and reproduction

Windows; Node.js 24.14.1; Playwright 1.62.1; headless Chromium 153.0.8010.12. Existing local dependencies were used; no package was installed into Atlas. The preview makes no external resource requests and distributes no font files.

Run [tools/validate-pulse.mjs](../../tools/validate-pulse.mjs) with installed Playwright and Chromium, following [the tool instructions](../../tools/README.md). The retained [JSON record](preview/validation/results.json) includes measurements, exclusions, actual rendered fonts, and SHA-256 hashes of the final repository HTML, CSS, JavaScript, and validator. Hashes are checked again at the end of the run. Use a temporary output directory for later verification.

## Performed checks

| Check | Observed result | Limit |
| --- | --- | --- |
| Responsive layout | Passed 20 combinations: light/dark × comfortable/compact × 320, 390, 768, 1280, 1440 CSS px; no page-wide horizontal overflow | Fixed illustrative content and representative states |
| Opaque HTML text contrast | 207 samples per layout; minimum 5.42:1 light / 7.93:1 dark; applicable normal/large-text thresholds passed | SVG, disabled samples, placeholders, native popup menus, and unsupported backgrounds are excluded or recorded separately |
| Control boundaries | All five expected enabled input/select boundaries per layout passed; minimum 3.79:1 light / 4.57:1 dark against fill and adjacent solid surface | Native checkbox glyph internals excluded; labels and hit areas checked separately |
| Density and targets | Specimen inset changed 24px comfortable → 16px compact; height changed 1181.03px → 1165.03px at 1440px; sampled enabled targets retained at least 44px width/height; mobile text fields retained 16px text | Poster and planner keep their own responsive profiles; contextual prose links excluded from target sampling |
| Fixed dark poster | Text-selection foreground/background retained the dark pairing in both page appearances, calculated at 8.31:1 | A targeted computed-color check, not a complete selection or SVG audit |
| Skip link and disclosures | Keyboard skip focused main; all six native session disclosures opened and closed by keyboard | Representative paths, not a full keyboard or screen-reader walkthrough |
| Empty and conflicting plans | Empty review focused its linked error summary; both independent overlap pairs identified both sessions and preserved choices | Fixed sample-day times, without dates, timezone, capacity, travel, or server rules |
| Filter recovery | Filtering preserved selected sessions; an error link revealed its hidden target by restoring All formats and focused its Add-to-plan toggle, with explanatory status | Local DOM state and announcements inspected; not heard with assistive technology |
| Selection and valid review | Add-to-plan accessible names remained stable as pressed states changed; choices stayed unique and chronological; adjacent sessions were accepted; valid review focused its heading | Chromium role/name lookup and accessibility snapshots; no assistive technology conformance claim |
| Review lifecycle and focus | Membership changes invalidated prior review; Back preserved choices and a nondefault filter; Remove focused a surviving control or empty-plan heading; Clear emptied the plan and focused its heading | Immediate in-memory behavior, without asynchronous booking or recovery |
| Preferences and storage | System followed live OS appearance; only explicit appearance/density/motion persisted; plan/filter/review reset on reload; blocked, invalid, and malformed storage remained usable | Representative storage failures; first-frame paint timing not instrumented |
| Finite motion study | Explicit Play started three 600ms, one-iteration transform/opacity animations; repeat canceled prior animations; completion restored static composition; reduced/off/hidden canceled; visibility restoration did not restart it | Hidden state used a simulated document visibility event; no real-device rendering-performance measurement |
| Static alternatives | Reduced motion and motion off made sampled feedback immediate; missing Web Animations API left static artwork, explanatory feedback, and usable planning | Representative Chromium API absence; no legacy-browser compatibility certification |
| Forced colors | Sample focus retained a 3px outline and 5px offset with a system color | Representative focus geometry, not a complete forced-colors audit |
| Text resize | At 640px, 200% CSS root sizing doubled a body sample from 16px to 32px and reflowed without horizontal overflow | Not native browser zoom testing |
| No JavaScript | All six sessions and native disclosures remained readable/usable at 320px; planning/preferences/study stayed unavailable; native specimen fields worked; 193 opaque text samples passed, minimum 7.93:1 | Seven visible runtime controls and six session toggles were disabled; filtering and planning require JavaScript |
| Runtime and resources | No browser errors, external requests, or failed preview resources | No production performance or device measurement |

The JSON contains **15 grouped checks**; the table separates related observations. Sampling requires nonzero opaque text and all five expected enabled field boundaries. Final layout samples reported no unsupported background/color cases. Error states were sampled in both appearances; exclusions for SVG, disabled, unrendered, visually hidden, and native-checkbox samples are retained in the JSON. Numerical token-pair calculations and the proposed dark selected-surface border failure remain separately documented in [design.md](design.md); selected cards use ink boundaries.

## Fonts and visual evidence

Chromium reported **Segoe UI** for body and Vietnamese text, installed **Barlow Condensed** for display text, and **Consolas** for technical text. All reported samples used local platform fonts rather than downloaded custom fonts. The ordinary-width Barlow body family was not rendered in this environment. Exact local-only face aliases avoid an observed Windows family collision that otherwise selected an installed condensed face for body copy. Intended Barlow body rendering, selected weights, and complete language coverage still need project checks.

Light/dark desktop and narrow-screen captures were inspected for hierarchy, original lime vector geometry, normal-width body copy, native controls, selected cues, and readable program/review content. Additional focused visual checks covered 320px, 390px, 768px, and 640px with 200% CSS text. Preview-specific scale, caption sizes, container width, gutters, and density scope are documented in [design.md](design.md) and [the preview notes](preview/README.md).

- [Light desktop gathering and original poster](preview/validation/light-desktop.png).
- [Dark desktop program, chosen sessions, and valid local review](preview/validation/dark-desktop.png).
- [Light mobile program viewport](preview/validation/light-mobile.png).

The theme, poster geometry, code, session fixtures, planner, and finite study are original Atlas work for Tamir with Codex AI assistance. Open Props conceptual references, Barlow's designer and Vietnamese contributor, and the web.dev authors are credited with distinct reuse scopes in [sources.md](sources.md). No third-party implementation, font binary, article example, or branded artwork was imported.

The validator checks repository preview files. The [Pages builder](../../site/README.md) rewrites documentation links in the published HTML copy. Published navigation, delivery, and representative live planning/motion paths are checked separately before reporting the preview live.

## Corrections and remaining coverage

Review corrected the fixed-dark poster's inherited light text-selection token, gave Credits and Remove controls a 44px minimum width, and replaced ambiguous body-family matching with exact local-only Barlow face aliases. Final recorded checks ran after these corrections and repository text normalization. Visibility and media-query event handling were checked explicitly; the test waits for queued preference-change events rather than treating browser event delivery as synchronous.

Each consuming project still needs representative real content, exact licensed font packages, supported browsers, complete keyboard paths, screen-reader names and announcements, native zoom, touch devices, focus clipping, and all relevant interaction states. This evidence does not establish complete WCAG conformance, intended body-font rendering, or real-device animation performance. Transform/opacity selection and short duration alone do not establish performance.

A production planner additionally needs authoritative dates/timezones, availability, persistence, capacity and travel rules, privacy, permissions, and truthful submission/pending/confirmed/error behavior. This reference demonstrates only its documented local sample flow. Selection among Atlas's seven themes has not yet received a fresh project-generation evaluation.
