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
import { RoleContainerComponent } from './container/role-container.component';
import { RolePageComponent } from './components/role-page/role-page.component';
import { RoleTableComponent } from './components/role-table/role-table.component';
import { RoleReducer } from './store/role.reducer';
import { TableModule } from 'primeng/table';

const primengModules = [
  InputTextModule,
  CardModule,
  ButtonModule,
  CheckboxModule,
  TableModule
];

const materialModules = [];

const routes: Routes = [{
  path: '',
  component: RoleContainerComponent,
  children: [{
    path: '',
    component: RolePageComponent
  }]
}];

@NgModule({
  declarations: [
    RoleContainerComponent,
    RolePageComponent,
    RoleTableComponent
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
    StoreModule.forFeature('role', RoleReducer),
    EffectsModule.forFeature([]),
  ],
  exports: [],
  providers: [],
})
export class RoleModule { }