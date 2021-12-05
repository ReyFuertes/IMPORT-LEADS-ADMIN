import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store/root.reducer';

@Component({
  selector: 'il-invite-customer-dialog',
  templateUrl: './invite-customer-dialog.component.html',
  styleUrls: ['./invite-customer-dialog.component.scss']
})
export class InviteCustomerDialogComponent implements OnInit {
  public emails: string[];
  public actionText: string[] = ['ADD', 'UPDATE'];
  
  constructor(private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<InviteCustomerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void { }

  public onInvite(): void {
    if(this.emails?.length > 0) {
      this.dialogRef.close(this.emails);
    }
  }
}
