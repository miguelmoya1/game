import { ItemType, PlaceCategory, Rank } from '../../../../shared/enums';
import { Effect } from '../../../../shared/types';

export type UpdateItemDto = {
  readonly name: string;
  readonly description?: string;
  readonly imageUrl?: string;
  readonly rank?: Rank;
  readonly itemType: ItemType;
  readonly effects: Effect[];
  readonly spawnCategories?: PlaceCategory[];
  readonly setId?: string;
};
