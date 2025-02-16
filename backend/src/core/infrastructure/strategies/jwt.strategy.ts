import { ErrorCodes } from '@game/enums';
import { USER_USE_CASE, UserUseCase } from '@game/use-cases-contracts';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_USE_CASE) private readonly _userUseCase: UserUseCase,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || ''
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this._userUseCase.getById(payload.sub);

    if (!user) {
      throw new Error(ErrorCodes.USER_NOT_FOUND);
    }

    return user;
  }
}
