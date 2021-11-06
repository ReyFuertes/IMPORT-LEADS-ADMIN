import { createAction, props } from '@ngrx/store';
import { IAccess, ICustomer, ICustomerPayload, ICustomerUser } from 'src/app/models/customer.model';

export enum CustomerUserActionTypes {
  addCustomerUserAction = '[Customer] add customer user',
  addCustomerUserSuccessAction = '[Customer] add customer user (success)',
}
export const addCustomerUserAction = createAction(
  CustomerUserActionTypes.addCustomerUserAction,
  props<{ payload: ICustomerUser }>()
);
export const addCustomerUserSuccessAction = createAction(
  CustomerUserActionTypes.addCustomerUserSuccessAction,
  props<{ response: ICustomerUser }>()
);