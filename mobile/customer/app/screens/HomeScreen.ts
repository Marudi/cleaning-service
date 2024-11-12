import { Observable, Page, EventData } from '@nativescript/core';
import { BookingService } from '../services/BookingService';

export class HomeScreen extends Observable {
  private page: Page;
  private bookingService: BookingService;

  constructor() {
    super();
    this.bookingService = new BookingService();
  }

  onNavigatingTo(args: EventData) {
    this.page = <Page>args.object;
    this.loadUpcomingBookings();
  }

  async loadUpcomingBookings() {
    try {
      const bookings = await this.bookingService.getUpcomingBookings();
      this.set('bookings', bookings);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    }
  }

  onBookNowTap() {
    this.page.frame.navigate({
      moduleName: 'screens/BookingScreen'
    });
  }

  onChatTap() {
    this.page.frame.navigate({
      moduleName: 'screens/ChatScreen'
    });
  }
}