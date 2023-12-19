import { Timestamp } from '@firebase/firestore-types';
import { Review } from './review.model';

export type Apartment = {
  id: string;
  reviewsRatingAverage: number;
  reviewsCount: number;
  lastReviewsScrape: Timestamp;
  reviews: Review[];
};
