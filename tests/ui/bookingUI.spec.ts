// tests/ui/bookingUI.spec.ts
import { test, expect } from '../../fixtures/test-setup';
import bookingData from '../../testData/bookingData.json';

test('Booking created via API appears in UI', async ({ bookingAPI, page }) => {
    // 1️⃣ Create booking via API
    const createResp = await bookingAPI.createBooking(bookingData.validBooking);
    const bookingId = (await createResp.json()).bookingid;

    // 2️⃣ Visit UI
    await page.goto('https://restful-booker.herokuapp.com/');
    
    // Example: check if booking ID exists on UI table (depends on actual UI implementation)
    const bookingRow = page.locator(`text=${bookingId}`);
    await expect(bookingRow).toBeVisible();

    // 3️⃣ Optional: cleanup via API
    const tokenResp = await bookingAPI.login(bookingData.authCredentials);
    const token = (await tokenResp.json()).token;
    await bookingAPI.deleteBooking(bookingId, token);
});
