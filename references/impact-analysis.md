# Dependency and regression impact analysis

Perform a scoped, read-only analysis of the issue's likely code path. Inspect only components plausibly affected by the requested behavior; do not conduct a repository-wide architecture survey without a concrete reason.

## Dependency and compatibility traps

For each applicable area, classify the check as `FOUND`, `RULED OUT`, or `UNKNOWN`:

1. Shared types, schemas, and API contracts.
2. Callers, imports, consumers, and downstream components.
3. Database schemas, persisted data, migrations, and backfills.
4. Configuration defaults, validation, environment variables, and feature flags.
5. Generated code and source generators.
6. Existing equivalent implementations, abstractions, or dependencies.
7. Public interfaces, supported versions, serialization, and backward compatibility.
8. Error handling and important side effects.

Use `RULED OUT` only when inspected evidence supports that no material concern exists in the relevant scope. If the relevant caller, generator, config, migration, or external consumer cannot be checked, use `UNKNOWN` and explain why.

For every `FOUND` or material `UNKNOWN` trap, report:

`Trap/status | Relevant symbol/file/interface | Evidence/dependency path | Failure or compatibility consequence | Mitigation/test | Confidence/remaining uncertainty`

Do not recommend changing every related location. Name a required change only when evidence shows it is necessary; otherwise mark it optional, investigate, or ruled out.

## Regression blast radius

Trace, where applicable:

1. The likely changed function, symbol, configuration, data shape, or contract.
2. Direct callers, imports, consumers, and downstream components.
3. Shared state, data flow, persistence, integration points, and side effects.
4. Existing tests along those paths and important missing coverage.

Report a compact table:

`Affected component/consumer | Evidence and dependency path | Potential regression | Severity and likelihood rationale | Recommended test/mitigation | Confidence`

Severity uses `LOW`, `MEDIUM`, `HIGH`, or `UNKNOWN`. Explain likelihood from evidence; do not present a speculative effect as confirmed. Recommend the narrowest test that exercises the affected behavior, then broader checks only if dependencies justify them.

State limitations relevant to the trace. Static references can miss dynamic imports, reflection, plugin loading, generated/runtime wiring, external services, or behavior outside accessible repository scope. A reasoned impact map is not a guarantee that every dependency was found.

## Relationship to file mapping

Use confirmed dependency evidence to justify `TOUCH` files. Use uncertain but plausible dependencies as `MAYBE` or `UNKNOWN`, with a verification action. Use `DON'T-TOUCH` only when there is evidence that a file is unrelated, generated/vendor-owned, or unnecessary; lack of investigation alone is not evidence for exclusion.
