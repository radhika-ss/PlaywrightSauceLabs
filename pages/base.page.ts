import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) { }

  pageTitle = () => this.page.locator('.title');

    async expectClickable(locator: Locator) {
    await locator.waitFor({ state: 'attached' });
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
  }

  async navigate(path: string) {
    await this.page.goto(path);
  }

  async expectTitleToBe(title: string) {
    await expect(this.pageTitle()).toHaveText(title);
  }
}