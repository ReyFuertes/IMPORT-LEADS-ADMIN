import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsersAction } from 'src/app/store/actions/app.action';
import { RootState } from 'src/app/store/root.reducer';

@Component({
  selector: 'il-customer-container',
  templateUrl: './customer-container.component.html',
  styleUrls: ['./customer-container.component.scss']
})
export class CustomerContainerComponent {
  constructor(private store: Store<RootState>) {
    this.store.dispatch(loadUsersAction());
  }
}
