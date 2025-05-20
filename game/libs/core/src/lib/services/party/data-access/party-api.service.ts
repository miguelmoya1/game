import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Party } from '../../../types/party.type';

@Injectable({ providedIn: 'root' })
export class PartyApiService {
  readonly #baseUrl = '/api/parties';
  readonly #http = inject(HttpClient);

  async createParty(data: Partial<Party>) {
    await firstValueFrom(this.#http.post<void>(`${this.#baseUrl}`, data));
  }

  async addMember(partyId: string, playerId: string) {
    await firstValueFrom(
      this.#http.post<void>(
        `${this.#baseUrl}/${partyId}/members/${playerId}`,
        {}
      )
    );
  }

  async removeMember(partyId: string, playerId: string) {
    await firstValueFrom(
      this.#http.delete<void>(`${this.#baseUrl}/${partyId}/members/${playerId}`)
    );
  }

  async deleteParty(partyId: string) {
    await firstValueFrom(
      this.#http.delete<void>(`${this.#baseUrl}/${partyId}`)
    );
  }

  async getPartyById(partyId: string) {
    return await firstValueFrom(
      this.#http.get<Party>(`${this.#baseUrl}/${partyId}`)
    );
  }

  async getPartyByPlayer(playerId: string) {
    return await firstValueFrom(
      this.#http.get<Party>(`${this.#baseUrl}/by-player/${playerId}`)
    );
  }

  async getPartyMembers(partyId: string) {
    return await firstValueFrom(
      this.#http.get<string[]>(`${this.#baseUrl}/${partyId}/members`)
    );
  }
}
