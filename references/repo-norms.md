# Repository norms and maintainer preferences

Analyze official repository requirements separately from observed historical patterns. This is read-only reconnaissance and evidence collection; it does not create repository edits.

## A. Official repository requirements

Inspect applicable, issue-relevant sources when available:

- `CONTRIBUTING` documentation and repository `AGENTS.md` instructions
- README contribution/development guidance
- issue and pull request templates
- CI workflows, test scripts, lint/format/type-check configuration
- `CODEOWNERS`, documented architecture decisions, and version/support policy
- relevant package/build manifests and lockfiles

Report each material requirement with the source path/section (and line or URL where available), requirement text in concise paraphrase, and whether it applies to the proposed work. Distinguish mandatory written rules from recommendations. If a source is absent or inaccessible, record that fact; never invent a default convention.

## B. Observed historical patterns

When GitHub/commit access permits, sample up to 30 recent merged PRs, prioritizing those matching the issue's change type, affected area, and likely files. Use fewer if fewer relevant examples are accessible. Record:

- the actual number reviewed and date/range or selection method
- PR URLs/numbers and why they are comparable
- review feedback and requested revisions
- test, documentation, changelog, scope, and file co-change patterns where visible
- sample exclusions and search limitations

Do not imply the sample is representative if it is small, biased, or drawn from a narrow area. Fewer than five relevant merged PRs means historical-pattern confidence is `LOW`; one PR is not enough to generalize a maintainer preference.

For every inferred preference, report:

`Pattern | Official or Historical | Evidence (PR/source) | Sample size | Confidence | Limitation`

Historical observations are not requirements. Never state that maintainers require a behavior solely because it appeared in an earlier PR. Do not infer approval from merged status alone; use review content when available. If history or discussion cannot be accessed, mark historical preferences `UNKNOWN`.

## Confidence and evidence

- `HIGH`: repeated comparable evidence and direct review/documentation support.
- `MEDIUM`: multiple relevant examples or one strong explicit source, with stated limitations.
- `LOW`: small or indirect sample; use for tentative historical signals only.
- `INSUFFICIENT`: insufficient or inaccessible evidence to support a confidence judgment.

Official rules must cite the actual repository source. Historical patterns must cite PRs and sample size. Keep official compliance separate from historical consistency in the final risk table.
