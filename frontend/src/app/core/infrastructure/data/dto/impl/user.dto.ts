import { UserRole } from '@game/enums';

export interface UserDto {
  readonly id: string;
  readonly name: string;
  readonly surname: string | null;

  readonly language: string;
  readonly nickname: string | null;

  readonly role: UserRole;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}
