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

  async removeAdsIfExist() {
    await this.page.evaluate(() => {
      document.querySelectorAll('iframe[id^="google_ads"]').forEach(el => el.remove());
      document.querySelectorAll('#fixedban').forEach(el => el.remove());
      // Remove full-page Google Vignette overlay if present
      const vignette = document.querySelector('#google_vignette');
      if (vignette) {
        vignette.remove();
      }

      // Also remove any class-based overlay (sometimes it uses 'overlay' or 'modal')
      document.querySelectorAll('.overlay, .modal, .ads, .advertisement').forEach(el => el.remove());

      // If vignette hash present → restore original URL
      if (window.location.hash.includes('google_vignette')) {
        history.replaceState(null, '', window.location.pathname);
      }

    });
  }
} 
