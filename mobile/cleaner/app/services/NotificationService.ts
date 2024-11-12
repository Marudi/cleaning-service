import { Application } from '@nativescript/core';
import { Messaging } from '@nativescript/firebase/messaging';
import { SecureStorage } from '../utils/SecureStorage';

export class NotificationService {
  private messaging: Messaging;
  private secureStorage = new SecureStorage();

  constructor() {
    this.messaging = new Messaging();
    this.setupNotifications();
  }

  private async setupNotifications() {
    try {
      const permission = await this.messaging.requestPermission();
      if (permission) {
        const token = await this.messaging.getToken();
        await this.registerDeviceToken(token);

        this.messaging.onTokenRefresh(async (newToken) => {
          await this.registerDeviceToken(newToken);
        });

        this.messaging.onMessage((message) => {
          this.handleNotification(message);
        });
      }
    } catch (error) {
      console.error('Failed to setup notifications:', error);
    }
  }

  private async registerDeviceToken(token: string) {
    try {
      await Http.request({
        url: `${API_URL}/staff/notifications/register-device`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.secureStorage.getToken()}`
        },
        content: JSON.stringify({ token })
      });
    } catch (error) {
      console.error('Failed to register device token:', error);
    }
  }

  private handleNotification(message: any) {
    // Handle foreground notifications
    Application.notify({
      eventName: 'notificationReceived',
      object: this,
      data: message
    });
  }
}