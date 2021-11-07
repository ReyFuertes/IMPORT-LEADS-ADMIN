import { createSelector } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';

export const selectedState = (state: RootState) => state.customer;
export const getCustomersSelector = createSelector(
  selectedState,
  state => Object.values(state?.entities).map(customer => {
    return {
      ...customer,
      ...customer.profile,
      name: `${customer?.profile?.firstname} ${customer?.profile?.lastname}`,
      phone: `${customer?.profile?.phone_number}`
    }
  })
);
