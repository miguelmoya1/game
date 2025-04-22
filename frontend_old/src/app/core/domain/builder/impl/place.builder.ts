import { Place } from '@game/entities';

export class PlaceBuilder {
  declare id: string;
  declare apiId: string;
  declare name: string;
  declare lat: number;
  declare lng: number;
  declare osmTags: Record<string, string> | null;
  declare categories: string[];

  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  public withId(id: string) {
    this.id = id;
    return this;
  }

  public withApiId(apiId: string) {
    this.apiId = apiId;
    return this;
  }

  public withName(name: string) {
    this.name = name;
    return this;
  }

  public withLat(lat: number) {
    this.lat = lat;
    return this;
  }

  public withLng(lng: number) {
    this.lng = lng;
    return this;
  }

  public withOsmTags(osmTags: Record<string, string> | null) {
    this.osmTags = osmTags;
    return this;
  }

  public withCategories(categories: string[]) {
    this.categories = categories;
    return this;
  }

  public withCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
    return this;
  }

  public withUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
    return this;
  }

  public withDeletedAt(deletedAt: Date | null) {
    this.deletedAt = deletedAt;
    return this;
  }

  public build() {
    return new Place({
      id: this.id,
      apiId: this.apiId,
      name: this.name,
      lat: this.lat,
      lng: this.lng,
      osmTags: this.osmTags,
      categories: this.categories,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    });
  }
}
