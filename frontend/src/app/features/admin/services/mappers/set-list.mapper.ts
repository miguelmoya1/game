import { SetListEntity } from '../../../../shared/models';
import { SetListDto } from '../dto/set-list.dto';

const isSetListDto = (obj: unknown): obj is SetListDto => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return typeof dto['id'] === 'string' && typeof dto['name'] === 'string';
};

const isSetListDtoArray = (obj: unknown): obj is SetListDto[] => {
  return Array.isArray(obj) && obj.every(isSetListDto);
};

export const mapSetListToEntity = (data: unknown) => {
  if (!isSetListDto(data)) {
    console.error('Invalid data structure for SetListDto:', data);
    throw new TypeError('Invalid data structure received. Cannot map to Set entity.');
  }
  return mapSetList(data);
};

export const mapSetListArrayToEntityArray = (data: unknown) => {
  if (!isSetListDtoArray(data)) {
    console.error('Invalid data structure for SetListDto array:', data);
    throw new TypeError('Invalid data structure received. Cannot map to Set[] entity array.');
  }

  return data.map(mapSetList);
};

const mapSetList = (data: SetListDto) => {
  return SetListEntity.create({
    id: data.id,
    name: data.name,
  });
};
