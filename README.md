# first-pr-finder

`first-pr-finder` is an Agent Skills-standard skill for open-source contribution pre-flight analysis. It is designed to answer one essential question before implementation begins:

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

### Project-local installation (default)

The previous README command included `--global`, which explicitly installed into a user-level directory; the repository root `SKILL.md` alone is not automatically discovered by other projects. Run the Skills CLI from the root of the **target project** instead. Without `--global`, `skills add` installs into the current project. Node.js/npm (for `npx`) is required.

Before adding, check whether the skill name is already present:

```sh
npx skills list --agent github-copilot
```

If an existing `first-pr-finder` is listed, inspect its source first. Use `npx skills update first-pr-finder --project` only when it is already the installation from this repository; do not confirm an add over an unrelated skill with the same name. The install commands below stay interactive (they do not pass `--yes`) so the CLI can present any confirmation.

Install into all three agents:

```sh
npx skills add kachamsiddarth/first-pr-finder --skill first-pr-finder --agent github-copilot codex claude-code --copy
```

Or install for one agent at a time:

```sh
npx skills add kachamsiddarth/first-pr-finder --skill first-pr-finder --agent github-copilot --copy
npx skills add kachamsiddarth/first-pr-finder --skill first-pr-finder --agent codex --copy
npx skills add kachamsiddarth/first-pr-finder --skill first-pr-finder --agent claude-code --copy
```

The `--copy` option places project-local copies in the selected agent discovery directories. The GitHub-source install records its source in `skills-lock.json` for later CLI updates. The canonical instructions remain in this repository's root `SKILL.md`; do not edit installed copies directly.

The source argument and install destination are different: the current working directory is the target project, while `kachamsiddarth/first-pr-finder` identifies the source repository. From a target project, `npx skills add .` means “use this current directory as the source”; it does not fetch this GitHub repository. For development against a local clone, pass its absolute path as the package source while keeping the target project's root as the current directory:

PowerShell:

```powershell
npx skills add 'C:\path\to\first-pr-finder' --skill first-pr-finder --agent github-copilot --copy
```

macOS/Linux:

```sh
npx skills add /path/to/first-pr-finder --skill first-pr-finder --agent github-copilot --copy
```

The GitHub source command and an absolute local-source command were smoke-tested from a separate project directory. Both installed into that target, not into the source repository. The local-path smoke test did not create `skills-lock.json`; to refresh a local-source install after editing the clone, re-run its same `skills add <local-path> ... --copy` command from the target project root, and review any CLI confirmation rather than using `--yes`.

### Update, verify, and remove

From the target project root, update the tracked project-local installation after upstream changes:

```sh
npx skills update first-pr-finder --project
```

This `update` path applies to the GitHub-source installation recorded by the CLI. For a local clone source, use the re-add procedure above.

Verify the CLI's project installation and the native discovery file:

```sh
npx skills list --agent github-copilot
```

Expected project paths:

| Agent | Project-local `SKILL.md` |
| --- | --- |
| GitHub Copilot | `.agents/skills/first-pr-finder/SKILL.md` |
| OpenAI Codex | `.agents/skills/first-pr-finder/SKILL.md` |
| Claude Code | `.claude/skills/first-pr-finder/SKILL.md` |

Copilot also recognizes `.github/skills/` as a project skill root, but the tested Skills CLI installation targets `.agents/skills/` for Copilot. To remove all project-local copies for this skill, run from the same project root:

```sh
npx skills remove --skill first-pr-finder
```

Omitting `--global` removes only the project-local installation. Copilot and Codex share the `.agents/skills/` discovery directory, so removing from only one of those targets can affect both.

### Optional global installation

Global installation is an alternative for sharing the skill across projects on one machine. It is not the default and is not needed for project-local discovery:

```sh
npx skills add kachamsiddarth/first-pr-finder --skill first-pr-finder --agent github-copilot --global --copy
```

### Agent compatibility and verification status

Installation-tool support and a valid discovery path do not by themselves prove that an agent loaded or correctly followed a skill. Status below reflects official directory documentation and CLI placement smoke tests performed on 2026-10-12. GitHub Copilot Agent mode and Codex executables were not available; Claude Code is installed, but a live authenticated skill session was not run. No runtime load or end-to-end pre-flight test has been confirmed.

| Agent | Skills CLI support | Official project discovery path | CLI placement smoke test | Loaded by agent runtime | Runtime-tested pre-flight |
| --- | --- | --- | --- | --- | --- |
| GitHub Copilot | Verified (`github-copilot`) | Verified (`.agents/skills/`; `.github/skills/` also supported) | Passed | Not tested | Not tested |
| OpenAI Codex | Verified (`codex`) | Verified (`.agents/skills/`) | Passed | Not tested | Not tested |
| Claude Code | Verified (`claude-code`) | Verified (`.claude/skills/`) | Passed | Not tested | Not tested |

The placement smoke test used the Skills CLI against a temporary project: GitHub-source installation for Copilot and local-source installation for the three-agent set. Runtime availability, skill selection, and the resulting analysis remain unverified and require manual testing in each agent.

### Agent-specific invocation

- **GitHub Copilot Agent mode:** Ask Copilot to “Use the `first-pr-finder` skill to pre-flight [issue URL] in [repository].” Copilot can also select skills automatically when the task matches the skill description.
- **Codex CLI or IDE extension:** Select/mention `$first-pr-finder` (or use `/skills` to inspect available skills), then provide the issue and repository.
- **Claude Code:** Invoke `/first-pr-finder`, then provide the issue and repository.

The explicit invocation examples are based on each agent's documented interaction model; they have not been tested in live agent sessions.

### Troubleshooting

- If the skill is not listed, confirm the command was run from the target repository root and check the expected path above.
- If there is a same-name skill conflict, inspect its origin before updating, removing, or installing; do not use `--yes` to bypass that check.
- Restart or refresh the agent session after installation if its skill list was already loaded.
- Installation does not grant GitHub issue/PR access. Analysis coverage depends on the tools, permissions, and API access available to that agent.

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

Run the automated compatibility checks with Node.js:

```sh
node --test tests/compatibility.test.mjs
```

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

## Agent and CLI documentation checked

- [Skills CLI documentation](https://github.com/vercel-labs/skills#cli-reference) and [agent target paths](https://github.com/vercel-labs/skills#supported-agents)
- [GitHub Copilot agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) and [adding skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)
- [OpenAI Codex skills](https://developers.openai.com/codex/skills/)
- [Claude Code skills](https://code.claude.com/docs/en/skills)
- [Agent Skills specification](https://agentskills.io/specification)
