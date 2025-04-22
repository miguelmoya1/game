import { Component, inject } from '@angular/core';
import { NotificationService } from '@game/core/services/notification.service';
import { CardComponent } from '../card/card.component';

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
