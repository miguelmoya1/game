CREATE TABLE
  IF NOT EXISTS cells (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    map_id UUID REFERENCES maps (id) ON DELETE CASCADE,
    grid_x INTEGER NOT NULL,
    grid_y INTEGER NOT NULL,
    can_move BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    UNIQUE (map_id, grid_x, grid_y)
  );

CREATE
OR REPLACE TRIGGER update_cells_updated_at BEFORE
UPDATE ON cells FOR EACH ROW EXECUTE FUNCTION update_updated_at_column ();

CREATE INDEX IF NOT EXISTS idx_cells_map_id ON cells (map_id);

CREATE INDEX IF NOT EXISTS idx_cells_grid_xy ON cells (grid_x, grid_y);

CREATE INDEX IF NOT EXISTS idx_cells_can_move ON cells (can_move);

CREATE INDEX IF NOT EXISTS idx_cells_created_at ON cells (created_at);

CREATE INDEX IF NOT EXISTS idx_cells_deleted_at ON cells (deleted_at);