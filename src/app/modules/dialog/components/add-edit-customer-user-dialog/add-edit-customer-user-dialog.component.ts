import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAccess } from 'src/app/models/generic.model';
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

  constructor(private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddEditCustomerUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      username: ['user1@gmail.com', Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      password: [generatePassword(), Validators.required],
      roles: [null, Validators.required],
      access: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.$access = this.store.pipe(select(getCustomerAccessSelector));
    this.$roles = this.store.pipe(select(getCustomerRolesSelector));
  }

  public onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
