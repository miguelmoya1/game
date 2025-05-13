import { CreateSetDataDto } from '../../../../application/commands';
import { SetEntity } from '../../../../domain/entities';

export interface SetRepository {
  getAll(): Promise<SetEntity[] | null>;
  getById(id: string): Promise<SetEntity | null>;
  create(createSetDto: CreateSetDataDto): Promise<SetEntity | null>;
  search(criteria: string): Promise<SetEntity[]>;
}

export const SET_REPOSITORY = Symbol('SET_REPOSITORY');
