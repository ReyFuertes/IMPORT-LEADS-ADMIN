import { createReducer, on, Action } from "@ngrx/store";
import { ICustomer, ICustomerUser } from "src/app/models/customer.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { addCustomerUserSuccessAction } from "../actions/customer-user.actions";

export interface CustomerUserState extends EntityState<ICustomerUser> {
}
export const adapter: EntityAdapter<ICustomerUser> = createEntityAdapter<ICustomerUser>({});
export const initialState: CustomerUserState = adapter.getInitialState({
});

const customerUserReducer = createReducer(
  initialState,
  on(addCustomerUserSuccessAction, (state, action) => {
    return adapter.addOne(action.response, state)
  })
);
export function CustomerUserReducer(state: CustomerUserState, action: Action) {
  return customerUserReducer(state, action);
}