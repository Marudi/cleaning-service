import { Observable, Page, EventData } from '@nativescript/core';
import { RatingsService } from '../services/RatingsService';

export class RatingsScreen extends Observable {
  private page: Page;
  private ratingsService: RatingsService;

  constructor() {
    super();
    this.ratingsService = new RatingsService();
  }

  onNavigatingTo(args: EventData) {
    this.page = <Page>args.object;
    this.loadRatings();
  }

  async loadRatings() {
    try {
      const ratings = await this.ratingsService.getCleanerRatings();
      this.set('ratings', ratings);
      
      // Calculate average rating
      const average = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
      this.set('averageRating', average.toFixed(1));
      
      // Calculate rating distribution
      const distribution = this.calculateDistribution(ratings);
      this.set('ratingDistribution', distribution);
    } catch (error) {
      console.error('Failed to load ratings:', error);
    }
  }

  private calculateDistribution(ratings: any[]) {
    const distribution = new Array(5).fill(0);
    ratings.forEach(rating => {
      distribution[rating.rating - 1]++;
    });
    
    return distribution.map(count => ({
      count,
      percentage: (count / ratings.length * 100).toFixed(1)
    }));
  }

  onPeriodChange(args: EventData) {
    const period = args.object.get('selectedValue');
    this.loadRatings(period);
  }
}