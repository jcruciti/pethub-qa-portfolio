# PetHub QA Engineering Portfolio

[![CI](https://github.com/jcruciti/pethub-qa-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/jcruciti/pethub-qa-portfolio/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright\&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C2?logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-%E2%89%A524-339933?logo=node.js\&logoColor=white)](.nvmrc)

A hands-on **QA Engineering and Test Automation portfolio** built around PetHub Local, a deterministic full-stack application designed for practicing and demonstrating modern software testing techniques.

This repository demonstrates my work across **manual testing, test design, API testing, UI automation, accessibility testing, data validation, cross-system reconciliation, defect investigation, and CI/CD** using Playwright, TypeScript, REST APIs, Git, and related QA practices.

> **Built AI-assisted, human-directed.** AI tools are used to support test analysis, test-case generation, prompt engineering, coverage review, and automation development. The test strategy, review, validation, technical decisions, and final deliverables are human-directed.

---

## QA Focus

This portfolio demonstrates practical QA activities across multiple testing levels:

* Test planning and test-case design
* Functional and regression testing
* Positive, negative, validation, authorization, resilience, contract, and reconciliation testing
* UI testing with Playwright
* REST API testing
* Authentication and authorization testing
* Data and database validation
* Cross-system data reconciliation
* Accessibility testing
* Defect identification and investigation
* Test execution and evidence tracking
* Page Object Model
* API clients and test data builders
* CI/CD integration
* AI-assisted test design and test automation

The project is intentionally structured to demonstrate not only **how to automate tests**, but also **how to think about quality across different layers of a system**.

---

## PetHub Local

**PetHub Local** is the primary system under test in this portfolio.

It is a self-contained Express + lowdb application included in the repository. It provides deterministic data and multiple application surfaces, allowing the test suite to exercise realistic QA scenarios without depending on unstable public websites.

The application includes:

| Surface         | URL       | Purpose                                       |
| --------------- | --------- | --------------------------------------------- |
| **Admin**       | `/`       | Operational dashboard and data management     |
| **Storefront**  | `/shop`   | Inventory, cart and checkout                  |
| **Clinic**      | `/clinic` | Veterinary appointment booking                |
| **Operations**  | `/ops`    | Cross-system investigation and reconciliation |
| **QA Test Lab** | `/lab`    | Deterministic UI automation challenges        |

The application also exposes REST APIs under `/api`.

### Important architectural concept: three data stores

One of the main QA challenges in PetHub is its three-store architecture:

```text
                    ┌─────────────────────┐
                    │ Operational Store   │
                    │   System of Record   │
                    └──────────┬──────────┘
                               │
                         Domain Events
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
      ┌──────────────────┐          ┌────────────────────┐
      │ Read Model Store │          │ Downstream Systems │
      │  CQRS-style      │          │    Replicas        │
      └──────────────────┘          └────────────────────┘
```

The three JSON stores simulate:

* an operational/write model;
* CQRS-style read-model projections;
* downstream replicas such as billing and analytics systems.

This makes it possible to test not only whether an operation succeeds through the UI or API, but also whether the resulting data is correctly propagated across the system.

---

## Test Case Design

The repository contains a documented baseline of functional and integration test cases.

### Current test-case baseline

| ID    | Module       | Type           |
| ----- | ------------ | -------------- |
| CT001 | Storefront   | Positive       |
| CT002 | Storefront   | Positive       |
| CT003 | Storefront   | Regression     |
| CT004 | Storefront   | Resilience     |
| CT005 | Admin        | Negative       |
| CT006 | Clinic       | Positive       |
| CT007 | Clinic       | Validation     |
| CT008 | Operations   | Reconciliation |
| CT009 | Platform API | Contract       |
| CT010 | Storefront   | Authorization  |

The test cases cover several validation layers:

```text
UI
 │
 ├── Functional behavior
 ├── Validation
 └── Authorization
       │
       ▼
API
 │
 ├── Contracts
 ├── Authentication / RBAC
 └── Business rules
       │
       ▼
Data
 │
 ├── Persistence
 ├── Read models
 └── Downstream replicas
       │
       ▼
Integration / Reconciliation
```

Test-case documentation is available under:

`docs/test-cases/`

The overall QA plan is available at:

`docs/QA_Test_Plan.xlsx`

---

## Manual Test Execution

The test cases are designed to support both manual and automated execution.

For each execution, the QA process records:

* execution ID;
* test case ID;
* environment;
* execution date;
* tester;
* status;
* actual result;
* evidence;
* defects;
* execution notes.

For example, **CT001 — Storefront — Valid Login** has already been manually executed against the local application and passed all seven defined steps.

The test-case definition remains reusable, while each execution is recorded separately. This distinction allows the same test case to be executed repeatedly across builds and environments without losing execution history.

---

## Defect-Oriented Testing

PetHub contains intentionally seeded user personas and behaviors that provide controlled regression scenarios.

Examples include:

* `standard_user` — normal happy-path behavior;
* `problem_user` — intentionally seeded functional defects;
* `performance_user` — intentionally delayed responses;
* `locked_out_user` — authentication rejection.

These behaviors allow the test suite to distinguish between:

```text
Expected / Seeded Behavior
            vs.
Unexpected Application Defect
```

This is particularly useful when demonstrating regression testing and defect analysis.

---

## AI-Assisted QA Workflow

AI is used as a **QA productivity and analysis tool**, not as a replacement for QA judgment.

The workflow includes:

```text
Requirements / Application Behavior
              │
              ▼
       AI-assisted analysis
              │
              ▼
       Test scenario design
              │
              ▼
    Prompt engineering / refinement
              │
              ▼
       Generated test cases
              │
              ▼
       Human review & revision
              │
              ▼
       Manual / automated execution
              │
              ▼
       Results & defect analysis
```

AI has been used in this project for:

* generating initial test-case drafts;
* improving test-case coverage;
* refining test scenarios;
* analyzing application behavior;
* creating and iterating prompts;
* identifying missing validation scenarios;
* supporting automation development;
* reviewing test coverage.

The final test cases and automation are reviewed and validated before being considered part of the QA baseline.

The test-case design prompt used in this project is available at:

`docs/test-cases/test-case-design-prompt.md`

---

## What's Inside

### QA Documentation

```text
docs/
├── QA_Test_Plan.xlsx
└── test-cases/
    ├── CT_ADMIN_005_admin.md
    ├── CT_API_009_platform-api.md
    ├── CT_CLINIC_006_clinic.md
    ├── CT_INDEX_001_test_case_index.md
    ├── CT_OPS_008_operations.md
    ├── CT_STORE_001_storefront.md
    └── test-case-design-prompt.md
```

### Automation Architecture

```text
src/
├── core/
├── pages/
├── helpers/
├── fixtures/
├── builders/
└── models/

tests/
├── local/
│   └── pethub-local/
│       ├── ui/
│       ├── api/
│       └── a11y/
└── external/
    └── <target>/
```

The automation framework uses:

* Playwright Test
* TypeScript
* Page Object Model
* typed API clients
* DTOs
* fluent test-data builders
* reusable fixtures
* accessibility testing
* environment-based configuration

---

## Quickstart

Requires **Node 24** (see `.nvmrc`).

```bash
npm install
npx playwright install
```

Run the deterministic PetHub suite:

```bash
npm run test:local
```

Start the application manually:

```bash
npm run app:start
```

The application will be available at:

```text
http://127.0.0.1:3000
```

Stop the local server when finished:

```bash
npm run stop
```

---

## Running Tests

| Command                 | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| `npm run verify`        | Lint + format + typecheck + local test suite |
| `npm test`              | Full external + local suite                  |
| `npm run test:local`    | PetHub Local suite                           |
| `npm run test:external` | External targets                             |
| `npm run test:ui`       | UI tests                                     |
| `npm run test:api`      | API tests                                    |
| `npm run test:a11y`     | Accessibility tests                          |
| `npm run test:smoke`    | Smoke tests                                  |
| `npm run test:critical` | Critical tests                               |
| `npm run lint`          | ESLint                                       |
| `npm run typecheck`     | TypeScript type checking                     |
| `npm run format:check`  | Prettier validation                          |
| `npm run report:local`  | Open local Playwright report                 |

The local suite uses a single worker because PetHub Local uses shared JSON-based state.

---

## Accessibility Testing

Accessibility testing uses:

`@axe-core/playwright`

The suite covers:

* Admin
* Storefront
* Clinic
* Operations
* QA Test Lab

Tests focus on WCAG 2.0 / 2.1 A and AA-related violations and use automated Axe analysis as part of the QA strategy.

---

## PetHub Local Platform API

PetHub also includes a dedicated API-testing surface.

Examples include:

```text
GET  /api/version
GET  /api/ready
GET  /api/metrics
GET  /api/openapi.json

POST /api/auth/login
GET  /api/auth/me

GET  /api/v2/pets
POST /api/v2/pets
DELETE /api/v2/pets/:id

POST /api/v2/orders

GET  /api/v2/rate-limited
GET  /api/v2/echo

POST /api/jobs
GET  /api/jobs/:id
```

These endpoints provide opportunities to test:

* authentication;
* RBAC;
* validation;
* HTTP status contracts;
* pagination;
* filtering;
* sorting;
* idempotency;
* rate limiting;
* asynchronous processing;
* reflected-input handling;
* API observability.

---

## Visual Tour

PetHub Local provides several interfaces used during testing.

### Admin Dashboard

![Admin dashboard - dark theme](docs/screenshots/01-admin-dashboard.png)

The admin dashboard exposes operational data, audit information, read models, downstream replicas, and API exploration.

### Storefront

![Storefront login](docs/screenshots/03-storefront-login.png)

The Storefront provides the main customer-facing e-commerce workflow.

### Inventory

![Inventory grid](docs/screenshots/04-storefront-inventory.png)

The inventory contains available, pending, and sold pets and provides data for sorting, filtering, and navigation scenarios.

### Cart

![Cart with three pets](docs/screenshots/07-storefront-cart.png)

The cart supports session-based item management and checkout.

### Operations

![Operations portal overview](docs/screenshots/09-ops-overview.png)

The Operations portal is designed specifically for QA investigation.

### Cross-System Reconciliation

![Cross-system comparison view](docs/screenshots/10-ops-comparisons.png)

The comparison view exposes operational data alongside read-model and downstream representations.

### Clinic

![Clinic booking wizard](docs/screenshots/11-clinic-booking.png)

The Clinic provides a multi-step veterinary appointment-booking workflow.

### QA Test Lab

![QA Test Lab overview](docs/screenshots/12-lab-home.png)

The QA Test Lab contains deterministic UI automation challenges covering forms, dynamic content, dialogs, tables, widgets, menus, frames, popups, and shadow DOM.

---

## External Practice Targets

The repository also contains examples targeting public demonstration applications:

### Swagger Petstore

Public REST API and UI used for API-testing practice.

### Sauce Demo

Public e-commerce demonstration application used for UI automation patterns such as authentication state reuse.

These external targets are supplementary. **PetHub Local is the primary system under test and the main focus of this portfolio.**

---

## Test Automation Strategy

The automation follows a layered approach:

```text
                 ┌─────────────────┐
                 │   UI / E2E      │
                 │    Playwright   │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │       API       │
                 │ REST / Contract │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │      Data       │
                 │   Persistence   │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │  Integration    │
                 │ Reconciliation  │
                 └─────────────────┘
```

The goal is not to test everything through the UI.

Tests are placed at the appropriate layer so that:

* UI tests validate user-facing behavior;
* API tests validate contracts and business rules;
* data checks validate persistence and projections;
* integration tests validate communication between system components.

---

## CI/CD

The repository uses GitHub Actions for automated validation.

The CI strategy includes:

* linting;
* formatting;
* TypeScript type checking;
* Playwright execution;
* smoke and critical test tiers;
* local deterministic testing.

External public targets are treated separately from the deterministic PetHub suite because their availability and behavior are outside the control of this repository.

---

## Repository Structure

```text
apps/
└── pethub-local/          # PetHub Local application

src/
├── core/
├── pages/
├── helpers/
├── fixtures/
├── builders/
└── models/

tests/
├── local/
└── external/

docs/
├── QA_Test_Plan.xlsx      # QA test plan
└── test-cases/            # Test-case documentation

playwright.config.ts
playwright.local.config.ts
test-targets.config.ts
package.json
```

---

## Project Background

This repository originated from the `playwright-qa-portfolio` project and has been developed into my personal QA engineering portfolio.

The PetHub application and original project structure are retained as the system-under-test foundation. My work in this repository focuses on **QA analysis, test design, test execution, automation, documentation, and continuous improvement**.

The repository history is intentionally preserved to show the evolution of the project.

---

## Current QA Roadmap

The project is being developed incrementally.

### Completed

* [x] PetHub Local environment setup
* [x] QA test strategy
* [x] Test-case baseline CT001–CT010
* [x] Test plan
* [x] Test-case documentation
* [x] AI-assisted test-case design workflow
* [x] Git/GitHub repository setup
* [x] First manual test execution
* [x] CT001 manual execution — PASS

### In Progress

* [ ] Execute remaining manual test cases
* [ ] Record execution results
* [ ] Document discovered defects
* [ ] Implement Playwright automation for the baseline test cases
* [ ] Expand API automation
* [ ] Add data/reconciliation assertions
* [ ] Integrate QA execution results with CI/CD

---

## Maintenance

For a clean environment:

```bash
npm ci
npm run doctor
npm run verify
```

If Playwright browsers are not installed:

```bash
npx playwright install
```

For additional repository maintenance guidance, see the existing project documentation under `docs/`.

---

## Attribution and License

This repository contains the PetHub application and project components originating from the upstream `playwright-qa-portfolio` project.

The original project attribution and licensing terms are retained where applicable. This portfolio should not be interpreted as a claim of authorship of the original application or framework.

My contributions in this repository focus on **QA engineering, test strategy, test design, test execution, automation, documentation, analysis, and AI-assisted testing workflows**.

See the repository's license and upstream project documentation for the applicable terms.
