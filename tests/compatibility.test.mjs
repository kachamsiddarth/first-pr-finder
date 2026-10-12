import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) =>
  readFileSync(path.join(root, relativePath), "utf8");

const skill = read("SKILL.md");
const readme = read("README.md");
const schema = read("references/report-schema.md");
const sample = read("examples/sample-report.md");
const testCases = read("tests/test-cases.md");
const evaluationChecklist = read("tests/evaluation-checklist.md");

test("canonical skill has required standard metadata", () => {
  const match = skill.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  assert.ok(match, "SKILL.md must begin with YAML frontmatter");
  assert.match(match[1], /^name:\s*first-pr-finder\s*$/m);
  assert.match(match[1], /^description:\s*\S.*$/m);
});

test("issue verdicts and planning readiness remain separate and complete", () => {
  const verdicts = [
    "AVAILABLE",
    "POTENTIALLY_CLAIMED",
    "ACTIVE_WORK",
    "PREVIOUSLY_REJECTED",
    "ALREADY_RESOLVED",
    "UNKNOWN",
  ];
  const readiness = [
    "GO",
    "GO WITH ASSUMPTIONS",
    "NEEDS CLARIFICATION",
    "BLOCKED",
  ];

  for (const value of verdicts) {
    assert.ok(skill.includes(`\`${value}\``), `SKILL.md is missing ${value}`);
    assert.ok(
      read("references/evidence-and-risk-rules.md").includes(`\`${value}\``),
      `Evidence rules are missing ${value}`,
    );
  }
  for (const value of readiness) {
    assert.ok(
      read("references/confidence-gate.md").includes(`\`${value}\``),
      `Readiness gate is missing ${value}`,
    );
  }
  for (const dimension of [
    "Issue clarity",
    "Code evidence",
    "Testability",
    "Repository compliance",
    "Conflicting work",
  ]) {
    assert.ok(
      read("references/confidence-gate.md").includes(dimension),
      `Readiness gate is missing ${dimension}`,
    );
  }

  assert.match(skill, /read-only/i);
  assert.match(skill, /Do not create branches, commits, pushes, or pull requests/i);
  assert.match(skill, /Do not modify the target repository/i);
  assert.match(read("references/evidence-and-risk-rules.md"), /approximately three months/i);
  assert.match(read("references/evidence-and-risk-rules.md"), /confidence/i);
  assert.match(read("references/repo-norms.md"), /historical patterns/i);
  assert.match(read("references/impact-analysis.md"), /regression blast radius/i);
  assert.match(read("references/counterfactual.md"), /approach/i);
});

