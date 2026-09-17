# Operations Test Cases

## CT008 — Operations — Cross-System Reconciliation — Data Is Compared Across Stores

**Test Case ID:** CT008
**Title:** Operations — Cross-System Reconciliation — Data Is Compared Across Stores
**Priority:** High
**Severity:** High
**Type:** Reconciliation
**Module:** Operations
**Feature:** Cross-system comparison of operational data, read models, and downstream replicas

**Preconditions:**
- The app is running and the database is reset to the seeded baseline.
- At least one order or pet exists in the operational store.

**Test Data:**
- Known seeded order or pet
- Operations comparison view

#### Objective
Verify that the operations portal compares the source-of-truth operational store against the CQRS read-model projection and downstream replica stores and clearly exposes differences where they exist.

#### Test Steps

| ID | Action | Expected Result |
|---:|---|---|
| 1 | Open the Operations portal. | The comparison page loads successfully. |
| 2 | Inspect a known seeded record or order. | The source operational data, read-model projection, and downstream replica data are all displayed for the same entity. |
| 3 | Compare the relevant values across the three stores. | Matching records align with the expected business values and any drift is clearly visible in the operations view. |
| 4 | Trigger a new transactional event such as an order creation flow. | The new business event is reflected in the operational store and then projected into the read-model and downstream replica views according to the documented architecture. |

#### Postconditions
- The three stores are visible and comparable in the operations portal.
- A QA engineer can distinguish the source-of-truth store, derived read-model store, and downstream replica data.

### Traceability
- Feature: cross-system data reconciliation for orders, pets, users, and other domain entities
- UI Route: /ops
- API Endpoint(s): N/A for the web comparison view; the operational and derived stores are documented in the PetHub Local architecture and app guide
- Business Rule: the operational store is the source of truth; read models and downstream stores reflect derived data and replica data
- Data Source: operational JSON database, read-model JSON database, downstream replica JSON database
- Related Test Case(s): CT002, CT005

### Validation Layers
- UI Assertions: comparison view displays the expected source, derived, and downstream sections
- Data Assertions: the relevant entity values are aligned with the documented store mapping
- Integration Assertions: projection and replica data are compared to the operational store and any drift is visible
