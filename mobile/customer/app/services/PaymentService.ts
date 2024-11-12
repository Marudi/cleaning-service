import { Http } from '@nativescript/core';
import { API_URL } from '../config';
import { SecureStorage } from '../utils/SecureStorage';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account';
  last4: string;
  isDefault: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
}

export class PaymentService {
  private secureStorage = new SecureStorage();

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const response = await Http.request({
        url: `${API_URL}/payments/methods`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await this.secureStorage.getToken()}`
        }
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to fetch payment methods:', error);
      throw error;
    }
  }

  async addPaymentMethod(paymentDetails: any): Promise<PaymentMethod> {
    try {
      const response = await Http.request({
        url: `${API_URL}/payments/methods`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.secureStorage.getToken()}`
        },
        content: JSON.stringify(paymentDetails)
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to add payment method:', error);
      throw error;
    }
  }

  async processPayment(bookingId: string, paymentMethodId: string): Promise<PaymentIntent> {
    try {
      const response = await Http.request({
        url: `${API_URL}/payments/process`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.secureStorage.getToken()}`
        },
        content: JSON.stringify({ bookingId, paymentMethodId })
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to process payment:', error);
      throw error;
    }
  }
}