import { Timestamp as FirestoreTimestamp } from '@firebase/firestore-types';

export interface Timestamp extends FirestoreTimestamp {
	_seconds: number;
	_nanoseconds: number;
}
