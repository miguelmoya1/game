import { InjectionToken, Resource, WritableSignal } from '@angular/core';
import { SetEntity } from '../../../shared/models';
import { SetListEntity } from '../../../shared/models/impl/set-list.entity';
import { CreateSetDto } from '../data-access/dto/create-set.dto';
import { UpdateSetDto } from '../data-access/dto/update-set.dto';

export type SetsService = {
  readonly list: Resource<SetListEntity[]>;
  readonly currentSetId: WritableSignal<string | null>;
  readonly currentSetResource: Resource<SetEntity | undefined>;

  create(createSetDto: CreateSetDto): Promise<void>;
  update(id: string, updateSetDto: UpdateSetDto): Promise<void>;
  delete(id: string): Promise<void>;
};

export const SETS_SERVICE = new InjectionToken<SetsService>('SETS_SERVICE');
