import { Couchbase } from '@nativescript/couchbase';
import { Observable } from '@nativescript/core';

export class OfflineStorage extends Observable {
  private database: Couchbase;
  private syncInProgress = false;

  constructor() {
    super();
    this.database = new Couchbase('imaryza_customer');
    this.setupSync();
  }

  async saveBooking(booking: any) {
    try {
      const document = {
        ...booking,
        type: 'booking',
        timestamp: new Date().toISOString(),
        synced: false
      };

      await this.database.createDocument(document, booking.id);
      this.sync();
    } catch (error) {
      console.error('Failed to save booking:', error);
    }
  }

  async getUnsynced() {
    return this.database.query({
      select: [],
      where: [{ property: 'synced', comparison: 'equalTo', value: false }]
    });
  }

  private async sync() {
    if (this.syncInProgress) return;
    this.syncInProgress = true;

    try {
      const unsynced = await this.getUnsynced();
      for (const doc of unsynced) {
        try {
          await this.syncDocument(doc);
          await this.database.updateDocument(doc.id, { ...doc, synced: true });
        } catch (error) {
          console.error('Failed to sync document:', error);
        }
      }
    } finally {
      this.syncInProgress = false;
    }
  }

  private async syncDocument(doc: any) {
    switch (doc.type) {
      case 'booking':
        await this.syncBooking(doc);
        break;
      case 'message':
        await this.syncMessage(doc);
        break;
      // Add more types as needed
    }
  }

  private async syncBooking(booking: any) {
    // Implement booking sync logic
  }

  private async syncMessage(message: any) {
    // Implement message sync logic
  }
}