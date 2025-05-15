import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../../../di/repositories';
import { ServicesModule } from '../../../di/services';
import { ActiveAccountHandler } from './auth/handler/active-account.handler';
import { ChangePasswordHandler } from './auth/handler/change-password.handler';
import { ForgotPasswordHandler } from './auth/handler/forgot-password.handler';
import { LoginWithEmailHandler } from './auth/handler/login-with-email.handler';
import { RegisterHandler } from './auth/handler/register.handler';
import { CreateItemHandler } from './item/handler/create-item.handler';
import { DeleteItemHandler } from './item/handler/delete-item.handler';
import { UpdateItemHandler } from './item/handler/update-item.handler';
import { ClaimPlaceItemHandler } from './place/handler/claim-place-item.handler';
import { DeletePlaceHandler } from './place/handler/delete-place.handler';
import { CreateSetHandler } from './set/handler/create-set.handler';
import { DeleteSetHandler } from './set/handler/delete-set.handler';
import { UpdateSetHandler } from './set/handler/update-set.handler';
import { UpdateUserHandler } from './user/handler/update-user.handler';

const commands = [
  ActiveAccountHandler,
  ChangePasswordHandler,
  ForgotPasswordHandler,
  LoginWithEmailHandler,
  RegisterHandler,

  UpdateUserHandler,

  ClaimPlaceItemHandler,
  DeletePlaceHandler,

  CreateSetHandler,
  UpdateSetHandler,
  DeleteSetHandler,

  CreateItemHandler,
  UpdateItemHandler,
  DeleteItemHandler,
];

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [...commands],
  exports: [...commands],
})
export class CommandsModule {}
