CREATE TABLE
  IF NOT EXISTS places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    api_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    address_name VARCHAR(255),
    amenity VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
  );

CREATE
OR REPLACE TRIGGER update_places_updated_at BEFORE
UPDATE ON places FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column ();

-- Additional indexes or constraints can be added here if necessary
CREATE INDEX IF NOT EXISTS idx_place_name ON places (name);

CREATE INDEX IF NOT EXISTS idx_place_lat ON places (lat);

CREATE INDEX IF NOT EXISTS idx_place_lng ON places (lng);

CREATE INDEX IF NOT EXISTS idx_place_created_at ON places (created_at);

CREATE INDEX IF NOT EXISTS idx_place_updated_at ON places (updated_at);

CREATE INDEX IF NOT EXISTS idx_place_deleted_at ON places (deleted_at);