import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const NAME_REGEXP = /^[a-zA-Zа-яА-Я]+$/iu;

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = NAME_REGEXP.test(control.value);
    return valid ? null : { nameValidator: { value: control.value } };
  };
}
