import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { ICustomer } from 'src/app/models/customer.model';
import { IUser } from 'src/app/modules/auth/auth.models';
import { getCustomersSelector } from 'src/app/modules/customer/store/selectors/customer.selector';
import { ConfirmationDialogComponent } from 'src/app/modules/dialog/components/confirmation/confirmation.component';
import { RootState } from 'src/app/store/root.reducer';
import { cleanUpAction } from '../../store/settings.action';

@Component({
  selector: 'il-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent implements OnInit {
  public customers: IUser[];
  public items: MenuItem[];

  constructor(private store: Store<RootState>, private dialog: MatDialog) {
    this.store.pipe(select(getCustomersSelector)).subscribe(customers => this.customers = customers);
  }

  ngOnInit(): void { }

  public onReset(customer: ICustomer): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '410px', data: { action: 4 }
    });
    dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (result === true && customer?.profile?.api_url) {
          this.store.dispatch(cleanUpAction({
            url: customer.profile?.api_url,
            payload: {
              customer: { username: customer?.username }
            }
          }));
        }
      });
  }
}
