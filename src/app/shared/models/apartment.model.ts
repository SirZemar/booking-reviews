import { ApartmentStatus } from './apartment-status.model';
import { Review } from './review.model';
import { Timestamp } from './timestamp.model';

export type Apartment = {
	id: string;
	reviewsRatingAverage: number;
	reviewsCount: number;
	lastReviewsScrape: Timestamp;
	reviews: Review[];
	name: string;
	status: ApartmentStatus;
};

// For responses to DELETE, UPDATE, and CREATE requests
export interface ActionResponse {
	msg: string;
}
export type AddApartment = Pick<Apartment, 'id' | 'name'>;
export type EditApartment = Pick<Apartment, 'id' | 'name'>;
export type DeleteApartment = Pick<Apartment, 'id'>;
