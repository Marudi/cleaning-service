import { Observable } from '@nativescript/core';
import { WebSocket } from '@nativescript/websocket';
import { SecureStorage } from '../utils/SecureStorage';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export class ChatService extends Observable {
  private ws: WebSocket | null = null;
  private secureStorage = new SecureStorage();
  private messageQueue: Message[] = [];

  async connect(bookingId: string) {
    const token = await this.secureStorage.getToken();
    this.ws = new WebSocket(`${API_URL.replace('http', 'ws')}/chat?token=${token}&booking=${bookingId}`);

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
      setTimeout(() => this.connect(bookingId), 5000); // Reconnect after 5 seconds
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