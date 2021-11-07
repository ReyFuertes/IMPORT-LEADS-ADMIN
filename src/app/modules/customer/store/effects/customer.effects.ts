import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CustomerService, CustomerUserService } from 'src/app/services/api.service';
import { ICustomer } from 'src/app/models/customer.model';
import { RootState } from 'src/app/store/root.reducer';
import { addCustomerAction, addCustomerSuccessAction, loadCustomersAction, loadCustomersSuccessAction } from '../actions/customer.actions';
import { notificationAction } from 'src/app/store/actions/notification.action';
import { of } from 'rxjs';

@Injectable()
export class CustomerEffects {
  loadCustomerAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadCustomersAction),
    switchMap(() => {
      return this.customerService.getAll().pipe(
        map((response: any[]) => {
          return loadCustomersSuccessAction({ response: response });
        }),
        catchError(() => {
          return of(notificationAction({
            notification: { error: true, message: 'Failed to add new customer.' }
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
          this.store.dispatch(notificationAction({ notification: { success: true, message: 'Successfully added new customer!' } }));
          return addCustomerSuccessAction({ response });
        })
      )
    })
  ));
    // this.store.dispatch(notificationAction({ notification: { error: true, message } }));
  constructor(private store: Store<RootState>,
    private actions$: Actions,
    private customerService: CustomerService,
    private customerUserService: CustomerUserService) { }
}
