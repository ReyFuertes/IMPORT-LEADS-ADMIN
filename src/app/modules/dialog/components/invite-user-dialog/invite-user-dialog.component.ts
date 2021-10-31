import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';

@Component({
  selector: 'il-invite-user-dialog',
  templateUrl: './invite-user-dialog.component.html',
  styleUrls: ['./invite-user-dialog.component.scss']
})
export class InviteUserDialogComponent implements OnInit {
  public emails: any;
  
  constructor(private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<InviteUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void { }

  public onInvite(): void {

  }
}
