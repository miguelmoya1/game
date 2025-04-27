import { PlaceCategory } from '../../enums';
import { Item } from './item.type';

export type Place = {
  readonly id: string;
  readonly apiId: string;
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
  readonly osmTags: Record<string, string> | null;
  readonly categories: PlaceCategory[];
  readonly currentItemId: string;
  readonly currentItem: Item;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
};
