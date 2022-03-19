import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { CustomerService, CustomerUserService } from "src/app/services/api.service";

export class UrlValidators {
  static isWebsiteUrlValid(customerService: CustomerService, id?: string): any {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const payload = { id, website_url: control?.value };
      console.log(payload)
      return customerService.exist(payload, 'check-website-url').pipe(
        map(exist => {
          return exist ? { exist: true } : null;
        }),
        catchError(() => of(null))
      );
    };
  }
}

export function passwordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.not_matched) {
      return;
    }
    if (control.errors && !control.errors.not_matched) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ not_matched: true });
      control.setErrors({ not_matched: true });
    } else {
      matchingControl.setErrors(null);
      control.setErrors(null);
    }
  }
}