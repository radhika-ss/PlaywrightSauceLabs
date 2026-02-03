import { Page, expect } from '@playwright/test';
import { BasePage } from "../base.page";

export class CheckoutInformationPage extends BasePage {

    firstName = () => this.page.locator('#first-name');
    lastName = () => this.page.locator('#last-name');
    postalCode = () => this.page.locator('#postal-code');
    continueBtn = () => this.page.locator('[data-test="continue"]');

    async fillInformation(info: {
        firstName: string;
        lastName: string;
        postalCode: string;
    }) {
        await this.firstName().fill(info.firstName);
        await this.lastName().fill(info.lastName);
        await this.postalCode().fill(info.postalCode);
        await this.continueBtn().click();
    }
}
