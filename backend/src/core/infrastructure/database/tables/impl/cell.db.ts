export type Cell_db = {
  readonly id: string;
  readonly name: string;

  readonly position_x: number;
  readonly position_y: number;

  readonly created_at: Date;
  readonly updated_at: Date;
  readonly deleted_at: Date | null;
};
