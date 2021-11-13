import { createAction, props } from '@ngrx/store';
import { ILoginCredential } from '../auth.models';

export enum LoginActionTypes {
  loginAction = '[Auth] login',
  loginSuccessAction = '[Auth] login (success)',
  logoutAction = '[Auth] logout',
  logoutSuccessAction = '[Auth] logout (success)',
  loginFailedAction = '[Auth] login (failed)',
  isLoggingInAction = '[Auth] login (in progress)',
}
export const isLoggingInAction = createAction(
  LoginActionTypes.isLoggingInAction
);
export const loginFailedAction = createAction(
  LoginActionTypes.loginFailedAction,
  props<{ error: any }>()
);
export const logoutAction = createAction(
  LoginActionTypes.logoutAction,
);
export const logoutSuccessAction = createAction(
  LoginActionTypes.logoutSuccessAction,
);
export const loginAction = createAction(
  LoginActionTypes.loginAction,
  props<{ payload: ILoginCredential }>()
);
export const loginSuccessAction = createAction(
  LoginActionTypes.loginSuccessAction,
  props<{ token: any }>()
);
