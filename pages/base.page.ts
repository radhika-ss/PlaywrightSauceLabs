import {Frame, FrameLocator, Locator, Page, Selectors, expect } from '@playwright/test';

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

  async getFrameLocator(selector: string ): Promise<FrameLocator> {
    return this.page.frameLocator(selector)
  }

  async getFrameHandle(selector: string): Promise<Frame> {
   const frameLocator = await this.page.waitForSelector(selector);
   const frameHandle = await frameLocator.contentFrame();
    if( !frameHandle) {
      throw new Error(`Frame ${selector} not found`);
    }
    return frameHandle;
}
} 