# Counterfactual implementation comparison

Before finalizing the minimal file-change plan, compare materially different implementation approaches when plausible alternatives exist. This is analysis only; do not modify the target repository.

## Approach generation

- Describe at least two genuinely distinct approaches when evidence supports alternatives (for example, a local behavior fix versus a shared contract change).
- Do not manufacture a weak alternative to satisfy a count.
- If only one approach is reasonable, state why alternatives fail acceptance criteria, violate an official rule, or are unsupported by code evidence.
- Carry the current pre-flight verdict, readiness result, repository norms, and impact analysis into the comparison. This comparison cannot override an active-work, resolution, or ownership gate.

## Compare each plausible approach

Evaluate:

- correctness against verified issue behavior and acceptance criteria
- files and components affected, including required versus optional changes
- dependency, regression, and compatibility risk
- tests needed and whether a real test command/path is known
- compliance with official repo rules and consistency with clearly labeled historical patterns
- implementation complexity and maintenance cost
- assumptions and evidence gaps

Use evidence citations for factual claims. Mark estimates and unverified relationships as inference or unknown.

## Recommendation

Recommend the smallest approach that fully satisfies the issue, not merely the approach with the fewest changed lines. Explain:

- recommended approach and why it meets the requirements
- why the alternative(s) were rejected or remain viable
- assumptions and risks
- what additional evidence would change the recommendation

If materially different interpretations of the issue lead to different approaches, do not choose silently. Apply `NEEDS CLARIFICATION` under `references/confidence-gate.md` and ask one focused question.
