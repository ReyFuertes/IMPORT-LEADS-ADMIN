import { createSelector } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';

export const selectedState = (state: RootState) => state.customer;
export const geCustomerUsersSelector = createSelector(
  selectedState,
  state => Object.values(state.entities)
);
