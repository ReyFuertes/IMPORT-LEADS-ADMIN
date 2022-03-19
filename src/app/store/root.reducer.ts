
import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer, AuthState } from '../modules/auth/store/auth.reducer';
import { CustomerUserReducer, CustomerUserState } from '../modules/customer/store/reducers/customer-user.reducer';
import { CustomerReducer, CustomerState } from '../modules/customer/store/reducers/customer.reducer';
import { SettingsReducer, SettingsState } from '../modules/settings/store/settings.reducer';
import { AppReducer, appState } from './reducers/app-reducer';
import { NotificationReducer, NotificationState } from './reducers/notification.reducer';
import { SubscriptionReducer, SubscriptionsState } from './reducers/subscription.reducer';
import { UserReducer, UsersState } from './reducers/user.reducer';

export interface RootState {
  appState: appState,
  notification?: NotificationState,
  customerUser?: CustomerUserState,
  auth: AuthState,
  settings: SettingsState,
  user: UsersState,
  subscription: SubscriptionsState
}
export const reducers: ActionReducerMap<RootState> = {
  appState: AppReducer,
  notification: NotificationReducer,
  customerUser: CustomerUserReducer,
  auth: AuthReducer,
  settings: SettingsReducer,
  user: UserReducer,
  subscription: SubscriptionReducer
};
