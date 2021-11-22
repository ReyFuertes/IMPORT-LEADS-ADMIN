import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';
import { CustomerModuleState } from '../reducers';

export const selectCustomerModuleState = createFeatureSelector<CustomerModuleState>('customerModule');
export const isTenantAddedSelector = createSelector(
  selectCustomerModuleState,
  state => state?.customerTenant?.isTenantAdded
);