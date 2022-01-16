import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { FormStateType } from 'src/app/models/generic.model';
import { passwordValidator } from 'src/app/shared/util/validator';
import { getSubscriptionByIdAction } from 'src/app/store/actions/subscription.action';
import { RootState } from 'src/app/store/root.reducer';
import { editSubscriptionByIdSelector } from 'src/app/store/selectors/subscription.selector';

@Component({
  selector: 'il-add-subscription-dialog',
  templateUrl: './add-subscription-dialog.component.html',
  styleUrls: ['./add-subscription-dialog.component.scss']
})
export class AddSubscriptionDialogComponent implements OnInit {
  public form: FormGroup;
  public actionText: string[] = ['ADD', 'UPDATE'];

  constructor(private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddSubscriptionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      max_users: [null, Validators.required],
      description: [null, Validators.required],
      rate: [null, Validators.required],
    });

    if (this.data?.formState === FormStateType.Edit && this.data?.id) {
      this.store.dispatch(getSubscriptionByIdAction({ id: this.data?.id }));
    };
  }

  ngOnInit(): void {
    this.store.pipe(select(editSubscriptionByIdSelector)).subscribe(subscription => {
      if (subscription) {
        this.form.patchValue(subscription, { emitEvent: false });
      }
    });
  }

  public onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}