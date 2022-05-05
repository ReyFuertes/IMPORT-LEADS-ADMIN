import { createAction, props } from '@ngrx/store';
import { ICustomerApprovePayload, IAccess, ICustomer, ICustomerPayload, ICustomerResponse, ICustomerUser } from 'src/app/models/customer.model';
import { IRole } from 'src/app/models/generic.model';
import { IUser } from 'src/app/modules/auth/auth.models';

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
  approveCustomerAction = '[Customer] approve customer',
  approveCustomerSuccessAction = '[Customer] approve customer (success)',
  updateCustomerStatusAction = '[Customer] update customer status only',
  updateCustomerStatusSuccessAction = '[Customer] add customer status only (success)',
  migrateAccessAction = '[Customer] migrate access',
  migrateAccessSuccessAction = '[Customer] migrate access (success)',
  migrateRoleAction = '[Customer] migrate role',
  migrateRoleSuccessAction = '[Customer] migrate role (success)',
  inviteAction = '[Customer] invite',
  inviteSuccessAction = '[Customer] invite (success)',
  updateCustomerDetailsAction = '[Customer] update customer details',
  updateCustomerDetailsSuccessAction = '[Customer] update customer details (success)',
  createCustomerUsersAction = '[Customer] update customer users details',
  createCustomerUsersSuccessAction = '[Customer] update customer users details (success)'
}
export const updateCustomerStatusAction = createAction(
  CustomerActionTypes.updateCustomerStatusAction,
  props<{ payload: ICustomerApprovePayload }>()
);
export const updateCustomerStatusSuccessAction = createAction(
  CustomerActionTypes.updateCustomerStatusSuccessAction,
  props<{ response: ICustomer }>()
);
export const createCustomerUsersAction = createAction(
  CustomerActionTypes.createCustomerUsersAction,
  props<{ payload: ICustomerUser[], api_url: string }>()
);
export const createCustomerUsersSuccessAction = createAction(
  CustomerActionTypes.createCustomerUsersSuccessAction,
  props<{ response: ICustomerUser[] }>()
);
export const updateCustomerDetailsAction = createAction(
  CustomerActionTypes.updateCustomerDetailsAction,
  props<{ payload: ICustomer }>()
);
export const updateCustomerDetailsSuccessAction = createAction(
  CustomerActionTypes.updateCustomerDetailsSuccessAction,
  props<{ response: ICustomer }>()
);
export const inviteAction = createAction(
  CustomerActionTypes.inviteAction,
  props<{ payload: ICustomer[] }>()
);
export const inviteSuccessAction = createAction(
  CustomerActionTypes.inviteSuccessAction,
  props<{ response: ICustomer[] }>()
);
export const migrateRoleAction = createAction(
  CustomerActionTypes.migrateRoleAction,
  props<{ payload: IRole[] }>()
);
export const migrateRoleSuccessAction = createAction(
  CustomerActionTypes.migrateRoleSuccessAction,
  props<{ response: IRole[] }>()
);
export const migrateAccessAction = createAction(
  CustomerActionTypes.migrateAccessAction,
  props<{ payload: IAccess[] }>()
);
export const migrateAccessSuccessAction = createAction(
  CustomerActionTypes.migrateAccessSuccessAction,
  props<{ response: IAccess[] }>()
);
// export const approveCustomerAction = createAction(
//   CustomerActionTypes.approveCustomerAction,
//   props<{ payload: ICustomerApprovePayload, customer?: ICustomerPayload, access?: IAccess[], role?: IRole[], customer_users?: IUser[] }>()
// );
export const approveCustomerAction = createAction(
  CustomerActionTypes.approveCustomerAction,
  props<{ payload: ICustomerApprovePayload }>()
);
export const approveCustomerSuccessAction = createAction(
  CustomerActionTypes.approveCustomerSuccessAction,
  props<{ response: ICustomer, customer?: ICustomerPayload }>()
);
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
  props<{ params?: string }>()
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