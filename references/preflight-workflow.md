# Pre-flight workflow

This reference defines the mandatory ownership-detection and competing-work sequence that must run before a definitive implementation plan is produced.

## Step 1: Confirm the target

Before any repository read, establish:
- the issue or issue number,
- the repository,
- the relevant context from the user or conversation,
- any missing piece required to proceed.

If the repository or issue cannot be identified, ask a concise clarification question and stop.

## Step 2: Inspect repository context

Read only the files needed to answer the real question:
- root README and CONTRIBUTING guidelines,
- any AGENTS.md files in the repo or relevant subdirectories,
- package manifests and lockfiles,
- test configuration and CI workflows,
- issue and PR templates,
- architectural docs if directly relevant.

This stage narrows the code path and the required norm checks, but it should never replace issue-specific evidence gathering.

## Step 3: Search for linked or competing work

Search for:
- issue references in PR titles and bodies,
- linked issues in PR metadata,
- “fixes #123” style references,
- PRs that edit overlapping files or functions,
- adjacent issues or related PRs that implement the same behavior.

Do not rely only on titles or closing keywords. A linked PR is evidence of related work, not automatic proof that the issue is taken or duplicated.

## Step 4: Inspect issue comments for ownership claims

Look for explicit or implicit ownership language such as:
- “I’ll take this.”
- “I’m working on this issue.”
- “I have a branch for this.”
- “I’ll submit a PR.”

For each candidate claim, record:
- author
- timestamp
- comment URL
- claim type
- whether there is a follow-up comment
- whether a maintainer acknowledged or assigned the issue
- whether a PR or branch exists
- confidence level

Only treat a claim as strong evidence when it is accompanied by relevant subsequent activity or maintainer acknowledgment.

## Step 5: Evaluate freshness and subsequent activity

A claim must not be treated as stale solely because it is old. Use actual timestamps and review the full context:
- did the claimant post a follow-up?
- did maintainers acknowledge or reassign the issue?
- was a PR created or updated?
- did the CI or review activity continue?

If the issue depends only on an old claim without recent activity, report it as stale or unverified and recommend confirming ownership before proceeding.

A claim around three months old is a freshness warning, not automatic abandonment.

## Step 6: Investigate closed-but-unmerged prior PRs

Search for previous attempts that mention or appear to implement the same issue.

Inspect:
- PR title and URL
- author and timestamps
- changed files
- review comments
- closure reason
- maintainer feedback
- CI failures if accessible
- whether the author withdrew it
- whether a different PR superseded it

Classify prior attempts carefully:
- rejected with actionable feedback
- closed without explanation
- withdrawn
- superseded
- resolved elsewhere
- unknown

Do not assume every closed PR equates to rejection.

## Step 7: Detect resolved or already-addressed issues

Look for evidence that the reported problem is already handled by:
- merged PRs linked to the issue,
- a later commit implementing the same behavior,
- a replacement PR,
- a closed issue with a clear technical resolution,
- code that no longer reproduces the problem.

A closed issue is not always a technically resolved issue. Distinguish the two.

## Step 8: Determine verdict and next action

After collecting the evidence, assign one verdict:
- `AVAILABLE`
- `POTENTIALLY_CLAIMED`
- `ACTIVE_WORK`
- `PREVIOUSLY_REJECTED`
- `ALREADY_RESOLVED`
- `UNKNOWN`

Then recommend the smallest next action:
- proceed with verification and code inspection,
- clarify ownership before overlapping,
- avoid duplication because active work exists,
- adjust the plan based on prior rejection,
- verify the current code before implementing,
- gather missing evidence before deciding.

## Decision gate

Do not continue to a definitive implementation blueprint until the verdict is written and the evidence is recorded.

This is the hard boundary between issue analysis and patch planning.
