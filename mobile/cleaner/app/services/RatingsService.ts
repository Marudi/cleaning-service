import { Http } from '@nativescript/core';
import { API_URL } from '../config';

export interface Rating {
  id: string;
  bookingId: string;
  rating: number;
  comment: string;
  customerName: string;
  date: string;
}

export class RatingsService {
  async getCleanerRatings(period: string = 'all') {
    try {
      const response = await Http.request({
        url: `${API_URL}/staff/ratings?period=${period}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to fetch ratings:', error);
      throw error;
    }
  }

  async getRatingStats() {
    try {
      const response = await Http.request({
        url: `${API_URL}/staff/ratings/stats`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to fetch rating stats:', error);
      throw error;
    }
  }

  private getToken(): string {
    // Get token from secure storage
    return '';
  }
}