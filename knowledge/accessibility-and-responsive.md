# Focused accessibility and responsive decisions

Status: adaptation draft, updated 2026-10-20. Original Atlas synthesis by **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. These are conditional planning and review questions, not normative requirements or a conformance assessment. No interface testing is claimed.

## Select the relevant questions

Load when a task depends on interactive controls, assistive technology, resizing/zoom, translated content, touch, or motion/media. Select affected surfaces and states; skip absent features. This does not trigger an audit of every route or domain. A project claiming a standard must establish applicable criteria and authoritative sources separately; upstream skill checklists do not establish obligations.

Record supported environments and unresolved coverage: browsers, inputs, viewport/content constraints, languages/direction, and relevant assistive technology. Choose checks for task risk. Mockups cannot prove keyboard or screen-reader behavior.

## Controls, meaning, and focus

For an interactive task, ask:

- Which native elements or existing accessible components fit the action? If custom behavior is necessary, who owns its keyboard model and states?
- Can people identify actions from visible labels and accessible names? Do icons, instructions, field groups, headings, and relationships convey information the task needs?
- Can people complete the task with supported inputs? Can keyboard users locate their position, reach required actions, and leave temporary UI? Do hover, dragging, or gestures need an alternative?
- When a dialog opens, an error appears, or navigation completes, where should attention and focus go? Can the person return to a sensible location without losing context?

Plan behavior, then inspect implementation. Source can reveal missing associations or suspicious focus rules; it does not establish what a browser and assistive-technology combination announces. Extra ARIA is not itself evidence of improvement.

[Forms and navigation](forms-and-navigation.md) owns field errors, validation timing, dialog editing, dirty exit, route focus, and resume. [State and recovery](state-and-recovery.md) owns retained drafts and save acknowledgement; [uncertain outcomes](uncertain-outcomes.md) owns feedback when remote completion is unknown. Use the relevant contract when it exists; accessible wording must communicate actual capabilities.

## Adaptation with real content

When a task spans constrained sizes or changing text, ask:

- At what content pressure does the structure stop working? What should wrap, stack, collapse, scroll, or move to detail while preserving the task and reading order?
- Can people find required content and controls at supported narrow sizes, zoom/text settings, and orientation? Do sticky regions, overlays, browser chrome, or the onscreen keyboard cover an action or focused content?
- What happens to long names, identifiers, translated labels, multiline errors, empty data, and large values? If abbreviated, how can someone obtain the full value with their input method?
- If multiple languages or directions are supported, do layout, controls, labels, and mixed-direction values read correctly? Which elements intentionally keep a physical direction?

Choose breakpoints from observed content needs and supported conditions, then record transitions. Atlas sets no shared device list, spacing scale, font floor, or framework. Preserve information relationships when changing presentation.

## Perception, status, and optional media

Can people distinguish actions, selections, errors, and status without depending on one visual cue? Which foreground/background pairs actually render, including overlays, images, opacity, and theme modes? Record measured pairs and the project's applicable target; do not guess contrast ratios.

When motion exists, what information or control remains if it is reduced, interrupted, or absent? Does media need text alternatives, captions, or playback controls for this task? Can important feedback be found after a transient message disappears? Keep chosen color, type, and motion values with theme and project decisions.

## Record the chosen motion contract

When motion is chosen, resolve the applicable theme rules into one short project record: purpose and owning component; trigger and static equivalent; repeat, interruption and exit behavior; preference precedence; and performed versus pending checks. Omit a second record if the governing project document already resolves these points.

Name unresolved implementation mappings. A library's reduced-motion option may retain effects that the project makes immediate; inspect the installed version and actual behavior against the chosen policy. Logical completion, accepted actions and necessary focus transfer stay in their existing owners, independent of presentation callbacks.

Use existing CSS when it supports the required behavior. A runtime needs a concrete reason, such as interrupted gestures, presence or shared layout. Record the installed version when relevant. Timings and easing remain theme/project choices; property selection alone is not performance evidence.

Check the selected path, including relevant repeat/reversal, live preference changes and departure during movement. Preserve content and useful controls when presentation is absent or interrupted. Report the exercised environment and limits; source inspection does not establish frame performance or accessibility.

Method credits: existing Atlas [Editorial](../themes/editorial/motion.md)/[Pulse](../themes/pulse/motion.md) proposals, and linked technical guidance from **Matt Perry / Motion team and contributors**, [AI-kit skill](https://github.com/motiondivision/ai-kit/blob/8dc4f7a375f7f5cc32df1aa679b5d19c463651b4/plugins/motion/skills/motion/SKILL.md) at `8dc4f7a375f7f5cc32df1aa679b5d19c463651b4`. AI-kit metadata declares MIT, but a complete notice was not found in the inspected tree. This is original synthesis and references, not redistribution of the upstream skill bundle. The separate core-library license does not resolve that notice gap. See the [inspected source paths and adaptation boundary](../references/skill-adaptations.md#2026-10-20-reference-and-craft-additions).

## Report evidence at its actual level

Distinguish **planned**, **source inspected**, **rendered/interaction observed**, **measured**, and **not checked**. Name surface/state, content sample, environment, action or command, result, and limits. A screenshot can show clipping at one size; it cannot prove keyboard reachability. An accessibility tree exposes computed names/roles; a screen-reader walkthrough checks another layer. Automated findings need interpretation, and a clean run does not establish task usability or conformance.

Report observed barriers and consequences; otherwise record open questions or recommendations. Prefer focused corrections in the existing system. Repeat affected interaction and adaptation checks after changes. Explicitly exclude uninspected routes, states, devices, and assistive technologies from conclusions.

## Method credits

Adapted in original prose from **Jakub Krehel's** [better-accessibility](https://github.com/jakubkrehel/skills/blob/4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63/skills/better-accessibility/SKILL.md) and [better-layout](https://github.com/jakubkrehel/skills/blob/4c66b1fa86e9ab70187b43d7da9b6fdb29f2ef63/skills/better-layout/SKILL.md) (MIT: keyboard/focus inspection, content growth, adaptation, and verification limits); and **Julien Thibeaut's** [fixing-accessibility](https://github.com/ibelick/ui-skills/blob/f18d13077d6e3841821ea0a36526c0fd44a570b5/skills/fixing-accessibility/SKILL.md) (MIT: targeted names, native semantics, and control questions). Atlas does not adopt their complete rule sets, numeric thresholds, or verdicts. See [adaptation details and notices](../references/skill-adaptations.md).
