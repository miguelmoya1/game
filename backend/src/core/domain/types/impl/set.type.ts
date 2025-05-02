import { Effect } from './effect.type';
import { Item } from './item.type';

export type Set = {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;

  readonly items?: Item[] | null;
  readonly effects?: Effect[] | null;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
};
