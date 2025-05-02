export type PlayerItemCollectionLog = {
  readonly id: string;
  readonly collectionMonthYear: string;
  readonly collectedAt: Date;

  readonly playerId: string;
  readonly placeId: string;
  readonly itemId: string;
};
