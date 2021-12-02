import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StorageService } from '../../service/storage.service';

@Injectable()
export class AccessEffect {


  constructor(
    private actions$: Actions
  ) { }
}
