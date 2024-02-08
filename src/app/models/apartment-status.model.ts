export enum StatusEnum {
  pending = 'pending',
  ready = 'ready',
}

export type ApartmentStatus = StatusEnum.pending | StatusEnum.ready;
