import { createReducer, on, Action } from "@ngrx/store";
import { ICustomer, ICustomerResponse, ICustomerUser } from "src/app/models/customer.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { addCustomerSuccessAction, loadCustomersSuccessAction } from "../actions/customer.actions";

export interface CustomerState extends EntityState<ICustomerResponse> {
}
export const adapter: EntityAdapter<ICustomerResponse> = createEntityAdapter<ICustomerResponse>({});
export const initialState: CustomerState = adapter.getInitialState({
});

const customerReducer = createReducer(
  initialState,
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