import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUsersAction } from 'src/app/store/actions/user.action';
import { RootState } from 'src/app/store/root.reducer';

@Component({
  selector: 'il-settings-container',
  templateUrl: './settings-container.component.html'
})
export class SettingsContainerComponent implements OnInit {
  constructor(private store: Store<RootState>) {
    this.store.dispatch(getUsersAction());
  }

  ngOnInit(): void { }
}
