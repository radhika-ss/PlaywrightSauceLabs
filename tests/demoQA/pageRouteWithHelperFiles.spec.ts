import { test, expect } from '@playwright/test';
import { mockApis } from '../../utils/mockApiHelper';


test.describe('BookStore API Mock Scenarios', () => {

    test.skip('sucess scenario - 200', async({page}) => {
        await mockApis(page, [
        {
        requestFile: 'mocks/requests/bookstore.request.json',
        responseFile: 'mocks/responses/success.response.json',
        status: 200
        }
        ]);

      //   page.on('request', (req) => console.log('REQ:', req.method(), req.url()));
      //  page.on('response', (res) => console.log('RES:', res.status(), res.url()));

        await page.goto('https://demoqa.com/books');
        await expect(page.locator('tbody tr td').nth(1)).toHaveText('Mock Book 1');
    });


    test('No content scenario - 204', async({page}) => {
    await mockApis(page, [
        {
         requestFile: 'mocks/requests/bookstore.request.json',
        responseFile: 'mocks/responses/nocontent.response.json',
        status: 200
        }
    ]);
    
        await page.goto('https://demoqa.com/books');
        
            page.on('response', res => {
    if (res.url().includes('/BookStore/v1/Books'))
        console.log('Books API status:', res.status());
    });

        await expect(page.locator('tbody tr td').nth(1)).toHaveText('No books available');;
    })

  test('Server error scenario - 500', async ({ page }) => {
    await mockApis(page, [
      {
        requestFile:'mocks/requests/bookstore.request.json',
        responseFile: 'mocks/responses/error.response.json',
        status: 500,
      },
    ]);

    await page.goto('https://demoqa.com/books');
    await expect(page.locator('tbody tr')).toHaveCount(0);
  });

  test('Slow API scenario - 200 with delay', async ({ page }) => {
    await mockApis(page, [
      {
        requestFile: 'mocks/requests/bookstore.request.json',
        responseFile: 'mocks/responses/success.response.json',
        status: 200,
        delay: 3000, // 3 seconds delay
      },
    ]);

    await page.goto('https://demoqa.com/books');
    await expect(page.locator('tbody tr td').nth(1)).toHaveText('Mock Book 1');
  });

    test('Network failure scenario - abort', async ({ page }) => {
    await mockApis(page, [
      {
        requestFile: 'mocks/requests/bookstore.request.json',
        status: 0, // not used
        forceNetworkError: true,
      },
    ]);

    await page.goto('https://demoqa.com/books');
    await expect(page.locator('tbody tr')).toHaveCount(0);
  });
});
