import { createSelector } from '@ngrx/store';
import { IRole } from 'src/app/models/generic.model';
import { sortByDesc } from 'src/app/shared/util/sort';
import { RootState } from '../root.reducer';

export const selectedState = (state: RootState) => state.appState;
export const getIsLoginFailedSelector = createSelector(
  selectedState,
  state => state?.isLoginFailed
);
export const getIsLoggingInSelector = createSelector(
  selectedState,
  state => state?.isLoggingIn
);
export const getIsLoggedInSelector = createSelector(
  selectedState,
  state => state?.isLoggedIn
);
export const getAuthTokenSelector = createSelector(
  selectedState,
  state => state?.token
);
export const getCustomerRolesSelector = createSelector(
  selectedState,
  state => {
    const fmtRoles = state?.roles;
    const roles = fmtRoles?.map((u: IRole) => {
      return {
        label: u.role_name,
        value: String(u.id)
      };
    }) || [];
    return roles;
  }
);
export const getCustomerAccessSelector = createSelector(
  selectedState,
  state => {
    return state?.access?.map(a => {
      const children = state?.access?.filter(c => {
        return c.parent && c?.parent?.id === a.id;
      }) || null;

      return {
        label: a.access_name,
        value: String(a.id),
        parent: a.parent,
        children,
        customer_route: a.customer_route
      }
    }).sort((a, b) => sortByDesc(a, b, 'position'))
  }
)
