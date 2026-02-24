import { test, expect } from '../../fixtures/test-setup';

test.describe('DemoQA Alerts Handling', () => {

  test.beforeEach(async ({ basePage }) => {
    await basePage.navigate('https://demoqa.com/alerts');
  });

  test('Handle all four alerts', async ({ alertUtil, alertsPage }) => {
    // 1️⃣ Simple Alert
    await alertUtil.handleAlert('accept');
    await alertsPage.selectSimpleAlertButton();

    // 2️⃣ Confirm Alert (Dismiss)
    await alertUtil.handleAlert('dismiss');
    await alertsPage.selectConfirmAlertButton();

    expect(await alertsPage.getConfirmResultText())
      .toBe('You selected Cancel');

    // 3️⃣ Prompt Alert
    await alertUtil.handleAlert('accept', 'Radhika');
    await alertsPage.selectPromptAlertButton();

    expect(await alertsPage.getPromptResultText())
      .toContain('Radhika');

    // 4️⃣ Timed Alert (dynamic wait, no fixed timeout)
    // await alertUtil.handleAlert('accept');
    // await alertsPage.selectTimedAlertButton();

    //await alertUtil.handleAlert();
    //await page.locator('#timerAlertButton').click();
    //await page.waitForTimeout(6000);
  });
});
