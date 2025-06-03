import { InjectionToken, Resource } from '@angular/core';
import { CreateSetDto } from '../data-access/dto/create-set.dto';
import { UpdateSetDto } from '../data-access/dto/update-set.dto';
import { SetEntity } from '../entities/set.entity';
import { SetServiceImpl } from './set.service';

export interface SetService {
  readonly sets: Resource<SetEntity[]>;

  create(createSetDto: CreateSetDto): Promise<void>;
  update(id: string, updateSetDto: UpdateSetDto): Promise<void>;
  delete(id: string): Promise<void>;
}

export const SET_SERVICE = new InjectionToken<SetService>('SET_SERVICE', {
  providedIn: 'root',
  factory: () => new SetServiceImpl(),
});
