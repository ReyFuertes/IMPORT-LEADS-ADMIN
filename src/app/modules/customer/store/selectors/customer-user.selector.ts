import { createSelector } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';

export const selectedState = (state: RootState) => state.customerUser;
export const getCustomerUserByIdSelector = createSelector(
  selectedState,
  state => state?.selectedCustomerUser
);
export const getCustomerUsersSelector = createSelector(
  selectedState,
  state => Object.values(state.entities)
);
