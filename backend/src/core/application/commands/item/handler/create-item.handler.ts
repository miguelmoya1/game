import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  ITEM_REPOSITORY,
  ItemRepository,
} from '../../../../infrastructure/repositories';
import { CreateItemCommand } from '../impl/create-item.command';

@CommandHandler(CreateItemCommand)
export class CreateItemHandler implements ICommandHandler<CreateItemCommand> {
  constructor(
    @Inject(ITEM_REPOSITORY) private readonly _itemRepository: ItemRepository,
  ) {}

  async execute(command: CreateItemCommand) {
    const { createItemDataDto, user } = command;

    if (!user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const item = await this._itemRepository.create(createItemDataDto);

    if (!item) {
      throw new HttpException(
        ErrorCodes.ITEM_NOT_CREATED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
