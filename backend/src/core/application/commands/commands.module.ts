import { Module } from '@nestjs/common';
import { ActiveAccountHandler } from './handlers/active-account.handler';
import { ChangePasswordHandler } from './handlers/change-password.handler';
import { ForgotPasswordHandler } from './handlers/forgot-password.handler';
import { LoginWithEmailHandler } from './handlers/login-with-email.handler';
import { RegisterHandler } from './handlers/register.handler';
import { UpdateUserHandler } from './handlers/update-user.handler';

const commands = [
  ActiveAccountHandler,
  ChangePasswordHandler,
  ForgotPasswordHandler,
  LoginWithEmailHandler,
  RegisterHandler,
  UpdateUserHandler,
];

@Module({
  providers: [...commands],
  exports: [...commands],
})
export class CommandsModule {}
