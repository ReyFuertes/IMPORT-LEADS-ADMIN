import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAccess, ICustomer, ICustomerUser, IRole } from 'src/app/models/customer.model';
import { addCustomerUserAction } from 'src/app/modules/customer/store/actions/customer-user.actions';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { emailRegex } from 'src/app/shared/util/email';
import { generatePassword } from 'src/app/shared/util/password';
import { RootState } from 'src/app/store/root.reducer';
import { getCustomerAccessSelector, getCustomerRolesSelector } from 'src/app/store/selectors/app.selector';
import { AddEditCustomerUserDialogComponent } from '../add-edit-customer-user-dialog/add-edit-customer-user-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation/confirmation.component';

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

  constructor(private dialog: MatDialog, private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddCustomerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      email_password: this.fb.group({
        username: ['reynelfuertes@gmail.com', Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
        password: [generatePassword(), Validators.required]
      }),
      customer_information: this.fb.group({
        firstname: ['rey', Validators.required],
        lastname: ['fuertes', Validators.required],
        phone_number: ['09339690655', Validators.required],
        address: ['cebu city', Validators.required],
        company_name: ['import leads', Validators.required],
        company_address: ['hongkong', Validators.required],
        language: ['en', Validators.required]
      }),
      users: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(getCustomerAccessSelector)).subscribe(access => this.access = access);
    this.store.pipe(select(getCustomerRolesSelector)).subscribe(roles => this.roles = roles);
  }

  public getRoles(roles: string[]): any[] {
    return this.roles.filter(role => roles.includes(role?.value));
  }

  public getAccesses(accesses: string[]): IAccess[] {
    return this.access.filter(access => accesses.includes(access?.value))
  }

  public onDeleteCustomerUser(user: ICustomerUser): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '410px', data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
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

  public onEditCustomerUser(user: ICustomerUser): void {
    const dialogRef = this.dialog.open(AddEditCustomerUserDialogComponent, {
      width: '430px', height: '265px', data: { action: 1, user }
    });
    dialogRef.afterClosed().subscribe((result: ICustomer) => {
      if (result) {

      }
    });
  }

  public removeCustomerUser(item: any): void {
    this.getCustomerUsersFormValues.removeAt(item);
  }

  public addCustomerUser(item: ICustomerUser): any {
    this.getCustomerUsersFormValues.push(item);
  }

  public get getCustomerUsersFormValues(): any {
    return this.getCustomerUsersForm.value;
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
    return this.form.get('customer_information') as FormGroup;
  }

  public onAdd(): void {
    if (this.form.valid) {
      this.dialogRef.close(<ICustomer>this.form.value);
    }
  }
}
