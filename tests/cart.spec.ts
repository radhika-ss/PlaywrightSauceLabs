import { test, expect } from '../fixtures/test-setup';

test.describe('Qty verification Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('verify quantity of items in cart', async ({cartPage, productsPage }) => {
        //addd two products
        await productsPage.addProductToCart('sauce-labs-backpack');
        await productsPage.addProductToCart('sauce-labs-bike-light');

        await productsPage.goToCart();

        await cartPage.expectItemQuantity('Sauce Labs Backpack', 1);
        await cartPage.expectItemQuantity('Sauce Labs Bike Light', 1);
    });

    test('Verify total cart quantity', async ({ productsPage, cartPage }) => {
        await productsPage.addProductToCart('sauce-labs-backpack');
        await productsPage.addProductToCart('sauce-labs-bike-light');

        await productsPage.goToCart();

        await cartPage.expectTotalQuantity(2);
    });
});


test.describe('Cart Workflow Verification', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Add Items to Cart (Happy Path)', async ({ productsPage, cartPage }) => {
    // Add two different products
    await productsPage.addProductToCart('sauce-labs-backpack');
    await productsPage.addProductToCart('sauce-labs-bike-light');

    // Verify the cart badge shows 2
    await productsPage.expectCartBadgeCount(2);

    // Go to cart and verify both items are present
    await productsPage.goToCart();
    await expect(cartPage.cartItemNames().filter({ hasText: 'Sauce Labs Backpack' })).toHaveCount(1);
    await expect(cartPage.cartItemNames().filter({ hasText: 'Sauce Labs Bike Light' })).toHaveCount(1);
  });

  test('Remove Item from Cart (Happy Path)', async ({ productsPage, cartPage }) => {
    // Add two products
    await productsPage.addProductToCart('sauce-labs-backpack');
    await productsPage.addProductToCart('sauce-labs-bike-light');
    await productsPage.expectCartBadgeCount(2);

    // Remove 'Sauce Labs Bike Light' from the products page
    await productsPage.removeProductFromCart('sauce-labs-bike-light');
    await productsPage.expectCartBadgeCount(1);

    // Go to cart and verify only 'Sauce Labs Backpack' is present
    await productsPage.goToCart();
    await expect(cartPage.cartItemNames().filter({ hasText: 'Sauce Labs Backpack' })).toHaveCount(1);
    await expect(cartPage.cartItemNames().filter({ hasText: 'Sauce Labs Bike Light' })).toHaveCount(0);
  });

  test('Badge Verification with Empty Cart (Negative Case)', async ({ productsPage }) => {
    // Do not add any items
    // Verify the cart badge is not visible
    await productsPage.expectCartBadgeToBeEmpty();
  });
});
