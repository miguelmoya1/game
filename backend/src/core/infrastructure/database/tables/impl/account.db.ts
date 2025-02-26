import { AccountProvider } from '@game/entities';

export type Account_db = {
  readonly id: string;
  readonly provider: AccountProvider;
  readonly provider_id: string;
  readonly email: string;
  readonly password: string | null;
  readonly is_confirmed: boolean;
  readonly is_primary: boolean;
  readonly hash_for_password_reset: string | null;
  readonly hash_expired_at: Date | null;

  readonly created_at: Date;
  readonly updated_at: Date;
  readonly deleted_at: Date | null;

  readonly user_id: string;
};
