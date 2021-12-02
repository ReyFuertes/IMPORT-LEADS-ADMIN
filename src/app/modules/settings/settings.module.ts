import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'primeng/api';
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
import { SettingsTableComponent } from './components/access-table/settings-table.component';
import { SettingsReducer } from './store/settings.reducer';

const primengModules = [
  InputTextModule,
  CardModule,
  ButtonModule,
  CheckboxModule,
];

const materialModules = [];

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
    EffectsModule.forFeature([]),
  ],
  exports: [],
  providers: [],
})
export class SettingsModule { }