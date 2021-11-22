import { createReducer, on, Action } from "@ngrx/store";
import { ICustomer, ICustomerResponse } from "src/app/models/customer.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { addCustomerSuccessAction, clearSelectedCustomerAction, deleteCustomerAction, deleteCustomerSuccessAction, deleteCustomerUserSuccessAction, getCustomerByIdSuccessAction, loadCustomersSuccessAction, updateCustomerStatusSuccessAction, updateCustomerSuccessAction } from "../actions/customer.actions";
import * as _ from 'lodash';

export interface CustomerState extends EntityState<ICustomerResponse> {
  selectedCustomer: ICustomerResponse
}
export const adapter: EntityAdapter<ICustomerResponse> = createEntityAdapter<ICustomerResponse>({});
export const initialState: CustomerState = adapter.getInitialState({
  selectedCustomer: null
});

const customerReducer = createReducer(
  initialState,
  on(updateCustomerStatusSuccessAction, (state, action) => {
    const entities: ICustomer[] = Object.assign([], Object.values(state.entities));
    let match = entities.find(customer => customer?.id === action.response.id);
    match = Object.assign({}, match, { status: action.response.status });

    return adapter.updateOne({ id: match.id, changes: match }, state);
  }),
  on(deleteCustomerSuccessAction, (state, action) => {
    return adapter.removeOne(action?.response?.id, state)
  }),
  on(clearSelectedCustomerAction, (state) => {
    return Object.assign({}, state, { selectedCustomer: null})
  }),
  on(deleteCustomerUserSuccessAction, (state, action) => {
    const entities: ICustomer[] = Object.assign([], Object.values(state.entities));
    let match = entities.find(t => t?.customer_users?.find(u => u.id === action.response.id));
    let customer_users = Object.assign([], match?.customer_users);

    _.remove(customer_users, { id: action.response.id });
    match = Object.assign({}, match, { customer_users });

    return adapter.updateOne({ id: match.id, changes: match }, state);
  }),
  on(updateCustomerSuccessAction, (state, action) => {
    return ({ ...adapter.updateOne({ id: action.response.id, changes: action.response }, state) })
  }),
  on(getCustomerByIdSuccessAction, (state, action) => {
    return Object.assign({}, state, { selectedCustomer: action?.response })
  }),
  on(loadCustomersSuccessAction, (state, action) => {
    return ({ ...adapter.setAll(action.response, state) })
  }),
  on(addCustomerSuccessAction, (state, action) => {
    return adapter.addOne(action.response, state)
  })
);
export function CustomerReducer(state: CustomerState, action: Action) {
  return customerReducer(state, action);
}