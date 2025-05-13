import { ItemType, PlaceCategory, Rank } from '../../../../domain/enums';
import { Effect } from '../../../../domain/types';

export class UpdateItemDataDto {
  public readonly name!: string;
  public readonly description?: string;
  public readonly imageUrl?: string;
  public readonly rank?: Rank;
  public readonly itemType!: ItemType;
  public readonly effects!: Effect[];
  public readonly spawnCategories?: PlaceCategory[];
  public readonly setId?: string;
}
