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

Use age as a warning signal when the claim is old and there is no follow-up. A claim around three months old should trigger a freshness warning, but it should not automatically be declared stale or abandoned without additional evidence.

The skill should therefore evaluate:
- later comments,
- maintainer acknowledgments,
- linked PRs,
- branch or code activity,
- any explicit statement that work is paused or reassigned.

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
