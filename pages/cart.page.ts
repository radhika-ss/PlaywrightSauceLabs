import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { QtyUtils } from '../utils/qtyUtils';

export class CartPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    cartItemRows = () => this.page.locator('.cart_item');
    cartItemQtyValues = () => this.page.locator('.cart_quantity');
    cartItemNames = () => this.page.locator('.cart_item .inventory_item_name');

    inventoryItemName = () => this.page.locator('.inventory_item_name');
    checkout = () => this.page.locator('[data-test="checkout"]');
    continueShoppingButton = () => this.page.locator('[data-test="continue-shopping"]');
    pageTitle = () => this.page.locator('.title');

    async selectCheckoutButton() {
        await this.checkout().click();
    }

    async selectContinueShopping() {
        await this.continueShoppingButton().click();
    }

    async getCartItems(): Promise<String[]> {
        return await this.cartItemNames().allInnerTexts();
    }

    async expectCartContains(items: string[]) {
        const actual = this.getCartItems();
        await expect(this.cartItemRows()).toHaveCount(items.length);
        expect((await actual).sort()).toEqual(items.sort());
    }

    async getItemQuantities(): Promise<number[]> {
        const qtyTexts = await this.cartItemQtyValues().allTextContents();
        return qtyTexts.map(QtyUtils.parse);
    }

    async getTotalQuantity(): Promise<number> {
        const quantities = await this.getItemQuantities();
        return QtyUtils.sum(quantities);
    }

    async getQuantityForItem(itemName: string): Promise<number> {
        const items = this.cartItemRows();
        const count = await items.count();

        for (let i = 0; i < count; i++) {
            const row = items.nth(i);
            const name = await row.locator('.inventory_item_name').textContent();

            if (name === itemName) {
                const qtyLocator = row.locator('.cart_quantity');

                // Wait until the quantity is attached and visible
                await qtyLocator.waitFor({ state: 'visible', timeout: 5000 });

                const qtyText = (await qtyLocator.textContent())?.trim() ?? '0';
                //console.log('RAW QTY TEXT >>>', JSON.stringify(qtyText));

                // Parse safely using QtyUtils
                const result = QtyUtils.parse(qtyText);
                // console.log('PARSED QTY >>>', result);
                return result;
            }
        }

        return 0;
    }

    async getQuantityPerItem(itemName: string): Promise<number> {
        const items = this.cartItemRows();
        const count = await items.count();

        for (let i = 0; i < count; i++) {
            const row = items.nth(i);
            const name = await row.locator('.inventory_item_name').textContent();

            if (name?.trim() === itemName) {
                const qtyText = await row.locator('.cart_quantity').textContent();
                return QtyUtils.parse(qtyText ?? undefined);
            }
        }
        return 0;
    }

    async expectTotalQuantity(expected: number) {
        const actual = await this.getTotalQuantity();
        expect(actual).toBe(expected);
    }

    async expectItemQuantity(itemName: string, expectedQty: number) {
        const actual = await this.getQuantityPerItem(itemName);
        expect(actual).toBe(expectedQty);
    }
}
