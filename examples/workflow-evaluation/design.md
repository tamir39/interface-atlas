# Independent architecture journal — frontend design

Status: draft specification for a fresh workflow evaluation. No interface has been implemented or tested.

Theme: Editorial, `0.1.0-draft`, reviewed 2026-10-13. Source snapshot: Tamir's [portfolio](https://github.com/tamir39/tamir39-portfolio), commit `166f44091a58a68d74096bc44defceb99243ba4e`.

## Requirements and decisions

The confirmed brief is an independent architecture journal in English and Vietnamese: image-rich articles, comfortable reading, locally saved articles with undo, light/dark/system preference, and mobile-first layout. There is no backend account or approval system.

Readers should discover an article, read its text and architectural images, change language when a translation is available, save it on this browser, and recover an accidental removal. Editorial suits publication reading through its warm neutral surfaces, strong text contrast, and comfortable spacing. Its actual status remains draft.

The pages, numerical layout choices, local-state contract, and image behavior below are project proposals. The journal's name, content inventory, publishing system, article identifiers, translation completeness, image rights, and delivery stack are unconfirmed. Do not invent author biographies, architects, project credits, publication dates, or outcomes. Use clearly labeled fixture content while these are unresolved.

Assume stable article IDs shared across translations and metadata with title, author, publication date, image dimensions, image credits, and translation availability. Confirm this contract before implementation. Saving records an ID, not a downloaded article or offline-reading guarantee. Interface translations must be supplied and reviewed; the labels in this draft are working copy.

## Color contract

Retain these source values. Every color in this specification is opaque unless the shadow explicitly specifies alpha.

| Role | Light | Dark | Permitted use |
| --- | --- | --- | --- |
| Page | `#fbf8f5` | `#19151e` | Main background |
| Surface | `#eee8f2` | `#2d2536` | Related secondary region |
| Panel | `#ffffff` | `#231e2b` | Raised controls and saved-state notice |
| Text | `#332b49` | `#f4ede5` | Main text on page/surface/panel |
| Muted | `#655c7e` | `#c2b2ce` | Author, date, captions; never reduce opacity |
| Accent | `#75618d` | `#c7abe8` | Small decorative marks; no essential text pairing implied |
| Action | `#493b61` | `#c7abe8` | Primary action background; underlined links on neutral surfaces |
| Action hover | `#65527e` | `#dbc4f3` | Primary hover background |
| On action | `#ffffff` | `#24182f` | Text and icons on action/action-hover |
| Divider | `#d8cfe0` | `#50445e` | Decorative separators |
| Selection | `#d8c9ed` | `#59416e` | Text selection with Text foreground |

Retain the following Atlas proposals for necessary control boundaries and textual feedback:

| Role | Light | Dark | Permitted use |
| --- | --- | --- | --- |
| Control border | `#8c7d9b` | `#9c87af` | Inputs and outlined controls on neutral surfaces |
| Information | `#3d587f` | `#a8c9ff` | Save/removal notices on neutral surfaces |
| Warning | `#7a4b12` | `#f0c27b` | Temporary storage or translation notice on neutral surfaces |
| Danger | `#9e3349` | `#ffb4c1` | Action failure text on neutral surfaces |

The latter three are foregrounds, not filled badge palettes. Always include text; color does not establish saved state or failure. Article captions sit below images on a neutral surface. Do not overlay essential text on photography. Action/on-action is the filled button pair; secondary buttons use Panel/Text and Control border. Prose links remain underlined.

## Typography, spacing, and geometry

Use Manrope 400 for body/captions and 600 for headings/controls, falling back to `system-ui, sans-serif`. This family is inherited from the source. The project deliberately uses the same sans-serif family for both languages until Vietnamese glyph rendering and font delivery are verified. DM Serif Display and JetBrains Mono are not selected. Do not create a serif accent whose Vietnamese glyphs visibly switch family.

