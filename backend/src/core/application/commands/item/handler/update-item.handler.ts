import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  ITEM_REPOSITORY,
  ItemRepository,
} from '../../../../infrastructure/repositories';
import { UpdateItemCommand } from '../impl/update-item.command';

@CommandHandler(UpdateItemCommand)
export class UpdateItemHandler implements ICommandHandler<UpdateItemCommand> {
  constructor(
    @Inject(ITEM_REPOSITORY) private readonly _itemRepository: ItemRepository,
  ) {}

  async execute(command: UpdateItemCommand) {
    const { itemId, updateItemDataDto, user } = command;

    if (!user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const item = await this._itemRepository.update(itemId, updateItemDataDto);

    if (!item) {
      throw new HttpException(ErrorCodes.ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
