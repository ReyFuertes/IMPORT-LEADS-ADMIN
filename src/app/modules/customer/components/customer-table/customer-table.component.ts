import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChangePasswordType, CustomerStatusType, FormStateType, IAccess, IRole } from 'src/app/models/generic.model';
import { ICustomer, ICustomerPayload } from 'src/app/models/customer.model';
import { AddCustomerDialogComponent } from 'src/app/modules/dialog/components/add-customer-dialog/add-customer-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/modules/dialog/components/confirmation/confirmation.component';
import { InviteCustomerDialogComponent } from 'src/app/modules/dialog/components/invite-customer-dialog/invite-customer-dialog.component';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { RootState } from 'src/app/store/root.reducer';
import { addCustomerAction, deleteCustomerAction, inviteAction, loadCustomersAction, updateCustomerAction, updateCustomerStatusAction } from '../../store/actions/customer.actions';
import { getCustomersSelector } from '../../store/selectors/customer.selector';
import { debounceTime } from 'rxjs/operators';
import { notificationAction } from 'src/app/store/actions/notification.action';
import { LoaderService } from 'src/app/services/http-token-interceptor';
import { getCustomerAccessSelector, getRolesSelector } from 'src/app/store/selectors/app.selector';
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
      width: '410px',
      data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe((emails: string[]) => {
        if (emails?.length > 0) {
          const payload = emails?.map(email => {
            return { username: email }
          })
          this.store.dispatch(inviteAction({ payload }));
        }
      });
  }

  public isApproved(status: number): boolean {
    return status === CustomerStatusType.Approved;
  }

  public onApprove(customer: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '410px',
      data: { action: 1 }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          if (customer?.api_url) {
            
            const bulkPayload = {
              payload: {
                customer,
                status: CustomerStatusType.Approved
              },
              customer: {
                api_url: customer?.api_url,
                user: {
                  username: customer?.email,
                  name: customer?.name,
                  firstname: customer?.firstname,
                  lastname: customer?.lastname,
                  company: customer?.company,
                  phone: customer?.phone,
                  access: customer?.access,
                  is_change_password: ChangePasswordType.ChangePassword,
                },
                user_profile: {
                  firstname: customer?.profile?.firstname,
                  lastname: customer?.profile?.lastname,
                  phone: customer?.profile?.phone,
                  email: customer?.profile?.email,
                  company_name: customer?.profile?.company_name,
                  company_address: customer?.profile?.company_address,
                  language: customer?.profile?.language,
                  api_url: customer?.profile?.api_url,
                  website_url: customer?.profile?.website_url,
                  database_name: customer?.profile?.database_name
                }
              },
              access: this.access?.map(access => {
                return {
                  id: access?.value,
                  access_name: access?.label,
                  access_route: access?.access_route,
                  parent: access?.parent,
                  position: access?.position
                }
              }),
              role: this.role?.map(r => {
                return {
                  id: r?.value,
                  role_name: r?.label,
                  level: r?.level
                }
              }),
              customer_users: customer?.customer_users?.map(customer_user => {
                return {
                  ...customer_user,
                  user_profile: {
                    email: customer_user?.username,
                    company_name: customer?.profile?.company_name,
                    company_address: customer?.profile?.company_address,
                    language: customer?.profile?.language,
                    api_url: customer?.profile?.api_url,
                    website_url: customer?.profile?.website_url
                  }
                }
              })
            };
            this.store.dispatch(updateCustomerStatusAction(bulkPayload));
          } else {
            this.store.dispatch(notificationAction({
              notification: { error: true, message: 'Failed to approve customer, api url not defined.' }
            }))
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
      height: '545px',
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
      height: '545px',
      data: { action: 1, formState: FormStateType.Edit, id }
    });
    dialogRef.afterClosed().subscribe((payload: ICustomerPayload) => {
      if (payload) {
        this.store.dispatch(updateCustomerAction({ payload }));
      }
    });
  }
}
