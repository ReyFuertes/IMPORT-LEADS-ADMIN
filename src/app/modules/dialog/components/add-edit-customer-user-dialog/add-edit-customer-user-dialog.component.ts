import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAccess, ICustomerUser } from 'src/app/models/customer.model';
import { FormStateType } from 'src/app/models/generic.model';
import { getCustomerUserByIdAction } from 'src/app/modules/customer/store/actions/customer-user.actions';
import { getCustomerUserByIdSelector } from 'src/app/modules/customer/store/selectors/customer-user.selector';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { emailRegex } from 'src/app/shared/util/email';
import { generatePassword } from 'src/app/shared/util/password';
import { RootState } from 'src/app/store/root.reducer';
import { getCustomerAccessSelector, getRolesSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-add-edit-customer-user-dialog',
  templateUrl: './add-edit-customer-user-dialog.component.html',
  styleUrls: ['./add-edit-customer-user-dialog.component.scss']
})
export class AddEditCustomerUserDialogComponent implements OnInit {
  public actionText: string[] = ['ADD', 'UPDATE'];
  public form: FormGroup;
  public $access: Observable<IAccess[]>;
  public $roles: Observable<ISimpleItem[]>;
  public selectedCustomerUser: ICustomerUser;
  public userPreSelectedAccess: string[] = [
    'a6ded0f0-af1e-471d-afe0-3891308d2bb3', //agreements
    '27a51b15-5587-4380-a2ca-21296e0a9b3e', // assessments
    '057ee2e2-cb7c-4e05-aea8-0f2b962ea150', //venues
    'e684b0c0-6450-44e5-b83c-d07470be8584', // products
    'b3401f0e-5495-45c3-87b7-1cf3abe7eac7' //tags
  ];
  public userPreSelectedRole: string[] = ['2a69d8c5-3434-4ab9-ba74-bfb465c09d05'];
  
  constructor(private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddEditCustomerUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      id: [null],
      username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      password: [generatePassword(), Validators.required],
      roles: [this.userPreSelectedRole, Validators.required],
      accesses: [this.userPreSelectedAccess, Validators.required],
      profile: [null]
    });

    if (this.data?.formState === FormStateType.Edit && this.data?.id) {
      this.store.dispatch(getCustomerUserByIdAction({ id: this.data?.id }));
    } else if(this.data?.formState === FormStateType.Edit && this.data?.id === null) {
      this.form.patchValue(this.data?.selectedCustomerUser, { emitEvent: false });
    };
  }

  ngOnInit(): void {
    this.$access = this.store.pipe(select(getCustomerAccessSelector));
    this.$roles = this.store.pipe(select(getRolesSelector));

    this.store.pipe(select(getCustomerUserByIdSelector)).subscribe(customerUser => {
      if (customerUser) {
        this.form.patchValue(customerUser, { emitEvent: false });
        this.form.get('password').setValidators(null);
      } else {
        this.form.get('password').setValidators([Validators.required]);
      }
      this.form.get('password').updateValueAndValidity();
    });
  }

  public onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}