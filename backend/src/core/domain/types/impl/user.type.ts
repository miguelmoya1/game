import { UserRole } from '../../enums/impl/user-role.enum';

export type User = {
  readonly id: string;

  readonly name: string;
  readonly surname: string | null;
  readonly nickname: string | null;
  readonly language: string;
  readonly role: UserRole;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
};
