import { Http } from '@nativescript/core';
import { API_URL } from '../config';

export interface RatingData {
  rating: number;
  comment: string;
  timestamp: Date;
}

export class RatingService {
  async getBookingDetails(bookingId: string) {
    try {
      const response = await Http.request({
        url: `${API_URL}/bookings/${bookingId}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to fetch booking details:', error);
      throw error;
    }
  }

  async submitRating(bookingId: string, ratingData: RatingData) {
    try {
      const response = await Http.request({
        url: `${API_URL}/bookings/${bookingId}/rating`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        },
        content: JSON.stringify(ratingData)
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to submit rating:', error);
      throw error;
    }
  }

  private getToken(): string {
    // Get token from secure storage
    return '';
  }
}