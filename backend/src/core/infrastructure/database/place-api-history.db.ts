export type Place_api_history_db = {
  readonly lat: number;
  readonly lng: number;
  readonly radius: number;

  readonly last_request_at: Date;

  readonly created_at: Date;
  readonly updated_at: Date;
  readonly deleted_at: Date | null;
};
