import { InjectionToken } from '@angular/core';
import { CreateSetDto } from './dto/create-set.dto';

export type SetApiService = {
  create(createSetDto: CreateSetDto): Promise<void>;
};

export const SET_API_SERVICE = new InjectionToken<SetApiService>('SET_API_SERVICE');
