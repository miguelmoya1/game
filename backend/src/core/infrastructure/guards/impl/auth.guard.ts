import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { UserEntity } from '../../../domain/entities';
import { IS_PUBLIC_KEY } from '../../decorators/impl/is-public';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const header = request.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const payload = this._jwtService.verify<UserEntity>(token);
      request.user = UserEntity.create(payload);
    } catch {
      return false;
    }

    return true;
  }
}
