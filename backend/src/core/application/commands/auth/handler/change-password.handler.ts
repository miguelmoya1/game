import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  ACCOUNT_REPOSITORY,
  AccountRepository,
} from '../../../../infrastructure/repositories';
import {
  ENCRYPTION_SERVICE,
  EncryptionService,
} from '../../../services/encryption/encryption.service.contract';
import { ChangePasswordCommand } from '../impl/change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepository: AccountRepository,
    @Inject(ENCRYPTION_SERVICE)
    private readonly _encryptionService: EncryptionService,
  ) {}

  async execute(command: ChangePasswordCommand) {
    const { hashForPasswordReset, password } = command;

    const account =
      await this._accountRepository.findByHash(hashForPasswordReset);

    if (!account) {
      throw new HttpException(
        ErrorCodes.ACCOUNT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if ((account.hashExpiredAt || 0) < new Date()) {
      throw new HttpException(ErrorCodes.HASH_EXPIRED, HttpStatus.BAD_REQUEST);
    }

    const encryptedPassword = await this._encryptionService.encrypt(password);
    const { id } = account;
    const accountDb = await this._accountRepository.changePassword(
      id,
      encryptedPassword,
    );

    if (!accountDb) {
      throw new HttpException(
        ErrorCodes.ACCOUNT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
