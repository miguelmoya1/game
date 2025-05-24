import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { mapPlayerArrayToEntityArray } from '../player/mappers/player.mapper';
import { PartyApiService } from './data-access/party-api.service';
import { mapPartyToEntity } from './mappers/party.mapper';
import { PartyService } from './party.service.contract';

@Injectable({
  providedIn: 'root',
})
export class PartyServiceImpl implements PartyService {
  readonly #api = inject(PartyApiService);

  readonly party = httpResource('parties/me', { parse: mapPartyToEntity });

  readonly members = httpResource(
    () => (this.party.value() ? 'parties/me/members' : undefined),
    {
      defaultValue: [],
      parse: mapPlayerArrayToEntityArray,
    },
  );

  async invite(playerId: string, partyId?: string) {
    await this.#api.invite(playerId, partyId);

    this.party.reload();
  }

  async removeMember(partyId: string, playerId: string) {
    await this.#api.removeMember(partyId, playerId);

    this.party.reload();
  }

  async deleteParty(partyId: string) {
    await this.#api.deleteParty(partyId);

    this.party.reload();
  }
}
