export class Player {
  public readonly id: string;
  public readonly name: string;

  public readonly userId: string;
  public readonly mapId: string;

  public readonly gridX: number;
  public readonly gridY: number;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  constructor(
    player: Pick<
      Player,
      'id' | 'name' | 'userId' | 'mapId' | 'gridX' | 'gridY' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ) {
    this.id = player.id;
    this.name = player.name;

    this.userId = player.userId;
    this.mapId = player.mapId;

    this.gridX = player.gridX;
    this.gridY = player.gridY;

    this.createdAt = player.createdAt;
    this.updatedAt = player.updatedAt;
    this.deletedAt = player.deletedAt;
  }
}
