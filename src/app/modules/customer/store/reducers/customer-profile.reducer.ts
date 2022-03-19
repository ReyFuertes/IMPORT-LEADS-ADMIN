import { createReducer, on, Action } from "@ngrx/store";
import { IProfile } from "src/app/models/customer.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { isWebsiteUrlExistSuccessAction, removeProfileLoadingAction, setProfileLoadingAction,  } from "../actions/customer-profile.actions";

export interface CustomerProfileState extends EntityState<IProfile> {
  websiteUrlExist: boolean,
  isProfileLoading: boolean
}
export const adapter: EntityAdapter<IProfile> = createEntityAdapter<IProfile>({});
export const initialState: CustomerProfileState = adapter.getInitialState({
  websiteUrlExist: null,
  isProfileLoading: null
});

const customerProfileReducer = createReducer(
  initialState,
  on(removeProfileLoadingAction, (state) => {
    return Object.assign({}, state, { isProfileLoading: null })
  }),
  on(setProfileLoadingAction, (state) => {
    return Object.assign({}, state, { isProfileLoading: true })
  }),
  on(isWebsiteUrlExistSuccessAction, (state, action) => {
    return Object.assign({}, state, { websiteUrlExist: action?.response })
  }),
);
export function CustomerProfileReducer(state: CustomerProfileState, action: Action) {
  return customerProfileReducer(state, action);
}