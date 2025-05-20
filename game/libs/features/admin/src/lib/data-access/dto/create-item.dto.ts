import { Effect, ItemType, PlaceCategory, Rank } from '@game/core';

export type CreateItemDto = {
  readonly name: string;
  readonly description?: string;
  readonly imageUrl?: string;
  readonly rank?: Rank;
  readonly itemType: ItemType;
  readonly effects: Effect[];
  readonly spawnCategories?: PlaceCategory[];
  readonly setId?: string;
};
