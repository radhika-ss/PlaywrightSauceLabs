import { test, expect } from '@playwright/test';

test.describe('My test suite', () => {

  test.beforeAll(async () => {
    console.log('Runs once before all tests in this describe block');
  });

  test.afterAll(async () => {
    console.log('Runs once after all tests in this describe block');
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
  });

  test.afterEach(async () => {
    console.log('Runs after each test');
  });

  test('test 1', async ({ page }) => {
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('test 2', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Example Domain');
  });
});
