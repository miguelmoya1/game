import { PlaceCategory } from '../../../../features/places/src/lib/enums/place-category.enum';
import { Item } from './item.type';

export type Place = {
  readonly id: string;
  readonly apiId: string;
  readonly name: string;
  readonly lat: number;
  readonly lng: number;
  readonly categories: PlaceCategory[] | null;
  readonly currentItemId: string;
  readonly currentItem: Item;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  readonly permissions: {
    readonly alreadyClaimed: boolean;
    readonly canBeClaimed: boolean;
    readonly canCreate: boolean;
    readonly canDelete: boolean;
    readonly canEdit: boolean;
  };
};
