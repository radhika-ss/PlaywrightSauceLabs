import { Page } from '@playwright/test';
import { BasePage } from '../base.page';


export class AlertsPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    simpleAlertButton = () => this.page.locator('#alertButton');
    confirmAlertButton = () => this.page.locator('#confirmButton');
    promptAlertButton = () => this.page.locator('#promtButton');
    timedAlertButton = () => this.page.locator('#timerAlertButton');

    async selectSimpleAlertButton() {
        await this.simpleAlertButton().click();
    }

    async selectConfirmAlertButton() {
        await this.confirmAlertButton().click();
    }

    async selectPromptAlertButton() {
        await this.promptAlertButton().click();
    }

    async selectTimedAlertButton() {
        await this.timedAlertButton().click();
    }

    async getConfirmResultText(): Promise<string> {
        return await this.page.locator('#confirmResult').textContent() ?? '';
    }

    async getPromptResultText(): Promise<string> {
        return await this.page.locator('#promptResult').textContent() ?? '';
    }

    async waitForTimedAlertButton() {
        this.page.waitForSelector('')
    }
}
