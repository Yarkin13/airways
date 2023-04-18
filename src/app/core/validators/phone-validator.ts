import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const PHONE_REGEXP = /^\d{10}$/;

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = PHONE_REGEXP.test(control.value);
    return valid ? null : { phoneValidator: { value: control.value } };
  };
}
