import { createAction, props } from '@ngrx/store';
import { IRole } from 'src/app/models/generic.model';
import { IAccess, ICustomer } from 'src/app/models/customer.model';

export enum AppActionTypes {
  loadCustomerAccessAction = '[Customer] load Customer access',
  loadCustomerAccessSuccessAction = '[Customer] load Customer access (success)',
  loadAllRolesAction = '[Customer Mgmt] load roles',
  loadAllRolesSuccessAction = '[Customer Mgmt] load roles (success)',
  loadCustomersAction = '[Customer] load Customer',
  loadCustomersSuccessAction = '[Customer] load Customer (success)',
}
export const loadCustomersAction = createAction(
  AppActionTypes.loadCustomersAction,
);
export const loadCustomersSuccessAction = createAction(
  AppActionTypes.loadCustomersSuccessAction,
  props<{ response: ICustomer[] }>()
);
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
