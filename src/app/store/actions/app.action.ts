import { createAction, props } from '@ngrx/store';
import { IRole } from 'src/app/models/generic.model';
import { IAccess, IUser } from 'src/app/models/user.model';

export enum AppActionTypes {
  loadUserAccessAction = '[User] load user access',
  loadUserAccessSuccessAction = '[User] load user access (success)',
  loadAllRolesAction = '[User Mgmt] load roles',
  loadAllRolesSuccessAction = '[User Mgmt] load roles (success)',
  loadUsersAction = '[User] load user',
  loadUsersSuccessAction = '[User] load user (success)',
}
export const loadUsersAction = createAction(
  AppActionTypes.loadUsersAction,
);
export const loadUsersSuccessAction = createAction(
  AppActionTypes.loadUsersSuccessAction,
  props<{ response: IUser[] }>()
);
export const loadAllRolesAction = createAction(
  AppActionTypes.loadAllRolesAction,
);
export const loadAllRolesSuccessAction = createAction(
  AppActionTypes.loadAllRolesSuccessAction,
  props<{ response: IRole[] }>()
);
export const loadUserAccessAction = createAction(
  AppActionTypes.loadUserAccessAction
);
export const loadUserAccessSuccessAction = createAction(
  AppActionTypes.loadUserAccessSuccessAction,
  props<{ response: IAccess[] }>()
);
