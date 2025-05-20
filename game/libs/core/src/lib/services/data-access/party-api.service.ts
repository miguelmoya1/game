import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Party } from '../../types/party.type';

@Injectable({ providedIn: 'root' })
export class PartyApiService {
  readonly #baseUrl = '/api/parties';
  readonly #http = inject(HttpClient);

  createParty(data: Partial<Party>) {
    return this.#http.post<Party>(`${this.#baseUrl}`, data);
  }

  addMember(partyId: string, playerId: string) {
    this.#http.post(`${this.#baseUrl}/${partyId}/members/${playerId}`, {});
  }

  removeMember(partyId: string, playerId: string) {
    this.#http.delete(`${this.#baseUrl}/${partyId}/members/${playerId}`);
  }

  deleteParty(partyId: string) {
    this.#http.delete(`${this.#baseUrl}/${partyId}`);
  }

  getPartyById(partyId: string) {
    return this.#http.get<Party>(`${this.#baseUrl}/${partyId}`);
  }

  getPartyByPlayer(playerId: string) {
    return this.#http.get<Party>(`${this.#baseUrl}/by-player/${playerId}`);
  }

  getPartyMembers(partyId: string) {
    return this.#http.get<string[]>(`${this.#baseUrl}/${partyId}/members`);
  }
}
