import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import { ITEM_REPOSITORY, ItemRepository } from '../../../../infrastructure/repositories';
import { DeleteItemCommand } from '../impl/delete-item.command';

@CommandHandler(DeleteItemCommand)
export class DeleteItemHandler implements ICommandHandler<DeleteItemCommand> {
  constructor(@Inject(ITEM_REPOSITORY) private readonly _itemRepository: ItemRepository) {}

  async execute(command: DeleteItemCommand) {
    const { itemId, user } = command;
    if (!user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    // Optionally: check if item exists before delete
    await this._itemRepository.delete(itemId);
    // Optionally: throw if not found, but repo returns void
    return { success: true };
  }
}
