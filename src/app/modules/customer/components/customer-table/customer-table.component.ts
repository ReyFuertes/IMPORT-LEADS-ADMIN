import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomerStatusType } from 'src/app/models/generic.model';
import { ICustomer, ICustomerPayload } from 'src/app/models/customer.model';
import { AddCustomerDialogComponent } from 'src/app/modules/dialog/components/add-customer-dialog/add-customer-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/modules/dialog/components/confirmation/confirmation.component';
import { InviteCustomerDialogComponent } from 'src/app/modules/dialog/components/invite-customer-dialog/invite-customer-dialog.component';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { RootState } from 'src/app/store/root.reducer';
import { getCustomersSelector } from 'src/app/store/selectors/app.selector';
import { addCustomerAction } from '../../store/customer.actions';
@Component({
  selector: 'il-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {
  public customers: any[];
  public $Customers: Observable<ICustomer[]>;
  public columnHeaders: ISimpleItem[] = [{
    label: 'Date',
    value: 'created_at'
  }, {
    label: 'Username/Email',
    value: 'username'
  }, {
    label: 'Name',
    value: 'name'
  }, {
    label: 'Phone',
    value: 'phone'
  }, {
    label: 'Company Name',
    value: 'company_name'
  }, {
    label: 'Company Address',
    value: 'company_address'
  }, {
    label: 'Status',
    value: 'status'
  }];
  public CustomerStatusType = CustomerStatusType;

  constructor(private dialog: MatDialog, private store: Store<RootState>) {
    this.$Customers = this.store.pipe(select(getCustomersSelector));
  }

  ngOnInit() { }

  public onInvite(): void {
    const dialogRef = this.dialog.open(InviteCustomerDialogComponent, {
      width: '410px',
      data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
        }
      });
  }

  public onApprove(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '410px',
      data: { action: 1 }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
        }
      });
  }

  public onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '410px',
      data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
        }
      });
  }

  public onAddCustomer(): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '550px',
      height: '495px',
      data: { action: 0 }
    });
    dialogRef.afterClosed().subscribe((payload: ICustomerPayload) => {
      if (payload) {
        debugger
        this.store.dispatch(addCustomerAction({ payload }));
      }
    });
  }

  public onEditCustomer(): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '550px',
      height: '495px',
      data: { action: 1 }
    });
    dialogRef.afterClosed().subscribe((result: ICustomer) => {
      if (result) {

      }
    });
  }
}
