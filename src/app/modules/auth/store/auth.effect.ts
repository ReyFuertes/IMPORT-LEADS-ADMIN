import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { loginAction, loginSuccessAction, loginFailedAction } from './auth.action';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { StorageService } from '../../service/storage.service';

@Injectable()
export class AuthEffect {
  loginAction$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    switchMap(({ payload }) => this.authService.post(payload, 'signin')
      .pipe(
        map((token: any) => {
          return loginSuccessAction({ token });
        }),
        catchError((error: any) => {
          return of(loginFailedAction({ error: error.message }));
        }),
        tap(token => this.storageSrv.set('at', JSON.stringify(token))),
      ))
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private storageSrv: StorageService
  ) { }
}
