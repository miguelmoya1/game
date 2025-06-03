import { Effect } from '@game/core';

export interface SetDto {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly effects?: Effect[] | null;
}
