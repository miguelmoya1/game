import { Module } from '@nestjs/common';
import { ActiveAccountHandler } from './impl/active-account.handler';
import { ChangePasswordHandler } from './impl/change-password.handler';
import { ForgotPasswordHandler } from './impl/forgot-password.handler';
import { LoginWithEmailHandler } from './impl/login-with-email.handler';
import { RegisterHandler } from './impl/register.handler';
import { UpdateUserHandler } from './impl/update-user.handler';

@Module({
  providers: [
    // Auth
    ActiveAccountHandler,
    ChangePasswordHandler,
    ForgotPasswordHandler,
    LoginWithEmailHandler,
    RegisterHandler,

    // User
    UpdateUserHandler,
  ],
})
export class CommandsModule {}
