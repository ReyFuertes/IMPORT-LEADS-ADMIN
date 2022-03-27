import { createReducer, on, Action } from "@ngrx/store";
import { IProfile } from "src/app/models/customer.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { isApiUrlExistSuccessAction, isWebsiteUrlExistSuccessAction, removeProfileLoadingAction, setProfileLoadingAction,  } from "../actions/customer-profile.actions";

export interface CustomerProfileState extends EntityState<IProfile> {
  websiteUrlExist: boolean,
  apiUrlExist: boolean,
  isProfileLoading: boolean
}
export const adapter: EntityAdapter<IProfile> = createEntityAdapter<IProfile>({});
export const initialState: CustomerProfileState = adapter.getInitialState({
  websiteUrlExist: null,
  apiUrlExist: null,
  isProfileLoading: null
});

const customerProfileReducer = createReducer(
  initialState,
  on(isApiUrlExistSuccessAction, (state, action) => {
    return Object.assign({}, state, { apiUrlExist: action?.response })
  }),
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