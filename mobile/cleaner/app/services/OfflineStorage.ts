import { Couchbase } from '@nativescript/couchbase';
import { Observable } from '@nativescript/core';

export class OfflineStorage extends Observable {
  private database: Couchbase;
  private syncInProgress = false;

  constructor() {
    super();
    this.database = new Couchbase('imaryza_cleaner');
    this.setupSync();
  }

  async saveSchedule(schedule: any) {
    try {
      const document = {
        ...schedule,
        type: 'schedule',
        timestamp: new Date().toISOString(),
        synced: false
      };

      await this.database.createDocument(document, schedule.id);
      this.sync();
    } catch (error) {
      console.error('Failed to save schedule:', error);
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
      case 'schedule':
        await this.syncSchedule(doc);
        break;
      case 'jobUpdate':
        await this.syncJobUpdate(doc);
        break;
      case 'message':
        await this.syncMessage(doc);
        break;
      // Add more types as needed
    }
  }

  private async syncSchedule(schedule: any) {
    // Implement schedule sync logic
  }

  private async syncJobUpdate(update: any) {
    // Implement job update sync logic
  }

  private async syncMessage(message: any) {
    // Implement message sync logic
  }
}