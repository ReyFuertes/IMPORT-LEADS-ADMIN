import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { IAccess, ICustomer, ICustomerUser, ICustomerUserResponse, IRole } from 'src/app/models/customer.model';
import { CustomerStatusType, FormStateType, ISubscription } from 'src/app/models/generic.model';
import { clearSelectedCustomerAction, deleteCustomerUserAction, getCustomerByIdAction } from 'src/app/modules/customer/store/actions/customer.actions';
import { editCustomerByIdSelector } from 'src/app/modules/customer/store/selectors/customer.selector';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { emailRegex, urlApiRegex, websiteUrlRegex } from 'src/app/shared/util/email';
import { RootState } from 'src/app/store/root.reducer';
import { getCustomerAccessSelector, getRolesSelector } from 'src/app/store/selectors/app.selector';
import { AddEditCustomerUserDialogComponent } from '../add-edit-customer-user-dialog/add-edit-customer-user-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation/confirmation.component';
import * as _ from 'lodash';
import { getSubscriptionsSelector } from 'src/app/store/selectors/subscription.selector';
import { distinctUntilChanged, skip, takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { getSubscriptionByIdSelector } from 'src/app/store/selectors/subscription.selector';
import { combineLatest } from 'rxjs';
import { isApiUrlExistAction, isWebsiteUrlExistAction } from 'src/app/modules/customer/store/actions/customer-profile.actions';

@Component({
  selector: 'il-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.scss']
})
export class AddCustomerDialogComponent extends GenericDestroyPageComponent implements OnInit {
  public form: FormGroup;
  public accessOptions: any[];
  public roleOptions: any[];
  public actionText: string[] = ['SAVE', 'UPDATE', 'REVIEW'];
  public access: IAccess[];
  public roles: ISimpleItem[];
  public languageOptions: ISimpleItem[] = [{
    label: 'English',
    value: 'en'
  }, {
    label: 'Chinese',
    value: 'cn'
  }];
  public subscriptions: ISimpleItem[];
  public customerUsers: any[] = [];
  public selectedCustomer: ICustomer;
  public subscriber: ISubscription;
  public subscriberMaxUserReached: boolean = false;
  public customerStatus: number;
  public initialUsers: ICustomerUserResponse[];
  public initialSubscription: ISubscription;
  public customerUsersArray: FormArray;
  public userResetState: boolean = false;

  constructor(private cdRef: ChangeDetectorRef, private dialog: MatDialog, private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddCustomerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.form = this.fb.group({
      id: [null],
      email_password: this.fb.group({
        username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
        password: [null, [Validators.required, Validators.minLength(6)]],
      }),
      profile: this.fb.group({
        id: [null],
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        phone_number: [null, Validators.required],
        address: [null, Validators.required],
        company_name: [null, Validators.required],
        company_address: [null, Validators.required],
        language: ['en', Validators.required],
        website_url: [null, [Validators.required, Validators.pattern(websiteUrlRegex.url)]],
        api_url: [null, Validators.compose([Validators.required, Validators.pattern(urlApiRegex.url)])],
        database_name: [null, Validators.required]
      }),
      users: new FormArray([]),
      subscription: [null, Validators.required]
    });
    
    if (this.isEditMode && this.data?.id) {
      this.store.dispatch(getCustomerByIdAction({ id: this.data?.id }));
      this.customerStatus = this.data?.userStatus;
    } else {
      this.store.dispatch(clearSelectedCustomerAction());
    }

    this.form.get('subscription').valueChanges.pipe(
      takeUntil(this.$unsubscribe),
      distinctUntilChanged(() => this.userResetState))
      .subscribe(subscriberId => {
        if (subscriberId) {
          this.store.pipe(select(getSubscriptionByIdSelector(subscriberId)))
            .subscribe(subscriber => {
              this.subscriber = subscriber;
              this.form.setControl('users', this.fb.array([]));
              this.subscriberMaxUserReached = false;
            });
          this.checkSubscriptionUsersReached();
        }
      });

    this.getCustomerInformationForm.get('website_url').valueChanges
      .pipe(takeUntil(this.$unsubscribe)).subscribe(value => {
        if (value) {
          this.store.dispatch(isWebsiteUrlExistAction({
            payload: {
              website_url: this.getCustomerInformationForm.get('website_url').value,
              id: this.form.get('id').value
            }
          }));
        }
      });

    this.getCustomerInformationForm.get('api_url').valueChanges
      .pipe(takeUntil(this.$unsubscribe)).subscribe(value => {
        if (value) {
          this.store.dispatch(isApiUrlExistAction({
            payload: {
              api_url: this.getCustomerInformationForm.get('api_url').value,
              id: this.form.get('id').value
            }
          }))
        }
      });
  }

