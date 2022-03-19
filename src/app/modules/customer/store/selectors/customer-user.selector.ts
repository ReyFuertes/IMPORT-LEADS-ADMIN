import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';
import { CustomerModuleState } from '../reducers';

export const selectedModuleState = createFeatureSelector<CustomerModuleState>('customersModule');
export const getCustomerUserByIdSelector = createSelector(
  selectedModuleState,
  state => state?.customerUser?.selectedCustomerUser
);
export const getCustomerUsersSelector = createSelector(
  selectedModuleState,
  state => Object.values(state?.customerUser?.entities)
);
