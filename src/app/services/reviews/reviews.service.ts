import { Injectable, inject, OnInit } from '@angular/core';
import { reviewsEndpoints } from 'src/apis/reviews';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  http = inject(HttpClient);

  getApartmentReviewRates(apartmentId: string) {
    return this.http
      .get(`${reviewsEndpoints.REVIEW_RATINGS}/${apartmentId}`)
      .pipe(map(data => (data as any).reviewRates));
  }

  scrapeApartmentReviews(apartmentId: string) {
    return this.http
      .get(`http://localhost:8080/apartments/${apartmentId}/scrapeReviews`)
      .pipe(
        catchError(error => {
          console.error('Error scraping apartment:', error);
          return throwError(() => new Error(error));
        })
      );
  }
}
