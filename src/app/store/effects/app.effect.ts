import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, switchMap } from 'rxjs/operators';
import { loadAllRolesAction, loadAllRolesSuccessAction, loadUserAccessAction, loadUserAccessSuccessAction, loadUsersAction, loadUsersSuccessAction } from '../actions/app.action';
import { RootState } from '../root.reducer';
import { IAccess, IRole } from 'src/app/models/generic.model';
import { AccessService, RolesService, UserService } from 'src/app/services/api.service';
import { IUser } from 'src/app/models/user.model';

@Injectable()
export class AppEffects {
  loadUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsersAction),
    switchMap(() => {
      return this.userService.getAll().pipe(
        map((response: IUser[]) => {
          return loadUsersSuccessAction({ response });
        })
      )
    })
  ));
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
  loadUserAccessAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserAccessAction),
    switchMap(() => {
      return this.accessService.getAll().pipe(
        map((response: IAccess[]) => {
          return loadUserAccessSuccessAction({ response });
        })
      )
    })
  ));

  constructor(private store: Store<RootState>,
    private actions$: Actions,
    private roleService: RolesService,
    private accessService: AccessService,
    private userService: UserService) { }
}
