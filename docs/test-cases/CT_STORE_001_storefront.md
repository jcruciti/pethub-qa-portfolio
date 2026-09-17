# Storefront Test Cases

## CT001 — Storefront — Valid Login — User Is Redirected to Inventory

**Test Case ID:** CT001
**Title:** Storefront — Valid Login — User Is Redirected to Inventory
**Priority:** High
**Severity:** Medium
**Type:** Positive
**Module:** Storefront
**Feature:** Storefront authentication and protected-route access

**Preconditions:**
- PetHub Local is running on http://127.0.0.1:3000.
- The database has been reset to the seeded baseline.
- No storefront session is active.

**Test Data:**
- Username: standard_user
- Password: pethub123

#### Objective
Verify that a valid storefront user can authenticate, access protected pages, and then terminate the session without leaving protected routes accessible.

#### Test Steps

| ID | Action | Expected Result |
|---:|---|---|
| 1 | Open /shop without a session. | The login form is displayed, and the protected navigation links are not visible. |
| 2 | Enter standard_user and pethub123. | The credentials are accepted. |
| 3 | Submit the login form. | The user is redirected to the storefront inventory view. |
| 4 | Review the navigation after login. | Inventory, Cart, and Checkout are visible for the authenticated session. |
| 5 | Navigate directly to /shop/cart and /shop/checkout. | Both pages load successfully for the active session. |
| 6 | Sign out. | The session is cleared and the app returns to the sign-in state. |
| 7 | Attempt to access /shop/inventory after logout. | The user is redirected back to /shop and must sign in again. |

#### Postconditions
- The storefront session is ended after logout.
- Protected storefront pages are not accessible without re-authentication.

### Traceability
- Feature: Storefront authentication and protected route behavior
- UI Route: /shop, /shop/inventory, /shop/cart, /shop/checkout
- API Endpoint(s): N/A for the UI flow
- Business Rule: Inventory, Cart, and Checkout are protected until the storefront session is active; logout clears the session
- Data Source: Seeded storefront users and documented session behavior in the PetHub Local app guide
- Related Test Case(s): CT010

### Validation Layers
- UI Assertions: login form, redirect, navigation state, protected route accessibility
- Data Assertions: no protected session remains after logout
- Integration Assertions: session state is consistent with log-in and log-out behavior

---

## CT002 — Storefront — Add Items to Cart — Cart Badge and Totals Update Correctly

**Test Case ID:** CT002
**Title:** Storefront — Add Items to Cart — Cart Badge and Totals Update Correctly
**Priority:** High
**Severity:** High
**Type:** Positive
**Module:** Storefront
**Feature:** Storefront cart and checkout flow

**Preconditions:**
- The user is logged in as standard_user.
- The inventory page is visible and contains available pets.

**Test Data:**
- Username: standard_user
- Password: pethub123
- One or more available pets from the inventory grid
- Valid customer information for checkout

#### Objective
Verify that the standard storefront persona can add items to the cart, confirm the cart state, and complete a valid checkout flow without invalid data or broken totals.

#### Test Steps

| ID | Action | Expected Result |
|---:|---|---|
| 1 | Add one or more available pets to the cart. | The cart badge reflects the number of cart lines according to the app’s documented cart behavior. |
| 2 | Open the cart. | The selected item list, line totals, and subtotal are displayed. |
| 3 | Remove one item or update the quantity. | The cart count and subtotal update to match the current cart state. |
| 4 | Continue to checkout. | The checkout form is presented with the expected required fields. |
| 5 | Submit valid customer information. | The user advances to the confirmation page. |
| 6 | Review the confirmation. | The confirmation page is displayed and the order creation flow proceeds according to the documented storefront checkout behavior. |

#### Postconditions
- The cart reflects the final item list and totals for the completed flow.
- A valid storefront order can proceed through the documented checkout workflow.

### Traceability
- Feature: Storefront cart, totals, and checkout
- UI Route: /shop/inventory, /shop/cart, /shop/checkout, /shop/complete
- API Endpoint(s): N/A for the UI flow; the app documents checkout as creating a real order in the operational store
- Business Rule: Cart state is session-scoped and totals must reflect the selected pets; valid checkout produces a confirmation page
- Data Source: operational order creation documented in the PetHub app guide and storefront checkout flow
- Related Test Case(s): CT008

### Validation Layers
- UI Assertions: cart badge, cart page state, checkout form, confirmation page
- Data Assertions: item and total values are consistent with the current cart state
- Integration Assertions: checkout completion aligns with the documented order-creation flow

---

## CT003 — Storefront — Problem User Defect — Add-to-Cart and Checkout Fail Intentionally

**Test Case ID:** CT003
**Title:** Storefront — Problem User Defect — Add-to-Cart and Checkout Fail Intentionally
**Priority:** Medium
**Severity:** Medium
**Type:** Regression
**Module:** Storefront
**Feature:** Intentional storefront defect persona

**Preconditions:**
- The user is logged in as problem_user.
- The inventory page is visible.

**Test Data:**
- Username: problem_user
- Password: pethub123
- A Birds category item
- Checkout form with a missing last name

#### Objective
Validate the documented intentional defect behavior for the problem_user persona without treating the behavior as a defect to be fixed. This test protects the seeded QA exercise behavior.

