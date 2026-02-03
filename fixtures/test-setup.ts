import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutInformationPage } from '../pages/checkout/checkout-information.page';
import { CheckoutOverviewPage } from '../pages/checkout/checkout-overview.page';
import { CheckoutCompletePage } from '../pages/checkout/checkout-complete.page';

type MyFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({page}, use) => {
   await use(new ProductsPage(page));
  },

  cartPage: async({page}, use) => {
    await use(new CartPage(page));
  },

  checkoutInformationPage: async({page}, use) => {
    await use(new CheckoutInformationPage(page));
  },

  checkoutOverviewPage: async({page}, use) => {
    await use(new CheckoutOverviewPage(page));
  },

  checkoutCompletePage: async({page}, use) => {
    await use(new CheckoutCompletePage(page));
  }
});

export { expect } from '@playwright/test';
