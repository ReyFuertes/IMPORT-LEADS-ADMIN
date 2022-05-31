import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerModuleState } from '../reducers';

export const selectedModuleState = createFeatureSelector<CustomerModuleState>('customersModule');
export const getIsUserMigratedSelector = createSelector(
  selectedModuleState,
  state => state?.customer?.isUserMigrated
);
export const getCustomerByIdSelector = (id: string) => createSelector(
  selectedModuleState,
  state => state?.customer?.entities[id]
);
export const editCustomerByIdSelector = createSelector(
  selectedModuleState,
  state => state?.customer?.selectedCustomer
);
export const getCustomersSelector = createSelector(
  selectedModuleState,
  state => {
    const entities = state?.customer?.entities || [];
    return Object.values(entities).map(customer => {
      return {
        ...customer,
        ...customer.profile,
        profile_id: customer.profile?.id,
        id: customer?.id,
        name: `${customer?.profile?.firstname || '-'} ${customer?.profile?.lastname || '-'}`,
        phone: `${customer?.profile?.phone  || '-'}`,
        subscription_name: customer?.subscription?.name
      }
    });
  }
);