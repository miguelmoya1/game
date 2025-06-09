import { Component, HostBinding, inject } from '@angular/core';
import { NOTIFICATION_SERVICE } from '@game/shared';

@Component({
  selector: 'game-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  readonly #notificationService = inject(NOTIFICATION_SERVICE);
  protected readonly notifications = this.#notificationService.notifications;

  @HostBinding('style.display')
  public get display() {
    return this.#notificationService.notifications().length > 0
      ? 'block'
      : 'none';
  }
}
