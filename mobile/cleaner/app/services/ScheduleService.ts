import { Http } from '@nativescript/core';
import { API_URL } from '../config';

export class ScheduleService {
  async getTodaySchedule() {
    try {
      const response = await Http.request({
        url: `${API_URL}/staff/schedule/today`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to fetch schedule:', error);
      throw error;
    }
  }

  async completeJob(jobId: string) {
    try {
      const response = await Http.request({
        url: `${API_URL}/staff/jobs/${jobId}/complete`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });

      return response.content.toJSON();
    } catch (error) {
      console.error('Failed to complete job:', error);
      throw error;
    }
  }

  private getToken(): string {
    // Get token from secure storage
    return '';
  }
}