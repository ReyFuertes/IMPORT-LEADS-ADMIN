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
    label: 'Delete',
    message: 'Are you sure to delete this item?'
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
