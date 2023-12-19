import { Injectable, inject, OnInit } from '@angular/core';
import { reviewsEndpoints } from 'src/apis/reviews';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { apartmentEndpoints } from 'src/apis/apartment';

@Injectable({
	providedIn: 'root'
})
export class ApartmentService {
	http = inject(HttpClient);

	getApartments(): Observable<any[]> {
		return this.http.get<any[]>(apartmentEndpoints.getApartment()).pipe(
			catchError((error) => {
				console.error('Error fetching apartments:', error);
				return throwError(() => new Error(error));
			})
		);
	}
}
