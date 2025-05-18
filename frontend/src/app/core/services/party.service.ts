import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Party } from '@game/shared/types';
import { mapPartyToEntity } from './mappers/party.mapper';
import { PartyApiService } from './party-api.service';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  readonly party = httpResource('parties/me', { parse: mapPartyToEntity });
  private readonly api = inject(PartyApiService);

  getPartyByIdResource(partyId: string) {
    return httpResource(() => (partyId ? `parties/${partyId}` : undefined), {
      parse: mapPartyToEntity,
    });
  }

  createParty(data: Partial<Party>) {
    return this.api.createParty(data);
  }

  addMember(partyId: string, playerId: string) {
    return this.api.addMember(partyId, playerId);
  }

  removeMember(partyId: string, playerId: string) {
    return this.api.removeMember(partyId, playerId);
  }

  deleteParty(partyId: string) {
    return this.api.deleteParty(partyId);
  }

  getPartyById(partyId: string) {
    return this.api.getPartyById(partyId);
  }

  getPartyByPlayer(playerId: string) {
    return this.api.getPartyByPlayer(playerId);
  }

  getPartyMembers(partyId: string) {
    return this.api.getPartyMembers(partyId);
  }
}
