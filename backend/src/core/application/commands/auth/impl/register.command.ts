import { CreateAccountDataDto } from '../dto/create-account-data.dto';
import { CreateUserDataDto } from '../dto/create-user-data.dto';

export class RegisterCommand {
  constructor(
    public readonly createAccountDto: CreateAccountDataDto,
    public readonly createUserDto: CreateUserDataDto,
  ) {}
}
