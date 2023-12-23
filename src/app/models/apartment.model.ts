import { Review } from './review.model';
import { Timestamp as firestoreTimestamp } from '@firebase/firestore-types';
interface Timestamp extends firestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export type Apartment = {
  id: string;
  reviewsRatingAverage: number;
  reviewsCount: number;
  lastReviewsScrape: Timestamp;
  reviews: Review[];
  name: string;
};
