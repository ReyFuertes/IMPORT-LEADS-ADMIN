import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICustomerUser } from 'src/app/models/customer.model';
import { FormStateType, IAccess } from 'src/app/models/generic.model';
import { getCustomerUserByIdAction } from 'src/app/modules/customer/store/actions/customer-user.actions';
import { getCustomerUserByIdSelector } from 'src/app/modules/customer/store/selectors/customer-user.selector';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { emailRegex } from 'src/app/shared/util/email';
import { generatePassword } from 'src/app/shared/util/password';
import { RootState } from 'src/app/store/root.reducer';
import { getCustomerAccessSelector, getCustomerRolesSelector } from 'src/app/store/selectors/app.selector';

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

  constructor(private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddEditCustomerUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      id: [null],
      username: [`user${Math.floor(Math.random() * (1000 - 100) + 1000)}@gmail.com`, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      password: [generatePassword(), Validators.required],
      roles: [null, Validators.required],
      accesses: [null, Validators.required],
      profile: [null]
    });

    if (this.data?.formState === FormStateType.Edit && this.data?.id) {
      this.store.dispatch(getCustomerUserByIdAction({ id: this.data?.id }));
    };
  }

  ngOnInit(): void {
    this.$access = this.store.pipe(select(getCustomerAccessSelector));
    this.$roles = this.store.pipe(select(getCustomerRolesSelector));

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