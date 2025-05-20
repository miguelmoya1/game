import { Search } from '../types/search.type';

export class SearchEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly description?: string;

  private constructor(search: Search) {
    this.id = search.id;
    this.name = search.name;
    this.description = search.description;
  }

  public static create(search: Search) {
    return new SearchEntity(search);
  }
}

export class SearchResponseEntity {
  public readonly items: SearchEntity[];
  public readonly places: SearchEntity[];
  public readonly sets: SearchEntity[];

  private constructor(
    items: SearchEntity[],
    places: SearchEntity[],
    sets: SearchEntity[]
  ) {
    this.items = items;
    this.places = places;
    this.sets = sets;
  }

  public static create(
    items: SearchEntity[],
    places: SearchEntity[],
    sets: SearchEntity[]
  ) {
    return new SearchResponseEntity(items, places, sets);
  }
}
