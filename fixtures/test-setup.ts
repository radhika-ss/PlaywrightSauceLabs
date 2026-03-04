import { test as base, APIRequestContext, APIRequest } from '@playwright/test';
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
import { BookingAPI } from '../api/bookingAPI';
import { getEnvironment, getCredentials } from '../config/config';


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
  bookingAPI: BookingAPI;
  envSettings: ReturnType<typeof getEnvironment>;
  creds: ReturnType<typeof getCredentials>;
};

export const test = base.extend<MyFixtures>({
  // Provide the environment settings
  envSettings: async ({}, use) => {
    await use(getEnvironment()); // returns the typed environment object
  },

  // Provide credentials for current env
  creds: async ({}, use) => {
    await use(getCredentials()); // returns {username, password}
  },

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
  },

  bookingAPI: async ({ request, envSettings }, use) => {
    await use(new BookingAPI(request, envSettings.baseURL));
  },
});

export { expect } from '@playwright/test';
