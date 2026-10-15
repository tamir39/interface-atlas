# Gallery reference preview

Open [the live Gallery preview](https://tamir39.github.io/interface-atlas/themes/gallery/preview/) or [index.html](index.html) locally with its adjacent CSS, JavaScript, and `assets` directory. No build, installation, remote resource, or server is required. Images load from the adjacent local files; the hosted preview requests those same files from its own site. The native preview and fictional collection were prepared for Interface Atlas by **Tamir (Phi Vuong Tuong Tam) with Codex AI assistance**.

## Scope and media

The collection contains three fixed illustrative works: **Vessel study**, **Seat study**, and **Room study**. They are **AI-generated photography-style illustrations**, not real products, actual buildings, a named artist's collection, or a photographer's commissioned images. There are no prices, stock claims, client outcomes, or commercial offers. [Asset provenance](assets/README.md) records the prompts, actual dimensions, and hashes.

| Local original | Intrinsic size | Bytes |
| --- | --- | --- |
| [Vessel study](assets/vessel-study.png) | 1024 × 1536 | 2,424,007 |
| [Seat study](assets/seat-study.png) | 1254 × 1254 | 2,087,105 |
| [Room study](assets/room-study.png) | 1536 × 1024 | 2,491,682 |

The three original PNGs total **7,002,794 bytes**. They are retained unchanged, without compressed formats or responsive derivative files. This explicit asset-delivery limitation remains separate from media-state correctness; a production project chooses formats, sizes, compression, and budgets from representative measurements.

- Light, Dark, and System use original Atlas tokens. **System is the default** and follows live device appearance. Guarded preference restoration occurs before the stylesheet where possible; malformed or unavailable storage leaves usable defaults.
- Image colors remain unchanged in both appearances. Captions, text, controls, credits, and image-state information stay on opaque interface surfaces.
- Comfortable is the default. Compact changes **only the neutral component specimen's inset from 24px to 16px**, leaving collection/viewer layouts, type, 0px media corners, 4px panels/controls, and comfortable targets unchanged.
- Optional control color/background/border feedback lasts **180ms** with `cubic-bezier(.2, 0, 0, 1)`. Motion-off or OS reduced motion makes it immediate. There are no image transforms, entrance fades, carousel autoplay, hover zoom, or animated scrolling.
- Native images reserve space with actual dimensions and carry useful alternatives, captions, and credit. Visible hero media is eager; lower images may be lazy-loaded. Originals reused across contexts remain the same asset. This bounded fixture is not a measured responsive-photography pipeline.
- No JavaScript leaves all three detail articles, media, metadata, descriptions, ordinary anchors, and native specimen fields readable. Runtime preferences, filters, view buttons, and image retry remain unavailable with an explanation.

## Collection and inline viewer

The fixed work order is **vessel, seat, room**. Vessel/Seat belong to **Objects**; Room belongs to **Spaces**. Search compares title and description case-insensitively; the category select offers All, Objects, and Spaces.

1. **Filter:** Search and Category update the visible collection with an explicit count. They preserve the selected detail and global preferences. Empty results show a readable explanation and Clear filters.
2. **Clear filters:** this button appears only with an empty result. It resets Search and Category together, preserves the chosen work, and focuses Search so a disappearing empty-result action cannot strand focus.
3. **Inspect:** each card has a real anchor to its static article. Unmodified scripted activation selects that article and focuses its heading. Modified/middle activation retains normal link behavior.
4. **Choose another view:** three ordinary named buttons remain available independently of collection filtering. Each has `aria-pressed` and a stable contextual name. Activation retains button focus and announces the selected work. They are not custom tabs.
5. **Return:** Back returns to the originating work's Inspect anchor when its card remains visible. When filters hide that card, Back preserves the filter and detail, focuses Search, and explains the hidden context.

The viewer is an **inline region**, not a modal, lightbox, product configurator, cart, checkout, download, or agent operation. With JavaScript, one article is selected at a time. A normal visit defaults to Vessel; a valid initial `#work-vessel`, `#work-seat`, or `#work-room` fragment reveals and focuses that article. Valid live work-fragment changes also reveal and focus their article, preserving meaningful native link destinations.

Search, category, selected work, loading/error, and recovery state are not saved. Reload initializes fresh while honoring any valid work fragment; only appearance, specimen density, and motion preference persist under `interface-atlas-gallery-preview`.

## Image loading and recovery

Detail-article images follow real load/error events. Reserved space, text alternative, title, caption, description, and provenance remain useful while loading or unavailable. A failed article image exposes a visible explanation and **Retry** for that same local asset. Hero and collection images use ordinary native image/alt behavior rather than a separate retry control.

Retry requests the same original asset URL, hides/disables its pending button, and focuses its work heading with scroll position preserved. The failed visual becomes transparent immediately while its reserved frame and readable context remain. Figure and status-node `data-state` values record `loading`, `loaded`, or `error`. Without JavaScript, transient status text is hidden and all static articles remain readable.

Each work retains its own media state. A completion for a noncurrent work cannot replace the current work's metadata or present an unrelated completion as current. Inspecting other work while an image loads or retries remains possible. The ordinary shipped page contains valid local assets; browser checks may inject failures separately to exercise recovery. There are no fake timers, shipped broken-resource demonstrations, or remote requests.

This proves only the behavior actually described in [validation.md](../validation.md). Local image health and an injected error do not validate unreliable production networks, CDN caching, source selection across real devices, image decoding cost, bandwidth budgets, or business availability.

## Typography and source credits

**Inter by Rasmus Andersson** is the sole selected named family: normal 400 display and normal 400/500/600 body/interface roles. Local Segoe UI/Arial/sans-serif fallbacks require no external font resource; a short technical specimen uses local Consolas/Courier New/monospace fallbacks rather than another selected brand family. CSS naming is not proof that Inter rendered. Intended fonts, weights, language coverage, fallback metrics, and wrapping remain project checks.

H1 and the hero use `clamp(3rem, 6vw, 6rem)`, line height `1.05`, and tracking `-0.035em`. At 760px and below, the hero becomes `clamp(3rem, 9vw, 4.5rem)`, then 3rem at 440px and below. Body text is 16px/1.65, supporting text/captions 14px/1.5, and input text at least 16px. Section/detail/footer headings use `clamp(2rem, 3.6vw, 3.5rem)`, line height `1.12`, and tracking `-0.025em`; collection headings use `clamp(1.5rem, 2.4vw, 2rem)`, then 1.5rem in the narrower layout. Exact rendered faces and the portable proposal/adaptation distinction remain in [design.md](../design.md) and the validation record.

The preview container caps at **1440px**, with side gutters of 48px normally, 64px at 1600px and above, 32px at 1000px and below, and 20px at 760px and below. Major section separation is 144px normally and 88px in the narrower layout. The collection transitions from an asymmetric 12-column composition to two columns at 760px, then one at 440px, retaining work order. Viewer/specimen layouts stack at 760px. These are preview composition choices, separate from the portable 1280px container proposal.

Collection images retain natural ratios. The hero reuses Room study at its original 3:2 ratio; detail images use `contain` with a **760px height cap** above the stacked layout and no cap at 760px viewport width and below. A 1px inset image outline uses 10% black or white for decorative separation; it is not a necessary control boundary or an opaque contrast result. No actual image crop, file modification, inversion, or color filter is applied.

**Shopify** is credited for referenced design/image guidance and Dawn/Horizon design. Their inspected repository licenses are Shopify-restricted, **not plain MIT**; no source theme code, configuration, tokens, markup, screenshots, or assets are imported. **Mat Marquis** and the Learn Images reviewers receive their separate image-guidance credits. **W3C WAI/EOWG, CSSWG, and WHATWG contributors** have guidance/standards roles. None is represented as this theme's creator or endorser.

Read [sources and credits](../sources.md), [third-party notices](../../../THIRD_PARTY_NOTICES.md), and the [asset provenance record](assets/README.md). Font package notices distinguish designer, copyright holder, Google Fonts observations, and the upstream pin; no font software is shipped. All palette, scale, layout, crop policy, geometry, timing, and workflow values are **Atlas proposals**. Atlas's own publishing terms remain undecided.

The deployed preview retains this local behavior. Its [site build](../../../site/README.md) rewrites documentation links to GitHub source pages without adding remote scripts or fonts. This is a **draft reference**; representative checks do not establish complete accessibility, all assistive technologies, named-font rendering, real project usability, or a production commerce flow.

## Stable test hooks

| Purpose | Selector or state |
| --- | --- |
| Appearance / specimen density / motion | `#appearance`, `#density`, `#motion` |
| Root preference state | `document.documentElement.dataset.appearance/density/motion` |
| Preference storage | `interface-atlas-gallery-preview` localStorage key |
| Main content / collection / focus heading | `#main-content`, `#collection`, `#collection-title` |
| Search / category / count | `#search`, `#category`, `#result-count` |
| Empty result / reset / polite feedback | `#no-results`, `#clear-filters`, `#gallery-status` |
| Three collection cards | `[data-work-id="vessel"]`, `[data-work-id="seat"]`, `[data-work-id="room"]` |
| Native Inspect links | `#inspect-ID` → `#work-ID` |
| Inline viewer / ordinary view buttons | `#viewer`, `#view-ID` |
| Static detail articles / focus headings | `#work-ID`, `#work-title-ID` |
| Visibility-aware return links | `#back-ID` |
| Article image / image state / retry | `#image-ID`, `#image-state-ID`, `#retry-ID` |
| Neutral component specimen | `#specimen`, `#specimen-title` |
| Native specimen fields | `#specimen-name`, `#specimen-kind`, `#specimen-context` |
| Type samples | `#type-body`, `#type-display`, `#type-vietnamese`, `#type-technical` |

`ID` means `vessel`, `seat`, or `room`. These hooks support representative checks; they are not a public API, asset ownership license, or commercial service contract.
