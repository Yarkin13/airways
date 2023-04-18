import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = new Date(control.value);
    if (!inputDate) return { dateValidator: { value: control.value } };
    const currentYear = new Date().getFullYear();
    const maxDate = new Date(currentYear - 18, 0, 0).getTime();
    const minDate = new Date(currentYear - 90, 0, 0).getTime();
    const inputDateInMS = inputDate.getTime();

    return inputDateInMS <= maxDate && inputDateInMS >= minDate
      ? null
      : { dateValidator: { value: control.value } };
  };
}
