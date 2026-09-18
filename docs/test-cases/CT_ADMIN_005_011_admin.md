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

|  ID | Action                                        | Expected Result                                                                           |
| --: | --------------------------------------------- | ----------------------------------------------------------------------------------------- |
|   1 | Open the admin dashboard.                     | Operational tables for pets, users, customers, employees, and orders are visible.         |
|   2 | Attempt to create a pet using an existing ID. | The request is rejected and the duplicate record is not created.                          |
|   3 | Review the response or UI result.             | A conflict-style failure is shown instead of creating a second pet record.                |
|   4 | Re-check the pet list.                        | The original seeded record remains intact and only one record exists for that identifier. |

#### Postconditions

- No duplicate pet row is created.
- The admin dashboard remains stable after the failed request.
- The seeded data remains intact for the duplicate pet ID.

### Traceability

- Feature: Admin create-pet validation and duplicate prevention
- UI Route: `/`
- API Endpoint(s): `POST /api/pets` and the admin create-pet flow (documented in the PetHub Local app guide)
- Business Rule: Duplicate pet IDs are rejected rather than shadowing the existing record
- Data Source: operational pet store and admin dashboard
- Related Test Case(s): CT008, CT011

### Validation Layers

- UI Assertions: admin dashboard remains available, duplicate request fails visibly
- API Assertions: conflict-style failure for duplicate ID creation
- Data Assertions: no duplicate pet record is created in the operational store
- Integration Assertions: the original operational record remains unchanged and no read-model or downstream drift is introduced by the rejected action

---

## CT011 — Admin — Successful Pet Creation — New Category Is Created

**Test Case ID:** CT011

**Title:** Admin — Successful Pet Creation — New Category Is Created

**Priority:** High

**Severity:** High

**Type:** Positive

**Module:** Admin

**Feature:** Admin pet creation and category handling

**Preconditions:**

- The admin dashboard is open.
- The database is reset to the seed state.
- The test pet ID does not already exist in the operational store.
- The test category does not exist in the seeded category data.

**Test Data:**

- Unique pet ID
- Valid pet name
- New category name not present in the seed data
- Valid price
- Valid pet description and required fields

#### Objective

Verify that an admin can successfully create a new pet and that a new category is automatically created when the submitted category does not already exist.

#### Test Steps

|  ID | Action                                                                                   | Expected Result                                                                                                |
| --: | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
|   1 | Open the admin dashboard.                                                                | Operational tables for pets, users, customers, employees, and orders are visible.                              |
|   2 | Open the create-pet flow.                                                                | The pet creation form is displayed with the required fields.                                                   |
|   3 | Enter valid pet data using a unique pet ID and a category that does not currently exist. | The form accepts the provided pet data and new category.                                                       |
|   4 | Submit the pet creation request.                                                         | The pet is created successfully and a success response or confirmation is displayed.                           |
|   5 | Re-check the pet list.                                                                   | The newly created pet appears with the expected ID, data, and new category.                                    |
|   6 | Verify the category.                                                                     | The new category has been created and is associated with the newly created pet.                                |
|   7 | Verify the created pet and category in the operational store.                            | The new pet and category records exist with the expected values, with no duplicate pet ID or category created. |

#### Postconditions

- The new pet record exists in the operational store.
- The new category exists and is associated with the created pet.
- The created pet is visible through the admin dashboard.
- The original seeded data remains intact.

### Traceability

- Feature: Admin pet creation and category handling
- UI Route: `/`
- API Endpoint(s): `POST /api/pets` and the admin create-pet flow
- Business Rule: A valid pet with a unique ID can be created, and a category that does not exist is automatically created.
- Data Source: operational pet and category stores and admin dashboard
- Related Test Case(s): CT005, CT008

### Validation Layers

- UI Assertions: create-pet form, successful submission, newly created pet, and category visibility
- API Assertions: successful response from `POST /api/pets`
- Data Assertions: new pet and category records exist with the expected values
- Integration Assertions: the newly created pet is associated with the newly created category
