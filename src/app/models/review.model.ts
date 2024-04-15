import { Timestamp } from './timestamp.model';

export type Review = {
	date: Timestamp;
	rate: number;
	id: string;
};
