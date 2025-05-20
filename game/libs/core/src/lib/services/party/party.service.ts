import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PartyApiService } from './data-access/party-api.service';
import { mapPartyToEntity } from './mappers/party.mapper';
import { PartyService } from './party.service.contract';

@Injectable({
  providedIn: 'root',
})
export class PartyServiceImpl implements PartyService {
  readonly party = httpResource('parties/me', { parse: mapPartyToEntity });
  private readonly api = inject(PartyApiService);
}
