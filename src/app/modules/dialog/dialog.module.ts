import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { AddCustomerDialogComponent } from './components/add-customer-dialog/add-customer-dialog.component';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationDialogComponent } from './components/confirmation/confirmation.component';
import { ChipsModule } from 'primeng/chips';
import { InviteCustomerDialogComponent } from './components/invite-customer-dialog/invite-customer-dialog.component';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { AddEditCustomerUserDialogComponent } from './components/add-edit-customer-user-dialog/add-edit-customer-user-dialog.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AddSubscriptionDialogComponent } from './components/add-subscription-dialog/add-subscription-dialog.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';

const dialogComponents = [
  AddCustomerDialogComponent,
  ConfirmationDialogComponent,
  InviteCustomerDialogComponent,
  AddEditCustomerUserDialogComponent,
  AddUserDialogComponent,
  AddSubscriptionDialogComponent,
  NotificationDialogComponent
];

const materialModules = [
  MatDialogModule,
];

const primeNgModules = [
  CheckboxModule,
  ChipsModule,
  ButtonModule,
  TabViewModule,
  TableModule,
  TooltipModule,
  RadioButtonModule,
  InputNumberModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    ...primeNgModules,
    SharedModule,
    FlexLayoutModule,
  ],
  exports: [...dialogComponents],
  declarations: [...dialogComponents],
  entryComponents: [...dialogComponents],
  providers: [],
})
export class DialogModule { }
