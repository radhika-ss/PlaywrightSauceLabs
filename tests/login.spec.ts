import { test, expect } from '../fixtures/test-setup';

test.describe('Login Tests', () => {
    test('Valid login', async ({ loginPage }) => {
      await loginPage.login('standard_user', 'secret_sauce');
      await loginPage.expectTitleToBe(/Swag Labs/);
    });

    test('Invalid login shows error', async ({ loginPage }) => {
      await loginPage.login('wrong', 'wrong');
      await loginPage.assertErrorVisible();
    });
});


/*
Key takeaway: the tests had Pass normally, but failed in debug: reason, we need to await, if defined a method as async, this was causing issue.
Also, had beforeEach part, which logged in, for first testcase it was fine, but second TC was not, because it needed loginpage to enter wrong credentials.
*/