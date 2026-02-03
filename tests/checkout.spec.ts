import {test, expect} from "../fixtures/test-setup"

test('E2E checkout scnenario', async({loginPage, productsPage, cartPage, checkoutCompletePage,checkoutOverviewPage, checkoutInformationPage}) => {

    await loginPage.login('standard_user', 'secret_sauce');

    //add two products and verify badge
    await productsPage.addProductAndVerifyBadge('sauce-labs-bike-light', 1);
    await productsPage.addProductAndVerifyBadge('sauce-labs-backpack', 2);
    await productsPage.goToCart();

    //verify the cart page title is 'Your cart'
    await expect(cartPage.pageTitle()).toHaveText('Your Cart');
    await cartPage.selectCheckoutButton();
   
    //verify the checkout Page title is 'Checkout: Your Information'
    await checkoutInformationPage.expectTitleToBe('Checkout: Your Information');
    await checkoutInformationPage.fillInformation({ firstName: 'Mark', lastName: 'Lang', postalCode: '12346' });

    // verify the checkout page title is 'Checkout: Overview'
    await checkoutOverviewPage.expectTitleToBe('Checkout: Overview');
    await checkoutOverviewPage.finishCheckout();

    //verify the confirmation text and image
    await checkoutCompletePage.expectTitleToBe('Checkout: Complete!');
    await checkoutCompletePage.expectOrderSuccess();
    
    await checkoutCompletePage.waitForBackHomeBtnToBeEnabled();
    await productsPage.expectCartBadgeToBeEmpty();
});
