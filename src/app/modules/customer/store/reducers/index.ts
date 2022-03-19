import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from 'src/app/store/root.reducer';
import { CustomerProfileReducer, CustomerProfileState } from './customer-profile.reducer';
import { CustomerUserReducer, CustomerUserState } from './customer-user.reducer';
import { CustomerReducer, CustomerState } from './customer.reducer';

export interface CustomerModuleState {
  customer: CustomerState,
  customerUser: CustomerUserState,
  customerProfile: CustomerProfileState
}
export const reducers: ActionReducerMap<CustomerModuleState> = {
  customer: CustomerReducer,
  customerUser: CustomerUserReducer,
  customerProfile: CustomerProfileReducer
};
export interface RootState extends fromRoot.RootState {
  customersModule: CustomerModuleState;
}


