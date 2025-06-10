import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ActiveAccountCommand,
  ChangePasswordCommand,
  LoginWithEmailCommand,
  RegisterCommand,
} from '../../core/application/commands';
import { CheckEmailExistsQuery, RehydrateQuery } from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities';
import { AuthenticatedUser, IsPublic } from '../../core/infrastructure/decorators';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RegisterDto } from './dto/create.dto';
import { LoginWithEmailDto } from './dto/login-with-email.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) {}

  @IsPublic()
  @Get('confirm/:accountId')
  public async confirmLogin(@Param('accountId') accountId: string) {
    const command = new ActiveAccountCommand(accountId);

    return await this._commandBus.execute<ActiveAccountCommand, string>(command);
  }

  @Get('is-authenticated')
  public isAuthenticated() {
    return { isAuthenticated: true };
  }

  @Get('rehydrate')
  public async rehydrate(@AuthenticatedUser() user: UserEntity) {
    const query = new RehydrateQuery(user);

    return await this._queryBus.execute<RehydrateQuery, string>(query);
  }

  @IsPublic()
  @Post('change-password/:hashForPasswordReset')
  public async changePassword(
    @Param('hashForPasswordReset') hashForPasswordReset: string,
    @Body() passwordDto: ChangePasswordDto,
  ) {
    const { password } = passwordDto;

    const command = new ChangePasswordCommand(hashForPasswordReset, password);

    await this._commandBus.execute<ChangePasswordCommand, boolean>(command);
  }

  @IsPublic()
  @Post('login/email')
  public async loginWithEmail(@Body() loginWithEmailDto: LoginWithEmailDto) {
    const { email, password } = loginWithEmailDto;

    const command = new LoginWithEmailCommand(email, password);
    return await this._commandBus.execute<LoginWithEmailCommand, string>(command);
  }

  @IsPublic()
  @Post('register')
  public async register(@Body() registerDto: RegisterDto) {
    const { email, name, password, provider, providerId, surname, userId } = registerDto;
    const account = {
      email,
      password,
      provider,
      providerId,
      userId,
    };

    const user = {
      name,
      surname,
    };

    const command = new RegisterCommand(account, user);
    return await this._commandBus.execute<RegisterCommand, string>(command);
  }

  @IsPublic()
  @Post('check-email')
  public async checkEmail(@Body() body: { email: string }) {
    const query = new CheckEmailExistsQuery(body.email);

    return await this._queryBus.execute<CheckEmailExistsQuery, boolean>(query);
  }
}
