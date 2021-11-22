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
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerContainerComponent } from './container/customer-container.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CustomerUserEffects } from './store/effects/customer-user.effects';
import { CustomerEffects } from './store/effects/customer.effects';
import { reducers } from './store/reducers';

const primengModules = [
  InputTextModule,
  ButtonModule,
  CheckboxModule,
  TooltipModule,
  TableModule,
  DropdownModule,
  MultiSelectModule,
  ProgressBarModule,
  SliderModule
];

const materialModules = [
  MatCardModule,
  MatButtonModule,
  MatCardModule,
];

const components = [
  CustomerContainerComponent,
  CustomerPageComponent,
  CustomerTableComponent
];

const routes: Routes = [{
  path: '',
  component: CustomerContainerComponent,
  children: [{
    path: '',
    component: CustomerPageComponent
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
    StoreModule.forFeature('customerModule', reducers),
    EffectsModule.forFeature([CustomerEffects, CustomerUserEffects]),
  ],
  exports: [],
  providers: [],
})
export class CustomerModule { }