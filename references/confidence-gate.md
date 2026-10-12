# Planning-readiness gate

This gate is separate from the six pre-flight issue-status verdicts. It assesses whether there is enough issue, code, test, and repository evidence to produce a useful minimal plan. It does not declare whether an issue is claimed or resolved.

## Dimension statuses

Rate each dimension `VERIFIED`, `PARTIAL`, `UNKNOWN`, or `BLOCKED`. Cite evidence and state missing facts. Do not assign a positive status merely because no contrary evidence was found.

| Dimension | `VERIFIED` | `PARTIAL` | `UNKNOWN` | `BLOCKED` |
|---|---|---|---|---|
| **Issue clarity** | Requested behavior and acceptance criteria are sufficiently clear to distinguish success from failure. | Core intent is clear but a non-critical detail remains. | Issue text/context or requirements cannot be verified. | Materially different reasonable interpretations would require different implementations and cannot safely be assumed. |
| **Code evidence** | Relevant implementation path and symbols were inspected and directly support the proposed change. | Likely code path identified, but some relevant code or relationship is unverified. | Repository/source access is unavailable or evidence is too sparse. | The issue's stated behavior cannot be mapped to the accessible code, or a confirmed architectural constraint prevents the proposed direction. |
| **Testability** | A relevant existing test path and real test command are identified, or a concrete test can be specified from project conventions. | A test strategy is plausible, but command/environment/coverage needs verification. | Test config or behavior is inaccessible. | No safe or meaningful verification path exists for a material behavior change, and this blocks a responsible plan. |
| **Repository compliance** | Applicable official instructions and relevant conventions were checked and the plan can comply. | Some applicable rules are unavailable or only partially checked. | Repository rules or relevant project context could not be accessed. | A confirmed official rule conflicts with the proposed approach and no compliant alternative is established. |
| **Conflicting work** | Relevant ownership/PR/resolution searches have adequate documented coverage and no unresolved material conflict was found. | Some conflict signals or search limitations remain, but their impact is bounded. | Search/access is too incomplete to determine conflict status. | Confirmed active overlapping work, ownership conflict, or existing resolution blocks an uncoordinated overlapping plan. |

An inaccessible source is not automatically proof of a blocker. Use `UNKNOWN` when its absence creates uncertainty; use `BLOCKED` only when a verified constraint prevents safe planning.

## Overall readiness result

Choose exactly one:

- `GO`: All material dimensions are `VERIFIED`, or any `PARTIAL` dimension is demonstrably non-material. No serious blocker or unresolved ownership/resolution conflict exists.
- `GO WITH ASSUMPTIONS`: The issue is actionable and no `BLOCKED` dimension exists; remaining uncertainty is narrow, explicitly stated, safe, limited, reversible, and does not alter the core behavior, affected contract, compatibility, or test expectations. State the assumption, impact if wrong, and evidence that would change the plan.
- `NEEDS CLARIFICATION`: Material ambiguity exists, especially where two plausible interpretations yield different behavior, files, compatibility requirements, or tests. Ask one focused question and name which planning decisions it blocks. Continue only safe read-only investigation.
- `BLOCKED`: A confirmed serious constraint prevents a responsible plan (for example, an unresolved `ACTIVE_WORK` conflict for overlapping changes, `ALREADY_RESOLVED` for the same fix, a confirmed official-rule conflict without an alternative, or a required dependency/environment that cannot be accessed).

## Non-averaging and status interaction rules

1. Never average dimensions or count positive dimensions against a serious blocker. One material `BLOCKED` dimension makes overall readiness `BLOCKED`.
2. `UNKNOWN` is not automatically `BLOCKED`; determine whether the missing evidence changes the implementation decision. Materially insufficient conflict evidence must remain `UNKNOWN` as the issue verdict and cannot yield `GO`.
3. `ACTIVE_WORK` requires coordination or maintainer clarification before proposing overlapping implementation. Until then, readiness is `BLOCKED` for that overlapping plan. Non-overlapping investigation may continue if evidence establishes the distinction.
4. `ALREADY_RESOLVED` blocks a plan to reimplement the same fix. Readiness is `BLOCKED` for that duplicate plan; a distinct unmet requirement can be assessed separately with evidence.
5. `POTENTIALLY_CLAIMED` is not automatically a blocker, but readiness cannot be `GO` for overlapping work until ownership uncertainty is resolved. Use `NEEDS CLARIFICATION` or `BLOCKED` according to whether a focused ownership question can resolve the uncertainty.
6. `PREVIOUSLY_REJECTED` can proceed only if the report identifies which feedback remains, what a new attempt changes, and why it is viable. Otherwise use `NEEDS CLARIFICATION` or `BLOCKED`.
7. `UNKNOWN` cannot yield `GO` if the missing evidence is material to ownership, resolution, scope, or safety. Do not convert it to `AVAILABLE` through optimistic assumptions.
8. `AVAILABLE` is an issue-status verdict, not a readiness result. It still requires adequate evidence for issue clarity, code path, tests, and repository compliance.

## Decision procedure

1. Complete the pre-flight issue-status verdict first.
2. Rate all five dimensions with concise evidence and limitations.
3. Apply the non-averaging and status interaction rules.
4. Select the overall result.
5. If `NEEDS CLARIFICATION`, ask one focused question; state which assumptions would be unsafe and which read-only checks can continue.
6. Reassess after new evidence (including code-path/impact analysis) if that evidence changes a dimension. Do not silently upgrade status.

The readiness gate authorizes a planning recommendation only. It does not authorize repository edits, branch creation, commits, comments, or pull requests.
