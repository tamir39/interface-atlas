# Fieldbook composition design

This evaluation applies the [Skeuomorphism grammar](../../styles/skeuomorphism/style.md) to a bounded notebook task. **Fieldbook** contains four fictional notes, a searchable applied index, one opened note, and a local draft editor. A physical notebook supplies the organizing metaphor: cover, binding, page edges and reading sheet. Search and downloadable text extend that metaphor as useful digital actions.

The implementation is plain HTML, CSS and JavaScript. Notes, applied changes, drafts and preferences live only in the current page. Reload resets them. There is no account, durable save, server, network request, asset download, remote font, booking or agent authority. Download creates a real local UTF-8 text file from the opened **applied** record.

## Task and state contract

The native note index has four stable record IDs: window-light, corner-shop, small-route and rain-check. A native button opens each record and exposes aria-pressed; visible Selected text is aria-hidden so selecting a note does not change its accessible name. Applying a changed title legitimately changes that record's name.

Each note has an independent raw draft cache. Switching notes restores that note's title/body inputs; it neither applies nor discards edits. The applied reading view and index remain unchanged until **Apply locally** succeeds. The title must contain 3–48 trimmed characters; the body 1–240. Native required and maxlength constraints are supplemented by trimmed/custom validity. The first invalid field receives focus and a persistent described error. Invalid inputs preserve the applied record.

Apply trims title/body, changes the opened applied record and index, and establishes that record's new applied snapshot. **Revert draft** restores only the opened note's draft from that snapshot. It does not reset unrelated note drafts or preferences. Draft, applied and error states have readable local feedback.

Search reads applied title, body and tags. It does not search dirty drafts or change the opened note. Filtering the opened record out of the index retains its applied detail and cached draft, with a visible live explanation. Clear search restores the original index order and current context. Empty results keep an explicit recovery action.

**Download applied text** exports the opened applied title, body and tags; its fixed filename contains the stable note ID, including when its draft is dirty. Its name, actual UTF-8 bytes and content are inspected during verification. Download does not apply a draft. No page flip, drag-only action, forced delay or motion completion is required to read or edit.

## Theme preservation and explicit overrides

The generated CSS/JSON maps the same 15 root variables from each of nine actual theme preview sources: Page, Surface, Raised, Ink, Muted, Primary, On-primary, Border, Focus, Error, body/display/mono font families, panel radius and control radius. The manifest retains source paths and SHA-256 fingerprints. All 18 light/dark computed identity sets are compared with those generated values. This is a finite profile adapter, not a copy of complete theme applications or their font binaries.

The outer cover and index choices retain source --card-radius; ordinary action buttons, selects, search, inputs and textarea retain the source preview's --control-radius projection, including Botanical's alternating corners. Editorial projects 12px text-entry corners to these ordinary controls; its original theme buttons use 999px capsules. The page-shaped **paper artifact deliberately uses 2px corners**. That artifact override is not a claim that every source geometry is retained. Opaque content faces use Raised; ordinary text/necessary boundaries and action pairs use their source roles.

Paper rules, edge stacks, grain, binding and shadows are decorative chrome outside the opaque content face. The direct positioned face paints above those layers and contains **all** readable text and controls within each paper artifact. No meaningful text is painted by pseudo-elements. This makes the actual color path measurable without mistaking a decorative texture for a flat background. Structural and bounded screenshot checks supplement computed color pairs.

The local layout stacks index, opened note and draft at narrow widths, with natural DOM order. At wide widths the index and opened work area share useful space. Long valid unbroken title/body values wrap without whole-page horizontal overflow. Native targets meet Atlas's 44px comfort goal. Optional motion adds only a finite 1px pointer press; off, reduced motion and forced colors keep it level.

## Fit decisions

These decisions follow each theme's actual authored design contract. The browser matrix tests one shared implementation; its pass does not settle visual or product fit.

