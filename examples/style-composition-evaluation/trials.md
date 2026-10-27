# Glassmorphism trial record

The maintained browser check is [tools/validate-glassmorphism.mjs](../../tools/validate-glassmorphism.mjs). Its output directory must be fresh; it writes `results.json` and selected PNGs there. Run it with optional package/browser paths when Playwright is not installed in the repository:

```sh
node tools/validate-glassmorphism.mjs --module /path/to/playwright/index.mjs --browser /path/to/chromium --output /path/to/fresh-evidence
```

The preview is served at a local subpath to exercise relative runtime resources. Ordinary external requests, runtime exceptions and failed resources fail the run; intentional script abortion is recorded separately. The result hashes every preview source, the generated token manifest and the validator. Token identities and source-file hashes make the report specific to the implementation tested.

## Evidence status

The final run on **2026-10-27, 08:16:51–08:17:14 UTC**, used **Node v24.14.1** and installed **headless Chromium 153.0.8010.12**. All **13 check groups** passed. [results.json](results.json) is a compact projection of the real raw report: it preserves source/validator hashes, extracted identities, every matrix and interaction row, group observations, exclusions and the raw report’s SHA256. It is not hand-authored passing test data. The raw report and 11 PNGs remain in the temporary run directory; no screenshot binaries are added to Atlas.

| Observed check | Result |
| --- | --- |
| All nine profiles × light/dark × calm/bright/busy × auto/opaque × 320/1280px | 216/216 states passed; no whole-page horizontal overflow; measured essential surfaces stayed opaque. |
| Conservative composited text and field boundaries | Minimum lower bounds 5.627:1 text and 3.615:1 boundaries; each state measured visible HTML text and six enabled native fields. |
| Actual profile identity | All 18 light/dark sets matched the generated token manifest exactly; all nine source CSS hashes matched; all nine light profiles differed by actual token values. |
| Settings-select keyboard focus | 18/18 profile/appearance samples passed; 3px visible outline, minimum conservative ratio 5.986:1 against its adjacent opaque surface. |
| Surface selection and title-error states | 72 states passed across all nine light/dark profiles. Space activates the native surface button, both related controls update `aria-pressed`, the matching row updates, focus stays on the trigger, and invalid title text is associated with the field. Reset clears the error and restores the example. |
| Form and navigation | Skip link targets main; native select Tab order and visible focus pass; required/minlength validity flags are exercised; valid local review includes the title and note. The form uses associated inline feedback with `novalidate`, rather than a browser validation bubble. |
| System and accessibility preferences | Live system appearance, reduced motion, reduced transparency through CDP, and narrow forced colors passed. Reduced-transparency emulation was supported in this Chromium run. |
| Resilience | No JavaScript, aborted enhancement script and removed-`@supports` CSS branch preserve readable static content and native structure. Script-dependent controls remain disabled without enhancement. |
| Resources | No ordinary runtime exceptions, failed resources or external requests. The intentional script abort is recorded separately. |

## Repairs and inspection

The first launch failed because the Windows sandbox could not start the installed browser. The approved run outside that sandbox launched Chromium successfully; no package or browser was downloaded.

The first completed browser run passed all 216 composition states and reached the reduced-transparency check, which failed with `reduced-transparency: opaque fallback disables blur`. The auto-glass selector’s specificity outweighed the reduced-transparency rule. The preview was corrected so OS transparency/forced-color rules take precedence; forced-color system tokens were also given precedence over generated theme attributes. The corrected run and the final validator run both passed. No failing color pair was hidden, excluded or retokenized to make that repair pass.

The validator was expanded after the first run to verify source-manifest equality, all light/dark surface/error states and settings-focus pairs. Its conservative background model was made explicit about background-image paint order. The final record fingerprints that maintained version. Existing theme source files and their prior validation claims were not changed by this test work.

Visual inspection covered the narrow busy Swiss light and Layered dark captures, the final forced-color view and the final desktop form result. Text, controls and focus remained visible, with no clipped controls or page overflow; the inventory table intentionally uses its own horizontal scroll region. The parent review separately inspected Editorial light, Blueprint dark and Botanical at 320px. These inspections are implementation observations, not user research or a full visual audit of every state.

The maintained check serves the preview directory only. Relative runtime files are exercised under a subpath; neighboring documentation links are the catalog/build checks’ responsibility. The unsupported-backdrop trial removes complete CSS `@supports` groups to exercise the shipped base fill. Chromium still has backdrop support, so this is a CSS branch substitution, not validation in an engine that lacks the feature.

Before publication, new style text files were normalized to LF with a single terminal newline to match `.gitattributes`. No semantic code changed. The suite was rerun once against those final bytes, and the machine record was refreshed from that actual report; its preview hashes now identify the bytes published by Git.

## Limits

Only the selected Chromium engine is exercised. No screen reader, physical device, other engine, real backend, native browser zoom/text enlargement or performance benchmark is included. Three CSS backgrounds and two viewport widths are stress fixtures. Full existing themed apps, imagery fidelity, source fonts and all theme interactions are outside this composition evaluation. Browser results and reasoned fit classifications answer different questions.
