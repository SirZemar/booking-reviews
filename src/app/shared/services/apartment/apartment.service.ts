import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, switchMap, tap } from 'rxjs';
import { apartmentEndpoints } from 'src/app/apis/apartment';
import {
	ActionResponse,
	AddApartment,
	Apartment,
	DeleteApartment,
	EditApartment,
} from 'src/app/shared/models/apartment.model';
import { SearchService } from '../search/search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReviewsService } from '../reviews/reviews.service';
import {
	ReviewStatusEnum,
	ApartmentStatusEnum,
} from '../../models/apartment-status.model';

interface ApartmentState {
	apartments: Apartment[];
	error: string;
}
@Injectable({
	providedIn: 'root',
})
export class ApartmentService {
	http = inject(HttpClient);
	searchService = inject(SearchService);
	reviewsService = inject(ReviewsService);

	// State
	state = signal<ApartmentState>({
		apartments: [],
		error: '',
	});

	// Selectors
	apartments = computed(() => this.state().apartments);

	// Source
	addApartment$ = new Subject<AddApartment>();
	deleteApartment$ = new Subject<DeleteApartment>();
	editApartment$ = new Subject<EditApartment>();

	constructor() {
		// Initial
		this.getApartments()
			.pipe(
				map(apartments =>
					apartments.map(apartment => ({
						...apartment,
						reviewStatus: ReviewStatusEnum.READY,
						status: ApartmentStatusEnum.READY,
					}))
				)
			)
			.subscribe(apartments =>
				this.state.update(state => ({
					...state,
					apartments,
				}))
			);

		// Reducers

		// Update local state when apartment completes update of reviews
		this.reviewsService.reviewsUpdateComplete$
			.pipe(takeUntilDestroyed())
			.subscribe(apartmentData => {
				this.getApartmentById(apartmentData.id).subscribe(
					(updatedApartment: Apartment) => {
						this.state.update(state => ({
							...state,
							apartments: state.apartments.map(apartment =>
								apartment.id === updatedApartment.id
									? {
											...updatedApartment,
											reviewStatus: apartmentData.reviewStatus!,
										}
									: apartment
							),
						}));
					}
				);
			});

		// Update local state when apartment update reviews
		this.reviewsService.updateReviews$
			.pipe(takeUntilDestroyed())
			.subscribe(apartmentData =>
				this.state.update(state => ({
					...state,
					apartments: state.apartments.map(apartment =>
						apartment.id === apartmentData.id
							? {
									...apartment,
									reviewStatus: ReviewStatusEnum.UPDATING,
								}
							: apartment
					),
				}))
			);

		// Adds apartment
		this.addApartment$
			.pipe(
				takeUntilDestroyed(),
				tap(apartmentData =>
					this.state.update(state => ({
						...state,
						apartments: [
							...state.apartments,
							{
								...apartmentData,
								status: ApartmentStatusEnum.CREATING,
							} as Apartment,
						],
					}))
				)
			)
			.subscribe(apartmentData => {
				this.addApartment(apartmentData)
					.pipe(
						switchMap(response => this.getApartmentById(response.id)),
						tap(newApartment =>
							this.state.update(state => ({
								...state,
								apartments: state.apartments.map(apartment =>
									apartment.id === apartmentData.id
										? { ...newApartment, status: ApartmentStatusEnum.READY }
										: apartment
								),
							}))
						)
					)
					.subscribe(() =>
						this.reviewsService.updateReviews$.next(apartmentData)
					);
			});

		// Deletes
		this.deleteApartment$
			.pipe(
				takeUntilDestroyed(),
				tap(apartmentData =>
					this.state.update(state => ({
						...state,
						apartments: state.apartments.map(apartment =>
							apartment.id === apartmentData.id
								? { ...apartment, status: ApartmentStatusEnum.DELETING }
								: apartment
						),
					}))
				)
			)
			.subscribe(apartmentData => {
				this.deleteApartment(apartmentData)
					.pipe(
						tap(response =>
							this.state.update(state => ({
								...state,
								apartments: state.apartments.filter(
									apartment => apartment.id !== response.id
								),
							}))
						)
					)
					.subscribe();
			});

		this.editApartment$
			.pipe(
				takeUntilDestroyed(),
				tap(editedApartment =>
					this.state.update(state => ({
						...state,
						apartments: state.apartments.map(apartment =>
							apartment.id === editedApartment.id
								? { ...apartment, status: ApartmentStatusEnum.PATCHING }
								: apartment
						),
					}))
				)
			)
			.subscribe(apartmentData => {
				this.patchApartment(apartmentData)
					.pipe(
						switchMap(response => this.getApartmentById(response.id)),
						tap(patchedApartment =>
							this.state.update(state => ({
								...state,
								apartments: state.apartments.map(apartment =>
									apartment.id === patchedApartment.id
										? { ...patchedApartment, status: ApartmentStatusEnum.READY }
										: apartment
								),
							}))
						)
					)
					.subscribe();
			});
	}

	private getApartments(): Observable<Apartment[]> {
		return this.http.get<Apartment[]>(apartmentEndpoints.getApartments());
	}

	private getApartmentById(id: string): Observable<Apartment> {
		return this.http.get<Apartment>(apartmentEndpoints.getApartmentById(id));
	}

	private patchApartment(apartmentData: EditApartment) {
		return this.http.patch<ActionResponse>(
			apartmentEndpoints.patchApartment(apartmentData.id),
			apartmentData
		);
	}
	private deleteApartment(apartmentData: DeleteApartment) {
		return this.http.delete<ActionResponse>(
			apartmentEndpoints.deleteApartment(apartmentData.id)
		);
	}

	private addApartment(apartmentData: AddApartment) {
		return this.http.post<ActionResponse>(
			apartmentEndpoints.addApartment(apartmentData.id),
			apartmentData
		);
	}
}