  public get isCustomerApproved(): boolean {
    return this.customerStatus === CustomerStatusType.Approved;
  }

  public get isEditMode(): boolean {
    return this.data?.formState === FormStateType.Edit;
  }

  private formReset(): void {
    this.form.reset();
    this.store.dispatch(clearSelectedCustomerAction());
  }

  ngOnInit(): void {
    combineLatest([
      this.store.pipe(select(getCustomerAccessSelector)),
      this.store.pipe(select(getRolesSelector))
    ]).subscribe(([access, roles]) => {
      this.access = access;
      this.roles = roles;
    });

    this.store.pipe(
      select(editCustomerByIdSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(customer => {
        if (customer) {
          
          this.form.patchValue({
            id: customer?.id,
            email_password: { username: customer?.username, password: customer?.text_password },
            profile: customer?.profile,
            users: customer?.customer_users
          }, { emitEvent: true });

          this.form.get('subscription').patchValue(customer.subscription?.id, { emitEvent: true });
          this.initialSubscription = customer?.subscription;
          this.initialUsers = customer?.customer_users;
          this.getCustomerUsersFormValues.push(...customer?.customer_users);

          this.checkSubscriptionUsersReached();
        } else {
          this.getCustomerInformationForm.get('language').patchValue('en', { emitEvent: false });
          this.getEmailPasswordForm.get('password').setValidators([Validators.required]);
        }
      });
  }

  ngAfterViewInit(): void {
    this.store.pipe(select(getSubscriptionsSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(subscriptions => {
        this.subscriptions = subscriptions?.map(sub => ({ label: sub.name, value: sub.id }));
        this.form.get('subscription').patchValue(this.subscriptions[0]?.value, { emitEvent: false });
        this.subscriberMaxUserReached = false;
        this.cdRef.detectChanges();
      });
    if (this.isCustomerApproved) {
      this.form.get('email_password').disable();
      this.form.get('profile').disable();
      this.form.get('subscription').disable();
    }
  }

  public onRefresh(): void {
    this.userResetState = true;
    this.customerUsersArray = this.form.get('users') as FormArray;
    this.customerUsersArray.clear();

    this.initialUsers?.forEach(customerUser => {
      const newValue = new FormGroup({
        id: new FormControl(customerUser.id),
        accesses: new FormControl(customerUser.accesses),
        created_at: new FormControl(customerUser.created_at),
        customer_id: new FormControl(customerUser.customer_id),
        roles: new FormControl(customerUser.roles),
        username: new FormControl(customerUser.username),
      });
      this.customerUsersArray.push(newValue);
    });

    this.form.get('subscription').patchValue({
      value: this.initialSubscription?.id,
      label: this.initialSubscription?.name
    }, { emitEvent: false });

    setTimeout(() => {
      this.userResetState = false;
    }, 100);
  }

  public get isSubscriptionChanged(): boolean {
    return this.subscriber?.id !== this.initialSubscription?.id;
  }

  public getRoles(roles: string[]): IRole[] {
    return this.roles?.filter(role => roles?.includes(role?.value));
  }

  public checkSubscriptionUsersReached(): void {
    if (this.getUsersLength >= Number(this.subscriber?.max_users)) {
      this.subscriberMaxUserReached = true;
    } else {
      this.subscriberMaxUserReached = false;
    }
  }

  public getAccesses(accesses: string[]): IAccess[] {
    return this.access?.filter(access => accesses?.includes(access?.value));
  }

  public onDeleteCustomerUser(user: ICustomerUser): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '410px', data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          if(user?.id) {
            this.store.dispatch(deleteCustomerUserAction({ id: user?.id }));
          };
          _.remove(this.getCustomerUsersFormValues, { id: user?.id });
          this.checkSubscriptionUsersReached();
        }
      });
  }

