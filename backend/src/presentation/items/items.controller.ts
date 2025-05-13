import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateItemCommand,
  UpdateItemCommand,
} from '../../core/application/commands';
import { GetItemByIdQuery } from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) {}

  @Get(':itemId')
  getUser(
    @Param('itemId') itemId: string,
    @AuthenticatedUser() user: UserEntity,
  ) {
    return this._queryBus.execute(new GetItemByIdQuery(itemId, user));
  }

  @Post()
  createItem(
    @AuthenticatedUser() user: UserEntity,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this._commandBus.execute(new CreateItemCommand(createItemDto, user));
  }

  @Put(':itemId')
  async updateItem(
    @AuthenticatedUser() user: UserEntity,
    @Param('itemId') itemId: string,
    @Body() body: UpdateItemDto,
  ) {
    const updateItemDataDto = {
      ...body,
      effects: body.effects ?? [],
    };
    const command = new UpdateItemCommand(itemId, updateItemDataDto, user);
    return await this._commandBus.execute<UpdateItemCommand, void>(command);
  }
}
