import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { IUser } from 'src/app/modules/auth/auth.models';
import { UserService } from 'src/app/services/api.service';
import { addUserAction, addUserSuccessAction, deleteUserAction, deleteUserSuccessAction, getUserByIdAction, getUserByIdSuccessAction, getUsersAction, getUsersSuccessAction, updateUserAction, updateUserSuccessAction } from '../actions/user.action';

@Injectable()
export class UsersEffect {
  deleteUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUserAction),
    switchMap(({ id }) => {
      return this.userService.delete(id).pipe(
        map((response: IUser) => {
          return deleteUserSuccessAction({ response });
        })
      )
    })
  ));
  updateUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateUserAction),
    switchMap(({ payload }) => {
      return this.userService.patch(payload).pipe(
        map((response: IUser) => {
          return updateUserSuccessAction({ response });
        })
      )
    })
  ));
  getUserByIdAction$ = createEffect(() => this.actions$.pipe(
    ofType(getUserByIdAction),
    switchMap(({ id }) => {
      return this.userService.getById(id).pipe(
        map((response: IUser) => {
          return getUserByIdSuccessAction({ response });
        })
      )
    })
  ));
  getUsersAction$ = createEffect(() => this.actions$.pipe(
    ofType(getUsersAction),
    switchMap(({ }) => {
      return this.userService.getAll().pipe(
        map((response: IUser[]) => {
          return getUsersSuccessAction({ response });
        })
      )
    })
  ));
  addUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(addUserAction),
    switchMap(({ payload }) => {
      return this.userService.post(payload).pipe(
        map((response: IUser) => {
          return addUserSuccessAction({ response });
        })
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}