| Role | Size | Line height | Weight |
| --- | --- | --- | --- |
| Article/journal heading | `clamp(2rem, 5vw, 3.5rem)` | `1.2` | 600 |
| Article section heading | `1.5rem` | `1.4` | 600 |
| Article subsection | `1.125rem` | `1.5` | 600 |
| Reading body | `1.125rem` | `1.75` | 400 |
| Card title | `1.125rem` | `1.4` | 600 |
| Control | `1rem` | `1.5` | 600 |
| Caption/metadata | `0.875rem` | `1.6` | 400 |

This is a project adaptation of the Atlas proposed scale. Use normal tracking throughout, sentence case, semantic heading order, and no all-caps navigation. The looser reading line height gives diacritics room; verify actual fonts and content rather than claiming it solves language coverage. Set the document language to `en` or `vi`; mark passages, names, and quotations in another language appropriately. Allow long titles, dates, and bilingual labels to wrap. Do not truncate reading text or meaningful credits.

Use the Atlas proposed spacing scale 4, 8, 12, 16, 24, 32, 48, 64, 96px. Page gutters are a project adaptation: 16px under 480px, 24px from 480px, 40px from 960px. Maximum page width is 1120px. Reading text is at most 65ch; prose centers within the page, aligned left. Paragraph gaps are 24px, caption/image gaps 8px, header/body gaps 32px, and major groups 48px.

Source geometry: 24px cards, pill-shaped action controls. Atlas proposed 12px text-entry radius applies if a future brief adds a field. Use flat article content and image figures rather than wrapping each paragraph in a card. Source shadows may be used only on an actual floating menu: light `0 16px 40px -28px #493b6155`, dark `0 20px 45px -24px #00000099`. Most regions have no shadow.

## Pages and responsive behavior

Use semantic header, navigation, main, article, and footer landmarks with a skip-to-content link. Navigation contains Journal, Saved, and About, plus language and appearance controls. Language uses explicit `English` and `Tiếng Việt`; flags do not identify language. Appearance is a native select labeled Appearance with Light, Dark, System. Vietnamese working labels are Nhật ký, Đã lưu, Giới thiệu, Ngôn ngữ, Giao diện, Sáng, Tối, Hệ thống; confirm editorial terminology before shipping.

On narrow screens the header wraps into a brand row and controls row; links wrap instead of becoming an unlabeled hamburger. At 720px or wider, the article index can form two columns only if each card has at least 280px available. DOM order follows the visible sequence. A selected lead story may span both columns. Do not add a third column merely to fill a wide screen.

Article order is title, standfirst, author/date, save control, lead figure, body sections with figures, references/image credits, and related reading. Figure order follows the authored narrative. Wide figures may use the full page width while prose stays at 65ch; images never escape the viewport. Preserve authored crop decisions. Default inline images use intrinsic dimensions and proportional scaling; do not crop drawings or captions out. A separate enlarged-image viewer is outside this pilot and needs its own keyboard/focus contract if requested.

Saved lists article cards in the order they were saved, newest first. Do not change order when article metadata refreshes. Removed rows temporarily remain as small undo placeholders so focus stays stable. About contains factual journal purpose and supplied contact information; omit unprovided claims.

At 320 CSS px and 400% zoom, the whole page must reflow without horizontal scrolling. An unusually wide supplied drawing must have a usable scaled rendition or a separately specified inspection viewer. This requirement is pending verification.

## Components and states

Article cards contain a real heading link, a figure, concise metadata, and a separate save button. A card is not one large interactive wrapper around a nested button. Save uses a native button with `aria-pressed`; action text updates from Save article to Saved. Screen-reader name includes the article title; controls maintain at least a 44px touch area as a project comfort target. Working Vietnamese copy: Lưu bài viết and Đã lưu. Keep a consistent minimum button width after measuring both languages.

Use the source focus outline: 3px Text-color outline, 5px offset. Prevent clipping. In forced-colors mode use a system focus color. Provide hover and visible pressed feedback without moving a control; disabled states include a visible reason when relevant. Avoid disabling a local save action solely because images are loading.

Index loading has textual Loading articles feedback and reserves image dimensions. A network/content failure shows Could not load articles and a Retry action that repeats the read operation. An empty index says No articles published yet. These states apply only if the chosen publishing architecture can expose them; static delivery may instead use a route-level failure. Do not fabricate a pending backend write for local saves.

