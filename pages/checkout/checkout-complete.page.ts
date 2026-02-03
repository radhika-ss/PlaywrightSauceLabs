import { expect } from '@playwright/test'
import { BasePage } from "../base.page";

export class CheckoutCompletePage extends BasePage {

  completeHeader = () => this.page.locator('.complete-header');
  backHomeBtn = () => this.page.locator('[data-test="back-to-products"]');
  tickMarkImage = () => this.page.locator('[data-test="pony-express"]');
  orderCompleteText = () => this.page.locator('[data-test="complete-text"]')

  async expectOrderSuccess() {
    await expect(this.tickMarkImage()).toBeVisible();
    await expect(this.completeHeader()).toHaveText('Thank you for your order!');
    await expect(this.orderCompleteText()).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  }

  async goBackHome() {
    await this.backHomeBtn().click();
  }

  async waitForBackHomeBtnToBeEnabled() {
    await this.expectClickable(this.backHomeBtn());
  }

  async selectBackHomeButton() {
    await this.backHomeBtn().click();
  }

}
