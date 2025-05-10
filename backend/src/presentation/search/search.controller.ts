import { Controller, Get, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SearchQuery } from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';

@Controller('search')
export class SearchController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Get()
  async getSearchList(
    @AuthenticatedUser() user: UserEntity,
    @Query('criteria') criteria: string,
  ) {
    const command = new SearchQuery(criteria, user);

    return await this._queryBus.execute<SearchQuery, unknown>(command);
  }
}
