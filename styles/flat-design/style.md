# Flat Design — style specification

Revision: **0.1.0-draft**. Reviewed: **2026-10-27**.

This original Atlas **form** recipe uses opaque planes, type, spacing and explicit interaction cues without decorative simulated depth. Exact component choices, numerical values, profile mapping and task behavior belong to Atlas. They are not universal historical rules. Read the [README](README.md) for fit and [sources](sources.md) for creator and evidence boundaries.

## Family and interpretation

A strict flat treatment removes shading that makes interface elements appear raised, recessed, glossy or textured. That leaves a practical design problem: how do people recognize controls, grouping and state? Solve it through persistent shape, boundaries, labels, useful placement and programmatic semantics. A hover effect or pointer cursor can supplement those cues, but cannot be their first appearance.

Flatness concerns rendering; **Minimalism** can concern what content and functionality remain. A flat dashboard may contain many useful controls. A restrained page may still use a deliberate shadow. Neither label supplies a complete information architecture or user flow.

**Swiss** is an Atlas theme with its own typographic and structural identity. Shared flat surfaces do not make another interface Swiss. [Web Brutalism](../web-brutalism/style.md) describes a separate content-first composition in its Atlas reference; flat design does not require a raw document, browser-default typography, square corners or a particular enhancement strategy. [Neobrutalism](../neobrutalism/style.md) uses hard offset depth that this strict recipe removes.

Semiflat or Flat 2.0 approaches permit selected depth cues. **Material Design** is Google's system, with its own semantic color, shape, component and elevation rules; current Material 3 supports tonal and shadow elevation. Do not rename an arbitrary shadow-free component a Material implementation, or describe every Material component as necessarily shadowed. If a project needs meaningful elevation, record that intentional departure from this strict Atlas specimen and assess the actual result.

## Scope and theme projection

Name the components or working surface to which this treatment applies. Preserve useful content, semantic status roles, hierarchy, language and existing interaction ownership. Removing material effects can weaken an established identity or erase a grouping cue; decide how the remaining structure carries that information before deleting depth everywhere.

The **Next Up** specimen projects selected profiles from **Editorial, Swiss, Precision, Play, Botanical, Blueprint, Pulse, Gallery and Layered** onto one small task board. Its snapshot retains **15 source-mapped variables**, source fingerprints and both light/dark identity sets. It uses the selected palette and declared body/display/mono stacks. A named family in CSS does not establish that its font binary is installed or rendered; this preview ships no font software.

This recipe retains the projected source card corners on the board/composer panels and source control corners on styled controls. Rounded shapes remain flat when their paint has no depth illusion. Native checkbox glyphs and select popup internals stay under browser/platform control; do not replace them with custom drawings merely to force identical pixels. Geometry preservation refers to the selected source-preview profile, including its recorded task adaptations, rather than every component in the full authored theme.

Shadows, gradients, blur, material texture and offset elevation are deliberately removed. Play's offset depth and Botanical's elevated organic treatment therefore do not remain intact simply because their colors, stacks or projected radii are available. Read the individual [theme references](../../catalog/themes.json) before claiming identity preservation. The nine-profile switcher is an Atlas comparison device; consuming projects need only their chosen direction.

## Bounded visual recipe

| Role | Atlas reference choice | Purpose and boundary |
| --- | --- | --- |
| Surfaces | Opaque Page, Surface and Raised palette roles used as flat fills | Adjacent tones help group content; the token name Raised does not create a shadow or physical layer. |
| Corners | Projected card/control radii | Flatness does not require 0px corners. Record any actual component override. |
| Depth | No authored shadow, gradient, blur or material texture | Use content structure and explicit boundaries rather than simulated elevation. |
| Structure | Spacing, headings and visible rules/control outlines | Avoid making an entire passive card look like an unlabelled action. |
| Primary action | Primary fill with paired On-primary text and an action label | Keep the action identifiable before hover; do not reuse its exact treatment on passive decoration. |
| Text | Theme Ink and supporting Muted on measured opaque backgrounds | Essential instructions and completed tasks remain legible; status is not conveyed by fading content away. |
| Navigation | Real underlined links | A link retains its destination and native keyboard/browser behavior. |
| Completion | Native checkbox plus readable state | The checked semantic state, task label and visible status survive loss of accent color. |
| Optional feedback | **120ms ease** border-color feedback, initially off | Feedback does not move targets or postpone state changes. |

Do not replace every background with white or apply a compulsory bright palette. Light and dark each need full foreground/background pairs. A flat composition can include meaningful imagery; this bounded board does not establish a universal image treatment or artwork grammar. Any decorative planes remain noninteractive and cannot obscure content or resemble an unlabeled command.

## Hierarchy, shape and affordance

