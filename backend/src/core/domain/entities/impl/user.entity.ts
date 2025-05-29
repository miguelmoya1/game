import { UserRole } from '../../enums';

export abstract class User {
  public readonly id: string;
  public readonly name: string;
  public readonly surname: string | null;
  public readonly language: string;
  public readonly role: UserRole;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.language = user.language;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }
}

export class UserEntity extends User {
  public static create(user: User) {
    return new UserEntity(user);
  }

  public checkOwnership(userId: string) {
    return this.id === userId;
  }

  public isAdmin() {
    return this.role === UserRole.ADMIN;
  }
}
