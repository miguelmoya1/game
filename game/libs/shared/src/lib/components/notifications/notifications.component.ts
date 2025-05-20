import { Component, HostBinding, inject } from '@angular/core';
import { NotificationService } from '@game/core';

@Component({
  selector: 'game-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  readonly #notificationService = inject(NotificationService);
  protected readonly notifications = this.#notificationService.notifications;

  @HostBinding('style.display')
  public get display() {
    return this.#notificationService.notifications().length > 0
      ? 'block'
      : 'none';
  }
}
