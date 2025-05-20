import { Effect } from '@game/core';

export type CreateSetDto = {
  readonly name: string;
  readonly effects: Effect[];

  readonly description?: string;
};
