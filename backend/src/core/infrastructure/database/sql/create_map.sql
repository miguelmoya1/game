CREATE TABLE
    IF NOT EXISTS maps (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name VARCHAR(255) NOT NULL,
        position_x INTEGER NOT NULL,
        position_y INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP DEFAULT NULL
    );

CREATE
OR REPLACE TRIGGER update_maps_updated_at BEFORE
UPDATE ON maps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column ();

CREATE INDEX IF NOT EXISTS idx_map_name ON maps (name);

CREATE INDEX IF NOT EXISTS idx_map_created_at ON maps (created_at);

CREATE INDEX IF NOT EXISTS idx_map_deleted_at ON maps (deleted_at);