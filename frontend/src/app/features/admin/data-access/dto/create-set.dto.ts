import { Effect } from '../../../../shared/types';

export type CreateSetDto = {
  readonly name: string;
  readonly effects: Effect[];

  readonly description?: string;
};
