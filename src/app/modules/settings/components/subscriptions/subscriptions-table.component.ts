import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { FormStateType, ISubscription } from 'src/app/models/generic.model';
import { AddSubscriptionDialogComponent } from 'src/app/modules/dialog/components/add-subscription-dialog/add-subscription-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/modules/dialog/components/confirmation/confirmation.component';
import { StorageService } from 'src/app/modules/service/storage.service';
import { addSubscriptionAction, deleteSubscriptionAction, updateSubscriptionAction } from 'src/app/store/actions/subscription.action';
import { RootState } from 'src/app/store/root.reducer';
import { getSubscriptionsSelector } from 'src/app/store/selectors/subscription.selector';

@Component({
  selector: 'il-subscriptions-table',
  templateUrl: './subscriptions-table.component.html',
  styleUrls: ['./subscriptions-table.component.scss']
})
export class SubscriptionsTableComponent implements OnInit {
  public $subscriptions: Observable<ISubscription[]>;
  public items: MenuItem[];
  public selectedItem: ISubscription;

  constructor(private storageSrv: StorageService, private store: Store<RootState>, private dialog: MatDialog) {
    this.$subscriptions = this.store.pipe(select(getSubscriptionsSelector));
  }

  ngOnInit(): void {
    this.items = [{
      label: 'Edit',
      command: () => this.onEditSubscription(this.selectedItem)
    }, {
      label: 'Delete',
      command: () => this.onDeleteSubscription(this.selectedItem)
    }];
  }

  public onDeleteSubscription(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '410px', data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(deleteSubscriptionAction({ id: item?.id }));
        }
      });
  }

  public onEditSubscription(item: any): void {
    const dialogRef = this.dialog.open(AddSubscriptionDialogComponent, {
      width: '430px', height: '335px', data: { action: 1, formState: FormStateType.Edit, id: item?.id }
    });
    dialogRef.afterClosed().subscribe((payload: ISubscription) => {
      if (payload) {
        this.store.dispatch(updateSubscriptionAction({ payload }))
      }
    });
  }

  public onAddSubscription(): void {
    const dialogRef = this.dialog.open(AddSubscriptionDialogComponent, {
      width: '430px', height: '335px', data: { action: 0 }
    });
    dialogRef.afterClosed().subscribe((payload: ISubscription) => {
      if (payload) {
        this.store.dispatch(addSubscriptionAction({ payload }));
      }
    });
  }
}
