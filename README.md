# first-pr-finder

`first-pr-finder` is a reusable Agent Skills-standard skill for evidence-based open-source contribution pre-flight analysis. It helps contributors answer one practical question before implementation begins:

> Is this issue worth pursuing, and what evidence shows the likely conflicts, risks, and minimal change path?

It is not a general-purpose repository explainer or a blind issue searcher. It is a focused pre-flight check designed to help contributors avoid wasting time on stale bugs, duplicated work, active overlap, already-fixed behavior, or issues that lack enough clarity for a safe implementation plan.

## Why this project exists

Contributors often discover an issue that looks actionable, but the real story is more complicated:

- the issue appears open while someone else is already working on it,
- a pull request may already be implementing the same fix,
- previous attempts may have been rejected or left incomplete,
- the behavior may already exist in another branch or later code path,
- repository conventions or test requirements may not be obvious,
- the issue may be too underspecified for a reliable implementation plan.

Checking whether an issue is open is not enough. A contributor also needs to know whether the issue is still actionable, whether there is competing work, whether it was already solved, and whether the repository's standards and test flow make a contribution sensible.

## What first-pr-finder does

The skill supports three main workflows:

1. Analyze a specific issue
   - issue URL
   - issue number in a repository
   - user-supplied issue details
   - issue context already present in the conversation

2. Discover suitable issues
   - scan a repository's open issues
   - rank likely contribution candidates
   - provide a shortlist for the user to review

3. Review an existing contribution plan
   - inspect a proposed implementation plan
   - identify missing ownership or rejection evidence
   - flag risky or incomplete contribution assumptions

It is designed for contributors, maintainers, and evaluators who need a grounded, read-only pre-flight assessment before code changes begin.

## How the complete workflow works

The skill's workflow is intentionally ordered to prevent premature implementation. This is the end-to-end flow it follows:

1. Identify the repository and issue.
   The analysis begins by establishing the exact target: which repository, which issue or issue number, and what evidence is actually accessible.

2. Record what is available and what is missing.
   It checks which GitHub tools, repo metadata, local git state, and repository files are available, and it records the limits of the search or access.

3. Investigate ownership and competing work.
   It looks for issue comments that indicate intent, open PRs that overlap the issue, linked or competing work, and signs that the issue is already being handled.

4. Investigate prior attempts and resolution evidence.
   It reviews closed-but-unmerged PRs, maintainer feedback, replacement fixes, related follow-up issues, and merged changes that may already satisfy the reported behavior.

5. Assign one issue-status verdict.
   The skill chooses exactly one of the six verdicts: `AVAILABLE`, `POTENTIALLY_CLAIMED`, `ACTIVE_WORK`, `PREVIOUSLY_REJECTED`, `ALREADY_RESOLVED`, or `UNKNOWN`.

6. Evaluate planning readiness separately.
   The issue-status verdict and the planning-readiness result answer different questions. Readiness checks whether there is enough issue clarity, code evidence, testability, repo compliance, and conflict evidence to produce a safe plan.

7. Map the issue to the code and test path.
   It inspects the relevant source files, the likely implementation area, and the actual commands used by the project to validate behavior.

8. Assess dependency, compatibility, and regression risk.
   It looks for relevant callers, side effects, configuration requirements, data flow constraints, and compatibility concerns that could change the implementation or risk profile.

9. Compare plausible implementation approaches.
   It compares materially different ways to solve the issue and categorizes files as `TOUCH`, `MAYBE`, `DON'T-TOUCH`, or `UNKNOWN` based on evidence.

10. Produce the final report.
   The skill compiles a structured report with verdicts, evidence, file assumptions, tests, risk, and planning-readiness guidance.

This ordering matters. It preserves evidence before implementation advice, keeps issue status distinct from readiness, and prevents a weak search result from being mistaken for a safe go-ahead.

## The decision system

### Six issue-status verdicts

The skill uses six formal verdicts that reflect the evidence available at the time of analysis:

