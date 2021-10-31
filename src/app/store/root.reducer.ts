
import { ActionReducerMap } from '@ngrx/store';
import { AppReducer, appState } from './reducers/app-reducer';
import { NotificationReducer, NotificationState } from './reducers/notification.reducer';
export interface RootState {
  appState: appState,
  notification?: NotificationState,
}
export const reducers: ActionReducerMap<RootState> = {
  appState: AppReducer,
  notification: NotificationReducer,
};
