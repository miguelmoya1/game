import { ItemType, PlaceCategory, Rank } from '../../enums';
import { StatBonus } from './stat-bonus.type';

export type Item = {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly itemType: ItemType;
  readonly useEffect: string | null;
  readonly rank: Rank | null;
  readonly spawnCategories: PlaceCategory[];

  readonly statBonuses?: StatBonus[] | null;

  readonly createdAt: Date;
  readonly updatedAt: Date;
};
