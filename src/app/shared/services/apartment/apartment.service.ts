import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { apartmentEndpoints } from 'src/app/apis/apartment';
import {
	ActionResponse,
	Apartment,
} from 'src/app/shared/models/apartment.model';
import { SearchService } from '../search/search.service';
@Injectable({
	providedIn: 'root',
})
export class ApartmentService {
	http = inject(HttpClient);
	searchService = inject(SearchService);
	isLoading = signal(false);

	private apartmentsSignal = signal(this.getInitialApartments);
	public apartments = this.apartmentsSignal.asReadonly();

	get getInitialApartments() {
		const apartments = [] as Apartment[];
		this.getApartments().subscribe({
			next: apartments => apartments,
			complete: () => console.log('Initial apartments fetch'),
		});
		return apartments;
	}
	private getApartments(): Observable<Apartment[]> {
		return this.http.get<Apartment[]>(apartmentEndpoints.getApartments()).pipe(
			tap(apartments => this.apartmentsSignal.set(apartments)),
			catchError(error => {
				console.error(`Error fetching apartments`, error);
				return throwError(() => new Error(error));
			})
		);
	}

	getApartmentById(id: string): Observable<Apartment> {
		return this.http.get<Apartment>(apartmentEndpoints.getApartmentById(id));
	}

	addApartment(
		id: string,
		payload: Pick<Apartment, 'name'>
	): Observable<ActionResponse> {
		return this.http
			.post<ActionResponse>(apartmentEndpoints.addApartment(id), payload)
			.pipe(
				tap(() => this.addApartmentSignal(id)),
				catchError(error => {
					console.error(`Error adding apartment ${id}`, error);
					return throwError(() => new Error(error));
				})
			);
	}

	patchApartment(
		id: string,
		body: Partial<Apartment>
	): Observable<ActionResponse> {
		return this.http
			.patch<ActionResponse>(apartmentEndpoints.patchApartment(id), body)
			.pipe(
				tap(() => this.patchApartmentSignal(id)),
				catchError(error => {
					console.error(
						`Error editing apartment ${id} with body ${body}`,
						error
					);
					return throwError(() => new Error(error));
				})
			);
	}

	deleteApartment(id: Apartment['id']): Observable<ActionResponse> {
		return this.http.delete<ActionResponse>(apartmentEndpoints.deleteApartment(id)).pipe(
			tap(() => this.deleteApartmentSignal(id)),
			catchError(error => {
				console.error(`Error deleting apartment ${id}`, error);
				return throwError(() => new Error(error));
			})
		);
	}

	private addApartmentSignal(id: string) {
		this.getApartmentById(id).subscribe(newApartment =>
			this.apartmentsSignal.update(apartments => [...apartments, newApartment])
		);
	}

	// TODO review service is using this. Consider change in api scrape reviews to return array of reviews only.
	patchApartmentSignal(id: string) {
		this.getApartmentById(id).subscribe(pacthedApartment => {
			this.apartmentsSignal.update(apartments => {
				const apartmentIndex = apartments.findIndex(
					apartment => apartment.id === pacthedApartment.id
				);

				if (apartmentIndex >= 0) {
					apartments[apartmentIndex] = pacthedApartment;
				}
				return apartments;
			});
		});
	}

	private deleteApartmentSignal(id: string) {
		this.apartmentsSignal.update(apartments =>
			apartments.filter(apartment => apartment.id !== id)
		);
	}

	//TODO Not being used
	setAllApartmentsSignal() {
		this.getApartments().subscribe({
			next: updatedApartments => this.apartmentsSignal.set(updatedApartments),
			complete: () => console.info('Apartments were refreshed'),
		});
	}
}
