import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../../../di/repositories';
import { ServicesModule } from '../../../di/services';
import { ActiveAccountHandler } from './auth/handler/active-account.handler';
import { ChangePasswordHandler } from './auth/handler/change-password.handler';
import { ForgotPasswordHandler } from './auth/handler/forgot-password.handler';
import { LoginWithEmailHandler } from './auth/handler/login-with-email.handler';
import { RegisterHandler } from './auth/handler/register.handler';
import { ClearStaleDungeonsHandler } from './dungeon/handler/clear-stale-dungeons.handler';
import { CreateDungeonHandler } from './dungeon/handler/create-dungeon.handler';
import { GenerateDungeonsHandler } from './dungeon/handler/generate-dungeons.handler';
import { CreateItemHandler } from './item/handler/create-item.handler';
import { DeleteItemHandler } from './item/handler/delete-item.handler';
import { UpdateItemHandler } from './item/handler/update-item.handler';
import { AddMemberToPartyHandler } from './party/handler/add-member-to-party.handler';
import { DeletePartyHandler } from './party/handler/delete-party.handler';
import { RemoveMemberFromPartyHandler } from './party/handler/remove-member-from-party.handler';
import { ClaimPlaceItemHandler } from './place/handler/claim-place-item.handler';
import { DeletePlaceHandler } from './place/handler/delete-place.handler';
import { RotateMonthlyItemsHandler } from './place/handler/rotate-monthly-items.handler';
import { CreatePlayerHandler } from './player/handler/create-player.handler';
import { CreateSetHandler } from './set/handler/create-set.handler';
import { DeleteSetHandler } from './set/handler/delete-set.handler';
import { UpdateSetHandler } from './set/handler/update-set.handler';

const commands = [
  ActiveAccountHandler,
  ChangePasswordHandler,
  ForgotPasswordHandler,
  LoginWithEmailHandler,
  RegisterHandler,

  ClaimPlaceItemHandler,
  DeletePlaceHandler,

  CreateSetHandler,
  UpdateSetHandler,
  DeleteSetHandler,

  CreateItemHandler,
  UpdateItemHandler,
  DeleteItemHandler,

  AddMemberToPartyHandler,
  RemoveMemberFromPartyHandler,
  DeletePartyHandler,

  CreatePlayerHandler,
  CreateDungeonHandler,
  RotateMonthlyItemsHandler,
  GenerateDungeonsHandler,

  ClearStaleDungeonsHandler,
];

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [...commands],
  exports: [...commands],
})
export class CommandsModule {}
