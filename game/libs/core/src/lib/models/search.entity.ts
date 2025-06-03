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
  public readonly places: SearchEntity[];

  private constructor(places: SearchEntity[]) {
    this.places = places;
  }

  public static create(places: SearchEntity[]) {
    return new SearchResponseEntity(places);
  }
}
