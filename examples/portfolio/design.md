# Frontend developer portfolio design

## Status, project assumptions, and provenance

**Status: draft.** This sample assumes a frontend developer portfolio with selected work, individual case studies, an About section, and a configured contact destination. Actual projects, responsibilities, outcomes, images, and contact details must be supplied by the developer. Do not invent clients, achievements, permissions, or measured results.

Present the developer's work through readable case studies, clear evidence, and an easy contact path. Visitors should understand the developer's role before encountering decorative effects.

Theme: **Editorial** (`editorial`), Atlas revision **0.1.0-draft**, reviewed **2026-10-13**, derived from Tamir's Tamir39Portfolio implementation. The seed palette, font families, card and button geometry, shadows, and motion values below were inspected in the local source snapshot. Responsive layouts, type sizing, functional borders, error colors, component behavior, and content rules are proposed Interface Atlas adaptations for this sample. This is a design specification, not an implementation or a claim of completed validation.

## Color tokens and appearance

Use semantic roles; component code must not scatter literal colors. The first eleven rows are seed values. The final two rows are proposed Atlas additions.

| Role | Light | Dark | Origin |
|---|---|---|---|
| Page | `#fbf8f5` | `#19151e` | Seed |
| Surface | `#eee8f2` | `#2d2536` | Seed |
| Panel | `#ffffff` | `#231e2b` | Seed |
| Text | `#332b49` | `#f4ede5` | Seed |
| Secondary text | `#655c7e` | `#c2b2ce` | Seed |
| Decorative accent | `#75618d` | `#c7abe8` | Seed |
| Action | `#493b61` | `#c7abe8` | Seed |
| Action hover | `#65527e` | `#dbc4f3` | Seed |
| Text on action | `#ffffff` | `#24182f` | Seed |
| Subtle divider | `#d8cfe0` | `#50445e` | Seed |
| Success | `#346348` | `#9ecead` | Seed |
| Functional control border | `#8c7d9b` | `#9c87af` | Atlas proposal |
| Error text and indicator | `#9e3349` | `#ffb4c1` | Atlas proposal |

Subtle dividers organize content; they must not be the only means of identifying controls. Use the functional border where a control boundary is necessary for recognition, and verify it against the actual adjoining surface. Combine status color with meaningful text and, where useful, an icon. Errors need specific explanatory text, not a colored outline alone.

Provide Light, Dark, and System appearance preferences. Resolve the preference before the first painted frame, and retain a usable default if preference storage is unavailable. Appearance changes must not reset the current page or reading position.

## Typography, spacing, and geometry

Use Manrope for body text and controls, DM Serif Display 400 normal or italic for expressive headings, and optional JetBrains Mono 400/500 only for short technical metadata. Keep long case-study prose in Manrope. Retain useful system fallbacks and verify coverage for the project's actual languages before choosing font subsets.

The following type scale is an Atlas proposal:

| Role | Size | Line-height |
|---|---|---|
| Hero heading | `clamp(2.5rem, 6vw, 5rem)` | `1.08` |
| Page heading | `clamp(2rem, 4vw, 3rem)` | `1.15` |
| Section heading | `1.5rem` | `1.3` |
| Introduction | `1.125rem` | `1.6` |
| Body | `1rem` | `1.65` |
| Metadata | `0.875rem` | `1.5` |

Use Manrope 400 for body text, 500 for the hero, and 600 for controls and section headings; serif phrases retain weight 400. Display tracking may reach -0.02em; body and control tracking stay normal. These weight and tracking assignments are Atlas proposals. Use one H1 per page and sequential heading levels. Limit reading passages to approximately 65 characters per line. Avoid using italic serif text for long passages or critical control labels.

Use the proposed `4/8/12/16/24/32/48/64/96px` spacing scale. Cards retain the seed's 24px radius; action buttons retain pill corners. Inputs, if introduced, use a proposed 12px radius and persistent visible labels. Do not infer a contact form from the contact-link assumption.

Use seed card shadows sparingly: light `0 16px 40px -28px #493b6155`; dark `0 20px 45px -24px #00000099`. Shadows are decorative and must not supply the only control boundary.

## Pages, content, and responsive layout

Home presents identity and role, selected work, approach, and contact in that reading order. “View selected work” links to the work section; the contact action uses the configured contact destination.

Each project card contains its title, project type, role, one concrete contribution, and a meaningful preview. Use a single clearly labeled case-study link; avoid nested clickable controls. If an image fails, retain the project title and link.

Case-study pages follow **context → responsibility → constraints → decisions → implementation → evidence → reflection**. Distinguish individual work from team work. Explain the contribution beside each image. Include outcomes only when evidence exists and disclosure is permitted. Missing case-study content must not display fabricated detail.

The proposed layout uses a 1120px maximum content width, 24px mobile gutters, and 40px wider-screen gutters. Project cards form one column below 720px and two columns above it. Case-study prose stays narrow even when images extend across the content width. At 320px and 200% zoom, content must remain readable without horizontal page scrolling.