| Theme | Relevant source contract | Decision for this notebook |
| --- | --- | --- |
| [Blueprint](../../themes/blueprint/design.md) | 8px panels, 4px controls, restrained offset decoration and drafting geometry. | Token/cover/control experiment only. A construction grid does not make physical notebook chrome part of Blueprint's normal systems interface. Record a deliberate material departure. |
| [Botanical](../../themes/botanical/design.md) | Narrative reading workspaces, Manrope with selected DM Serif Display, alternating 32/8px cover and 22/6px controls; selective elevation. | A bounded reading journal can suit the narrative direction. Preserve the alternating cover/control grammar and keep the 2px paper override explicit; binding/texture remains selective. |
| [Editorial](../../themes/editorial/design.md) | Readable hierarchy, selected expressive serif, 24px cards and original capsule controls, selective raised panels; this source preview projects its 12px text-entry adaptation into --control-radius. | A notebook reading task is a reasoned adaptation. Editorial hierarchy supports reading but does not itself require literal paper or binding. Keep chrome subordinate and disclose the artifact geometry. |
| [Gallery](../../themes/gallery/design.md) | Images lead; Inter, 0px media corners, 4px panels/controls and flat surfaces. | This text-only notebook does not establish Gallery's image-led fit. Literal page stacks and binding are an intentional departure, unsuitable as incidental polish. |
| [Layered](../../themes/layered/design.md) | Functional opaque surface roles, 24px panels/12px controls; explicitly rejects inset bevels simulating physical controls. | Preserve role mapping in the probe, but do not recommend physical notebook controls as Layered's default. Its material hierarchy is not authorization for skeuomorphic bevels or texture. |
| [Play](../../themes/play/design.md) | 30px panels/14px controls, firm ink boundaries and hard offset depth on selected expressive surfaces. | Tactile interaction offers partial affinity. Paper/binding is a new metaphor and replaces the source hard-depth treatment on the artifact; it must be documented rather than described as equivalent. |
| [Precision](../../themes/precision/design.md) | Productive information, 4px geometry, flat opaque data/action surfaces and restrained rules. | Notebook material is a deliberate conflict with normal operational surfaces. The passing token profile is not a recommendation for a Precision dashboard. |
| [Pulse](../../themes/pulse/design.md) | Condensed poster display, bounded graphic artwork, 12px panels/6px controls; ordinary task surfaces stay flat. | Expressive poster identity does not extend to binding or paper texture on every task surface. Use only as an explicitly reviewed, bounded separate artifact. |
| [Swiss](../../themes/swiss/design.md) | Typographic grid and structural rules, 2px panels/controls, shadow-free flat surfaces; avoid incidental bevels and shadows. | Print-informed hierarchy is not literal paper chrome. Matching 2px paper corners alone does not make this source-compatible; binding/depth is a documented departure. |

No row claims complete theme validation. The preview does not reproduce source layouts, density, intended font-binary metrics, meaningful imagery, every component or original app behavior.

## Browser method

[The optional validator](../../tools/validate-skeuomorphism.mjs) serves the actual preview under a loopback subpath. It uses installed Playwright/Chromium without a package install and records Node/browser versions, runtime/validator SHA-256 values, nine source fingerprints, 18 computed identities, every base/interaction context, actual accessible names and task outcomes. Raw JSON and screenshots stay in a fresh temporary output directory. The committed compact projection retains every context row, its schema, raw-report hash and byte length, checked identities and actual download evidence.

The base matrix is nine profiles × light/dark × 320/1280px × motion off/on = **72 states**. Each light/dark profile also receives selected, empty-title, empty-body, hover, actual pointer-active off/on and five keyboard-focus contexts = **198 measured interactions**, including **90 focus contexts**. Required/custom bounds, Apply, dirty export, per-note caches, current Revert, applied search, hidden-open recovery, maximum-value reflow and reload reset are separate functional checks. System appearance is changed live. Reduced motion overrides explicit motion-on. Forced colors, JavaScript disabled and aborted initialization use dedicated browser contexts.

Computed contrast starts with actual sRGB foregrounds, backgrounds and real borders, composited through opaque/transparent ancestor fills. Unsupported opacity, gradients, filters and blend modes in a readable path fail instead of silently passing. Normal visible text needs 4.5:1; large text 3:1. Fields require a real 3:1 border against both fill and parent; buttons require a real border or fill at 3:1 against their parent. Selected and keyboard outlines need 3:1 against the adjacent parent. Keyboard focus is at least 3px with a 3px gap and checked for ancestor clipping.

Visible decorative HTML punctuation remains measured. Hidden/placeholder text, native select popups and validation bubbles, glyph internals, SVG paths and antialiasing are outside the computed method. Rules, grain, binding and shadow pixels are not RGB background pairs. Separate DOM/CSS checks verify paper geometry, opaque Raised-face coverage, containment and paint order, while bounded screenshots check the resulting material/readability relationship.

Forced colors uses Canvas/CanvasText for content and selected text, ButtonFace/ButtonText for actions, and CanvasText focus. Decorative material and motion are removed. No Highlight-filled black backplate is required to communicate selection. Checks follow the implemented system roles, including visible heading punctuation and selected/CTA words.

This is Chromium-only evidence for a finite composition. It does not certify accessibility, physical devices, another browser engine, native zoom/text enlargement, intended font binaries, screen-reader behavior, a user study, backend behavior, full theme composition or performance.
