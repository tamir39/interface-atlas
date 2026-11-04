# Pattern recipe evaluation

These three original Atlas labs exercise [button feedback](../../patterns/button-feedback/README.md), [loading feedback](../../patterns/loading-feedback/README.md) and [hero composition](../../patterns/hero-composition/README.md). They use one neutral light/dark reference presentation rather than nine complete theme applications. Pattern suitability remains a decision against a consuming project's own theme, style, stack and task.

The [trials](trials.md), [machine-readable evidence](results.json) and [optional browser validator](../../tools/validate-patterns.mjs) separate actual task observations from source research, proposed rules and untested contexts. Each recipe retains its source and validation record; no source-library interface or component implementation is imported into these original previews.

The button lab distinguishes a native action, transient press/focus and persistent pressed selection. The loading lab is explicitly controlled by manual fixture actions; it demonstrates busy, cached, empty and failed states without sending a request or promising a service outcome. The hero lab uses real fragment links and an optional content/layout stress case. Local settings and fixture state reset on reload.

Browser coverage is bounded to the documented Chromium contexts. It does not establish accessibility conformance, general library quality, complete theme compatibility, user-study outcomes or real service behavior. Status remains **draft**.

The [routing desk checks](routing-checks.json) record two independent skill trials: direct use of the named hero recipe and a resolved focus-only patch that skipped pattern discovery. They are proposed design/patch outputs, separate from browser behavior. The [release checks](release-checks.json) record catalog, references, skill metadata, prior-preview identities, build and hub gates.
