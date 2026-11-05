# Agent Experience and control-contract research

Status: **draft for review**, inspected **2026-10-27**, Asia/Bangkok. Original Interface Atlas synthesis for **Tamir (Phi Vuong Tuong Tam), with Codex AI assistance**. This research extends the existing Agent Experience chapter; it changes no skill, runtime or global installation.

## Question and scope

The existing chapter identifies understandable activity, operator control and exact proposals. P0 already covers action identity, immutable intent, retention, retries, uncertain effects and cancellation races. This pass researches five missing operator-facing decisions: capability expectations; inspectable proposals; correction applicability; request attention/lifetime; and evidence/return summaries. It links P0 rather than introducing a second remote-state model or a universal approval policy.

The chapter's tables, labels, composition and fictional cases are Atlas proposals. Protocol requirements apply only to the inspected protocol/version. Research/practitioner guidance is not a standard, and the fresh desk trial does not establish implemented behavior or usability. Full bibliographic facts, source locators and retrieval limits are preserved in [the evidence record](agent-experience-evidence.json).

## Microsoft HAX — historical foundation and live library

**Paper:** [Guidelines for Human-AI Interaction](https://www.microsoft.com/en-us/research/wp-content/uploads/2019/01/Guidelines-for-Human-AI-Interaction-camera-ready.pdf), [DOI](https://doi.org/10.1145/3290605.3300233), CHI 2019. Authors: **Saleema Amershi, Dan Weld, Mihaela Vorvoreanu, Adam Fourney, Besmira Nushi, Penny Collisson, Jina Suh, Shamsi Iqbal, Paul N. Bennett, Kori Inkpen, Jaime Teevan, Ruth Kikin-Gil and Eric Horvitz**. Ever Zayn McDonald is acknowledged, not a coauthor. The retrieved PDF has a DOI but no verified immutable content revision/hash.

The paper is a research synthesis with iterative guideline evaluation, not a trial of Atlas. Its ACM notice identifies author/owner copyright and publication rights licensed to ACM; it does not establish a permissive grant for importing the paper into this repository. No paper text, diagrams or participant evidence is reproduced.

**Library:** [HAX Design Library](https://www.microsoft.com/en-us/haxtoolkit/library/), credited to **Microsoft HAX Toolkit, Microsoft Research and Aether**. Selected G1/G2/G8/G9/G10/G11 pages concern capability/quality, dismissal, correction, narrowing uncertain assistance and explanations. Exact detail URLs are recorded in JSON. These are mutable practitioner patterns with no verified revision/date. The current [project roster](https://www.microsoft.com/en-us/research/project/hax-toolkit/people/) is distinct from paper authorship. The [general Microsoft terms](https://www.microsoft.com/en-us/legal/terms-of-use) do not establish a library-specific permissive license.

**Atlas use:** support task-specific expectations and meaningful correction; compose the decision table independently. Pattern alternatives are not universal layouts, and example products do not establish Atlas effectiveness. No screenshots, worksheets or implementation are copied.

## Google PAIR — explicitly historical v2 chapters

Inspected HTML: [Mental Models](https://pair.withgoogle.com/guidebook-v2/chapter/mental-models/), [Explainability + Trust](https://pair.withgoogle.com/guidebook-v2/chapter/explainability-trust/) and [Feedback + Control](https://pair.withgoogle.com/guidebook-v2/chapter/feedback-controls/). Creator: **Google PAIR / People + AI Research team**. The [v2 landing page](https://pair.withgoogle.com/guidebook-v2/) records the 2019 launch and 2021-05-18 update. Editorial history credits **Jess Holbrook and Kristie Fisher** for the original exercise, with **Fernanda Viégas and Martin Wattenberg** providing guidance, and **Rebecca Salois and Gabe Clapper** leading the 2021 update. Those are project roles, not assigned authorship of every chapter.

**Atlas use:** explain relevant limits and evidence, distinguish this task's choices from feedback affecting future behavior, and avoid unsupported learning/confidence promises. Applying this to tool-using agents is Atlas inference. The chapters' footers explicitly identify **CC BY-NC-SA 4.0**; no prose, worksheets, visual assets or code are reproduced.

Official [2025 credits](https://github.com/PAIR-code/pair-code.github.io/blob/master/Blog/People%20%2B%20AI%20Guidebook%20-%202025%20Contributors.md) identify a third edition from April 2025, but current chapter text was not extractable from the live guidebook URL. This draft uses the inspected 2021 material and does not present it as the 2025 edition. Credits, notices and retrieval failures are separated in JSON.

## MCP — a pinned protocol comparison

Version **2025-11-25**, tag commit **38c84e9f93ad191d9eb26d92b945d17bd0efcaf3**. Credit: **Model Context Protocol project and contributors**; its README credits protocol creators **David Soria Parra and Justin Spahr-Summers**. Page-specific authorship is not established.

| Inspected artifact | Evidence and limit |
| --- | --- |
| [Elicitation](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/38c84e9f93ad191d9eb26d92b945d17bd0efcaf3/docs/specification/2025-11-25/client/elicitation.mdx) | Distinguishes accepting information, declining and dismissing; separates external-flow consent from completion. This is not an application-wide permission or proposal-approval model. |
| [Cancellation](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/38c84e9f93ad191d9eb26d92b945d17bd0efcaf3/docs/specification/2025-11-25/basic/utilities/cancellation.mdx) | Ordinary cancellation is request-scoped and may not interrupt work. The UI must know the chosen service's capability. |
| [Tasks](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/38c84e9f93ad191d9eb26d92b945d17bd0efcaf3/docs/specification/2025-11-25/basic/utilities/tasks.mdx) | Experimental in this version. A cancelled task record does not guarantee stopped execution or reversed effects. Task/request identities support scoped tracking. |

**Atlas inference:** independently address decisions and describe correction applicability. These sources do not supply acknowledgement of steering application or approval bound to a proposal revision; those remain application-contract questions. No MCP adapter or runtime is added.

The same-revision [LICENSE](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/38c84e9f93ad191d9eb26d92b945d17bd0efcaf3/LICENSE) is **MIT**, copyright **2024–2025 Anthropic, PBC and contributors**. The [unchanged full notice](licenses/mcp-specification-2025-11-25-MIT.txt) is retained, SHA-256 `346e57dc40801e3d58165e97f64d45b42c4571a68a76ecb10c3c12858acecb3f`. This is specification-repository evidence, not an SDK-license assumption or a grant over current site chrome. Later mixed repository terms are not substituted for this pin.

## W3C status messages and Primer practices

**W3C:** [WCAG 2.2, Recommendation 2024-12-12, SC 4.1.3](https://www.w3.org/TR/2024/REC-WCAG22-20241212/#status-messages) is normative; [Understanding Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), updated 2026-05-11, is informative. Credit **Accessibility Guidelines Working Group** and published editors **Alastair Campbell, Chuck Adams, Rachael Bradley Montgomery, Michael Cooper and Andrew Kirkpatrick**. The Understanding page additionally credits WAI/EOWG interface contributors. The Recommendation links W3C Document License 2023; Understanding links Software and Document License 2023. They are separate artifacts/terms. Concepts only; no normative or tutorial passages copied.

**Atlas use:** expose qualifying status messages programmatically without unsolicited focus movement; choose announcement detail/cadence using real interaction and assistive-technology checks. This does not require announcing every event or generating messages where none otherwise exist.

**GitHub / Primer accessibility contributors:** [Copilot Accessibility Practices](https://primer.style/accessibility/patterns/copilot-accessibility-practices/) is mutable practitioner guidance. No named page author, revision or page-specific reuse grant was established. It supplies focus/announcement considerations; its example cadence and component tokens are not adopted as defaults. No implementation, prose or assets are copied, and another Primer package's MIT notice is not treated as this webpage's license.

## Reuse and next evidence

Existing **Mohit Aggarwal** and **Burhan Sebin** method credits and pinned MIT notices remain in [skill adaptations](skill-adaptations.md). No new upstream skill package is imported. Source creators do not endorse Atlas; their terms do not select Atlas's own publishing license, which remains undecided.

The [Harbor Desk exercise](../examples/agent-control-evaluation/README.md) applies this draft to fictional facts. It can expose omitted or contradictory document decisions. A future implementation still needs real service capability/authority documentation, effect and recovery evidence, supported browser/input/assistive-technology checks and observation of user comprehension. None is established by this research.
