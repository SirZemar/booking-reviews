import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'src/app/shared/models/timestamp.model';
import { Timestamp as FirestoreTimestamp } from '@firebase/firestore';

@Pipe({
	name: 'timestampToDateString',
	standalone: true,
})
export class TimestampToDateStringPipe implements PipeTransform {
	transform(
		value: Timestamp,
		options?: { dateFormat: Intl.DateTimeFormatOptions }
	): string {
		if (value) {
			const lastScrapeDate = new FirestoreTimestamp(
				value._seconds,
				value._nanoseconds
			).toDate();

			return new Date(lastScrapeDate).toLocaleString(
				'en-US',
				options?.dateFormat
			);
		} else {
			return '';
		}
	}
}

const options = {
	weekday: 'short' as const,
	year: 'numeric' as const,
	month: 'short' as const,
	day: 'numeric' as const,
	hour: 'numeric' as const,
	minute: 'numeric' as const,
	hour12: true,
};
