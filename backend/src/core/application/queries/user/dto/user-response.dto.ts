import { UserEntity } from '../../../../domain/entities';
import { UserRole } from '../../../../domain/enums';

export class UserResponseDto {
  public readonly id: string;
  public readonly nickname: string | null;
  public readonly language: string | null;
  public readonly role: UserRole;

  private constructor(data: {
    id: string;
    nickname: string | null;
    language: string | null;
    role: UserRole;
  }) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.language = data.language;
    this.role = data.role;
  }

  public static create(data: UserEntity) {
    return new UserResponseDto(data);
  }
}
