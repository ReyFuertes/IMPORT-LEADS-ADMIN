import { createAction, props } from '@ngrx/store';
import { ICustomer } from 'src/app/models/customer.model';

export enum SettingsActionTypes {
  cleanUpAction = '[Settings] clean up',
  cleanUpSuccessAction = '[Settings] clean up (success)',
  resetAction = '[Settings] reset',
  resetSuccessAction = '[Settings]reset (success)'
}
export const cleanUpAction = createAction(
  SettingsActionTypes.cleanUpAction,
  props<{ url?: string, payload?: any }>()
);
export const cleanUpSuccessAction = createAction(
  SettingsActionTypes.cleanUpSuccessAction,
  props<{ response: any }>()
);
export const resetAction = createAction(
  SettingsActionTypes.resetAction,
  props<{ payload?: ICustomer }>()
);
export const resetSuccessAction = createAction(
  SettingsActionTypes.resetSuccessAction,
  props<{ response: any }>()
);
