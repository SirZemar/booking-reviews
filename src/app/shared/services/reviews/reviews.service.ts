import { Injectable, inject } from '@angular/core';
import { reviewsEndpoints } from 'src/app/apis/reviews';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ApartmentService } from '../apartment/apartment.service';
import { Review } from 'src/app/shared/models/review.model';

@Injectable({
	providedIn: 'root',
})
export class ReviewsService {
	http = inject(HttpClient);
	apartmentService = inject(ApartmentService);

	scrapeApartmentReviews(apartmentId: string): Observable<Review[]> {
		return this.http
			.get<Review[]>(reviewsEndpoints.scrapeReviews(apartmentId))
			.pipe(
				catchError(error => {
					console.error('Error scraping apartment:', error);
					return throwError(() => new Error(error));
				})
			);
	}

	addApartmentReviews(apartmentId: string, reviews: Review[]) {
		return this.http
			.post(reviewsEndpoints.addReviews(apartmentId), reviews)
			.pipe(
				tap(() => this.apartmentService.patchApartmentSignal(apartmentId)),
				catchError(error => {
					console.error(
						`Failed to add reviews ${reviews} to apartment ${apartmentId}:`,
						error
					);
					return throwError(() => new Error(error));
				})
			);
	}
}
