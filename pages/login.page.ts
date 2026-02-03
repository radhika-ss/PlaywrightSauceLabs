import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {

  constructor(page: Page) {
    super(page); // Call BasePage constructor
  }

  pageTitle = () => this.page.locator('.app_logo');
  usernameField = () => this.page.locator('#user-name');
  passwordField = () => this.page.locator('#password');
  loginBtn = () => this.page.locator('#login-button');
  errorMsg = () => this.page.locator('[data-test="error"]');

  async login(username: string, password: string) {
    await this.navigate('/');
    await this.usernameField().fill(username);
    await this.passwordField().fill(password);
    await this.loginBtn().click();
  }

  async assertErrorVisible() {
    await expect(this.errorMsg()).toBeVisible();
  }

  async expectTitleToBe(expected: RegExp) {
    await expect(this.page).toHaveTitle(expected);
  }
}
