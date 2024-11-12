import { Http } from '@nativescript/core';
import { API_URL } from '../config';

export class BookingService {
  async getUpcomingBookings() {
    try {
      const response = await Http.request({
        url: `${API_URL}/bookings/upcoming`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      throw error;
    }
  }

  async createBooking(bookingData: any) {
    try {
      const response = await Http.request({
        url: `${API_URL}/bookings`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        },
        content: JSON.stringify(bookingData)
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to create booking:', error);
      throw error;
    }
  }

  private getToken(): string {
    // Get token from secure storage
    return '';
  }
}