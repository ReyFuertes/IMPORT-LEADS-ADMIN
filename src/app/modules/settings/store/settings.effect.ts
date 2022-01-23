import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { CustomerService, UtilityService } from 'src/app/services/api.service';
import { RootState } from 'src/app/store/root.reducer';
import { cleanUpAction, cleanUpSuccessAction, resetAction, resetSuccessAction } from './settings.action';

@Injectable()
export class SettingsEffect {
  resetAction$ = createEffect(() => this.actions$.pipe(
    ofType(resetAction),
    switchMap(({ payload }) => {
      return this.customerService.patch(payload, 'reset-status').pipe(
        map((response) => {
          return resetSuccessAction({ response });
        })
      )
    })
  ));

  cleanUpAction$ = createEffect(() => this.actions$.pipe(
    ofType(cleanUpAction),
    switchMap(({ url, payload }) => {
      return this.utilityService.post(null, 'clean-up-data', url).pipe(
        map((response: any) => {
          this.store.dispatch(resetAction({ payload }));
          return cleanUpSuccessAction({ response });
        })
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private utilityService: UtilityService,
    private customerService: CustomerService,
    private store: Store<RootState>
  ) { }
}
