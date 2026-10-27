# Next Up — Flat Design reference preview

[Live preview](https://tamir39.github.io/interface-atlas/styles/flat-design/preview/) · [Open locally](index.html) · [Style entry](../README.md)

**Next Up** is an original Atlas task-board specimen with four fictional frontend tasks. It uses opaque filled planes, visible labels and state words, native checkboxes and explicit boundaries. It ships original HTML, CSS and JavaScript without a build, package installation, fetched fonts or external requests.

## Task and state contract

- The four original tasks are present in the HTML. One starts done; three start open. Completion and priority are separate: priority is a visible label and never reorders the list.
- Native checkboxes mark a task done or reopen it. All, Open and Done views filter rows while preserving task state and original insertion order. Completing or reopening a focused task that leaves the current view moves focus to the first visible task, or to Show tasks if none remain. An outcome message explains the move. Ordinary completion in the All view retains focus.
- The add-task form accepts a trimmed title of **3–64 characters** and one native priority choice. Blank, too-short and overlong input receives visible text, invalid state and first-error focus. There is no maxlength that silently prevents testing an overlong value.
- Successful submission appends one open task, clears the title, retains priority and focuses the title field. A new task hidden by the Done view is still added; a visible status explains how to find it. User text is inserted as text, including literal markup.
- An empty view has a Show all tasks action. It restores the All view and focuses Show tasks. It does not delete, reopen or reorder anything.
- Settings preserve task state, filter and unsubmitted title/priority. Nothing is sent, saved or shared. Reload resets additions, completion, filters, preferences and the form to the original four-task page.

JavaScript enables only after initialization completes. Without JavaScript or if its script fails to load, the original task content remains readable, native links and disclosures work, and unavailable enhancement controls stay disabled with an explanation.

## Profile and rendering scope

The generated adapter projects 15 source variables from nine themes. Panels use the selected **card radius**; text fields, selects and buttons use the selected **control radius**. Flat Design does not require square corners. Native checkbox glyphs and popup internals remain browser/system controls.

Colors and declared font stacks remain from the chosen profile. This treatment removes shadows, gradients, texture, blur and offset depth; it is not a complete reproduction of each theme. Filled planes and typography group the work. State text, native checked semantics, labels, rules and focus outlines carry the task without material depth.

Appearance supports Light, Dark and System, following live system changes. Border feedback is off by default. Its optional **120ms border-color** transitions affect authored fields, selects, buttons and task-row rules only. There are no movement, entrance, smooth-scroll or continuous animations. Reduced motion and forced colors make those transitions immediate independently of JavaScript.

Under forced colors, authored content uses Canvas / CanvasText, ordinary document links use LinkText, and form controls, buttons and the button-like skip link use ButtonFace / ButtonText. The optional geometric artwork is hidden. Native checkbox rendering remains under system control; visible Done/Open text and keyboard outlines remain available. No broad forced-color-adjust override is used.

Theme/source links preserve local relative targets or the publication build's rewritten GitHub URLs when settings change. Selected source fonts are named but not shipped; installed fallback and language coverage depend on the reader's machine.

## Evidence and credits

Read [validation.md](../validation.md), the [composition design and nine fit decisions](../../../examples/flat-design-composition-evaluation/design.md), and [trial evidence](../../../examples/flat-design-composition-evaluation/README.md) for actual coverage and limits. A shared profile can render successfully while requiring a substantial identity adaptation. Status remains draft.

The specimen, geometric composition and fictional task text are original Interface Atlas work by Tamir (Phi Vuong Tuong Tam), with Codex AI assistance. The Atlas mark reuses the repository's brand geometry. No external interface, code, artwork or font file was imported. The [source record](../sources.md) separates historical context, credited research, artifact-specific terms and Atlas authorship. Linking a source is not permission to copy it.
