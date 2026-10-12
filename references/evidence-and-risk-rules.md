# Evidence and risk rules

This document defines the evidence standards and risk taxonomy used by the skill.

## Evidence standards

Every claim must be traceable to one of the following:
- issue or PR metadata,
- issue comments,
- repository files,
- commit history or local repo state,
- tests or CI output,
- documentation and repo conventions,
- explicit user context.

Evidence must be separated from inference. When a statement is a conclusion, clearly label it as such.

## Required confidence labels

Use the following confidence labels consistently:
- `HIGH`
- `MEDIUM`
- `LOW`
- `INSUFFICIENT`

Confidence reflects evidence quality and search coverage, not subjective certainty.

Examples:
- `HIGH`: issue, PR, and comments are accessible and consistent.
- `MEDIUM`: multiple clues exist, but some evidence is missing or indirect.
- `LOW`: only weak or partial signals are available.
- `INSUFFICIENT`: accessible evidence is too sparse to draw a conclusion.

## Search limitations

If the search or access was partial, say so explicitly. Do not claim exhaustive detection if the environment only inspected a subset of the repository or GitHub data.

A search limitation may arise from:
- rate limits,
- missing auth,
- unavailable CLI access,
- private repo restrictions,
- incomplete issue/comment visibility,
- limited local repo history.

## Claim-age interpretation

Age alone does not prove abandonment.

An ownership claim approximately three months old must trigger an explicit stale-claim freshness warning. This warning is not proof of abandonment and does not make the issue available.

The skill should therefore evaluate:
- later comments,
- maintainer acknowledgments,
- linked PRs,
- commits or branch/code activity,
- recent review rounds or CI activity,
- any explicit statement that work is paused or reassigned.

If these sources cannot be checked, report the limitation and keep the ownership status uncertain.

## Pre-flight verdict definitions and decision gates

Use exactly one of the following verdicts. Choose it from the evidence actually inspected, not from the issue's age, labels, or closed/open state alone.

### `AVAILABLE`

Use only when the relevant accessible sources checked show no significant competing implementation, current ownership claim, actionable unresolved prior rejection, or evidence sufficient to classify the issue as already resolved. This is not a guarantee that no work exists or that maintainers will accept a contribution.

**Required action:** State which sources were checked, their coverage limits, and why the evidence supports this status. A definitive implementation plan may follow only after this explanation.

### `POTENTIALLY_CLAIMED`

Use when an ownership claim, assignment, or related signal exists but current ownership or active implementation is uncertain. This includes stale or unverified claims that have not been explicitly abandoned or reassigned.

**Required action:** Explain the claim and uncertainty, including its timestamp and subsequent activity. Recommend checking with the claimant or maintainer before overlapping work. Do not label the issue available based only on age or silence.

### `ACTIVE_WORK`

Use when current evidence indicates an active contributor, assigned work, or open PR that materially overlaps the issue.

**Required action:** Identify the evidence and overlap. Do not recommend silently competing with the contributor. Recommend coordination or maintainer clarification before implementation planning. A clearly non-overlapping contribution may be considered only after the distinction is supported by evidence.

### `PREVIOUSLY_REJECTED`

Use when a prior implementation was not merged and accessible evidence shows substantive rejection or unresolved review concerns relevant to a new attempt. A closed PR with no explanation is not sufficient by itself.

**Required action:** Summarize the review feedback, whether requested changes were addressed, and which concerns remain. State what must change for a viable new attempt. This status describes the prior attempt; it does not automatically mean a new contribution is impossible or that the issue is available.

### `ALREADY_RESOLVED`

Use when sufficient evidence indicates the requested behavior is already implemented or the reported problem no longer applies. Prefer confirming evidence from a merged fix and current code; an issue's closed state alone is insufficient.

**Required action:** Cite the fixing PR/commit or current code evidence. Do not recommend reimplementing the same fix. Recommend verifying the current behavior, checking for an unmet acceptance criterion, or investigating a distinct follow-up.

### `UNKNOWN`

Use when evidence is insufficient, inaccessible, contradictory, or too incomplete to justify any other verdict. This includes cases where critical sources (such as issue comments or relevant PR history) could not be checked and no other evidence resolves the uncertainty.

**Required action:** Name the missing sources and impact on confidence. Do not assert that the issue is available, actively claimed, rejected, or resolved. Recommend the smallest step to obtain the missing evidence.

### Choosing between prior rejection and a new opportunity

Distinguish the historical outcome from present actionability. If actionable review feedback remains unresolved, use `PREVIOUSLY_REJECTED` and explain what a new attempt must do differently. If the feedback was addressed or a new attempt can clearly address it, state that evidence and the remaining opportunity; do not misrepresent the old PR as an active conflict or assume its closure makes the issue available. If the closure and review outcome cannot be established, use `UNKNOWN` or describe the prior attempt as unclassified.

## Open-PR conflict evidence

For each relevant open PR, report available URL/number, state and draft status, author and timestamps, issue references/comments, changed files or overlapping functions, and a reasoned relationship classification: confirmed conflict, possible conflict, or related but non-conflicting. Missing metadata must be marked unavailable. Do not claim exhaustive coverage unless the sources and search scope support it.

## Risk severity definitions

Use these risk levels for the risk register:
- `LOW`
- `MEDIUM`
- `HIGH`
- `UNKNOWN`

Risk severity should reflect:
- evidence strength,
- impact on contribution feasibility,
- likely project rejection or overlap,
- the magnitude of regression or compatibility risk.

Examples:
- `HIGH`: active competing implementation or prior rejection with unresolved concerns.
- `MEDIUM`: likely overlap or unclear contribution rules.
- `LOW`: minor ambiguity or manageable scope risk.
- `UNKNOWN`: there is insufficient evidence to assess the risk.

## Prohibited practices

The skill must not:
- claim tests passed without execution evidence,
- invent review feedback or maintainer decisions,
- suppress warnings when pre-flight signals are present,
- treat every old claim as abandonment,
- treat closed PRs as rejected without checking the actual closure reason,
- assume a repo or issue is resolved simply because it is closed,
- fabricate files or code paths that were not actually inspected.

## Pre-flight caution principle

If the evidence suggests a claim, duplicate, or rejection risk, the report should clearly preserve that warning and explain the risk before recommending implementation.

This is a core safety rule of the skill.
