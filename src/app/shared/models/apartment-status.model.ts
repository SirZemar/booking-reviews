export enum ReviewStatusEnum {
	READY = 'ready',
	UPDATING = 'updating',
}
export enum ApartmentStatusEnum {
	READY = 'ready',
	CREATING = 'creating',
	DELETING = 'deleting',
}

export type ReviewsStatus = ReviewStatusEnum.READY | ReviewStatusEnum.UPDATING;

export type ApartmentStatus =
	| ApartmentStatusEnum.READY
	| ApartmentStatusEnum.DELETING
	| ApartmentStatusEnum.CREATING;
