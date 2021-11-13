import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, switchMap } from 'rxjs/operators';
import { loadAllRolesAction, loadAllRolesSuccessAction, loadCustomerAccessAction, loadCustomerAccessSuccessAction } from '../actions/app.action';
import { RootState } from '../root.reducer';
import { IAccess, IRole } from 'src/app/models/generic.model';
import { AccessService, RolesService } from 'src/app/services/api.service';
import { logoutAction, logoutSuccessAction } from 'src/app/modules/auth/store/auth.action';
import { Router } from '@angular/router';
import { LOGINROUTE } from 'src/app/shared/constants/routes';

@Injectable()
export class AppEffects {
  loadAllRolesAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllRolesAction),
    switchMap(() => {
      return this.roleService.getAll().pipe(
        map((response: IRole[]) => {
          return loadAllRolesSuccessAction({ response });
        })
      )
    })
  ));
  loadCustomerAccessAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadCustomerAccessAction),
    switchMap(() => {
      return this.accessService.getAll().pipe(
        map((response: IAccess[]) => {
          return loadCustomerAccessSuccessAction({ response });
        })
      )
    })
  ));
  logoutAction$ = createEffect(() => this.actions$.pipe(
    ofType(logoutAction),
    tap(() => {
      localStorage.clear();
      this.router.navigateByUrl(LOGINROUTE);
    }),
    map(() => logoutSuccessAction())
  ));
  constructor(private store: Store<RootState>,
    private actions$: Actions,
    private roleService: RolesService,
    private accessService: AccessService,
    private router: Router) { }
}
