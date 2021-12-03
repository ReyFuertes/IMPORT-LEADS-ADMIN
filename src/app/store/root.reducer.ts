
import { ActionReducerMap } from '@ngrx/store';
import { AuthReducer, AuthState } from '../modules/auth/store/auth.reducer';
import { CustomerUserReducer, CustomerUserState } from '../modules/customer/store/reducers/customer-user.reducer';
import { CustomerReducer, CustomerState } from '../modules/customer/store/reducers/customer.reducer';
import { RoleReducer, RoleState } from '../modules/role/store/role.reducer';
import { SettingsReducer, SettingsState } from '../modules/settings/store/settings.reducer';
import { AppReducer, appState } from './reducers/app-reducer';
import { NotificationReducer, NotificationState } from './reducers/notification.reducer';
import { UserReducer, UsersState } from './reducers/user.reducer';
export interface RootState {
  appState: appState,
  notification?: NotificationState,
  customer?: CustomerState,
  customerUser?: CustomerUserState,
  auth: AuthState,
  role: RoleState,
  settings: SettingsState,
  user: UsersState
}
export const reducers: ActionReducerMap<RootState> = {
  appState: AppReducer,
  notification: NotificationReducer,
  customer: CustomerReducer,
  customerUser: CustomerUserReducer,
  auth: AuthReducer,
  role: RoleReducer,
  settings: SettingsReducer,
  user: UserReducer
};
