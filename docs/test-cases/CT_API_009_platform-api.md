# Platform API Test Cases

## CT009 — Platform API — Validation and Authorization — 422 and 401/403 Responses Are Enforced

**Test Case ID:** CT009
**Title:** Platform API — Validation and Authorization — 422 and 401/403 Responses Are Enforced
**Priority:** High
**Severity:** High
**Type:** Contract
**Module:** Platform API
**Feature:** API input validation, authentication, and RBAC enforcement

**Preconditions:**

- PetHub Local is running on `http://127.0.0.1:3000`
- Database has been reset to the canonical seeded baseline using `POST /api/admin/reset`
- The platform API endpoints are available under /api/v2 and /api/auth.

**Test Data:**

- Invalid pet payload for create-v2 validation
- Anonymous request to a protected endpoint
- Admin-only delete action and non-admin request context

#### Objective

Validate that the API rejects invalid request payloads and protected actions with the documented HTTP status codes while ensuring unauthorized or invalid input is not applied to the persistent data.

#### Test Steps

|  ID | Action                                                     | Expected Result                                                            |
| --: | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
|   1 | Submit a pet creation request with invalid payload fields. | The API returns 422 and identifies the field-level validation issues.      |
|   2 | Access a protected endpoint without credentials.           | The API returns 401 Unauthorized and no protected data is returned.        |
|   3 | Attempt an admin-only action as a non-admin user.          | The API returns 403 Forbidden and the action is not applied.               |
|   4 | Repeat the protected action as an authorized admin.        | The operation succeeds and the resource is updated or deleted as intended. |

#### Postconditions

- Validation and authorization rules are enforced consistently.
- Protected actions remain restricted to authorized roles.
- Invalid or unauthorized requests do not create or mutate persisted data.

### Traceability

- Feature: API validation, authentication, and RBAC
- UI Route: N/A (API-level contract validation)
- API Endpoint(s): /api/v2/pets, /api/auth/login, /api/auth/me, and admin-only delete behavior as documented in the PetHub Local platform surfaces
- Business Rule: invalid payloads must be rejected, anonymous access must fail, and role-based access control must restrict admin-only operations
- Data Source: PetHub Local platform testing surfaces and documented REST contract behavior
- Related Test Case(s): CT005, CT010

### Validation Layers

- API Assertions: 422, 401, and 403 status codes and failure payloads
- Data Assertions: invalid or unauthorized requests do not mutate persisted records
- Integration Assertions: authorized admin requests succeed while unauthorized requests fail consistently
