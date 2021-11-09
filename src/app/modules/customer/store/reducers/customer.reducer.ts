import { createReducer, on, Action } from "@ngrx/store";
import { ICustomer, ICustomerResponse, ICustomerUser } from "src/app/models/customer.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { addCustomerSuccessAction, getCustomerByIdSuccessAction, loadCustomersSuccessAction, updateCustomerSuccessAction } from "../actions/customer.actions";

export interface CustomerState extends EntityState<ICustomerResponse> {
  selectedCustomer: ICustomerResponse
}
export const adapter: EntityAdapter<ICustomerResponse> = createEntityAdapter<ICustomerResponse>({});
export const initialState: CustomerState = adapter.getInitialState({
  selectedCustomer: null
});

const customerReducer = createReducer(
  initialState,
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