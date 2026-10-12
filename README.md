# first-pr-finder

`first-pr-finder` is a GitHub Copilot Agent Skill for open-source contribution pre-flight analysis. It is designed to answer one essential question before implementation begins:

> Is this issue worth pursuing, and what evidence shows the likely conflicts, risks, and minimal change path?

Unlike generic repository explainers or broad issue searchers, this skill is focused on pre-flight intelligence. It checks for ownership claims, active or stale work, closed-but-unmerged attempts, duplicated behavior, repository conventions, and the actual code/test path required to contribute safely.

## Why this exists

Contributors often lose time on issues that are:
- already claimed or actively being implemented,
- duplicated by an existing PR,
- already fixed in a later code path,
- blocked by prior rejection feedback,
- ambiguous enough that a wrong implementation would be rejected,
- or impossible to contribute to without reading repo norms and tests.

This skill reduces that waste by making the pre-flight check explicit and evidence-based.

## What it does

The skill supports three input modes:

1. Analyze a specific issue
   - issue URL
   - issue number in a repo
   - user-supplied issue details
   - issue context already in the conversation

2. Discover suitable issues
   - scan open issues in a repo
   - rank likely contribution candidates
   - provide a shortlist and let the user select one

3. Review an existing contribution plan
   - inspect a proposed implementation plan
   - detect missing ownership, prior rejection, or relevant tests
   - flag repository or contribution gaps

## Core workflow

The workflow is intentionally ordered to prevent premature implementation:

1. Identify repository and issue.
2. Record available access and search coverage; inspect relevant repository context.
3. Investigate ownership claims, competing open PRs, closed attempts, and resolution evidence.
4. Produce one evidence-backed issue-status verdict before implementation planning.
5. Rate planning readiness separately across issue clarity, code evidence, testability, repository compliance, and conflicting work.
6. Map the issue-to-code path, real test commands, and official contribution requirements.
7. Analyze scoped dependency/compatibility traps and regression blast radius.
8. Compare plausible approaches and categorize candidate files.
9. Assess merge risk separately from issue status and readiness.
10. Produce a report following the required schema.

The workflow is read-only. It provides analysis and a proposed plan; it does not modify the target repository.

## Pre-flight verdicts

The skill uses the required statuses:

- `AVAILABLE`
- `POTENTIALLY_CLAIMED`
- `ACTIVE_WORK`
- `PREVIOUSLY_REJECTED`
- `ALREADY_RESOLVED`
- `UNKNOWN`

Each verdict includes:
- status
- confidence
- evidence and source links
- relevant timestamps
- search coverage and limitations
- conflicts or blockers
- recommended next action

## Installation

Install the skill with Node.js/npm and the Skills CLI, invoked through `npx`. You also need a compatible GitHub Copilot setup.

```sh
npx skills add kachamsiddarth/first-pr-finder --skill first-pr-finder --agent github-copilot --global
```

The command installs a skill from a repository with `skills add`; `--skill first-pr-finder` selects this skill, `--agent github-copilot` targets GitHub Copilot, and `--global` requests global installation.

### Verify installation

```sh
npx skills list
```

Check the output for `first-pr-finder`.

### Troubleshooting

Installation alone does not guarantee access to every GitHub issue or pull request. Results depend on the tools, permissions, and API access available to your Copilot environment.

## Usage

Ask your Copilot agent to analyze a GitHub issue, investigate competing pull requests and ownership claims, inspect repository conventions, and produce an evidence-backed implementation plan.

### Analyze a single issue
- “Review this issue: https://github.com/owner/repo/issues/123”
- “Is this issue still open and worth contributing?”
- “I found this bug report in the issue tracker: …”

### Discover suitable issues
- “Scan this repository for good first issues and rank them by contribution risk.”
- “Find issues in owner/repo that look actionable and not already claimed.”

### Review a contribution plan
- “I have a proposed fix plan. Pre-flight check it against PR history and issue comments.”
- “Do we have competing work or old rejection feedback that makes this plan risky?”

## Example report

See [examples/sample-report.md](./examples/sample-report.md) for a realistic, clearly labeled illustrative report.

## Tool and auth requirements

This skill prefers existing GitHub tools and access already available in the host environment:
- GitHub issue/PR metadata
- repository files and branch information
- local git metadata when available
- issue comments and public web content when accessible

If GitHub API or CLI access is unavailable, the skill continues using the information that is accessible and clearly reports the confidence reduction and missing evidence.

## Known limitations

- Search can be incomplete if GitHub access is limited.
- Ownership claims must be interpreted in context, not as guaranteed assignment.
- Old claims can be stale or valid; the skill treats age as warning data, not abandonment proof.
- Some issue discussions or PRs may not be discoverable in the environment.
- The skill does not fabricate missing issue details or prior maintainer decisions.

## Contribution and evaluation

This repository is intended as a reusable skill package. To contribute:
- preserve the pre-flight workflow ordering,
- keep evidence rules explicit,
- do not invent unverified facts,
- and keep the skill portable across repositories.

Evaluation guidance is in [tests/test-cases.md](./tests/test-cases.md) and [tests/evaluation-checklist.md](./tests/evaluation-checklist.md).

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE). The permissive MIT license is appropriate for a reusable skill package that should be portable, easy to adopt, and clear to share in an open-source or internal Copilot environment.

## References

- [references/preflight-workflow.md](./references/preflight-workflow.md)
- [references/evidence-and-risk-rules.md](./references/evidence-and-risk-rules.md)
- [references/report-schema.md](./references/report-schema.md)
- [references/confidence-gate.md](./references/confidence-gate.md)
- [references/repo-norms.md](./references/repo-norms.md)
- [references/impact-analysis.md](./references/impact-analysis.md)
- [references/counterfactual.md](./references/counterfactual.md)
