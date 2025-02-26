import { UserRole } from '@game/entities';

export type User_db = {
  readonly id: string;
  readonly name: string;
  readonly role: UserRole;
  readonly surname: string | null;
  readonly nickname: string | null;
  readonly language: string;

  readonly created_at: Date;
  readonly updated_at: Date;
  readonly deleted_at: Date | null;
};
