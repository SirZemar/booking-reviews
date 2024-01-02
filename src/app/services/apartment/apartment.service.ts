import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  catchError,
  finalize,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { apartmentEndpoints } from 'src/apis/apartment';
import { Apartment } from 'src/app/models/apartment.model';
import { SearchService } from '../search/search.service';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  http = inject(HttpClient);
  searchService = inject(SearchService);

  private _allApartments: Apartment[] = [];

  get allApartments(): Apartment[] {
    return this._allApartments;
  }

  set allApartments(apartments: Apartment[]) {
    this._allApartments = apartments;
  }

  getApartments(): Observable<Apartment[]> {
    // If apartments are already loaded, return them
    // if (this.allApartments.length > 0) {
    //   return of(this.allApartments);
    // }

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
        const filteredApartments = this.allApartments.filter(
          apartment =>
            apartment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apartment.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return of(filteredApartments);
      })
    );
  }

  addApartment(id: string, payload: Pick<Apartment, 'name'>) {
    return this.http.post(apartmentEndpoints.addApartment(id), payload).pipe(
      switchMap(() => this.getApartments()),
      tap(x => {
        console.log(x.valueOf());
      }),
      finalize(() => console.log(this.allApartments)),
      catchError(error => {
        console.error(`Error adding apartment ${id}`, error);
        return throwError(() => new Error(error));
      })
    );
  }

  patchApartment(id: string, body: Partial<Apartment>) {
    return this.http.patch(apartmentEndpoints.patchApartment(id), body).pipe(
      switchMap(() => this.getApartments()),
      tap(x => {
        console.log(x.valueOf());
      }),
      finalize(() => console.log(this.allApartments)),
      catchError(error => {
        console.error(`Error editing apartment ${id} with body ${body}`, error);
        return throwError(() => new Error(error));
      })
    );
  }

  deleteApartment(id: string) {
    return this.http.delete(apartmentEndpoints.deleteApartment(id)).pipe(
      catchError(error => {
        console.error(`Error deleting apartment ${id}`, error);
        return throwError(() => new Error(error));
      })
    );
  }
}
