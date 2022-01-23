import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChangePasswordType, CustomerStatusType, FormStateType } from 'src/app/models/generic.model';
import { IAccess, ICustomer, ICustomerPayload } from 'src/app/models/customer.model';
import { AddCustomerDialogComponent } from 'src/app/modules/dialog/components/add-customer-dialog/add-customer-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/modules/dialog/components/confirmation/confirmation.component';
import { InviteCustomerDialogComponent } from 'src/app/modules/dialog/components/invite-customer-dialog/invite-customer-dialog.component';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { RootState } from 'src/app/store/root.reducer';
import { addCustomerAction, deleteCustomerAction, inviteAction, loadCustomersAction, updateCustomerAction, updateCustomerDetailsAction, updateCustomerStatusAction } from '../../store/actions/customer.actions';
import { getCustomersSelector } from '../../store/selectors/customer.selector';
import { debounceTime } from 'rxjs/operators';
import { notificationAction } from 'src/app/store/actions/notification.action';
import { LoaderService } from 'src/app/services/http-token-interceptor';
import { getCustomerAccessSelector, getRolesSelector } from 'src/app/store/selectors/app.selector';
import { ICustomerUser } from 'src/app/models/customer.model';
import { cleanUpAction } from 'src/app/modules/settings/store/settings.action';

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
    label: 'Subscription',
    value: 'subscription_name'
  }, {
    label: 'Status',
    value: 'status'
  }];
  public customerStatusType = CustomerStatusType;
  public $searchKeyword = new BehaviorSubject(null);
  public take: number = 10;
  public skip: number = 0;
  public access: ISimpleItem[];
  public role: ISimpleItem[];

  constructor(public loaderSrv: LoaderService, private dialog: MatDialog, private store: Store<RootState>) {
    this.$customers = this.store.pipe(select(getCustomersSelector));
    this.store.pipe(select(getCustomerAccessSelector)).subscribe(access => this.access = access);
    this.store.pipe(select(getRolesSelector)).subscribe(role => this.role = role);
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
      width: '500px',
      data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe((customers: ICustomer[]) => {
        if (customers?.length > 0) {
          this.store.dispatch(inviteAction({
            payload: customers?.map(value => {
              return { username: value.email, subscription: value?.subscription }
            })
          }));
        }
      });
  }

  public isApproved(status: number): boolean {
    return status === CustomerStatusType.Approved;
  }

  public isReady(status: number): boolean {
    return status === CustomerStatusType.Ready;
  }

  public isPending(status: number): boolean {
    return status === CustomerStatusType.Pending;
  }

  public onApprove(customer: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '410px',
      data: { action: 1 }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          const { api_url, customer_users, profile } = customer;
          if (api_url) {
            this.store.dispatch(updateCustomerStatusAction({
              payload: { customer, status: CustomerStatusType.Approved },
              customer: {
                api_url,
                user: {
                  id: customer?.id,
                  name: customer?.name,
                  username: customer?.username,
                  password: customer?.password,
                  status: customer?.status,
                  change_password_token: customer?.change_password_token,
                  is_change_password: ChangePasswordType.ChangePassword,
                },
                user_profile: {
                  ...profile,
                  email: customer?.username
                }
              },
              access: this.access?.map((access: IAccess) => {
                return {
                  id: access?.value,
                  access_name: access?.label,
                  access_route: access?.access_route,
                  parent: access?.parent,
                  position: access?.position
                }
              }),
              role: this.role?.map(r => {
                return { id: r?.value, role_name: r?.label, level: r?.level }
              }),
              customer_users: customer_users?.map((_customer_user: ICustomerUser) => {
                return {
                  ..._customer_user,
                  user_profile: {
                    ..._customer_user?.user_profile,
                    website_url: customer?.website_url,
                    api_url: customer?.api_url,
                    database_name: customer?.database_name,
                    email: _customer_user?.username,
                    company_name: customer?.company_name,
                    company_address: customer?.company_address,
                    language: 'en'
                  } 
                }
              })
            }));
          } else {
            this.store.dispatch(notificationAction({
              notification: { error: true, message: 'Failed to approve customer, api url not defined.' }
            }));
          }
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

  public onDeleteCustomer(customer: ICustomer): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '410px', data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(deleteCustomerAction({ id: customer?.id }));
          if (customer?.profile?.api_url) {
            this.store.dispatch(cleanUpAction({
              url: customer?.profile?.api_url,
              payload: {
                customer: { username: customer?.username }
              }
            }));
          }
        }
      });
  }

  public onSendEmail(customer: ICustomer): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '410px', data: { action: 2 }
    });
    dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {

        }
      });
  }

  public onAddCustomer(): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '690px',
      height: '590px',
      data: { action: 0 }
    });
    dialogRef.afterClosed().subscribe((payload: ICustomerPayload) => {
      if (payload) {
        this.store.dispatch(addCustomerAction({ payload }));
      }
    });
  }

  public onEditCustomer(customer: ICustomer): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '690px',
      height: '590px',
      data: { action: 1, formState: FormStateType.Edit, id: customer?.id }
    });
    dialogRef.afterClosed().subscribe((payload: ICustomerPayload) => {
      if (payload) {
        if (customer?.status === this.customerStatusType.Approved) {
          this.store.dispatch(updateCustomerDetailsAction({ payload }));
        } else {
          this.store.dispatch(updateCustomerAction({ payload }));
        }
      }
    });
  }
}
