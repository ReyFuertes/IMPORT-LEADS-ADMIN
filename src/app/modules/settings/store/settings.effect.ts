import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/api.service';

@Injectable()
export class SettingsEffect {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}
