import { InjectionToken, Resource } from '@angular/core';
import { SetListEntity } from '../../../shared/models/impl/set-list.entity';
import { CreateSetDto } from '../data-access/dto/create-set.dto';

export type SetsService = {
  /** List of sets. (FOR SELECTS) */
  readonly list: Resource<SetListEntity[]>;
  create(createSetDto: CreateSetDto): Promise<void>;
};

export const SETS_SERVICE = new InjectionToken<SetsService>('SETS_SERVICE');
