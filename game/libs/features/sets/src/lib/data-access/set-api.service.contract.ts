import { InjectionToken } from '@angular/core';
import { SetEntity } from '../entities/set.entity';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { SetApiServiceImpl } from './set-api.service';

export type SetApiService = {
  all(): Promise<SetEntity[]>;

  create(createSetDto: CreateSetDto): Promise<void>;
  update(id: string, updateSetDto: UpdateSetDto): Promise<void>;
  delete(id: string): Promise<void>;
};

export const SET_API_SERVICE = new InjectionToken<SetApiService>(
  'SET_API_SERVICE',
  {
    factory: () => new SetApiServiceImpl(),
  },
);
