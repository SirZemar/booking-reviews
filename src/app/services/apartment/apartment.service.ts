import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { apartmentEndpoints } from 'src/apis/apartment';
import { Apartment } from 'src/app/models/apartment.model';
import { SearchService } from '../search/search.service';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  http = inject(HttpClient);
  searchService = inject(SearchService);

  private allApartments: Apartment[] = [];

  getApartments(): Observable<Apartment[]> {
    // If apartments are already loaded, return them
    if (this.allApartments.length > 0) {
      return of(this.allApartments);
    }

    // Otherwise, fetch all apartments
    return this.http.get<Apartment[]>(apartmentEndpoints.getApartment()).pipe(
      catchError(error => {
        console.error('Error fetching apartments:', error);
        return throwError(() => new Error(error));
      }),
      // Save all apartments locally
      tap(apartments => (this.allApartments = apartments))
    );
  }

  getFilteredApartments(): Observable<Apartment[]> {
    return this.searchService.search$.pipe(
      switchMap(searchTerm => {
        // If no search term, return all apartments
        if (!searchTerm || searchTerm.trim() === '') {
          return this.getApartments();
        }

        // Filter apartments based on the search term
        const filteredApartments = this.allApartments.filter(apartment =>
          apartment.id.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return of(filteredApartments);
      })
    );
  }

  addApartment(id: string, payload: Pick<Apartment, 'name'>) {
    return this.http.post(apartmentEndpoints.addApartment(id), payload).pipe(
      catchError(error => {
        console.error(`Error adding apartment ${id}`, error);
        return throwError(() => new Error(error));
      })
    );
  }
}
