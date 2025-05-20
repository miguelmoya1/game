import { Effect } from '@game/core';

export type UpdateSetDto = {
  readonly name: string;
  readonly effects: Effect[];

  readonly description?: string;
};
