import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/api.service';
import { ICustomer, ICustomerResponse } from 'src/app/models/customer.model';
import { RootState } from 'src/app/store/root.reducer';
import { addCustomerAction, addCustomerSuccessAction, deleteCustomerAction, deleteCustomerSuccessAction, getCustomerByIdAction, getCustomerByIdSuccessAction, loadCustomersAction, loadCustomersSuccessAction, updateCustomerAction, updateCustomerStatusAction, updateCustomerStatusSuccessAction, updateCustomerSuccessAction } from '../actions/customer.actions';
import { notificationAction } from 'src/app/store/actions/notification.action';
import { of } from 'rxjs';

@Injectable()
export class CustomerEffects {
  updateCustomerStatusAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateCustomerStatusAction),
    switchMap(({ payload }) => {
      return this.customerService.patch(payload, 'status').pipe(
        map((response: ICustomer) => {
          this.showNofication('Successfully approved!');
          return updateCustomerStatusSuccessAction({ response });
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
        map((response: ICustomerResponse[]) => {
          return loadCustomersSuccessAction({ response });
        }),
        catchError(() => {
          return of(notificationAction({
            notification: { error: true, message: 'Failed to load customers' }
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
    private customerService: CustomerService) { }
}
