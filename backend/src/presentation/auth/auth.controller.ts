import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ActiveAccountCommand,
  ChangePasswordCommand,
  LoginWithEmailCommand,
  RegisterCommand,
} from '../../core/application/commands';
import { RehydrateQuery } from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities';
import {
  AuthenticatedUser,
  IsPublic,
} from '../../core/infrastructure/decorators';
import {
  AuthEmailLoginPayloadDto,
  ChangePasswordDto,
  CreateAccountDto,
  CreateUserDto,
} from '../../core/infrastructure/dto';

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

    const token = await this._commandBus.execute<ActiveAccountCommand, string>(
      command,
    );

    return { token };
  }

  @Get('is-authenticated')
  public isAuthenticated() {
    return { isAuthenticated: true };
  }

  @Get('rehydrate')
  public async rehydrate(@AuthenticatedUser() user: UserEntity) {
    const query = new RehydrateQuery(user);

    const token = await this._queryBus.execute<RehydrateQuery, string>(query);

    return { token };
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
  public async loginWithEmail(
    @Body() authLoginEmailDto: AuthEmailLoginPayloadDto,
  ) {
    const { email, password } = authLoginEmailDto;

    const command = new LoginWithEmailCommand(email, password);
    const token = await this._commandBus.execute<LoginWithEmailCommand, string>(
      command,
    );

    return { token };
  }

  @IsPublic()
  @Post('register')
  public async register(
    @Body()
    registerDto: {
      account: CreateAccountDto;
      user: CreateUserDto;
    },
  ) {
    const { account, user } = registerDto;

    const command = new RegisterCommand(account, user);
    const token = await this._commandBus.execute<RegisterCommand, string>(
      command,
    );

    return { token };
  }
}
