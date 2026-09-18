# Clinic Test Cases

## CT006 — Clinic — Booking Wizard Happy Path — Appointment Is Created and Displayed

**Test Case ID:** CT006
**Title:** Clinic — Booking Wizard Happy Path — Appointment Is Created and Displayed
**Priority:** High
**Severity:** Medium
**Type:** Positive
**Module:** Clinic
**Feature:** Four-step clinic booking workflow

**Preconditions:**

- PetHub Local is running.
- The clinic booking flow is accessible.
- The database is reset to the baseline seed state.

**Test Data:**

- Valid service selection
- Available veterinarian selection
- Available date and time slot
- Owner details including a valid email and pet name

#### Objective

Verify that the clinic booking wizard completes successfully and creates a valid appointment that is visible in the appointment data.

#### Test Steps

|  ID | Action                             | Expected Result                                                                 |
| --: | ---------------------------------- | ------------------------------------------------------------------------------- |
|   1 | Open /clinic.                      | The first step of the booking wizard is visible.                                |
|   2 | Select a service and veterinarian. | The booking proceeds to the date and slot step.                                 |
|   3 | Choose a valid date and slot.      | The selection is accepted and the next step is enabled.                         |
|   4 | Enter valid owner and pet details. | The details step accepts the values without validation errors.                  |
|   5 | Review the summary.                | All previously selected values are displayed accurately in the review step.     |
|   6 | Submit the booking.                | A confirmation page or success summary is shown with a valid booking reference. |
|   7 | Open the appointments view.        | The appointment is visible and matches the submitted booking details.           |

#### Postconditions

- A valid clinic appointment exists in the app data.
- The booking details are persisted and can be retrieved from the clinic flow.

### Traceability

- Feature: PetHub Clinic booking wizard
- UI Route: /clinic and appointment views
- API Endpoint(s): N/A for the UI wizard flow; the app documents the booking flow and persistence via the clinic booking behavior
- Business Rule: Booking is step-gated and only completes with valid service, date, slot, and owner details
- Data Source: clinic appointment persistence and appointment-display flow in the PetHub Local app documentation
- Related Test Case(s): CT007

### Validation Layers

- UI Assertions: step progression, summary review, confirmation page, appointment visibility
- Data Assertions: appointment details are persisted and visible after creation
- Integration Assertions: the created appointment is consistent with the selected service, vet, slot, and owner details

---

## CT007 — Clinic — Validation Rules — Invalid Input Is Blocked Before Submission

**Test Case ID:** CT007
**Title:** Clinic — Validation Rules — Invalid Input Is Blocked Before Submission
**Priority:** High
**Severity:** High
**Type:** Validation
**Module:** Clinic
**Feature:** Clinic booking validation and unavailable-slot handling

**Preconditions:**

- The clinic booking wizard is open.
- The booking flow has not yet been submitted.

**Test Data:**

- An unavailable time slot such as the disabled 12:00 option
- Invalid email address
- Empty required fields

#### Objective

Confirm that invalid, missing, or unavailable selections are rejected before a clinic appointment is created.

#### Test Steps

|  ID | Action                                                           | Expected Result                                                                                 |
| --: | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
|   1 | Attempt to continue without selecting a service or veterinarian. | The form blocks progression and shows a validation message.                                     |
|   2 | Select an unavailable slot.                                      | The system prevents selection or clearly marks the slot as unavailable.                         |
|   3 | Enter a malformed email address.                                 | A validation error is displayed inline and progression is blocked.                              |
|   4 | Correct the invalid fields and continue.                         | The booking advances once all required rules are satisfied.                                     |
|   5 | Submit the corrected booking.                                    | The appointment is created successfully after validation passes.                                |
|   6 | Attempt to continue without selecting a date.                    | The booking flow blocks progression and a toaster message displays "Choose a date to continue". |

#### Postconditions

- Invalid clinic booking data is rejected.
- Only valid appointments are created.

### Traceability

- Feature: clinic validation rules and step gating
- UI Route: /clinic
- API Endpoint(s): N/A for the UI validation path
- Business Rule: Invalid or unavailable inputs must block progression until the user corrects them
- Data Source: clinic flow documentation for required fields, unavailable slots, and email validation
- Related Test Case(s): CT006

### Validation Layers

- UI Assertions: validation messages, disabled action states, step gating
- Data Assertions: invalid values do not create a booking record
- Integration Assertions: corrected valid inputs allow the booking to complete successfully