#### Test Steps

| ID | Action | Expected Result |
|---:|---|---|
| 1 | Change the inventory sort control. | The dropdown and URL may update, but the visible product order does not change. |
| 2 | Add a Birds item to the cart. | The success toast may display, but the item is not actually added to the cart. |
| 3 | Open the cart. | The Birds item is absent from the cart, or the cart remains empty. |
| 4 | Begin checkout and leave Last Name blank. | The system rejects the order and displays the documented validation message. |
| 5 | Submit valid checkout data with a last name included. | Checkout still fails because the last name is dropped in the documented problem_user flow. |

#### Postconditions
- The order is not created.
- The intentional defect remains reproducible and visible to QA as part of the seeded exercise.

### Traceability
- Feature: problem_user storefront persona and intentional defect behavior
- UI Route: /shop/inventory, /shop/cart, /shop/checkout
- API Endpoint(s): N/A for this persona-specific UI behavior
- Business Rule: This persona intentionally demonstrates broken sort, broken Birds add-to-cart behavior, and a rejected last name in checkout
- Data Source: documented problem_user behavior in the PetHub Local app guide
- Related Test Case(s): CT001, CT002, CT010

### Validation Layers
- UI Assertions: sort control state, missing cart item, validation message, failed checkout
- Data Assertions: the order is not created and the cart remains unchanged
- Integration Assertions: this flow intentionally preserves the seeded defect state and does not correct it

---

## CT004 — Storefront — Performance User — Delayed Responses Do Not Break the Flow

**Test Case ID:** CT004
**Title:** Storefront — Performance User — Delayed Responses Do Not Break the Flow
**Priority:** Medium
**Severity:** Medium
**Type:** Resilience
**Module:** Storefront
**Feature:** Delayed-response persona and storefront resilience

**Preconditions:**
- The user is logged in as performance_user.
- The app is running with the documented delayed-response behavior enabled.

**Test Data:**
- Username: performance_user
- Password: pethub123
- One selectable pet from the inventory list

#### Objective
Verify that the performance_user persona’s injected latency remains deterministic and that the storefront remains functionally usable without data loss or session failure.

#### Test Steps

| ID | Action | Expected Result |
|---:|---|---|
| 1 | Log in as performance_user. | Authentication succeeds. |
| 2 | Open the inventory page. | The page eventually renders the inventory grid after the documented delay. |
| 3 | Open a pet detail page. | The detail page loads successfully and displays the expected product information. |
| 4 | Add an item to the cart. | The cart updates only after the delayed response completes. |
| 5 | Continue through checkout. | The user can complete the documented flow without losing cart state or session state. |

#### Postconditions
- The user remains authenticated.
- The delayed storefront response does not break the cart or checkout workflow.

### Traceability
- Feature: performance_user persona and delayed response behavior
- UI Route: /shop/inventory, /shop/item/:id, /shop/cart, /shop/checkout
- API Endpoint(s): N/A for the documented delayed-response UI behavior
- Business Rule: The app intentionally delays responses for this persona while preserving the user flow
- Data Source: documented performance_user behavior in the PetHub Local app guide
- Related Test Case(s): CT001, CT002

### Validation Layers
- UI Assertions: page load, item detail load, cart update, checkout continuity
- Data Assertions: cart state is retained throughout the delayed-response flow
- Integration Assertions: session remains valid and no data loss occurs across the flow

---

## CT010 — Storefront — Locked-Out User — Login Is Rejected and Session Is Not Created

**Test Case ID:** CT010
**Title:** Storefront — Locked-Out User — Login Is Rejected and Session Is Not Created
**Priority:** High
**Severity:** High
**Type:** Authorization
**Module:** Storefront
**Feature:** Storefront account lockout and authorization rejection

**Preconditions:**
- The storefront login page is open.
- No storefront session is active.
- The locked_out_user account is seeded.

**Test Data:**
- Username: locked_out_user
- Password: pethub123

#### Objective
Confirm that a locked-out user is rejected during authentication and that no protected session is created.

#### Test Steps

| ID | Action | Expected Result |
|---:|---|---|
| 1 | Open the storefront login page. | The login form is displayed. |
| 2 | Enter locked_out_user and pethub123. | The login attempt is rejected. |
| 3 | Review the returned message or page state. | A locked-out message is displayed and the user remains on the sign-in page. |
| 4 | Attempt to access a protected storefront route directly. | The request is redirected back to /shop and requires authentication. |
| 5 | Confirm the session state. | No authenticated storefront session is created. |

#### Postconditions
- The locked-out account remains blocked from storefront access.
- No protected storefront session is created.

### Traceability
- Feature: storefront authentication rejection and protected-route access controls
- UI Route: /shop and protected storefront routes
- API Endpoint(s): N/A for the UI login flow
- Business Rule: The locked_out_user account is intentionally rejected by the storefront login process
- Data Source: storefront demo personas in the PetHub Local app guide
- Related Test Case(s): CT001

### Validation Layers
- UI Assertions: login page remains visible and error state is shown
- Data Assertions: the session is not created for the locked-out account
- Integration Assertions: direct access to protected routes remains blocked
