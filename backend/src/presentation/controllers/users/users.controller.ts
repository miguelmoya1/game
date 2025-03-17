import type { FastifyInstance, FastifyRequest } from 'fastify';
import { UpdateUserCommand } from '../../../core/domain/handlers/commands/update-user.command.ts';
import { GetUserByIdQuery } from '../../../core/domain/handlers/queries/get-user-by-id.query.ts';
import type { UpdateUserDto } from '../../../core/infrastructure/data/dtos/user/update-user.dto.ts';
import { authMiddleware } from '../../../core/infrastructure/guards/auth.guard.ts';
import { BaseController } from '../base.controller.ts';

export class UserController extends BaseController {
  readonly #getUserByIdQuery = new GetUserByIdQuery();
  readonly #updateUserCommand = new UpdateUserCommand();

  constructor() {
    super('/users');
  }

  protected initRoutes(fastify: FastifyInstance) {
    this.logger.debug('    GET /me');
    fastify.get('/me', { preValidation: [authMiddleware] }, this.getMe.bind(this));

    this.logger.debug('    GET /:userId');
    fastify.get('/:userId', { preValidation: [authMiddleware] }, this.getUserById.bind(this));

    this.logger.debug('    PATCH /:userId');
    fastify.patch('/:userId', { preValidation: [authMiddleware] }, this.updateUser.bind(this));
  }

  async getMe(request: FastifyRequest) {
    const { id } = request.userDb!;

    return await this.#getUserByIdQuery.execute({ userId: id });
  }

  async getUserById(request: FastifyRequest) {
    const { userId } = request.params as { userId: string };

    return await this.#getUserByIdQuery.execute({ userId });
  }

  async updateUser(request: FastifyRequest) {
    const user = request.userDb!;

    const { userId } = request.params as { userId: string };
    const { userUpdateDto } = request.body as { userUpdateDto: UpdateUserDto };

    return await this.#updateUserCommand.execute({ userUpdateDto, userId, user });
  }
}
