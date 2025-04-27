import { PlaceCategory } from '../../enums';

export type PlaceApi = {
  readonly apiId: string;
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
  readonly osmTags: Record<string, string>;
  readonly randomItemId: string;
  readonly categories: PlaceCategory[];
};
