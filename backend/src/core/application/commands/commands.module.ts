import { Module } from '@nestjs/common';
import { ActiveAccountHandler } from './handlers/active-account.handler';
import { ChangePasswordHandler } from './handlers/change-password.handler';

const commands = [ActiveAccountHandler, ChangePasswordHandler];

@Module({
  providers: [...commands],
  exports: [...commands],
})
export class CommandsModule {}
