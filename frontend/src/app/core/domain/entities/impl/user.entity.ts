import { UserDto } from '@game/dto';
import { UserRole } from '@game/enums';

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly surname: string | null;

  public readonly language: string;
  public readonly nickname: string | null;

  public readonly role: UserRole;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;

  constructor(user: UserDto) {
    this.id = user.id ?? '';
    this.name = user.name ?? '';
    this.surname = user.surname ?? null;
    this.language = user.language ?? '';
    this.nickname = user.nickname ?? null;

    this.role = user.role ?? UserRole.USER; // Assuming UserRole.USER is a valid default value

    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }

  public isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }
}
