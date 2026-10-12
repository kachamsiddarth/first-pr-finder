# Report schema

Every full issue analysis must include the following sections exactly or conceptually, even when some items are described as unknown or unverified.

## 1. Issue Overview

Required fields:
- issue identifier and title
- repository
- verification outcome: issue verified, confirmed nonexistent, or inaccessible/ambiguous; cite the source and distinguish not-found evidence from access failure
- issue state and closure metadata when available
- problem summary
- expected behavior
- acceptance criteria
- ambiguities

If the issue is confirmed nonexistent, state that issue-specific analysis stopped. If inaccessible, record the access limitation and do not present issue details as verified. For a closed issue, include the closure context and resolution/rejection investigation; closed state alone is not a resolution verdict.

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
- file classification: `TOUCH`, `MAYBE`, `DON'T-TOUCH`, or `UNKNOWN`
- confidence
- proposed change
- rationale
- evidence

The file-plan table must include the classification for every listed file. Include at least the applicable categories among `TOUCH`, `MAYBE`, `DON'T-TOUCH`, and `UNKNOWN`; do not invent a file solely to fill a category. A category may be omitted only when no file genuinely meets it, with that absence stated. For each row, provide evidence and rationale appropriate to its category: necessity for `TOUCH`, unresolved possibility for `MAYBE`, inspected basis for exclusion for `DON'T-TOUCH`, and the missing evidence/verification action for `UNKNOWN`.

A table is recommended. `TOUCH` means supported as needed for the recommended approach; `MAYBE` means plausible but unverified; `DON'T-TOUCH` requires evidence that the file is unrelated or unnecessary; use `UNKNOWN` when access or dependency evidence is insufficient. Separate required edits from optional improvements.

## 6. Implementation Sequence

Required fields:
- ordered, actionable steps
- dependencies between steps

Only provide implementation steps when the issue verdict and readiness gates permit them. For `ACTIVE_WORK`, `ALREADY_RESOLVED`, `UNKNOWN`, or material `POTENTIALLY_CLAIMED` cases, give only the appropriate coordination, verification, or clarification steps; do not disguise a blocked implementation plan as an implementation sequence.

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
- official mandatory requirements and recommendations, each with source path/section and applicability
- historical maintainer patterns in a separate table, with relevant PR URLs, actual sample size, selection limits, confidence, and explicit statement that patterns are not requirements
- inaccessible or absent sources

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

Required fields:
- Five dimensions—Issue clarity, Code evidence, Testability, Repository compliance, Conflicting work—each rated `VERIFIED`, `PARTIAL`, `UNKNOWN`, or `BLOCKED`, with concise evidence and limitations.
- Overall result: `GO`, `GO WITH ASSUMPTIONS`, `NEEDS CLARIFICATION`, or `BLOCKED`.
- Any assumptions, why they are safe or material, what would change the result, and the next action.

Apply `references/confidence-gate.md`. Do not average away serious blockers. The readiness result is distinct from the issue-status verdict and cannot override it.

Apply these gates: `ALREADY_RESOLVED` must not lead to a recommendation to reimplement the same fix; `ACTIVE_WORK` requires coordination or clarification before overlapping work; `POTENTIALLY_CLAIMED` requires communicating the uncertainty and checking with the claimant or maintainer; `PREVIOUSLY_REJECTED` requires explaining what must change; `UNKNOWN` must not assert availability or resolution; `AVAILABLE` must state checked sources and coverage limits.

## 11. Remaining Unknowns

Required fields:
- unanswered questions
- inaccessible evidence
- assumptions requiring validation

## 12. Planning-readiness evidence

Required content:
- the five dimension ratings and evidence, as described in Section 10
- actual repository/test discovery scope
- any issue interpretation that requires maintainer/user clarification

Do not treat supplied issue text as independently verified metadata. Keep fact, inference, and user-provided context distinct.

## 13. Repository norms

Required fields:
- official written requirements versus recommendations, each linked to its repository source
- historical patterns separately, with PR examples, sample size/selection method, confidence, and limitations
- explicit `UNKNOWN` for inaccessible history or rules

Historical patterns are not binding requirements. Up to 30 recent relevant merged PRs may be sampled where accessible; disclose the actual count. Fewer than five relevant examples means historical confidence is `LOW`.

## 14. Dependency and regression impact

Include a scoped check for applicable classes: shared contracts/types; callers/consumers; data/migrations; config/environment/flags; generated code; reusable implementations/dependencies; public API/compatibility; error handling/side effects. Each class is `FOUND`, `RULED OUT`, or `UNKNOWN` with evidence and rationale.

For each material trap, state consequence, mitigation/test, confidence, and uncertainty. Include a regression blast-radius table with affected consumer, evidence/dependency path, possible regression, severity/likelihood rationale, recommended test/mitigation, and confidence. State dynamic/reflection, external-service, generated-code, or access limitations where relevant.

## 15. Counterfactual approach comparison

Compare materially distinct approaches when plausible. For each, summarize acceptance-criteria fit, files/components affected, compatibility and regression risks, testing, repo-norm fit, and assumptions. Recommend the smallest approach that fully satisfies verified requirements; cite why alternatives were rejected or why only one is reasonable. State what evidence could change the recommendation. If ambiguity changes the approach, use `NEEDS CLARIFICATION`.

## 16. File map

List relevant inspected and candidate files under `TOUCH`, `MAYBE`, `DON'T-TOUCH`, or `UNKNOWN`, with evidence and rationale. Coordinate the map with the recommended approach and impact analysis. Never label a file `DON'T-TOUCH` solely because it was not investigated.

## 17. Merge risk

Assess plan conformity separately for each applicable official norm or historical pattern as `MET`, `GAP`, or `UNKNOWN`, with evidence. Provide overall merge risk `LOW`, `MEDIUM`, `HIGH`, or `UNKNOWN`, rationale, confidence, and limitations. Do not give acceptance probabilities or conflate merge risk with issue availability, readiness, or technical correctness.

## Rules for missing or unverified information

If a section cannot be verified, say so explicitly. Never replace unknowns with guessed values. The skill should preserve uncertainty instead of manufacturing certainty.
