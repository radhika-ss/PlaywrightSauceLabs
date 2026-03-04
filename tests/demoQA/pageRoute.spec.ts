import { test, expect } from '@playwright/test';

test('mock BookStore API', async ({ page }) => {
  // intercept the GET /Books API
  await page.route('**/BookStore/v1/Books', async route => {
    const mockBooks = {
      books: [
        { isbn: '123', title: 'Mock Book 1', author: 'Author A' },
        { isbn: '456', title: 'Mock Book 2', author: 'Author B' },
      ],
    };
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockBooks),
    });
  });

  await page.goto('https://demoqa.com/books');

  const firstBook = page.locator('tbody tr td').nth(1);
  await expect(firstBook).toHaveText('Mock Book 1');
});
