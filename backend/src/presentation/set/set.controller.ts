import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateSetCommand,
  UpdateSetCommand,
} from '../../core/application/commands';
import {
  GetSetByIdQuery,
  GetSetListQuery,
  SetResponseDto,
} from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';

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

  @Get(':setId')
  async getSetById(
    @AuthenticatedUser() user: UserEntity,
    @Param('setId') setId: string,
  ) {
    const command = new GetSetByIdQuery(setId, user);
    return await this._queryBus.execute<GetSetByIdQuery, SetResponseDto>(
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

  @Put(':setId')
  async updateSet(
    @AuthenticatedUser() user: UserEntity,
    @Param('setId') setId: string,
    @Body() body: UpdateSetDto,
  ) {
    const updateSetDataDto = {
      ...body,
      effects: body.effects ?? [],
    };
    const command = new UpdateSetCommand(setId, updateSetDataDto, user);
    return await this._commandBus.execute<UpdateSetCommand, void>(command);
  }
}
