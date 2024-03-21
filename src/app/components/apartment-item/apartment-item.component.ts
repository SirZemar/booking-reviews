import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
// Components
import { ApartmentEditFormModalComponent } from '../apartment-edit-form/apartment-edit-form.modal.component';
import { ApartmentDeleteModalComponent } from '../apartment-delete/apartment-delete.modal.component';
// Material Components
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Models
import { Apartment } from 'src/app/models/apartment.model';
// Services
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
// Pipes
import { BookingRoundNumberPipe } from 'src/app/pipes/bookingRoundNumber/booking-round-number.pipe';
// Other
import { Timestamp } from '@firebase/firestore';
import { ApartmentService } from 'src/app/services/apartment/apartment.service';
import {
  ApartmentStatus,
  StatusEnum,
} from 'src/app/models/apartment-status.model';
import { Review } from 'src/app/models/review.model';
// Pipes
import { TimestampToDateStringPipe } from 'src/app/pipes/timestampToDateString/timestamp-to-date-string.pipe';
import { ReviewCountToNextTargetPipe } from 'src/app/pipes/reviewCountToNextTarget/review-count-to-next-target.pipe';
@Component({
  selector: 'app-apartment-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    BookingRoundNumberPipe,
    TimestampToDateStringPipe,
    ReviewCountToNextTargetPipe,
  ],
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentItemComponent {
  @Input() apartment = {} as Apartment;

  location = inject(Location);
  reviewsService = inject(ReviewsService);
  dialogService = inject(DialogService);
  apartmentService = inject(ApartmentService);

  public dateFormat: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  public updating = signal(false);
  public loading = computed(() => {
    if (this.apartment.status === StatusEnum.pending || this.updating()) {
      return true;
    }
    return false;
  });

  navigateToUrl() {
    window.open(
      `https://www.booking.com/hotel/pt/${this.apartment.id}.pt-pt.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaLsBiAEBmAEfuAEHyAEM2AEB6AEB-AEMiAIBqAIDuAKRo5usBsACAdICJDYwMzQ4ZDdjLTM5ZDUtNDMxZC05ZGZkLTY2NzQxNDY0YmYzNNgCBuACAQ&sid=ad4661baf04ea1012e4c76eaa4bde283&dest_id=-2173088;dest_type=city;dist=0;group_adults=1;group_children=0;hapos=1;hpos=1;no_rooms=1;req_adults=1;req_children=0;room1=A;sb_price_type=total;sr_order=popularity;srepoch=1703336399;srpvid=59a95b638872000f;type=total;ucfs=1&#hotelTmpl`,
      '_blank'
    );
  }

  onUpdate() {
    this.updating.set(true);
    this.reviewsService.scrapeApartmentReviews(this.apartment.id).subscribe({
      next: data =>
        this.reviewsService
          .addApartmentReviews(this.apartment.id, data)
          .subscribe({
            complete: () => this.updating.set(false),
            error: error =>
              console.error(
                `Failed to add reviews to apartment ${this.apartment.id}`,
                error
              ),
          }),
      error: error => console.error('Error scraping apartment', error),
    });
  }

  onEdit() {
    this.dialogService.openDialog<ApartmentEditFormModalComponent>(
      ApartmentEditFormModalComponent,
      {
        data: { id: this.apartment.id, name: this.apartment.name },
      }
    );
  }

  onDelete() {
    this.dialogService.openDialog<ApartmentDeleteModalComponent>(
      ApartmentDeleteModalComponent,
      {
        data: { id: this.apartment.id },
      }
    );
  }
}
