export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class User {
  public readonly id: string;

  public readonly name: string;
  public readonly surname: string | null;
  public readonly nickname: string | null;
  public readonly language: string;
  public readonly role: UserRole;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  constructor(
    user: Pick<
      User,
      'id' | 'name' | 'surname' | 'nickname' | 'language' | 'role' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ) {
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

  public checkOwnership(userId: string) {
    return this.id === userId;
  }

  public isAdmin() {
    return this.role === UserRole.ADMIN;
  }
}
