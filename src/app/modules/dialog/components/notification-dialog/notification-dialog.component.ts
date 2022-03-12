import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'il-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})

export class NotificationDialogComponent {
  public svgPath: string = environment.svgPath;
  public actionText: any[] = [{
    label: 'Notification',
    message: 'This record already exist, please try again.'
  }];

  constructor(public dialogRef: MatDialogRef<NotificationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
