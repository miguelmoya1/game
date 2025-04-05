import { PlaceAmenity } from '@prisma/client';
import { Place } from '../entities/impl/place.entity';

export class PlaceBuilder {
  #id: string;
  #apiId: string;
  #name: string;
  #lat: number;
  #lng: number;
  #addressName: string | null;
  #amenity: PlaceAmenity;

  #createdAt: Date;
  #updatedAt: Date;
  #deletedAt: Date | null;

  public withId(id: string) {
    this.#id = id;
    return this;
  }

  public withApiId(apiId: string) {
    this.#apiId = apiId;
    return this;
  }

  public withName(name: string) {
    this.#name = name;
    return this;
  }

  public withLat(lat: number) {
    this.#lat = lat;
    return this;
  }

  public withLng(lng: number) {
    this.#lng = lng;
    return this;
  }

  public withAddressName(addressName: string | null) {
    this.#addressName = addressName;
    return this;
  }

  public withAmenity(amenity: PlaceAmenity) {
    this.#amenity = amenity;
    return this;
  }

  public withCreatedAt(createdAt: Date) {
    this.#createdAt = createdAt;
    return this;
  }

  public withUpdatedAt(updatedAt: Date) {
    this.#updatedAt = updatedAt;
    return this;
  }

  public withDeletedAt(deletedAt: Date | null) {
    this.#deletedAt = deletedAt;
    return this;
  }

  public build() {
    return new Place({
      id: this.#id,
      apiId: this.#apiId,
      name: this.#name,
      lat: this.#lat,
      lng: this.#lng,
      addressName: this.#addressName,
      amenity: this.#amenity,

      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      deletedAt: this.#deletedAt,
    });
  }
}
