import { Observable, Page, EventData } from '@nativescript/core';
import { ScheduleService } from '../services/ScheduleService';

export class ScheduleScreen extends Observable {
  private page: Page;
  private scheduleService: ScheduleService;

  constructor() {
    super();
    this.scheduleService = new ScheduleService();
  }

  onNavigatingTo(args: EventData) {
    this.page = <Page>args.object;
    this.loadTodaySchedule();
  }

  async loadTodaySchedule() {
    try {
      const schedule = await this.scheduleService.getTodaySchedule();
      this.set('schedule', schedule);
    } catch (error) {
      console.error('Failed to load schedule:', error);
    }
  }

  onJobComplete(args: EventData) {
    const job = args.object.bindingContext;
    this.scheduleService.completeJob(job.id);
  }

  onChatWithCustomer(args: EventData) {
    const job = args.object.bindingContext;
    this.page.frame.navigate({
      moduleName: 'screens/ChatScreen',
      context: { customerId: job.customerId }
    });
  }
}