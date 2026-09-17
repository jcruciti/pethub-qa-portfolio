# Admin Test Cases

## CT005 — Admin — Duplicate Pet Creation — Duplicate ID Is Rejected

**Test Case ID:** CT005
**Title:** Admin — Duplicate Pet Creation — Duplicate ID Is Rejected
**Priority:** High
**Severity:** High
**Type:** Negative
**Module:** Admin
**Feature:** Admin create-pet validation and duplicate prevention

**Preconditions:**
- The admin dashboard is open.
- The database is reset to the seed state.
- A valid pet ID already exists in the operational store.

**Test Data:**
- Existing pet ID from the seeded dataset
- Duplicate pet payload using the same pet ID

#### Objective
Verify that duplicate pet creation is prevented and that the original record remains unchanged when the operation is rejected.

#### Test Steps

| ID | Action | Expected Result |
|---:|---|---|
| 1 | Open the admin dashboard. | Operational tables for pets, users, customers, employees, and orders are visible. |
| 2 | Attempt to create a pet using an existing ID. | The request is rejected and the duplicate record is not created. |
| 3 | Review the response or UI result. | A conflict-style failure is shown instead of creating a second pet record. |
| 4 | Re-check the pet list. | The original seeded record remains intact and only one record exists for that identifier. |

#### Postconditions
- No duplicate pet row is created.
- The admin dashboard remains stable after the failed request.
- The seeded data remains intact for the duplicate pet ID.

### Traceability
- Feature: Admin create-pet validation and duplicate prevention
- UI Route: /
- API Endpoint(s): POST /api/pets and the admin create-pet flow (documented in the PetHub Local app guide)
- Business Rule: Duplicate pet IDs are rejected rather than shadowing the existing record
- Data Source: operational pet store and admin dashboard
- Related Test Case(s): CT008

### Validation Layers
- UI Assertions: admin dashboard remains available, duplicate request fails visibly
- API Assertions: conflict-style failure for duplicate ID creation
- Data Assertions: no duplicate pet record is created in the operational store
- Integration Assertions: the original operational record remains unchanged and no read-model or downstream drift is introduced by the rejected action
