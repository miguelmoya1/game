import { PlayerItemCollectionLog } from '../../types';

export class PlayerItemCollectionLogEntity implements PlayerItemCollectionLog {
  public readonly id: string;
  public readonly collectionMonthYear: string;
  public readonly collectedAt: Date;
  public readonly playerId: string;
  public readonly placeId: string;
  public readonly itemId: string;

  private constructor(playerItemCollectionLog: PlayerItemCollectionLog) {
    this.id = playerItemCollectionLog.id;
    this.collectionMonthYear = playerItemCollectionLog.collectionMonthYear;
    this.collectedAt = playerItemCollectionLog.collectedAt;
    this.playerId = playerItemCollectionLog.playerId;
    this.placeId = playerItemCollectionLog.placeId;
    this.itemId = playerItemCollectionLog.itemId;
  }

  public static create(playerItemCollectionLog: PlayerItemCollectionLog) {
    return new PlayerItemCollectionLogEntity(playerItemCollectionLog);
  }

  public static formatToCollectionMonthYear(time: Date) {
    const month = time.getMonth() + 1;
    const year = time.getFullYear();

    return `${year}-${month.toString().padStart(2, '0')}`;
  }

  public isCollectedFrom(date: Date) {
    return (
      this.collectionMonthYear ===
      PlayerItemCollectionLogEntity.formatToCollectionMonthYear(date)
    );
  }
}
