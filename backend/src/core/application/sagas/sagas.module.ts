import { Module } from '@nestjs/common';
import { UserSaga } from './user/user.saga';

@Module({
  providers: [UserSaga],
})
export class SagasModule {}
