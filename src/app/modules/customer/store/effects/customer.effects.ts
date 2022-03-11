import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AccessService, CustomerService, RolesService } from 'src/app/services/api.service';
import { CreateStatusType, ICustomer, ICustomerResponse } from 'src/app/models/customer.model';
import { RootState } from 'src/app/store/root.reducer';
import { addCustomerAction, addCustomerSuccessAction, deleteCustomerAction, deleteCustomerSuccessAction, getCustomerByIdAction, getCustomerByIdSuccessAction, inviteAction, inviteSuccessAction, loadCustomersAction, loadCustomersSuccessAction, updateCustomerAction, updateCustomerDetailsAction, updateCustomerDetailsSuccessAction, updateCustomerStatusAction, updateCustomerStatusSuccessAction, updateCustomerSuccessAction, createCustomerUsersAction, createCustomerUsersSuccessAction } from '../actions/customer.actions';
import { notificationFailedAction, notificationSuccessAction } from 'src/app/store/actions/notification.action';
import { combineLatest, of, zip } from 'rxjs';

@Injectable()
export class CustomerEffects {
  updateCustomerDetailsAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateCustomerDetailsAction),
    switchMap(({ payload }) => {
      return this.customerService.patch(payload).pipe(
        map((response) => {
          this.showSuccessNofication('Successfully updated customer details!');
          return updateCustomerDetailsSuccessAction({ response });
        }),
        catchError(() => {
          return of(notificationSuccessAction({
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
          let failedCustomer: ICustomer[] = [];
          let invitedCustomer: ICustomer[] = [];
          response.forEach(customer => {
            if (customer.create_status === CreateStatusType.Failed) {
              failedCustomer.push(customer);
            } else {
              invitedCustomer.push(customer);
            }
          });
          const failedCustomerNames = failedCustomer.map(value => value.username).join(', ')
          this.showFailedNofication(`Failed to invite ${failedCustomerNames}!`);

          if (invitedCustomer?.length > 0) {
            setTimeout(() => {
              const SuccessCustomerNames = invitedCustomer.map(value => value.username).join(', ')
              this.showSuccessNofication(`Successfully invite ${SuccessCustomerNames}!`);
            }, 3000);
          }

          return inviteSuccessAction({ response });
        }),
        debounceTime(1000),
        finalize(() => this.store.dispatch(loadCustomersAction({})))
      )
    })
  ));
  createCustomerUsersAction$ = createEffect(() => this.actions$.pipe(
    ofType(createCustomerUsersAction),
    switchMap(({ payload, api_url }) => {
      return this.customerService.post(payload, 'multiple', api_url).pipe(
        map((response: ICustomer[]) => {
          return createCustomerUsersSuccessAction({ response });
        })
      )
    })
  ));
  updateCustomerStatusAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateCustomerStatusAction),
    switchMap(({ payload, customer, access, role, customer_users }) => {
      return combineLatest([
        this.accessService.post(access, 'migrate', customer?.api_url),
        this.roleService.post(role, 'migrate', customer?.api_url),
        this.customerService.post(customer, 'user', customer?.api_url),
        this.customerService.patch(payload, 'status')
      ]).pipe(
        map(([access, role, customer, response]) => {
          this.showSuccessNofication('Successfully updated customer status!');
          return updateCustomerStatusSuccessAction({ response });
        }),
        finalize(() => {
          this.store.dispatch(createCustomerUsersAction({ payload: customer_users, api_url: customer?.api_url }))
        }),
        catchError(() => {
          return of(notificationSuccessAction({
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
          this.showSuccessNofication('Successfully deleted!');
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
          this.showSuccessNofication('Successfully updated customer!');
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
          return of(notificationSuccessAction({
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
          this.showSuccessNofication('Successfully added new customer!');
          this.store.dispatch(loadCustomersAction({})); //quick fix solution
          return addCustomerSuccessAction({ response });
        })
      )
    })
  ));

  private showSuccessNofication(message: string): void {
    this.store.dispatch(notificationSuccessAction({ notification: { success: true, message } }));
  }

  private showFailedNofication(message: string): void {
    this.store.dispatch(notificationFailedAction({ notification: { success: false, message } }));
  }

  constructor(private store: Store<RootState>,
    private actions$: Actions,
    private customerService: CustomerService,
    private accessService: AccessService,
    private roleService: RolesService) { }
}
