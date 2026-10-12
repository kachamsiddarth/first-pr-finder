# Pre-flight workflow

This reference defines the mandatory ownership-detection and competing-work sequence that must run before a definitive implementation plan is produced.

## Step 1: Confirm the target

Before any repository read, establish:
- the issue or issue number,
- the repository,
- the relevant context from the user or conversation,
- any missing piece required to proceed.

If the repository or issue cannot be identified, ask a concise clarification question and stop.

### Verify issue existence, access, and state

- Verify the repository identity and issue using available authorized sources before treating an issue as nonexistent.
- If an authoritative response confirms that the issue does not exist, report the failed target verification and stop issue-specific analysis. Do not infer a six-verdict issue status about a nonexistent target; if the report format requires one, use `UNKNOWN` and explicitly say the target itself was not found.
- Distinguish a confirmed nonexistent issue from an inaccessible issue. Permission errors, authentication failures, rate limits, network errors, unavailable tools, and ambiguous responses establish an access limitation, not nonexistence. Report which source failed and request accessible issue text/access when needed. Use `UNKNOWN` when that missing evidence prevents a defensible status; never invent issue facts.
- For a closed issue, record its state and closure metadata when available, then investigate linked and unlinked merged PRs, current code, replacement PRs, follow-up issues, prior attempts/review feedback, and the recorded closure reason. A closed state alone does not establish resolution, rejection, abandonment, or lack of actionability.
- Assign `ALREADY_RESOLVED` only when evidence shows the requested behavior is implemented. Assign `PREVIOUSLY_REJECTED` only when accessible feedback supports substantive rejection or unresolved concerns. If the closure reason or technical outcome is unavailable or inconclusive, use `UNKNOWN` when material, state the limitation, and do not recommend a duplicate implementation.
- Keep the six issue-status values unchanged; existence/access/state findings are evidence and input-validation outcomes, not additional verdicts.

### Input and discovery bounds

- For a specific issue, verify the repository and issue from available sources. A user-provided issue description is context, not independently verified GitHub metadata.
- For issue discovery, retrieve at most 30 open issues in a pass and return a shortlist of at most 5. State filters, pages, sort/order if exposed, and any truncation or inaccessible pages. Do not imply repository-wide exhaustive coverage.
- Rank candidates with explicit criteria: issue clarity, likely scope, testability, dependencies, repo requirements, and lightweight duplicate/ownership/resolution signals. Labels such as `good first issue` are clues, not proof of suitability.
- Before recommending a discovered issue, perform the full issue-specific pre-flight in this document. If the user has not selected a candidate, provide a shortlist rather than a definitive implementation plan.
- For review of an existing plan, identify the target repo/issue if available; check the same mandatory pre-flight. Mark ungrounded plan assumptions instead of silently treating them as facts.

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

## Planning stages after the pre-flight verdict

Do not collapse the following planning-readiness analysis into the six issue-status verdicts. Continue only after the issue verdict and its gate are recorded.

### Step 9: Rate planning readiness

Use `references/confidence-gate.md` to rate Issue clarity, Code evidence, Testability, Repository compliance, and Conflicting work as `VERIFIED`, `PARTIAL`, `UNKNOWN`, or `BLOCKED`. Then choose `GO`, `GO WITH ASSUMPTIONS`, `NEEDS CLARIFICATION`, or `BLOCKED`. Apply non-averaging rules: a positive result cannot erase active overlap, confirmed resolution, or a material unknown. If clarification is needed, ask one focused question; do not make a definitive plan dependent on an unstated assumption.

### Step 10: Establish the issue-to-code path and test commands

Extract the reported problem, expected behavior, acceptance criteria, reproduction steps, labels, and ambiguities. Inspect only likely paths, relevant symbols, callers, and tests. Separate required changes from optional improvements. Discover commands from manifests, test configuration, CI, Makefiles, and documentation; report source and actual execution status. A command not run may be `RECOMMENDED` or `BLOCKED`, never `PASSED` or `FAILED`.

### Step 11: Extract norms

Follow `references/repo-norms.md`. Report official written requirements independently from historical patterns. When history is accessible, sample up to 30 recent merged PRs relevant to the likely change, record actual sample size and selection limits, and cite examples. Fewer than five relevant PRs means historical-pattern confidence is `LOW`; one PR cannot establish a general preference. Never elevate a historical pattern to a repository requirement.

### Step 12: Analyze dependency traps and regressions

Follow `references/impact-analysis.md`. Check only plausible areas: shared contracts/types, callers/consumers, data/migrations, config/flags, generated code, reusable implementations/dependencies, public API/compatibility, and error handling/side effects. Classify each applicable check `FOUND`, `RULED OUT`, or `UNKNOWN`. Trace affected consumers and state regression severity/likelihood rationale, mitigation/test, and confidence. Document limitations such as dynamic loading, reflection, external services, and inaccessible code.

### Step 13: Compare approaches and map files

Follow `references/counterfactual.md`: compare real alternatives where plausible, recommend the smallest approach that satisfies the verified criteria, and explain rejected alternatives or why only one is viable. Map files as `TOUCH`, `MAYBE`, `DON'T-TOUCH`, or `UNKNOWN`; justify each with code/dependency evidence. Use `DON'T-TOUCH` only when inspection supports exclusion.

### Step 14: Assess merge risk and report

Assess merge risk separately from issue ownership, readiness, and technical correctness. Compare the proposed plan to official norms and historical observations using `MET`, `GAP`, or `UNKNOWN`; choose `LOW`, `MEDIUM`, `HIGH`, or `UNKNOWN` with rationale and confidence. Do not predict acceptance probability.

Use the full report schema. Include issue-status verdict, readiness dimensions/result, contribution norms, impact and regression tables, counterfactual comparison, file map, merge risk, test strategy, and remaining unknowns. Preserve warnings and distinguish verified facts, inference, user-provided context, and inaccessible evidence.
