import { Http } from '@nativescript/core';
import { API_URL } from '../config';
import { SecureStorage } from '../utils/SecureStorage';

export interface EarningsSummary {
  today: number;
  week: number;
  month: number;
  pending: number;
}

export class PaymentService {
  private secureStorage = new SecureStorage();

  async getEarningsSummary(): Promise<EarningsSummary> {
    try {
      const response = await Http.request({
        url: `${API_URL}/staff/earnings`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await this.secureStorage.getToken()}`
        }
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to fetch earnings:', error);
      throw error;
    }
  }

  async getPaymentHistory(period: string = 'month') {
    try {
      const response = await Http.request({
        url: `${API_URL}/staff/payments?period=${period}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await this.secureStorage.getToken()}`
        }
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to fetch payment history:', error);
      throw error;
    }
  }

  async updatePaymentDetails(details: any) {
    try {
      const response = await Http.request({
        url: `${API_URL}/staff/payment-details`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.secureStorage.getToken()}`
        },
        content: JSON.stringify(details)
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to update payment details:', error);
      throw error;
    }
  }
}