# Cart Workflow Test Plan for SauceDemo

## Application Overview

This test plan verifies the cart workflow on https://www.saucedemo.com/, including adding items, removing items (from the products page), and badge visibility. Each step specifies the page and UI element to interact with.

## Test Scenarios

### 1. Cart Workflow Verification

**Seed:** `tests/cart.spec.ts`

#### 1.1. Add Items to Cart (Happy Path)

**File:** `tests/cart.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/.
    - expect: Login page is displayed.
  2. On the Login page, enter username 'standard_user' and password 'secret_sauce', then click the Login button.
    - expect: User is logged in and redirected to the Products page.
  3. On the Products page, click the Add to cart button for 'Sauce Labs Backpack'.
    - expect: 'Sauce Labs Backpack' is added to the cart.
  4. On the Products page, click the Add to cart button for 'Sauce Labs Bike Light'.
    - expect: 'Sauce Labs Bike Light' is added to the cart.
  5. On the Products page, verify the cart badge (top right) displays '2'.
    - expect: Cart badge shows '2'.
  6. Click the cart icon (top right) to go to the Cart page.
    - expect: Cart page is displayed.
  7. On the Cart page, verify both 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' are listed.
    - expect: Both items are present in the cart.

#### 1.2. Remove Item from Cart (Happy Path)

**File:** `tests/cart.spec.ts`

**Steps:**
  1. Ensure you are on the Products page with 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' already added to the cart (repeat steps 1–5 from above if needed).
    - expect: Both items are in the cart.
  2. On the Products page, click the Remove button for 'Sauce Labs Bike Light'.
    - expect: 'Sauce Labs Bike Light' is removed from the cart.
  3. Verify the cart badge (top right) now displays '1'.
    - expect: Cart badge shows '1'.
  4. Click the cart icon (top right) to go to the Cart page.
    - expect: Cart page is displayed.
  5. On the Cart page, verify only 'Sauce Labs Backpack' is listed and 'Sauce Labs Bike Light' is not present.
    - expect: Only 'Sauce Labs Backpack' remains in the cart.

#### 1.3. Badge Verification with Empty Cart (Negative Case)

**File:** `tests/cart.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/ and log in as 'standard_user' (repeat steps 1–2 from above).
    - expect: User is on the Products page.
  2. On the Products page, ensure no items have been added to the cart (do not click any Add to cart buttons).
    - expect: Cart is empty.
  3. Verify the cart badge (top right) is not visible.
    - expect: Cart badge is not displayed when no items are in the cart.
