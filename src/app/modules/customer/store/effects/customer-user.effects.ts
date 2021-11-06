import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, switchMap } from 'rxjs/operators';
import { CustomerService, CustomerUserService } from 'src/app/services/api.service';
import { ICustomer, ICustomerUser } from 'src/app/models/customer.model';
import { RootState } from 'src/app/store/root.reducer';
import { addCustomerUserAction, addCustomerUserSuccessAction } from '../actions/customer-user.actions';

@Injectable()
export class CustomerUserEffects {
  addCustomerUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(addCustomerUserAction),
    switchMap(({ payload }) => {
      return this.customerUserService.post(payload).pipe(
        map((response: ICustomerUser) => {
          debugger
          return addCustomerUserSuccessAction({ response });
        })
      )
    })
  ));

  constructor(private store: Store<RootState>,
    private actions$: Actions,
    private customerService: CustomerService,
    private customerUserService: CustomerUserService) { }
}
