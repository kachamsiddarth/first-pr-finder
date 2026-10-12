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
- search coverage
- recommended next action

Allowed verdict statuses:
- `AVAILABLE`
- `POTENTIALLY_CLAIMED`
- `ACTIVE_WORK`
- `PREVIOUSLY_REJECTED`
- `ALREADY_RESOLVED`
- `UNKNOWN`

## 3. Ownership and Existing Work

Required fields:
- open linked or competing PRs
- ownership claims and timestamps
- claim freshness and subsequent activity
- previous closed-but-unmerged PRs
- review feedback and closure reasons
- duplicate and already-resolved evidence

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

## 11. Remaining Unknowns

Required fields:
- unanswered questions
- inaccessible evidence
- assumptions requiring validation

## Rules for missing or unverified information

If a section cannot be verified, say so explicitly. Never replace unknowns with guessed values. The skill should preserve uncertainty instead of manufacturing certainty.
