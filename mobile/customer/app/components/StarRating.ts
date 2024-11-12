import { Observable } from '@nativescript/core';

export class StarRating extends Observable {
  private _rating: number = 0;
  private _maxRating: number = 5;
  private _isInteractive: boolean = true;

  constructor() {
    super();
    this.updateStars();
  }

  get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    if (this._rating !== value) {
      this._rating = value;
      this.updateStars();
      this.notify({ eventName: 'ratingChange', object: this, value });
    }
  }

  get maxRating(): number {
    return this._maxRating;
  }

  set maxRating(value: number) {
    if (this._maxRating !== value) {
      this._maxRating = value;
      this.updateStars();
    }
  }

  get isInteractive(): boolean {
    return this._isInteractive;
  }

  set isInteractive(value: boolean) {
    this._isInteractive = value;
  }

  onStarTap(args: any) {
    if (!this.isInteractive) return;
    
    const index = args.object.get('index');
    this.rating = index + 1;
  }

  private updateStars() {
    const stars = new Array(this._maxRating).fill(0).map((_, index) => ({
      filled: index < this._rating,
      index
    }));
    this.set('stars', stars);
  }
}