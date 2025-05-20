import { Effect } from '@game/core';

export type SetDto = {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly effects: Effect[] | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
};
