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
import { AccessContainerComponent } from './container/access-container.component';
import { AccessPageComponent } from './components/access-page/access-page.component';
import { AccessTableComponent } from './components/access-table/access-table.component';
import { AccessReducer } from './store/access.reducer';

const primengModules = [
  InputTextModule,
  CardModule,
  ButtonModule,
  CheckboxModule,
];

const materialModules = [];

const routes: Routes = [{
  path: '',
  component: AccessContainerComponent,
  children: [{
    path: '',
    component: AccessPageComponent
  }]
}];

@NgModule({
  declarations: [
    AccessContainerComponent,
    AccessPageComponent,
    AccessTableComponent
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
    StoreModule.forFeature('access', AccessReducer),
    EffectsModule.forFeature([]),
  ],
  exports: [],
  providers: [],
})
export class AccessModule { }