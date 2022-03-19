import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerModuleState } from '../reducers';

export const selectedModuleState = createFeatureSelector<CustomerModuleState>('customersModule');
export const isProfileLoadingSelector = createSelector(
  selectedModuleState,
  state => state?.customerProfile?.isProfileLoading
);
export const isWebsiteUrlExistSelector = createSelector(
  selectedModuleState,
  state => state?.customerProfile?.websiteUrlExist
);