
import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/modules/auth/auth.models';

export enum UserActionTypes {
  addUserAction = '[User] add user',
  addUserSuccessAction = '[User] add user (success)',
  getUsersAction = '[User] get users',
  getUsersSuccessAction = '[User] get users (success)',
  getUserByIdAction = '[User] get user by id',
  getUserByIdSuccessAction = '[User] get user by id (success)',
  updateUserAction = '[User] update user',
  updateUserSuccessAction = '[User] update user (success)',
  deleteUserAction = '[User] delete user',
  deleteUserSuccessAction = '[User] delete user (success)',
}
export const deleteUserAction = createAction(
  UserActionTypes.deleteUserAction,
  props<{ id: string }>()
);
export const deleteUserSuccessAction = createAction(
  UserActionTypes.deleteUserSuccessAction,
  props<{ response: IUser }>()
);
export const updateUserAction = createAction(
  UserActionTypes.updateUserAction,
  props<{ payload: IUser }>()
);
export const updateUserSuccessAction = createAction(
  UserActionTypes.updateUserSuccessAction,
  props<{ response: IUser }>()
);
export const getUserByIdAction = createAction(
  UserActionTypes.getUserByIdAction,
  props<{ id: string }>()
);
export const getUserByIdSuccessAction = createAction(
  UserActionTypes.getUserByIdSuccessAction,
  props<{ response: IUser }>()
);
export const getUsersAction = createAction(
  UserActionTypes.getUsersAction
);
export const getUsersSuccessAction = createAction(
  UserActionTypes.getUsersSuccessAction,
  props<{ response: IUser[] }>()
);
export const addUserAction = createAction(
  UserActionTypes.addUserAction,
  props<{ payload: IUser }>()
);
export const addUserSuccessAction = createAction(
  UserActionTypes.addUserSuccessAction,
  props<{ response: IUser }>()
);