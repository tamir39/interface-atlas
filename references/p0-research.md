# P0 research sources and adaptation record

Status: researched drafts for review, inspected **2026-10-15**. Original Atlas synthesis by **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. Interface Atlas is independent of Twohearts. Source authors retain credit for their work and are references, not endorsers.

## Research question and method

The consumer and storefront trials exposed missing decisions about ownership, acknowledgement, concurrency, recovery, dirty editing and remote outcomes. This pass researches those questions using primary standards, the official authors' browser documentation and the GOV.UK Design System. The original [coverage findings](../examples/coverage-evaluation/README.md) are local inputs, not external source material or runtime proof.

The five requested topics form three conditional chapters. [State and recovery](../knowledge/state-and-recovery.md) covers ownership and durable recovery; [forms and navigation](../knowledge/forms-and-navigation.md) covers input and movement through a flow; [uncertain outcomes](../knowledge/uncertain-outcomes.md) covers remote effects and reconciliation. Each exports decisions into a consuming project's self-contained design.md. This ledger is provenance detail, not required reading for every implementation task.

This ledger records **34 technical/guidance page records across 13 registry groups**; sections, versions and author credits are preserved below. These are not that many independent studies or tested products. Terms and authorship pages are listed separately and excluded from that count. R17, R29 and R42 already existed; R43–R52 extend the [registry](SOURCES.md).

Normative success criteria/protocol/API definitions, informative tutorials/patterns and vendor-version guidance are distinct. A Working Draft is work in progress. Mutable pages use their displayed date and inspection date; an absent pin/date stays absent. Historic vendor articles establish their stated version's behavior, not a current cross-browser support matrix. Source inspection does not establish any project's conformance, retention, backend guarantee or behavior.

The chapters' policy tables, worksheets, copy and hypothetical examples are Atlas proposals. No external implementation code, sample markup, prose passages, screenshots, artwork or font binaries are imported. There are no new skill, template, theme or runtime changes. The [desk review](p0-review.md) applies the drafts to two existing trials and a fresh service brief; it does not supply browser, assistive-technology or integration results.

## State and recovery sources

### P0-STATE-01 · R43 — Storage Standard

