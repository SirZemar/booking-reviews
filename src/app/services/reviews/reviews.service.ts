import { Injectable, inject } from '@angular/core';
import { reviewsEndpoints } from 'src/apis/reviews';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { ApartmentService } from '../apartment/apartment.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  http = inject(HttpClient);
  apartmentService = inject(ApartmentService);

  scrapeApartmentReviews(apartmentId: string) {
    return this.http.get(reviewsEndpoints.scrapeReviews(apartmentId)).pipe(
      tap(() => this.apartmentService.patchApartmentSignal(apartmentId)),
      catchError(error => {
        console.error('Error scraping apartment:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
