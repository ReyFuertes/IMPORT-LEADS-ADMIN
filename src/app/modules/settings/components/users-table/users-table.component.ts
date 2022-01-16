import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { FormStateType } from 'src/app/models/generic.model';
import { IUser } from 'src/app/modules/auth/auth.models';
import { AddUserDialogComponent } from 'src/app/modules/dialog/components/add-user-dialog/add-user-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/modules/dialog/components/confirmation/confirmation.component';
import { addUserAction, deleteUserAction, updateUserAction } from 'src/app/store/actions/user.action';
import { RootState } from 'src/app/store/root.reducer';
import { getUsersSelector } from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'il-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  public $users: Observable<IUser[]>;
  public items: MenuItem[];
  public selectedItem: IUser;

  constructor(private store: Store<RootState>, private dialog: MatDialog) {
    this.$users = this.store.pipe(select(getUsersSelector));
  }

  ngOnInit(): void {
    this.items = [{
      label: 'Edit',
      command: () => this.onEditUser(this.selectedItem)
    }, {
      label: 'Delete',
      command: () => this.onDeleteUser(this.selectedItem)
    }];
  }

  public onDeleteUser(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '410px', data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(deleteUserAction({ id: item?.id }));
        }
      });
  }

  public onEditUser(item: any): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '430px', height: '340px', data: { action: 1, formState: FormStateType.Edit, id: item?.id }
    });
    dialogRef.afterClosed().subscribe((payload: IUser) => {
      if (payload) {
        this.store.dispatch(updateUserAction({ payload }))
      }
    });
  }

  public onAddUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '430px', height: '340px', data: { action: 0 }
    });
    dialogRef.afterClosed().subscribe((payload: IUser) => {
      if (payload) {
        this.store.dispatch(addUserAction({ payload }));
      }
    });
  }
}
