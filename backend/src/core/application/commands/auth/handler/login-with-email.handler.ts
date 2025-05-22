import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ErrorCodes } from '../../../../domain/enums';
import {
  ACCOUNT_REPOSITORY,
  AccountRepository,
  USER_REPOSITORY,
  UserRepository,
} from '../../../../infrastructure/repositories';
import { ENCRYPTION_SERVICE, EncryptionService } from '../../../services';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LoginWithEmailCommand } from '../impl/login-with-email.command';

@CommandHandler(LoginWithEmailCommand)
export class LoginWithEmailHandler
  implements ICommandHandler<LoginWithEmailCommand>
{
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepository: AccountRepository,
    @Inject(ENCRYPTION_SERVICE)
    private readonly _encryptionService: EncryptionService,
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: UserRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async execute(command: LoginWithEmailCommand) {
    const { email, password } = command;

    const account = await this._accountRepository.getOneByProviderEmail(email);

    if (!account) {
      throw new HttpException(
        ErrorCodes.ACCOUNT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValid = await this._encryptionService.compare(
      password,
      account.password!,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        ErrorCodes.USER_OR_PASSWORD_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this._userRepository.findById(account.userId);

    if (!user) {
      throw new HttpException(ErrorCodes.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    try {
      const { id, role, language } = user;
      const token = await this._jwtService.signAsync({
        id,
        role,
        language,
      });
      return LoginResponseDto.create(token);
    } catch (error) {
      console.error('Error signing JWT:', error);
      throw new HttpException(
        ErrorCodes.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
