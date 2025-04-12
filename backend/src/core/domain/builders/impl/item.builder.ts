import { ItemType, PlaceCategory, Rank } from '@prisma/client';
import { Item } from '../../entities';

export class ItemBuilder {
  #id: string;

  #name: string;
  #description: string | null;
  #itemType: ItemType;
  #useEffect: string | null;
  #rank: Rank | null;
  #spawnCategories: PlaceCategory[];

  #createdAt: Date;
  #updatedAt: Date;

  public withId(id: string) {
    this.#id = id;
    return this;
  }

  public withName(name: string) {
    this.#name = name;
    return this;
  }

  public withDescription(description: string | null) {
    this.#description = description;
    return this;
  }

  public withItemType(itemType: ItemType) {
    this.#itemType = itemType;
    return this;
  }

  public withEffect(useEffect: string | null) {
    this.#useEffect = useEffect;
    return this;
  }

  public withRank(rank: Rank | null) {
    this.#rank = rank;
    return this;
  }

  public withSpawnCategories(spawnCategories: PlaceCategory[]) {
    this.#spawnCategories = spawnCategories;
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

  public build() {
    return new Item({
      id: this.#id,
      name: this.#name,

      description: this.#description,
      itemType: this.#itemType,
      useEffect: this.#useEffect,
      rank: this.#rank,
      spawnCategories: this.#spawnCategories,

      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    });
  }
}
