import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { RehydrateResponseDto } from '../dto/rehydrate-response.dto';
import { RehydrateQuery } from '../impl/rehydrate.query';

@QueryHandler(RehydrateQuery)
export class RehydrateHandler implements IQueryHandler<RehydrateQuery> {
  constructor(private readonly _jwtService: JwtService) {}

  async execute(query: RehydrateQuery) {
    const { user } = query;

    const token = await this._jwtService.signAsync(user);

    return RehydrateResponseDto.create(token);
  }
}
