import { ItemType, PlaceCategory, Rank } from '../../enums';
import { Effect, Item } from '../../types';
import { SetEntity } from './set.entity';

export class ItemEntity implements Item {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string | null;
  public readonly itemType: ItemType;
  public readonly effects?: Effect[] | null;
  public readonly rank: Rank | null;
  public readonly spawnCategories: PlaceCategory[];
  public readonly imageUrl: string | null;

  public readonly setId: string | null;
  public readonly set?: SetEntity | null;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  private constructor(item: Item) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.itemType = item.itemType;
    this.effects = item.effects;
    this.rank = item.rank;
    this.imageUrl = item.imageUrl;

    this.spawnCategories = item.spawnCategories;

    this.setId = item.setId;
    this.set = item.set;

    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
    this.deletedAt = item.deletedAt;
  }

  public static create(item: Item) {
    return new ItemEntity(item);
  }
}
