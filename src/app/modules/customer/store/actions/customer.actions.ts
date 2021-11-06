import { createAction, props } from '@ngrx/store';
import { IAccess, ICustomer, ICustomerPayload, ICustomerUser } from 'src/app/models/customer.model';

export enum CustomerActionTypes {
  addCustomerAction = '[Customer] add customer',
  addCustomerSuccessAction = '[Customer] add customer (success)'
}
export const addCustomerAction = createAction(
  CustomerActionTypes.addCustomerAction,
  props<{ payload: ICustomerPayload }>()
);
export const addCustomerSuccessAction = createAction(
  CustomerActionTypes.addCustomerSuccessAction,
  props<{ response: ICustomer }>()
);