import {test, expect, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';


test('Multi-user test scenario', async({browser}) => {
   
   // declare the contexts up‑front with an explicit type
    let user1Context: BrowserContext | undefined;
    let user2Context: BrowserContext | undefined;

    await test.step('user1 flow', async () => {
        user1Context = await browser.newContext();
        const page = await user1Context.newPage();

        const user1Login = new LoginPage(page);
        const user1Products = new ProductsPage(page);

        await user1Login.login('standard_user', 'secret_sauce');
        await user1Products.addProductToCart('sauce-labs-bike-light');

        // Assertions
        await expect(user1Products.cartBadge()).toHaveText('1');
   });

   await test.step('user2 flow', async () => {
        user2Context = await browser.newContext();
        const page = await user2Context.newPage();

        const user2Login = new LoginPage(page);
        const user2Products = new ProductsPage(page);

        await user2Login.login('standard_user', 'secret_sauce');
        await user2Products.addProductToCart('sauce-labs-backpack');

        //asertion
        await expect(user2Products.cartBadge()).toHaveText('1');
   });

   //clean up
    await user1Context?.close();
    await user2Context?.close();
});


test('example', async () => {
  let value: string | undefined;

  await test.step('step', async () => {
    value = 'hello';
  });

  console.log(value);
});