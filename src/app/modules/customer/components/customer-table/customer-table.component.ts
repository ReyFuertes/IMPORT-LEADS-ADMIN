import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserStatusType } from 'src/app/models/generic.model';
import { IUser } from 'src/app/models/user.model';
import { AddUserDialogComponent } from 'src/app/modules/dialog/components/add-user-dialog/add-user-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/modules/dialog/components/confirmation/confirmation.component';
import { InviteUserDialogComponent } from 'src/app/modules/dialog/components/invite-user-dialog/invite-user-dialog.component';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { RootState } from 'src/app/store/root.reducer';
import { getUsersSelector } from 'src/app/store/selectors/app.selector';
@Component({
  selector: 'il-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {
  public customers: any[];
  public $users: Observable<IUser[]>;
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
  public userStatusType = UserStatusType;

  constructor(private dialog: MatDialog, private store: Store<RootState>) {
    this.$users = this.store.pipe(select(getUsersSelector));
  }

  ngOnInit() { }

  public onInvite(): void {
    const dialogRef = this.dialog.open(InviteUserDialogComponent, {
      width: '410px',
      data: { action: 0 }
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

  public onAddUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '550px',
      height: '385px',
      data: { action: 0 }
    });
    dialogRef.afterClosed().subscribe((result: IUser) => {
      if (result) {

      }
    });
  }

  public onEditUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '550px',
      height: '385px',
      data: { action: 1 }
    });
    dialogRef.afterClosed().subscribe((result: IUser) => {
      if (result) {

      }
    });
  }
}
