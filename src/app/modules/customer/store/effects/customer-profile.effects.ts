import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { CustomerService, CustomerUserService } from 'src/app/services/api.service';
import { RootState } from 'src/app/store/root.reducer';
import { isApiUrlExistAction, isApiUrlExistSuccessAction, isWebsiteUrlExistAction, isWebsiteUrlExistSuccessAction, removeProfileLoadingAction, setProfileLoadingAction } from '../actions/customer-profile.actions';

@Injectable()
export class CustomerProfileEffects {
  isWebsiteUrlExistAction$ = createEffect(() => this.actions$.pipe(
    ofType(isWebsiteUrlExistAction),
    switchMap(({ payload }) => {
      return this.customerService.exist(payload, 'check-website-url').pipe(
        map((response: boolean) => {
          return isWebsiteUrlExistSuccessAction({ response });
        }),
        finalize(() => this.store.dispatch(removeProfileLoadingAction()))
      )
    })
  ));
  isApiUrlExistAction$ = createEffect(() => this.actions$.pipe(
    ofType(isApiUrlExistAction),
    switchMap(({ payload }) => {
      return this.customerService.exist(payload, 'check-api-url').pipe(
        map((response: boolean) => {
          return isApiUrlExistSuccessAction({ response });
        }),
        finalize(() => this.store.dispatch(removeProfileLoadingAction()))
      )
    })
  ));

  constructor(private store: Store<RootState>,
    private actions$: Actions,
    private customerService: CustomerService) { }
}
