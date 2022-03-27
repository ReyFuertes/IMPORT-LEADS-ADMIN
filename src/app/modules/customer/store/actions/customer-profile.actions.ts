import { createAction, props } from '@ngrx/store';

export enum CustomerProfileActionTypes {
  isWebsiteUrlExistAction = '[Customer Profile] check website url exist',
  isWebsiteUrlExistSuccessAction = '[Customer Profile] check website url exist (success)',
  setProfileLoadingAction = '[Customer Profile] set loading',
  removeProfileLoadingAction = '[Customer Profile] remove loading',
  isApiUrlExistAction = '[Customer Profile] check api url exist',
  isApiUrlExistSuccessAction = '[Customer Profile] check api url exist (success)',
}
export const isApiUrlExistAction = createAction(
  CustomerProfileActionTypes.isApiUrlExistAction,
  props<{ payload: any }>()
);
export const isApiUrlExistSuccessAction = createAction(
  CustomerProfileActionTypes.isApiUrlExistSuccessAction,
  props<{ response: boolean }>()
);
export const setProfileLoadingAction = createAction(
  CustomerProfileActionTypes.setProfileLoadingAction
);
export const removeProfileLoadingAction = createAction(
  CustomerProfileActionTypes.removeProfileLoadingAction,
);
export const isWebsiteUrlExistAction = createAction(
  CustomerProfileActionTypes.isWebsiteUrlExistAction,
  props<{ payload: any }>()
);
export const isWebsiteUrlExistSuccessAction = createAction(
  CustomerProfileActionTypes.isWebsiteUrlExistSuccessAction,
  props<{ response: boolean }>()
);