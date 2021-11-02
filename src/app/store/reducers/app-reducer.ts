import { createReducer, on, Action } from "@ngrx/store";
import { IRole } from "src/app/models/generic.model";
import { IAccess, ICustomer } from "src/app/models/customer.model";
import { loadAllRolesSuccessAction, loadCustomersSuccessAction, loadCustomerAccessSuccessAction } from "../actions/app.action";
export interface appState {
  access?: IAccess[],
  roles?: IRole[],
  Customers?: ICustomer[]
}
export const initialState: appState = {
  access: null,
  roles: null,
  Customers: null
};
const appReducer = createReducer(
  initialState,
  on(loadCustomersSuccessAction, (state, action) => {
    return Object.assign({}, state, { Customers: action.response });
  }),
  on(loadAllRolesSuccessAction, (state, action) => {
    return Object.assign({}, state, { roles: action.response });
  }),
  on(loadCustomerAccessSuccessAction, (state, action) => {
    return Object.assign({}, state, { access: action.response });
  }),
);
export function AppReducer(state: appState, action: Action) {
  return appReducer(state, action);
}