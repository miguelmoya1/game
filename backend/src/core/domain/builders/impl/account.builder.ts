import { Account, AccountProvider } from '@game/entities';

export class AccountBuilder {
  #id: string;
  #userId: string;
  #provider: AccountProvider;
  #providerId: string;
  #email: string;
  #password?: string;

  #isConfirmed: boolean;
  #isPrimary: boolean;

  #hashForPasswordReset: string | null;
  #hashExpiredAt: Date | null;

  #createdAt: Date;
  #updatedAt: Date;
  #deletedAt: Date | null;

  public withId(id: string) {
    this.#id = id;
    return this;
  }

  public withUserId(userId: string) {
    this.#userId = userId;
    return this;
  }

  public withProvider(provider: AccountProvider) {
    this.#provider = provider;
    return this;
  }

  public withProviderId(providerId: string) {
    this.#providerId = providerId;
    return this;
  }

  public withEmail(email: string) {
    this.#email = email;
    return this;
  }

  public withPassword(password?: string) {
    this.#password = password || undefined;
    return this;
  }

  public withIsConfirmed(isConfirmed: boolean) {
    this.#isConfirmed = isConfirmed;
    return this;
  }

  public withIsPrimary(isPrimary: boolean) {
    this.#isPrimary = isPrimary;
    return this;
  }

  public withHashForPasswordReset(hashForPasswordReset: string | null) {
    this.#hashForPasswordReset = hashForPasswordReset;
    return this;
  }

  public withHashExpiredAt(hashExpiredAt: Date | null) {
    this.#hashExpiredAt = hashExpiredAt;
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
    return new Account({
      id: this.#id,
      userId: this.#userId,
      provider: this.#provider,
      providerId: this.#providerId,
      email: this.#email,

      isConfirmed: this.#isConfirmed,
      isPrimary: this.#isPrimary,

      hashForPasswordReset: this.#hashForPasswordReset,
      hashExpiredAt: this.#hashExpiredAt,

      password: this.#password,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      deletedAt: this.#deletedAt,
    });
  }
}
