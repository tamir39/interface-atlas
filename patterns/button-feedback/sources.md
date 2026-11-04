# Button feedback — sources and credits

Inspected: **2026-11-04**. Pattern revision: **0.1.0-draft**.

## Atlas authorship and use

**Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**, authored this recipe and its reference fixture. The interface, local state behavior, content and CSS/JavaScript are original Atlas work. The sources below informed specific questions and observations. No upstream component implementation, prose, asset or font binary is copied or substantially adapted. No unused third-party license file is bundled, and an upstream license is not assigned to Atlas's original work. Existing Atlas artwork retains its [own credits](../../assets/brand/README.md).

## Selected references

| Source and creator | Inspected contribution and boundary |
| --- | --- |
| **0x-Sarthak / Sarthak Ahuja**, [Contact Us button on Uiverse](https://uiverse.io/0x-Sarthak/hungry-penguin-30), with its [Galaxy HTML/CSS source](https://github.com/uiverse-io/galaxy/blob/main/Buttons/0x-Sarthak_hungry-penguin-30.html) | A concrete hover/press example, useful for examining whether motion, color and a label still communicate the same action. The inspected source applies broad transitions and movement. Atlas uses an original contract and implementation; it does not import that timing, palette, typography, layout or code. |
| **Galahhad / Galahad**, [Uiverse input](https://uiverse.io/Galahhad/breezy-wolverine-23), with its [Galaxy source](https://github.com/uiverse-io/galaxy/blob/main/Inputs/Galahhad_breezy-wolverine-23.html) | Its visible slash-key hint has no shortcut handler in the inspected HTML/CSS artifact. This supports an Atlas review question: does a visual action hint correspond to an implemented capability? It does not establish that every surrounding use of that example lacks a handler. No code or keycap artwork is imported. |
| **W3C Web Accessibility Initiative**, [ARIA Authoring Practices Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Current informative guidance on button roles, activation and toggle semantics, inspected on the date above. Technical reference only; no examples or document text are redistributed. |

The two Uiverse source URLs use a mutable main branch inspected on the stated date, rather than an asserted immutable revision. The [Galaxy license](https://github.com/uiverse-io/galaxy/blob/main/LICENSE) is MIT, copyright **2023 Uiverse.io**. The selected site pages also identify their individual creators and publish MIT notices. A future code import needs the selected artifact/revision, applicable copyright and full notice preserved; credit the individual creator and Uiverse as well. This entry imports none of that software.

## Evidence limits

These are source observations, not a rendered or assistive-technology audit of Uiverse. Atlas's state distinctions, theme-fit procedure and preview choices are original proposals. Any browser results apply only to the [Atlas fixture](validation.md); the references do not certify its usability or endorse Atlas.
