import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, switchMap, filter } from 'rxjs/operators';
import { initAppAction, initAppSuccessAction, loadAllRoleAction, loadAllRolesSuccessAction, loadAccessAction, loadAccessSuccessAction } from '../actions/app.action';
import { RootState } from '../root.reducer';
import { IAccess, IRole } from 'src/app/models/generic.model';
import { AccessService, RoleService, RolesService } from 'src/app/services/api.service';
import { logoutAction, logoutSuccessAction } from 'src/app/modules/auth/store/auth.action';
import { NavigationEnd, Router } from '@angular/router';
import { CUSTOMERROUTE, LOGINROUTE } from 'src/app/shared/constants/routes';
import { StorageService } from 'src/app/modules/service/storage.service';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {
  initAppAction$ = createEffect(() => this.actions$.pipe(
    ofType(initAppAction),
    switchMap(() => of(this.storageSrv.get('at'))
      .pipe(
        map(() => {
          const response = JSON.parse(this.storageSrv.get('at')) || null;
          const isUserLoggedIn = !!response?.user;
          this.isInloginpage(isUserLoggedIn);

          return initAppSuccessAction({ response });
        }),

      ))
  ));
  loadAllRoleAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllRoleAction),
    switchMap(() => {
      return this.roleService.getAll().pipe(
        map((response: IRole[]) => {
          return loadAllRolesSuccessAction({ response });
        })
      )
    })
  ));
  loadAccessAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAccessAction),
    switchMap(() => {
      return this.accessService.getAll().pipe(
        map((response: IAccess[]) => {
          return loadAccessSuccessAction({ response });
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

  public isInloginpage(isLoggedIn: boolean): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const inLoginPage = e.urlAfterRedirects.includes('login');

        if (isLoggedIn && inLoginPage) {
          this.router.navigateByUrl(CUSTOMERROUTE);
        }
      });
  }

  constructor(private store: Store<RootState>,
    private actions$: Actions,
    private roleService: RoleService,
    private accessService: AccessService,
    private router: Router,
    private storageSrv: StorageService) { }
}
