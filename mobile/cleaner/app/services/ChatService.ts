import { Observable } from '@nativescript/core';
import { WebSocket } from '@nativescript/websocket';
import { SecureStorage } from '../utils/SecureStorage';

export interface Message {
  id: string;
  bookingId: string;
  customerId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export class ChatService extends Observable {
  private ws: WebSocket | null = null;
  private secureStorage = new SecureStorage();
  private messageQueue: Message[] = [];
  private activeChats: Set<string> = new Set();

  async connect() {
    const token = await this.secureStorage.getToken();
    this.ws = new WebSocket(`${API_URL.replace('http', 'ws')}/staff/chat?token=${token}`);

    this.ws.on('open', () => {
      console.log('WebSocket connected');
      this.processMessageQueue();
    });

    this.ws.on('message', (message) => {
      const data = JSON.parse(message);
      this.notify({
        eventName: 'messageReceived',
        data
      });
    });

    this.ws.on('close', () => {
      console.log('WebSocket closed');
      setTimeout(() => this.connect(), 5000);
    });
  }

  async sendMessage(message: Partial<Message>) {
    if (!this.ws?.isConnected()) {
      this.messageQueue.push(message as Message);
      return;
    }

    try {
      this.ws.send(JSON.stringify(message));
    } catch (error) {
      console.error('Failed to send message:', error);
      this.messageQueue.push(message as Message);
    }
  }

  async markAsRead(bookingId: string) {
    try {
      await Http.request({
        url: `${API_URL}/staff/chat/${bookingId}/read`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await this.secureStorage.getToken()}`
        }
      });
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  }

  private async processMessageQueue() {
    while (this.messageQueue.length > 0 && this.ws?.isConnected()) {
      const message = this.messageQueue.shift();
      await this.sendMessage(message);
    }
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
  }
}