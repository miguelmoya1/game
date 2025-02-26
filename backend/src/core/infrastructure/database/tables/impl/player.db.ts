export type Player_db = {
  readonly id: string;
  readonly name: string;

  readonly user_id: string;
  readonly map_id: string;
  readonly grid_x: number;
  readonly grid_y: number;

  readonly created_at: Date;
  readonly updated_at: Date;
  readonly deleted_at: Date | null;
};