Saved empty state explains Saved articles stay in this browser, with a Browse journal link. If a saved ID no longer resolves to published content, show Article unavailable and an explicit Remove action; do not silently remove it or invent a title. Broken image state preserves figure layout, descriptive alternative text, caption, and credit. Translation-unavailable state stays on the current article and offers the other language only when available.

## Local save and undo flow

Proposed storage contract: versioned JSON `journal.saved.v1` containing unique stable article IDs and the time each was saved. Store no account identifier, personal profile, full article content, or image data. Set a small maximum input length and validate parsed values before using them. Ignore invalid entries while retaining valid IDs; handle an unknown schema explicitly rather than overwriting it immediately. Confirm the actual content-ID format before fixing validation details.

On save, update the in-memory set and button immediately. Try to persist synchronously, catch storage/serialization failures, and confirm persistence separately. Successful feedback is Article saved in this browser. On failure, retain the session state and state Saved for this visit only. Browser storage is unavailable. This explanation remains near Saved settings; do not claim the article will survive reload. Repeat clicks are idempotent, not duplicate saves. Working Vietnamese failure copy: Đã lưu cho lần truy cập này. Không thể sử dụng bộ nhớ trình duyệt.

On removal from Saved, immediately remove the ID from the active set but leave an inline placeholder at the removed row: Article removed from Saved, with Undo and Dismiss. Undo has no timer. Each placeholder belongs to its own article ID and captures the previous saved timestamp; it restores that entry to its previous order and tries persistence again. Dismiss discards that placeholder and moves focus to the next surviving row, then the previous row, then the page heading if none remain. Do not steal focus when only a status changes. Reload removes dismissed/undismissed undo placeholders; the durable saved-set change has already been attempted.

Removing from an article page uses an equivalent inline notice beside its save control. A later deliberate save of the same article resolves its removal notice. If another tab changes that article's saved state, refresh the state from the storage event and invalidate an obsolete removal snapshot so Undo cannot overwrite the reader's newer decision. The next user mutation merges the current stored set when readable. Browser storage is not a transactional database; this pilot makes no cross-device synchronization guarantee.

Announce completed saves/removals with one polite status region. Keep notices in normal document flow; do not obscure reading content with a fixed toast. After Undo say Article restored to Saved. If restoration is session-only, use the same durable-storage failure wording. Always preserve a functioning Save/Remove control even after a failed persistence attempt.

## Language and appearance flows

Language preference is a separate versioned setting. The article ID stays the same when switching translations. Select the paired route only when present; update visible content and document `lang`, preserve the article context, and avoid pretending a fallback article is translated. If no translation exists, label it English only or Chỉ có tiếng Việt as appropriate and keep navigation available. Confirm whether both full translations are required before publishing bilingual claims.

Appearance choice is `light`, `dark`, or `system`. Validate persisted input, apply the resolved appearance before paint when feasible, and track live OS changes only while system is selected. On blocked storage, keep the selected preference for this visit. Essential content and readable native controls must survive initialization failure. Language and appearance storage failures must not delete saved articles. Opening a menu must not change the preference; only choosing a value does.

## Accessibility, motion, and image delivery

Keep semantic figures and visible captions. Alternative text describes meaningful spatial/image content; credits remain separate text. Decorative repeat images use empty alternative text. Authored architectural plans need a text description of the information being conveyed, not just Plan. Confirm image rights and creator/license notices per asset before publishing; the theme does not supply image permissions.

No flowing-path effects, cursor halo, animated hero, entrance sequence, parallax, or press scaling is selected. Standard color/background/border feedback uses 240ms `cubic-bezier(0.2, 0, 0, 1)` as a project normalization of the source timing; applying this easing uniformly to these properties is not asserted to be a verbatim source rule. Essential text and figures are immediately visible. OS reduced motion or any future motion-off preference makes feedback immediate; save completion, focus changes, and navigation never wait for animation events. Do not smooth-scroll automatically between translated articles.

