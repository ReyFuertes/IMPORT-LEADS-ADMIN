import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogModule } from '../dialog/dialog.module';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SettingsContainerComponent } from './container/settings-container.component';
import { SettingsPageComponent } from './components/users-page/settings-page.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { SettingsReducer } from './store/settings.reducer';
import { TableModule } from 'primeng/table';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsEffect } from './store/settings.effect';
import { UsersEffect } from 'src/app/store/effects/user.effects';
import { MenuModule } from 'primeng/menu';
import { TabViewModule } from 'primeng/tabview';
import { SubscriptionsTableComponent } from './components/subscriptions/subscriptions-table.component';
import { SubscriptionsEffect } from 'src/app/store/effects/subscription.effects';

const primengModules = [
  InputTextModule,
  CardModule,
  ButtonModule,
  CheckboxModule,
  TableModule,
  MenuModule,
  TabViewModule
];

const materialModules = [
  MatDialogModule,
];

const routes: Routes = [{
  path: '',
  component: SettingsContainerComponent,
  children: [{
    path: '',
    component: SettingsPageComponent
  }]
}];

@NgModule({
  declarations: [
    SettingsContainerComponent,
    SettingsPageComponent,
    UsersTableComponent,
    SubscriptionsTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    DialogModule,
    ...primengModules,
    ...materialModules,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', SettingsReducer),
    EffectsModule.forFeature([SettingsEffect, UsersEffect, SubscriptionsEffect]),
  ],
  exports: [],
  providers: [],
})
export class SettingsModule { }