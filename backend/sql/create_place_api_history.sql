CREATE TABLE
  IF NOT EXISTS place_api_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    radius INT NOT NULL,
    last_request_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
  );

CREATE
OR REPLACE TRIGGER update_place_api_history_updated_at BEFORE
UPDATE ON place_api_history FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column ();

-- Additional indexes or constraints can be added here if necessary
CREATE INDEX IF NOT EXISTS idx_place_api_history_lat ON place_api_history (lat);

CREATE INDEX IF NOT EXISTS idx_place_api_history_lng ON place_api_history (lng);

CREATE INDEX IF NOT EXISTS idx_place_api_history_created_at ON place_api_history (created_at);

CREATE INDEX IF NOT EXISTS idx_place_api_history_updated_at ON place_api_history (updated_at);

CREATE INDEX IF NOT EXISTS idx_place_api_history_deleted_at ON place_api_history (deleted_at);