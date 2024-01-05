import { Injectable, inject } from '@angular/core';
import { reviewsEndpoints } from 'src/apis/reviews';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  http = inject(HttpClient);

  scrapeApartmentReviews(apartmentId: string) {
    return this.http.get(reviewsEndpoints.scrapeReviews(apartmentId)).pipe(
      catchError(error => {
        console.error('Error scraping apartment:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
