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
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { SettingsTableComponent } from './components/settings-table/settings-table.component';
import { SettingsReducer } from './store/settings.reducer';
import { TableModule } from 'primeng/table';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsEffect } from './store/settings.effect';
import { UsersEffect } from 'src/app/store/effects/user.effects';
import { MenuModule } from 'primeng/menu';

const primengModules = [
  InputTextModule,
  CardModule,
  ButtonModule,
  CheckboxModule,
  TableModule,
  MenuModule
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
    SettingsTableComponent
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
    EffectsModule.forFeature([SettingsEffect, UsersEffect]),
  ],
  exports: [],
  providers: [],
})
export class SettingsModule { }