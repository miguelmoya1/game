import { UserRole } from '@prisma/client';
import { User } from '../../entities/impl/user.entity';

export class UserBuilder {
  #id: string;

  #name: string;
  #surname: string | null;
  #nickname: string | null;
  #language = 'en';

  #role: UserRole = UserRole.USER;

  #createdAt: Date;
  #updatedAt: Date;
  #deletedAt: Date | null;

  public withId(id: string) {
    this.#id = id;
    return this;
  }

  public withName(name: string) {
    this.#name = name;
    return this;
  }

  public withSurname(surname: string | null) {
    this.#surname = surname;
    return this;
  }

  public withNickname(nickname: string | null) {
    this.#nickname = nickname;
    return this;
  }

  public withLanguage(language: string) {
    this.#language = language;
    return this;
  }

  public withRole(role: UserRole) {
    this.#role = role;
    return this;
  }

  public withCreatedAt(createdAt: Date) {
    this.#createdAt = createdAt;
    return this;
  }

  public withUpdatedAt(updatedAt: Date) {
    this.#updatedAt = updatedAt;
    return this;
  }

  public withDeletedAt(deletedAt: Date | null) {
    this.#deletedAt = deletedAt;
    return this;
  }

  public build() {
    return new User({
      id: this.#id,
      name: this.#name,
      surname: this.#surname,
      language: this.#language,
      nickname: this.#nickname,
      role: this.#role,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      deletedAt: this.#deletedAt,
    });
  }
}
