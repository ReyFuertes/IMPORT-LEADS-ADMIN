import { createSelector } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';

export const selectedState = (state: RootState) => state.customer;
export const getCustomerByIdSelector = createSelector(
  selectedState,
  state => state?.selectedCustomer
);
export const getCustomersSelector = createSelector(
  selectedState,
  state => Object.values(state?.entities).map(customer => {
    return {
      ...customer,
      ...customer.customer_profile,
      customer_profile_id: customer.customer_profile?.id,
      id: customer?.id,
      name: `${customer?.customer_profile?.firstname} ${customer?.customer_profile?.lastname}`,
      phone: `${customer?.customer_profile?.phone_number}`
    }
  })
);