import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, debounceTime, distinctUntilChanged, finalize, map, switchMap } from 'rxjs/operators';
import { AccessService, CustomerService, RolesService } from 'src/app/services/api.service';
import { CreateStatusType, ICustomer, ICustomerResponse } from 'src/app/models/customer.model';
import { RootState } from 'src/app/store/root.reducer';
import { addCustomerAction, addCustomerSuccessAction, deleteCustomerAction, deleteCustomerSuccessAction, getCustomerByIdAction, getCustomerByIdSuccessAction, inviteAction, inviteSuccessAction, loadCustomersAction, loadCustomersSuccessAction, updateCustomerAction, updateCustomerDetailsAction, updateCustomerDetailsSuccessAction, approveCustomerAction, approveCustomerSuccessAction, updateCustomerSuccessAction, createCustomerUsersAction, createCustomerUsersSuccessAction, updateCustomerStatusAction, updateCustomerStatusSuccessAction } from '../actions/customer.actions';
import { notificationFailedAction, notificationSuccessAction } from 'src/app/store/actions/notification.action';
import { combineLatest, of } from 'rxjs';

@Injectable()
export class CustomerEffects {
  updateCustomerStatusAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateCustomerStatusAction),
    switchMap(({ payload }) => {
      return this.customerService.patch(payload, 'status').pipe(
        map((response) => {
          this.showSuccessNofication('Successfully updated customer status!');
          return updateCustomerStatusSuccessAction({ response });
        }),
        catchError(() => {
          return of(notificationSuccessAction({
            notification: { error: true, message: 'Failed to update status, please contact your site administrator' }
          }));
        })
      )
    })
  ));

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
          if (invitedCustomer?.length > 0) {
            const SuccessCustomerNames = invitedCustomer.map(value => value.username).join(', ')
            this.showSuccessNofication(`Successfully invite ${SuccessCustomerNames}!`);
          }
          setTimeout(() => {
            if (failedCustomer?.length > 0) {
              const failedCustomerNames = failedCustomer.map(value => value.username).join(', ')
              this.showFailedNofication(`Failed to invite ${failedCustomerNames}!`);
            }
          }, 3500);
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

  approveCustomerAction$ = createEffect(() => this.actions$.pipe(
    ofType(approveCustomerAction),
    switchMap(({ payload }) => {
      return combineLatest([
        this.customerService.patch(payload?.status, 'status'),
        this.customerService.post(payload, '', payload?.api_url)
      ]).pipe(
        map(([response]) => {
          this.showSuccessNofication('Successfully updated customer status!');
          return approveCustomerSuccessAction({ response });
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
