import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerStatusType, FormStateType } from 'src/app/models/generic.model';
import { ICustomer, ICustomerPayload } from 'src/app/models/customer.model';
import { AddCustomerDialogComponent } from 'src/app/modules/dialog/components/add-customer-dialog/add-customer-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/modules/dialog/components/confirmation/confirmation.component';
import { InviteCustomerDialogComponent } from 'src/app/modules/dialog/components/invite-customer-dialog/invite-customer-dialog.component';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { RootState } from 'src/app/store/root.reducer';
import { addCustomerAction, deleteCustomerAction, loadCustomersAction, updateCustomerAction } from '../../store/actions/customer.actions';
import { getCustomersSelector } from '../../store/selectors/customer.selector';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'il-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {
  public customers: any[];
  public $customers: Observable<ICustomer[]>;
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
  public $searchKeyword = new BehaviorSubject(null);
  public take: number = 10;
  public skip: number = 0;

  constructor(private dialog: MatDialog, private store: Store<RootState>) {
    this.$customers = this.store.pipe(select(getCustomersSelector));
    this.$searchKeyword.pipe(debounceTime(500)).subscribe(keyword => {
      if (keyword) {
        const criteria: string = `firstname=${keyword}&lastname=${keyword}&username=${keyword}&company_name=${keyword}&company_address=${keyword}`;
        this.store.dispatch(loadCustomersAction({ params: `take=${this.take}&skip=${this.skip}&${criteria}` }));
      }
    });
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

  public onSearch(keyword: any): void {
    const value = keyword?.target?.value;
    if (value.length > 3) {
      this.$searchKeyword.next(value);
    } else if (value.length === 0) {
      this.store.dispatch(loadCustomersAction({ params: `take=${this.take}&skip=${this.skip}` }));
    }
  }

  public onDeleteCustomer(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '410px', data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(deleteCustomerAction({ id }));
        }
      });
  }

  public onAddCustomer(): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '690px',
      height: '487px',
      data: { action: 0 }
    });
    dialogRef.afterClosed().subscribe((payload: ICustomerPayload) => {
      if (payload) {
        this.store.dispatch(addCustomerAction({ payload }));
      }
    });
  }

  public onEditCustomer(id: string): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '690px',
      height: '487px',
      data: { action: 1, formState: FormStateType.Edit, id }
    });
    dialogRef.afterClosed().subscribe((payload: ICustomerPayload) => {
      if (payload) {
        this.store.dispatch(updateCustomerAction({ payload }));
      }
    });
  }
}
