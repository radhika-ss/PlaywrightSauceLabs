import { test} from '../fixtures/test-setup';

test('should display item subtotal equivalent to the sum of all line item prices', async ({ loginPage, productsPage, cartPage, checkoutInformationPage,checkoutOverviewPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    //add two products and verify badge
    await productsPage.addProductAndVerifyBadge('sauce-labs-bike-light', 1);
    await productsPage.addProductAndVerifyBadge('sauce-labs-backpack', 2);
    await productsPage.goToCart();

    await cartPage.selectCheckoutButton();
    await checkoutInformationPage.fillInformation({ firstName: 'Mark', lastName: 'Lang', postalCode: '12346' });
    await checkoutOverviewPage.expectsubTotalIsCorrect();
});