Keep authored width/height or aspect ratio on every image to reserve space. Load the lead article image with the initial page; lazy-load below-fold figures without hiding their captions. Provide responsive image candidates according to the delivery stack, selecting resources near displayed dimensions and device pixel ratio. Do not ship every full-resolution archive image to a phone. Avoid specifying a fabricated byte or performance score before representative content exists. Font loading must preserve visible text and prevent unexpected synthetic weight; use supplied licensed files or a permitted font service with a documented fallback. No font binaries or photography are included in this draft.

## Validation and outstanding evidence

Performed: selective document review and a manual specification check against the brief. No rendered, browser, keyboard, language, screen-reader, storage, or performance validation has been performed. Atlas's source contrast record reports opaque Text/Page at 12.54:1 light and 15.50:1 dark, and On-action/Action at 10.09:1 light and 8.36:1 dark; these are inherited numerical records, not new project measurements.

Before implementation is called validated, check both languages using real Vietnamese diacritics and long titles, fonts loaded/unloaded, 320px width, 200% text sizing, 400% browser zoom, long captions, large architectural drawings, keyboard order and focus after removal/dismiss/undo, screen-reader announcements, and all rendered color pairs including hover/focus/selection. Check all three appearance choices at first paint and live OS changes, reduced motion before/after page load, content/image errors, invalid/unknown-version storage, blocked or quota-limited storage, reload after save/remove, repeated undo, and conflicting cross-tab decisions. Measure representative images and font delivery before setting a performance budget.

Open decisions: real project name and identity, article schema/routes, translation policy and approved UI copy, rights/credit data per image, available font versions and Vietnamese coverage, supported browsers, whether saving requires enhanced client script, and delivery architecture. If saves are unavailable without scripting, explain this near the Save control while leaving reading and navigation usable.

## Source credits and adaptations

- Editorial creator/maintainer: **Tamir (Phi Vuong Tuong Tam)**. Original [tamir39/tamir39-portfolio](https://github.com/tamir39/tamir39-portfolio); inspected source snapshot `166f44091a58a68d74096bc44defceb99243ba4e`. Retained palette, focus dimensions, pill/card geometry, shadows, and 240ms timing derive from [globals.css](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/globals.css), [themes.css](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/themes.css), and [appearance.css](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/appearance.css). Source was inspected locally by the Atlas pilot; this evaluation read Atlas documentation. No implementation license was found in that inspected portfolio. This document reproduces no implementation code, artwork, or font files.
- Interface Atlas Editorial `0.1.0-draft`, reviewed 2026-10-13: its proposed control/status colors, readable measure, spacing vocabulary, component guidance, and immediate reduced-motion policy informed this document. Atlas publishing terms remain undecided. This project adapts reading type scale, narrow gutters, bilingual typography, wrapping navigation, image treatment, storage, and undo behavior. The new product rules are proposals rather than inherited portfolio capabilities.
- **Manrope**, designer **Mikhail Sharanda**, source family role from the pinned [layout.tsx](https://github.com/tamir39/tamir39-portfolio/blob/166f44091a58a68d74096bc44defceb99243ba4e/app/layout.tsx). [Google Fonts metadata](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/METADATA.pb) and [SIL OFL 1.1 notice](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt) are recorded by Atlas. Actual project font version remains unselected. Retain the exact redistributed package's copyright/license notices when vendoring files; designer attribution does not replace them.
- Guidance references retained through Atlas: **W3C Accessibility Guidelines Working Group and contributors**, [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/); **W3C ARIA Authoring Practices Task Force and contributors**, [APG](https://www.w3.org/WAI/ARIA/apg/); **Matt Perry, Motion team, and contributors**, [Motion accessibility](https://motion.dev/docs/react-accessibility). Conceptual references only; no documentation text or code copied. Their document/software terms apply to their own materials and do not license journal content.

General portfolio inspiration sites and flowing-path component credits are not asserted as creators of this journal; no such effects or assets were selected. The project must maintain its own actual author, architect, photographer, and asset notices once content is supplied.
