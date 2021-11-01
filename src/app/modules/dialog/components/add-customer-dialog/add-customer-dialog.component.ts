import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAccess, IUser } from 'src/app/models/user.model';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { emailRegex } from 'src/app/shared/util/email';
import { RootState } from 'src/app/store/root.reducer';
import { getUserAccessSelector, getUserRolesSelector } from 'src/app/store/selectors/app.selector';
import { AddEditUserDialogComponent } from '../add-edit-user-dialog/add-edit-user-dialog.component';
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
  public $access: Observable<IAccess[]>;
  public $roles: Observable<ISimpleItem[]>;
  public languageOptions: ISimpleItem[] = [{
    label: 'English',
    value: 'en'
  }, {
    label: 'Chinese',
    value: 'cn'
  }];
  public users: any[] = [{
    username: 'rfuertes@gmail.com',
    roles: ['123456', '123'],
    access: ['56456', '123232']
  }, {
    username: 'test@gmail.com',
    roles: ['123456', '123'],
    access: ['56456', '123232']
  }, {
    username: 'rfuertes@gmail.com',
    roles: ['123456', '123'],
    access: ['56456', '123232']
  }, {
    username: 'test@gmail.com',
    roles: ['123456', '123'],
    access: ['56456', '123232']
  }, {
    username: 'rfuertes@gmail.com',
    roles: ['123456', '123'],
    access: ['56456', '123232']
  }, {
    username: 'test@gmail.com',
    roles: ['123456', '123'],
    access: ['56456', '123232']
  }, {
    username: 'rfuertes@gmail.com',
    roles: ['123456', '123'],
    access: ['56456', '123232']
  }, {
    username: 'test@gmail.com',
    roles: ['123456', '123'],
    access: ['56456', '123232']
  }];

  constructor(private dialog: MatDialog, private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddCustomerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      emailPassword: this.fb.group({
        username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
        password: [null, Validators.required]
      }),
      generalInformation: this.fb.group({
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        address: [null, Validators.required],
        companyName: [null, Validators.required],
        companyAddress: [null, Validators.required],
        language: ['en', Validators.required]
      }),
    });
  }

  ngOnInit(): void {
    this.$access = this.store.pipe(select(getUserAccessSelector));
    this.$roles = this.store.pipe(select(getUserRolesSelector));
  }

  public onDelete(user: IUser): void {
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
    const dialogRef = this.dialog.open(AddEditUserDialogComponent, {
      width: '385px',
      height: '275px',
      data: { action: 0 }
    });
    dialogRef.afterClosed().subscribe((result: IUser) => {
      if (result) {

      }
    });
  }

  public onEditUser(user: IUser): void {
    const dialogRef = this.dialog.open(AddEditUserDialogComponent, {
      width: '385px',
      height: '275px',
      data: { action: 1, user }
    });
    dialogRef.afterClosed().subscribe((result: IUser) => {
      if (result) {

      }
    });
  }

  public get getEmailPasswordFormValues(): any {
    return this.getEmailPasswordForm.value;
  }
  public get getEmailPasswordForm(): FormGroup {
    return this.form.get('emailPassword') as FormGroup;
  }

  public get getGeneralInformationFormValues(): any {
    return this.getGeneralInformationForm.value;
  }
  public get getGeneralInformationForm(): FormGroup {
    return this.form.get('generalInformation') as FormGroup;
  }

  public onAdd(): void {
    if (this.form.valid) {
      this.dialogRef.close(<IUser>this.form.value);
    }
  }
}
