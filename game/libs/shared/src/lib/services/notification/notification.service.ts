import { Injectable, signal } from '@angular/core';
import {
  Notification,
  NotificationService,
} from './notification.service.contract';

@Injectable({
  providedIn: 'root',
})
export class NotificationServiceImpl implements NotificationService {
  readonly #notifications = signal<Notification[]>([]);
  public readonly notifications = this.#notifications.asReadonly();
  readonly #duration = 5000;

  add(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    const id = this.#generateId();
    const notification: Notification = { id, message, type };

    this.#notifications.update((notifications) => [
      ...notifications,
      notification,
    ]);

    if (this.#duration) {
      setTimeout(() => this.#remove(id), this.#duration);
    }
  }

  #remove(id: string) {
    const notifications = this.#notifications();

    if (notifications.length === 0) {
      return;
    }

    this.#notifications.update((notifications) => {
      const index = notifications.findIndex(
        (notification) => notification.id === id,
      );

      if (index !== -1) {
        notifications.splice(index, 1);
      }

      return [...notifications];
    });
  }

  #generateId() {
    return Math.random().toString(36).substring(2, 15);
  }
}
