import {test, expect} from '../../fixtures/test-setup';
import bookingData from '../../testData/bookingData.json';


test.skip('create, fetch and delete booking', async({bookingAPI, creds}) => {

    //create
    const createResp = await bookingAPI.createBooking(bookingData.validBooking);
    expect(createResp.status()).toBe(200);
    const bookingId = (await createResp.json()).bookingid;

    //Fetch
    const fetchResp = await bookingAPI.getBooking(bookingId);
    expect(fetchResp.status()).toBe(200);

    //Login
    //const tokenResp = await bookingAPI.login(bookingData.authCredentials);
    const tokenResp = await bookingAPI.login(creds);
    const token = (await tokenResp.json()).token;

    //Delete
    const deleteResp = await bookingAPI.deleteBooking(bookingId, token);
    expect(deleteResp.status()).toBe(201);
});

