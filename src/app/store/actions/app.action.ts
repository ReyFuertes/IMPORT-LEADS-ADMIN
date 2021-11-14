import { createAction, props } from '@ngrx/store';
import { IRole } from 'src/app/models/generic.model';
import { IAccess, ICustomer, ICustomerResponse } from 'src/app/models/customer.model';

export enum AppActionTypes {
  loadAccessAction = '[App] load Customer access',
  loadAccessSuccessAction = '[Customer] load Customer access (success)',
  loadAllRolesAction = '[App] load roles',
  loadAllRolesSuccessAction = '[App] load roles (success)',
  initAppAction = '[App] init',
  initAppSuccessAction = '[App] init (success)',
}
export const loadAllRolesAction = createAction(
  AppActionTypes.loadAllRolesAction,
);
export const loadAllRolesSuccessAction = createAction(
  AppActionTypes.loadAllRolesSuccessAction,
  props<{ response: IRole[] }>()
);
export const loadAccessAction = createAction(
  AppActionTypes.loadAccessAction
);
export const loadAccessSuccessAction = createAction(
  AppActionTypes.loadAccessSuccessAction,
  props<{ response: IAccess[] }>()
);
export const initAppAction = createAction(
  AppActionTypes.initAppAction,
);
export const initAppSuccessAction = createAction(
  AppActionTypes.initAppSuccessAction,
  props<{ response: any }>()
);