- `AVAILABLE` — the accessible sources checked do not show significant competing work, ownership claims, unresolved prior rejection, or evidence that the issue is already resolved. This is not a guarantee that no one else is working on it; it means the checked evidence supports availability within the search scope.
- `POTENTIALLY_CLAIMED` — indications of ownership or active intent exist, but the current status is uncertain or stale and not clearly abandoned.
- `ACTIVE_WORK` — current evidence indicates active work or an overlapping open PR that materially conflicts with a parallel implementation.
- `PREVIOUSLY_REJECTED` — prior work was not merged and there is substantive rejection feedback or unresolved concerns relevant to a new attempt.
- `ALREADY_RESOLVED` — the issue appears already addressed by a merged fix, replacement change, or confirmed current behavior.
- `UNKNOWN` — the needed evidence is inaccessible, incomplete, contradictory, or too sparse to justify another verdict.

These verdicts are defined by evidence and documented gates. A closed issue is not enough to call something resolved or rejected; the skill distinguishes closure state from actual technical outcome.

### Four planning-readiness outcomes

The planning-readiness result is separate from issue status:

- `GO` — the issue and evidence are sufficiently clear, and there is no serious blocker.
- `GO WITH ASSUMPTIONS` — the issue is actionable, but a small assumption remains and it is explicitly stated.
- `NEEDS CLARIFICATION` — a material ambiguity or missing fact would change the implementation or validation path.
- `BLOCKED` — a confirmed serious constraint prevents a responsible plan, such as active overlap, an already-resolved fix, or a rule conflict.

Issue status answers, "What appears to be happening with the issue?" Planning readiness answers, "Is there enough evidence to safely plan and implement?"

### Confidence, evidence, search coverage, and limitations

The skill does not guess. Every conclusion is grounded in traceable evidence such as issue metadata, comments, repository files, tests, PR history, and local git state when available.

The project distinguishes:

- evidence — the actual source or artifact that supports a claim,
- inference — the conclusion drawn from that evidence,
- coverage limits — what the tool environment could or could not inspect,
- confidence labels — `HIGH`, `MEDIUM`, `LOW`, or `INSUFFICIENT`, based on evidence quality and the search scope.

It also records timestamps, relevant links, unresolved questions, and any search gap that could materially change the result.

## A practical example

The following is an illustrative scenario only. It is not a real repository result and does not represent a verified investigation.

Imagine a contributor finds an apparently open bug report about a config parser that fails on nested JSON values. The workflow would begin by confirming the issue and repo, then checking whether a pull request is already implementing the same behavior. A search may reveal an active PR with overlapping file edits, or it may show a stale comment with no follow-up activity. The skill then checks repository contribution rules, identifies the likely parser and test files, and looks for merge-risk signals such as previous rejected attempts or follow-up issues. Based on the available evidence, it might conclude `POTENTIALLY_CLAIMED`, `ACTIVE_WORK`, or `AVAILABLE`, and then rate planning readiness separately. The point is not to guess the outcome; it is to ground the recommendation in evidence and search coverage.

## Understanding the final report

The output is a structured, evidence-backed report. It is designed to help a contributor understand the issue, the current state of repository activity, the likely implementation path, and the main risks before code changes start.

The schema is defined in [references/report-schema.md](./references/report-schema.md), and an illustrative example is available in [examples/sample-report.md](./examples/sample-report.md). The report should explain:

- the issue overview and what the issue actually asks for,
- the pre-flight verdict and why it was selected,
- ownership and existing work, including relevant PRs and comments,
- the likely code path and minimal file-change plan,
- an implementation sequence only when the evidence supports it,
- testing strategy and real command sources,
- contribution requirements and repository norms,
- the risk register and readiness assessment,
- remaining unknowns and evidence gaps.

The report is deliberately conservative. It does not invent facts, it does not collapse separate questions into one status, and it records when evidence is incomplete.

## Installation and usage

### Project-local installation (default)

The previous README command included `--global`, which explicitly installed into a user-level directory; the repository root `SKILL.md` alone is not automatically discovered by other projects. Run the Skills CLI from the root of the target project instead. Without `--global`, `skills add` installs into the current project. Node.js/npm (for `npx`) is required.

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
| GitHub Copilot | Verified (`github-copilot`) | Verified (`.agents/skills/`; `.github/skills/` also supported) | Passed | Works | Works |
| OpenAI Codex | Verified (`codex`) | Verified (`.agents/skills/`) | Passed | Works | Works |
| Claude Code | Verified (`claude-code`) | Verified (`.claude/skills/`) | Passed | Works |Works |

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

### Usage

Ask your Copilot agent to analyze a GitHub issue, investigate competing pull requests and ownership claims, inspect repository conventions, and produce an evidence-backed implementation plan.

