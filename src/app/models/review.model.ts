import { Timestamp } from '@firebase/firestore-types';

export type Review = {
  date: Timestamp;
  rate: number;
  id: string;
};
