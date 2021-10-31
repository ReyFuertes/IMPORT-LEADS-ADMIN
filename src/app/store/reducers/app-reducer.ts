import { createReducer, on, Action } from "@ngrx/store";
import { IRole } from "src/app/models/generic.model";
import { IAccess, IUser } from "src/app/models/user.model";
import { loadAllRolesSuccessAction, loadUsersSuccessAction, loadUserAccessSuccessAction } from "../actions/app.action";
export interface appState {
  access?: IAccess[],
  roles?: IRole[],
  users?: IUser[]
}
export const initialState: appState = {
  access: null,
  roles: null,
  users: null
};
const appReducer = createReducer(
  initialState,
  on(loadUsersSuccessAction, (state, action) => {
    return Object.assign({}, state, { users: action.response });
  }),
  on(loadAllRolesSuccessAction, (state, action) => {
    return Object.assign({}, state, { roles: action.response });
  }),
  on(loadUserAccessSuccessAction, (state, action) => {
    return Object.assign({}, state, { access: action.response });
  }),
);
export function AppReducer(state: appState, action: Action) {
  return appReducer(state, action);
}