CREATE TABLE
  IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    surname VARCHAR(255),
    nickname VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
  );

CREATE
OR REPLACE TRIGGER update_users_updated_at BEFORE
UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column ();

-- Additional indexes or constraints can be added here if necessary
CREATE INDEX IF NOT EXISTS idx_user_name ON users (name);

CREATE INDEX IF NOT EXISTS idx_user_role ON users (role);

CREATE INDEX IF NOT EXISTS idx_user_nickname ON users (nickname);

CREATE INDEX IF NOT EXISTS idx_user_surname ON users (surname);

CREATE INDEX IF NOT EXISTS idx_user_created_at ON users (created_at);

CREATE INDEX IF NOT EXISTS idx_user_updated_at ON users (updated_at);

CREATE INDEX IF NOT EXISTS idx_user_deleted_at ON users (deleted_at);