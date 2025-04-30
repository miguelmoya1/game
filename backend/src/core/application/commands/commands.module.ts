import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../../../di/repositories';
import { ServicesModule } from '../../../di/services';
import { ActiveAccountHandler } from './auth/handler/active-account.handler';
import { ChangePasswordHandler } from './auth/handler/change-password.handler';
import { ForgotPasswordHandler } from './auth/handler/forgot-password.handler';
import { LoginWithEmailHandler } from './auth/handler/login-with-email.handler';
import { RegisterHandler } from './auth/handler/register.handler';
import { UpdateUserHandler } from './user/handler/update-user.handler';

const commands = [
  ActiveAccountHandler,
  ChangePasswordHandler,
  ForgotPasswordHandler,
  LoginWithEmailHandler,
  RegisterHandler,

  UpdateUserHandler,
];

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [...commands],
  exports: [...commands],
})
export class CommandsModule {}
