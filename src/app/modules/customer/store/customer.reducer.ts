import { createReducer, on, Action } from "@ngrx/store";
import { ICustomer } from "src/app/models/customer.model";
import { addCustomerSuccessAction } from "./customer.actions";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export interface CustomerState extends EntityState<ICustomer> {
}
export const adapter: EntityAdapter<ICustomer> = createEntityAdapter<ICustomer>({});
export const initialState: CustomerState = adapter.getInitialState({

});

const customerReducer = createReducer(
  initialState,
  on(addCustomerSuccessAction, (state, action) => {
    debugger
    return adapter.addOne(action.response, state)
  }),
);
export function CustomerReducers(state: CustomerState, action: Action) {
  return customerReducer(state, action);
}