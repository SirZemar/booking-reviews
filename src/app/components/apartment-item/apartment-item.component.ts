import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
// Material Components
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Apartment } from 'src/app/models/apartment.model';
import { Timestamp } from '@firebase/firestore';

@Component({
  selector: 'app-apartment-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentItemComponent {
  @Input() apartment = {} as Apartment;

  location = inject(Location);
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

  get lastScrapeDate() {
    const timestamp = this.apartment?.lastReviewsScrape;
    if (timestamp) {
      const lastScrapeDate = new Timestamp(
        timestamp._seconds,
        timestamp._nanoseconds
      ).toDate();

      return new Date(lastScrapeDate).toDateString();
    } else {
      return '';
    }
  }

  navigateToUrl(apartmentId: string) {
    window.open(
      `https://www.booking.com/hotel/pt/${apartmentId}.pt-pt.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaLsBiAEBmAEfuAEHyAEM2AEB6AEB-AEMiAIBqAIDuAKRo5usBsACAdICJDYwMzQ4ZDdjLTM5ZDUtNDMxZC05ZGZkLTY2NzQxNDY0YmYzNNgCBuACAQ&sid=ad4661baf04ea1012e4c76eaa4bde283&dest_id=-2173088;dest_type=city;dist=0;group_adults=1;group_children=0;hapos=1;hpos=1;no_rooms=1;req_adults=1;req_children=0;room1=A;sb_price_type=total;sr_order=popularity;srepoch=1703336399;srpvid=59a95b638872000f;type=total;ucfs=1&#hotelTmpl`,
      '_blank'
    );
  }
}
