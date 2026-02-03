import {test, expect} from "../fixtures/test-setup";

test.describe('Products & Cart Flow', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Add products and verify cart badge', async ({ productsPage }) => {
    await productsPage.addProductAndVerifyBadge('sauce-labs-bike-light', 1);
    await productsPage.addProductAndVerifyBadge('sauce-labs-backpack', 2);
  });

  test('Verify products page title', async ({ productsPage }) => {
    await expect(productsPage.pageTitle()).toHaveText('Products');
  });

  test('Remove product updates badge and add button', async ({ productsPage }) => {
    await productsPage.addProductAndVerifyBadge('sauce-labs-bike-light', 1);
    await productsPage.removeProductFromCart('sauce-labs-bike-light');
    await productsPage.waitForAddToCartBtnToBeEnabled('sauce-labs-bike-light');
    await productsPage.expectCartBadgeToBeEmpty();
  });

  test('Verify items in cart', async ({ productsPage, cartPage }) => {
    await productsPage.addProductToCart('sauce-labs-backpack');
    await productsPage.addProductToCart('sauce-labs-bike-light');
    await productsPage.goToCart();

    await cartPage.expectCartContains([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light'
    ]);
  });
});
