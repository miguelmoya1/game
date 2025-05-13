import { Effect } from '../../../../domain/types';

export class UpdateSetDataDto {
  public readonly name!: string;
  public readonly description?: string;
  public readonly effects!: Effect[];
}
