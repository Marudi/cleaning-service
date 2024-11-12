import { Observable, Page, EventData } from '@nativescript/core';
import { RatingService } from '../services/RatingService';

export class RatingScreen extends Observable {
  private page: Page;
  private ratingService: RatingService;
  private bookingId: string;

  constructor() {
    super();
    this.ratingService = new RatingService();
    this.set('rating', 0);
    this.set('comment', '');
  }

  onNavigatingTo(args: EventData) {
    this.page = <Page>args.object;
    const context = this.page.navigationContext;
    this.bookingId = context.bookingId;
    
    // Load booking details
    this.loadBookingDetails();
  }

  async loadBookingDetails() {
    try {
      const booking = await this.ratingService.getBookingDetails(this.bookingId);
      this.set('booking', booking);
    } catch (error) {
      console.error('Failed to load booking details:', error);
    }
  }

  onStarTap(args: EventData) {
    const starIndex = args.object.get('index');
    this.set('rating', starIndex + 1);
  }

  async onSubmitTap() {
    try {
      const rating = this.get('rating');
      const comment = this.get('comment');

      await this.ratingService.submitRating(this.bookingId, {
        rating,
        comment,
        timestamp: new Date()
      });

      // Show success message
      this.showSuccessMessage();
      
      // Navigate back
      this.page.frame.goBack();
    } catch (error) {
      console.error('Failed to submit rating:', error);
      // Show error message
      this.showErrorMessage();
    }
  }

  private showSuccessMessage() {
    // Implementation for showing success message
  }

  private showErrorMessage() {
    // Implementation for showing error message
  }
}