export type PlayerItem = {
  readonly id: string;
  readonly quantity: number;
  readonly isEquipped: boolean;
  readonly acquiredAt: Date;

  readonly playerId: string;
  readonly itemId: string;
};
