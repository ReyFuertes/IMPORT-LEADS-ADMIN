import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'il-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})

export class ConfirmationDialogComponent {
  public svgPath: string = environment.svgPath;
  public actionText: any[] = [{
    label: 'DELETE',
    message: 'Are you sure to delete this item?'
  }, {
    label: 'APPROVE',
    message: 'Are you sure to approve this item?'
  }, {
    label: 'SEND EMAIL',
    message: 'Do you want to send onboarded email?'
  }, {
    label: 'OK',
    message: 'Do you want to cancel?'
  }, {
    label: 'RESET',
    message: 'Do you want to reset environment data? This will permanently delete Main Applications data and cannot be undone.'
  }, {
    label: 'NOTIFICATION',
    message: 'This record already exist, please try again.'
  }];

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public get isColorPrimary(): boolean {
    return this.data?.action === 2 || this.data?.action === 3 || this.data?.action === 6;
  }

  public get isCloseOnly(): boolean {
    return this.data?.isCloseOnlyOption ? true : false;
  }

  public get isYesNoLabels(): boolean {
    return this.data?.yesNoLabels ? true : false;
  }
}
