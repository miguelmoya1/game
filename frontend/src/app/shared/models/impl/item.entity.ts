import { ItemType, PlaceCategory, Rank } from '../../enums';
import { Item } from '../../types';

export class ItemEntity implements Item {
  id: string;
  name: string;
  description: string | null;
  itemType: ItemType;
  useEffect: string | null;
  rank: Rank | null;
  spawnCategories: PlaceCategory[];
  createdAt: Date;
  updatedAt: Date;

  private constructor(item: Item) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.itemType = item.itemType;
    this.useEffect = item.useEffect;
    this.rank = item.rank;
    this.spawnCategories = item.spawnCategories;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
  }

  public static create(item: Item) {
    return new ItemEntity(item);
  }
}
