import { UserRole } from '../../enums';
import { User } from '../../types';

export class UserEntity implements User {
  public readonly id: string;
  public readonly name: string;
  public readonly surname: string | null;
  public readonly nickname: string | null;
  public readonly language: string;
  public readonly role: UserRole;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  private constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.nickname = user.nickname;
    this.language = user.language;
    this.role = user.role;

    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }

  public static create(user: User): UserEntity {
    return new UserEntity(user);
  }
}
