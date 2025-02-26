import { Player } from '@game/entities';

export class PlayerBuilder {
  #id: string;

  #name: string;

  #gridX: number;
  #gridY: number;

  #mapId: string;
  #userId: string;

  #createdAt: Date;
  #updatedAt: Date;
  #deletedAt: Date | null;

  public withId(id: string) {
    this.#id = id;
    return this;
  }

  public withName(name: string) {
    this.#name = name;
    return this;
  }

  public withGridX(gridX: number) {
    this.#gridX = gridX;
    return this;
  }

  public withGridY(gridY: number) {
    this.#gridY = gridY;
    return this;
  }

  public withMapId(mapId: string) {
    this.#mapId = mapId;
    return this;
  }

  public withUserId(userId: string) {
    this.#userId = userId;
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
    return new Player({
      id: this.#id,
      name: this.#name,

      gridX: this.#gridX,
      gridY: this.#gridY,

      mapId: this.#mapId,
      userId: this.#userId,

      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      deletedAt: this.#deletedAt,
    });
  }
}
