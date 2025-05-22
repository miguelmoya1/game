import { UserEntity } from '../../../../domain/entities';
import { UserRole } from '../../../../domain/enums';

export class UserResponseDto {
  public readonly id: string;
  public readonly language: string | null;
  public readonly role: UserRole;

  private constructor(data: {
    id: string;
    language: string | null;
    role: UserRole;
  }) {
    this.id = data.id;
    this.language = data.language;
    this.role = data.role;
  }

  public static create(data: UserEntity) {
    return new UserResponseDto({
      id: data.id,
      language: data.language,
      role: data.role,
    });
  }
}
