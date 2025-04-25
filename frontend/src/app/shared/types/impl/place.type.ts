import { PlaceCategory } from '../../enums';

export type Place = {
  readonly id: string;
  readonly apiId: string;
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
  readonly osmTags: Record<string, string> | null;
  readonly categories: PlaceCategory | null;
  readonly currentItemId: string | null;
  readonly currentItem: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
};
