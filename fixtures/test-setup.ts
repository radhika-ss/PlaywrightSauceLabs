import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutInformationPage } from '../pages/checkout/checkout-information.page';
import { CheckoutOverviewPage } from '../pages/checkout/checkout-overview.page';
import { CheckoutCompletePage } from '../pages/checkout/checkout-complete.page';
import { FramesPage} from '../pages/demoQA/frames.page';
import { BasePage } from '../pages/base.page';
import { AlertUtil } from '../utils/alertUtils';
import { AlertsPage } from '../pages/demoQA/alerts.page';
import { UploadDownloadPage } from '../pages/demoQA/uploadDownload.page';

type MyFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  framesPage: FramesPage;
  alertUtil: AlertUtil;
  alertsPage: AlertsPage;
  uploadDownloadPage: UploadDownloadPage;
};

export const test = base.extend<MyFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

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
  },

  framesPage: async({page}, use) => {
    await use(new FramesPage(page));
  },

  alertUtil: async({page}, use) => {
    await use(new AlertUtil(page));
  },

  alertsPage: async({page}, use) => {
    await use(new AlertsPage(page));
  },

  uploadDownloadPage: async({page}, use) => {
    await use(new UploadDownloadPage(page));
  }
});

export { expect } from '@playwright/test';
