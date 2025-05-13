import { InjectionToken } from '@angular/core';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';

export type SetApiService = {
  create(createSetDto: CreateSetDto): Promise<void>;
  update(id: string, updateSetDto: UpdateSetDto): Promise<void>;
  delete(id: string): Promise<void>;
};

export const SET_API_SERVICE = new InjectionToken<SetApiService>('SET_API_SERVICE');
