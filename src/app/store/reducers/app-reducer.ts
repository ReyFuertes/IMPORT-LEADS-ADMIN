import { createReducer, on, Action } from "@ngrx/store";
import { IRole } from "src/app/models/generic.model";
import { IAccess, ICustomer, ICustomerResponse } from "src/app/models/customer.model";
import { loadAllRolesSuccessAction, loadAccessSuccessAction, initAppSuccessAction } from "../actions/app.action";
import { loginSuccessAction, logoutSuccessAction } from "src/app/modules/auth/store/auth.action";
export interface appState {
  authVar?: string,
  access?: IAccess[],
  roles?: IRole[],
  isLoggedIn?: boolean,
  isLoggingIn?: boolean,
  isLoginFailed?: boolean,
}
export const initialState: appState = {
  authVar: null,
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
    return Object.assign({}, state, { authVar: action.response, isLoggedIn: true, isLoggingIn: null, isLoginFailed: null })
  }),
  on(loadAllRolesSuccessAction, (state, action) => {
    return Object.assign({}, state, { roles: action.response });
  }),
  on(loadAccessSuccessAction, (state, action) => {
    return Object.assign({}, state, { access: action.response });
  }),
  on(initAppSuccessAction, (state, action) => {
    let isLoggedIn: boolean = false;
    let token = action.response || null;
    if (token) {
      isLoggedIn = true;
    }
    else {
      isLoggedIn = false;
    }
    return Object.assign({}, state, { token, isLoggedIn })
  }),
);
export function AppReducer(state: appState, action: Action) {
  return appReducer(state, action);
}