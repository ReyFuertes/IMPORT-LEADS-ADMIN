import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from 'src/app/store/root.reducer';
import { CustomerUserReducer, CustomerUserState } from './customer-user.reducer';
import { CustomerReducer, CustomerState } from './customer.reducer';

export interface CustomerModuleState {
  customer: CustomerState,
  customerUser: CustomerUserState
}
export const reducers: ActionReducerMap<CustomerModuleState> = {
  customer: CustomerReducer,
  customerUser: CustomerUserReducer
};
export interface RootState extends fromRoot.RootState {
  usersModule: CustomerModuleState;
}


