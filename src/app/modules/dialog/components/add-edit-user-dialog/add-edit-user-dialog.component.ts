import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAccess } from 'src/app/models/generic.model';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { emailRegex } from 'src/app/shared/util/email';
import { RootState } from 'src/app/store/root.reducer';
import { getUserAccessSelector, getUserRolesSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-add-edit-user-dialog',
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrls: ['./add-edit-user-dialog.component.scss']
})
export class AddEditUserDialogComponent implements OnInit {
  public actionText: string[] = ['ADD', 'UPDATE'];
  public form: FormGroup;
  public $access: Observable<IAccess[]>;
  public $roles: Observable<ISimpleItem[]>;

  constructor(private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddEditUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      roles: [null, Validators.required],
      access: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.$access = this.store.pipe(select(getUserAccessSelector));
    this.$roles = this.store.pipe(select(getUserRolesSelector));
  }

  public onSave(): void {

  }
}
