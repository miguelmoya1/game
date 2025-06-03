import { Effect } from '@game/features/effects';

export interface SetDto {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly effects?: Effect[] | null;
}
