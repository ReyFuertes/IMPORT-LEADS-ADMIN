import { createSelector } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';

export const selectedState = (state: RootState) => state.user;
export const editUserByIdSelector = createSelector(
  selectedState,
  state => state?.selectedUser
);
export const getUsersSelector = createSelector(
  selectedState,
  state => Object.values(state.entities)
);