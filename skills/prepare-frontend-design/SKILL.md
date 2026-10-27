---
name: prepare-frontend-design
description: Prepare or deliberately revise a project's frontend design.md from its own design system, a supplied direction, or Atlas themes, optional visual styles and selected UI/UX knowledge. Use for design planning or specification changes, not routine implementation.
---

# Prepare frontend design

Produce a self-contained project design.md from the brief and available evidence. Respect the user's visual direction, scope, output mode and project location. Locate Atlas through the shared-resource links below; keep the library distinct from the consuming project.

## Establish the design

Identify users, essential tasks, content, supported contexts and constraints. Separate supplied facts, observations, proposed decisions and missing inputs. For an existing interface, inspect its governing design document and relevant source or supplied rendered evidence before proposing changes. Repeated code literals alone do not establish intended design rules.

Preserve an existing design system, brand or supplied direction. Use [the catalog](../../catalog/themes.json) and candidate theme READMEs when an Atlas direction is requested or useful for an unresolved choice; do not require an Atlas theme. If no theme fits, develop a project-specific direction from the brief and evidence. When inheriting an Atlas theme, read its design.md and sources.md and explain adaptations. Load motion.md or effects.md only for effects actually chosen. Do not select a stack, backend or additional feature merely to fill the document.

When a visual style is requested or unresolved, use [style discovery](../../catalog/styles.json) and shortlisted style READMEs. Load only the selected style rules and relevant credits; motion remains conditional. Use [composition guidance](../../knowledge/theme-style-composition.md) for actual overlap: record preserved theme rules, deliberate overrides, component scope and fallback behavior in the project handoff. A rendered profile does not establish theme suitability; neither a style nor an Atlas theme is compulsory.

## Load only relevant knowledge

Use [the knowledge index](../../knowledge/README.md) as the topic router. Select material for a concrete project decision; an existing, resolved project rule does not need a fresh survey. Read relevant sections, including dependencies and source credits, rather than every chapter or upstream skill family.

For a new design or unresolved UX decisions, use the general UI/UX guide to connect user goals, information structure, journeys, hierarchy and writing to the chosen visual direction. Route stateful editing to state/recovery and forms/navigation, remote effects to uncertain outcomes, accessibility or adaptive questions to their guide, and human-facing agent work to Agent Experience. Do not add agent, commerce, account or remote-action requirements to unrelated projects. Adapters are conditional on a concrete stack need.

Use compatible craft guidance such as better-ui only when relevant and available. Explicit user choices and governing project design/accessibility rules take precedence over generic polish values; selecting another skill does not authorize a rebrand, extra motion, a full-domain sweep or a separate report.

## Make the handoff actionable

Use [the project template](../../templates/project-design.md) as an adaptable outline; omit irrelevant sections. Resolve chosen rules into exact values, semantic pairings, content order, labels, component states and end-to-end task transitions. For applicable flows, name state owners, acknowledgement boundaries, interruption/re-entry, failure recovery and the user's next useful action. External capabilities need an identified input/owner and implementation gate, rather than a fictional endpoint or guarantee.

Retain useful governing design rules and explain project adaptations. Identify the actual design origin, whether project-owned, supplied, custom or Atlas; do not invent a theme inheritance or source credit. Record open research questions as questions; heuristic reasoning or synthetic examples are not observed user evidence. Include enough detail for implementation to use the project's documents without reopening Atlas. Add companion documents only when they materially help.

## Preserve evidence and credits

Record the used Atlas/theme/style revisions when selected, selected source creators and URLs, applicable terms/notices, and which values or methods were retained or adapted. For an uncommitted Atlas snapshot, identify that limit and relevant file hashes instead of implying HEAD contains the changes. Propagate relevant chapter credits and [adaptation notices](../../references/skill-adaptations.md); full license texts are redistribution records, not required reading on every invocation.

Use existing read records or metadata-only hashing for source identities. Do not reread source content solely to calculate a fingerprint or populate a provenance table.

Separate performed document, rendered, keyboard, assistive-technology and service checks from future checks. A contrast calculation does not validate an interface. Reconcile contradictions in the draft, then deliver in the requested mode; do not automatically invoke a separate review or implement the product.
