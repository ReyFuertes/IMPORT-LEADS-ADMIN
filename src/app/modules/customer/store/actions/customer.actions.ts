import { createAction, props } from '@ngrx/store';
import { ICustomer, ICustomerPayload, ICustomerResponse } from 'src/app/models/customer.model';

export enum CustomerActionTypes {
  addCustomerAction = '[Customer] add customer',
  addCustomerSuccessAction = '[Customer] add customer (success)',
  loadCustomersAction = '[Customer] load customers',
  loadCustomersSuccessAction = '[Customer] load Customers (success)',
}
export const loadCustomersAction = createAction(
  CustomerActionTypes.loadCustomersAction,
);
export const loadCustomersSuccessAction = createAction(
  CustomerActionTypes.loadCustomersSuccessAction,
  props<{ response: ICustomerResponse[] }>()
);
export const addCustomerAction = createAction(
  CustomerActionTypes.addCustomerAction,
  props<{ payload: ICustomerPayload }>()
);
export const addCustomerSuccessAction = createAction(
  CustomerActionTypes.addCustomerSuccessAction,
  props<{ response: ICustomer }>()
);