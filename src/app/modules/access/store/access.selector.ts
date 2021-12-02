import { createSelector } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';

export const selectedState = (state: RootState) => state.role;
export const getAccesssSelector = createSelector(
  selectedState,
  state => Object.values(state.entities)
);