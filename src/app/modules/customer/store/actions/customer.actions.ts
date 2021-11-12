import { createAction, props } from '@ngrx/store';
import { ICustomer, ICustomerPayload, ICustomerResponse, ICustomerUser } from 'src/app/models/customer.model';

export enum CustomerActionTypes {
  addCustomerAction = '[Customer] add customer',
  addCustomerSuccessAction = '[Customer] add customer (success)',
  loadCustomersAction = '[Customer] load customers',
  loadCustomersSuccessAction = '[Customer] load Customers (success)',
  getCustomerByIdAction = '[Customer] get customer by id',
  getCustomerByIdSuccessAction = '[Customer] get customer by id (success)',
  updateCustomerAction = '[Customer] update customer',
  updateCustomerSuccessAction = '[Customer] update customer (success)',
  deleteCustomerUserAction = '[Customer] delete customer user',
  deleteCustomerUserSuccessAction = '[Customer] delete customer user (success)',
  clearSelectedCustomerAction = '[Customer] clear selected customer',
  deleteCustomerAction = '[Customer] delete customer',
  deleteCustomerSuccessAction = '[Customer] delete customer (success)',
}
export const deleteCustomerAction = createAction(
  CustomerActionTypes.deleteCustomerAction,
  props<{ id: string }>()
);
export const deleteCustomerSuccessAction = createAction(
  CustomerActionTypes.deleteCustomerSuccessAction,
  props<{ response: ICustomer }>()
);
export const clearSelectedCustomerAction = createAction(
  CustomerActionTypes.clearSelectedCustomerAction
);
export const deleteCustomerUserAction = createAction(
  CustomerActionTypes.deleteCustomerUserAction,
  props<{ id: string }>()
);
export const deleteCustomerUserSuccessAction = createAction(
  CustomerActionTypes.deleteCustomerUserSuccessAction,
  props<{ response: ICustomerUser }>()
);
export const updateCustomerAction = createAction(
  CustomerActionTypes.updateCustomerAction,
  props<{ payload: ICustomerPayload }>()
);
export const updateCustomerSuccessAction = createAction(
  CustomerActionTypes.updateCustomerSuccessAction,
  props<{ response: ICustomerResponse }>()
);
export const getCustomerByIdAction = createAction(
  CustomerActionTypes.getCustomerByIdAction,
  props<{ id: string }>()
);
export const getCustomerByIdSuccessAction = createAction(
  CustomerActionTypes.getCustomerByIdSuccessAction,
  props<{ response: ICustomer }>()
);
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