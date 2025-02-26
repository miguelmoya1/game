CREATE TABLE
  IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    provider VARCHAR(255) NOT NULL,
    provider_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    is_confirmed BOOLEAN DEFAULT FALSE,
    is_primary BOOLEAN DEFAULT FALSE,
    hash_for_password_reset VARCHAR(255),
    hash_expired_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    user_id UUID REFERENCES users (id) ON DELETE CASCADE
  );

CREATE
OR REPLACE TRIGGER update_accounts_updated_at BEFORE
UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column ();

-- Additional indexes or constraints can be added here if necessary
CREATE INDEX IF NOT EXISTS idx_account_provider ON accounts (provider);

CREATE INDEX IF NOT EXISTS idx_account_email ON accounts (email);

CREATE INDEX IF NOT EXISTS idx_account_is_confirmed ON accounts (is_confirmed);

CREATE INDEX IF NOT EXISTS idx_account_created_at ON accounts (created_at);

CREATE INDEX IF NOT EXISTS idx_account_updated_at ON accounts (updated_at);

CREATE INDEX IF NOT EXISTS idx_account_deleted_at ON accounts (deleted_at);

CREATE INDEX IF NOT EXISTS idx_account_provider_id ON accounts (provider_id);

CREATE INDEX IF NOT EXISTS idx_account_user_id ON accounts (user_id);