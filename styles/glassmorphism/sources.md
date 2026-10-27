# Glassmorphism — sources and credits

Reviewed/read: **2026-10-27**. Style revision: **0.1.0-draft**. This date records inspection of live references; it does not pin a platform SDK, source repository release or immutable webpage snapshot.

## Authorship and evidence boundaries

**Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**, is credited for this original Interface Atlas interpretation and its reference specimen. The exact tint percentages, theme mapping, geometry choices, filter recipe, static CSS artwork, specimen text, native controls and HTML/CSS/JavaScript are Atlas work. No generator output, platform source, sample implementation, article prose, screenshot, logo, icon, font binary or external artwork is imported.

Keep three kinds of statements distinct:

- **Source facts:** dated authorship, documented platform behavior, CSS semantics and standards thresholds supported by the references below.
- **Atlas inferences:** conditional fit judgments, the distinction between a material and a complete theme, and choosing opaque dense content.
- **Atlas recipe choices:** the reference's 88%/90% theme-surface tint, 16px blur, 110% saturation, allowed surfaces, state treatment and fallback contract. None is a universal source recommendation or performance budget.

## Naming and earlier practice

| Primary source | Credit, observed fact and limited role | Reuse status |
| --- | --- | --- |
| [Glassmorphism in user interfaces](https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb1308c9), **2020-11-22** | **Michal Malewicz**, author; **UX Collective**, publication. The visible article record supplies the byline and exact publication date. The full article is member-restricted; Atlas does not claim to have inspected its unavailable body. | No open redistribution license established for the article or its illustrations. No prose or artwork copied. |
| [Hype4/SquarePlanet glassmorphism generator](https://hype4.academy/tools/glassmorphism-generator) | First-party retrospective credits **Michal Malewicz** with coining the name, and dates the initial article to November 2020. This supports naming/popularization credit rather than sole invention of translucency. | The page links [Terms and Conditions](https://hype4.academy/terms-and-conditions). No blanket permission for its artwork or generator implementation established. Atlas does not copy its generated CSS. |
| [DWM Blur Behind Overview](https://learn.microsoft.com/en-us/windows/win32/dwm/blur-ovw), page updated **2020-08-19** | **Microsoft / Windows documentation contributors**; individual author not established. Documents older DWM translucent blur-behind and Windows Vista context, with Windows 8 behavior caveats. Evidence of prior practice, not the birth date of all glass effects or a web implementation. | Read alongside [Microsoft Learn Terms of Use](https://learn.microsoft.com/en-us/legal/termsofuse); explicit document licenses can differ. No platform C++ sample, screenshot or brand asset imported. |
| [Introducing Backdrop Filters](https://webkit.org/blog/3632/introducing-backdrop-filters/), **2015-08-10** | **Brent Fulgham**, author, **WebKit** publisher. Describes browser backdrop filtering and earlier iOS 7 / OS X Yosemite blur context. Also identifies additional rendering passes and a need for selective use. The article predates the 2020 name. | WebKit software licensing is not a blanket article-artwork license. Its specific NASA media acknowledgement is not permission for unrelated images. No code, image or video imported. |

**Atlas historical conclusion:** glass-like interface effects precede the later umbrella name. These selected records are not a complete history and do not establish one inventor of frosted-glass interfaces.

## Distinct platform materials

| Primary source | Creator/publisher credit and observed concept | Role in Atlas |
| --- | --- | --- |
| [Acrylic material](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic) | **Microsoft / Windows design documentation contributors**. Describes translucent texture, supporting/transient use, avoidance of stacked acrylic, legibility concerns and solid alternatives for accessibility/device conditions. Individual author not established. | Comparative reference for selective material and fallback. Atlas does not implement AcrylicBrush, native desktop sampling or its composition pipeline. |
| [Mica material](https://learn.microsoft.com/en-us/windows/apps/design/style/mica) | **Microsoft / Windows design documentation contributors**. Explicitly describes Mica as **opaque**, using theme/wallpaper context. Individual author not established. | A distinction, not an example of transparent backdrop glass. An opaque Atlas fallback is an ordinary surface, not a Mica reproduction. |
| [Materials — Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/materials) | **Apple / Human Interface Guidelines contributors**. Official platform-material reference; individual page author not established. The accessible response required JavaScript and its offered Markdown route failed during this inspection. | Link retained for scope and future project-specific reading. No detailed current HIG prescription, Liquid Glass optical behavior or accessibility claim is inferred from unavailable page content. |

Microsoft Learn's [terms](https://learn.microsoft.com/en-us/legal/termsofuse) allow separately specified documentation terms; they do not establish a universal license for every image, logo, sample or product identity. No blanket reuse license for Apple's HIG prose or imagery was established. Atlas references these authored systems without importing their implementation or assets, claiming endorsement, or presenting this CSS treatment as a faithful Liquid Glass, Acrylic or Mica port.

## Web implementation and preference references

**MDN Web Docs / Mozilla Contributors** are credited for the following documentation. Inspected **2026-10-27**.

| Source | Verified fact and limited role |
| --- | --- |
| [backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter) | Filters the area behind an element; partial transparency is needed to see the result. Its Baseline 2024 label does not establish support in every older browser or device. Atlas uses feature detection and an opaque baseline. |
| [prefers-reduced-transparency](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-transparency) | The inspected page marks the query **experimental** with **limited availability**. It can report reduced translucency preferences where implemented. Atlas therefore also provides an explicit opaque mode. |
| [MDN attribution and copyright licensing](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license) | Documentation defaults to **CC BY-SA 2.5 or later**, unless otherwise stated. Sample-code and trademark terms are separate. No MDN prose, demo image or sample code is copied into this original recipe. |

These are implementation references, not evidence that the exact Atlas visual choices improve readability or meet a frame-time target. No browser compatibility assertion extends beyond the inspected documentation and separately recorded browser checks.

## Contrast requirements

**W3C Accessibility Guidelines Working Group and contributors** are credited for [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and its informative Understanding documents. Inspected **2026-10-27**.

- [Contrast (Minimum), SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) explains **4.5:1** for ordinary text and **3:1** for qualifying large text, with defined exceptions. Check the final composite behind text rather than pairing a foreground with an uncomposited tint token.
- [Non-text Contrast, SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) explains **3:1** for visual information needed to identify controls, states and meaningful graphical parts against adjacent colors, with defined exceptions. A decorative glass rim is not automatically the control's identifying boundary.

Understanding documents explain the criteria; they are not independent conformance certificates. W3C materials have their own document copyright/reuse notices. No W3C prose, diagrams or example implementation is imported. The numerical thresholds alone do not establish the complete accessibility of this style or any consuming interface.

## Reuse and remaining limits

All cited web references are external sources, not bundled assets or dependencies. Their authorship is distinct from Atlas authorship. A public URL, a software repository license, a platform documentation page or a credit line is not blanket permission to redistribute that creator's graphics, icons, fonts, screenshots or trademarks.

Future imports require the exact selected material's license, copyright, version and retained notices. Atlas's own publishing terms remain undecided. The [validation record](validation.md) separately states which browser combinations, rendered backdrops, preferences and task states were actually exercised; source research does not substitute for that evidence or for real-device performance measurements.
