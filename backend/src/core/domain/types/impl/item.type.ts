import { ItemType, PlaceCategory, Rank } from '@prisma/client';

export type Item = {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly itemType: ItemType;
  readonly useEffect: string | null;
  readonly rank: Rank | null;
  readonly spawnCategories: PlaceCategory[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
};
