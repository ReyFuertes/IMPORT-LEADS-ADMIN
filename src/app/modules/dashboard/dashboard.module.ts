import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogModule } from '../dialog/dialog.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContainerComponent } from './container/dashboard-container.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartModule } from 'primeng/chart';

const primengModules = [
  InputTextModule,
  ButtonModule,
  CheckboxModule,
  TooltipModule,
  ChartModule
];

const materialModules = [
  MatCardModule,
  MatCardModule,
  MatButtonModule
];

const components = [
  DashboardContainerComponent,
  DashboardPageComponent,
];

const routes: Routes = [{
  path: '',
  component: DashboardContainerComponent,
  children: [{
    path: '',
    component: DashboardPageComponent
  }]
}];

@NgModule({
  declarations: [...components],
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

  ],
  exports: [],
  providers: [],
})
export class DashboardModule { }