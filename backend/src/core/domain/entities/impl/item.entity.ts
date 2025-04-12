import { ItemType, PlaceCategory, Rank } from '@prisma/client';

export class Item {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string | null;
  public readonly itemType: ItemType;
  public readonly useEffect: string | null;
  public readonly rank: Rank | null;
  public readonly spawnCategories: PlaceCategory[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    account: Pick<
      Item,
      | 'id'
      | 'name'
      | 'description'
      | 'itemType'
      | 'useEffect'
      | 'rank'
      | 'spawnCategories'
      | 'createdAt'
      | 'updatedAt'
    >,
  ) {
    this.id = account.id;
    this.name = account.name;
    this.description = account.description;
    this.itemType = account.itemType;
    this.useEffect = account.useEffect;
    this.rank = account.rank;
    this.spawnCategories = account.spawnCategories;

    this.createdAt = account.createdAt;
    this.updatedAt = account.updatedAt;
  }
}
