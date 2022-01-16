import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSubscriptionsAction } from 'src/app/store/actions/subscription.action';
import { getUsersAction } from 'src/app/store/actions/user.action';
import { RootState } from 'src/app/store/root.reducer';

@Component({
  selector: 'il-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['settings-container.component.scss']
})
export class SettingsContainerComponent implements OnInit {
  constructor(private store: Store<RootState>) {
    this.store.dispatch(getUsersAction());
  }

  ngOnInit(): void { }
}