Navigation contains Work, About, and Contact. On narrow screens, use a disclosure button with `aria-expanded`; Escape closes the disclosure and returns focus to its trigger. A selected navigation item uses a visible marker and `aria-current`, not color alone.

## Components, feedback, and accessibility

Primary actions use action and text-on-action tokens; secondary actions use panel and text tokens with a recognizable boundary. Links in prose remain underlined. Hover enhances an already recognizable control. Cards need default, hover, and focus-visible treatments; decorative transforms must not move the action target away from the pointer.

Retain the seed's **3px text-colored focus outline with a 5px offset**, using the current appearance's text token. Keep it visible and unclipped around every interactive element, and verify it against the actual surrounding surfaces. Controls should provide approximately 44×44px touch areas. Include a skip link, semantic landmarks, descriptive image alternatives, and a logical keyboard order.

If contact information can be copied, successful copy feedback appears as text announced through a polite live region. A failed copy action offers the visible contact value for manual copying. Do not announce ordinary decorative animation or move focus to a notification.

## Motion and optional effects

Retain the seed's 240ms feedback duration. Applying `cubic-bezier(.2,0,0,1)` uniformly to feedback properties is an Atlas normalization; the source applies it explicitly to transform transitions. Optional section entrances retain 380ms `easeOut` with a 12px vertical offset, once per section. Content must remain visible if animation scripts fail. Reduced motion makes feedback and entrances immediate and removes transforms, delays, smooth scrolling, and continuous decorative animation; state feedback remains understandable without animation.

Floating Paths is optional hero artwork. Its initial presentation is static; animated playback requires a visible user control, with an equally available pause control. Under reduced motion, retain the static presentation. Keep the artwork behind content, noninteractive, and absent from case-study reading areas. Stop animation when hidden or offscreen. This draft references the concept and does not include the reference component or the seed artwork code.

## Performance and acceptance

Reserve image dimensions, provide responsive image sources, and avoid loading optional animation before primary content. Load only the required font styles and language coverage, retaining readable fallback text. A decorative asset failure must not block navigation or the case-study content.

Before release, check keyboard navigation, focus visibility, appearance switching, reduced motion, zoom and reflow, actual composited contrast, image failures, and a representative mobile connection. Source inspection and numerical token checks do not establish rendered contrast, accessibility conformance, interaction correctness, or performance results. This sample has not been rendered or interaction-tested.

## Source credits and reuse boundaries

**Seed implementation:** Tamir (Phi Vuong Tuong Tam), **Tamir39Portfolio**, source snapshot `166f44091a58a68d74096bc44defceb99243ba4e`, inspected locally. The configured remote links may require repository access:

- [Theme definitions and motion][seed-motion]
- [Theme styling][seed-theme] and [appearance styling][seed-appearance]
- [Base styles][seed-base] and [font configuration][seed-fonts]
- [Hero artwork provenance and adaptation notes][seed-artwork]

**Optional artwork concept:** Bundui.io, [Floating Paths](https://21st.dev/@bundui/components/floating-paths), credited in the seed's artwork notes. This credit does not establish permission to copy that component. No external artwork or code is included here.

**Font designers and package metadata:**

- Manrope — **Mikhail Sharanda**; [Google Fonts metadata][manrope-meta] and [OFL 1.1 notice][manrope-ofl].
- DM Serif Display — **Colophon Foundry**; [Google Fonts metadata][dm-meta] and [OFL 1.1 notice][dm-ofl].
- JetBrains Mono, if selected — **JetBrains, Philipp Nurullin, Konstantin Bulenkov**; [Google Fonts metadata][mono-meta] and [OFL 1.1 notice][mono-ofl].

These are the listed font-package terms, separate from the theme text and optional effects. No font binaries are included. Preserve the notices applying to the actual font package when assets are acquired or redistributed; these links do not grant rights to unrelated artwork or seed code.

**Accessibility and motion references:** [W3C WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/) and [Motion accessibility guidance](https://motion.dev/docs/react-accessibility).

**Atlas contribution:** original specification prose and the explicitly proposed project adaptations, prepared with AI assistance for Interface Atlas. Seed code and reference-effect reuse terms have not been cleared by this draft. No implementation, external code, artwork, or font assets were imported.

[seed-motion]: https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/lib/themes.ts
[seed-theme]: https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/themes.css
[seed-appearance]: https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/appearance.css
[seed-base]: https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/globals.css
[seed-fonts]: https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/layout.tsx
[seed-artwork]: https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/docs/hero-artwork.md
[manrope-meta]: https://github.com/google/fonts/blob/main/ofl/manrope/METADATA.pb
[manrope-ofl]: https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt
[dm-meta]: https://github.com/google/fonts/blob/main/ofl/dmserifdisplay/METADATA.pb
[dm-ofl]: https://github.com/google/fonts/blob/main/ofl/dmserifdisplay/OFL.txt
[mono-meta]: https://github.com/google/fonts/blob/main/ofl/jetbrainsmono/METADATA.pb
[mono-ofl]: https://github.com/google/fonts/blob/main/ofl/jetbrainsmono/OFL.txt
