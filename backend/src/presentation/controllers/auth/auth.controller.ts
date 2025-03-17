import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ActiveAccountCommand } from '../../../core/domain/handlers/commands/active-account.command.ts';
import { ChangePasswordCommand } from '../../../core/domain/handlers/commands/change-password.command.ts';
import { ForgotPasswordCommand } from '../../../core/domain/handlers/commands/forgot-password.command.ts';
import { LoginWithEmailCommand } from '../../../core/domain/handlers/commands/login-with-email.command.ts';
import { RegisterCommand } from '../../../core/domain/handlers/commands/register.command.ts';
import type { CreateAccountDto } from '../../../core/infrastructure/data/dtos/auth/create-account.dto.ts';
import type { CreateUserDto } from '../../../core/infrastructure/data/dtos/user/create-user.dto.ts';
import { authMiddleware } from '../../../core/infrastructure/guards/auth.guard.ts';
import { BaseController } from '../base.controller.ts';

export class AuthController extends BaseController {
  readonly #activeAccountCommand = new ActiveAccountCommand();
  readonly #changePasswordCommand = new ChangePasswordCommand();
  readonly #forgotPasswordCommand = new ForgotPasswordCommand();
  readonly #loginWithEmailCommand = new LoginWithEmailCommand();
  readonly #registerCommand = new RegisterCommand();

  constructor() {
    super('/auth');
  }

  protected initRoutes(fastify: FastifyInstance) {
    this.logger.debug('    GET /confirm/:accountId');
    fastify.get('/confirm/:accountId', this.confirmAccount.bind(this));

    this.logger.debug('    GET /is-authenticated');
    fastify.get('/is-authenticated', { preValidation: [authMiddleware] }, this.isAuthenticated.bind(this));

    this.logger.debug('    GET /change-password/:hashForPasswordReset');
    fastify.post('/change-password/:hashForPasswordReset', this.changePassword.bind(this));

    this.logger.debug('    POST /forgot-password');
    fastify.post('/forgot-password', this.forgotPassword.bind(this));

    this.logger.debug('    POST /login/email');
    fastify.post('/login/email', this.loginWithEmail.bind(this));

    this.logger.debug('    POST /register');
    fastify.post('/register', this.register.bind(this));
  }

  async confirmAccount(request: FastifyRequest, reply: FastifyReply) {
    const { accountId } = request.params as { accountId: string };
    const user = await this.#activeAccountCommand.execute({ accountId });
    const verify = await reply.jwtSign(user);

    reply.setCookie('auth-token', verify);

    return { ok: true };
  }

  async isAuthenticated(request: FastifyRequest, reply: FastifyReply) {
    const token = await reply.jwtSign(request.userDb!);

    reply.setCookie('auth-token', token);

    return { ok: true };
  }

  async changePassword(request: FastifyRequest) {
    const { hashForPasswordReset } = request.params as { hashForPasswordReset: string };
    const { password } = request.body as { password: string };
    const command = await this.#changePasswordCommand.execute({ hashForPasswordReset, password });

    return { ok: command };
  }

  async forgotPassword(request: FastifyRequest) {
    const { email } = request.body as { email: string };
    const command = await this.#forgotPasswordCommand.execute({ email });

    return { ok: command };
  }

  async loginWithEmail(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as { email: string; password: string };
    const command = await this.#loginWithEmailCommand.execute({ email, password });
    const token = await reply.jwtSign(command);

    reply.setCookie('auth-token', token);

    return { ok: !!command };
  }

  async register(request: FastifyRequest) {
    const { account, user } = request.body as { account: CreateAccountDto; user: CreateUserDto };
    const command = await this.#registerCommand.execute({ createAccountDto: account, createUserDto: user });

    return { ok: !!command };
  }
}
