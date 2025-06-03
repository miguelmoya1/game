import { Rank } from '@game/core';
import { Effect } from '@game/features/effects';
import { PlaceCategory } from '@game/features/places';
import { ItemType } from '../enums/item.enum';

export abstract class Item {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string | null;
  public readonly itemType: ItemType;
  public readonly imageUrl: string | null;
  public readonly effects?: Effect[] | null;
  public readonly rank: Rank | null;
  public readonly spawnCategories: PlaceCategory[];
  public readonly permissions: {
    readonly canCreate: boolean;
    readonly canEdit: boolean;
    readonly canDelete: boolean;
  };

  public readonly setId?: string | null;

  protected constructor(item: Item) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.itemType = item.itemType;
    this.imageUrl = item.imageUrl;
    this.effects = item.effects;
    this.permissions = item.permissions;
    this.setId = item.setId;
    this.rank = item.rank;
    this.spawnCategories = item.spawnCategories;
  }
}

export class ItemEntity extends Item {
  public static create(item: Item) {
    return new ItemEntity(item);
  }
}
