import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material Components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Apartment } from 'src/app/models/apartment.model';

@Component({
  selector: 'app-apartment-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentItemComponent {
  @Input() apartment = {} as Apartment;

  get reviewsCountToNextTarget(): number {
    if (this.apartment.reviewsRatingAverage > 9.95) {
      return 0;
    }

    const targetReviewRating = parseFloat(
      (this.apartment.reviewsRatingAverage + 0.1).toFixed(1)
    );
    const targetRateBeforeBookingRound = parseFloat(
      (targetReviewRating - 0.05).toFixed(2)
    );

    const numberOfReviews = this.apartment.reviewsCount;
    const totalSum = this.apartment.reviewsRatingAverage * numberOfReviews;
    const numberOfTopRateReviewsNeeded = Math.ceil(
      (targetRateBeforeBookingRound * numberOfReviews - totalSum) /
        (10 - targetRateBeforeBookingRound)
    );

    return numberOfTopRateReviewsNeeded;
  }
}
