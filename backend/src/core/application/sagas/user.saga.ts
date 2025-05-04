import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { CreatePlayerCommand } from '../commands/player/impl/create-player.command';
import { UserCreatedEvent } from '../events/impl/user-created.event';

@Injectable()
export class UserSaga {
  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map((event) => {
        return new CreatePlayerCommand({ userId: event.userId });
      }),
    );
  };
}
