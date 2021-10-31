import { createSelector } from '@ngrx/store';
import * as fromNotification from '../reducers/notification.reducer';
import { RootState } from '../root.reducer';

export const selectedState = (state: RootState) => state.notification;
export const getSuccessSelector = createSelector(
  selectedState,
  fromNotification?.getNotification
);
