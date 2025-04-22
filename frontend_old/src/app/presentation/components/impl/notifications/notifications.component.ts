import { Component, inject } from '@angular/core';
import { CardComponent } from '@game/components';
import { NotificationService } from '@game/services';

@Component({
  selector: 'game-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  imports: [CardComponent],
})
export class NotificationsComponent {
  readonly #notificationService = inject(NotificationService);
  protected readonly notifications = this.#notificationService.notifications;
}
