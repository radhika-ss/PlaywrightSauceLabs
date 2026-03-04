import {APIRequestContext, expect} from '@playwright/test';


export class BookingAPI {
    constructor(private request: APIRequestContext, private baseURL: string) {} 

    async getAllBookings() {
       return this.request.get(`${this.baseURL}/booking`);
    }

    async getBooking(bookingId: number) {
        return this.request.get(`${this.baseURL}/booking/${bookingId}`);
    }

    async createBooking(payload: any) {
        return this.request.post(`${this.baseURL}/booking`, {data: payload});
    }

    async updateBooking(bookingId: number, booking: any, token: string) {
        return this.request.put(`${this.baseURL}/booking/${bookingId}`, {
            data: booking,
            headers: {Cookie: `token=${token}`},
        });
    }

async deleteBooking(bookingId: number, token: string) {
    return this.request.delete(`${this.baseURL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
    });
}

    async login(credentials: {username: string, password: string}) {
        return this.request.post(`${this.baseURL}/auth`, {data: credentials});
    }
}
