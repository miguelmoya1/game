import { SearchEntity, SearchResponseEntity } from '../../../../shared/models/impl/search.entity';
import { SearchDto, SearchResponseDto } from '../dto/search.dto';

const isSearchResponseDto = (obj: unknown): obj is SearchResponseDto => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return typeof dto['items'] !== null && dto['sets'] !== null && dto['places'] !== null;
};

const mapSearch = (data: SearchDto) => {
  if (typeof data !== 'object' || data === null) {
    console.error('Invalid data structure for SearchDto:', data);
    throw new TypeError('Invalid data structure received. Cannot map to Search entity.');
  }

  return SearchEntity.create({
    id: data.id,
    name: data.name,
    description: data.description,
  });
};

export const mapSearchResponseToEntity = (data: unknown) => {
  if (!isSearchResponseDto(data)) {
    console.error('Invalid data structure for SearchResponseDto:', data);
    throw new TypeError('Invalid data structure received. Cannot map to SearchResponse entity.');
  }

  return SearchResponseEntity.create(data.items.map(mapSearch), data.places.map(mapSearch), data.sets.map(mapSearch));
};
