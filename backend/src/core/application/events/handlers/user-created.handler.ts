import { Logger } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../impl/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler {
  readonly #logger = new Logger(UserCreatedHandler.name);

  handle(event: UserCreatedEvent) {
    this.#logger.debug(`User created with ID: ${event.userId}`);
  }
}
