import { Effect } from '../../../../shared/types';

export type UpdateSetDto = {
  readonly name: string;
  readonly effects: Effect[];

  readonly description?: string;
};
