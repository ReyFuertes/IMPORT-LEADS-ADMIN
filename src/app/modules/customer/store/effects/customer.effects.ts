import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AccessService, CustomerService, RolesService } from 'src/app/services/api.service';
import { ICustomer, ICustomerResponse } from 'src/app/models/customer.model';
import { RootState } from 'src/app/store/root.reducer';
import { addCustomerAction, addCustomerSuccessAction, deleteCustomerAction, deleteCustomerSuccessAction, getCustomerByIdAction, getCustomerByIdSuccessAction, inviteAction, inviteSuccessAction, loadCustomersAction, loadCustomersSuccessAction, updateCustomerAction, updateCustomerDetailsAction, updateCustomerDetailsSuccessAction, updateCustomerStatusAction, updateCustomerStatusSuccessAction, updateCustomerSuccessAction } from '../actions/customer.actions';
import { notificationAction } from 'src/app/store/actions/notification.action';
import { of, zip } from 'rxjs';

@Injectable()
export class CustomerEffects {
  updateCustomerDetailsAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateCustomerDetailsAction),
    mergeMap(({ payload }) => {
      return this.customerService.patch(payload).pipe(
        map((response) => {
          this.showNofication('Successfully updated customer details!');
          return updateCustomerDetailsSuccessAction({ response });
        }),
        catchError(() => {
          return of(notificationAction({
            notification: { error: true, message: 'Failed to add tenant, please contact your site administrator' }
          }));
        })
      )
    })
  ));
  inviteAction$ = createEffect(() => this.actions$.pipe(
    ofType(inviteAction),
    switchMap(({ payload }) => {
      return this.customerService.post(payload, 'invite').pipe(
        map((response: ICustomer[]) => {
          this.showNofication('Successfully invite new customer!');
          return inviteSuccessAction({ response });
        }),
        debounceTime(1000),
        tap(() => this.store.dispatch(loadCustomersAction({})))
      )
    })
  ));
  updateCustomerStatusAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateCustomerStatusAction),
    mergeMap(({ payload, customer, access, role, customer_users }) => {
      return zip(
        this.accessService.post(access, 'migrate', customer?.api_url),
        this.roleService.post(role, 'migrate', customer?.api_url),
        this.customerService.post(customer, 'user', customer?.api_url),
        this.customerService.post(customer_users, 'multiple', customer?.api_url),
        this.customerService.patch(payload, 'status')
      ).pipe(
        map(([access, role, customer, customer_users, response]) => {
          this.showNofication('Successfully updated customer status!');
          return updateCustomerStatusSuccessAction({ response });
        }),
        catchError(() => {
          return of(notificationAction({
            notification: { error: true, message: 'Failed to add tenant, please contact your site administrator' }
          }));
        })
      )
    })
  ));
  deleteCustomerAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteCustomerAction),
    switchMap(({ id }) => {
      return this.customerService.delete(id).pipe(
        map((response: ICustomer) => {
          this.showNofication('Successfully deleted!');
          return deleteCustomerSuccessAction({ response });
        })
      )
    })
  ));
  updateCustomerAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateCustomerAction),
    switchMap(({ payload }) => {
      return this.customerService.patch(payload).pipe(
        map((response: ICustomer) => {
          this.showNofication('Successfully updated customer!');
          return updateCustomerSuccessAction({ response });
        })
      )
    })
  ));
  getCustomerByIdAction$ = createEffect(() => this.actions$.pipe(
    ofType(getCustomerByIdAction),
    switchMap(({ id }) => {
      return this.customerService.getById(id).pipe(
        map((response: ICustomer) => {
          return getCustomerByIdSuccessAction({ response });
        })
      )
    })
  ));
  loadCustomersAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadCustomersAction),
    switchMap(({ params }) => {
      return this.customerService.getAll(params).pipe(
        distinctUntilChanged(),
        map((response: ICustomerResponse[]) => {
          return loadCustomersSuccessAction({ response });
        }),
        catchError(() => {
          return of(notificationAction({
            notification: { error: true, message: 'Failed to load customers.' }
          }));
        })
      )
    })
  ));
  addCustomerAction$ = createEffect(() => this.actions$.pipe(
    ofType(addCustomerAction),
    switchMap(({ payload }) => {
      return this.customerService.post(payload).pipe(
        map((response: ICustomer) => {
          this.showNofication('Successfully added new customer!');
          this.store.dispatch(loadCustomersAction({})); //quick fix solution
          return addCustomerSuccessAction({ response });
        })
      )
    })
  ));

  private showNofication(message: string): void {
    this.store.dispatch(notificationAction({ notification: { success: true, message } }));
  }

  constructor(private store: Store<RootState>,
    private actions$: Actions,
    private customerService: CustomerService,
    private accessService: AccessService,
    private roleService: RolesService) { }
}
