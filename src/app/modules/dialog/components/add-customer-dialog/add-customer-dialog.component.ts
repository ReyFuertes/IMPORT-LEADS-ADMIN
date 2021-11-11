import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { IAccess, ICustomer, ICustomerUser, ICustomerUserResponse, IRole } from 'src/app/models/customer.model';
import { FormStateType } from 'src/app/models/generic.model';
import { deleteCustomerUserAction, getCustomerByIdAction } from 'src/app/modules/customer/store/actions/customer.actions';
import { editCustomerByIdSelector, getCustomerByIdSelector } from 'src/app/modules/customer/store/selectors/customer.selector';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { emailRegex } from 'src/app/shared/util/email';
import { RootState } from 'src/app/store/root.reducer';
import { getCustomerAccessSelector, getCustomerRolesSelector } from 'src/app/store/selectors/app.selector';
import { AddEditCustomerUserDialogComponent } from '../add-edit-customer-user-dialog/add-edit-customer-user-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation/confirmation.component';
import * as _ from 'lodash';

@Component({
  selector: 'il-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.scss']
})
export class AddCustomerDialogComponent implements OnInit {
  public form: FormGroup;
  public accessOptions: any[];
  public roleOptions: any[];
  public actionText: string[] = ['ADD', 'UPDATE'];
  public access: IAccess[];
  public roles: ISimpleItem[];
  public languageOptions: ISimpleItem[] = [{
    label: 'English',
    value: 'en'
  }, {
    label: 'Chinese',
    value: 'cn'
  }];
  public customerUsers: any[] = [];
  public selectedCustomer: ICustomer;

  constructor(private dialog: MatDialog, private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddCustomerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = this.fb.group({
      id: [null],
      email_password: this.fb.group({
        username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
        password: [null, Validators.required]
      }),
      customer_profile: this.fb.group({
        id: [null],
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        phone_number: [null, Validators.required],
        address: [null, Validators.required],
        company_name: [null, Validators.required],
        company_address: [null, Validators.required],
        language: ['en', Validators.required]
      }),
      users: new FormArray([])
    });

    if (this.data?.formState === FormStateType.Edit && this.data?.id) {
      this.store.dispatch(getCustomerByIdAction({ id: this.data?.id }));
    }
  }

  ngOnInit(): void {
    this.store.pipe(select(getCustomerAccessSelector)).subscribe(access => this.access = access);
    this.store.pipe(select(getCustomerRolesSelector)).subscribe(roles => this.roles = roles);
    this.store.pipe(select(editCustomerByIdSelector)).subscribe(customer => {
      if (customer) {
        this.form.patchValue({
          id: customer?.id,
          email_password: { username: customer?.username },
          customer_profile: customer?.customer_profile,
          users: customer?.customer_users
        }, { emitEvent: false });

        this.getCustomerUsersFormValues.push(...customer?.customer_users);
        this.getEmailPasswordForm.get('password').setValidators(null);
      } else {
        this.getEmailPasswordForm.get('password').setValidators([Validators.required]);
      }
      this.getEmailPasswordForm.get('password').updateValueAndValidity();
    });
  }

  public getRoles(roles: string[]): IRole[] {
    return this.roles?.filter(role => roles?.includes(role?.value));
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
          this.store.dispatch(deleteCustomerUserAction({ id: user?.id }));
          _.remove(this.getCustomerUsersFormValues, { id: user?.id });
        }
      });
  }

  public onAddCustomerUser(): void {
    const dialogRef = this.dialog.open(AddEditCustomerUserDialogComponent, {
      width: '430px', height: '265px', data: { action: 0 }
    });
    dialogRef.afterClosed().subscribe((user: ICustomerUser) => {
      if (user) {
        this.addCustomerUser(user);
      }
    });
  }

  public onEditCustomerUser(id: string): void {
    const dialogRef = this.dialog.open(AddEditCustomerUserDialogComponent, {
      width: '430px', height: '265px',
      data: { action: 1, formState: FormStateType.Edit, id }
    });
    dialogRef.afterClosed().subscribe((payload: ICustomerUserResponse) => {
      if (payload) {
        const itemToRemove = this.getCustomerUsersFormValues.find(value => value.id === id);
        _.remove(this.getCustomerUsersFormValues, { id: itemToRemove.id });
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
    return this.form.get('customer_profile') as FormGroup;
  }

  public onAdd(): void {
    if (this.form.valid) {
      this.dialogRef.close(<ICustomer>this.form.value);
    }
  }
}
