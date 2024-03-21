import { Timestamp } from '@firebase/firestore';
import { StatusEnum } from 'src/app/models/apartment-status.model';
import { Apartment } from 'src/app/models/apartment.model';

const time1: any = new Timestamp(2313123, 21321321);
(time1._seconds = 2313123), (time1._nanoseconds = 21321321);
const time2: any = new Timestamp(3912801, 809830129);
(time1._seconds = 3912801), (time1._nanoseconds = 809830129);

export const apartmentsMock: Apartment[] = [
  {
    id: '1',
    lastReviewsScrape: time1,
    name: 'Apartment 1',
    reviews: [{ id: '01', rate: 9.0, date: time1 }],
    reviewsCount: 200,
    status: StatusEnum.ready,
    reviewsRatingAverage: 9.0,
  },
  {
    id: '2',
    lastReviewsScrape: time2,
    name: 'Apartment 2',
    reviews: [{ id: '02', rate: 9.2, date: time2 }],
    reviewsCount: 20,
    status: StatusEnum.ready,
    reviewsRatingAverage: 9.2,
  },
];
