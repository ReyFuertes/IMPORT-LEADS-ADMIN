import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { CustomerUserService } from 'src/app/services/api.service';
import { ICustomerUser, ICustomerUserResponse } from 'src/app/models/customer.model';
import { RootState } from 'src/app/store/root.reducer';
import { addCustomerUserAction, addCustomerUserSuccessAction, getCustomerUserByIdAction, getCustomerUserByIdSuccessAction, updateCustomerUserAction, updateCustomerUserSuccessAction } from '../actions/customer-user.actions';
import { deleteCustomerUserAction, deleteCustomerUserSuccessAction } from '../actions/customer.actions';

@Injectable()
export class CustomerUserEffects {
  updateCustomerUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateCustomerUserAction),
    switchMap(({ payload }) => {
      return this.customerUserService.patch(payload).pipe(
        map((response: ICustomerUser) => {
          return updateCustomerUserSuccessAction({ response });
        })
      )
    })
  ));
    
  deleteCustomerAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteCustomerUserAction),
    switchMap(({ id }) => {
      return this.customerUserService.delete(id).pipe(
        map((response: ICustomerUserResponse) => {
          return deleteCustomerUserSuccessAction({ response });
        })
      )
    })
  ));

  getCustomerByIdAction$ = createEffect(() => this.actions$.pipe(
    ofType(getCustomerUserByIdAction),
    switchMap(({ id }) => {
      return this.customerUserService.getById(id).pipe(
        map((response: ICustomerUserResponse) => {
          return getCustomerUserByIdSuccessAction({ response });
        })
      )
    })
  ));

  addCustomerUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(addCustomerUserAction),
    switchMap(({ payload }) => {
      return this.customerUserService.post(payload).pipe(
        map((response: ICustomerUser) => {
          return addCustomerUserSuccessAction({ response });
        })
      )
    })
  ));

  constructor(private store: Store<RootState>,
    private actions$: Actions,
    private customerUserService: CustomerUserService) { }
}
