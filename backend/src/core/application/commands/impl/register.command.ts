import { CreateAccountDto, CreateUserDto } from '@game/data/dto';

export class RegisterCommand {
  constructor(
    public readonly createAccountDto: CreateAccountDto,
    public readonly createUserDto: CreateUserDto,
  ) {}
}
