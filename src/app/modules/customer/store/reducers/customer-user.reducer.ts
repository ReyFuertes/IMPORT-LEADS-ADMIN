import { createReducer, on, Action } from "@ngrx/store";
import { ICustomerUser, ICustomerUserResponse } from "src/app/models/customer.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { addCustomerUserSuccessAction, clearSelectedCustomerAction, getCustomerUserByIdSuccessAction, updateCustomerUserSuccessAction } from "../actions/customer-user.actions";
export interface CustomerUserState extends EntityState<ICustomerUser> {
  selectedCustomerUser: ICustomerUserResponse
}
export const adapter: EntityAdapter<ICustomerUser> = createEntityAdapter<ICustomerUser>({});
export const initialState: CustomerUserState = adapter.getInitialState({
  selectedCustomerUser: null
});

const customerUserReducer = createReducer(
  initialState,
  on(updateCustomerUserSuccessAction, (state, action) => {
    return ({ ...adapter.updateOne({ id: action.response.id, changes: action.response }, state) })
  }),
  on(clearSelectedCustomerAction, (state) => {
    return Object.assign({}, state, { selectedCustomerUser: null })
  }),
  on(getCustomerUserByIdSuccessAction, (state, action) => {
    return Object.assign({}, state, { selectedCustomerUser: action?.response })
  }),
  on(addCustomerUserSuccessAction, (state, action) => {
    return adapter.addOne(action.response, state)
  })
);
export function CustomerUserReducer(state: CustomerUserState, action: Action) {
  return customerUserReducer(state, action);
}