CREATE TABLE
  IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    map_id UUID REFERENCES maps (id) ON DELETE SET NULL,
    grid_x INTEGER NOT NULL,
    grid_y INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
  );

CREATE INDEX IF NOT EXISTS idx_players_user_id ON players (user_id);

CREATE INDEX IF NOT EXISTS idx_players_map_id ON players (map_id);

CREATE INDEX IF NOT EXISTS idx_players_grid_xy ON players (grid_x, grid_y);

CREATE
OR REPLACE TRIGGER update_players_updated_at BEFORE
UPDATE ON players FOR EACH ROW EXECUTE FUNCTION update_updated_at_column ();