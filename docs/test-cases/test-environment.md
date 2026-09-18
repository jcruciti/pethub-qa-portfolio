# Test Environment

## Application

**Project:** PetHub
**Application:** PetHub Local
**Environment:** Local / Self-hosted
**Base URL:** `http://127.0.0.1:3000`

## Application Startup

Start the PetHub local application with:

```bash
npm run app:start
```

The application is served at:

```text
http://127.0.0.1:3000
```

To stop the application:

```bash
npm run stop
```

## Database

**Database:** LowDB

PetHub uses LowDB for local data persistence.

Test cases that depend on a known initial state should be executed against the canonical seeded baseline.

## Database Reset Procedure

Before executing test cases that require the canonical seeded state, reset the application database using the administrative reset endpoint:

```http
POST /api/admin/reset
```

The reset restores the application data to the canonical seeded baseline.

### Reset Procedure

1. Ensure that PetHub Local is running.
2. Send a `POST` request to:

   `http://127.0.0.1:3000/api/admin/reset`

3. Confirm that the request completes successfully.
4. Verify that the expected seeded data is available.
5. Execute the test case.

### Example

Using `curl`:

```bash
curl -X POST http://127.0.0.1:3000/api/admin/reset
```

> The reset endpoint should only be used in the local test environment.

## Test Isolation

Test cases that modify persistent application data should be executed against the canonical seeded baseline when their preconditions require a clean environment.

This helps provide:

- Reproducible test execution
- Consistent test data
- Test isolation
- Reduced dependency on previous test runs
- Reliable comparison between expected and actual results

## Test Users

PetHub provides demo accounts representing different user personas.

The available personas should be verified against the application's current Demo Accounts configuration before test execution.

Test cases should use the persona specified in their respective test data or preconditions.

## Test Data

Test data may include:

- Demo users
- Pets
- Pet categories
- Inventory items
- Cart items
- Orders
- Customer information
- Veterinary appointments

Data created during a test should not be assumed to persist between test cases unless explicitly required by the test scenario.

## Browser

UI tests are executed using Playwright.

Supported browser projects may include:

- Chromium
- Firefox
- WebKit

The local PetHub UI projects can be executed with:

```bash
npm run test:pethub-local:ui
```

## API Tests

PetHub API tests can be executed with:

```bash
npm run test:pethub-local:api
```

## Complete PetHub Test Suite

To execute the complete PetHub local test suite:

```bash
npm run test:pethub-local
```

## Test Evidence

Test execution evidence may include:

- Screenshots
- UI states
- Console output
- API responses
- Database state
- Playwright test results

Evidence should use a consistent naming convention and reference the corresponding Test Case ID.

## Environment Verification

Before starting a test session, verify that:

- PetHub Local is running.
- The application is accessible at `http://127.0.0.1:3000`.
- The database is available.
- Required demo accounts are available.
- Required seeded test data is available.
- The database has been reset when required by the test case.
- No unintended data from previous test execution affects the scenario.

## Environment Reset and Test Case Preconditions

Individual test cases should not contain a separate reset step unless the reset operation itself is the subject of the test.

Instead, test cases that require a clean environment should specify the reset requirement in their preconditions:

```markdown
**Preconditions:**

- PetHub Local is running on `http://127.0.0.1:3000`
- Database has been reset to the canonical seeded baseline using `POST /api/admin/reset`
- Required test data is available
```

This keeps the test cases focused on the behavior being validated while maintaining a documented and reproducible test environment.
