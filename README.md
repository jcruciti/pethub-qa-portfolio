# PetHub QA Engineering Portfolio

![CI](https://github.com/joecruciti/pethub-qa-portfolio/actions/workflows/ci.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-Test-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node-%3E%3D24-339933?logo=node.js&logoColor=white)

A hands-on **QA Engineering and Test Automation portfolio** built around PetHub Local, a deterministic full-stack application designed for practicing and demonstrating modern software testing techniques.

This repository demonstrates a structured QA approach covering:

- Manual test planning and execution
- Functional and regression testing
- Positive, negative, validation, authorization, resilience, contract, and reconciliation testing
- UI testing with Playwright
- REST API testing
- Authentication and role-based access control (RBAC)
- Data and persistence validation
- Cross-system reconciliation
- Accessibility testing
- Defect investigation
- Test execution and evidence management
- Test automation architecture
- Page Object Model (POM)
- API clients and test-data builders
- CI/CD validation
- AI-assisted test analysis and test-case design

> **Built AI-assisted, human-directed.**
>
> AI is used as a productivity and analysis tool for test analysis, test-case generation, prompt engineering, coverage review, scenario exploration, and automation support. Test strategy, review, validation, technical decisions, execution, and final deliverables remain human-directed.

---

## Current Status

> **Manual QA baseline completed. CT001–CT011 have been designed, executed, documented, and supported with execution evidence. The project is now transitioning into the test automation phase, where the manual baseline will be progressively automated and expanded with automated API, accessibility, data, and integration coverage.**

---

# QA Focus

The project focuses on building a realistic QA Engineering workflow rather than simply creating automated scripts.

### Test Planning and Design

- Requirement and behavior analysis
- Risk-based scenario identification
- Positive and negative testing
- Boundary and validation testing
- Authorization and authentication testing
- Resilience and delayed-response testing
- Regression-oriented testing
- API contract validation
- Cross-system data reconciliation

### Test Execution

- Manual test execution
- Structured test case documentation
- Execution tracking
- Actual-result recording
- Evidence collection
- Defect-oriented investigation
- Reproducible test environments
- Database and application-state control

### Test Automation

The repository contains the supporting automation architecture and Playwright framework used to transition the manual QA baseline into automated regression coverage.

The automation strategy includes:

- Playwright Test
- TypeScript
- Page Object Model
- Reusable fixtures
- API clients
- Typed models and DTOs
- Test-data builders
- Environment configuration
- UI, API, accessibility, and integration layers
- CI/CD execution

The next automation phase focuses on converting the validated CT001–CT011 manual baseline into maintainable automated coverage.

### AI-Assisted QA

AI is used to support:

- Test scenario discovery
- Test-case drafting
- Coverage analysis
- Prompt engineering and refinement
- Functional behavior analysis
- Identification of missing validation scenarios
- Test automation assistance
- Review of test coverage and documentation

Human review and validation remain part of the QA process.

---

# PetHub Local

PetHub Local is a self-contained full-stack application used as the primary system under test.

It provides multiple application surfaces representing different business and operational contexts:

| Surface | Route | Purpose |
|---|---|---|
| Admin | `/` | Administrative operations and pet management |
| Storefront | `/shop` | Inventory, cart, and checkout flows |
| Clinic | `/clinic` | Veterinary appointment workflows |
| Operations | `/ops` | Operational data and cross-system reconciliation |
| QA Test Lab | `/lab` | QA-oriented testing and behavior exploration |
| REST API | `/api` | Backend and integration testing |

The application uses a deterministic local data model and LowDB-based persistence, making it suitable for reproducible QA execution.

## System Architecture

PetHub Local includes a three-store architecture consisting of:

1. **Operational / write model**
2. **CQRS-style read-model projections**
3. **Downstream replicas**, including billing and analytics representations

This architecture enables testing beyond isolated UI behavior and provides opportunities for:

- Persistence validation
- Read-model validation
- Cross-system reconciliation
- Data consistency testing
- Integration testing
- Event-driven behavior analysis

---

# Test Case Design

The initial manual QA baseline consists of eleven documented test cases.

| ID | Area | Type |
|---|---|---|
| CT001 | Storefront | Positive |
| CT002 | Storefront | Positive |
| CT003 | Storefront | Regression |
| CT004 | Storefront | Resilience |
| CT005 | Admin | Negative |
| CT006 | Clinic | Positive |
| CT007 | Clinic | Validation |
| CT008 | Operations | Reconciliation |
| CT009 | Platform API | Contract |
| CT010 | Storefront | Authorization |
| CT011 | Admin | Positive |

The test cases intentionally cover different testing dimensions rather than relying exclusively on happy-path UI scenarios.

### Test Layers

```text
UI / E2E
   ↓
API / Contract
   ↓
Data / Persistence
   ↓
Integration / Reconciliation
```

The objective is to validate behavior at the appropriate layer and avoid forcing every scenario through the UI.

Detailed test cases are maintained under:

```text
docs/test-cases/
```

The execution plan and results are maintained in:

```text
docs/QA_Test_Plan.xlsx
```

---

# Manual Test Execution

The manual QA baseline for **CT001–CT011 is complete**.

Each execution record captures:

- Execution ID
- Test Case ID
- Environment
- Execution date
- Tester
- Status
- Actual result
- Evidence
- Defects, when applicable
- Notes

Execution results are maintained separately from reusable test-case definitions.

### Execution Tracking

```text
Reusable Test Cases
        ↓
Test Execution
        ↓
Actual Results
        ↓
Evidence
        ↓
Defect / Observation
```

Execution results are maintained in:

```text
docs/QA_Test_Plan.xlsx
```

Evidence is organized under:

```text
docs/evidence/
├── clinic/
├── operations/
├── platform-api/
└── storefront/
```

This separation allows the test cases to remain reusable while execution history can grow over time.

---

# Defect-Oriented Testing

PetHub Local includes intentionally seeded user personas designed to expose different application behaviors.

| Persona | Intended Behavior |
|---|---|
| `standard_user` | Normal happy-path behavior |
| `problem_user` | Intentionally seeded functional defects |
| `performance_user` | Delayed responses |
| `locked_out_user` | Authentication rejection |

These personas are treated as part of the system's documented test behavior.

The QA approach distinguishes between:

- Expected seeded behavior
- Expected validation behavior
- Expected authorization behavior
- Unexpected application defects

This distinction is important when documenting actual results and determining whether a failed assertion represents a product defect or an intentionally simulated condition.

---

# AI-Assisted QA Workflow

AI is integrated into the QA workflow as a support tool rather than as a replacement for QA judgment.

```text
Requirements / Application Behavior
                ↓
      AI-Assisted Analysis
                ↓
        Scenario Discovery
                ↓
       Prompt Engineering
                ↓
       Generated Test Cases
                ↓
        Human Review
                ↓
      Revision / Refinement
                ↓
        Test Execution
                ↓
     Results / Defect Analysis
                ↓
      Automation Development
```

AI has been used to assist with:

- Initial test-case drafts
- Scenario discovery
- Functional behavior analysis
- Coverage review
- Negative and boundary scenarios
- Validation scenarios
- Authorization scenarios
- Test-data considerations
- Automation development
- Documentation refinement

The resulting test cases are reviewed, revised, executed, and validated by the human QA process before becoming part of the project baseline.

The prompt used for test-case generation and refinement is maintained at:

```text
docs/test-cases/test-case-design-prompt.md
```

---

# What's Inside

The repository is organized around QA documentation, application code, automation architecture, test execution, and evidence.

```text
docs/
├── QA_Test_Plan.xlsx
├── evidence/
│   ├── clinic/
│   ├── operations/
│   ├── platform-api/
│   └── storefront/
├── screenshots/
└── test-cases/
    ├── CT_*.md
    ├── CT_INDEX_001_test_case_index.md
    └── test-case-design-prompt.md
```

Automation architecture:

```text
src/
├── core/
│   ├── builders/
│   ├── fixtures/
│   ├── helpers/
│   ├── models/
│   └── pages/
└── ...

tests/
├── local/
│   └── pethub-local/
│       ├── ui/
│       ├── api/
│       └── a11y/
└── external/
    └── <target>/
```

The automation framework is designed around:

- Playwright Test
- TypeScript
- Page Object Model
- Typed API clients
- DTOs and models
- Fluent test-data builders
- Reusable fixtures
- Accessibility testing
- Environment-specific configuration

---

# Quickstart

## Requirements

- Node.js `>=24.0.0`
- npm
- Git

## Install Dependencies

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Start PetHub Local

```bash
npm run app:start
```

The application is available at:

```text
http://127.0.0.1:3000
```

## Run the Local Test Suite

```bash
npm run test:local
```

## Stop PetHub Local

```bash
npm run stop
```

---

# Running Tests

## Full Verification

```bash
npm run verify
```

Runs the project's validation pipeline, including linting, formatting, type checking, and local test execution.

## Full Test Suite

```bash
npm test
```

## Local Tests

```bash
npm run test:local
```

## External Practice Targets

```bash
npm run test:external
```

## UI Tests

```bash
npm run test:ui
```

## API Tests

```bash
npm run test:api
```

## Accessibility Tests

```bash
npm run test:a11y
```

## Smoke Tests

```bash
npm run test:smoke
```

## Critical Tests

```bash
npm run test:critical
```

## Lint

```bash
npm run lint
```

## Type Checking

```bash
npm run typecheck
```

## Formatting Check

```bash
npm run format:check
```

## Local HTML Report

```bash
npm run report:local
```

The local suite is configured to use a single worker because the application relies on shared JSON-backed state during execution.

---

# Accessibility Testing

Accessibility testing is implemented with:

```text
@axe-core/playwright
```

The approach includes automated accessibility analysis across the main PetHub application surfaces:

- Admin
- Storefront
- Clinic
- Operations
- QA Test Lab

The accessibility suite evaluates automated Axe findings related to WCAG 2.0 / 2.1 A and AA criteria.

Accessibility testing is treated as one layer of the overall QA strategy rather than as a replacement for manual accessibility evaluation.

---

# Platform API Testing

PetHub Local exposes REST endpoints that provide opportunities for API and contract testing.

Examples include:

```text
GET    /api/version
GET    /api/ready
GET    /api/metrics
GET    /api/openapi.json

POST   /api/auth/login
GET    /api/auth/me

GET    /api/v2/pets
POST   /api/v2/pets
DELETE /api/v2/pets/:id

POST   /api/v2/orders

GET    /api/v2/rate-limited
GET    /api/v2/echo

POST   /api/v2/jobs
GET    /api/v2/jobs
```

API testing covers areas such as:

- Authentication
- Authorization
- RBAC
- Request validation
- HTTP status-code contracts
- Response structure
- Persistence effects
- Negative scenarios
- Error handling

Additional automation opportunities include:

- Pagination
- Filtering
- Sorting
- Idempotency
- Rate limiting
- Asynchronous jobs
- Reflected input
- Observability endpoints

---

# Visual Tour

Screenshots documenting the application and QA exploration are maintained under:

```text
docs/screenshots/
```

The visual documentation includes the main PetHub surfaces, such as:

- Admin
- Storefront login
- Storefront inventory
- Cart
- Operations overview
- Operations comparisons
- Clinic
- QA Test Lab

Screenshots are supplementary documentation and are not treated as a substitute for executable tests or structured execution evidence.

---

# External Practice Targets

The repository also contains support for external practice targets, including:

- Swagger Petstore
- Sauce Demo

These targets are supplementary.

**PetHub Local remains the primary system under test and the main focus of the portfolio.**

---

# Test Automation Strategy

The automation strategy follows a layered approach.

```text
                 UI / E2E
                    ↓
              API / Contract
                    ↓
            Data / Persistence
                    ↓
         Integration / Reconciliation
```

The objective is not to test every behavior through the UI.

Instead:

- UI tests validate critical user journeys and visible behavior.
- API tests validate backend contracts and authorization.
- Data tests validate persistence and state changes.
- Integration tests validate consistency between system representations.
- Accessibility tests validate automated accessibility rules at the appropriate UI layer.

The validated manual baseline provides the behavioral foundation for the automation phase.

The next step is to progressively automate CT001–CT011 while preserving the same intent, expected behavior, evidence strategy, and traceability.

---

# CI/CD

The project uses GitHub Actions for automated validation.

The CI workflow is designed to support:

- Dependency installation
- Linting
- Formatting validation
- Type checking
- Playwright execution
- Smoke and critical test suites
- Deterministic local test execution

External practice targets are maintained separately from the deterministic PetHub Local validation flow.

---

# Repository Structure

```text
.
├── apps/
│   └── pethub-local/
│
├── src/
│   └── core/
│       ├── builders/
│       ├── fixtures/
│       ├── helpers/
│       ├── models/
│       └── pages/
│
├── tests/
│   ├── local/
│   │   └── pethub-local/
│   │       ├── ui/
│   │       ├── api/
│   │       └── a11y/
│   │
│   └── external/
│       └── <target>/
│
├── docs/
│   ├── QA_Test_Plan.xlsx
│   ├── evidence/
│   ├── screenshots/
│   └── test-cases/
│
├── playwright.config.ts
├── playwright.local.config.ts
├── test-targets.config.ts
├── package.json
└── README.md
```

---

# Project Background

The project originated from the `playwright-qa-portfolio` codebase and evolved into a personal QA Engineering portfolio.

The original PetHub application and project components are retained as the system-under-test foundation.

The QA contribution focuses on:

- QA analysis
- Test strategy
- Test-case design
- Manual execution
- Evidence collection
- API testing
- Data validation
- Cross-system reconciliation
- Test automation
- Accessibility testing
- CI/CD validation
- Documentation
- Defect investigation
- AI-assisted QA workflows

The repository intentionally preserves the distinction between the original application/framework components and the QA engineering work developed around them.

---

# Current QA Roadmap

## Completed

- PetHub Local environment setup
- QA strategy definition
- Test-case design
- CT001–CT011
- Test execution planning
- Test-case documentation
- AI-assisted test-case workflow
- Git/GitHub setup
- Manual execution of CT001–CT011
- Execution tracking
- Evidence collection
- API validation and authorization testing
- Cross-system reconciliation testing
- Database reset procedure
- Application restart procedure for Clinic in-memory state
- Manual QA baseline

## Next Phase — Test Automation

- Automate CT001–CT011 with Playwright
- Build reusable fixtures
- Build reusable test-data builders
- Expand API automation
- Add persistence and state assertions
- Automate cross-system reconciliation checks
- Expand accessibility coverage
- Integrate automated regression coverage into CI/CD
- Establish maintainable smoke and critical suites
- Continue expanding coverage based on risk and application behavior

The goal is to evolve the project from a completed manual QA baseline into a maintainable, layered QA automation portfolio.

---

# Maintenance

Install dependencies from the lockfile:

```bash
npm ci
```

Run project diagnostics:

```bash
npm run doctor
```

Run the complete verification flow:

```bash
npm run verify
```

If Playwright browsers are not installed:

```bash
npx playwright install
```

---

# Attribution

The original PetHub application and project components originated from the upstream:

```text
playwright-qa-portfolio
```

Original attribution and licensing information are retained where applicable.

This repository does **not** claim authorship of the original PetHub application or framework components.

The primary contribution represented by this portfolio is the QA Engineering work developed around the system under test, including:

- QA strategy
- Test design
- Manual test execution
- Test evidence
- API testing
- Data validation
- Cross-system reconciliation
- Test automation architecture
- Accessibility testing
- CI/CD validation
- Documentation
- Defect-oriented testing
- AI-assisted QA workflows
- Continuous improvement of the testing process
````
