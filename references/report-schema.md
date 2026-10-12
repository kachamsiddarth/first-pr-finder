# Report schema

Every full issue analysis must include the following sections exactly or conceptually, even when some items are described as unknown or unverified.

## 1. Issue Overview

Required fields:
- issue identifier and title
- repository
- problem summary
- expected behavior
- acceptance criteria
- ambiguities

## 2. Pre-flight Verdict

Required fields:
- status
- confidence
- evidence and links
- relevant timestamps
- search coverage
- coverage limitations
- identified conflicts or uncertainty
- recommended next action

Allowed verdict statuses:
- `AVAILABLE`
- `POTENTIALLY_CLAIMED`
- `ACTIVE_WORK`
- `PREVIOUSLY_REJECTED`
- `ALREADY_RESOLVED`
- `UNKNOWN`

Use the evidence-based definitions and mandatory decision gates in `references/evidence-and-risk-rules.md`. `UNKNOWN` is required when accessible evidence is insufficient, inaccessible, contradictory, or too incomplete to justify another status. Do not infer `AVAILABLE` from a lack of search results when coverage is inadequate.

## 3. Ownership and Existing Work

Required fields:
- open linked or competing PRs, each with available:
  - PR URL and number
  - current state and draft status
  - author
  - creation and last-update timestamps
  - relevant issue references and comments, with URLs/timestamps when available
  - changed files or overlapping functions
  - relationship classification: `CONFIRMED_CONFLICT`, `POSSIBLE_CONFLICT`, or `RELATED_NOT_CONFLICTING`
  - evidence and rationale for that classification
- searched PR/comment sources and coverage limitations; do not imply exhaustive search without supporting coverage
- ownership claims and timestamps
- claim freshness and subsequent activity
- previous closed-but-unmerged PRs
- reviewer requests, whether each material request was addressed, subsequent commits/review rounds/CI where accessible, actual closure reason, and any replacement PR
- prior-attempt classification: rejected, abandoned/withdrawn, superseded, duplicated, incomplete, closed without sufficient explanation, resolved through another change, or unknown
- duplicate and already-resolved evidence

For ownership claims, include the author's username, exact comment URL, timestamp, claim interpretation, freshness (`CURRENT`, `STALE_OR_UNVERIFIED`, or `AMBIGUOUS` when supported), subsequent activity, and any maintainer acknowledgment or assignment. An approximately three-month-old claim must carry a freshness warning and must not alone establish abandonment or availability.

For resolution checks, report searches for linked merged PRs, unlinked merged PRs implementing the same behavior, replacement PRs, follow-up issues, relevant commits, and current code where tools permit. Mark unavailable checks and their impact explicitly.

## 4. Code-Path Analysis

Required fields:
- relevant components
- execution or dependency path
- source evidence

## 5. Minimal File-Change Plan

Required fields:
- file path
- confidence
- proposed change
- rationale
- evidence

A table is recommended.

## 6. Implementation Sequence

Required fields:
- ordered, actionable steps
- dependencies between steps

## 7. Testing Strategy

Required fields:
- discovered commands
- command sources
- execution status
- recommended order

Allowed execution statuses:
- `RECOMMENDED`
- `PASSED`
- `FAILED`
- `BLOCKED`

## 8. Contribution Requirements

Required fields:
- mandatory PR conventions
- repository-specific requirements
- recommendations
- source paths

## 9. Risk Register

Required fields:
- risk item
- severity
- evidence
- impact
- mitigation

Allowed severities:
- `LOW`
- `MEDIUM`
- `HIGH`
- `UNKNOWN`

## 10. Final Readiness Assessment

Required values:
- `READY TO IMPLEMENT`
- `NEEDS CLARIFICATION`
- `BLOCKED`

The verdict should connect directly to the pre-flight status and evidence quality.

Apply these gates: `ALREADY_RESOLVED` must not lead to a recommendation to reimplement the same fix; `ACTIVE_WORK` requires coordination or clarification before overlapping work; `POTENTIALLY_CLAIMED` requires communicating the uncertainty and checking with the claimant or maintainer; `PREVIOUSLY_REJECTED` requires explaining what must change; `UNKNOWN` must not assert availability or resolution; `AVAILABLE` must state checked sources and coverage limits.

## 11. Remaining Unknowns

Required fields:
- unanswered questions
- inaccessible evidence
- assumptions requiring validation

## Rules for missing or unverified information

If a section cannot be verified, say so explicitly. Never replace unknowns with guessed values. The skill should preserve uncertainty instead of manufacturing certainty.
