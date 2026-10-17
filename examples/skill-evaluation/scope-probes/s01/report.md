# Clear filters toolbar change

Implemented in `probes/s01/index.html` using the supplied `design.md`.

## Skills opened

None. This request is routine implementation of an existing design, so `prepare-frontend-design` does not apply. A design review was not requested, so `review-frontend-design` was not invoked. No Atlas content or global installed skill files were opened.

## Changes

- Added a native `type="button"` control labelled **Clear filters** after the Attention and Status selects.
- Activation sets both filter values to `all` and renders the full request list.
- The handler updates only the list, preserving the existing button and its keyboard focus. Native button keyboard behavior and the existing visible focus style remain available.
- Fixture edits are limited to this toolbar and its event handler. The supplied design was not changed.

## Checks performed

Executed the page script in Node with a minimal DOM. All checks passed: button type, label and placement; initial full list; Attention filtering; combined filters producing an empty list; clearing both values and restoring both records; repeated clearing after Status filtering; and unchanged active control during clearing. Detailed results are in `checks.json`.

Attempted a local headless Edge check for native Tab, Enter and Space behavior. Edge did not expose a DevTools endpoint, so no browser assertions ran. That attempt is recorded in `browser-check.json`.

## Cleanup confirmation

The temporary browser profile path resolves under this probe's staging run directory at `runs/probe-s01/browser-profile`. It no longer exists. A read-only process inspection found no Edge or Node process whose command line contained that exact profile path. The initial restricted inspection was denied; an elevated read-only inspection succeeded. Both Node helper commands had already exited: the browser attempt with code 1 and the DOM check with code 0. No further termination or removal was needed. No pre-existing user browser or unrelated process was stopped. The confirmed cleanup outcome is also recorded in `browser-check.json`.

## Limits

Native browser keyboard activation and rendered focus appearance were not verified. The implementation uses the native button's default keyboard behavior and does not replace or blur the button. No web access, installation or deployment was performed. Every fixture content read was logged before output in `fixture-reads.jsonl` with path, purpose, byte count, SHA256 and mode.
