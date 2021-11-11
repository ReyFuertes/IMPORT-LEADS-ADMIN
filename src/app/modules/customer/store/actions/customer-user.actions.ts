import { createAction, props } from '@ngrx/store';
import { ICustomerUser, ICustomerUserResponse } from 'src/app/models/customer.model';

export enum CustomerUserActionTypes {
  addCustomerUserAction = '[Customer] add customer user',
  addCustomerUserSuccessAction = '[Customer] add customer user (success)',
  getCustomerUserByIdAction = '[Customer] get customer user by id',
  getCustomerUserByIdSuccessAction = '[Customer] get customer user by id (success)'
}
export const getCustomerUserByIdAction = createAction(
  CustomerUserActionTypes.getCustomerUserByIdAction,
  props<{ id: string }>()
);
export const getCustomerUserByIdSuccessAction = createAction(
  CustomerUserActionTypes.getCustomerUserByIdSuccessAction,
  props<{ response: ICustomerUserResponse }>()
);
export const addCustomerUserAction = createAction(
  CustomerUserActionTypes.addCustomerUserAction,
  props<{ payload: ICustomerUser }>()
);
export const addCustomerUserSuccessAction = createAction(
  CustomerUserActionTypes.addCustomerUserSuccessAction,
  props<{ response: ICustomerUser }>()
);