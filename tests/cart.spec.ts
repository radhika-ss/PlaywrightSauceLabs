import { test } from '../fixtures/test-setup';

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
