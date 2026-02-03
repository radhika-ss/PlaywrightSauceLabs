import { test, expect } from '@playwright/test';

/*
import {Page} from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutOverviewPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    checkoutOverviewPageTitle = ()=> this.page.locator(".title");

    itemPrice = ()=> this.page.locator(".cart_item .inventory_item_price");

    subtotalAmount= ()=> {
        return this.page.locator('[data-test="subtotal-label"]');
    }

    quantity = ()=> this.page.locator('.cart_item .cart_quantity');
    
async getSubTotalValue(): Promise<number> {
    //    const text= await this.subtotalAmount().textContent();
    //    return Number(text?.replace(/[^\d.]/g, ''));
    return Number((await this.subtotalAmount().textContent())?.match(/[\d.]+/)?.[0] ?? 0);

    }

    async getItemExpectedTotalPrice(): Promise<number> {
        return (await this.itemPrice().allTextContents())
        .map(text => Number(text?.trim().replace(/[^\d.]/g, '') || 0))
        .reduce((sum, price) => sum + price, 0);
    }

    
}
await checkoutPage.clickOnContinue();
  await expect(checkoutOverviewPage.checkoutOverviewPageTitle()).toHaveText('Checkout: Overview');
  const itemsExpectedTotalPrice = await checkoutOverviewPage.getItemExpectedTotalPrice();
  const itemsActualTotalPrice = await checkoutOverviewPage.getSubTotalValue();
  await expect(itemsActualTotalPrice).toEqual(itemsExpectedTotalPrice);
*/


test('dummy test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page).toHaveTitle(/Swag Labs/);
});