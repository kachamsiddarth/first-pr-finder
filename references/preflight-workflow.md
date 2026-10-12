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
- open PRs linked to the issue, including cross-references,
- issue numbers or URLs in PR titles, bodies, and relevant comments,
- linked issues in PR metadata,
- “fixes #123” style references,
- open PRs that edit overlapping files or functions or appear to implement the same behavior, even without an issue reference,
- adjacent issues or related PRs that implement the same behavior.

Do not rely only on titles or closing keywords. A linked PR is evidence of related work, not automatic proof that the issue is taken or duplicated.

For each relevant open PR, record, when available:
- URL and number
- current state and draft status
- author, creation time, and last-update time
- relevant issue references and comments
- changed files or overlapping functions
- the evidence for classifying the relationship as `CONFIRMED_CONFLICT`, `POSSIBLE_CONFLICT`, or `RELATED_NOT_CONFLICTING`

Explain the classification. A `CONFIRMED_CONFLICT` requires evidence that the PR implements substantially the same requested behavior or overlaps the proposed change materially. Similar subject matter alone is only a possible conflict or related work. If metadata is unavailable, mark the field unavailable rather than inferring it. State the searched sources and scope; never claim exhaustive search unless the available coverage supports it.

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
- are there recent commits, branch updates, CI results, or review activity related to the work, where accessible?

For an approximately three-month-old claim, explicitly flag its age as a freshness warning. Check newer issue comments, linked or competing PRs, commits or branch activity, maintainer updates, and other available evidence of continuing work. If no recent activity is found in the sources checked, report the claim as stale or unverified; do not infer abandonment or availability from age or silence. Recommend confirming ownership with the claimant or maintainer before proceeding.

## Step 6: Investigate closed-but-unmerged prior PRs

Search for previous attempts that mention or appear to implement the same issue.

Inspect:
- PR URL, number, author, final state, creation/update/closure timestamps, and changed files, when available
- reviewer comments and requested changes
- whether and how the author addressed each material request
- subsequent commits, review rounds, and CI results where accessible
- actual closure reason and maintainer feedback
- whether the author withdrew the PR or the attempt appears abandoned
- whether the attempt was duplicated or left incomplete
- any replacement PR, merged change, or follow-up issue

Classify the attempt, based on evidence, as one of:
- rejected with actionable feedback
- abandoned or withdrawn
- superseded
- duplicated
- incomplete
- closed without sufficient explanation
- resolved through another change
- unknown

Do not label every closed PR as rejected. Record which requested changes were addressed, which remain unresolved, and the evidence for the actual closure classification. If review history, commits, CI, or closure reason cannot be accessed, mark that limitation and use `unknown` where it prevents a reliable classification.

## Step 7: Detect resolved or already-addressed issues

Where tools and permissions permit, search for:
- linked merged PRs that close or resolve the issue,
- unlinked merged PRs that implement the requested behavior or same fix,
- replacement PRs,
- follow-up issues that clarify, replace, or supersede the request,
- relevant commits and current repository code.

Compare merged changes and current code with the issue's requested behavior. A merged PR or closed issue alone is not proof that the problem is technically resolved. If a search cannot be performed, say which source was unavailable; do not imply the check passed. Do not recommend reimplementing the same fix when sufficient evidence shows it is already present. Recommend verifying the current code or identifying a remaining unmet acceptance criterion instead.

## Step 8: Determine verdict and next action

After collecting the evidence, assign one verdict:
- `AVAILABLE`
- `POTENTIALLY_CLAIMED`
- `ACTIVE_WORK`
- `PREVIOUSLY_REJECTED`
- `ALREADY_RESOLVED`
- `UNKNOWN`

Apply the status definitions and mandatory decision gates in `references/evidence-and-risk-rules.md`. The verdict must include the evidence, source URLs, relevant timestamps, search coverage and limitations, confidence, conflicts, and next action.

At minimum:
- `AVAILABLE`: state what was checked, coverage limits, and why available evidence supports proceeding.
- `POTENTIALLY_CLAIMED`: describe the uncertainty; recommend checking with the claimant or maintainer before overlapping work.
- `ACTIVE_WORK`: do not recommend silently competing; require coordination or clarification first.
- `PREVIOUSLY_REJECTED`: identify documented feedback and what a new attempt must change; do not treat the issue as automatically available or permanently blocked.
- `ALREADY_RESOLVED`: do not recommend reimplementing the same fix; explain supporting evidence and suggest verification or investigation of remaining unmet behavior.
- `UNKNOWN`: disclose missing or incomplete evidence; do not assert availability or resolution.

## Decision gate

The pre-flight investigation and verdict must be complete before giving a definitive implementation blueprint. For `ACTIVE_WORK`, `POTENTIALLY_CLAIMED`, and `ALREADY_RESOLVED`, do not present overlapping implementation as an uncomplicated next step: apply the relevant gate above first. For `UNKNOWN`, limit guidance to the smallest action that resolves uncertainty. A user may explicitly request further exploratory planning despite a warning, but preserve the warning and do not represent the work as clear to implement.

This is the hard boundary between issue analysis and patch planning.
