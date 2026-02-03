import {Page, expect} from '@playwright/test';

import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
constructor(page: Page) {
    super(page);
}

checkoutTitle = () => this.page.locator('.title');
thankYouForYourOrderText = ()=> this.page.locator('.complete-header');

firstName = () => this.page.locator('[data-test="firstName"]');
lastName = () => this.page.locator('[data-test="lastName"]');
postalCode = () => this.page.locator('[data-test="postalCode"]');

continueBtn = () => this.page.locator('[data-test="continue"]');
cancelBtn = () => this.page.locator('[data-test="cancel"]');
finishBtn = () => this.page.locator('[data-test="finish"]');
backHomeBtn = () => this.page.locator('[data-test="back-to-products"]');
tickMarkImage = () => this.page.locator('[data-test="pony-express"]');
orderCompleteText = () => this.page.locator('[data-test="complete-text"]')

async selectContinueButton() {
    await this.continueBtn().click();
}

async selectCancelButton() {
    await this.cancelBtn().click();
}

async finishCheckout() {
    await this.finishBtn().click();
}

async selectBackHomeButton() {
    await this.backHomeBtn().click();
}

async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstName().fill(firstName);
    await this.lastName().fill(lastName);
    await this.postalCode().fill(postalCode);
}

async assertTitle(expected: string) {
    await expect(this.checkoutTitle()).toHaveText(expected);
}

async waitForBackHomeBtnToBeEnabled() {
    await this.expectClickable(this.backHomeBtn());
}

}
