import { Effect } from '@game/features/effects';

export type CreateSetDto = {
  readonly name: string;
  readonly effects: Effect[];

  readonly description?: string;
};