#### Analyze a single issue
- “Review this issue: https://github.com/owner/repo/issues/123”
- “Is this issue still open and worth contributing?”
- “I found this bug report in the issue tracker: …”

#### Discover suitable issues
- “Scan this repository for good first issues and rank them by contribution risk.”
- “Find issues in owner/repo that look actionable and not already claimed.”

#### Review a contribution plan
- “I have a proposed fix plan. Pre-flight check it against PR history and issue comments.”
- “Do we have competing work or old rejection feedback that makes this plan risky?”

### Example report

See [examples/sample-report.md](./examples/sample-report.md) for a realistic, clearly labeled illustrative report.

### Tool and auth requirements

This skill prefers existing GitHub tools and access already available in the host environment:
- GitHub issue/PR metadata
- repository files and branch information
- local git metadata when available
- issue comments and public web content when accessible

If GitHub API or CLI access is unavailable, the skill continues using the information that is accessible and clearly reports the confidence reduction and missing evidence.

## Architecture and project organization

The canonical instruction file is [SKILL.md](./SKILL.md). It defines the mission, the required workflow, and the gating logic that must be preserved for valid issue assessment.

Supporting reference documents define the detailed rules used during evaluation:

- [references/preflight-workflow.md](./references/preflight-workflow.md)
- [references/evidence-and-risk-rules.md](./references/evidence-and-risk-rules.md)
- [references/report-schema.md](./references/report-schema.md)
- [references/confidence-gate.md](./references/confidence-gate.md)
- [references/repo-norms.md](./references/repo-norms.md)
- [references/impact-analysis.md](./references/impact-analysis.md)
- [references/counterfactual.md](./references/counterfactual.md)

Together they define the workflow rules, evidence handling, report structure, readiness gates, repository norm checks, impact analysis, and counterfactual reasoning used by the skill.

This repository does not implement a standalone GitHub integration or a self-contained model. It is a skill package used by a host agent. The host agent supplies the model, tools, and permissions available at runtime, and the skill's job is to apply a disciplined pre-flight analysis process to that environment.

The project currently includes:

- [SKILL.md](./SKILL.md) — canonical skill instructions
- [README.md](./README.md) — user-facing explanation and installation guidance
- [examples/sample-report.md](./examples/sample-report.md) — illustrative report example
- [references/](./references) — workflow and evidence rules
- [tests/](./tests) — compatibility checks and evaluation guidance
- [LICENSE](./LICENSE) — MIT license

## Testing and verification

The project includes automated compatibility checks. The current verification status is intentionally narrow and should be interpreted honestly:

- Static compatibility checks: the skill is checked for packaging and directory conventions.
- CLI installation and placement smoke tests: the Skills CLI is used to confirm installation paths.
- Runtime loading by an agent: not confirmed in this repository snapshot.
- Real end-to-end pre-flight analysis: not confirmed here.

The existing automated compatibility check is:

```sh
node --test tests/compatibility.test.mjs
```

This command checks compatibility of the skill package and installation layout. It does not prove that a host agent successfully loaded the skill, selected it correctly, or performed a complete pre-flight analysis on a live repository. The README's compatibility table reflects that distinction.

## Limitations and future improvements

The skill is useful, but it is intentionally bounded by the access and evidence available to the hosting agent.

### Current limitations

- Search can be incomplete if GitHub access is limited, private, or rate-limited.
- Ownership claims must be interpreted in context; they are not guaranteed assignment.
- Old claims may be stale or valid; age alone does not prove abandonment.
- Some issue discussions or PRs may not be discoverable in the environment.
- The skill does not fabricate missing issue details or prior maintainer decisions.
- Installation is not the same as runtime usage. A valid skill installation does not guarantee the agent loads it or that the required GitHub access is available.
- The project does not claim a verified end-to-end live runtime analysis across all supported agents.

### General future improvements

Future work could include broader evaluation scenarios, stronger compatibility testing across agent environments, clearer examples for different repository types, and deeper guidance for uncertain ownership or resolution cases. Those are prospective improvements; they are not claimed as already implemented status.

## Contribution, license, and references

This repository is intended as a reusable skill package. To contribute:
- preserve the pre-flight workflow ordering,
- keep evidence rules explicit,
- do not invent unverified facts,
- and keep the skill portable across repositories.

Evaluation guidance is in [tests/test-cases.md](./tests/test-cases.md) and [tests/evaluation-checklist.md](./tests/evaluation-checklist.md).

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