test("README and skill local links resolve to repository files", () => {
  const links = [];
  for (const [sourcePath, content] of [
    ["README.md", readme],
    ["SKILL.md", skill],
  ]) {
    for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const target = match[1].split(/[?#]/, 1)[0];
      if (!target.startsWith("./") && !target.startsWith("../")) continue;
      const resolved = path.resolve(path.dirname(path.join(root, sourcePath)), target);
      assert.ok(existsSync(resolved), `${sourcePath} has a broken link to ${target}`);
      links.push(target.replace(/^\.\//, ""));
    }
  }

  for (const prefix of ["references/", "examples/", "tests/"]) {
    assert.ok(links.some((target) => target.startsWith(prefix)), `Missing ${prefix} link`);
  }
});

test("sample report keeps every numbered report-schema section", () => {
  const headings = (content) =>
    [...content.matchAll(/^##\s+(\d+)\.\s+/gm)].map((match) => match[1]);
  assert.deepEqual(headings(sample), headings(schema));
  assert.match(sample, /\| Category \| File path \| Confidence \|/);
});

test("existing evaluation scenarios and checklist remain present", () => {
  const caseHeadings = [...testCases.matchAll(/^##\s+(\d+)\./gm)];
  assert.ok(caseHeadings.length >= 30, "Expected the existing broad scenario suite");
  for (const required of [
    "POTENTIALLY_CLAIMED",
    "ACTIVE_WORK",
    "PREVIOUSLY_REJECTED",
    "ALREADY_RESOLVED",
    "UNKNOWN",
    "GO WITH ASSUMPTIONS",
    "NEEDS CLARIFICATION",
  ]) {
    assert.ok(testCases.includes(required), `Scenario coverage is missing ${required}`);
    assert.ok(
      evaluationChecklist.includes(required),
      `Evaluation checklist is missing ${required}`,
    );
  }
  for (const relativePath of [
    "references/preflight-workflow.md",
    "references/evidence-and-risk-rules.md",
    "references/report-schema.md",
    "references/confidence-gate.md",
    "references/repo-norms.md",
    "references/impact-analysis.md",
    "references/counterfactual.md",
    "examples/sample-report.md",
    "tests/test-cases.md",
    "tests/evaluation-checklist.md",
  ]) {
    assert.ok(existsSync(path.join(root, relativePath)), `Missing ${relativePath}`);
  }
});

test("README documents project-local CLI syntax without global default", () => {
  const projectSection = readme.match(
    /^### Project-local installation \(default\)([\s\S]*?)(?=^### Optional global installation)/m,
  );
  assert.ok(projectSection, "Missing project-local installation section");
  const installCommands = [
    ...projectSection[1].matchAll(/^npx skills add .+$/gm),
  ].map((match) => match[0]);
  assert.ok(installCommands.length > 0, "Missing project-local add command");
  assert.ok(
    installCommands.every((command) => !command.includes("--global")),
    "Project-local add commands must not opt into global installation",
  );
  assert.match(projectSection[1], /npx skills add kachamsiddarth\/first-pr-finder/);
  assert.match(projectSection[1], /absolute path/);
  assert.match(projectSection[1], /npx skills add \./);
  assert.match(projectSection[1], /local-path smoke test did not create `skills-lock\.json`/);
  assert.match(projectSection[1], /re-run its same `skills add <local-path>/);

  for (const agent of ["github-copilot", "codex", "claude-code"]) {
    assert.match(
      projectSection[1],
      new RegExp(
        `npx skills add kachamsiddarth/first-pr-finder --skill first-pr-finder --agent ${agent} --copy`,
      ),
    );
  }
  assert.match(readme, /npx skills update first-pr-finder --project/);
  assert.match(readme, /npx skills remove --skill first-pr-finder/);
  assert.match(readme, /Optional global installation/);
  assert.match(readme, /--global/);
});

test("compatibility table separates CLI, placement, load, and runtime evidence", () => {
  const matrixSection = readme.match(
    /^### Agent compatibility and verification status([\s\S]*?)(?=^### Agent-specific invocation)/m,
  );
  assert.ok(matrixSection, "Missing agent compatibility section");
  const tableRows = matrixSection[1]
    .split(/\r?\n/)
    .filter((line) => /^\| (GitHub Copilot|OpenAI Codex|Claude Code) \|/.test(line));
  assert.equal(tableRows.length, 3);

  const expected = [
    ["GitHub Copilot", "github-copilot", ".agents/skills/", "Passed"],
    ["OpenAI Codex", "codex", ".agents/skills/", "Passed"],
    ["Claude Code", "claude-code", ".claude/skills/", "Passed"],
  ];
  for (const [name, target, discoveryPath, placement] of expected) {
    const row = tableRows.find((line) => line.startsWith(`| ${name} |`));
    assert.ok(row, `Missing compatibility row for ${name}`);
    assert.ok(row.includes(`Verified (\`${target}\`)`), `${name} CLI target is not verified`);
    assert.ok(row.includes(`\`${discoveryPath}\``), `${name} discovery path is missing`);
    assert.ok(row.includes(placement), `${name} placement status is missing`);
    assert.equal((row.match(/Not tested/g) ?? []).length, 2);
  }
});

test("repository has one canonical skill source, not stale agent copies", () => {
  for (const relativePath of [
    ".agents/skills/first-pr-finder/SKILL.md",
    ".claude/skills/first-pr-finder/SKILL.md",
    ".github/skills/first-pr-finder/SKILL.md",
  ]) {
    assert.equal(
      existsSync(path.join(root, relativePath)),
      false,
      `Unexpected in-repository copy at ${relativePath}; keep SKILL.md canonical`,
    );
  }
});
