import { CreateAccountDto, CreateUserDto } from '../../../infrastructure/dto';

export class RegisterCommand {
  constructor(
    public readonly createAccountDto: CreateAccountDto,
    public readonly createUserDto: CreateUserDto,
  ) {}
}
