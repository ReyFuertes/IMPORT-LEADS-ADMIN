import { createReducer, on, Action } from "@ngrx/store";
import { IRole } from "src/app/models/generic.model";
import { IAccess, ICustomer, ICustomerResponse } from "src/app/models/customer.model";
import { loadAllRolesSuccessAction, loadCustomerAccessSuccessAction } from "../actions/app.action";
import { loginSuccessAction, logoutSuccessAction } from "src/app/modules/auth/store/auth.action";
export interface appState {
  token?: string,
  access?: IAccess[],
  roles?: IRole[],
  isLoggedIn?: boolean,
  isLoggingIn?: boolean,
  isLoginFailed?: boolean,
}
export const initialState: appState = {
  token: null,
  access: null,
  roles: null,
  isLoggedIn: null,
  isLoggingIn: null,
  isLoginFailed: null,
};
const appReducer = createReducer(
  initialState,
  on(logoutSuccessAction, (state) => {
    state = undefined;
    return Object.assign({}, state)
  }),
  on(loginSuccessAction, (state, action) => {
    return Object.assign({}, state, { token: action.token, isLoggedIn: true, isLoggingIn: null, isLoginFailed: null })
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