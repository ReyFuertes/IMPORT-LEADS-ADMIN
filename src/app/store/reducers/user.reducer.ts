import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on, Action } from "@ngrx/store";
import { IUser } from "src/app/modules/auth/auth.models";
import { addUserSuccessAction, deleteUserSuccessAction, getUserByIdSuccessAction, getUsersSuccessAction, updateUserSuccessAction } from "../actions/user.action";

export interface UsersState extends EntityState<IUser> {
  selectedUser: IUser
}
export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({});
export const initialState: UsersState = adapter.getInitialState({
  selectedUser: null
});
const userReducer = createReducer(
  initialState,
  on(deleteUserSuccessAction, (state, action) => {
    return adapter.removeOne(action?.response?.id, state)
  }),
  on(updateUserSuccessAction, (state, action) => {
    return adapter.updateOne({ id: action.response.id, changes: action.response }, state);
  }),
  on(addUserSuccessAction, (state, action) => {
    return adapter.addOne(action.response, state)
  }),
  on(getUserByIdSuccessAction, (state, action) => {
    return Object.assign({}, state, { selectedUser: action?.response });
  }),
  on(getUsersSuccessAction, (state, action) => {
    return ({ ...adapter.setAll(action.response, state) })
  }),
);
export function UserReducer(state: UsersState, action: Action) {
  return userReducer(state, action);
}