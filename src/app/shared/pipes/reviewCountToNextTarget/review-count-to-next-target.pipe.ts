import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'reviewCountToNextTarget',
	standalone: true,
})
export class ReviewCountToNextTargetPipe implements PipeTransform {
	transform(value: number, count: number): number {
		if (value > 9.95) {
			return 0;
		}
		let targetRateBeforeBookingRound = 0;
		const reviewsRatingAverageTimes10 = value * 10;
		if (
			reviewsRatingAverageTimes10 - Math.floor(reviewsRatingAverageTimes10) >
			0.5
		) {
			targetRateBeforeBookingRound =
				Math.floor(reviewsRatingAverageTimes10) / 10 + 0.1501;
		} else {
			targetRateBeforeBookingRound =
				Math.floor(reviewsRatingAverageTimes10) / 10 + 0.0501;
		}
		const totalSum = value * count;
		let newReviewsAverage = value;
		let reviewsCountToNextTarget = 0;
		while (newReviewsAverage <= targetRateBeforeBookingRound) {
			reviewsCountToNextTarget++;
			newReviewsAverage =
				(totalSum + 10 * reviewsCountToNextTarget) /
				(count + reviewsCountToNextTarget);
		}

		return reviewsCountToNextTarget;
	}
}
