import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { apartmentEndpoints } from 'src/apis/apartment';
import { Apartment } from 'src/app/models/apartment.model';
import { SearchService } from '../search/search.service';
@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  http = inject(HttpClient);
  searchService = inject(SearchService);

  private apartmentsSignal = signal(this.getInitialApartments);
  public apartments = this.apartmentsSignal.asReadonly();

  get getInitialApartments() {
    let apartments = [] as Apartment[];
    this.getApartments().subscribe({
      next: apartments => apartments,
      complete: () => console.log('Initial apartments fetch'),
    });
    return apartments;
  }
  private getApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(apartmentEndpoints.getApartment()).pipe(
      tap(apartments => this.apartmentsSignal.set(apartments)),
      catchError(error => {
        console.error(`Error fetching apartments`, error);
        return throwError(() => new Error(error));
      })
    );
  }

  addApartment(id: string, payload: Pick<Apartment, 'name'>) {
    return this.http.post(apartmentEndpoints.addApartment(id), payload).pipe(
      tap(() => this.setApartmentsSignal()),
      catchError(error => {
        console.error(`Error adding apartment ${id}`, error);
        return throwError(() => new Error(error));
      })
    );
  }

  patchApartment(id: string, body: Partial<Apartment>) {
    return this.http.patch(apartmentEndpoints.patchApartment(id), body).pipe(
      tap(() => this.setApartmentsSignal()),
      catchError(error => {
        console.error(`Error editing apartment ${id} with body ${body}`, error);
        return throwError(() => new Error(error));
      })
    );
  }

  deleteApartment(id: string) {
    return this.http.delete(apartmentEndpoints.deleteApartment(id)).pipe(
      tap(() => this.setApartmentsSignal()),
      catchError(error => {
        console.error(`Error deleting apartment ${id}`, error);
        return throwError(() => new Error(error));
      })
    );
  }

  setApartmentsSignal() {
    this.getApartments().subscribe({
      next: updatedApartments => this.apartmentsSignal.set(updatedApartments),
      complete: () => console.info('Apartments were refreshed'),
    });
  }
}
