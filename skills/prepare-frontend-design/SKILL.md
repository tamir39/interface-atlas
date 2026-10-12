---
name: prepare-frontend-design
description: Prepare or deliberately revise project frontend design documents using Interface Atlas themes and relevant UI/UX knowledge. Use for design setup or specification changes, not routine implementation of an existing project design.
---

# Prepare frontend design

Produce a self-contained project design.md that fits the user's requirements, preserves source credits, and distinguishes inherited rules from project adaptations.

## Read selectively

Resolve this repository root from this skill's location.

Start with [the catalog](../../catalog/themes.json). Read candidate theme READMEs for suitability, reasons, and limitations. Respect an explicit theme choice; assess adaptations without replacing it silently.

Load the selected theme's design.md and sources.md. Read its motion.md or effects.md only when relevant. Read [Agent Experience](../../knowledge/agent-experience.md) when the product exposes agent work or controls. Framework adapters are optional.

Do not load every theme or shared document. Routine project work should use that project's documents.

## Resolve project decisions

Use the supplied brief and existing project evidence. Identify relevant users, tasks, content, constraints, languages, appearances, supported capabilities, and unknowns.

When relevant to the brief, resolve state ownership and persistence, recovery/undo, translation availability and glyph coverage, and media loading and asset credits. Keep these decisions conditional; do not add account, backend, or agent flows to projects that do not need them.

Retain useful theme rules and explain changes to density, typography, geometry, states, motion, and effects. Keep proposed values and unconfirmed product capabilities explicit.

Use [the project template](../../templates/project-design.md) as an adaptable outline. The [examples](../../examples/README.md) illustrate different adaptations; their assumptions are not universal requirements.

Include the exact values and behavior needed for implementation rather than references requiring the whole library to be reopened. Add separate project documents only when needed.

## Preserve provenance and evidence

Credit original creators and sources; retain source and theme revisions, reuse terms, required notices, and adaptation notes. A palette's numerical contrast results do not prove the whole interface accessible. Label outstanding rendered or behavioral checks.

Follow the user's requested output mode. If they ask for discussion or a chat draft, do not write files. When file creation is authorized, use their chosen project location.
