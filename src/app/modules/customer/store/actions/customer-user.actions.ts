import { createAction, props } from '@ngrx/store';
import { ICustomerUser, ICustomerUserResponse } from 'src/app/models/customer.model';

export enum CustomerUserActionTypes {
  addCustomerUserAction = '[Customer] add customer user',
  addCustomerUserSuccessAction = '[Customer] add customer user (success)',
  getCustomerUserByIdAction = '[Customer] get customer user by id',
  getCustomerUserByIdSuccessAction = '[Customer] get customer user by id (success)',
  clearSelectedCustomerAction = '[Customer] clear selected customer',
  updateCustomerUserAction = '[Customer] update customer user',
  updateCustomerUserSuccessAction = '[Customer] update customer user (success)',
}
export const updateCustomerUserAction = createAction(
  CustomerUserActionTypes.updateCustomerUserAction,
  props<{ payload: ICustomerUser }>()
);
export const updateCustomerUserSuccessAction = createAction(
  CustomerUserActionTypes.updateCustomerUserSuccessAction,
  props<{ response: ICustomerUser }>()
);
export const clearSelectedCustomerAction = createAction(
  CustomerUserActionTypes.clearSelectedCustomerAction
);
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