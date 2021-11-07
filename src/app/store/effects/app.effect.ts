import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, switchMap } from 'rxjs/operators';
import { loadAllRolesAction, loadAllRolesSuccessAction, loadCustomerAccessAction, loadCustomerAccessSuccessAction } from '../actions/app.action';
import { RootState } from '../root.reducer';
import { IAccess, IRole } from 'src/app/models/generic.model';
import { AccessService, RolesService, CustomerService } from 'src/app/services/api.service';
import { ICustomer, ICustomerResponse } from 'src/app/models/customer.model';

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

  constructor(private store: Store<RootState>,
    private actions$: Actions,
    private roleService: RolesService,
    private accessService: AccessService,
    private customerService: CustomerService) { }
}
