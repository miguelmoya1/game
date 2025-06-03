import { InventoryEntity } from '../../entities/inventory.entity';
import { InventoryDto } from '../dto/inventory.dto';

const isInventoryDto = (obj: unknown): obj is InventoryDto => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return (
    typeof dto['id'] === 'string' &&
    typeof dto['acquiredAt'] === 'string' &&
    typeof dto['isEquipped'] === 'boolean' &&
    typeof dto['itemId'] === 'string' &&
    typeof dto['playerId'] === 'string' &&
    typeof dto['quantity'] === 'number'
  );
};

const isInventoryDtoArray = (obj: unknown): obj is InventoryDto[] => {
  return Array.isArray(obj) && obj.every(isInventoryDto);
};

export const mapInventoryToEntity = (data: unknown) => {
  if (!isInventoryDto(data)) {
    console.error('Invalid data structure for InventoryDto:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to Place entity.',
    );
  }
  return mapInventory(data);
};

export const mapInventoryArrayToEntityArray = (data: unknown) => {
  if (!isInventoryDtoArray(data)) {
    console.error('Invalid data structure for InventoryDto array:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to Place[] entity array.',
    );
  }

  return data.map(mapInventory);
};

const mapInventory = (data: InventoryDto) => {
  return InventoryEntity.create({
    id: data.id,
    acquiredAt: new Date(data.acquiredAt),
    isEquipped: data.isEquipped,
    itemId: data.itemId,
    playerId: data.playerId,
    quantity: data.quantity,
  });
};