  private get getUsersLength(): number {
    return this.form.get('users')?.value?.length || 0;
  }

  public onAddCustomerUser(): void {
    this.checkSubscriptionUsersReached();
    this.store.dispatch(clearSelectedCustomerAction());

    const dialogRef = this.dialog.open(AddEditCustomerUserDialogComponent, {
      width: '430px', height: '275px', data: {
        action: 0,
        formState: FormStateType.Add,
        existingCustomers: this.getCustomerUsersFormValues
      }
    });
    dialogRef.afterClosed().subscribe((user: ICustomerUser) => {
      if (user) {
        this.addCustomerUser(user);
        this.checkSubscriptionUsersReached();
      }
    });
  }

  public onEditCustomerUser(customerUser: ICustomerUser): void {
    const selectedCustomerUser = this.getCustomerUsersFormValues.find(value => value.username === customerUser?.username);

    const dialogRef = this.dialog.open(AddEditCustomerUserDialogComponent, {
      width: '430px', height: '275px',
      data: {
        action: 1,
        formState: FormStateType.Edit,
        id: customerUser?.id,
        selectedCustomerUser: selectedCustomerUser,
        existingCustomers: this.getCustomerUsersFormValues
      }
    });
    dialogRef.afterClosed().subscribe((payload: ICustomerUserResponse) => {
      if (payload) {
        const itemToRemove = this.getCustomerUsersFormValues.find(value => value.username === customerUser?.username);
        _.remove(this.getCustomerUsersFormValues, { username: itemToRemove.username });
        this.getCustomerUsersFormValues.unshift(payload);
      }
    });
  }

  public removeCustomerUser(item: ICustomerUser): void {
    this.getCustomerUsersFormValues.removeAt(item);
  }

  public addCustomerUser(item: ICustomerUser): any {
    this.getCustomerUsersFormValues.push(item);
  }

  public get getCustomerUsersFormValues(): any {
    return this.getCustomerUsersForm.value as FormArray;
  }

  public get getCustomerUsersForm(): FormGroup {
    return this.form.get('users') as FormGroup;
  }

  public get getEmailPasswordFormValues(): any {
    return this.getEmailPasswordForm.value;
  }

  public get getEmailPasswordForm(): FormGroup {
    return this.form.get('email_password') as FormGroup;
  }

  public get getCustomerInformationFormValues(): any {
    return this.getCustomerInformationForm.value;
  }

  public get getCustomerInformationForm(): FormGroup {
    return this.form.get('profile') as FormGroup;
  }

  public get isFormValid(): boolean {
    return this.form.valid && this.form.get('users')?.value?.length > 0;
  }

  public onSave(): void {
    if (this.isFormValid) {
      this.dialogRef.close(<ICustomer>this.form.value);
    }
  }

  public onCancel(): void {
    if (this.isCustomerApproved) {
      this.dialogRef.close(false);
    } else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '410px', data: { action: 3 }
      });
      dialogRef.afterClosed()
        .subscribe((result: boolean) => {
          if (result) {
            this.formReset();
            this.dialogRef.close(false);
          }
        });
    }

  }
}
