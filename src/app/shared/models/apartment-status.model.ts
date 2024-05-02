export enum ReviewStatusEnum {
	READY = 'ready',
	UPDATING = 'updating',
	FAILED = 'failed',
}
export enum ApartmentStatusEnum {
	READY = 'ready',
	CREATING = 'creating',
	DELETING = 'deleting',
	PATCHING = 'patching',
}

export type ReviewsStatus =
	| ReviewStatusEnum.READY
	| ReviewStatusEnum.UPDATING
	| ReviewStatusEnum.FAILED;

export type ApartmentStatus =
	| ApartmentStatusEnum.READY
	| ApartmentStatusEnum.DELETING
	| ApartmentStatusEnum.CREATING
	| ApartmentStatusEnum.PATCHING;