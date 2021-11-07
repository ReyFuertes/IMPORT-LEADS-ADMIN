import { createAction, props } from '@ngrx/store';

export interface INotification {
  success?: boolean;
  message: string;
  error?: boolean;
  info?: boolean;
  warning?: boolean;
}

export enum NotificationActionTypes {
  notificationSuccess = '[Notification] Success',
  removeNotificationAction = '[Notification] Remove',
}
export const notificationAction = createAction(
  NotificationActionTypes.notificationSuccess,
  props<{ notification: INotification }>()
);
export const removeNotificationAction = createAction(
  NotificationActionTypes.removeNotificationAction,
);
