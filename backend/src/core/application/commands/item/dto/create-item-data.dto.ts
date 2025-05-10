import { ItemType, PlaceCategory, Rank } from '../../../../domain/enums';
import { Effect } from '../../../../domain/types';

export type CreateItemDataDto = {
  name: string;
  description?: string;
  imageUrl?: string;
  rank?: Rank;
  itemType: ItemType;
  effect?: Effect[];
  spawnCategories?: PlaceCategory[];
  setId?: string;
};
