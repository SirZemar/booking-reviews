import { Injectable, inject, OnInit } from '@angular/core';
import { reviewsEndpoints } from 'src/apis/reviews';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ReviewsService {
	http = inject(HttpClient);
	reviewRates$ = inject(HttpClient)
		.get(
			`${reviewsEndpoints.REVIEW_RATINGS}/oporto-invite-city-center-santo-ildefonso`
		)
		.pipe(map((x) => (x as any).reviewRates));

	getApartmentReviewRates(apartmentId: string) {
		return this.http
			.get(`${reviewsEndpoints.REVIEW_RATINGS}/${apartmentId}`)
			.pipe(map((data) => (data as any).reviewRates));
	}
}
