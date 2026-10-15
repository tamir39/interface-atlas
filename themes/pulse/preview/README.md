# Pulse reference preview

Open [the live Pulse preview](https://tamir39.github.io/interface-atlas/themes/pulse/preview/) or [index.html](index.html) directly in a browser. No build, installation, external request, or server is required. The original HTML, CSS, JavaScript, poster geometry, fictional gathering, and sample program were prepared for Interface Atlas with Codex AI assistance.

## Scope

**Form & Function** is an illustrative design gathering. It is not an advertised real event. Its sessions, program, and local plan demonstrate interface behavior without invented speakers, client achievements, attendance, capacity, reservations, or registration claims.

- Light, Dark, and System use independent Atlas-proposed Pulse tokens. **System is the default**, follows live device appearance, and falls back to CSS device appearance when initialization is unavailable. Valid saved preferences are read before the stylesheet where possible; invalid or blocked storage preserves usable defaults.
- The bounded hero poster retains a dark composition in both appearances, with its own dark foregrounds. The surrounding page still follows the selected appearance.
- Comfortable is the default. Compact changes **only the neutral component specimen's inset from 24px to 16px**. It leaves the poster, planner, typography, 12px/6px geometry, and control targets unchanged.
- Motion feedback is 150ms color/border feedback. Reduced motion and motion-off make it immediate. Essential content and all planning tasks remain independent of animation.
- One explicit **Play motion study** action requests finite 600ms transform/opacity movement of three decorative bars. It never autoplays or loops. Repeat activation cancels the previous run; motion-off, live reduced motion, and document hiding cancel movement and restore the static composition. Visibility restoration does not replay it. An unsupported animation API leaves a static fallback.
- Native disclosures keep all six session descriptions readable without JavaScript. Runtime planning/preferences/study controls remain disabled with an explanation; ordinary native specimen fields remain usable locally. No backend is connected.

## Local plan and review

The program contains six fixed sessions on an unspecified **sample day**, using local illustrative clock labels. It provides no real date, venue, timezone conversion, capacity model, or calendar connection.

| Stable identity | Time | Format |
| --- | --- | --- |
| `opening` | 09:00–09:45 | Talk |
| `systems` | 10:00–11:00 | Workshop |
| `motion` | 10:30–11:15 | Lab |
| `type` | 11:15–12:00 | Talk |
| `prototype` | 13:00–14:00 | Workshop |
| `critique` | 13:30–14:15 | Lab |

1. **Filter:** the native Format select filters program cards. It preserves chosen sessions and an existing review/result. The plan remains visible even when some selected cards are hidden.
2. **Choose:** each session has a native Add-to-plan toggle with a stable label, a session-specific accessible name, and `aria-pressed`. It adds or removes that fixed identity without duplicates. Visible selection text/markers supplement the surface color.
3. **Inspect the plan:** the plan lists chosen sessions and time ranges with explicit Remove actions. Removal focuses the next surviving Remove action, then the previous one, or the plan heading when empty. Clear plan empties the collection and focuses the plan heading.
4. **Review:** Review plan checks that at least one session is selected and no chosen time ranges overlap. Two intervals conflict only when they strictly overlap; adjoining motion/type sessions at 11:15 are allowed. Empty or conflicting results focus the error heading and provide readable recovery links. Error links return to an appropriate Add control; if its card is hidden, they reset Format to All and explain the reveal.
5. **Recover:** changing membership hides and invalidates an earlier review or error result. Choose a valid alternative and review again; a previous result does not remain presented as current.
6. **Read a valid result:** a successful review focuses its heading and lists the checked sessions. **Back to program** hides that review, preserves selection/filter, and focuses the program heading.

Review is an immediate local check of fixed sample intervals. It **does not book, reserve, submit, pay, export a calendar, contact anyone, invoke an agent, or confirm participation**. The page makes no network request. A real product must define its own date/timezone, travel, availability, service validation, persistence, and pending/confirmed/error behavior.

Plan choices, filters, errors, and review state are not saved and initialize fresh on reload. Only global appearance, specimen density, and motion preferences persist under the guarded localStorage key `interface-atlas-pulse-preview`.

## Typography and provenance

CSS names **Barlow Condensed** with local **Impact / Arial Narrow / sans-serif** fallbacks for short display text. Body/controls use the local-only CSS alias **`Pulse Barlow Local`**, then **Segoe UI / sans-serif**, to preserve ordinary-width text. Its normal-style 400/500/600 faces match only explicit installed Barlow Regular, Medium, and SemiBold names and their corresponding PostScript names. This avoids the inspected Windows collision in which the plain `Barlow` family resolved to Barlow Condensed. The aliases contain only `local()` sources, with no font file or remote request. If those exact faces are absent, an available local fallback renders. Intended named-font rendering is not established by naming a CSS family; [validation.md](../validation.md) records the actual rendered faces.

The poster selects display weight 700, `clamp(3.5rem, 10vw, 8rem)`, line height `0.9`, and tracking `-0.015em`. It caps at 6rem in the intermediate layout, then uses `clamp(3.5rem, 17vw, 6rem)` after the artwork stacks. Body text is 16px/1.6, labels 14px, ordinary card headings 22px, and short tags/captions generally 12px; the artwork caption uses 10px in the intermediate layout. A short 14px technical specimen uses local Consolas / Liberation Mono / monospace. The 1240px container and 24px/16px outer gutters are preview adaptations, distinct from the portable proposals in [design.md](../design.md).

**Jeremy Tribby** is the credited Barlow family designer. The upstream project additionally credits **Nguyễn Hồng Nhung** for Vietnamese; package notices identify **The Barlow Project Authors**. A Vietnamese sample demonstrates content and fallback handling rather than full glyph coverage certification. A project checks its actual package/version, weights, language coverage, fallback, and wrapping.

Pulse is an original Atlas synthesis for **Tamir (Phi Vuong Tuong Tam) with Codex AI assistance**. **Adam Argyle and Open Props contributors** are credited for referenced modular CSS-token/adaptive-preference concepts at `f39ab7c377a0e047f930982e3611bbc95254a260`. **Kayce Basques and Rachel Andrew** are credited for the separate web.dev animation-performance guidance. Pulse is not an Open Props theme or a portfolio extraction. Every palette, geometry, layout, typography, timing, and interaction value is an Atlas proposal.

Read [sources and credits](../sources.md), [third-party notices](../../../THIRD_PARTY_NOTICES.md), and [validation evidence](../validation.md). No Open Props implementation, article prose/example, external effect, font software, or branded asset is copied. Atlas's publishing terms remain undecided.

The deployed copy retains this local behavior. Documentation links resolve to GitHub source pages during the [preview site build](../../../site/README.md); that build adds no third-party script or remote font.

This is a **draft reference**. Representative checks do not validate every project adaptation, named font, browser, assistive technology, accessibility criterion, device performance condition, or real scheduling service. The validation report distinguishes actual evidence from these limits.

## Stable test hooks

| Purpose | Selector or action |
| --- | --- |
| Appearance / specimen density / motion | `#appearance`, `#density`, `#motion` |
| Root preference state | `document.documentElement.dataset.appearance/density/motion` |
| Preference storage | `interface-atlas-pulse-preview` localStorage key |
| Program / focus heading / format filter | `#program`, `#program-title`, `#format` |
| Six session cards | `[data-session-id]`: `opening`, `systems`, `motion`, `type`, `prototype`, `critique` |
| Add-to-plan toggles | `#add-ID`; stable label with session-specific accessible name and `aria-pressed` |
| Plan / focus heading / count / list | `#plan`, `#plan-title`, `#plan-count`, `#plan-list` |
| Clear / review | `#clear-plan`, `#review-plan` |
| Polite change feedback | `#planner-status` |
| Error result / focus heading / links | `#plan-errors`, `#error-title`, `#error-list` |
| Valid review / focus heading / list / return | `#plan-review`, `#review-title`, `#review-list`, `#back-to-program` |
| Finite motion study / explanation / bars | `#play-study`, `#study-note`, `.motion-bar` |
| Native session disclosures | `#session-details-ID` |
| Native specimen fields | `#specimen-label`, `#specimen-kind`, `#specimen-context` |
| Typography samples | `#type-display`, `#type-body`, `#type-vietnamese`, `#type-technical` |

`ID` means one of the six fixed session identities. These hooks support representative checks; they are not a public API, durable schedule contract, or production booking route.
