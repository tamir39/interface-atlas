# Request change design

Status: project proposal.

## Presentation

Use system-ui, 16px/1.5 body, 24px/1.2 headings, 16px spacing and an 8px card radius. Light surfaces are #ffffff with #17202a text and #1463bc actions; Dark surfaces are #17202a with #ffffff text and #80bfff actions. Use labelled native controls, a visible focus outline and a single-column narrow view. All values are proposed and need rendered verification.

## Proposal review

The details panel displays the current queue, proposed queue and explanation. Keep the displayed proposal unchanged while an operator is reading. On Confirm, send whichever proposal is latest in the shared mutable store at activation time. The existing confirmation is sufficient even if the latest store proposal differs from the proposal shown.

## Work and cancellation

Show Running while work is active. Cancel immediately changes the status to Cancelled and removes the item from active work; the request is sent afterward. No acknowledgement or reconciliation step is needed.

## Validation

No browser, assistive-technology or service check has been performed. The implementation will need actual service documentation.
