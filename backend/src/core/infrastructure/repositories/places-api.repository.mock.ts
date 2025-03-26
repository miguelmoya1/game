import { PlacesApiRepository } from '../../domain/interfaces/places-api.repository.ts';

export class PlacesApiRepositoryMock implements PlacesApiRepository {
  async getPlaces() {
    return [];
  }
}
