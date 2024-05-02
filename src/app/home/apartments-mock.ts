import { Timestamp } from '../shared/models/timestamp.model';
import { Timestamp as FsTimestamp } from '@firebase/firestore';
import {
	ApartmentStatusEnum,
	ReviewStatusEnum,
} from 'src/app/shared/models/apartment-status.model';
import { Apartment } from 'src/app/shared/models/apartment.model';

const lastReviewScrapeDateMock1: Partial<Timestamp> = new FsTimestamp(
	2313123,
	21321321
);
(lastReviewScrapeDateMock1._nanoseconds = 21321321),
	(lastReviewScrapeDateMock1._seconds = 2313123);

const lastReviewScrapeDateMock2: Partial<Timestamp> = new FsTimestamp(
	3912801,
	809830129
);
(lastReviewScrapeDateMock1._seconds = 3912801),
	(lastReviewScrapeDateMock1._nanoseconds = 809830129);

export const apartmentsMock: Apartment[] = [
	{
		id: '1',
		lastReviewsScrape: lastReviewScrapeDateMock1 as Timestamp,
		name: 'Apartment 1',
		reviews: [
			{ id: '01', rate: 9.0, date: lastReviewScrapeDateMock1 as Timestamp },
		],
		reviewsCount: 200,
		reviewStatus: ReviewStatusEnum.READY,
		status: ApartmentStatusEnum.READY,
		reviewsRatingAverage: 9.0,
	},
	{
		id: '2',
		lastReviewsScrape: lastReviewScrapeDateMock2 as Timestamp,
		name: 'Apartment 2',
		reviews: [
			{ id: '02', rate: 9.2, date: lastReviewScrapeDateMock2 as Timestamp },
		],
		reviewsCount: 20,
		reviewStatus: ReviewStatusEnum.READY,
		status: ApartmentStatusEnum.READY,
		reviewsRatingAverage: 9.2,
	},
];
