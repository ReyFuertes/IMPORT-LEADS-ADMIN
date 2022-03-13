import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { InputMaxLengthDirective } from './directives/input-maxlen.directive';
import { CurrencyFormatterDirective } from './directives/currency-formatter.directive';
import { customCurrencyPipe } from './pipes/custom-currency.pipe';
import { SafePipe } from './pipes/html';
import { DropdownSelectComponent } from './components/dropdown-select/dropdown-select.component';
import { MatSelectModule } from '@angular/material/select';
import { DropdownMultiSelectComponent } from './components/dropdown-multi-select/dropdown-multi-select.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { PasswordModule } from 'primeng/password';
import { TopNavComponent } from './components/topnav/topnav.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { InputEmailComponent } from './components/input-email/input-email.component';
import { OptionSelectComponent } from './components/option-select/option-select.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoFocusDirective } from './directives/autofocus.directive';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatIconModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatCardModule,
  MatSelectModule,
  MatMenuModule
];

const primeNgModules = [
  CalendarModule,
  AutoCompleteModule,
  DropdownModule,
  InputSwitchModule,
  MultiSelectModule,
  InputTextModule,
  PasswordModule,
  RadioButtonModule
];

const sharedComponents = [
  InputComponent,
  DropdownSelectComponent,
  DropdownMultiSelectComponent,
  InputPasswordComponent,
  TopNavComponent,
  InputEmailComponent,
  OptionSelectComponent
];

const directives = [
  NumberOnlyDirective,
  InputMaxLengthDirective,
  CurrencyFormatterDirective,
  AutoFocusDirective
];

@NgModule({
  declarations: [
    ...sharedComponents,
    ...directives,
    customCurrencyPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    ...materialModules,
    ...primeNgModules,
  ],
  exports: [...sharedComponents],
  providers: [customCurrencyPipe, SafePipe],
})
export class SharedModule { }