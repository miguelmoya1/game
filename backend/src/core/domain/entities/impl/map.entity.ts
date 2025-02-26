export class Map {
  public readonly id: string;
  public readonly name: string;

  public readonly positionX: number;
  public readonly positionY: number;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  constructor(cell: Pick<Map, 'id' | 'name' | 'positionX' | 'positionY' | 'createdAt' | 'updatedAt' | 'deletedAt'>) {
    this.id = cell.id;
    this.name = cell.name;

    this.positionX = cell.positionX;
    this.positionY = cell.positionY;

    this.createdAt = cell.createdAt;
    this.updatedAt = cell.updatedAt;
    this.deletedAt = cell.deletedAt;
  }
}