[Original source](https://storage.spec.whatwg.org/) · Inspected snapshot: [23f38d8feaf530b9787822e067a7eb6f953af322](https://storage.spec.whatwg.org/commit-snapshots/23f38d8feaf530b9787822e067a7eb6f953af322/).

**Credit:** publisher: WHATWG; credited writer: Anne van Kesteren (Apple); copyright holders: WHATWG (Apple, Google, Mozilla, Microsoft). **Inspected:** 2026-10-15. **Version/status:** Living Standard, last updated 2026-10-06; inspected commit snapshot 23f38d8feaf530b9787822e067a7eb6f953af322.

**Evidence type:** Normative Living Standard; introduction/examples are informative. **Referenced concepts:** Local buckets begin best-effort; Persistence requires permission; Persistent storage resists automatic clearing without origin/user involvement; Quota and usage are estimates.

**Terms and scope:** status: Explicit document license observed; notice url: [source link](https://storage.spec.whatwg.org/); license url: [source link](https://creativecommons.org/licenses/by/4.0/); scope: Specification work: CC BY 4.0. Portions incorporated into source code: BSD 3-Clause instead. No code or other assets incorporated here; additional license url: [source link](https://opensource.org/license/BSD-3-Clause); required treatment if copied: Preserve attribution, license link and indication of changes for document reuse; comply with separate BSD conditions for code incorporation. No upstream endorsement implied.

**Limits:** Persistence is not backup; User/origin involvement can still clear persistent storage; Storage APIs and browser policies have distinct failure modes. **Chapter sections:** Acknowledgement is not retention; Backups and capacity.

### P0-STATE-02 · R44 — HTML Standard: Web storage

[Original source](https://html.spec.whatwg.org/multipage/webstorage.html)

**Credit:** publisher: WHATWG; maintainers as credited: Anne van Kesteren (Apple); Domenic Denicola (Google); Dominic Farolino (Google); Philip Jägenstedt (Google); Simon Pieters (Mozilla); role note: Current standard maintainers credited in the inspected acknowledgements; not presented as sole authors of the Web storage section; copyright holders: WHATWG (Apple, Google, Mozilla, Microsoft). **Inspected:** 2026-10-15. **Version/status:** HTML Living Standard, last updated 2026-10-14 (date from multipage root); no immutable HTML commit pin established.

**Evidence type:** Normative Living Standard; §12.1 introduction is non-normative. **Referenced concepts:** Assume no localStorage locking across relevant browser contexts; Read-modify-write can race; localStorage access can throw SecurityError; setItem can throw QuotaExceededError.

**Terms and scope:** status: Explicit document license observed; notice url: [source link](https://html.spec.whatwg.org/multipage/acknowledgements.html); license url: [source link](https://creativecommons.org/licenses/by/4.0/); scope: HTML specification work: CC BY 4.0; portions incorporated into source code: BSD 3-Clause instead. Third-party images/examples can have separately identified terms; none used; additional license url: [source link](https://opensource.org/license/BSD-3-Clause); required treatment if copied: Preserve document attribution/license/change indication or applicable code notices; do not extend the document license to separately credited assets.

**Limits:** Notification is not an indivisible compare-and-write primitive; A successful simple write does not settle multi-window product conflict policy. **Chapter sections:** Concurrent edits; Read failure, migration and reset.

### P0-STATE-03 · R45 — Indexed Database API 3.0 — published Working Draft

[Original source](https://www.w3.org/TR/2025/WD-IndexedDB-3-20250813/)

**Credit:** publisher: W3C Web Applications Working Group; editor: Steve Becker (Microsoft); former editors: Ali Alabbas (formerly Microsoft); Joshua Bell (formerly Google); copyright holder: World Wide Web Consortium, 2025. **Inspected:** 2026-10-15. **Version/status:** W3C Working Draft, 2025-08-13.

**Evidence type:** Normative specification draft; work in progress, not W3C Recommendation/endorsement. **Referenced concepts:** Transaction completion differs from request success; Changes commit together within the transaction; Durability is a hint; Overlapping write scopes serialize; Open connections can block upgrades; lower requested database versions fail.

**Terms and scope:** status: Explicit document license observed in publication header; linked legal terms inspected; notice url: [source link](https://www.w3.org/TR/2025/WD-IndexedDB-3-20250813/); license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: W3C Software and Document License, 2023 version (the publication links through /copyright/software-license/); required treatment if copied: Copies/portions/modifications require full license notice, pre-existing notices/disclaimers and change notice as applicable. No external prose or code copied into this draft.

**Limits:** Database transaction scope does not cover arbitrary browser stores or remote services; Commit does not promise indefinite retention; Physical durability and eviction protection are separate. **Chapter sections:** Acknowledgement is not retention; Concurrent edits; Read failure, migration and reset; Sources and provenance.

### P0-STATE-04 · R45 — Indexed Database API 3.0 — Editor's Draft

[Original source](https://w3c.github.io/IndexedDB/)

**Credit:** publisher: W3C Web Applications Working Group; editor: Steve Becker (Microsoft); former editors: Ali Alabbas (formerly Microsoft); Joshua Bell (formerly Google). **Inspected:** 2026-10-15. **Version/status:** Editor's Draft, displayed date 2025-08-13; mutable editor URL, not an immutable commit pin.

**Evidence type:** Editor's specification draft, work in progress; not a Recommendation or endorsement. **Referenced concepts:** Editor's Draft is distinct from dated published Working Draft; Displayed date and publication status are not implementation evidence.

**Terms and scope:** status: Explicit document license observed in header; linked legal terms inspected; notice url: [source link](https://w3c.github.io/IndexedDB/); license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: W3C Software and Document License, 2023 version; required treatment if copied: Preserve required license and existing notices and identify modifications if material is copied; no material copied here.

**Limits:** Technical chapter claims cite the dated published draft, not a claim that the editor URL is a W3C Recommendation; Current draft can change without its URL changing. **Chapter sections:** Sources and provenance.

### P0-STATE-05 · R46 — A change to the default durability mode in IndexedDB

[Original source](https://developer.chrome.com/blog/indexeddb-durability-mode-now-defaults-to-relaxed)

**Credit:** author: Thomas Steiner; publisher: Google, Chrome for Developers; credited reviewers: Evan Stade; Rachel Andrew. **Inspected:** 2026-10-15. **Version/status:** Page last updated 2023-11-03 UTC; discusses Chrome 121 change.

**Evidence type:** Official vendor guidance/blog, not a cross-browser normative standard. **Referenced concepts:** Chrome 121 changed the default to relaxed; Completion can precede OS-buffer flushing; Strict durability does not eliminate all data loss.

**Terms and scope:** status: Explicit page footer license observed; site policy inspected; notice url: [source link](https://developer.chrome.com/blog/indexeddb-durability-mode-now-defaults-to-relaxed); license url: [source link](https://creativecommons.org/licenses/by/4.0/); scope: Except as otherwise noted, page content CC BY 4.0; code samples Apache 2.0. No code, images or other media used; code license url: [source link](https://www.apache.org/licenses/LICENSE-2.0); site policy url: [source link](https://developers.google.com/terms/site-policies); required treatment if copied: Attribute author/Google, link original and license, identify changes; separately assess media/trademarks/external content.

**Limits:** 2023 explanation is version-scoped; Do not generalize Chrome behavior into every browser; Does not establish backup or eviction retention. **Chapter sections:** Acknowledgement is not retention.

### P0-STATE-06 · R47 — Updates to Storage Policy

[Original source](https://webkit.org/blog/14403/updates-to-storage-policy/)

**Credit:** author: Sihui Liu; publisher: WebKit project website. **Inspected:** 2026-10-15. **Version/status:** 2023-08-10; policy described for Safari 17.0 and WebKit apps on iOS 17/iPadOS 17/macOS Sonoma.

**Evidence type:** Official vendor implementation guidance/blog, version-scoped. **Referenced concepts:** Quota-reaching writes can fail; Eviction can follow pressure, overall quota or inactivity; Persistence uses heuristics; Estimated quota is no guaranteed allocation.

**Terms and scope:** status: No explicit blog-content reuse grant established; unresolved for copying; notice url: [source link](https://webkit.org/terms-of-use/); license url: [source link](https://webkit.org/terms-of-use/); related software license url: [source link](https://webkit.org/licensing-webkit/); scope: Terms distinguish content from software source projects. Licensing WebKit describes LGPL/BSD software; that is not a verified license for the blog prose or images; required treatment if copied: Obtain specific permission/terms before copying blog prose, code or assets. This draft cites limited factual findings in original language without copying source prose/code/assets.

**Limits:** No numeric quota used as a universal product budget; Document describes a 2023 policy, not all later Safari releases or other vendors; Storage API support/grant must be checked for actual target browsers. **Chapter sections:** Acknowledgement is not retention; Backups and capacity.

### P0-STATE-07 · R48 — Persistent storage

[Original source](https://web.dev/articles/persistent-storage)

**Credit:** author: Pete LePage; publisher: Google, web.dev; original version credit: Chris Wilson (original WebFundamentals version); credited reviewers: Victor Costan; Joe Medley. **Inspected:** 2026-10-15. **Version/status:** Page last updated 2020-05-12 UTC; current page inspected 2026-10-15.

**Evidence type:** Official Google developer guidance, not normative standard. **Referenced concepts:** Explain/request persistence at a meaningful save moment; Avoid page-load permission requests and immediate repeated prompts; Permission/grant behavior varies.

**Terms and scope:** status: Explicit page footer license observed; Google site policy inspected; notice url: [source link](https://web.dev/articles/persistent-storage); license url: [source link](https://creativecommons.org/licenses/by/4.0/); scope: Except as otherwise noted, page content CC BY 4.0; code samples Apache 2.0. No samples/images copied; code license url: [source link](https://www.apache.org/licenses/LICENSE-2.0); site policy url: [source link](https://developers.google.com/terms/site-policies); required treatment if copied: Preserve author/Google attribution, original/license links and indicate changes; separately assess media, marks and external content.

**Limits:** Old page contains historical API/browser lists not adopted as current coverage; Grant does not create a separate backup; Chapter does not repeat the page's broad storage-type inventory. **Chapter sections:** Acknowledgement is not retention.

## Forms and navigation sources

### F01 · R17 — Web Content Accessibility Guidelines (WCAG) 2.2

[Original source](https://www.w3.org/TR/2024/REC-WCAG22-20241212/)

**Credit:** Accessibility Guidelines Working Group, W3C. Editors Alastair Campbell, Chuck Adams, Rachael Bradley Montgomery, Michael Cooper, Andrew Kirkpatrick. **Inspected:** 2026-10-15. **Version/status:** W3C Recommendation 12 December 2024; current /TR/WCAG22/ identified this fixed version at inspection.

**Evidence type:** Normative Recommendation for success criteria and conformance; introductory explanations identified as non-normative. **Referenced concepts:** WCAG success criteria and conformance levels differ from informative implementation resources.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/document-license-2023/); scope: Reference-only normative concepts; no copied specification text/code. Recommendation front matter links document-use rules; see terms W3C-DOC-2023; license evidence: Front-matter link followed to versioned document license.

**Limits:** Fixed Recommendation version selected; linked errata exists. No whole-product conformance claim. **Chapter sections:** When to load this chapter.

### F02 · R29 — Labeling Controls

[Original source](https://www.w3.org/WAI/tutorials/forms/labels/)

**Credit:** W3C WAI Education and Outreach Working Group; editors Eric Eggert and Shadi Abou-Zahra; contributors linked in tutorial acknowledgements. Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Page status: Updated 13 May 2024.

**Evidence type:** Informative WAI tutorial. **Referenced concepts:** Associate control labels; native label is usual mechanism; label differs from instructions.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Examples are guidance; no tutorial code imported. **Chapter sections:** Inputs and validation timing.

### F03 · R17 — Understanding SC 3.3.2: Labels or Instructions

[Original source](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)

**Credit:** W3C WAI Accessibility Guidelines Working Group participants (page credits co-chairs Adam Page, Alastair Campbell, Rachael Bradley Montgomery; W3C staff contact Kevin White). Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Page date: Updated 09 March 2026.

**Evidence type:** Informative Understanding document reproducing/explaining Level A SC 3.3.2. **Referenced concepts:** Instructions/labels need availability to users; accessible name alone addresses a different concern; optional fields are covered.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Understanding content is explicitly informative; use Recommendation for normative requirement. **Chapter sections:** Inputs and validation timing.

### F04 · R29 — Validating Input

[Original source](https://www.w3.org/WAI/tutorials/forms/validation/)

**Credit:** W3C WAI Education and Outreach Working Group; editors Eric Eggert and Shadi Abou-Zahra; contributors linked in tutorial acknowledgements. Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Page status: Updated 27 July 2019.

**Evidence type:** Informative WAI tutorial. **Referenced concepts:** Accommodating common input formats; browser validation; client checks cannot secure a server boundary; opportunities to review/undo.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Server validation advice applies where a server processes input; does not require every form to have a backend. **Chapter sections:** Inputs and validation timing.

### F05 · R17 — Understanding SC 3.3.1: Error Identification

[Original source](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html)

**Credit:** W3C WAI Accessibility Guidelines Working Group participants (page credits co-chairs Adam Page, Alastair Campbell, Rachael Bradley Montgomery; W3C staff contact Kevin White). Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Page date: Updated 12 June 2026.

**Evidence type:** Informative Understanding document reproducing/explaining Level A SC 3.3.1. **Referenced concepts:** Automatically detected input errors identify affected items and describe errors in text.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Does not mandate the GOV.UK summary design or one universal focus strategy. **Chapter sections:** Validation and error recovery.

### F06 · R29 — User Notification

[Original source](https://www.w3.org/WAI/tutorials/forms/notifications/)

**Credit:** W3C WAI Education and Outreach Working Group; editors Eric Eggert and Shadi Abou-Zahra; contributors linked in tutorial acknowledgements. Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Page status: Updated 03 June 2022.

**Evidence type:** Informative WAI tutorial. **Referenced concepts:** Overall and inline submission feedback; concise actionable errors; linked error list; field/error association.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Examples and particular alert techniques require target browser/AT testing; no code imported. **Chapter sections:** Validation and error recovery.

### F07 · R49 — Error summary

[Original source](https://design-system.service.gov.uk/components/error-summary/)

**Credit:** GOV.UK Design System team; © Crown copyright. **Inspected:** 2026-10-15. **Version/status:** No page-wide revision date shown. Most recent displayed change June 2026, GOV.UK Frontend v6.2.0; focus-guidance change February 2025.

**Evidence type:** Official service design-system guidance; comparative, not a WCAG normative document. **Referenced concepts:** GOV.UK requires summary on validation error, focus to summary, links to answers, consistent summary/inline wording.

**Terms and scope:** license url: [source link](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/); scope: Reference-only comparative guidance; no GOV.UK implementation, assets, or source text incorporated. Footer says OGL v3.0 except where stated otherwise; see terms OGL-3; license evidence: Direct design-system footer inspected; exact National Archives URL returned 403; official indexed license text inspected.

**Limits:** Its mandatory wording is scoped to GOV.UK; chapter does not adopt a universal summary mandate. Displayed component release is not a pinned implementation. **Chapter sections:** Validation and error recovery.

### F08 · R17 — Understanding SC 4.1.3: Status Messages

[Original source](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)

**Credit:** W3C WAI Accessibility Guidelines Working Group participants (page credits co-chairs Adam Page, Alastair Campbell, Rachael Bradley Montgomery; W3C staff contact Kevin White). Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Page date: Updated 11 May 2026.

**Evidence type:** Informative Understanding document reproducing/explaining Level AA SC 4.1.3. **Referenced concepts:** Status messages are programmatically determinable so AT can present them without focus; definition excludes changes of context.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Not all dynamic content is a status message; does not prescribe a universal live-region recipe. **Chapter sections:** When to load this chapter; Pending actions and available controls.

### F09 · R52 — HTML: form control infrastructure — disabled controls and entry list

[Original source](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#enabling-and-disabling-form-controls:-the-disabled-attribute)

**Credit:** WHATWG and contributors (copyright WHATWG: Apple, Google, Mozilla, Microsoft). **Inspected:** 2026-10-15. **Version/status:** HTML Living Standard; page last updated 14 October 2026 at inspection; no commit pin recorded.

**Evidence type:** Normative HTML platform specification except identified non-normative material. **Referenced concepts:** Disabled controls prevent specified user-interaction click events and are barred from validation; constructing form entry list skips disabled fields.

**Terms and scope:** license url: [source link](https://creativecommons.org/licenses/by/4.0/); scope: Reference-only HTML behavior. WHATWG acknowledgement footer distinguishes CC BY 4.0 document text from BSD 3-Clause portions incorporated into source code; no source code incorporated here; license evidence: [source link](https://html.spec.whatwg.org/multipage/acknowledgements.html).

**Limits:** General disabled-state behavior does not prove focus restoration works in any particular app. Submission behavior is in same page #constructing-the-entry-list. **Chapter sections:** Pending actions and available controls.

### F10 · R17 — WAI-ARIA 1.2 — aria-disabled

[Original source](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled)

**Credit:** ARIA Working Group, W3C. Editors Joanmarie Diggs, James Nurthen, Michael Cooper, Carolyn MacLeod. **Inspected:** 2026-10-15. **Version/status:** W3C Recommendation 06 June 2023; fixed edition https://www.w3.org/TR/2023/REC-wai-aria-1.2-20230606/.

**Evidence type:** Normative ARIA Recommendation for semantics; identified notes/examples are informative. **Referenced concepts:** aria-disabled exposes disabled semantics; application scripting remains necessary; state applies to focusable descendants.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2015/); scope: Reference-only semantic concepts; no specification prose/code copied. This Recommendation links the 2015 Software and Document license, not the current 2023 version; license evidence: Front matter links [source link](https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document) which redirects to versioned 2015 license.

**Limits:** Do not infer native disabling, focusability, or execution suppression from ARIA alone. Role support restrictions apply. **Chapter sections:** Pending actions and available controls.

### F11 · R17 — Developing a Keyboard Interface — focusability of disabled controls

[Original source](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls)

**Credit:** W3C WAI ARIA Authoring Practices Task Force, part of ARIA Working Group. Editors credited in APG acknowledgements: Matt King, JaEun Jemma Ku, James Nurthen, Zoë Bijl, Daniel Montalvo. Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Live APG page; no page-specific publication/update date displayed; no commit pin recorded.

**Evidence type:** Informative APG guidance. **Referenced concepts:** Native disabled HTML inputs leave Tab sequence; retaining disabled focusability can support discoverability; conventions depend on context.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Composite-widget examples are not an automatic rule for ordinary submit buttons. **Chapter sections:** Pending actions and available controls.

### F12 · R17 — Dialog (Modal) Pattern

[Original source](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

**Credit:** W3C WAI ARIA Authoring Practices Task Force, part of ARIA Working Group. Editors credited in APG acknowledgements: Matt King, JaEun Jemma Ku, James Nurthen, Zoë Bijl, Daniel Montalvo. Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Live APG page; no page-specific publication/update date displayed; no commit pin recorded.

**Evidence type:** Informative APG pattern, not a normative conformance model. **Referenced concepts:** Modal focus entry and containment, accessible name, visible closing action, Escape closes, focus return or logical alternative.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Same-dialog dirty confirmation and Escape returning to editing are Atlas adaptations, not APG requirements; browser/AT behavior unvalidated here. **Chapter sections:** Modal editing and dirty exit.

### F13 · R42 — HTML: the dialog element

[Original source](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element)

**Credit:** WHATWG and contributors (copyright WHATWG: Apple, Google, Mozilla, Microsoft). **Inspected:** 2026-10-15. **Version/status:** HTML Living Standard; page last updated 14 October 2026 at inspection; no commit pin recorded.

**Evidence type:** Normative HTML platform specification except identified examples/advice. **Referenced concepts:** Modal show method, focus steps and author-selected initial focus; close-request/cancel path differs from unconditional close.

**Terms and scope:** license url: [source link](https://creativecommons.org/licenses/by/4.0/); scope: Reference-only HTML behavior. WHATWG acknowledgement footer distinguishes CC BY 4.0 document text from BSD 3-Clause portions incorporated into source code; no source code incorporated here; license evidence: [source link](https://html.spec.whatwg.org/multipage/acknowledgements.html).

**Limits:** Cancellation prevention is not an absolute guarantee; target implementation/support and dismissal behavior must be tested. **Chapter sections:** Modal editing and dirty exit.

### F14 · R29 — Multi-page Forms

[Original source](https://www.w3.org/WAI/tutorials/forms/multi-page/)

**Credit:** W3C WAI Education and Outreach Working Group; editors Eric Eggert and Shadi Abou-Zahra; contributors linked in tutorial acknowledgements. Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Page status: Updated 27 July 2019.

**Evidence type:** Informative WAI tutorial. **Referenced concepts:** Logical grouping into steps, optional stages, repeated overall instructions, progress indication.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Chapter's branch retention/invalid-answer policies are Atlas proposals; no source example markup imported. **Chapter sections:** Multi-step and branching forms.

### F15 · R17 — Understanding SC 3.3.7: Redundant Entry

[Original source](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html)

**Credit:** W3C WAI Accessibility Guidelines Working Group participants (page credits co-chairs Adam Page, Alastair Campbell, Rachael Bradley Montgomery; W3C staff contact Kevin White). Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Page date: Updated 17 September 2025.

**Evidence type:** Informative Understanding document reproducing/explaining Level A SC 3.3.7. **Referenced concepts:** Repeated information within a process is prepopulated or selectable subject to exceptions; no between-session storage requirement is added.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Requirement scope is a process; browser autocomplete alone is not sufficient according to Understanding explanation. **Chapter sections:** Multi-step and branching forms.

### F16 · R17 — Understanding SC 3.2.2: On Input

[Original source](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html)

**Credit:** W3C WAI Accessibility Guidelines Working Group participants (page credits co-chairs Adam Page, Alastair Campbell, Rachael Bradley Montgomery; W3C staff contact Kevin White). Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Page date: Updated 28 June 2026.

**Evidence type:** Informative Understanding document reproducing/explaining Level A SC 3.2.2. **Referenced concepts:** A control setting/value change must not automatically change context without advance advice.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Activation of a link/submit button is distinguished from changing a control setting; not every content update is a context change. **Chapter sections:** Multi-step and branching forms.

### F17 · R49 — Check answers

[Original source](https://design-system.service.gov.uk/patterns/check-answers/)

**Credit:** GOV.UK Design System team; © Crown copyright. **Inspected:** 2026-10-15. **Version/status:** Live guidance page; no page-specific publication/update date displayed; no commit pin recorded.

**Evidence type:** Official service design-system guidance; comparative. **Referenced concepts:** Review before submission, change links, prepopulated answers, direct return to review, newly necessary questions before return.

**Terms and scope:** license url: [source link](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/); scope: Reference-only comparative guidance; no GOV.UK implementation, assets, or source text incorporated. Footer says OGL v3.0 except where stated otherwise; see terms OGL-3; license evidence: Direct design-system footer inspected; exact National Archives URL returned 403; official indexed license text inspected.

**Limits:** Review is one consequence safeguard; chapter does not adopt source layout/copy or prescribe this screen for every form. **Chapter sections:** Multi-step and branching forms.

### F18 · R17 — Understanding SC 3.3.4: Error Prevention (Legal, Financial, Data)

[Original source](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html)

**Credit:** W3C WAI Accessibility Guidelines Working Group participants (page credits co-chairs Adam Page, Alastair Campbell, Rachael Bradley Montgomery; W3C staff contact Kevin White). Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Page date: Updated 16 September 2025.

**Evidence type:** Informative Understanding document reproducing/explaining Level AA SC 3.3.4. **Referenced concepts:** In stated scope, reversible/checked/confirmed are alternative safeguards; explanation does not require confirmation for each save.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Do not expand the criterion to all actions or treat a modal as the sole way to meet it. **Chapter sections:** Multi-step and branching forms.

### F19 · R49 — Back link

[Original source](https://design-system.service.gov.uk/components/back-link/)

**Credit:** GOV.UK Design System team; © Crown copyright. **Inspected:** 2026-10-15. **Version/status:** No page-wide revision date shown. Most recent displayed guidance change December 2025; no commit pin recorded.

**Evidence type:** Official service design-system guidance; comparative. **Referenced concepts:** Previous actual page in its last state; clarify back destination for complex journeys.

**Terms and scope:** license url: [source link](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/); scope: Reference-only comparative guidance; no GOV.UK implementation, assets, or source text incorporated. Footer says OGL v3.0 except where stated otherwise; see terms OGL-3; license evidence: Direct design-system footer inspected; exact National Archives URL returned 403; official indexed license text inspected.

**Limits:** Component placement and always-on-question-page requirements are GOV.UK conventions; browser Back is separately considered. **Chapter sections:** Navigation, focus, and scroll.

### F20 · R52 — HTML: History interface and scroll restoration

[Original source](https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-history-interface)

**Credit:** WHATWG and contributors (copyright WHATWG: Apple, Google, Mozilla, Microsoft). **Inspected:** 2026-10-15. **Version/status:** HTML Living Standard; page last updated 14 October 2026 at inspection; no commit pin recorded.

**Evidence type:** Normative HTML platform specification except identified non-normative material. **Referenced concepts:** History Back/Forward traversal and automatic/manual scroll restoration exist as platform behavior.

**Terms and scope:** license url: [source link](https://creativecommons.org/licenses/by/4.0/); scope: Reference-only HTML behavior. WHATWG acknowledgement footer distinguishes CC BY 4.0 document text from BSD 3-Clause portions incorporated into source code; no source code incorporated here; license evidence: [source link](https://html.spec.whatwg.org/multipage/acknowledgements.html).

**Limits:** No universal SPA route/focus policy follows from these APIs; target restoration is untested. **Chapter sections:** Navigation, focus, and scroll.

### F21 · R17 — Understanding SC 2.4.3: Focus Order

[Original source](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)

**Credit:** W3C WAI Accessibility Guidelines Working Group participants (page credits co-chairs Adam Page, Alastair Campbell, Rachael Bradley Montgomery; W3C staff contact Kevin White). Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Page date: Updated 09 March 2026.

**Evidence type:** Informative Understanding document reproducing/explaining Level A SC 2.4.3. **Referenced concepts:** Sequential focus order preserves meaning and operability.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Does not prescribe a universal routing implementation or one route focus target. **Chapter sections:** Navigation, focus, and scroll.

### F22 · R52 — HTML: check if unloading is canceled

[Original source](https://html.spec.whatwg.org/multipage/browsing-the-web.html#check-if-unloading-is-canceled)

**Credit:** WHATWG and contributors (copyright WHATWG: Apple, Google, Mozilla, Microsoft). **Inspected:** 2026-10-15. **Version/status:** HTML Living Standard; page last updated 14 October 2026 at inspection; no commit pin recorded.

**Evidence type:** Normative platform algorithm, with identified implementation considerations. **Referenced concepts:** Unload confirmation depends on conditions including sticky activation; prompt message is user-agent-determined.

**Terms and scope:** license url: [source link](https://creativecommons.org/licenses/by/4.0/); scope: Reference-only HTML behavior. WHATWG acknowledgement footer distinguishes CC BY 4.0 document text from BSD 3-Clause portions incorporated into source code; no source code incorporated here; license evidence: [source link](https://html.spec.whatwg.org/multipage/acknowledgements.html).

**Limits:** Does not guarantee firing or loss prevention; mobile/lifecycle limitations separately sourced. **Chapter sections:** Unsaved work, resume, and expiry.

### F23 · R46 — Page Lifecycle API — beforeunload event

[Original source](https://developer.chrome.com/docs/web-platform/page-lifecycle-api#the-beforeunload-event)

**Credit:** Philip Walton; publisher Google, Chrome for Developers. **Inspected:** 2026-10-15. **Version/status:** Last updated 2023-12-01 UTC.

**Evidence type:** Official browser-vendor guidance, not W3C normative guidance. **Referenced concepts:** Termination events are unreliable, especially mobile; attach beforeunload only for unsaved work, remove after save.

**Terms and scope:** license url: [source link](https://creativecommons.org/licenses/by/4.0/); scope: Article prose CC BY 4.0 except as noted; samples Apache 2.0. Reference-only lifecycle concepts; no code or article prose copied; license evidence: Article footer; [source link](https://developers.google.com/terms/site-policies) and [source link](https://www.apache.org/licenses/LICENSE-2.0) linked.

**Limits:** Vendor guidance is not proof of identical support/ordering in all browsers; no lifecycle experiment performed. **Chapter sections:** Unsaved work, resume, and expiry.

### F24 · R17 — Understanding SC 2.2.1: Timing Adjustable

[Original source](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html)

**Credit:** W3C WAI Accessibility Guidelines Working Group participants (page credits co-chairs Adam Page, Alastair Campbell, Rachael Bradley Montgomery; W3C staff contact Kevin White). Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Page date: Updated 10 August 2026.

**Evidence type:** Informative Understanding document reproducing/explaining Level A SC 2.2.1. **Referenced concepts:** Content-set time limits have turn-off, adjustment, extension provisions and specified exceptions.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** Do not assume authentication/security automatically establishes an essential exception. No universal session timeout is specified. **Chapter sections:** Unsaved work, resume, and expiry.

### F25 · R17 — Introduction — ARIA Authoring Practices Guide

[Original source](https://www.w3.org/WAI/ARIA/apg/about/introduction/)

**Credit:** W3C WAI ARIA Authoring Practices Task Force, part of ARIA Working Group. Editors credited in APG acknowledgements: Matt King, JaEun Jemma Ku, James Nurthen, Zoë Bijl, Daniel Montalvo. Publisher: W3C. **Inspected:** 2026-10-15. **Version/status:** Live APG page; no page-specific publication/update date displayed; no commit pin recorded.

**Evidence type:** Informative explanation of APG status. **Referenced concepts:** APG does not specify normative requirements and has no conformance model.

**Terms and scope:** license url: [source link](https://www.w3.org/copyright/software-license-2023/); scope: Reference-only concepts in this chapter; no copied code, assets, or source prose. Document footer links the W3C permissive Software and Document license; see terms W3C-SW-2023; license evidence: Direct footer link followed to versioned license.

**Limits:** No APG page is treated as WCAG normative text. **Chapter sections:** When to load this chapter.

## Uncertain outcomes sources

### UO-HTTP · R50 — RFC 9110: HTTP Semantics

[Original source](https://www.rfc-editor.org/rfc/rfc9110.html)

**Credit:** editors: Roy T. Fielding; Mark Nottingham; Julian Reschke; organization: Internet Engineering Task Force (IETF); rights holders: IETF Trust and the persons identified as document authors. **Inspected:** 2026-10-15. **Version/status:** revision: RFC 9110; STD 97; Internet Standards Track; publication date: 2022-06.

**Evidence type:** Normative HTTP specification; Atlas policy implications are identified separately. **Referenced concepts:** Sections 9.2.1–9.2.2: safety, idempotent intended effects, and retry constraints; Sections 15.3.1–15.3.5: success and acceptance semantics; Sections 13.1.1, 15.5.10, 15.5.13: conditions and conflicts; Section 10.2.3: Retry-After.

**Terms and scope:** notice url: [source link](https://www.rfc-editor.org/rfc/rfc9110.html#name-copyright-notice); terms url: [source link](https://trustee.ietf.org/documents/trust-legal-provisions/tlp-5/); observed: The RFC copyright notice subjects the document to BCP 78 and the Trust Legal Provisions effective at publication. It separately identifies Revised BSD terms for extracted Code Components and a restriction concerning some pre-November-10-2008 material; scope: Specification document, distinct from Code Components. No extraction or modification of RFC prose, examples, or Code Components is proposed; do not infer document reuse permission from a software license.

**Limits:** HTTP semantics do not verify that any hypothetical application implements its service contract; No RFC defines the entire Atlas outcome vocabulary, proposed worksheet, or an application's idempotency-key scope, expiry, payload equality, cancellation, or reconciliation contract; A provider-independent chapter does not require a commercial platform example; RFC 9457 is unnecessary because no structured-error format is specified. **Chapter sections:** Standard facts and their limits; Service-contract worksheet; Safe retry and recovery; Cancellation and stale evidence.

### UO-FETCH · R51 — WHATWG Fetch Standard, commit snapshot e9460d1b22ead1c6a72eeac37fb2ec0dc01aeb1d

[Original source](https://fetch.spec.whatwg.org/commit-snapshots/e9460d1b22ead1c6a72eeac37fb2ec0dc01aeb1d/)

**Credit:** writer: Anne van Kesteren (Apple), named in the snapshot's Acknowledgments; organization: WHATWG; rights holders: WHATWG (Apple, Google, Mozilla, Microsoft); contributors: Additional contributors acknowledged in the source; no individual endorsement implied. **Inspected:** 2026-10-15. **Version/status:** revision: Living Standard; inspected immutable commit e9460d1b22ead1c6a72eeac37fb2ec0dc01aeb1d; displayed last updated: 2026-10-06.

**Evidence type:** Normative browser/web-platform specification; absence of proof of remote rollback is an Atlas inference from the limited observation. **Referenced concepts:** Section 5.6: rejection on network error, local abort steps, and settled-promise behavior.

**Terms and scope:** notice url: [source link](https://fetch.spec.whatwg.org/commit-snapshots/e9460d1b22ead1c6a72eeac37fb2ec0dc01aeb1d/#ipr); terms url: [source link](https://creativecommons.org/licenses/by/4.0/legalcode.en); license: Creative Commons Attribution 4.0 International for the work; BSD 3-Clause only for portions incorporated into source code, as the source notice distinguishes; scope: Prose research reference. Attribution retained; no source prose, examples, code, or assets reproduced. The source's code-specific terms do not replace its prose license.

**Limits:** Fetch defines client networking behavior; it does not document a hypothetical service's transactions, rollback, terminal outcome, or duplicate prevention; Living standards can change. The commit snapshot identifies the version inspected rather than claiming all browsers implement every detail; A network error is not evidence that no remote effect occurred; this is an uncertainty boundary, not a new normative server requirement. **Chapter sections:** Standard facts and their limits; Safe retry and recovery; Cancellation and stale evidence.

## Terms and credit inspection

These records describe the observed source terms, not Atlas's own publishing license. Reinspect the exact material before a future import; metadata and reference links do not replace its notices or grant rights to unrelated assets.

### W3C-SW-2023 — W3C Software and Document license — 2023

[Inspected original](https://www.w3.org/copyright/software-license-2023/). **Credit:** W3C. **Inspected:** 2026-10-15. **Version:** Effective 1 January 2023.

Permits copying/modification/distribution subject to full notice, pre-existing notices/disclaimers and change notices. Names/trademarks are not licensed for publicity. Relevant page-specific footers inspected; not a blanket WAI license assumption WAI's general using-material page gives a conservative default with exceptions. Record page-specific footer and version before actual reuse.

### W3C-DOC-2023 — W3C Document license — 2023

[Inspected original](https://www.w3.org/copyright/document-license-2023/). **Credit:** W3C. **Inspected:** 2026-10-15. **Version:** Effective 1 January 2023.

Copy/distribute with source/copyright/status notices. Does not generally grant modified specification publication; bounded implementation-related derivatives and code-component provisions exist. No specification text/code is copied here Reinspect exact artifact and required notice before reproducing any text or code.

### W3C-SW-2015 — W3C Software and Document license — 2015

[Inspected original](https://www.w3.org/copyright/software-license-2015/). **Credit:** W3C. **Inspected:** 2026-10-15. **Version:** 2015 version.

Permits copying/modification/distribution with full notice, retained notices/disclaimers and change attribution; no publicity permission for copyright-holder names/trademarks Do not silently substitute 2023 terms for this publication.

### OGL-3 — Open Government Licence v3.0

[Inspected original](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/). **Credit:** The National Archives; information providers retain relevant rights. **Inspected:** 2026-10-15. **Version:** Version 3.0.

GOV.UK footer identifies OGL v3 except as stated. Official indexed terms require source attribution and license link where possible; exclude categories including personal data and protected logos/crests Direct license page returned HTTP 403. Full current license text was not retrieved in this run; indexed official excerpts are partial. Reference-only chapter contains no GOV.UK copied implementation/assets/prose.

### WHATWG-TERMS — HTML Standard acknowledgements and license notice

[Inspected original](https://html.spec.whatwg.org/multipage/acknowledgements.html). **Credit:** WHATWG (Apple, Google, Mozilla, Microsoft) and contributors. **Inspected:** 2026-10-15. **Version:** Living Standard; inspected current notice.

CC BY 4.0 document text; portions incorporated into source code use BSD 3-Clause instead. Links https://creativecommons.org/licenses/by/4.0/ and https://opensource.org/license/bsd-3-clause. No external source code incorporated References do not carry WHATWG endorsement or remove third-party rights.

### WAI-USE — Use WAI material: Permission to use with attribution

[Inspected original](https://www.w3.org/WAI/about/using-wai-material/). **Credit:** W3C WAI. **Inspected:** 2026-10-15. **Version:** Current live page; no pin recorded.

General guidance asks attribution and no modification with stated exceptions; exact page-specific license link determines actual reuse assessment No source passages copied. Not treated as permission to alter a Recommendation.

### APG-CREDITS — APG acknowledgements

[Inspected original](https://www.w3.org/WAI/ARIA/apg/about/acknowledgements/). **Credit:** W3C WAI APG Task Force. **Inspected:** 2026-10-15. **Version:** Current live credits; no pin recorded.

Reference-only credit verification Credit to listed editors does not imply individual authorship of every sentence/pattern.

### UO-IETF-TERMS — Corrected Legal Provisions Relating to IETF Documents (TLP 5.0)

[Inspected original](https://trustee.ietf.org/documents/trust-legal-provisions/tlp-5/). **Credit:** organization: IETF Trust. **Inspected:** 2026-10-15. **Version:** revision: Corrected TLP 5.0; effective date: 2015-03-25; correction date: 2021-09-21; correction scope: Software-license name corrected to Revised BSD; source states the license text did not change.

terms url: https://trustee.ietf.org/documents/trust-legal-provisions/tlp-5/; observed: Section 3 distinguishes document redistribution and attributed unmodified portions from modification rights; Section 4 separately addresses Code Components. Required notices and original document restrictions still matter; scope: Terms evidence for RFC 9110; no copied source material requiring a notice bundle is included in the draft The RFC itself includes a legacy-material modification caveat; the TLP is not blanket permission to rewrite or copy source prose. Reference metadata does not grant rights to unrelated logos, third-party assets, or products.

### UO-CC-BY-TERMS — Creative Commons Attribution 4.0 International — Legal Code

[Inspected original](https://creativecommons.org/licenses/by/4.0/legalcode.en). **Credit:** organization: Creative Commons. **Inspected:** 2026-10-15. **Version:** revision: CC BY 4.0 International; publication date: Not asserted from the inspected page; license version identified.

terms url: https://creativecommons.org/licenses/by/4.0/legalcode.en; observed: Attribution conditions include appropriate creator/source credit, license information, and indication of modifications when applicable; use cannot imply endorsement. The deed is explanatory and points to the legal code; scope: Applies to Fetch through Fetch's own license notice; not a blanket license for third-party sites or Atlas. No source prose is reproduced The draft does not redistribute the Fetch Standard or software and does not assert browser conformance. Source terms and Atlas authorship must remain distinguishable.

### Additional linked source notices

- [HTML maintainers, ownership and document/code license scope](https://html.spec.whatwg.org/multipage/acknowledgements.html) — inspected 2026-10-15.
- [Observed notice/change conditions linked by W3C draft](https://www.w3.org/copyright/software-license-2023/) — inspected 2026-10-15; In effect since 2023-01-01.
- [Content/code distinction, attribution and excluded media/marks](https://developers.google.com/terms/site-policies) — inspected 2026-10-15; Last updated 2025-08-06 UTC.
- [Blog/content versus source-project distinction; no general blog reuse grant established](https://webkit.org/terms-of-use/) — inspected 2026-10-15; No revision date established from inspected page.
- [Verify LGPL/BSD statement applies to WebKit software rather than assume blog license](https://webkit.org/licensing-webkit/) — inspected 2026-10-15; No revision date established from inspected page.
- [Verify linked CC BY 4.0 deed and attribution/change/no-endorsement conditions; deed is not the legal code](https://creativecommons.org/licenses/by/4.0/) — inspected 2026-10-15; Creative Commons Attribution 4.0 International.
- [Verify WHATWG linked BSD license preserves copyright/conditions/disclaimer and prohibits unauthorized endorsement](https://opensource.org/license/BSD-3-Clause) — inspected 2026-10-15; BSD-3-Clause; no webpage revision date established.

Root review also inspected the [WHATWG IPR policy](https://whatwg.org/ipr-policy), the [GOV.UK homepage footer](https://design-system.service.gov.uk/) and the [IETF Trust provisions index](https://trustee.ietf.org/documents/trust-legal-provisions/) on 2026-10-15. The IPR policy distinguishes CC BY 4.0 document terms from BSD 3-Clause code incorporation. GOV.UK's footer identifies OGL v3 and Crown copyright; direct retrieval of the National Archives license returned HTTP 403, so full-text inspection remains incomplete. No GOV.UK implementation or assets are copied. WebKit blog-copying terms remain unresolved and are not inferred from WebKit's LGPL/BSD software terms.

## Adaptations and review boundaries

Atlas proposes whole-write acknowledgement, guarded unreadable storage, compatible export/import envelopes, explicit revision/conflict boundaries, per-control pending behavior, contextual review/edit return and recoverable action identity. The same-dialog dirty-confirmation sequence deliberately differs from APG's immediate Escape-close pattern and needs project-specific evaluation. GOV.UK error-summary focus is comparative service guidance. Neither is a universal WCAG requirement.

The desk review additionally corrected an overbroad retry rule: an authoritative delayed response from an earlier transport attempt can resolve the same logical action. Matching action/payload/version and service ordering matter; attempt arrival order alone is insufficient. Existing trial documents remain unchanged and retain their open contracts.

No body of RFC text, W3C specification or tutorial example is reproduced or modified as a replacement standard. Reference metadata preserves the original scope, status and creators. Atlas's own publishing license remains undecided. Before any skills implementation, review these draft chapters and the [desk-review disposition](p0-review.md#review-disposition-and-next-evidence).

## Revision 0.2 review extension

Reviewed on 2026-10-15 before fresh generation trials. The new save-snapshot, stale-writer retirement, changed-intent overlap, pre-dispatch recovery and observation-policy rules are **Atlas proposals**. They add no claimed service capability or universal browser mechanism. See the [review and trial report](../examples/p0-evaluation/README.md) for findings, input hashes, generation results and limits.

- **F09 / R52:** root and forms reviewer inspected [HTML constraint validation](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constraint-validation) and the [submission algorithm](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission-algorithm). The normative sequence can stop submission before submit dispatch; native reporting can select invalid focus. The HTML Living Standard displayed 14 October 2026, inspected 15 October 2026; no new immutable HTML pin is claimed. Existing WHATWG credits and CC BY 4.0 document/BSD code-incorporation distinction remain applicable. No prose/code imported.
- **P0-STATE-03 / R45:** inspected dated [IndexedDB §2.3 values](https://www.w3.org/TR/2025/WD-IndexedDB-3-20250813/#values) and [transaction scheduling](https://www.w3.org/TR/2025/WD-IndexedDB-3-20250813/#transaction-scheduling). Values are stored by value; transaction serialization does not prohibit a later stale application write. Steve Becker/W3C and the already recorded publication/license credits remain unchanged. Snapshot/dirty-baseline and replacement-fencing policy are Atlas deductions.
- **UO-HTTP / R50:** reviewed [idempotent methods](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2), [202 acceptance](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.3.3) and [Retry-After](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.2.3). These do not supply application overlapping-action policy or a completion deadline. Existing RFC authors, June 2022 version and Trust terms remain applicable. Observation/dispatch policies are Atlas proposals.

The outcomes reviewer could inspect live [Fetch §5.6](https://fetch.spec.whatwg.org/#fetch-method) but could not retrieve its pinned snapshot in this follow-up; exact-pin independent re-verification is therefore incomplete. The initial research's recorded pin remains provenance, not a claim that this review retrieved it again. No new technical source family is added; the 34-record count describes the existing ledger, with additional inspected sections recorded here.
