import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	computed,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
// Material Components
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Models
import { Apartment } from 'src/app/shared/models/apartment.model';
// Pipes
import { TimestampToDateStringPipe } from 'src/app/shared/pipes/timestampToDateString/timestamp-to-date-string.pipe';
import { ReviewCountToNextTargetPipe } from 'src/app/shared/pipes/reviewCountToNextTarget/review-count-to-next-target.pipe';
import { BookingRoundNumberPipe } from 'src/app/shared/pipes/bookingRoundNumber/booking-round-number.pipe';
// Other
import { StatusEnum } from 'src/app/shared/models/apartment-status.model';
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
	@Output() launchBookingPage = new EventEmitter();
	@Output() update = new EventEmitter();
	@Output() edit = new EventEmitter();
	@Output() delete = new EventEmitter();

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
}
