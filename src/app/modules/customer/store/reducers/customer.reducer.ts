import { createReducer, on, Action } from "@ngrx/store";
import { ICustomer, ICustomerUser } from "src/app/models/customer.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { addCustomerSuccessAction } from "../actions/customer.actions";

export interface CustomerState extends EntityState<ICustomer> {
}
export const adapter: EntityAdapter<ICustomer> = createEntityAdapter<ICustomer>({});
export const initialState: CustomerState = adapter.getInitialState({
});

const customerReducer = createReducer(
  initialState,
  on(addCustomerSuccessAction, (state, action) => {
    return adapter.addOne(action.response, state)
  })
);
export function CustomerReducer(state: CustomerState, action: Action) {
  return customerReducer(state, action);
}