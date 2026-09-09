# Documentation

Reference docs for the portfolio, organized **system-first** to mirror the rest
of the repo (`src/pages/<system>/`, and tests split by ownership into
`tests/local/pethub-local/` for our own app and `tests/external/<system>/` for external
targets).

For the project overview and setup, start with the root
[README.md](../README.md). Engineering and AI guidance live in
[AGENTS.md](../AGENTS.md) and
[TEST_AUTOMATION_STANDARDS.md](../TEST_AUTOMATION_STANDARDS.md); status and
backlog live in [PROGRESS.md](../PROGRESS.md).

## `pethub-local/` - the in-repo Express + lowdb app (primary target)

- [app.md](pethub-local/app.md) - application guide: architecture, UI/API
  surfaces, data model, REST API, and the QA Test Lab (`/lab` + `/api/lab`).
- [testing.md](pethub-local/testing.md) - testing guide: how to write and run
  the suite, fixtures, page objects, builders, and the SQL-style helpers.
- [qa-feature-plan.html](pethub-local/qa-feature-plan.html) - QA feature roadmap
  (open in a browser).

## `sauce-demo/` - public UI target

- [bugs.md](sauce-demo/bugs.md) - documented known defects asserted on purpose by
  `tests/external/sauce-demo/ui/known-defects.spec.ts` (`bugs.pdf` is the
  generated PDF export).

## `swagger-petstore/` - public API + UI target

- [bugs.md](swagger-petstore/bugs.md) - documented API defects pinned by the
  Swagger Petstore API specs (`bugs.pdf` is the generated PDF export).

## `workflows/` - AI workflow playbooks

Tool-agnostic Markdown playbooks (usable with any AI coding tool) for planning,
generating, healing, and reviewing the Playwright suite:

- [ai-test-planner.md](workflows/ai-test-planner.md) - turn a requirement, bug
  report, or user flow into a concrete Playwright test plan.
- [ai-test-generator.md](workflows/ai-test-generator.md) - generate tests and
  supporting code that match repo conventions.
- [ai-test-healer.md](workflows/ai-test-healer.md) - analyze failing tests and
  propose safe, minimal fixes.
- [ai-coverage-assistant.md](workflows/ai-coverage-assistant.md) - compare
  current coverage against requested scope and find gaps.
- [formatting-cleanup.md](workflows/formatting-cleanup.md) - fix widespread
  Prettier drift in small, reviewable batches.
- [repo-revival.md](workflows/repo-revival.md) - revive the repo after a long
  absence (months or years).

## `screenshots/`

Deterministic screenshots used by the root README visual tour. Regenerate with
`npm run screenshots`.
