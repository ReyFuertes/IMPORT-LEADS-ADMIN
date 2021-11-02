
import { ActionReducerMap } from '@ngrx/store';
import { CustomerReducers, CustomerState } from '../modules/customer/store/customer.reducer';
import { AppReducer, appState } from './reducers/app-reducer';
import { NotificationReducer, NotificationState } from './reducers/notification.reducer';
export interface RootState {
  appState: appState,
  notification?: NotificationState,
  customer?: CustomerState
}
export const reducers: ActionReducerMap<RootState> = {
  appState: AppReducer,
  notification: NotificationReducer,
  customer: CustomerReducers
};
