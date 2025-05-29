import { ItemType, PlaceCategory, Rank } from '../../enums';
import { Effect } from '../../types';

export abstract class Item {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly itemType: ItemType;
  public readonly imageUrl?: string;
  public readonly effects: Effect[];
  public readonly rank?: Rank;
  public readonly spawnCategories?: PlaceCategory[];

  protected constructor(item: Item) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.itemType = item.itemType;
    this.effects = item.effects;
    this.imageUrl = item.imageUrl;
    this.rank = item.rank;
    this.spawnCategories = item.spawnCategories;
  }
}

export class ItemEntity extends Item {
  public static create(item: Item) {
    return new ItemEntity(item);
  }
}
