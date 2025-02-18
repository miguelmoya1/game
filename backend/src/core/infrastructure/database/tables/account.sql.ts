import { AccountProvider } from '@game/entities';

export type AccountDb = {
  id: string;
  provider: AccountProvider;
  providerId: string;
  email: string;
  password: string | null;
  isConfirmed: boolean;
  isPrimary: boolean;
  hashForPasswordReset: string | null;
  hasExpiredAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  userId: string;
};

export function createAccountSql() {
  return `
    CREATE TABLE IF NOT EXISTS accounts (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      provider VARCHAR(255) NOT NULL,
      providerId VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255),
      isConfirmed BOOLEAN DEFAULT FALSE,
      isPrimary BOOLEAN DEFAULT FALSE,
      hashForPasswordReset VARCHAR(255),
      hasExpiredAt TIMESTAMP,

      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deletedAt TIMESTAMP DEFAULT NULL,
      
      userId UUID REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE OR REPLACE TRIGGER update_accounts_updated_at
    BEFORE UPDATE ON accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

    -- Additional indexes or constraints can be added here if necessary
    CREATE INDEX IF NOT EXISTS idx_account_provider ON accounts (provider);
    CREATE INDEX IF NOT EXISTS idx_account_email ON accounts (email);
    CREATE INDEX IF NOT EXISTS idx_account_is_confirmed ON accounts (is_confirmed);
    CREATE INDEX IF NOT EXISTS idx_account_created_at ON accounts (created_at);
    CREATE INDEX IF NOT EXISTS idx_account_updated_at ON accounts (updated_at);
    CREATE INDEX IF NOT EXISTS idx_account_deleted_at ON accounts (deleted_at);
    CREATE INDEX IF NOT EXISTS idx_account_provider_id ON accounts (provider_id);
    CREATE INDEX IF NOT EXISTS idx_account_user_id ON accounts (user_id);
  `;
}
