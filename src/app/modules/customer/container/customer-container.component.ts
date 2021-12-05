import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';
import { loadCustomersAction } from '../store/actions/customer.actions';

@Component({
  selector: 'il-customer-container',
  templateUrl: './customer-container.component.html'
})
export class CustomerContainerComponent {
  constructor(private store: Store<RootState>) {
    this.store.dispatch(loadCustomersAction({}));
  }
}
