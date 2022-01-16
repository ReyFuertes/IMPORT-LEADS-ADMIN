import { createSelector } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';

export const selectedState = (state: RootState) => state.customer;
export const getIsUserMigratedSelector = createSelector(
  selectedState,
  state => state?.isUserMigrated
);
export const getCustomerByIdSelector = (id: string) => createSelector(
  selectedState,
  state => state.entities[id]
);
export const editCustomerByIdSelector = createSelector(
  selectedState,
  state => state?.selectedCustomer
);
export const getCustomersSelector = createSelector(
  selectedState,
  state => Object.values(state?.entities).map(customer => {
    return {
      ...customer,
      ...customer.profile,
      profile_id: customer.profile?.id,
      id: customer?.id,
      name: `${customer?.profile?.firstname || '-'} ${customer?.profile?.lastname || '-'}`,
      phone: `${customer?.profile?.phone_number  || '-'}`,
      subscription_name: customer?.subscription?.name
    }
  })
);