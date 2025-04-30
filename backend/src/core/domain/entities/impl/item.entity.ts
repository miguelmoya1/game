import { ItemType, PlaceCategory, Rank } from '../../enums';
import { Item } from '../../types';
import { StatBonusEntity } from './stat-bonus.entity';

export class ItemEntity implements Item {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string | null;
  public readonly itemType: ItemType;
  public readonly useEffect: string | null;
  public readonly rank: Rank | null;
  public readonly spawnCategories: PlaceCategory[];

  public readonly statBonuses?: StatBonusEntity[] | null;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  private constructor(item: Item) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.itemType = item.itemType;
    this.useEffect = item.useEffect;
    this.rank = item.rank;
    this.spawnCategories = item.spawnCategories;

    this.statBonuses = item.statBonuses;

    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
  }

  public static create(item: Item) {
    return new ItemEntity(item);
  }
}
