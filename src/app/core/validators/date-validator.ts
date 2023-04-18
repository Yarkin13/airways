import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!Date.parse(control.value)) return { dateValidator: { value: control.value } };

    const inputDate = new Date(control.value);
    const currentYear = new Date().getFullYear();
    // must be over 18 years of age
    const maxDate = new Date(currentYear - 18, 0, 0).getTime();
    // must be under 90 years of age
    const minDate = new Date(currentYear - 90, 0, 0).getTime();
    const inputDateInMS = inputDate.getTime();

    return inputDateInMS <= maxDate && inputDateInMS >= minDate
      ? null
      : { dateValidator: { value: control.value } };
  };
}
