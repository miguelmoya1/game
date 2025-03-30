import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FastifyReply } from 'fastify';
import {
  ActiveAccountCommand,
  ChangePasswordCommand,
  LoginWithEmailCommand,
  RegisterCommand,
} from '../../core/application/commands';
import { RehydrateQuery } from '../../core/application/queries';
import { User } from '../../core/domain/entities/impl/user.entity';
import {
  AuthenticatedUser,
  Public,
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

  @Public()
  @Get('confirm/:accountId')
  public async confirmLogin(
    @Param('accountId') accountId: string,
    @Res() res: FastifyReply,
  ) {
    const command = new ActiveAccountCommand(accountId);

    const token = await this._commandBus.execute<ActiveAccountCommand, string>(
      command,
    );

    this.#sendToken(res, token);
  }

  @Get('is-authenticated')
  public isAuthenticated() {
    return { isAuthenticated: true };
  }

  @Get('rehydrate')
  public async rehydrate(@AuthenticatedUser() user: User) {
    const token = new RehydrateQuery(user);

    return await this._queryBus.execute<RehydrateQuery, string>(token);
  }

  @Public()
  @Post('change-password/:hashForPasswordReset')
  public async changePassword(
    @Param('hashForPasswordReset') hashForPasswordReset: string,
    @Body() passwordDto: ChangePasswordDto,
  ) {
    const { password } = passwordDto;

    const command = new ChangePasswordCommand(hashForPasswordReset, password);

    return await this._commandBus.execute<ChangePasswordCommand, string>(
      command,
    );
  }

  @Public()
  @Post('login/email')
  public async loginWithEmail(
    @Body() authLoginEmailDto: AuthEmailLoginPayloadDto,
    @Res() res: FastifyReply,
  ) {
    const { email, password } = authLoginEmailDto;

    const command = new LoginWithEmailCommand(email, password);
    const token = await this._commandBus.execute<LoginWithEmailCommand, string>(
      command,
    );

    this.#sendToken(res, token);
  }

  @Public()
  @Post('register')
  public async register(
    @Body()
    registerDto: {
      account: CreateAccountDto;
      user: CreateUserDto;
    },
    @Res() res: FastifyReply,
  ) {
    const { account, user } = registerDto;

    const command = new RegisterCommand(account, user);
    const token = await this._commandBus.execute<RegisterCommand, string>(
      command,
    );

    this.#sendToken(res, token, 201);
  }

  #sendToken(res: FastifyReply, token: string, status = 200) {
    res.header('authorization', `Bearer ${token}`).status(status).send();
  }
}
