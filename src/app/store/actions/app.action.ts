import { createAction, props } from '@ngrx/store';
import { IRole } from 'src/app/models/generic.model';
import { IAccess, ICustomer, ICustomerResponse } from 'src/app/models/customer.model';

export enum AppActionTypes {
  loadCustomerAccessAction = '[App] load Customer access',
  loadCustomerAccessSuccessAction = '[Customer] load Customer access (success)',
  loadAllRolesAction = '[App] load roles',
  loadAllRolesSuccessAction = '[App] load roles (success)'
}
export const loadAllRolesAction = createAction(
  AppActionTypes.loadAllRolesAction,
);
export const loadAllRolesSuccessAction = createAction(
  AppActionTypes.loadAllRolesSuccessAction,
  props<{ response: IRole[] }>()
);
export const loadCustomerAccessAction = createAction(
  AppActionTypes.loadCustomerAccessAction
);
export const loadCustomerAccessSuccessAction = createAction(
  AppActionTypes.loadCustomerAccessSuccessAction,
  props<{ response: IAccess[] }>()
);
