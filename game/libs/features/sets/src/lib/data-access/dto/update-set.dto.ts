import { Effect } from '@game/features/effects';

export type UpdateSetDto = {
  readonly name: string;
  readonly effects: Effect[];

  readonly description?: string;
};
