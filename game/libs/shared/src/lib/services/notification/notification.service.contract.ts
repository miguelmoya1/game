import { InjectionToken, Signal } from '@angular/core';
import { NotificationServiceImpl } from './notification.service';

export type Notification = {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
};

export interface NotificationService {
  notifications: Signal<Notification[]>;
  add(message: string, type: 'success' | 'error' | 'info' | 'warning'): void;
}

export const NOTIFICATION_SERVICE = new InjectionToken<NotificationService>(
  'NotificationService',
  {
    providedIn: 'root',
    factory: () => new NotificationServiceImpl(),
  },
);
