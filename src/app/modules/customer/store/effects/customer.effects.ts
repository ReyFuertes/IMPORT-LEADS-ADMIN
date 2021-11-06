import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { CustomerService, CustomerUserService } from 'src/app/services/api.service';
import { ICustomer } from 'src/app/models/customer.model';
import { RootState } from 'src/app/store/root.reducer';
import { addCustomerAction, addCustomerSuccessAction } from '../actions/customer.actions';

@Injectable()
export class CustomerEffects {
  addCustomerAction$ = createEffect(() => this.actions$.pipe(
    ofType(addCustomerAction),
    switchMap(({ payload }) => {
      return this.customerService.post(payload).pipe(
        map((response: ICustomer) => {
          return addCustomerSuccessAction({ response });
        })
      )
    })
  ));

  constructor(private store: Store<RootState>,
    private actions$: Actions,
    private customerService: CustomerService,
    private customerUserService: CustomerUserService) { }
}
