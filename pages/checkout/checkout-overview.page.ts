import { PriceUtils } from '../../utils/priceUtils';
import { BasePage } from '../base.page';
import {expect} from '@playwright/test';

export class CheckoutOverviewPage extends BasePage{
  private lineItemPriceValues = () => this.page.locator('.cart_item .inventory_item_price');
  private itemSubTotalLabel = () => this.page.locator('[data-test="subtotal-label"]');
  private finishBtn = () => this.page.locator('[data-test="finish"]');

  async finishCheckout() {
    await this.finishBtn().click();
  }

  /**
   * Returns the item subtotal value amount presented to end user
   * This represents the system calculated value. 
   */

  async getItemSubTotalAsPresentedToUser(): Promise<number> {
      return PriceUtils.parse(await this.itemSubTotalLabel().textContent() ?? '');
  }

  /**
   * Dervies the expected item subtotal by aggregating 
   * individual product prices displayed in the cart.
   */

  async deriveExpectedItemSubtotalFromLineItems(): Promise<number> {
    const prices = await this.lineItemPriceValues().allTextContents();
    return PriceUtils.sum(prices.map(PriceUtils.parse));
  }

  async expectsubTotalIsCorrect() {
    const actual = await  this.getItemSubTotalAsPresentedToUser();
    const expected = await this.deriveExpectedItemSubtotalFromLineItems();
    expect(actual).toBeCloseTo(expected,2);
  }
}
