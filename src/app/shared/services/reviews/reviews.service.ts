import { Injectable, inject } from '@angular/core';
import { reviewsEndpoints } from 'src/app/apis/reviews';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription, switchMap } from 'rxjs';
import { Review } from 'src/app/shared/models/review.model';
import { ActionResponse, UpdateApartment } from '../../models/apartment.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReviewStatusEnum } from '../../models/apartment-status.model';

@Injectable({
	providedIn: 'root',
})
export class ReviewsService {
	http = inject(HttpClient);

	updateReviews$ = new Subject<UpdateApartment>();
	reviewsUpdateComplete$ = new Subject<UpdateApartment>();

	subscription: Subscription | undefined;

	constructor() {
		this.updateReviews$.pipe(takeUntilDestroyed()).subscribe(apartmentData => {
			if (this.subscription) {
				this.subscription.unsubscribe();
			}
			this.subscription = this.scrapeApartmentReviews(apartmentData.id)
				.pipe(
					switchMap(reviews =>
						this.addApartmentReviews(apartmentData.id, reviews)
					)
				)
				.subscribe({
					next: () =>
						this.reviewsUpdateComplete$.next({
							...apartmentData,
							reviewStatus: ReviewStatusEnum.READY,
						}),
					error: () =>
						this.reviewsUpdateComplete$.next({
							...apartmentData,
							reviewStatus: ReviewStatusEnum.FAILED,
						}),
				});
		});
	}

	scrapeApartmentReviews(apartmentId: string): Observable<Review[]> {
		return this.http.get<Review[]>(reviewsEndpoints.scrapeReviews(apartmentId));
	}

	addApartmentReviews(
		apartmentId: string,
		reviews: Review[]
	): Observable<ActionResponse> {
		return this.http.post<ActionResponse>(
			reviewsEndpoints.addReviews(apartmentId),
			reviews
		);
	}
}
