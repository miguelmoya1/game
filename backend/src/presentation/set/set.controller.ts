import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSetCommand, DeleteSetCommand, UpdateSetCommand } from '../../core/application/commands';
import { GetSetsQuery, SetResponseDto } from '../../core/application/queries';
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

  @Get()
  async getSetList(@AuthenticatedUser() user: UserEntity) {
    const command = new GetSetsQuery(user);

    return await this._queryBus.execute<GetSetsQuery, SetResponseDto[]>(command);
  }

  @Post()
  async createSet(@AuthenticatedUser() user: UserEntity, @Body() body: CreateSetDto) {
    const command = new CreateSetCommand(body, user);

    return await this._commandBus.execute<CreateSetCommand, void>(command);
  }

  @Put(':setId')
  async updateSet(@AuthenticatedUser() user: UserEntity, @Param('setId') setId: string, @Body() body: UpdateSetDto) {
    const updateSetDataDto = {
      ...body,
      effects: body.effects ?? [],
    };
    const command = new UpdateSetCommand(setId, updateSetDataDto, user);
    return await this._commandBus.execute<UpdateSetCommand, void>(command);
  }

  @Delete(':setId')
  async deleteSet(@AuthenticatedUser() user: UserEntity, @Param('setId') setId: string) {
    const command = new DeleteSetCommand(setId, user);
    await this._commandBus.execute(command);
    return { success: true };
  }
}
