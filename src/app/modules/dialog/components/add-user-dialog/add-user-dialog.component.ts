import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { FormStateType } from 'src/app/models/generic.model';
import { passwordValidator } from 'src/app/shared/util/validator';
import { getUserByIdAction } from 'src/app/store/actions/user.action';
import { RootState } from 'src/app/store/root.reducer';
import { editUserByIdSelector } from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'il-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  public form: FormGroup;
  public actionText: string[] = ['ADD', 'UPDATE'];

  constructor(private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      id: [null],
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirm_password: [null, [Validators.required, Validators.minLength(6)]]
    }, {
      validator: passwordValidator('password', 'confirm_password')
    });

    if (this.data?.formState === FormStateType.Edit && this.data?.id) {
      this.store.dispatch(getUserByIdAction({ id: this.data?.id }));
    };
  }

  ngOnInit(): void {
    this.store.pipe(select(editUserByIdSelector)).subscribe(user => {
      if (user) {
        this.form.patchValue(user, { emitEvent: false });
      }
    });
  }

  public onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}