Place the main task before supporting theme mechanics. Keep a clear heading hierarchy, associated field labels and readable help. Separate settings, task summaries, filters, working list and add form using actual structure. Do not depend on a faint fill difference alone where users need an identifying boundary.

A button looks actionable at rest through a contained surface, edge and useful verb. A field exposes its label, entry area and constraints. The native All/Open/Done filter select retains an associated label and selected option; it is not a tab widget. Checkboxes have stable task names and retain keyboard toggling. Keep control labels and their hit areas together without making unrelated content activate the control.

A completed task retains its wording and an explicit Done state. A priority is a readable category rather than merely a colored dot. Filled decorative blocks, passive totals and interactive selections need visibly distinct roles. Where a flat redesign removes an existing depth cue, provide enough remaining structure to identify the actual operation.

Use the chosen theme's body role for working content and its display face where heading proportions remain readable. Let long labels, task titles and settings wrap. Avoid fixed text heights, clipped status messages and horizontally oversized controls. At narrow widths, simplify the arrangement while retaining reading and keyboard order. A wrapping row of controls is preferable to inaccessible truncation.

## Task and local state contract

**Next Up** is an original, small browser-local priority board. Four fictional starter tasks, including one initially Done, show recognizable controls and explicit completion. All/Open/Done filtering changes the visible subset; it does not delete tasks or silently reset completion. Summaries must make clear whether a count describes the complete list or the current result.

Adding a task accepts a title of **3–64 characters after trimming surrounding spaces** and a native High/Normal/Low priority choice, then inserts an Open task as literal text. Blank or invalid titles get an associated message, aria-invalid and title-field focus; editing clears stale validation feedback. Success clears the title, retains priority and returns focus to the title field. User text must not become executable markup. The [preview notes](preview/README.md) record the implemented details.

When completion hides the focused checkbox, focus moves to the first visible task checkbox or, if none remains, the filter select. In All view, completion retains that task’s focus. Explain a change that removes the task from the current view. If a newly added open task is outside a Done filter, preserve the chosen filter and state what happened with a route to view it. An empty result needs useful copy and a way to change the view; it is not equivalent to an empty stored list.

Keep task additions, completion and in-progress form values across theme, appearance and filter changes unless the action explicitly requests otherwise. State is held in the open page and resets on reload. No account, backend, durable save or remote completion guarantee is demonstrated. Do not add these capabilities to another project merely to reproduce this specimen; use that project's real state, recovery and service requirements.

The static starter content remains readable without JavaScript or when the enhancement fails. Controls requiring the task runtime begin unavailable with an explanation and enable only after initialization. Native links and disclosures remain useful. This is the reference's resilience contract; flat design itself does not require every application's features to run without scripts.

## Appearance, focus and preferences

Support Light, Dark and System through the host project's appearance model. System follows live operating-system changes; an explicit choice remains explicit. Check actual fields, actions, supporting text, required boundaries and state cues in each mode rather than judging only the hero or palette sheet.

Keep visible focus independent of depth and optional hover feedback. Focus must remain recognizable over each surface and selected state. Target dimensions, outlines and spacing in the preview are original implementation choices, not historical definitions of flat design. Native control appearance is allowed to differ by platform.

Forced colors must retain readable content, persistent control boundaries, native checked semantics and useful status/error text. The reference uses Canvas/CanvasText for content, LinkText for ordinary links and ButtonFace/ButtonText for controls and actions, including the button-like skip link. Do not broadly opt out with forced-color-adjust: none simply to retain brand fills. The decorative artwork is hidden without losing information. [Preview notes](preview/README.md) record the actual system-color mapping and [validation](validation.md) records inspected outcomes.

Motion is off by default. Optional feedback is limited to border-color treatment, with no scaling, translation, animated scrolling, entrance sequence or pulsing. Reduced motion and forced colors remove the transition, including after live preference changes. See [motion.md](motion.md) only if that feedback is chosen.

## Evaluation boundary

Check actual text pairs against [SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): generally **4.5:1** for ordinary text and **3:1** for qualifying large text, with its exceptions. Necessary authored control/state information generally needs **3:1** against adjacent colors under [SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), with its exceptions. Native controls have relevant user-agent exceptions; an arbitrary decorative edge is not automatically the required identifying boundary.

[SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) defines a **24 by 24 CSS pixel** minimum with spacing conditions and exceptions. A preview's larger target-height choice does not alone assess every target. Exercise keyboard entry and toggling, filter/empty outcomes, invalid and accepted additions, focus after a row disappears, long text, reflow, preferences and enhancement failure. Automated profile results establish a finite rendering and behavior sample. They do not measure comprehension, real-device performance, complete accessibility or the suitability of every theme/product pairing. Keep the entry **draft** while those limits apply.
