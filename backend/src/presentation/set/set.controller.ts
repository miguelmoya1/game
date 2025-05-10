import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSetCommand } from '../../core/application/commands';
import {
  GetSetListQuery,
  SetResponseDto,
} from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';
import { CreateSetDto } from './dto/create-set.dto';

@Controller('sets')
export class SetController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Get('list')
  async getSetList(@AuthenticatedUser() user: UserEntity) {
    const command = new GetSetListQuery(user);

    return await this._queryBus.execute<GetSetListQuery, SetResponseDto[]>(
      command,
    );
  }

  @Post()
  async createSet(
    @AuthenticatedUser() user: UserEntity,
    @Body() body: CreateSetDto,
  ) {
    const command = new CreateSetCommand(body, user);

    return await this._commandBus.execute<CreateSetCommand, void>(command);
  }
}
