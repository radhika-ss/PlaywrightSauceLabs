import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  cart = () => this.page.locator('.shopping_cart_link');

  pageTitle = () => this.page.locator('.title');

  addToCartBtn = (item: string) =>
    this.page.locator(`[data-test="add-to-cart-${item}"]`);

  removeBtn = (item: string) => 
     this.page.locator(`[data-test="remove-${item}"]`);

  cartBadge = () => this.page.locator('.shopping_cart_badge');

  async goToCart() {
    await this.cart().click();
  }

  async addProductToCart(item: string) {
    await this.addToCartBtn(item).click();
  }

  async removeProductFromCart(item: string) {
    await this.removeBtn(item).click();
  }

  async addProductAndVerifyBadge(item: string, count: number) {
      await this.addToCartBtn(item).click();
      await expect(this.cartBadge()).toHaveText(count.toString());
  }

  async waitForAddToCartBtnToBeEnabled(item: string) {
    await this.expectClickable(this.addToCartBtn(item));
  }

  async expectCartBadgeToBeEmpty() {
   await expect(this.cartBadge()).toHaveCount(0);
  }
  async expectCartBadgeCount(expected: number) {
    await expect(this.cartBadge()).toHaveText(expected.toString());
  }
}
