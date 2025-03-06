export class Map {
  public readonly id: string;
  public readonly name: string;

  public readonly positionX: number;
  public readonly positionY: number;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  constructor(map: Pick<Map, 'id' | 'name' | 'positionX' | 'positionY' | 'createdAt' | 'updatedAt' | 'deletedAt'>) {
    this.id = map.id;
    this.name = map.name;

    this.positionX = map.positionX;
    this.positionY = map.positionY;

    this.createdAt = map.createdAt;
    this.updatedAt = map.updatedAt;
    this.deletedAt = map.deletedAt;
  }
}
