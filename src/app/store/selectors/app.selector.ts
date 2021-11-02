import { createSelector } from '@ngrx/store';
import { IRole } from 'src/app/models/generic.model';
import { sortByDesc } from 'src/app/shared/util/sort';
import { RootState } from '../root.reducer';

export const selectedState = (state: RootState) => state.appState;
export const getCustomersSelector = createSelector(
  selectedState,
  state => state?.Customers
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
        Customer_route: a.Customer_route
      }
    }).sort((a, b) => sortByDesc(a, b, 'position'))
  }
)
